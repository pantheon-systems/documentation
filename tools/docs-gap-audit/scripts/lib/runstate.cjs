'use strict';

// Private run state. Machine-readable state lives in a workspace outside any shared repository:
//
//   <workspace>/areas/<area-id>/
//     profiles/<hash>.json          the exact profile used, by hash (never rewritten)
//     staging/                      connector exports staged by Claude, each with a receipt
//     state.json                    last attempted, last completed, last human-reviewed (small, replaceable)
//     decisions.jsonl               human decisions (append only)
//     runs/<run-id>/
//       start.json                  what was asked for, written once
//       events.jsonl                append-only log
//       checkpoints/<stage>.json    one receipt per stage; a complete stage is never rewritten
//       outputs/                    stage outputs
//       manifest.json               written once when the run is finalized; immutable afterward
//
// A run that was interrupted has no manifest and says so. It can be resumed; a finalized run cannot.

const fs = require('node:fs');
const path = require('node:path');
const { sha256, sha256File, shortId, hashObject, treeHash, gitIdentity } = require('./hash.cjs');
const { walkSafe, isInside, realInside } = require('./paths.cjs');
const { summarizeSkips } = require('./extract.cjs');

const SCHEMAS = { profile: 1, candidate: 2, manifest: 1, checkpoint: 1, decision: 1, signal: 1 };
const TOOL_ROOT = path.resolve(__dirname, '..', '..');

function toolIdentity() {
  let version = 'unknown';
  try {
    version = fs.readFileSync(path.join(TOOL_ROOT, 'VERSION'), 'utf8').trim();
  } catch { /* keep unknown */ }
  return { name: 'docs-gap-audit', version, node: process.version, git: gitIdentity(TOOL_ROOT), schemas: SCHEMAS };
}

function writeOnce(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, typeof data === 'string' ? data : `${JSON.stringify(data, null, 2)}\n`, { flag: 'wx' });
}

function replaceAtomically(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(data, null, 2)}\n`);
  fs.renameSync(tmp, file);
}

const readJson = (file, fallback = null) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
};

function openWorkspace(dir) {
  if (!dir) throw new Error('A private workspace is required (--workspace <dir>).');
  const abs = path.resolve(dir);
  if (isInside(TOOL_ROOT, abs)) throw new Error(`The workspace must be outside the toolkit repository (${TOOL_ROOT}). Real profiles, staged sources, and run state are private.`);
  fs.mkdirSync(abs, { recursive: true });
  return { dir: abs };
}

// Area and run ids become folder names. They are plain ids; anything with a separator or a dot segment is refused.
const ID = /^[A-Za-z0-9][A-Za-z0-9_-]*(\.[A-Za-z0-9_-]+)*$/;
function safeId(kind, value) {
  if (typeof value !== 'string' || !ID.test(value)) throw new Error(`${kind} "${value}" is not a valid id (letters, digits, hyphen, underscore; no slashes or "..").`);
  return value;
}
const areaDir = (ws, areaId) => path.join(ws.dir, 'areas', safeId('area', areaId));
const runDirOf = (ws, areaId, runId) => path.join(areaDir(ws, areaId), 'runs', safeId('run', runId));

// A short lock around read-modify-write of one area's state, so concurrent runs do not lose entries.
function withLock(ws, areaId, fn) {
  const dir = areaDir(ws, areaId);
  fs.mkdirSync(dir, { recursive: true });
  const lock = path.join(dir, 'state.lock');
  const until = Date.now() + 10000;
  for (;;) {
    try {
      fs.mkdirSync(lock);
      break;
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      try {
        if (Date.now() - fs.statSync(lock).mtimeMs > 30000) fs.rmdirSync(lock);
      } catch { /* another process released it */ }
      if (Date.now() > until) throw new Error(`Could not lock the state of area ${areaId}: another run holds it.`);
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 25);
    }
  }
  try {
    return fn();
  } finally {
    try { fs.rmdirSync(lock); } catch { /* already gone */ }
  }
}

// Human decisions. One bad line (an interrupted append) is skipped and counted; it never discards the others.
function readDecisions(ws, areaId, { warn = true } = {}) {
  let text;
  try {
    text = fs.readFileSync(path.join(areaDir(ws, areaId), 'decisions.jsonl'), 'utf8');
  } catch {
    return [];
  }
  const out = [];
  let bad = 0;
  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    try {
      out.push(JSON.parse(line));
    } catch {
      bad += 1;
    }
  }
  if (bad && warn) process.stderr.write(`warning: ${bad} unreadable line(s) in decisions.jsonl were skipped; the other ${out.length} decision(s) were kept.\n`);
  return out;
}
const nowIso = () => new Date().toISOString();

// Run ids sort in the order the runs started: a millisecond timestamp, then a per-area sequence number,
// then a short random suffix for uniqueness.
function newRunId(sequence) {
  const stamp = nowIso().replace(/[-:]/g, '').replace('.', '');
  return `${stamp}-${String(sequence).padStart(4, '0')}-${shortId(`${process.pid}${Math.random()}`, 4)}`;
}

function readState(ws, areaId) {
  return readJson(path.join(areaDir(ws, areaId), 'state.json'), { schemaVersion: 1, areaId, lastAttempted: null, lastCompleted: null, lastReviewed: null, runs: [] });
}

function updateState(ws, areaId, patch) {
  return withLock(ws, areaId, () => {
    const cur = readState(ws, areaId);
    const state = { ...cur, ...(typeof patch === 'function' ? patch(cur) : patch) };
    replaceAtomically(path.join(areaDir(ws, areaId), 'state.json'), state);
    return state;
  });
}

function appendEvent(run, type, data = {}) {
  fs.appendFileSync(path.join(run.dir, 'events.jsonl'), `${JSON.stringify({ at: nowIso(), type, ...data })}\n`);
}

function startRun(ws, profile, { options = {}, command = null } = {}) {
  const areaId = profile.area.id;
  const profileHash = hashObject(profile);
  const profileFile = path.join(areaDir(ws, areaId), 'profiles', `${profileHash}.json`);
  if (!fs.existsSync(profileFile)) writeOnce(profileFile, { hash: profileHash, profile });
  let runId;
  let dir;
  withLock(ws, areaId, () => {
    const state0 = readState(ws, areaId);
    runId = newRunId(state0.runs.length + 1);
    dir = path.join(areaDir(ws, areaId), 'runs', runId);
    fs.mkdirSync(path.join(dir, 'checkpoints'), { recursive: true });
    fs.mkdirSync(path.join(dir, 'outputs'), { recursive: true });
    replaceAtomically(path.join(areaDir(ws, areaId), 'state.json'), { ...state0, lastAttempted: { runId, at: nowIso() }, runs: [...state0.runs, runId] });
  });
  const run = { ws, areaId, runId, dir, profile, profileHash };
  writeOnce(path.join(dir, 'start.json'), {
    schemaVersion: 1, runId, areaId, startedAt: nowIso(), profile: { hash: profileHash, snapshot: path.relative(ws.dir, profileFile), scope: { origin: profile.site && profile.site.origin, tasks: (profile.tasks || []).map((t) => t.id).sort() } },
    tool: toolIdentity(), command, options,
  });
  appendEvent(run, 'run-started');
  return run;
}

function loadRun(ws, areaId, runId) {
  const dir = runDirOf(ws, areaId, runId);
  const start = readJson(path.join(dir, 'start.json'));
  if (!start) throw new Error(`No run ${runId} for area ${areaId}.`);
  const snap = readJson(path.join(ws.dir, start.profile.snapshot));
  return { ws, areaId, runId, dir, profile: snap && snap.profile, profileHash: start.profile.hash, start };
}

const checkpointFile = (run, stage) => path.join(run.dir, 'checkpoints', `${stage}.json`);
const readCheckpoint = (run, stage) => readJson(checkpointFile(run, stage));

// One receipt per stage. A complete receipt is final. An incomplete or failed one may be replaced
// when the stage is re-run; the earlier attempt is kept next to it.
function writeCheckpoint(run, stage, receipt, { supersede = false } = {}) {
  const file = checkpointFile(run, stage);
  const prior = readJson(file);
  // A complete checkpoint is never overwritten by accident. A resume may supersede one whose inputs changed:
  // the earlier receipt is kept beside it as an attempt and the event log records why.
  if (prior && prior.status === 'complete' && !supersede) throw new Error(`Stage "${stage}" already completed in run ${run.runId}; completed checkpoints are immutable.`);
  if (prior && prior.status === 'complete') appendEvent(run, 'stage-superseded', { stage, reason: 'inputs changed since the checkpoint' });
  if (prior) {
    let n = 1;
    while (fs.existsSync(`${file}.attempt-${n}`)) n += 1;
    fs.renameSync(file, `${file}.attempt-${n}`);
  }
  const body = { schemaVersion: 1, stage, ...receipt };
  writeOnce(file, body);
  appendEvent(run, `stage-${receipt.status}`, { stage });
  return body;
}

// Describe a file written by a stage, so a later reader can tell if it changed.
function outputRef(run, relFile) {
  const abs = path.join(run.dir, relFile);
  return { path: relFile, sha256: sha256File(abs), bytes: fs.statSync(abs).size };
}

function writeOutput(run, relFile, data) {
  const abs = path.join(run.dir, relFile);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, typeof data === 'string' ? data : `${JSON.stringify(data, null, 2)}\n`);
  return outputRef(run, relFile);
}

// What a stage may start from: complete and still valid, or needs running.
function stagePlan(run, stages, inputHashes = {}) {
  return stages.map((stage) => {
    const cp = readCheckpoint(run, stage);
    if (!cp) return { stage, action: 'run', reason: 'no checkpoint' };
    if (cp.status !== 'complete') return { stage, action: 'run', reason: `previous attempt ${cp.status}` };
    if (inputHashes[stage] && cp.inputHash && cp.inputHash !== inputHashes[stage]) return { stage, action: 'run', reason: 'inputs changed since the checkpoint' };
    return { stage, action: 'skip', reason: 'complete and inputs unchanged' };
  });
}

// Identity of a local source: content hash first, Git data as context, and what could not be read.
function localSourceIdentity(source, permittedRoots) {
  const target = source.abs || path.resolve(source.path);
  let stat;
  try {
    stat = fs.statSync(target);
  } catch {
    return { id: source.id, kind: source.kind, kindOfSource: 'local', retrieval: { status: 'failed', reason: 'path not found' } };
  }
  let files;
  let skipped = [];
  if (stat.isFile()) {
    files = [target];
  } else {
    const walked = walkSafe(target, { permittedRoots, skipDirs: new Set(['.git', 'node_modules']), extensions: new Set(['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx', '.php', '.py', '.rb', '.go', '.rs', '.json', '.md', '.mdx', '.txt', '.html', '.yml', '.yaml']) });
    files = walked.files;
    skipped = walked.skipped;
  }
  const tree = treeHash(stat.isFile() ? path.dirname(target) : target, files);
  return {
    id: source.id, kind: source.kind, location: 'local', retrieval: { status: 'ok' },
    contentHash: tree.hash, fileCount: tree.fileCount,
    git: gitIdentity(stat.isFile() ? path.dirname(target) : target),
    limitations: summarizeSkips(skipped, target),
    public: source.public,
  };
}

// A staged connector export is only as good as its receipt. A missing or in-progress receipt
// (an interrupted subagent or connector) makes the source incomplete.
function stagedSourceIdentity(ws, areaId, connector) {
  const file = path.join(areaDir(ws, areaId), connector.stagedAs);
  const receiptFile = `${file}.receipt.json`;
  const receipt = readJson(receiptFile);
  const base = { id: connector.id, connector: connector.connector, ref: connector.ref, location: 'staged', purpose: connector.purpose, public: connector.public };
  if (!receipt) return { ...base, retrieval: { status: 'missing', reason: 'no receipt: the source was never staged', request: stagingRequest(connector) } };
  if (receipt.status !== 'complete') {
    return { ...base, retrieval: { status: 'incomplete', reason: receipt.reason || `receipt status is ${receipt.status}`, retrievedAt: receipt.at || null, request: stagingRequest(connector) } };
  }
  if (!fs.existsSync(file)) return { ...base, retrieval: { status: 'failed', reason: 'receipt says complete but the staged file is missing' } };
  if (realInside(areaDir(ws, areaId), file) === false) return { ...base, retrieval: { status: 'failed', reason: 'the staged file resolves outside the workspace (a symlink); it was not read' } };
  const actual = sha256File(file);
  if (receipt.sha256 && receipt.sha256 !== actual) return { ...base, retrieval: { status: 'failed', reason: 'staged file changed after its receipt was written' } };
  return { ...base, retrieval: { status: 'ok', retrievedAt: receipt.at || null, items: receipt.items ?? null, notes: receipt.notes || null }, contentHash: actual, bytes: fs.statSync(file).size };
}

function stagingRequest(c) {
  return `Retrieve "${c.ref}" through the ${c.connector} connector, save it as ${c.stagedAs} in this area's staging folder, then run: node scripts/stage.cjs complete --workspace <ws> --area <area> --id ${c.id} --file ${c.stagedAs}`;
}

// Close a run. Written once. Complete only if every required stage completed and no source is missing.
function finalizeRun(run, { stages, sources = [], limitations = [], resumes = [], outputs = [] }) {
  const manifestFile = path.join(run.dir, 'manifest.json');
  if (fs.existsSync(manifestFile)) throw new Error(`Run ${run.runId} is already finalized; manifests are immutable.`);
  const receipts = stages.map((s) => {
    const cp = readCheckpoint(run, s);
    return { stage: s, status: cp ? cp.status : 'not run', receipt: cp ? path.join('checkpoints', `${s}.json`) : null, outputs: cp ? cp.outputs || [] : [] };
  });
  const missing = [
    ...receipts.filter((r) => r.status !== 'complete').map((r) => `stage ${r.stage}: ${r.status}`),
    ...sources.filter((s) => s.retrieval && s.retrieval.status !== 'ok').map((s) => `source ${s.id}: ${s.retrieval.status}${s.retrieval.reason ? ` (${s.retrieval.reason})` : ''}`),
  ];
  const status = missing.length === 0 ? 'complete' : 'incomplete';
  const start = readJson(path.join(run.dir, 'start.json'));
  const manifest = {
    schemaVersion: 1, runId: run.runId, areaId: run.areaId, status,
    startedAt: start.startedAt, finalizedAt: nowIso(),
    profile: start.profile, tool: start.tool, command: start.command, options: start.options,
    sources, stages: receipts, outputs, resumes,
    completeness: { status, missing, limitations },
  };
  writeOnce(manifestFile, manifest);
  appendEvent(run, `run-${status}`);
  updateState(run.ws, run.areaId, (cur) => ({ lastCompleted: status === 'complete' ? { runId: run.runId, at: manifest.finalizedAt } : cur.lastCompleted }));
  return manifest;
}

function readManifest(ws, areaId, runId) {
  return readJson(path.join(runDirOf(ws, areaId, runId), 'manifest.json'));
}

function recordReview(ws, areaId, runId, by) {
  if (!fs.existsSync(path.join(runDirOf(ws, areaId, runId), 'start.json'))) throw new Error(`No run ${runId} for area ${areaId}; nothing to mark as reviewed.`);
  return updateState(ws, areaId, { lastReviewed: { runId, at: nowIso(), by: by || null } });
}

// Can two runs be compared? Refuse when a comparison would mislead; warn when it is usable but changed.
function compatibility(a, b) {
  const reasons = [];
  const warnings = [];
  if (!a || !b) return { compatible: false, reasons: ['a manifest is missing'], warnings };
  if (a.areaId !== b.areaId) reasons.push(`different areas (${a.areaId} and ${b.areaId})`);
  for (const m of [a, b]) if (m.status !== 'complete') reasons.push(`run ${m.runId} is ${m.status}, not complete`);
  if (a.schemaVersion !== b.schemaVersion) reasons.push(`manifest schema versions differ (${a.schemaVersion} and ${b.schemaVersion})`);
  const sa = a.tool && a.tool.schemas;
  const sb = b.tool && b.tool.schemas;
  if (sa && sb && sa.candidate !== sb.candidate) reasons.push(`candidate schema versions differ (${sa.candidate} and ${sb.candidate}); stable IDs may not line up`);
  const oa = a.profile && a.profile.scope && a.profile.scope.origin;
  const ob = b.profile && b.profile.scope && b.profile.scope.origin;
  if (oa && ob && oa !== ob) reasons.push(`the audited site changed (${oa} and ${ob}); the runs describe different sites`);
  const ta = a.profile && a.profile.scope && a.profile.scope.tasks;
  const tb = b.profile && b.profile.scope && b.profile.scope.tasks;
  if (ta && tb && JSON.stringify(ta) !== JSON.stringify(tb)) warnings.push(`the task list changed (${ta.length} then ${tb.length} tasks); coverage and recommendations are not comparable task by task`);
  if (a.profile && b.profile && a.profile.hash !== b.profile.hash) warnings.push('the profile changed between runs: scope, tasks, or sources may differ, so some differences reflect configuration, not the docs');
  if (a.tool && b.tool && a.tool.version !== b.tool.version) warnings.push(`tool version changed (${a.tool.version} to ${b.tool.version}): extraction rules may differ`);
  return { compatible: reasons.length === 0, reasons, warnings };
}

const candidateFingerprint = (c) => hashObject({ status: c.status, rating: c.coverage && c.coverage.rating, posture: c.evidence && c.evidence.posture, sources: (c.sources || []).slice().sort(), kinds: (c.kinds || []).slice().sort() });

function diffCandidates(before, after) {
  const mapA = new Map(before.map((c) => [c.id, c]));
  const mapB = new Map(after.map((c) => [c.id, c]));
  const added = after.filter((c) => !mapA.has(c.id)).map((c) => ({ id: c.id, name: c.name }));
  const removed = before.filter((c) => !mapB.has(c.id)).map((c) => ({ id: c.id, name: c.name }));
  const changed = [];
  let unchanged = 0;
  for (const [id, c] of mapB) {
    const o = mapA.get(id);
    if (!o) continue;
    if (candidateFingerprint(o) === candidateFingerprint(c)) {
      unchanged += 1;
      continue;
    }
    const fields = [];
    if (o.status !== c.status) fields.push({ field: 'status', from: o.status, to: c.status });
    if ((o.coverage && o.coverage.rating) !== (c.coverage && c.coverage.rating)) fields.push({ field: 'coverage.rating', from: o.coverage && o.coverage.rating, to: c.coverage && c.coverage.rating });
    if ((o.evidence && o.evidence.posture) !== (c.evidence && c.evidence.posture)) fields.push({ field: 'evidence.posture', from: o.evidence && o.evidence.posture, to: c.evidence && c.evidence.posture });
    if (JSON.stringify((o.sources || []).slice().sort()) !== JSON.stringify((c.sources || []).slice().sort())) fields.push({ field: 'sources', from: (o.sources || []).length, to: (c.sources || []).length });
    changed.push({ id, name: c.name, fields });
  }
  return { added, removed, changed, unchanged };
}

module.exports = {
  SCHEMAS, TOOL_ROOT, toolIdentity, openWorkspace, areaDir, runDirOf, safeId, readDecisions, withLock, readState, updateState, appendEvent, startRun, loadRun,
  readCheckpoint, writeCheckpoint, writeOutput, outputRef, stagePlan, localSourceIdentity, stagedSourceIdentity, stagingRequest,
  finalizeRun, readManifest, recordReview, compatibility, diffCandidates, candidateFingerprint, writeOnce, replaceAtomically, readJson, sha256,
};
