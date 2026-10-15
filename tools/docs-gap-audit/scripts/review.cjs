#!/usr/bin/env node
'use strict';

// Human review record. Model output proposes; a person decides. Verdicts are written here only,
// attributed to a named reviewer, in an append-only file in the private workspace. Each verdict stores
// a hash of the evidence it rested on, so a later run can flag it for re-review when that evidence changes.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs, fail } = require('./lib/util.cjs');
const rs = require('./lib/runstate.cjs');
const { shortId } = require('./lib/hash.cjs');
const { findSecrets } = require('./lib/secrets.cjs');

const VERDICTS = ['accepted', 'rejected', 'deferred', 'no-action', 'needs-more-evidence', 'resolved'];
const TYPES = ['tutorial', 'how-to', 'reference', 'explanation', 'troubleshooting', 'migration', 'mixed'];
const MODEL_NAMES = /(claude|assistant|\bmodel\b|\bai\b|toolkit|\bbot\b|gpt|llm|codex|gemini|copilot|subagent|agent)/i;
// A person's name passes unless it names a tool or model. A leading "Ai" is allowed when it is a given name ("Ai Tanaka").
const ownedBy = (name) => {
  const rest = String(name).trim().replace(/^ai\s+(?=\p{L}{2,})/iu, '');
  return rest.trim().length >= 2 && !MODEL_NAMES.test(rest);
};

const HELP = `review: record and inspect human verdicts. Model output is never written as a verdict.

Usage:
  node scripts/review.cjs queue    --workspace <dir> --area <id> [--run <id>]
  node scripts/review.cjs record   --workspace <dir> --area <id> --kind recommendation --target <rec id> --verdict <v> --by <person> [--note <text>] [--run <id>]
                                   [--verified-by <person> --closure-evidence <text>]   (for --verdict resolved)
  node scripts/review.cjs record   --workspace <dir> --area <id> --kind classify --page </path> --verdict <type> --by <person> [--note <text>]
  node scripts/review.cjs stale    --workspace <dir> --area <id> [--run <id>]
  node scripts/review.cjs list     --workspace <dir> --area <id>
  node scripts/review.cjs reviewed --workspace <dir> --area <id> --run <id> --by <person>

Recommendation verdicts: ${VERDICTS.join(', ')}. Classification verdicts: ${TYPES.join(', ')}.
"resolved" counts as verified only with --verified-by and --closure-evidence (what showed the reader need is now met);
without them it is recorded as claimed, not verified. --by must name a person, not a tool or model.
Exit codes: 0 ok, 2 bad arguments or a refused record.`;

const decisionsFile = (ws, area) => path.join(rs.areaDir(ws, area), 'decisions.jsonl');
const readDecisions = (ws, area) => rs.readDecisions(ws, area);
function latestRunWithOutputs(ws, area, runId) {
  const state = rs.readState(ws, area);
  const ids = runId ? [runId] : [...state.runs].reverse();
  for (const id of ids) {
    const f = path.join(rs.runDirOf(ws, area, id), 'outputs', 'recommendations.json');
    if (fs.existsSync(f)) return { id, recs: JSON.parse(fs.readFileSync(f, 'utf8')), dir: rs.runDirOf(ws, area, id) };
  }
  return null;
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2), { booleans: ['help'], strings: ['workspace', 'area', 'run', 'kind', 'target', 'page', 'verdict', 'by', 'note', 'verified-by', 'closure-evidence'] });
  } catch (error) {
    fail(`${error.message}\n\n${HELP}`);
  }
  const [cmd] = args._;
  if (args.help || !cmd) return process.stdout.write(`${HELP}\n`);
  if (!args.workspace || !args.area) fail(`Give --workspace and --area.\n\n${HELP}`);
  let ws;
  try {
    ws = rs.openWorkspace(args.workspace);
  } catch (error) {
    fail(error.message);
  }
  const area = args.area;

  if (cmd === 'list') {
    for (const d of readDecisions(ws, area)) process.stdout.write(`${d.at}  ${d.kind}  ${d.target || d.page}  ${d.verdict}  by ${d.by}${d.kind === 'recommendation' && d.verdict === 'resolved' ? (d.closure && d.closure.verifiedBy ? ' (verified)' : ' (claimed, not verified)') : ''}\n`);
    return;
  }
  if (cmd === 'queue') {
    const run = latestRunWithOutputs(ws, area, args.run);
    if (!run) fail('No run with recommendations yet. Run the audit first.');
    process.stdout.write(`Run ${run.id}: proposed judgments that need a human verdict\n`);
    let n = 0;
    for (const r of run.recs) {
      if (r.human.verdict && !r.human.needsReReview) continue;
      n += 1;
      process.stdout.write(`  ${r.id}  ${r.action.padEnd(24)} ${(r.taskTitle || r.page || '').slice(0, 40).padEnd(40)} ${r.human.needsReReview ? 'RE-REVIEW (evidence changed)' : 'no verdict'}\n    proposed: ${r.proposedJudgment.text.slice(0, 120)}\n`);
    }
    if (!n) process.stdout.write('  nothing waiting\n');
    return;
  }
  if (cmd === 'stale') {
    const run = latestRunWithOutputs(ws, area, args.run);
    if (!run) fail('No run with recommendations yet.');
    const decisions = readDecisions(ws, area).filter((d) => d.kind === 'recommendation');
    const latest = new Map(decisions.map((d) => [d.target, d]));
    let n = 0;
    for (const [target, d] of latest) {
      const r = run.recs.find((x) => x.id === target);
      if (!r) { n += 1; process.stdout.write(`  ${target}: decided "${d.verdict}" but this run has no such recommendation (the need may be gone or renamed)\n`); continue; }
      if (r.evidenceHash !== d.evidenceHash) { n += 1; process.stdout.write(`  ${target}: decided "${d.verdict}" on ${d.at}, but its supporting evidence has changed since. Re-review.\n`); }
    }
    if (!n) process.stdout.write('  no decision rests on changed evidence\n');
    return;
  }
  if (cmd === 'reviewed') {
    if (!args.run || !args.by) fail('reviewed needs --run and --by.');
    if (!ownedBy(args.by)) fail('--by must name a person.');
    try {
      rs.recordReview(ws, area, args.run, args.by);
    } catch (error) {
      fail(error.message);
    }
    process.stdout.write(`Recorded: run ${args.run} reviewed by ${args.by}.\n`);
    return;
  }
  if (cmd === 'record') {
    if (!args.kind || !args.verdict || !args.by) fail(`record needs --kind, --verdict and --by.\n\n${HELP}`);
    if (!ownedBy(args.by)) fail('--by must name a person. Model output is never written as a verdict.');
    const secrets = findSecrets({ note: args.note, closure: args.closureEvidence });
    if (secrets.length) fail(`Refusing a note that contains ${secrets[0].reason}.`);
    const at = new Date().toISOString();
    let d;
    if (args.kind === 'recommendation') {
      if (!args.target) fail('recommendation verdicts need --target.');
      if (!VERDICTS.includes(args.verdict)) fail(`Verdict must be one of ${VERDICTS.join(', ')}.`);
      const run = latestRunWithOutputs(ws, area, args.run);
      const rec = run && run.recs.find((r) => r.id === args.target);
      if (!rec) fail(`No recommendation ${args.target} in ${run ? `run ${run.id}` : 'any run'}.`);
      d = { schemaVersion: 1, id: `d_${shortId(`${args.target}|${at}`)}`, at, by: args.by, kind: 'recommendation', target: args.target, verdict: args.verdict, note: args.note || null, evidenceHash: rec.evidenceHash, runId: run.id, closure: null };
      if (args.verdict === 'resolved' && args.verifiedBy && !ownedBy(args.verifiedBy)) fail('--verified-by must name a person, not a tool or model.');
      if (args.verdict === 'resolved') d.closure = args.verifiedBy && args.closureEvidence ? { verifiedBy: args.verifiedBy, evidence: args.closureEvidence } : null;
    } else if (args.kind === 'classify') {
      if (!args.page) fail('classification verdicts need --page.');
      if (!TYPES.includes(args.verdict)) fail(`Classification verdict must be one of ${TYPES.join(', ')}.`);
      d = { schemaVersion: 1, id: `d_${shortId(`${args.page}|${at}`)}`, at, by: args.by, kind: 'classify', page: args.page, verdict: args.verdict, note: args.note || null };
    } else fail('--kind must be recommendation or classify.');
    fs.mkdirSync(path.dirname(decisionsFile(ws, area)), { recursive: true });
    fs.appendFileSync(decisionsFile(ws, area), `${JSON.stringify(d)}\n`);
    process.stdout.write(`Recorded ${d.id}: ${d.verdict}${d.kind === 'recommendation' && d.verdict === 'resolved' ? (d.closure ? ' (verified)' : ' (claimed, not verified: add --verified-by and --closure-evidence)') : ''}.\n`);
    return;
  }
  fail(`Unknown command "${cmd}".\n\n${HELP}`);
}

try {
  main();
} catch (error) {
  fail(error.message);
}
