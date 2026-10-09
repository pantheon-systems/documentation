# Use queue filters

Switch the queue to a different question: what's approved, who nobody claimed, which PRs have no decision yet. For the full list, see the [filter reference](../reference/filters.md).

## Pick a filter

| You ask | Run |
|---|---|
| What's waiting on me? | `--filter my-queue` (the default) |
| Any PRs approved? | `--filter approved` |
| PRs with no review and no assignee? | `--filter unclaimed` |
| Awaiting review from a person? | `--filter awaiting --reviewer <login>` (repeat `--reviewer` for several) |
| PRs with requested changes? | `--filter changes-requested` |
| Reviewed with comments only, past a number of days? | `--filter no-decision --days 3` |
| The whole co-working walkthrough? | `--filter coworking` |
| PRs or issues assigned to nobody? | `--filter prs-no-assignee`, `--filter issues-no-assignee` |
| PRs or issues with no label? | `--filter prs-no-label`, `--filter issues-no-label` |

Run it like this:

```sh
node tools/docs-devrel-review-queue/scripts/review-queue.cjs --filter approved
```

In Claude Code, type the words after the skill name: `/docs-devrel-review-queue approved and unclaimed` runs `--filter approved,unclaimed`.

## Combine filters

Comma-separate them. Each prints as its own section, and two or more add a summary table first. Each filter name in the table links to its GitHub search, with a count.

```sh
node tools/docs-devrel-review-queue/scripts/review-queue.cjs --filter approved,unclaimed
```

## Save a page

`--html` writes one page with the summary table on top and a collapsible section per filter:

```sh
node tools/docs-devrel-review-queue/scripts/review-queue.cjs --filter approved,unclaimed --html queue.html
```

GitHub rate-limits bursts of search calls. For a long run, raise the pause between searches with `--pause 15`. To build one page from many filters, split the run, wait a few minutes, and join them:

```sh
node tools/docs-devrel-review-queue/scripts/review-queue.cjs --filter a,b,c --json /tmp/q1.json --pause 15
node tools/docs-devrel-review-queue/scripts/review-queue.cjs --filter d,e --merge /tmp/q1.json --html page.html --pause 15
```

A filter in the second run replaces the same filter from the first.

## Long lists

A list of 15 or fewer PRs gets links and a stuck check for each. A longer list, and every issue list, prints one line per item. Add `--full` for the full outline, or `--brief` for one-liners.

One search returns at most 100 items, and the script says when more exist.
