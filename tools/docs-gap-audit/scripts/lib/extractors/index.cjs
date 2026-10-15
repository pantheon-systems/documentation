'use strict';

// The extractor registry. A fixed list, not a plugin loader: each rule is a small object
// with an id, a version, the source kinds it reads, an appliesTo test, and an extract function.
// Add a rule here and add positive and negative tests for it.

const manifest = require('./manifest.cjs');
const code = require('./code.cjs');
const wordpress = require('./wordpress.cjs');
const docs = require('./docs.cjs');

const EXTRACTORS = [...manifest, ...code, ...wordpress, ...docs];

const ids = EXTRACTORS.map((e) => e.id);
if (new Set(ids).size !== ids.length) throw new Error('duplicate extractor id');

module.exports = { EXTRACTORS, docRoute: docs.docRoute };
