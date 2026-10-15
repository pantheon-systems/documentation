'use strict';

// Code extractors: public surface a program defines (tools, commands, environment variables, routes).
// Test files and comment lines never count. A match is a lead about what the code defines,
// not proof that the feature ships or that anyone needs docs for it.

const { termsFor, camelToSnake, isCommentLine, excerptOf } = require('./common.cjs');

const CODE_EXT = new Set(['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx', '.php', '.py', '.rb', '.go', '.rs']);
const isCode = (ctx) => CODE_EXT.has(ctx.ext) && !ctx.vocab.testFile.test(ctx.file);

function perLine(ctx, fn) {
  const out = [];
  ctx.lines.forEach((text, i) => {
    if (isCommentLine(text)) return;
    fn(text, i, out);
  });
  return out;
}

const TOOL_CALL = /\b(?:defineTool|registerTool|\.tool)\(/;

const toolDefinition = {
  id: 'code-tool-definition',
  version: 1,
  description: 'Tool definitions: defineTool(...), registerTool(...), server.tool(...). Name from a name: field, a first string argument, or the constant it is bound to.',
  sourceKinds: ['repo'],
  appliesTo: isCode,
  extract: (ctx) =>
    perLine(ctx, (text, i, out) => {
      if (!TOOL_CALL.test(text)) return;
      const window = (n) => ctx.lines.slice(i, i + n).join(' ');
      const literal = /\bname:\s*['"`]([a-z][\w.-]{2,})['"`]/.exec(window(4));
      const firstArg = /(?:registerTool|\.tool)\(\s*['"`]([a-z][\w.-]{2,})['"`]/.exec(window(3));
      const bound = /(?:const|let|var)\s+([A-Za-z]\w*?)(?:Tool)?\s*=/.exec(text);
      const title = /\btitle:\s*['"`]([^'"`]{4,60})['"`]/.exec(window(12));
      const name = literal ? literal[1] : firstArg ? firstArg[1] : bound ? camelToSnake(bound[1]) : null;
      if (!name) return;
      out.push({
        name, kind: 'tool', status: 'shipped', line: i + 1, excerpt: excerptOf(text),
        terms: [...termsFor(name), ...(title ? [title[1]] : [])],
        confidence: literal || firstArg ? 'high' : 'medium', posture: 'observed',
      });
    }),
};

const simple = (id, kind, description, re, nameOf, extra = {}) => ({
  id,
  version: 1,
  description,
  sourceKinds: ['repo'],
  appliesTo: isCode,
  extract: (ctx) =>
    perLine(ctx, (text, i, out) => {
      for (const m of text.matchAll(re)) {
        const name = nameOf(m);
        if (name === null) continue;
        out.push({ name, kind, status: 'shipped', line: i + 1, excerpt: excerptOf(text), confidence: extra.confidence || 'medium', posture: 'observed' });
      }
    }),
});

const cliCommand = simple('code-cli-command', 'cli-command', 'Subcommands registered with .command("name").', /\.command\(\s*['"`]([\w:-]+)/g, (m) => m[1], { confidence: 'high' });

const envVar = {
  id: 'code-env-var',
  version: 1,
  description: 'Environment variables a program reads. Ubiquitous names (NODE_ENV, CI, PATH) are dropped.',
  sourceKinds: ['repo'],
  appliesTo: isCode,
  extract: (ctx) =>
    perLine(ctx, (text, i, out) => {
      const re = /(?:process\.env\.|getenv\(\s*['"]|os\.environ(?:\.get)?\(\s*['"]|os\.environ\[\s*['"]|ENV\[\s*['"])([A-Z][A-Z0-9_]{3,})/g;
      for (const m of text.matchAll(re)) {
        if (ctx.vocab.commonEnv.has(m[1])) continue;
        out.push({ name: m[1], kind: 'env-var', status: 'shipped', line: i + 1, excerpt: excerptOf(text), confidence: 'medium', posture: 'observed' });
      }
    }),
};

// Routes become candidates only when the path has a static word to search the docs for;
// "GET /" and "DELETE /:id" cannot be matched to anything.
function routeLike(id, kind, description, re, nameOf) {
  return {
    id,
    version: 1,
    description,
    sourceKinds: ['repo'],
    appliesTo: isCode,
    extract: (ctx) =>
      perLine(ctx, (text, i, out) => {
        for (const m of text.matchAll(re)) {
          const n = nameOf(m);
          const statics = (n.match(/\/[A-Za-z][\w-]{3,}/g) || []).map((x) => x.slice(1).replace(/-/g, ' ')).filter((x) => !/^api$/i.test(x));
          if (!statics.length) continue;
          out.push({ name: `${n} (${ctx.base})`, kind, status: 'shipped', line: i + 1, excerpt: excerptOf(text), terms: statics, confidence: 'medium', posture: 'observed' });
        }
      }),
  };
}

const httpRoute = routeLike('code-http-route', 'http-route', 'HTTP handlers such as app.get("/path"). Needs at least one static path word.', /\.(get|post|put|delete|patch)\(\s*['"`](\/[^'"`]*)/g, (m) => `${m[1].toUpperCase()} ${m[2]}`);
const routeMount = routeLike('code-route-mount', 'route-mount', 'Router mounts such as .route("/path", handlers). Needs at least one static path word.', /\.route\(\s*['"`](\/[^'"`]*)/g, (m) => `mount ${m[1]}`);

// Robo and Symfony-style PHP commands declare their name in a docblock: " * @command env:deploy". This is the one
// place the code puts the name, so the rule reads a comment line on purpose and only in PHP files.
const ANNOTATED = /^\s*\*\s*@command\s+([A-Za-z][\w:-]*)\s*$/;
const annotatedCommand = {
  id: 'code-annotated-command',
  version: 1,
  description: 'PHP commands declared by a docblock "@command name" annotation (Robo, Consolidation).',
  sourceKinds: ['repo'],
  appliesTo: (ctx) => isCode(ctx) && ctx.ext === '.php' && !/Test\.php$|(^|[\\/])tests?[\\/]/i.test(ctx.file),
  extract: (ctx) => {
    const out = [];
    ctx.lines.forEach((text, i) => {
      const m = ANNOTATED.exec(text);
      if (!m) return;
      out.push({ name: m[1], kind: 'cli-command', status: 'shipped', line: i + 1, excerpt: excerptOf(text), terms: termsFor(m[1]), confidence: 'high', posture: 'observed' });
    });
    return out;
  },
};

module.exports = [toolDefinition, cliCommand, annotatedCommand, envVar, httpRoute, routeMount];
