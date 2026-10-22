'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { DIMENSIONS, FILE_DIMENSIONS, validateSignal, loadSignals } = require('../scripts/lib/signals.cjs');
const { validateProfile } = require('../scripts/lib/profile.cjs');

const ROOT = path.join(__dirname, '..');
const EXAMPLE = path.join(ROOT, 'examples', 'widgets.profile.json');
const CLI = path.join(ROOT, 'scripts', 'signals.cjs');
const tmp = () => fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'sig-')));
const clone = (o) => JSON.parse(JSON.stringify(o));

const profile = () => {
  const r = validateProfile(JSON.parse(fs.readFileSync(EXAMPLE, 'utf8')), { baseDir: path.dirname(EXAMPLE) });
  assert.equal(r.ok, true, JSON.stringify(r.errors));
  return r.profile;
};

const ITEMS = {
  tasks: { task: 'create-widget', performedBy: 'tester-a', date: '2026-09-30', result: 'succeeded' },
  demand: { id: 'd1', sourceType: 'support', date: '2026-09-01', excerpt: 'How do I create a widget?' },
  search: { query: 'create a widget', count: 12 },
  release: { feature: 'widget_create', status: 'ga', publicEvidence: 'release notes 2.0.0 (public)' },
  accuracy: { id: 'a1', kind: 'version', page: '/widgets/quickstart', claim: 'Requires version 2.0', result: 'confirmed', method: 'static' },
  risk: { id: 'r1', category: 'destructive', publicSafe: true },
  integration: { workflow: 'share-flow', step: 'setup', applies: true },
  accessibility: { page: '/widgets/a11y', issue: 'link text says click here', method: 'manual', checkedBy: 'tester-a' },
  governance: { page: '/widgets/quickstart' },
};
const REQUIRED = { tasks: 'performedBy', demand: 'sourceType', search: 'count', release: 'status', accuracy: 'claim', risk: 'publicSafe', integration: 'applies', accessibility: 'checkedBy', governance: 'page' };
const BAD_ENUM = { tasks: ['result', 'done'], demand: ['sourceType', 'email'], release: ['status', 'live'], accuracy: ['method', 'guessed'], risk: ['category', 'fire'], integration: ['step', 'launch'], governance: ['status', 'fresh'] };
const HAS_ID = ['demand', 'accuracy', 'risk'];

function valid(dim, items) {
  const provenance = { source: 'Acme Widgets synthetic export', retrievedAt: '2026-10-01' };
  if (DIMENSIONS[dim].needsProvenance) {
    Object.assign(provenance, { approval: 'synthetic fixture', timeWindow: { from: '2026-07-01', to: '2026-09-30' }, sampling: { method: 'all tagged threads', biased: false } });
  }
  return { schemaVersion: 1, signal: dim, provenance, items: items || [clone(ITEMS[dim])] };
}

test('FILE_DIMENSIONS excludes the profile-only dimensions', () => {
  assert.deepEqual(FILE_DIMENSIONS.sort(), Object.keys(ITEMS).sort());
});

for (const dim of Object.keys(ITEMS)) {
  test(`${dim}: a valid document passes`, () => {
    const v = validateSignal(dim, valid(dim));
    assert.deepEqual(v.errors, []);
    assert.equal(v.ok, true);
  });

  test(`${dim}: missing provenance fails`, () => {
    const d = valid(dim);
    delete d.provenance;
    const v = validateSignal(dim, d);
    assert.equal(v.ok, false);
    assert.ok(v.errors.some((e) => e.startsWith('provenance')), v.errors.join('; '));
  });

  test(`${dim}: a wrong "signal" name fails`, () => {
    const d = valid(dim);
    d.signal = 'not-a-dimension';
    const v = validateSignal(dim, d);
    assert.equal(v.ok, false);
    assert.ok(v.errors.some((e) => e.startsWith('signal:')));
  });

  test(`${dim}: a credential-like value fails and the error does not echo it`, () => {
    const secret = `ghp_${'a1B2'.repeat(6)}`;
    const d = valid(dim);
    d.items[0].notes = secret;
    const v = validateSignal(dim, d);
    assert.equal(v.ok, false);
    assert.ok(v.errors.some((e) => /credential/.test(e)));
    assert.ok(!v.errors.join('\n').includes(secret), 'secret value must not be echoed');
  });

  test(`${dim}: a credential-like key fails`, () => {
    const d = valid(dim);
    d.items[0].apiKey = 'placeholder-value';
    assert.equal(validateSignal(dim, d).ok, false);
  });

  test(`${dim}: a missing required field fails`, () => {
    const d = valid(dim);
    delete d.items[0][REQUIRED[dim]];
    const v = validateSignal(dim, d);
    assert.equal(v.ok, false);
    assert.ok(v.errors.some((e) => e.includes(`${REQUIRED[dim]}: is required`)), v.errors.join('; '));
  });

  if (BAD_ENUM[dim]) {
    test(`${dim}: a wrong enum value fails`, () => {
      const d = valid(dim);
      d.items[0][BAD_ENUM[dim][0]] = BAD_ENUM[dim][1];
      const v = validateSignal(dim, d);
      assert.equal(v.ok, false);
      assert.ok(v.errors.some((e) => e.includes('must be one of')));
    });
  }

  if (HAS_ID.includes(dim)) {
    test(`${dim}: a duplicate item id fails`, () => {
      const d = valid(dim, [clone(ITEMS[dim]), clone(ITEMS[dim])]);
      const v = validateSignal(dim, d);
      assert.equal(v.ok, false);
      assert.ok(v.errors.some((e) => e.includes('duplicate id')));
    });
  }
}

test('profile-only and unknown dimensions are rejected by validateSignal', () => {
  assert.equal(validateSignal('audience', valid('tasks')).ok, false);
  assert.equal(validateSignal('docTypes', valid('tasks')).ok, false);
  assert.equal(validateSignal('nope', valid('tasks')).ok, false);
});

test('a wrong schemaVersion and a non-array items fail', () => {
  const d = valid('release');
  d.schemaVersion = 2;
  assert.ok(validateSignal('release', d).errors.some((e) => e.startsWith('schemaVersion')));
  const e = valid('release');
  e.items = {};
  assert.ok(validateSignal('release', e).errors.some((x) => x.startsWith('items')));
});

for (const dim of ['demand', 'search']) {
  test(`${dim}: provenance.approval, timeWindow, and sampling are each required`, () => {
    const cases = [
      [(p) => { delete p.approval; }, 'provenance.approval'],
      [(p) => { delete p.timeWindow; }, 'provenance.timeWindow'],
      [(p) => { p.timeWindow = { from: '2026-07-01' }; }, 'provenance.timeWindow'],
      [(p) => { p.timeWindow = { from: 'July', to: 'September' }; }, 'provenance.timeWindow'],
      [(p) => { delete p.sampling; }, 'provenance.sampling'],
      [(p) => { p.sampling = { method: 'all' }; }, 'provenance.sampling'],
      [(p) => { p.sampling = { biased: true }; }, 'provenance.sampling'],
    ];
    for (const [mutate, expected] of cases) {
      const d = valid(dim);
      mutate(d.provenance);
      const v = validateSignal(dim, d);
      assert.equal(v.ok, false, expected);
      assert.ok(v.errors.some((e) => e.startsWith(expected)), `${expected}: ${v.errors.join('; ')}`);
    }
  });
}

test('an empty items array validates with a warning that says it is not zero demand', () => {
  const v = validateSignal('demand', valid('demand', []));
  assert.equal(v.ok, true);
  assert.ok(v.warnings.some((w) => /not assessed, not as zero/.test(w)));
});

// ---- loadSignals ----

function area(files = {}) {
  const dir = tmp();
  for (const [name, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, name)), { recursive: true });
    fs.writeFileSync(path.join(dir, name), typeof body === 'string' ? body : JSON.stringify(body));
  }
  return dir;
}

test('loadSignals: an undeclared input is not assessed with a retrieval request', () => {
  const p = profile();
  p.inputs = {};
  const r = loadSignals(p, { areaDir: area() });
  for (const dim of FILE_DIMENSIONS) {
    assert.equal(r[dim].status, 'not assessed', dim);
    assert.match(r[dim].reason, /no input declared/);
    assert.ok(typeof r[dim].retrievalRequest === 'string' && r[dim].retrievalRequest.length > 20, dim);
  }
  assert.equal(r.audience.status, 'assessed');
  assert.equal(r.docTypes.status, 'assessed');
});

test('loadSignals: a declared but missing file is not assessed', () => {
  const p = profile();
  p.inputs = { demand: 'inputs/demand.json' };
  const r = loadSignals(p, { areaDir: area() });
  assert.equal(r.demand.status, 'not assessed');
  assert.match(r.demand.reason, /not found/);
  assert.ok(r.demand.retrievalRequest);
});

test('loadSignals: a file that is not JSON is not assessed', () => {
  const p = profile();
  p.inputs = { release: 'inputs/release.json' };
  const r = loadSignals(p, { areaDir: area({ 'inputs/release.json': '{not json' }) });
  assert.equal(r.release.status, 'not assessed');
  assert.match(r.release.reason, /not valid JSON/);
});

test('loadSignals: an invalid file is not assessed, lists errors, and none of its items are used', () => {
  const doc = valid('demand', [clone(ITEMS.demand), { id: 'd2', date: '2026-09-02' }]);
  const p = profile();
  p.inputs = { demand: 'inputs/demand.json' };
  const r = loadSignals(p, { areaDir: area({ 'inputs/demand.json': doc }) });
  assert.equal(r.demand.status, 'not assessed');
  assert.ok(r.demand.errors.length > 0);
  assert.equal(r.demand.items, undefined);
  assert.equal(r.demand.summary, undefined);
  assert.ok(r.demand.retrievalRequest);
});

test('loadSignals: an empty items array is not assessed, not zero demand', () => {
  const p = profile();
  p.inputs = { demand: 'inputs/demand.json' };
  const r = loadSignals(p, { areaDir: area({ 'inputs/demand.json': valid('demand', []) }) });
  assert.equal(r.demand.status, 'not assessed');
  assert.match(r.demand.reason, /empty export is not evidence of no need/);
});

function loadOne(dim, doc) {
  const p = profile();
  p.inputs = { [dim]: `inputs/${dim}.json` };
  return loadSignals(p, { areaDir: area({ [`inputs/${dim}.json`]: doc }) })[dim];
}

test('loadSignals: a valid file is assessed with a source receipt', () => {
  const r = loadOne('release', valid('release'));
  assert.equal(r.status, 'assessed');
  assert.equal(r.source.file, 'inputs/release.json');
  assert.match(r.source.sha256, /^[0-9a-f]{64}$/);
  assert.equal(r.source.system, 'Acme Widgets synthetic export');
});

// ---- demand aggregation ----

const dItem = (id, extra) => ({ id, sourceType: 'support', date: '2026-09-01', task: 'recover-deleted-widget', ...extra });

test('demand: three messages, two in one thread, count 3 items and 2 unique threads', () => {
  const r = loadOne('demand', valid('demand', [dItem('m1', { threadId: 'T-1' }), dItem('m2', { threadId: 'T-1' }), dItem('m3', { threadId: 'T-2' })]));
  const t = r.summary.byTask['recover-deleted-widget'];
  assert.equal(t.items, 3);
  assert.equal(t.uniqueThreads, 2);
});

test('demand: uniqueRequesters is null unless every item has requesterIds', () => {
  const r = loadOne('demand', valid('demand', [dItem('m1', { requesterIds: ['u1'] }), dItem('m2', { requesterIds: ['u2'] }), dItem('m3', {})]));
  assert.equal(r.summary.byTask['recover-deleted-widget'].uniqueRequesters, null);
});

test('demand: uniqueRequesters is the union size, so one person writing twice counts once', () => {
  const r = loadOne('demand', valid('demand', [dItem('m1', { requesterIds: ['u1'] }), dItem('m2', { requesterIds: ['u1'] }), dItem('m3', { requesterIds: ['u2', 'u3'] })]));
  assert.equal(r.summary.byTask['recover-deleted-widget'].uniqueRequesters, 3);
});

test('demand: a per-message requesterCount is never summed into uniqueRequesters', () => {
  const r = loadOne('demand', valid('demand', [dItem('m1', { requesterCount: 40 }), dItem('m2', { requesterCount: 60 })]));
  assert.equal(r.summary.byTask['recover-deleted-widget'].uniqueRequesters, null);
  const r2 = loadOne('demand', valid('demand', [dItem('m1', { requesterCount: 40, requesterIds: ['u1'] }), dItem('m2', { requesterCount: 60, requesterIds: ['u1'] })]));
  assert.equal(r2.summary.byTask['recover-deleted-widget'].uniqueRequesters, 1);
});

test('demand: the biased sample flag and the note are surfaced', () => {
  const doc = valid('demand');
  doc.provenance.sampling = { method: 'only tagged threads', biased: true };
  const r = loadOne('demand', doc);
  assert.equal(r.summary.biasedSample, true);
  assert.equal(r.summary.samplingMethod, 'only tagged threads');
  assert.match(r.summary.note, /biased sample shows what was surfaced/);
  assert.deepEqual(r.summary.window, { from: '2026-07-01', to: '2026-09-30' });
});

test('demand: items without a task are matched by term and counted as assignedByTerm; unmatched ids are listed', () => {
  const items = [
    { id: 'x1', sourceType: 'community', date: '2026-09-02', excerpt: 'How do I restore a widget I removed?' },
    { id: 'x2', sourceType: 'community', date: '2026-09-03', terms: ['webhook delivery'], excerpt: 'Callbacks stopped.' },
    { id: 'x3', sourceType: 'community', date: '2026-09-04', excerpt: 'Do you offer a mobile app?' },
    dItem('x4', {}),
  ];
  const r = loadOne('demand', valid('demand', items));
  assert.equal(r.summary.byTask['recover-deleted-widget'].items, 2);
  assert.equal(r.summary.byTask['recover-deleted-widget'].assignedByTerm, 1);
  assert.equal(r.summary.byTask['configure-webhooks'].assignedByTerm, 1);
  assert.deepEqual(r.summary.unassigned, ['x3']);
});

test('demand: first and last seen come from item dates', () => {
  const r = loadOne('demand', valid('demand', [dItem('m1', { date: '2026-09-10T08:00:00Z' }), dItem('m2', { date: '2026-08-01' })]));
  const t = r.summary.byTask['recover-deleted-widget'];
  assert.equal(t.firstSeen, '2026-08-01');
  assert.equal(t.lastSeen, '2026-09-10');
});

// ---- search ----

function keysDeep(o, out = []) {
  if (Array.isArray(o)) o.forEach((x) => keysDeep(x, out));
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) { out.push(k); keysDeep(v, out); }
  return out;
}

test('search: no-result queries are counted per task and overall; the summary cannot lower or score need', () => {
  const items = [
    { query: 'create a widget', count: 5, noResults: true },
    { query: 'create a widget fast', count: 3, noResults: false },
    { query: 'zzz unknown thing', count: 2, noResults: true },
  ];
  const r = loadOne('search', valid('search', items));
  assert.equal(r.summary.byTask['create-widget'].queries, 2);
  assert.equal(r.summary.byTask['create-widget'].searches, 8);
  assert.equal(r.summary.byTask['create-widget'].noResultQueries, 1);
  assert.equal(r.summary.noResultQueries, 2);
  assert.equal(r.summary.totalQueries, 3);
  assert.match(r.summary.note, /volume and its absence never lower a need/);
  const bad = keysDeep(r.summary).filter((k) => /score|rating|rank|priority|need|lower/i.test(k));
  assert.deepEqual(bad, []);
});

// ---- release ----

test('release: byFeature is keyed lowercase and "ga" without public evidence is kept as stated', () => {
  const items = [{ feature: 'Widget_Create', status: 'ga' }, { feature: 'Widget Archive', status: 'beta', publicEvidence: 'public page' }];
  const r = loadOne('release', valid('release', items));
  assert.deepEqual(Object.keys(r.summary.byFeature).sort(), ['widget archive', 'widget_create']);
  assert.equal(r.summary.byFeature.widget_create.status, 'ga');
  assert.equal(r.summary.byFeature.widget_create.publicEvidence, null);
  assert.match(r.summary.note, /public evidence/);
});

// ---- accuracy ----

test('accuracy: product defects are listed apart from byPage counts; executed, static, and reported are counted separately', () => {
  const base = { kind: 'api-behavior', page: '/widgets/api-reference', claim: 'widget_share returns a link' };
  const items = [
    { id: 'a1', ...base, result: 'confirmed', method: 'executed' },
    { id: 'a2', ...base, result: 'partial', method: 'static' },
    { id: 'a3', ...base, result: 'failed', method: 'reported', productDefect: true },
    { id: 'a4', ...base, page: '/widgets/quickstart', result: 'confirmed', method: 'static' },
  ];
  const r = loadOne('accuracy', valid('accuracy', items));
  const p = r.summary.byPage['/widgets/api-reference'];
  assert.equal(p.total, 3);
  assert.equal(p.executed, 1);
  assert.equal(p.staticOnly, 1);
  assert.equal(p.reportedOnly, 1); // a reported check is neither fired nor read from source
  assert.deepEqual(p.byResult, { confirmed: 1, partial: 1, failed: 1 });
  assert.deepEqual(r.summary.productDefects.map((d) => d.id), ['a3']);
  assert.ok(!('productDefect' in p) && !('productDefects' in p));
  assert.match(r.summary.note, /source-attested, not fired/);
});

// ---- risk ----

test('risk: notPublicSafe items are counted', () => {
  const items = [
    { id: 'r1', category: 'destructive', task: 'recover-deleted-widget', publicSafe: true },
    { id: 'r2', category: 'security', page: '/widgets/x', publicSafe: false },
    { id: 'r3', category: 'auth', publicSafe: false },
  ];
  const r = loadOne('risk', valid('risk', items));
  assert.equal(r.summary.notPublicSafe, 2);
  assert.ok(r.summary.byTask.unassigned);
  assert.match(r.summary.note, /not public-safe must not appear/);
});

// ---- CLI ----

const run = (...args) => spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' });

test('CLI list: exits 0 and names every dimension', () => {
  const r = run('list');
  assert.equal(r.status, 0);
  for (const id of Object.keys(DIMENSIONS)) assert.ok(r.stdout.includes(id), id);
});

test('CLI validate: exit 0 for a valid file, 2 for an invalid one', () => {
  const dir = tmp();
  const good = path.join(dir, 'good.json');
  const bad = path.join(dir, 'bad.json');
  fs.writeFileSync(good, JSON.stringify(valid('release')));
  const b = valid('release');
  b.items[0].status = 'live';
  fs.writeFileSync(bad, JSON.stringify(b));
  const g = run('validate', 'release', good);
  assert.equal(g.status, 0);
  assert.match(g.stdout, /Valid release signal \(1 items\)/);
  const x = run('validate', 'release', bad);
  assert.equal(x.status, 2);
  assert.match(x.stderr, /error: items\[0\]\.status/);
});

test('CLI validate: exit 2 for a profile-only dimension, a missing file, and bad arguments', () => {
  assert.equal(run('validate', 'audience', EXAMPLE).status, 2);
  assert.equal(run('validate', 'release', path.join(tmp(), 'nope.json')).status, 2);
  assert.equal(run('validate', 'release').status, 2);
  assert.equal(run('frobnicate').status, 2);
});

test('CLI validate: a valid file with no items prints a warning but exits 0', () => {
  const f = path.join(tmp(), 'empty.json');
  fs.writeFileSync(f, JSON.stringify(valid('release', [])));
  const r = run('validate', 'release', f);
  assert.equal(r.status, 0);
  assert.match(r.stderr, /warning: items is empty/);
});

const REF = path.join(ROOT, 'references', 'signals.md');
test('CLI describe --markdown matches references/signals.md', { skip: fs.existsSync(REF) ? false : 'references/signals.md does not exist in this repo; nothing to compare (not created by this suite)' }, () => {
  const r = run('describe', '--markdown');
  assert.equal(r.status, 0);
  assert.equal(r.stdout.trim(), fs.readFileSync(REF, 'utf8').trim());
});

test('CLI describe (JSON) exposes every dimension contract', () => {
  const r = run('describe');
  assert.equal(r.status, 0);
  assert.deepEqual(Object.keys(JSON.parse(r.stdout)), Object.keys(DIMENSIONS));
});
