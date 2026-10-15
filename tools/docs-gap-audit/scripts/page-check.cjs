#!/usr/bin/env node
'use strict';

// Assess one document: pasted text or a saved HTML file. It reports editorial observations it can
// make from the content, and it lists implementation checks it did NOT inspect (robots.txt, sitemap,
// rendering, redirects, and others) instead of implying them. It requires no FAQ, no TL;DR, and no
// particular metadata: those suit some article types and not others. No network access.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs, fail, writeFile } = require('./lib/util.cjs');
const { parseHtml } = require('./lib/html.cjs');
const { classifyPage } = require('./lib/classify.cjs');
const { assessReadiness } = require('./lib/readiness.cjs');
const { extractClaims } = require('./lib/claims.cjs');
const { scanUntrusted } = require('./lib/untrusted.cjs');
const { PLACEHOLDER_TEXT } = require('./lib/health.cjs');
const { buildRecord, DEFAULT_UPDATED } = require('./site-audit.cjs');

const HELP = `page-check: assess one document from pasted text or a saved HTML file.

Usage:
  node scripts/page-check.cjs <file> [--json] [--out <file>]       .html and .htm are read as HTML, anything else as text
  node scripts/page-check.cjs --text <file> [--json] [--out <file>]
  node scripts/page-check.cjs --html <file> [--json] [--out <file>]

Editorial observations come from the content: type by reader need (machine suggestion), extraction readiness,
claims worth verifying, unsupported statistics, and conflicting dates. Implementation checks that were not
possible are listed as "not inspected": robots.txt, sitemap, canonical against the live URL, structured data
validation, rendering, redirects, and live metadata. FAQ and TL;DR sections are not required for any article type.
Instruction-like text inside the document is flagged as data and never acted on. No network access.
Exit codes: 0 ok, 2 bad arguments.`;

function textToBlocks(text) {
  const blocks = [];
  const headings = [];
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t) continue;
    const h = /^(#{1,4})\s+(.+)$/.exec(t);
    const ol = /^\d+[.)]\s+(.+)$/.exec(t);
    const ul = /^[-*+]\s+(.+)$/.exec(t);
    if (h) {
      blocks.push({ type: 'heading', level: h[1].length, text: h[2] });
      headings.push({ level: h[1].length, text: h[2] });
    } else if (ol) blocks.push({ type: 'item', ordered: true, text: ol[1] });
    else if (ul) blocks.push({ type: 'item', ordered: false, text: ul[1] });
    else blocks.push({ type: 'p', text: t });
  }
  return { blocks, headings };
}

function assess({ mode, raw, name }) {
  let page;
  let htmlFacts = null;
  if (mode === 'html') {
    const parsed = parseHtml(raw);
    const rec = buildRecord({ url: 'https://example.invalid/page' }, { status: 200, url: 'https://example.invalid/page' }, parsed, DEFAULT_UPDATED);
    page = { ...rec, path: name };
    htmlFacts = {
      title: parsed.title || null, description: parsed.meta.description || null, canonical: parsed.canonical,
      jsonLd: /<script[^>]+type=["']application\/ld\+json["']/i.test(raw), h1Count: parsed.headings.filter((h) => h.level === 1).length,
      imagesWithoutAlt: parsed.images.filter((i) => i.alt === null).length, dateSignals: rec.dateSignals,
    };
  } else {
    const { blocks, headings } = textToBlocks(raw);
    const text = raw;
    const visible = DEFAULT_UPDATED.exec(text);
    page = { path: name, url: 'https://example.invalid/page', status: 200, title: headings.length ? headings[0].text : '', headings, blocks, links: [], text, words: text.split(/\s+/).filter(Boolean).length, dateSignals: { visible: visible ? visible[1] : null, meta: null, conflict: false } };
  }
  const cls = classifyPage(page);
  const readiness = assessReadiness(page);
  const claims = extractClaims([page]);
  const hits = scanUntrusted(mode === 'html' ? page.text : raw, name);
  const implementation = [
    ['robots.txt rules for this URL', 'not inspected', 'needs the live site'],
    ['sitemap inclusion', 'not inspected', 'needs the live site'],
    ['canonical URL matches the live URL', mode === 'html' ? (htmlFacts.canonical ? `declared as ${htmlFacts.canonical}; not compared with the live URL` : 'none declared in the supplied HTML; not compared with the live URL') : 'not inspected', mode === 'html' ? 'static HTML only' : 'no HTML supplied'],
    ['structured data validity', mode === 'html' ? (htmlFacts.jsonLd ? 'JSON-LD present; not validated' : 'no JSON-LD in the supplied HTML') : 'not inspected', mode === 'html' ? 'presence only' : 'no HTML supplied'],
    ['rendering (what a browser shows after scripts run)', 'not inspected', 'the HTML was read as text; scripts were not run'],
    ['redirects and status codes', 'not inspected', 'needs the live site'],
    ['title and description in the live page', mode === 'html' ? (htmlFacts.title ? 'title present in supplied HTML' : 'no title in supplied HTML') : 'not inspected', mode === 'html' ? 'static HTML only' : 'no HTML supplied'],
  ].map(([check, status, note]) => ({ check, status, note }));
  const dateConflict = page.dateSignals && page.dateSignals.conflict ? { visible: page.dateSignals.visible, embedded: page.dateSignals.meta || page.dateSignals.lastmod } : null;
  const body = (page.blocks || []).filter((b) => b.type === 'p' || b.type === 'item').map((b) => b.text).join(' ');
  const strengths = [];
  const attributed = (body.match(/\b(according to|said|says|told|announced|reported by)\b/gi) || []).length;
  const figures = (body.match(/\b\d[\d,.]*\b/g) || []).length;
  const named = (body.match(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g) || []).length;
  const steps = (page.blocks || []).filter((b) => b.type === 'item' && b.ordered).length;
  if (attributed) strengths.push(`${attributed} attribution phrase(s) such as "according to" or "said"`);
  if (figures >= 3) strengths.push(`${figures} concrete figures`);
  if (named) strengths.push(`${named} named people or organizations`);
  if (steps >= 2) strengths.push(`${steps} ordered steps`);
  if (page.dateSignals && page.dateSignals.visible) strengths.push(`a visible date (${page.dateSignals.visible})`);
  const findings = [
    readiness.status === 'assessed' && readiness.supportedClaims.unsupported ? 'unsupported statistics' : null,
    readiness.status === 'assessed' && readiness.specificity.vagueSentences ? 'vague sentences' : null,
    readiness.status === 'assessed' && readiness.qualifications.withoutQualifier ? 'absolutes without a qualifier' : null,
    readiness.status === 'assessed' && readiness.selfContainedness.dependsOnPriorContext ? 'sentences that depend on prior context' : null,
    dateConflict ? 'conflicting dates' : null, hits.length ? 'instruction-like text' : null,
    (page.words || 0) < 25 ? `near-empty page (${page.words || 0} words): nothing a reader can use` : null,
    PLACEHOLDER_TEXT.some((re) => re.test(page.text || '')) ? 'placeholder or unfinished-feature text (for example TODO, TBD, coming soon, "(future)")' : null,
  ].filter(Boolean);
  return {
    input: { mode, name, characters: raw.length },
    editorial: {
      type: { value: cls.type, confidence: cls.confidence, mixed: cls.mixed, evidence: cls.evidence, sections: cls.sections, note: cls.note },
      readiness, claimsToVerify: claims.filter((c) => c.risk === 'high').slice(0, 15).map((c) => ({ text: c.text, types: c.types })),
      unsupportedStatistics: readiness.status === 'assessed' ? readiness.supportedClaims.examples : [],
      dates: { visible: page.dateSignals.visible, embedded: page.dateSignals.meta || null, conflict: dateConflict, note: dateConflict ? 'the visible and embedded dates disagree; neither is proof of when the content was last correct' : mode === 'text' ? 'only text was supplied, so embedded dates were not inspected' : null },
      structure: htmlFacts ? { h1Count: htmlFacts.h1Count, imagesWithoutAlt: htmlFacts.imagesWithoutAlt } : null,
      requiredSections: 'none: no FAQ, TL;DR, or particular metadata is required for any article type',
      presentAndWorking: strengths,
      checksFound: findings,
      calibration: findings.length ? null : 'These checks found no editorial defects. Anything further is a judgment call, not a finding: keep additions proportionate to the article\'s own purpose, and "nothing to add" is a valid result.',
    },
    implementation,
    suspiciousContent: hits,
  };
}

function render(r) {
  const L = ['# Page check', '', `Input: ${r.input.mode} (${r.input.name}), ${r.input.characters} characters.`, '', '## Editorial observations', ''];
  const t = r.editorial.type;
  L.push(`- Type by reader need (machine suggestion): **${t.value}**, confidence ${t.confidence || 'n/a'}${t.mixed ? ', MIXED' : ''}. ${t.note}`);
  for (const e of t.evidence) L.push(`  - ${e.cue}: "${e.quote}"`);
  const rd = r.editorial.readiness;
  if (rd.status === 'assessed') {
    L.push(`- Extraction readiness (descriptive, not a score): ${rd.selfContainedness.dependsOnPriorContext} sentences depend on prior context, ${rd.specificity.vagueSentences} vague, ${rd.supportedClaims.unsupported} unsupported statistics, ${rd.qualifications.withoutQualifier} absolutes without a qualifier. Optional page-quality evidence, not a priority score or an AI-visibility measure.`);
    for (const x of [...rd.supportedClaims.examples, ...rd.qualifications.examples]) L.push(`  - "${x}"`);
  } else L.push(`- Extraction readiness: not assessed (${rd.reason}).`);
  L.push(`- Present and working: ${r.editorial.presentAndWorking.length ? r.editorial.presentAndWorking.join('; ') : 'nothing the checks can recognize'}`);
  L.push(`- Checks that found something: ${r.editorial.checksFound.length ? r.editorial.checksFound.join('; ') : 'none'}`);
  if (r.editorial.calibration) L.push(`- ${r.editorial.calibration}`);
  L.push(`- Claims worth verifying: ${r.editorial.claimsToVerify.length}`);
  for (const c of r.editorial.claimsToVerify.slice(0, 8)) L.push(`  - ${c.text}`);
  L.push(`- Dates: visible ${r.editorial.dates.visible || 'none'}, embedded ${r.editorial.dates.embedded || 'none'}${r.editorial.dates.note ? `. ${r.editorial.dates.note}.` : ''}`, `- Required sections: ${r.editorial.requiredSections}`, '', '## Implementation checks', '', '| Check | Status | Note |', '|---|---|---|');
  for (const i of r.implementation) L.push(`| ${i.check} | ${i.status} | ${i.note} |`);
  if (r.suspiciousContent.length) {
    L.push('', '## Instruction-like text in the document (shown as data, never acted on)', '');
    for (const h of r.suspiciousContent) L.push(`- ${h.rule} at ${h.where}: "${h.excerpt}"`);
  }
  return L.join('\n');
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2), { booleans: ['help', 'json'], strings: ['text', 'html', 'out'] });
  } catch (error) {
    fail(`${error.message}\n\n${HELP}`);
  }
  if (args.help) return process.stdout.write(`${HELP}\n`);
  const positional = args._[0];
  if ([args.html, args.text, positional].filter(Boolean).length !== 1) fail(`Give exactly one of a file, --text, or --html.\n\n${HELP}`);
  const file = args.html || args.text || positional;
  const asHtml = Boolean(args.html) || (positional && /\.html?$/i.test(positional));
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch (error) {
    fail(`Cannot read ${file}: ${error.message}`);
  }
  if (raw.includes('\u0000')) fail(`${file} looks like a binary file, not text or HTML (it contains NUL bytes). Nothing was assessed.`);
  const result = assess({ mode: asHtml ? 'html' : 'text', raw, name: path.basename(file) });
  const out = args.json ? JSON.stringify(result, null, 2) : render(result);
  if (args.out) writeFile(args.out, `${out}\n`);
  else process.stdout.write(`${out}\n`);
}

if (require.main === module) main();

module.exports = { assess, render };
