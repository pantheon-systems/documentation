'use strict';

// Hashing and source identity. A source's identity is its content hash first; Git data is
// extra context. A dirty or uncommitted tree is recorded as such, never reported as a clean SHA.

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const sha256 = (data) => crypto.createHash('sha256').update(data).digest('hex');
const sha256File = (file) => sha256(fs.readFileSync(file));
const shortId = (data, n = 12) => sha256(data).slice(0, n);

// JSON with sorted keys, so equal objects hash equal.
function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .filter((k) => value[k] !== undefined)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

const hashObject = (obj) => sha256(stableStringify(obj));

// Hash of a set of files: each relative path plus content hash, sorted.
function treeHash(root, files) {
  const lines = files
    .map((f) => `${path.relative(root, f).split(path.sep).join('/')}\t${sha256File(f)}`)
    .sort();
  return { hash: sha256(lines.join('\n')), fileCount: files.length };
}

function git(dir, args) {
  // Config inside an audited tree is data: switch off the settings that make git run a program from it.
  const safe = ['-c', 'core.fsmonitor=false', '-c', 'core.hooksPath=/dev/null', '-c', 'core.pager=cat', '-c', 'diff.external='];
  return execFileSync('git', ['-C', dir, ...safe, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], env: { ...process.env, GIT_OPTIONAL_LOCKS: '0', GIT_TERMINAL_PROMPT: '0' } }).trim();
}

function gitIdentity(dir) {
  try {
    git(dir, ['rev-parse', '--is-inside-work-tree']);
  } catch {
    return { present: false };
  }
  let head = null;
  try {
    head = git(dir, ['rev-parse', 'HEAD']);
  } catch {
    head = null; // a repository with no commits yet
  }
  let status = '';
  try {
    status = git(dir, ['status', '--porcelain']);
  } catch {
    status = '';
  }
  return { present: true, head, dirty: status.length > 0, dirtyFiles: status ? status.split('\n').length : 0, statusHash: status ? sha256(status) : null };
}

module.exports = { sha256, sha256File, shortId, stableStringify, hashObject, treeHash, gitIdentity };
