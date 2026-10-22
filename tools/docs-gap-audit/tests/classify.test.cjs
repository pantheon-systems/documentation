'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { parseHtml } = require('../scripts/lib/html.cjs');
const { buildRecord, DEFAULT_UPDATED } = require('../scripts/site-audit.cjs');
const { classifyPage, applyDecisions } = require('../scripts/lib/classify.cjs');

const ORIGIN = 'https://docs.example.test';

// Build a page record the way the inventory does, from synthetic Acme Widgets HTML.
function rec(pathname, title, body) {
  const url = `${ORIGIN}${pathname}`;
  const html = `<!doctype html><html><head><title>${title}</title></head><body><main><h1>${title}</h1>${body}</main></body></html>`;
  return buildRecord({ url }, { status: 200, url }, parseHtml(html), DEFAULT_UPDATED);
}

const TUTORIAL = rec(
  '/widgets/first-widget',
  'Build your first widget',
  '<p>In this tutorial you will build a widget. By the end you will have a working Acme Widgets widget.</p><p>Let\'s start with an empty account.</p><ol><li>Open the dashboard.</li><li>Run widget_create with a name.</li><li>Confirm the widget loads.</li></ol>',
);

const HOWTO = rec(
  '/widgets/create-widget',
  'Create a widget',
  '<h2>Prerequisites</h2><p>You need an API token. Before you begin, verify you can sign in.</p><h2>Steps</h2><ol><li>Open the dashboard.</li><li>Choose Create a widget.</li><li>Enter a name and select Save.</li></ol><h2>Verify</h2><p>The new widget appears in the list.</p>',
);

const REFERENCE = rec(
  '/widgets/api-reference',
  'Widgets API reference',
  '<h2>widget_create</h2><table><tr><th>Parameter</th><th>Type</th><th>Default</th></tr><tr><td>name</td><td>string</td><td>none</td></tr></table><p>Returns the widget. Accepts a name.</p><h2>widget_share</h2><table><tr><th>Parameter</th><th>Type</th><th>Required</th></tr><tr><td>id</td><td>string</td><td>yes</td></tr></table><p>Returns a link. Accepts an id.</p>',
);

const EXPLANATION = rec(
  '/widgets/concepts',
  'Widget concepts',
  '<h2>Why widgets belong to an account</h2><p>Widgets are stored per account because teams share them, and the reason is simple: one owner means one place to look. The trade-off is that deleting a widget affects everyone, which is why the design keeps a recovery window.</p><p>Historically, widgets lived with the user, but the background for the change was support load. In general, a shared object needs a clear owner.</p>',
);

const TROUBLE = rec(
  '/widgets/troubleshoot-errors',
  'Troubleshoot widget errors',
  '<h2>Symptom: the widget does not load</h2><p>The error says the widget is not found. The cause is usually a deleted widget.</p><h2>Fix</h2><ol><li>Open the trash.</li><li>Select Restore.</li></ol>',
);

const MIGRATION = rec(
  '/widgets/migrate-v2-v3',
  'Migrate from v2 to v3',
  '<h2>Steps</h2><ol><li>Update the client library.</li><li>Run the migration command.</li><li>Verify the widget list.</li></ol><p>Breaking changes: the name field is now required.</p>',
);

const MIXED = rec(
  '/widgets/overview',
  'Widgets overview',
  '<p>Follow these steps:</p><ol><li>Open the dashboard.</li><li>Choose a widget.</li></ol><h2>Why widgets work this way</h2><p>Widgets are stored per account because teams share them. The trade-off is that deleting one affects everyone, which is why the design keeps a recovery window.</p><table><tr><th>Option</th><th>Default</th></tr><tr><td>retention</td><td>30</td></tr></table>',
);

const UNCLEAR = rec('/widgets/notes', 'Notes', '<p>Misc.</p>');

const FIELDS = ['type', 'confidence', 'evidence', 'sections', 'mixed', 'proposedSplit'];

test('classifyPage returns type, confidence, evidence, sections, mixed, and proposedSplit', () => {
  const c = classifyPage(TUTORIAL);
  for (const f of FIELDS) assert.ok(f in c, `missing field ${f}`);
  assert.equal(c.path, '/widgets/first-widget');
  assert.equal(c.machineSuggestion, true);
  assert.ok(Array.isArray(c.evidence));
  assert.ok(Array.isArray(c.sections));
  assert.equal(c.mixed, false);
  assert.equal(c.proposedSplit, null);
});

test('a tutorial with learning language and ordered steps is a tutorial, with quoted cues', () => {
  const c = classifyPage(TUTORIAL);
  assert.equal(c.type, 'tutorial');
  assert.equal(c.mixed, false);
  const cues = c.evidence.map((e) => e.cue);
  assert.ok(cues.includes('ordered steps'), JSON.stringify(c.evidence));
  assert.ok(cues.includes('learning language'));
  for (const e of c.evidence) {
    assert.ok(e.quote && e.quote.length > 0 && e.quote.length <= 110, `quote must be non-empty and capped: ${e.quote}`);
  }
  assert.match(c.evidence.find((e) => e.cue === 'ordered steps').quote, /Open the dashboard/);
});

test('a how-to with prerequisites, ordered steps, and verification is a how-to', () => {
  const c = classifyPage(HOWTO);
  assert.equal(c.type, 'how-to');
  assert.equal(c.mixed, false);
  assert.deepEqual(c.sections.map((s) => s.heading), [null, 'Prerequisites', 'Steps', 'Verify']);
  assert.equal(c.sections.find((s) => s.heading === 'Steps').type, 'how-to');
  assert.ok(c.evidence.some((e) => e.cue === 'ordered steps'));
});

test('a reference page with tables, identifier headings, and parameter words is a reference', () => {
  const c = classifyPage(REFERENCE);
  assert.equal(c.type, 'reference');
  assert.equal(c.mixed, false);
  const cues = c.evidence.map((e) => e.cue);
  assert.ok(cues.includes('table'));
  assert.ok(cues.includes('identifier heading'));
  assert.match(c.evidence.find((e) => e.cue === 'table').quote, /Parameter \| Type \| Default/);
  assert.match(c.evidence.find((e) => e.cue === 'identifier heading').quote, /widget_create/);
});

test('an explanation with reasoning language and no steps is an explanation', () => {
  const c = classifyPage(EXPLANATION);
  assert.equal(c.type, 'explanation');
  assert.equal(c.mixed, false);
  assert.ok(c.evidence.some((e) => e.cue === 'reasoning language'));
  assert.ok(!c.evidence.some((e) => e.cue === 'ordered steps'));
});

test('a troubleshooting page carries the troubleshooting subtype', () => {
  const c = classifyPage(TROUBLE);
  assert.equal(c.subtype, 'troubleshooting');
  assert.equal(classifyPage(HOWTO).subtype, null);
});

test('a migration page carries the migration subtype, and it wins over troubleshooting words', () => {
  const c = classifyPage(MIGRATION);
  assert.equal(c.subtype, 'migration');
  const both = classifyPage(rec('/widgets/upgrade-errors', 'Upgrade error fixes', '<p>Misc.</p>'));
  assert.equal(both.subtype, 'migration');
});

test('a page with steps, an explanation section, and a table is mixed, low confidence, with a proposed split', () => {
  const c = classifyPage(MIXED);
  assert.equal(c.mixed, true);
  assert.equal(c.type, 'mixed');
  assert.equal(c.confidence, 'low');
  assert.ok(Array.isArray(c.proposedSplit) && c.proposedSplit.length >= 2, JSON.stringify(c.proposedSplit));
  const types = c.proposedSplit.map((s) => s.type);
  assert.ok(types.includes('how-to'));
  assert.ok(types.includes('explanation'));
  assert.ok(c.proposedSplit.every((s) => 'heading' in s && 'type' in s));
});

test('a near-empty page is unclear with low confidence', () => {
  const c = classifyPage(UNCLEAR);
  assert.equal(c.type, 'unclear');
  assert.equal(c.confidence, 'low');
  assert.equal(c.mixed, false);
  assert.equal(c.proposedSplit, null);
});

test('a beginner how-to stays a how-to: study versus work, not beginner versus advanced', () => {
  const beginner = rec(
    '/widgets/create-widget-beginner',
    'Create a widget (beginner guide)',
    '<p>This guide is for beginners. You are new to widgets, so you need an account. Before you begin, verify you can sign in.</p><ol><li>Open the dashboard.</li><li>Choose Create a widget.</li><li>Enter a name and select Save.</li></ol>',
  );
  const c = classifyPage(beginner);
  assert.equal(c.type, 'how-to');
  assert.notEqual(c.type, 'tutorial');
});

test('an advanced hands-on tutorial stays a tutorial', () => {
  const advanced = rec(
    '/widgets/sharded-pipeline',
    'Build a sharded widget pipeline',
    '<p>This is an advanced exercise for experienced engineers. In this tutorial you will build a sharded pipeline with custom reducers. By the end you will have a pipeline that handles 10 shards.</p><ol><li>Create the shard config.</li><li>Run widget_create for each shard.</li><li>Deploy the reducer and confirm output.</li></ol>',
  );
  const c = classifyPage(advanced);
  assert.equal(c.type, 'tutorial');
  assert.notEqual(c.type, 'how-to');
});

test('the same steps classify by reader need cues, not by difficulty wording', () => {
  const steps = '<ol><li>Open the dashboard.</li><li>Choose a widget.</li><li>Select Save.</li></ol>';
  const beginner = classifyPage(rec('/a', 'Widget tasks', `<p>For beginners. To create a widget, follow these steps.</p>${steps}`));
  const advanced = classifyPage(rec('/b', 'Widget tasks', `<p>For experts. To create a widget, follow these steps.</p>${steps}`));
  assert.equal(beginner.type, advanced.type);
});

test('a record with no blocks is "not assessed", with a note and no confidence', () => {
  const c = classifyPage({ path: '/widgets/legacy-record', title: 'Old record' });
  assert.equal(c.type, 'not assessed');
  assert.equal(c.confidence, null);
  assert.equal(c.mixed, false);
  assert.deepEqual(c.evidence, []);
  assert.deepEqual(c.sections, []);
  assert.match(c.note, /no structure blocks/);
});

test('confidence is never high on a page with fewer than 4 total cue points', () => {
  const smallPages = [
    rec('/s1', 'Small one', '<p>Widgets are shared because teams need them, and why matters, because design.</p>'),
    rec('/s2', 'Small two', '<table><tr><th>Option</th></tr><tr><td>x</td></tr></table>'),
    rec('/s3', 'Small three', '<p>Returns a value.</p><p>Returns another value.</p><p>Default is none.</p><p>Type is string.</p>'),
    rec('/s4', 'Small four', '<p>Open the dashboard.</p><p>Choose a widget.</p>'),
    rec('/s5', 'Small five', '<h2>Concepts</h2><p>Why.</p>'),
    UNCLEAR,
  ];
  for (const p of smallPages) {
    const c = classifyPage(p);
    assert.notEqual(c.confidence, 'high', `${p.path} must not be high`);
    for (const s of c.sections) assert.notEqual(s.confidence, 'high', `${p.path} section ${s.heading} must not be high`);
  }
  // A page with plenty of cues can reach high, so the guard is the cue count, not a blanket cap.
  assert.equal(classifyPage(TUTORIAL).confidence, 'high');
});

test('applyDecisions: a human classify decision overrides the machine type and keeps the machine type', () => {
  const machine = [classifyPage(HOWTO), classifyPage(REFERENCE)];
  assert.equal(machine[0].type, 'how-to');
  const out = applyDecisions(machine, [{ kind: 'classify', page: '/widgets/create-widget', verdict: 'tutorial', id: 'dec-1' }]);
  assert.equal(out[0].type, 'tutorial');
  assert.equal(out[0].source, 'human');
  assert.equal(out[0].machineType, 'how-to');
  assert.equal(out[0].decisionId, 'dec-1');
  assert.equal(out[1].type, 'reference');
  assert.equal(out[1].source, 'machine');
  assert.ok(!('machineType' in out[1]));
  assert.equal(machine[0].type, 'how-to', 'the input is not mutated');
});

test('applyDecisions: the latest classify decision wins and other decision kinds are ignored', () => {
  const machine = [classifyPage(HOWTO)];
  const out = applyDecisions(machine, [
    { kind: 'classify', page: '/widgets/create-widget', verdict: 'tutorial', id: 'dec-1' },
    { kind: 'recommendation', target: 'r_x', verdict: 'accepted', id: 'dec-2' },
    { kind: 'classify', page: '/widgets/create-widget', verdict: 'explanation', id: 'dec-3' },
  ]);
  assert.equal(out[0].type, 'explanation');
  assert.equal(out[0].decisionId, 'dec-3');
  const none = applyDecisions(machine, [{ kind: 'recommendation', target: 'r_x', verdict: 'accepted', id: 'dec-2' }]);
  assert.equal(none[0].source, 'machine');
});
