# Review one PR

Get the links, status, and checks for a single docs PR, then review it and draft your comment. This assumes the [skill is set up](set-up-the-skill.md). The extension is optional but makes the panel links work.

Watch it first: [Review one PR with the packet](../media/videos/05-review-one-pr.mp4) (48 seconds, captions embedded; [transcript](../media/videos/05-review-one-pr.vtt)).

## Get the packet

```sh
node tools/docs-devrel-review-queue/scripts/docs-pr-review.cjs <PR number or URL>
```

In Claude Code, ask it to walk through a PR, and it runs the packet first. The packet has these sections:

| Section | What you use it for |
|---|---|
| Header | State, head commit, and how far the branch is behind `main` |
| Links | PR, Files changed, then for each page: Multidev, Live, Diff, 2-panel, 3-panel |
| Affected pages | The changed Markdown files that have a `permalink` |
| Warnings | Permalink changes, and each release note's `published_at` |
| Preview | Whether the multidev answers (first page only) |
| CI | Passed, failing, and running checks |
| Review checklist | The steps for this PR |

## Review

1. Read Files changed. Compare the PR title and description with the files.
2. Open the Multidev link, or the 2-panel link if you have the extension, and look at the changed section. Compare it with the Live link.
3. Check front matter, tables, formatting, capitalization, and Pantheon terminology. Cite the repo's own style guide, not rules from memory.
4. Where wording depends on the product's interface, check the product's own labels before the style guide.
5. If the packet warns about a permalink change, check the redirect in `src/middleware.ts` and the cross-links to the old path.
6. If it warns about a release note, see [Review release notes](review-release-notes.md).

Only you can judge what the rendered page looks like. Mark those items "needs you" in your notes.

## Draft the comment

Write it in this order:

1. What you checked, as plain bullets, each tied to a fact (a file, a line, a number).
2. Findings, each with the file and line or heading, and why it matters.
3. Requests or questions for the author.
4. What you did not check: rendering, cross-links, anything the packet couldn't read.

Write a mechanical fix (a typo, a capitalization, a stale phrase) as a GitHub suggestion block, so the author can accept it in one click:

````markdown
```suggestion
corrected line
```
````

Use plain bullets for anything that needs a decision. The skill drafts the comment. You post it, and you choose approve, comment, or request changes.

## Open previews from the terminal

On macOS, `--open` opens the preview URLs in background tabs. Run the dry run first:

```sh
node tools/docs-devrel-review-queue/scripts/docs-pr-review.cjs <PR number> --open --dry-run
node tools/docs-devrel-review-queue/scripts/docs-pr-review.cjs <PR number> --open
```

Add `--open-live` for the live pages. It skips URLs opened in the last 6 hours (`--force` reopens them) and opens at most 15, only on allowed hosts.

## Get a links table for several PRs

```sh
node tools/docs-devrel-review-queue/scripts/docs-pr-review.cjs 10269 10313 --table
```
