'use strict';

// Needs and coverage. For each task the profile declares, ask whether a reader can accomplish it with
// the published pages in the evidence scope, by documentation type. A keyword mention in a reference
// page does not document a task. An empty cell is a gap only when the task expects that type, and an
// absence is reported with its search boundary. Discoverability (content exists but is hard to find),
// the bottleneck stage, and maturity come from the same matrix.

const { expandTerms, scopeOf, STAGES } = require('./profile.cjs');
const { sectionsOf } = require('./classify.cjs');
const { isStepBlock } = require('./html.cjs');
const { normalizeUrlPath } = require('./paths.cjs');

const ACTION_TYPES = ['tutorial', 'how-to'];
const DEFAULT_TYPES = { discover: ['explanation'], evaluate: ['explanation'], start: ['how-to', 'tutorial'], build: ['how-to'], operate: ['how-to'], upgrade: ['how-to'] };

const lc = (s) => String(s || '').toLowerCase();
const wordHit = (hay, term) => {
  const t = lc(term).trim();
  if (!t) return 0;
  let n = 0;
  let i = hay.indexOf(t);
  while (i >= 0) {
    const before = i === 0 ? ' ' : hay[i - 1];
    if (!/[a-z0-9_]/.test(before)) n += 1;
    i = hay.indexOf(t, i + t.length);
  }
  return n;
};

function inboundMap(pages) {
  const inbound = new Map();
  for (const p of pages) {
    for (const l of p.links || []) {
      let u;
      try {
        u = new URL(l.href, p.url);
      } catch {
        continue;
      }
      const target = normalizeUrlPath(u.pathname);
      if (target === p.path) continue;
      const set = inbound.get(target) || new Set();
      set.add(p.path);
      inbound.set(target, set);
    }
  }
  return inbound;
}

function matchPage(terms, page, cls) {
  const title = `${lc(page.title)} ${(page.h1 || []).map(lc).join(' ')}`;
  const heads = (page.headings || []).filter((h) => h.level >= 2).map((h) => lc(h.text));
  const body = lc(page.text);
  const titleHit = terms.some((t) => wordHit(title, t));
  const headingHits = heads.filter((h) => terms.some((t) => wordHit(h, t))).length;
  const bodyHits = terms.reduce((n, t) => n + wordHit(body, t), 0);
  if (!titleHit && !headingHits && !bodyHits) return null;
  const strength = titleHit || headingHits ? 'strong' : bodyHits >= 2 ? 'medium' : 'weak';
  const sections = [];
  if (Array.isArray(page.blocks)) {
    const secs = sectionsOf(page.blocks);
    secs.forEach((sec, i) => {
      const text = lc(`${sec.heading || ''} ${sec.blocks.map((b) => b.text || (b.header || []).join(' ')).join(' ')}`);
      const hit = terms.some((t) => wordHit(text, t));
      if (!hit) return;
      const headingMatch = terms.some((t) => wordHit(lc(sec.heading), t));
      const ordered = sec.blocks.filter(isStepBlock).length;
      sections.push({ heading: sec.heading, type: cls && cls.sections[i] ? cls.sections[i].type : 'unclear', hasSteps: ordered >= 2, headingMatch });
    });
  }
  const orderedAll = Array.isArray(page.blocks) ? page.blocks.filter(isStepBlock).length : 0;
  return { strength, titleHit, headingHits, bodyHits, sections, hasSteps: orderedAll >= 2 };
}

const THIN_WORDS = 15;

function typeServed(type, m, cls) {
  const pageType = cls && cls.type;
  const viaPage = pageType === type && m.strength === 'strong' && (!ACTION_TYPES.includes(type) || m.hasSteps);
  const viaSection = m.sections.some((s) => s.type === type && s.headingMatch && (!ACTION_TYPES.includes(type) || s.hasSteps));
  if (viaPage || viaSection) return 'covered';
  const partialPage = pageType === type || m.sections.some((s) => s.type === type);
  return partialPage ? 'partial' : null;
}

function buildMatrix({ profile, pages, classifications, health, signals, inventory }) {
  const evidencePages = pages.filter((p) => p.status === 200 && scopeOf(profile, p.url).evidence);
  const clsByPath = new Map(classifications.map((c) => [c.path, c]));
  const inbound = inboundMap(pages.filter((p) => p.status === 200));
  const orphans = new Set((health && health.links && health.links.orphans) || []);
  const onlyNav = new Set((health && health.links && health.links.onlyViaNavigation) || []);
  const searchByTask = (signals && signals.search && signals.search.status === 'assessed' && signals.search.summary.byTask) || {};
  const boundary = {
    pagesExamined: evidencePages.length,
    scope: { evidenceInclude: profile.scope.evidence.include, evidenceExclude: profile.scope.evidence.exclude },
    inventoryComplete: Boolean(inventory && inventory.complete),
    inventoryReasons: (inventory && inventory.reasons) || [],
  };
  const tasks = profile.tasks.map((task) => {
    if (!task.applicable) return { task: task.id, title: task.title, stage: task.stage, audience: task.audience, required: task.required, status: 'not applicable', cells: [], matched: [], boundary };
    if (!evidencePages.length) return { task: task.id, title: task.title, stage: task.stage, audience: task.audience, required: task.required, status: 'not assessed', reason: 'no published pages in the evidence scope', cells: [], matched: [], boundary };
    const terms = expandTerms(profile, task.terms);
    const matched = [];
    for (const page of evidencePages) {
      const cls = clsByPath.get(page.path);
      const m = matchPage(terms, page, cls);
      if (!m) continue;
      // A near-empty page (a title and a few words) names a topic but serves no reader: it never counts as strong coverage.
      if ((page.words || 0) < THIN_WORDS) {
        m.strength = 'weak';
        m.thin = true;
      }
      const sc = scopeOf(profile, page.url);
      matched.push({
        path: page.path, strength: m.strength, pageType: cls ? cls.type : 'not assessed', hasSteps: m.hasSteps, sections: m.sections,
        scope: sc.report ? 'area' : `related:${sc.related || 'evidence'}`, titleHit: m.titleHit, thin: Boolean(m.thin),
        _m: m, _cls: cls,
        discoverability: {
          orphan: orphans.has(page.path), onlyViaNavigation: onlyNav.has(page.path), inboundPages: (inbound.get(page.path) || new Set()).size,
          depth: page.path.split('/').filter(Boolean).length, titleHasTerm: m.titleHit,
        },
      });
    }
    const expected = task.expectedTypes || DEFAULT_TYPES[task.stage] || ['how-to'];
    const cells = expected.map((type) => {
      const hits = matched.map((x) => ({ x, r: typeServed(type, x._m, x._cls) })).filter((h) => h.r);
      const covered = hits.filter((h) => h.r === 'covered');
      let status;
      if (covered.length) status = 'covered';
      else if (hits.length) status = 'partial';
      else if (matched.length) status = 'mention-only';
      else status = boundary.inventoryComplete ? 'not found' : 'not found in examined pages';
      return { type, status, pages: (covered.length ? covered : hits).map((h) => h.x.path), note: status === 'mention-only' ? 'pages mention the task but none is a page of this type with steps; a mention does not document a task' : null };
    });
    // Tutorial and how-to are alternatives for the same job. Every other expected type is required.
    const action = cells.filter((c) => ACTION_TYPES.includes(c.type));
    const rest = cells.filter((c) => !ACTION_TYPES.includes(c.type));
    const rank = { covered: 3, partial: 2, 'mention-only': 1, 'not found in examined pages': 0, 'not found': 0 };
    const group = [];
    if (action.length) group.push(action.reduce((best, c) => (rank[c.status] > rank[best.status] ? c : best), action[0]));
    group.push(...rest);
    let status = 'covered';
    if (group.some((c) => c.status === 'not found' || c.status === 'not found in examined pages')) status = matched.length ? 'mention-only' : group.every((c) => c.status.startsWith('not found')) ? group[0].status : 'partial';
    else if (group.some((c) => c.status === 'mention-only')) status = 'mention-only';
    else if (group.some((c) => c.status === 'partial')) status = 'partial';
    const steps = (task.steps || []).map((st) => {
      const sig = signals && signals.integration && signals.integration.status === 'assessed' ? (signals.integration.summary.byWorkflow || {}) : {};
      const na = Object.values(sig).flat().some((x) => x.step === st.id && x.applies === false && (!x.task || x.task === task.id));
      if (na) return { step: st.id, status: 'not applicable' };
      const stTerms = expandTerms(profile, st.terms);
      const hit = evidencePages.filter((p) => stTerms.some((t) => wordHit(lc(p.text), t))).map((p) => p.path);
      return { step: st.id, status: hit.length ? 'mentioned' : boundary.inventoryComplete ? 'not found' : 'not found in examined pages', pages: hit.slice(0, 5) };
    });
    const bestPage = (matched.find((m) => m.path === (group[0].pages || [])[0]) || matched[0]) || null;
    const strip = ({ _m, _cls, ...rest2 }) => rest2;
    return {
      task: task.id, title: task.title, stage: task.stage, journey: task.journey, audience: task.audience, required: task.required, expectedTypes: expected,
      status, cells, steps, matched: matched.map(strip), boundary: { ...boundary, terms },
      discoverability: bestPage ? { page: bestPage.path, ...bestPage.discoverability, searchNoResults: (searchByTask[task.id] && searchByTask[task.id].noResultQueries) || 0 } : null,
    };
  });
  return { tasks, boundary };
}

function bottleneck(matrix, signals, releaseByTask = {}) {
  const walk = (signals && signals.tasks && signals.tasks.status === 'assessed' && signals.tasks.summary.byTask) || {};
  const demand = (signals && signals.demand && signals.demand.status === 'assessed' && signals.demand.summary.byTask) || {};
  const stages = [];
  for (const stage of STAGES) {
    const ts = matrix.tasks.filter((t) => t.stage === stage && t.status !== 'not applicable');
    if (!ts.length) {
      stages.push({ stage, tasks: 0, status: 'no tasks declared' });
      continue;
    }
    const notDue = ts.filter((t) => releaseByTask[t.task] === 'not public');
    const unmet = ts.filter((t) => t.required && !['covered'].includes(t.status) && releaseByTask[t.task] !== 'not public');
    const unassessed = ts.filter((t) => t.status === 'not assessed');
    stages.push({ stage, tasks: ts.length, unmet: unmet.map((t) => t.task), notDue: notDue.map((t) => t.task), status: unassessed.length === ts.length ? 'not assessed' : unmet.length ? 'blocked by coverage' : 'served' });
  }
  const first = stages.find((s) => s.status === 'blocked by coverage');
  if (!first) return { stage: null, stages, statement: 'No required task is unmet in the declared stages. That does not show readers succeed: coverage is not a walkthrough.', support: 'none needed' };
  const supportBy = [];
  for (const t of first.unmet) {
    if (walk[t] && walk[t].some((w) => w.result !== 'succeeded')) supportBy.push(`walkthrough: ${t}`);
    if (demand[t]) supportBy.push(`demand: ${t}`);
  }
  return {
    stage: first.stage, stages, unmet: first.unmet,
    support: supportBy.length ? 'walkthrough or demand evidence' : 'coverage only',
    supportedBy: supportBy,
    statement: supportBy.length
      ? `The first stage where a required task is not served is "${first.stage}", supported by ${supportBy.join('; ')}.`
      : `The first stage where a required task is not served by the published pages is "${first.stage}". This rests on coverage alone: confirm with a walkthrough or demand data before treating it as the bottleneck.`,
    note: first.stage === 'start' ? 'More reference content cannot make up for a first-success path that fails.' : null,
  };
}

function assessMaturity({ matrix, pages, health, candidates, signals, inventory, profile, releaseByTask = {} }) {
  const evidence = pages.filter((p) => p.status === 200 && scopeOf(profile, p.url).evidence);
  const taskStatus = (stage) => {
    // A task whose feature is not public yet is not a documentation obligation, so it neither counts as unmet nor as served.
    const all = matrix.tasks.filter((t) => t.stage === stage && t.required && t.status !== 'not applicable');
    const notDue = all.filter((t) => releaseByTask[t.task] === 'not public');
    const ts = all.filter((t) => releaseByTask[t.task] !== 'not public');
    const due = notDue.length ? ` (${notDue.length} not due: ${notDue.map((t) => t.task).join(', ')})` : '';
    if (!ts.length) return { status: 'not assessed', note: `no required public ${stage} tasks declared in the profile${due}` };
    if (ts.some((t) => t.status === 'not assessed')) return { status: 'not assessed', note: 'no pages to assess against' };
    const unmet = ts.filter((t) => t.status !== 'covered');
    return unmet.length ? { status: 'unmet', note: `${unmet.length} of ${ts.length} not served: ${unmet.map((t) => t.task).join(', ')}${due}` } : { status: 'met', note: `${ts.length} of ${ts.length} served${due}` };
  };
  const root = (profile.scope.report.include[0] || '/').replace(/\/?\*\*$/, '') || '/';
  const hasIntro = evidence.some((p) => normalizeUrlPath(p.path) === normalizeUrlPath(root));
  const hasExample = evidence.some((p) => (p.preBlocks || 0) > 0 || (p.codeBlocks || []).length > 0 || (p.blocks || []).some((b) => b.type === 'code'));
  const clean = inventory && inventory.complete;
  const placeholders = (health && health.placeholders) || [];
  const brokenInternal = (health && health.links && health.links.brokenInternalByCrawl) || [];
  const toolCands = (candidates || []).filter((c) => ['tool', 'rest-route', 'cli-binary', 'cli-command', 'wp-cli-command'].some((k) => c.kinds.includes(k)));
  const toolDocumented = toolCands.filter((c) => ['Partial', 'Dedicated'].includes(c.coverage && c.coverage.rating)).length;
  const executedExamples = signals && signals.accuracy && signals.accuracy.status === 'assessed' ? Object.values(signals.accuracy.summary.byPage).reduce((n, p) => n + p.executed, 0) : 0;
  const crit = (id, level, text, status, note) => ({ id, level, criterion: text, status, note });
  const criteria = [
    crit('S1', 1, 'A page introduces the area', evidence.length ? (hasIntro ? 'met' : 'unmet') : 'not assessed', hasIntro ? `a page exists at ${root}` : `no page at ${root}`),
    crit('S2', 1, 'A first-success path exists for each required start task', taskStatus('start').status, taskStatus('start').note),
    crit('S3', 1, 'At least one example is shown (working order is not verified)', evidence.length ? (hasExample ? 'met' : 'unmet') : 'not assessed', hasExample ? 'code appears on at least one page' : 'no code blocks found'),
    crit('F1', 2, 'Required build and operate tasks are each served by a page of the expected type', (() => { const a = taskStatus('build'); const b = taskStatus('operate'); return [a, b].some((x) => x.status === 'unmet') ? 'unmet' : [a, b].every((x) => x.status === 'met') ? 'met' : 'not assessed'; })(), `build: ${taskStatus('build').note}; operate: ${taskStatus('operate').note}`),
    crit('F2', 2, 'Public tools, routes, and commands found in source are documented beyond a mention', toolCands.length ? (toolDocumented === toolCands.length ? 'met' : 'unmet') : 'not assessed', toolCands.length ? `${toolDocumented} of ${toolCands.length} rated Partial or Dedicated (keyword heuristic)` : 'no tool candidates discovered'),
    crit('F3', 2, 'No placeholder text or broken internal links in the area', clean ? (placeholders.length || brokenInternal.length ? 'unmet' : 'met') : 'not assessed', clean ? `${placeholders.length} placeholders, ${brokenInternal.length} internal links outside the crawl` : 'inventory incomplete, so absence of defects is unverified'),
    crit('I1', 3, 'Documentation is part of the release process (for example in the definition of done)', 'not assessed', 'needs process evidence this toolkit cannot collect from pages or source'),
    crit('I2', 3, 'Examples are tested and the results are recorded', executedExamples > 0 ? 'met' : 'not assessed', executedExamples > 0 ? `${executedExamples} executed verifications recorded` : 'no executed verification supplied'),
    crit('I3', 3, 'Links are checked automatically', 'not assessed', 'needs CI evidence'),
    crit('E1', 4, 'Troubleshooting content is driven by support data', 'not assessed', signals && signals.demand && signals.demand.status === 'assessed' ? 'demand data exists; judge whether troubleshooting content follows it' : 'no demand data supplied'),
    crit('E2', 4, 'Quality metrics are tracked and acted on', 'not assessed', 'needs analytics evidence'),
  ];
  // A person's attestation fills a criterion that would be "not assessed". Observed evidence (met or unmet) is never overridden.
  for (const c of criteria) {
    const att = (profile.attestations || []).find((a) => a.criterion === c.id);
    if (!att) continue;
    if (c.status === 'not assessed') {
      c.status = 'met';
      c.attested = true;
      c.note = `attested, not observed: "${att.statement}" (${att.source}, ${att.date}; posture reported)`;
    } else c.note = `${c.note}. An attestation exists ("${att.statement}", ${att.source}) but observed evidence decides this criterion.`;
  }
  const levels = [1, 2, 3, 4].map((n) => {
    const cs = criteria.filter((c) => c.level === n);
    const status = cs.every((c) => c.status === 'met') ? 'met' : cs.some((c) => c.status === 'unmet') ? 'unmet' : 'not assessed';
    return { level: n, name: ['Seeds', 'Foundation', 'Integration', 'Excellence'][n - 1], status, criteria: cs };
  });
  let reached = 0;
  for (const l of levels) {
    if (l.status === 'met') reached = l.level;
    else break;
  }
  const next = levels.find((l) => l.level === reached + 1);
  const unmet = next ? next.criteria.filter((c) => c.status === 'unmet') : [];
  return {
    level: reached, name: reached ? levels[reached - 1].name : 'below Seeds (or not assessed)', levels,
    nextAchievableStep: unmet.length ? unmet[0] : next ? next.criteria.find((c) => c.status === 'not assessed') || null : null,
    note: 'A roadmap, not a judgment. A level counts only when every criterion in it, and in the levels below, is met on evidence. Unassessed criteria cannot support a higher level. The criteria are examples, not universal thresholds.',
  };
}

module.exports = { buildMatrix, bottleneck, assessMaturity, matchPage, ACTION_TYPES, inboundMap };
