'use strict';

// WordPress-style extractors: PHP registration calls, and the readme.txt changelog format,
// which differs from Markdown changelogs ("= 1.4.0 =" headings, "* New:" bullets).

const { isCommentLine, excerptOf, phrase, stripMd } = require('./common.cjs');

const CODE_EXT = new Set(['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx', '.php', '.py', '.rb', '.go', '.rs']);
const isCode = (ctx) => CODE_EXT.has(ctx.ext) && !ctx.vocab.testFile.test(ctx.file);

function registration(id, kind, description, re, nameOf) {
  return {
    id,
    version: 1,
    description,
    sourceKinds: ['repo'],
    appliesTo: isCode,
    extract(ctx) {
      const out = [];
      ctx.lines.forEach((text, i) => {
        if (isCommentLine(text)) return;
        for (const m of text.matchAll(re)) {
          out.push({ name: nameOf(m), kind, status: 'shipped', line: i + 1, excerpt: excerptOf(text), confidence: 'high', posture: 'observed' });
        }
      });
      return out;
    },
  };
}

const restRoute = registration('wp-rest-route', 'rest-route', 'register_rest_route(namespace, route).', /register_rest_route\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/g, (m) => `${m[1]}${m[2]}`);
const blockType = registration('wp-block-type', 'block', 'register_block_type(name).', /register_block_type\(\s*['"]([^'"]+)['"]/g, (m) => m[1]);
const hook = registration('wp-hook', 'hook', 'Hooks the code fires: do_action(name) and apply_filters(name).', /\b(?:do_action|apply_filters)\(\s*['"]([^'"]+)['"]/g, (m) => m[1]);
const wpCli = registration('wp-cli-command', 'wp-cli-command', 'WP_CLI::add_command(name).', /WP_CLI::add_command\(\s*['"]([^'"]+)['"]/g, (m) => `wp ${m[1]}`);

// readme.txt: take bullets under "== Changelog ==", status from the version heading.
const readmeChangelog = {
  id: 'wp-readme-changelog',
  version: 1,
  description: 'Changelog entries in a WordPress readme.txt. Fix entries are skipped.',
  sourceKinds: ['repo', 'changelog', 'releases'],
  appliesTo: (ctx) => /^readme\.txt$/i.test(ctx.base),
  extract(ctx) {
    const out = [];
    let inChangelog = false;
    let status = ctx.defaultStatus;
    ctx.lines.forEach((text, i) => {
      const section = /^==\s*(.+?)\s*==\s*$/.exec(text);
      if (section) {
        inChangelog = /changelog/i.test(section[1]);
        status = ctx.defaultStatus;
        return;
      }
      if (!inChangelog) return;
      const version = /^=\s*(.+?)\s*=\s*$/.exec(text);
      if (version) {
        status = ctx.vocab.plannedHeading.test(version[1]) ? 'planned' : ctx.defaultStatus;
        return;
      }
      const bullet = /^\s*[*-]\s+(.{12,})$/.exec(text);
      if (!bullet) return;
      const item = bullet[1];
      if (/^(?:fix(?:ed|es)?|bug|chore|tweak|dev|deps?)\s*:/i.test(item) || ctx.vocab.noiseItem.test(stripMd(item))) return;
      const label = /^(?:new|add(?:ed)?|feature|improvement)\s*:\s*/i;
      const p = phrase(item.replace(label, ''), ctx.vocab);
      out.push({
        name: p.name, kind: 'changelog-item', status: ctx.vocab.limitedHint.test(item) && status === 'shipped' ? 'limited' : status,
        line: i + 1, excerpt: excerptOf(text), terms: p.terms, confidence: 'low', posture: 'reported',
      });
    });
    return out;
  },
};

module.exports = [restRoute, blockType, hook, wpCli, readmeChangelog];
