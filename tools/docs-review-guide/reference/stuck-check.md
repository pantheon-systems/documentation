# Stuck check reference

What the review queue flags as stuck, the evidence it shows, and who acts next. The script prints these under **Needs unblocking** and **Next steps** for each PR. For what to do about them, see [Unblock stuck PRs](../how-to/unblock-stuck-prs.md).

## Thresholds

| Signal | Threshold |
|---|---|
| No review yet | Open 3 days or more, not a draft, no reviews |
| Draft untouched | 7 days with no activity |
| No activity | 14 days with no activity, and nothing else flagged |
| A check not finishing | Running for more than 2 hours |

## Findings

| Finding | Evidence it shows | Who acts next |
|---|---|---|
| Blocked outside docs | The `Process: Blocked` label | Whoever owns the blocker. Don't nudge the author. |
| Held for release | The `Process: Hold for Release` label | Whoever requested the review. It merges with the announcement. |
| Release note timestamp: confirm it | Each release note's `published_at` and its age. Appears on every PR that adds or changes a release note. | The author, or whoever merges. Set `published_at` to the actual publication time at merge. |
| Release note has no published_at | The file has no usable `published_at` | The author |
| Release note timestamp is a placeholder | `published_at` ends in `T00:00:00Z` | The author |
| Release note timestamp unread | The file couldn't be read at the PR's head commit | The author |
| Engineering-owned | A bot author, or a PR that changes no content file | Engineering. Draft a nudge if it's stuck, and don't send it. |
| Merge conflicts | The PR conflicts with its base | The author |
| `backstop_vrt` failing (expected on release-note PRs) | The homepage lists the latest release notes, so the comparison with `dev` differs | No one. Ignore it unless the PR also touches design, CSS, or packages (issue #10308). |
| `backstop_vrt` failing (likely drift) | The branch is behind its base | The author. Merge the base in and re-run. |
| `backstop_vrt` failing | Not behind its base | The author. Re-run once, or read the Backstop report if the PR touches design. |
| Failing checks | The failing check names and a log link | The author. Read the job log before calling it flaky. |
| Check not finishing | A check running over 2 hours | The author or a maintainer |
| Re-review needed | A reviewer requested changes and the author pushed since | That reviewer |
| Waiting on the author | A reviewer requested changes and there are no new commits | The author |
| No review yet | Days open and who was asked. If only a team was asked, it says so. | The requested reviewer, the team (someone claims it by assigning themselves and adding a Type and a Topic label), or the author |
| Approved, not merged | Approvers; no conflicts; checks passing | The author. Merge for them only if they asked you to review and merge. |
| Approved but blocked | Approvers; merge blocked; who's still requested; failing checks | The reviewers and the author |
| Unresolved review threads | The count and the author of the latest comment | The author |
| Draft untouched | Days since the last activity | The author |
| No activity | Days since the last activity | The author |

## Notes

- `backstop_vrt` compares a PR's multidev with the `dev` environment, which tracks `main`. It isn't required to merge. Issue [#10308](https://github.com/pantheon-systems/documentation/issues/10308) tracks it.
- Findings are leads. Read the failing job log before saying what failed, and say when the log showed no cause.
- The check reads GitHub only. It doesn't nudge anyone.
