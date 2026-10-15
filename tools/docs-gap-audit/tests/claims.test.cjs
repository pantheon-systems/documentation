'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { parseHtml } = require('../scripts/lib/html.cjs');
const { extractClaims, attachEvidence, summarizeClaims, identifiersIn } = require('../scripts/lib/claims.cjs');

const page = (p, html, status = 200) => ({ path: p, status, ...parseHtml(`<html><head><title>T</title></head><body><main><h1>Acme Widgets</h1>${html}</main></body></html>`) });
const claimsFor = (html, p = '/widgets/x') => extractClaims([page(p, html)]);
const one = (sentence) => {
  const c = claimsFor(`<p>${sentence}</p>`);
  assert.equal(c.length, 1, `expected one claim for: ${sentence}`);
  return c[0];
};

test('extractClaims detects version, default, support, limit, behavior, and retention claims', () => {
  assert.ok(one('Acme Widgets requires version 2.3 or later.').types.includes('version'));
  assert.ok(one('The retention option defaults to 30 days.').types.includes('default'));
  assert.ok(one('Acme Widgets supports Chrome and Firefox.').types.includes('support'));
  assert.ok(one('Each account can hold up to 500 widgets.').types.includes('limit'));
  assert.ok(one('Shared links are never revoked automatically.').types.includes('behavior'));
  assert.ok(one('Deleted widgets are kept for 30 days.').types.includes('retention'));
});

test('"supports A, B, and C" yields three subclaims', () => {
  const c = one('Acme Widgets supports PNG, JPEG, and WebP.');
  assert.deepEqual(c.subclaims, ['PNG', 'JPEG', 'WebP']);
});

test('a sentence with no list yields no subclaims', () => {
  assert.deepEqual(one('Acme Widgets supports Chrome.').subclaims, []);
});

test('identifiers are extracted: snake_case, --flags, and UPPER_CASE', () => {
  const c = one('Run widget_create with --dry-run and set WIDGET_API_URL first.');
  assert.deepEqual(c.identifiers.sort(), ['--dry-run', 'WIDGET_API_URL', 'widget_create'].sort());
  assert.deepEqual(identifiersIn('plain words only here').sort(), []);
});

test('a sentence with only an identifier is an "identifier" claim', () => {
  assert.deepEqual(one('Call widget_share to get a link.').types, ['identifier']);
});

test('duplicate sentences on one page collapse, case-insensitively', () => {
  const c = claimsFor('<p>Deleted widgets are kept for 30 days.</p><p>deleted widgets are kept for 30 days.</p><ul><li>Deleted widgets are kept for 30 days.</li></ul>');
  assert.equal(c.length, 1);
});

test('the same sentence on two different pages yields two claims', () => {
  const html = '<p>Deleted widgets are kept for 30 days.</p>';
  const c = extractClaims([page('/widgets/a', html), page('/widgets/b', html)]);
  assert.equal(c.length, 2);
  assert.notEqual(c[0].id, c[1].id);
});

test('pages with a status other than 200 are ignored', () => {
  const html = '<p>Deleted widgets are kept for 30 days.</p>';
  assert.equal(extractClaims([page('/a', html, 404), page('/b', html, 301), page('/c', html, 500)]).length, 0);
});

test('plain text pages without blocks are read line by line', () => {
  const c = extractClaims([{ path: '/t', status: 200, text: 'Deleted widgets are kept for 30 days.\nNothing else to see here at all.' }]);
  assert.equal(c.length, 1);
});

test('every claim is reported, never self-evidence, and not run', () => {
  const c = claimsFor('<p>Deleted widgets are kept for 30 days.</p><p>Run widget_create to start a new one.</p><p>Acme Widgets requires version 2.3 or later.</p>');
  assert.ok(c.length >= 3);
  for (const x of c) {
    assert.equal(x.posture, 'reported');
    assert.equal(x.selfEvidence, false);
    assert.equal(x.verification.result, 'not-run');
    assert.equal(x.verification.method, null);
    assert.match(x.verification.label, /documented only/);
  }
});

test('risk is high for defaults, limits, retention, and absolutes, and normal otherwise', () => {
  assert.equal(one('Deleted widgets are kept for 30 days and then deleted.').risk, 'high');
  assert.equal(one('Run widget_create to start a new one.').risk, 'normal');
});

// ---- attachEvidence ----

const cand = (name, extractorId, { terms = [], file = 'src/widgets.js', line = 3 } = {}) => ({
  id: `cand_${name}`, name, kinds: ['tool'], terms, provenance: [{ extractor: { id: extractorId, version: 1 }, file, line }],
});
const withEvidence = (sentence, candidates, signals) => attachEvidence([one(sentence)], candidates, signals)[0];

test('an identifier that matches a code candidate is partial, static, and source-attested, never confirmed', () => {
  for (const ex of ['code-tool-definition', 'repo-manifest', 'wp-hook']) {
    const c = withEvidence('Call widget_create to make a widget.', [cand('widget_create', ex)]);
    assert.equal(c.verification.result, 'partial', ex);
    assert.equal(c.verification.method, 'static', ex);
    assert.match(c.verification.label, /^source-attested/, ex);
    assert.notEqual(c.verification.result, 'confirmed');
    assert.ok(!/confirmed/.test(c.verification.label));
    assert.equal(c.verification.sources[0].where[0], 'src/widgets.js:3');
  }
});

test('a code candidate matches through its terms and case-insensitively', () => {
  const c = withEvidence('Call widget_create to make a widget.', [cand('Create Widget', 'code-tool-definition', { terms: ['Widget_Create'] })]);
  assert.equal(c.verification.result, 'partial');
});

test('an identifier that matches only a changelog or doc candidate gets no source evidence', () => {
  const c = withEvidence('Call widget_share to get a link.', [cand('widget_share', 'doc-item'), cand('widget_share', 'doc-changeset')]);
  assert.equal(c.verification.result, 'not-run');
  assert.match(c.verification.label, /documented only/);
  assert.equal(c.verification.sources, undefined);
});

test('the wp-readme-changelog extractor is text, not code, so it gives no source evidence', () => {
  const c = withEvidence('Call widget_share to get a link.', [cand('widget_share', 'wp-readme-changelog')]);
  assert.equal(c.verification.result, 'not-run');
});

test('an identifier found nowhere stays unverified with a note that it is bounded by the sources supplied', () => {
  const c = withEvidence('Call widget_ghost to get a link.', [cand('widget_create', 'code-tool-definition')]);
  assert.equal(c.verification.result, 'not-run');
  const note = c.notes.join(' ');
  assert.match(note, /not found in the extracted source: widget_ghost/);
  assert.match(note, /bounded by the sources supplied/);
  assert.match(note, /not proof it does not exist/);
});

test('a claim that names an option or setting needs a consumer check and a note about finding the reader', () => {
  const c = withEvidence('The retention_days option controls how long items stay.', []);
  assert.equal(c.needsConsumerCheck, true);
  assert.ok(c.notes.some((n) => /find the reader/.test(n) && /not proof code reads it/.test(n)));
});

test('a claim with an identifier but no option word does not need a consumer check', () => {
  assert.equal(one('Call widget_share to get a link.').needsConsumerCheck, false);
  assert.equal(one('The option always applies to sharing links.').needsConsumerCheck, false, 'an option word with no identifier is not flagged');
});

test('a defined option still needs a consumer check flag, but gets no "find the reader" note', () => {
  const c = withEvidence('The retention_days option controls how long items stay.', [cand('retention_days', 'code-env-var')]);
  assert.equal(c.needsConsumerCheck, true);
  assert.equal(c.verification.result, 'partial');
  assert.ok(!c.notes.some((n) => /find the reader/.test(n)));
});

test('accuracy signal items override the label: executed is fired, static is source-attested, reported is reported', () => {
  const sentences = ['Deleted widgets are kept for 30 days.', 'Each account can hold up to 500 widgets.', 'Acme Widgets requires version 2.3 or later.'];
  const claims = extractClaims([page('/widgets/limits', sentences.map((s) => `<p>${s}</p>`).join(''))]);
  assert.equal(claims.length, 3);
  const base = { kind: 'stale-claim', page: '/widgets/limits', verifiedBy: 'tester-a', date: '2026-10-01' };
  const signals = {
    accuracy: {
      status: 'assessed',
      items: [
        { id: 'a1', ...base, claim: sentences[0], result: 'confirmed', method: 'executed' },
        { id: 'a2', ...base, claim: sentences[1], result: 'partial', method: 'static' },
        { id: 'a3', ...base, claim: sentences[2], result: 'failed', method: 'reported' },
      ],
    },
  };
  const [a, b, c] = attachEvidence(claims, [], signals);
  assert.equal(a.verification.label, 'fired');
  assert.equal(a.verification.result, 'confirmed');
  assert.equal(a.verification.recordId, 'a1');
  assert.equal(b.verification.label, 'source-attested');
  assert.equal(b.verification.method, 'static');
  assert.equal(c.verification.label, 'reported');
  assert.equal(c.verification.result, 'failed');
  assert.equal(c.verification.by, 'tester-a');
});

test('accuracy items for a different page or an unassessed accuracy signal are ignored', () => {
  const claims = claimsFor('<p>Deleted widgets are kept for 30 days.</p>', '/widgets/limits');
  const item = { id: 'a1', page: '/widgets/other', claim: 'Deleted widgets are kept for 30 days.', result: 'confirmed', method: 'executed' };
  assert.equal(attachEvidence(claims, [], { accuracy: { status: 'assessed', items: [item] } })[0].verification.result, 'not-run');
  const same = { ...item, page: '/widgets/limits' };
  assert.equal(attachEvidence(claims, [], { accuracy: { status: 'not assessed', items: [same] } })[0].verification.result, 'not-run');
});

test('attachEvidence does not mutate the input claims', () => {
  const claims = claimsFor('<p>Call widget_create to make a widget.</p>');
  attachEvidence(claims, [cand('widget_create', 'code-tool-definition')]);
  assert.equal(claims[0].verification.result, 'not-run');
  assert.equal(claims[0].notes, undefined);
});

// ---- summarizeClaims ----

test('summarizeClaims counts highRiskUnverified: high risk with a not-run or unverified result only', () => {
  const mk = (risk, result, label = 'documented only') => ({ risk, verification: { result, label } });
  const s = summarizeClaims([
    mk('high', 'not-run'),
    mk('high', 'unverified', 'reported'),
    mk('high', 'partial', 'source-attested: defined'),
    mk('high', 'confirmed', 'fired'),
    mk('normal', 'not-run'),
  ]);
  assert.equal(s.total, 5);
  assert.equal(s.highRisk, 4);
  assert.equal(s.highRiskUnverified, 2);
  assert.deepEqual(s.byResult, { 'not-run': 2, unverified: 1, partial: 1, confirmed: 1 });
  assert.equal(s.byMethodLabel['documented only'], 2);
  assert.equal(s.byMethodLabel['source-attested'], 1);
  assert.match(s.note, /Only "fired" means someone ran it/);
});

test('summarizeClaims on extracted claims: source-attested high-risk claims are no longer unverified', () => {
  const claims = extractClaims([page('/w', '<p>The retention_days setting is deleted after 30 days.</p><p>Deleted widgets are never recoverable here.</p>')]);
  const before = summarizeClaims(claims);
  const after = summarizeClaims(attachEvidence(claims, [cand('retention_days', 'code-env-var')]));
  assert.ok(before.highRiskUnverified >= 2);
  assert.equal(after.highRiskUnverified, before.highRiskUnverified - 1);
});

test('summarizeClaims on no claims is all zeros', () => {
  const s = summarizeClaims([]);
  assert.equal(s.total, 0);
  assert.equal(s.highRiskUnverified, 0);
});
