# Work your review queue

See which PRs are waiting on you, which look stuck, and what to do next. This assumes the [skill is set up](set-up-the-skill.md).

## Run the queue

In Claude Code, type `/docs-devrel-review-queue`. From a terminal:

```sh
node tools/docs-devrel-review-queue/scripts/review-queue.cjs
```

You get your permission on each repo, then an outline with one entry per open PR that requests your review or a team you're on. Your own PRs are left out, because you can't review those.

## Read an entry

Each PR has:

- A linked **title**, tagged `draft` or `bot` when it is one.
- **Links**: Multidev, Live, Diff, 2-panel, and 3-panel, one line per changed page. A PR with no changed page, or in a repo with no preview, gets a Files changed link and a line saying why.
- **Needs unblocking**: what looks stuck, with the evidence, or "Nothing looks stuck."
- **Next steps**: what unblocks it and who acts.

The list ends with the thresholds it used, and an offer to walk through the PRs one at a time.

## Know whose turn it is

| The next step names | You |
|---|---|
| "Ready for your review" | Review it. See [Review one PR](review-one-pr.md). |
| The author | Wait, or draft a nudge. See [Unblock stuck PRs](unblock-stuck-prs.md). |
| A team, such as `devrel` | Claim it if you're taking it: assign yourself and add a `Type:` and a `Topic:` label. |
| Engineering | Leave it. Draft a nudge only if it's stuck. |
| No one | Nothing to do. A `backstop_vrt` failure on a release-note PR is expected. |

A team request means the team was asked, not you by name. Don't assume someone picked you on purpose.

## Change the view

Add `--filter` to ask a different question, such as the PRs that are approved, unclaimed, or waiting on a named reviewer. See [Use queue filters](use-queue-filters.md).

## What the queue never does

It only reads from GitHub. It doesn't approve, request changes, merge, re-run checks, or message anyone. See [Read-only by design](../explanation/read-only-by-design.md).
