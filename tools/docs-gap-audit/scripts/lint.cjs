#!/usr/bin/env node
'use strict';

// A small, dependency-free check of this repository's own code: syntax (node --check), a
// "use strict" header, no leftover debug output, and imports that are never used. It is not ESLint
// and says so. It exists so the zero-dependency design still gets a mechanical pass.

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['node_modules', '.git', 'audit-out']);

function* files(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* files(full);
    else if (e.name.endsWith('.cjs')) yield full;
  }
}

const strip = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

function check(file) {
  const problems = [];
  const raw = fs.readFileSync(file, 'utf8');
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (syntax.status !== 0) problems.push(`syntax: ${(syntax.stderr || '').split('\n').find((l) => /Error/.test(l)) || 'node --check failed'}`);
  const head = raw.replace(/^#!.*\n/, '');
  if (!/^(?:\s*\/\/[^\n]*\n)*\s*'use strict';/.test(head)) problems.push("missing 'use strict' at the top");
  const body = strip(raw);
  if (/\bconsole\.(log|debug|trace)\(/.test(body) && !/scripts\/(?:.*cjs)$/.test(path.relative(ROOT, file))) problems.push('console.log left in library or test code');
  if (/^\s*void \w+;\s*$/m.test(body)) problems.push('a "void name;" statement used to silence an unused variable: remove the variable instead');
  if (new RegExp(`\\b${'debug'}${'ger'}\\b`).test(body)) problems.push('breakpoint statement left in');
  // imports that are never used
  const names = [];
  for (const m of body.matchAll(/^\s*const\s+\{([^}]+)\}\s*=\s*require\(/gm)) for (const part of m[1].split(',')) names.push(part.split(':').pop().trim());
  for (const m of body.matchAll(/^\s*const\s+(\w+)\s*=\s*require\(/gm)) names.push(m[1]);
  for (const n of names.filter(Boolean)) {
    const esc = n.replace(/\$/g, '\\$');
    const uses = body.match(new RegExp(`(?:(?<![\\w$.])|(?<=\\.\\.\\.))${esc}(?![\\w$])`, 'g')) || [];
    if (uses.length < 2) problems.push(`unused import: ${n}`);
  }
  return problems;
}

let bad = 0;
let count = 0;
for (const f of files(ROOT)) {
  count += 1;
  const problems = check(f);
  for (const p of problems) {
    bad += 1;
    process.stdout.write(`${path.relative(ROOT, f)}: ${p}\n`);
  }
}
process.stdout.write(bad ? `${bad} problem(s) in ${count} files.\n` : `Checked ${count} files: no problems. This is a syntax and hygiene check, not ESLint.\n`);
process.exit(bad ? 1 : 0);
