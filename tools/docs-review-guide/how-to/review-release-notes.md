# Review a release note

Check that a release-note PR carries the right `published_at` before it merges. The RSS feed publishes that value as the item date, so a wrong one stamps the entry with the wrong time. For the reason, see [Release notes and RSS](../explanation/release-notes-and-rss.md).

Watch it first: [Review a release note](../media/videos/06-review-a-release-note.mp4) (30 seconds, captions embedded; [transcript](../media/videos/06-review-a-release-note.vtt)).

## Find the value

The review queue and the packet both report it for any PR that adds or changes a file in `src/source/releasenotes/`:

```sh
node tools/docs-devrel-review-queue/scripts/review-queue.cjs
node tools/docs-devrel-review-queue/scripts/docs-pr-review.cjs <PR number>
```

Look for **Release note timestamp: confirm it** in the queue, or the release-note line under **Warnings** in the packet. Each shows the exact `published_at` and its age. The extension shows the same value in the panel and highlights it in red when it's more than a day old.

## Decide

| What you see | What it means | What to do |
|---|---|---|
| A time that matches the announcement | Nothing to change | State the value in your review |
| A time already in the past, such as 17:00Z when the merge is hours later | The feed shows the entry as published at that earlier time | Ask the author to set `published_at` to the actual publication time at merge |
| `T00:00:00Z` | A default placeholder. `validate-release-notes.yml` rejects it. | The author sets the real time |
| No `published_at` | CI fails without it | The author adds it after `published_date` |
| Only `published_date` | The feed falls back to a made-up time and CI fails | The author adds `published_at` |

The check can't know the release time. Confirm it in the docs channel, or with whoever is announcing, before you say it's right.

## Format

```yaml
---
title: "Name the release"
published_date: "2026-10-09"
published_at: "2026-10-09T17:00:00Z"
categories: [new-feature]
description: "One or two sentences that read on their own."
---
```

- One release note per PR. CI fails when a PR adds more than one.
- `description` is the only body text feed readers see, so write it to stand alone.
- The page body never reaches the feed.

## Held for release

A PR labeled `Process: Hold for Release` merges with the announcement. Check the docs channel for the time, then update `published_at` to match.

## Fix it after merge

Open a small fixup PR that changes `published_at`. Don't rename the file after it publishes. The feed's item id comes from the page (`uuidv5(node.id)` in `rss.xml/route.tsx`), so a rename may show the entry twice in readers. Whether a rename changes that id is unverified, so check with an engineer before renaming.
