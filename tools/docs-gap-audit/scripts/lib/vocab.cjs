'use strict';

// Extraction vocabulary lives in data/extraction-vocab.json so scope and wording change
// without code edits. A profile may add to the lists (vocabulary.extraction); it cannot
// replace the parsing, and patterns are compiled here, never evaluated as code.

const fs = require('node:fs');
const path = require('node:path');

const DATA = path.join(__dirname, '..', '..', 'data', 'extraction-vocab.json');

function loadVocab(extra = {}) {
  const raw = JSON.parse(fs.readFileSync(DATA, 'utf8'));
  const more = (key) => (Array.isArray(extra[key]) ? extra[key] : []);
  const alt = (src, extraWords) => (extraWords.length ? `${src.replace(/\$$/, '')}|^(?:${extraWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})$` : src);
  return {
    version: raw.version,
    skipDirs: new Set([...raw.skipDirs, ...more('skipDirs')]),
    testFile: new RegExp(raw.testFilePattern),
    commonEnv: new Set([...raw.commonEnv, ...more('commonEnv')]),
    internalDoc: new RegExp(raw.internalDocPattern, 'i'),
    genericHeadings: new RegExp(alt(raw.genericHeadings, more('genericHeadings')), 'i'),
    sectionLabels: new RegExp(raw.sectionLabels, 'i'),
    noiseItem: new RegExp(raw.noiseItemPattern, 'i'),
    limitedHint: new RegExp(raw.limitedHintPattern, 'i'),
    plannedHeading: new RegExp(raw.plannedHeadingPattern, 'i'),
    verbLead: new RegExp(raw.verbLeadPattern, 'i'),
    stubBodyLimit: raw.stubBodyLimit,
  };
}

module.exports = { loadVocab };
