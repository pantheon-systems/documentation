# Unblock stuck PRs

Turn each item under **Needs unblocking** into one action: who has to act, and what you can do now. The queue flags the problem. You confirm the cause and draft the nudge. For every finding and threshold, see the [stuck check reference](../reference/stuck-check.md).

## The rule

Say who acts next, and draft the message. Don't send it. The skill never nudges anyone.

## Failing checks

1. Open the log link the queue gives you, or run `gh run view <run-id> --log-failed`.
2. Quote the error line in your message.
3. If the log shows no cause, say so. Don't call a failure flaky without reading why.

## `backstop_vrt` failing

`backstop_vrt` compares the PR's multidev with the `dev` environment, which tracks `main`. It isn't required to merge, and issue [#10308](https://github.com/pantheon-systems/documentation/issues/10308) tracks it.

| Situation | Action |
|---|---|
| Release-note PR | Expected. The homepage lists the latest release notes, so the comparison differs. Ignore it unless the PR also touches design, CSS, or packages. |
| Branch is behind `main` | Likely drift. Ask the author to merge `main` in and re-run. Don't call the pages wrong until it passes on a current branch. |
| Not behind `main` | Often a screenshot taken before the page rendered. Re-run once, and read the Backstop report only if the PR touches design, CSS, or packages. |

## No review yet

- **Named reviewer:** draft a short ping with the PR link and how many days it's been open.
- **Team only:** nobody owns it. Suggest one person claim it, and draft a message for the team channel. Claiming means assigning yourself and adding a `Type:` and a `Topic:` label.

## Waiting on someone

| Finding | Who acts | Your draft |
|---|---|---|
| Waiting on the author | Author | A reminder that quotes the requested change |
| Re-review needed | The reviewer who requested changes | A note that names the author's new commits |
| Approved but blocked | Reviewers and author | A list of what's still requested and any failing check. A required review, such as a code owner, may be the block. |
| Approved, not merged | The person who asked for the review | A note that it's clean and approved. They merge, unless they asked you to review and merge. |
| Unresolved review threads | Author, then the reviewer | A count and the latest commenter |
| Draft untouched | Author | A question: mark it ready or close it |

## Labels

| Label | Meaning | What to do |
|---|---|---|
| `Process: Blocked` | Something outside docs is in the way, such as a guide waiting on a platform fix | Read the linked ticket and say what it waits on. Don't nudge the author. |
| `Process: Hold for Release` | It ships with the announcement | Check the docs channel for the release time. Merge the doc change and its release note together. |

## Engineering-owned PRs

Bot PRs, and PRs that change no content file, belong to the engineers who own the site code. Don't review them as docs. Draft a nudge naming the PR and what's blocking it, and let the owner send it.

## When several rows share a cause

Say so. A Dependabot PR whose checks fail may share a cause with an open PR about Dependabot secrets. State it as likely until the log confirms it.
