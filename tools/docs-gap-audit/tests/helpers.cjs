'use strict';

// Shared test helpers: a private workspace outside the repo, a profile pointed at a local synthetic
// site, and staged signal files with receipts. All content is synthetic.

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.join(__dirname, '..');
const EX = path.join(ROOT, 'examples');
const SYN = path.join(EX, 'synthetic');
const AUDIT = path.join(ROOT, 'scripts', 'audit.cjs');
const STAGE = path.join(ROOT, 'scripts', 'stage.cjs');

const tmp = (p = 'dga-') => fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), p)));
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

// A profile for the synthetic area, aimed at a local server, with absolute source paths.
function makeProfile(site, mutate) {
  const p = readJson(path.join(EX, 'widgets.profile.json'));
  p.site.origin = site.base;
  for (const s of p.sources.local) s.path = path.join(SYN, s.path.replace(/^synthetic\//, ''));
  if (mutate) mutate(p);
  return p;
}

function setup(site, { mutate, stageDemand = true, stageRelease = true, extraInputs = {} } = {}) {
  const dir = tmp();
  const ws = path.join(dir, 'workspace');
  const profile = makeProfile(site, mutate);
  const profileFile = path.join(dir, 'profile.json');
  fs.writeFileSync(profileFile, JSON.stringify(profile, null, 2));
  const area = path.join(ws, 'areas', profile.area.id);
  fs.mkdirSync(path.join(area, 'inputs'), { recursive: true });
  fs.mkdirSync(path.join(area, 'staging'), { recursive: true });
  if (stageDemand) {
    fs.copyFileSync(path.join(SYN, 'support', 'demand.json'), path.join(area, 'inputs', 'demand.json'));
    fs.copyFileSync(path.join(SYN, 'support', 'demand.json'), path.join(area, 'staging', 'support-export.json'));
    stage('complete', ws, profile.area.id, 'support-export', 'staging/support-export.json', ['--connector', 'support-system', '--ref', 'tag:widgets', '--items', '3']);
  }
  if (stageRelease) fs.copyFileSync(path.join(SYN, 'support', 'release.json'), path.join(area, 'inputs', 'release.json'));
  for (const [name, doc] of Object.entries(extraInputs)) {
    fs.writeFileSync(path.join(area, 'inputs', `${name}.json`), JSON.stringify(doc, null, 2));
    profile.inputs[name] = `inputs/${name}.json`;
  }
  fs.writeFileSync(profileFile, JSON.stringify(profile, null, 2));
  return { dir, ws, profile, profileFile, area };
}

function stage(cmd, ws, area, id, file, extra = []) {
  return spawnSync(process.execPath, [STAGE, cmd, '--workspace', ws, '--area', area, '--id', id, '--file', file, ...extra], { encoding: 'utf8' });
}

function audit(args, env = {}) {
  return spawnSync(process.execPath, [AUDIT, ...args], { encoding: 'utf8', env: { ...process.env, ...env }, maxBuffer: 64 * 1024 * 1024 });
}

const runArgs = (s, extra = []) => ['run', '--profile', s.profileFile, '--workspace', s.ws, '--allow-root', SYN, '--delay', '0', ...extra];

function latestRun(ws, areaId) {
  const dir = path.join(ws, 'areas', areaId, 'runs');
  const ids = fs.readdirSync(dir).sort();
  const id = ids[ids.length - 1];
  return { id, dir: path.join(dir, id), manifest: fs.existsSync(path.join(dir, id, 'manifest.json')) ? readJson(path.join(dir, id, 'manifest.json')) : null };
}

const out = (run, rel) => readJson(path.join(run.dir, 'outputs', rel));

module.exports = { ROOT, EX, SYN, AUDIT, STAGE, tmp, readJson, makeProfile, setup, stage, audit, runArgs, latestRun, out };
