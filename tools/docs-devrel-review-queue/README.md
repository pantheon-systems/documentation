# Docs and DevRel PR review queue

A Claude Code skill (plus two Node scripts you can run without Claude) that answers three questions about pull requests in `pantheon-systems/documentation`:

1. What's waiting on me?
2. What looks stuck, and who has to act?
3. For this one PR, where are the preview, the live page, and the diff?

It only reads from GitHub. It drafts comments for you to post, and it never approves, requests changes, merges, re-runs a check, or pushes. The approving stays yours.

## Quick start

You need three things: Node 18 or later (global `fetch`), the [GitHub CLI](https://cli.github.com/) signed in, and [Claude Code](https://claude.com/claude-code) if you want the skill. The scripts run without Claude Code.

```sh
gh auth login                                  # once; the scripts use this token for api.github.com only
ln -s "$PWD/tools/docs-devrel-review-queue" ~/.claude/skills/docs-devrel-review-queue
```

Run that `ln` from the repository root. Then, in Claude Code:

```text
/docs-devrel-review-queue
```

No Claude Code? Run the same queue from your terminal:

```sh
node tools/docs-devrel-review-queue/scripts/review-queue.cjs
```

You get your permission level on the repo, then every open PR that requests your review (or a team you're on), each with its links, what looks stuck, and the next step. Your own PRs are left out, because you can't review those.

> The tested Node version is 26.8, on macOS. Older Node versions and other operating systems are untested. `--open` uses the macOS `open` command and works nowhere else.

## What you get

### The queue

One entry per PR: a linked title (tagged `draft` or `bot`), the review links, **Needs unblocking**, and **Next steps**. A PR that changes several pages gets one line of links per page. PRs with no changed page, or in a repo with no preview, get a Files changed link and a line saying why.

A **team request** (for example `devrel`) shows up in your queue too. It doesn't name you, so don't assume someone picked you on purpose.

### One PR's packet

```sh
node tools/docs-devrel-review-queue/scripts/docs-pr-review.cjs 10269
```

The top of a real packet (PR #10269, which changes four pages):

```text
# PR #10269: docs: add Drupal + Next.js guides for Next.js on Pantheon

State: open. Head a2663bd. Branch: 33 commits behind main.

### overview.md

- Multidev preview: https://pr-10269-pandocs.pantheonsite.io/docs/nextjs?pantheon_review=1#usage
- Live: https://docs.pantheon.io/docs/nextjs?pantheon_review=1#usage
- GitHub diff: https://github.com/pantheon-systems/documentation/pull/10269/files#diff-7bf65e...
- 2-panel (extension): https://github.com/pantheon-systems/documentation/pull/10269/files?pantheon_panel=2&page=src%2Fsource%2Fcontent%2Fnextjs%2Foverview.md
- 3-panel (extension): ...?pantheon_panel=3&page=src%2Fsource%2Fcontent%2Fnextjs%2Foverview.md
```

Beyond links, the packet reports:

- **Permalink changes**, old to new, with a reminder to check the redirect in `src/middleware.ts`.
- **Release-note dates**, because `published_at` feeds the RSS timestamp, and a stale date may not publish as a new item.
- **Preview status**: whether the multidev answers. It probes the first page only.
- **CI results** and how far the branch is **behind `main`**.
- **Other changed files**, such as components and config, which the packet lists but doesn't review.

The `#usage` at the end of the Multidev and Live links is the heading of the first changed section, so both open where the change is.

### The 2-panel and 3-panel links

![Two panes side by side: the live overview page on the left and the pull request preview on the right.](../images/extension-two-panel.png)

These are plain `https` links to the PR's Files changed page with a marker on the end. With the [PR preview extension](../pantheon-pr-preview-extension/README.md) installed, the tab becomes the view above (2-panel is Live and Preview; 3-panel adds the GitHub diff). Without it, the link opens Files changed. Both work from chat and Slack, and GitHub strips the marker from the address bar a moment after load, which is normal.

Multidev and Live links also end in `?pantheon_review=1`. With the extension installed, that hides the docs cookie banner on pages reached through a link the skill or extension supplied. The docs site ignores the parameter, so the links work the same without it. Keep it on when you paste them.

## Commands

| I want to... | Run |
|---|---|
| See my queue | `node tools/docs-devrel-review-queue/scripts/review-queue.cjs` |
| See the queue as tables | `... review-queue.cjs --table` |
| Switch the view | `... review-queue.cjs --filter approved` (also `unclaimed`, `awaiting --reviewer <login>`, `changes-requested`, `no-decision --days 7`, `prs-no-assignee`, `prs-no-label`, `issues-no-assignee`, `issues-no-label`, `coworking`, `my-queue`); `--list-filters` prints them |
| Combine views with a summary table | `... review-queue.cjs --filter approved,unclaimed` |
| Write a page with one collapsible section per view | `... review-queue.cjs --filter approved,unclaimed --html queue.html` (use `--pause 15` for long runs; `--json` and `--merge` join two runs) |
| Check another repo in the org | `... review-queue.cjs --repo p1-docs` (repeat `--repo` for several) |
| Get one PR's packet | `... docs-pr-review.cjs <PR number or URL>` |
| Get a links table for several PRs | `... docs-pr-review.cjs 10269 10313 --table` |
| Get machine-readable output | `... docs-pr-review.cjs 10269 --json` |
| See which tabs `--open` would open | `... docs-pr-review.cjs 10269 --open --dry-run` |
| Open the previews (macOS) | `... docs-pr-review.cjs 10269 --open` (add `--open-live` for live pages) |
| Run without your `gh` token | add `--no-auth` (60 API requests per hour, and the queue needs a token) |

Skip the `--open` flags unless you want a browser to wake up. Always run `--dry-run` first. `--open` skips URLs it opened in the last 6 hours (`--force` overrides) and opens only allowed hosts.

For scripting, `--json` gives one object per PR. List just the changed pages' preview URLs:

```sh
node tools/docs-devrel-review-queue/scripts/docs-pr-review.cjs 10269 --json \
  | jq -r '.pages[] | "\(.filename)  \(.previewUrl)"'
```

## What counts as stuck

| Signal | Threshold |
|---|---|
| No review yet | Open more than 3 days |
| Draft untouched | 7 days |
| No activity at all | 14 days |
| A check still running | More than 2 hours |
| Also flagged | Failing checks, merge conflicts, approved but merge blocked, `backstop_vrt` failing on a branch that's behind `main`, PRs labeled `Process: Blocked` or `Process: Hold for Release`, and PRs only a bot or engineers should handle |
| Release notes | Every PR that adds or changes a file in `src/source/releasenotes/` shows its `published_at` and age. The RSS feed publishes that value as the item date, so set it to the actual publication time at merge. A missing value or a `T00:00:00Z` placeholder is flagged separately. |

A `backstop_vrt` failure on a branch behind `main` is usually drift, not a defect: the check compares the PR's multidev with the `dev` environment, which tracks `main`. Merge `main` in and re-run before judging it. The check is not required to merge. Issue [#10308](https://github.com/pantheon-systems/documentation/issues/10308) tracks it.

## When it doesn't work

| What you see | Why, and what to do |
|---|---|
| `gh` asks you to log in, or the queue search fails | Run `gh auth login`. The queue search needs a token. |
| Permission shows `read` or `triage` | Your approval won't count toward branch protection. Read, comment, and let someone with write access approve. |
| Permission shows `no access` | The skill stops for that repo. It won't borrow another person's access. |
| "rate limit" | Unauthenticated GitHub calls allow 60 an hour. Drop `--no-auth` so it uses your token. |
| A Live link 404s | On a PR that adds a page, the page isn't published yet. That's expected. |
| A Multidev link 404s or times out | The PR is merged (its multidev is deleted), the build hasn't published, or the multidev is waking up. A cold one can take about 30 seconds. |
| 2-panel opens Files changed, not the side-by-side view | The extension isn't installed or loaded. See its README. |
| No links for a PR | It changes no Markdown page with a front-matter `permalink`, or it's in a repo with no preview defined. |
| `--open` does nothing off a Mac | It uses macOS `open`. Copy the URLs from the packet instead. |

## For engineers

```text
docs-devrel-review-queue/
  SKILL.md                        the skill's instructions and rules
  references/
    repos.md                      per-repo facts
    review-procedure.md           the per-PR procedure and the unblocking playbook
  scripts/
    review-queue.cjs              the queue
    docs-pr-review.cjs            the packet for one PR
    pr-resolver.js                a copy of the extension's resolver
```

- **How links are built.** For a changed Markdown file with a `permalink`, the Multidev URL is `https://pr-<N>-pandocs.pantheonsite.io/<permalink>`, and Live is `https://docs.pantheon.io/<permalink>`. The 2- and 3-panel links carry the file's full path, URL-encoded, in `page=`.
- **Keep the resolver in step.** `scripts/pr-resolver.js` is copied from `tools/pantheon-pr-preview-extension/pr-resolver.js` so this folder works alone. Check them with `diff tools/docs-devrel-review-queue/scripts/pr-resolver.js tools/pantheon-pr-preview-extension/pr-resolver.js`. When the extension's file changes, copy it over and diff again.
- **Validate a change.** `for f in tools/docs-devrel-review-queue/scripts/*.cjs; do node --check "$f"; done`, then run both scripts against a real PR.
- **Input handling.** Repo names are validated against a strict pattern, and GraphQL values go in as variables, never interpolated into the query.
- **Other repos.** `--repo` works on any repo in the org, but the skill has no repo-specific rules for any repo except `documentation`.

## Style pass

While you walk through a PR, the skill offers a style review of its changed pages with the [style review skill](../docs-style-review/README.md). It runs only on a yes. Say "style review the queue" to run it for each PR in turn.

## Files

- `SKILL.md`: the skill's instructions.
- `references/`: the per-PR procedure and repo facts.
- `scripts/`: the queue and packet scripts, plus the resolver copy.
- [`../README.md`](../README.md): the index of everything in `tools/`.
