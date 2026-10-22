#!/usr/bin/env node
'use strict';

// Receipts for staged connector exports. Claude retrieves a source through an authorized connector
// and saves it in the private workspace; this script records what happened. An interrupted
// retrieval leaves an "in-progress" or "failed" receipt, never a successful-looking empty source.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs, fail } = require('./lib/util.cjs');
const { openWorkspace, areaDir, replaceAtomically, readJson, sha256 } = require('./lib/runstate.cjs');
const { realInside } = require('./lib/paths.cjs');
const { findSecrets } = require('./lib/secrets.cjs');

const HELP = `stage: record receipts for sources Claude staged from authorized connectors.

Usage:
  node scripts/stage.cjs begin    --workspace <dir> --area <id> --id <source-id> --file <relative path> [--connector <name>] [--ref <query>]
  node scripts/stage.cjs complete --workspace <dir> --area <id> --id <source-id> --file <relative path> [--items <n>] [--notes <text>]
  node scripts/stage.cjs fail     --workspace <dir> --area <id> --id <source-id> --file <relative path> --reason <text>
  node scripts/stage.cjs status   --workspace <dir> --area <id> --file <relative path>

--file is relative to <workspace>/areas/<id>/ and normally under staging/. The receipt is written next to it as
<file>.receipt.json. "complete" records the file's SHA-256 and refuses an empty file. Receipts never hold credentials;
the connector reference is a query or folder name, not a token. This script makes no network requests.
Exit codes: 0 ok, 2 bad arguments or a refused receipt.`;

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2), { booleans: ['help'], strings: ['workspace', 'area', 'id', 'file', 'connector', 'ref', 'items', 'notes', 'reason'] });
  } catch (error) {
    fail(`${error.message}\n\n${HELP}`);
  }
  const [cmd] = args._;
  if (args.help || !cmd) return process.stdout.write(`${HELP}\n`);
  if (!args.workspace || !args.area || !args.file) fail(`Give --workspace, --area and --file.\n\n${HELP}`);
  let ws;
  try {
    ws = openWorkspace(args.workspace);
  } catch (error) {
    fail(error.message);
  }
  if (path.isAbsolute(args.file) || args.file.split(/[\\/]/).includes('..')) fail('--file must be a relative path inside the area folder.');
  const file = path.join(areaDir(ws, args.area), args.file);
  if (realInside(areaDir(ws, args.area), file) === false) fail('The staged file resolves outside the workspace (a symlink). Refusing to read or hash it.');
  const receiptFile = `${file}.receipt.json`;
  const now = new Date().toISOString();
  const base = { schemaVersion: 1, sourceId: args.id || null, connector: args.connector || null, ref: args.ref || null, at: now };
  const hits = findSecrets({ ref: args.ref, notes: args.notes, reason: args.reason });
  if (hits.length) fail(`Refusing to write a receipt that contains ${hits[0].reason} (${hits[0].path}). Reference the source by query or folder name, not by credential.`);

  if (cmd === 'begin') {
    if (!args.id) fail('begin needs --id.');
    replaceAtomically(receiptFile, { ...base, status: 'in-progress' });
    return process.stdout.write(`Receipt opened for ${args.id}. If retrieval stops here, the run will treat this source as incomplete.\n`);
  }
  if (cmd === 'complete') {
    if (!args.id) fail('complete needs --id.');
    if (!fs.existsSync(file)) fail(`Staged file not found: ${file}`);
    const bytes = fs.readFileSync(file);
    if (bytes.length === 0) fail('The staged file is empty. Record a failure instead of a successful empty source.');
    const prior = readJson(receiptFile, {});
    replaceAtomically(receiptFile, { ...prior, ...base, connector: args.connector || prior.connector || null, ref: args.ref || prior.ref || null, status: 'complete', sha256: sha256(bytes), bytes: bytes.length, items: args.items === undefined ? null : Number(args.items), notes: args.notes || null });
    return process.stdout.write(`Receipt complete for ${args.id} (${bytes.length} bytes).\n`);
  }
  if (cmd === 'fail') {
    if (!args.id || !args.reason) fail('fail needs --id and --reason.');
    replaceAtomically(receiptFile, { ...base, status: 'failed', reason: args.reason });
    return process.stdout.write(`Receipt recorded: ${args.id} failed (${args.reason}).\n`);
  }
  if (cmd === 'status') {
    const r = readJson(receiptFile);
    return process.stdout.write(r ? `${JSON.stringify(r, null, 2)}\n` : 'No receipt: this source was never staged.\n');
  }
  fail(`Unknown command "${cmd}".\n\n${HELP}`);
}

try {
  main();
} catch (error) {
  fail(error.message);
}
