'use strict';

// Documentation extractors: headings and bullets in READMEs, changelogs, release posts, and
// planning docs; changeset files; and planning stubs (a title with almost no body).
// Items under "Unreleased" or "Upcoming" are planned. Text mentioning a flag, alpha, beta,
// preview, or opt-in is limited. Neither is proof of public availability.

const path = require('node:path');
const { stripMd, htmlToLines, phrase, excerptOf } = require('./common.cjs');

const DOC_EXT = new Set(['.md', '.mdx', '.txt', '.html']);

// Which single doc extractor handles this file, so no file is read twice by competing rules.
function docRoute(ctx) {
  if (!DOC_EXT.has(ctx.ext)) return 'skip';
  if (/^readme\.txt$/i.test(ctx.base)) return 'readme-txt';
  if (/(^|\/)\.changeset\//.test(ctx.file.split(path.sep).join('/'))) return ctx.base === 'README.md' ? 'skip' : 'changeset';
  if (ctx.sourceKind === 'repo') return 'repo';
  if (ctx.sourceKind === 'planning' && stubOf(ctx)) return 'stub';
  return 'normal';
}

// Lines as the extractors see them: HTML is reduced to headings and list items.
function docLines(ctx) {
  if (!ctx.memo.docLines) ctx.memo.docLines = ctx.ext === '.html' ? htmlToLines(ctx.text) : ctx.lines;
  return ctx.memo.docLines;
}

function stubOf(ctx) {
  if (ctx.memo.stub !== undefined) return ctx.memo.stub;
  const raw = docLines(ctx);
  const headings = raw.map((l) => /^#{1,4}\s+(.+?)\s*#*$/.exec(l)).filter(Boolean);
  const body = raw.filter((l) => !/^#{1,4}\s/.test(l)).join('').replace(/[\s\\[\]*_`>|-]+/g, '');
  ctx.memo.stub = headings.length && body.length < ctx.vocab.stubBodyLimit ? { name: stripMd(headings[0][1]).trim(), bodyLength: body.length } : null;
  return ctx.memo.stub;
}

// Walk lines once, tracking release status from version and "Unreleased" headings.
function scan(ctx) {
  if (ctx.memo.scan) return ctx.memo.scan;
  const out = { headings: [], items: [] };
  let released = ctx.defaultStatus;
  docLines(ctx).forEach((text, i) => {
    const h = /^(#{1,4})\s+(.+?)\s*#*$/.exec(text);
    if (h) {
      const title = stripMd(h[2]).trim();
      if (/^\[?v?\d+\.\d+/.test(title) || ctx.vocab.plannedHeading.test(title)) {
        released = ctx.vocab.plannedHeading.test(title) ? 'planned' : ctx.defaultStatus;
      } else if (h[1].length >= 2 && title.length > 3 && !ctx.vocab.genericHeadings.test(title) && !ctx.vocab.sectionLabels.test(title)) {
        out.headings.push({ title, line: i + 1, status: released, text });
      }
      return;
    }
    const b = /^\s*[-*+]\s+(.{12,})$/.exec(text);
    const item = b && b[1].replace(/^[0-9a-f]{7,40}:\s*/, '');
    if (!item || ctx.vocab.noiseItem.test(stripMd(item)) || /^@[\w-]+\/[\w.-]+@[\w.-]+$/.test(item.trim())) return;
    out.items.push({ item, line: i + 1, status: ctx.vocab.limitedHint.test(item) && released === 'shipped' ? 'limited' : released, text });
  });
  ctx.memo.scan = out;
  return out;
}

const docKind = (ctx) => ctx.docKind;

const readmeHeading = {
  id: 'doc-readme-heading',
  version: 1,
  description: 'Level 2 and 3 headings in a repository README (all Markdown files with --repo-docs). Generic headings and internal notes are skipped.',
  sourceKinds: ['repo'],
  appliesTo: (ctx) => (ctx.ext === '.md' || ctx.ext === '.mdx') && docRoute(ctx) === 'repo' && !/^changelog|^history|^releases?\b/i.test(ctx.base) && (ctx.options.repoDocs || /^readme/i.test(ctx.base)) && !ctx.vocab.internalDoc.test(ctx.rel),
  extract(ctx) {
    const out = [];
    ctx.lines.forEach((text, i) => {
      const h = /^#{2,3}\s+(.+?)\s*#*$/.exec(text);
      if (!h) return;
      const name = stripMd(h[1]).trim();
      if (name.length > 3 && !ctx.vocab.genericHeadings.test(name)) {
        out.push({ name, kind: 'repo-doc-heading', status: 'shipped', line: i + 1, excerpt: excerptOf(text), confidence: 'low', posture: 'observed' });
      }
    });
    return out;
  },
};

const docHeading = {
  id: 'doc-heading',
  version: 1,
  description: 'Headings in changelogs, release posts, and planning docs, with status from version and Unreleased headings.',
  sourceKinds: ['changelog', 'releases', 'planning'],
  appliesTo: (ctx) => docRoute(ctx) === 'normal',
  extract: (ctx) => scan(ctx).headings.map((h) => ({ name: h.title, kind: `${docKind(ctx)}-heading`, status: h.status, line: h.line, excerpt: excerptOf(h.text), confidence: 'low', posture: 'reported' })),
};

const docItem = {
  id: 'doc-item',
  version: 1,
  description: 'Bullets in changelogs, release posts, and planning docs. Fix, chore, and dependency entries are skipped.',
  sourceKinds: ['changelog', 'releases', 'planning'],
  appliesTo: (ctx) => docRoute(ctx) === 'normal',
  extract(ctx) {
    return scan(ctx).items.map((it) => {
      const p = phrase(it.item, ctx.vocab);
      return { name: p.name, kind: `${docKind(ctx)}-item`, status: it.status, line: it.line, excerpt: excerptOf(it.text), terms: p.terms, confidence: 'low', posture: 'reported' };
    });
  },
};

const changeset = {
  id: 'doc-changeset',
  version: 1,
  description: 'One entry per changeset file, taken from the first line after the front matter.',
  sourceKinds: ['changelog', 'releases'],
  appliesTo: (ctx) => docRoute(ctx) === 'changeset',
  extract(ctx) {
    const body = ctx.text.replace(/^---[\s\S]*?---\s*/, '').trim();
    if (body.length < 12 || ctx.vocab.noiseItem.test(body)) return [];
    const first = body.split(/\n/)[0];
    const p = phrase(first, ctx.vocab);
    return [{ name: p.name, kind: 'changeset-item', status: ctx.vocab.limitedHint.test(first) ? 'limited' : 'shipped', line: 1, excerpt: excerptOf(first), terms: p.terms, confidence: 'low', posture: 'reported' }];
  },
};

const planningStub = {
  id: 'doc-planning-stub',
  version: 1,
  description: 'A planning doc with a heading and almost no body: someone planned a page and nobody wrote it. Needs a heading to be detected.',
  sourceKinds: ['planning'],
  appliesTo: (ctx) => docRoute(ctx) === 'stub',
  extract(ctx) {
    const stub = stubOf(ctx);
    return [{ name: stub.name, kind: 'planning-stub', status: 'planned', line: 1, excerpt: `planning doc ${ctx.base} has a title and almost no body (${stub.bodyLength} characters)`, confidence: 'high', posture: 'observed' }];
  },
};

module.exports = [readmeHeading, docHeading, docItem, changeset, planningStub];
module.exports.docRoute = docRoute;
