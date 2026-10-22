'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { parseHtml } = require('../scripts/lib/html.cjs');
const { buildRecord, DEFAULT_UPDATED } = require('../scripts/site-audit.cjs');
const { classifyPage } = require('../scripts/lib/classify.cjs');
const { validateProfile } = require('../scripts/lib/profile.cjs');
const { buildMatrix, bottleneck, assessMaturity } = require('../scripts/lib/matrix.cjs');

const ORIGIN = 'https://docs.example.test';

function page(pathname, title, body) {
  const url = `${ORIGIN}${pathname}`;
  const html = `<!doctype html><html><head><title>${title}</title></head><body><main><h1>${title}</h1>${body}</main></body></html>`;
  return buildRecord({ url }, { status: 200, url }, parseHtml(html), DEFAULT_UPDATED);
}

const HOWTO_BODY = '<h2>Prerequisites</h2><p>An account. Before you begin, verify you can sign in.</p><h2>Steps</h2><ol><li>Open the dashboard.</li><li>Choose the widget.</li><li>Select Save.</li></ol><h2>Verify</h2><p>The widget appears in the list.</p>';

function profileWith({ tasks, aliases, related, crawlExclude, release } = {}) {
  const input = {
    schemaVersion: 1,
    area: { id: 'widgets', name: 'Acme Widgets', owner: 'docs-team', audience: ['site-manager'] },
    site: { origin: ORIGIN },
    scope: {
      crawl: { include: ['/widgets/**', '/auth/**'], exclude: crawlExclude || ['/widgets/legacy/**'] },
      report: { include: ['/widgets/**'], exclude: ['/widgets/legacy/**'] },
      related: related === undefined ? [{ id: 'auth', paths: ['/auth/**'], note: 'tokens live in auth' }] : related,
    },
    vocabulary: { aliases: aliases || {}, identifiers: [] },
    tasks: tasks || [],
    release,
  };
  const r = validateProfile(input, { baseDir: __dirname });
  assert.equal(r.ok, true, JSON.stringify(r.errors));
  return r.profile;
}

const task = (id, terms, extra = {}) => ({ id, title: `Task ${id}`, stage: 'build', audience: 'site-manager', terms, expectedTypes: ['how-to'], ...extra });

function run(profile, pages, { health, signals, inventory = { complete: true } } = {}) {
  const classifications = pages.map(classifyPage);
  return buildMatrix({ profile, pages, classifications, health, signals, inventory });
}

const byId = (m, id) => m.tasks.find((t) => t.task === id);

test('(a) a how-to page with ordered steps covers a how-to task', () => {
  const profile = profileWith({ tasks: [task('create-widget', ['create a widget'])] });
  const m = run(profile, [page('/widgets/create-widget', 'Create a widget', HOWTO_BODY)]);
  const t = byId(m, 'create-widget');
  assert.equal(t.status, 'covered');
  assert.equal(t.cells.length, 1);
  assert.equal(t.cells[0].type, 'how-to');
  assert.equal(t.cells[0].status, 'covered');
  assert.deepEqual(t.cells[0].pages, ['/widgets/create-widget']);
  assert.equal(t.matched[0].hasSteps, true);
});

test('(b) a reference page that merely names the tool leaves the task mention-only, with a note', () => {
  const profile = profileWith({ tasks: [task('recover-widget', ['widget_restore'])] });
  const ref = page('/widgets/api-reference', 'Widgets API reference', '<h2>widget_create</h2><table><tr><th>Parameter</th><th>Type</th></tr><tr><td>name</td><td>string</td></tr></table><h2>widget_restore</h2><p>Restores a deleted widget.</p>');
  const m = run(profile, [ref]);
  const t = byId(m, 'recover-widget');
  assert.equal(t.status, 'mention-only');
  assert.equal(t.cells[0].status, 'mention-only');
  assert.match(t.cells[0].note, /a mention does not document a task/);
  assert.equal(t.matched.length, 1);
  assert.equal(t.matched[0].pageType, 'reference');
});

test('(c) a profile alias counts as a task term', () => {
  const linkPage = page('/widgets/link-based-access', 'Link-based access', '<h2>Steps</h2><ol><li>Open the widget you want.</li><li>Choose Get link and select Copy.</li><li>Send the link to a teammate.</li></ol>');
  const withAlias = profileWith({ tasks: [task('share-widget', ['share a widget'])], aliases: { 'share a widget': ['link-based access', 'sharing links'] } });
  const without = profileWith({ tasks: [task('share-widget', ['share a widget'])] });
  const yes = byId(run(withAlias, [linkPage]), 'share-widget');
  assert.equal(yes.status, 'covered');
  assert.ok(yes.boundary.terms.includes('link-based access'));
  const no = byId(run(without, [linkPage]), 'share-widget');
  assert.equal(no.status, 'not found');
  assert.equal(no.matched.length, 0);
});

test('(d) an excluded page is not evidence; a related-area page is, with scope related:<id>', () => {
  const profile = profileWith({ tasks: [task('create-widget', ['create a widget']), task('make-token', ['api token'], { stage: 'start' })] });
  const legacy = page('/widgets/legacy/create-widget', 'Create a widget', HOWTO_BODY);
  const tokens = page('/auth/api-tokens', 'Create an API token', '<h2>Steps</h2><ol><li>Open settings.</li><li>Select Create token.</li><li>Copy the api token.</li></ol>');
  const home = page('/widgets', 'Widgets', '<p>Welcome to Acme Widgets.</p>');
  const m = run(profile, [legacy, tokens, home]);
  const excluded = byId(m, 'create-widget');
  assert.equal(excluded.matched.length, 0, 'the legacy page must not match');
  assert.equal(excluded.status, 'not found');
  assert.equal(m.boundary.pagesExamined, 2, 'legacy page is outside the evidence scope');
  const rel = byId(m, 'make-token');
  assert.equal(rel.status, 'covered');
  assert.equal(rel.matched.length, 1);
  assert.equal(rel.matched[0].path, '/auth/api-tokens');
  assert.equal(rel.matched[0].scope, 'related:auth');
});

test('(d) an in-area page has scope "area"', () => {
  const profile = profileWith({ tasks: [task('create-widget', ['create a widget'])] });
  const m = run(profile, [page('/widgets/create-widget', 'Create a widget', HOWTO_BODY)]);
  assert.equal(byId(m, 'create-widget').matched[0].scope, 'area');
});

test('(e) tutorial and how-to are alternatives: either covers the task', () => {
  const profile = profileWith({ tasks: [task('create-widget', ['create a widget'], { expectedTypes: ['tutorial', 'how-to'] })] });
  const m = run(profile, [page('/widgets/create-widget', 'Create a widget', HOWTO_BODY)]);
  const t = byId(m, 'create-widget');
  assert.deepEqual(t.cells.map((c) => c.type), ['tutorial', 'how-to']);
  assert.equal(t.cells.find((c) => c.type === 'how-to').status, 'covered');
  assert.notEqual(t.cells.find((c) => c.type === 'tutorial').status, 'covered');
  assert.equal(t.status, 'covered', 'one of the alternatives is enough');
});

test('(e) a listed reference is separately required: the task is not covered until both groups are', () => {
  const profile = profileWith({ tasks: [task('create-widget', ['create a widget', 'widget_create'], { expectedTypes: ['how-to', 'reference'] })] });
  const howto = page('/widgets/create-widget', 'Create a widget', HOWTO_BODY);
  const ref = page('/widgets/api-reference', 'Widgets API reference', '<h2>widget_create</h2><table><tr><th>Parameter</th><th>Type</th></tr><tr><td>name</td><td>string</td></tr></table><p>Returns the widget. Accepts a name.</p>');
  const only = byId(run(profile, [howto]), 'create-widget');
  assert.equal(only.cells.find((c) => c.type === 'how-to').status, 'covered');
  assert.notEqual(only.cells.find((c) => c.type === 'reference').status, 'covered');
  assert.notEqual(only.status, 'covered');
  const both = byId(run(profile, [howto, ref]), 'create-widget');
  assert.equal(both.cells.find((c) => c.type === 'reference').status, 'covered');
  assert.equal(both.status, 'covered');
});

test('(f) a type the task does not expect produces no cell: the matrix is sparse', () => {
  const profile = profileWith({ tasks: [task('create-widget', ['create a widget', 'widget_create'], { expectedTypes: ['how-to'] })] });
  const ref = page('/widgets/api-reference', 'Widgets API reference', '<h2>widget_create</h2><table><tr><th>Parameter</th><th>Type</th></tr><tr><td>name</td><td>string</td></tr></table><p>Returns the widget. Accepts a name.</p>');
  const t = byId(run(profile, [ref]), 'create-widget');
  assert.deepEqual(t.cells.map((c) => c.type), ['how-to']);
  assert.ok(!t.cells.some((c) => c.type === 'reference'));
  assert.equal(t.status, 'mention-only', 'an unexpected type present does not cover the expected one');
});

test('(f) default expected types follow the stage when the task names none', () => {
  const profile = profileWith({ tasks: [{ id: 'evaluate-widgets', title: 'Judge fit', stage: 'evaluate', terms: ['widgets'] }] });
  const t = byId(run(profile, [page('/widgets', 'Widgets', '<p>Widgets help teams.</p>')]), 'evaluate-widgets');
  assert.deepEqual(t.expectedTypes, ['explanation']);
});

test('(g) no pages in scope is "not assessed", not "not found"', () => {
  const profile = profileWith({ tasks: [task('create-widget', ['create a widget'])] });
  for (const pages of [[], [page('/widgets/legacy/old', 'Create a widget', HOWTO_BODY)]]) {
    const t = byId(run(profile, pages), 'create-widget');
    assert.equal(t.status, 'not assessed');
    assert.match(t.reason, /no published pages in the evidence scope/);
    assert.deepEqual(t.cells, []);
  }
});

test('(g) a task with applicable:false is "not applicable"', () => {
  const profile = profileWith({ tasks: [task('create-widget', ['create a widget'], { applicable: false })] });
  const t = byId(run(profile, [page('/widgets/create-widget', 'Create a widget', HOWTO_BODY)]), 'create-widget');
  assert.equal(t.status, 'not applicable');
  assert.deepEqual(t.cells, []);
  assert.deepEqual(t.matched, []);
});

test('(h) "not found" carries a boundary; an incomplete inventory reads "not found in examined pages"', () => {
  const profile = profileWith({ tasks: [task('archive-widget', ['archive a widget'])] });
  const pages = [page('/widgets/create-widget', 'Create a widget', HOWTO_BODY), page('/widgets', 'Widgets', '<p>Welcome.</p>')];
  const complete = byId(run(profile, pages, { inventory: { complete: true } }), 'archive-widget');
  assert.equal(complete.status, 'not found');
  assert.equal(complete.cells[0].status, 'not found');
  assert.equal(complete.boundary.pagesExamined, 2);
  assert.equal(complete.boundary.inventoryComplete, true);
  assert.deepEqual(complete.boundary.terms, ['archive a widget']);
  const partial = byId(run(profile, pages, { inventory: { complete: false, reasons: ['crawl stopped at 2 pages'] } }), 'archive-widget');
  assert.equal(partial.status, 'not found in examined pages');
  assert.equal(partial.cells[0].status, 'not found in examined pages');
  assert.equal(partial.boundary.inventoryComplete, false);
  assert.deepEqual(partial.boundary.inventoryReasons, ['crawl stopped at 2 pages']);
  const missing = byId(run(profile, pages, { inventory: null }), 'archive-widget');
  assert.equal(missing.status, 'not found in examined pages', 'no inventory record means not complete');
});

test('(i) task steps get per-step statuses: mentioned, not found, not applicable', () => {
  const profile = profileWith({
    tasks: [task('configure-hooks', ['webhook'], {
      steps: [
        { id: 'setup', terms: ['install'] },
        { id: 'callback', terms: ['callback url'] },
        { id: 'retry', terms: ['retry policy'] },
      ],
    })],
  });
  const pages = [page('/widgets/webhooks', 'Webhooks', '<p>Install the client, then register a webhook.</p>')];
  const signals = { integration: { status: 'assessed', summary: { byWorkflow: { 'webhook-flow': [{ step: 'retry', applies: false, task: null }] } } } };
  const t = byId(run(profile, pages, { signals }), 'configure-hooks');
  const step = (id) => t.steps.find((s) => s.step === id);
  assert.equal(step('setup').status, 'mentioned');
  assert.deepEqual(step('setup').pages, ['/widgets/webhooks']);
  assert.equal(step('callback').status, 'not found');
  assert.equal(step('retry').status, 'not applicable');
  const incomplete = byId(run(profile, pages, { signals, inventory: { complete: false } }), 'configure-hooks');
  assert.equal(incomplete.steps.find((s) => s.step === 'callback').status, 'not found in examined pages');
  const noSignal = byId(run(profile, pages, {}), 'configure-hooks');
  assert.equal(noSignal.steps.find((s) => s.step === 'retry').status, 'not found', 'without the signal a step is not assumed not applicable');
});

test('(j) discoverability: orphan, inbound pages, depth, title term, and no-result searches', () => {
  const profile = profileWith({ tasks: [task('create-widget', ['create a widget'])] });
  const target = page('/widgets/guides/create-widget', 'Create a widget', HOWTO_BODY);
  const linkerA = page('/widgets', 'Widgets', '<p>See <a href="/widgets/guides/create-widget">creating</a>.</p>');
  const linkerB = page('/widgets/faq', 'FAQ', '<p>Also <a href="/widgets/guides/create-widget">this</a>.</p>');
  const health = { links: { orphans: ['/widgets/guides/create-widget'], onlyViaNavigation: [] } };
  const signals = { search: { status: 'assessed', summary: { byTask: { 'create-widget': { noResultQueries: 2 } } } } };
  const m = run(profile, [target, linkerA, linkerB], { health, signals });
  const d = byId(m, 'create-widget').discoverability;
  assert.equal(d.page, '/widgets/guides/create-widget');
  assert.equal(d.orphan, true);
  assert.equal(d.inboundPages, 2);
  assert.equal(d.depth, 3);
  assert.equal(d.titleHasTerm, true);
  assert.equal(d.searchNoResults, 2);
  const plain = byId(run(profile, [target, linkerA, linkerB]), 'create-widget').discoverability;
  assert.equal(plain.orphan, false);
  assert.equal(plain.searchNoResults, 0);
});

test('(j) a page nothing links to has 0 inbound pages, and a body-only match has titleHasTerm false', () => {
  const profile = profileWith({ tasks: [task('create-widget', ['create a widget'])] });
  const lone = page('/widgets/quickstart', 'Quickstart', `<p>Here you create a widget.</p>${HOWTO_BODY}`);
  const d = byId(run(profile, [lone]), 'create-widget').discoverability;
  assert.equal(d.inboundPages, 0);
  assert.equal(d.titleHasTerm, false);
  assert.equal(d.depth, 2);
  const selfLink = page('/widgets/self', 'Create a widget', `<p><a href="/widgets/self">me</a></p>${HOWTO_BODY}`);
  assert.equal(byId(run(profile, [selfLink]), 'create-widget').discoverability.inboundPages, 0, 'a self link is not an inbound link');
});

// bottleneck

const mt = (task, stage, status, extra = {}) => ({ task, stage, status, required: true, ...extra });

test('bottleneck: the first stage in funnel order with a required unmet task, regardless of array order', () => {
  const matrix = { tasks: [mt('keep-going', 'operate', 'not found'), mt('first-win', 'start', 'covered'), mt('build-it', 'build', 'mention-only')] };
  const b = bottleneck(matrix, {});
  assert.equal(b.stage, 'build');
  assert.deepEqual(b.unmet, ['build-it']);
  assert.equal(b.stages.find((s) => s.stage === 'start').status, 'served');
  assert.equal(b.stages.find((s) => s.stage === 'discover').status, 'no tasks declared');
  const reversed = bottleneck({ tasks: [...matrix.tasks].reverse() }, {});
  assert.equal(reversed.stage, 'build');
});

test('bottleneck: optional and not-applicable tasks are not unmet', () => {
  const matrix = { tasks: [mt('nice', 'start', 'not found', { required: false }), mt('skip', 'start', 'not applicable'), mt('real', 'build', 'partial')] };
  assert.equal(bottleneck(matrix, {}).stage, 'build');
});

test('bottleneck: support is "coverage only" without walkthrough or demand', () => {
  const b = bottleneck({ tasks: [mt('build-it', 'build', 'not found')] }, {});
  assert.equal(b.support, 'coverage only');
  assert.deepEqual(b.supportedBy, []);
  assert.match(b.statement, /rests on coverage alone/);
});

test('bottleneck: support names the walkthrough and demand evidence when present', () => {
  const signals = {
    tasks: { status: 'assessed', summary: { byTask: { 'build-it': [{ result: 'blocked' }] } } },
    demand: { status: 'assessed', summary: { byTask: { 'build-it': { uniqueThreads: 4 } } } },
  };
  const b = bottleneck({ tasks: [mt('build-it', 'build', 'not found')] }, signals);
  assert.equal(b.support, 'walkthrough or demand evidence');
  assert.deepEqual(b.supportedBy, ['walkthrough: build-it', 'demand: build-it']);
  assert.match(b.statement, /walkthrough: build-it; demand: build-it/);
  const succeeded = { tasks: { status: 'assessed', summary: { byTask: { 'build-it': [{ result: 'succeeded' }] } } } };
  assert.equal(bottleneck({ tasks: [mt('build-it', 'build', 'not found')] }, succeeded).support, 'coverage only', 'a succeeded walkthrough is not support for a bottleneck');
});

test('bottleneck: a task whose release is "not public" is listed in notDue and not counted as unmet', () => {
  const matrix = { tasks: [mt('beta-thing', 'start', 'not found'), mt('live-thing', 'build', 'not found')] };
  const b = bottleneck(matrix, {}, { 'beta-thing': 'not public' });
  const start = b.stages.find((s) => s.stage === 'start');
  assert.deepEqual(start.notDue, ['beta-thing']);
  assert.deepEqual(start.unmet, []);
  assert.equal(start.status, 'served');
  assert.equal(b.stage, 'build', 'the bottleneck moves past a stage that is only not due');
  assert.deepEqual(b.unmet, ['live-thing']);
});

test('bottleneck: when nothing is unmet the statement says that does not show readers succeed', () => {
  const b = bottleneck({ tasks: [mt('first-win', 'start', 'covered')] }, {});
  assert.equal(b.stage, null);
  assert.match(b.statement, /does not show readers succeed/);
  assert.equal(b.support, 'none needed');
  const onlyNotDue = bottleneck({ tasks: [mt('beta-thing', 'start', 'not found')] }, {}, { 'beta-thing': 'not public' });
  assert.equal(onlyNotDue.stage, null);
  assert.match(onlyNotDue.statement, /does not show readers succeed/);
});

test('bottleneck: a start-stage bottleneck notes that more reference content cannot make up for it', () => {
  const b = bottleneck({ tasks: [mt('first-win', 'start', 'mention-only')] }, {});
  assert.equal(b.stage, 'start');
  assert.match(b.note, /More reference content cannot make up for a first-success path that fails/);
  const later = bottleneck({ tasks: [mt('build-it', 'build', 'mention-only')] }, {});
  assert.equal(later.note, null);
});

test('bottleneck: a stage whose tasks are all not assessed is not a bottleneck', () => {
  const b = bottleneck({ tasks: [mt('first-win', 'start', 'not assessed'), mt('build-it', 'build', 'not found')] }, {});
  assert.equal(b.stages.find((s) => s.stage === 'start').status, 'not assessed');
  assert.equal(b.stage, 'build', 'an unassessed stage is skipped, not blamed');
});

// maturity

function maturityInputs({ code = true, intro = true, startStatus = 'covered', buildStatus = 'covered', operateStatus = 'covered', complete = true, placeholders = [], candidates = [] } = {}) {
  const profile = profileWith({ tasks: [task('t1', ['x'])] });
  const pages = [];
  if (intro) pages.push(page('/widgets', 'Widgets', '<p>Welcome.</p>'));
  pages.push(page('/widgets/create-widget', 'Create a widget', code ? `${HOWTO_BODY}<pre>widget_create --name demo</pre>` : HOWTO_BODY));
  const matrix = { tasks: [mt('s', 'start', startStatus), mt('b', 'build', buildStatus), mt('o', 'operate', operateStatus)] };
  return { matrix, pages, health: { placeholders, links: { brokenInternalByCrawl: [] } }, candidates, signals: {}, inventory: { complete }, profile };
}

const crit = (m, id) => m.levels.flatMap((l) => l.criteria).find((c) => c.id === id);
const TOOL = [{ kinds: ['tool'], coverage: { rating: 'Dedicated' } }];

test('maturity: level 2 needs every criterion at levels 1 and 2; the note says roadmap, not judgment', () => {
  const m = assessMaturity(maturityInputs({ candidates: TOOL }));
  assert.equal(crit(m, 'S1').status, 'met');
  assert.equal(crit(m, 'S2').status, 'met');
  assert.equal(crit(m, 'S3').status, 'met');
  assert.equal(crit(m, 'F1').status, 'met');
  assert.equal(crit(m, 'F2').status, 'met');
  assert.equal(crit(m, 'F3').status, 'met');
  assert.equal(m.level, 2);
  assert.equal(m.name, 'Foundation');
  assert.match(m.note, /A roadmap, not a judgment/);
  assert.equal(m.levels.find((l) => l.level === 3).status, 'not assessed', 'process evidence is never collected from pages');
});

test('maturity: an unmet criterion at a lower level blocks a higher level even when the higher level is met', () => {
  const m = assessMaturity(maturityInputs({ candidates: TOOL, code: false }));
  assert.equal(crit(m, 'S3').status, 'unmet');
  assert.equal(m.levels.find((l) => l.level === 2).status, 'met');
  assert.equal(m.level, 0);
  assert.match(m.name, /below Seeds/);
  assert.equal(m.nextAchievableStep.id, 'S3');
});

test('maturity: a criterion that is "not assessed" prevents a higher level', () => {
  const m = assessMaturity(maturityInputs({ candidates: [] }));
  assert.equal(crit(m, 'F2').status, 'not assessed');
  assert.equal(m.levels.find((l) => l.level === 2).status, 'not assessed');
  assert.equal(m.level, 1);
  assert.equal(m.nextAchievableStep.id, 'F2', 'with nothing unmet, the next step is the first unassessed criterion');
});

test('maturity: an incomplete inventory makes F3 "not assessed"', () => {
  const m = assessMaturity(maturityInputs({ candidates: TOOL, complete: false }));
  assert.equal(crit(m, 'F3').status, 'not assessed');
  assert.match(crit(m, 'F3').note, /inventory incomplete/);
  assert.equal(m.level, 1);
});

test('maturity: with a complete inventory, placeholders make F3 unmet and nextAchievableStep names it', () => {
  const m = assessMaturity(maturityInputs({ candidates: TOOL, placeholders: [{ path: '/widgets/create-widget', text: 'TODO' }] }));
  assert.equal(crit(m, 'F3').status, 'unmet');
  assert.equal(m.level, 1);
  assert.equal(m.nextAchievableStep.id, 'F3');
  assert.equal(m.nextAchievableStep.status, 'unmet');
  assert.match(m.nextAchievableStep.note, /1 placeholders/);
});

test('maturity: an unmet required start task fails S2 and drops the level to 0', () => {
  const m = assessMaturity(maturityInputs({ candidates: TOOL, startStatus: 'mention-only' }));
  assert.equal(crit(m, 'S2').status, 'unmet');
  assert.match(crit(m, 'S2').note, /1 of 1 not served: s/);
  assert.equal(m.level, 0);
  assert.equal(m.nextAchievableStep.id, 'S2');
});

test('maturity: a missing introduction page fails S1', () => {
  const m = assessMaturity(maturityInputs({ candidates: TOOL, intro: false }));
  assert.equal(crit(m, 'S1').status, 'unmet');
  assert.equal(m.nextAchievableStep.id, 'S1');
});

test('a near-empty page that matches a task by title does not cover it', () => {
  const profile = profileWith({ tasks: [task('create-widget', ['create a widget'])] });
  const m = run(profile, [page('/widgets/create-widget', 'Create a widget', '<p>Coming soon.</p>')]);
  const t = byId(m, 'create-widget');
  assert.notEqual(t.status, 'covered');
  assert.equal(t.matched[0].thin, true);
});

test('steps written as numbered paragraphs or "Step N" headings count as steps', () => {
  const profile = profileWith({ tasks: [task('create-widget', ['create a widget']), task('export-widget', ['export a widget'])] });
  const numbered = page('/widgets/create-widget', 'Create a widget', '<p>Create a widget in your account, then check that it loads in the list.</p><p>1. Open the dashboard and sign in to your account.</p><p>2. Choose Create a widget from the menu.</p><p>3. Enter a name and select Save.</p>');
  const headed = page('/widgets/export-widget', 'Export a widget', '<h2>Step 1 — Open the widget</h2><p>Open the widget you want to export from the list.</p><h2>Step 2 — Export it</h2><p>Choose Export and select a format, then download the file.</p><h2>Step 3 — Check it</h2><p>Open the downloaded file and confirm the widget is in it.</p>');
  const m = run(profile, [numbered, headed]);
  assert.equal(byId(m, 'create-widget').status, 'covered');
  assert.equal(byId(m, 'export-widget').status, 'covered');
});

test('a how-to with steps that only mentions the task in its body does not cover it', () => {
  const profile = profileWith({ tasks: [task('share-widget', ['share a widget'])] });
  const m = run(profile, [page('/widgets/rename', 'Rename a widget', '<p>You can share a widget later. To share a widget, see the sharing page.</p><h2>Steps</h2><ol><li>Open the dashboard.</li><li>Choose the widget.</li><li>Select Rename.</li></ol>')]);
  assert.notEqual(byId(m, 'share-widget').status, 'covered');
});
