#!/usr/bin/env node
// Prints a review packet for a pantheon-systems/documentation PR.
// Reuses the browser extension's pr-resolver.js for page, permalink and release-note logic.
// pr-resolver.js here is an unmodified copy of tools/pantheon-pr-preview-extension/pr-resolver.js
// (kept in sync by hand). To update it, copy the file again from the extension folder.
"use strict";

const path = require("node:path");
const fs = require("node:fs");
const { execFileSync, execFile } = require("node:child_process");

const REPOSITORY = "pantheon-systems/documentation";
const RESOLVER = path.resolve(__dirname, "pr-resolver.js");
const STATE_FILE = path.join(__dirname, ".state.json");
const REOPEN_AFTER_MS = 6 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const USAGE = `Usage: docs-pr-review <PR number or URL> [options]

Prints a review packet: affected pages with preview and live URLs, permalink changes,
release-note dates, preview status, CI summary, and how far the branch is behind main.

Options:
  --table        give several PR numbers; print one table of links (a row per changed page)
  --json         print the packet as JSON
  --open         open the preview URLs in the background (macOS 'open -g')
  --open-live    also open the live URLs
  --dry-run      with --open: print what would open, change nothing
  --force        with --open: reopen URLs opened in the last 6 hours
  --no-auth      don't use the gh CLI token (60 unauthenticated API requests per hour)
  -h, --help     show this help`;

function loadResolver() {
  if (!globalThis.PantheonPr) require(RESOLVER);
  return globalThis.PantheonPr;
}

// Docs and multidev links this skill prints carry ?pantheon_review=1. With the PR preview extension
// installed, that marker hides the cookie banner on the page, and only on pages reached this way.
// The site ignores the parameter, so the link works the same without the extension. Mirrors
// withReviewMarker in the extension's pr-resolver.js.
function markReviewLink(url) {
  const parsed = new URL(url);
  parsed.searchParams.set("pantheon_review", "1");
  return parsed.href;
}

// A plain https link that the PR preview extension turns into the 2- or 3-panel review view.
// Without the extension it opens the PR's Files changed page. It carries no extension ID, so it
// works for every install and opens from chat. Mirrors panelRequestUrl in the extension's pr-resolver.js.
function panelLinkUrl(prNumber, page, panels) {
  const url = new URL(`https://github.com/${REPOSITORY}/pull/${prNumber}/files`);
  url.searchParams.set("pantheon_panel", String(panels));
  url.searchParams.set("page", page.filename);
  return url.href;
}

// GitHub anchors each file in Files changed as #diff-<sha256 of the path>.
function buildLinks(P, prNumber, prUrl, pages) {
  const crypto = require("node:crypto");
  return {
    pr: prUrl,
    files: `${prUrl}/files`,
    pages: pages.map((page) => ({
      filename: page.filename,
      preview: markReviewLink(page.previewUrl),
      live: markReviewLink(page.liveUrl),
      diff: `${prUrl}/files#diff-${crypto.createHash("sha256").update(page.filename).digest("hex")}`,
      twoPanel: panelLinkUrl(prNumber, page, 2),
      threePanel: panelLinkUrl(prNumber, page, 3)
    }))
  };
}

function parseArgs(argv) {
  const options = { json: false, open: false, openLive: false, dryRun: false, force: false, auth: true };
  const positional = [];
  for (const arg of argv) {
    if (arg === "--json") options.json = true;
    else if (arg === "--table") options.table = true;
    else if (arg === "--open") options.open = true;
    else if (arg === "--open-live") { options.open = true; options.openLive = true; }
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--force") options.force = true;
    else if (arg === "--no-auth") options.auth = false;
    else if (arg === "-h" || arg === "--help") options.help = true;
    else if (arg.startsWith("-")) throw new Error(`Unknown option ${arg}`);
    else positional.push(arg);
  }
  const numbers = (options.table ? positional : positional.slice(0, 1))
    .map((target) => (target.match(/^#?(\d+)$/) || target.match(/\/pull\/(\d+)/))?.[1]);
  if (!options.help && (numbers.length === 0 || numbers.includes(undefined))) {
    throw new Error("Give a PR number or a GitHub PR URL.");
  }
  options.prs = numbers;
  options.pr = numbers[0] || null;
  return options;
}

// Light path for --table: titles and links only, no CI, drift, or preview probe.
async function gatherLinks(prNumber) {
  const P = loadResolver();
  const [inspected, pull] = await Promise.all([
    P.inspectPullRequest(prNumber, { compareBase: false }),
    api(`/repos/${REPOSITORY}/pulls/${prNumber}`)
  ]);
  return { pr: prNumber, title: pull.title, links: buildLinks(P, prNumber, pull.html_url, inspected.pages) };
}

function formatTable(items) {
  const cell = (text) => text.replace(/\|/g, "\\|");
  const lines = ["| PR | Multidev | Live | 2-panel | 3-panel | GitHub diff |", "|---|---|---|---|---|---|"];
  for (const item of items) {
    if (item.error) {
      lines.push(`| #${item.pr} (could not be read: ${cell(item.error)}) | – | – | – | – | – |`);
      continue;
    }
    const { links } = item;
    const name = `[${item.label || `#${item.pr}`} ${cell(item.title)}](${links.pr})`;
    if (!links.pages.length) {
      lines.push(`| ${name} | – | – | – | – | [Files changed](${links.files}) |`);
      continue;
    }
    for (const page of links.pages) {
      const label = links.pages.length > 1 ? `${name} · ${page.filename.split("/").pop()}` : name;
      lines.push(`| ${label} | [Multidev](${page.preview}) | [Live](${page.live}) | [2-panel](${page.twoPanel}) | [3-panel](${page.threePanel}) | [Diff](${page.diff}) |`);
    }
  }
  return lines.join("\n");
}

// Adds the gh token to api.github.com requests only. Raw files and preview hosts never see it.
function enableAuth() {
  let token;
  try {
    token = execFileSync("gh", ["auth", "token"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return false;
  }
  if (!token) return false;
  const realFetch = globalThis.fetch;
  globalThis.fetch = (url, init = {}) => {
    const host = new URL(typeof url === "string" ? url : url.url).hostname;
    if (host !== "api.github.com") return realFetch(url, init);
    return realFetch(url, { ...init, headers: { ...(init.headers || {}), Authorization: `Bearer ${token}` } });
  };
  return true;
}

async function api(pathname) {
  const response = await fetch(`https://api.github.com${pathname}`, { headers: { Accept: "application/vnd.github+json" } });
  if (!response.ok) throw new Error(`${response.status} for ${pathname}`);
  return response.json();
}

async function gather(prNumber) {
  const P = loadResolver();
  const [inspected, pull, changed] = await Promise.all([
    P.inspectPullRequest(prNumber),
    api(`/repos/${REPOSITORY}/pulls/${prNumber}`),
    api(`/repos/${REPOSITORY}/pulls/${prNumber}/files?per_page=100`).catch(() => null)
  ]);
  const sha = pull.head.sha;

  const [drift, checks] = await Promise.all([
    api(`/repos/${REPOSITORY}/compare/${pull.base.ref}...${sha}`).then((c) => c.behind_by, () => null),
    api(`/repos/${REPOSITORY}/commits/${sha}/check-runs?per_page=100`).then((c) => c.check_runs, () => null)
  ]);

  const previewTarget = inspected.pages[0]?.previewUrl || `${P.previewOrigin(prNumber)}/`;
  const probe = await P.probePreview(previewTarget);

  const ci = checks && {
    total: checks.length,
    failing: checks.filter((c) => c.conclusion === "failure").map((c) => c.name),
    running: checks.filter((c) => c.status !== "completed").map((c) => c.name),
    passed: checks.filter((c) => c.conclusion === "success").length
  };

  return {
    pr: prNumber,
    title: pull.title,
    url: pull.html_url,
    state: pull.merged ? "merged" : pull.state,
    draft: pull.draft,
    headSha: sha,
    base: pull.base.ref,
    behindBase: drift,
    pages: inspected.pages,
    links: buildLinks(P, prNumber, pull.html_url, inspected.pages),
    otherFiles: changed ? changed.filter((f) => !/\.(md|mdx)$/i.test(f.filename)).map((f) => ({ filename: f.filename, status: f.status })) : null,
    otherFilesTruncated: Boolean(changed && changed.length === 100),
    unrouted: inspected.unrouted,
    permalinkChanges: inspected.permalinkChanges,
    releaseNotes: inspected.releaseNotes,
    unreadable: inspected.unreadable,
    truncated: inspected.truncated,
    middlewareUrl: inspected.middlewareUrl,
    preview: { url: previewTarget, ok: probe.ok, status: probe.status, message: P.describeProbe(probe) },
    ci
  };
}

function formatMarkdown(packet, now = Date.now(), describeAge = loadResolver().describeAge) {
  const lines = [];
  const drift = packet.behindBase === null ? "unknown" : `${packet.behindBase} commit${packet.behindBase === 1 ? "" : "s"} behind ${packet.base}`;
  lines.push(`# PR #${packet.pr}: ${packet.title}`, "", `${packet.url}`, "", `State: ${packet.state}${packet.draft ? " (draft)" : ""}. Head ${packet.headSha.slice(0, 7)}. Branch: ${drift}.`, "");

  if (packet.links) {
    lines.push("## Links", "", `- PR: ${packet.links.pr}`, `- Files changed: ${packet.links.files}`);
    for (const page of packet.links.pages) {
      lines.push("", `### ${page.filename.split("/").pop()}`, "",
        `- Multidev preview: ${page.preview}`,
        `- Live: ${page.live}`,
        `- GitHub diff: ${page.diff}`,
        `- 2-panel (extension): ${page.twoPanel}`,
        `- 3-panel (extension): ${page.threePanel}`);
    }
    lines.push("");
  }

  lines.push(`## Affected pages (${packet.pages.length})`, "");
  if (packet.pages.length) {
    lines.push("| File | Preview | Live |", "|---|---|---|");
    for (const page of packet.pages) lines.push(`| ${page.filename.split("/").pop()}${page.release ? " (release note)" : ""} | ${markReviewLink(page.previewUrl)} | ${markReviewLink(page.liveUrl)} |`);
  } else {
    lines.push("No changed Markdown file has a permalink, so there is no page to preview.");
  }
  const notes = [];
  if (packet.unrouted.length) notes.push(`No permalink: ${packet.unrouted.join(", ")}`);
  if (packet.unreadable) notes.push(`${packet.unreadable} changed file(s) could not be read`);
  if (packet.truncated) notes.push("The PR changes more files than were read; the list may be incomplete");
  if (notes.length) lines.push("", ...notes.map((n) => `- ${n}`));

  if (packet.otherFiles === null) {
    lines.push("", "## Other changed files", "", "The full file list could not be read, so non-Markdown changes aren't shown.");
  } else if (packet.otherFiles && packet.otherFiles.length) {
    lines.push("", `## Other changed files (${packet.otherFiles.length}${packet.otherFilesTruncated ? "+" : ""})`, "", "These aren't Markdown pages, so the page list above doesn't cover them. Read them in the diff.", "");
    lines.push(...packet.otherFiles.map((f) => `- ${f.filename} (${f.status})`));
  }

  lines.push("", "## Warnings", "");
  const warnings = [];
  for (const change of packet.permalinkChanges) {
    warnings.push(`- Permalink changed in ${change.filename.split("/").pop()}: ${change.before || "none"} -> ${change.after || "none"}. Check redirects in src/middleware.ts (${packet.middlewareUrl}) and cross-links to the old path.`);
  }
  for (const note of packet.releaseNotes) {
    const name = note.filename.split("/").pop();
    if (note.time === null) {
      warnings.push(`- Release note ${name} has no published_at or published_date. The RSS feed needs published_at, and validate-release-notes.yml fails without it.`);
    } else if (!/T\d/.test(note.value)) {
      warnings.push(`- Release note ${name}: only a date (${note.value}), no published_at. validate-release-notes.yml fails without it, and the feed would use a synthetic time.`);
    } else if (/T00:00:00Z$/.test(note.value)) {
      warnings.push(`- Release note ${name}: published_at ${note.value} is a midnight placeholder. validate-release-notes.yml rejects it; set the actual publication time.`);
    } else {
      const stale = now - note.time > DAY_MS;
      warnings.push(`- Release note ${name}: published_at ${note.value} (${describeAge(note.time, now)}). The RSS feed publishes this as the item date, so set it to the actual publication time at merge.${stale ? " It is more than a day old; Slack may not treat the item as new." : ""}`);
    }
  }
  lines.push(...(warnings.length ? warnings : ["None."]));

  lines.push("", "## Preview", "", `${packet.preview.ok ? "OK" : "Not responding"}: ${packet.preview.message} (${packet.preview.url})`);
  if (packet.state === "merged") lines.push("", "This PR is merged. Its multidev is usually deleted shortly after, so previews may 404.");

  lines.push("", "## CI", "");
  if (!packet.ci) {
    lines.push("Check runs could not be read.");
  } else {
    lines.push(`${packet.ci.passed} passed, ${packet.ci.failing.length} failing, ${packet.ci.running.length} running (${packet.ci.total} total).`);
    if (packet.ci.failing.length) lines.push(`Failing: ${packet.ci.failing.join(", ")}`);
    if (packet.ci.running.length) lines.push(`Running: ${packet.ci.running.join(", ")}`);
    if (packet.ci.failing.includes("backstop_vrt")) {
      lines.push("", `backstop_vrt compares this PR's multidev with dev (which tracks ${packet.base}).${packet.behindBase > 0 ? ` This branch is ${packet.behindBase} commit(s) behind, so pages that show recent content can differ. Merge ${packet.base} in and re-run before judging it.` : ""} Tracked in issue 10308.`);
    }
  }

  lines.push("", "## Review checklist", "");
  const steps = [
    "Confirm the change scope and timeline.",
    "Review Files changed and the front-matter permalink.",
    "Open the multidev preview and verify the changed section renders.",
    "Compare the preview with the live page.",
    "Check tables, formatting, capitalization, and Pantheon terminology."
  ];
  if (packet.releaseNotes.length) steps.push("Set release-note published_at to the actual publication time at merge (the RSS feed uses it as the item date); confirm the release time in the docs channel.");
  if (packet.permalinkChanges.length) steps.push("Verify the redirect in middleware.ts and check cross-links.");
  lines.push(...steps.map((s) => `- [ ] ${s}`));
  return lines.join("\n");
}

function readState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, "utf8")); } catch { return { opened: {} }; }
}

function urlKey(url) {
  const parsed = new URL(url);
  parsed.hash = "";
  parsed.pathname = parsed.pathname.replace(/\/+$/, "") || "/";
  return parsed.href;
}

// Opens URLs in the background (macOS 'open -g'), skipping disallowed hosts and recent repeats.
async function openUrls(urls, { dryRun = false, force = false, now = Date.now() } = {}) {
  const P = loadResolver();
  const state = readState();
  const result = { opened: [], skippedRecent: [], refused: [], capped: [] };
  const seen = new Set();
  const toOpen = [];

  for (const url of urls) {
    const key = P.isAllowedUrl(url) ? urlKey(url) : null;
    if (!key) { result.refused.push(url); continue; }
    if (seen.has(key)) continue;
    seen.add(key);
    if (!force && state.opened[key] && now - state.opened[key] < REOPEN_AFTER_MS) { result.skippedRecent.push(url); continue; }
    if (toOpen.length >= P.MAX_OPEN_ALL) { result.capped.push(url); continue; }
    toOpen.push(url);
  }

  if (toOpen.length && !dryRun) {
    await new Promise((resolve, reject) => execFile("open", ["-g", ...toOpen], (error) => (error ? reject(error) : resolve())));
    for (const url of toOpen) state.opened[urlKey(url)] = now;
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  }
  result.opened = toOpen;
  return result;
}

async function main(argv) {
  const options = parseArgs(argv);
  if (options.help) { console.log(USAGE); return 0; }
  loadResolver();
  const authed = options.auth ? enableAuth() : false;
  if (options.auth && !authed) console.error("Note: gh token not available; using unauthenticated requests (60 per hour).");

  if (options.table) {
    const items = [];
    for (const pr of options.prs) {
      try {
        items.push(await gatherLinks(pr));
      } catch (error) {
        items.push({ pr, error: error.message });
      }
    }
    console.log(formatTable(items));
    return items.some((item) => item.error) ? 1 : 0;
  }

  const packet = await gather(options.pr);
  console.log(options.json ? JSON.stringify(packet, null, 2) : formatMarkdown(packet));

  if (options.open) {
    const urls = packet.pages.map((p) => markReviewLink(p.previewUrl));
    if (options.openLive) urls.push(...packet.pages.map((p) => markReviewLink(p.liveUrl)));
    const outcome = await openUrls(urls, { dryRun: options.dryRun, force: options.force });
    const verb = options.dryRun ? "Would open" : "Opened";
    console.error(`\n${verb} ${outcome.opened.length} URL(s); ${outcome.skippedRecent.length} skipped (opened in the last 6 hours); ${outcome.refused.length} refused (host not allowed); ${outcome.capped.length} over the cap.`);
    if (options.dryRun) outcome.opened.forEach((u) => console.error(`  ${u}`));
  }
  return 0;
}

module.exports = { markReviewLink, parseArgs, formatMarkdown, formatTable, openUrls, urlKey, api, enableAuth, gatherLinks, loadResolver };

if (require.main === module) {
  main(process.argv.slice(2)).then((code) => process.exit(code), (error) => {
    console.error(`docs-pr-review: ${error.message}`);
    process.exit(1);
  });
}
