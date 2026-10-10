# Docs style review

A Claude Code skill and a Node script that check a docs page or PR in `pantheon-systems/documentation` against the Pantheon style guide. The script finds the mechanical issues. The skill adds the judgment a script can't, confirms Vale's comments against the file, and drafts the review comment. It only reads. It never posts, approves, or edits the author's file.

Use it alone on any page or PR, or let the [review queue skill](../docs-devrel-review-queue/README.md) offer it for each PR as you work through your queue.

## Quick start

You need Node 18 or later and the GitHub CLI signed in (`gh auth login`). The script has no packages to install.

```sh
ln -s "$PWD/tools/docs-style-review" ~/.claude/skills/docs-style-review
```

Then, in Claude Code:

```text
/docs-style-review 10346
```

Or run the script directly:

```sh
node tools/docs-style-review/scripts/style-check.cjs --pr 10346
node tools/docs-style-review/scripts/style-check.cjs src/source/content/nextjs/overview.md
pbpaste | node tools/docs-style-review/scripts/style-check.cjs --text
```

## How it works

1. **Reads the guide.** The skill reads `src/source/content/style-guide.md` fresh and cites sections by heading, not from memory.
2. **Mechanical pass.** `style-check.cjs` checks the page and lists Vale's comments on the PR as leads. An edited page is checked only on the lines the PR changes, like the Vale workflow. A new page is checked whole.
3. **Judgment pass.** The skill reads for what a script can't: be verbs, hyperbole, where the reader starts, terminology, and claims that need a product owner.
4. **Report.** Violations with a guide section for each, then items for the author to confirm, then nits outside the guide. Mechanical fixes come as GitHub suggestion blocks.

## What the script checks

| Level | Meaning | Examples |
|---|---|---|
| error | The guide or CI says so | trailing spaces, tabs, a link target, missing front matter, a midnight `published_at` |
| warn | A Google rule Vale enforces | "will", "we", an absolute internal link, a skipped heading level |
| info | A candidate for judgment | be verbs, possible title case, mixed apostrophes |

The full table, with the guide section for each check, is in [references/checks.md](references/checks.md).

## Options

| Option | Effect |
|---|---|
| `--pr N` | Check the pages PR N changes, read at the PR head through `gh` |
| `--repo owner/name` | With `--pr`: another repo. Default `pantheon-systems/documentation`. |
| `--all-lines` | With `--pr`: check whole files, not only changed lines |
| `--no-links` | With `--pr`: skip the internal link check, which uses the network |
| `--text` | Read one page from stdin |
| `--release-note` | Treat the input as a release note. Automatic under `src/source/releasenotes/`. |
| `--no-info` | Hide info findings |
| `--json` | Print findings as JSON |
| `--self-test` | Run the built-in tests |

The exit code is 1 when the script finds an error, otherwise 0.

## Limits

- It checks `src/source/content/`, `src/source/releasenotes/`, and `src/source/partials/` only. Other files are skipped and counted.
- `heading-case` and `be-verbs` are heuristics. Vale's `Pantheon.Headings` is the authority on heading case.
- It doesn't render the page or check screenshots. A person does. With `--pr` it checks that relative internal links resolve on docs.pantheon.io, and skips pages the PR itself adds.
- It doesn't replace Vale. It reads Vale's PR comments and adds rules Vale doesn't enforce, such as relative internal links.

## Check your change

```sh
node --check tools/docs-style-review/scripts/style-check.cjs
node tools/docs-style-review/scripts/style-check.cjs --self-test
```

## Files

| Path | What it is |
|---|---|
| `SKILL.md` | The skill's instructions |
| `scripts/style-check.cjs` | The mechanical pass and its self-test |
| `references/checks.md` | Every check, how to verify it, and its source |
