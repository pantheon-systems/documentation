'use strict';

// Run state: workspace guard, write-once files, checkpoints, planning, manifests, source identity,
// compatibility and candidate diffs. All content is synthetic.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const rs = require('../scripts/lib/runstate.cjs');
const { hashObject, sha256 } = require('../scripts/lib/hash.cjs');
const { tmp, ROOT } = require('./helpers.cjs');

const PROFILE = { schemaVersion: 1, area: { id: 'widgets', name: 'Widgets' }, site: { origin: 'https://docs.example.test' } };
const readJ = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

function newWs() {
  return rs.openWorkspace(path.join(tmp(), 'workspace'));
}

test('openWorkspace refuses a directory inside the toolkit repo and creates one outside', () => {
  const inside = path.join(ROOT, 'tests', 'never-created-workspace');
  assert.throws(() => rs.openWorkspace(inside), /outside the toolkit repository/);
  assert.ok(!fs.existsSync(inside));
  assert.throws(() => rs.openWorkspace(ROOT), /outside the toolkit repository/);
  assert.throws(() => rs.openWorkspace(''), /workspace is required/);
  const outside = path.join(tmp(), 'ws', 'nested');
  const ws = rs.openWorkspace(outside);
  assert.equal(ws.dir, outside);
  assert.ok(fs.statSync(outside).isDirectory());
});

test('startRun writes start.json once with profile hash, tool identity, and an unrewritten snapshot', () => {
  const ws = newWs();
  const run = rs.startRun(ws, PROFILE, { options: { delay: 0 }, command: 'audit run' });
  const startFile = path.join(run.dir, 'start.json');
  const start = readJ(startFile);
  const hash = hashObject(PROFILE);
  assert.equal(start.profile.hash, hash);
  assert.equal(run.profileHash, hash);
  assert.equal(start.tool.name, 'docs-gap-audit');
  assert.equal(start.tool.version, fs.readFileSync(path.join(ROOT, 'VERSION'), 'utf8').trim());
  assert.equal(start.tool.node, process.version);
  assert.deepEqual(start.tool.schemas, rs.SCHEMAS);
  assert.equal(start.command, 'audit run');
  assert.throws(() => rs.writeOnce(startFile, { x: 1 }), { code: 'EEXIST' });
  const snapFile = path.join(ws.dir, start.profile.snapshot);
  assert.equal(path.basename(snapFile), `${hash}.json`);
  assert.equal(path.basename(path.dirname(snapFile)), 'profiles');
  assert.deepEqual(readJ(snapFile).profile, PROFILE);
  const before = fs.readFileSync(snapFile);
  const mtime = fs.statSync(snapFile).mtimeMs;
  const run2 = rs.startRun(ws, PROFILE);
  assert.notEqual(run2.runId, run.runId);
  assert.deepEqual(fs.readFileSync(snapFile), before);
  assert.equal(fs.statSync(snapFile).mtimeMs, mtime);
  assert.equal(readJ(path.join(run2.dir, 'start.json')).profile.hash, hash);
});

test('writeCheckpoint: a complete checkpoint is immutable; an incomplete or failed one is replaced and kept as an attempt', () => {
  const ws = newWs();
  const run = rs.startRun(ws, PROFILE);
  rs.writeCheckpoint(run, 'sources', { status: 'incomplete', notes: 'first try' });
  rs.writeCheckpoint(run, 'sources', { status: 'failed', error: 'second try' });
  const cpDir = path.join(run.dir, 'checkpoints');
  assert.equal(readJ(path.join(cpDir, 'sources.json.attempt-1')).notes, 'first try');
  assert.equal(rs.readCheckpoint(run, 'sources').status, 'failed');
  assert.ok(!fs.existsSync(path.join(cpDir, 'sources.json.attempt-2')));
  rs.writeCheckpoint(run, 'sources', { status: 'complete', inputHash: 'h1' });
  assert.equal(rs.readCheckpoint(run, 'sources').status, 'complete');
  assert.equal(readJ(path.join(cpDir, 'sources.json.attempt-2')).error, 'second try');
  assert.throws(() => rs.writeCheckpoint(run, 'sources', { status: 'complete', inputHash: 'h2' }), /immutable/);
  assert.throws(() => rs.writeCheckpoint(run, 'sources', { status: 'failed' }), /immutable/);
  assert.equal(rs.readCheckpoint(run, 'sources').inputHash, 'h1');
});

test('stagePlan decides run or skip from the checkpoint and input hash', () => {
  const ws = newWs();
  const run = rs.startRun(ws, PROFILE);
  const plan = (stage, hash) => rs.stagePlan(run, [stage], hash ? { [stage]: hash } : {})[0];
  assert.deepEqual([plan('a', 'h').action, plan('a', 'h').reason], ['run', 'no checkpoint']);
  rs.writeCheckpoint(run, 'b', { status: 'incomplete', inputHash: 'h' });
  assert.equal(plan('b', 'h').action, 'run');
  assert.match(plan('b', 'h').reason, /incomplete/);
  rs.writeCheckpoint(run, 'c', { status: 'complete', inputHash: 'h' });
  assert.equal(plan('c', 'h').action, 'skip');
  const changed = plan('c', 'other');
  assert.equal(changed.action, 'run');
  assert.match(changed.reason, /inputs changed/);
  assert.equal(rs.stagePlan(run, ['a', 'b', 'c'], { c: 'h' }).length, 3);
});

test('finalizeRun writes manifest.json once and never modifies it; complete only with every stage and source ok', () => {
  const ws = newWs();
  const run = rs.startRun(ws, PROFILE);
  for (const s of ['one', 'two']) rs.writeCheckpoint(run, s, { status: 'complete', outputs: [] });
  const okSource = { id: 's1', retrieval: { status: 'ok' } };
  const manifest = rs.finalizeRun(run, { stages: ['one', 'two'], sources: [okSource] });
  assert.equal(manifest.status, 'complete');
  assert.deepEqual(manifest.completeness.missing, []);
  const file = path.join(run.dir, 'manifest.json');
  const bytes = fs.readFileSync(file);
  assert.throws(() => rs.finalizeRun(run, { stages: ['one'], sources: [] }), /already finalized/);
  assert.deepEqual(fs.readFileSync(file), bytes);

  const run2 = rs.startRun(ws, PROFILE);
  rs.writeCheckpoint(run2, 'one', { status: 'complete' });
  rs.writeCheckpoint(run2, 'two', { status: 'incomplete' });
  const m2 = rs.finalizeRun(run2, { stages: ['one', 'two', 'three'], sources: [{ id: 'bad', retrieval: { status: 'incomplete', reason: 'interrupted' } }] });
  assert.equal(m2.status, 'incomplete');
  assert.ok(m2.completeness.missing.includes('stage two: incomplete'));
  assert.ok(m2.completeness.missing.includes('stage three: not run'));
  assert.ok(m2.completeness.missing.some((m) => m.startsWith('source bad: incomplete') && m.includes('interrupted')));

  const run3 = rs.startRun(ws, PROFILE);
  rs.writeCheckpoint(run3, 'one', { status: 'complete' });
  const m3 = rs.finalizeRun(run3, { stages: ['one'], sources: [{ id: 'gone', retrieval: { status: 'missing' } }] });
  assert.equal(m3.status, 'incomplete');
});

test('state keeps lastAttempted, lastCompleted, and lastReviewed separate', () => {
  const ws = newWs();
  const fresh = rs.readState(ws, 'widgets');
  assert.deepEqual([fresh.lastAttempted, fresh.lastCompleted, fresh.lastReviewed], [null, null, null]);
  const run = rs.startRun(ws, PROFILE);
  let st = rs.readState(ws, 'widgets');
  assert.equal(st.lastAttempted.runId, run.runId);
  assert.equal(st.lastCompleted, null);
  assert.equal(st.lastReviewed, null);
  assert.deepEqual(st.runs, [run.runId]);

  rs.writeCheckpoint(run, 'one', { status: 'incomplete' });
  rs.finalizeRun(run, { stages: ['one'], sources: [] });
  st = rs.readState(ws, 'widgets');
  assert.equal(st.lastCompleted, null, 'an incomplete finalize is not a completed run');

  const run2 = rs.startRun(ws, PROFILE);
  rs.writeCheckpoint(run2, 'one', { status: 'complete' });
  st = rs.readState(ws, 'widgets');
  assert.equal(st.lastAttempted.runId, run2.runId);
  assert.equal(st.lastCompleted, null);
  rs.finalizeRun(run2, { stages: ['one'], sources: [] });
  st = rs.readState(ws, 'widgets');
  assert.equal(st.lastCompleted.runId, run2.runId);
  assert.equal(st.lastReviewed, null);

  const run3 = rs.startRun(ws, PROFILE);
  st = rs.readState(ws, 'widgets');
  assert.equal(st.lastAttempted.runId, run3.runId);
  assert.equal(st.lastCompleted.runId, run2.runId, 'starting a run does not move lastCompleted');

  rs.recordReview(ws, 'widgets', run2.runId, 'Pat Example');
  st = rs.readState(ws, 'widgets');
  assert.equal(st.lastReviewed.runId, run2.runId);
  assert.equal(st.lastReviewed.by, 'Pat Example');
  assert.equal(st.lastAttempted.runId, run3.runId);
  assert.equal(st.lastCompleted.runId, run2.runId);
});

test('localSourceIdentity: content hash changes with content and is stable otherwise', () => {
  const dir = tmp();
  const src = path.join(dir, 'src');
  fs.mkdirSync(src);
  fs.writeFileSync(path.join(src, 'a.md'), '# Acme Widgets\n');
  const source = { id: 'acme', kind: 'repo', path: src };
  const first = rs.localSourceIdentity(source, [dir]);
  const again = rs.localSourceIdentity(source, [dir]);
  assert.equal(first.retrieval.status, 'ok');
  assert.equal(first.contentHash, again.contentHash);
  assert.equal(first.fileCount, 1);
  fs.writeFileSync(path.join(src, 'a.md'), '# Acme Widgets v2\n');
  const changed = rs.localSourceIdentity(source, [dir]);
  assert.notEqual(changed.contentHash, first.contentHash);
  const single = rs.localSourceIdentity({ id: 'one', kind: 'repo', path: path.join(src, 'a.md') }, [dir]);
  assert.equal(single.retrieval.status, 'ok');
  assert.equal(single.fileCount, 1);
});

test('localSourceIdentity: a git repo with no commits is recorded as dirty with a null head', () => {
  const dir = tmp();
  const repo = path.join(dir, 'repo');
  fs.mkdirSync(repo);
  execFileSync('git', ['init', '-q', repo], { stdio: 'ignore' });
  fs.writeFileSync(path.join(repo, 'a.md'), '# Uncommitted\n');
  const id = rs.localSourceIdentity({ id: 'r', kind: 'repo', path: repo }, [dir]);
  assert.equal(id.git.present, true);
  assert.equal(id.git.head, null);
  assert.equal(id.git.dirty, true);
  const plain = path.join(dir, 'plain');
  fs.mkdirSync(plain);
  fs.writeFileSync(path.join(plain, 'a.md'), 'x\n');
  assert.deepEqual(rs.localSourceIdentity({ id: 'p', kind: 'repo', path: plain }, [dir]).git, { present: false });
});

test('localSourceIdentity: a symlink that leaves the permitted roots is a limitation; a missing path fails', () => {
  const dir = tmp();
  const outside = path.join(tmp(), 'secret-area');
  fs.mkdirSync(outside);
  fs.writeFileSync(path.join(outside, 'leak.md'), 'outside\n');
  const src = path.join(dir, 'src');
  fs.mkdirSync(src);
  fs.writeFileSync(path.join(src, 'a.md'), 'inside\n');
  fs.symlinkSync(outside, path.join(src, 'escape'));
  const id = rs.localSourceIdentity({ id: 's', kind: 'repo', path: src }, [dir]);
  assert.equal(id.retrieval.status, 'ok');
  assert.equal(id.fileCount, 1);
  assert.ok(id.limitations.length > 0);
  assert.match(JSON.stringify(id.limitations), /symlink leaves permitted roots/);
  const missing = rs.localSourceIdentity({ id: 'm', kind: 'repo', path: path.join(dir, 'nope') }, [dir]);
  assert.equal(missing.retrieval.status, 'failed');
});

test('stagedSourceIdentity covers missing, in-progress, failed, ok, and tampered receipts', () => {
  const ws = newWs();
  rs.startRun(ws, PROFILE);
  const area = rs.areaDir(ws, 'widgets');
  const connector = { id: 'support-export', connector: 'support-system', ref: 'tag:widgets', stagedAs: 'staging/support-export.json', purpose: 'demand', public: false };
  const file = path.join(area, connector.stagedAs);
  const receiptFile = `${file}.receipt.json`;
  fs.mkdirSync(path.dirname(file), { recursive: true });

  const missing = rs.stagedSourceIdentity(ws, 'widgets', connector);
  assert.equal(missing.retrieval.status, 'missing');
  assert.match(missing.retrieval.request, /stage\.cjs complete/);
  assert.match(missing.retrieval.request, /support-export/);

  fs.writeFileSync(receiptFile, JSON.stringify({ status: 'in-progress', at: '2026-10-01T00:00:00Z' }));
  const inProgress = rs.stagedSourceIdentity(ws, 'widgets', connector);
  assert.equal(inProgress.retrieval.status, 'incomplete');
  assert.ok(inProgress.retrieval.request);

  fs.writeFileSync(receiptFile, JSON.stringify({ status: 'failed', reason: 'connector timed out' }));
  const failed = rs.stagedSourceIdentity(ws, 'widgets', connector);
  assert.equal(failed.retrieval.status, 'incomplete');
  assert.match(failed.retrieval.reason, /connector timed out/);

  const body = '{"items":[1,2,3]}\n';
  fs.writeFileSync(file, body);
  fs.writeFileSync(receiptFile, JSON.stringify({ status: 'complete', sha256: sha256(Buffer.from(body)), at: '2026-10-01T00:00:00Z', items: 3 }));
  const ok = rs.stagedSourceIdentity(ws, 'widgets', connector);
  assert.equal(ok.retrieval.status, 'ok');
  assert.equal(ok.contentHash, sha256(Buffer.from(body)));
  assert.equal(ok.retrieval.items, 3);

  fs.writeFileSync(file, '{"items":[1,2,3,4]}\n');
  const tampered = rs.stagedSourceIdentity(ws, 'widgets', connector);
  assert.equal(tampered.retrieval.status, 'failed');
  assert.match(tampered.retrieval.reason, /changed after its receipt/);

  fs.rmSync(file);
  assert.equal(rs.stagedSourceIdentity(ws, 'widgets', connector).retrieval.status, 'failed');
});

function manifestOf(over = {}) {
  return {
    schemaVersion: 1, runId: 'r1', areaId: 'widgets', status: 'complete',
    profile: { hash: 'p1' }, tool: { version: '0.1.0', schemas: { candidate: 2 } }, ...over,
  };
}

test('compatibility refuses mismatched areas, incomplete runs, and schema differences, with reasons', () => {
  const a = manifestOf();
  assert.deepEqual(rs.compatibility(a, manifestOf({ runId: 'r2' })), { compatible: true, reasons: [], warnings: [] });
  const area = rs.compatibility(a, manifestOf({ runId: 'r2', areaId: 'other' }));
  assert.equal(area.compatible, false);
  assert.match(area.reasons.join(' '), /different areas \(widgets and other\)/);
  const open = rs.compatibility(a, manifestOf({ runId: 'r2', status: 'incomplete' }));
  assert.equal(open.compatible, false);
  assert.match(open.reasons.join(' '), /r2 is incomplete, not complete/);
  const manifestSchema = rs.compatibility(a, manifestOf({ runId: 'r2', schemaVersion: 2 }));
  assert.equal(manifestSchema.compatible, false);
  assert.match(manifestSchema.reasons.join(' '), /manifest schema versions differ/);
  const candSchema = rs.compatibility(a, manifestOf({ runId: 'r2', tool: { version: '0.1.0', schemas: { candidate: 3 } } }));
  assert.equal(candSchema.compatible, false);
  assert.match(candSchema.reasons.join(' '), /candidate schema versions differ \(2 and 3\)/);
  assert.equal(rs.compatibility(a, null).compatible, false);
});

test('compatibility warns but stays compatible when the profile hash or tool version differs', () => {
  const a = manifestOf();
  const b = manifestOf({ runId: 'r2', profile: { hash: 'p2' }, tool: { version: '0.2.0', schemas: { candidate: 2 } } });
  const c = rs.compatibility(a, b);
  assert.equal(c.compatible, true);
  assert.deepEqual(c.reasons, []);
  assert.equal(c.warnings.length, 2);
  assert.match(c.warnings.join(' '), /profile changed/);
  assert.match(c.warnings.join(' '), /tool version changed \(0\.1\.0 to 0\.2\.0\)/);
});

const cand = (id, over = {}) => ({ id, name: `Candidate ${id}`, status: 'shipped', coverage: { rating: 'None' }, evidence: { posture: 'public' }, sources: ['a'], kinds: ['feature'], ...over });

test('diffCandidates matches by stable id and reports added, removed, changed, and unchanged', () => {
  const before = [cand('c_1'), cand('c_2'), cand('c_3'), cand('c_4'), cand('c_5')];
  const after = [
    cand('c_1'),
    cand('c_2', { status: 'planned' }),
    cand('c_3', { coverage: { rating: 'Dedicated' } }),
    cand('c_4', { evidence: { posture: 'internal' } }),
    cand('c_5', { sources: ['a', 'b'] }),
    cand('c_6'),
  ];
  const d = rs.diffCandidates(before, after);
  assert.equal(d.unchanged, 1);
  assert.deepEqual(d.added.map((x) => x.id), ['c_6']);
  assert.deepEqual(d.removed, []);
  const byId = Object.fromEntries(d.changed.map((c) => [c.id, c.fields]));
  assert.deepEqual(byId.c_2, [{ field: 'status', from: 'shipped', to: 'planned' }]);
  assert.deepEqual(byId.c_3, [{ field: 'coverage.rating', from: 'None', to: 'Dedicated' }]);
  assert.deepEqual(byId.c_4, [{ field: 'evidence.posture', from: 'public', to: 'internal' }]);
  assert.deepEqual(byId.c_5, [{ field: 'sources', from: 1, to: 2 }]);
  const gone = rs.diffCandidates([cand('c_1'), cand('c_9')], [cand('c_1')]);
  assert.deepEqual(gone.removed.map((x) => x.id), ['c_9']);
  assert.equal(gone.unchanged, 1);
});

test('diffCandidates treats two candidates with the same id as the same item across runs', () => {
  const before = [cand('c_same', { name: 'Old name' })];
  const after = [cand('c_same', { name: 'Renamed' })];
  const d = rs.diffCandidates(before, after);
  assert.deepEqual(d.added, []);
  assert.deepEqual(d.removed, []);
  assert.equal(d.unchanged, 1);
  assert.deepEqual(d.changed, []);
});
