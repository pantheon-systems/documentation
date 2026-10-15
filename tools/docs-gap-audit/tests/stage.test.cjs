'use strict';

// CLI tests for scripts/stage.cjs: receipts for staged connector exports. Synthetic data only.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { tmp, ROOT, STAGE } = require('./helpers.cjs');
const { sha256 } = require('../scripts/lib/hash.cjs');

const AREA = 'widgets';

function setup() {
  const dir = tmp();
  const ws = path.join(dir, 'workspace');
  const area = path.join(ws, 'areas', AREA);
  fs.mkdirSync(path.join(area, 'staging'), { recursive: true });
  return { ws, area };
}

const run = (args) => spawnSync(process.execPath, [STAGE, ...args], { encoding: 'utf8' });
const cmd = (c, s, extra = [], file = 'staging/export.json', id = 'support-export') => run([c, '--workspace', s.ws, '--area', AREA, '--id', id, '--file', file, ...extra]);
const receipt = (s, file = 'staging/export.json') => JSON.parse(fs.readFileSync(path.join(s.area, `${file}.receipt.json`), 'utf8'));

test('begin writes an in-progress receipt', () => {
  const s = setup();
  const r = cmd('begin', s, ['--connector', 'support-system', '--ref', 'tag:widgets']);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /Receipt opened/);
  const rec = receipt(s);
  assert.equal(rec.status, 'in-progress');
  assert.equal(rec.sourceId, 'support-export');
  assert.equal(rec.connector, 'support-system');
  assert.equal(rec.ref, 'tag:widgets');
  assert.equal(rec.sha256, undefined);
});

test('begin without --id exits 2', () => {
  const s = setup();
  const r = run(['begin', '--workspace', s.ws, '--area', AREA, '--file', 'staging/export.json']);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /begin needs --id/);
});

test('complete records the sha256 and byte count and keeps the connector from begin', () => {
  const s = setup();
  cmd('begin', s, ['--connector', 'support-system', '--ref', 'tag:widgets']);
  const body = '{"items":[1,2,3]}\n';
  fs.writeFileSync(path.join(s.area, 'staging', 'export.json'), body);
  const r = cmd('complete', s, ['--items', '3', '--notes', 'synthetic export']);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /Receipt complete/);
  const rec = receipt(s);
  assert.equal(rec.status, 'complete');
  assert.equal(rec.sha256, sha256(Buffer.from(body)));
  assert.equal(rec.bytes, Buffer.byteLength(body));
  assert.equal(rec.items, 3);
  assert.equal(rec.connector, 'support-system');
  assert.equal(rec.ref, 'tag:widgets');
  assert.equal(rec.notes, 'synthetic export');
});

test('complete refuses an empty file and a missing file, and leaves no complete receipt', () => {
  const s = setup();
  fs.writeFileSync(path.join(s.area, 'staging', 'export.json'), '');
  const empty = cmd('complete', s);
  assert.equal(empty.status, 2);
  assert.match(empty.stderr, /empty/);
  assert.ok(!fs.existsSync(path.join(s.area, 'staging', 'export.json.receipt.json')));
  const missing = cmd('complete', s, [], 'staging/absent.json');
  assert.equal(missing.status, 2);
  assert.match(missing.stderr, /not found/);
});

test('fail records a reason and requires one', () => {
  const s = setup();
  const r = cmd('fail', s, ['--reason', 'connector timed out']);
  assert.equal(r.status, 0, r.stderr);
  const rec = receipt(s);
  assert.equal(rec.status, 'failed');
  assert.equal(rec.reason, 'connector timed out');
  const noReason = cmd('fail', s);
  assert.equal(noReason.status, 2);
  assert.match(noReason.stderr, /needs --id and --reason/);
});

test('status prints the receipt, or says the source was never staged', () => {
  const s = setup();
  const none = run(['status', '--workspace', s.ws, '--area', AREA, '--file', 'staging/export.json']);
  assert.equal(none.status, 0);
  assert.match(none.stdout, /never staged/);
  cmd('begin', s);
  const some = run(['status', '--workspace', s.ws, '--area', AREA, '--file', 'staging/export.json']);
  assert.equal(some.status, 0);
  assert.equal(JSON.parse(some.stdout).status, 'in-progress');
});

test('a credential-like --ref, --notes, or --reason is refused and not echoed or written', () => {
  const s = setup();
  const token = ['gh', 'p_', 'a'.repeat(24)].join('');
  const urlSecret = ['https:', '//', 'user', ':', 'hunter22', '@', 'example.test/x'].join('');
  const refRes = cmd('begin', s, ['--ref', token]);
  assert.equal(refRes.status, 2);
  assert.match(refRes.stderr, /Refusing to write a receipt/);
  assert.ok(!refRes.stderr.includes(token));
  assert.ok(!refRes.stdout.includes(token));
  assert.ok(!fs.existsSync(path.join(s.area, 'staging', 'export.json.receipt.json')));
  fs.writeFileSync(path.join(s.area, 'staging', 'export.json'), '{"a":1}\n');
  const notesRes = cmd('complete', s, ['--notes', `fetched with ${token}`]);
  assert.equal(notesRes.status, 2);
  assert.ok(!notesRes.stderr.includes(token));
  const failRes = cmd('fail', s, ['--reason', urlSecret]);
  assert.equal(failRes.status, 2);
  assert.ok(!failRes.stderr.includes('hunter22'));
  assert.ok(!fs.existsSync(path.join(s.area, 'staging', 'export.json.receipt.json')));
});

test('--file must be relative and may not contain ..', () => {
  const s = setup();
  const abs = cmd('begin', s, [], path.join(s.area, 'staging', 'export.json'));
  assert.equal(abs.status, 2);
  assert.match(abs.stderr, /relative path/);
  const up = cmd('begin', s, [], '../escape.json');
  assert.equal(up.status, 2);
  assert.match(up.stderr, /relative path/);
  const nested = cmd('begin', s, [], 'staging/../../escape.json');
  assert.equal(nested.status, 2);
  assert.ok(!fs.existsSync(path.join(s.ws, 'areas', 'escape.json.receipt.json')));
});

test('a workspace inside the toolkit repo is refused', () => {
  const inside = path.join(ROOT, 'tests', 'never-created-workspace');
  const r = run(['begin', '--workspace', inside, '--area', AREA, '--id', 'x', '--file', 'staging/export.json']);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /outside the toolkit repository/);
  assert.ok(!fs.existsSync(inside));
});

test('exit codes: help is 0; unknown command, unknown option, and missing required args are 2', () => {
  const s = setup();
  assert.equal(run(['--help']).status, 0);
  assert.equal(run([]).status, 0);
  const unknown = cmd('bogus', s);
  assert.equal(unknown.status, 2);
  assert.match(unknown.stderr, /Unknown command/);
  const opt = run(['begin', '--nope', 'x']);
  assert.equal(opt.status, 2);
  const missing = run(['begin', '--workspace', s.ws]);
  assert.equal(missing.status, 2);
  assert.match(missing.stderr, /--workspace, --area and --file/);
});
