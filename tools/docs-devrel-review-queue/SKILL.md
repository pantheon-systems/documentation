---
name: docs-devrel-review-queue
description: "Use when someone on the docs or DevRel team asks to work through their PR review queue, see what's waiting on them, find stuck or hung PRs, review a PR in the documentation repo, or wants preview, live, and diff links for a docs PR. Checks the reviewer's permission first and stays read-only on GitHub."
---

# Docs and DevRel PR review queue

Helps one reviewer work through open PRs in `pantheon-systems/documentation`. The first run returns an outline of the queue, with each PR's links, what looks stuck, and next steps, and no questions first. Other views (approved, unclaimed, awaiting a named reviewer, and more) switch on with `--filter`; see section 2a. After that it walks through PRs one at a time if the reviewer wants. It reads and drafts; the reviewer decides and posts. Repo facts are in [references/repos.md](references/repos.md). The per-PR procedure and the unblocking playbook are in [references/review-procedure.md](references/review-procedure.md).

## 1. Pick the mode

| You have | Mode |
|---|---|
| A shell with `gh` signed in (Claude Code) | **Full:** run the bundled scripts |
| Only Glean search and document reading | **Read-only:** list the PRs through Glean with their links, say the outline's stuck check wasn't built |

Say which mode you're in. In read-only mode, never present a check result or preview status you didn't read.

## 2. Initial run: return the outline first

Don't ask anything first. Run:

```bash
node ~/.claude/skills/docs-devrel-review-queue/scripts/review-queue.cjs
```

It prints, in this order:

1. **Permission**, per repo, for the signed-in user: `admin`, `maintain`, `write`, `triage`, `read`, or `no access`.
2. **Review queue** as an outline of open PRs that request their review, or a team they're on. Their own PRs are left out. Each PR is one entry:
   - The **title**, linking to the PR (tagged `draft` or `bot` when it is).
     - **Links:** Multidev · Live · Diff · 2-panel · 3-panel. A PR that changes several pages lists one line per page. Only `documentation` PRs with a changed page have these links; other PRs and code-only PRs show a Files changed link and say why there's no preview.
     - **Needs unblocking:** what looks stuck, with the evidence, or "Nothing looks stuck."
     - **Next steps:** what unblocks it and who acts, or "Ready for your review."
3. The thresholds it used, and the offer: "Want to walk through these one at a time? I'd start with …"

Paste the outline into the reply unchanged, offer included. Don't retype or shorten URLs. Add one line of your own only if something needs context, such as a PR that dropped out because the reviewer already approved it. `--table` prints a links table and a stuck table instead, if the reviewer asks for that format.

| Permission | What you do |
|---|---|
| `write`, `maintain`, `admin` | Full help. Their approval counts toward branch protection. |
| `triage`, `read` | Read the PR and draft comments. Say their approval won't count; suggest a comment review. |
| `no access` | Stop for that repo. Don't use another person's access or guess from cached data. |

Only `pantheon-systems/documentation` is covered by default. For another repo in the org, pass `--repo <name>` to the queue script (it replaces the default, so repeat `--repo documentation` to keep it). The skill has no repo-specific rules for it, so use the generic steps in the procedure.

Notes on the queue:
- **Team requests count.** The search also returns PRs where a team the reviewer belongs to (for example `devrel`) was requested. Say so, so nobody assumes the request named them.
- **Panel links** are plain `https` links to the PR's Files changed page with a marker: `…/pull/N/files?pantheon_panel=2|3&page=<file>`. They open from chat. With the PR preview extension installed (`tools/pantheon-pr-preview-extension/`; see "Shareable panel links" in its README), the tab becomes the 2- or 3-panel view. Without it, the link opens Files changed, so say which the reviewer should expect. GitHub removes the marker from the address bar a moment after load; that is normal.
- **Multidev and Live links end in `?pantheon_review=1`.** With the PR preview extension installed, that marker hides the docs site's cookie banner on the page, and only on pages reached through a link this skill or the extension supplied; a normal visit keeps its banner. The site ignores the parameter, so the links work the same without the extension. Don't strip it when quoting links.
- A **live** link can 404 on a PR that adds a new page, because the page isn't published yet. Say that instead of calling it a defect.

## 2a. Other views: `--filter`

The default run is the `my-queue` filter. When the reviewer asks a different question, pick the filter that answers it and run it the same way. Filters combine (`--filter approved,unclaimed`), and each prints as its own section. Paste the output unchanged, like the default.

```bash
node tools/docs-devrel-review-queue/scripts/review-queue.cjs --filter <name>
```

| The reviewer asks | Filter | Notes |
|---|---|---|
| "What's waiting on me?" | `my-queue` (default) | Your own PRs are left out. |
| "Walk me through the co-working list" | `coworking` | `approved`, `unclaimed`, `prs-no-label`, `prs-no-assignee`, `changes-requested`, in that order. |
| "Any PRs approved?" | `approved` | Open PRs with an approval. Read the approver names in the stuck check before saying who approved. |
| "PRs with no review and no assignee?" | `unclaimed` | `review:none no:assignee`. A PR with an assignee but no reviewer doesn't match; use `prs-no-assignee` or `my-queue`. |
| "Awaiting review from <person>?" | `awaiting` | Pass `--reviewer <login>` (repeatable). With none, it uses the `team` list in `config.local.json`, else the signed-in user. Counts requests to the person only; a request to a team doesn't match, so use `my-queue` for those. |
| "PRs with requested changes?" | `changes-requested` | |
| "Reviewed but no approve or request-changes, past X days?" | `no-decision` | PRs whose reviewers only left comments, the last one `--days N` ago (default 7). GitHub search can't express this, so the script reads each PR's reviews. |
| "PRs or issues assigned to nobody?" | `prs-no-assignee`, `issues-no-assignee` | |
| "PRs or issues with no label?" | `prs-no-label`, `issues-no-label` | |

**Typing it in Claude Code.** The skill takes plain words after its name, and you map them to flags: `/docs-devrel-review-queue approved and unclaimed` runs `--filter approved,unclaimed`; `awaiting <login>` runs `--filter awaiting --reviewer <login>`; `no-decision 3 days` runs `--filter no-decision --days 3`. With no words it runs the default `my-queue` and asks nothing first.

**Picker.** Only when the reviewer types `pick` (or `choose`, `filters`, `menu`), call `AskUserQuestion` once with three multi-select questions, then run the chosen filters in one `--filter a,b,c` command. Never show it on a plain run.

1. **Review status:** `approved`, `changes-requested`, `no-decision`, `unclaimed`
2. **Whose queue:** `my-queue`, `awaiting` (if chosen, ask for the logins)
3. **Housekeeping:** `prs-no-assignee`, `issues-no-assignee`, `prs-no-label`, `issues-no-label`

If the reviewer picks `no-decision`, use 7 days unless they said another number. If they pick nothing, run `my-queue`.

**Summary table and page.** Two or more filters print a **Summary** table first: each filter name links to its GitHub search, with the count and an all-repos search link. Paste it unchanged. `--html <file>` also writes a page with the same table on top and one collapsible section per filter holding the full outline and quick links. Offer it when a run has several filters, write it where the reviewer can open it, and give the path; don't publish it. The `no-decision` link opens all non-draft open PRs, because GitHub search can't test for comment-only reviews.

Rules for the extra filters:

- **Size.** A PR list of 15 or fewer gets links and the stuck check for each PR. A longer list, and every issue list, prints one brief line per item. `--full` forces the full outline and `--brief` forces one-liners. Say when a list was brief, and offer `--full`.
- **Search limits.** One search returns at most 100 items; the script says when more exist. GitHub rate-limits bursts of search calls. The script pauses between searches (`--pause SECONDS`), and a blocked filter prints "Skipped" while the rest still run. Don't loop. For one page from many filters, split the run: `--filter a,b,c --json /tmp/q1.json --pause 15`, wait a few minutes, then `--filter d,e --merge /tmp/q1.json --html page.html --pause 15`. A filter in the second run replaces the same filter in the first.
- **Engineering-owned PRs.** The stuck check tags bot PRs and `documentation` PRs that change no content file as "Engineering-owned". Don't review them as docs; say who owns the site code, and draft a nudge if asked.
- **`backstop_vrt`.** On a release-note PR it fails by design. Elsewhere it's often a screenshot-timing false positive. The stuck check says which. Read the Backstop report only when the PR touches design, CSS or packages.
- **Merging.** The person who asked for the review merges, unless they asked the reviewer to "review and merge". Never merge for them.
- **Claiming a PR.** Assign yourself and add a `Type:` and a `Topic:` label.
- **Blocked and held PRs.** `Process: Blocked` means something outside docs is in the way (for example a guide waiting on a platform fix). `Process: Hold for Release` means it ships with the announcement. The stuck check reports both from the label. Don't nudge the author; say what it waits on and who owns that.
- **Your own PRs.** Every filter except `my-queue` includes them, tagged `yours`.
- **Don't answer from a bookmarked search URL.** A link for "reviewed but no decision" that only says `review-requested:@me` doesn't test for comment-only reviews. Use `no-decision`.
- **Local config.** An optional, gitignored `scripts/config.local.json` adds repos, review-request orgs, a default `awaiting` team and an `engineering` owner name, for example `{"repos": ["documentation"], "orgs": [], "team": [], "engineering": "..."}`. If `references/repos.local.md` exists, read it for the repos in that file.

## 3. Unblock what's stuck

For each item under **Needs unblocking**, use the playbook in the procedure: what's stuck, who has to act, and what you can do now. The rule: say who acts next, and draft the nudge; don't send it. If a row says to read a failing check, read the job log before saying what failed, and say when the log didn't show a cause. Never call a failure flaky without reading why.

## 4. Walk through one PR

Only when the reviewer says yes, and one PR at a time. Follow [references/review-procedure.md](references/review-procedure.md). For `documentation`, run the full packet first:

```bash
node ~/.claude/skills/docs-devrel-review-queue/scripts/docs-pr-review.cjs <N>
```

After the packet, for a PR that changes docs pages, offer the style pass once: "Want a style review of this PR's pages? It runs `docs-style-review`: a mechanical pass, Vale's comments checked against the file, and a read for voice and terminology." Run it only on a yes, and only if `~/.claude/skills/docs-style-review` exists. If it doesn't, say the skill isn't installed and give the install line from `tools/docs-style-review/README.md`.

If the reviewer asks to style review the whole queue, run the outline first. Then take each PR that has changed docs pages, one at a time: the packet, then the style pass, then ask before the next. Skip bot PRs, engineering-owned PRs, and PRs with no changed pages, and say which you skipped.

For another repo (a queue run with `--repo`), the procedure's generic path applies, because there's no preview or published-page rule for it.

## 5. Rules

- **Read-only on GitHub.** Use `gh pr view`, `gh pr diff`, `gh pr checks`, `gh run view`, and `gh api` reads. Never run `gh pr review --approve`, `--request-changes`, `gh pr merge`, a push, a re-run, or resolve a thread.
- **Draft, don't post.** Post a comment only after the reviewer says yes to that exact comment, and then only as a comment, never an approval. Approve or request-changes is always the reviewer's call.
- **Don't nudge people yourself.** Draft the Slack or GitHub message for the reviewer to send.
- **Don't sign in anywhere.** If something needs SSO, ask the reviewer to open it and paste what they see.
- **Quote the output, don't remember it.** CI, drift, and preview status change by the hour. Run it fresh and say what it couldn't read.
- **Don't invent rules.** For repos with no known style guide, cite one you found in the repo or say none was found.
- **Don't open previews on your own.** `--open` runs only after the reviewer agrees, and starts with `--dry-run`.

## 6. Before you call a PR done

**Release notes hit RSS.** For any PR that adds or changes a file in `src/source/releasenotes/`, state its `published_at` value and that the feed publishes it verbatim as the item date, whether or not you ran the packet. Say whether it matches the publication time, and tell the reviewer to update it at merge if it doesn't. Only the front matter and description reach the feed, never the body. The queue outline and the packet both report it; a hand review has to as well.

Re-read the request. State what you checked, what you couldn't (rendering, cross-links, anything behind login), and what needs the reviewer's eyes.
