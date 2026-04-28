# Docs Audit Scripts

Tooling for identifying and resolving stale documentation using Claude on Vertex AI.

## Local setup

**Prerequisites:** Node.js 22+, `gh` CLI authenticated to `pantheon-systems`, a GCP service account JSON with Vertex AI access.

**One-time install:**

```bash
cd scripts && npm install
```

**Create `scripts/.env`** (gitignored):

```bash
GOOGLE_CLOUD_PROJECT=your-gcp-project-id
VERTEX_CREDENTIALS=/path/to/service-account.json
VERTEX_REGION=global
```

---

## Audit script

Crawls `src/source/content/` and identifies stale docs using three mechanisms in priority order:

1. **Inline `<ReviewDate>`** — per-section dates in files like `wordpress-known-issues.md`; flags sections older than 12 months
2. **Frontmatter `reviewed:`** — flags files where the date is older than 12 months
3. **Git fallback** — if no date can be determined, uses the last commit date for the file

Run from the **repo root** via `npm run audit`.

| Flag | Description |
|---|---|
| `--stale-only` | Output only stale files |
| `--output <path>` | Write JSON to file instead of stdout |

```bash
# Generate audit results (required before running evaluate)
npm run audit -- --stale-only --output audit-results.json
```

---

## Evaluate script

Reads the audit JSON, sends stale content to Claude (Sonnet via Vertex AI) for accuracy evaluation, and opens a draft PR per file with proposed changes.

- **Inline files** — only the stale sections are sent to Claude
- **Frontmatter files** — the full document is sent
- Each file gets its own draft PR; the 50 oldest stale files are processed per run

Run from the **`scripts/`** directory with env vars sourced.

| Flag | Description | Default |
|---|---|---|
| `--dry-run` | Evaluate with Claude, write results to `scripts/dry-run/` instead of opening PRs | off |
| `--limit <n>` | Number of files to process | `50` |
| `--audit <path>` | Path to audit JSON | `../audit-results.json` |

```bash
cd scripts
source .env

# Dry run — inspect proposed changes before opening PRs
npx tsx evaluate.ts --dry-run

# Dry run, smaller batch
npx tsx evaluate.ts --dry-run --limit 10

# Live run — opens one draft PR per file
npx tsx evaluate.ts

# Live run against a specific audit file
npx tsx evaluate.ts --audit /path/to/audit-results.json --limit 20
```

Dry-run output lands in `scripts/dry-run/<doc-slug>.md` — one file per result, containing the PR title, description, and a unified diff of the proposed changes.
