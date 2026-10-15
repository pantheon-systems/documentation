'use strict';

// Run the extractor registry over one source (a directory or a single file).
// Reads local files only, never follows a symlink out of the permitted roots, and records
// everything it could not read as a limitation instead of dropping it silently.

const fs = require('node:fs');
const path = require('node:path');
const { walkSafe } = require('./paths.cjs');
const { EXTRACTORS } = require('./extractors/index.cjs');
const { loadVocab } = require('./vocab.cjs');

const CODE_EXT = ['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx', '.php', '.py', '.rb', '.go', '.rs'];
const READ_EXT = new Set([...CODE_EXT, '.json', '.md', '.mdx', '.txt', '.html', '.yml', '.yaml']);
const MAX_BYTES = 1_000_000;
const DEFAULT_STATUS = { repo: 'shipped', changelog: 'shipped', releases: 'shipped', planning: 'planned' };
const DOC_KIND = { repo: null, changelog: 'changelog', releases: 'release', planning: 'planning' };

function summarizeSkips(skipped, root) {
  const groups = new Map();
  for (const s of skipped) {
    const g = groups.get(s.reason) || { reason: s.reason, count: 0, examples: [] };
    g.count += 1;
    if (g.examples.length < 3) g.examples.push(path.relative(root, s.path) || s.path);
    groups.set(s.reason, g);
  }
  return [...groups.values()].sort((a, b) => b.count - a.count);
}

function extractSource({ id, kind, root, options = {}, vocab = loadVocab(), permittedRoots, extractors = EXTRACTORS }) {
  if (!DEFAULT_STATUS[kind]) throw new Error(`unknown source kind "${kind}"`);
  const limitations = [];
  let files;
  let isFile = false;
  try {
    isFile = fs.statSync(root).isFile();
  } catch {
    return { candidates: [], limitations: [{ reason: 'source not found', count: 1, examples: [root] }], stats: { files: 0, byExtractor: {} }, failures: [] };
  }
  if (isFile) {
    files = [root];
  } else {
    const walked = walkSafe(root, { permittedRoots, skipDirs: vocab.skipDirs, extensions: READ_EXT, maxBytes: MAX_BYTES });
    files = walked.files;
    limitations.push(...summarizeSkips(walked.skipped, root));
  }
  const realRoot = fs.realpathSync(root);
  const relBase = kind === 'repo' ? realRoot : path.dirname(realRoot);
  const exclude = (options.exclude || []).map((e) => (e instanceof RegExp ? e : new RegExp(e)));
  const candidates = [];
  const failures = [];
  const byExtractor = {};
  let scanned = 0;
  for (const file of files) {
    const rel = path.relative(relBase, file) || path.basename(file);
    if (kind === 'repo' && exclude.some((re) => re.test(rel))) continue;
    let text;
    try {
      text = fs.readFileSync(file, 'utf8');
    } catch (error) {
      limitations.push({ reason: `unreadable: ${error.code || error.message}`, count: 1, examples: [rel] });
      continue;
    }
    scanned += 1;
    const ctx = {
      file, rel, base: path.basename(file), ext: path.extname(file).toLowerCase(), text, lines: text.split(/\r?\n/),
      sourceKind: kind, docKind: DOC_KIND[kind], defaultStatus: options.defaultStatus || DEFAULT_STATUS[kind], options, vocab, memo: {},
    };
    for (const ex of extractors) {
      if (!ex.sourceKinds.includes(kind)) continue;
      let applies = false;
      try {
        applies = ex.appliesTo(ctx);
      } catch (error) {
        failures.push({ extractor: ex.id, file: rel, error: String(error.message || error) });
        continue;
      }
      if (!applies) continue;
      let raws;
      try {
        raws = ex.extract(ctx);
      } catch (error) {
        failures.push({ extractor: ex.id, file: rel, error: String(error.message || error) });
        continue;
      }
      for (const r of raws) {
        byExtractor[ex.id] = (byExtractor[ex.id] || 0) + 1;
        candidates.push({
          name: r.name,
          kind: r.kind,
          status: r.status,
          source: `${rel}:${r.line}`,
          evidence: r.excerpt,
          terms: r.terms || null,
          provenance: {
            sourceId: id || null, file: rel, line: r.line, excerpt: r.excerpt,
            extractor: { id: ex.id, version: ex.version }, confidence: r.confidence, posture: r.posture, status: r.status,
          },
        });
      }
    }
  }
  return { candidates, limitations, stats: { files: scanned, byExtractor }, failures };
}

module.exports = { extractSource, summarizeSkips, DEFAULT_STATUS };
