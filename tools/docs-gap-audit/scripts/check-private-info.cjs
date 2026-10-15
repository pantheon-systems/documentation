#!/usr/bin/env node
'use strict';

// Scan a directory for text that looks like private or company-internal information, so
// audit output and this repo can be checked before anything is shared or committed.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs, fail } = require('./lib/util.cjs');

const HELP = `check-private-info: flag text that looks private before you share or commit.

Usage:
  node scripts/check-private-info.cjs [dir] [--terms <file>] [--json]

Default dir is the current directory. A .private-terms file in that dir (one term per line,
case-insensitive, "#" comments) adds your own terms, such as an employer or project name.
Exit code 1 when anything is flagged.`;

const PATTERNS = [
  ['issue tracker link', /[a-z0-9-]+\.atlassian\.net/i],
  ['chat workspace link', /[a-z0-9-]+\.slack\.com/i],
  ['private document link', /docs\.google\.com\/(document|spreadsheets|presentation)\//i],
  ['drive link', /drive\.google\.com\/(file|drive)\//i],
  ['home-directory path', /\/Users\/[A-Za-z][\w.-]*\//],
  ['email address', /\b[\w.+-]+@(?!example\.(com|org|net)\b)(?![\w-]+\.test\b)[\w-]+\.[a-z]{2,}\b/i],
  ['access token', /\b(ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9]{20,})\b/],
  ['private key block', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
];

const SKIP_DIRS = new Set(['.git', 'node_modules', 'audit-out']);
const SKIP_FILES = new Set(['.private-terms', 'check-private-info.cjs', 'check-private-info.test.cjs']);

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile() && !SKIP_FILES.has(entry.name)) yield full;
  }
}

function loadTerms(file) {
  if (!file || !fs.existsSync(file)) return [];
  return fs
    .readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));
}

function scan(dir, terms = []) {
  const findings = [];
  const termRes = terms.map((t) => [`private term "${t}"`, new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')]);
  for (const file of walk(dir)) {
    const buf = fs.readFileSync(file);
    if (buf.includes(0)) continue;
    buf
      .toString('utf8')
      .split(/\r?\n/)
      .forEach((line, i) => {
        for (const [label, re] of [...PATTERNS, ...termRes]) {
          if (re.test(line)) findings.push({ file: path.relative(dir, file), line: i + 1, label });
        }
      });
  }
  return findings;
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2), { booleans: ['help', 'json'], strings: ['terms'] });
  } catch (error) {
    fail(`${error.message}\n\n${HELP}`);
  }
  if (args.help) return process.stdout.write(`${HELP}\n`);
  const dir = path.resolve(args._[0] || '.');
  const findings = scan(dir, loadTerms(args.terms || path.join(dir, '.private-terms')));
  if (args.json) process.stdout.write(`${JSON.stringify(findings, null, 2)}\n`);
  else if (!findings.length) process.stdout.write(`No private-looking text found in ${dir}.\n`);
  else for (const f of findings) process.stdout.write(`${f.file}:${f.line}  ${f.label}\n`);
  process.exit(findings.length ? 1 : 0);
}

if (require.main === module) main();

module.exports = { scan, loadTerms };
