#!/usr/bin/env node
// Mechanical first pass for the Pantheon docs style guide. Read-only: it reads Markdown (a file, stdin,
// or a PR's changed pages through the gh CLI) and prints findings. Nothing is written or posted.
// Every finding names the guide section it comes from. "info" findings are candidates for a person to
// judge, not violations.
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const DEFAULT_REPO = "pantheon-systems/documentation";
const CONTENT_DIRS = ["src/source/content/", "src/source/releasenotes/", "src/source/partials/"];

const USAGE = `Usage: style-check [options] <file.md>...
       style-check --pr <number> [--repo owner/name]
       style-check --text < page.md

Checks a docs page against the mechanical rules in the Pantheon style guide
(src/source/content/style-guide.md) and the Google rules Vale enforces.

  --pr N         check the Markdown pages PR N changes (src/source/content|releasenotes|partials),
                 read at the PR head through gh, and list Vale's comments on the PR as leads
  --repo R       with --pr: owner/name (default ${DEFAULT_REPO})
  --text         read one page from stdin
  --release-note treat the input as a release note (applied automatically for src/source/releasenotes/)
  --all-lines    with --pr: check whole files. By default an edited page is checked only on the
                 lines the PR adds or changes, like the Vale workflow. A new page is always whole.
  --no-links     with --pr: don't check internal links on docs.pantheon.io (the check uses the network)
  --no-info      hide info findings
  --json         print findings as JSON
  --self-test    run the built-in tests
  -h, --help     show this help

Levels: error = the guide or CI says so; warn = Google/Vale rule; info = candidate for judgment.
Exit code is 1 when any error is found, otherwise 0.`;

// ---------------------------------------------------------------------------------------------
// Analysis

const BE_VERB = /\b(is|are|was|were|be|been|being|am)\b/gi;
const WILL = /\bwill\b/i;
const BOLD_LABEL = /^\s*(?:[-*+]\s+|\d+\.\s+)?\*\*[^*\n]{1,60}?(?::\*\*|\*\*:)/;
const SITE = "https://docs.pantheon.io";
const FIRST_PERSON = /\b(we|we're|we've|we'll|let's|our|ours|us)\b/i;
const HEADING_ALLOW = new Set(["pantheon", "beta", "wordpress", "drupal", "next.js", "react", "terminus", "github",
  "multidev", "redis", "git", "p1", "node.js", "php", "mysql", "nginx", "cdn", "dns", "ssl", "api", "mcp", "rss"]);

function parseFrontmatter(lines) {
  if (lines[0] === undefined || lines[0].trim() !== "---") return { end: -1, keys: {} };
  const keys = {};
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") return { end: i, keys };
    const m = lines[i].match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (m) keys[m[1]] = { value: m[2].trim().replace(/^["']|["']$/g, ""), line: i + 1 };
  }
  return { end: -1, keys };
}

function analyze(text, opts = {}) {
  const findings = [];
  const inScope = (n) => !opts.lines || opts.lines.has(n);
  const add = (id, level, line, message, source, excerpt) => { if (inScope(line)) findings.push({ id, level, line, message, source, excerpt: excerpt === undefined ? "" : String(excerpt).trim().slice(0, 90) }); };
  const file = opts.path || "";
  const isReleaseNote = opts.releaseNote || /(^|\/)releasenotes\//.test(file);
  const lines = text.split("\n");
  if (text.length && !text.endsWith("\n")) add("final-newline", "error", lines.length, "The file doesn't end with a newline.", "Line Breaks and Spaces", lines[lines.length - 1]);

  const fm = parseFrontmatter(lines);
  let inFence = false;
  let prevHeading = 0;
  const beLines = [];
  const apostrophes = { straight: [], curly: [] };
  const titleCase = [];
  const wsOnly = [];
  const boldLabels = [];

  lines.forEach((raw, idx) => {
    const n = idx + 1;
    const inFrontmatter = fm.end !== -1 && idx <= fm.end;
    if (/^\s*(```|~~~)/.test(raw)) { inFence = !inFence; return; }
    if (inFence) return;

    if (/^[ \t]+$/.test(raw) && inScope(n)) wsOnly.push(n);
    if (/[ \t]+$/.test(raw) && raw.trim() !== "") add("trailing-space", "error", n, "Trailing space at the end of the line.", "Line Breaks and Spaces", raw);
    if (/\t/.test(raw)) add("tab", "error", n, "Tab character. Use spaces.", "Line Breaks and Spaces", raw);
    if (inFrontmatter && !/^\s*description:/.test(raw)) return;

    const prose = raw.replace(/`[^`]*`/g, "").replace(/\]\([^)]*\)/g, "]");
    if (WILL.test(prose)) add("will", "warn", n, "Uses \"will\". Write in the present tense.", "Voice, Style, and Flow; Google style (Vale Google.Will)", raw);
    if (FIRST_PERSON.test(prose)) add("first-person-plural", "warn", n, "First-person plural (we, our, us, let's).", "Voice, Style, and Flow; Google style (Vale Google.We)", raw);
    if (/target\s*=\s*["']?_blank/.test(raw)) add("link-target", "error", n, "Don't set a link target. Leave the choice to the reader.", "Hyperlinks", raw);
    if (/\]\(https:\/\/docs\.pantheon\.io\//.test(raw)) add("absolute-internal-link", "warn", n, "Internal link as an absolute URL. Use a relative path.", "Hyperlinks (Internal Links)", raw);

    if (inFrontmatter) return;
    const heading = raw.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      const level = heading[1].length;
      if (level === 1 && fm.keys.title) add("h1-in-body", "warn", n, "A level-1 heading in the body. The title comes from the front matter.", "Frontmatter; Headings", raw);
      if (prevHeading && level > prevHeading + 1) add("heading-level-skip", "warn", n, `Heading jumps from level ${prevHeading} to ${level}.`, "Headings", raw);
      prevHeading = level;
      const words = heading[2].replace(/`[^`]*`/g, "").split(/\s+/).slice(1);
      const caps = words.filter((w) => /^[A-Z][a-z]/.test(w) && !HEADING_ALLOW.has(w.toLowerCase().replace(/[^a-z.0-9]/g, "")));
      if (caps.length >= 2 && inScope(n)) titleCase.push({ n, raw, caps });
      return;
    }
    if (/^\|(\s*\|)+\s*$/.test(raw) && /^\|?\s*:?-{3,}/.test(lines[idx + 1] || "")) add("table-empty-header", "warn", n, "The table's header row is empty. Put the column names in the header row.", "Tables (the guide's example puts the column names in the header row)", raw);
    if (/^\s*\|/.test(raw) || /^\s*</.test(raw) || raw.trim() === "") return;
    if (BOLD_LABEL.test(raw) && inScope(n)) boldLabels.push(n);
    const hits = prose.match(BE_VERB);
    if (hits && inScope(n)) beLines.push({ n, raw, count: hits.length });
    if (/[A-Za-z]'[A-Za-z]/.test(raw) && inScope(n)) apostrophes.straight.push(n);
    if (/[A-Za-z]’[A-Za-z]/.test(raw)) apostrophes.curly.push(n);
  });

  if (boldLabels.length >= 2) add("bold-labels", "info", boldLabels[0], `${boldLabels.length} bold run-in labels (${boldLabels.slice(0, 6).map((l) => "L" + l).join(", ")}${boldLabels.length > 6 ? ", ..." : ""}). The guide limits bold to UI navigation. Consider headings or a table, or confirm the team accepts the pattern.`, "Bold", lines[boldLabels[0] - 1]);
  if (wsOnly.length) add("whitespace-only-lines", "error", wsOnly[0], `${wsOnly.length} whitespace-only line(s) (${wsOnly.slice(0, 6).map((l) => "L" + l).join(", ")}${wsOnly.length > 6 ? ", ..." : ""}). Remove the spaces.`, "Line Breaks and Spaces", "");
  for (const t of titleCase) add("heading-case", "info", t.n, `Possible title case (${t.caps.join(", ")}). Headings use sentence case. Vale's Pantheon.Headings decides.`, "Voice, Style, and Flow", t.raw);
  if (beLines.length) {
    const total = beLines.reduce((s, b) => s + b.count, 0);
    add("be-verbs", "info", beLines[0].n, `${total} be-verb uses on ${beLines.length} lines (${beLines.slice(0, 8).map((b) => "L" + b.n).join(", ")}${beLines.length > 8 ? ", ..." : ""}). The guide says to avoid them; judge which sentences read better without one.`, "Voice, Style, and Flow", beLines[0].raw);
  }
  if (apostrophes.straight.length && apostrophes.curly.length) {
    const minority = apostrophes.straight.length <= apostrophes.curly.length ? apostrophes.straight : apostrophes.curly;
    add("quote-mix", "info", minority[0], `Straight and curly apostrophes are mixed (${apostrophes.straight.length} straight, ${apostrophes.curly.length} curly). Outside the guide; check for consistency.`, "none (consistency)", lines[minority[0] - 1]);
  }

  // Front matter
  const fmChanged = !opts.lines || [...opts.lines].some((n) => n <= (fm.end === -1 ? 1 : fm.end + 1));
  if (!fmChanged) {
    // front matter untouched by this change: leave it alone
  } else if (fm.end === -1) {
    add("frontmatter-missing", "error", 1, "No front matter.", "Frontmatter", lines[0]);
  } else {
    const need = isReleaseNote ? ["title", "published_date", "published_at", "categories", "description"] : ["title", "description"];
    for (const k of need) if (!fm.keys[k] || fm.keys[k].value === "") add("frontmatter-key", "error", fm.keys[k] ? fm.keys[k].line : 1, `Front matter is missing \`${k}\`.`, isReleaseNote ? "Frontmatter; validate-release-notes.yml" : "Frontmatter", lines[(fm.keys[k] ? fm.keys[k].line : 1) - 1]);
    if (isReleaseNote) releaseNoteChecks(fm, file, add);
  }
  const order = { error: 0, warn: 1, info: 2 };
  return findings.sort((a, b) => order[a.level] - order[b.level] || a.line - b.line);
}

// Relative internal links ([text](/path#anchor)) outside code, on the lines in scope.
function internalLinks(text, scope) {
  const out = [];
  let inFence = false;
  text.split("\n").forEach((raw, idx) => {
    const n = idx + 1;
    if (/^\s*(```|~~~)/.test(raw)) { inFence = !inFence; return; }
    if (inFence || (scope && !scope.has(n))) return;
    for (const m of raw.replace(/`[^`]*`/g, "").matchAll(/\]\((\/(?!\/)[^)\s]*)\)/g)) out.push({ line: n, url: m[1], raw });
  });
  return out;
}

// Checks each internal link on docs.pantheon.io. Pages the PR itself adds are skipped: they aren't live yet.
async function checkLinks(items, { fetchImpl = fetch, prPaths = new Set(), limit = 40 } = {}) {
  const findings = [];
  const add = (it, id, level, message) => findings.push({ id, level, line: it.line, message, source: "Hyperlinks", excerpt: it.raw.trim().slice(0, 90) });
  const byPage = new Map();
  for (const it of items) {
    const [pagePath, anchor] = it.url.split("#");
    const key = pagePath.replace(/\/+$/, "") || "/";
    if (prPaths.has(key)) continue;
    if (!byPage.has(key)) byPage.set(key, []);
    byPage.get(key).push({ ...it, anchor });
  }
  const pages = [...byPage.entries()];
  for (const [key, list] of pages.slice(limit)) for (const it of list) add(it, "link-unchecked", "info", `Not checked: more than ${limit} distinct internal pages.`);
  await Promise.all(pages.slice(0, limit).map(async ([key, list]) => {
    let res, html = null;
    try {
      const target = safeSitePath(key);
      if (!target) { for (const it of list) add(it, "link-unchecked", "info", `Not checked: ${key} isn't a plain site path.`); return; }
      res = await fetchImpl(target, { redirect: "follow", signal: AbortSignal.timeout(20000) });
      if (res.status >= 200 && res.status < 400 && list.some((x) => x.anchor)) html = await res.text();
    } catch (e) { for (const it of list) add(it, "link-unchecked", "info", `Couldn't check ${key}: ${e.message}.`); return; }
    if (res.status === 404 || res.status === 410) { for (const it of list) add(it, "link-broken", "warn", `${key} returns ${res.status} on docs.pantheon.io. The page doesn't exist, or isn't published yet.`); return; }
    if (res.status >= 400) { for (const it of list) add(it, "link-unchecked", "info", `Couldn't check ${key}: HTTP ${res.status}.`); return; }
    const hasAnchor = (a) => html.includes(`id="${a}"`) || html.includes(`id='${a}'`) || html.includes(`name="${a}"`) || html.includes(`name='${a}'`);
    for (const it of list) if (it.anchor && html !== null && /^[A-Za-z0-9_.:%-]+$/.test(it.anchor) && !hasAnchor(it.anchor)) add(it, "link-anchor-missing", "warn", `#${it.anchor} isn't an id on ${key}.`);
  }));
  return findings;
}

function releaseNoteChecks(fm, file, add) {
  const at = fm.keys.published_at, day = fm.keys.published_date, desc = fm.keys.description;
  if (at && /T00:00:00Z$/.test(at.value)) add("published-at-midnight", "error", at.line, "published_at is a midnight placeholder. validate-release-notes.yml rejects it. Use the actual publication time.", "Release notes: RSS feed (rss.xml/route.tsx)", at.value);
  if (at && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(at.value)) add("published-at-format", "warn", at.line, "published_at isn't an ISO UTC time like 2026-10-09T17:00:00Z.", "Release notes: RSS feed", at.value);
  if (at && day && at.value.slice(0, 10) !== day.value) add("published-date-mismatch", "warn", at.line, `published_at is on ${at.value.slice(0, 10)} but published_date is ${day.value}.`, "Release notes", at.value);
  const m = path.basename(file || "").match(/^(\d{4}-\d{2}-\d{2})-/);
  if (m && day && m[1] !== day.value) add("filename-date-mismatch", "warn", day.line, `The file name starts with ${m[1]} but published_date is ${day.value}.`, "Release notes", day.value);
  if (at) add("published-at-confirm", "info", at.line, `published_at is ${at.value}. The RSS feed publishes it as the item date, so set it to the actual publication time at merge. A person confirms the release time.`, "Release notes: RSS feed (rss.xml/route.tsx)", at.value);
  if (desc && /\]\(|\*\*|`/.test(desc.value)) add("description-not-plain", "warn", desc.line, "The description has Markdown. Feed readers show it as plain text.", "Release notes: RSS feed", desc.value);
}

// ---------------------------------------------------------------------------------------------
// Output

function render(label, findings, noInfo) {
  const shown = findings.filter((f) => !(noInfo && f.level === "info"));
  const counts = { error: 0, warn: 0, info: 0 };
  for (const f of findings) counts[f.level]++;
  const out = [`${label}: ${counts.error} error, ${counts.warn} warn, ${counts.info} info`];
  for (const f of shown) out.push(`  L${String(f.line).padEnd(4)} ${f.level.padEnd(5)} ${f.id}: ${f.message}  [${f.source}]${f.excerpt ? `\n        ${f.excerpt}` : ""}`);
  return out.join("\n");
}

// Inputs that reach gh arguments, the fetched URL, and the file system are validated before use.
function assertPrNumber(v) {
  if (!/^[1-9][0-9]{0,8}$/.test(String(v))) throw new Error("--pr needs a PR number, such as --pr 10346");
  return String(v);
}
function assertRepo(v) {
  const ok = /^[A-Za-z0-9_.-]{1,100}\/[A-Za-z0-9_.-]{1,100}$/.test(String(v)) && String(v).split("/").every((seg) => !/^\.+$/.test(seg));
  if (!ok) throw new Error("--repo needs owner/name, such as pantheon-systems/documentation");
  return String(v);
}
// A site path like /nextjs/cli-tools, with no scheme, host, or dot segments. Returns null when it isn't one.
function safeSitePath(key) {
  if (!/^\/[A-Za-z0-9._~%\/-]*$/.test(key) || key.split("/").some((seg) => seg === "..")) return null;
  const url = new URL(key, SITE);
  return url.origin === SITE ? url.href : null;
}
function assertMarkdownFile(file) {
  if (!/\.(md|markdown)$/i.test(file)) throw new Error(`${file}: style-check reads Markdown files (.md). Use --text to read from stdin.`);
  if (!fs.statSync(file).isFile()) throw new Error(`${file} isn't a file.`);
  return file;
}

function gh(args) {
  return execFileSync("gh", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] });
}

function changedLines(patch) {
  if (patch === undefined) return null;
  const set = new Set();
  let n = 0;
  for (const l of patch.split("\n")) {
    const h = l.match(/^@@ -\d+(?:,\d+)? \+(\d+)/);
    if (h) { n = +h[1]; continue; }
    if (l.startsWith("+")) set.add(n++);
    else if (!l.startsWith("-") && !l.startsWith("\\")) n++;
  }
  return set;
}

async function checkPr(number, repo, noInfo, allLines, checkLinkTargets) {
  number = assertPrNumber(number);
  repo = assertRepo(repo);
  const info = JSON.parse(gh(["api", `repos/${repo}/pulls/${number}`]));
  const sha = info.head.sha;
  const files = JSON.parse(gh(["api", "--paginate", "--slurp", `repos/${repo}/pulls/${number}/files?per_page=100`])).flat();
  const pages = files.filter((f) => f.status !== "removed" && f.filename.endsWith(".md") && CONTENT_DIRS.some((d) => f.filename.startsWith(d)));
  const results = [];
  const texts = new Map();
  for (const f of pages) {
    const encoded = f.filename.split("/").map(encodeURIComponent).join("/");
    const body = JSON.parse(gh(["api", `repos/${repo}/contents/${encoded}?ref=${sha}`]));
    const text = Buffer.from(body.content, "base64").toString("utf8");
    texts.set(f.filename, text);
    const lines = allLines || f.status === "added" ? null : changedLines(f.patch);
    results.push({ file: f.filename, lines, scope: lines ? `${lines.size} changed line(s)` : "whole file", findings: analyze(text, { path: f.filename, lines }) });
  }
  if (checkLinkTargets) {
    // A page this PR adds or changes isn't live yet, so links to it can't be checked on the site.
    const prPaths = new Set();
    for (const t of texts.values()) { const m = t.match(/^permalink:\s*["']?\/?(?:docs\/)?([^\s"']+)/m); if (m) prPaths.add("/" + m[1].replace(/\/+$/, "")); }
    const order = { error: 0, warn: 1, info: 2 };
    for (const r of results) {
      const extra = await checkLinks(internalLinks(texts.get(r.file), r.lines), { prPaths });
      r.findings = r.findings.concat(extra).sort((a, b) => order[a.level] - order[b.level] || a.line - b.line);
    }
  }
  const skipped = files.filter((f) => !pages.includes(f)).map((f) => f.filename);
  let vale = [];
  try {
    const comments = JSON.parse(gh(["api", "--paginate", "--slurp", `repos/${repo}/pulls/${number}/comments?per_page=100`])).flat();
    vale = comments.filter((c) => /\*\*\[vale\]\*\*/.test(c.body || "")).map((c) => {
      const rule = (c.body.match(/<\[?([A-Za-z]+\.[A-Za-z]+)\]?/) || [])[1] || "vale";
      const msg = ((c.body.match(/<br>([^\n<]+)/) || [])[1] || "").trim();
      return { path: c.path, line: c.line || c.original_line, rule, message: msg };
    });
  } catch { /* comments unreadable: say so below */ }
  return { number, sha, results, skipped, vale, noInfo };
}

function renderPr(r) {
  const out = [`PR #${r.number} at ${r.sha.slice(0, 7)}: ${r.results.length} page(s) checked${r.skipped.length ? `, ${r.skipped.length} other file(s) skipped (not docs pages)` : ""}`];
  for (const p of r.results) out.push("", render(`${p.file} (${p.scope})`, p.findings, r.noInfo));
  out.push("", `Vale comments on the PR (leads, confirm each against the file): ${r.vale.length}`);
  for (const v of r.vale) out.push(`  ${v.path}:${v.line}  ${v.rule}  ${v.message}`);
  return out.join("\n");
}

// ---------------------------------------------------------------------------------------------
// Self-test

async function selfTest() {
  const failures = [];
  let total = 0;
  const expect = (cond, what) => { total++; if (!cond) failures.push(what); };
  const has = (fs_, id, line) => fs_.some((f) => f.id === id && (line === undefined || f.line === line));

  const bad = [
    "---",                                                    // 1
    'title: "Example is now available"',                      // 2
    'published_date: "2026-10-09"',                           // 3
    'published_at: "2026-10-09T00:00:00Z"',                   // 4
    "categories: [new-feature]",                              // 5
    'description: "The new thing [is live](https://example.com). It will help."', // 6
    "---",                                                    // 7
    "",                                                       // 8
    "# Duplicate Title",                                      // 9
    "",                                                       // 10
    "## What We Offer Teams",                                 // 11
    "",                                                       // 12
    "* A bullet with trailing spaces.  ",                     // 13
    "* Another line that will continue to evolve and is long.", // 14
    "\tIndented with a tab.",                                 // 15
    "We built this. It's ready, and it’s good.",         // 16
    "",                                                       // 17
    "#### Skipped level",                                     // 18
    "",                                                       // 19
    "See [the guide](https://docs.pantheon.io/guides/x) and <a target=\"_blank\" href=\"/y\">y</a>.", // 20
    "",
  ].join("\n");
  const f = analyze(bad, { path: "src/source/releasenotes/2026-10-08-example.md" });
  expect(has(f, "published-at-midnight", 4), "midnight published_at on L4");
  expect(has(f, "published-date-mismatch") === false, "no date mismatch when only the time is midnight");
  expect(has(f, "filename-date-mismatch", 3), "filename date differs from published_date");
  expect(has(f, "description-not-plain", 6), "Markdown in description");
  expect(has(f, "will", 6) && has(f, "will", 14), "will in description and body");
  expect(has(f, "first-person-plural", 16), "we on L16");
  expect(has(f, "h1-in-body", 9), "h1 in body");
  expect(has(f, "heading-case", 11), "title-case heading on L11");
  expect(has(f, "trailing-space", 13), "trailing space on L13");
  expect(has(f, "tab", 15), "tab on L15");
  expect(has(f, "quote-mix"), "mixed apostrophes");
  expect(has(f, "heading-level-skip", 18), "heading level skip");
  expect(has(f, "absolute-internal-link", 20), "absolute internal link");
  expect(has(f, "link-target", 20), "link target");
  expect(has(f, "be-verbs"), "be verbs counted");
  expect(has(f, "published-at-confirm", 4), "published_at confirm note");
  expect(analyze("---\ntitle: x\ndescription: y\n---\nText", {}).some((x) => x.id === "final-newline"), "missing final newline");
  expect(analyze("Just text\n", {}).some((x) => x.id === "frontmatter-missing"), "missing front matter");
  const scoped = analyze(bad, { path: "src/source/releasenotes/2026-10-08-example.md", lines: new Set([13, 20]) });
  expect(has(scoped, "trailing-space", 13) && has(scoped, "link-target", 20), "in-scope lines are reported");
  expect(!has(scoped, "tab") && !has(scoped, "will") && !has(scoped, "published-at-midnight"), "out-of-scope lines and untouched front matter are skipped");
  const ws = analyze("---\ntitle: x\ndescription: y\n---\n\n- one\n    \n- two\n    \n\n|   |   |\n|---|---|\n|Name|Value|\n\n| A | B |\n|---|---|\n| 1 | 2 |\n", {});
  expect(has(ws, "whitespace-only-lines", 7) && ws.find((x) => x.id === "whitespace-only-lines").message.startsWith("2 whitespace-only"), "whitespace-only lines are counted");
  expect(has(ws, "table-empty-header", 11) && !has(ws, "table-empty-header", 15), "empty table header flagged, normal header not");
  const bold = analyze("---\ntitle: x\ndescription: y\n---\n\n**What you observe:** a thing.\n\n- **Collect:** more.\n\nGo to **Account** > **Security** to see it.\n", {});
  expect(has(bold, "bold-labels") && bold.find((x) => x.id === "bold-labels").message.startsWith("2 bold run-in"), "bold run-in labels counted, UI-navigation bold not");
  expect(!analyze("---\ntitle: x\ndescription: y\n---\n\n**Only one:** label.\n", {}).some((x) => x.id === "bold-labels"), "a single bold label isn't flagged");
  const il = internalLinks("See [a](/nextjs/cli-tools) and [b](/guides/x#frag) and [c](https://docs.pantheon.io/x) and `[d](/code)` and [e](//cdn.example.com/y).\n```\n[f](/fence)\n```\n", null);
  expect(il.length === 2 && il[0].url === "/nextjs/cli-tools" && il[1].url === "/guides/x#frag", "internal links found outside code, absolute and protocol-relative skipped");
  const resp = (status, body = "") => ({ status, text: async () => body });
  const stub = async (url) => url.endsWith("/ok") ? resp(200, '<h2 id="here">x</h2>') : url.endsWith("/gone") ? resp(404) : url.endsWith("/boom") ? (() => { throw new Error("timed out"); })() : url.endsWith("/busy") ? resp(503) : resp(200);
  const items = [{ line: 1, url: "/ok#here", raw: "a" }, { line: 2, url: "/ok#nope", raw: "b" }, { line: 3, url: "/gone", raw: "c" }, { line: 4, url: "/boom", raw: "d" }, { line: 5, url: "/busy", raw: "e" }, { line: 6, url: "/new-page", raw: "f" }];
  const lf = await checkLinks(items, { fetchImpl: stub, prPaths: new Set(["/new-page"]) });
  expect(has(lf, "link-anchor-missing", 2) && !has(lf, "link-anchor-missing", 1), "missing anchor flagged, present anchor not");
  expect(has(lf, "link-broken", 3) && lf.find((x) => x.id === "link-broken").level === "warn", "404 is a warn");
  expect(has(lf, "link-unchecked", 4) && has(lf, "link-unchecked", 5), "network error and 503 are unchecked, not broken");
  expect(!lf.some((x) => x.line === 6), "a page the PR adds is skipped");
  const throws = (fn) => { try { fn(); return false; } catch { return true; } };
  expect(assertPrNumber("10346") === "10346" && throws(() => assertPrNumber("10346; rm")) && throws(() => assertPrNumber("0")) && throws(() => assertPrNumber("../1")), "PR numbers are digits only");
  expect(assertRepo("pantheon-systems/documentation") === "pantheon-systems/documentation" && throws(() => assertRepo("a/../b")) && throws(() => assertRepo("a/..")) && throws(() => assertRepo("a b/c")) && throws(() => assertRepo("only-one")), "repo names are owner/name, with no dot segments");
  expect(safeSitePath("/nextjs/cli-tools") === "https://docs.pantheon.io/nextjs/cli-tools" && safeSitePath("/a/../b") === null && safeSitePath("//evil.example/x") === null && safeSitePath("/x y") === null && safeSitePath("/x?q=1") === null, "site paths are plain paths on docs.pantheon.io");
  const fenced = analyze("---\ntitle: x\ndescription: y\n---\n\n```sh\nwe will  \n\tcode\n```\n", {});
  expect(!fenced.some((x) => ["will", "first-person-plural", "trailing-space", "tab"].includes(x.id)), "code fences are skipped");

  const clean = [
    "---", 'title: "Example is available"', 'published_date: "2026-10-09"', 'published_at: "2026-10-09T17:00:00Z"',
    "categories: [new-feature]", 'description: "The example adds a thing that saves a step."', "---", "",
    "The example adds a thing that saves a step.", "", "## What's included", "", "* Visual page building with [components](/guides/x).", "",
  ].join("\n");
  const c = analyze(clean, { path: "src/source/releasenotes/2026-10-09-example.md" });
  expect(!c.some((x) => x.level === "error" || x.level === "warn"), `clean release note has no error or warn (got ${c.filter((x) => x.level !== "info").map((x) => x.id).join(", ")})`);

  if (failures.length) { console.error("self-test FAILED:\n  " + failures.join("\n  ")); return 1; }
  console.log(`self-test passed (${total} checks)`);
  return 0;
}

// ---------------------------------------------------------------------------------------------
// CLI

async function main(argv) {
  const args = argv.slice(2);
  if (!args.length || args.includes("-h") || args.includes("--help")) { console.log(USAGE); return args.length ? 0 : 2; }
  if (args.includes("--self-test")) return await selfTest();
  const flag = (n) => args.includes(n);
  const val = (n) => { const i = args.indexOf(n); return i === -1 ? null : args[i + 1]; };
  const noInfo = flag("--no-info"), json = flag("--json"), releaseNote = flag("--release-note");
  let exit = 0;
  const outputs = [];
  if (flag("--pr")) {
    const r = await checkPr(val("--pr"), val("--repo") || DEFAULT_REPO, noInfo, flag("--all-lines"), !flag("--no-links"));
    if (r.results.some((p) => p.findings.some((x) => x.level === "error"))) exit = 1;
    outputs.push(json ? r : renderPr(r));
  } else if (flag("--text")) {
    const f = analyze(fs.readFileSync(0, "utf8"), { releaseNote });
    if (f.some((x) => x.level === "error")) exit = 1;
    outputs.push(json ? { file: "stdin", findings: f } : render("stdin", f, noInfo));
  } else {
    const files = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--repo");
    for (const file of files) {
      const f = analyze(fs.readFileSync(assertMarkdownFile(file), "utf8"), { path: file, releaseNote });
      if (f.some((x) => x.level === "error")) exit = 1;
      outputs.push(json ? { file, findings: f } : render(file, f, noInfo));
    }
  }
  console.log(json ? JSON.stringify(outputs.length === 1 ? outputs[0] : outputs, null, 2) : outputs.join("\n\n"));
  return exit;
}

if (require.main === module) {
  main(process.argv).then((code) => { process.exitCode = code; }).catch((e) => { console.error(`style-check: ${e.message}`); process.exitCode = 2; });
}
module.exports = { analyze, internalLinks, checkLinks, assertPrNumber, assertRepo, safeSitePath };
