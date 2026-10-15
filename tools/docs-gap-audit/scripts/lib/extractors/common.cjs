'use strict';

// Shared text helpers for extractors. Parsing stays in code; wording lives in data/extraction-vocab.json.

const stripMd = (t) => t.replace(/`/g, '').replace(/\*+/g, '').replace(/(^|\s)_+|_+(?=\s|$)/g, '$1');

const termsFor = (name) => {
  const spaced = name.replace(/[_-]+/g, ' ');
  return [...new Set([name, spaced, name.replace(/[_\s]+/g, '-')].filter((t) => t.length > 2))];
};

const camelToSnake = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();

const isCommentLine = (text) => /^\s*(\*|\/\/|\/\*|#|<!--)/.test(text);

function htmlToLines(text) {
  return text
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, inner) => `\n${'#'.repeat(Number(n))} ${inner}\n`)
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, inner) => `\n- ${inner}\n`)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .split(/\n/)
    .map((l) => l.replace(/\s+/g, ' ').trim());
}

// Short name and search terms for a changelog or planning sentence. Backticked words are
// kept as exact terms; the first five words after a leading verb are the fallback phrase.
function phrase(text, vocab) {
  const clean = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\(#?\d+\)|#\d+/g, '').trim();
  const codes = [...clean.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
  const plain = stripMd(clean).replace(vocab.verbLead, '');
  const short = plain.split(/\s+/).slice(0, 5).join(' ').replace(/[.,;:]+$/, '');
  return { name: stripMd(clean).slice(0, 90), terms: [...new Set([...codes, short].filter((t) => t.length > 2))] };
}

const excerptOf = (text) => String(text).trim().replace(/\s+/g, ' ').slice(0, 200);

module.exports = { stripMd, termsFor, camelToSnake, isCommentLine, htmlToLines, phrase, excerptOf };
