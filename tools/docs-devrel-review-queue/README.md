# Docs and DevRel PR review queue

A Claude Code skill for reviewing pull requests in `pantheon-systems/documentation`. It lists the PRs waiting on you, flags the ones that look stuck, and builds a review packet for one PR: the changed pages with Multidev, Live, Diff, 2-panel, and 3-panel links, permalink and release-note warnings, preview status, and CI. It only reads from GitHub. It drafts comments for you to post and never approves or merges.

## Requirements

- Node with global `fetch` (Node 18 or later).
- The GitHub CLI, signed in with `gh auth login`. The scripts use your token for `api.github.com` only.
- Optional: the PR preview extension in `tools/pantheon-pr-preview-extension/`. With it installed, the 2-panel and 3-panel links open the review view and the docs cookie banner is hidden on links this skill supplies. Without it, those links open the PR's Files changed page.

## Install

From the repository root, link the folder into your Claude Code skills directory:

```sh
ln -s "$PWD/tools/docs-devrel-review-queue" ~/.claude/skills/docs-devrel-review-queue
```

Pull the repo to get updates.

## Use

In Claude Code, run `/docs-devrel-review-queue`. To run the scripts directly:

```sh
node tools/docs-devrel-review-queue/scripts/review-queue.cjs          # your queue
node tools/docs-devrel-review-queue/scripts/docs-pr-review.cjs <PR>   # one PR's packet
```

Add `--help` to either for options. `review-queue.cjs --repo <name>` checks that repo in the org instead of `documentation` (repeat it to check several), but the skill has no repo-specific rules for other repos.

## Files

- `SKILL.md`: the skill's instructions.
- `references/`: the per-PR procedure and repo facts.
- `scripts/`: the queue and packet scripts. `pr-resolver.js` is a copy of the extension's resolver, so the folder works on its own; keep it in sync by hand.
