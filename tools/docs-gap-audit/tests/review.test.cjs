'use strict';

// CLI tests for scripts/review.cjs: human verdicts, staleness, and the append-only decision log.
// The run folder holds hand-written minimal recommendations. All content is synthetic.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const rs = require('../scripts/lib/runstate.cjs');
const { tmp, ROOT } = require('./helpers.cjs');

const REVIEW = path.join(ROOT, 'scripts', 'review.cjs');
const PROFILE = { schemaVersion: 1, area: { id: 'widgets', name: 'Widgets' }, site: { origin: 'https://docs.example.test' } };
const AREA = 'widgets';

const rec = (id, action, evidenceHash, extra = {}) => ({
  id, action, evidenceHash, taskTitle: `Task ${id}`, page: null, proposedJudgment: { text: `Proposed judgment for ${id}.` }, human: {}, ...extra,
});

function setup(recs = [rec('rec_a', 'create', 'hash-a'), rec('rec_b', 'update', 'hash-b'), rec('rec_c', 'no-action', 'hash-c')]) {
  const dir = tmp();
  const ws = rs.openWorkspace(path.join(dir, 'workspace'));
  const runInfo = rs.startRun(ws, PROFILE);
  fs.writeFileSync(path.join(runInfo.dir, 'outputs', 'recommendations.json'), `${JSON.stringify(recs, null, 2)}\n`);
  const writeRecs = (next) => fs.writeFileSync(path.join(runInfo.dir, 'outputs', 'recommendations.json'), `${JSON.stringify(next, null, 2)}\n`);
  return { dir, ws, run: runInfo, writeRecs, decisions: path.join(rs.areaDir(ws, AREA), 'decisions.jsonl') };
}

const cli = (s, args) => spawnSync(process.execPath, [REVIEW, args[0], '--workspace', s.ws.dir, '--area', AREA, ...args.slice(1)], { encoding: 'utf8' });
const rec_ = (s, target, verdict, extra = []) => cli(s, ['record', '--kind', 'recommendation', '--target', target, '--verdict', verdict, '--by', 'Pat Example', ...extra]);
const lines = (s) => fs.readFileSync(s.decisions, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));

test('record --kind recommendation stores the verdict with the recommendation evidenceHash', () => {
  const s = setup();
  const r = rec_(s, 'rec_a', 'accepted', ['--note', 'Matches the support threads.']);
  assert.equal(r.status, 0, r.stderr);
  const [d] = lines(s);
  assert.equal(d.kind, 'recommendation');
  assert.equal(d.target, 'rec_a');
  assert.equal(d.verdict, 'accepted');
  assert.equal(d.by, 'Pat Example');
  assert.equal(d.evidenceHash, 'hash-a');
  assert.equal(d.runId, s.run.runId);
  assert.equal(d.note, 'Matches the support threads.');
});

test('--by naming a model, tool, or bot is refused and nothing is written', () => {
  const s = setup();
  for (const by of ['claude', 'assistant', 'toolkit', 'AI', 'Claude Code', 'review bot', 'x']) {
    const r = cli(s, ['record', '--kind', 'recommendation', '--target', 'rec_a', '--verdict', 'accepted', '--by', by]);
    assert.equal(r.status, 2, `--by ${by} should be refused`);
    assert.match(r.stderr, /must name a person/);
  }
  assert.ok(!fs.existsSync(s.decisions));
  const reviewed = cli(s, ['reviewed', '--run', s.run.runId, '--by', 'toolkit']);
  assert.equal(reviewed.status, 2);
  assert.equal(rs.readState(s.ws, AREA).lastReviewed, null);
});

test('a note containing a credential is refused and not echoed', () => {
  const s = setup();
  const token = ['gh', 'p_', 'b'.repeat(24)].join('');
  const r = rec_(s, 'rec_a', 'accepted', ['--note', `see ${token}`]);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /Refusing a note/);
  assert.ok(!r.stderr.includes(token));
  assert.ok(!fs.existsSync(s.decisions));
  const closure = rec_(s, 'rec_a', 'resolved', ['--verified-by', 'Sam Example', '--closure-evidence', `used ${token}`]);
  assert.equal(closure.status, 2, 'closure evidence is scanned too');
  assert.ok(!fs.existsSync(s.decisions));
});

test('resolved without --verified-by and --closure-evidence is recorded as claimed; with both it is verified', () => {
  const s = setup();
  const claimed = rec_(s, 'rec_a', 'resolved');
  assert.equal(claimed.status, 0, claimed.stderr);
  assert.match(claimed.stdout, /claimed, not verified/);
  const half = rec_(s, 'rec_b', 'resolved', ['--verified-by', 'Sam Example']);
  assert.equal(half.status, 0);
  assert.match(half.stdout, /claimed, not verified/);
  const verified = rec_(s, 'rec_c', 'resolved', ['--verified-by', 'Sam Example', '--closure-evidence', 'The restore steps now appear on the how-to page.']);
  assert.equal(verified.status, 0, verified.stderr);
  assert.match(verified.stdout, /\(verified\)/);
  const [a, b, c] = lines(s);
  assert.equal(a.closure, null);
  assert.equal(b.closure, null);
  assert.deepEqual(c.closure, { verifiedBy: 'Sam Example', evidence: 'The restore steps now appear on the how-to page.' });
  const list = cli(s, ['list']);
  assert.equal(list.status, 0);
  const rows = list.stdout.split('\n').filter(Boolean);
  assert.match(rows.find((l) => l.includes('rec_a')), /claimed, not verified/);
  assert.match(rows.find((l) => l.includes('rec_b')), /claimed, not verified/);
  const verifiedRow = rows.find((l) => l.includes('rec_c'));
  assert.match(verifiedRow, /\(verified\)/);
  assert.doesNotMatch(verifiedRow, /not verified/);
});

test('an unknown --target, bad verdict, or missing --kind is refused', () => {
  const s = setup();
  const unknown = rec_(s, 'rec_nope', 'accepted');
  assert.equal(unknown.status, 2);
  assert.match(unknown.stderr, /No recommendation rec_nope/);
  const badVerdict = rec_(s, 'rec_a', 'sounds-fine');
  assert.equal(badVerdict.status, 2);
  assert.match(badVerdict.stderr, /Verdict must be one of/);
  const noTarget = cli(s, ['record', '--kind', 'recommendation', '--verdict', 'accepted', '--by', 'Pat Example']);
  assert.equal(noTarget.status, 2);
  const noKind = cli(s, ['record', '--verdict', 'accepted', '--by', 'Pat Example']);
  assert.equal(noKind.status, 2);
  assert.ok(!fs.existsSync(s.decisions));
});

test('queue lists recommendations that lack a verdict and flags re-review', () => {
  const s = setup([
    rec('rec_a', 'create', 'hash-a'),
    rec('rec_b', 'update', 'hash-b', { human: { verdict: 'accepted' } }),
    rec('rec_c', 'improve-discoverability', 'hash-c', { human: { verdict: 'accepted', needsReReview: true } }),
  ]);
  const r = cli(s, ['queue']);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /rec_a\s+create/);
  assert.match(r.stdout, /no verdict/);
  assert.doesNotMatch(r.stdout, /rec_b/);
  assert.match(r.stdout, /rec_c.*RE-REVIEW/);
  assert.match(r.stdout, /Proposed judgment for rec_a/);
  const empty = setup([rec('rec_z', 'no-action', 'h', { human: { verdict: 'no-action' } })]);
  assert.match(cli(empty, ['queue']).stdout, /nothing waiting/);
});

test('stale reports a decision whose evidenceHash changed and one whose recommendation disappeared', () => {
  const s = setup();
  for (const id of ['rec_a', 'rec_b', 'rec_c']) assert.equal(rec_(s, id, 'accepted').status, 0);
  const fresh = cli(s, ['stale']);
  assert.equal(fresh.status, 0);
  assert.match(fresh.stdout, /no decision rests on changed evidence/);
  s.writeRecs([rec('rec_a', 'create', 'hash-a-CHANGED'), rec('rec_c', 'no-action', 'hash-c')]);
  const stale = cli(s, ['stale']);
  assert.equal(stale.status, 0, stale.stderr);
  assert.match(stale.stdout, /rec_a: decided "accepted".*evidence has changed/);
  assert.match(stale.stdout, /rec_b: decided "accepted".*no such recommendation/);
  assert.doesNotMatch(stale.stdout, /rec_c/);
});

test('stale uses the latest decision for a target', () => {
  const s = setup();
  rec_(s, 'rec_a', 'accepted');
  s.writeRecs([rec('rec_a', 'create', 'hash-a-v2'), rec('rec_b', 'update', 'hash-b'), rec('rec_c', 'no-action', 'hash-c')]);
  assert.match(cli(s, ['stale']).stdout, /rec_a/);
  rec_(s, 'rec_a', 'deferred');
  assert.match(cli(s, ['stale']).stdout, /no decision rests on changed evidence/);
});

test('record --kind classify stores a type verdict and rejects an unknown type', () => {
  const s = setup();
  const r = cli(s, ['record', '--kind', 'classify', '--page', '/widgets/mixed', '--verdict', 'explanation', '--by', 'Pat Example', '--note', 'Mostly rationale.']);
  assert.equal(r.status, 0, r.stderr);
  const [d] = lines(s);
  assert.equal(d.kind, 'classify');
  assert.equal(d.page, '/widgets/mixed');
  assert.equal(d.verdict, 'explanation');
  assert.equal(d.by, 'Pat Example');
  assert.equal(d.target, undefined);
  const bad = cli(s, ['record', '--kind', 'classify', '--page', '/widgets/mixed', '--verdict', 'essay', '--by', 'Pat Example']);
  assert.equal(bad.status, 2);
  assert.match(bad.stderr, /Classification verdict must be one of/);
  const noPage = cli(s, ['record', '--kind', 'classify', '--verdict', 'tutorial', '--by', 'Pat Example']);
  assert.equal(noPage.status, 2);
  assert.equal(lines(s).length, 1);
});

test('reviewed updates lastReviewed only', () => {
  const s = setup();
  const before = rs.readState(s.ws, AREA);
  const r = cli(s, ['reviewed', '--run', s.run.runId, '--by', 'Pat Example']);
  assert.equal(r.status, 0, r.stderr);
  const after = rs.readState(s.ws, AREA);
  assert.equal(after.lastReviewed.runId, s.run.runId);
  assert.equal(after.lastReviewed.by, 'Pat Example');
  assert.deepEqual(after.lastAttempted, before.lastAttempted);
  assert.equal(after.lastCompleted, null);
  assert.deepEqual(after.runs, before.runs);
  const missing = cli(s, ['reviewed', '--by', 'Pat Example']);
  assert.equal(missing.status, 2);
});

test('decisions.jsonl is append-only: earlier lines are byte-identical after later records', () => {
  const s = setup();
  rec_(s, 'rec_a', 'accepted');
  const first = fs.readFileSync(s.decisions);
  rec_(s, 'rec_b', 'rejected', ['--note', 'Out of scope.']);
  const second = fs.readFileSync(s.decisions);
  assert.ok(second.length > first.length);
  assert.deepEqual(second.subarray(0, first.length), first);
  cli(s, ['record', '--kind', 'classify', '--page', '/widgets/x', '--verdict', 'how-to', '--by', 'Pat Example']);
  const third = fs.readFileSync(s.decisions);
  assert.deepEqual(third.subarray(0, second.length), second);
  assert.equal(lines(s).length, 3);
  assert.equal(third.toString().split('\n').filter(Boolean).length, 3);
});

test('a workspace inside the toolkit repo is refused', () => {
  const r = spawnSync(process.execPath, [REVIEW, 'list', '--workspace', path.join(ROOT, 'tests', 'never-created-workspace'), '--area', AREA], { encoding: 'utf8' });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /outside the toolkit repository/);
});
