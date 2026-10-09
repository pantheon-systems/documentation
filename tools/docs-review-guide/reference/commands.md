# Command reference

Flags for the two scripts in the review queue skill. Run both from the repository root. They need Node 18 or later and the GitHub CLI signed in (`gh auth login`). For tasks, see [Work your queue](../how-to/work-your-queue.md) and [Review one PR](../how-to/review-one-pr.md).

## `review-queue.cjs`

```sh
node tools/docs-devrel-review-queue/scripts/review-queue.cjs [options]
```

It checks your permission on each repo it covers (default: `pantheon-systems/documentation`), then lists open PRs or issues for each filter (default: `my-queue`).

| Flag | Effect |
|---|---|
| `--filter name[,name]...` | One or more filters. Each runs as its own section. Repeat the flag or comma-separate. See [Filters](filters.md). |
| `--list-filters` | Prints every filter and what it finds. |
| `--reviewer <login>` | With `awaiting`: a GitHub login to check. Repeatable. |
| `--days N` | With `no-decision`: days since the last comment-only review. Default 7. |
| `--full` | Links and a stuck check for every PR, however long the list. |
| `--brief` | One line per item, no links or stuck check. |
| `--table` | Prints a links table and a stuck table instead of the outline. |
| `--html FILE` | Also writes a page: a summary table whose filter names link to the GitHub search, then one collapsible section per filter. |
| `--json FILE` | Saves the results so a later run can `--merge` them. |
| `--merge FILE` | Adds the results saved by an earlier `--json` run. Repeatable. A filter run again replaces its old results. |
| `--pause SECONDS` | Wait between searches. Default 3. Raise it for long runs. |
| `--repo <name>` | Check this repo instead of the default `documentation`. Repeatable. It replaces the default, so repeat `--repo documentation` to keep it. |
| `--no-orgs` | Skip the orgs listed in `config.local.json`. They're searched for review requests only. |
| `--no-auth` | Don't use the `gh` token. The queue search needs a token, so this mostly applies to the packet. |
| `-h`, `--help` | Prints usage. |

Output size: a PR list of 15 or fewer gets links and a stuck check for each PR. A longer list, and every issue list, prints one line per item.

## `docs-pr-review.cjs`

```sh
node tools/docs-devrel-review-queue/scripts/docs-pr-review.cjs <PR number or URL> [options]
```

It prints a review packet: affected pages with preview and live URLs, permalink changes, release-note dates, preview status, CI summary, and how far the branch is behind `main`.

| Flag | Effect |
|---|---|
| `--table` | With several PR numbers: one table of links, a row per changed page. |
| `--json` | Prints the packet as JSON, one object per PR. |
| `--open` | Opens the preview URLs in the background with macOS `open -g`. Skips URLs opened in the last 6 hours. Opens only allowed hosts. |
| `--open-live` | With `--open`: also opens the live URLs. |
| `--dry-run` | With `--open`: prints what would open and changes nothing. |
| `--force` | With `--open`: reopens URLs opened in the last 6 hours. |
| `--no-auth` | Don't use the `gh` token. Allows 60 API requests per hour. |
| `-h`, `--help` | Prints usage. |

Always run `--dry-run` before `--open`. `--open` works only on macOS.

## Packet sections

| Section | Content |
|---|---|
| Header | The PR title and URL, its state, the head commit, and how many commits the branch is behind `main` |
| Links | The PR and Files changed links, then for each changed page: Multidev preview, Live, GitHub diff, 2-panel, and 3-panel links |
| Affected pages | A table with one row per changed Markdown file that has a `permalink`: the file, its preview URL, and its live URL |
| Warnings | Permalink changes, and each release note's `published_at` with its age |
| Preview | Whether the first page's multidev answers |
| CI | Passed, failing, and running checks; branch drift behind the base for `backstop_vrt` |
| Review checklist | The standard steps, plus a release-note and a redirect step when they apply |

## Exit behavior

The scripts only read from GitHub. They never approve, request changes, merge, push, re-run checks, or resolve threads. See [Read-only by design](../explanation/read-only-by-design.md).
