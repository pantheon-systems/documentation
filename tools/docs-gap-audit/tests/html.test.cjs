'use strict';

// List items in the HTML parser. Docs sites that render Markdown write <li><p>text</p></li>; those items must not vanish.

const test = require('node:test');
const assert = require('node:assert/strict');
const { parseHtml } = require('../scripts/lib/html.cjs');

const items = (body) => parseHtml(`<html><head><title>t</title></head><body><main>${body}</main></body></html>`).blocks.filter((b) => b.type === 'item').map((b) => [b.ordered, b.text]);
const paras = (body) => parseHtml(`<html><head><title>t</title></head><body><main>${body}</main></body></html>`).blocks.filter((b) => b.type === 'p').map((b) => b.text);

test('an ordered item whose text is wrapped in a paragraph is still an ordered item', () => {
  assert.deepEqual(items('<ol><li><p>Click Backups</p></li><li><p>Next</p></li></ol>'), [[true, 'Click Backups'], [true, 'Next']]);
});

test('an inline icon and spans inside the item do not drop it', () => {
  const body = '<ol><li><p>Click <span style="display:inline"><strong>Backups</strong></span> <svg aria-hidden="true"><path d="M0"></path></svg> now</p></li><li><p>Next</p></li></ol>';
  assert.deepEqual(items(body).map((i) => i[0]), [true, true]);
  assert.match(items(body)[0][1], /Click Backups now/);
});

test('unordered items wrapped in paragraphs stay unordered, and a plain item is unchanged', () => {
  assert.deepEqual(items('<ul><li><p>a</p></li></ul><ol><li>b</li><li>c</li></ol>'), [[false, 'a'], [true, 'b'], [true, 'c']]);
});

test('a second paragraph in the same item is a paragraph, not another step', () => {
  const body = '<ol><li><p>Open the file.</p><p>It is in the root folder.</p></li><li><p>Save it.</p></li></ol>';
  assert.deepEqual(items(body), [[true, 'Open the file.'], [true, 'Save it.']]);
  assert.deepEqual(paras(body), ['It is in the root folder.']);
});

test('item text before a paragraph stays the item; the paragraph is separate', () => {
  const body = '<ol><li>Run it<p>Then wait.</p></li></ol>';
  assert.deepEqual(items(body), [[true, 'Run it']]);
  assert.deepEqual(paras(body), ['Then wait.']);
});

test('nested lists keep their own order flags, and omitted </li> tags do not leak state', () => {
  assert.deepEqual(items('<ol><li><p>outer</p><ul><li><p>inner</p></li></ul></li><li><p>next</p></li></ol>'), [[true, 'outer'], [false, 'inner'], [true, 'next']]);
  assert.deepEqual(items('<ol><li><p>one<li><p>two</ol><p>after</p>').map((i) => i[0]), [true, true]);
  assert.deepEqual(paras('<ol><li><p>one<li><p>two</ol><p>after</p>'), ['after']);
});
