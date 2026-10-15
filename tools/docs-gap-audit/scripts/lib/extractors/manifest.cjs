'use strict';

// Manifest extractors: structured files that declare a public surface.

const { excerptOf } = require('./common.cjs');

const lineOf = (lines, needle) => {
  const i = lines.findIndex((l) => l.includes(needle));
  return i < 0 ? 1 : i + 1;
};

const packageBin = {
  id: 'repo-package-bin',
  version: 1,
  description: 'Command-line programs a package declares in package.json "bin".',
  sourceKinds: ['repo'],
  appliesTo: (ctx) => ctx.base === 'package.json',
  extract(ctx) {
    let pkg;
    try {
      pkg = JSON.parse(ctx.text);
    } catch {
      throw new Error('package.json is not valid JSON; nothing was extracted from it'); // recorded as an extractor failure, not a silent empty result
    }
    if (!pkg || typeof pkg !== 'object') return [];
    const bins = typeof pkg.bin === 'string' || Array.isArray(pkg.bin) ? (pkg.name ? { [pkg.name]: pkg.bin } : {}) : pkg.bin && typeof pkg.bin === 'object' ? pkg.bin : {};
    const line = lineOf(ctx.lines, '"bin"');
    return Object.keys(bins).map((name) => ({
      name, kind: 'cli-binary', status: 'shipped', line, excerpt: excerptOf(ctx.lines[line - 1] || ''), confidence: 'high', posture: 'observed',
    }));
  },
};

const blockJson = {
  id: 'repo-block-json',
  version: 1,
  description: 'Editor blocks declared in block.json.',
  sourceKinds: ['repo'],
  appliesTo: (ctx) => ctx.base === 'block.json',
  extract(ctx) {
    let block;
    try {
      block = JSON.parse(ctx.text);
    } catch {
      throw new Error('block.json is not valid JSON; nothing was extracted from it');
    }
    if (!block || typeof block.name !== 'string' || !block.name) return [];
    const line = lineOf(ctx.lines, '"name"');
    return [{ name: block.name, kind: 'block', status: 'shipped', line, excerpt: excerptOf(ctx.lines[line - 1] || ''), confidence: 'high', posture: 'observed' }];
  },
};

module.exports = [packageBin, blockJson];
