'use strict';

// Every network destination and every child process in the toolkit is listed here and in
// references/network.md. A new one must be added to both, on purpose.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const SCRIPTS = path.join(__dirname, '..', 'scripts');

function* files(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* files(full);
    else if (e.name.endsWith('.cjs')) yield full;
  }
}

const strip = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').filter((l) => !/^\s*\/\//.test(l)).join('\n');
const rel = (f) => path.relative(SCRIPTS, f).split(path.sep).join('/');
const usersOf = (re) => [...files(SCRIPTS)].filter((f) => re.test(strip(fs.readFileSync(f, 'utf8')))).map(rel).sort();

test('only the polite crawler and the npm version check can reach the network', () => {
  // global fetch used as a call, a default parameter value, or a bare reference: not the module path 'lib/fetch.cjs'
  assert.deepEqual(usersOf(/(?<![\w./'"-])fetch(?![\w.'"-])/), ['lib/fetch.cjs', 'versions.cjs']);
  assert.deepEqual(usersOf(/require\(['"]node:(?:https?|net|dns|tls|http2|dgram)['"]\)|require\(['"](?:https?|net|dns|tls)['"]\)/), []);
  assert.deepEqual(usersOf(/\b(?:XMLHttpRequest|WebSocket|EventSource)\b/), []);
});

test('only audit.cjs, hash.cjs, and lint.cjs start child processes, and only node and git', () => {
  assert.deepEqual(usersOf(/child_process/), ['audit.cjs', 'lib/hash.cjs', 'lint.cjs']);
  const lint = strip(fs.readFileSync(path.join(SCRIPTS, 'lint.cjs'), 'utf8'));
  assert.equal((lint.match(/spawnSync\(/g) || []).length, 1);
  assert.match(lint, /spawnSync\(process\.execPath, \['--check'/);
  const audit = strip(fs.readFileSync(path.join(SCRIPTS, 'audit.cjs'), 'utf8'));
  assert.match(audit, /spawnSync\(process\.execPath/);
  assert.equal((audit.match(/spawnSync\(/g) || []).length, 1, 'audit.cjs must spawn only the site-audit crawler');
  const hash = strip(fs.readFileSync(path.join(SCRIPTS, 'lib', 'hash.cjs'), 'utf8'));
  assert.match(hash, /execFileSync\('git'/);
  assert.equal((hash.match(/execFileSync\(/g) || []).length, 1);
});

test('no script evaluates retrieved text as code', () => {
  assert.deepEqual(usersOf(/\beval\(|new Function\(|vm\.runIn|require\(['"]node:vm['"]\)/), []);
});

test('help text names the network destinations a user needs to know about', () => {
  const run = (script) => spawnSync(process.execPath, [path.join(SCRIPTS, script), '--help'], { encoding: 'utf8' }).stdout;
  assert.match(run('audit.cjs'), /profile's origin only/);
  assert.match(run('site-audit.cjs'), /--check-links[\s\S]{0,120}contacts the\s+sites your pages link to/);
  assert.match(run('site-audit.cjs'), /A page that redirects to another origin is not followed/);
  assert.match(run('versions.cjs'), /registry\.npmjs\.org/);
  assert.match(run('stage.cjs'), /makes no network requests/);
  assert.match(run('page-check.cjs'), /No network access/);
});

test('references/network.md lists each destination the code can reach', () => {
  const doc = fs.readFileSync(path.join(__dirname, '..', 'references', 'network.md'), 'utf8');
  for (const needle of ['registry.npmjs.org', 'robots.txt', 'sitemap', '--check-links', 'another origin', 'git']) assert.ok(doc.includes(needle), `network.md should mention ${needle}`);
});
