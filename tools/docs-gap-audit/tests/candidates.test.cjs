'use strict';

// Candidate identity, dedupe, status and posture resolution. Synthetic fixtures only.
// Tests whose names start with "BUG:" are regression tests for bugs found and fixed; they pass.

const test = require('node:test');
const assert = require('node:assert/strict');
const { dedupe, candidateId, normalizeName, resolve, POSTURE_RANK } = require('../scripts/lib/candidates.cjs');

// Build an extractSource-shaped candidate with its provenance entry.
function make({ name = 'Widget sharing', kind = 'tool', status = 'shipped', file = 'src/server.js', line = 1, sourceId = 'repo', extractor = 'code-tool-definition', confidence = 'high', posture = 'observed' } = {}) {
  return {
    name, kind, status, source: `${file}:${line}`, evidence: `evidence for ${name}`, terms: null,
    provenance: { sourceId, file, line, excerpt: `evidence for ${name}`, extractor: { id: extractor, version: 1 }, confidence, posture, status },
  };
}

const one = (items, opts) => {
  const out = dedupe(items, opts);
  assert.equal(out.length, 1, 'expected the items to merge into one candidate');
  return out[0];
};

// ---------------------------------------------------------------- candidateId

test('candidateId: starts with c_ followed by 12 hex characters', () => {
  assert.match(candidateId('area-a', 'Widget sharing'), /^c_[0-9a-f]{12}$/);
});

test('candidateId: stable across calls', () => {
  assert.equal(candidateId('area-a', 'Widget sharing'), candidateId('area-a', 'Widget sharing'));
});

test('candidateId: ignores case and whitespace differences in the name', () => {
  const base = candidateId('area-a', 'Widget sharing');
  assert.equal(candidateId('area-a', '  WIDGET   Sharing  '), base);
  assert.equal(candidateId('area-a', 'widget\tsharing'), base);
  assert.equal(candidateId('area-a', 'widget\nsharing'), base);
});

test('candidateId: differs by area id and by name', () => {
  assert.notEqual(candidateId('area-a', 'Widget sharing'), candidateId('area-b', 'Widget sharing'));
  assert.notEqual(candidateId('area-a', 'Widget sharing'), candidateId('area-a', 'Widget archive'));
});

test('candidateId: a missing area id is its own stable scope', () => {
  assert.equal(candidateId(undefined, 'Widget sharing'), candidateId(null, 'Widget sharing'));
  assert.equal(candidateId(undefined, 'Widget sharing'), candidateId('', 'Widget sharing'));
  assert.notEqual(candidateId(undefined, 'Widget sharing'), candidateId('area-a', 'Widget sharing'));
});

test('normalizeName: lowercases and collapses whitespace', () => {
  assert.equal(normalizeName('  Widget \t  SHARING\n'), 'widget sharing');
});

test('dedupe: candidate id equals candidateId(areaId, name) and area is recorded', () => {
  const c = one([make({ name: 'Widget Sharing' })], { areaId: 'area-a' });
  assert.equal(c.id, candidateId('area-a', 'widget sharing'));
  assert.equal(c.area, 'area-a');
  const unscoped = one([make({ name: 'Widget Sharing' })]);
  assert.equal(unscoped.area, null);
  assert.notEqual(unscoped.id, c.id);
});

// ---------------------------------------------------------------- dedupe

test('dedupe: the same name from two sources merges and keeps both provenance entries and both source strings', () => {
  const a = make({ name: 'Widget sharing', file: 'src/server.js', line: 5, sourceId: 'repo' });
  const b = make({ name: '  widget   SHARING ', kind: 'changelog-item', status: 'shipped', file: 'CHANGELOG.md', line: 11, sourceId: 'changelog', extractor: 'doc-item', confidence: 'low', posture: 'reported' });
  const c = one([a, b]);
  assert.deepEqual(c.sources, ['src/server.js:5', 'CHANGELOG.md:11']);
  assert.equal(c.provenance.length, 2);
  assert.deepEqual(c.provenance.map((p) => p.sourceId), ['repo', 'changelog']);
  assert.deepEqual(c.provenance.map((p) => p.file), ['src/server.js', 'CHANGELOG.md']);
  assert.deepEqual(c.provenance.map((p) => p.extractor.id), ['code-tool-definition', 'doc-item']);
  assert.deepEqual(c.kinds, ['tool', 'changelog-item']);
  assert.equal(c.name, 'Widget sharing', 'the first name seen is kept');
  assert.equal(c.evidence.independentSources, 2);
});

test('dedupe: distinct names stay separate candidates', () => {
  const out = dedupe([make({ name: 'Widget sharing' }), make({ name: 'Widget archive' })]);
  assert.equal(out.length, 2);
  assert.notEqual(out[0].id, out[1].id);
});

test('dedupe: a repeated kind is listed once, repeated evidence from one file counts as one source', () => {
  const c = one([make({ line: 1 }), make({ line: 9 })]);
  assert.deepEqual(c.kinds, ['tool']);
  assert.equal(c.provenance.length, 2);
  assert.equal(c.sources.length, 2);
  assert.equal(c.evidence.independentSources, 1);
});

test('dedupe: does not mutate its input items', () => {
  const a = make({ name: 'Widget sharing' });
  const b = make({ name: 'widget sharing', file: 'CHANGELOG.md' });
  const snapshot = JSON.stringify([a, b]);
  dedupe([a, b]);
  assert.equal(JSON.stringify([a, b]), snapshot);
});

test('dedupe: an item with no provenance still produces a candidate with unverified posture', () => {
  const c = one([{ name: 'Widget sharing', kind: 'tool', status: 'shipped', source: 'a.js:1' }]);
  assert.deepEqual(c.provenance, []);
  assert.equal(c.evidence.posture, 'unverified');
  assert.equal(c.evidence.extractionConfidence, 'low');
  assert.equal(c.evidence.independentSources, 0);
});

test('dedupe: terms fall back to name variants when the item has none, and are kept when it has them', () => {
  assert.deepEqual(one([make({ name: 'widget_share' })]).terms, ['widget_share', 'widget share', 'widget-share']);
  const withTerms = make({ name: 'widget_share' });
  withTerms.terms = ['share link'];
  assert.deepEqual(one([withTerms]).terms, ['share link']);
});

test('dedupe: extraction confidence is the highest across provenance entries', () => {
  const c = one([make({ confidence: 'low' }), make({ confidence: 'high', file: 'b.js' }), make({ confidence: 'medium', file: 'c.js' })]);
  assert.equal(c.evidence.extractionConfidence, 'high');
});

// ---------------------------------------------------------------- status resolution

test('status: a single status resolves to itself with no conflict', () => {
  for (const status of ['planned', 'limited', 'shipped']) {
    const c = one([make({ status, extractor: 'doc-item', file: 'CHANGELOG.md', posture: 'reported' })]);
    assert.equal(c.status, status);
    assert.equal(c.statusConflict, null);
  }
});

test('status: planned + shipped resolves to shipped and statusConflict lists both', () => {
  const planned = make({ status: 'planned', kind: 'planning-item', file: 'plan.md', sourceId: 'planning', extractor: 'doc-item', posture: 'reported', confidence: 'low' });
  const shipped = make({ status: 'shipped', kind: 'release-item', file: 'release.md', sourceId: 'releases', extractor: 'doc-item', posture: 'reported', confidence: 'low' });
  const c = one([planned, shipped]);
  assert.equal(c.status, 'shipped');
  assert.deepEqual([...c.statusConflict].sort(), ['planned', 'shipped']);
  assert.equal(c.provenance.length, 2, 'both entries survive the merge');
});

test('status: the same result regardless of input order', () => {
  const planned = make({ status: 'planned', file: 'plan.md', extractor: 'doc-item', posture: 'reported' });
  const shipped = make({ status: 'shipped', file: 'release.md', extractor: 'doc-item', posture: 'reported' });
  const a = one([planned, shipped]);
  const b = one([shipped, planned]);
  assert.equal(a.status, b.status);
  assert.deepEqual([...a.statusConflict].sort(), [...b.statusConflict].sort());
});

test('status: limited from a changelog text source beats shipped from code', () => {
  const code = make({ status: 'shipped', extractor: 'code-tool-definition', file: 'src/server.js' });
  const text = make({ status: 'limited', kind: 'changelog-item', extractor: 'doc-item', file: 'CHANGELOG.md', sourceId: 'changelog', posture: 'reported', confidence: 'low' });
  const c = one([code, text]);
  assert.equal(c.status, 'limited');
  assert.deepEqual([...c.statusConflict].sort(), ['limited', 'shipped']);
});

test('status: limited from a release post or a changeset also beats shipped from code', () => {
  const code = make({ status: 'shipped', extractor: 'code-tool-definition', file: 'src/server.js' });
  for (const extractor of ['doc-item', 'doc-changeset', 'doc-heading']) {
    const text = make({ status: 'limited', extractor, file: 'release.md', sourceId: 'releases', posture: 'reported', confidence: 'low' });
    assert.equal(one([code, text]).status, 'limited', extractor);
  }
});

test('status: limited from a planning source beats shipped from code', () => {
  const code = make({ status: 'shipped', extractor: 'code-cli-command', file: 'src/cli.js' });
  const text = make({ status: 'limited', kind: 'planning-item', extractor: 'doc-item', file: 'plan.md', sourceId: 'planning', posture: 'reported' });
  assert.equal(one([code, text]).status, 'limited');
});

test('BUG: limited from the readme.txt changelog extractor (wp-readme-changelog) beats shipped from code', () => {
  // candidates.cjs treats any extractor id starting with code-, repo- or wp- as code, but
  // wp-readme-changelog reads changelog text, so its limited status is dropped.
  const code = make({ status: 'shipped', extractor: 'wp-rest-route', file: 'acme-widgets.php', kind: 'rest-route' });
  const text = make({ status: 'limited', extractor: 'wp-readme-changelog', file: 'readme.txt', sourceId: 'readme', kind: 'changelog-item', posture: 'reported', confidence: 'low' });
  assert.equal(one([code, text]).status, 'limited');
});

test('status: limited that comes from code or manifest extractors does not override shipped', () => {
  const shipped = make({ status: 'shipped', extractor: 'code-tool-definition', file: 'a.js' });
  const limitedCode = make({ status: 'limited', extractor: 'code-env-var', file: 'b.js' });
  const c = one([shipped, limitedCode]);
  assert.equal(c.status, 'shipped');
  assert.deepEqual([...c.statusConflict].sort(), ['limited', 'shipped']);
});

test('status: limited + planned resolves to limited; planned alone stays planned', () => {
  const planned = make({ status: 'planned', extractor: 'doc-item', file: 'plan.md', posture: 'reported' });
  const limited = make({ status: 'limited', extractor: 'doc-item', file: 'CHANGELOG.md', posture: 'reported' });
  assert.equal(one([planned, limited]).status, 'limited');
  assert.equal(one([planned, { ...planned, source: 'plan.md:9' }]).status, 'planned');
});

test('status: a text-source limited statement keeps limited even when a later release post says shipped', () => {
  const limited = make({ status: 'limited', extractor: 'doc-item', file: 'CHANGELOG.md', posture: 'reported' });
  const shipped = make({ status: 'shipped', extractor: 'doc-item', file: 'release.md', posture: 'reported' });
  const c = one([shipped, limited]);
  assert.equal(c.status, 'limited');
  assert.deepEqual([...c.statusConflict].sort(), ['limited', 'shipped']);
});

// ---------------------------------------------------------------- posture

test('posture: observed beats reported', () => {
  const reported = make({ posture: 'reported', extractor: 'doc-item', file: 'CHANGELOG.md' });
  const observed = make({ posture: 'observed', extractor: 'code-tool-definition', file: 'a.js' });
  assert.equal(one([reported, observed]).evidence.posture, 'observed');
  assert.equal(one([observed, reported]).evidence.posture, 'observed');
});

test('posture: follows POSTURE_RANK for the other values', () => {
  assert.equal(POSTURE_RANK[0], 'observed');
  const pair = (a, b) => one([make({ posture: a, file: 'a.js' }), make({ posture: b, file: 'b.js' })]).evidence.posture;
  assert.equal(pair('reported', 'inferred'), 'reported');
  assert.equal(pair('inferred', 'unverified'), 'inferred');
  assert.equal(pair('disputed', 'unverified'), 'unverified');
  assert.equal(pair('reproduced', 'reported'), 'reproduced');
  assert.equal(pair('observed', 'reproduced'), 'observed');
});

test('posture: a single reported entry stays reported', () => {
  assert.equal(one([make({ posture: 'reported' })]).evidence.posture, 'reported');
});

// ---------------------------------------------------------------- separate dimensions

test('resolved candidate: posture, assessment, availability, claim verification, and human verdict are separate fields', () => {
  const c = one([make()]);
  assert.equal(c.evidence.posture, 'observed');
  assert.deepEqual(c.assessment, { status: 'not assessed', reason: 'coverage not evaluated yet' });
  assert.equal(c.sourceAvailability, 'available');
  assert.deepEqual(c.claimVerification, { result: 'not-run', evidenceRef: null });
  assert.deepEqual(c.human, { verdict: null, decisionId: null });
  for (const key of ['evidence', 'assessment', 'sourceAvailability', 'claimVerification', 'human', 'status']) {
    assert.ok(key in c, `${key} must be its own field`);
  }
});

test('resolved candidate: the dimensions do not alias each other or collapse into one score', () => {
  const c = one([make({ status: 'shipped', posture: 'observed', confidence: 'high' })]);
  assert.notEqual(c.status, c.assessment.status);
  assert.notEqual(c.evidence.posture, c.assessment.status);
  assert.equal(c.human.verdict, null);
  assert.equal(c.claimVerification.result, 'not-run');
  assert.equal('score' in c, false);
  assert.equal('verdict' in c, false);
  assert.equal('coverage' in c, false, 'coverage is assigned by a later step, not by dedupe');
  assert.equal('posture' in c, false, 'posture lives under evidence only');
  assert.equal(c.evidence.extractionConfidence, 'high');
});

test('resolved candidate: separate candidates do not share nested objects', () => {
  const [a, b] = dedupe([make({ name: 'Widget sharing' }), make({ name: 'Widget archive' })]);
  a.human.verdict = 'covered';
  a.claimVerification.result = 'confirmed';
  assert.equal(b.human.verdict, null);
  assert.equal(b.claimVerification.result, 'not-run');
});

test('resolve: works on a hand-built candidate and does not leak the internal statuses array', () => {
  const c = resolve({
    name: 'Widget sharing', kind: 'tool', status: 'shipped', sources: ['a.js:1'], kinds: ['tool'], statuses: ['shipped'],
    provenance: [{ sourceId: 'repo', file: 'a.js', line: 1, extractor: { id: 'code-tool-definition', version: 1 }, confidence: 'high', posture: 'observed', status: 'shipped' }],
  });
  assert.equal(c.status, 'shipped');
  assert.equal(c.statusConflict, null);
  assert.equal('statuses' in c, false);
});
