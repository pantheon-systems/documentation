'use strict';

// Claim map. Pull atomic, testable claims out of published pages (versions, defaults, support and
// compatibility statements, limits, absolute behavior, named identifiers), then attach what is known
// about verification. Three things stay separate:
//   documented      the page says it. A documented claim is never evidence for itself.
//   source-attested an identifier is defined in the extracted source. It exists; it may not be consumed
//                   or behave as described. This is "partial", never "confirmed".
//   fired           someone executed it in a disposable environment and recorded the result.
// Code is read statically here. Nothing is run.

const { shortId } = require('./hash.cjs');

const PATTERNS = [
  ['version', /\b(?:requires?|supports?|compatible with|minimum|at least|since|from|up to|as of|version)\b[^.]{0,50}?\bv?\d+\.\d+(?:\.\d+)?\b/i],
  ['default', /\bdefaults? (?:to|is|are|value)\b/i],
  ['support', /\b(?:supports?|compatible with|works with|available (?:on|for|in))\b/i],
  ['limit', /\b(?:up to|at most|maximum of|no more than|limit of|limited to|within)\s+\d+/i],
  ['behavior', /\b(?:always|never|automatically|guarantees?|only|cannot|must not)\b/i],
  ['retention', /\b(?:for|within|after)\s+\d+\s+(?:days?|hours?|minutes?|weeks?)\b/i],
];
const RISKY = /\b(default|limit|retention|delete|deleted|destroy|overwrit|permission|security|token|password|billing|never|always|guarantee)/i;
const IDENT = [/\b[a-z][a-z0-9]*(?:_[a-z0-9]+)+\b/g, /(?<![\w-])--[a-z][\w-]*/g, /\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+){1,}\b/g];
const CONSUMER_WORDS = /\b(option|setting|flag|field|parameter|property|config(?:uration)?|variable)\b/i;
const LIST_AFTER = /\b(?:supports?|including|such as|works with|compatible with)\s+([^.]+)/i;

const sentences = (text) => text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 15 && s.length < 400);

function identifiersIn(text) {
  const out = new Set();
  for (const re of IDENT) for (const m of text.matchAll(re)) out.add(m[0]);
  return [...out];
}

function subclaimsOf(sentence) {
  const m = LIST_AFTER.exec(sentence);
  if (!m) return [];
  const items = m[1].split(/,\s*|\s+(?:and|or)\s+/).map((x) => x.replace(/^(?:and|or)\s+/i, '').trim()).filter((x) => x && x.length < 40);
  return items.length >= 2 ? items : [];
}

// pages: published page records (with blocks or text). Returns claims in page order.
function extractClaims(pages) {
  const claims = [];
  for (const page of pages) {
    if (page.status !== 200) continue;
    const texts = Array.isArray(page.blocks) ? page.blocks.filter((b) => b.type === 'p' || b.type === 'item').map((b) => b.text) : (page.text || '').split('\n');
    const seen = new Set();
    for (const t of texts) {
      for (const sent of sentences(t)) {
        const types = PATTERNS.filter(([, re]) => re.test(sent)).map(([k]) => k);
        const ids = identifiersIn(sent);
        if (!types.length && !ids.length) continue;
        const key = sent.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        const subs = subclaimsOf(sent);
        claims.push({
          id: `cl_${shortId(`${page.path}|${key}`)}`, page: page.path, text: sent.slice(0, 300), types: types.length ? types : ['identifier'],
          identifiers: ids, subclaims: subs, risk: RISKY.test(sent) ? 'high' : 'normal',
          needsConsumerCheck: CONSUMER_WORDS.test(sent) && ids.length > 0,
          posture: 'reported', selfEvidence: false,
          verification: { result: 'not-run', method: null, label: 'documented only' },
        });
      }
    }
  }
  return claims;
}

const CODE_EXTRACTORS = /^(code|repo|wp)-/;

// Attach static source evidence for identifiers, and recorded verification results from accuracy signals.
function attachEvidence(claims, candidates, signals) {
  const index = new Map();
  for (const c of candidates) {
    const codeProv = c.provenance.filter((p) => p.extractor && CODE_EXTRACTORS.test(p.extractor.id) && p.extractor.id !== 'wp-readme-changelog');
    if (!codeProv.length) continue;
    for (const key of [c.name, ...(c.terms || [])]) index.set(String(key).toLowerCase(), { id: c.id, name: c.name, kinds: c.kinds, where: codeProv.slice(0, 2).map((p) => `${p.file}:${p.line}`) });
  }
  const acc = signals && signals.accuracy && signals.accuracy.status === 'assessed' ? signals.accuracy : null;
  const recorded = acc ? acc.items || [] : [];
  return claims.map((cl) => {
    const found = cl.identifiers.map((id) => ({ id, hit: index.get(id.toLowerCase()) || null }));
    const defined = found.filter((f) => f.hit);
    const missing = found.filter((f) => !f.hit);
    let verification = cl.verification;
    const notes = [];
    if (defined.length) {
      verification = { result: 'partial', method: 'static', label: 'source-attested: the identifier is defined in the extracted source; consumption and behavior were not checked', sources: defined.map((f) => ({ identifier: f.id, candidate: f.hit.id, where: f.hit.where })) };
    }
    if (missing.length && cl.identifiers.length) notes.push(`not found in the extracted source: ${missing.map((m) => m.id).join(', ')} (bounded by the sources supplied; not proof it does not exist)`);
    if (cl.needsConsumerCheck && !defined.length) notes.push('names an option or setting: a declaration is not proof code reads it, so find the reader before relying on this claim');
    const rec = recorded.find((r) => r.page === cl.page && claimMatches(cl.text, r.claim));
    if (rec) {
      verification = { result: rec.result, method: rec.method, label: rec.method === 'executed' ? 'fired' : rec.method === 'static' ? 'source-attested' : 'reported', by: rec.verifiedBy || null, date: rec.date || null, recordId: rec.id };
    }
    return { ...cl, verification, notes };
  });
}

// A recorded claim matches a page claim only when it is a substantial excerpt of it (at least 12 characters, or the whole
// claim), so a one-letter record cannot confirm everything on a page.
function claimMatches(claimText, recorded) {
  const a = String(claimText || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const b = String(recorded || '').toLowerCase().replace(/\s+/g, ' ').trim();
  if (!b) return false;
  if (a === b) return true;
  return b.length >= 12 && a.includes(b.slice(0, 60));
}

function summarizeClaims(claims) {
  const by = (f) => claims.reduce((o, c) => { const k = f(c); o[k] = (o[k] || 0) + 1; return o; }, {});
  return {
    total: claims.length, highRisk: claims.filter((c) => c.risk === 'high').length,
    byResult: by((c) => c.verification.result), byMethodLabel: by((c) => c.verification.label.split(':')[0]),
    highRiskUnverified: claims.filter((c) => c.risk === 'high' && ['not-run', 'unverified'].includes(c.verification.result)).length,
    note: 'Documented claims are not evidence for themselves. "source-attested" means defined in source, not tested. Only "fired" means someone ran it.',
  };
}

// After one claim fails verification, find claims elsewhere with the same shape: the same sentence template
// (identifiers, numbers, and versions replaced by placeholders) or a shared identifier. A false claim often has
// siblings. Siblings are leads to check, not findings: a similar sentence can be true.
const template = (text) => text.toLowerCase().replace(/\b[a-z][a-z0-9]*(?:_[a-z0-9]+)+\b|--[a-z][\w-]*|\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+\b/g, '<id>').replace(/\bv?\d+(?:\.\d+)*\b/g, '<n>').replace(/\s+/g, ' ').trim();

function siblingsOf(claim, claims) {
  const tpl = template(claim.text);
  return claims
    .filter((c) => c.id !== claim.id && (template(c.text) === tpl || c.identifiers.some((i) => claim.identifiers.includes(i))))
    .map((c) => ({ id: c.id, page: c.page, text: c.text, sharedBy: template(c.text) === tpl ? 'same sentence template' : 'shared identifier' }));
}

module.exports = { extractClaims, attachEvidence, summarizeClaims, identifiersIn, siblingsOf, template, claimMatches };
