---
name: docs-style-review
description: "Use when someone asks for a style review of a Pantheon docs page or PR in pantheon-systems/documentation, wants a page checked against the Pantheon style guide, or asks to style review the review queue. Runs a mechanical pass, confirms Vale's comments against the file, and drafts review comments with the guide section for each finding. Read-only: it never posts, approves, or edits the author's file."
---

# Docs style review

Reviews Markdown pages in `pantheon-systems/documentation` against the Pantheon style guide and the Google rules Vale enforces. It finds what a person would flag, cites the guide section for each finding, and drafts the comment. The reviewer decides and posts.

Two ways to start it:

| You say | It does |
|---|---|
| "Style review PR 10346", a PR URL, a file path, or pasted text | Reviews that target alone. This is the stand-alone mode. |
| During the review queue, yes to "Want a style pass on this PR's pages?" | Reviews that PR after the packet, then returns to the walkthrough. |
| "Style review the queue" | Runs the queue skill's outline, then reviews each PR with changed pages, one at a time, packet first. |

The queue skill ([../docs-devrel-review-queue/SKILL.md](../docs-devrel-review-queue/SKILL.md)) offers the style pass once per PR. This skill never starts on its own.

## 1. Read the guide first

Don't recite style rules from memory. Before judging anything:

1. Read the current guide: `gh api repos/pantheon-systems/documentation/contents/src/source/content/style-guide.md --jq .content | base64 -d`, or `src/source/content/style-guide.md` in a local checkout. Note its `reviewed` date in the report.
2. Cite sections by heading ("Voice, Style, and Flow", "Hyperlinks"), never by line number. Line numbers move.
3. Where the guide is silent, the Google developer documentation style guide fills in (the guide defers to it, and Pantheon's rules win on conflict). Say "Google style" when you cite it.
4. Where wording depends on the product's interface, the product's own labels outrank both. If they disagree, review against the product and list a guide update as a follow-up.

If you can't read the guide, say so and limit the review to the script's findings.

## 2. Run the mechanical pass

```bash
node ~/.claude/skills/docs-style-review/scripts/style-check.cjs --pr <N>          # a PR's changed pages
node ~/.claude/skills/docs-style-review/scripts/style-check.cjs <file.md>         # a file
node ~/.claude/skills/docs-style-review/scripts/style-check.cjs --text < page.md  # pasted text
```

- For a PR, an edited page is checked only on the lines the PR adds or changes, the same as the Vale workflow, because older lines predate some rules. A new page is checked whole. Pass `--all-lines` only if the reviewer asks.
- Files outside `src/source/content/`, `src/source/releasenotes/`, and `src/source/partials/` are skipped. Say how many.
- Levels: `error` is something the guide or CI states. `warn` is a Google rule Vale enforces. `info` is a candidate for judgment. Never present an `info` finding as a violation.
- The script also lists Vale's comments on the PR. Treat each as a lead: open the line and confirm it. Vale is wrong on acronyms and product names (for example it can suggest the same text for a heading that is already sentence case). Say when you dismiss one, and why.

Run the script fresh and quote its output. Don't remember findings from an earlier run.

## 3. Judgment pass

The script can't judge these. Read the page for them and check each against the guide section in [references/checks.md](references/checks.md):

- **Voice:** be verbs, personal opinion, hyperbole, colloquialisms, and claims that read as marketing.
- **Headings:** confirm sentence case on any heading the script or Vale flagged.
- **Where's the user?** Does a procedure say where the reader starts (which dashboard, which tab)?
- **Terminology:** product terms match the guide's Terminology section and the product's own labels.
- **Emphasis:** bold is for UI navigation only, italics for emphasis.
- **Claims:** anything that depends on product capability, versions, or settings. Mark it `unverified` and say who can confirm.
- **Links:** descriptive link text, relative internal paths, no target attribute.
- **Release notes:** the `description` must read on its own, because it's the only body text feed readers see. State the `published_at` value and that the RSS feed publishes it as the item date. The queue skill owns that check; don't repeat its rule.

Mark each finding's evidence: `observed` (the line shows it), `inferred` (you reasoned to it), or `unverified` (needs someone else).

## 4. Report

Three groups, in this order:

1. **Violations,** each with `file:line`, the quoted text, the rule, the guide section, and the fix.
2. **For the author to confirm:** unverifiable claims and judgment calls, each with who can answer.
3. **Outside the guide:** consistency nits, labeled as such. Never cite the guide for these.

Then "what I didn't check" (rendering, cross-links, anything behind login) and "needs you."

Draft the comment with Conventional Comments prefixes (`issue:`, `suggestion:`, `question:`, `nitpick:`). Write a mechanical fix as a GitHub suggestion block so the author can accept it in one click. Use plain bullets for anything that needs a decision. Keep it short and use contractions.

## 5. Rules

- **Read-only.** Read with `gh` and the script. Never run `gh pr review`, post a comment, push, or edit the author's file.
- **Draft, don't post.** Post only after the reviewer says yes to that exact comment, and only as a comment. Approve and request-changes are the reviewer's call.
- **Don't invent rules.** If a finding isn't in the guide, Google style, or Vale, put it under "outside the guide."
- **Weight what you find.** An error the guide states outranks a candidate. Say when a PR has no findings; don't pad.
- **Quote the output.** Findings change when the author pushes. Re-run before you report.

## 6. Before you call the review done

Re-read the request. State what you checked, what the script and Vale couldn't judge, and what needs the reviewer's eyes. If you reviewed several PRs, say which ones you skipped and why.
