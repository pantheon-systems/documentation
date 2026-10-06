#!/usr/bin/env node
// Initial run of the docs and DevRel review queue skill: one command that checks the
// reviewer's permission per repo, lists their open review requests, prints the links table,
// then a "Needs unblocking" table for PRs that look stuck. Read-only; it never posts.
"use strict";

const docs = require("./docs-pr-review.cjs");

const OWNER = "pantheon-systems";
const REPOS = ["documentation"];
const DAY = 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;
const WAIT_REVIEW_DAYS = 3;
const DRAFT_DAYS = 7;
const STALE_DAYS = 14;
const HUNG_CHECK_HOURS = 2;

const USAGE = `Usage: review-queue [--table] [--no-auth] [--repo owner/name]...

Checks your permission on pantheon-systems/documentation, then lists open PRs that request
your review (or a team you're on) as an outline: each PR's title links to it, followed by its
links, what looks stuck, and next steps. Your own PRs are left out.

  --table        print a links table and a stuck table instead of the outline
  --repo         check this repo instead of the default, documentation (repeatable)
  --no-auth      don't use the gh CLI token (needs one for the queue search)
  -h, --help     show this help`;

function level(permissions) {
  if (!permissions) return null;
  if (permissions.admin) return "admin";
  if (permissions.maintain) return "maintain";
  if (permissions.push) return "write";
  if (permissions.triage) return "triage";
  return permissions.pull ? "read" : null;
}

async function graphql(query) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });
  if (!response.ok) throw new Error(`${response.status} from graphql`);
  const body = await response.json();
  if (body.errors) throw new Error(body.errors[0].message);
  return body.data;
}

const days = (iso, now) => Math.floor((now - Date.parse(iso)) / DAY);
const hours = (iso, now) => Math.floor((now - Date.parse(iso)) / HOUR);
const who = (names) => names.map((n) => `@${n}`).join(", ");

// Returns one finding per thing that looks stuck: { stuck, evidence, next, owner }.
async function diagnose(repo, number, now = Date.now()) {
  const base = `/repos/${OWNER}/${repo}`;
  const pull = await docs.api(`${base}/pulls/${number}`);
  const sha = pull.head.sha;
  const [reviews, commits, checks, behind, threads] = await Promise.all([
    docs.api(`${base}/pulls/${number}/reviews?per_page=100`).catch(() => null),
    docs.api(`${base}/pulls/${number}/commits?per_page=100`).catch(() => null),
    docs.api(`${base}/commits/${sha}/check-runs?per_page=100`).then((c) => c.check_runs, () => null),
    docs.api(`${base}/compare/${pull.base.ref}...${sha}`).then((c) => c.behind_by, () => null),
    graphql(`{repository(owner:"${OWNER}",name:"${repo}"){pullRequest(number:${number}){reviewThreads(first:100){nodes{isResolved comments(last:1){nodes{author{login}}}}}}}}`)
      .then((d) => d.repository.pullRequest.reviewThreads.nodes, () => null)
  ]);

  const author = pull.user.login;
  const findings = [];
  const add = (stuck, evidence, next, owner) => findings.push({ stuck, evidence, next, owner });
  const lastCommit = commits?.length ? commits[commits.length - 1].commit.committer.date : null;

  const latest = new Map();
  for (const review of reviews || []) {
    if (review.user && review.state !== "PENDING") latest.set(review.user.login, review);
  }
  const verdicts = [...latest.values()];
  const changes = verdicts.filter((r) => r.state === "CHANGES_REQUESTED");
  const approvals = verdicts.filter((r) => r.state === "APPROVED");
  const requestedUsers = pull.requested_reviewers.map((u) => u.login);
  const requestedTeams = pull.requested_teams.map((t) => t.slug);
  const failing = (checks || []).filter((c) => c.conclusion === "failure" || c.conclusion === "timed_out");

  if (pull.mergeable_state === "dirty") {
    add("Merge conflicts", `Conflicts with ${pull.base.ref}`, `Merge or rebase ${pull.base.ref} and resolve the conflicts`, `author @${author}`);
  }

  const drift = failing.length > 0 && failing.every((c) => c.name === "backstop_vrt") && behind > 0;
  if (drift) {
    add("backstop_vrt failing (likely drift)", `${behind} commit${behind === 1 ? "" : "s"} behind ${pull.base.ref}; check: ${failing[0].details_url}`,
      `Merge ${pull.base.ref} in and re-run before judging it (issue #10308)`, `author @${author}`);
  } else if (failing.length) {
    add("Failing checks", `${failing.map((c) => c.name).join(", ")}; log: ${failing[0].details_url}`,
      "Read the failing job log, then fix or re-run it", `author @${author}`);
  }

  for (const check of (checks || []).filter((c) => c.status !== "completed" && c.started_at && now - Date.parse(c.started_at) > HUNG_CHECK_HOURS * HOUR)) {
    add("Check not finishing", `${check.name} has been ${check.status.replace("_", " ")} for ${hours(check.started_at, now)}h`,
      "Re-run it from the Actions tab; if it hangs again, ask whoever owns that workflow", `author @${author} or a maintainer`);
  }

  if (changes.length) {
    const reviewer = changes[0];
    if (lastCommit && Date.parse(lastCommit) > Date.parse(reviewer.submitted_at)) {
      add("Re-review needed", `@${reviewer.user.login} requested changes ${days(reviewer.submitted_at, now)}d ago; the author pushed since`,
        `Re-review the new commits`, `reviewer @${reviewer.user.login}`);
    } else {
      add("Waiting on the author", `@${reviewer.user.login} requested changes ${days(reviewer.submitted_at, now)}d ago; no new commits`,
        "Address the requested changes or reply", `author @${author}`);
    }
  } else if (!pull.draft && verdicts.length === 0 && days(pull.created_at, now) >= WAIT_REVIEW_DAYS) {
    const asked = [...requestedUsers.map((u) => `@${u}`), ...requestedTeams.map((t) => `team ${t}`)];
    const teamOnly = requestedUsers.length === 0 && requestedTeams.length > 0;
    add("No review yet", `Open ${days(pull.created_at, now)}d${asked.length ? `; requested: ${asked.join(", ")}` : "; no reviewer requested"}`,
      teamOnly ? `No named reviewer: someone on ${requestedTeams.join(", ")} needs to claim it` : asked.length ? "Review it, or reassign" : "Request a reviewer",
      teamOnly ? `team ${requestedTeams.join(", ")}` : requestedUsers.length ? `reviewer ${who(requestedUsers)}` : `author @${author}`);
  }

  if (approvals.length && !changes.length) {
    if (pull.mergeable_state === "clean") {
      add("Approved, not merged", `Approved by ${who(approvals.map((r) => r.user.login))}; no conflicts, checks passing`,
        "Merge it", "someone with merge rights");
    } else if (pull.mergeable_state === "blocked") {
      const missing = [...requestedUsers.map((u) => `@${u}`), ...requestedTeams.map((t) => `team ${t}`)];
      add("Approved but blocked", `Approved by ${who(approvals.map((r) => r.user.login))}; merge is blocked${missing.length ? `; still requested: ${missing.join(", ")}` : ""}${failing.length ? `; failing: ${failing.map((c) => c.name).join(", ")}` : ""}`,
        "Clear the blocking review or check, then merge", "reviewers and author");
    }
  }

  const open = (threads || []).filter((t) => !t.isResolved);
  if (open.length) {
    const last = open[open.length - 1].comments.nodes[0]?.author?.login;
    add("Unresolved review threads", `${open.length} open${last ? `; latest from @${last}` : ""}`, "Reply or fix, then resolve the thread", `author @${author}`);
  }

  if (pull.draft && days(pull.updated_at, now) >= DRAFT_DAYS) {
    add("Draft untouched", `Draft, no activity for ${days(pull.updated_at, now)}d`, "Mark it ready for review, or close it", `author @${author}`);
  } else if (!findings.length && days(pull.updated_at, now) >= STALE_DAYS) {
    add("No activity", `Nothing for ${days(pull.updated_at, now)}d`, "Ask the author for status, or close it", `author @${author}`);
  }

  return findings;
}

function stuckTable(rows) {
  const cell = (text) => String(text).replace(/\|/g, "\\|");
  const lines = ["| PR | Stuck on | Evidence | Next step | Who |", "|---|---|---|---|---|"];
  for (const row of rows) lines.push(`| [${row.label}](${row.url}) | ${cell(row.stuck)} | ${cell(row.evidence)} | ${cell(row.next)} | ${cell(row.owner)} |`);
  return lines.join("\n");
}

async function main(argv) {
  const repos = [];
  let auth = true;
  let table = false;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--no-auth") auth = false;
    else if (argv[i] === "--table") table = true;
    else if (argv[i] === "--repo") repos.push(argv[++i]?.replace(`${OWNER}/`, ""));
    else if (argv[i] === "-h" || argv[i] === "--help") { console.log(USAGE); return 0; }
    else throw new Error(`Unknown option ${argv[i]}`);
  }
  if (!(auth && docs.enableAuth())) throw new Error("The queue needs a signed-in gh CLI (run gh auth login).");
  docs.loadResolver();

  const login = (await docs.api("/user")).login;
  const targets = repos.length ? repos : REPOS;

  const access = [];
  const covered = [];
  for (const repo of targets) {
    const found = await docs.api(`/repos/${OWNER}/${repo}`).then((r) => level(r.permissions), () => null);
    access.push(`${repo}: ${found || "no access"}`);
    if (found) covered.push(repo);
  }
  console.log(`Signed in as @${login}. Permission: ${access.join("; ")}.\n`);
  if (!covered.length) return 1;

  const query = `is:pr is:open review-requested:@me archived:false ${covered.map((r) => `repo:${OWNER}/${r}`).join(" ")}`;
  const found = await docs.api(`/search/issues?q=${encodeURIComponent(query)}&per_page=100&sort=created&order=desc`);
  const queue = found.items
    .filter((item) => item.user.login !== login)
    .map((item) => ({ repo: item.repository_url.split("/").pop(), number: item.number, title: item.title, url: item.html_url, draft: item.draft, bot: item.user.type === "Bot" }));
  if (!queue.length) { console.log("No open PRs are waiting on your review."); return 0; }

  const items = [];
  for (const pr of queue) {
    if (pr.repo === "documentation") {
      try {
        items.push({ ...(await docs.gatherLinks(String(pr.number))), label: `#${pr.number}` });
      } catch (error) {
        items.push({ pr: pr.number, label: `#${pr.number}`, error: error.message });
      }
    } else {
      items.push({ pr: pr.number, label: `${pr.repo}#${pr.number}`, title: pr.title, links: { pr: pr.url, files: `${pr.url}/files`, pages: [] } });
    }
  }
  const findings = [];
  for (const pr of queue) {
    try {
      findings.push(await diagnose(pr.repo, pr.number));
    } catch (error) {
      findings.push([{ stuck: "Could not check", evidence: error.message, next: "Check it by hand", owner: "you" }]);
    }
  }

  console.log(`## Review queue (${queue.length})\n`);
  if (table) {
    console.log(docs.formatTable(items));
    const rows = queue.flatMap((pr, index) => findings[index].map((f) => ({ ...f, label: items[index].label, url: pr.url })));
    console.log("\n## Needs unblocking\n");
    console.log(rows.length ? stuckTable(rows) : "Nothing looks stuck.");
  } else {
    console.log(formatOutline(queue, items, findings));
  }
  console.log(`\nThresholds: no review after ${WAIT_REVIEW_DAYS} days, draft untouched ${DRAFT_DAYS} days, no activity ${STALE_DAYS} days, a check running over ${HUNG_CHECK_HOURS} hours.`);
  const first = queue.findIndex((pr, index) => findings[index].length) ;
  const start = queue[first === -1 ? 0 : first];
  console.log(`\nWant to walk through these one at a time? I'd start with ${start.repo === "documentation" ? "" : start.repo}#${start.number}.`);
  return 0;
}

const linkLine = (page) => `[Multidev](${page.preview}) · [Live](${page.live}) · [Diff](${page.diff}) · [2-panel](${page.twoPanel}) · [3-panel](${page.threePanel})`;

// One entry per PR: the title links to the PR, then Links, Needs unblocking, Next steps.
function formatOutline(queue, items, findings) {
  const lines = [];
  queue.forEach((pr, index) => {
    const item = items[index];
    const tags = `${pr.draft ? " · draft" : ""}${pr.bot ? " · bot" : ""}`;
    lines.push(`- [${item.label} ${pr.title}](${pr.url})${tags}`);

    const pages = item.links?.pages || [];
    if (!pages.length) {
      const why = pr.repo === "documentation" ? "no changed page to preview" : "no preview defined for this repo";
      lines.push(`  - **Links:** [Files changed](${pr.url}/files) (${why})`);
    } else if (pages.length === 1) {
      lines.push(`  - **Links:** ${linkLine(pages[0])}`);
    } else {
      lines.push("  - **Links:**", ...pages.map((page) => `    - ${page.filename.split("/").pop()}: ${linkLine(page)}`));
    }

    const stuck = findings[index];
    if (!stuck.length) {
      lines.push("  - **Needs unblocking:** Nothing looks stuck.", "  - **Next steps:** Ready for your review.");
    } else {
      lines.push("  - **Needs unblocking:**", ...stuck.map((f) => `    - ${f.stuck}: ${f.evidence}`));
      lines.push("  - **Next steps:**", ...stuck.map((f) => `    - ${f.next} (${f.owner})`));
    }
  });
  return lines.join("\n");
}

module.exports = { diagnose, stuckTable, formatOutline, level };

if (require.main === module) {
  main(process.argv.slice(2)).then((code) => process.exit(code), (error) => {
    console.error(`review-queue: ${error.message}`);
    process.exit(1);
  });
}
