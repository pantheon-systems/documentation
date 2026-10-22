'use strict';

const { mdTable } = require('./util.cjs');

const PLACEHOLDER_TEXT = [
  /\[placeholder/i,
  /placeholder for /i,
  /lorem ipsum/i,
  /\bTODO\b/,
  /\bTBD\b/,
  /coming soon/i,
  /\(future\)/i,
];
// A page that points at code ("run the command below", "the example script") but shows none in the server HTML may load its
// samples with JavaScript. That is a coverage limit of this tool, not a missing sample.
const POINTS_AT_CODE = /\b(?:the|this|following|example|sample)\s+(?:command|script|code|snippet|pipeline|workflow|configuration)s?\s+(?:below|that follows)|\b(?:run|use|add|paste|copy)\s+the\s+(?:following|command|code|script)\b/i;
const SUSPICIOUS_LINK = [
  { label: 'local file path', test: (href) => /^file:|\/Users\/|\/home\/[^/]+\/|vscode-resource/i.test(href) },
  { label: 'localhost or private address', test: (href) => /\/\/(localhost|127\.0\.0\.1|10\.|192\.168\.)/i.test(href) },
  { label: 'placeholder host', test: (href) => /\/\/([^/]*\.)?(example\.(com|org|net)|mysite\.com|yoursite[^/]*|your-?domain[^/]*)(\/|$)/i.test(href) },
  { label: 'bare word as URL', test: (href) => /^https?:\/\/[A-Za-z]+\.[A-Za-z]{2,3}$/.test(href) && /^https?:\/\/[A-Z]/.test(href) },
  { label: 'template artifact', test: (href) => /webstyle|\{\{|\}\}|undefined|\[object/i.test(href) },
];

function normalizeLink(href, pageUrl) {
  if (/^(mailto|tel|javascript|data):/i.test(href) || href.startsWith('#')) return null;
  let url;
  try {
    url = new URL(href, pageUrl);
  } catch {
    return { kind: 'invalid', url: href };
  }
  if (!/^https?:$/.test(url.protocol)) return { kind: 'external', url: url.href };
  url.hash = '';
  const same = url.origin === new URL(pageUrl).origin;
  const clean = url.href.replace(/\/$/, '') || url.href;
  return { kind: same ? 'internal' : 'external', url: same && url.pathname === '/' && !url.search ? url.origin : clean };
}

const pathOf = (url) => {
  const parsed = new URL(url);
  return parsed.pathname === '/' && !parsed.search ? '/' : (parsed.pathname.replace(/\/$/, '') || '/') + parsed.search;
};

function isTitleCase(text) {
  const words = text.match(/[A-Za-z][A-Za-z'-]*/g) || [];
  const rest = words.slice(1);
  return rest.length >= 3 && rest.filter((w) => /^[A-Z]/.test(w)).length / rest.length > 0.6;
}

const GENERIC_LINK_TEXT = /^(click here|here|this|link|this link|this page|read more|more|learn more|see here|details)$/i;
const VISUAL_ONLY = /\b(?:see|in|from) the (?:image|screenshot|figure|diagram|picture) (?:above|below)\b|\bclick the (?:red|green|blue|yellow|orange|purple|gray|grey) (?:button|icon)\b|\b(?:icon|button) (?:on|at) the (?:left|right|top|bottom)\b/i;
const COMMON_ACRONYMS = new Set(['API', 'URL', 'HTML', 'CSS', 'FAQ', 'PDF', 'ID', 'OK', 'UI', 'UX', 'JSON', 'CLI', 'SDK', 'HTTP', 'HTTPS', 'DNS', 'SSL', 'TLS', 'CDN', 'SQL', 'XML', 'YAML', 'USA', 'AM', 'PM']);

// Partial, mechanical accessibility and comprehension checks. Not an accessibility audit:
// no contrast, focus order, keyboard, screen reader, or rendered-DOM checks are made.
function accessibilityChecks(ok) {
  const genericLinks = [];
  const visualOnly = [];
  const acronyms = [];
  for (const p of ok) {
    for (const l of p.links) {
      if (GENERIC_LINK_TEXT.test((l.text || '').trim())) genericLinks.push({ path: p.path, text: l.text.trim(), href: l.href });
    }
    const text = p.text || '';
    const v = VISUAL_ONLY.exec(text);
    if (v) visualOnly.push({ path: p.path, excerpt: text.slice(Math.max(0, v.index - 20), v.index + 70).replace(/\s+/g, ' ') });
    const seen = new Set();
    for (const m of text.matchAll(/\b[A-Z]{2,6}\b/g)) {
      const tok = m[0];
      if (COMMON_ACRONYMS.has(tok) || seen.has(tok)) continue;
      seen.add(tok);
      const expanded = new RegExp(`\\(${tok}\\)|${tok}\\s*\\(`).test(text);
      if (!expanded) acronyms.push({ path: p.path, term: tok });
    }
  }
  return {
    partial: true,
    note: 'Mechanical checks only. Contrast, keyboard use, focus order, screen readers, and rendered output were not inspected, and localization readiness was not assessed.',
    genericLinkText: genericLinks, visualOnlyInstructions: visualOnly, unexpandedAcronyms: acronyms,
  };
}

function governanceChecks(ok) {
  const titles = new Map();
  const canon = new Map();
  for (const p of ok) {
    const t = (p.title || '').trim().toLowerCase();
    if (t) titles.set(t, [...(titles.get(t) || []), p.path]);
    if (p.canonical) canon.set(p.canonical, [...(canon.get(p.canonical) || []), p.path]);
  }
  return {
    duplicateTitles: [...titles.entries()].filter(([, v]) => v.length > 1).map(([title, paths]) => ({ title, paths })),
    sharedCanonical: [...canon.entries()].filter(([, v]) => v.length > 1).map(([canonical, paths]) => ({ canonical, paths })),
    dateConflicts: ok.filter((p) => p.dateSignals && p.dateSignals.conflict).map((p) => ({ path: p.path, visible: p.dateSignals.visible, embedded: p.dateSignals.meta, lastmod: p.dateSignals.lastmod })),
    redirected: ok.filter((p) => p.redirect || (p.aliases || []).length).map((p) => ({ path: p.path, from: [p.redirect && p.redirect.from, ...(p.aliases || [])].filter(Boolean).join(', ') })),
  };
}

function analyze(pages, { staleDays = 30, now = new Date(), deadEndExclude = [], inventory = { complete: true, reasons: [] } } = {}) {
  const ok = pages.filter((p) => p.status === 200);
  const byPath = new Map(ok.map((p) => [p.path, p]));

  const descriptions = new Map();
  for (const p of ok) {
    const d = (p.meta.description || '').trim();
    if (d) descriptions.set(d, [...(descriptions.get(d) || []), p.path]);
  }
  const sharedDescriptions = [...descriptions.entries()]
    .filter(([, paths]) => paths.length > 1)
    .map(([text, paths]) => ({ text, paths }));
  const metadata = {
    missingDescription: ok.filter((p) => !(p.meta.description || '').trim()).map((p) => p.path),
    sharedDescriptions,
    missingOgUrl: ok.filter((p) => !p.meta['og:url']).length,
    missingCanonical: ok.filter((p) => !p.canonical).length,
    missingOgImage: ok.filter((p) => !p.meta['og:image']).length,
    missingOgTitle: ok.filter((p) => !p.meta['og:title']).length,
  };

  const headings = {
    notOneH1: ok.filter((p) => p.headings.filter((h) => h.level === 1).length !== 1).map((p) => p.path),
    skippedLevel: ok
      .filter((p) => p.headings.some((h, i) => i > 0 && h.level - p.headings[i - 1].level > 1))
      .map((p) => p.path),
    titleCaseCandidates: ok.flatMap((p) =>
      p.headings.filter((h) => h.level >= 2 && isTitleCase(h.text)).map((h) => ({ path: p.path, text: h.text })),
    ),
  };

  const images = { total: 0, missingAlt: [], emptyAlt: [] };
  for (const p of ok) {
    images.total += p.images.length;
    const missing = p.images.filter((i) => i.alt === null).length;
    const empty = p.images.filter((i) => i.alt !== null && !i.alt.trim()).length;
    if (missing) images.missingAlt.push({ path: p.path, count: missing });
    if (empty) images.emptyAlt.push({ path: p.path, count: empty });
  }

  const inbound = new Map();
  const navSet = new Set();
  const outbound = new Map();
  const suspicious = [];
  const external = new Set();
  const internal = new Set();
  for (const p of ok) {
    for (const link of p.navLinks) {
      const n = normalizeLink(link.href, p.url);
      if (n && n.kind === 'internal') navSet.add(pathOf(n.url));
    }
    let count = 0;
    for (const link of p.links) {
      for (const rule of SUSPICIOUS_LINK) {
        if (rule.test(link.href)) suspicious.push({ path: p.path, href: link.href, text: link.text, label: rule.label });
      }
      const n = normalizeLink(link.href, p.url);
      if (!n) continue;
      count += 1;
      if (n.kind === 'internal') {
        internal.add(n.url);
        const target = pathOf(n.url);
        if (target !== p.path) inbound.set(target, (inbound.get(target) || 0) + 1);
      } else if (n.kind === 'external') {
        external.add(n.url);
      }
    }
    outbound.set(p.path, count);
  }
  const excluded = (path) => deadEndExclude.some((re) => re.test(path));
  const links = {
    internalTargets: [...internal].sort(),
    externalTargets: [...external].sort(),
    inNavigation: ok.filter((p) => navSet.has(p.path)).length,
    orphans: ok.filter((p) => p.path !== '/' && !navSet.has(p.path) && !inbound.get(p.path)).map((p) => p.path),
    onlyViaNavigation: ok.filter((p) => navSet.has(p.path) && !inbound.get(p.path)).map((p) => p.path),
    deadEnds: ok.filter((p) => outbound.get(p.path) === 0 && !excluded(p.path)).map((p) => p.path),
    suspicious,
    inventoryComplete: Boolean(inventory.complete),
    brokenInternalByCrawl: [...new Set(ok.flatMap((p) => p.links.map((l) => normalizeLink(l.href, p.url))
      .filter((n) => n && n.kind === 'internal').map((n) => pathOf(n.url))))].filter((t) => !byPath.has(t)),
  };

  const placeholders = [];
  for (const p of ok) {
    const text = p.text || '';
    for (const re of PLACEHOLDER_TEXT) {
      const hit = re.exec(text);
      if (hit) placeholders.push({ path: p.path, excerpt: text.slice(Math.max(0, hit.index - 30), hit.index + 60).replace(/\s+/g, ' ') });
    }
  }

  const codeMissing = ok
    .filter((p) => POINTS_AT_CODE.test(p.text || '') && !(p.preBlocks > 0) && !((p.codeBlocks || []).length > 0) && !((p.blocks || []).some((b) => b.type === 'code')))
    .map((p) => p.path);

  const dated = ok.filter((p) => p.updated);
  const cutoff = new Date(now.getTime() - staleDays * 86400000);
  const stale = dated.filter((p) => new Date(p.updated) < cutoff).sort((a, b) => a.updated.localeCompare(b.updated));

  return {
    pages: { total: pages.length, fetched: ok.length, failed: pages.filter((p) => p.status !== 200).map((p) => ({ path: p.path, status: p.status, note: p.note })) },
    metadata,
    headings,
    images,
    links,
    placeholders,
    codeMissing,
    inventory,
    accessibility: accessibilityChecks(ok),
    governance: governanceChecks(ok),
    freshness: { dated: dated.length, undated: ok.length - dated.length, staleDays, stale: stale.map((p) => ({ path: p.path, updated: p.updated })) },
  };
}

function renderHealth(h) {
  const list = (items, fmt = (x) => `\`${x}\``) => (items.length ? items.map((x) => `  - ${fmt(x)}`).join('\n') : '  - none');
  const out = [];
  out.push('# Health checks', '', 'All values are observed from fetched pages. A page that renders its content with JavaScript can look empty here.', '');
  if (h.inventory && !h.inventory.complete) {
    out.push(`**The inventory is incomplete: ${(h.inventory.reasons || []).join('; ') || 'reason not recorded'}.** Orphan, dead-end, and missing-page findings below are unverified: they describe only the pages that were examined.`, '');
  }
  if (h.inventory && h.inventory.complete && h.inventory.declaredComplete) out.push('Inventory completeness is declared by the person who saved these pages. It was not verified against the live site.', '');
  out.push(`## Fetch`, '', `Pages fetched: ${h.pages.fetched} of ${h.pages.total}.`);
  if (h.pages.failed.length) out.push('', 'Not fetched:', list(h.pages.failed, (f) => `\`${f.path}\` (${f.status}${f.note ? `: ${f.note}` : ''})`));
  out.push('', '## Metadata', '');
  out.push(`- Missing description: ${h.metadata.missingDescription.length}`, list(h.metadata.missingDescription));
  out.push(`- Descriptions shared by more than one page: ${h.metadata.sharedDescriptions.length}`);
  for (const s of h.metadata.sharedDescriptions) out.push(`  - "${s.text.slice(0, 80)}" on ${s.paths.length} pages`);
  out.push(`- Pages without og:url: ${h.metadata.missingOgUrl}; without canonical: ${h.metadata.missingCanonical}; without og:image: ${h.metadata.missingOgImage}; without og:title: ${h.metadata.missingOgTitle}`);
  out.push('', '## Headings', '');
  out.push(`- Pages without exactly one h1: ${h.headings.notOneH1.length}`, list(h.headings.notOneH1));
  out.push(`- Pages that skip a heading level: ${h.headings.skippedLevel.length}`, list(h.headings.skippedLevel));
  out.push(`- Headings that look Title Case (heuristic, check your style guide): ${h.headings.titleCaseCandidates.length}`, list(h.headings.titleCaseCandidates.slice(0, 15), (x) => `\`${x.path}\`: ${x.text}`));
  out.push('', '## Images', '');
  out.push(`- Images: ${h.images.total}; with no alt attribute: ${h.images.missingAlt.reduce((n, x) => n + x.count, 0)}; with empty alt (decorative if intended): ${h.images.emptyAlt.reduce((n, x) => n + x.count, 0)}`);
  out.push(list(h.images.missingAlt, (x) => `\`${x.path}\`: ${x.count} without alt`));
  out.push('', '## Links', '');
  out.push(`- Unique targets in content: ${h.links.internalTargets.length} internal, ${h.links.externalTargets.length} external`);
  out.push(`- Pages in navigation: ${h.links.inNavigation} of ${h.pages.fetched}`);
  out.push(`- Orphans (not in navigation, no inbound link): ${h.links.orphans.length}`, list(h.links.orphans));
  out.push(`- Reachable only through navigation: ${h.links.onlyViaNavigation.length}`);
  out.push(`- Dead ends (no outbound content link): ${h.links.deadEnds.length}`, list(h.links.deadEnds));
  out.push(`- Internal links to pages that are not in the crawl: ${h.links.brokenInternalByCrawl.length}`, list(h.links.brokenInternalByCrawl));
  out.push(`- Suspicious links: ${h.links.suspicious.length}`, list(h.links.suspicious, (x) => `\`${x.path}\` (${x.label}): ${x.href.slice(0, 90)}`));
  out.push('', '## Accessibility and comprehension (partial)', '', h.accessibility.note, '');
  out.push(`- Links with generic text: ${h.accessibility.genericLinkText.length}`, list(h.accessibility.genericLinkText.slice(0, 15), (x) => `\`${x.path}\`: "${x.text}"`));
  out.push(`- Instructions that rely on a picture or position: ${h.accessibility.visualOnlyInstructions.length}`, list(h.accessibility.visualOnlyInstructions.slice(0, 15), (x) => `\`${x.path}\`: ${x.excerpt}`));
  out.push(`- Acronyms never expanded on the page (heuristic): ${h.accessibility.unexpandedAcronyms.length}`, list(h.accessibility.unexpandedAcronyms.slice(0, 15), (x) => `\`${x.path}\`: ${x.term}`));
  out.push('', '## Governance', '');
  out.push(`- Pages sharing a title: ${h.governance.duplicateTitles.length}`, list(h.governance.duplicateTitles, (x) => `"${x.title}" on ${x.paths.map((p) => `\`${p}\``).join(', ')}`));
  out.push(`- Pages sharing a canonical URL: ${h.governance.sharedCanonical.length}`, list(h.governance.sharedCanonical, (x) => `${x.canonical} on ${x.paths.length} pages`));
  out.push(`- Visible and embedded dates disagree: ${h.governance.dateConflicts.length}`, list(h.governance.dateConflicts, (x) => `\`${x.path}\`: visible ${x.visible}, embedded ${x.embedded}`));
  out.push(`- Pages reached through a redirect: ${h.governance.redirected.length}`, list(h.governance.redirected, (x) => `\`${x.path}\` (requested ${x.from})`));
  out.push('', '## Placeholder text', '', list(h.placeholders, (x) => `\`${x.path}\`: ${x.excerpt}`));
  out.push('', '## Freshness', '');
  out.push(`- Pages with an updated date: ${h.freshness.dated}; without: ${h.freshness.undated}`);
  out.push(`- Older than ${h.freshness.staleDays} days: ${h.freshness.stale.length}`, list(h.freshness.stale, (x) => `\`${x.path}\` (${x.updated})`));
  return out.join('\n');
}

function renderInventory(pages) {
  const rows = pages
    .filter((p) => p.status === 200)
    .map((p) => [
      `\`${p.path}\``,
      p.title || (p.h1 ? p.h1[0] : ''),
      p.words,
      p.updated || 'none shown',
      p.headings.filter((h) => h.level === 2).length,
      p.preBlocks,
      p.tables,
      p.images.length,
      p.images.filter((i) => i.alt === null).length,
      p.links.length,
      '',
      '',
      '',
    ]);
  return [
    '# Inventory',
    '',
    'Type, confidence and accuracy are blank for the auditor to fill after reading each page.',
    '',
    mdTable(
      ['Path', 'Title', 'Words', 'Updated', 'h2', 'Code', 'Tables', 'Images', 'No alt', 'Links', 'Type', 'Conf.', 'Accuracy'],
      rows,
    ),
  ].join('\n');
}

module.exports = { PLACEHOLDER_TEXT, analyze, renderHealth, renderInventory, normalizeLink, pathOf };
