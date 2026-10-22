'use strict';

const fs = require('node:fs');
const path = require('node:path');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function camel(key) {
  return key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

// Small option parser. `booleans` take no value, `strings` take one, `lists` repeat.
function parseArgs(argv, { booleans = [], strings = [], lists = [] } = {}) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) {
      out._.push(arg);
      continue;
    }
    const eq = arg.indexOf('=');
    const key = eq > 0 ? arg.slice(2, eq) : arg.slice(2);
    if (booleans.includes(key)) {
      out[camel(key)] = true;
    } else if (strings.includes(key) || lists.includes(key)) {
      const value = eq > 0 ? arg.slice(eq + 1) : argv[(i += 1)];
      if (value === undefined) throw new Error(`--${key} needs a value`);
      if (lists.includes(key)) (out[camel(key)] ||= []).push(value);
      else out[camel(key)] = value;
    } else {
      throw new Error(`unknown option --${key}`);
    }
  }
  return out;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeFile(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}

function escapeCell(text) {
  return String(text ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\s+/g, ' ')
    .trim();
}

function mdTable(headers, rows) {
  const lines = [`| ${headers.join(' | ')} |`, `|${headers.map(() => '---').join('|')}|`];
  for (const row of rows) lines.push(`| ${row.map(escapeCell).join(' | ')} |`);
  return lines.join('\n');
}

function slugFor(urlPath) {
  const cleaned = urlPath.replace(/^\/+|\/+$/g, '');
  return cleaned ? cleaned.replace(/[/?#&=%]+/g, '__') : 'home';
}

function fail(message, code = 2) {
  process.stderr.write(`${message}\n`);
  process.exit(code);
}

module.exports = { sleep, parseArgs, readJson, writeFile, escapeCell, mdTable, slugFor, fail };
