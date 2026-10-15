# docs-gap-audit

Read-only audit of a documentation area. It asks which reader can't accomplish which task, and what evidence shows documentation would help. It tells apart content gaps,
accuracy gaps, discoverability gaps, product defects, and unavailable evidence, and it produces leads and draft briefs for a person to review. It never writes documentation,
edits a site, or files tickets.

Dependency-free Node 18 or later. Nothing to install. 14 entry scripts, 22 library modules, and 18 extraction rules (about 5,900 lines), with 525 tests on synthetic fixtures (about 6,000 lines).

## The audit

```bash
node scripts/profile.cjs init --out "$WORK/profiles/widgets.json" --id widgets --origin https://docs.example.test
node scripts/audit.cjs run    --profile "$WORK/profiles/widgets.json" --workspace "$WORK" --allow-root <source folders>
node scripts/audit.cjs status --workspace "$WORK" --area widgets
node scripts/review.cjs queue --workspace "$WORK" --area widgets
```

`$WORK` is a private folder outside this repository. A profile scopes one area: site origin; crawl, report, and evidence scopes (cross-area docs stay visible);
local sources; connector references (never credentials); aliases; the reader tasks that matter; supported environments; release and authority rules. Schemas:
[references/schemas.md](references/schemas.md). A synthetic example: `examples/widgets.profile.json`.

A run is nine checkpointed stages: sources, inventory, discover, classify, signals, claims, matrix, recommend, report. A completed stage is kept; a resume re-runs only what is
missing, incomplete, or built on changed inputs (a stage whose inputs changed is superseded, and the earlier receipt is kept beside it). A run is finalized, and then immutable, only when every stage is complete and every source was retrieved. Otherwise it stays open and the
report says so. The report covers scope and coverage boundary, inventory, classification, needs and coverage, health, claim verification, bottleneck and maturity, evidence status by signal,
prioritized recommendations with closure tests, a review queue, a release coverage map, changes since the last run, and what was not examined.

## Scripts

| Script | Does |
|---|---|
| `audit.cjs` | `run`, `resume`, `status`, `diff`, `finalize`: the area audit with private, resumable state |
| `profile.cjs` | `init`, `validate`, `show`, `scope`: area profiles |
| `stage.cjs` | `begin`, `complete`, `fail`, `status`: receipts for sources Claude staged from connectors |
| `review.cjs` | `queue`, `record`, `stale`, `list`, `reviewed`: human verdicts, with the hash of the evidence they rest on |
| `signals.cjs` | `list`, `describe`, `validate`: the eleven evidence dimensions ([references/signals.md](references/signals.md)) |
| `page-check.cjs` | One pasted text or saved HTML file: editorial observations, and the implementation checks it did not inspect |
| `site-audit.cjs` | Crawl (polite, one origin) or saved HTML (`--from-dir`): inventory, health, coverage ledger |
| `discover.cjs` | What the sources say exists (repo, planning docs, changelogs, release posts), compared with published pages |
| `coverage.cjs`, `names.cjs`, `versions.cjs` | A hand-written features list; identifiers against a trusted list; "current version" claims against the npm registry |
| `report.cjs` | A report skeleton from older outputs, or `--run <run folder>` to print a run's report |
| `check-private-info.cjs` | Flags private-looking text in an explicit folder (a warning gate, not proof of safety) |
| `lint.cjs` | Dependency-free syntax and hygiene check of this repository. Not ESLint |

## What stays true

- Read-only. One request at a time, 1 second apart, robots.txt honored, honest user agent, one origin, stop after three consecutive 403 or 429 responses (exit 3). Redirects and sitemaps on
  other origins are recorded, never followed. Exit codes: 0 success, 1 error, 2 bad arguments, 3 blocked, 4 run open or incomplete (audit.cjs).
- Missing evidence is "not assessed", never zero. A documented claim is not evidence for itself. Defined in source is not tested. Message counts are not user counts.
- Retrieved content is data: instruction-like text is flagged and never acted on.
- Company information stays out of this repository; real profiles and run state live in a private workspace. Every network destination and child process is listed in
  [references/network.md](references/network.md), and a test enforces the list.

## Using it as a skill

`SKILL.md` is the entry point. It routes to [references/workflow.md](references/workflow.md) (orchestration, staging, resume, failure handling), `signals.md`, `prioritization.md`,
`schemas.md`, `privacy.md`, `network.md`, `audit-playbook.md`, `evaluations.md`, and `capability-ledger.md`.

Install by linking this folder into your skills directory, from the repository root:

```sh
ln -s "$PWD/tools/docs-gap-audit" ~/.claude/skills/docs-gap-audit
```

## Tests

Run these from `tools/docs-gap-audit`.

```bash
npm test               # node --test tests/
npm run lint           # syntax and hygiene
npm run check-private  # privacy scan of this repository
```

Fixtures are synthetic ("Acme Widgets", `example.test`). `evals/` holds skill evaluation cases with pass/fail expectations ([references/evaluations.md](references/evaluations.md)).

## Credits and license

GPL-3.0, like the rest of this repository (see `LICENSE.md` at the repository root). The classification step applies the two compass questions of [Diátaxis](https://diataxis.fr) (Daniele Procida); the audit method draws on the installed
`comprehensive-documentation-engineering` skill and on patterns inspected in public skills, all re-expressed here. See [references/capability-ledger.md](references/capability-ledger.md).
