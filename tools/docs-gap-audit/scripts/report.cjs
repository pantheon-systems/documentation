#!/usr/bin/env node
'use strict';

// Two modes. With --dir, assemble a report skeleton from the files older scripts wrote; the classification,
// maturity, and recommendation sections stay blank for the auditor. With --run, print the full report an
// area audit (audit.cjs) already wrote for one run.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs, readJson, writeFile, mdTable, fail } = require('./lib/util.cjs');

const HELP = `report: assemble a report skeleton from an audit-out directory.

Usage:
  node scripts/report.cjs --dir audit-out [--title "Docs audit"] [--out audit-out/report.md]
  node scripts/report.cjs --run <workspace>/areas/<area>/runs/<run id> [--out report.md]    print an audit run's full report

Reads pages.json and run.json (required), and health.md, coverage.md, names.md, versions.md if present.
Leaves classification, maturity, and recommendations blank for you to fill in.`;

const read = (file) => (fs.existsSync(file) ? fs.readFileSync(file, 'utf8').trim() : null);

function build(dir, title) {
  const pages = readJson(path.join(dir, 'pages.json'));
  const run = readJson(path.join(dir, 'run.json'));
  const ok = pages.filter((p) => p.status === 200);
  const lines = [`# ${title}`, ''];
  lines.push('## Scope and method', '');
  lines.push(`- Source: ${run.input}`);
  lines.push(`- Crawled ${run.started} to ${run.finished || 'unfinished'} as \`${run.userAgent}\`; read-only.`);
  lines.push(`- Pages fetched: ${ok.length} of ${pages.length} listed. Skipped by robots.txt: ${(run.skipped || []).length}.`);
  if (run.blocked) lines.push(`- **The site blocked the crawl:** ${run.blocked}. Results are partial.`);
  lines.push('- Evidence markers: observed = read in a fetched page or run output; inferred = reasoned from observed facts; unverified = not checked.', '');

  lines.push('## Classification', '');
  lines.push('Classify each page by the reader need it serves (tutorial, how-to, reference, explanation, or mixed). Add confidence and the evidence for the call.', '');
  lines.push(
    mdTable(
      ['Page', 'Title', 'Words', 'Type', 'Confidence', 'Evidence'],
      ok.map((p) => [`\`${p.path}\``, p.title || '', String(p.words ?? ''), '', '', '']),
    ),
    '',
  );

  for (const [heading, file] of [
    ['Health checks', 'health.md'],
    ['Feature coverage', 'coverage.md'],
    ['Names compared with a trusted list', 'names.md'],
    ['Version claims', 'versions.md'],
  ]) {
    const body = read(path.join(dir, file));
    lines.push(`## ${heading}`, '', body ? body.replace(/^# .*\n+/, '') : `_No ${file} found. Run the matching script to fill this in._`, '');
  }

  lines.push('## Maturity', '', '_Fill in after reading the pages. Name the evidence for each rating._', '');
  lines.push('## Recommendations', '', '_Rank by reader impact. Each item names the page or gap, the evidence, and the smallest fix._', '');
  lines.push('## What this audit did not cover', '', '_List pages not fetched, claims not run, and anything marked unverified._', '');
  return lines.join('\n');
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2), { booleans: ['help'], strings: ['dir', 'title', 'out', 'run'] });
  } catch (error) {
    fail(`${error.message}\n\n${HELP}`);
  }
  if (args.help) return process.stdout.write(`${HELP}\n`);
  if (args.run) {
    const file = path.join(args.run, 'outputs', 'report.md');
    if (!fs.existsSync(file)) fail(`No report at ${file}. Run the audit first (node scripts/audit.cjs run ...).`);
    const text = fs.readFileSync(file, 'utf8');
    if (args.out) writeFile(args.out, text);
    else process.stdout.write(text);
    return;
  }
  if (!args.dir) fail(`Give --dir or --run.\n\n${HELP}`);
  const out = args.out || path.join(args.dir, 'report.md');
  writeFile(out, `${build(args.dir, args.title || 'Docs audit')}\n`);
  process.stdout.write(`Wrote ${out}\n`);
}

if (require.main === module) main();

module.exports = { build };
