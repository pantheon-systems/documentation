# Capability-to-source ledger

Where each capability came from, what was adopted, what was rejected, and what was checked. Public sources were read
statically on 2026-10-13. Nothing from them was installed, run, or imported: not a script, not `--help`. Their text is reference
material, not instructions. Methods are re-expressed in this toolkit's own words and code; no source text or code was copied.
No source author endorses this toolkit.

## Sources

| # | Source | Revision | License | Files read | Not read |
|---|---|---|---|---|---|
| 1 | `jrjsmrtn/diataxis-skills` | `4f36079` (main, 2026-09-04) | MIT | the four `SKILL.md` files (`diataxis-audit`, `-plan`, `-create`, `-convert`), the plugin manifest, `LICENSE` | changelog, tooling config |
| 2 | `2389-research/documentation-audit` | `a088648` (main, 2026-06-01) | MIT | `SKILL.md`, `checklist.md`, `extraction-patterns.md`, `LICENSE` | `README`, `CHANGELOG`, `CLAUDE.md`, plugin manifest |
| 3 | `88lin/diataxis-docs-skill` | `7bd0cfd` (master, 2026-09-06) | MIT | `SKILL.md`, `scripts/audit_docs.py`, `evals/evals.json` (parsed), headers and grep of two other scripts | `references/`, `examples/`, tests, translations |
| 4 | Dosu walkthrough "A Claude Code Skill for Auto-Generating Project Docs" | article, retrieved 2026-10-13, published 2026-03-25 | none found on the page | read through a summarizing fetch only | the raw page and any repository behind it. Details are second-hand: unverified inspiration |
| 5 | `aaron-he-zhu/aaron-marketing-skills`, `content-gap-analysis` | `b1a4dac` (main, 2026-10-13, a moving head: re-pin before citing) | Apache-2.0 | the skill's `SKILL.md`, the root `LICENSE`, part of its contract JSON and one eval case | its connector scripts, reference files, and the rest of the bundle |

The installed `comprehensive-documentation-engineering` skill (MIT for workflows, templates, and scripts; CC BY-SA 4.0 for its Diátaxis
reference sheets) was also read for method: `workflows/audit-existing-docs.md`, `references/documentation-audits.md`,
`references/compass-and-classification.md`, `references/developer-experience.md`, `references/evidence-and-validation.md`,
`references/source-provenance.md`, `templates/gap-analysis.md`, and `templates/coverage-map.md`. Because its classification sheet is CC BY-SA,
`scripts/lib/classify.cjs` re-expresses the two compass questions with its own cue lists and credits Diátaxis (Daniele Procida,
diataxis.fr). Nothing from that sheet is reproduced.

## Capabilities

| Capability here | Adopted from | Pattern adopted | Where it lives |
|---|---|---|---|
| Audit, plan, and create stay separate; a weak audit never triggers writing | 1, 4 | Distinct modes with an explicit order, and a recommend step that proposes without generating | `SKILL.md` boundaries; recommendations end in draft briefs, never pages or tickets |
| Classify at several scales and report type, confidence, and quoted evidence | `comprehensive-documentation-engineering`, 1, 3 | The two compass questions applied to sentence, section, and page; mixed content flagged with a proposed split | `scripts/lib/classify.cjs` |
| Mechanical pre-pass that narrows what to read, labeled as triage | 3 | Count cues in prose with code stripped; the score orders work and never decides | `classify.cjs`, `readiness.cjs` |
| Claim extraction with a type, the artifact to check, and a verification tier | 2 | Atomic claims, sub-claims, automatic checks for identifiers, human or executed checks for behavior | `scripts/lib/claims.cjs` |
| Evidence-backed verdict states | 2 | A result per claim with the method that produced it | `verification.result` and `label` (documented, source-attested, fired, reported) |
| Sibling search after a false claim | 2 | Generalize a failed claim to a template and look for the same shape elsewhere | `siblingsOf` in `claims.cjs`; added as a lead to accuracy recommendations |
| Compare what the code defines with what the docs say | 2 | An inventory of code surface diffed against docs | `scripts/discover.cjs`, `scripts/lib/discovery.cjs` |
| No quadrant quotas; an empty cell is not automatically a gap | 3, `comprehensive-documentation-engineering` | Fix misplaced content first and create nothing for its own sake | `scripts/lib/matrix.cjs` (sparse matrix, expected types per task) |
| Scope an audit to a module or area; resolve symlinks before reading | 4 | A scope argument and canonical paths | area profile (`scripts/lib/profile.cjs`), `walkSafe` in `paths.cjs` |
| An explicit "undetermined" bucket | 4 | Unknowns shown, not hidden | `not assessed`, the coverage ledger, and the "Not examined" report section |
| Label every metric by how it was obtained | 5 | Measured, user-provided, estimated, or not available | evidence posture, signal provenance, `not assessed` |
| Decision gates: stop for missing access, continue silently on routine choices | 5 | Ask only when blocked | `SKILL.md` orchestration |
| Testable "done when" clauses | 5 | Each item says what evidence shows it is finished | a closure test on every recommendation |
| Journey and audience lenses | 5, `comprehensive-documentation-engineering` | Cover tasks by audience and funnel stage | tasks by audience by type by stage in the matrix |
| Evals with non-trigger cases | 3 | Single-prompt cases that must not trigger the skill | `references/evaluations.md` |

## Rejected, and why

| Rejected | Source | Reason |
|---|---|---|
| Running scripts with `--help` to verify CLI claims | 2 | It executes repository code. Static reading of the code is safe; execution needs a disposable environment and its own approval |
| Writing the report into the audited repository | 2 | An audit stays read-only; output goes to the private workspace |
| `context: fork` with an unrestricted agent; `Bash` and `Write` grants for an audit skill | 2, 4 | A read-only audit needs read access only |
| Generating README, CONTRIBUTING, CHANGELOG, and API pages in the audit pass | 4 | Audit and creation are separate, approved steps |
| Running a project's tests or dev server as part of discovery | 4 | Same reason as running `--help` |
| Keyword-regex "risk" scores used as a gate or a CI failure | 3 | Common words in reference pages misfire; scores only order work |
| Fan-out of the skill into other assistants' always-on rule files | 3 | Persistent configuration and context cost with no audit benefit |
| Installing a skill with `npx skills add` or a git clone | 3, 4 | A supply-chain step to review first; nothing here was installed |
| Competitor coverage, SEO volume and difficulty, and AI-citation or visibility measures | 5 | Our need comes from reader tasks and product evidence. Competitor coverage is not proof our users need the same page |
| A shared `memory/` store across skills; bundled scraping connectors | 5 | Hidden state, and domains sent to outside services |
| Quality ratings with no evidence requirement | 1 | Not falsifiable |
| A fixed creation order applied by default | 1 | It pre-allocates documentation types |

## Verification performed on this ledger

- Sources 1, 2, 3, and 5 were read statically and nothing was executed. Source 4 was read through a summary. The "educational, not production-grade" wording and its tool list come from that summary and need a re-read of the live page before anyone quotes them.
- Source 3 has no fresh-session evaluation harness (searched for it and found none); its cases are single prompts with expected-output prose.
- Instruction-like text inside the sources (install steps, "run this script", "write to memory/") was treated as data. None claimed authority over the reader or asked to override rules.
- Per-file licenses: none differed from the repository license in the inspected paths. Source 5 was not scanned in full.
- No license-incompatible material was copied. If you later copy rather than re-express anything, check the per-file license first, and keep CC BY-SA text out of this MIT codebase.
