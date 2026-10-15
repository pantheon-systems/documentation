'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { assess, render } = require('../scripts/page-check.cjs');
const { renderHealth, analyze } = require('../scripts/lib/health.cjs');
const { build } = require('../scripts/lib/report.cjs');

const FIXTURES = path.join(__dirname, '..', 'evals', 'fixtures');
const read = (...p) => fs.readFileSync(path.join(FIXTURES, ...p), 'utf8');

test('a sound news article: checks find nothing, strengths are credited, and "nothing to add" is allowed', () => {
  const r = assess({ mode: 'text', raw: read('e05-news', 'news.txt'), name: 'news.txt' });
  assert.deepEqual(r.editorial.checksFound, []);
  assert.ok(r.editorial.presentAndWorking.some((s) => /attribution/.test(s)), 'attribution is credited');
  assert.ok(r.editorial.presentAndWorking.some((s) => /concrete figures/.test(s)));
  assert.match(r.editorial.calibration, /found no editorial defects/);
  assert.match(r.editorial.calibration, /"nothing to add" is a valid result/);
  const text = render(r);
  assert.match(text, /Present and working:/);
  assert.match(text, /Checks that found something: none/);
  assert.ok(!/faq|tl;dr/i.test(text.replace(/no FAQ, TL;DR, or particular metadata is required/i, '')), 'no FAQ or TL;DR demands');
});

test('an article with real problems lists them as findings and carries no "nothing to add" line', () => {
  const r = assess({ mode: 'text', raw: read('e01-text-only', 'article.txt'), name: 'article.txt' });
  assert.ok(r.editorial.checksFound.includes('unsupported statistics'));
  assert.equal(r.editorial.calibration, null);
  assert.match(render(r), /Checks that found something: .*unsupported statistics/);
});

test('conflicting dates in saved HTML count as a finding', () => {
  const r = assess({ mode: 'html', raw: read('e03-dates-stats', 'page.html'), name: 'page.html' });
  assert.ok(r.editorial.checksFound.includes('conflicting dates'));
  assert.ok(r.editorial.dates.conflict);
});

test('a caller-declared inventory is called declared, not verified, in health and in the report', () => {
  const page = { url: 'https://docs.example.test/a', path: '/a', status: 200, title: 'A', h1: ['A'], headings: [{ level: 1, text: 'A' }], words: 3, preBlocks: 0, images: [], links: [], navLinks: [], meta: {}, text: 'A page', blocks: [] };
  const health = analyze([page], { inventory: { complete: true, reasons: [], declaredComplete: true } });
  assert.match(renderHealth(health), /declared by the person who saved these pages/);
  const undeclared = analyze([page], { inventory: { complete: true, reasons: [], declaredComplete: false } });
  assert.ok(!/declared by the person/.test(renderHealth(undeclared)));
  assert.match(fs.readFileSync(path.join(__dirname, '..', 'scripts', 'lib', 'report.cjs'), 'utf8'), /as declared by the person who saved the pages \(not verified against the live site\)/);
  assert.equal(typeof build, 'function');
});

test('SKILL.md carries the calibration rules the evaluations showed were missing', () => {
  const skill = fs.readFileSync(path.join(__dirname, '..', 'SKILL.md'), 'utf8');
  assert.match(skill, /## Calibrate your own judgment/);
  assert.match(skill, /"nothing to add" is a valid result/);
  assert.match(skill, /Say what already works before listing what to add/);
  assert.match(skill, /declared, not verified/);
});

test('page-check accepts a bare file path and picks the mode from the extension', () => {
  const { spawnSync } = require('node:child_process');
  const run = (...a) => spawnSync(process.execPath, [path.join(__dirname, '..', 'scripts', 'page-check.cjs'), ...a], { encoding: 'utf8' });
  assert.match(run(path.join(FIXTURES, 'e05-news', 'news.txt')).stdout, /Input: text \(news\.txt\)/);
  assert.match(run(path.join(FIXTURES, 'e03-dates-stats', 'page.html')).stdout, /Input: html \(page\.html\)/);
  assert.equal(run().status, 2, 'no file is an argument error');
  assert.equal(run(path.join(FIXTURES, 'e05-news', 'news.txt'), '--html', path.join(FIXTURES, 'e03-dates-stats', 'page.html')).status, 2, 'two inputs are refused');
});

test('SKILL.md sizes the explicit loads to the request', () => {
  const skill = fs.readFileSync(path.join(__dirname, '..', 'SKILL.md'), 'utf8');
  assert.match(skill, /explicit loads, sized to the request/);
  assert.match(skill, /A single page or pasted article \| `page-check\.cjs --help`/);
  assert.match(skill, /A full area audit \| everything below/);
});

test('maturity does not count a task whose feature is not public as unserved', () => {
  const { assessMaturity } = require('../scripts/lib/matrix.cjs');
  const profile = { scope: { report: { include: ['/widgets/**'] }, evidence: { include: ['/**'], exclude: [] }, crawl: { include: ['/**'], exclude: [] }, related: [] }, site: { origin: 'https://docs.example.test' }, attestations: [] };
  const matrix = { boundary: {}, tasks: [
    { task: 'a', stage: 'operate', required: true, status: 'covered' },
    { task: 'b', stage: 'operate', required: true, status: 'not found' },
  ] };
  const common = { matrix, pages: [], health: null, candidates: [], signals: {}, inventory: { complete: true }, profile };
  const without = assessMaturity(common).levels[1].criteria.find((c) => c.id === 'F1');
  assert.equal(without.status, 'unmet');
  const withRelease = assessMaturity({ ...common, releaseByTask: { b: 'not public' } }).levels[1].criteria.find((c) => c.id === 'F1');
  assert.notEqual(withRelease.status, 'unmet', 'b is not due');
  assert.match(withRelease.note, /1 not due: b/);
});

test('a symlink inside the workspace cannot make staged files or signal inputs read from outside it', () => {
  const os = require('node:os');
  const { spawnSync } = require('node:child_process');
  const rs = require('../scripts/lib/runstate.cjs');
  const { loadSignals } = require('../scripts/lib/signals.cjs');
  const { validateProfile } = require('../scripts/lib/profile.cjs');
  const dir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'symlink-')));
  const ws = path.join(dir, 'ws');
  const area = path.join(ws, 'areas', 'widgets');
  fs.mkdirSync(path.join(area, 'staging'), { recursive: true });
  fs.mkdirSync(path.join(area, 'inputs'), { recursive: true });
  const outside = path.join(dir, 'outside.json');
  fs.writeFileSync(outside, '{"schemaVersion":1,"signal":"demand","provenance":{},"items":[]}');
  fs.symlinkSync(outside, path.join(area, 'staging', 'x.json'));
  fs.symlinkSync(outside, path.join(area, 'inputs', 'demand.json'));
  const stageRun = spawnSync(process.execPath, [path.join(__dirname, '..', 'scripts', 'stage.cjs'), 'complete', '--workspace', ws, '--area', 'widgets', '--id', 'x', '--file', 'staging/x.json'], { encoding: 'utf8' });
  assert.equal(stageRun.status, 2);
  assert.match(stageRun.stderr, /outside the workspace/);
  const wsObj = rs.openWorkspace(ws);
  fs.writeFileSync(path.join(area, 'staging', 'x.json.receipt.json'), JSON.stringify({ status: 'complete', sha256: 'x', at: '2026-10-01' }));
  const id = rs.stagedSourceIdentity(wsObj, 'widgets', { id: 'x', connector: 'c', ref: 'r', stagedAs: 'staging/x.json', purpose: null, public: null });
  assert.equal(id.retrieval.status, 'failed');
  assert.match(id.retrieval.reason, /outside the workspace/);
  const base = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'examples', 'widgets.profile.json'), 'utf8'));
  base.inputs = { demand: 'inputs/demand.json' };
  const profile = validateProfile(base, { baseDir: path.join(__dirname, '..', 'examples') }).profile;
  const sig = loadSignals(profile, { areaDir: area });
  assert.equal(sig.demand.status, 'not assessed');
  assert.match(sig.demand.reason, /outside the workspace/);
});

test('SKILL.md carries the profile-writing and check-before-reporting rules the real-site audits showed were missing', () => {
  const skill = fs.readFileSync(path.join(__dirname, '..', 'SKILL.md'), 'utf8');
  assert.match(skill, /## Writing the profile/);
  assert.match(skill, /Use the docs' words as well as the product's/);
  assert.match(skill, /Put the pages where the tasks live in scope/);
  assert.match(skill, /## Check before you report a lead/);
  assert.match(skill, /Read the page a lead cites/);
  assert.match(skill, /Server HTML is not the page/);
  assert.match(skill, /A release signal is evidence of release, not of need/);
  assert.match(skill, /is a check, not a validation/);
});

test('the client-rendering case has a fixture, and the toolkit flags its page', () => {
  const cases = JSON.parse(read('..', 'cases.json')).cases;
  const e15 = cases.find((c) => c.id === 'e15');
  assert.ok(e15 && e15.expects.length >= 3);
  assert.ok(fs.existsSync(path.join(FIXTURES, e15.fixture, 'profile.json')));
  const { parseHtml } = require('../scripts/lib/html.cjs');
  const { buildRecord, DEFAULT_UPDATED } = require('../scripts/site-audit.cjs');
  const url = 'https://docs.example.test/widgets/ci';
  const rec = buildRecord({ url }, { status: 200, url }, parseHtml(read(e15.fixture, 'pages', 'widgets__ci.html')), DEFAULT_UPDATED);
  const health = analyze([rec], { staleDays: 30, deadEndExclude: [], inventory: { complete: true } });
  assert.deepEqual(health.codeMissing, ['/widgets/ci']);
});
