# Docs Audit Scripts

Tooling for identifying and resolving stale documentation using Claude on Vertex AI.

## Local setup

**Prerequisites:** Node.js 22+, `gh` CLI authenticated to `pantheon-systems`, a GCP service account JSON with Vertex AI access.

**One-time install** (installs dependencies for the audit/evaluate scripts, separate from the main project):

```bash
cd scripts && npm install && cd ..
```

**Create `.env` in the repo root** (gitignored):

```bash
GOOGLE_CLOUD_PROJECT=your-gcp-project-id
VERTEX_CREDENTIALS=/path/to/service-account.json
VERTEX_REGION=global
GIT_REMOTE=origin            # optional — defaults to "origin"
```

---

## Audit script

Crawls `src/source/content/` and identifies stale docs using three mechanisms in priority order:

1. **Inline `<ReviewDate>`** — per-section dates in files like `wordpress-known-issues.md`; flags sections older than 12 months
2. **Frontmatter `reviewed:`** — flags files where the date is older than 12 months
3. **Git fallback** — if no date can be determined, uses the last commit date for the file

Files that already have an open `docs-audit/*` PR are automatically excluded from results.

Run from the **repo root** via `npm run audit`.

Always writes to a file. Default output is `audit-results.json` in the repo root (or `image-audit-results.json` for `--images`).

Outputs only stale files by default.

| Flag | Description |
|---|---|
| `--all` | Include non-stale files in output |
| `--output <path>` | Override the default output filename/path |
| `--images` | Run image scan instead of doc audit (see below) |
| `--older-than <n>m` | Age threshold for image scan — e.g. `6m`, `12m`, `24m` (default: `12m`) |

```bash
# Generate audit results — writes to audit-results.json automatically
npm run audit
```

### Image scan

Scans `src/source/images/` and flags images not updated in git within the threshold. Uses the last git commit date, not the filesystem mtime. Outputs a separate report — does not affect the main audit results or trigger PR creation.

```bash
# Scan for images not updated in the last 12 months — writes to image-audit-results.json
npm run audit -- --images

# Use a different age threshold
npm run audit -- --images --older-than 6m
npm run audit -- --images --older-than 24m --output image-audit-24m.json
```

---

## Evaluate script

Reads the audit JSON, sends stale content to Claude (Sonnet via Vertex AI) for accuracy evaluation, and opens a draft PR per file with proposed changes. PRs are automatically labeled `automation: Claude 🤖`.

- **Inline files** — only the stale sections are sent to Claude
- **Frontmatter files** — the full document is sent
- Each file gets its own draft PR; the 50 oldest stale files are processed per run
- Files with an open `docs-audit/*` PR are skipped automatically, even if present in the audit JSON

Claude may flag docs as candidates for **deprecation or removal** when the content is so outdated or ecosystem-changed that updating would be less useful than removing. This appears as a `⚠️ Deprecation consideration` section in the PR description — the final call is always with the human reviewer.

Run from the **repo root** via `npm run evaluate`.

| Flag | Description | Default |
|---|---|---|
| `--dry-run` | Evaluate with Claude, write results to `scripts/dry-run/` instead of opening PRs | off |
| `--limit <n>` | Number of files to process | `50` |
| `--audit <path>` | Path to audit JSON | `audit-results.json` |
| `--file <path>` | Evaluate a single specific file (e.g. `src/source/content/drupal-s3.md`) | — |
| `--older-than <n>m` | Staleness threshold (e.g. `6m`, `12m`, `24m`) | `12m` |
| `--all` | When used with `--file`, evaluate regardless of staleness | off |

```bash
# Dry run — inspect proposed changes before opening PRs
npm run evaluate -- --dry-run

# Dry run, smaller batch
npm run evaluate -- --dry-run --limit 10

# Live run — opens one draft PR per file
npm run evaluate

# Evaluate a specific file
npm run evaluate -- --dry-run --file src/source/content/drupal-s3.md

# Evaluate a specific file even if not stale
npm run evaluate -- --dry-run --file src/source/content/jenkins.md --all

# Use a different staleness threshold
npm run evaluate -- --dry-run --older-than 6m
```

Env vars are loaded automatically from the root `.env`. No `source` needed.

Dry-run output lands in `scripts/dry-run/<doc-slug>.md` — one file per result, containing the PR title, description, and a unified diff of the proposed changes.
