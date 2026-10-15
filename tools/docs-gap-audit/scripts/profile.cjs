#!/usr/bin/env node
'use strict';

// Validate and inspect an area profile. Real profiles live in a private workspace, never in this repo.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs, writeFile, fail } = require('./lib/util.cjs');
const { validateProfile, scopeOf, profileHash, SCHEMA_VERSION } = require('./lib/profile.cjs');
const { isInside } = require('./lib/paths.cjs');

const REPO_ROOT = path.resolve(__dirname, '..');

const HELP = `profile: validate and inspect an area profile.

Usage:
  node scripts/profile.cjs validate <file> [--allow-root <dir>]...
  node scripts/profile.cjs show <file> [--allow-root <dir>]...      print the normalized profile and its hash
  node scripts/profile.cjs scope <file> <url>...                    say how each URL sits against the crawl, report, and evidence scopes
  node scripts/profile.cjs init --out <file> --id <slug> --origin <origin> [--name <text>]
                                                                    write a minimal valid profile (refuses paths inside this repo)

A profile scopes one audit to one documentation area: site origin, crawl, report, and evidence scope, local
sources, connector references (no credentials), aliases, expected user tasks, environments, release rules, and
authority rules. Schema and field notes: references/schemas.md. A synthetic example: examples/widgets.profile.json.
Exit codes: 0 ok, 1 error, 2 invalid profile or bad arguments.`;

function load(file, allowRoots) {
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail(`Cannot read ${file}: ${error.message}`);
  }
  return validateProfile(raw, { baseDir: path.dirname(path.resolve(file)), allowedRoots: allowRoots });
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2), { booleans: ['help'], strings: ['out', 'id', 'origin', 'name'], lists: ['allow-root'] });
  } catch (error) {
    fail(`${error.message}\n\n${HELP}`);
  }
  const [cmd, file, ...rest] = args._;
  if (args.help || !cmd) return process.stdout.write(`${HELP}\n`);

  if (cmd === 'init') {
    if (!args.out || !args.id || !args.origin) fail(`init needs --out, --id and --origin.\n\n${HELP}`);
    const out = path.resolve(args.out);
    if (isInside(REPO_ROOT, out)) fail('Refusing to write a profile inside the toolkit repo. Real profiles belong in a private workspace outside any shared repository.');
    const skeleton = {
      schemaVersion: SCHEMA_VERSION,
      area: { id: args.id, name: args.name || args.id, owner: '', audience: [] },
      site: { origin: args.origin },
      scope: { crawl: { include: ['/**'], exclude: [] } },
      sources: { local: [], connectors: [] },
      vocabulary: { aliases: {}, identifiers: [] },
      tasks: [],
      environments: { supported: [], platforms: [], notes: '' },
      release: { defaultStatus: 'shipped', publicEvidenceRequired: true },
      authority: { order: ['code', 'tests', 'release-notes', 'docs'], freshness: { maxAgeDays: 365 } },
      inputs: {},
    };
    const check = validateProfile(skeleton, { baseDir: path.dirname(out) });
    if (!check.ok) fail(`The skeleton is not valid for those values:\n${check.errors.map((e) => `  ${e.path}: ${e.message}`).join('\n')}`);
    writeFile(out, `${JSON.stringify(skeleton, null, 2)}\n`);
    process.stdout.write(`Wrote ${out}. Narrow scope.crawl.include before auditing, then add tasks and sources.\n`);
    return;
  }

  if (!file) fail(`Give a profile file.\n\n${HELP}`);
  const result = load(file, args.allowRoot || []);
  if (cmd === 'validate') {
    for (const w of result.warnings) process.stderr.write(`warning ${w.path}: ${w.message}\n`);
    if (!result.ok) {
      process.stderr.write(`${result.errors.map((e) => `error ${e.path}: ${e.message}`).join('\n')}\n`);
      process.exit(2);
    }
    process.stdout.write(`Valid profile for area "${result.profile.area.id}" (hash ${profileHash(result.profile).slice(0, 12)}).\n`);
    return;
  }
  if (!result.ok) {
    process.stderr.write(`${result.errors.map((e) => `error ${e.path}: ${e.message}`).join('\n')}\n`);
    process.exit(2);
  }
  if (cmd === 'show') return process.stdout.write(`${JSON.stringify({ hash: profileHash(result.profile), profile: result.profile }, null, 2)}\n`);
  if (cmd === 'scope') {
    if (!rest.length) fail('Give at least one URL.');
    for (const url of rest) {
      const s = scopeOf(result.profile, url);
      process.stdout.write(`${url}  crawl=${s.crawl} report=${s.report} evidence=${s.evidence}${s.related ? ` related=${s.related}` : ''}${s.reason ? ` (${s.reason})` : ''}\n`);
    }
    return;
  }
  fail(`Unknown command "${cmd}".\n\n${HELP}`);
}

main();
