'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { validateProfile, scopeOf, profileHash, expandTerms } = require('../scripts/lib/profile.cjs');
const { globToRegExp, matchesAny, walkSafe, resolveWithin } = require('../scripts/lib/paths.cjs');
const { findSecrets } = require('../scripts/lib/secrets.cjs');

const EXAMPLE = path.join(__dirname, '..', 'examples', 'widgets.profile.json');
const example = () => JSON.parse(fs.readFileSync(EXAMPLE, 'utf8'));
const validate = (p, opts) => validateProfile(p, { baseDir: path.dirname(EXAMPLE), ...opts });
const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'profile-'));

test('the synthetic example profile is valid and normalizes defaults', () => {
  const r = validate(example());
  assert.equal(r.ok, true, JSON.stringify(r.errors));
  assert.equal(r.profile.area.id, 'widgets');
  assert.deepEqual(r.profile.scope.report.exclude, ['/widgets/legacy/**']);
  assert.ok(r.profile.scope.evidence.include.includes('/auth/**'), 'evidence scope defaults to report plus related areas');
  assert.equal(r.profile.tasks.find((t) => t.id === 'recover-deleted-widget').stage, 'operate', 'journey implies stage');
  assert.equal(profileHash(r.profile), profileHash(validate(example()).profile), 'hash is stable');
});

test('validation rejects bad shapes with a path and a message', () => {
  const cases = [
    [(p) => { p.schemaVersion = 2; }, 'schemaVersion'],
    [(p) => { p.area.id = 'Bad Id'; }, 'area.id'],
    [(p) => { p.site.origin = 'ftp://x.test'; }, 'site.origin'],
    [(p) => { p.site.origin = 'http://docs.example.com'; }, 'site.origin'],
    [(p) => { p.site.origin = 'https://docs.example.test/path'; }, 'site.origin'],
    [(p) => { p.scope.crawl.include = []; }, 'scope.crawl.include'],
    [(p) => { delete p.scope.crawl; }, 'scope.crawl.include'],
    [(p) => { p.scope.crawl.include = ['widgets/**']; }, 'scope.crawl.include'],
    [(p) => { p.tasks[0].journey = 'launch'; }, 'tasks[0].journey'],
    [(p) => { p.tasks[0].terms = []; }, 'tasks[0].terms'],
    [(p) => { p.tasks[1].id = p.tasks[0].id; }, 'duplicate task id'],
    [(p) => { p.tasks[0].expectedTypes = ['video']; }, 'tasks[0].expectedTypes'],
    [(p) => { p.inputs.demand = '../outside.json'; }, 'inputs.demand'],
    [(p) => { p.inputs.mystery = 'x.json'; }, 'inputs.mystery'],
    [(p) => { p.sources.connectors[0].stagedAs = '/abs/path.json'; }, 'stagedAs'],
    [(p) => { p.release.defaultStatus = 'ga'; }, 'release.defaultStatus'],
  ];
  for (const [mutate, expected] of cases) {
    const p = example();
    mutate(p);
    const r = validate(p);
    assert.equal(r.ok, false, `expected failure for ${expected}`);
    assert.ok(r.errors.some((e) => `${e.path} ${e.message}`.includes(expected)), `no error mentioning ${expected}: ${JSON.stringify(r.errors)}`);
  }
});

test('credentials in a profile are refused, and the value is never echoed', () => {
  const p = example();
  p.sources.connectors[0].ref = ['https://user:', 'hunter2hunter2', '@', 'support.example.test/export'].join('');
  p.area.owner = 'docs-team';
  p.apiToken = 'abc';
  const r = validate(p);
  assert.equal(r.ok, false);
  const text = JSON.stringify(r.errors);
  assert.match(text, /credential/);
  assert.ok(!text.includes('hunter2'));
  assert.ok(findSecrets({ note: 'see ghp_' + 'a'.repeat(30) }).length === 1);
  assert.equal(findSecrets({ note: 'ordinary text with token-free words' }).length, 0);
});

test('local source paths must stay inside permitted roots', () => {
  const p = example();
  p.sources.local[0].path = '/etc';
  const r = validate(p);
  assert.equal(r.ok, false);
  assert.match(JSON.stringify(r.errors), /outside permitted roots/);
  assert.equal(validate(p, { allowedRoots: ['/etc'] }).ok, true, 'an explicitly allowed root is accepted');
});

test('glob scope: ** crosses slashes, * does not, exclusions win', () => {
  assert.ok(globToRegExp('/widgets/**').test('/widgets'));
  assert.ok(globToRegExp('/widgets/**').test('/widgets/a/b'));
  assert.ok(!globToRegExp('/widgets/**').test('/widgetsx'));
  assert.ok(globToRegExp('/widgets/*').test('/widgets/a'));
  assert.ok(!globToRegExp('/widgets/*').test('/widgets/a/b'));
  assert.ok(matchesAny('/widgets/a/?x=1#y', ['/widgets/**']));
  const p = validate(example()).profile;
  const base = p.site.origin;
  assert.deepEqual(pick(scopeOf(p, `${base}/widgets/create-widget`)), { crawl: true, report: true, evidence: true, related: null });
  assert.deepEqual(pick(scopeOf(p, `${base}/auth/api-tokens`)), { crawl: true, report: false, evidence: true, related: 'auth' });
  assert.deepEqual(pick(scopeOf(p, `${base}/widgets/legacy/old`)), { crawl: false, report: false, evidence: false, related: null });
  assert.deepEqual(pick(scopeOf(p, `${base}/blog/news`)), { crawl: false, report: false, evidence: false, related: null });
  assert.equal(scopeOf(p, 'https://elsewhere.example.test/widgets/x').reason, 'other origin');
  assert.equal(scopeOf(p, 'not a url').reason, 'not a URL');
});

function pick(s) {
  return { crawl: s.crawl, report: s.report, evidence: s.evidence, related: s.related };
}

test('aliases expand in both directions', () => {
  const p = validate(example()).profile;
  assert.ok(expandTerms(p, ['share a widget']).includes('link-based access'));
  assert.ok(expandTerms(p, ['sharing links']).includes('share a widget'));
  assert.deepEqual(expandTerms(p, ['unrelated']), ['unrelated']);
});

test('walkSafe records symlinks that leave the permitted roots and unsupported formats', () => {
  const root = tmp();
  const outside = tmp();
  fs.writeFileSync(path.join(root, 'a.md'), '# a');
  fs.writeFileSync(path.join(root, 'b.bin'), 'x');
  fs.writeFileSync(path.join(outside, 'secret.md'), '# secret');
  fs.symlinkSync(outside, path.join(root, 'link-out'));
  fs.symlinkSync(path.join(root, 'a.md'), path.join(root, 'link-in.md'));
  const { files, skipped } = walkSafe(root);
  assert.deepEqual(files.map((f) => path.basename(f)).sort(), ['a.md']);
  const reasons = skipped.map((s) => s.reason);
  assert.ok(reasons.some((r) => /symlink leaves permitted roots/.test(r)));
  assert.ok(reasons.some((r) => /unsupported format \.bin/.test(r)));
  assert.equal(resolveWithin(root, 'link-out', [root]).ok, false);
  assert.equal(resolveWithin(root, 'a.md', [root]).ok, true);
});

test('profile CLI: validate, scope, and init refuses to write inside the repo', () => {
  const run = (...a) => spawnSync('node', [path.join(__dirname, '..', 'scripts', 'profile.cjs'), ...a], { encoding: 'utf8' });
  const ok = run('validate', EXAMPLE);
  assert.equal(ok.status, 0, ok.stderr);
  assert.match(ok.stdout, /Valid profile for area "widgets"/);
  const scope = run('scope', EXAMPLE, 'https://docs.example.test/widgets/x', 'https://elsewhere.example.test/y');
  assert.match(scope.stdout, /crawl=true report=true/);
  assert.match(scope.stdout, /other origin/);
  const dir = tmp();
  const bad = path.join(dir, 'bad.json');
  const p = example();
  p.area.id = 'X';
  fs.writeFileSync(bad, JSON.stringify(p));
  assert.equal(run('validate', bad).status, 2);
  const inRepo = run('init', '--out', path.join(__dirname, '..', 'examples', 'new.profile.json'), '--id', 'demo', '--origin', 'https://docs.example.test');
  assert.notEqual(inRepo.status, 0);
  assert.match(inRepo.stderr, /inside the toolkit repo/);
  const fine = run('init', '--out', path.join(dir, 'demo.json'), '--id', 'demo', '--origin', 'https://docs.example.test');
  assert.equal(fine.status, 0, fine.stderr);
  assert.equal(run('validate', path.join(dir, 'demo.json')).status, 0);
});
