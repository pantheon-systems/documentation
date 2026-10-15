'use strict';

// Dependency-free HTML reader. It is not a full HTML5 parser: it tokenizes tags, text
// and comments, skips page chrome (header, nav, aside, footer, scripts), and records the
// evidence an audit needs. Malformed markup degrades to less evidence, never to a crash.

const VOID = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr',
]);
const SKIP = new Set(['header', 'nav', 'aside', 'footer', 'script', 'style', 'noscript', 'svg', 'template']);
const RAW_TEXT = new Set(['script', 'style']);
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function decode(text) {
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === '#') {
      const hex = entity[1].toLowerCase() === 'x';
      const code = parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
      return Number.isInteger(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : match;
    }
    return ENTITIES[entity.toLowerCase()] ?? match;
  });
}

function parseAttrs(source) {
  const attrs = {};
  const re = /([^\s=>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let match;
  while ((match = re.exec(source))) {
    attrs[match[1].toLowerCase()] = decode(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return attrs;
}

const squash = (text) => text.replace(/\s+/g, ' ').trim();

const LITERAL_STEP = /^\d{1,2}[.)]\s+\S/;
const STEP_HEADING = /^step\s*\d+\b/i;
// An ordered list item, a paragraph that starts with its own number, or a heading that reads "Step 3".
const isStepBlock = (b) => (b.type === 'item' && b.ordered) || (b.type === 'heading' && STEP_HEADING.test(b.text || ''));

function parseHtml(html) {
  const page = {
    title: '',
    meta: {},
    canonical: null,
    headings: [],
    words: 0,
    preBlocks: 0,
    inlineCode: 0,
    tables: 0,
    lists: { ol: 0, ul: 0 },
    images: [],
    links: [],
    navLinks: [],
    textLines: [],
    // Document-order structure for classification and coverage: headings, list items (ordered or not),
    // paragraphs, tables (with header cells), and code text. Text is capped per block and per page.
    blocks: [],
    codeBlocks: [],
  };
  const BLOCK_CAP = 2000;
  const listStack = [];
  // One entry per open <li>: which list it is in, whether it is ordered, and whether an item block has been emitted for it.
  // Markdown-style docs write <li><p>text</p></li>; the paragraph is the item's text, not a separate paragraph.
  const liStack = [];
  let cur = null;
  let curTable = null;
  const flush = () => {
    if (cur && cur.text.trim() && page.blocks.length < BLOCK_CAP) {
      const text = squash(cur.text);
      if (cur.type === 'code') {
        page.blocks.push({ type: 'code', text: cur.text.trim().slice(0, 2000) });
        page.codeBlocks.push(cur.text.trim().slice(0, 2000));
      } else {
        if (cur.type === 'item' && liStack.length) liStack[liStack.length - 1].emitted = true;
        // Many docs write steps as plain paragraphs that start with their own number ("1. Open the file"). Read those as ordered steps.
        const literal = cur.type === 'p' && LITERAL_STEP.test(text);
        if (literal) page.blocks.push({ type: 'item', ordered: true, literal: true, text: text.slice(0, 400) });
        else page.blocks.push({ type: cur.type, ...(cur.type === 'item' ? { ordered: cur.ordered } : {}), text: text.slice(0, 400) });
      }
    }
    cur = null;
  };
  const lower = html.toLowerCase();
  const tokens = /<!--[\s\S]*?-->|<![^>]*>|<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^'">])*)>|([^<]+|<)/g;
  const stack = [];
  let skip = 0;
  let inPre = 0;
  let inTitle = false;
  let heading = null;
  let cellOpen = false;
  let cellKind = '';
  let anchor = null;
  let match;

  const onText = (raw) => {
    const text = decode(raw);
    if (inTitle) page.title += text;
    if (anchor) anchor.text += text;
    if (skip) return;
    if (heading) heading.text += text;
    else if (curTable && cellOpen && cellKind === 'th') curTable.header.push(squash(text));
    else if (!curTable && !inTitle) {
      if (!cur) cur = inPre ? { type: 'code', text: '' } : { type: 'p', text: '' };
      cur.text += text;
    }
    if (!inPre) {
      const trimmed = text.trim();
      if (trimmed) {
        page.words += trimmed.split(/\s+/).length;
        page.textLines.push(trimmed);
      }
    }
  };

  while ((match = tokens.exec(html))) {
    if (match[2] === undefined) {
      if (match[4] !== undefined) onText(match[4]);
      continue;
    }
    const closing = match[1] === '/';
    const name = match[2].toLowerCase();

    if (closing) {
      if (name === 'title') inTitle = false;
      const index = stack.lastIndexOf(name);
      if (index >= 0) {
        while (stack.length > index) {
          const popped = stack.pop();
          if (SKIP.has(popped)) skip = Math.max(0, skip - 1);
          if (popped === 'pre') inPre = Math.max(0, inPre - 1);
        }
      }
      if (name === 'a') anchor = null;
      if (!skip) {
        if (['li', 'p', 'pre', 'ul', 'ol', 'div', 'section', 'main', 'article', 'blockquote'].includes(name)) flush();
        if (name === 'li') liStack.pop();
        if (name === 'ul' || name === 'ol') {
          while (liStack.length && liStack[liStack.length - 1].depth >= listStack.length) liStack.pop(); // </li> may be omitted
          listStack.pop();
        }
        if (name === 'td' || name === 'th') cellOpen = false;
        if (name === 'table') curTable = null;
      }
      if (/^h[1-4]$/.test(name) && heading && !skip) {
        heading.text = squash(heading.text);
        page.headings.push(heading);
        if (page.blocks.length < BLOCK_CAP) page.blocks.push({ type: 'heading', level: heading.level, text: heading.text });
        page.textLines.push(`\n${'#'.repeat(heading.level)} ${heading.text}\n`);
        heading = null;
      }
      continue;
    }

    const attrs = parseAttrs(match[3]);
    const selfClosing = /\/\s*$/.test(match[3]);
    if (name === 'meta') {
      const key = (attrs.name || attrs.property || '').toLowerCase();
      if (key) page.meta[key] = attrs.content || '';
    }
    if (name === 'link' && (attrs.rel || '').toLowerCase().split(/\s+/).includes('canonical')) {
      page.canonical = attrs.href || null;
    }
    if (name === 'title') inTitle = true;
    if (!VOID.has(name) && !selfClosing) {
      stack.push(name);
      if (SKIP.has(name)) skip += 1;
    }
    if (name === 'a' && attrs.href !== undefined) {
      anchor = { href: attrs.href, text: '' };
      (skip ? page.navLinks : page.links).push(anchor);
    }
    if (!skip) {
      if (['li', 'p', 'pre', 'ul', 'ol', 'div', 'section', 'main', 'article', 'blockquote', 'table', 'br'].includes(name) || /^h[1-4]$/.test(name)) flush();
      if (name === 'ol' || name === 'ul') listStack.push(name);
      if (name === 'li') {
        if (liStack.length && liStack[liStack.length - 1].depth === listStack.length) liStack.pop(); // a sibling <li> opened without closing the last one
        const ordered = listStack[listStack.length - 1] === 'ol';
        liStack.push({ depth: listStack.length, ordered, emitted: false });
        cur = { type: 'item', ordered, text: '' };
      } else if (name === 'p') {
        const li = liStack[liStack.length - 1];
        cur = li && !li.emitted ? { type: 'item', ordered: li.ordered, text: '' } : { type: 'p', text: '' };
      }
      else if (name === 'pre') cur = { type: 'code', text: '' };
      if (name === 'table') {
        curTable = { type: 'table', header: [], rows: 0 };
        page.blocks.push(curTable);
      }
      if (name === 'tr' && curTable) curTable.rows += 1;
      if (name === 'td' || name === 'th') {
        cellOpen = true;
        cellKind = name;
      }
      if (/^h[1-4]$/.test(name)) heading = { level: Number(name[1]), text: '' };
      if (name === 'pre') {
        page.preBlocks += 1;
        inPre += 1;
      }
      if (name === 'code' && !inPre) page.inlineCode += 1;
      if (name === 'table') page.tables += 1;
      if (name === 'ol') page.lists.ol += 1;
      if (name === 'ul') page.lists.ul += 1;
      if (name === 'img') page.images.push({ alt: 'alt' in attrs ? attrs.alt : null, src: attrs.src || '' });
    }
    if (RAW_TEXT.has(name) && !selfClosing) {
      const end = lower.indexOf(`</${name}`, tokens.lastIndex);
      tokens.lastIndex = end >= 0 ? end : html.length;
    }
  }

  flush();
  page.title = squash(page.title);
  for (const link of [...page.links, ...page.navLinks]) link.text = squash(link.text);
  return page;
}

module.exports = { parseHtml, decode, isStepBlock };
