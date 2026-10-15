'use strict';

const fs = require('node:fs');

function decodeXml(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function parseSitemap(xml) {
  const isIndex = /<sitemapindex/i.test(xml);
  const block = isIndex ? /<sitemap>([\s\S]*?)<\/sitemap>/gi : /<url>([\s\S]*?)<\/url>/gi;
  const entries = [];
  let match;
  while ((match = block.exec(xml))) {
    const loc = /<loc>\s*([^<]+?)\s*<\/loc>/i.exec(match[1]);
    const lastmod = /<lastmod>\s*([^<]+?)\s*<\/lastmod>/i.exec(match[1]);
    if (loc) entries.push({ url: decodeXml(loc[1]), lastmod: lastmod ? lastmod[1] : null });
  }
  return { isIndex, entries };
}

function readUrlList(file) {
  return fs
    .readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((url) => ({ url, lastmod: null }));
}

// Accepts a site URL (looks for /sitemap.xml and robots.txt Sitemap lines) or a sitemap URL.
// Only sitemaps on the starting origin are fetched. A robots.txt Sitemap line or a sitemap-index child
// on another origin is recorded in the result's skippedSitemaps and never requested.
async function discoverUrls(input, fetcher, { limit = Infinity } = {}) {
  const startOrigin = new URL(input).origin;
  const skippedSitemaps = [];
  const failedSitemaps = [];
  let queue;
  if (/\.xml(\?|$)/i.test(input)) {
    queue = [{ url: input, depth: 0 }];
  } else {
    const base = new URL(input);
    queue = [{ url: new URL('/sitemap.xml', base).href, depth: 0 }];
    const robots = await fetcher.get(new URL('/robots.txt', base).href);
    if (robots.status === 200) {
      for (const line of robots.body.matchAll(/^\s*sitemap:\s*(\S+)/gim)) {
        queue.push({ url: line[1], depth: 0 });
      }
    }
  }
  const seen = new Set();
  const found = new Map();
  while (queue.length) {
    const { url, depth } = queue.shift();
    if (seen.has(url)) continue;
    seen.add(url);
    let sitemapOrigin = null;
    try {
      sitemapOrigin = new URL(url).origin;
    } catch {
      skippedSitemaps.push({ url, reason: 'not a URL' });
      continue;
    }
    if (sitemapOrigin !== startOrigin) {
      skippedSitemaps.push({ url, reason: 'sitemap on another origin; not requested' });
      continue;
    }
    const res = await fetcher.get(url);
    if (res.status !== 200) {
      const why = res.skipped || res.offOrigin ? res.skipped || 'redirects to another origin' : res.error || `HTTP ${res.status}`;
      failedSitemaps.push({ url, reason: why });
      continue;
    }
    const { isIndex, entries } = parseSitemap(res.body);
    if (isIndex) {
      if (depth < 3) for (const entry of entries) queue.push({ url: entry.url, depth: depth + 1 });
      else failedSitemaps.push({ url, reason: 'sitemap index nested deeper than 3 levels; children not read' });
    } else {
      for (const entry of entries) if (!found.has(entry.url)) found.set(entry.url, entry);
    }
  }
  const result = [...found.values()].slice(0, limit);
  Object.defineProperty(result, 'skippedSitemaps', { value: skippedSitemaps, enumerable: false });
  Object.defineProperty(result, 'failedSitemaps', { value: failedSitemaps, enumerable: false });
  return result;
}

module.exports = { discoverUrls, parseSitemap, readUrlList };
