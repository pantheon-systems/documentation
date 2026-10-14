# Release notes and the RSS feed

Release notes are the one kind of page in this repo that a feed reader, a Slack integration, and the Pantheon Dashboard consume. That's why the review tools check them, and why a wrong `published_at` matters more than a typo in a how-to.

## What reaches the feed

The feed is built by `src/app/release-notes/rss.xml/route.tsx`. For each release note with a `published_date`, it publishes:

| Feed field | Comes from |
|---|---|
| Title | `title` in the front matter |
| Description | `description` in the front matter. If it's missing, the feed uses "A summary of changes to the Pantheon Platform". |
| Link | The site URL plus the page's slug |
| Id | A UUID derived from the page's id |
| Date | `published_at` as written. If it's missing, a synthetic time derived from a hash of the title on the `published_date`. |

The page body never reaches the feed. Edits to the body don't change what a reader sees. Edits to the title, `description`, or `published_at` do. The route's own comment says the feed allows cross-origin reads, for example by the Pantheon Dashboard.

## Why the date is the part to check

A reader shows the item at the date the feed gives it. The feed gives it your `published_at`, not the time the PR merged. If the value is 17:00Z and the PR merges at 17:14Z, the item reads as published 14 minutes before it existed. Feed readers and integrations that track what's new can treat an older timestamp differently from a fresh one. How a specific reader handles that isn't something these tools verify.

An earlier release note (2024-09-12, "Bug fix for Pantheon release notes RSS feed") explains the origin of the synthetic time: release notes were dated only by day, and RSS readers, including the Community Slack integration, ignore multiple items with identical dates and times. The hash-derived time avoids that for notes that don't set `published_at`.

## What CI already enforces

`.github/workflows/validate-release-notes.yml` runs on any PR that changes `src/source/releasenotes/*.md`. It fails when:

- A PR adds or changes more than one release note.
- `published_at` is missing.
- `published_at` ends in `T00:00:00Z`, which it treats as an unset default, and says to update it to the actual publication time.

It doesn't check that the time is right. A value like `17:00:00Z` passes whether or not that's when the release goes out.

## What the review tools add

The queue, the packet, and the extension show the actual `published_at` and its age on every release-note PR, so the question "is this the real publication time?" gets asked on every one. The tools can't answer it. Someone confirms the release time with whoever is announcing, and sets `published_at` to that time at merge.

For the steps, see [Review a release note](../how-to/review-release-notes.md).
