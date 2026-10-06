---
name: docs-devrel-review-queue
description: "Use when someone on the docs or DevRel team asks to work through their PR review queue, see what's waiting on them, find stuck or hung PRs, review a PR in the documentation repo, or wants preview, live, and diff links for a docs PR. Checks the reviewer's permission first and stays read-only on GitHub."
---

# Docs and DevRel PR review queue

Helps one reviewer work through open PRs in `pantheon-systems/documentation`. The first run returns an outline of the queue, with each PR's links, what looks stuck, and next steps, and no questions first. After that it walks through PRs one at a time if the reviewer wants. It reads and drafts; the reviewer decides and posts. Repo facts are in [references/repos.md](references/repos.md). The per-PR procedure and the unblocking playbook are in [references/review-procedure.md](references/review-procedure.md).

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

## 3. Unblock what's stuck

For each item under **Needs unblocking**, use the playbook in the procedure: what's stuck, who has to act, and what you can do now. The rule: say who acts next, and draft the nudge; don't send it. If a row says to read a failing check, read the job log before saying what failed, and say when the log didn't show a cause. Never call a failure flaky without reading why.

## 4. Walk through one PR

Only when the reviewer says yes, and one PR at a time. Follow [references/review-procedure.md](references/review-procedure.md). For `documentation`, run the full packet first:

```bash
node ~/.claude/skills/docs-devrel-review-queue/scripts/docs-pr-review.cjs <N>
```

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

Re-read the request. State what you checked, what you couldn't (rendering, cross-links, anything behind login), and what needs the reviewer's eyes.
