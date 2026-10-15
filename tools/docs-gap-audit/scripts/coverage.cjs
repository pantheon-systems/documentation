#!/usr/bin/env node
'use strict';

// Feature coverage leads. Reads pages.json from site-audit and a features file, and
// suggests how well each feature is covered. Suggestions are leads to confirm by reading.

const fs = require('node:fs');
const { parseArgs, readJson, writeFile, mdTable, fail } = require('./lib/util.cjs');

const HELP = `coverage: suggest how well each feature is documented.

Usage:
  node scripts/coverage.cjs --pages audit-out/pages.json --features features.txt [--out coverage.md] [--json]

The features file lists one feature per line: "Name :: term | term | /regex/".
Section lines like [shipped] or [planned] set the status of the lines below. See references/features-file.md.`;

function parseFeatures(text) {
  const features = [];
  let status = 'shipped';
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const section = /^\[(.+)\]$/.exec(line);
    if (section) {
      status = section[1].toLowerCase();
      continue;
    }
    const split = line.indexOf('::');
    const name = (split > 0 ? line.slice(0, split) : line).trim();
    const terms = (split > 0 ? line.slice(split + 2) : line).split('|').map((s) => s.trim()).filter(Boolean);
    features.push({ name, status, terms });
  }
  return features;
}

function termRegex(term) {
  const asRegex = /^\/(.+)\/$/.exec(term);
  if (asRegex) return new RegExp(asRegex[1], 'gi');
  return new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi');
}

const count = (text, regexes) => regexes.reduce((n, re) => n + (text.match(re) || []).length, 0);

function evaluate(feature, pages) {
  const regexes = feature.terms.map(termRegex);
  const hits = [];
  for (const page of pages.filter((p) => p.status === 200)) {
    const titleHit = count(`${page.title} ${(page.h1 || []).join(' ')}`, regexes) > 0;
    const headingHits = page.headings.filter((h) => count(h.text, regexes) > 0);
    const bodyHits = count(page.text || '', regexes);
    if (!titleHit && !headingHits.length && !bodyHits) continue;
    hits.push({
      path: page.path,
      titleHit,
      headings: headingHits.map((h) => h.text),
      bodyHits,
      score: (titleHit ? 5 : 0) + headingHits.length * 3 + Math.min(bodyHits, 5),
    });
  }
  hits.sort((a, b) => b.score - a.score);
  const mentions = hits.reduce((n, h) => n + h.bodyHits, 0);
  let suggested = 'None';
  if (hits.some((h) => h.titleHit || h.headings.length >= 2)) suggested = 'Dedicated';
  else if (hits.some((h) => h.headings.length >= 1) || mentions >= 3) suggested = 'Partial';
  else if (mentions >= 1) suggested = 'Mention';
  return { ...feature, suggested, pages: hits.length, mentions, best: hits.slice(0, 3) };
}

function render(results) {
  const rows = results.map((r) => [
    r.name,
    r.status,
    r.suggested,
    r.best.map((b) => `\`${b.path}\` (${b.titleHit ? 'title, ' : ''}${b.headings.length} headings, ${b.bodyHits} mentions)`).join('<br>'),
    `${r.pages} pages, ${r.mentions} mentions`,
    '',
  ]);
  return [
    '# Feature coverage leads',
    '',
    'Suggested ratings come from keyword matches. They are leads, not verdicts: a feature documented under different words shows up as None, and a mention is not documentation. Read the best pages, then fill in the last column.',
    '',
    'Rating guide: Dedicated = a page title or two headings match. Partial = one heading or at least 3 mentions. Mention = 1 or 2 mentions. None = no match.',
    '',
    mdTable(['Feature', 'Status', 'Suggested', 'Best pages', 'Spread', 'Auditor verdict'], rows),
  ].join('\n');
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2), { booleans: ['help', 'json'], strings: ['pages', 'features', 'out'] });
  } catch (error) {
    fail(`${error.message}\n\n${HELP}`);
  }
  if (args.help) return process.stdout.write(`${HELP}\n`);
  if (!args.pages || !args.features) fail(`Give --pages and --features.\n\n${HELP}`);
  const pages = readJson(args.pages);
  const features = parseFeatures(fs.readFileSync(args.features, 'utf8'));
  if (!features.length) fail('The features file has no features.');
  const results = features.map((f) => evaluate(f, pages));
  const output = args.json ? JSON.stringify(results, null, 2) : render(results);
  if (args.out) writeFile(args.out, `${output}\n`);
  else process.stdout.write(`${output}\n`);
}

if (require.main === module) main();

module.exports = { parseFeatures, evaluate, render, termRegex };
