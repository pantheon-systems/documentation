# Filter reference

Each `--filter` name for `review-queue.cjs` and what it finds. `node tools/docs-devrel-review-queue/scripts/review-queue.cjs --list-filters` prints the same list. To combine filters, see [Use queue filters](../how-to/use-queue-filters.md).

| Filter | Finds |
|---|---|
| `my-queue` (default) | Open PRs that request your review or a team you're on. Your own PRs are left out. |
| `coworking` | The co-working walkthrough in one go: `approved`, `unclaimed`, `prs-no-label`, `prs-no-assignee`, `changes-requested`, in that order. |
| `approved` | Open PRs with an approval. |
| `unclaimed` | Open PRs with no review and no assignee. A PR with an assignee but no reviewer doesn't match. |
| `awaiting` | Open PRs waiting on a named reviewer. Pass `--reviewer <login>`, repeatable. With none, it uses the `team` list in `config.local.json`, else you. It counts requests to a person only, not to a team. |
| `changes-requested` | Open PRs with requested changes. |
| `no-decision` | Open non-draft PRs whose reviewers only left comments (no approval, no change request), the last one `--days N` ago. Default 7. |
| `prs-no-assignee` | Open PRs assigned to nobody. |
| `issues-no-assignee` | Open issues assigned to nobody. |
| `prs-no-label` | Open PRs with no label. |
| `issues-no-label` | Open issues with no label. |

## Behavior that applies to every filter

| Topic | Rule |
|---|---|
| Your own PRs | `my-queue` leaves them out. Every other filter includes them, tagged `yours`. |
| Team requests | `my-queue` includes PRs where a team you belong to (for example `devrel`) was requested, not only you by name. |
| Output size | A PR list of 15 or fewer gets links and a stuck check for each PR. A longer list and every issue list print one line per item. `--full` and `--brief` override this. |
| Search limit | One GitHub search returns at most 100 items. The script says when more exist. |
| Rate limits | The script pauses between searches (`--pause`). A blocked filter prints "Skipped" and the rest still run. |
| Several filters | Two or more print a summary table first: each filter name links to its GitHub search, with a count and an all-repos search link. |
| `no-decision` | GitHub search can't express "comment-only reviews", so the script reads each PR's reviews. The summary link for it opens all non-draft open PRs. |
