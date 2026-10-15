#!/usr/bin/env node
'use strict';

// Discover what probably needs documentation by reading sources (a code repo, planning
// docs, changelogs, release posts), then compare each candidate with the published pages.
// Reads local files only. Candidates are leads: confirm each one by reading the source.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs, readJson, writeFile, mdTable, fail } = require('./lib/util.cjs');
const { extractSource } = require('./lib/extract.cjs');
const { dedupe } = require('./lib/candidates.cjs');
const { discover, ORDER } = require('./lib/discovery.cjs');

const HELP = `discover: find what needs docs from sources, and compare with published pages.

Usage:
  node scripts/discover.cjs --pages audit-out/pages.json [source options] [--out discovery.md]

Source options (each repeatable, all local paths):
  --repo <dir>        A code repository: CLI commands, tool names, routes, env vars, WordPress
                      hooks/blocks/REST routes/WP-CLI commands, README and docs headings
  --planning <path>   Planning docs, such as Google Docs saved as .md, .txt, or .html
  --changelog <path>  A changelog file or a directory of them
  --releases <path>   Release posts saved as .md, .txt, or .html (a file or a directory)

Other options:
  --repo-docs            Also take headings from every Markdown file in a repo, not just READMEs
  --exclude <regex>      Skip repo files whose relative path matches (repeatable)
  --features-out <file>  Also write the candidates as a features file for coverage.cjs
  --max-per-kind <n>     Rows shown per kind in the markdown report (default 40)
  --json                 Print JSON
  --help

Rating guide matches coverage.cjs. A candidate rated None may be documented under other words.`;

// Legacy entry points kept for callers and tests; both run the extractor registry.
function fromRepo(dir, options = {}) {
  return extractSource({ id: 'repo', kind: 'repo', root: dir, options }).candidates;
}

function fromDocs(target, kind, status) {
  const sourceKind = kind === 'release' ? 'releases' : kind;
  return extractSource({ id: kind, kind: sourceKind, root: target, options: { defaultStatus: status } }).candidates;
}

function render(results, sourceCounts, { maxPerKind = 40 } = {}) {
  const row = (r) => [
    r.name.replace(/\|/g, '\\|'),
    r.status,
    r.suggested,
    r.best.map((b) => `\`${b.path}\``).join('<br>'),
    r.sources.slice(0, 2).map((s) => `\`${s}\``).join('<br>') + (r.sources.length > 2 ? `<br>+${r.sources.length - 2} more` : ''),
    '',
  ];
  const byKind = new Map();
  for (const r of results) byKind.set(r.kinds[0], [...(byKind.get(r.kinds[0]) || []), r]);
  const ratings = Object.keys(ORDER);
  const summary = [...byKind].map(([kind, items]) => [kind, String(items.length), ...ratings.map((k) => String(items.filter((r) => r.suggested === k).length))]);
  const lines = [
    '# Discovered documentation candidates',
    '',
    `Candidates found: ${results.length} (sources: ${Object.entries(sourceCounts).map(([k, v]) => `${k} ${v}`).join(', ') || 'none'}).`,
    '',
    'Each candidate comes from a pattern match in a source, not from a reader of the product. Some are internal detail that needs no docs, and some are documented under different words. Open the source line and the best page, then write the verdict. Within each kind, gaps sort first. Status "limited" means the source text mentions a flag, alpha, beta, preview, or opt-in: check availability before calling it a gap, and note docs as due when it opens. Kind "planning-stub" is a planning doc with a title and almost no body.',
    '',
    '## Summary by kind',
    '',
    mdTable(['Kind', 'Candidates', ...ratings], summary),
  ];
  for (const [kind, items] of byKind) {
    lines.push('', `## ${kind}`, '', items.length > maxPerKind ? `Showing the first ${maxPerKind} of ${items.length}; use --max-per-kind or --json for all.` : `${items.length} candidates.`, '');
    lines.push(mdTable(['Candidate', 'Status', 'Suggested', 'Best published page', 'Source', 'Auditor verdict'], items.slice(0, maxPerKind).map(row)));
  }
  return lines.join('\n');
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2), {
      booleans: ['help', 'json', 'repo-docs'],
      strings: ['pages', 'out', 'features-out', 'max-per-kind'],
      lists: ['repo', 'planning', 'changelog', 'releases', 'exclude'],
    });
  } catch (error) {
    fail(`${error.message}\n\n${HELP}`);
  }
  if (args.help) return process.stdout.write(`${HELP}\n`);
  if (!args.pages) fail(`Give --pages.\n\n${HELP}`);
  const sources = { repo: args.repo || [], planning: args.planning || [], changelog: args.changelog || [], releases: args.releases || [] };
  if (!Object.values(sources).some((s) => s.length)) fail(`Give at least one of --repo, --planning, --changelog, --releases.\n\n${HELP}`);
  for (const p of Object.values(sources).flat()) if (!fs.existsSync(p)) fail(`Path not found: ${p}`);

  const pages = readJson(args.pages);
  const repoOptions = { repoDocs: Boolean(args.repoDocs), exclude: (args.exclude || []).map((e) => new RegExp(e)) };
  const list = ['repo', 'planning', 'changelog', 'releases'].flatMap((k) => sources[k].map((p) => ({ id: k, kind: k, path: p })));
  const found = discover({ sources: list, pages, options: repoOptions });
  const results = found.candidates;
  const counts = found.counts;
  if (found.limitations.length) process.stderr.write(`Not everything was read: ${found.limitations.map((l) => `${l.count} x ${l.reason}`).join('; ')}.\n`);

  if (args.featuresOut) {
    const section = (status) => results.filter((r) => r.status === status).map((r) => `${r.name} :: ${r.terms.join(' | ')}`);
    const body = ['# Generated by discover.cjs. Edit terms before relying on ratings.', '[shipped]', ...section('shipped'), '', '[planned]', ...section('planned')];
    writeFile(args.featuresOut, `${body.join('\n')}\n`);
  }
  const output = args.json ? JSON.stringify(results, null, 2) : render(results, counts, { maxPerKind: args.maxPerKind ? Number(args.maxPerKind) : 40 });
  if (args.out) writeFile(args.out, `${output}\n`);
  else process.stdout.write(`${output}\n`);
}

if (require.main === module) main();

module.exports = { fromRepo, fromDocs, dedupe, render };
