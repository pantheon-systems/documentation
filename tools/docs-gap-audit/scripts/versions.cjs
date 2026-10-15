#!/usr/bin/env node
'use strict';

// Compare "current version" statements in the docs with the latest published npm versions.
// Only the registry you name is contacted (default: registry.npmjs.org), and only for
// the packages you list.

const { parseArgs, readJson, writeFile, fail } = require('./lib/util.cjs');

const HELP = `versions: check "current version" claims against the npm registry.

Usage:
  node scripts/versions.cjs --pages audit-out/pages.json --npm <package> [--npm <package>] [options]

Options:
  --registry <url>   Registry base URL (default https://registry.npmjs.org)
  --out <file>       Write markdown here instead of printing
  --json             Print JSON`;

const CLAIM = new RegExp(
  [
    '\\b(?:current|latest|newest|recommended)\\b[^.\\n]{0,60}?\\bv?(\\d+\\.\\d+(?:\\.\\d+)?)\\b',
    '\\bv?(\\d+\\.\\d+(?:\\.\\d+)?)\\b[^.\\n]{0,40}?\\b(?:is|are) (?:the )?(?:current|latest)\\b',
  ].join('|'),
  'gi',
);

function findClaims(pages) {
  const claims = [];
  for (const page of pages.filter((p) => p.status === 200)) {
    const text = page.text || '';
    for (const match of text.matchAll(CLAIM)) {
      claims.push({
        path: page.path,
        version: match[1] || match[2],
        excerpt: text.slice(Math.max(0, match.index - 20), match.index + match[0].length + 20).replace(/\s+/g, ' '),
      });
    }
  }
  return claims;
}

async function latestVersion(pkg, registry, fetchImpl = fetch) {
  const url = `${registry.replace(/\/$/, '')}/${encodeURIComponent(pkg).replace('%40', '@')}`;
  const res = await fetchImpl(url, { headers: { accept: 'application/vnd.npm.install-v1+json' } });
  if (res.status !== 200) return { pkg, error: `registry returned ${res.status} (private or misspelled?)` };
  const body = await res.json();
  return { pkg, latest: body['dist-tags']?.latest || null };
}

const parts = (v) => v.split('.').map(Number);

function judge(claim, latest) {
  const [cMajor, cMinor] = parts(claim.version);
  const [lMajor, lMinor] = parts(latest);
  if (cMajor !== lMajor) return null;
  return lMinor > cMinor ? `${lMinor - cMinor} minor version(s) behind ${latest}` : null;
}

function render(claims, latest) {
  const lines = ['# Version claims compared with the registry', ''];
  lines.push('Latest published versions:', '');
  for (const l of latest) lines.push(`- \`${l.pkg}\`: ${l.latest || l.error}`);
  lines.push('', 'A docs statement can legitimately describe a pinned or older line. Confirm what the sentence means before calling it wrong.', '');
  lines.push('## Statements that mention a current or latest version', '');
  if (!claims.length) lines.push('- none found');
  for (const c of claims) {
    const behind = latest.filter((l) => l.latest).map((l) => ({ pkg: l.pkg, note: judge(c, l.latest) })).filter((x) => x.note);
    lines.push(`- \`${c.path}\`: "${c.excerpt}"${behind.length ? ` (${behind.map((b) => `\`${b.pkg}\`: ${b.note}`).join('; ')})` : ''}`);
  }
  return lines.join('\n');
}

async function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2), { booleans: ['help', 'json'], strings: ['pages', 'registry', 'out'], lists: ['npm'] });
  } catch (error) {
    fail(`${error.message}\n\n${HELP}`);
  }
  if (args.help) return process.stdout.write(`${HELP}\n`);
  if (!args.pages || !args.npm) fail(`Give --pages and at least one --npm package.\n\n${HELP}`);
  const claims = findClaims(readJson(args.pages));
  const latest = [];
  for (const pkg of args.npm) latest.push(await latestVersion(pkg, args.registry || 'https://registry.npmjs.org'));
  const output = args.json ? JSON.stringify({ latest, claims }, null, 2) : render(claims, latest);
  if (args.out) writeFile(args.out, `${output}\n`);
  else process.stdout.write(`${output}\n`);
}

if (require.main === module) main().catch((error) => fail(error.stack || String(error), 1));

module.exports = { findClaims, latestVersion, judge, render };
