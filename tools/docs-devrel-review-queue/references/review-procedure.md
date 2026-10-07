# Review one PR

## Unblock what's stuck

`scripts/review-queue.cjs` flags these from GitHub data. Thresholds: no review after 3 days, draft untouched 7 days, no activity 14 days, a check running over 2 hours. Each row names who acts next. Your part is to confirm the cause and draft the nudge.

| Stuck on | Who acts | What you do |
|---|---|---|
| Merge conflicts | Author | Confirm with `gh pr view <N> --json mergeable,mergeStateStatus`. Draft a note asking the author to merge or rebase `main`. |
| `backstop_vrt` failing on a release-note PR | No one | Expected: the homepage lists the latest release notes, so the comparison with `dev` differs. The check also fails when the screenshot is taken before the page renders. Ignore it unless the PR touches design, CSS or packages; then download the run's artifact, open the Backstop report, and look at the diff images. |
| `backstop_vrt` failing, branch behind `main` | Author | Likely drift (issue #10308). Draft a note asking for a merge of `main` and a re-run. Don't call the pages wrong until it passes on a current branch. Ignore it unless the PR touches design, CSS or packages. |
| Failing checks | Author | Read the log: `gh run view <run-id> --log-failed`. Quote the error line. If the log shows no cause, say so. |
| Check not finishing | Author or a maintainer | Say how long it has run. Suggest a re-run from the Actions tab. Don't re-run it yourself. |
| No review yet, team only | The team | No named reviewer owns it. Suggest one person claim it, and draft a message for the team channel. |
| No review yet, named reviewer | That reviewer | Draft a short ping with the PR link and age. |
| Re-review needed | The reviewer who requested changes | The author pushed after the request. Name the new commits. |
| Waiting on the author | Author | Draft a reminder quoting the requested change. |
| Approved but blocked | Reviewers and author | List what's still requested (`gh pr view <N> --json reviewRequests`) and any failing check. A required review (for example a code owner) may be what blocks it. |
| Approved, not merged | The person who asked for the review | Say it's clean and approved. The requester merges it; merge for someone else only when they asked for "review and merge". Don't merge it yourself. Merging closes any linked issue. |
| Contributor PR needs fixes and nobody can push to its branch | A maintainer | Force pushes are off right now. Open a replacement PR from a new branch that carries the contributor's commits, credit them, and link the original. The original shows as closed or superseded, so say so and thank them in the thread. |
| Labeled `Process: Blocked` | Whoever owns the blocker | The block is outside docs, such as a guide waiting on a platform fix. Read the linked ticket, say what it waits on, and check back when it clears. Don't nudge the author. |
| Labeled `Process: Hold for Release` | Whoever requested it | It ships with the announcement. Check the docs channel for the release time; merge the doc change and its release note together. |
| Engineering-owned PR (bot, workflow, dependency, site code) | The engineers who own the site code | Docs reviewers don't judge these. Draft a nudge naming the PR and what's blocking it. |
| Unresolved review threads | Author, then the reviewer | Count them, name the latest commenter, and offer to summarize them. |
| Draft untouched | Author | Ask whether to mark it ready or close it. |

When several rows trace to one cause, say so. For example, a Dependabot PR whose checks fail may share a cause with an open PR about Dependabot secrets; state it as likely until the log confirms it.

## Generic path (any repo)

1. **Get facts.** `gh pr view <N> --repo pantheon-systems/<repo> --json title,body,state,isDraft,author,baseRefName,headRefOid,mergeStateStatus,reviewDecision,files` and `gh pr checks <N> --repo ...`. Quote what they return.
2. **Read the diff.** `gh pr diff <N> --repo ...`. Compare the title and description with the files changed.
3. **Read the repo's own rules.** `CONTRIBUTING.md`, `CLAUDE.md`, `AGENTS.md`, `CODEOWNERS`. Cite a rule by file and line; don't recite style rules from memory.
4. **Read failing checks.** `gh run view <run-id> --log-failed | tail -80`. Never call a failure flaky without reading why.
5. **Check the product's own wording** when a term is in question. The product's UI text comes before the style guide. If they disagree, review against the product and list a style-guide update as a follow-up.
6. **Give links** (see `SKILL.md`, section 5). Ask before opening any.
7. **Draft the comment** (below). Hand it over; don't post it.

Release-aware and rendered items need the reviewer's eyes. Mark them "needs you".

## documentation: run the packet

The packet gathers the facts the PR preview extension shows: state, branch drift, affected pages with preview and live URLs, permalink changes, release-note dates, preview status, and CI.

```bash
node ~/.claude/skills/docs-devrel-review-queue/scripts/docs-pr-review.cjs <N>
```

Needs Node with global `fetch` and a signed-in `gh` (the script uses that token for `api.github.com` only). Add `--json` for machine output. Run it fresh for every review and quote its numbers.

If the path doesn't exist (the skill is installed elsewhere), find `scripts/docs-pr-review.cjs` next to this skill's `SKILL.md`. If there is no script at all, use the generic path and say the packet wasn't available.

### Reading the packet

| The packet says | Say and do |
|---|---|
| State: merged | Previews usually 404 because the multidev is deleted soon after. Don't report that as a defect. The diff review still works. |
| State: open, draft | Say it's a draft; CI and reviewers may not be ready. |
| Branch N commits behind main, `backstop_vrt` failing | Likely drift: the check compares the PR multidev with `dev`, which tracks `main`. Recommend the author merge `main` and re-run before anyone judges it. See issue #10308. It isn't a required check. |
| `backstop_vrt` failing, branch not behind | Don't blame drift. Name the failing pages from the run log and point to #10308. |
| `playwright` failing | Read the job log first. |
| Preview "not responding", timeout | A cold multidev can take about 30 seconds. Re-run after a minute. The probe checks only the first page. |
| Preview "answered 404" | The build may not have published the page yet, or the PR is merged. |
| Permalink changed | Check the redirect and cross-links (below). |
| "Other changed files" lists non-Markdown files | The packet doesn't review these. Read them in the diff and say when an engineer should review. |
| Release note, date more than a day old | The date feeds the RSS timestamp; a past date may not publish as new. Show the exact date and say a fixup PR may be needed. |
| Release note, no date | The RSS timestamp needs one; flag it. |
| "No permalink" files | No preview exists. Say which files; the reviewer reads the diff. |
| "Check runs could not be read", or a rate-limit error | Say the data is missing. Don't guess a CI result. |

### Permalink changes

```bash
gh api "repos/pantheon-systems/documentation/contents/src/middleware.ts?ref=<head-branch>" --jq .content | base64 -d | grep -n "<old-path-without-leading-docs>"
```

For cross-links, search a local checkout with `git grep` if one exists. If you can't search, write "cross-links not checked".

### Links without the script (read-only mode)

For a changed file whose front matter has `permalink: /guides/foo/bar`:

- Preview: `https://pr-<N>-pandocs.pantheonsite.io/docs/guides/foo/bar` (the multidev serves under `/docs`)
- Live: `https://docs.pantheon.io/docs/guides/foo/bar` (the site redirects `/docs/...` to `/...`)
- Diff: `https://github.com/pantheon-systems/documentation/pull/<N>/files`. GitHub ignores a `?path=` filter, so the reviewer scrolls to the file.

- Multidev and Live links end in `#heading` for the section that holds the first change in the page body. Front matter edits are skipped. A new page, a front-matter-only change, or a change above the first heading has no anchor, so the link opens at the top. Say that instead of calling it a missing anchor. Only the first changed section is linked, so tell the reviewer when a page has changes further down (read the diff).
- GitHub diff for one file needs `#diff-<sha256 of the file path>`, which needs a shell. Without one, give the Files changed link and say the per-file anchor wasn't built.
- 2-panel and 3-panel: `https://github.com/pantheon-systems/documentation/pull/<N>/files?pantheon_panel=2|3&page=<full path of the changed file>`, URL-encoded. No extension ID is involved. The extension turns the tab into `Live Article | PR Preview` (2) or `GitHub Diff | Live Article | PR Preview` (3); without it the link opens Files changed.

State that these were built by formula and not checked for a 200.

### Open previews (only after the reviewer agrees)

```bash
node ~/.claude/skills/docs-devrel-review-queue/scripts/docs-pr-review.cjs <N> --open --dry-run
node ~/.claude/skills/docs-devrel-review-queue/scripts/docs-pr-review.cjs <N> --open
```

`--open-live` adds the live pages. It uses macOS `open -g`, skips URLs opened in the last 6 hours (`--force` reopens), opens at most 15, and only allowed hosts.

## Checklist

| Item | Verified by |
|---|---|
| Change scope and timeline match the PR description | You, from the description and files |
| Front-matter `permalink` present where it should be | You, from the diff and packet |
| Preview renders the changed section | The reviewer's eyes |
| Preview matches the live page where it should | The reviewer's eyes |
| Tables, formatting, capitalization, terminology | You from the diff; the reviewer for rendering |
| Content type fits the page (tutorial, how-to, reference, interface docs differ) | You, from the headings and what the reader does |
| Left-nav placement and title pattern match sibling pages | You, from the sibling pages' front matter and nav |
| Claims that depend on product capability (build logs vs runtime logs, settings customers can't change, versions) | You flag each one; the author or product confirms, and you can post the question in the product's SME channel. Content drafted from search tools needs this most |
| A paired release note exists when the doc change ships with a feature | You, from the PR body and the docs channel thread; merge them together |
| Release-note date is current | The packet shows it; you state it |
| Redirect in `middleware.ts` and cross-links | You, with the command above; say what wasn't checked |

## Draft the comment

1. What you checked, in plain bullets, each tied to a fact (a file, a line, a number).
2. Findings, each with the file and line or heading, and why it matters.
3. Requests or questions for the author.
4. What you did not check: rendering, cross-links, anything the packet couldn't read.

Use contractions and plain words. No filler or praise openers. Don't pick approve, comment, or request changes.

For a mechanical fix (a typo, a capitalization, a stale phrase), write it as a GitHub suggestion block (` ```suggestion `) so the author can accept it in one click. Use plain bullets for anything that needs a decision. Before asking product to confirm a claim, check for a paired release note or the docs channel request that announces it.
