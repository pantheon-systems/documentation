'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const area = require('./area-site.cjs');
const fixture = require('./fixture-site.cjs');

const run = promisify(execFile);
const SCRIPT = path.join(__dirname, '..', 'scripts', 'site-audit.cjs');
const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'scope-'));
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

function profileFor(site, overrides = {}) {
  const base = readJson(path.join(__dirname, '..', 'examples', 'widgets.profile.json'));
  base.site.origin = site.base;
  base.sources = { local: [], connectors: [] };
  base.inputs = {};
  return { ...base, ...overrides };
}

async function audit(args) {
  try {
    const { stdout } = await run('node', [SCRIPT, '--delay', '0', ...args]);
    return { code: 0, stdout, stderr: '' };
  } catch (error) {
    return { code: error.code, stdout: error.stdout, stderr: error.stderr };
  }
}

test('area-scoped crawl fetches only in-scope pages and keeps every other category separate', async () => {
  const site = await area.start();
  const dir = tmp();
  const out = path.join(dir, 'out');
  const file = path.join(dir, 'profile.json');
  fs.writeFileSync(file, JSON.stringify(profileFor(site)));
  try {
    const r = await audit(['--profile', file, '--out', out]);
    assert.equal(r.code, 0, r.stderr);
    const pages = readJson(path.join(out, 'pages.json'));
    const paths = pages.map((p) => p.path);
    for (const expected of ['/widgets', '/widgets/create-widget', '/widgets/api-reference', '/auth/api-tokens']) assert.ok(paths.includes(expected), `missing ${expected}`);
    for (const absent of ['/widgets/legacy/old', '/blog/news', '/private/x']) assert.ok(!paths.includes(absent), `${absent} was crawled`);
    const fetched = site.hits.map((h) => h.url);
    for (const never of ['/widgets/legacy/old', '/blog/news', '/private/x']) assert.ok(!fetched.includes(never), `${never} was requested`);
    const run1 = readJson(path.join(out, 'run.json'));
    const reasons = Object.fromEntries(run1.excluded.map((e) => [new URL(e.url).pathname, e.reason]));
    assert.equal(reasons['/widgets/legacy/old'], 'crawl exclude');
    assert.equal(reasons['/blog/news'], 'outside crawl include');
    assert.equal(reasons['/widgets/x'], 'other origin');
    assert.equal(run1.scope.profileArea, 'widgets');
    assert.ok(run1.coverage.excluded >= 4);
    assert.equal(run1.coverage.blocked, false);
  } finally {
    await site.close();
  }
});

test('a redirect that leaves the origin is recorded and not followed; the inventory says it is incomplete', async () => {
  const site = await area.start();
  const dir = tmp();
  const out = path.join(dir, 'out');
  const file = path.join(dir, 'profile.json');
  fs.writeFileSync(file, JSON.stringify(profileFor(site)));
  try {
    await audit(['--profile', file, '--out', out]);
    assert.ok(!site.hits.some((h) => /^localhost/.test(h.host || '')), 'a request reached the other origin');
    const run1 = readJson(path.join(out, 'run.json'));
    assert.ok(run1.excluded.some((e) => /redirects to another origin/.test(e.reason) && /\/widgets\/moved$/.test(e.url)));
    assert.equal(run1.coverage.offOrigin, 1);
    assert.equal(run1.inventory.complete, false);
    assert.ok(run1.inventory.reasons.some((x) => /redirect to another origin/.test(x)));
    const md = fs.readFileSync(path.join(out, 'health.md'), 'utf8');
    assert.match(md, /The inventory is incomplete/);
    assert.match(md, /unverified/);
  } finally {
    await site.close();
  }
});

test('same-origin redirects are followed and recorded; date conflicts and accessibility issues are flagged as partial checks', async () => {
  const site = await area.start();
  const dir = tmp();
  const out = path.join(dir, 'out');
  const file = path.join(dir, 'profile.json');
  fs.writeFileSync(file, JSON.stringify(profileFor(site)));
  try {
    await audit(['--profile', file, '--out', out]);
    const pages = readJson(path.join(out, 'pages.json'));
    const target = pages.filter((p) => p.path === '/widgets/create-widget');
    assert.equal(target.length, 1, 'a redirect alias must not create a duplicate page record');
    assert.ok(target[0].aliases.some((u) => u.endsWith('/widgets/old-name')), 'the redirect alias is remembered');
    const health = readJson(path.join(out, 'health.json'));
    assert.deepEqual(health.governance.dateConflicts.map((d) => d.path), ['/widgets/stale']);
    assert.ok(health.governance.redirected.some((r) => r.path === '/widgets/create-widget' && /old-name/.test(r.from)));
    assert.deepEqual(health.governance.duplicateTitles, [], 'a redirect alias is not a duplicate title');
    assert.equal(health.governance.dateConflicts[0].visible, '2019-03-01');
    assert.equal(health.governance.dateConflicts[0].embedded, '2026-09-01');
    const a = health.accessibility;
    assert.equal(a.partial, true);
    assert.ok(a.genericLinkText.some((x) => x.path === '/widgets/a11y' && /click here/i.test(x.text)));
    assert.ok(a.visualOnlyInstructions.some((x) => x.path === '/widgets/a11y'));
    assert.ok(a.unexpandedAcronyms.some((x) => x.path === '/widgets/a11y' && x.term === 'WGT'));
    assert.ok(health.images.missingAlt.some((x) => x.path === '/widgets/a11y'));
    assert.match(a.note, /not inspected/);
    assert.ok(health.links.orphans.includes('/widgets/link-based-access'), 'the hard-to-find how-to is reported as an orphan');
    assert.equal(health.links.inventoryComplete, false, 'an orphan finding on an incomplete inventory is flagged unverified');
  } finally {
    await site.close();
  }
});

test('--limit leaves in-scope pages unexamined and says so; robots.txt skips are separate from exclusions', async () => {
  const site = await area.start();
  const dir = tmp();
  const out = path.join(dir, 'out');
  const file = path.join(dir, 'profile.json');
  fs.writeFileSync(file, JSON.stringify(profileFor(site)));
  try {
    const limited = await audit(['--profile', file, '--out', out, '--limit', '3']);
    assert.equal(limited.code, 0, limited.stderr);
    const run1 = readJson(path.join(out, 'run.json'));
    assert.ok(run1.coverage.unexamined > 0);
    assert.equal(run1.unexamined.length, run1.coverage.unexamined);
    assert.equal(run1.inventory.complete, false);
    const out2 = path.join(dir, 'out2');
    const robots = await audit(['--profile', file, '--out', out2, '--include', '/private/**']);
    assert.equal(robots.code, 0, robots.stderr);
    const run2 = readJson(path.join(out2, 'run.json'));
    assert.equal(run2.skipped.length, 1);
    assert.match(run2.skipped[0].reason, /robots\.txt/);
    assert.ok(!site.hits.some((h) => h.url === '/private/x'));
    assert.equal(run2.coverage.skippedByRobots, 1);
  } finally {
    await site.close();
  }
});

test('an unlisted off-origin sitemap entry is never fetched, even without a profile', async () => {
  const site = await area.start();
  const out = tmp();
  try {
    const r = await audit([`${site.base}/sitemap.xml`, '--origin', site.base, '--out', out]);
    assert.equal(r.code, 0, r.stderr);
    assert.ok(!site.hits.some((h) => /elsewhere/.test(h.host || '')));
    assert.ok(readJson(path.join(out, 'run.json')).excluded.some((e) => e.reason === 'other origin'));
  } finally {
    await site.close();
  }
});

test('a blocked crawl exits 3, writes run.json, and never looks like a complete empty audit', async () => {
  const site = await fixture.start({ blockAll: true });
  const out = tmp();
  try {
    const r = await audit([`${site.base}/sitemap.xml`, '--out', out]);
    assert.equal(r.code, 3);
    const run1 = readJson(path.join(out, 'run.json'));
    assert.equal(run1.coverage.blocked, true);
    assert.equal(run1.inventory.complete, false);
    assert.ok(run1.inventory.reasons.some((x) => /blocked/.test(x)));
  } finally {
    await site.close();
  }
});

test('saved pages are never called a complete inventory unless the caller declares it', async () => {
  const dir = tmp();
  for (const [route, html] of Object.entries(fixture.PAGES)) {
    fs.writeFileSync(path.join(dir, route === '/' ? 'home.html' : `${route.slice(1).split('/').join('__')}.html`), html);
  }
  const out = path.join(tmp(), 'a');
  await run('node', [SCRIPT, '--from-dir', dir, '--base-url', 'https://docs.example.test', '--out', out]);
  const a = readJson(path.join(out, 'run.json'));
  assert.equal(a.inventory.complete, false);
  assert.match(a.inventory.reasons[0], /not verified/);
  const out2 = path.join(tmp(), 'b');
  await run('node', [SCRIPT, '--from-dir', dir, '--base-url', 'https://docs.example.test', '--out', out2, '--assume-complete']);
  const b = readJson(path.join(out2, 'run.json'));
  assert.equal(b.inventory.complete, true);
  assert.equal(b.inventory.declaredComplete, true);
});
