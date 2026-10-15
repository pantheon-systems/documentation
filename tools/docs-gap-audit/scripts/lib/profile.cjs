'use strict';

// Area profile: a versioned JSON file that scopes one audit to one documentation area.
// Shared code holds the schema and synthetic examples; real profiles live in a private workspace.

const path = require('node:path');
const { globToRegExp, matchesAny, normalizeUrlPath, resolveWithin } = require('./paths.cjs');
const { hashObject } = require('./hash.cjs');
const { findSecrets } = require('./secrets.cjs');

const SCHEMA_VERSION = 1;
const SLUG = /^[a-z0-9][a-z0-9-]{1,62}$/;
const MATURITY_CRITERIA = ['S1', 'S2', 'S3', 'F1', 'F2', 'F3', 'I1', 'I2', 'I3', 'E1', 'E2'];
const JOURNEYS = ['evaluate', 'first-success', 'configure', 'develop', 'deploy', 'operate', 'troubleshoot', 'recover', 'migrate', 'offboard'];
const STAGES = ['discover', 'evaluate', 'start', 'build', 'operate', 'upgrade'];
const TYPES = ['tutorial', 'how-to', 'reference', 'explanation', 'troubleshooting', 'migration'];
const SOURCE_KINDS = ['repo', 'planning', 'changelog', 'releases', 'docs', 'readme', 'export'];
const SIGNAL_INPUTS = ['tasks', 'demand', 'search', 'release', 'accuracy', 'risk', 'integration', 'accessibility', 'governance'];
const RELEASE_STATUSES = ['shipped', 'limited', 'planned'];
// Default journey-to-stage mapping, used when a task names a journey but no stage.
const JOURNEY_STAGE = {
  evaluate: 'evaluate', 'first-success': 'start', configure: 'start', develop: 'build', deploy: 'build',
  operate: 'operate', troubleshoot: 'operate', recover: 'operate', migrate: 'upgrade', offboard: 'upgrade',
};

const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
const isStrArr = (v) => Array.isArray(v) && v.every((x) => typeof x === 'string' && x.trim() !== '');

function localHost(host) {
  return /^(localhost|127\.0\.0\.1|\[::1\])$/.test(host) || /\.(localhost|test)$/.test(host);
}

function validateGlobs(errors, where, list, { required = false } = {}) {
  if (list === undefined) {
    if (required) errors.push({ path: where, message: 'is required' });
    return [];
  }
  if (!isStrArr(list)) {
    errors.push({ path: where, message: 'must be an array of non-empty strings' });
    return [];
  }
  for (const p of list) {
    if (!p.startsWith('/')) errors.push({ path: where, message: `pattern "${p}" must start with "/"` });
    else {
      try {
        globToRegExp(p);
      } catch {
        errors.push({ path: where, message: `pattern "${p}" is not a valid glob` });
      }
    }
  }
  return list;
}

// Validate and normalize. baseDir resolves relative local source paths; allowedRoots are the
// only places local sources may live (default: baseDir).
function validateProfile(input, { baseDir = process.cwd(), allowedRoots = [] } = {}) {
  const errors = [];
  const warnings = [];
  if (!isObj(input)) return { ok: false, errors: [{ path: '$', message: 'profile must be a JSON object' }], warnings, profile: null };
  if (input.schemaVersion !== SCHEMA_VERSION) {
    errors.push({ path: 'schemaVersion', message: `must be ${SCHEMA_VERSION} (got ${JSON.stringify(input.schemaVersion)})` });
  }
  for (const hit of findSecrets(input)) errors.push({ path: hit.path, message: `${hit.reason}: profiles must not contain credentials; reference a connector instead` });

  const area = isObj(input.area) ? input.area : {};
  if (!SLUG.test(area.id || '')) errors.push({ path: 'area.id', message: 'must be a lowercase slug of 2 to 63 characters (letters, digits, hyphens)' });
  if (typeof area.name !== 'string' || !area.name.trim()) errors.push({ path: 'area.name', message: 'is required' });
  if (area.audience !== undefined && !isStrArr(area.audience)) errors.push({ path: 'area.audience', message: 'must be an array of non-empty strings' });
  if (area.owner !== undefined && typeof area.owner !== 'string') errors.push({ path: 'area.owner', message: 'must be a string' });

  const site = isObj(input.site) ? input.site : {};
  let origin = null;
  try {
    const u = new URL(site.origin);
    if (u.protocol !== 'https:' && !(u.protocol === 'http:' && localHost(u.hostname))) throw new Error('scheme');
    if (u.pathname !== '/' || u.search || u.hash || u.username || u.password) throw new Error('shape');
    origin = u.origin;
  } catch {
    errors.push({ path: 'site.origin', message: 'must be an https origin such as https://docs.example.test (http only for localhost or .test hosts), with no path, query, or credentials' });
  }

  const scope = isObj(input.scope) ? input.scope : {};
  const crawl = isObj(scope.crawl) ? scope.crawl : {};
  const crawlInclude = validateGlobs(errors, 'scope.crawl.include', crawl.include, { required: true });
  if (crawl.include !== undefined && crawlInclude.length === 0 && isStrArr(crawl.include)) errors.push({ path: 'scope.crawl.include', message: 'must not be empty: say what the audit may crawl' });
  const crawlExclude = validateGlobs(errors, 'scope.crawl.exclude', crawl.exclude);
  const report = isObj(scope.report) ? scope.report : {};
  const reportInclude = report.include === undefined ? crawlInclude : validateGlobs(errors, 'scope.report.include', report.include);
  const reportExclude = validateGlobs(errors, 'scope.report.exclude', report.exclude);
  const related = [];
  if (scope.related !== undefined && !Array.isArray(scope.related)) errors.push({ path: 'scope.related', message: 'must be an array' });
  (Array.isArray(scope.related) ? scope.related : []).forEach((r, i) => {
    if (!isObj(r) || !SLUG.test(r.id || '')) errors.push({ path: `scope.related[${i}].id`, message: 'must be a slug' });
    const paths = validateGlobs(errors, `scope.related[${i}].paths`, isObj(r) ? r.paths : undefined, { required: true });
    related.push({ id: r && r.id, paths, note: (r && r.note) || '' });
  });
  const evidence = isObj(scope.evidence) ? scope.evidence : {};
  const evidenceInclude = evidence.include === undefined ? [...new Set([...reportInclude, ...related.flatMap((r) => r.paths)])] : validateGlobs(errors, 'scope.evidence.include', evidence.include);
  // Whatever the crawl may not fetch cannot be evidence, so crawl exclusions always apply to evidence too.
  const evidenceExclude = [...new Set([...crawlExclude, ...validateGlobs(errors, 'scope.evidence.exclude', evidence.exclude)])];
  for (const r of related) {
    const covered = crawlInclude.includes('/**') || r.paths.every((rp) => crawlInclude.includes(rp));
    if (!covered) warnings.push({ path: `scope.related[${related.indexOf(r)}]`, message: `related area "${r.id}" is outside scope.crawl.include: those pages will not be fetched, so evidence from them is unavailable` });
  }

  const sources = isObj(input.sources) ? input.sources : {};
  const roots = [baseDir, ...allowedRoots];
  const local = [];
  const ids = new Set();
  (Array.isArray(sources.local) ? sources.local : sources.local === undefined ? [] : (errors.push({ path: 'sources.local', message: 'must be an array' }), [])).forEach((s, i) => {
    const where = `sources.local[${i}]`;
    if (!isObj(s) || !SLUG.test(s.id || '')) return errors.push({ path: `${where}.id`, message: 'must be a slug' });
    if (ids.has(s.id)) errors.push({ path: `${where}.id`, message: `duplicate source id "${s.id}"` });
    ids.add(s.id);
    if (!SOURCE_KINDS.includes(s.kind)) errors.push({ path: `${where}.kind`, message: `must be one of ${SOURCE_KINDS.join(', ')}` });
    if (typeof s.path !== 'string' || !s.path) return errors.push({ path: `${where}.path`, message: 'is required' });
    const resolved = resolveWithin(baseDir, s.path, roots);
    if (!resolved.ok) {
      const how = resolved.reason === 'not found' ? 'warnings' : 'errors';
      (how === 'errors' ? errors : warnings).push({ path: `${where}.path`, message: `${resolved.reason}${how === 'errors' ? ' (pass --allow-root to permit it)' : ''}` });
    }
    local.push({ id: s.id, kind: s.kind, path: s.path, abs: resolved.real || resolved.abs, role: s.role || null, public: s.public === undefined ? null : Boolean(s.public) });
  });
  const connectors = [];
  (Array.isArray(sources.connectors) ? sources.connectors : sources.connectors === undefined ? [] : (errors.push({ path: 'sources.connectors', message: 'must be an array' }), [])).forEach((c, i) => {
    const where = `sources.connectors[${i}]`;
    if (!isObj(c) || !SLUG.test(c.id || '')) return errors.push({ path: `${where}.id`, message: 'must be a slug' });
    if (ids.has(c.id)) errors.push({ path: `${where}.id`, message: `duplicate source id "${c.id}"` });
    ids.add(c.id);
    if (typeof c.connector !== 'string' || !c.connector) errors.push({ path: `${where}.connector`, message: 'is required (for example "drive" or "jira")' });
    if (typeof c.ref !== 'string' || !c.ref) errors.push({ path: `${where}.ref`, message: 'is required: a query, folder, or project reference with no credentials' });
    if (typeof c.stagedAs !== 'string' || !c.stagedAs || path.isAbsolute(c.stagedAs) || c.stagedAs.split(/[\\/]/).includes('..')) {
      errors.push({ path: `${where}.stagedAs`, message: 'must be a relative path inside the private staging folder' });
    }
    connectors.push({ id: c.id, connector: c.connector, ref: c.ref, stagedAs: c.stagedAs, purpose: c.purpose || null, public: c.public === undefined ? null : Boolean(c.public) });
  });

  const vocab = isObj(input.vocabulary) ? input.vocabulary : {};
  const aliases = {};
  if (vocab.aliases !== undefined && !isObj(vocab.aliases)) errors.push({ path: 'vocabulary.aliases', message: 'must be an object of term: [aliases]' });
  for (const [k, v] of Object.entries(isObj(vocab.aliases) ? vocab.aliases : {})) {
    if (!isStrArr(v)) errors.push({ path: `vocabulary.aliases.${k}`, message: 'must be an array of strings' });
    else aliases[k] = v;
  }
  if (vocab.identifiers !== undefined && !isStrArr(vocab.identifiers)) errors.push({ path: 'vocabulary.identifiers', message: 'must be an array of strings' });

  const tasks = [];
  const taskIds = new Set();
  (Array.isArray(input.tasks) ? input.tasks : input.tasks === undefined ? [] : (errors.push({ path: 'tasks', message: 'must be an array' }), [])).forEach((t, i) => {
    const where = `tasks[${i}]`;
    if (!isObj(t) || !SLUG.test(t.id || '')) return errors.push({ path: `${where}.id`, message: 'must be a slug' });
    if (taskIds.has(t.id)) errors.push({ path: `${where}.id`, message: `duplicate task id "${t.id}"` });
    taskIds.add(t.id);
    if (typeof t.title !== 'string' || !t.title.trim()) errors.push({ path: `${where}.title`, message: 'is required' });
    if (!isStrArr(t.terms) || t.terms.length === 0) errors.push({ path: `${where}.terms`, message: 'needs at least one term the docs would use for this task' });
    if (t.journey !== undefined && !JOURNEYS.includes(t.journey)) errors.push({ path: `${where}.journey`, message: `must be one of ${JOURNEYS.join(', ')}` });
    const stage = t.stage || (t.journey ? JOURNEY_STAGE[t.journey] : null);
    if (!STAGES.includes(stage)) errors.push({ path: `${where}.stage`, message: `needs a stage (${STAGES.join(', ')}) or a journey that implies one` });
    const expected = t.expectedTypes === undefined ? null : t.expectedTypes;
    if (expected !== null && (!isStrArr(expected) || expected.some((x) => !TYPES.includes(x)))) errors.push({ path: `${where}.expectedTypes`, message: `must be a subset of ${TYPES.join(', ')}` });
    if (t.applicable !== undefined && typeof t.applicable !== 'boolean') errors.push({ path: `${where}.applicable`, message: 'must be true or false' });
    const steps = (Array.isArray(t.steps) ? t.steps : []).map((s, j) => {
      if (!isObj(s) || !SLUG.test(s.id || '') || !isStrArr(s.terms) || s.terms.length === 0) errors.push({ path: `${where}.steps[${j}]`, message: 'needs a slug id and at least one term' });
      return { id: s && s.id, title: (s && s.title) || (s && s.id), terms: (s && s.terms) || [] };
    });
    tasks.push({
      id: t.id, title: t.title, journey: t.journey || null, stage, audience: t.audience || null, terms: t.terms || [],
      expectedTypes: expected, applicable: t.applicable !== false, required: t.required !== false, steps,
      effortHint: t.effortHint || null,
    });
  });

  const env = isObj(input.environments) ? input.environments : {};
  for (const k of ['supported', 'platforms']) if (env[k] !== undefined && !isStrArr(env[k])) errors.push({ path: `environments.${k}`, message: 'must be an array of strings' });

  const rel = isObj(input.release) ? input.release : {};
  if (rel.defaultStatus !== undefined && !RELEASE_STATUSES.includes(rel.defaultStatus)) errors.push({ path: 'release.defaultStatus', message: `must be one of ${RELEASE_STATUSES.join(', ')}` });

  const auth = isObj(input.authority) ? input.authority : {};
  if (auth.order !== undefined && !isStrArr(auth.order)) errors.push({ path: 'authority.order', message: 'must be an array of strings, most authoritative first' });
  const fresh = isObj(auth.freshness) ? auth.freshness : {};
  if (fresh.maxAgeDays !== undefined && !(Number.isInteger(fresh.maxAgeDays) && fresh.maxAgeDays > 0)) errors.push({ path: 'authority.freshness.maxAgeDays', message: 'must be a positive integer' });

  const priorityIn = isObj(input.priority) ? input.priority : {};
  const bands = isObj(priorityIn.demandBands) ? priorityIn.demandBands : {};
  if (input.priority !== undefined && !isObj(input.priority)) errors.push({ path: 'priority', message: 'must be an object' });
  if (priorityIn.demandBands !== undefined && !isObj(priorityIn.demandBands)) errors.push({ path: 'priority.demandBands', message: 'must be an object such as { "repeated": 3 }' });
  if (bands.repeated !== undefined && !(Number.isInteger(bands.repeated) && bands.repeated >= 1)) errors.push({ path: 'priority.demandBands.repeated', message: 'must be an integer of 1 or more (unique threads that count as repeated demand)' });

  // Process evidence a person attests to (for example "docs are in the definition of done"). It is recorded as reported,
  // with a source and date, and it can fill a criterion that would otherwise be "not assessed". It never overrides observed evidence.
  const attestations = [];
  if (input.attestations !== undefined && !Array.isArray(input.attestations)) errors.push({ path: 'attestations', message: 'must be an array' });
  (Array.isArray(input.attestations) ? input.attestations : []).forEach((a, i) => {
    const where = `attestations[${i}]`;
    if (!isObj(a) || !MATURITY_CRITERIA.includes(a.criterion)) return errors.push({ path: `${where}.criterion`, message: `must be one of ${MATURITY_CRITERIA.join(', ')}` });
    if (typeof a.statement !== 'string' || !a.statement.trim()) errors.push({ path: `${where}.statement`, message: 'is required' });
    if (typeof a.source !== 'string' || !a.source.trim()) errors.push({ path: `${where}.source`, message: 'is required: who or what says so' });
    if (!(typeof a.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(a.date))) errors.push({ path: `${where}.date`, message: 'must be an ISO date such as 2026-09-30' });
    attestations.push({ criterion: a.criterion, statement: a.statement, source: a.source, date: a.date });
  });

  const inputsIn = isObj(input.inputs) ? input.inputs : {};
  const inputs = {};
  for (const [k, v] of Object.entries(inputsIn)) {
    if (!SIGNAL_INPUTS.includes(k)) errors.push({ path: `inputs.${k}`, message: `unknown signal input; expected one of ${SIGNAL_INPUTS.join(', ')}` });
    else if (typeof v !== 'string' || path.isAbsolute(v) || v.split(/[\\/]/).includes('..')) errors.push({ path: `inputs.${k}`, message: 'must be a relative path inside the private workspace' });
    else inputs[k] = v;
  }

  if (errors.length) return { ok: false, errors, warnings, profile: null };
  const profile = {
    schemaVersion: SCHEMA_VERSION,
    area: { id: area.id, name: area.name, owner: area.owner || null, audience: area.audience || [] },
    site: { origin },
    scope: {
      crawl: { include: crawlInclude, exclude: crawlExclude },
      report: { include: reportInclude, exclude: reportExclude },
      evidence: { include: evidenceInclude, exclude: evidenceExclude },
      related,
    },
    sources: { local, connectors },
    vocabulary: { aliases, identifiers: vocab.identifiers || [] },
    tasks,
    environments: { supported: env.supported || [], platforms: env.platforms || [], notes: env.notes || '' },
    release: { defaultStatus: rel.defaultStatus || 'shipped', publicEvidenceRequired: rel.publicEvidenceRequired !== false },
    authority: { order: auth.order || ['code', 'tests', 'release-notes', 'docs'], freshness: { maxAgeDays: fresh.maxAgeDays || 365, byKind: isObj(fresh.byKind) ? fresh.byKind : {} } },
    priority: { demandBands: { repeated: bands.repeated || 3 } },
    attestations,
    inputs,
  };
  return { ok: true, errors, warnings, profile };
}

// Where a URL sits relative to the profile. Exclusions win over inclusions.
function scopeOf(profile, url) {
  let u;
  try {
    u = new URL(url);
  } catch {
    return { crawl: false, report: false, evidence: false, related: null, reason: 'not a URL' };
  }
  if (u.origin !== profile.site.origin) return { crawl: false, report: false, evidence: false, related: null, reason: 'other origin' };
  const p = normalizeUrlPath(u.pathname);
  const s = profile.scope;
  const crawl = matchesAny(p, s.crawl.include) && !matchesAny(p, s.crawl.exclude);
  const report = matchesAny(p, s.report.include) && !matchesAny(p, s.report.exclude);
  const relatedHit = s.related.find((r) => matchesAny(p, r.paths));
  const evidence = (matchesAny(p, s.evidence.include) && !matchesAny(p, s.evidence.exclude)) || Boolean(relatedHit && !matchesAny(p, s.evidence.exclude));
  return { crawl, report, evidence, related: relatedHit && !report ? relatedHit.id : null, reason: null };
}

const profileHash = (profile) => hashObject(profile);

// Terms for a task or identifier, with the profile's aliases expanded both ways.
function expandTerms(profile, terms) {
  const out = new Set(terms);
  for (const [canon, alts] of Object.entries(profile.vocabulary.aliases)) {
    const group = [canon, ...alts];
    if (group.some((g) => out.has(g))) group.forEach((g) => out.add(g));
  }
  return [...out];
}

module.exports = {
  SCHEMA_VERSION, MATURITY_CRITERIA, JOURNEYS, STAGES, TYPES, SOURCE_KINDS, SIGNAL_INPUTS, RELEASE_STATUSES, JOURNEY_STAGE,
  validateProfile, scopeOf, profileHash, expandTerms,
};
