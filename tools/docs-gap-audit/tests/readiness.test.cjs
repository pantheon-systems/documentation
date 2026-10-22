'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { parseHtml } = require('../scripts/lib/html.cjs');
const { assessReadiness } = require('../scripts/lib/readiness.cjs');

const rec = (html, extra = {}) => ({ path: '/widgets/x', status: 200, ...parseHtml(`<html><head><title>T</title></head><body><main><h1>Acme Widgets</h1>${html}</main></body></html>`), ...extra });
const paras = (...ps) => ps.map((p) => `<p>${p}</p>`).join('');
const assess = (...ps) => assessReadiness(rec(paras(...ps)));

test('sentences opening with this, it, or these count as depending on prior context', () => {
  const r = assess('This is covered later in the guide.', 'It also works offline for most users.', 'These are optional settings for admins.', 'Widgets store data per account.');
  assert.equal(r.status, 'assessed');
  assert.equal(r.selfContainedness.dependsOnPriorContext, 3);
  assert.equal(r.selfContainedness.examples.length, 3);
  assert.match(r.selfContainedness.examples[0], /^This is covered/);
});

test('a sentence that only contains "this" mid-sentence does not count', () => {
  const r = assess('Widgets store data, and this is documented elsewhere.', 'The widget list shows it in a table.');
  assert.equal(r.selfContainedness.dependsOnPriorContext, 0);
});

test('vague words are counted with examples', () => {
  const r = assess('You can easily create several widgets at once.', 'Widgets simply work for various teams.', 'Run widget_create with a name.');
  assert.equal(r.specificity.vagueSentences, 2);
  assert.equal(r.specificity.examples.length, 2);
  assert.ok(r.specificity.concreteSentences >= 1);
});

test('a statistic with context and no source and no links is unsupported', () => {
  const r = assess('Sales grew 40% last year.');
  assert.equal(r.supportedClaims.statisticClaims, 1);
  assert.equal(r.supportedClaims.unsupported, 1);
  assert.match(r.supportedClaims.examples[0], /40%/);
});

test('the same statistic with "according to" is not unsupported', () => {
  const r = assess('According to the Acme annual report, sales grew 40% last year.');
  assert.equal(r.supportedClaims.statisticClaims, 1);
  assert.equal(r.supportedClaims.unsupported, 0);
});

test('the same statistic is not unsupported when the page has links', () => {
  const r = assessReadiness(rec(`${paras('Sales grew 40% last year.')}<p>See the <a href="/widgets/report">report</a>.</p>`));
  assert.equal(r.supportedClaims.statisticClaims, 1);
  assert.equal(r.supportedClaims.unsupported, 0);
});

test('a number with no statistical context is not a statistic claim', () => {
  const r = assess('Open port 8080 on the widget server.');
  assert.equal(r.supportedClaims.statisticClaims, 0);
});

test('absolutes without a qualifier are separated from absolutes with one', () => {
  const r = assess(
    'Widgets are always shared with the whole team.',
    'Widgets are always shared only on paid plans.',
    'Deleted widgets are never recovered if you purge them.',
    'Sharing always requires an editor role.',
  );
  assert.equal(r.qualifications.absoluteStatements, 4);
  assert.equal(r.qualifications.withoutQualifier, 1);
  assert.match(r.qualifications.examples[0], /whole team/);
});

test('a page with no absolutes reports zero', () => {
  const r = assess('Widgets store data per account.');
  assert.equal(r.qualifications.absoluteStatements, 0);
  assert.equal(r.qualifications.withoutQualifier, 0);
});

test('list items count as statements', () => {
  const r = assessReadiness(rec('<ul><li>It never expires for anyone.</li></ul>'));
  assert.equal(r.selfContainedness.dependsOnPriorContext, 1);
  assert.equal(r.qualifications.withoutQualifier, 1);
});

test('section headings below the title are detected', () => {
  assert.equal(assessReadiness(rec(`<h2>Limits</h2>${paras('Widgets store data per account.')}`)).preservedContext.hasSectionHeadings, true);
  assert.equal(assess('Widgets store data per account.').preservedContext.hasSectionHeadings, false);
});

test('a page without blocks is not assessed, with a reason', () => {
  const r = assessReadiness({ path: '/t', status: 200, text: 'This is only text. It has no blocks at all.' });
  assert.equal(r.status, 'not assessed');
  assert.match(r.reason, /no paragraph structure/);
  assert.equal(r.selfContainedness, undefined);
});

test('a page that was not fetched is not assessed, with a reason', () => {
  const r = assessReadiness({ path: '/gone', status: 404 });
  assert.equal(r.status, 'not assessed');
  assert.match(r.reason, /not fetched/);
});

test('BUG: a non-200 page that still carries blocks is not assessed', () => {
  // The audit pipeline filters to status 200 before calling assessReadiness (scripts/audit.cjs:85), so
  // this does not fire in a normal run. The function itself ignores page.status when blocks exist.
  const r = assessReadiness(rec(paras('This page is an error page for the widget.'), { status: 404 }));
  assert.equal(r.status, 'not assessed', 'scripts/lib/readiness.cjs:19 only checks blocks, not page.status');
});

function keysDeep(o, out = []) {
  if (Array.isArray(o)) o.forEach((x) => keysDeep(x, out));
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) { out.push(k); keysDeep(v, out); }
  return out;
}

test('the result has no numeric score, rating, or rank field', () => {
  const r = assess('This is vague. Sales grew 40% last year. Widgets are always shared with everyone.', 'You can easily do several things.');
  const bad = keysDeep(r).filter((k) => /score|rating|rank|grade|priority|visibility/i.test(k));
  assert.deepEqual(bad, []);
  assert.deepEqual(keysDeep(assessReadiness({ path: '/x', status: 404 })).filter((k) => /score|rating|rank/i.test(k)), []);
});

test('the purpose string says it is not a priority score and not an AI-visibility measure', () => {
  const r = assess('Widgets store data per account.');
  assert.match(r.purpose, /not a priority score/);
  assert.match(r.purpose, /not an AI-visibility measure/);
});

test('counts are the only numeric outputs and each is a non-negative integer', () => {
  const r = assess('This is vague. Sales grew 40% last year.');
  for (const v of [r.sentences, r.selfContainedness.dependsOnPriorContext, r.specificity.concreteSentences, r.specificity.vagueSentences, r.supportedClaims.statisticClaims, r.supportedClaims.unsupported, r.qualifications.absoluteStatements, r.qualifications.withoutQualifier]) {
    assert.ok(Number.isInteger(v) && v >= 0);
  }
});
