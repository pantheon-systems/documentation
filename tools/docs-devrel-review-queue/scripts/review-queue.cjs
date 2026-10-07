#!/usr/bin/env node
// Review queue for the docs and DevRel skill: checks the reviewer's permission per repo, then lists
// open PRs (or issues) for one or more named filters. The default filter lists the PRs that request
// the reviewer's review, with links and a "Needs unblocking" check for each. Read-only; it never posts.
"use strict";

const docs = require("./docs-pr-review.cjs");

const OWNER = "pantheon-systems";
// Defaults are public-safe. A gitignored config.local.json next to this file can add repos and orgs:
// { "repos": ["documentation", "..."], "orgs": ["..."] }. Orgs are searched for review requests only.
const localConfig = (() => {
  try { return JSON.parse(require("node:fs").readFileSync(require("node:path").join(__dirname, "config.local.json"), "utf8")); } catch { return {}; }
})();
const SAFE_NAME = /^[A-Za-z0-9_.-]+$/;
const REPOS = (localConfig.repos || []).filter((r) => SAFE_NAME.test(r)).length ? localConfig.repos.filter((r) => SAFE_NAME.test(r)) : ["documentation"];
const ORGS = (localConfig.orgs || []).filter((o) => SAFE_NAME.test(o));
const DAY = 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;
const WAIT_REVIEW_DAYS = 3;
const DRAFT_DAYS = 7;
const STALE_DAYS = 14;
const HUNG_CHECK_HOURS = 2;
const NO_DECISION_DAYS = 7;
const FULL_MAX = 15;
let SEARCH_PAUSE_MS = 3000;
const TEAM = Array.isArray(localConfig.team) ? localConfig.team.filter((l) => /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(l)) : [];

// Each filter plans one or more searches. "order" is created-asc (longest waiting first) unless set.
const FILTERS = {
  coworking: {
    about: "the co-working walkthrough in one go: approved, unclaimed, no label, no assignee, changes requested",
    plan: (ctx) => ["approved", "unclaimed", "prs-no-label", "prs-no-assignee", "changes-requested"].flatMap((name) => FILTERS[name].plan(ctx))
  },
  "my-queue": {
    about: "open PRs that request your review or a team you're on; your own PRs left out (default)",
    plan: () => [{ title: "Review queue", kind: "pr", q: "review-requested:@me", order: "desc", skipOwn: true, scope: "requests" }]
  },
  approved: {
    about: "open PRs with an approval",
    plan: () => [{ title: "Approved PRs", kind: "pr", q: "review:approved" }]
  },
  unclaimed: {
    about: "open PRs with no review and no assignee",
    plan: () => [{ title: "PRs with no review and no assignee", kind: "pr", q: "review:none no:assignee" }]
  },
  awaiting: {
    about: "open PRs waiting on a named reviewer: --reviewer <login>, repeatable (default: the team in config.local.json, else you)",
    plan: ({ reviewers }) => reviewers.map((r) => ({ title: `Awaiting review from @${r}`, kind: "pr", q: `user-review-requested:${r}`, scope: "requests" }))
  },
  "changes-requested": {
    about: "open PRs with requested changes",
    plan: () => [{ title: "PRs with requested changes", kind: "pr", q: "review:changes_requested" }]
  },
  "no-decision": {
    about: "open non-draft PRs reviewed with comments only (no approval, no change request) for --days N (default 7)",
    plan: ({ minDays }) => [{ title: `Comment-only feedback, no decision for ${minDays}+ days`, kind: "pr", q: "-is:draft", noDecisionDays: minDays }]
  },
  "prs-no-assignee": {
    about: "open PRs assigned to nobody",
    plan: () => [{ title: "PRs assigned to nobody", kind: "pr", q: "no:assignee" }]
  },
  "issues-no-assignee": {
    about: "open issues assigned to nobody",
    plan: () => [{ title: "Issues assigned to nobody", kind: "issue", q: "no:assignee" }]
  },
  "prs-no-label": {
    about: "open PRs with no label",
    plan: () => [{ title: "PRs with no label", kind: "pr", q: "no:label" }]
  },
  "issues-no-label": {
    about: "open issues with no label",
    plan: () => [{ title: "Issues with no label", kind: "issue", q: "no:label" }]
  }
};

const USAGE = `Usage: review-queue [--filter name[,name]...] [--reviewer login]... [--days N] [--full|--brief]
                    [--pause SECONDS] [--html FILE] [--table] [--no-auth] [--repo owner/name]...

Checks your permission on the repos it covers (default: pantheon-systems/documentation), then lists open PRs or issues for each
filter (default: my-queue). A PR list of ${FULL_MAX} or fewer gets links, a stuck check and next
steps for each PR; a longer list, and every issue list, prints a brief line per item.

  --filter       one or more of: ${Object.keys(FILTERS).join(", ")}
                 (repeat the flag or comma-separate; each runs as its own section)
  --reviewer     with awaiting: a GitHub login to check (repeatable)
  --days         with no-decision: days since the last comment-only review (default ${NO_DECISION_DAYS})
  --full         links and stuck check for every PR, however long the list
  --brief        one line per item, no links or stuck check
  --html FILE    also write a page: a summary table whose filter names link to the GitHub search, then one
                 collapsible section per filter with the full outline and quick links
  --json FILE    save the results to a file, so a second run can --merge them
  --merge FILE   add the results saved by an earlier --json run (repeatable); a filter run again replaces its old results
  --no-orgs      skip the orgs listed in config.local.json (searched for review requests only)
  --pause        seconds to wait between searches (default 3); raise it for long runs
  --list-filters print each filter and what it finds
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

async function graphql(query, variables) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables })
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
async function diagnose(repo, number, now = Date.now(), owner = OWNER) {
  const base = `/repos/${owner}/${repo}`;
  const pull = await docs.api(`${base}/pulls/${number}`);
  const sha = pull.head.sha;
  const [reviews, commits, checks, behind, threads, files] = await Promise.all([
    docs.api(`${base}/pulls/${number}/reviews?per_page=100`).catch(() => null),
    docs.api(`${base}/pulls/${number}/commits?per_page=100`).catch(() => null),
    docs.api(`${base}/commits/${sha}/check-runs?per_page=100`).then((c) => c.check_runs, () => null),
    docs.api(`${base}/compare/${pull.base.ref}...${sha}`).then((c) => c.behind_by, () => null),
    graphql(
      "query($owner:String!,$name:String!,$number:Int!){repository(owner:$owner,name:$name){pullRequest(number:$number){reviewThreads(first:100){nodes{isResolved comments(last:1){nodes{author{login}}}}}}}}",
      { owner, name: repo, number: Number(number) }
    )
      .then((d) => d.repository.pullRequest.reviewThreads.nodes, () => null),
    docs.api(`${base}/pulls/${number}/files?per_page=100`).then((f) => f.map((x) => x.filename), () => null)
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

  const paths = files || [];
  const inContent = (f) => f.startsWith("src/source/content/") || f.startsWith("src/source/releasenotes/") || f.startsWith("src/source/partials/");
  const releaseNote = paths.some((f) => f.startsWith("src/source/releasenotes/"));
  const touchesDesign = paths.some((f) => !f.startsWith("src/source/") && (/\.(s?css|less|tsx?|jsx?)$/.test(f) || /package|lock|tailwind/.test(f)));
  const isBot = pull.user.type === "Bot";
  const engineering = isBot || (repo === "documentation" && owner === OWNER && paths.length > 0 && paths.every((f) => !inContent(f)));
  if (engineering) {
    add("Engineering-owned", isBot ? "Bot author (dependency update)" : `Changes ${paths.length} file${paths.length === 1 ? "" : "s"}, none of them content`,
      `Leave it to ${localConfig.engineering || "the engineers who own the site code"}; draft a nudge if it's stuck, and don't send it`, "engineering");
  }

  if (pull.mergeable_state === "dirty") {
    add("Merge conflicts", `Conflicts with ${pull.base.ref}`, `Merge or rebase ${pull.base.ref} and resolve the conflicts`, `author @${author}`);
  }

  const onlyBackstop = failing.length > 0 && failing.every((c) => c.name === "backstop_vrt");
  const drift = onlyBackstop && behind > 0;
  if (onlyBackstop && releaseNote) {
    add("backstop_vrt failing (expected on release-note PRs)", `The homepage lists the latest release notes, so the comparison with dev differs${behind > 0 ? `; also ${behind} commit${behind === 1 ? "" : "s"} behind ${pull.base.ref}` : ""}; check: ${failing[0].details_url}`,
      "Ignore it unless the PR also touches design, CSS or packages (issue #10308)", "no one");
  } else if (drift) {
    add("backstop_vrt failing (likely drift)", `${behind} commit${behind === 1 ? "" : "s"} behind ${pull.base.ref}; check: ${failing[0].details_url}`,
      `Merge ${pull.base.ref} in and re-run before judging it (issue #10308); ignore it unless the PR touches design, CSS or packages`, `author @${author}`);
  } else if (onlyBackstop) {
    add("backstop_vrt failing", `Not behind ${pull.base.ref}; often a screenshot taken before the page rendered; check: ${failing[0].details_url}`,
      touchesDesign ? "This PR touches design, CSS or packages: download the artifact and read the Backstop report" : "Re-run once; ignore it if the PR changes content only (issue #10308)", `author @${author}`);
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
      teamOnly ? `No named reviewer: someone on ${requestedTeams.join(", ")} needs to claim it (assign yourself and add a label)` : asked.length ? "Review it, or reassign" : "Request a reviewer",
      teamOnly ? `team ${requestedTeams.join(", ")}` : requestedUsers.length ? `reviewer ${who(requestedUsers)}` : `author @${author}`);
  }

  if (approvals.length && !changes.length) {
    if (pull.mergeable_state === "clean") {
      add("Approved, not merged", `Approved by ${who(approvals.map((r) => r.user.login))}; no conflicts, checks passing`,
        "Whoever asked for the review merges it; merge it for them only if they asked you to review and merge", `author @${author}`);
    } else if (pull.mergeable_state === "blocked") {
      const missing = [...requestedUsers.map((u) => `@${u}`), ...requestedTeams.map((t) => `team ${t}`)];
      add("Approved but blocked", `Approved by ${who(approvals.map((r) => r.user.login))}; merge is blocked${missing.length ? `; still requested: ${missing.join(", ")}` : ""}${failing.length ? `; failing: ${failing.map((c) => c.name).join(", ")}` : ""}`,
        "Clear the blocking review or check, then whoever requested the review merges", "reviewers and author");
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const labelOf = (pr) => (pr.owner !== OWNER ? `${pr.owner}/${pr.repo}#${pr.number}` : pr.repo === "documentation" ? `#${pr.number}` : `${pr.repo}#${pr.number}`);

// One search, mapped to the fields the views need. Pauses after each call: GitHub's secondary
// rate limit rejects bursts of search requests.
async function search(kind, q, covered, order, login, orgs = []) {
  const scopes = [...covered.map((r) => `repo:${OWNER}/${r}`), ...orgs.map((o) => `org:${o}`)];
  const query = `is:${kind} is:open ${q} archived:false ${scopes.join(" ")}`;
  let found;
  try {
    found = await docs.api(`/search/issues?q=${encodeURIComponent(query)}&per_page=100&sort=created&order=${order}`);
  } catch (error) {
    if (/^(403|429)\b/.test(error.message)) throw new Error("GitHub rate-limited the search (secondary limit). Wait a few minutes, then rerun that filter.");
    throw error;
  }
  await sleep(SEARCH_PAUSE_MS);
  const items = found.items.map((item) => ({
    owner: item.repository_url.split("/").slice(-2)[0], repo: item.repository_url.split("/").pop(), number: item.number, title: item.title, url: item.html_url,
    draft: Boolean(item.draft), bot: item.user.type === "Bot", author: item.user.login, yours: item.user.login === login,
    createdAt: item.created_at, updatedAt: item.updated_at,
    assignees: item.assignees.map((a) => a.login), labels: item.labels.map((l) => l.name)
  }));
  return { items, total: found.total_count };
}

// Keeps PRs whose reviewers (other than the author) only left comments, the last one at least minDays ago.
async function keepNoDecision(items, minDays, now = Date.now()) {
  const kept = [];
  for (const pr of items) {
    const reviews = await docs.api(`/repos/${pr.owner || OWNER}/${pr.repo}/pulls/${pr.number}/reviews?per_page=100`).catch(() => null);
    const latest = new Map();
    for (const review of reviews || []) {
      if (review.user && review.user.login !== pr.author && review.state !== "PENDING") latest.set(review.user.login, review);
    }
    const verdicts = [...latest.values()];
    if (!verdicts.length || verdicts.some((r) => r.state === "APPROVED" || r.state === "CHANGES_REQUESTED")) continue;
    const last = verdicts.reduce((a, b) => (Date.parse(b.submitted_at) > Date.parse(a.submitted_at) ? b : a));
    const age = days(last.submitted_at, now);
    if (age < minDays) continue;
    kept.push({ ...pr, note: `Last feedback ${age}d ago from ${who(verdicts.map((r) => r.user.login))} (comments only); no approval or change request` });
  }
  return kept;
}

function formatBrief(prs, now = Date.now()) {
  return prs.map((pr) => {
    const tags = `${pr.draft ? " · draft" : ""}${pr.bot ? " · bot" : ""}${pr.yours ? " · yours" : ""}`;
    const bits = [`by @${pr.author}`, `created ${days(pr.createdAt, now)}d ago`, `updated ${days(pr.updatedAt, now)}d ago`, `assignees: ${pr.assignees.length ? who(pr.assignees) : "none"}`];
    if (pr.labels.length) bits.push(`labels: ${pr.labels.join(", ")}`);
    return `- [${labelOf(pr)} ${pr.title}](${pr.url})${tags}\n  - ${bits.join(" · ")}${pr.note ? `\n  - ${pr.note}` : ""}`;
  }).join("\n");
}

// Links and the stuck check for each PR, as an outline or (with table) two tables.
// Returns { start, text }: the PR to offer first, and the markdown to print.
async function buildOutline(queue, table) {
  const items = [];
  for (const pr of queue) {
    if (pr.repo === "documentation" && pr.owner === OWNER) {
      try {
        items.push({ ...(await docs.gatherLinks(String(pr.number))), label: `#${pr.number}` });
      } catch (error) {
        items.push({ pr: pr.number, label: `#${pr.number}`, error: error.message });
      }
    } else {
      items.push({ pr: pr.number, label: labelOf(pr), title: pr.title, links: { pr: pr.url, files: `${pr.url}/files`, pages: [] } });
    }
  }
  const findings = [];
  for (const pr of queue) {
    try {
      findings.push(await diagnose(pr.repo, pr.number, Date.now(), pr.owner));
    } catch (error) {
      findings.push([{ stuck: "Could not check", evidence: error.message, next: "Check it by hand", owner: "you" }]);
    }
  }
  let text;
  if (table) {
    const rows = queue.flatMap((pr, index) => findings[index].map((f) => ({ ...f, label: items[index].label, url: pr.url })));
    text = [docs.formatTable(items), "", "## Needs unblocking", "", rows.length ? stuckTable(rows) : "Nothing looks stuck."].join("\n");
  } else {
    text = formatOutline(queue, items, findings);
  }
  const first = queue.findIndex((pr, index) => findings[index].length);
  return { start: queue[first === -1 ? 0 : first], text };
}

// GitHub search links for a plan: the documentation repo (what the team bookmarks) and all covered repos.
function searchLinks(plan, covered, orgs = []) {
  const q = `is:${plan.kind} is:open ${plan.q}`;
  const scopes = [...covered.map((r) => `repo:${OWNER}/${r}`), ...(plan.scope === "requests" ? orgs.map((o) => `org:${o}`) : [])];
  const all = `https://github.com/search?q=${encodeURIComponent(`${q} ${scopes.join(" ")}`)}&type=${plan.kind === "pr" ? "pullrequests" : "issues"}`;
  const docsRepo = covered.includes("documentation") ? `https://github.com/${OWNER}/documentation/${plan.kind === "pr" ? "pulls" : "issues"}?q=${encodeURIComponent(q)}` : null;
  return { all, docs: docsRepo };
}

async function main(argv) {
  const repos = [];
  const names = [];
  const reviewers = [];
  let auth = true;
  let table = false;
  let full = false;
  let brief = false;
  let htmlPath = null;
  let jsonPath = null;
  const merges = [];
  let useOrgs = true;
  let minDays = NO_DECISION_DAYS;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--no-auth") auth = false;
    else if (argv[i] === "--no-orgs") useOrgs = false;
    else if (argv[i] === "--json") jsonPath = argv[++i];
    else if (argv[i] === "--merge") merges.push(argv[++i]);
    else if (argv[i] === "--table") table = true;
    else if (argv[i] === "--full") full = true;
    else if (argv[i] === "--brief") brief = true;
    else if (argv[i] === "--html") htmlPath = argv[++i];
    else if (argv[i] === "--pause") {
      const seconds = Number(argv[++i]);
      if (!Number.isFinite(seconds) || seconds < 0) throw new Error("--pause needs a number of seconds, such as 8");
      SEARCH_PAUSE_MS = seconds * 1000;
    } else if (argv[i] === "--repo") {
      const name = (argv[++i] || "").replace(`${OWNER}/`, "");
      if (!SAFE_NAME.test(name)) throw new Error("--repo takes a repository name such as documentation.");
      repos.push(name);
    } else if (argv[i] === "--filter") names.push(...String(argv[++i] || "").split(",").map((n) => n.trim()).filter(Boolean));
    else if (argv[i] === "--reviewer") {
      const login = String(argv[++i] || "").replace(/^@/, "");
      if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(login)) throw new Error("--reviewer takes a GitHub login such as octocat.");
      reviewers.push(login);
    }
    else if (argv[i] === "--days") {
      minDays = Number(argv[++i]);
      if (!Number.isFinite(minDays) || minDays < 0) throw new Error("--days needs a number of days, such as 7");
    } else if (argv[i] === "--list-filters") {
      for (const [name, f] of Object.entries(FILTERS)) console.log(`${name.padEnd(20)} ${f.about}`);
      return 0;
    } else if (argv[i] === "-h" || argv[i] === "--help") { console.log(USAGE); return 0; }
    else throw new Error(`Unknown option ${argv[i]}`);
  }
  const chosen = names.length ? names : ["my-queue"];
  for (const name of chosen) if (!FILTERS[name]) throw new Error(`Unknown filter "${name}". Run --list-filters to see them.`);
  if (reviewers.length && !chosen.includes("awaiting")) throw new Error("--reviewer only applies to --filter awaiting");
  if (full && brief) throw new Error("Use --full or --brief, not both");
  if (argv.includes("--html") && !htmlPath) throw new Error("--html needs a file path");
  if ((argv.includes("--json") && !jsonPath) || merges.some((m) => !m)) throw new Error("--json and --merge need a file path");
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
  const orgs = [];
  if (useOrgs && !repos.length) {
    for (const org of ORGS) {
      const member = await docs.api(`/orgs/${org}/memberships/${login}`).then((m) => m.state === "active" ? m.role : null, () => null);
      access.push(`${org} (org, review requests only): ${member ? `${member}, read access` : "no access"}`);
      if (member) orgs.push(org);
    }
  }
  console.log(`Signed in as @${login}. Permission: ${access.join("; ")}.\n`);
  if (!covered.length) return 1;

  const plans = chosen.flatMap((name) => FILTERS[name].plan({ reviewers: reviewers.length ? reviewers : TEAM.length ? TEAM : [login], minDays }));
  const sections = [];
  for (const plan of plans) {
    const section = { plan, links: searchLinks(plan, covered, orgs), count: 0, text: "", pre: "", post: "", skipped: null, start: null };
    sections.push(section);
    let found;
    try {
      found = await search(plan.kind, plan.q, covered, plan.order || "asc", login, plan.scope === "requests" ? orgs : []);
    } catch (error) {
      if (!/rate-limited/.test(error.message)) throw error;
      section.skipped = error.message;
      await sleep(SEARCH_PAUSE_MS * 2);
      continue;
    }
    const { items, total } = found;
    let queue = plan.skipOwn ? items.filter((item) => !item.yours) : items;
    if (plan.noDecisionDays !== undefined) queue = await keepNoDecision(queue, plan.noDecisionDays);
    section.count = queue.length;
    if (!queue.length) {
      section.text = plan.title === "Review queue" ? "No open PRs are waiting on your review." : "None.";
      continue;
    }
    if (total > items.length) section.pre = `Showing the first ${items.length} of ${total}.`;
    const long = queue.length > FULL_MAX && !full;
    if (plan.kind === "issue" || brief || long) {
      section.text = formatBrief(queue);
      if (plan.kind === "pr" && long && !brief) section.post = `${queue.length} PRs, so this is the brief list. Add --full for links and the stuck check.`;
    } else {
      const built = await buildOutline(queue, table);
      section.text = built.text;
      section.start = built.start;
    }
  }

  if (merges.length) {
    const fs = require("node:fs");
    const fresh = new Set(sections.filter((section) => !section.skipped).map((section) => section.plan.title));
    const earlier = merges.flatMap((file) => JSON.parse(fs.readFileSync(file, "utf8")).sections)
      .filter((section) => !section.skipped && !fresh.has(section.plan.title));
    sections.splice(0, sections.length, ...earlier, ...sections);
  }
  if (jsonPath) require("node:fs").writeFileSync(jsonPath, JSON.stringify({ login, access, sections }, null, 1));
  const skipped = sections.filter((section) => section.skipped).map((section) => section.plan.title);
  const summary = summaryTable(sections);
  if (sections.length > 1) console.log(`## Summary\n\n${summary}\n`);
  for (const section of sections) {
    console.log(`## ${section.plan.title}${section.skipped ? "" : ` (${section.count})`}\n`);
    if (section.skipped) { console.log(`Skipped: ${section.skipped}\n`); continue; }
    if (section.pre) console.log(`${section.pre}\n`);
    console.log(section.text);
    if (section.post) console.log(`\n${section.post}`);
    console.log("");
  }
  const offer = sections.find((section) => section.start)?.start;
  if (offer) {
    console.log(`Thresholds: no review after ${WAIT_REVIEW_DAYS} days, draft untouched ${DRAFT_DAYS} days, no activity ${STALE_DAYS} days, a check running over ${HUNG_CHECK_HOURS} hours.`);
    console.log(`\nWant to walk through these one at a time? I'd start with ${offer.repo === "documentation" ? "" : offer.repo}#${offer.number}.`);
  }
  if (htmlPath) {
    const fs = require("node:fs");
    fs.writeFileSync(htmlPath, renderHtml({ login, access, sections, generated: new Date() }));
    console.log(`\nWrote ${htmlPath}`);
  }
  if (skipped.length) {
    console.log(`Rate-limited, not run: ${skipped.join("; ")}. Wait a few minutes and rerun only those filters.`);
    return 1;
  }
  return 0;
}

function summaryTable(sections) {
  const rows = ["| Filter (GitHub search) | Count | All repos |", "|---|---|---|"];
  for (const { plan, links, count, skipped } of sections) {
    const name = `[${plan.title}](${links.docs || links.all})`;
    rows.push(`| ${name} | ${skipped ? "rate-limited" : count} | [search](${links.all}) |`);
  }
  return rows.join("\n");
}

const escapeHtml = (text) => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function inlineHtml(text) {
  return escapeHtml(text)
    .replace(/\[((?:[^\[\]]|\[[^\]]*\])+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

// Converts the outline and brief markdown this script produces (nested "- " bullets, plain lines).
function mdToHtml(md) {
  const out = [];
  let depth = 0;
  for (const line of String(md).split("\n")) {
    const bullet = /^(\s*)- (.*)$/.exec(line);
    if (bullet) {
      const level = Math.floor(bullet[1].length / 2) + 1;
      while (depth < level) { out.push("<ul>"); depth += 1; }
      while (depth > level) { out.push("</ul>"); depth -= 1; }
      out.push(`<li>${inlineHtml(bullet[2])}</li>`);
    } else if (line.trim()) {
      while (depth > 0) { out.push("</ul>"); depth -= 1; }
      out.push(`<p>${inlineHtml(line.trim())}</p>`);
    }
  }
  while (depth > 0) { out.push("</ul>"); depth -= 1; }
  return out.join("\n");
}

function renderHtml({ login, access, sections, generated }) {
  const rows = sections.map(({ plan, links, count, skipped }, index) => `<tr>
  <td><a href="${escapeHtml(links.docs || links.all)}" target="_blank" rel="noopener">${escapeHtml(plan.title)}</a></td>
  <td class="n">${skipped ? "rate-limited" : count}</td>
  <td><a href="${escapeHtml(links.all)}" target="_blank" rel="noopener">all repos</a></td>
  <td><a href="#sec-${index}">jump</a></td></tr>`).join("\n");
  const blocks = sections.map(({ plan, count, text, pre, post, skipped }, index) => `<details id="sec-${index}"${count && count <= 3 ? " open" : ""}>
<summary><span>${escapeHtml(plan.title)}</span><span class="badge">${skipped ? "rate-limited" : count}</span></summary>
<div class="body">${skipped ? `<p>Skipped: ${escapeHtml(skipped)}</p>` : `${pre ? mdToHtml(pre) : ""}${mdToHtml(text)}${post ? mdToHtml(post) : ""}`}</div>
</details>`).join("\n");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Docs review queue</title>
<style>
:root{--bg:#fff;--fg:#1c1c1e;--muted:#5b5f66;--line:#d9dce1;--card:#f6f7f9;--link:#0b5bd3;--badge:#e8eefc}
@media (prefers-color-scheme:dark){:root{--bg:#16181c;--fg:#e8e9ec;--muted:#a3a7ae;--line:#33373d;--card:#1e2126;--link:#7db0ff;--badge:#26324a}}
body{font:15px/1.5 system-ui,sans-serif;background:var(--bg);color:var(--fg);margin:0;padding:24px 16px}
main{max-width:980px;margin:0 auto}h1{font-size:1.4rem;margin:0 0 4px}.meta{color:var(--muted);margin:0 0 20px;font-size:.9rem}
a{color:var(--link)}table{border-collapse:collapse;width:100%;margin:0 0 24px}th,td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--line)}
th{font-size:.8rem;text-transform:uppercase;letter-spacing:.04em;color:var(--muted)}td.n{font-variant-numeric:tabular-nums}
.bar{display:flex;gap:8px;margin:0 0 12px}button{font:inherit;padding:4px 12px;border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:6px;cursor:pointer}
details{border:1px solid var(--line);border-radius:8px;margin:0 0 10px;background:var(--card)}summary{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:10px 14px;cursor:pointer;font-weight:600}
.badge{background:var(--badge);border-radius:999px;padding:1px 10px;font-size:.85rem;font-weight:600}
.body{padding:2px 16px 12px;overflow-wrap:anywhere}.body ul{margin:4px 0;padding-left:20px}.body ul ul{margin:2px 0}code{font-size:.9em}
</style></head><body><main>
<h1>Docs and DevRel review queue</h1>
<p class="meta">@${escapeHtml(login)} · ${escapeHtml(access.join("; "))} · ${escapeHtml(generated.toISOString().slice(0, 16).replace("T", " "))} UTC</p>
<table><thead><tr><th>Filter (GitHub search)</th><th>Count</th><th>Other</th><th>Outline</th></tr></thead><tbody>
${rows}
</tbody></table>
<div class="bar"><button type="button" id="expand">Expand all</button><button type="button" id="collapse">Collapse all</button></div>
${blocks}
</main>
<script>
const all=()=>document.querySelectorAll("details");
document.getElementById("expand").onclick=()=>all().forEach(d=>d.open=true);
document.getElementById("collapse").onclick=()=>all().forEach(d=>d.open=false);
const openHash=()=>{const d=document.querySelector(location.hash||"#none");if(d&&d.tagName==="DETAILS")d.open=true};
addEventListener("hashchange",openHash);openHash();
</script></body></html>
`;
}

const linkLine = (page) => `[Multidev](${page.preview}) · [Live](${page.live}) · [Diff](${page.diff}) · [2-panel](${page.twoPanel}) · [3-panel](${page.threePanel})`;

// One entry per PR: the title links to the PR, then Links, Needs unblocking, Next steps.
function formatOutline(queue, items, findings) {
  const lines = [];
  queue.forEach((pr, index) => {
    const item = items[index];
    const tags = `${pr.draft ? " · draft" : ""}${pr.bot ? " · bot" : ""}${pr.yours ? " · yours" : ""}`;
    lines.push(`- [${item.label} ${pr.title}](${pr.url})${tags}`);
    if (pr.note) lines.push(`  - **Why listed:** ${pr.note}`);

    const pages = item.links?.pages || [];
    if (!pages.length) {
      const why = pr.repo === "documentation" && pr.owner === OWNER ? "no changed page to preview" : "no preview defined for this repo";
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

module.exports = { diagnose, stuckTable, formatOutline, formatBrief, keepNoDecision, level, FILTERS, summaryTable, renderHtml, mdToHtml, searchLinks };

if (require.main === module) {
  main(process.argv.slice(2)).then((code) => process.exit(code), (error) => {
    console.error(`review-queue: ${error.message}`);
    process.exit(1);
  });
}
