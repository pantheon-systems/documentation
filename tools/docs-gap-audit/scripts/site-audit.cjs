#!/usr/bin/env node
'use strict';

// Read-only audit of a docs website: inventory, health checks, optional link status.
// Usage: node scripts/site-audit.cjs <site-url | sitemap-url> --out audit-out [options]

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs, writeFile, fail } = require('./lib/util.cjs');
const { createFetcher, BlockedError } = require('./lib/fetch.cjs');
const { discoverUrls, readUrlList } = require('./lib/sitemap.cjs');
const { parseHtml } = require('./lib/html.cjs');
const { analyze, renderHealth, renderInventory } = require('./lib/health.cjs');
const { matchesAny } = require('./lib/paths.cjs');
const { validateProfile } = require('./lib/profile.cjs');

const HELP = `site-audit: read-only inventory and health checks for a docs website.

Usage:
  node scripts/site-audit.cjs <site-url | sitemap-url> --out <dir> [options]
  node scripts/site-audit.cjs --profile <area-profile.json> --out <dir> [options]

Options:
  --out <dir>              Output directory (default: audit-out)
  --profile <file>         Take the origin and crawl scope from an area profile. With no URL given,
                           the sitemap at <origin>/sitemap.xml is used
  --origin <origin>        Crawl only this origin; other origins in a sitemap are recorded as excluded
  --include <glob>         Crawl only URL paths matching this glob, such as /widgets/** (repeatable)
  --exclude <glob>         Never crawl URL paths matching this glob (repeatable; wins over include)
  --allow-root <dir>       With --profile: an extra folder the profile's local sources may live in
  --urls <file>            Audit these URLs (one per line) instead of reading a sitemap
  --limit <n>              Stop after n pages; the rest are recorded as unexamined
  --delay <ms>             Pause between requests (default 1000)
  --user-agent <string>    Identify yourself honestly; do not impersonate a browser
  --timeout <ms>           Per-request timeout (default 30000)
  --stale-days <n>         Flag pages whose updated date is older than n days (default 30)
  --updated-pattern <re>   Regex with one capture group that finds a page's "updated" date in its text
  --dead-end-exclude <re>  Don't report matching paths as dead ends (repeatable)
  --check-links            Also check the status of every unique link target. This contacts the
                           sites your pages link to, so it is off by default
  --no-robots              Skip robots.txt (only for sites you own)
  --from-dir <dir>         Audit saved HTML files instead of fetching (use with --base-url). A file a__b.html or a/b.html
                           is /a/b; index.html and home.html are the home page
  --base-url <url>         The site's address, used to build page URLs for --from-dir
  --assume-complete        With --from-dir: declare that the saved pages are the whole in-scope site
  --help

Writes pages.json, inventory.md, health.json, health.md, run.json (and links.json with --check-links).
run.json keeps excluded, skipped, unavailable, blocked, and unexamined material separate from pages that were examined,
and says whether the inventory is complete. A page that redirects to another origin is not followed.
Exit codes: 0 ok, 1 error, 2 bad arguments, 3 the site blocked the crawl (partial results are saved).`;

const DEFAULT_UPDATED = /(?:last\s+)?updated(?:\s+on)?:?\s*([A-Z][a-z]+ \d{1,2}, \d{4}|\d{4}-\d{2}-\d{2})/i;

function toIso(text) {
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10);
}

const daysApart = (a, b) => Math.abs(new Date(a).getTime() - new Date(b).getTime()) / 86400000;

function buildRecord(entry, res, parsed, updatedRe) {
  const finalUrl = res.url || entry.url;
  const url = new URL(finalUrl);
  const text = parsed.textLines.join('\n');
  const found = updatedRe.exec(text);
  const visible = (found && toIso(found[1])) || null;
  const metaRaw = parsed.meta['article:modified_time'] || parsed.meta['og:updated_time'];
  const embedded = (metaRaw && toIso(metaRaw)) || null;
  const lastmod = entry.lastmod ? toIso(entry.lastmod) : null;
  const conflict = Boolean((visible && embedded && daysApart(visible, embedded) > 1) || (visible && lastmod && daysApart(visible, lastmod) > 1));
  const requested = res.requestedUrl || entry.url;
  return {
    url: finalUrl,
    requestedUrl: requested,
    redirect: requested.replace(/\/$/, '') !== finalUrl.replace(/\/$/, '') ? { from: requested } : null,
    path: url.pathname === '/' && !url.search ? '/' : (url.pathname.replace(/\/$/, '') || '/') + url.search,
    status: res.status,
    title: parsed.title,
    h1: parsed.headings.filter((h) => h.level === 1).map((h) => h.text),
    headings: parsed.headings,
    words: parsed.words,
    preBlocks: parsed.preBlocks,
    inlineCode: parsed.inlineCode,
    tables: parsed.tables,
    lists: parsed.lists,
    blocks: parsed.blocks,
    codeBlocks: parsed.codeBlocks,
    images: parsed.images,
    links: parsed.links,
    navLinks: parsed.navLinks,
    meta: parsed.meta,
    canonical: parsed.canonical,
    updated: visible || embedded || null,
    dateSignals: { visible, meta: embedded, lastmod, conflict },
    lastmod: entry.lastmod || null,
    text,
  };
}

function loadProfile(file, allowRoots) {
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail(`Cannot read profile ${file}: ${error.message}`);
  }
  const result = validateProfile(raw, { baseDir: path.dirname(path.resolve(file)), allowedRoots: allowRoots });
  if (!result.ok) fail(`Profile ${file} is not valid:\n${result.errors.map((e) => `  ${e.path}: ${e.message}`).join('\n')}`);
  return result.profile;
}

function scopeEntries(entries, { origin, include, exclude }) {
  const kept = [];
  const excluded = [];
  for (const e of entries) {
    let u;
    try {
      u = new URL(e.url);
    } catch {
      excluded.push({ url: e.url, reason: 'not a URL' });
      continue;
    }
    if (origin && u.origin !== origin) excluded.push({ url: e.url, reason: 'other origin' });
    else if (include.length && !matchesAny(u.pathname, include)) excluded.push({ url: e.url, reason: 'outside crawl include' });
    else if (exclude.length && matchesAny(u.pathname, exclude)) excluded.push({ url: e.url, reason: 'crawl exclude' });
    else kept.push(e);
  }
  return { kept, excluded };
}

function inventoryState({ symlinks, blocked, unexamined, unavailable, skippedByRobots, unsupported, offOrigin, sitemapFailures, declaredComplete, saved }) {
  const reasons = [];
  if (symlinks) reasons.push(`${symlinks} symbolic link(s) in the saved folder were not read`);
  if (sitemapFailures) reasons.push(`${sitemapFailures} sitemap file(s) could not be read, so the URL list may be incomplete`);
  if (blocked) reasons.push(`the site blocked the crawl (${blocked})`);
  if (unexamined) reasons.push(`${unexamined} in-scope page(s) were not examined (limit reached or crawl stopped)`);
  if (unavailable) reasons.push(`${unavailable} page(s) could not be fetched`);
  if (skippedByRobots) reasons.push(`${skippedByRobots} page(s) are disallowed by robots.txt and were not examined`);
  if (unsupported) reasons.push(`${unsupported} page(s) were not HTML and were not read`);
  if (offOrigin) reasons.push(`${offOrigin} page(s) redirect to another origin and were not followed`);
  if (saved && !declaredComplete) reasons.push('saved pages: completeness against the live site was not verified (use --assume-complete if they are the whole in-scope site)');
  return { complete: reasons.length === 0, reasons, declaredComplete: Boolean(declaredComplete) };
}

function writeOutputs(out, pages, health, run) {
  writeFile(path.join(out, 'pages.json'), JSON.stringify(pages, null, 2));
  writeFile(path.join(out, 'inventory.md'), `${renderInventory(pages)}\n`);
  writeFile(path.join(out, 'health.json'), JSON.stringify(health, null, 2));
  writeFile(path.join(out, 'health.md'), `${renderHealth(health)}\n`);
  writeFile(path.join(out, 'run.json'), JSON.stringify(run, null, 2));
}

function auditSaved(args) {
  if (!args.baseUrl) fail('--from-dir needs --base-url, the address the pages were saved from.');
  const base = args.baseUrl.replace(/\/$/, '');
  const out = args.out || 'audit-out';
  const files = [];
  const symlinks = [];
  (function walkDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isSymbolicLink()) {
        symlinks.push(path.relative(args.fromDir, full)); // never followed: a link can point outside the saved folder
        continue;
      }
      if (entry.isDirectory()) walkDir(full);
      else if (/\.html?$/i.test(entry.name)) files.push(full);
    }
  })(args.fromDir);
  if (!files.length) fail(`No .html files in ${args.fromDir}.`);
  const updatedRe = args.updatedPattern ? new RegExp(args.updatedPattern, 'i') : DEFAULT_UPDATED;
  const pages = files.sort().map((file) => {
    const rel = path.relative(args.fromDir, file).split(path.sep).join('/').replace(/\.html?$/i, '').split('__').join('/');
    const route = /^(index|home)$/.test(rel) ? '' : `/${rel.replace(/\/index$/, '')}`;
    const url = `${base}${route}`;
    return buildRecord({ url }, { status: 200, url }, parseHtml(fs.readFileSync(file, 'utf8')), updatedRe);
  });
  const inventory = inventoryState({ declaredComplete: args.assumeComplete, saved: true, symlinks: symlinks.length });
  const health = analyze(pages, { staleDays: args.staleDays ? Number(args.staleDays) : 30, deadEndExclude: (args.deadEndExclude || []).map((x) => new RegExp(x)), inventory });
  const run = {
    input: `saved HTML in ${args.fromDir} (base ${base})`, started: new Date().toISOString(), finished: new Date().toISOString(), userAgent: 'none (offline)', blocked: null,
    skipped: [], excluded: symlinks.map((f) => ({ url: f, reason: 'symbolic link in the saved folder; not read' })), pages: pages.length, inventory,
    coverage: { discovered: pages.length, excluded: 0, examined: pages.length, skippedByRobots: 0, unavailable: 0, blocked: false, unexamined: 0, unsupported: 0, offOrigin: 0 },
  };
  writeOutputs(out, pages, health, run);
  process.stdout.write(`Read ${pages.length} saved pages. Wrote ${path.join(out, 'inventory.md')} and ${path.join(out, 'health.md')}.\n`);
}

async function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2), {
      booleans: ['help', 'check-links', 'no-robots', 'assume-complete'],
      strings: ['out', 'urls', 'limit', 'delay', 'user-agent', 'timeout', 'stale-days', 'updated-pattern', 'from-dir', 'base-url', 'profile', 'origin'],
      lists: ['dead-end-exclude', 'include', 'exclude', 'allow-root'],
    });
  } catch (error) {
    fail(`${error.message}\n\n${HELP}`);
  }
  if (args.help) return process.stdout.write(`${HELP}\n`);
  if (args.fromDir) return auditSaved(args);

  const profile = args.profile ? loadProfile(args.profile, args.allowRoot || []) : null;
  let origin = args.origin || (profile && profile.site.origin) || null;
  const include = (args.include && args.include.length ? args.include : profile && profile.scope.crawl.include) || [];
  const exclude = [...((profile && profile.scope.crawl.exclude) || []), ...(args.exclude || [])];
  let input = args._[0];
  if (!input && !args.urls && profile) input = `${profile.site.origin}/sitemap.xml`;
  if (!input && !args.urls) fail(`Give a site URL or sitemap URL, --profile, or --urls <file>.\n\n${HELP}`);
  if (!origin && input) {
    try {
      origin = new URL(input).origin; // default: the starting address's origin, never every origin a sitemap lists
    } catch {
      origin = null;
    }
  }

  const out = args.out || 'audit-out';
  const limit = args.limit ? Number(args.limit) : Infinity;
  const fetcher = createFetcher({
    delayMs: args.delay !== undefined ? Number(args.delay) : 1000,
    timeoutMs: args.timeout ? Number(args.timeout) : 30000,
    respectRobots: !args.noRobots,
    ...(args.userAgent ? { userAgent: args.userAgent } : {}),
  });
  const updatedRe = args.updatedPattern ? new RegExp(args.updatedPattern, 'i') : DEFAULT_UPDATED;
  const run = {
    input: input || args.urls, started: new Date().toISOString(), userAgent: fetcher.userAgent, blocked: null, skipped: [], excluded: [],
    scope: { origin, include, exclude, profileArea: profile ? profile.area.id : null },
  };

  let entries;
  try {
    entries = args.urls ? readUrlList(args.urls) : await discoverUrls(input, fetcher, { limit: Infinity });
  } catch (error) {
    if (error instanceof BlockedError) {
      run.blocked = error.message;
      run.finished = new Date().toISOString();
      run.pages = 0;
      run.inventory = inventoryState({ blocked: error.message });
      run.coverage = { discovered: 0, excluded: 0, examined: 0, skippedByRobots: 0, unavailable: 0, blocked: true, unexamined: 0, unsupported: 0, offOrigin: 0 };
      writeFile(path.join(out, 'run.json'), JSON.stringify(run, null, 2));
      fail(error.message, 3);
    }
    throw error;
  }
  const failedSitemaps = entries.failedSitemaps || [];
  const discovered = entries.length;
  const scoped = scopeEntries(entries, { origin, include, exclude });
  run.excluded = [...(entries.skippedSitemaps || []).map((s) => ({ url: s.url, reason: s.reason })), ...scoped.excluded].slice(0, 500);
  entries = scoped.kept;
  if (!entries.length) fail(`No URLs left to audit (${discovered} discovered, ${scoped.excluded.length} excluded by scope). Check the sitemap address and the scope, or pass --urls <file>.`);
  const truncated = entries.slice(limit);
  entries = entries.slice(0, limit);

  const pages = [];
  const unavailable = [];
  const unsupported = [];
  const offOrigin = [];
  try {
    for (const entry of entries) {
      const res = await fetcher.get(entry.url);
      if (res.skipped) {
        run.skipped.push({ url: entry.url, reason: res.skipped });
        continue;
      }
      if (res.offOrigin) {
        offOrigin.push({ url: entry.url, to: res.offOrigin });
        run.excluded.push({ url: entry.url, reason: 'redirects to another origin; not followed', to: res.offOrigin });
        continue;
      }
      const u = new URL(res.url || entry.url);
      if (res.status !== 200 || !/html|xml/i.test(res.contentType || 'text/html')) {
        const note = res.error || res.contentType || '';
        pages.push({ url: res.url || entry.url, requestedUrl: entry.url, path: u.pathname + u.search, status: res.status, note, meta: {}, headings: [], images: [], links: [], navLinks: [], textLines: [], text: '' });
        (res.status === 200 ? unsupported : unavailable).push({ url: entry.url, status: res.status, note });
        continue;
      }
      const rec = buildRecord(entry, res, parseHtml(res.body), updatedRe);
      const seen = pages.find((p) => p.url === rec.url && p.status === 200);
      if (seen) {
        // Two requested URLs ended at one page (a redirect alias). Keep one record and remember the alias.
        seen.aliases = [...(seen.aliases || []), entry.url];
        continue;
      }
      pages.push(rec);
    }
  } catch (error) {
    if (!(error instanceof BlockedError)) throw error;
    run.blocked = error.message;
  }
  const reached = new Set([...pages.flatMap((p) => [p.requestedUrl, ...(p.aliases || [])]), ...run.skipped.map((s) => s.url), ...offOrigin.map((o) => o.url)]);
  const notReached = entries.filter((e) => !reached.has(e.url));
  const unexamined = notReached.length + truncated.length;
  const inventory = inventoryState({
    blocked: run.blocked, unexamined, unavailable: unavailable.length, skippedByRobots: run.skipped.length, unsupported: unsupported.length, offOrigin: offOrigin.length,
    sitemapFailures: failedSitemaps.length,
  });
  run.inventory = inventory;
  run.coverage = {
    discovered, excluded: scoped.excluded.length, examined: pages.length - unavailable.length - unsupported.length,
    skippedByRobots: run.skipped.length, unavailable: unavailable.length, blocked: Boolean(run.blocked), unexamined, unsupported: unsupported.length, offOrigin: offOrigin.length,
  };
  run.unexamined = [...notReached, ...truncated].slice(0, 500).map((e) => e.url);
  run.unavailable = unavailable;
  run.failedSitemaps = failedSitemaps;

  const deadEndExclude = (args.deadEndExclude || []).map((s) => new RegExp(s));
  const health = analyze(pages, { staleDays: args.staleDays ? Number(args.staleDays) : 30, deadEndExclude, inventory });

  if (args.checkLinks && !run.blocked) {
    const site = new URL(entries[0].url).origin;
    const results = {};
    try {
      for (const target of [...health.links.internalTargets, ...health.links.externalTargets]) {
        const res = await fetcher.head(target, { sameSite: target.startsWith(site) });
        results[target] = res.skipped ? { status: 0, note: res.skipped } : { status: res.status, note: res.error || '' };
      }
    } catch (error) {
      if (!(error instanceof BlockedError)) throw error;
      run.blocked = error.message;
    }
    health.links.status = results;
    health.links.notOk = Object.entries(results)
      .filter(([, r]) => r.status < 200 || r.status >= 400)
      .map(([url, r]) => ({ url, status: r.status, note: r.note }));
    writeFile(path.join(out, 'links.json'), JSON.stringify(results, null, 2));
  }

  run.finished = new Date().toISOString();
  run.pages = pages.length;
  writeOutputs(out, pages, health, run);
  if (health.links.notOk) {
    const extra = `\n\n## Link status\n\n${health.links.notOk.length ? health.links.notOk.map((l) => `- \`${l.url}\`: ${l.status || 'no response'} ${l.note}`).join('\n') : '- every checked target responded'}\n`;
    fs.appendFileSync(path.join(out, 'health.md'), extra);
  }

  process.stdout.write(
    `Fetched ${health.pages.fetched} of ${health.pages.total} pages. Wrote ${path.join(out, 'inventory.md')} and ${path.join(out, 'health.md')}.\n`,
  );
  if (scoped.excluded.length) process.stdout.write(`Excluded ${scoped.excluded.length} URL(s) by scope (see run.json).\n`);
  if (run.skipped.length) process.stdout.write(`Skipped ${run.skipped.length} URL(s) disallowed by robots.txt.\n`);
  if (!inventory.complete) process.stdout.write(`Inventory incomplete: ${inventory.reasons.join('; ')}.\n`);
  if (run.blocked) {
    process.stderr.write(`${run.blocked}. Partial results saved. Ask the site owner to allow your address, or slow down with --delay.\n`);
    process.exit(3);
  }
}

if (require.main === module) main().catch((error) => fail(error.stack || String(error), 1));

module.exports = { buildRecord, DEFAULT_UPDATED, scopeEntries, inventoryState };
