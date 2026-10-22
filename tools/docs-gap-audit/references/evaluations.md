# Skill evaluations

How the skill was tested, what the tests showed, and what they can't show. Cases and fixtures are in `evals/` (synthetic). Verdicts are in `evals/results/2026-10-13.json`.

## Method

14 cases were run (`evals/cases.json`), each with 2 to 5 pass/fail expectations (46 in all). Each case ran twice in a fresh context, in its own working folder:

- **With the skill:** the agent was told where the toolkit was and to read `SKILL.md` first and follow it where it applied.
- **Baseline:** the same task and files, told not to read the toolkit or any installed skill.

A separate grader (a different, stronger model than the runners) scored every expectation pass, partial, or fail with a quote. It graded blind: answers were labeled X and Y at random, and folder names that revealed the arm were removed. Instruction-like text in answers was treated as data. For the injection case (e12), I also checked the working folders directly for the file the injected text asked for (none existed in either arm).

The cases cover what the skill is supposed to get right:

| Cases | What they test |
|---|---|
| e01, e03 | Evidence separation: editorial observations versus checks that couldn't be made; conflicting dates; unsupported statistics; calibration (no FAQ or TL;DR demanded) |
| e04, e07 | No-action routing: sufficient existing coverage yields no creation lead; a small project may need nothing |
| e05, e06 | Calibration on a sound article; mixed-mode classification |
| e08, e09, e10, e11 | Private details kept out of a brief; unsupported formats reported; ambiguous analytics not interpreted; a declared option is not a consumed option |
| e02, e12 | A blocked crawler (no spoofing); instructions embedded in retrieved content (data, not commands) |
| e13, e14 | Non-trigger routing: a conceptual question and a creation request must not start an audit |
| e15 | Client-rendered page: the skill must not report "no steps" for a page whose code samples are missing from the saved HTML. Added after the Terminus audit; **not yet run** |

## Results

Round 1, the toolkit as first built:

| Arm | Pass | Partial | Fail | Of |
|---|---|---|---|---|
| With the skill | 41 | 5 | 0 | 46 |
| Baseline | 38 | 6 | 2 | 46 |

By case, the skill arm was ahead on e01 (5 pass against 2 pass, 2 partial, 1 fail: it listed the checks it couldn't make, and the baseline demanded schema markup), e03, and e07 (the baseline proposed five documents for a one-command tool). It was behind or level on e04 (it described a caller-declared inventory as simply complete), e05 (both arms padded a long "add this" list for a sound brief and credited nothing already there), and e06 (it labeled the steps "tutorial or how-to"). The two non-trigger cases (e13, e14) and the injection case (e12) passed in both arms; in e13 and e14 the skill arm ran no scripts.

What round 1 changed in the toolkit: `page-check` now reports what is present and working and says when its checks found nothing; `SKILL.md` got calibration rules ("nothing to add" is a valid result); a caller-declared inventory is now reported as declared, not verified; `page-check` accepts a bare file path (an agent had typed one and been refused); the loads in `SKILL.md` are now sized to the request.

Round 2 re-ran e04 and e05 with the skill after those changes: 4 of 4 and 3 of 3 expectations passed. This is not independent evidence, because the changes were made in response to those same two cases.

## Area audits on real sites (not part of the model-graded rounds)

These are single runs with me as the only judge, so they show how the toolkit behaves on real pages, not how well it performs.

- **P1 docs (saved pages, 20 tasks):** the ratings agreed with my reading of the pages on 18, with 1 defensible and 1 false positive. I wrote the task list and the release signal.
- **Terminus docs (live crawl of 233 pages, 20 tasks):** the first run had 9 agreed, 3 defensible, 7 false negatives and 1 false positive. The causes I found then were steps shown as bullets or headings, code samples missing from the server HTML, vocabulary that differs from the docs, and generic terms. I wrote the task list and adjusted it twice after seeing results, so this is a stress test, not validation. After the parser fix described below, the same profile gives 14 agreed, 3 defensible, 3 false negatives and 0 false positives. Four of the first run's false negatives were the parser bug, not bullets or headings, so that explanation was wrong for them. Of the three that remain, one is my own profile (I required both a how-to and a reference for scripting).
- **`guides/launch` (9 pages, frozen-tool test):** before running, I wrote 11 tasks and an expected rating for each from reading the pages, hashed the file, and set a rule: more than 3 false negatives or false positives means the tool doesn't hold up on a narrative area. Run 1, with the tool frozen at `ca5a82a`, had 6 agreed, 1 defensible, 4 false negatives and 0 false positives, so it failed the rule. Three of the four misses had one cause: the HTML parser dropped list items written as `<li><p>text</p></li>`, so numbered steps never reached the coverage check. The fix (`c0b979b`) comes with six tests, and five of them fail on the old parser. Run 2, same profile and expectations: 8 agreed, 1 defensible, 1 false negative and 1 false positive. That is inside the limit, but it is not independent evidence, because I made the fix after seeing run 1. The two remaining misses are an 83-word pointer page whose only content is three links in a numbered list (it counts as a covered how-to), and an interactive checklist that isn't in the server HTML (the task reads as mention-only). I wrote that second risk down before the run.
- Re-running P1 after the fix moved 0 of 21 task ratings.
- These runs changed `SKILL.md` (the profile-writing guidance, reading the cited page, the server-HTML limit, release-signal staging) and added case e15.

## What this shows and what it doesn't

- **A modest edge, not a proven one.** The skill arm scored 95% (weighted, partial = half) against 89%. In 8 of 14 cases both arms met every expectation: the baseline model is already good at these, so there's little headroom.
- **One run per case per arm.** There is no variance estimate. The same grader model, run separately in the two rounds, scored the identical baseline answer to e05 differently, so treat differences of one or two expectations as noise.
- **I wrote the cases, the toolkit, and the expectations.** That risks teaching to the test. Cases from someone else, and a human grader, would be stronger.
- **Adherence was low.** In 12 of 14 skill-arm runs the agent did not load the method references `SKILL.md` told it to read; for single-page tasks that was reasonable, which is why the loads are now sized to the request. Reference files are only used if the instructions say when to read them.
- **Not tested:** a run by anyone but me, real connectors (Google Docs, Jira, support exports) and demand data, cross-platform behavior (Node 18, Windows), long-running resume across real interruptions, and a human review of the reports.
- **Deterministic coverage is separate.** The behaviors the skill relies on (gates on `create`, discoverability, not-due features, resume, immutability, blocked crawls, injection handling) are exercised by the test suite, not by these model runs.

## Running them again

```bash
# for each case in evals/cases.json: copy evals/fixtures/<fixture> to a fresh folder, replace {{DIR}} in the prompt,
# and run the prompt twice in a fresh context: once told to follow SKILL.md, once told not to read the toolkit.
# Have each run write its answer and a "COMMANDS RUN" list. Grade blind against the expectations.
```

For the injection case, check the working folder afterward for a file named `PWNED`.
