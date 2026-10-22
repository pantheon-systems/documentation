#!/usr/bin/env node
'use strict';

// Compare identifiers used in the docs (tool names, commands, flags, endpoints) with a
// list you trust, such as the output of a server's own "list tools" call.

const fs = require('node:fs');
const { parseArgs, readJson, writeFile, fail } = require('./lib/util.cjs');

const HELP = `names: find identifiers the docs use that your trusted list does not have, and the reverse.

Usage:
  node scripts/names.cjs --pages audit-out/pages.json --known known-names.txt [options]

Options:
  --pattern <regex>   What counts as a name (default: snake_case words with an underscore)
  --prefix <text>     Only keep names starting with this text (repeatable), to cut noise
  --out <file>        Write markdown here instead of printing
  --json              Print JSON`;

const DEFAULT_PATTERN = '\\b[a-z][a-z0-9]*(?:_[a-z0-9]+)+\\b';

function compare(pages, known, { pattern = DEFAULT_PATTERN, prefixes = [] } = {}) {
  const re = new RegExp(pattern, 'g');
  const used = new Map();
  for (const page of pages.filter((p) => p.status === 200)) {
    for (const name of new Set((page.text || '').match(re) || [])) {
      if (prefixes.length && !prefixes.some((p) => name.startsWith(p))) continue;
      used.set(name, [...(used.get(name) || []), page.path]);
    }
  }
  const knownSet = new Set(known);
  const docsOnly = [...used.keys()].filter((n) => !knownSet.has(n)).sort();
  const knownOnly = known.filter((n) => !used.has(n)).sort();
  const matched = [...used.keys()].filter((n) => knownSet.has(n)).sort();
  return { used, docsOnly, knownOnly, matched };
}

function render({ used, docsOnly, knownOnly, matched }) {
  const lines = ['# Names in the docs compared with a trusted list', ''];
  lines.push(`Matched: ${matched.length}. In the docs but not in the list: ${docsOnly.length}. In the list but never mentioned: ${knownOnly.length}.`, '');
  lines.push('A name in the docs that the list lacks may be a typo, a renamed item, or an item from another environment. Confirm which before calling it an error.', '');
  lines.push('## In the docs, not in the list', '');
  lines.push(...(docsOnly.length ? docsOnly.map((n) => `- \`${n}\` on ${used.get(n).map((p) => `\`${p}\``).join(', ')}`) : ['- none']));
  lines.push('', '## In the list, never mentioned in the docs', '');
  lines.push(...(knownOnly.length ? knownOnly.map((n) => `- \`${n}\``) : ['- none']));
  return lines.join('\n');
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2), { booleans: ['help', 'json'], strings: ['pages', 'known', 'pattern', 'out'], lists: ['prefix'] });
  } catch (error) {
    fail(`${error.message}\n\n${HELP}`);
  }
  if (args.help) return process.stdout.write(`${HELP}\n`);
  if (!args.pages || !args.known) fail(`Give --pages and --known.\n\n${HELP}`);
  const known = fs
    .readFileSync(args.known, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));
  const result = compare(readJson(args.pages), known, { pattern: args.pattern, prefixes: args.prefix || [] });
  const output = args.json
    ? JSON.stringify({ docsOnly: result.docsOnly, knownOnly: result.knownOnly, matched: result.matched }, null, 2)
    : render(result);
  if (args.out) writeFile(args.out, `${output}\n`);
  else process.stdout.write(`${output}\n`);
}

if (require.main === module) main();

module.exports = { compare, render };
