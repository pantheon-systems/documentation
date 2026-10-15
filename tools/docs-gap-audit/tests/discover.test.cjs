'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const fixture = require('./fixture-site.cjs');
const { fromRepo, fromDocs, dedupe } = require('../scripts/discover.cjs');

const run = promisify(execFile);
const script = (name) => path.join(__dirname, '..', 'scripts', name);

function write(root, files) {
  for (const [rel, body] of Object.entries(files)) {
    const full = path.join(root, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, body);
  }
  return root;
}

const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'discover-'));

function syntheticRepo() {
  return write(tmp(), {
    'package.json': JSON.stringify({ name: 'acme-widgets', bin: { 'acme-widgets': 'cli.js' } }),
    'README.md': '# Acme\n\n## Installation\n\n## Widget sharing\n\nShare widgets.\n',
    'node_modules/dep/index.js': "server.tool('should_be_skipped', {})",
    'src/server.js':
      "server.tool('widget_create', {});\nserver.tool('widget_export', {});\nconst k = process.env.ACME_API_TOKEN;\napp.post('/widgets/:id/archive', h);\nprogram.command('widget-sync');\n",
    'plugin/acme.php':
      "register_rest_route('acme/v1', '/widgets', []);\nregister_block_type('acme/widget-card');\ndo_action('acme_widget_saved');\nWP_CLI::add_command('acme purge', 'X');\n",
  });
}

test('repo extraction finds tools, commands, env vars, routes, WordPress items, and skips node_modules', () => {
  const found = fromRepo(syntheticRepo());
  const has = (kind, name) => found.some((c) => c.kind === kind && c.name === name);
  assert.ok(has('cli-binary', 'acme-widgets'));
  assert.ok(has('tool', 'widget_create'));
  assert.ok(has('tool', 'widget_export'));
  assert.ok(has('env-var', 'ACME_API_TOKEN'));
  assert.ok(found.some((c) => c.kind === 'http-route' && c.name.startsWith('POST /widgets/:id/archive')));
  assert.ok(has('cli-command', 'widget-sync'));
  assert.ok(has('rest-route', 'acme/v1/widgets'));
  assert.ok(has('block', 'acme/widget-card'));
  assert.ok(has('hook', 'acme_widget_saved'));
  assert.ok(has('wp-cli-command', 'wp acme purge'));
  assert.ok(has('repo-doc-heading', 'Widget sharing'));
  assert.ok(!found.some((c) => c.name === 'should_be_skipped'), 'node_modules was scanned');
  assert.ok(!found.some((c) => c.name === 'Installation'), 'generic heading was kept');
});

test('changelog, release, and planning sources set status and extract bullets', () => {
  const root = write(tmp(), {
    'CHANGELOG.md':
      '# Changelog\n\n## Unreleased\n\n- Add `widget_pause` support for scheduled pauses\n\n## 2.3.0\n\n### Added\n\n- Added bulk widget export to CSV\n- Fix typo in error message\n',
    'post.html': '<h1>Release 2.3</h1><h2>Widget sharing links</h2><ul><li>Share a widget with a public link</li></ul>',
    'plan.md': '# Plan\n\n## Widget templates\n\nTeams need to reuse the same widget configuration across many projects without copying settings by hand each time.\n\n- Let teams save a template of widget settings\n',
    'stub.md': '# Archive a widget\n\n\\\\[placeholder\\\\]\n',
  });
  const log = fromDocs(path.join(root, 'CHANGELOG.md'), 'changelog', 'shipped');
  assert.equal(log.find((c) => c.name.includes('widget_pause')).status, 'planned');
  assert.equal(log.find((c) => c.name.includes('bulk widget export')).status, 'shipped');
  assert.ok(!log.some((c) => /typo/i.test(c.name)), 'fix entries should be skipped');
  const post = fromDocs(path.join(root, 'post.html'), 'release', 'shipped');
  assert.ok(post.some((c) => c.name === 'Widget sharing links'));
  assert.ok(post.some((c) => /public link/.test(c.name)));
  const plan = fromDocs(path.join(root, 'plan.md'), 'planning', 'planned');
  const stubs = fromDocs(path.join(root, 'stub.md'), 'planning', 'planned');
  assert.equal(stubs.length, 1);
  assert.equal(stubs[0].kind, 'planning-stub');
  assert.equal(stubs[0].name, 'Archive a widget');
  assert.ok(plan.every((c) => c.status === 'planned'));
  assert.ok(plan.some((c) => c.name === 'Widget templates'));
});

test('dedupe merges the same candidate from several sources and keeps shipped status', () => {
  const a = { name: 'Widget export', kind: 'planning-heading', status: 'planned', source: 'a:1', terms: [] };
  const b = { name: 'widget export', kind: 'release-heading', status: 'shipped', source: 'b:2', terms: [] };
  const [merged] = dedupe([a, b]);
  assert.equal(merged.status, 'shipped');
  assert.deepEqual(merged.sources, ['a:1', 'b:2']);
});

test('discover compares candidates with published pages and sorts gaps first', async () => {
  const site = await fixture.start();
  const out = tmp();
  try {
    await run('node', [script('site-audit.cjs'), `${site.base}/sitemap.xml`, '--out', out, '--delay', '0']);
    const repo = syntheticRepo();
    const { stdout } = await run('node', [
      script('discover.cjs'), '--pages', path.join(out, 'pages.json'), '--repo', repo, '--json', '--features-out', path.join(out, 'features.txt'),
    ]);
    const results = JSON.parse(stdout);
    const byName = Object.fromEntries(results.map((r) => [r.name, r]));
    assert.notEqual(byName.widget_create.suggested, 'None', 'widget_create is on the reference page');
    assert.equal(byName.widget_export.suggested, 'None', 'widget_export is not published');
    assert.equal(results[0].suggested, 'None', 'gaps sort first');
    const features = fs.readFileSync(path.join(out, 'features.txt'), 'utf8');
    assert.match(features, /widget_export ::/);
    const md = await run('node', [script('discover.cjs'), '--pages', path.join(out, 'pages.json'), '--repo', repo]);
    assert.match(md.stdout, /Auditor verdict/);
  } finally {
    await site.close();
  }
});

test('items whose text mentions a flag, alpha, beta, or opt-in get status limited', () => {
  const root = write(tmp(), {
    'CHANGELOG.md': '## 1.0.0\n\n- Added widget comments, off unless the site opts in\n- Added widget sharing for every site\n',
  });
  const items = fromDocs(path.join(root, 'CHANGELOG.md'), 'changelog', 'shipped');
  assert.equal(items.find((c) => /comments/.test(c.name)).status, 'limited');
  assert.equal(items.find((c) => /sharing/.test(c.name)).status, 'shipped');
});

test('site-audit --from-dir audits saved HTML without any network access', async () => {
  const dir = tmp();
  for (const [route, html] of Object.entries(fixture.PAGES)) {
    const name = route === '/' ? 'home.html' : `${route.slice(1).split('/').join('__')}.html`;
    fs.writeFileSync(path.join(dir, name), html);
  }
  const out = tmp();
  await run('node', [script('site-audit.cjs'), '--from-dir', dir, '--base-url', 'https://docs.example.test', '--out', out]);
  const pages = JSON.parse(fs.readFileSync(path.join(out, 'pages.json'), 'utf8'));
  assert.ok(pages.some((p) => p.path === '/'));
  assert.ok(pages.some((p) => p.path === '/guide' && p.url === 'https://docs.example.test/guide'));
  assert.match(fs.readFileSync(path.join(out, 'health.md'), 'utf8'), /\/orphan/);
  assert.equal(JSON.parse(fs.readFileSync(path.join(out, 'run.json'), 'utf8')).userAgent, 'none (offline)');
});
