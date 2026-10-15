# Prioritization rubric

The rubric lives in code (`PRIORITY_RUBRIC` in `scripts/lib/recommend.cjs`) so the report and this page can't drift. It ranks leads. It doesn't estimate effort,
predict impact, or produce a numeric score. Every recommendation's rationale says which factors it used and which were unknown.

## Factors

1. **Release availability:** public (a release signal marks it ga with public evidence), not public (planned, beta, flagged, deprecated, removed), or unknown. With the profile default
   `publicEvidenceRequired: true`, "shipped in source" alone is unknown.
2. **Required task:** the profile marks it required or optional.
3. **Funnel stage:** discover, evaluate, start, build, operate, upgrade. The first stage with an unmet required task for a public feature is the candidate bottleneck.
4. **Demand band:** repeated (3 or more unique threads), some (1 or 2), none (0), unknown (demand not assessed). Change the repeated threshold in the profile with
   `priority.demandBands.repeated`.
5. **Operational risk:** destructive, security, auth, privacy, backup, rollback, or recovery cases named in a risk signal.
6. **Walkthrough result:** a recorded walkthrough that was blocked or passed.

## Tiers

| Tier | Rule |
|---|---|
| P1 | Public release AND a required task AND (the first unmet funnel stage OR high operational risk) AND (repeated demand OR a blocked walkthrough) |
| P2 | Public release AND a required task AND (some demand OR high risk OR the first unmet funnel stage) |
| P3 | Public release AND a required task, on coverage evidence alone |
| P4 | An optional task, or public with no supporting evidence beyond the declared task |
| none | Investigation leads and not-yet-public features: no tier until the missing evidence arrives |

## Rules

- **Unknown stays unknown.** A factor with no evidence is listed as unknown in the rationale. It is never counted as low or zero.
- **Message counts are not user counts.** Demand reports items, unique threads, and unique requesters separately. Requesters are known only from pseudonymous IDs in the export.
- **A biased sample shows what was surfaced.** The band is a convention for ordering leads, not a measurement of how often a problem occurs.
- **Tie-breaking** (so the order is stable and reproducible): tier, then earlier funnel stage, then high-risk before no-risk, then more unique demand threads, then more independent evidence items, then recommendation id.
- **Effort** is "not estimated" unless the profile supplies an `effortHint` for the task, and then it's labeled as coming from the profile.
- **Search volume and its absence never lower a need.** No-result queries are a lead about missing or unfindable content.
- **Confidence** reflects evidence, not truth: high needs two or more independent kinds of evidence and a complete inventory; medium needs at least one; low is the rest.
