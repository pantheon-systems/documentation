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

  lines.forEach((raw, idx) => {
    const n = idx + 1;
    const inFrontmatter = fm.end !== -1 && idx <= fm.end;
    if (/^\s*(```|~~~)/.test(raw)) { inFence = !inFence; return; }
    if (inFence) return;

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
    if (/^\s*\|/.test(raw) || /^\s*</.test(raw) || raw.trim() === "") return;
    const hits = prose.match(BE_VERB);
    if (hits && inScope(n)) beLines.push({ n, raw, count: hits.length });
    if (/[A-Za-z]'[A-Za-z]/.test(raw) && inScope(n)) apostrophes.straight.push(n);
    if (/[A-Za-z]’[A-Za-z]/.test(raw)) apostrophes.curly.push(n);
  });

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

function checkPr(number, repo, noInfo, allLines) {
  const info = JSON.parse(gh(["api", `repos/${repo}/pulls/${number}`]));
  const sha = info.head.sha;
  const files = JSON.parse(gh(["api", "--paginate", "--slurp", `repos/${repo}/pulls/${number}/files?per_page=100`])).flat();
  const pages = files.filter((f) => f.status !== "removed" && f.filename.endsWith(".md") && CONTENT_DIRS.some((d) => f.filename.startsWith(d)));
  const results = [];
  for (const f of pages) {
    const encoded = f.filename.split("/").map(encodeURIComponent).join("/");
    const body = JSON.parse(gh(["api", `repos/${repo}/contents/${encoded}?ref=${sha}`]));
    const text = Buffer.from(body.content, "base64").toString("utf8");
    const lines = allLines || f.status === "added" ? null : changedLines(f.patch);
    results.push({ file: f.filename, scope: lines ? `${lines.size} changed line(s)` : "whole file", findings: analyze(text, { path: f.filename, lines }) });
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

function selfTest() {
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

function main(argv) {
  const args = argv.slice(2);
  if (!args.length || args.includes("-h") || args.includes("--help")) { console.log(USAGE); return args.length ? 0 : 2; }
  if (args.includes("--self-test")) return selfTest();
  const flag = (n) => args.includes(n);
  const val = (n) => { const i = args.indexOf(n); return i === -1 ? null : args[i + 1]; };
  const noInfo = flag("--no-info"), json = flag("--json"), releaseNote = flag("--release-note");
  let exit = 0;
  const outputs = [];
  if (flag("--pr")) {
    const r = checkPr(val("--pr"), val("--repo") || DEFAULT_REPO, noInfo, flag("--all-lines"));
    if (r.results.some((p) => p.findings.some((x) => x.level === "error"))) exit = 1;
    outputs.push(json ? r : renderPr(r));
  } else if (flag("--text")) {
    const f = analyze(fs.readFileSync(0, "utf8"), { releaseNote });
    if (f.some((x) => x.level === "error")) exit = 1;
    outputs.push(json ? { file: "stdin", findings: f } : render("stdin", f, noInfo));
  } else {
    const files = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--repo");
    for (const file of files) {
      const f = analyze(fs.readFileSync(file, "utf8"), { path: file, releaseNote });
      if (f.some((x) => x.level === "error")) exit = 1;
      outputs.push(json ? { file, findings: f } : render(file, f, noInfo));
    }
  }
  console.log(json ? JSON.stringify(outputs.length === 1 ? outputs[0] : outputs, null, 2) : outputs.join("\n\n"));
  return exit;
}

if (require.main === module) {
  try { process.exitCode = main(process.argv); } catch (e) { console.error(`style-check: ${e.message}`); process.exitCode = 2; }
}
module.exports = { analyze };
