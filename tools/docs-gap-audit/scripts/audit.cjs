#!/usr/bin/env node
'use strict';

// Area-scoped audit runner. One command runs the whole chain for one documentation area, keeps
// private resumable state, and never turns a partial run into a successful-looking empty audit.
//
//   node scripts/audit.cjs run    --profile P --workspace W [options]
//   node scripts/audit.cjs resume --workspace W --area A [--run R]
//   node scripts/audit.cjs status --workspace W --area A
//   node scripts/audit.cjs diff   --workspace W --area A [--from R1 --to R2]
//   node scripts/audit.cjs finalize --workspace W --area A --run R --allow-incomplete

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { parseArgs, fail } = require('./lib/util.cjs');
const { validateProfile, scopeOf, profileHash } = require('./lib/profile.cjs');
const { hashObject, sha256File, treeHash } = require('./lib/hash.cjs');
const rs = require('./lib/runstate.cjs');
const { discover } = require('./lib/discovery.cjs');
const { classifyPage, applyDecisions } = require('./lib/classify.cjs');
const { loadSignals } = require('./lib/signals.cjs');
const { extractClaims, attachEvidence, summarizeClaims } = require('./lib/claims.cjs');
const { buildMatrix, bottleneck, assessMaturity } = require('./lib/matrix.cjs');
const { build: buildRecs, briefFor, releaseView, relatedCandidates } = require('./lib/recommend.cjs');
const { assessReadiness } = require('./lib/readiness.cjs');
const { scanUntrusted } = require('./lib/untrusted.cjs');
const { build: buildReport } = require('./lib/report.cjs');
const { walkSafe } = require('./lib/paths.cjs');

const HELP = `audit: run an area-scoped documentation needs audit with private, resumable state.

Usage:
  node scripts/audit.cjs run      --profile <file> --workspace <dir> [options]
  node scripts/audit.cjs resume   --workspace <dir> --area <id> [--run <id>] [options]
  node scripts/audit.cjs status   --workspace <dir> --area <id>
  node scripts/audit.cjs diff     --workspace <dir> --area <id> [--from <run>] [--to <run>]
  node scripts/audit.cjs finalize --workspace <dir> --area <id> --run <id> --allow-incomplete

Options for run and resume:
  --allow-root <dir>     An extra folder the profile's local sources may live in (repeatable)
  --pages-dir <dir>      Use saved HTML pages instead of crawling (with --assume-complete if they are the whole in-scope site)
  --assume-complete      Declare the saved pages complete
  --delay <ms>           Pause between requests when crawling (default 1000)
  --limit <n>            Stop crawling after n pages; the rest are recorded as unexamined
  --user-agent <text>    Honest user agent for the crawl
  --readiness            Also compute optional extraction-readiness evidence for pages
  --stages <list>        Comma-separated subset of: ${'sources,inventory,discover,classify,signals,claims,matrix,recommend,report'}
  --help

The workspace is private and must be outside this repository. Stages are checkpointed: a completed stage is never
rewritten, and a resume re-runs only stages that are missing, were incomplete, or whose inputs changed. A run is
finalized (and then immutable) only when every stage is complete and every source was retrieved. Otherwise it stays
open, the report says so, and exit code 4 tells you it needs attention. Exit codes: 0 complete, 1 error, 2 bad
arguments or profile, 3 the site blocked the crawl, 4 run open or incomplete.
Network: the only network use is the crawl in the inventory stage, which contacts the profile's origin only.`;

const STAGES = ['sources', 'inventory', 'discover', 'classify', 'signals', 'claims', 'matrix', 'recommend', 'report'];
const DEPS = {
  sources: [], inventory: [], discover: ['sources', 'inventory'], classify: ['inventory'], signals: ['sources'], claims: ['inventory', 'discover', 'signals'],
  matrix: ['inventory', 'classify', 'signals', 'discover'], recommend: ['matrix', 'discover', 'signals', 'claims', 'classify'],
  report: ['sources', 'inventory', 'discover', 'classify', 'signals', 'claims', 'matrix', 'recommend'],
};
const SITE_AUDIT = path.join(__dirname, 'site-audit.cjs');
const KIND_MAP = { repo: 'repo', changelog: 'changelog', planning: 'planning', releases: 'releases' };

const readJ = (run, rel) => JSON.parse(fs.readFileSync(path.join(run.dir, rel), 'utf8'));
const maybeJ = (run, rel) => { try { return readJ(run, rel); } catch { return null; } };
const areaOf = (ws, id) => rs.areaDir(ws, id);

const readDecisions = (ws, areaId) => rs.readDecisions(ws, areaId);

function loadPages(run) {
  const pages = readJ(run, 'outputs/inventory/pages.json');
  for (const p of pages) Object.defineProperty(p, '__scope', { value: scopeOf(run.profile, p.url), enumerable: false, writable: true });
  return pages;
}
const evidencePages = (run) => loadPages(run).filter((p) => p.status === 200 && p.__scope.evidence);

function stageInputHash(run, ctx, stage) {
  const up = DEPS[stage].map((s) => {
    const cp = rs.readCheckpoint(run, s);
    return { s, status: cp && cp.status, outputs: cp ? (cp.outputs || []).map((o) => o.sha256) : null };
  });
  const extra = {};
  if (stage === 'sources') extra.sources = ctx.sourceFingerprint();
  if (stage === 'inventory') extra.crawl = { origin: run.profile.site.origin, scope: run.profile.scope.crawl, pagesDir: ctx.opts.pagesDir ? treeHash(ctx.opts.pagesDir, walkSafe(ctx.opts.pagesDir).files).hash : null, assume: Boolean(ctx.opts.assumeComplete), limit: ctx.opts.limit || null };
  if (stage === 'signals') extra.inputs = ctx.signalFingerprint();
  if (stage === 'classify' || stage === 'recommend') extra.decisions = ctx.decisionsHash();
  if (stage === 'matrix') extra.readiness = Boolean(ctx.opts.readiness);
  return hashObject({ stage, profile: run.profileHash, tool: rs.toolIdentity().version, up, extra });
}

function makeContext(run, opts) {
  const ws = run.ws;
  const dir = areaOf(ws, run.areaId);
  const permitted = [dir, path.dirname(path.resolve(opts.profileFile || dir)), ...(opts.allowRoot || [])];
  return {
    opts, areaDir: dir, permitted,
    sourceFingerprint: () => run.profile.sources.local.map((s) => rs.localSourceIdentity(s, permitted).contentHash || 'missing').concat(run.profile.sources.connectors.map((c) => { const i = rs.stagedSourceIdentity(ws, run.areaId, c); return `${i.retrieval.status}:${i.contentHash || ''}`; })),
    signalFingerprint: () => Object.entries(run.profile.inputs).map(([k, rel]) => { try { return `${k}:${sha256File(path.join(dir, rel))}`; } catch { return `${k}:missing`; } }),
    decisionsHash: () => { try { return sha256File(path.join(dir, 'decisions.jsonl')); } catch { return 'none'; } },
  };
}

const STAGE_FN = {
  sources(run, ctx) {
    const out = [];
    const suspicious = [];
    for (const s of run.profile.sources.local) {
      const id = rs.localSourceIdentity(s, ctx.permitted);
      out.push(id);
      if (['planning', 'changelog', 'releases'].includes(s.kind) && id.retrieval.status === 'ok') {
        const target = s.abs;
        const files = fs.statSync(target).isFile() ? [target] : walkSafe(target, { permittedRoots: ctx.permitted }).files;
        for (const f of files) for (const h of scanUntrusted(fs.readFileSync(f, 'utf8'), `${s.id}/${path.relative(target, f) || path.basename(f)}`)) suspicious.push({ source: s.id, ...h });
      }
    }
    for (const c of run.profile.sources.connectors) {
      const id = rs.stagedSourceIdentity(run.ws, run.areaId, c);
      out.push(id);
      if (id.retrieval.status === 'ok') {
        const f = path.join(ctx.areaDir, c.stagedAs);
        for (const h of scanUntrusted(fs.readFileSync(f, 'utf8'), `${c.id}`)) suspicious.push({ source: c.id, ...h });
      }
    }
    for (const id of out) if (id.retrieval.status === 'ok') id.suspiciousContent = suspicious.filter((h) => h.source === id.id).length || undefined;
    const ref = rs.writeOutput(run, 'outputs/sources.json', { sources: out, suspicious });
    const bad = out.filter((s) => s.retrieval.status !== 'ok');
    return { status: 'complete', outputs: [ref], notes: bad.length ? `${bad.length} source(s) not retrieved: ${bad.map((b) => `${b.id} (${b.retrieval.status})`).join(', ')}` : `${out.length} source(s) identified`, sourceProblems: bad.length };
  },

  inventory(run, ctx) {
    const o = ctx.opts;
    const outDir = path.join(run.dir, 'outputs', 'inventory');
    fs.mkdirSync(outDir, { recursive: true });
    const args = [SITE_AUDIT, '--out', outDir, '--origin', run.profile.site.origin];
    for (const g of run.profile.scope.crawl.include) args.push('--include', g);
    for (const g of run.profile.scope.crawl.exclude) args.push('--exclude', g);
    if (o.pagesDir) args.push('--from-dir', o.pagesDir, '--base-url', run.profile.site.origin, ...(o.assumeComplete ? ['--assume-complete'] : []));
    else {
      args.push(`${run.profile.site.origin}/sitemap.xml`, '--delay', String(o.delay ?? 1000));
      if (o.limit) args.push('--limit', String(o.limit));
      if (o.userAgent) args.push('--user-agent', o.userAgent);
    }
    const r = spawnSync(process.execPath, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    const files = ['pages.json', 'run.json', 'health.json', 'health.md', 'inventory.md'].filter((f) => fs.existsSync(path.join(outDir, f)));
    const outputs = files.map((f) => rs.outputRef(run, path.join('outputs', 'inventory', f)));
    if (![0, 3].includes(r.status) || !files.includes('pages.json')) {
      if (r.status === 3 && files.includes('run.json')) return { status: 'incomplete', outputs, notes: 'the site blocked the crawl; stopped without retrying or changing identity', blocked: true, error: (r.stderr || '').slice(0, 400) };
      return { status: 'failed', outputs, error: `site-audit exited ${r.status}: ${(r.stderr || r.stdout || '').slice(0, 600)}`, notes: 'the crawl did not produce an inventory' };
    }
    const pagesRun = JSON.parse(fs.readFileSync(path.join(outDir, 'run.json'), 'utf8'));
    const complete = r.status === 0 && pagesRun.inventory && pagesRun.inventory.complete;
    return { status: complete ? 'complete' : 'incomplete', outputs, notes: complete ? `${pagesRun.pages} pages examined` : `inventory incomplete: ${(pagesRun.inventory.reasons || ['crawl blocked']).join('; ')}`, blocked: r.status === 3, limitations: pagesRun.inventory.reasons };
  },

  discover(run, ctx) {
    const src = readJ(run, 'outputs/sources.json').sources;
    const usable = run.profile.sources.local.filter((s) => KIND_MAP[s.kind] && src.find((x) => x.id === s.id && x.retrieval.status === 'ok')).map((s) => ({ id: s.id, kind: KIND_MAP[s.kind], path: s.abs }));
    for (const c of run.profile.sources.connectors) {
      if (c.purpose === 'planning' && src.find((x) => x.id === c.id && x.retrieval.status === 'ok')) usable.push({ id: c.id, kind: 'planning', path: path.join(ctx.areaDir, c.stagedAs) });
    }
    const pages = evidencePages(run);
    const found = discover({ sources: usable, pages, areaId: run.areaId, profile: run.profile, permittedRoots: ctx.permitted });
    // A declared source whose kind extraction does not read is recorded, never dropped silently.
    for (const s of run.profile.sources.local) if (!KIND_MAP[s.kind]) found.limitations.push({ sourceId: s.id, reason: `source kind "${s.kind}" is not read by extraction; it is listed but nothing was extracted from it`, count: 1, examples: [] });
    const ref = rs.writeOutput(run, 'outputs/candidates.json', found);
    return { status: 'complete', outputs: [ref], notes: `${found.candidates.length} candidates from ${usable.length} source(s); ${found.failures.length} extractor failure(s)`, limitations: found.limitations.map((l) => `${l.count} x ${l.reason}`), extractorFailures: found.failures.length };
  },

  classify(run, ctx) {
    const pages = loadPages(run).filter((p) => p.status === 200 && p.__scope.evidence);
    const decisions = readDecisions(run.ws, run.areaId);
    const cls = applyDecisions(pages.map(classifyPage), decisions);
    const ref = rs.writeOutput(run, 'outputs/classifications.json', cls);
    return { status: 'complete', outputs: [ref], notes: `${cls.length} pages classified (machine suggestion; ${cls.filter((c) => c.source === 'human').length} overridden by a human decision)` };
  },

  signals(run, ctx) {
    const sig = loadSignals(run.profile, { areaDir: ctx.areaDir });
    const suspicious = [];
    for (const s of Object.values(sig)) {
      if (s.status === 'assessed' && s.items) for (const it of s.items) for (const h of scanUntrusted([it.excerpt, it.notes, it.note, it.claim].filter(Boolean).join('\n'), `${s.dimension}:${it.id || it.query || it.feature || it.page}`)) suspicious.push({ dimension: s.dimension, ...h });
    }
    const ref = rs.writeOutput(run, 'outputs/signals.json', { signals: sig, suspicious });
    const na = Object.values(sig).filter((s) => s.status === 'not assessed').map((s) => s.dimension);
    return { status: 'complete', outputs: [ref], notes: `${Object.values(sig).filter((s) => s.status === 'assessed').length} assessed; not assessed: ${na.join(', ') || 'none'}` };
  },

  claims(run) {
    const pages = evidencePages(run);
    const cand = readJ(run, 'outputs/candidates.json').candidates;
    const sig = readJ(run, 'outputs/signals.json').signals;
    const claims = attachEvidence(extractClaims(pages), cand, sig);
    const ref = rs.writeOutput(run, 'outputs/claims.json', { claims, summary: summarizeClaims(claims) });
    return { status: 'complete', outputs: [ref], notes: `${claims.length} claims extracted` };
  },

  matrix(run, ctx) {
    const pages = loadPages(run);
    const cls = readJ(run, 'outputs/classifications.json');
    const sig = readJ(run, 'outputs/signals.json').signals;
    const cand = readJ(run, 'outputs/candidates.json').candidates;
    const health = readJ(run, 'outputs/inventory/health.json');
    const inv = readJ(run, 'outputs/inventory/run.json').inventory;
    const m = buildMatrix({ profile: run.profile, pages, classifications: cls, health, signals: sig, inventory: inv });
    const releaseByTask = Object.fromEntries(run.profile.tasks.map((t) => [t.id, releaseView(relatedCandidates(t, cand, run.profile), sig, run.profile, t).state]));
    const bn = bottleneck(m, sig, releaseByTask);
    m.bottleneck = bn;
    const mat = assessMaturity({ matrix: m, pages, health, candidates: cand, signals: sig, inventory: inv, profile: run.profile, releaseByTask });
    const outputs = [rs.writeOutput(run, 'outputs/matrix.json', { matrix: m, bottleneck: bn, maturity: mat })];
    if (ctx.opts.readiness) outputs.push(rs.writeOutput(run, 'outputs/readiness.json', evidencePages(run).map(assessReadiness)));
    return { status: 'complete', outputs, notes: `${m.tasks.length} tasks; bottleneck stage: ${bn.stage || 'none found'} (${bn.support})` };
  },

  recommend(run) {
    const { matrix, bottleneck: bn } = readJ(run, 'outputs/matrix.json');
    matrix.bottleneck = bn;
    const cand = readJ(run, 'outputs/candidates.json').candidates;
    const sig = readJ(run, 'outputs/signals.json').signals;
    const { claims } = readJ(run, 'outputs/claims.json');
    const cls = readJ(run, 'outputs/classifications.json');
    const health = readJ(run, 'outputs/inventory/health.json');
    const inv = readJ(run, 'outputs/inventory/run.json').inventory;
    const decisions = readDecisions(run.ws, run.areaId);
    const recs = buildRecs({ profile: run.profile, matrix, candidates: cand, signals: sig, health, claims, classifications: cls, decisions, inventory: inv });
    const outputs = [];
    for (const r of recs.filter((x) => x.briefEligible && ['create', 'update'].includes(x.action))) {
      r.brief = `outputs/briefs/${r.id}.md`;
      outputs.push(rs.writeOutput(run, r.brief, briefFor(r, run.profile)));
    }
    const queue = recs.filter((r) => r.action !== 'no-action' || !r.human.verdict).map((r) => ({ target: r.id, kind: r.action, proposed: r.proposedJudgment.text, machineRating: r.machine.rating, verdict: r.human.verdict || null, needsReReview: Boolean(r.human.needsReReview) }));
    outputs.push(rs.writeOutput(run, 'outputs/recommendations.json', recs), rs.writeOutput(run, 'outputs/review-queue.json', queue));
    const by = recs.reduce((o, r) => { o[r.action] = (o[r.action] || 0) + 1; return o; }, {});
    return { status: 'complete', outputs, notes: `${recs.length} recommendations: ${Object.entries(by).map(([k, v]) => `${k} ${v}`).join(', ')}` };
  },

  report(run, ctx) {
    const start = readJ(run, 'start.json');
    const { sources } = readJ(run, 'outputs/sources.json');
    const pagesRun = readJ(run, 'outputs/inventory/run.json');
    const health = readJ(run, 'outputs/inventory/health.json');
    const pages = loadPages(run);
    const cls = readJ(run, 'outputs/classifications.json');
    const cand = readJ(run, 'outputs/candidates.json');
    const { signals } = readJ(run, 'outputs/signals.json');
    const { claims, summary } = readJ(run, 'outputs/claims.json');
    const { matrix, bottleneck: bn, maturity } = readJ(run, 'outputs/matrix.json');
    const recs = readJ(run, 'outputs/recommendations.json');
    const queue = readJ(run, 'outputs/review-queue.json');
    const readiness = maybeJ(run, 'outputs/readiness.json');
    const state = rs.readState(run.ws, run.areaId);
    let diff = null;
    if (state.lastCompleted && state.lastCompleted.runId !== run.runId) {
      const prev = rs.readManifest(run.ws, run.areaId, state.lastCompleted.runId);
      const prevCand = (() => { try { return JSON.parse(fs.readFileSync(path.join(areaOf(run.ws, run.areaId), 'runs', prev.runId, 'outputs', 'candidates.json'), 'utf8')).candidates; } catch { return null; } })();
      const compat = rs.compatibility(prev, { ...prev, runId: run.runId, status: 'complete', tool: start.tool, profile: start.profile, schemaVersion: 1 });
      diff = { fromRun: prev.runId, compat, diff: compat.compatible && prevCand ? rs.diffCandidates(prevCand, cand.candidates) : null };
      if (compat.compatible && !diff.diff) diff = { fromRun: prev.runId, compat: { compatible: false, reasons: ['the earlier run has no stored candidates'], warnings: [] }, diff: null };
    }
    const text = buildReport({ start, manifest: null, open: true, profile: run.profile, sources, pagesRun, health, pages, classifications: cls, candidatesOut: cand, signals, claims, claimSummary: summary, matrix, bottleneck: bn, maturity, recs, queue, diff, readiness });
    const ref = rs.writeOutput(run, 'outputs/report.md', text);
    return { status: 'complete', outputs: [ref], notes: 'report written' };
  },
};

function executeStages(run, ctx, only) {
  const wanted = only && only.length ? only : STAGES;
  const summary = [];
  let halted = null;
  for (const stage of STAGES) {
    if (!wanted.includes(stage)) continue;
    if (halted) {
      summary.push({ stage, action: 'not run', reason: `halted at ${halted}` });
      continue;
    }
    const blockedUp = DEPS[stage].find((d) => { const cp = rs.readCheckpoint(run, d); return !cp || cp.status === 'failed'; });
    if (blockedUp) {
      halted = blockedUp;
      summary.push({ stage, action: 'not run', reason: `upstream stage ${blockedUp} has no usable checkpoint` });
      continue;
    }
    const inputHash = stageInputHash(run, ctx, stage);
    const plan = rs.stagePlan(run, [stage], { [stage]: inputHash })[0];
    if (plan.action === 'skip') {
      summary.push({ stage, action: 'skipped', reason: plan.reason });
      continue;
    }
    const startedAt = new Date().toISOString();
    let result;
    try {
      result = STAGE_FN[stage](run, ctx);
    } catch (error) {
      result = { status: 'failed', outputs: [], error: String(error && error.stack ? error.stack.split('\n').slice(0, 3).join(' | ') : error) };
    }
    rs.writeCheckpoint(run, stage, { status: result.status, startedAt, finishedAt: new Date().toISOString(), inputHash, outputs: result.outputs || [], notes: result.notes || null, error: result.error || null, limitations: result.limitations || [], sourceProblems: result.sourceProblems || 0, blocked: Boolean(result.blocked) }, { supersede: plan.reason === 'inputs changed since the checkpoint' });
    summary.push({ stage, action: result.status, reason: result.notes || result.error || '' });
    if (result.status === 'failed') halted = stage;
  }
  return summary;
}

function closeIfComplete(run, ctx, summary) {
  const sources = readJ(run, 'outputs/sources.json').sources;
  const cps = STAGES.map((s) => rs.readCheckpoint(run, s));
  const allComplete = cps.every((c) => c && c.status === 'complete');
  const sourcesOk = sources.every((s) => s.retrieval.status === 'ok');
  if (!(allComplete && sourcesOk)) return { finalized: false, reasons: [...STAGES.filter((s, i) => !cps[i] || cps[i].status !== 'complete').map((s, i) => `stage ${s}: ${(rs.readCheckpoint(run, s) || { status: 'not run' }).status}`), ...sources.filter((s) => s.retrieval.status !== 'ok').map((s) => `source ${s.id}: ${s.retrieval.status}`)] };
  const outputs = [];
  for (const s of STAGES) for (const o of rs.readCheckpoint(run, s).outputs) outputs.push(o);
  const limitations = cps.flatMap((c) => c.limitations || []);
  // Stamp the report first, then record its final hash, so the manifest matches the file on disk.
  if (fs.existsSync(path.join(run.dir, 'outputs', 'report.md'))) stampReport(run, { status: 'complete' }, false);
  const refreshed = outputs.map((o) => (o.path && fs.existsSync(path.join(run.dir, o.path)) ? { ...o, sha256: sha256File(path.join(run.dir, o.path)), bytes: fs.statSync(path.join(run.dir, o.path)).size } : o));
  const manifest = rs.finalizeRun(run, { stages: STAGES, sources, limitations, outputs: refreshed });
  return { finalized: true, manifest };
}

// Re-render the report so it carries the final status (open runs say so; finalized runs name the manifest).
function stampReport(run, finalizedManifest, open) {
  const text = fs.readFileSync(path.join(run.dir, 'outputs', 'report.md'), 'utf8');
  const stamp = open ? `\n> **Run status: OPEN.** Not finalized; see \`audit status\`. This report covers what completed.\n` : `\n> Run status: ${finalizedManifest.status}. The run's manifest.json is the sealed record (finalized time and file hashes).\n`;
  const base = text.replace(/\n>\s\*\*This run is[^\n]*\n/, '\n').replace(/\n> \*\*Run status: OPEN\.[^\n]*\n/g, '\n').replace(/\n> Run status: [^\n]*\n/g, '\n').replace(/\s+$/, '\n');
  fs.writeFileSync(path.join(run.dir, 'outputs', 'report.md'), `${base}${stamp}`);
}

function findOpenRun(ws, areaId, runId) {
  const state = rs.readState(ws, areaId);
  const ids = runId ? [runId] : [...state.runs].reverse();
  for (const id of ids) {
    if (!rs.readManifest(ws, areaId, id)) return id;
    if (runId) return null;
  }
  return null;
}

function printSummary(summary, outcome, run) {
  for (const s of summary) process.stdout.write(`  ${s.stage.padEnd(10)} ${s.action.padEnd(10)} ${s.reason}\n`);
  if (outcome.finalized) process.stdout.write(`Run ${run.runId} finalized as ${outcome.manifest.status}. Report: ${path.join(run.dir, 'outputs', 'report.md')}\n`);
  else process.stdout.write(`Run ${run.runId} is OPEN (not finalized): ${outcome.reasons.join('; ')}.\nFix the cause and run: node scripts/audit.cjs resume --workspace ${run.ws.dir} --area ${run.areaId}\nReport so far: ${path.join(run.dir, 'outputs', 'report.md')}\n`);
}

function exitCode(outcome, run) {
  if (outcome.finalized && outcome.manifest.status === 'complete') return 0;
  const inv = rs.readCheckpoint(run, 'inventory');
  if (inv && inv.blocked) return 3;
  return 4;
}

function runPipeline(run, opts) {
  const ctx = makeContext(run, opts);
  const only = opts.stages ? String(opts.stages).split(',').map((s) => s.trim()).filter(Boolean) : null;
  if (only && only.some((s) => !STAGES.includes(s))) fail(`Unknown stage in --stages. Stages: ${STAGES.join(', ')}.`);
  const summary = executeStages(run, ctx, only);
  const hasReport = rs.readCheckpoint(run, 'report');
  const outcome = hasReport && STAGES.every((s) => rs.readCheckpoint(run, s)) ? closeIfComplete(run, ctx, summary) : { finalized: false, reasons: summary.filter((s) => !['complete', 'skipped'].includes(s.action)).map((s) => `stage ${s.stage}: ${s.action}${s.reason ? ` (${s.reason})` : ''}`) };
  if (hasReport && fs.existsSync(path.join(run.dir, 'outputs', 'report.md')) && !outcome.finalized) stampReport(run, null, true);
  printSummary(summary, outcome, run);
  process.exit(exitCode(outcome, run));
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2), {
      booleans: ['help', 'assume-complete', 'readiness', 'allow-incomplete'],
      strings: ['profile', 'workspace', 'area', 'run', 'pages-dir', 'delay', 'limit', 'user-agent', 'stages', 'from', 'to'],
      lists: ['allow-root'],
    });
  } catch (error) {
    fail(`${error.message}\n\n${HELP}`);
  }
  const [cmd] = args._;
  if (args.help || !cmd) return process.stdout.write(`${HELP}\n`);
  let ws;
  try {
    ws = rs.openWorkspace(args.workspace);
  } catch (error) {
    fail(error.message);
  }
  const opts = {
    allowRoot: (args.allowRoot || []).map((r) => path.resolve(r)), pagesDir: args.pagesDir ? path.resolve(args.pagesDir) : null, assumeComplete: args.assumeComplete, delay: args.delay === undefined ? undefined : Number(args.delay),
    limit: args.limit ? Number(args.limit) : null, userAgent: args.userAgent, readiness: args.readiness, stages: args.stages,
  };

  if (cmd === 'run') {
    if (!args.profile) fail(`run needs --profile.\n\n${HELP}`);
    let raw;
    try {
      raw = JSON.parse(fs.readFileSync(args.profile, 'utf8'));
    } catch (error) {
      fail(`Cannot read profile: ${error.message}`);
    }
    const v = validateProfile(raw, { baseDir: path.dirname(path.resolve(args.profile)), allowedRoots: [areaOf(ws, raw && raw.area && raw.area.id), ...opts.allowRoot] });
    if (!v.ok) fail(`Profile is not valid:\n${v.errors.map((e) => `  ${e.path}: ${e.message}`).join('\n')}`);
    if (!v.profile.tasks || !v.profile.tasks.length) fail('The profile declares no tasks. The audit asks which reader cannot do which task, so it needs at least one task (profile.cjs init shows the shape). Nothing was run.');
    for (const w of v.warnings) process.stderr.write(`warning ${w.path}: ${w.message}\n`);
    opts.profileFile = path.resolve(args.profile);
    const run = rs.startRun(ws, v.profile, { options: { ...opts, profileFile: undefined }, command: 'audit run' });
    process.stdout.write(`Run ${run.runId} for area ${run.areaId} (profile ${profileHash(v.profile).slice(0, 12)}).\n`);
    return runPipeline(run, opts);
  }
  if (cmd === 'resume') {
    if (!args.area) fail('resume needs --area.');
    const id = findOpenRun(ws, args.area, args.run);
    if (!id) fail(args.run ? `Run ${args.run} is finalized or unknown. Finalized runs are immutable; start a new run with "audit run".` : `Area ${args.area} has no open run to resume. Start one with "audit run".`);
    const run = rs.loadRun(ws, args.area, id);
    if (!run.profile) fail('The profile snapshot for this run is missing.');
    opts.profileFile = null;
    rs.appendEvent(run, 'run-resumed', { options: { ...opts, profileFile: undefined } });
    process.stdout.write(`Resuming run ${run.runId} for area ${run.areaId}.\n`);
    return runPipeline(run, opts);
  }
  if (cmd === 'status') {
    if (!args.area) fail('status needs --area.');
    const state = rs.readState(ws, args.area);
    process.stdout.write(`Area ${args.area}\n  last attempted:    ${state.lastAttempted ? `${state.lastAttempted.runId} at ${state.lastAttempted.at}` : 'never'}\n  last completed:    ${state.lastCompleted ? `${state.lastCompleted.runId} at ${state.lastCompleted.at}` : 'never'}\n  last human-reviewed: ${state.lastReviewed ? `${state.lastReviewed.runId} at ${state.lastReviewed.at}` : 'never'}\n`);
    for (const id of state.runs) {
      const m = rs.readManifest(ws, args.area, id);
      const run = rs.loadRun(ws, args.area, id);
      const cps = STAGES.map((s) => `${s}:${(rs.readCheckpoint(run, s) || { status: '-' }).status}`).join(' ');
      process.stdout.write(`  ${id}  ${m ? `finalized ${m.status}` : 'OPEN'}  ${cps}\n`);
    }
    return;
  }
  if (cmd === 'diff') {
    if (!args.area) fail('diff needs --area.');
    const state = rs.readState(ws, args.area);
    const complete = state.runs.map((id) => rs.readManifest(ws, args.area, id)).filter(Boolean);
    const to = args.to ? rs.readManifest(ws, args.area, args.to) : complete[complete.length - 1];
    const from = args.from ? rs.readManifest(ws, args.area, args.from) : complete[complete.length - 2];
    const compat = rs.compatibility(from, to);
    if (!compat.compatible) {
      process.stdout.write(`These runs cannot be compared: ${compat.reasons.join('; ')}.\n`);
      process.exit(2);
    }
    const load = (m) => JSON.parse(fs.readFileSync(path.join(areaOf(ws, args.area), 'runs', m.runId, 'outputs', 'candidates.json'), 'utf8')).candidates;
    const d = rs.diffCandidates(load(from), load(to));
    for (const w of compat.warnings) process.stdout.write(`note: ${w}\n`);
    process.stdout.write(`${from.runId} -> ${to.runId}: ${d.added.length} added, ${d.removed.length} removed, ${d.changed.length} changed, ${d.unchanged} unchanged source candidates (only source candidates are compared; coverage, tasks, and recommendations are not)\n`);
    for (const a of d.added) process.stdout.write(`  + ${a.name} (${a.id})\n`);
    for (const a of d.removed) process.stdout.write(`  - ${a.name} (${a.id})\n`);
    for (const a of d.changed) process.stdout.write(`  ~ ${a.name}: ${a.fields.map((f) => `${f.field} ${f.from} -> ${f.to}`).join('; ')}\n`);
    return;
  }
  if (cmd === 'finalize') {
    if (!args.area || !args.run) fail('finalize needs --area and --run.');
    if (!args.allowIncomplete) fail('Refusing to seal a run that may be incomplete without --allow-incomplete. A sealed run is immutable and cannot be resumed.');
    const run = rs.loadRun(ws, args.area, args.run);
    if (rs.readManifest(ws, args.area, args.run)) fail('That run is already finalized.');
    const sources = maybeJ(run, 'outputs/sources.json') ? readJ(run, 'outputs/sources.json').sources : [];
    const outputs = STAGES.flatMap((s) => (rs.readCheckpoint(run, s) || { outputs: [] }).outputs);
    const limitations = STAGES.flatMap((s) => (rs.readCheckpoint(run, s) || { limitations: [] }).limitations || []);
    if (fs.existsSync(path.join(run.dir, 'outputs', 'report.md'))) fs.writeFileSync(path.join(run.dir, 'outputs', 'report.md'), `${fs.readFileSync(path.join(run.dir, 'outputs', 'report.md'), 'utf8').replace(/\n> \*\*Run status: OPEN\.[^\n]*\n/g, '\n').replace(/\s+$/, '\n')}\n> Run status: sealed incomplete by a person with --allow-incomplete. See manifest.json for what is missing.\n`);
    const refreshed = outputs.map((o) => (o.path && fs.existsSync(path.join(run.dir, o.path)) ? { ...o, sha256: sha256File(path.join(run.dir, o.path)), bytes: fs.statSync(path.join(run.dir, o.path)).size } : o));
    const m = rs.finalizeRun(run, { stages: STAGES, sources, limitations, outputs: refreshed });
    process.stdout.write(`Run ${run.runId} sealed as ${m.status}: ${m.completeness.missing.join('; ') || 'nothing missing'}.\n`);
    return;
  }
  fail(`Unknown command "${cmd}".\n\n${HELP}`);
}

try {
  main();
} catch (error) {
  fail(error.message);
}
