'use strict';

// Path scope helpers: glob matching for URL paths and file paths, and a directory walk
// that never follows a symlink outside its permitted roots and records every skip.

const fs = require('node:fs');
const path = require('node:path');

const SUPPORTED_TEXT = new Set(['.md', '.mdx', '.txt', '.html', '.htm', '.json', '.yml', '.yaml', '.rst', '.adoc', '.csv']);
const MAX_FILE_BYTES = 2_000_000;

// "/a/**" matches "/a" and everything under it; "*" never crosses "/"; "**" does.
function globToRegExp(pattern) {
  let out = '';
  for (let i = 0; i < pattern.length; i += 1) {
    const c = pattern[i];
    if (c === '*' && pattern[i + 1] === '*') {
      const atEnd = i + 2 >= pattern.length;
      if (atEnd && out.endsWith('\\/')) {
        out = `${out.slice(0, -2)}(?:\\/.*)?`;
      } else if (pattern[i + 2] === '/') {
        out += '(?:.*\\/)?';
        i += 2;
        continue;
      } else {
        out += '.*';
      }
      i += 1;
    } else if (c === '*') {
      out += '[^/]*';
    } else if (c === '?') {
      out += '[^/]';
    } else {
      out += c.replace(/[.+^${}()|[\]\\/]/g, '\\$&');
    }
  }
  return new RegExp(`^${out}$`);
}

const normalizeUrlPath = (p) => {
  const bare = String(p).split(/[?#]/)[0].replace(/\/+$/, '');
  return bare === '' ? '/' : bare;
};

function matchesAny(urlPath, patterns) {
  const target = normalizeUrlPath(urlPath);
  return (patterns || []).some((p) => globToRegExp(p).test(target));
}

function isInside(root, candidate) {
  const rel = path.relative(root, candidate);
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

function realOrNull(p) {
  try {
    return fs.realpathSync(p);
  } catch {
    return null;
  }
}

// Resolve p under base, and refuse anything whose real path leaves the permitted roots.
function resolveWithin(base, p, permittedRoots) {
  const abs = path.resolve(base, p);
  const real = realOrNull(abs);
  if (!real) return { ok: false, reason: 'not found', abs };
  const roots = (permittedRoots && permittedRoots.length ? permittedRoots : [base]).map((r) => realOrNull(r) || path.resolve(r));
  if (!roots.some((r) => isInside(r, real))) return { ok: false, reason: 'outside permitted roots', abs, real };
  return { ok: true, abs, real };
}

// Walk root. Returns { files, skipped } where skipped lists { path, reason } for every
// symlink that leaves the permitted roots, unsupported format, oversize file, or unreadable entry.
function walkSafe(root, { permittedRoots, skipDirs = new Set(), extensions = SUPPORTED_TEXT, maxBytes = MAX_FILE_BYTES } = {}) {
  const files = [];
  const skipped = [];
  const rootReal = realOrNull(root);
  if (!rootReal) return { files, skipped: [{ path: root, reason: 'not found' }] };
  const roots = (permittedRoots && permittedRoots.length ? permittedRoots : [root]).map((r) => realOrNull(r) || path.resolve(r));
  const seen = new Set();
  (function visit(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (error) {
      skipped.push({ path: dir, reason: `unreadable: ${error.code || error.message}` });
      return;
    }
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(dir, entry.name);
      if (entry.isSymbolicLink()) {
        const real = realOrNull(full);
        if (!real) {
          skipped.push({ path: full, reason: 'broken symlink' });
          continue;
        }
        if (!roots.some((r) => isInside(r, real))) {
          skipped.push({ path: full, reason: 'symlink leaves permitted roots' });
          continue;
        }
        if (seen.has(real)) continue;
      }
      let stat;
      try {
        stat = fs.statSync(full);
      } catch {
        skipped.push({ path: full, reason: 'unreadable' });
        continue;
      }
      const real = realOrNull(full) || full;
      if (stat.isDirectory()) {
        if (skipDirs.has(entry.name)) {
          skipped.push({ path: full, reason: 'excluded directory (vocabulary skipDirs)' });
          continue;
        }
        if (seen.has(real)) continue;
        seen.add(real);
        visit(full);
      } else if (stat.isFile()) {
        if (seen.has(real)) continue;
        seen.add(real);
        const ext = path.extname(entry.name).toLowerCase();
        if (!extensions.has(ext)) {
          skipped.push({ path: full, reason: `unsupported format ${ext || '(none)'}` });
        } else if (stat.size > maxBytes) {
          skipped.push({ path: full, reason: `larger than ${maxBytes} bytes` });
        } else {
          files.push(full);
        }
      }
    }
  })(rootReal);
  return { files, skipped };
}

// True when file exists and its real path stays inside root. A missing file returns null (nothing to follow).
function realInside(root, file) {
  const real = realOrNull(file);
  if (!real) return null;
  const rootReal = realOrNull(root) || path.resolve(root);
  return isInside(rootReal, real);
}

module.exports = { realInside, globToRegExp, matchesAny, normalizeUrlPath, isInside, resolveWithin, walkSafe, SUPPORTED_TEXT };
