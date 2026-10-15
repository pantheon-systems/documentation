'use strict';

// Documentation-needs signals. Each dimension below says what the minimum evidence is, what
// provenance it needs, what it cannot show, and whether assessing it is deterministic or needs a
// person or Claude to judge. Evidence that is absent is "not assessed" with a concrete retrieval
// request; it is never scored as zero. Signal files are staged privately by Claude from authorized
// sources. These functions read local files only.

const fs = require('node:fs');
const path = require('node:path');
const { sha256 } = require('./hash.cjs');
const { findSecrets } = require('./secrets.cjs');
const { realInside } = require('./paths.cjs');

const isRealDate = (v) => { const d = new Date(`${String(v).slice(0, 10)}T00:00:00Z`); return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === String(v).slice(0, 10); };
const ISO_SHAPE = /^\d{4}-\d{2}-\d{2}(?:T[\d:.]+Z?)?$/;
const ISO_DATE = { test: (v) => typeof v === 'string' && ISO_SHAPE.test(v) && isRealDate(v) };
const SCHEMA = 1;

const field = (name, type, extra = {}) => ({ name, type, ...extra });

// mode: deterministic (a script can decide), judgment (a person or Claude must decide), mixed (script gathers, judgment decides)
const DIMENSIONS = {
  tasks: {
    title: 'User tasks and journeys',
    mode: 'mixed',
    minimumEvidence: 'Tasks declared in the profile (evaluate, first success, configure, develop, deploy, operate, troubleshoot, recover, migrate, offboard). Walkthrough results, when supplied here, show where a reader is blocked.',
    provenance: ['who performed the walkthrough', 'date', 'environment or version used'],
    limitations: 'Declared tasks are what the team believes readers do, not observed behavior. A walkthrough covers one path by one person. Missing prerequisites, transitions, verification, and next steps are judged by reading, not counted.',
    retrieval: 'Add the tasks readers must accomplish to the profile, then record at least one walkthrough per required first-success task (who, when, which version, where they got blocked).',
    needsProvenance: false,
    item: [field('task', 'string', { required: true }), field('performedBy', 'string', { required: true }), field('date', 'date', { required: true }), field('result', 'enum', { values: ['succeeded', 'partial', 'blocked'], required: true }), field('blockedAt', 'string'), field('environment', 'string'), field('notes', 'string')],
  },
  audience: {
    title: 'Audience and environment',
    mode: 'judgment',
    minimumEvidence: 'Audience roles and environments named in the profile. They are candidate axes to check coverage against, not product capabilities.',
    provenance: ['where each audience or environment was named'],
    limitations: 'Do not invent plans, platforms, frameworks, or permissions the product does not have. An axis nobody named is not assessed.',
    retrieval: 'List audiences (for example beginner, experienced, developer, administrator, operator) and supported versions, platforms, and plans in the profile, citing where each comes from.',
    needsProvenance: false,
    item: [],
    profileOnly: true,
  },
  docTypes: {
    title: 'Documentation type',
    mode: 'mixed',
    minimumEvidence: 'Published pages in the evidence scope. The script suggests a type per page and section from structure; a person confirms by reader need.',
    provenance: ['the page inventory run'],
    limitations: 'Structure cues are not reader need. A reference mention does not show a task is documented. Not every feature needs all four types. Mixed pages are flagged, not forced into one type.',
    retrieval: 'Run the inventory stage so pages exist to classify.',
    needsProvenance: false,
    item: [],
    profileOnly: true,
  },
  demand: {
    title: 'Demand',
    mode: 'mixed',
    minimumEvidence: 'An approved export of repeated reader questions (support, Jira, community, onboarding, sales or customer-success objections, example requests) with a time window and a note on how the sample was chosen.',
    provenance: ['source system', 'retrievedAt', 'approval', 'timeWindow', 'sampling method', 'whether the sample is biased'],
    limitations: 'Message counts are not user counts. Report frequency, unique threads, and unique requesters separately; requesters stay unknown unless the source says. Tagged or surfaced samples are biased. Silence is not evidence of no need.',
    retrieval: 'Export support threads, Jira issues, community questions, or onboarding notes for this area for a stated time window, with approval to use them, and stage them as the demand input.',
    needsProvenance: true,
    item: [field('id', 'string', { required: true }), field('sourceType', 'enum', { values: ['support', 'jira', 'community', 'onboarding', 'sales', 'cs', 'other'], required: true }), field('task', 'string'), field('terms', 'array'), field('date', 'date', { required: true }), field('threadId', 'string'), field('requesterIds', 'array'), field('requesterCount', 'number'), field('impact', 'string'), field('exampleRequest', 'boolean'), field('excerpt', 'string')],
  },
  search: {
    title: 'Search and discoverability',
    mode: 'mixed',
    minimumEvidence: 'An approved export of internal search queries or no-result searches, with a time window. Navigation, links, titles, and competing pages come from the inventory.',
    provenance: ['source system', 'retrievedAt', 'approval', 'timeWindow', 'sampling method', 'what a count means'],
    limitations: 'A no-result query can mean missing content or content readers cannot find. Low traffic or absent searches do not show low need. Ambiguous analytics are recorded with their meaning, not interpreted.',
    retrieval: 'Export internal search queries (with result counts) for a stated window from the docs search tool, with approval, and say what each count measures.',
    needsProvenance: true,
    item: [field('query', 'string', { required: true }), field('count', 'number', { required: true }), field('noResults', 'boolean'), field('clicks', 'number'), field('countMeaning', 'string')],
  },
  release: {
    title: 'Release and lifecycle',
    mode: 'mixed',
    minimumEvidence: 'Release status per feature with public evidence (a release note, a changelog entry on a public release, or a public page). Candidates already carry changelog and planning status.',
    provenance: ['where the status comes from', 'date'],
    limitations: 'An internal plan or flag is not public availability. A closed ticket is not shipped behavior. A release note that never became a durable guide needs a guide only if readers need one.',
    retrieval: 'List each feature with its status (ga, beta, flagged, planned, deprecated, removed) and a public link or release note date that proves it.',
    needsProvenance: false,
    item: [field('feature', 'string', { required: true }), field('status', 'enum', { values: ['ga', 'beta', 'flagged', 'planned', 'deprecated', 'removed'], required: true }), field('publicEvidence', 'string'), field('date', 'date'), field('breaking', 'boolean'), field('defaultChanged', 'boolean'), field('upgradePath', 'boolean'), field('releaseNoteOnly', 'boolean'), field('task', 'string')],
  },
  accuracy: {
    title: 'Accuracy and reproducibility',
    mode: 'judgment',
    minimumEvidence: 'Verification results for specific claims, each naming the method: static (read in source), executed (run in a disposable environment), or reported (told by someone). Claims themselves are extracted by script.',
    provenance: ['method', 'who verified', 'date', 'version or environment'],
    limitations: 'Reading code is not testing behavior. A declared option is not proof code reads it. A documented claim is not evidence for itself. Anything with external side effects stays unverified unless run safely.',
    retrieval: 'For each high-risk claim, record how it was verified (static, executed, or reported), by whom, when, and against which version. Do not run commands with external side effects.',
    needsProvenance: false,
    item: [field('id', 'string', { required: true }), field('kind', 'enum', { values: ['stale-claim', 'ui-label', 'example', 'api-behavior', 'prerequisite', 'version', 'contradiction', 'procedure'], required: true }), field('page', 'string', { required: true }), field('claim', 'string', { required: true }), field('result', 'enum', { values: ['confirmed', 'partial', 'not-found', 'overstated', 'failed', 'unverified'], required: true }), field('method', 'enum', { values: ['static', 'executed', 'reported'], required: true }), field('verifiedBy', 'string'), field('date', 'date'), field('productDefect', 'boolean'), field('notes', 'string')],
  },
  risk: {
    title: 'Operational risk',
    mode: 'judgment',
    minimumEvidence: 'Named risks for a task or page: errors, limits, quotas, destructive operations, security, authentication, permissions, privacy, backups, rollback, recovery. The script flags pages that mention risky operations; a person judges whether guidance is adequate.',
    provenance: ['who identified the risk', 'source'],
    limitations: 'Public documentation must not reveal private implementation details. A risk marked not public-safe may shape a need but its details must not appear in a published brief.',
    retrieval: 'List the destructive, security, limit, and recovery cases for each task, and mark which details are safe to publish.',
    needsProvenance: false,
    item: [field('id', 'string', { required: true }), field('category', 'enum', { values: ['error', 'limit', 'quota', 'destructive', 'security', 'auth', 'permission', 'privacy', 'backup', 'rollback', 'recovery'], required: true }), field('task', 'string'), field('page', 'string'), field('publicSafe', 'boolean', { required: true }), field('note', 'string')],
  },
  integration: {
    title: 'Integration and workflow completeness',
    mode: 'mixed',
    minimumEvidence: 'For a workflow that spans products or systems, the ordered steps the product actually supports (setup, input, output, callback, error, retry, permission, verification, recovery, production readiness). Steps in the profile are matched to pages by script.',
    provenance: ['source of the workflow description'],
    limitations: 'Feature coverage does not prove end-to-end coverage. Do not require callbacks, retries, or production checklists where the product has none; mark them not applicable.',
    retrieval: 'Describe each multi-system workflow as ordered steps in the profile (task.steps) and mark steps that do not apply.',
    needsProvenance: false,
    item: [field('workflow', 'string', { required: true }), field('step', 'enum', { values: ['setup', 'input', 'output', 'callback', 'error', 'retry', 'permission', 'verify', 'recover', 'production-readiness'], required: true }), field('applies', 'boolean', { required: true }), field('task', 'string'), field('note', 'string')],
  },
  accessibility: {
    title: 'Accessibility and comprehension',
    mode: 'mixed',
    minimumEvidence: 'Mechanical checks from the inventory: heading structure, link text, image alternatives, unexpanded acronyms, instructions that rely on a picture or position. Optional manual findings can be supplied.',
    provenance: ['method', 'who checked'],
    limitations: 'Partial by design. Contrast, keyboard use, focus order, screen readers, rendered output, and localization readiness are not checked mechanically.',
    retrieval: 'Run a full accessibility check (automated and manual) on the pages that matter and record findings with the method and the person who checked.',
    needsProvenance: false,
    item: [field('page', 'string', { required: true }), field('issue', 'string', { required: true }), field('method', 'string', { required: true }), field('checkedBy', 'string', { required: true })],
  },
  governance: {
    title: 'Governance',
    mode: 'mixed',
    minimumEvidence: 'The inventory shows duplicate titles, shared canonicals, redirects, orphans, and date conflicts. Owners and review dates come from the profile or a supplied list.',
    provenance: ['source of ownership and review data'],
    limitations: 'A current timestamp is not proof of current content. Conflicting sources need a person to pick the authority.',
    retrieval: 'List page owners and last review dates, and any known source-of-truth conflicts, for the pages in this area.',
    needsProvenance: false,
    item: [field('page', 'string', { required: true }), field('owner', 'string'), field('reviewedOn', 'date'), field('status', 'enum', { values: ['current', 'stale', 'conflicting', 'duplicate', 'orphaned'] }), field('note', 'string')],
  },
};

const FILE_DIMENSIONS = Object.keys(DIMENSIONS).filter((k) => !DIMENSIONS[k].profileOnly);

function checkItem(item, spec, where, errors) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return errors.push(`${where}: must be an object`);
  for (const f of spec) {
    const v = item[f.name];
    if (v === undefined || v === null || v === '') {
      if (f.required) errors.push(`${where}.${f.name}: is required`);
      continue;
    }
    if (f.type === 'string' && typeof v !== 'string') errors.push(`${where}.${f.name}: must be a string`);
    else if (f.type === 'number' && typeof v !== 'number') errors.push(`${where}.${f.name}: must be a number`);
    else if (f.type === 'boolean' && typeof v !== 'boolean') errors.push(`${where}.${f.name}: must be true or false`);
    else if (f.type === 'array' && !Array.isArray(v)) errors.push(`${where}.${f.name}: must be an array`);
    else if (f.type === 'date' && !(typeof v === 'string' && ISO_DATE.test(v))) errors.push(`${where}.${f.name}: must be an ISO date such as 2026-09-30`);
    else if (f.type === 'enum' && !f.values.includes(v)) errors.push(`${where}.${f.name}: must be one of ${f.values.join(', ')}`);
  }
}

// Validate one signal document. Returns { ok, errors, warnings }.
function validateSignal(dimension, doc) {
  const dim = DIMENSIONS[dimension];
  const errors = [];
  const warnings = [];
  if (!dim || dim.profileOnly) return { ok: false, errors: [`unknown signal dimension "${dimension}"`], warnings };
  if (!doc || typeof doc !== 'object') return { ok: false, errors: ['signal file must be a JSON object'], warnings };
  if (doc.schemaVersion !== SCHEMA) errors.push(`schemaVersion: must be ${SCHEMA}`);
  if (doc.signal !== dimension) errors.push(`signal: must be "${dimension}" (got ${JSON.stringify(doc.signal)})`);
  for (const hit of findSecrets(doc)) errors.push(`${hit.path}: ${hit.reason}; signal files must not contain credentials`);
  const prov = doc.provenance && typeof doc.provenance === 'object' ? doc.provenance : null;
  if (!prov) errors.push('provenance: is required (source, retrievedAt, and for demand and search also approval, timeWindow, and sampling)');
  else {
    if (typeof prov.source !== 'string' || !prov.source) errors.push('provenance.source: is required');
    if (!(typeof prov.retrievedAt === 'string' && ISO_DATE.test(prov.retrievedAt))) errors.push('provenance.retrievedAt: must be an ISO date');
    if (dim.needsProvenance) {
      if (typeof prov.approval !== 'string' || !prov.approval) errors.push('provenance.approval: is required for this signal (say who approved using the export)');
      const w = prov.timeWindow;
      if (!w || !ISO_DATE.test(w.from || '') || !ISO_DATE.test(w.to || '')) errors.push('provenance.timeWindow: needs from and to ISO dates');
      const s = prov.sampling;
      if (!s || typeof s.method !== 'string' || typeof s.biased !== 'boolean') errors.push('provenance.sampling: needs a method and a biased true/false');
    }
  }
  if (!Array.isArray(doc.items)) errors.push('items: must be an array');
  else {
    const seen = new Set();
    doc.items.forEach((it, i) => {
      checkItem(it, dim.item, `items[${i}]`, errors);
      if (it && it.id) {
        if (seen.has(it.id)) errors.push(`items[${i}].id: duplicate id "${it.id}"`);
        seen.add(it.id);
      }
    });
    if (doc.items.length === 0) warnings.push('items is empty: an empty signal is treated as not assessed, not as zero demand');
  }
  return { ok: errors.length === 0, errors, warnings };
}

const day = (iso) => String(iso).slice(0, 10);
const inc = (obj, k, n = 1) => { obj[k] = (obj[k] || 0) + n; };

function matchTask(profile, text, hintTask) {
  if (hintTask && profile.tasks.some((t) => t.id === hintTask)) return { task: hintTask, by: 'declared' };
  const hay = String(text || '').toLowerCase();
  if (!hay) return { task: null, by: null };
  const hit = profile.tasks.find((t) => t.terms.some((term) => hay.includes(term.toLowerCase())));
  return hit ? { task: hit.id, by: 'term' } : { task: null, by: null };
}

const AGGREGATE = {
  tasks(doc, profile) {
    const byTask = {};
    for (const it of doc.items) {
      if (!profile.tasks.some((t) => t.id === it.task)) continue;
      (byTask[it.task] = byTask[it.task] || []).push({ result: it.result, blockedAt: it.blockedAt || null, performedBy: it.performedBy, date: day(it.date) });
    }
    return { byTask, note: 'Each walkthrough covers one path by one person.' };
  },
  demand(doc, profile) {
    const byTask = {};
    const unassigned = [];
    for (const it of doc.items) {
      const m = matchTask(profile, [it.excerpt, ...(it.terms || [])].join(' '), it.task);
      if (!m.task) {
        unassigned.push(it.id);
        continue;
      }
      const t = (byTask[m.task] = byTask[m.task] || { items: 0, threads: new Set(), requesters: new Set(), requestersKnown: true, firstSeen: null, lastSeen: null, impactNotes: [], sourceTypes: {}, examples: 0, assignedByTerm: 0 });
      t.items += 1;
      t.threads.add(it.threadId || it.id);
      // Requesters are counted only from pseudonymous ids, so one person writing twice counts once.
      // A per-message requesterCount is informational and is never summed: that would count messages as people.
      if (Array.isArray(it.requesterIds) && it.requesterIds.length) it.requesterIds.forEach((r) => t.requesters.add(String(r)));
      else t.requestersKnown = false;
      t.firstSeen = !t.firstSeen || day(it.date) < t.firstSeen ? day(it.date) : t.firstSeen;
      t.lastSeen = !t.lastSeen || day(it.date) > t.lastSeen ? day(it.date) : t.lastSeen;
      if (it.impact) t.impactNotes.push(it.impact);
      inc(t.sourceTypes, it.sourceType);
      if (it.exampleRequest) t.examples += 1;
      if (m.by === 'term') t.assignedByTerm += 1;
    }
    const out = {};
    for (const [k, t] of Object.entries(byTask)) {
      out[k] = {
        items: t.items, uniqueThreads: t.threads.size, uniqueRequesters: t.requestersKnown ? t.requesters.size : null,
        firstSeen: t.firstSeen, lastSeen: t.lastSeen, impactNotes: t.impactNotes, sourceTypes: t.sourceTypes, exampleRequests: t.examples, assignedByTerm: t.assignedByTerm,
      };
    }
    const p = doc.provenance;
    return {
      byTask: out, unassigned,
      window: p.timeWindow, biasedSample: p.sampling.biased, samplingMethod: p.sampling.method,
      note: 'Items are messages, not people. uniqueRequesters is null unless every item carries pseudonymous requesterIds. A biased sample shows what was surfaced, not how often it occurs.',
    };
  },
  search(doc, profile) {
    const byTask = {};
    let noResultQueries = 0;
    for (const it of doc.items) {
      if (it.noResults) noResultQueries += 1;
      const m = matchTask(profile, it.query, null);
      if (!m.task) continue;
      const t = (byTask[m.task] = byTask[m.task] || { queries: 0, searches: 0, noResultQueries: 0 });
      t.queries += 1;
      t.searches += it.count;
      if (it.noResults) t.noResultQueries += 1;
    }
    return { byTask, totalQueries: doc.items.length, noResultQueries, window: doc.provenance.timeWindow, biasedSample: doc.provenance.sampling.biased, note: 'A no-result query is a lead about missing or unfindable content. Search volume and its absence never lower a need.' };
  },
  release(doc) {
    const byFeature = {};
    const byTask = {};
    for (const it of doc.items) {
      if (it.task) (byTask[it.task] = byTask[it.task] || []).push({ feature: it.feature, status: it.status, publicEvidence: it.publicEvidence || null, date: it.date || null });
    }
    for (const it of doc.items) byFeature[it.feature.toLowerCase()] = { status: it.status, publicEvidence: it.publicEvidence || null, breaking: Boolean(it.breaking), defaultChanged: Boolean(it.defaultChanged), upgradePath: it.upgradePath === undefined ? null : it.upgradePath, releaseNoteOnly: Boolean(it.releaseNoteOnly), date: it.date || null };
    return { byFeature, byTask, note: 'A feature is publicly available only with public evidence. An item with a task id speaks for that task directly.' };
  },
  accuracy(doc) {
    const byPage = {};
    const productDefects = [];
    for (const it of doc.items) {
      if (it.productDefect) productDefects.push({ id: it.id, page: it.page, claim: it.claim });
      const p = (byPage[it.page] = byPage[it.page] || { total: 0, byResult: {}, executed: 0, staticOnly: 0 });
      p.total += 1;
      inc(p.byResult, it.result);
      if (it.method === 'executed') p.executed += 1;
      else if (it.method === 'reported') p.reportedOnly = (p.reportedOnly || 0) + 1;
      else p.staticOnly += 1;
    }
    return { byPage, productDefects, note: 'Static checks are source-attested, not fired. Product defects are tracked apart from documentation fixes.' };
  },
  risk(doc) {
    const byTask = {};
    let notPublicSafe = 0;
    for (const it of doc.items) {
      if (!it.publicSafe) notPublicSafe += 1;
      const k = it.task || it.page || 'unassigned';
      (byTask[k] = byTask[k] || []).push({ id: it.id, category: it.category, publicSafe: it.publicSafe });
    }
    return { byTask, notPublicSafe, note: 'Details of risks marked not public-safe must not appear in a published brief.' };
  },
  integration(doc) {
    const byWorkflow = {};
    for (const it of doc.items) (byWorkflow[it.workflow] = byWorkflow[it.workflow] || []).push({ step: it.step, applies: it.applies, task: it.task || null });
    return { byWorkflow, note: 'Steps marked not applicable are not gaps.' };
  },
  accessibility(doc) {
    return { findings: doc.items.length, byPage: doc.items.reduce((o, it) => { inc(o, it.page); return o; }, {}), note: 'Manual findings supplement, and do not replace, a full accessibility audit.' };
  },
  governance(doc) {
    return { pages: doc.items.length, owners: doc.items.filter((i) => i.owner).length, byStatus: doc.items.reduce((o, i) => { if (i.status) inc(o, i.status); return o; }, {}), note: 'A recent review date is not proof of current content.' };
  },
};

// Load every signal the profile points to. Missing, invalid, or empty inputs are "not assessed".
function loadSignals(profile, { areaDir }) {
  const result = {};
  for (const dim of Object.keys(DIMENSIONS)) {
    const d = DIMENSIONS[dim];
    const base = { dimension: dim, title: d.title, mode: d.mode, minimumEvidence: d.minimumEvidence, limitations: d.limitations };
    if (d.profileOnly) {
      if (dim === 'audience' && !(profile.area.audience || []).length) {
        result[dim] = { ...base, status: 'not assessed', reason: 'the profile names no audiences; an axis nobody named is not assessed', retrievalRequest: d.retrieval };
        continue;
      }
      result[dim] = { ...base, status: 'assessed', reason: dim === 'audience' ? 'from the profile' : 'from the page inventory (assessed when the inventory stage completes; see the inventory status)', source: 'profile', summary: dim === 'audience' ? { audiences: profile.area.audience, environments: profile.environments } : null };
      continue;
    }
    const rel = profile.inputs[dim];
    if (!rel) {
      result[dim] = { ...base, status: 'not assessed', reason: 'no input declared in the profile', retrievalRequest: d.retrieval };
      continue;
    }
    const file = path.join(areaDir, rel);
    if (realInside(areaDir, file) === false) {
      result[dim] = { ...base, status: 'not assessed', reason: `input path resolves outside the workspace (a symlink): ${rel}. It was not read`, retrievalRequest: d.retrieval };
      continue;
    }
    let raw;
    try {
      raw = fs.readFileSync(file, 'utf8');
    } catch {
      result[dim] = { ...base, status: 'not assessed', reason: `input file not found: ${rel}`, retrievalRequest: d.retrieval };
      continue;
    }
    let doc;
    try {
      doc = JSON.parse(raw);
    } catch {
      result[dim] = { ...base, status: 'not assessed', reason: 'input file is not valid JSON', retrievalRequest: d.retrieval };
      continue;
    }
    const v = validateSignal(dim, doc);
    if (!v.ok) {
      result[dim] = { ...base, status: 'not assessed', reason: 'input failed validation, so none of it was used', errors: v.errors, retrievalRequest: d.retrieval };
      continue;
    }
    if (doc.items.length === 0) {
      result[dim] = { ...base, status: 'not assessed', reason: 'input has no items; an empty export is not evidence of no need', retrievalRequest: d.retrieval };
      continue;
    }
    result[dim] = { ...base, status: 'assessed', reason: 'input validated', source: { file: rel, sha256: sha256(raw), retrievedAt: doc.provenance.retrievedAt, system: doc.provenance.source }, warnings: v.warnings, summary: AGGREGATE[dim](doc, profile), provenance: doc.provenance, items: doc.items };
  }
  return result;
}

function describeMarkdown() {
  const out = ['# Signal dimensions', '', 'Generated by `node scripts/signals.cjs describe --markdown`. Do not edit by hand; edit `scripts/lib/signals.cjs`.', ''];
  for (const [id, d] of Object.entries(DIMENSIONS)) {
    out.push(`## ${d.title} (\`${id}\`)`, '', `- Assessment: ${d.mode === 'deterministic' ? 'deterministic' : d.mode === 'judgment' ? 'needs human or Claude judgment' : 'a script gathers and flags; a person or Claude judges'}`);
    out.push(`- Input: ${d.profileOnly ? 'the profile and the inventory (no signal file)' : `a signal file named in the profile under \`inputs.${id}\``}`);
    out.push(`- Minimum evidence: ${d.minimumEvidence}`);
    out.push(`- Provenance needed: ${d.provenance.join('; ')}`);
    out.push(`- Limitations: ${d.limitations}`);
    out.push(`- If missing: status "not assessed". Request: ${d.retrieval}`);
    if (d.item.length) out.push(`- Item fields: ${d.item.map((f) => `\`${f.name}\`${f.required ? '*' : ''} (${f.type === 'enum' ? f.values.join('|') : f.type})`).join(', ')} (* required)`);
    out.push('');
  }
  return out.join('\n');
}

module.exports = { DIMENSIONS, FILE_DIMENSIONS, SCHEMA, validateSignal, loadSignals, describeMarkdown, matchTask };
