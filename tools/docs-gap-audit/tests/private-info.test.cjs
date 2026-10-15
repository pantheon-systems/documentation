'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { scan } = require('../scripts/check-private-info.cjs');

test('flags private-looking text and passes clean text', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'priv-'));
  const planted = [
    'see https://acme-internal.atlassian' + '.net/browse/X-1',
    'join acme.slack' + '.com',
    'https://docs.google' + '.com/document/d/abc/edit',
    '/Users' + '/someone/notes',
    'mail jane' + '@corp-internal.io',
    'token ghp_' + 'a'.repeat(30),
  ];
  fs.writeFileSync(path.join(dir, 'bad.md'), planted.join('\n'));
  fs.writeFileSync(path.join(dir, 'ok.md'), 'contact test@example.com about https://example.com/docs');
  const labels = scan(dir).map((f) => f.label);
  for (const expected of ['issue tracker link', 'chat workspace link', 'private document link', 'home-directory path', 'email address', 'access token']) {
    assert.ok(labels.includes(expected), `missing ${expected}`);
  }
  assert.ok(!scan(dir).some((f) => f.file === 'ok.md'));
});

test('custom terms are matched case-insensitively', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'priv-'));
  fs.writeFileSync(path.join(dir, 'a.md'), 'Mentions Initech here');
  assert.equal(scan(dir, ['initech']).length, 1);
});

test('this repository is free of private-looking text', () => {
  assert.deepEqual(scan(path.join(__dirname, '..')), []);
});
