'use strict';

// Extraction readiness: describe how well a page's statements stand on their own. It looks at
// self-containedness, specificity, supported claims, qualifications, and preserved context.
// It is optional page-quality evidence. It is not a priority score, not a prediction of whether any
// search or AI system will pick the page up, and not a measurement of visibility. Counts and quoted
// examples only; a person decides what to do about them.

const VAGUE = /\b(various|several|many|some|numerous|a lot of|etc\.?|and so on|easily|simply|just|quickly|seamless(?:ly)?|robust|powerful|best-in-class)\b/i;
const ANAPHORA = /^(this|that|these|those|it|they|such|the above|the following)\b/i;
const STAT = /(?:\b\d{1,3}(?:,\d{3})+\b|\b\d+(?:\.\d+)?\s?%|\b\d+x\b|\b\d+(?:\.\d+)?\s?(?:times|million|billion|thousand)\b)/i;
const STAT_CONTEXT = /\b(grew|growth|increase[sd]?|decrease[sd]?|faster|slower|users|customers|sales|revenue|market|reduce[sd]?|improve[sd]?|of (?:all|teams|sites))\b/i;
const SOURCED = /\b(according to|source:|per the|reported by|survey|study|benchmark|measured)\b/i;
const ABSOLUTE = /\b(always|never|guaranteed?|all (?:users|sites|cases)|every (?:user|site|case)|impossible|100%)\b/i;
const QUALIFIER = /\b(if|when|unless|only (?:on|in|for)|requires?|except|depending on|in version|on plan)\b/i;
const quote = (s) => s.replace(/\s+/g, ' ').trim().slice(0, 140);

function assessReadiness(page) {
  if (page.status !== undefined && page.status !== 200) return { path: page.path, status: 'not assessed', reason: 'page was not fetched (status ' + page.status + ')' };
  const texts = Array.isArray(page.blocks) ? page.blocks.filter((b) => b.type === 'p' || b.type === 'item') : [];
  if (!texts.length) return { path: page.path, status: 'not assessed', reason: page.status === 200 ? 'no paragraph structure available (text-only input, unsupported format, or an old pages.json)' : 'page was not fetched' };
  const linkCount = (page.links || []).length;
  const sents = texts.flatMap((b) => b.text.split(/(?<=[.!?])\s+/).filter((s) => s.length > 10));
  const ex = (re, pred = () => true) => sents.filter((s) => re.test(s) && pred(s));
  const dependent = sents.filter((s) => ANAPHORA.test(s));
  const vague = ex(VAGUE);
  const stats = ex(STAT, (s) => STAT_CONTEXT.test(s));
  const unsupportedStats = stats.filter((s) => !SOURCED.test(s) && linkCount === 0);
  const absolutes = ex(ABSOLUTE);
  const unqualified = absolutes.filter((s) => !QUALIFIER.test(s));
  const hasContextHeading = (page.headings || []).some((h) => h.level >= 2);
  const concrete = sents.filter((s) => /`|\b[a-z]+_[a-z]+\b|\b\d+\b|--[a-z]|\/[a-z]/i.test(s));
  return {
    path: page.path, status: 'assessed', purpose: 'optional page-quality evidence; not a priority score and not an AI-visibility measure',
    sentences: sents.length,
    selfContainedness: { dependsOnPriorContext: dependent.length, examples: dependent.slice(0, 3).map(quote), note: 'Sentences opening with "this", "it", "these", and similar words rely on text that may not travel with them.' },
    specificity: { concreteSentences: concrete.length, vagueSentences: vague.length, examples: vague.slice(0, 3).map(quote) },
    supportedClaims: { statisticClaims: stats.length, unsupported: unsupportedStats.length, examples: unsupportedStats.slice(0, 3).map(quote), note: 'A statistic with no source named and no link on the page. The claim may still be true.' },
    qualifications: { absoluteStatements: absolutes.length, withoutQualifier: unqualified.length, examples: unqualified.slice(0, 3).map(quote) },
    preservedContext: { hasSectionHeadings: hasContextHeading },
  };
}

module.exports = { assessReadiness };
