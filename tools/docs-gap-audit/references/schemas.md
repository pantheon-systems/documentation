# Schemas and contracts

All contracts are plain JSON, versioned, and validated by code in `scripts/lib/`. Shared code holds the schemas and synthetic examples
(`examples/`). Real profiles, staged sources, signal files, and run state live in a private workspace outside any shared repository.

## Area profile (`schemaVersion: 1`)

Validated by `scripts/lib/profile.cjs` (`node scripts/profile.cjs validate <file>`). Example: `examples/widgets.profile.json`.

| Field | Purpose |
|---|---|
| `area` | `id` (lowercase slug), `name`, `owner` (optional, used as the suggested owner; never guessed), `audience` |
| `site.origin` | One https origin (http only for localhost or `.test`). The audit never crawls another origin |
| `scope.crawl` | `include` (required, URL path globs) and `exclude`. What the crawler may fetch |
| `scope.report` | Pages that appear as in-area in the report. Defaults to the crawl include |
| `scope.evidence` | Pages that may satisfy a need, including other areas. Defaults to report plus `related`. Crawl exclusions always apply here too, because nothing excluded was fetched |
| `scope.related` | Cross-area docs (`id`, `paths`, `note`). They stay visible in evidence and are labeled `related:<id>` |
| `sources.local` | `id`, `kind` (repo, planning, changelog, releases, docs, readme, export), `path`, `role`, `public`. Paths must stay inside permitted roots |
| `sources.connectors` | `id`, `connector`, `ref` (a query or folder name, never a credential), `stagedAs` (relative path in the workspace), `purpose`, `public` |
| `vocabulary` | `aliases` (term to alternates, matched both ways) and `identifiers`. May add to extraction vocabulary through `vocabulary.extraction` |
| `tasks` | `id`, `title`, `journey` (evaluate, first-success, configure, develop, deploy, operate, troubleshoot, recover, migrate, offboard) or `stage` (discover, evaluate, start, build, operate, upgrade), `audience`, `terms`, `expectedTypes`, `steps`, `required`, `applicable`, `effortHint` |
| `environments` | Supported versions, platforms, and notes: candidate axes, not product capabilities |
| `release` | `defaultStatus` and `publicEvidenceRequired` (default true: "shipped in source" alone is not public availability) |
| `authority` | `order` of sources, most authoritative first, and freshness rules |
| `priority` | `demandBands.repeated`: how many unique threads count as repeated demand (default 3) |
| `attestations` | Process evidence a person vouches for (`criterion`, `statement`, `source`, `date`), such as docs being part of the definition of done. It fills a maturity criterion that would be "not assessed", is recorded as reported, and never overrides observed evidence |
| `inputs` | Optional signal files, by dimension, relative to the area folder in the workspace |

Glob rules: `**` crosses slashes, `*` does not, `/a/**` matches `/a` and everything under it, and an exclusion beats an inclusion.
A profile containing a credential-like key or value is refused, and the value is never echoed.

Three scopes, deliberately separate: **crawl** (what is fetched), **report** (what is listed as in-area), **evidence** (what may satisfy a need).
Material outside the report scope can still be the answer to a need, and it stays visible in the evidence column.

## Signal files (`schemaVersion: 1`)

One file per dimension, staged by Claude from an authorized source. Contract per dimension: `references/signals.md` (generated from
`scripts/lib/signals.cjs`; do not edit by hand). Common shape:

```json
{ "schemaVersion": 1, "signal": "demand",
  "provenance": { "source": "...", "retrievedAt": "2026-10-01", "approval": "...", "timeWindow": { "from": "...", "to": "..." },
                  "sampling": { "method": "...", "biased": true } },
  "items": [ ... ] }
```

Missing, invalid, or empty input is "not assessed" with a retrieval request. Nothing from an invalid file is used.

## Candidate (`schemaVersion: 2`)

Stable `id` (`c_` plus a hash of area and normalized name), `name`, `kinds`, `status` (shipped, limited, planned), `terms`, `sources`
(the `file:line` strings), and `provenance`: one entry per piece of evidence with `file`, `line`, `excerpt`, `extractor {id, version}`,
`confidence`, `posture`, and `status`. Independent dimensions, never merged into one score:

- `evidence.posture`: observed, reproduced, inferred, reported, disputed, unverified
- `assessment.status`: assessed, not assessed, not applicable
- `sourceAvailability`: available, unavailable, partial, restricted
- `claimVerification.result`: not-run, confirmed, partial, not-found, overstated, unverified
- `coverage.rating`: the keyword heuristic (None, Mention, Partial, Dedicated). A rating is a lead, not a verdict
- `human.verdict`: filled only through `scripts/review.cjs`

The existing `suggested`, `best`, `pages`, `mentions`, `kinds`, and `sources` fields still appear, so older tools keep working.

## Run state

See the layout comment at the top of `scripts/lib/runstate.cjs`. A manifest is written once and never changed. Last attempted, last completed, and
last human-reviewed are three separate records in `state.json`. Human decisions live in `decisions.jsonl` (append only), each with the hash of the
evidence it rested on, so changed evidence flags it for re-review.

## `pages.json` (the inventory contract)

Unchanged fields: URL, path, status, title, headings, word count, code and table counts, images, links, navigation links, metadata, updated date, text.
Added: `requestedUrl`, `redirect` or `aliases`, `dateSignals` (visible, embedded, sitemap, conflict), and `blocks` and `codeBlocks` (document-order structure
used for classification and coverage). `run.json` carries the coverage ledger: discovered, excluded, examined, skipped by robots.txt, unavailable, blocked,
unexamined, not HTML, and redirected off origin, plus `inventory.complete` and its reasons.
