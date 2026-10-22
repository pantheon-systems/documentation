'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { validateProfile } = require('../scripts/lib/profile.cjs');
const { assessMaturity } = require('../scripts/lib/matrix.cjs');
const { build } = require('../scripts/lib/recommend.cjs');

const EXAMPLE = path.join(__dirname, '..', 'examples', 'widgets.profile.json');
const base = () => JSON.parse(fs.readFileSync(EXAMPLE, 'utf8'));
const validate = (p) => validateProfile(p, { baseDir: path.dirname(EXAMPLE) });

test('priority.demandBands is validated, kept in the normalized profile, and defaults to 3', () => {
  assert.equal(validate(base()).profile.priority.demandBands.repeated, 3);
  const p = base();
  p.priority = { demandBands: { repeated: 2 } };
  assert.equal(validate(p).profile.priority.demandBands.repeated, 2);
  for (const bad of [{ demandBands: { repeated: 0 } }, { demandBands: { repeated: 'x' } }, { demandBands: [] }, []]) {
    const q = base();
    q.priority = bad;
    assert.equal(validate(q).ok, false, JSON.stringify(bad));
  }
});

test('a profile threshold changes the demand band a recommendation uses', () => {
  const p = base();
  p.priority = { demandBands: { repeated: 2 } };
  const profile = validate(p).profile;
  const task = profile.tasks.find((t) => t.id === 'recover-deleted-widget');
  const sig = { demand: { status: 'assessed', dimension: 'demand', summary: { byTask: { [task.id]: { items: 3, uniqueThreads: 2, uniqueRequesters: null, firstSeen: '2026-08-01', lastSeen: '2026-09-01', impactNotes: [], sourceTypes: {}, exampleRequests: 0, assignedByTerm: 0 } }, biasedSample: true }, source: { sha256: 'x', retrievedAt: '2026-10-01' } } };
  const matrix = { boundary: { pagesExamined: 3, inventoryComplete: true }, bottleneck: { stage: null }, tasks: [{ task: task.id, title: task.title, stage: task.stage, audience: task.audience, required: true, status: 'mention-only', cells: [], matched: [{ path: '/widgets/api-reference', strength: 'strong', pageType: 'reference', scope: 'area' }], boundary: { pagesExamined: 3, inventoryComplete: true, terms: [] }, expectedTypes: ['how-to'] }] };
  const recs = build({ profile, matrix, candidates: [], signals: { ...sig, release: { status: 'not assessed', dimension: 'release', retrievalRequest: 'x' } }, health: null, claims: [], classifications: [], inventory: { complete: true } });
  const rec = recs.find((r) => r.task === task.id);
  assert.equal(rec.demandSummary.band, 'repeated');
});

test('attestations validate, fill an unassessed criterion as reported, and never override observed evidence', () => {
  const p = base();
  p.attestations = [{ criterion: 'I1', statement: 'docs are part of the definition of done', source: 'team handbook', date: '2026-09-30' }];
  const v = validate(p);
  assert.equal(v.ok, true, JSON.stringify(v.errors));
  for (const bad of [{ criterion: 'Z9', statement: 'x', source: 's', date: '2026-09-30' }, { criterion: 'I1', statement: '', source: 's', date: '2026-09-30' }, { criterion: 'I1', statement: 'x', source: '', date: '2026-09-30' }, { criterion: 'I1', statement: 'x', source: 's', date: 'soon' }]) {
    const q = base();
    q.attestations = [bad];
    assert.equal(validate(q).ok, false, JSON.stringify(bad));
  }
  const matrix = { tasks: [], boundary: {} };
  const common = { matrix, pages: [], health: { placeholders: [{ path: '/x' }], links: { brokenInternalByCrawl: [] } }, candidates: [], signals: {}, inventory: { complete: true }, profile: v.profile };
  const m = assessMaturity(common);
  const i1 = m.levels[2].criteria.find((c) => c.id === 'I1');
  assert.equal(i1.status, 'met');
  assert.equal(i1.attested, true);
  assert.match(i1.note, /attested, not observed/);
  assert.match(i1.note, /posture reported/);
  const f3 = m.levels[1].criteria.find((c) => c.id === 'F3');
  assert.equal(f3.status, 'unmet', 'observed placeholder text is not overridden');
  const q = base();
  q.attestations = [{ criterion: 'F3', statement: 'no placeholders anywhere', source: 'a colleague', date: '2026-09-30' }];
  const m2 = assessMaturity({ ...common, profile: validate(q).profile });
  const f3b = m2.levels[1].criteria.find((c) => c.id === 'F3');
  assert.equal(f3b.status, 'unmet');
  assert.match(f3b.note, /observed evidence decides/);
});
