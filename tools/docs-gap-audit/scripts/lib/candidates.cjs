'use strict';

// Candidates: stable identity, provenance-preserving dedupe, and the separate evidence
// dimensions. Fields never collapse into one score:
//   evidence.posture            observed | reproduced | inferred | reported | disputed | unverified
//   assessment.status           assessed | not assessed | not applicable
//   sourceAvailability          available | unavailable | partial | restricted
//   claimVerification.result    not-run | confirmed | partial | not-found | overstated | unverified
//   coverage.rating             machine keyword heuristic (None, Mention, Partial, Dedicated)
//   human.verdict               filled only by a person, through the review record

const { shortId } = require('./hash.cjs');
const { termsFor } = require('./extractors/common.cjs');

const POSTURE_RANK = ['observed', 'reproduced', 'reported', 'inferred', 'unverified', 'disputed'];
const CONFIDENCE_RANK = { high: 3, medium: 2, low: 1 };
const STATUS_RANK = { planned: 0, limited: 1, shipped: 2 };

// Extractors that read prose (changelogs, release posts, planning docs, readme.txt changelogs) rather than code.
const isTextExtractor = (id) => /^doc-/.test(id) || id === 'wp-readme-changelog';

const normalizeName = (name) => String(name).toLowerCase().replace(/\s+/g, ' ').trim();
const candidateId = (areaId, name) => `c_${shortId(`${areaId || 'unscoped'}|${normalizeName(name)}`)}`;

// Merge repeated evidence for one name. Every provenance entry is kept. Status: shipped wins over
// planned (a later release post beats an old plan), but an explicit "flag, beta, or opt-in" statement
// in a changelog, release, or planning source keeps the status limited, and any disagreement is recorded.
function dedupe(items, { areaId } = {}) {
  const byName = new Map();
  for (const item of items) {
    const key = normalizeName(item.name);
    const prov = item.provenance ? [item.provenance] : [];
    const existing = byName.get(key);
    if (existing) {
      existing.sources.push(item.source);
      existing.provenance.push(...prov);
      existing.kinds = [...new Set([...existing.kinds, item.kind])];
      existing.statuses.push(item.status);
    } else {
      byName.set(key, {
        ...item, id: candidateId(areaId, item.name), area: areaId || null, sources: [item.source], provenance: [...prov], kinds: [item.kind], statuses: [item.status],
      });
    }
  }
  return [...byName.values()].map(resolve);
}

function resolve(c) {
  const distinct = [...new Set(c.statuses)];
  let status = distinct.reduce((best, s) => (STATUS_RANK[s] > STATUS_RANK[best] ? s : best), distinct[0]);
  const textLimited = c.provenance.some((p) => p.status === 'limited' && p.extractor && isTextExtractor(p.extractor.id));
  if (textLimited && status === 'shipped') status = 'limited';
  const postures = c.provenance.map((p) => p.posture).filter(Boolean);
  const posture = POSTURE_RANK.find((p) => postures.includes(p)) || 'unverified';
  const confidence = c.provenance.reduce((best, p) => (CONFIDENCE_RANK[p.confidence] > (CONFIDENCE_RANK[best] || 0) ? p.confidence : best), null) || 'low';
  const { statuses, ...rest } = c;
  return {
    ...rest,
    status,
    statusConflict: distinct.length > 1 ? distinct : null,
    terms: rest.terms || termsFor(rest.name),
    evidence: { posture, extractionConfidence: confidence, independentSources: new Set(c.provenance.map((p) => `${p.sourceId}:${p.file}`)).size },
    assessment: { status: 'not assessed', reason: 'coverage not evaluated yet' },
    sourceAvailability: 'available',
    claimVerification: { result: 'not-run', evidenceRef: null },
    human: { verdict: null, decisionId: null },
  };
}

module.exports = { dedupe, candidateId, normalizeName, POSTURE_RANK, resolve };
