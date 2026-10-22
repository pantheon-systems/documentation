'use strict';

// Recommendations: evidence-backed leads, never verdicts. Each one names a reader, a task, an action,
// the evidence behind it, what is unknown, a closure test, and a next validation step.
//
// Gates that keep leads honest:
//  - create needs a named unmet reader need, supporting evidence, a bounded search of existing
//    coverage, and release evidence that the feature is public. Without them it is an investigation lead.
//  - a feature that exists but is hard to find is a discoverability lead, not a create lead.
//  - a feature that is planned, flagged, or beta without public evidence is "no action yet: create after it ships".
//  - sufficient existing coverage is recorded as an explicit no-action decision.
//  - a product defect is kept apart from any documentation remedy.
//  - unknown evidence stays unknown; no precise scores or effort estimates are invented.
//  - the machine rating, the proposed judgment, and the human verdict are three separate fields.

const { shortId, hashObject } = require('./hash.cjs');
const { STAGES } = require('./profile.cjs');
const { expandTerms } = require('./profile.cjs');
const { siblingsOf } = require('./claims.cjs');

const STAGE_RANK = Object.fromEntries(STAGES.map((s, i) => [s, i]));
const TIERS = ['P1', 'P2', 'P3', 'P4'];
const HIGH_RISK = new Set(['destructive', 'security', 'auth', 'privacy', 'backup', 'rollback', 'recovery']);

const PRIORITY_RUBRIC = {
  tiers: {
    P1: 'public release AND a required task AND (the first unmet funnel stage OR high operational risk) AND (repeated demand OR a blocked walkthrough)',
    P2: 'public release AND a required task AND (some demand OR high operational risk OR the first unmet funnel stage)',
    P3: 'public release AND a required task, on coverage evidence alone',
    P4: 'an optional task, or public with no supporting evidence beyond the declared task',
    unprioritized: 'investigation leads and not-yet-public features: no tier until the missing evidence arrives',
  },
  factors: ['release availability (public, not public, unknown)', 'whether the task is required', 'funnel stage (earlier stages first)', 'demand band', 'operational risk', 'walkthrough result'],
  demandBands: 'repeated = 3 or more unique threads; some = 1 or 2; none = 0; unknown = demand not assessed. Bands are a convention: change them in the profile (priority.demandBands) if your volume differs.',
  tieBreak: ['tier', 'earlier funnel stage', 'high risk before no risk', 'more unique demand threads', 'more independent evidence items', 'recommendation id (so ordering is stable)'],
  unknown: 'A factor with no evidence is listed as unknown in the rationale and never counts as low or zero.',
};

const { claimMatches } = require('./claims.cjs');

function bandOf(demand, bands = { repeated: 3 }) {
  if (!demand) return 'unknown';
  if (demand.uniqueThreads >= bands.repeated) return 'repeated';
  return demand.uniqueThreads >= 1 ? 'some' : 'none';
}

function relatedCandidates(task, candidates, profile) {
  const terms = expandTerms(profile, task.terms).map((t) => t.toLowerCase());
  return candidates.filter((c) => {
    const hay = [c.name, ...(c.terms || [])].map((x) => String(x).toLowerCase());
    const word = (needle, text) => new RegExp(`(^|[^a-z0-9])${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9]|$)`).test(text);
    return terms.some((t) => hay.some((h) => h === t || word(t, h) || (h.length > 3 && word(h, t))));
  });
}

function releaseView(related, signals, profile, task) {
  const assessed = signals.release && signals.release.status === 'assessed';
  // A release item that names this task is authored evidence about the task itself; it outranks keyword matches to source candidates.
  const direct = assessed && task && signals.release.summary.byTask ? signals.release.summary.byTask[task.id] : null;
  if (direct && direct.length) {
    const publicGa = direct.filter((r) => r.status === 'ga' && r.publicEvidence);
    const other = direct.filter((r) => !(r.status === 'ga' && r.publicEvidence));
    if (!other.length) return { state: 'public', basis: 'release signal naming this task, with public evidence', contradictions: [] };
    if (publicGa.length) return { state: 'not public', basis: `release signal naming this task disagrees across items (${direct.map((r) => r.status).join(', ')}); treated as not public until resolved`, contradictions: [`release items for this task disagree: ${direct.map((r) => r.status).join(' vs ')}`] };
    return { state: 'not public', basis: `release signal naming this task says ${direct.map((r) => (r.status === 'ga' ? 'ga without public evidence' : r.status)).join(', ')}`, contradictions: [] };
  }
  const items = assessed ? signals.release.summary.byFeature : {};
  const fromSignal = related.map((c) => items[c.name.toLowerCase()] || (c.terms || []).map((t) => items[String(t).toLowerCase()]).find(Boolean)).filter(Boolean);
  if (fromSignal.length) {
    const publicGa = fromSignal.filter((r) => r.status === 'ga' && r.publicEvidence);
    const notPublic = fromSignal.filter((r) => ['beta', 'flagged', 'planned', 'deprecated', 'removed'].includes(r.status));
    // Related items disagree: a planned or beta item tied to the task blocks a "public" verdict, and the conflict is recorded.
    if (publicGa.length && notPublic.length) {
      return { state: 'not public', basis: `release signal disagrees across related items (${fromSignal.map((r) => r.status).join(', ')}); treated as not public until resolved`, contradictions: [`related release items disagree: ${fromSignal.map((r) => r.status).join(' vs ')}`] };
    }
    if (publicGa.length) return { state: 'public', basis: 'release signal with public evidence', contradictions: [] };
    if (notPublic.length) return { state: 'not public', basis: `release signal says ${fromSignal.map((r) => r.status).join(', ')}`, contradictions: [] };
  }
  if (!related.length) return { state: 'unknown', basis: 'no source candidate maps to this task', contradictions: [] };
  const statuses = [...new Set(related.map((c) => c.status))];
  const contradictions = related.filter((c) => c.statusConflict).map((c) => `${c.name}: sources disagree (${c.statusConflict.join(' vs ')})`);
  if (statuses.every((s) => s === 'shipped') && !profile.release.publicEvidenceRequired) return { state: 'public', basis: 'changelog or code says shipped', contradictions };
  if (statuses.some((s) => s === 'planned' || s === 'limited')) return { state: 'not public', basis: `source text says ${statuses.filter((s) => s !== 'shipped').join(', ')}`, contradictions };
  // Shipped in source but no public evidence: with publicEvidenceRequired, that is unknown, not public.
  return { state: 'unknown', basis: 'source says shipped, but no public release evidence was supplied (profile requires it)', contradictions };
}

function confidenceOf(evidence, boundaryComplete) {
  const kinds = new Set(evidence.map((e) => e.kind));
  if (kinds.size >= 2 && boundaryComplete) return 'high';
  if (kinds.size >= 1) return 'medium';
  return 'low';
}

const CLOSURE = {
  create: (t, type, aud) => `A published ${type} page in the evidence scope lets someone in the "${aud || 'target'}" audience complete "${t}" without the author's help, shown by a recorded walkthrough on a named version; re-running the matrix marks the task covered; every claim in the page has a recorded verification (static or executed, labeled).`,
  update: (t) => `The existing page serves "${t}": the gap named in this lead is closed, the walkthrough passes, and the claims that were stale or unverified have dated verification records.`,
  'improve-discoverability': (t) => `A reader following the published entry points reaches the page for "${t}"; at least one in-area page links to it; search for the task terms returns it. Check the no-result queries again after the change.`,
  consolidate: () => 'One page is the authority; the others redirect to it (redirects verified) and no conflicting claim remains.',
  validate: () => 'Each listed claim has a verification record with method, person, date, and version, or is recorded as unverifiable with the reason.',
  'no-action': () => 'Re-review only if the supporting evidence changes; the decision records the evidence hash it rests on.',
  investigate: () => 'The missing evidence is retrieved or ruled out, and the lead is re-run: it becomes create, update, discoverability, or no action.',
  'product-issue': () => 'The product behavior is fixed or documented as intended by the product team; any documentation workaround is a separate lead.',
};

function nextValidation(action, ctx) {
  if (action === 'create') return `Confirm with someone in the "${ctx.audience || 'target'}" audience that the need is real, then draft from the sources listed in the brief and verify its claims.`;
  if (action === 'update') return 'Read the existing page against the authoritative source and record what is wrong or missing.';
  if (action === 'improve-discoverability') return 'Walk the path a reader would take from the area index to the page, and check what the no-result searches were looking for.';
  if (action === 'investigate') return ctx.missing.length ? `Retrieve: ${ctx.missing.join('; ')}.` : 'Run a walkthrough of the task to see whether readers can complete it.';
  if (action === 'validate') return 'Verify each claim by reading its source, then by executing it in a disposable environment where that is safe.';
  if (action === 'consolidate') return 'Decide which page is authoritative, then list redirects.';
  if (action === 'no-action') return 'None needed unless evidence changes.';
  return 'Review with the product team.';
}

function build({ profile, matrix, candidates, signals, health, claims, classifications, decisions = [], inventory, signalsMeta }) {
  const out = [];
  const areaId = profile.area.id;
  const boundaryComplete = Boolean(inventory && inventory.complete);
  const notAssessed = Object.values(signals).filter((s) => s.status === 'not assessed').map((s) => s.dimension);
  const demandByTask = signals.demand && signals.demand.status === 'assessed' ? signals.demand.summary.byTask : {};
  const walk = signals.tasks && signals.tasks.status === 'assessed' ? signals.tasks.summary.byTask : {};
  const riskByTask = signals.risk && signals.risk.status === 'assessed' ? signals.risk.summary.byTask : {};
  const firstUnmetStage = (matrix.bottleneck && matrix.bottleneck.stage) || null;
  const bands = (profile.priority && profile.priority.demandBands) || undefined;

  const make = (partial) => {
    const id = `r_${shortId(`${areaId}|${partial.action}|${partial.task || partial.page || partial.kind}`)}`;
    const base = {
      id, area: areaId, owner: profile.area.owner || null, searchBoundary: null, unavailableEvidence: [], contradictions: [], freshness: null,
      effort: partial.effortHint ? `${partial.effortHint} (from the profile; not an estimate by this toolkit)` : 'not estimated',
      ...partial,
    };
    base.closureTest = (CLOSURE[base.action] || CLOSURE.investigate)(base.taskTitle || base.page || '', base.docType, base.audience);
    base.nextValidation = nextValidation(base.action, { audience: base.audience, missing: base.unavailableEvidence.map((u) => u.request || u.dimension) });
    base.machine = { rating: base.machineRating || null, heuristic: 'keyword', note: 'a lead, not a verdict' };
    base.proposedJudgment = { text: base.proposed, by: 'toolkit rules; review before use' };
    base.human = { verdict: null, decisionId: null };
    base.evidenceHash = hashObject({ action: base.action, evidence: base.evidence.map((e) => ({ k: e.kind, r: e.ref, h: e.hash || null })), status: base.coverageStatus || null, release: base.release && base.release.state });
    delete base.machineRating;
    delete base.proposed;
    return base;
  };

  for (const t of matrix.tasks) {
    const task = profile.tasks.find((x) => x.id === t.task);
    if (t.status === 'not applicable') continue;
    const related = relatedCandidates(task, candidates, profile);
    const release = releaseView(related, signals, profile, task);
    const demand = demandByTask[t.task] || null;
    const band = bandOf(demand, bands);
    const risks = (riskByTask[t.task] || []);
    const highRisk = risks.some((r) => HIGH_RISK.has(r.category));
    const walkResults = walk[t.task] || [];
    const blocked = walkResults.some((w) => w.result === 'blocked');
    const machineRating = related.length ? related.map((c) => c.coverage && c.coverage.rating).sort().reverse()[0] : null;
    const evidence = [];
    if (demand) evidence.push({ kind: 'demand', ref: `signals/demand:${t.task}`, posture: 'reported', summary: `${demand.items} items in ${demand.uniqueThreads} unique threads, requesters ${demand.uniqueRequesters === null ? 'unknown' : demand.uniqueRequesters}, ${demand.firstSeen} to ${demand.lastSeen}`, hash: signals.demand.source.sha256 });
    for (const c of related.slice(0, 5)) evidence.push({ kind: 'source', ref: c.id, posture: c.evidence.posture, summary: `${c.name} (${c.kinds.join(', ')}; ${c.status})`, where: c.sources.slice(0, 2) });
    if (blocked) evidence.push({ kind: 'walkthrough', ref: `signals/tasks:${t.task}`, posture: 'observed', summary: walkResults.filter((w) => w.result === 'blocked').map((w) => `blocked at ${w.blockedAt || 'unknown step'} (${w.performedBy}, ${w.date})`).join('; '), hash: signals.tasks.source.sha256 });
    for (const r of risks.slice(0, 3)) evidence.push({ kind: 'risk', ref: r.id, posture: 'reported', summary: r.category, publicSafe: r.publicSafe });
    const existing = t.matched.map((m) => ({ path: m.path, scope: m.scope, strength: m.strength, pageType: m.pageType })).slice(0, 6);
    const common = {
      task: t.task, taskTitle: t.title, audience: t.audience, stage: t.stage, required: t.required, coverageStatus: t.status, existingDocs: existing,
      machineRating, release, demandSummary: demand ? { ...demand, band } : { band: 'unknown' }, risk: risks.map((r) => r.category), evidence,
      searchBoundary: t.boundary, freshness: demand ? { demandLastSeen: demand.lastSeen, demandRetrievedAt: signals.demand.source.retrievedAt } : null,
      contradictions: release.contradictions,
      unavailableEvidence: notAssessed.filter((d) => ['demand', 'search', 'tasks', 'release'].includes(d)).map((d) => ({ dimension: d, request: signals[d].retrievalRequest })),
      docType: (t.expectedTypes || [])[0] || 'how-to', effortHint: task.effortHint || null,
    };
    const tierOf = () => {
      const stageIsFirst = firstUnmetStage === t.stage;
      const factors = { release: release.state, required: t.required, stage: t.stage, demand: band, risk: highRisk ? 'high' : risks.length ? 'present' : 'unknown', walkthrough: blocked ? 'blocked' : walkResults.length ? 'passed' : 'unknown' };
      let tier = null;
      if (release.state === 'public' && t.required) {
        if ((stageIsFirst || highRisk) && (band === 'repeated' || blocked)) tier = 'P1';
        else if (band === 'repeated' || band === 'some' || highRisk || stageIsFirst) tier = 'P2';
        else tier = 'P3';
      } else if (release.state === 'public') tier = 'P4';
      const unknown = Object.entries(factors).filter(([, v]) => v === 'unknown').map(([k]) => k);
      return { tier, factors, rationale: `${tier ? `tier ${tier}` : 'no tier'}: release ${release.state}${t.required ? ', required task' : ', optional task'}, stage ${t.stage}${stageIsFirst ? ' (first unmet)' : ''}, demand ${band}, risk ${factors.risk}, walkthrough ${factors.walkthrough}${unknown.length ? `. Unknown, not counted as low: ${unknown.join(', ')}` : ''}` };
    };

    if (t.status === 'not assessed') continue;
    if (t.status === 'covered') {
      const d = t.discoverability;
      const hard = d && (d.orphan || d.inboundPages === 0 || d.searchNoResults > 0);
      if (hard) {
        out.push(make({
          ...common, action: 'improve-discoverability', docType: null, priority: tierOf(),
          why: `A page covers "${t.title}" (${d.page}) but readers may not find it: ${[d.orphan ? 'no navigation entry and no inbound link (orphan)' : null, !d.orphan && d.inboundPages === 0 ? 'no inbound links from other pages' : null, d.searchNoResults > 0 ? `${d.searchNoResults} no-result searches match the task terms` : null, !d.titleHasTerm ? 'its title does not use the task words' : null].filter(Boolean).join('; ')}.`,
          proposed: `Improve discoverability of ${d.page}: add it to the area's navigation or link it from the pages readers use for this task${!d.titleHasTerm ? ', and use the task words in its title or headings' : ''}. Do not write a new page.`,
          evidence: [...evidence, { kind: 'inventory', ref: d.page, posture: 'observed', summary: `inbound pages ${d.inboundPages}, orphan ${d.orphan}, depth ${d.depth}` }],
          confidence: confidenceOf([{ kind: 'inventory' }, ...evidence], boundaryComplete),
        }));
      } else {
        out.push(make({
          ...common, action: 'no-action', docType: null, priority: { tier: null, rationale: 'covered, no action to prioritize', factors: {} },
          why: `A page of the expected type serves "${t.title}" (${(t.cells.find((c) => c.status === 'covered') || { pages: [] }).pages.join(', ') || existing.map((e) => e.path).join(', ')}) and no discoverability signal says otherwise.`,
          proposed: 'No action: existing coverage serves this reader need. Re-review if evidence changes.', evidence: [{ kind: 'coverage', ref: t.task, posture: 'observed', summary: `matrix status covered across ${t.matched.length} matching page(s)` }],
          confidence: confidenceOf([{ kind: 'coverage' }], boundaryComplete),
        }));
      }
      continue;
    }
    // Not covered. Decide between create, update, not-due, and investigate.
    const hasEvidence = evidence.length > 0;
    const searched = t.boundary && t.boundary.pagesExamined > 0;
    if (release.state === 'not public') {
      out.push(make({
        ...common, action: 'no-action', docType: null, createAfterShip: true, priority: { tier: null, rationale: `not due: ${release.basis}`, factors: { release: release.state } },
        why: `"${t.title}" depends on a feature that is not public yet (${release.basis}). An internal plan or flag is not public availability.`,
        proposed: 'No action yet. Create the documentation after the feature ships and public release evidence exists.', evidence: hasEvidence ? evidence : [{ kind: 'source', ref: t.task, posture: 'reported', summary: release.basis }],
        confidence: 'medium',
      }));
      continue;
    }
    // create states an absence ("no task page exists"), so it needs a complete inventory to stand on.
    if (hasEvidence && searched && boundaryComplete && release.state === 'public' && t.status !== 'partial') {
      out.push(make({
        ...common, action: 'create', priority: tierOf(),
        why: `Readers in the "${t.audience || 'target'}" audience cannot complete "${t.title}" from the published pages: ${t.status === 'mention-only' ? 'the pages that mention it are not task pages with steps (a mention does not document a task)' : `no matching page was found among ${t.boundary.pagesExamined} examined${boundaryComplete ? '' : ' (inventory incomplete)'}`}.`,
        proposed: `Draft a ${(t.expectedTypes || ['how-to'])[0]} for "${t.title}". Draft a brief first; do not write the page until the need is confirmed.`,
        confidence: confidenceOf(evidence, boundaryComplete), briefEligible: true,
      }));
      continue;
    }
    if (t.status === 'partial' && hasEvidence && release.state === 'public') {
      out.push(make({
        ...common, action: 'update', priority: tierOf(),
        why: `A page touches "${t.title}" but only partly serves it (${t.cells.map((c) => `${c.type}: ${c.status}`).join('; ')}).`,
        proposed: `Update ${existing[0] ? existing[0].path : 'the matching page'} so it serves "${t.title}" with steps, prerequisites, and verification.`, confidence: confidenceOf(evidence, boundaryComplete), briefEligible: true,
      }));
      continue;
    }
    // Everything else: an investigation lead, not an absence claim.
    const why = [];
    if (!hasEvidence) why.push('no demand, source, walkthrough, or risk evidence is tied to this task');
    if (!searched) why.push('no published pages were available to search');
    if (release.state !== 'public') why.push(`release state is ${release.state} (${release.basis})`);
    if (!boundaryComplete) why.push('the page inventory is incomplete');
    out.push(make({
      ...common, action: 'investigate', docType: null, priority: { tier: null, rationale: `unprioritized: ${why.join('; ')}`, factors: {} },
      why: `The matrix shows "${t.title}" as ${t.status}, but the evidence is not enough to call it a gap: ${why.join('; ')}.`,
      proposed: 'Treat as an investigation lead, not an absence claim. Gather the missing evidence, then re-run.', evidence, confidence: 'low',
    }));
  }

  // Accuracy: stale or failing claims become update leads; product defects stay separate.
  const accItems = signals.accuracy && signals.accuracy.status === 'assessed' ? signals.accuracy.items : [];
  const badByPage = new Map();
  for (const it of accItems) {
    if (it.productDefect) continue;
    if (['not-found', 'overstated', 'failed'].includes(it.result)) badByPage.set(it.page, [...(badByPage.get(it.page) || []), it]);
  }
  for (const [page, items] of badByPage) {
    out.push(make({
      kind: 'accuracy', page, action: 'update', docType: null, audience: null, taskTitle: null, priority: { tier: null, rationale: 'accuracy lead: fix before adding content', factors: {} },
      why: `${items.length} recorded claim(s) on ${page} failed verification (${items.map((i) => i.result).join(', ')}).`, proposed: `Correct ${page} against the verified behavior; keep the product question, if any, in a separate lead.`,
      evidence: [
        ...items.map((i) => ({ kind: 'accuracy', ref: i.id, posture: i.method === 'executed' ? 'reproduced' : 'observed', summary: `${i.kind}: ${i.result} (${i.method})`, hash: signals.accuracy.source.sha256 })),
        ...items.flatMap((i) => {
          const cl = claims.find((c) => c.page === page && claimMatches(c.text, i.claim));
          const sib = cl ? siblingsOf(cl, claims) : [];
          return sib.length ? [{ kind: 'pattern', ref: `siblings-of:${cl.id}`, posture: 'inferred', summary: `${sib.length} claim(s) elsewhere share this claim's shape (${[...new Set(sib.map((x) => x.page))].slice(0, 4).join(', ')}); leads to check, not findings` }] : [];
        }),
      ],
      confidence: items.some((i) => i.method === 'executed') ? 'high' : 'medium', existingDocs: [{ path: page }],
    }));
  }
  for (const it of accItems.filter((i) => i.productDefect)) {
    out.push(make({
      kind: 'product', page: it.page, action: 'product-issue', docType: null, audience: null, taskTitle: null, priority: { tier: null, rationale: 'product issue: not a documentation priority', factors: {} },
      why: `The documented behavior and the product disagree on ${it.page}: ${it.claim}. This is a product question; a documentation workaround would be a separate lead.`, proposed: 'Route to the product team. Do not rewrite the docs to match a defect.',
      evidence: [{ kind: 'accuracy', ref: it.id, posture: it.method === 'executed' ? 'reproduced' : 'observed', summary: `${it.kind}: ${it.result}`, hash: signals.accuracy.source.sha256 }], confidence: 'medium', existingDocs: [{ path: it.page }],
    }));
  }

  // Governance: duplicates and conflicting dates.
  const gov = health && health.governance;
  for (const d of (gov && gov.duplicateTitles) || []) {
    out.push(make({
      kind: 'governance', page: d.paths.join(','), action: 'consolidate', docType: null, audience: null, taskTitle: null, priority: { tier: null, rationale: 'governance lead', factors: {} },
      why: `${d.paths.length} pages share the title "${d.title}" (${d.paths.join(', ')}). Duplicate titles can mean duplicate or conflicting content, or just poor titles.`, proposed: 'Read the pages. Merge if they overlap; retitle if they do not.',
      evidence: [{ kind: 'inventory', ref: d.paths[0], posture: 'observed', summary: 'same title on multiple pages' }], confidence: boundaryComplete ? 'medium' : 'low', existingDocs: d.paths.map((p) => ({ path: p })),
      searchBoundary: { inventoryComplete: boundaryComplete, pagesExamined: matrix.boundary.pagesExamined },
    }));
  }
  for (const c of (gov && gov.dateConflicts) || []) {
    out.push(make({
      kind: 'governance', page: c.path, action: 'validate', docType: null, audience: null, taskTitle: null, priority: { tier: null, rationale: 'governance lead', factors: {} },
      why: `${c.path} shows ${c.visible} to readers but its embedded date says ${c.embedded}. A current timestamp is not proof of current content, and neither date is proof here.`, proposed: 'Read the page against the product and decide which date, if either, is true.',
      evidence: [{ kind: 'inventory', ref: c.path, posture: 'observed', summary: `visible ${c.visible}, embedded ${c.embedded}` }], confidence: 'medium', existingDocs: [{ path: c.path }],
    }));
  }

  // High-risk claims that nothing has verified.
  const risky = claims.filter((c) => c.risk === 'high' && ['not-run', 'unverified'].includes(c.verification.result));
  const byPage = new Map();
  for (const c of risky) byPage.set(c.page, [...(byPage.get(c.page) || []), c]);
  for (const [page, list] of byPage) {
    out.push(make({
      kind: 'claims', page, action: 'validate', docType: null, audience: null, taskTitle: null, priority: { tier: null, rationale: 'validation lead', factors: {} },
      why: `${list.length} high-risk claim(s) on ${page} (defaults, limits, retention, permissions, absolutes) have no verification record.`, proposed: 'Verify each claim by reading its authoritative source, then by executing it in a disposable environment where that is safe.',
      evidence: list.slice(0, 5).map((c) => ({ kind: 'claim', ref: c.id, posture: 'reported', summary: c.text.slice(0, 120) })), confidence: 'medium', existingDocs: [{ path: page }], claimIds: list.map((c) => c.id),
    }));
  }

  // Apply human decisions: a decision whose evidence hash still matches keeps its verdict; a changed hash flags re-review.
  const latest = new Map();
  for (const d of decisions) if (d.kind === 'recommendation') latest.set(d.target, d);
  for (const r of out) {
    const d = latest.get(r.id);
    if (!d) continue;
    r.human = { verdict: d.verdict, decisionId: d.id, decidedAt: d.at, decidedBy: d.by || null, needsReReview: d.evidenceHash !== r.evidenceHash, resolvedVerified: d.verdict === 'resolved' ? Boolean(d.closure && d.closure.verifiedBy) : null };
  }

  const order = (r) => [r.priority && r.priority.tier ? TIERS.indexOf(r.priority.tier) : 9, STAGE_RANK[r.stage] ?? 9, r.risk && r.risk.some((x) => HIGH_RISK.has(x)) ? 0 : 1, -((r.demandSummary && r.demandSummary.uniqueThreads) || 0), -r.evidence.length];
  out.sort((a, b) => {
    const x = order(a);
    const y = order(b);
    for (let i = 0; i < x.length; i += 1) if (x[i] !== y[i]) return x[i] - y[i];
    return a.id.localeCompare(b.id);
  });
  return out;
}

// A draft content brief for a create or update lead. It is not documentation and files no ticket.
function briefFor(rec, profile) {
  const privateSources = rec.evidence.filter((e) => e.kind === 'risk' && e.publicSafe === false);
  const sources = rec.evidence.filter((e) => e.kind === 'source').flatMap((e) => (e.where || []).map((w) => `${w} (${e.summary})`));
  const order = profile.authority.order;
  const lines = [
    `# Draft content brief: ${rec.taskTitle || rec.page}`, '',
    '> Draft brief only. It is not documentation, and no ticket has been filed. A person confirms the need, the scope, and the sources before anything is written.', '',
    `- Recommendation: ${rec.id} (${rec.action}, ${rec.priority && rec.priority.tier ? rec.priority.tier : 'no tier'})`, `- Area: ${rec.area}${rec.owner ? ` (owner from profile: ${rec.owner})` : ''}`, `- Audience: ${rec.audience || 'not specified'}`, `- Proposed type: ${rec.docType || 'not specified'}`, '',
    '## User outcome', '', `A reader in the "${rec.audience || 'target'}" audience can ${(rec.taskTitle || '').replace(/^./, (c) => c.toLowerCase())}.`, '',
    '## Scope', '', rec.action === 'update' ? `Update ${(rec.existingDocs[0] || {}).path || 'the existing page'}. Existing relevant pages: ${rec.existingDocs.map((d) => `${d.path} (${d.pageType || 'type unknown'}, ${d.scope})`).join('; ') || 'none'}.` : `New page. Related existing pages (do not duplicate): ${rec.existingDocs.map((d) => `${d.path} (${d.pageType || 'type unknown'}, ${d.scope})`).join('; ') || 'none found within the search boundary'}.`, '',
    '## Prerequisites to state', '', ...(profile.environments.supported.length ? [`- Supported versions or environments from the profile: ${profile.environments.supported.join(', ')}`] : ['- Not specified in the profile: confirm supported versions and environments']), '- Account, role, or permissions the task needs: confirm with the product team', '',
    '## Authoritative sources needed', '', `Authority order from the profile: ${order.join(' > ')}.`, ...(sources.length ? sources.map((s) => `- ${s}`) : ['- No source candidate maps to this task: identify the authoritative source first']), '',
    '## What to keep out', '', '- Internal identifiers, environment IDs, and details of private sources.', ...(privateSources.length ? [`- ${privateSources.length} risk item(s) are marked not public-safe: use them to shape the warning, not to publish the details.`] : []), '',
    '## Validation criteria', '', `- Closure test: ${rec.closureTest}`, '- Every claim is verified and labeled (documented, source-attested, or fired).', ...(rec.risk && rec.risk.length ? [`- Operational risks to cover with a warning, rollback, or recovery step: ${rec.risk.join(', ')}`] : []), '',
    '## Open questions and evidence not yet available', '', ...(rec.unavailableEvidence.length ? rec.unavailableEvidence.map((u) => `- ${u.dimension}: ${u.request}`) : ['- none recorded']), '',
    `Confidence in this lead: ${rec.confidence}. Next validation step: ${rec.nextValidation}`,
  ];
  return lines.join('\n');
}

module.exports = { build, briefFor, PRIORITY_RUBRIC, bandOf, releaseView, relatedCandidates };
