'use strict';

// Regression tests for the defects an independent adversarial review found (each was reproduced before the fix).
// Synthetic hosts only: two local servers stand in for "the audited origin" and "some other origin".

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { spawn, spawnSync } = require('node:child_process');
const H = require('./helpers.cjs');
const rs = require('../scripts/lib/runstate.cjs');
const { gitIdentity } = require('../scripts/lib/hash.cjs');
const { claimMatches } = require('../scripts/lib/claims.cjs');
const { findSecrets } = require('../scripts/lib/secrets.cjs');
const { validateSignal } = require('../scripts/lib/signals.cjs');

const { ROOT, tmp } = H;
const SITE_AUDIT = path.join(ROOT, 'scripts', 'site-audit.cjs');
const REVIEW = path.join(ROOT, 'scripts', 'review.cjs');

const html = (title, body = '') => `<!doctype html><html><head><title>${title}</title></head><body><main><h1>${title}</h1>${body}</main></body></html>`;

function server(handler) {
  const log = [];
  const srv = http.createServer((req, res) => {
    log.push(`${req.method} ${req.url}`);
    handler(req, res);
  });
  return new Promise((resolve) => srv.listen(0, '127.0.0.1', () => resolve({ srv, log, base: `http://127.0.0.1:${srv.address().port}`, close: () => new Promise((r) => srv.close(r)) })));
}

const run = (script, args) => new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [script, ...args], { env: process.env });
  let stdout = '';
  let stderr = '';
  child.stdout.on('data', (d) => { stdout += d; });
  child.stderr.on('data', (d) => { stderr += d; });
  child.on('error', reject);
  child.on('close', (status) => resolve({ status, stdout, stderr }));
});

test('a robots.txt that redirects to another origin is not followed', async () => {
  const other = await server((req, res) => { res.end('User-agent: *\nAllow: /\n'); });
  const site = await server((req, res) => {
    if (req.url === '/robots.txt') { res.writeHead(301, { location: `${other.base}/robots.txt` }); res.end(); } else if (req.url === '/sitemap.xml') { res.setHeader('content-type', 'application/xml'); res.end(`<urlset><url><loc>${site.base}/a</loc></url></urlset>`); } else { res.setHeader('content-type', 'text/html'); res.end(html('A')); }
  });
  try {
    const out = tmp();
    const r = await run(SITE_AUDIT, [`${site.base}/sitemap.xml`, '--out', out, '--delay', '0']);
    assert.equal(r.status, 0, r.stdout + r.stderr);
    assert.deepEqual(other.log, [], 'the other origin received no request');
  } finally {
    await site.close();
    await other.close();
  }
});

test('with no --origin, sitemap pages on another origin are excluded, not crawled', async () => {
  const other = await server((req, res) => { res.setHeader('content-type', 'text/html'); res.end(html('Leak')); });
  const site = await server((req, res) => {
    if (req.url === '/sitemap.xml') { res.setHeader('content-type', 'application/xml'); res.end(`<urlset><url><loc>${site.base}/a</loc></url><url><loc>${other.base}/leak</loc></url></urlset>`); } else if (req.url === '/robots.txt') { res.statusCode = 404; res.end(); } else { res.setHeader('content-type', 'text/html'); res.end(html('A')); }
  });
  try {
    const out = tmp();
    const r = await run(SITE_AUDIT, [`${site.base}/sitemap.xml`, '--out', out, '--delay', '0']);
    assert.equal(r.status, 0, r.stdout + r.stderr);
    assert.deepEqual(other.log, [], 'the other origin received no request');
    const runJson = H.readJson(path.join(out, 'run.json'));
    assert.ok(runJson.excluded.some((e) => e.reason === 'other origin'));
  } finally {
    await site.close();
    await other.close();
  }
});

test('a sitemap index child that fails makes the inventory incomplete', async () => {
  const site = await server((req, res) => {
    if (req.url === '/sitemap.xml') { res.setHeader('content-type', 'application/xml'); res.end(`<sitemapindex><sitemap><loc>${site.base}/s1.xml</loc></sitemap><sitemap><loc>${site.base}/s2.xml</loc></sitemap></sitemapindex>`); } else if (req.url === '/s1.xml') { res.setHeader('content-type', 'application/xml'); res.end(`<urlset><url><loc>${site.base}/a</loc></url></urlset>`); } else if (req.url === '/s2.xml') { res.statusCode = 500; res.end(); } else if (req.url === '/robots.txt') { res.statusCode = 404; res.end(); } else { res.setHeader('content-type', 'text/html'); res.end(html('A')); }
  });
  try {
    const out = tmp();
    const r = await run(SITE_AUDIT, [`${site.base}/sitemap.xml`, '--out', out, '--delay', '0']);
    const runJson = H.readJson(path.join(out, 'run.json'));
    assert.equal(runJson.inventory.complete, false, r.stdout);
    assert.match(runJson.inventory.reasons.join(' '), /sitemap file\(s\) could not be read/);
    assert.equal(runJson.failedSitemaps[0].url, `${site.base}/s2.xml`);
  } finally {
    await site.close();
  }
});

test('--check-links stops after three consecutive 403 responses from the audited origin and does not retry them', async () => {
  const site = await server((req, res) => {
    if (req.url === '/sitemap.xml') { res.setHeader('content-type', 'application/xml'); res.end(`<urlset><url><loc>${site.base}/a</loc></url></urlset>`); } else if (req.url === '/robots.txt') { res.statusCode = 404; res.end(); } else if (req.url === '/a') { res.setHeader('content-type', 'text/html'); res.end(html('A', [1, 2, 3, 4, 5].map((i) => `<a href="/x${i}">x${i}</a>`).join(' '))); } else { res.statusCode = 403; res.end(); }
  });
  try {
    const out = tmp();
    const r = await run(SITE_AUDIT, [`${site.base}/sitemap.xml`, '--out', out, '--delay', '0', '--check-links']);
    const linkRequests = site.log.filter((l) => /\/x\d/.test(l));
    assert.ok(linkRequests.length <= 3, `link requests: ${linkRequests.join(', ')}`);
    assert.ok(!linkRequests.some((l) => l.startsWith('GET')), 'a 403 is not retried with GET');
    assert.equal(r.status, 3, r.stdout + r.stderr);
  } finally {
    await site.close();
  }
});

test('auditing a source folder never runs a program named in its git config', () => {
  const dir = tmp();
  const marker = path.join(dir, 'PWNED');
  const repo = path.join(dir, 'repo');
  fs.mkdirSync(repo);
  const git = (...a) => spawnSync('git', ['-C', repo, ...a], { encoding: 'utf8' });
  if (git('init', '-q').status !== 0) return; // no git on this machine; nothing to test
  fs.writeFileSync(path.join(repo, 'f.txt'), 'x');
  git('config', 'core.fsmonitor', `touch ${marker}; false`);
  gitIdentity(repo);
  assert.equal(fs.existsSync(marker), false, 'the audited repo config was executed');
});

test('a planned item related to a task blocks a "public" verdict and the conflict is recorded', () => {
  const { releaseView } = require('../scripts/lib/recommend.cjs');
  const related = [{ name: 'token', status: 'shipped', terms: [] }, { name: 'token rotation', status: 'planned', terms: [] }];
  const signals = { release: { status: 'assessed', summary: { byFeature: { token: { status: 'ga', publicEvidence: true }, 'token rotation': { status: 'planned' } } } } };
  const v = releaseView(related, signals, { release: { publicEvidenceRequired: true } });
  assert.equal(v.state, 'not public');
  assert.ok(v.contradictions.length >= 1);
});

test('a short recorded claim cannot confirm every claim on a page', () => {
  assert.equal(claimMatches('Widgets are deleted after 30 days.', 'e'), false);
  assert.equal(claimMatches('Widgets are deleted after 30 days.', 'Widgets are deleted after 30 days'), true);
  assert.equal(claimMatches('Widgets are deleted after 30 days.', ''), false);
});

test('area and run ids with path separators or dot segments are refused', () => {
  const ws = { dir: tmp() };
  for (const bad of ['../../x', 'a/b', '..', '', 'a b', '.hidden']) assert.throws(() => rs.areaDir(ws, bad), /not a valid id/, bad);
  assert.throws(() => rs.runDirOf(ws, 'widgets', '../../x'), /not a valid id/);
  const r = spawnSync(process.execPath, [REVIEW, 'record', '--workspace', ws.dir, '--area', '../../escaped', '--kind', 'classify', '--page', '/x', '--verdict', 'how-to', '--by', 'Pat Doe'], { encoding: 'utf8' });
  assert.equal(r.status, 2);
  assert.equal(fs.existsSync(path.join(ws.dir, '..', '..', 'escaped')), false);
});

test('one unreadable line in decisions.jsonl does not discard the other human verdicts', () => {
  const ws = { dir: tmp() };
  fs.mkdirSync(rs.areaDir(ws, 'widgets'), { recursive: true });
  fs.writeFileSync(path.join(rs.areaDir(ws, 'widgets'), 'decisions.jsonl'), `${JSON.stringify({ id: 'd1', verdict: 'accepted' })}\n{"id": "d2", "verd\n${JSON.stringify({ id: 'd3', verdict: 'rejected' })}\n`);
  const got = rs.readDecisions(ws, 'widgets', { warn: false });
  assert.deepEqual(got.map((d) => d.id), ['d1', 'd3']);
});

test('concurrent runs on one workspace are all recorded in state.json with distinct ids', async () => {
  const ws = { dir: tmp() };
  const profile = { area: { id: 'widgets' }, site: { origin: 'https://docs.example.test' }, tasks: [{ id: 't1' }] };
  const script = `const rs=require(${JSON.stringify(path.join(ROOT, 'scripts', 'lib', 'runstate.cjs'))});const r=rs.startRun({dir:${JSON.stringify(ws.dir)}},${JSON.stringify(profile)});process.stdout.write(r.runId);`;
  const ids = await Promise.all(Array.from({ length: 6 }, () => new Promise((resolve) => {
    const c = spawn(process.execPath, ['-e', script]);
    let o = '';
    c.stdout.on('data', (d) => { o += d; });
    c.on('close', () => resolve(o));
  })));
  const state = rs.readState(ws, 'widgets');
  const onDisk = fs.readdirSync(path.join(ws.dir, 'areas', 'widgets', 'runs'));
  assert.equal(new Set(ids).size, 6, 'six distinct run ids');
  assert.equal(state.runs.length, onDisk.length, `state lists ${state.runs.length} runs, disk has ${onDisk.length}`);
});

test('review.cjs refuses a model name as the verifier and a run that does not exist', () => {
  const s = { dir: tmp() };
  const rv = (args) => spawnSync(process.execPath, [REVIEW, ...args, '--workspace', s.dir, '--area', 'widgets'], { encoding: 'utf8' });
  assert.equal(rv(['record', '--kind', 'recommendation', '--target', 'r1', '--verdict', 'resolved', '--by', 'Pat Doe', '--verified-by', 'Claude', '--closure-evidence', 'x']).status, 2);
  const r = rv(['reviewed', '--run', 'does-not-exist', '--by', 'Pat Doe']);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /No run does-not-exist/);
  // A person whose given name is "Ai" is not mistaken for a model.
  assert.equal(rv(['reviewed', '--run', 'does-not-exist', '--by', 'Ai Tanaka']).stderr.includes('must name a person'), false);
  assert.equal(rv(['reviewed', '--run', 'x', '--by', 'AI Assistant']).stderr.includes('must name a person'), true);
});

test('camelCase credential keys are flagged', () => {
  for (const key of ['apiToken', 'accessToken', 'clientSecret', 'authToken']) {
    assert.ok(findSecrets({ [key]: 'abc123' }).length >= 1, key);
  }
  assert.equal(findSecrets({ widgetName: 'abc' }).length, 0);
});

test('impossible calendar dates are rejected in signal provenance', () => {
  const good = JSON.parse(fs.readFileSync(path.join(ROOT, 'examples', 'synthetic', 'support', 'demand.json'), 'utf8'));
  assert.equal(validateSignal('demand', good).ok, true, 'the unmodified synthetic export is valid');
  const bad = JSON.parse(JSON.stringify(good));
  bad.provenance.retrievedAt = '2026-13-45';
  const v = validateSignal('demand', bad);
  assert.equal(v.ok, false);
  assert.match(v.errors.join(' '), /retrievedAt/);
});

test('--from-dir does not read a symbolic link that points outside the saved folder', () => {
  const dir = tmp();
  const saved = path.join(dir, 'saved');
  const outside = path.join(dir, 'outside');
  fs.mkdirSync(saved);
  fs.mkdirSync(outside);
  fs.writeFileSync(path.join(saved, 'index.html'), html('Home'));
  fs.writeFileSync(path.join(outside, 'secret.html'), html('OUTSIDE-SECRET-PAGE'));
  fs.symlinkSync(path.join(outside, 'secret.html'), path.join(saved, 'leak.html'));
  const o = path.join(dir, 'o');
  const r = spawnSync(process.execPath, [SITE_AUDIT, '--from-dir', saved, '--base-url', 'https://docs.example.test', '--out', o], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  assert.equal(fs.readFileSync(path.join(o, 'pages.json'), 'utf8').includes('OUTSIDE-SECRET-PAGE'), false);
  assert.match(H.readJson(path.join(o, 'run.json')).inventory.reasons.join(' '), /symbolic link/);
});

test('a profile with no tasks is refused instead of finalizing an empty audit', () => {
  const s = H.setup({ base: 'http://127.0.0.1:9' }, { mutate: (p) => { p.tasks = []; } });
  const r = H.audit(H.runArgs(s));
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /declares no tasks|not valid/);
});

test('a finalized manifest records the true hash of every output, including report.md, and carries source limitations', async () => {
  const areaSite = require('./area-site.cjs');
  const { sha256File } = require('../scripts/lib/hash.cjs');
  const site = await areaSite.start();
  try {
    const s = H.setup(site, {
      mutate: (p) => {
        p.scope.crawl.exclude.push('/widgets/moved');
        p.sources.local.push({ id: 'docsrc', kind: 'docs', path: path.join(H.SYN, 'node-repo') });
      },
    });
    const r = await run(H.AUDIT, H.runArgs(s));
    assert.equal(r.status, 0, r.stdout + r.stderr);
    const latest = H.latestRun(s.ws, 'widgets');
    assert.equal(latest.manifest.status, 'complete');
    for (const o of latest.manifest.outputs) assert.equal(sha256File(path.join(latest.dir, o.path)), o.sha256, `${o.path} hash matches the file on disk`);
    assert.ok(latest.manifest.completeness.limitations.some((l) => /docs/.test(l)));
    const report = fs.readFileSync(path.join(latest.dir, 'outputs', 'report.md'), 'utf8');
    assert.match(report, /source kind "docs" is not read by extraction/);
  } finally {
    await site.close();
  }
});

test('diff refuses to compare runs of different sites', () => {
  const a = { areaId: 'widgets', status: 'complete', schemaVersion: 1, runId: 'r1', profile: { hash: 'h1', scope: { origin: 'https://a.example.test', tasks: ['t1'] } }, tool: { version: '1', schemas: { candidate: 1 } } };
  const b = { ...a, runId: 'r2', profile: { hash: 'h2', scope: { origin: 'https://b.example.test', tasks: ['t2'] } } };
  const c = rs.compatibility(a, b);
  assert.equal(c.compatible, false);
  assert.match(c.reasons.join(' '), /different sites/);
  assert.match(c.warnings.join(' '), /task list changed/);
});

test('an audience axis nobody named is not assessed', () => {
  const { loadSignals } = require('../scripts/lib/signals.cjs');
  const sig = loadSignals({ area: { audience: [] }, environments: {}, inputs: {} }, { areaDir: tmp() });
  assert.equal(sig.audience.status, 'not assessed');
});

test('source identity does not walk into .git or node_modules', () => {
  const dir = tmp();
  fs.mkdirSync(path.join(dir, '.git'));
  fs.mkdirSync(path.join(dir, 'node_modules', 'x'), { recursive: true });
  fs.writeFileSync(path.join(dir, '.git', 'config.json'), '{}');
  fs.writeFileSync(path.join(dir, 'node_modules', 'x', 'i.js'), 'x');
  fs.writeFileSync(path.join(dir, 'a.js'), 'x');
  const id = rs.localSourceIdentity({ id: 's', kind: 'repo', path: dir, abs: dir }, [dir]);
  assert.equal(id.fileCount, 1, JSON.stringify(id).slice(0, 300));
});

test('a release item that names a task decides that task\'s release state over keyword matches to candidates', () => {
  const { releaseView } = require('../scripts/lib/recommend.cjs');
  const planned = [{ name: 'redirect', status: 'planned', terms: [] }];
  const mk = (items) => ({ release: { status: 'assessed', summary: { byFeature: {}, byTask: items } } });
  const prof = { release: { publicEvidenceRequired: true } };
  assert.equal(releaseView(planned, mk({ t1: [{ status: 'ga', publicEvidence: 'release note' }] }), prof, { id: 't1' }).state, 'public');
  assert.equal(releaseView(planned, mk({ t1: [{ status: 'planned' }] }), prof, { id: 't1' }).state, 'not public');
  const mixed = releaseView(planned, mk({ t1: [{ status: 'ga', publicEvidence: 'x' }, { status: 'planned' }] }), prof, { id: 't1' });
  assert.equal(mixed.state, 'not public');
  assert.equal(mixed.contradictions.length, 1);
  assert.equal(releaseView(planned, mk({ t1: [{ status: 'ga' }] }), prof, { id: 't1' }).state, 'not public', 'ga without public evidence is not public');
});

test('a page that points at "the command below" but has no code in the server HTML is flagged', () => {
  const { analyze } = require('../scripts/lib/health.cjs');
  const rec = (p, text, extra = {}) => ({ url: `https://docs.example.test${p}`, path: p, status: 200, title: p, h1: [p], headings: [{ level: 1, text: p }], words: 50, links: [], navLinks: [], images: [], meta: {}, text, preBlocks: 0, codeBlocks: [], blocks: [], dateSignals: {}, ...extra });
  const h = analyze([rec('/a', 'Authenticate with the example script below to start.'), rec('/b', 'Run the command below.', { preBlocks: 1 }), rec('/c', 'Nothing about code here.')], { staleDays: 30, deadEndExclude: [], inventory: { complete: true } });
  assert.deepEqual(h.codeMissing, ['/a']);
});
