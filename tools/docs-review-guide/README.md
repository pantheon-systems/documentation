# Docs review guide

How to review pull requests in `pantheon-systems/documentation` with the [PR preview extension](../pantheon-pr-preview-extension/README.md) and the [review queue skill](../docs-devrel-review-queue/README.md). The two tool READMEs get you from zero to a working install. This guide covers using them: the first review, daily routines, reference tables, and the reasoning behind the design.

You don't need both tools. The extension works from a PR page you already have open. The skill works from your terminal and finds the PRs for you.

## Start here

New to both? Do the [tutorial](tutorial/review-your-first-pr.md). It takes about 15 minutes and uses a demo PR.

## Find what you need

| I want to... | Read |
|---|---|
| Install or update the extension | [Install and update the extension](how-to/install-extension.md) |
| Compare a changed page's live and preview versions | [Review a docs PR in side-by-side panels](how-to/review-in-panels.md) |
| Set up the Claude Code skill | [Set up the review queue skill](how-to/set-up-the-skill.md) |
| See what's waiting on me | [Work your review queue](how-to/work-your-queue.md) |
| See PRs that are approved, unclaimed, or waiting on someone | [Use queue filters](how-to/use-queue-filters.md) |
| Get the links and checks for one PR and draft a comment | [Review one PR](how-to/review-one-pr.md) |
| Figure out why a PR is stuck and who acts | [Unblock stuck PRs](how-to/unblock-stuck-prs.md) |
| Check a release note before it merges | [Review a release note](how-to/review-release-notes.md) |
| Fix something that isn't working | [Troubleshoot](how-to/troubleshoot.md) |

## Reference

| Page | Covers |
|---|---|
| [Extension](reference/extension.md) | Badges, panel controls, URL parameters, anchors, warnings, permissions |
| [Commands](reference/commands.md) | Flags for `review-queue.cjs` and `docs-pr-review.cjs`, and the packet's sections |
| [Filters](reference/filters.md) | The eleven `--filter` names and shared behavior |
| [Stuck check](reference/stuck-check.md) | Every finding, its threshold, and who acts next |
| [Configuration](reference/configuration.md) | `config.local.json`, permission levels, requirements |

## Explanation

- [How the extension and the skill fit together](explanation/how-the-tools-fit.md)
- [Read-only by design](explanation/read-only-by-design.md)
- [Release notes and the RSS feed](explanation/release-notes-and-rss.md)

## Videos

Each how-to page links its video. Every video has captions embedded and a transcript.

| Video | Length | Page |
|---|---|---|
| [Install the extension](media/videos/01-install-extension.mp4) | 40 s | [Install and update the extension](how-to/install-extension.md) |
| [Review a PR in 2- and 3-panel view](media/videos/02-review-in-panels.mp4) | 47 s | [Review a docs PR in side-by-side panels](how-to/review-in-panels.md) |
| [Share a panel link](media/videos/03-share-a-panel-link.mp4) | 32 s | [Review a docs PR in side-by-side panels](how-to/review-in-panels.md) |
| [Work your review queue](media/videos/04-work-your-queue.mp4) | 51 s | [Work your review queue](how-to/work-your-queue.md) |
| [Review one PR with the packet](media/videos/05-review-one-pr.mp4) | 48 s | [Review one PR](how-to/review-one-pr.md) |
| [Review a release note](media/videos/06-review-a-release-note.mp4) | 30 s | [Review a release note](how-to/review-release-notes.md) |

There's no video for [Unblock stuck PRs](how-to/unblock-stuck-prs.md). It reads the same output as the queue video.

## Ground rules

These pages follow the rules for this folder in [`tools/README.md`](../README.md): plain Markdown with no build step, terminal output in code blocks instead of images, and no credentials, names, or personal data in examples.
