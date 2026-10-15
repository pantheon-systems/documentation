'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { parseHtml } = require('../scripts/lib/html.cjs');
const { buildRecord, DEFAULT_UPDATED } = require('../scripts/site-audit.cjs');
const { classifyPage } = require('../scripts/lib/classify.cjs');
const { validateProfile } = require('../scripts/lib/profile.cjs');
const { buildMatrix, bottleneck } = require('../scripts/lib/matrix.cjs');
const { dedupe } = require('../scripts/lib/candidates.cjs');
const { build, briefFor, PRIORITY_RUBRIC, bandOf } = require('../scripts/lib/recommend.cjs');

const ORIGIN = 'https://docs.example.test';

// ---- synthetic inputs (Acme Widgets) ----

function page(pathname, title, body) {
  const url = `${ORIGIN}${pathname}`;
  const html = `<!doctype html><html><head><title>${title}</title></head><body><main><h1>${title}</h1>${body}</main></body></html>`;
  return buildRecord({ url }, { status: 200, url }, parseHtml(html), DEFAULT_UPDATED);
}

const HOWTO_BODY = '<h2>Prerequisites</h2><p>An account. Before you begin, verify you can sign in.</p><h2>Steps</h2><ol><li>Open the dashboard.</li><li>Choose the widget.</li><li>Select Save.</li></ol><h2>Verify</h2><p>The widget appears in the list.</p>';
const BULLET_BODY = '<h2>Prerequisites</h2><p>An account. Before you begin, verify you can sign in.</p><ul><li>Open the dashboard.</li><li>Choose the widget.</li><li>Select Save.</li></ul>';
const refPage = (...ids) => page('/widgets/api-reference', 'Widgets API reference', ids.map((id) => `<h2>${id}</h2><table><tr><th>Parameter</th><th>Type</th></tr><tr><td>name</td><td>string</td></tr></table><p>Returns the widget. Accepts a name.</p>`).join(''));
const howto = (slug, title, links = '') => page(`/widgets/${slug}`, title, `${HOWTO_BODY}${links}`);
const home = (...slugs) => page('/widgets', 'Widgets', `<p>${slugs.map((s) => `<a href="/widgets/${s}">${s}</a>`).join(' ')}</p>`);

function mkProfile({ tasks = [], owner = 'docs-team', release, authority, priority, environments } = {}) {
  const input = {
    schemaVersion: 1,
    area: { id: 'widgets', name: 'Acme Widgets', ...(owner ? { owner } : {}), audience: ['site-manager'] },
    site: { origin: ORIGIN },
    scope: { crawl: { include: ['/widgets/**'] }, report: { include: ['/widgets/**'] } },
    tasks,
    release,
    authority,
    priority,
    environments,
  };
  const r = validateProfile(input, { baseDir: __dirname });
  assert.equal(r.ok, true, JSON.stringify(r.errors));
  return r.profile;
}

const T = (id, terms, extra = {}) => ({ id, title: `Task ${id}`, stage: 'operate', audience: 'site-manager', terms, expectedTypes: ['how-to'], ...extra });

function cand(name, status = 'shipped', kind = 'tool') {
  const c = dedupe([{ name, kind, status, source: `src/${name}.cjs`, provenance: { posture: 'observed', confidence: 'high', sourceId: 'node-repo', file: `src/${name}.cjs`, extractor: { id: 'js-exports' }, status } }], { areaId: 'widgets' })[0];
  return { ...c, coverage: { rating: 'Mention' } };
}

const DIMS = ['tasks', 'demand', 'search', 'release', 'accuracy', 'risk', 'integration', 'accessibility', 'governance'];
const unassessed = (dimension) => ({ status: 'not assessed', dimension, reason: 'no input declared in the profile', retrievalRequest: `Export ${dimension} data for the Acme Widgets area` });
const sig = (over = {}) => {
  const out = { audience: { status: 'assessed', dimension: 'audience' }, docTypes: { status: 'assessed', dimension: 'docTypes' } };
  for (const d of DIMS) out[d] = unassessed(d);
  return { ...out, ...over };
};
const src = (c) => ({ file: `inputs/${c}.json`, sha256: c.padEnd(64, c[0]), retrievedAt: '2026-10-01', system: 'synthetic' });
const demandSig = (byTask) => ({ status: 'assessed', dimension: 'demand', summary: { byTask }, source: src('demand') });
const releaseSig = (byFeature) => ({ status: 'assessed', dimension: 'release', summary: { byFeature }, source: src('release') });
const walkSig = (byTask) => ({ status: 'assessed', dimension: 'tasks', summary: { byTask }, source: src('tasks') });
const riskSig = (byTask, items = []) => ({ status: 'assessed', dimension: 'risk', summary: { byTask }, items, source: src('risk') });
const accSig = (items) => ({ status: 'assessed', dimension: 'accuracy', summary: { byPage: {} }, items, source: src('accuracy') });
const dem = (threads) => ({ items: threads, uniqueThreads: threads, uniqueRequesters: null, firstSeen: '2026-08-01', lastSeen: '2026-09-20' });
const GA = { status: 'ga', publicEvidence: 'https://docs.example.test/releases/3-2' };

function scenario(o = {}) {
  const profile = mkProfile(o);
  const pages = o.pages || [];
  const classifications = pages.map(classifyPage);
  const inventory = 'inventory' in o ? o.inventory : { complete: true };
  const signals = o.signals || sig();
  const matrix = buildMatrix({ profile, pages, classifications, health: o.health, signals, inventory });
  matrix.bottleneck = bottleneck(matrix, signals, o.releaseByTask || {});
  const recs = build({ profile, matrix, candidates: o.candidates || [], signals, health: o.health, claims: o.claims || [], classifications, decisions: o.decisions || [], inventory });
  return { profile, matrix, recs, signals };
}

const forTask = (recs, id) => recs.filter((r) => r.task === id);
const one = (recs, id) => {
  const list = forTask(recs, id);
  assert.equal(list.length, 1, `expected one lead for ${id}, got ${list.map((r) => r.action)}`);
  return list[0];
};

// The standard gap: widget_restore is only named on a reference page.
const RECOVER = T('recover-deleted-widget', ['widget_restore'], { title: 'Recover a deleted widget' });
const gapScenario = (over = {}) => scenario({
  tasks: [RECOVER],
  pages: [refPage('widget_restore')],
  candidates: [cand('widget_restore')],
  signals: sig({ demand: demandSig({ 'recover-deleted-widget': dem(4) }), release: releaseSig({ widget_restore: GA }) }),
  ...over,
});

// ---- (1) to (6): the action gates ----

test('(1) a feature mention in a reference page still leaves a task gap: create a how-to', () => {
  const s = gapScenario();
  assert.equal(s.matrix.tasks[0].status, 'mention-only');
  const r = one(s.recs, 'recover-deleted-widget');
  assert.equal(r.action, 'create');
  assert.equal(r.docType, 'how-to');
  assert.equal(r.briefEligible, true);
  assert.equal(r.release.state, 'public');
  assert.match(r.why, /a mention does not document a task/);
  assert.ok(r.evidence.some((e) => e.kind === 'demand'));
  assert.ok(r.evidence.some((e) => e.kind === 'source'));
  assert.equal(r.searchBoundary.inventoryComplete, true);
  assert.ok(r.existingDocs.some((d) => d.path === '/widgets/api-reference'), 'the mentioning page is listed, not duplicated');
});

test('(2) a covered task whose page is an orphan is a discoverability lead, not a create lead', () => {
  const s = scenario({
    tasks: [T('create-widget', ['create a widget'], { stage: 'build' })],
    pages: [howto('create-widget', 'Create a widget')],
    health: { links: { orphans: ['/widgets/create-widget'], onlyViaNavigation: [] } },
  });
  const r = one(s.recs, 'create-widget');
  assert.equal(r.action, 'improve-discoverability');
  assert.equal(r.docType, null);
  assert.match(r.why, /orphan/);
  assert.match(r.proposedJudgment.text, /Do not write a new page/);
  assert.match(r.closureTest, /search for the task terms returns it/);
  assert.ok(!s.recs.some((x) => x.action === 'create'));
});

test('(2) a covered task with no-result searches is also a discoverability lead', () => {
  const s = scenario({
    tasks: [T('create-widget', ['create a widget'], { stage: 'build' })],
    pages: [howto('create-widget', 'Create a widget'), home('create-widget')],
    signals: sig({ search: { status: 'assessed', dimension: 'search', summary: { byTask: { 'create-widget': { noResultQueries: 3 } } }, source: src('search') } }),
  });
  const r = one(s.recs, 'create-widget');
  assert.equal(r.action, 'improve-discoverability');
  assert.match(r.why, /3 no-result searches/);
});

test('(3) unavailable evidence: the lead is "investigate", never create, and unknown demand is not zero', () => {
  const s = scenario({ tasks: [RECOVER], pages: [refPage('widget_restore')], candidates: [], signals: sig() });
  const r = one(s.recs, 'recover-deleted-widget');
  assert.equal(r.action, 'investigate');
  assert.ok(!s.recs.some((x) => x.action === 'create'));
  assert.deepEqual(r.unavailableEvidence.map((u) => u.dimension).sort(), ['demand', 'release', 'search', 'tasks']);
  for (const u of r.unavailableEvidence) assert.equal(u.request, `Export ${u.dimension} data for the Acme Widgets area`);
  assert.deepEqual(r.demandSummary, { band: 'unknown' });
  assert.ok(!JSON.stringify(r).includes('"uniqueThreads"'), 'no demand count is invented');
  assert.equal(r.priority.tier, null);
  assert.match(r.priority.rationale, /unprioritized/);
  assert.match(r.nextValidation, /^Retrieve: /);
  assert.match(r.nextValidation, /Export demand data/);
  assert.equal(r.confidence, 'low');
});

test('(3) with a source candidate but no release or demand signal, the default profile still does not create', () => {
  const s = scenario({ tasks: [RECOVER], pages: [refPage('widget_restore')], candidates: [cand('widget_restore')], signals: sig() });
  const r = one(s.recs, 'recover-deleted-widget');
  assert.equal(r.action, 'investigate');
  assert.equal(r.release.state, 'unknown');
  assert.equal(r.demandSummary.band, 'unknown');
  assert.ok(r.unavailableEvidence.length >= 4);
});

test('(4) planned, beta, or flagged features without public evidence: no-action with createAfterShip, never create', () => {
  for (const status of ['planned', 'beta', 'flagged']) {
    const s = gapScenario({ signals: sig({ demand: demandSig({ 'recover-deleted-widget': dem(5) }), release: releaseSig({ widget_restore: { status, publicEvidence: null } }) }) });
    const r = one(s.recs, 'recover-deleted-widget');
    assert.equal(r.action, 'no-action', status);
    assert.equal(r.createAfterShip, true, status);
    assert.equal(r.release.state, 'not public', status);
    assert.match(r.why, /not public yet/, status);
    assert.match(r.proposedJudgment.text, /after the feature ships/, status);
    assert.equal(r.priority.tier, null, status);
    assert.ok(!s.recs.some((x) => x.action === 'create'), status);
  }
});

test('(4) a planned feature in source text with no release signal is also not due', () => {
  const s = gapScenario({ candidates: [cand('widget_restore', 'planned')], signals: sig({ demand: demandSig({ 'recover-deleted-widget': dem(5) }) }) });
  const r = one(s.recs, 'recover-deleted-widget');
  assert.equal(r.action, 'no-action');
  assert.equal(r.createAfterShip, true);
  assert.match(r.release.basis, /source text says planned/);
});

test('(4) a release signal of ga with publicEvidence makes the feature public; ga without it does not', () => {
  const withEvidence = one(gapScenario().recs, 'recover-deleted-widget');
  assert.equal(withEvidence.release.state, 'public');
  assert.equal(withEvidence.action, 'create');
  const without = gapScenario({ signals: sig({ demand: demandSig({ 'recover-deleted-widget': dem(4) }), release: releaseSig({ widget_restore: { status: 'ga', publicEvidence: null } }) }) });
  const r = one(without.recs, 'recover-deleted-widget');
  assert.notEqual(r.release.state, 'public');
  assert.notEqual(r.action, 'create');
});

test('(4) with publicEvidenceRequired true, "shipped in source" alone is release unknown, so investigate', () => {
  const s = gapScenario({ release: { publicEvidenceRequired: true }, signals: sig({ demand: demandSig({ 'recover-deleted-widget': dem(4) }) }) });
  const r = one(s.recs, 'recover-deleted-widget');
  assert.equal(r.release.state, 'unknown');
  assert.match(r.release.basis, /no public release evidence/);
  assert.equal(r.action, 'investigate');
  assert.match(r.priority.rationale, /release state is unknown/);
});

test('(4) with publicEvidenceRequired false, "shipped in source" counts as public', () => {
  const s = gapScenario({ release: { publicEvidenceRequired: false }, signals: sig({ demand: demandSig({ 'recover-deleted-widget': dem(4) }) }) });
  const r = one(s.recs, 'recover-deleted-widget');
  assert.equal(r.release.state, 'public');
  assert.equal(r.action, 'create');
});

test('(5) sufficient existing coverage is an explicit no-action decision, with no create lead for the task', () => {
  const s = scenario({
    tasks: [T('create-widget', ['create a widget'], { stage: 'build' })],
    pages: [howto('create-widget', 'Create a widget'), home('create-widget')],
  });
  const r = one(s.recs, 'create-widget');
  assert.equal(r.action, 'no-action');
  assert.equal(r.priority.tier, null);
  assert.match(r.why, /serves "Task create-widget"/);
  assert.match(r.proposedJudgment.text, /existing coverage serves this reader need/);
  assert.match(r.closureTest, /evidence hash/);
  assert.ok(!r.createAfterShip, 'covered is not "create after ship"');
  assert.ok(!s.recs.some((x) => x.task === 'create-widget' && x.action === 'create'));
});

test('(6) an incomplete inventory turns the same gap into an investigation, because create states an absence', () => {
  const complete = one(gapScenario().recs, 'recover-deleted-widget');
  assert.equal(complete.action, 'create');
  const s = gapScenario({ inventory: { complete: false, reasons: ['crawl stopped early'] } });
  const r = one(s.recs, 'recover-deleted-widget');
  assert.equal(r.action, 'investigate');
  assert.match(r.why, /inventory is incomplete/);
  assert.equal(r.searchBoundary.inventoryComplete, false);
  assert.ok(!s.recs.some((x) => x.action === 'create'));
});

test('partial coverage with public release and evidence is an update lead for the existing page', () => {
  const s = scenario({
    tasks: [T('tune-widget', ['widget_tune'], { stage: 'build' })],
    pages: [page('/widgets/tune-widget', 'Tune a widget (widget_tune)', BULLET_BODY)],
    candidates: [cand('widget_tune')],
    signals: sig({ release: releaseSig({ widget_tune: GA }), demand: demandSig({ 'tune-widget': dem(2) }) }),
  });
  assert.equal(s.matrix.tasks[0].status, 'partial');
  const r = one(s.recs, 'tune-widget');
  assert.equal(r.action, 'update');
  assert.match(r.proposedJudgment.text, /Update \/widgets\/tune-widget/);
});

// ---- (7) accuracy ----

test('(7) failed accuracy items become an update lead per page, with evidence posture by method', () => {
  const items = [
    { id: 'acc-1', kind: 'example', page: '/widgets/create-widget', claim: 'Run widget_create with a name', result: 'failed', method: 'executed' },
    { id: 'acc-2', kind: 'ui-label', page: '/widgets/share', claim: 'The button says Share', result: 'not-found', method: 'static' },
    { id: 'acc-3', kind: 'example', page: '/widgets/ok', claim: 'Fine', result: 'confirmed', method: 'executed' },
  ];
  const s = scenario({ pages: [home()], signals: sig({ accuracy: accSig(items) }) });
  const updates = s.recs.filter((r) => r.action === 'update');
  assert.deepEqual(updates.map((r) => r.page).sort(), ['/widgets/create-widget', '/widgets/share']);
  const executed = updates.find((r) => r.page === '/widgets/create-widget');
  assert.equal(executed.kind, 'accuracy');
  assert.equal(executed.evidence[0].posture, 'reproduced');
  assert.equal(executed.evidence[0].hash, s.signals.accuracy.source.sha256);
  assert.equal(executed.confidence, 'high');
  const staticOnly = updates.find((r) => r.page === '/widgets/share');
  assert.equal(staticOnly.evidence[0].posture, 'observed', 'a static check is not reproduction');
  assert.equal(staticOnly.confidence, 'medium');
  assert.ok(!s.recs.some((r) => r.page === '/widgets/ok'));
});

test('(7) a product defect is a separate product-issue lead and never a docs update', () => {
  const items = [
    { id: 'acc-4', kind: 'api-behavior', page: '/widgets/api-reference', claim: 'name is optional', result: 'failed', method: 'executed', productDefect: true },
    { id: 'acc-5', kind: 'example', page: '/widgets/create-widget', claim: 'Run widget_create', result: 'failed', method: 'executed' },
  ];
  const s = scenario({ pages: [home()], signals: sig({ accuracy: accSig(items) }) });
  const product = s.recs.filter((r) => r.action === 'product-issue');
  assert.equal(product.length, 1);
  assert.equal(product[0].page, '/widgets/api-reference');
  assert.equal(product[0].kind, 'product');
  assert.match(product[0].why, /product question/);
  assert.match(product[0].proposedJudgment.text, /Do not rewrite the docs to match a defect/);
  assert.equal(product[0].priority.tier, null);
  assert.ok(!s.recs.some((r) => r.action === 'update' && r.page === '/widgets/api-reference'), 'no docs update for the defect page');
  assert.ok(s.recs.some((r) => r.action === 'update' && r.page === '/widgets/create-widget'), 'the ordinary failure still gets its update lead');
});

// ---- (8), (9) governance and claims ----

test('(8) duplicate titles become a consolidate lead and date conflicts become a validate lead', () => {
  const health = {
    links: { orphans: [], onlyViaNavigation: [] },
    governance: {
      duplicateTitles: [{ title: 'Widgets overview', paths: ['/widgets/a', '/widgets/b'] }],
      dateConflicts: [{ path: '/widgets/stale', visible: '2019-03-01', embedded: '2026-09-01', lastmod: null }],
    },
  };
  const s = scenario({ pages: [home()], health });
  const consolidate = s.recs.filter((r) => r.action === 'consolidate');
  assert.equal(consolidate.length, 1);
  assert.deepEqual(consolidate[0].existingDocs.map((d) => d.path), ['/widgets/a', '/widgets/b']);
  assert.match(consolidate[0].why, /share the title "Widgets overview"/);
  assert.equal(consolidate[0].kind, 'governance');
  const validate = s.recs.filter((r) => r.action === 'validate');
  assert.equal(validate.length, 1);
  assert.equal(validate[0].page, '/widgets/stale');
  assert.match(validate[0].why, /2019-03-01/);
  assert.match(validate[0].why, /2026-09-01/);
});

test('(9) high-risk unverified claims give one validate lead per page, listing claim ids', () => {
  const claims = [
    { id: 'cl-1', page: '/widgets/create-widget', risk: 'high', text: 'Deleted widgets are kept for 30 days.', verification: { result: 'not-run' } },
    { id: 'cl-2', page: '/widgets/create-widget', risk: 'high', text: 'Only owners can delete a widget.', verification: { result: 'unverified' } },
    { id: 'cl-3', page: '/widgets/share', risk: 'high', text: 'Links never expire.', verification: { result: 'not-run' } },
    { id: 'cl-4', page: '/widgets/share', risk: 'high', text: 'Limit is 10 widgets.', verification: { result: 'confirmed' } },
    { id: 'cl-5', page: '/widgets/other', risk: 'low', text: 'Widgets are blue.', verification: { result: 'not-run' } },
  ];
  const s = scenario({ pages: [home()], claims });
  const leads = s.recs.filter((r) => r.kind === 'claims');
  assert.equal(leads.length, 2);
  assert.ok(leads.every((r) => r.action === 'validate'));
  assert.deepEqual(leads.find((r) => r.page === '/widgets/create-widget').claimIds, ['cl-1', 'cl-2']);
  assert.deepEqual(leads.find((r) => r.page === '/widgets/share').claimIds, ['cl-3'], 'a confirmed claim is not listed');
  assert.ok(!leads.some((r) => r.page === '/widgets/other'), 'low-risk claims are not validate leads');
});

// ---- (10) priority rubric ----

const tierOf = (s, id) => one(s.recs, id).priority;
const FIRST_WIN = T('first-win', ['quickstart-never-written'], { stage: 'start', title: 'First win' });
const gapWith = (task, extra = {}, demandThreads = 4) => scenario({
  tasks: [FIRST_WIN, task],
  pages: [refPage('widget_restore')],
  candidates: [cand('widget_restore')],
  signals: sig({ demand: demandSig({ [task.id]: dem(demandThreads) }), release: releaseSig({ widget_restore: GA }) }),
  ...extra,
});

test('(10) the rubric documents P1 to P4 and the unknown rule', () => {
  assert.deepEqual(Object.keys(PRIORITY_RUBRIC.tiers), ['P1', 'P2', 'P3', 'P4', 'unprioritized']);
  assert.match(PRIORITY_RUBRIC.tiers.P1, /public release AND a required task/);
  assert.match(PRIORITY_RUBRIC.tiers.P3, /coverage evidence alone/);
  assert.match(PRIORITY_RUBRIC.tiers.P4, /optional task/);
  assert.match(PRIORITY_RUBRIC.unknown, /never counts as low or zero/);
});

test('(10) bandOf: repeated is 3 or more unique threads, some is 1 or 2, none is 0, unknown is unassessed', () => {
  assert.equal(bandOf(null), 'unknown');
  assert.equal(bandOf(undefined), 'unknown');
  assert.equal(bandOf({ uniqueThreads: 0 }), 'none');
  assert.equal(bandOf({ uniqueThreads: 1 }), 'some');
  assert.equal(bandOf({ uniqueThreads: 2 }), 'some');
  assert.equal(bandOf({ uniqueThreads: 3 }), 'repeated');
  assert.equal(bandOf({ uniqueThreads: 2 }, { repeated: 2 }), 'repeated');
});

test('(10) P1: public, required, first unmet stage, repeated demand', () => {
  const s = scenario({
    tasks: [RECOVER],
    pages: [refPage('widget_restore')],
    candidates: [cand('widget_restore')],
    signals: sig({ demand: demandSig({ 'recover-deleted-widget': dem(3) }), release: releaseSig({ widget_restore: GA }) }),
  });
  assert.equal(s.matrix.bottleneck.stage, 'operate');
  const p = tierOf(s, 'recover-deleted-widget');
  assert.equal(p.tier, 'P1');
  assert.equal(p.factors.demand, 'repeated');
  assert.match(p.rationale, /\(first unmet\)/);
});

test('(10) P1: public, required, high operational risk, and a blocked walkthrough, even when not the first stage', () => {
  const s = gapWith(RECOVER, {
    signals: sig({
      release: releaseSig({ widget_restore: GA }),
      risk: riskSig({ 'recover-deleted-widget': [{ id: 'risk-1', category: 'destructive', publicSafe: true }] }),
      tasks: walkSig({ 'recover-deleted-widget': [{ result: 'blocked', blockedAt: 'step 2', performedBy: 'tester-1', date: '2026-09-01' }] }),
    }),
  });
  assert.equal(s.matrix.bottleneck.stage, 'start', 'an earlier stage is the first unmet one');
  const p = tierOf(s, 'recover-deleted-widget');
  assert.equal(p.tier, 'P1');
  assert.equal(p.factors.risk, 'high');
  assert.equal(p.factors.walkthrough, 'blocked');
});

test('(10) P2: repeated demand without being the first unmet stage or high risk', () => {
  const s = gapWith(RECOVER);
  assert.equal(s.matrix.bottleneck.stage, 'start');
  const p = tierOf(s, 'recover-deleted-widget');
  assert.equal(p.tier, 'P2');
  assert.equal(p.factors.demand, 'repeated');
});

test('(10) P2: some demand at the first unmet stage is not P1', () => {
  const s = scenario({
    tasks: [RECOVER],
    pages: [refPage('widget_restore')],
    candidates: [cand('widget_restore')],
    signals: sig({ demand: demandSig({ 'recover-deleted-widget': dem(2) }), release: releaseSig({ widget_restore: GA }) }),
  });
  const p = tierOf(s, 'recover-deleted-widget');
  assert.equal(p.factors.demand, 'some');
  assert.equal(p.tier, 'P2');
});

test('(10) P2: high operational risk alone, without demand or a blocked walkthrough, is not P1', () => {
  const s = gapWith(RECOVER, {
    signals: sig({
      release: releaseSig({ widget_restore: GA }),
      risk: riskSig({ 'recover-deleted-widget': [{ id: 'risk-1', category: 'security', publicSafe: true }] }),
    }),
  });
  assert.equal(tierOf(s, 'recover-deleted-widget').tier, 'P2');
});

test('(10) P3: public and required on coverage evidence alone, with unknown factors listed and not counted as low', () => {
  const s = gapWith(RECOVER, { signals: sig({ release: releaseSig({ widget_restore: GA }) }) });
  const p = tierOf(s, 'recover-deleted-widget');
  assert.equal(p.tier, 'P3');
  assert.equal(p.factors.demand, 'unknown');
  assert.equal(p.factors.walkthrough, 'unknown');
  assert.equal(p.factors.risk, 'unknown');
  assert.match(p.rationale, /Unknown, not counted as low: demand, risk, walkthrough/);
  assert.ok(!/demand (none|low)/.test(p.rationale));
});

test('(10) P4: an optional public task', () => {
  const s = gapWith(T('recover-deleted-widget', ['widget_restore'], { required: false }));
  const p = tierOf(s, 'recover-deleted-widget');
  assert.equal(p.tier, 'P4');
  assert.match(p.rationale, /optional task/);
});

test('(10) demand that is "none" (zero unique threads) is recorded as none, not unknown', () => {
  const s = gapWith(RECOVER, { signals: sig({ demand: demandSig({ 'recover-deleted-widget': dem(0) }), release: releaseSig({ widget_restore: GA }) }) });
  const r = one(s.recs, 'recover-deleted-widget');
  assert.equal(r.demandSummary.band, 'none');
  assert.equal(r.priority.factors.demand, 'none');
});

test('(10) not-yet-public and investigation leads get no tier', () => {
  const s = gapWith(RECOVER, { signals: sig({ release: releaseSig({ widget_restore: { status: 'beta' } }) }) });
  assert.equal(tierOf(s, 'recover-deleted-widget').tier, null);
});

test('BUG: a repeated-demand threshold set in the profile (priority.demandBands) is honored', () => {
  const s = scenario({
    tasks: [RECOVER],
    pages: [refPage('widget_restore')],
    candidates: [cand('widget_restore')],
    priority: { demandBands: { repeated: 2 } },
    signals: sig({ demand: demandSig({ 'recover-deleted-widget': dem(2) }), release: releaseSig({ widget_restore: GA }) }),
  });
  assert.equal(one(s.recs, 'recover-deleted-widget').demandSummary.band, 'repeated');
});

// ---- (11) tie-breaking ----

test('(11) shuffling tasks, candidates, and pages does not change the order of recommendation ids', () => {
  const tasks = [
    T('op-a', ['widget_a_op']),
    T('op-b', ['widget_b_op']),
    T('op-c', ['create a widget c'], { stage: 'build' }),
    T('op-d', ['rotate a token']),
    T('op-e', ['widget_e_op'], { required: false }),
    T('op-f', ['widget_f_op'], { stage: 'start' }),
  ];
  const candidates = ['widget_a_op', 'widget_b_op', 'widget_e_op', 'widget_f_op'].map((n) => cand(n));
  const pages = [refPage('widget_a_op', 'widget_b_op', 'widget_e_op', 'widget_f_op'), howto('create-widget-c', 'Create a widget c'), home('create-widget-c')];
  const signals = sig({
    demand: demandSig({ 'op-a': dem(4), 'op-b': dem(4), 'op-e': dem(1), 'op-f': dem(2) }),
    release: releaseSig({ widget_a_op: GA, widget_b_op: GA, widget_e_op: GA, widget_f_op: GA }),
  });
  const ids = (t, c, p) => scenario({ tasks: t, candidates: c, pages: p, signals }).recs.map((r) => r.id);
  const base = ids(tasks, candidates, pages);
  assert.ok(base.length >= 6);
  assert.equal(new Set(base).size, base.length, 'ids are unique');
  const rotate = (list, n) => [...list.slice(n), ...list.slice(0, n)];
  const variants = [
    [[...tasks].reverse(), candidates, pages],
    [tasks, [...candidates].reverse(), [...pages].reverse()],
    [rotate(tasks, 2), rotate(candidates, 1), rotate(pages, 1)],
    [rotate(tasks, 4), rotate(candidates, 3), pages],
  ];
  for (const [t, c, p] of variants) assert.deepEqual(ids(t, c, p), base);
  // op-a and op-b tie on every ranking key, so the id decides, in ascending order.
  const full = scenario({ tasks, candidates, pages, signals }).recs;
  const a = full.find((r) => r.task === 'op-a');
  const b = full.find((r) => r.task === 'op-b');
  assert.equal(a.priority.tier, b.priority.tier);
  const [first, second] = a.id.localeCompare(b.id) < 0 ? [a, b] : [b, a];
  assert.ok(full.indexOf(first) < full.indexOf(second));
});

// ---- (12) required fields ----

function kitchenSink(over = {}) {
  const tasks = [
    T('recover-deleted-widget', ['widget_restore'], { title: 'Recover a deleted widget', effortHint: 'small' }),
    T('create-widget', ['create a widget'], { stage: 'build' }),
    T('share-widget', ['share a widget'], { stage: 'build' }),
    T('archive-widget', ['widget_archive']),
    T('rotate-token', ['rotate a token']),
    T('tune-widget', ['widget_tune'], { stage: 'build' }),
  ];
  const pages = [
    home('share-widget', 'create-widget'),
    refPage('widget_restore'),
    howto('create-widget', 'Create a widget'),
    howto('share-widget', 'Share a widget'),
    page('/widgets/tune-widget', 'Tune a widget (widget_tune)', BULLET_BODY),
  ];
  const signals = sig({
    demand: demandSig({ 'recover-deleted-widget': dem(4), 'tune-widget': dem(1) }),
    release: releaseSig({ widget_restore: GA, widget_archive: { status: 'beta' }, widget_tune: GA }),
    accuracy: accSig([
      { id: 'acc-1', kind: 'example', page: '/widgets/create-widget', claim: 'Run widget_create', result: 'failed', method: 'executed' },
      { id: 'acc-2', kind: 'api-behavior', page: '/widgets/api-reference', claim: 'name is optional', result: 'failed', method: 'executed', productDefect: true },
    ]),
  });
  return scenario({
    tasks,
    pages,
    candidates: [cand('widget_restore'), cand('widget_archive'), cand('widget_tune')],
    signals,
    health: {
      links: { orphans: ['/widgets/create-widget'], onlyViaNavigation: [] },
      governance: { duplicateTitles: [{ title: 'Widgets', paths: ['/widgets/a', '/widgets/b'] }], dateConflicts: [{ path: '/widgets/stale', visible: '2019-03-01', embedded: '2026-09-01' }] },
    },
    claims: [{ id: 'cl-1', page: '/widgets/share-widget', risk: 'high', text: 'Links never expire.', verification: { result: 'not-run' } }],
    ...over,
  });
}

test('(12) every recommendation has the required fields, with machine, proposed, and human kept separate', () => {
  const s = kitchenSink();
  const actions = new Set(s.recs.map((r) => r.action));
  for (const a of ['create', 'update', 'improve-discoverability', 'no-action', 'investigate', 'consolidate', 'validate', 'product-issue']) {
    assert.ok(actions.has(a), `scenario should produce a ${a} lead; got ${[...actions]}`);
  }
  assert.equal(new Set(s.recs.map((r) => r.id)).size, s.recs.length, 'ids are unique');
  for (const r of s.recs) {
    const label = `${r.action} ${r.id}`;
    assert.match(r.id, /^r_[0-9a-f]{12}$/, label);
    assert.ok(typeof r.closureTest === 'string' && r.closureTest.length > 0, `${label} closureTest`);
    assert.ok(typeof r.nextValidation === 'string' && r.nextValidation.length > 0, `${label} nextValidation`);
    assert.ok(Array.isArray(r.evidence), `${label} evidence`);
    assert.ok(['high', 'medium', 'low'].includes(r.confidence), `${label} confidence ${r.confidence}`);
    assert.equal(r.machine.heuristic, 'keyword', label);
    assert.ok('rating' in r.machine, label);
    assert.ok(typeof r.proposedJudgment.text === 'string' && r.proposedJudgment.text.length > 0, `${label} proposedJudgment`);
    assert.equal(r.human.verdict, null, `${label} human verdict is left for a person`);
    assert.equal(r.owner, 'docs-team', label);
    assert.ok(typeof r.evidenceHash === 'string' && r.evidenceHash.length > 0, label);
    assert.ok(typeof r.why === 'string' && r.why.length > 0, label);
    assert.notEqual(r.machine, r.proposedJudgment);
    assert.notEqual(r.machine, r.human);
    assert.ok(!('proposed' in r) && !('machineRating' in r), 'working fields are removed');
  }
});

test('(12) owner comes from profile.area.owner and is null, never guessed, when the profile has none', () => {
  const named = kitchenSink();
  assert.ok(named.recs.every((r) => r.owner === 'docs-team'));
  const anon = kitchenSink({ owner: null });
  assert.equal(anon.profile.area.owner, null);
  assert.ok(anon.recs.every((r) => r.owner === null));
});

test('(12) effort is "not estimated" unless the task carries an effortHint, and the hint is labeled as not ours', () => {
  const s = kitchenSink();
  const hinted = one(s.recs, 'recover-deleted-widget');
  assert.match(hinted.effort, /^small \(from the profile; not an estimate by this toolkit\)$/);
  for (const r of s.recs.filter((x) => x.task !== 'recover-deleted-widget')) assert.equal(r.effort, 'not estimated', `${r.action} ${r.id}`);
});

// ---- (13) human decisions ----

const decisionFor = (r, over = {}) => ({ kind: 'recommendation', target: r.id, verdict: 'accepted', id: 'dec-1', at: '2026-10-02', by: 'reviewer-1', evidenceHash: r.evidenceHash, ...over });

test('(13) a decision with the same evidenceHash keeps the verdict and does not need re-review', () => {
  const r0 = one(gapScenario().recs, 'recover-deleted-widget');
  const r1 = one(gapScenario({ decisions: [decisionFor(r0)] }).recs, 'recover-deleted-widget');
  assert.equal(r1.id, r0.id);
  assert.equal(r1.evidenceHash, r0.evidenceHash);
  assert.equal(r1.human.verdict, 'accepted');
  assert.equal(r1.human.decisionId, 'dec-1');
  assert.equal(r1.human.decidedBy, 'reviewer-1');
  assert.equal(r1.human.needsReReview, false);
  assert.equal(r1.human.resolvedVerified, null, 'only "resolved" is checked for verification');
});

test('(13) a decision whose evidenceHash differs sets needsReReview, and keeps the verdict', () => {
  const r0 = one(gapScenario().recs, 'recover-deleted-widget');
  const r1 = one(gapScenario({ decisions: [decisionFor(r0, { evidenceHash: 'stale-hash' })] }).recs, 'recover-deleted-widget');
  assert.equal(r1.human.verdict, 'accepted');
  assert.equal(r1.human.needsReReview, true);
  const changed = gapScenario({ signals: sig({ demand: { ...demandSig({ 'recover-deleted-widget': dem(4) }), source: { ...src('demand'), sha256: 'f'.repeat(64) } }, release: releaseSig({ widget_restore: GA }) }) });
  const r2 = one(changed.recs, 'recover-deleted-widget');
  assert.equal(r2.id, r0.id, 'same lead');
  assert.notEqual(r2.evidenceHash, r0.evidenceHash, 'a new demand export changes the evidence hash');
});

test('(13) a resolved verdict is verified only when the decision names closure.verifiedBy', () => {
  const r0 = one(gapScenario().recs, 'recover-deleted-widget');
  const bare = one(gapScenario({ decisions: [decisionFor(r0, { verdict: 'resolved' })] }).recs, 'recover-deleted-widget');
  assert.equal(bare.human.verdict, 'resolved');
  assert.equal(bare.human.resolvedVerified, false);
  const empty = one(gapScenario({ decisions: [decisionFor(r0, { verdict: 'resolved', closure: {} })] }).recs, 'recover-deleted-widget');
  assert.equal(empty.human.resolvedVerified, false);
  const verified = one(gapScenario({ decisions: [decisionFor(r0, { verdict: 'resolved', closure: { verifiedBy: 'tester-2' } })] }).recs, 'recover-deleted-widget');
  assert.equal(verified.human.resolvedVerified, true);
});

test('(13) the toolkit never fills a human verdict, and the latest decision wins', () => {
  const none = gapScenario();
  assert.ok(none.recs.every((r) => r.human.verdict === null && r.human.decisionId === null));
  const r0 = one(none.recs, 'recover-deleted-widget');
  const later = one(gapScenario({
    decisions: [
      decisionFor(r0, { id: 'dec-1', verdict: 'accepted' }),
      { kind: 'classify', page: '/widgets/api-reference', verdict: 'reference', id: 'dec-9' },
      decisionFor(r0, { id: 'dec-2', verdict: 'rejected' }),
    ],
  }).recs, 'recover-deleted-widget');
  assert.equal(later.human.verdict, 'rejected');
  assert.equal(later.human.decisionId, 'dec-2');
  const other = gapScenario({ decisions: [decisionFor(r0, { target: 'r_000000000000' })] });
  assert.equal(one(other.recs, 'recover-deleted-widget').human.verdict, null, 'a decision for another lead is ignored');
});

// ---- (14) draft briefs ----

test('(14) briefFor a create lead has the draft banner, every section, the type, and the authority order', () => {
  const s = gapScenario({ authority: { order: ['code', 'tests', 'release-notes', 'docs'] }, environments: { supported: ['v2', 'v3'] } });
  const r = one(s.recs, 'recover-deleted-widget');
  const brief = briefFor(r, s.profile, s.signals);
  assert.match(brief, /Draft brief only/);
  for (const h of ['## User outcome', '## Scope', '## Prerequisites to state', '## Authoritative sources needed', '## What to keep out', '## Validation criteria', '## Open questions']) {
    assert.ok(brief.includes(h), `missing section ${h}`);
  }
  assert.match(brief, /Proposed type: how-to/);
  assert.match(brief, /Authority order from the profile: code > tests > release-notes > docs/);
  assert.match(brief, /Supported versions or environments from the profile: v2, v3/);
  assert.match(brief, /widget_restore/);
  assert.match(brief, /no ticket has been filed/);
  assert.ok(brief.includes(r.closureTest));
});

test('(14) the brief uses the profile authority order, not a fixed one', () => {
  const s = gapScenario({ authority: { order: ['tests', 'docs'] } });
  const brief = briefFor(one(s.recs, 'recover-deleted-widget'), s.profile, s.signals);
  assert.match(brief, /Authority order from the profile: tests > docs\./);
});

test('(14) a risk item with publicSafe false makes the brief withhold the details, and never includes the note', () => {
  const note = 'Internal shard map zeta-7 is reachable from the restore path';
  const risk = riskSig({ 'recover-deleted-widget': [{ id: 'risk-1', category: 'destructive', publicSafe: false }] }, [{ id: 'risk-1', category: 'destructive', task: 'recover-deleted-widget', publicSafe: false, note }]);
  const s = gapScenario({ signals: sig({ demand: demandSig({ 'recover-deleted-widget': dem(4) }), release: releaseSig({ widget_restore: GA }), risk }) });
  const r = one(s.recs, 'recover-deleted-widget');
  assert.equal(r.action, 'create');
  const brief = briefFor(r, s.profile, s.signals);
  assert.match(brief, /1 risk item\(s\) are marked not public-safe/);
  assert.match(brief, /not to publish the details/);
  assert.match(brief, /destructive/, 'the category still shapes the warning');
  assert.ok(!brief.includes('zeta-7'), 'the risk note text must not reach the brief');
  assert.ok(!brief.includes(note));
  assert.ok(!JSON.stringify(r).includes('zeta-7'), 'nor the recommendation record');
});

test('(14) without a not-public-safe risk, the brief has no withholding line', () => {
  const risk = riskSig({ 'recover-deleted-widget': [{ id: 'risk-1', category: 'destructive', publicSafe: true }] });
  const s = gapScenario({ signals: sig({ demand: demandSig({ 'recover-deleted-widget': dem(4) }), release: releaseSig({ widget_restore: GA }), risk }) });
  const brief = briefFor(one(s.recs, 'recover-deleted-widget'), s.profile, s.signals);
  assert.ok(!/not public-safe/.test(brief));
  assert.match(brief, /Operational risks to cover with a warning, rollback, or recovery step: destructive/);
});

test('(14) briefFor lists unavailable evidence as open questions', () => {
  const s = gapScenario({ signals: sig({ release: releaseSig({ widget_restore: GA }) }) });
  const brief = briefFor(one(s.recs, 'recover-deleted-widget'), s.profile, s.signals);
  assert.match(brief, /- demand: Export demand data for the Acme Widgets area/);
});
