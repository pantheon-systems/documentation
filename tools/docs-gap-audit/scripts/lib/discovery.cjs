'use strict';

// Discovery as a library: run the extractor registry over each source, merge repeated evidence,
// and compare each candidate with the published pages. Pages passed in decide what counts as
// "published": the audit runner passes only pages inside the profile's evidence scope.

const { extractSource } = require('./extract.cjs');
const { dedupe } = require('./candidates.cjs');
const { evaluate } = require('../coverage.cjs');
const { expandTerms } = require('./profile.cjs');
const { loadVocab } = require('./vocab.cjs');

const ORDER = { None: 0, Mention: 1, Partial: 2, Dedicated: 3 };

function rate(candidate, pages, profile) {
  const terms = profile ? expandTerms(profile, candidate.terms) : candidate.terms;
  const assessed = Array.isArray(pages) && pages.some((p) => p.status === 200);
  if (!assessed) {
    return {
      ...candidate, suggested: null, pages: 0, mentions: 0, best: [],
      coverage: { rating: 'not assessed', heuristic: 'keyword', pagesMatched: 0, mentions: 0, best: [] },
      assessment: { status: 'not assessed', reason: 'no published pages were available to compare with' },
    };
  }
  const r = evaluate({ name: candidate.name, status: candidate.status, terms }, pages);
  const best = r.best.map((b) => ({ ...b, area: profile ? undefined : undefined }));
  return {
    ...candidate, terms, suggested: r.suggested, pages: r.pages, mentions: r.mentions, best,
    coverage: { rating: r.suggested, heuristic: 'keyword', pagesMatched: r.pages, mentions: r.mentions, best },
    assessment: { status: 'assessed', reason: 'keyword match against the supplied published pages; a rating is a lead, not a verdict' },
  };
}

function discover({ sources, pages, areaId, profile, options = {}, vocab, permittedRoots }) {
  const v = vocab || loadVocab(profile && profile.vocabulary && profile.vocabulary.extraction);
  const all = [];
  const counts = {};
  const limitations = [];
  const failures = [];
  const perSource = [];
  for (const s of sources) {
    const r = extractSource({ id: s.id, kind: s.kind, root: s.path, options, vocab: v, permittedRoots });
    counts[s.kind === 'releases' ? 'releases' : s.kind] = (counts[s.kind === 'releases' ? 'releases' : s.kind] || 0) + r.candidates.length;
    all.push(...r.candidates);
    limitations.push(...r.limitations.map((l) => ({ ...l, sourceId: s.id || s.kind })));
    failures.push(...r.failures);
    perSource.push({ id: s.id || s.kind, kind: s.kind, files: r.stats.files, candidates: r.candidates.length, byExtractor: r.stats.byExtractor });
  }
  const results = dedupe(all, { areaId })
    .map((c) => rate(c, pages, profile))
    .sort((a, b) => (ORDER[a.suggested] ?? -1) - (ORDER[b.suggested] ?? -1) || b.sources.length - a.sources.length || a.name.localeCompare(b.name));
  return { candidates: results, counts, limitations, failures, perSource, vocabVersion: v.version };
}

module.exports = { discover, rate, ORDER };
