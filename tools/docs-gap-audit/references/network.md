# Network destinations and child processes

The toolkit reads local files. It talks to the network in exactly two places, and a test
(`tests/network.test.cjs`) fails if a third appears without this page being updated.

## Network

| Where | Destination | When | Notes |
|---|---|---|---|
| `scripts/lib/fetch.cjs`, used by `site-audit.cjs` and, through it, `audit.cjs` | The audited site's own origin: its pages, `robots.txt`, and the sitemap | When you crawl (`audit run`, or `site-audit` without `--from-dir`) | One request at a time, 1 second apart by default. Honors `robots.txt`. Honest user agent. Stops after 3 consecutive 403 or 429 responses (exit code 3). A redirect to another origin is recorded and not followed, for pages and for `robots.txt` alike (a `robots.txt` that redirects off-origin is treated as unavailable). With no `--origin` or profile, `site-audit` uses the starting address's origin; sitemap pages on other origins are excluded, not crawled. A sitemap file that can't be read (error status, disallowed, too deeply nested) makes the inventory incomplete. A `robots.txt` that answers with any non-200 status is treated as allowing everything and does not count toward the block stop. A `Sitemap:` line or a sitemap-index entry on another origin is recorded and never requested. Pages outside the profile's crawl scope are never requested. |
| `scripts/lib/fetch.cjs`, `site-audit.cjs --check-links` | Every external site your pages link to | Only with the opt-in `--check-links` flag, never in `audit.cjs` | This is the one case where the crawler contacts other origins, because its job is to see where a link ends. It sends HEAD (falling back to GET for external targets; a 403 or 429 from the audited origin is counted toward the three-response block stop and is not retried) and may follow redirects anywhere for external targets. Leave it off for sites you don't own. |
| `scripts/versions.cjs` | `registry.npmjs.org` (or the `--registry` URL you pass) | Only when you run `versions.cjs`, for the packages you name | Reads the latest published version of each named package. Not part of `audit.cjs`. |

Nothing else makes a network request. `stage.cjs`, `review.cjs`, `signals.cjs`, `profile.cjs`, `page-check.cjs`,
`discover.cjs`, `coverage.cjs`, `names.cjs`, `report.cjs`, and `check-private-info.cjs` are local-only.

Connector sources (Google Docs, Jira, Slack, support exports) are retrieved by Claude through its own authorized connectors
and saved to the private workspace. The scripts never hold credentials, never call those systems, and refuse profiles, receipts,
and signal files that contain credential-like values.

## Child processes

| Where | Runs | Why |
|---|---|---|
| `scripts/audit.cjs` | `node scripts/site-audit.cjs` (this repo's own crawler) | The inventory stage reuses the crawler and its exit codes |
| `scripts/lib/hash.cjs` | `git rev-parse` and `git status` in a source folder | Records Git identity (HEAD, dirty or not) as context for a source's content hash. Git runs with `core.fsmonitor=false`, `core.hooksPath=/dev/null`, and no external diff, so configuration inside an audited folder is never executed |
| `scripts/lint.cjs` | `node --check` on this repository's own files | The dependency-free syntax check; it never reads outside the repository |

No script evaluates retrieved text as code (`eval`, `new Function`, `vm`), and no script executes anything it finds in a page, a
changelog, a staged export, or a source file. Text that tries to instruct the reader is flagged as data (see `privacy.md`).
