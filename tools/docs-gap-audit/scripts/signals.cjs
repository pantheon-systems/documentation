#!/usr/bin/env node
'use strict';

// Inspect and validate signal inputs. This script only reads local files.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs, fail } = require('./lib/util.cjs');
const { DIMENSIONS, FILE_DIMENSIONS, validateSignal, describeMarkdown } = require('./lib/signals.cjs');

const HELP = `signals: define and validate documentation-needs signal inputs.

Usage:
  node scripts/signals.cjs list                          dimensions, how each is assessed, and what it needs
  node scripts/signals.cjs describe [--markdown]         the full contract for every dimension
  node scripts/signals.cjs validate <dimension> <file>   check a staged signal file against its contract

Signal files are staged privately by Claude from authorized sources (a support export, a search export, and so
on). Missing evidence is reported as "not assessed" with a retrieval request, never as zero.
Dimensions: ${Object.keys(DIMENSIONS).join(', ')}.
Exit codes: 0 ok, 2 invalid input.`;

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2), { booleans: ['help', 'markdown'], strings: [] });
  } catch (error) {
    fail(`${error.message}\n\n${HELP}`);
  }
  const [cmd, dim, file] = args._;
  if (args.help || !cmd) return process.stdout.write(`${HELP}\n`);
  if (cmd === 'list') {
    for (const [id, d] of Object.entries(DIMENSIONS)) process.stdout.write(`${id.padEnd(14)} ${d.mode.padEnd(13)} ${d.profileOnly ? 'profile/inventory' : 'signal file'}  ${d.title}\n`);
    return;
  }
  if (cmd === 'describe') {
    if (args.markdown) return process.stdout.write(`${describeMarkdown()}\n`);
    return process.stdout.write(`${JSON.stringify(DIMENSIONS, null, 2)}\n`);
  }
  if (cmd === 'validate') {
    if (!dim || !file) fail(`validate needs a dimension and a file.\n\n${HELP}`);
    if (!FILE_DIMENSIONS.includes(dim)) fail(`"${dim}" has no signal file. Dimensions with files: ${FILE_DIMENSIONS.join(', ')}.`);
    let doc;
    try {
      doc = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
    } catch (error) {
      fail(`Cannot read ${file}: ${error.message}`);
    }
    const v = validateSignal(dim, doc);
    for (const w of v.warnings) process.stderr.write(`warning: ${w}\n`);
    if (!v.ok) {
      process.stderr.write(`${v.errors.map((e) => `error: ${e}`).join('\n')}\n`);
      process.exit(2);
    }
    return process.stdout.write(`Valid ${dim} signal (${doc.items.length} items).\n`);
  }
  fail(`Unknown command "${cmd}".\n\n${HELP}`);
}

main();
