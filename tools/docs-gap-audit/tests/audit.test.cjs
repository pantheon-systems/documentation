'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const fixture = require('./fixture-site.cjs');
const { parseHtml } = require('../scripts/lib/html.cjs');
const { parseRobots, robotsAllows } = require('../scripts/lib/fetch.cjs');
const { parseFeatures, evaluate } = require('../scripts/coverage.cjs');
const { compare } = require('../scripts/names.cjs');
const { findClaims, latestVersion, judge } = require('../scripts/versions.cjs');

const run = promisify(execFile);
const script = (name) => path.join(__dirname, '..', 'scripts', name);
const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'gap-audit-'));

async function audit(site, out, extra = []) {
  try {
    const { stdout } = await run('node', [script('site-audit.cjs'), `${site.base}/sitemap.xml`, '--out', out, '--delay', '0', ...extra]);
    return { code: 0, stdout };
  } catch (error) {
    return { code: error.code, stdout: error.stdout, stderr: error.stderr };
  }
}

test('html parser separates missing alt from empty alt and skips navigation', () => {
  const parsed = parseHtml(fixture.PAGES['/guide']);
  assert.equal(parsed.title, 'Guide');
  assert.deepEqual(parsed.images.map((i) => i.alt), [null, '']);
  assert.ok(parsed.links.some((l) => l.href === '/howto'));
  assert.ok(!parsed.textLines.join('\n').includes('Footer text'));
});

test('robots rules: longest match wins, wildcard and anchor work', () => {
  const rules = parseRobots('User-agent: *\nDisallow: /private/\nAllow: /private/ok\nDisallow: /*.pdf$\n', 'docs-gap-audit/0.1');
  assert.equal(robotsAllows(rules, '/private/x'), false);
  assert.equal(robotsAllows(rules, '/private/ok'), true);
  assert.equal(robotsAllows(rules, '/a/b.pdf'), false);
  assert.equal(robotsAllows(rules, '/a/b.pdf.html'), true);
  assert.equal(robotsAllows(rules, '/guide'), true);
});

test('site-audit crawls the fixture, honors robots.txt, and flags known problems', async () => {
  const site = await fixture.start();
  const out = tmp();
  try {
    const result = await audit(site, out);
    assert.equal(result.code, 0, result.stderr);
    assert.ok(!site.hits.includes('/private/secret'), 'robots-disallowed page was requested');
    const pages = JSON.parse(fs.readFileSync(path.join(out, 'pages.json'), 'utf8'));
    assert.equal(pages.length, 6);
    const health = fs.readFileSync(path.join(out, 'health.md'), 'utf8');
    assert.match(health, /\/orphan/, 'orphan page not reported');
    assert.match(health, /\/howto/, 'dead end not reported');
    assert.match(health, /TODO/i, 'placeholder text not reported');
    assert.match(health, /\/missing-page/, 'internal link outside the crawl not reported');
    const run1 = JSON.parse(fs.readFileSync(path.join(out, 'run.json'), 'utf8'));
    assert.equal(run1.skipped.length, 1);
    assert.match(run1.userAgent, /docs-gap-audit/);
  } finally {
    await site.close();
  }
});

test('site-audit stops after repeated 403 responses and saves partial results', async () => {
  const site = await fixture.start({ blockAll: true });
  const out = tmp();
  try {
    const result = await audit(site, out);
    assert.equal(result.code, 3);
    assert.match(result.stderr, /blocked/);
    assert.ok(fs.existsSync(path.join(out, 'run.json')));
    const nonRobots = site.hits.filter((h) => h !== '/robots.txt' && h !== '/sitemap.xml');
    assert.ok(nonRobots.length <= 3, `kept requesting after the block: ${nonRobots.length}`);
  } finally {
    await site.close();
  }
});

test('coverage suggests ratings from keyword matches', async () => {
  const site = await fixture.start();
  const out = tmp();
  try {
    await audit(site, out);
    const pages = JSON.parse(fs.readFileSync(path.join(out, 'pages.json'), 'utf8'));
    const features = parseFeatures('# comment\n[shipped]\nCreate a widget :: create a widget\nDelete a widget :: delete a widget\n[planned]\nExport widgets :: export | /widget export/\n');
    const [create, del, exp] = features.map((f) => evaluate(f, pages));
    assert.equal(features[2].status, 'planned');
    assert.equal(del.suggested, 'Dedicated');
    assert.equal(create.suggested, 'Partial', 'one matching h2 and no title match rates Partial');
    assert.equal(exp.suggested, 'None');
  } finally {
    await site.close();
  }
});

test('names compare finds docs-only and list-only identifiers', async () => {
  const site = await fixture.start();
  const out = tmp();
  try {
    await audit(site, out);
    const pages = JSON.parse(fs.readFileSync(path.join(out, 'pages.json'), 'utf8'));
    const result = compare(pages, ['widget_create', 'widget_delete', 'widget_export'], { prefixes: ['widget_'] });
    assert.deepEqual(result.docsOnly, ['widget_legacy_call']);
    assert.deepEqual(result.knownOnly, ['widget_export']);
    assert.deepEqual(result.matched, ['widget_create', 'widget_delete']);
  } finally {
    await site.close();
  }
});

test('versions finds "current version" claims and compares with a registry', async () => {
  const http = require('node:http');
  const registry = http.createServer((req, res) => {
    if (req.url === '/acme-widgets') res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ 'dist-tags': { latest: '2.5.1' } }));
    else res.writeHead(404).end();
  });
  await new Promise((r) => registry.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${registry.address().port}`;
  try {
    const claims = findClaims([{ status: 200, path: '/versions', text: 'The current version of acme-widgets is 2.3.0.' }]);
    assert.equal(claims.length, 1);
    assert.equal(claims[0].version, '2.3.0');
    const latest = await latestVersion('acme-widgets', base);
    assert.equal(latest.latest, '2.5.1');
    assert.match(judge(claims[0], latest.latest), /2 minor/);
    const missing = await latestVersion('not-there', base);
    assert.match(missing.error, /404/);
  } finally {
    registry.close();
  }
});

test('report assembles sections and leaves judgment blank', async () => {
  const site = await fixture.start();
  const out = tmp();
  try {
    await audit(site, out);
    await run('node', [script('report.cjs'), '--dir', out, '--title', 'Fixture audit']);
    const report = fs.readFileSync(path.join(out, 'report.md'), 'utf8');
    assert.match(report, /^# Fixture audit/);
    assert.match(report, /## Classification/);
    assert.match(report, /## Health checks/);
    assert.match(report, /What this audit did not cover/);
  } finally {
    await site.close();
  }
});
