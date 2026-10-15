'use strict';

// The full audit chain as one readable report:
//   scope and coverage boundary -> inventory -> classification -> needs and coverage -> health ->
//   claim verification map -> bottleneck and maturity -> signal status -> prioritized recommendations ->
//   review queue -> release coverage map -> changes since the last run -> what was not examined.
// Nothing here is a verdict: ratings are heuristics, proposed judgments are labeled, and the human
// verdict column is left for a person.

const { mdTable } = require('./util.cjs');
const { PRIORITY_RUBRIC } = require('./recommend.cjs');

const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const code = (s) => `\`${s}\``;
const short = (s, n = 140) => (String(s).length > n ? `${String(s).slice(0, n - 1)}…` : String(s));

function sourceTable(sources) {
  if (!sources.length) return ['_No sources declared._'];
  return [mdTable(['Source', 'Kind', 'Retrieval', 'Content hash', 'Notes'], sources.map((s) => [
    s.id, s.kind || s.connector || '', `${s.retrieval.status}${s.retrieval.reason ? `: ${s.retrieval.reason}` : ''}`, s.contentHash ? s.contentHash.slice(0, 12) : '',
    [s.git && s.git.present ? (s.git.head ? `git ${s.git.head.slice(0, 7)}${s.git.dirty ? ' + uncommitted changes' : ''}` : 'git repository with no commits (uncommitted tree)') : null, s.fileCount !== undefined ? `${s.fileCount} file${s.fileCount === 1 ? '' : 's'}` : null, s.suspiciousContent ? `${s.suspiciousContent} instruction-like text hit(s), shown as data` : null].filter(Boolean).join('; '),
  ]))];
}

function releaseCoverageMap(candidates, claims) {
  // Verification is ours, not the tracker's. A closed ticket or a changelog line never makes an item "verified".
  const rows = [];
  for (const c of candidates) {
    if (!c.kinds.some((k) => /^(tool|rest-route|cli-binary|cli-command|wp-cli-command|block|hook|env-var|changelog-item|release-item|changeset-item)$/.test(k))) continue;
    const related = claims.filter((cl) => cl.identifiers.some((i) => [c.name, ...(c.terms || [])].map((x) => String(x).toLowerCase()).includes(i.toLowerCase())));
    let state;
    if (c.status === 'planned' || c.status === 'limited') state = 'not-shipped';
    else if (related.some((cl) => cl.verification.label === 'fired')) state = 'verified';
    else if (related.some((cl) => cl.verification.result === 'partial')) state = 'partial';
    else state = 'untested';
    rows.push({ name: c.name, state, status: c.status, kinds: c.kinds[0], docs: c.coverage && c.coverage.rating });
  }
  return rows;
}

function build(o) {
  const { start, manifest, profile, sources, pagesRun, health, pages, classifications, candidatesOut, signals, claims, claimSummary, matrix, bottleneck, maturity, recs, queue, diff, readiness, open } = o;
  const L = [];
  const area = profile.area;
  const status = manifest ? manifest.status : open ? 'OPEN (not finalized)' : 'incomplete';
  L.push(`# Documentation needs audit: ${area.name}`, '');
  if (!manifest || manifest.status !== 'complete') L.push(`> **This run is ${status}.** Missing evidence is listed below. Do not read an empty section as "no problems found".`, '');
  L.push(`- Area: ${code(area.id)}${area.owner ? `, owner from profile: ${area.owner}` : ''}`, `- Run: ${code(start.runId)} started ${start.startedAt}${manifest ? `, finalized ${manifest.finalizedAt}` : ''}`, `- Profile hash: ${code(start.profile.hash.slice(0, 12))}; tool ${start.tool.name} ${start.tool.version}${start.tool.git && start.tool.git.present ? (start.tool.git.head ? ` (git ${start.tool.git.head.slice(0, 7)}${start.tool.git.dirty ? ', uncommitted changes' : ''})` : ' (git repository with no commits yet)') : ''}`, '');
  L.push('This report is a set of leads for a person to review. Machine ratings are keyword heuristics. Proposed judgments are labeled as proposals. The human verdict column is blank on purpose.', '');

  L.push('## 1. Scope and coverage boundary', '');
  L.push(`- Origin: ${code(profile.site.origin)}`, `- Crawl scope: include ${profile.scope.crawl.include.map(code).join(', ')}; exclude ${profile.scope.crawl.exclude.map(code).join(', ') || 'none'}`, `- Report scope: ${profile.scope.report.include.map(code).join(', ')}`, `- Evidence scope (may satisfy a need, shown even when outside the report scope): ${profile.scope.evidence.include.map(code).join(', ')}`, '');
  if (pagesRun) {
    const c = pagesRun.coverage || {};
    L.push(mdTable(['Category', 'Count', 'Meaning'], [
      ['Discovered', c.discovered ?? '', 'URLs found in the sitemap or list'], ['Examined', c.examined ?? '', 'fetched and read as HTML'], ['Excluded by scope', c.excluded ?? '', 'outside the crawl scope or off origin; not absent, just not looked at'],
      ['Skipped by robots.txt', c.skippedByRobots ?? '', 'disallowed; not examined'], ['Unavailable', c.unavailable ?? '', 'could not be fetched'], ['Blocked', c.blocked ? 'yes' : 'no', 'the site refused the crawl'],
      ['Unexamined', c.unexamined ?? '', 'in scope but not reached (limit or stop)'], ['Not HTML', c.unsupported ?? '', 'unsupported content type; not read'], ['Redirected off origin', c.offOrigin ?? '', 'not followed'],
    ]), '');
    L.push(`Inventory complete: **${pagesRun.inventory && pagesRun.inventory.complete ? (pagesRun.inventory.declaredComplete ? 'yes, as declared by the person who saved the pages (not verified against the live site)' : 'yes') : 'no'}**${pagesRun.inventory && pagesRun.inventory.reasons.length ? ` (${pagesRun.inventory.reasons.join('; ')})` : ''}. Orphan, dead-end, duplicate, and "not found" findings are only as strong as this inventory.`, '');
    L.push('Server HTML only: a page that builds its content with JavaScript can look empty here. That is incomplete coverage, not missing documentation.', '');
  }
  L.push('### Sources', '', ...sourceTable(sources), '');

  const inReport = pages.filter((p) => p.status === 200 && p.__scope && p.__scope.report);
  L.push('## 2. Inventory', '', `${inReport.length} page(s) in the report scope. Related pages outside the report scope that were available as evidence: ${pages.filter((p) => p.status === 200 && p.__scope && !p.__scope.report && p.__scope.evidence).map((p) => code(p.path)).join(', ') || 'none'}.`, '');
  const clsBy = new Map(classifications.map((c) => [c.path, c]));
  L.push(mdTable(['Path', 'Title', 'Words', 'Updated', 'Type (machine)', 'Confidence', 'Mixed'], inReport.map((p) => {
    const c = clsBy.get(p.path) || {};
    return [code(p.path), esc(short(p.title, 50)), p.words, p.updated || 'none shown', c.type || '', c.confidence || '', c.mixed ? 'yes' : ''];
  })), '');

  L.push('## 3. Classification (by reader need, machine suggestion)', '', 'Cues come from structure and wording. A tutorial and a how-to differ by study versus work, not by beginner versus advanced. Confirm by reader need.', '');
  L.push(mdTable(['Path', 'Type', 'Conf.', 'Evidence (quoted)', 'Sections', 'Source'], classifications.filter((c) => c.sections !== undefined && inReport.some((p) => p.path === c.path)).map((c) => [
    code(c.path), `${c.type}${c.subtype ? ` (${c.subtype})` : ''}`, c.confidence || '', esc(c.evidence.map((e) => `${e.cue}: "${short(e.quote, 70)}"`).join('; ')), esc(c.mixed ? `proposed split: ${c.proposedSplit.map((s) => `${s.heading || 'intro'}=${s.type}`).join(', ')}` : c.sections.map((s) => `${s.heading || 'intro'}=${s.type}`).join(', ')), c.source || 'machine',
  ])), '');

  L.push('## 4. Needs and coverage', '', 'Each row is a task a reader must accomplish. A page that only mentions a feature does not document the task. "Not found" is reported with its search boundary; an empty cell is a gap only where the task expects that type. Tutorial and how-to are alternatives for the same job.', '');
  L.push(mdTable(['Task', 'Stage', 'Audience', 'Expected', 'Status', 'Pages (scope)', 'Discoverability'], matrix.tasks.map((t) => [
    esc(t.title), t.stage, t.audience || '', (t.expectedTypes || []).join(', '), `**${t.status}**${t.reason ? ` (${t.reason})` : ''}`,
    esc(t.matched.slice(0, 4).map((m) => `${m.path} [${m.pageType}, ${m.strength}${m.thin ? ', near-empty page' : ''}, ${m.scope}]`).join('; ') || (t.status === 'not found' || t.status === 'not found in examined pages' ? `none among ${t.boundary.pagesExamined} examined` : '')),
    t.discoverability ? esc(`${t.discoverability.page}: inbound ${t.discoverability.inboundPages}${t.discoverability.orphan ? ', orphan' : ''}${t.discoverability.searchNoResults ? `, ${t.discoverability.searchNoResults} no-result searches` : ''}`) : '',
  ])), '');
  const stepRows = matrix.tasks.flatMap((t) => (t.steps || []).map((s) => [esc(t.title), s.step, s.status, esc((s.pages || []).join(', '))]));
  if (stepRows.length) L.push('### Workflow steps', '', mdTable(['Task', 'Step', 'Status', 'Pages'], stepRows), '');

  L.push('## 5. Health (from the inventory)', '');
  if (health) {
    L.push(`- Pages fetched: ${health.pages.fetched} of ${health.pages.total}; orphans ${health.links.orphans.length}; dead ends ${health.links.deadEnds.length}; placeholders ${health.placeholders.length}; pages that point at code but show none in the server HTML ${(health.codeMissing || []).length}; internal links outside the crawl ${health.links.brokenInternalByCrawl.length}`, `- Headings: ${health.headings.notOneH1.length} pages without exactly one h1; ${health.headings.skippedLevel.length} skip a level`, `- Images without alt attribute: ${health.images.missingAlt.reduce((n, x) => n + x.count, 0)}`, `- Governance: ${health.governance.duplicateTitles.length} duplicate titles; ${health.governance.dateConflicts.length} date conflicts; ${health.governance.redirected.length} redirected`, '');
    L.push(`Accessibility and comprehension (partial): ${health.accessibility.genericLinkText.length} generic link texts, ${health.accessibility.visualOnlyInstructions.length} picture-or-position instructions, ${health.accessibility.unexpandedAcronyms.length} unexpanded acronyms. ${health.accessibility.note}`, '');
    if (!health.inventory.complete) L.push('_The inventory is incomplete, so absence findings above are unverified._', '');
  }
  if (readiness && readiness.length) {
    const assessed = readiness.filter((r) => r.status === 'assessed');
    L.push('### Extraction readiness (optional page-quality evidence)', '', 'Descriptive counts of how well statements stand alone. This is not a priority score and not an AI-visibility measure.', '', mdTable(['Path', 'Depends on prior context', 'Vague sentences', 'Unsupported statistics', 'Unqualified absolutes'], assessed.map((r) => [code(r.path), r.selfContainedness.dependsOnPriorContext, r.specificity.vagueSentences, r.supportedClaims.unsupported, r.qualifications.withoutQualifier])), '');
  }

  L.push('## 6. Claim verification map', '', `${claimSummary.total} claims extracted; ${claimSummary.highRisk} high-risk; ${claimSummary.highRiskUnverified} high-risk with no verification record. ${claimSummary.note}`, '');
  L.push(mdTable(['Page', 'Claim', 'Risk', 'Verification', 'Label'], claims.filter((c) => c.risk === 'high' || c.verification.result !== 'not-run').slice(0, 40).map((c) => [code(c.page), esc(short(c.text, 110)), c.risk, c.verification.result, esc(short(c.verification.label, 80))])), '');

  L.push('## 7. Bottleneck and maturity', '', `**Bottleneck:** ${bottleneck.statement}`, bottleneck.note ? `\n${bottleneck.note}` : '', '');
  L.push(mdTable(['Stage', 'Tasks', 'Status', 'Unmet (public features)', 'Not due (feature not public)'], bottleneck.stages.map((s) => [s.stage, s.tasks, s.status, (s.unmet || []).join(', '), (s.notDue || []).join(', ')])), '');
  L.push(`**Maturity:** ${maturity.name} (level ${maturity.level}). ${maturity.note}`, '', mdTable(['Level', 'Criterion', 'Status', 'Note'], maturity.levels.flatMap((l) => l.criteria.map((c) => [`${l.level} ${l.name}`, esc(c.criterion), c.status, esc(short(c.note, 120))]))), '');
  if (maturity.nextAchievableStep) L.push(`Next achievable step: ${maturity.nextAchievableStep.criterion} (${maturity.nextAchievableStep.status}).`, '');

  L.push('## 8. Evidence status by signal', '', mdTable(['Signal', 'Assessment', 'Status', 'Reason or retrieval request'], Object.values(signals).map((s) => [s.title, s.mode, `**${s.status}**`, esc(short(s.status === 'not assessed' ? `${s.reason}. Request: ${s.retrievalRequest || 'n/a'}` : s.reason, 220))])), '');
  L.push('Missing evidence is "not assessed", never zero. Message counts are not user counts; search volume and its absence never lower a need.', '');

  L.push('## 9. Prioritized recommendations', '', '**Priority rubric.** ' + Object.entries(PRIORITY_RUBRIC.tiers).map(([k, v]) => `${k}: ${v}.`).join(' '), '', PRIORITY_RUBRIC.demandBands, '', `Tie-breaking: ${PRIORITY_RUBRIC.tieBreak.join(', then ')}. ${PRIORITY_RUBRIC.unknown}`, '');
  L.push(mdTable(['Id', 'Action', 'Tier', 'Task or page', 'Audience', 'Why (evidence)', 'Confidence', 'Human verdict'], recs.map((r) => [
    code(r.id), `**${r.action}**${r.createAfterShip ? ' (create after ship)' : ''}`, r.priority && r.priority.tier ? r.priority.tier : 'none', esc(r.taskTitle || r.page || ''), r.audience || '', esc(short(r.why, 200)), r.confidence, r.human.verdict ? `${r.human.verdict}${r.human.needsReReview ? ' (RE-REVIEW: evidence changed)' : ''}` : '',
  ])), '');
  for (const r of recs.filter((x) => x.action !== 'no-action' || x.createAfterShip)) {
    L.push(`### ${r.id}: ${r.action}${r.taskTitle ? ` — ${r.taskTitle}` : r.page ? ` — ${r.page}` : ''}`, '', `- Why: ${r.why}`, `- Proposed judgment (not a verdict): ${r.proposedJudgment.text}`, `- Machine rating: ${r.machine.rating || 'none'} (${r.machine.heuristic}). Human verdict: ${r.human.verdict || '_blank_'}`, `- Priority: ${r.priority.rationale}`, `- Existing relevant docs: ${r.existingDocs.map((d) => `${d.path}${d.pageType ? ` (${d.pageType}, ${d.scope})` : ''}`).join('; ') || 'none within the search boundary'}`, `- Evidence: ${r.evidence.map((e) => `${e.kind} [${e.posture}] ${short(e.summary || e.ref, 100)}`).join('; ') || 'none'}`, r.searchBoundary && r.searchBoundary.pagesExamined !== undefined ? `- Search boundary: ${r.searchBoundary.pagesExamined} pages examined, inventory ${r.searchBoundary.inventoryComplete ? 'complete' : 'incomplete'}` : null, r.release ? `- Release: ${r.release.state} (${r.release.basis})` : null, r.demandSummary && r.demandSummary.items ? `- Demand: ${r.demandSummary.items} items, ${r.demandSummary.uniqueThreads} unique threads, requesters ${r.demandSummary.uniqueRequesters === null ? 'unknown' : r.demandSummary.uniqueRequesters}, ${r.demandSummary.firstSeen} to ${r.demandSummary.lastSeen}; sample ${signals.demand.summary.biasedSample ? 'biased' : 'not marked biased'}` : null, r.contradictions.length ? `- Contradictions: ${r.contradictions.join('; ')}` : null, r.unavailableEvidence.length ? `- Not assessed: ${r.unavailableEvidence.map((u) => u.dimension).join(', ')}` : null, `- Suggested owner (from the profile, not a guess): ${r.owner || 'none named'}`, `- Effort: ${r.effort}`, `- Closure test: ${r.closureTest}`, `- Next validation step: ${r.nextValidation}`, r.brief ? `- Draft brief: ${r.brief}` : null, '');
  }

  L.push('## 10. Review queue (proposed judgments)', '', 'A person records each verdict with `scripts/review.cjs`. Model output is never written into the verdict field.', '', mdTable(['Target', 'Kind', 'Proposed judgment', 'Machine rating', 'Human verdict'], queue.map((q) => [code(q.target), q.kind, esc(short(q.proposed, 150)), q.machineRating || '', q.verdict || ''])), '');

  L.push('## 11. Release coverage map', '', 'Verification status is ours, not the tracker\'s: a closed ticket or a changelog line does not make an item verified. verified = executed and recorded; partial = defined in source only; untested = nothing recorded; not-shipped = planned, flagged, or beta.', '');
  const rc = releaseCoverageMap(candidatesOut.candidates, claims);
  L.push(mdTable(['State', 'Items'], ['verified', 'partial', 'untested', 'not-shipped'].map((s) => [s, rc.filter((r) => r.state === s).length])), '');

  L.push('## 12. Changes since the last compatible run', '');
  if (!diff) L.push('No earlier complete run to compare with.', '');
  else if (!diff.compat.compatible) L.push(`Not compared: ${diff.compat.reasons.join('; ')}.`, '');
  else L.push(`Compared with run ${code(diff.fromRun)}: ${diff.diff.added.length} added, ${diff.diff.removed.length} removed, ${diff.diff.changed.length} changed, ${diff.diff.unchanged} unchanged candidates.${diff.compat.warnings.length ? ` Notes: ${diff.compat.warnings.join('; ')}.` : ''}`, '', ...diff.diff.added.slice(0, 15).map((a) => `- added: ${a.name}`), ...diff.diff.removed.slice(0, 15).map((a) => `- removed: ${a.name}`), ...diff.diff.changed.slice(0, 15).map((a) => `- changed: ${a.name} (${a.fields.map((f) => `${f.field} ${f.from} to ${f.to}`).join('; ')})`), '');

  L.push('## 13. Not examined', '');
  const ne = [];
  if (pagesRun) {
    const c = pagesRun.coverage || {};
    if (c.excluded) ne.push(`${c.excluded} URL(s) excluded by scope`);
    if (c.skippedByRobots) ne.push(`${c.skippedByRobots} URL(s) disallowed by robots.txt`);
    if (c.unavailable) ne.push(`${c.unavailable} page(s) unavailable`);
    if (c.unexamined) ne.push(`${c.unexamined} in-scope page(s) unexamined`);
    if (c.unsupported) ne.push(`${c.unsupported} non-HTML resource(s)`);
    if (c.offOrigin) ne.push(`${c.offOrigin} off-origin redirect(s) not followed`);
  }
  for (const s of sources) {
    if (s.retrieval.status !== 'ok') ne.push(`source ${s.id}: ${s.retrieval.status}${s.retrieval.reason ? ` (${s.retrieval.reason})` : ''}`);
    for (const l of s.limitations || []) ne.push(`source ${s.id}: ${l.count} x ${l.reason}${l.examples && l.examples.length ? ` (e.g. ${l.examples.slice(0, 2).join(', ')})` : ''}`);
  }
  if (health && (health.codeMissing || []).length) ne.push(`${health.codeMissing.length} page(s) refer to a command, script, or code sample but show none in the server HTML (for example ${health.codeMissing.slice(0, 3).join(', ')}); the samples may load with JavaScript, so ratings that depend on steps or examples for these pages are unreliable`);
  for (const l of candidatesOut.limitations || []) ne.push(`source ${l.sourceId || 'unknown'}: ${l.count} x ${l.reason}${l.examples && l.examples.length ? ` (e.g. ${l.examples.slice(0, 2).join(', ')})` : ''}`);
  for (const f of (pagesRun && pagesRun.failedSitemaps) || []) ne.push(`sitemap ${f.url}: not read (${f.reason}); the URL list may be incomplete`);
  for (const s of Object.values(signals)) if (s.status === 'not assessed') ne.push(`signal ${s.dimension}: not assessed (${s.reason})`);
  ne.push('Product behavior was not run: "shipped" means evidence in source or notes, not observed behavior.', 'Contrast, keyboard, focus order, screen reader, and rendered-output accessibility checks were not made.');
  L.push(...[...new Set(ne)].map((x) => `- ${x}`), '');
  return L.filter((x) => x !== null && x !== undefined).join('\n');
}

module.exports = { build, releaseCoverageMap };
