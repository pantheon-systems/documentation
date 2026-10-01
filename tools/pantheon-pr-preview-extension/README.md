# Pantheon PR Preview Opener

A Chrome-family Manifest V3 extension for reviewing Pantheon documentation pull requests. The toolbar action uses a standalone yellow lightning-bolt mark without letters.

## What it does

On a `pantheon-systems/documentation` pull request, click the extension icon to open the review panel:

- **Affected pages.** Lists every page touched by the PR's changed Markdown files. Each row has **Preview** (the `pr-<number>-pandocs.pantheonsite.io` multidev) and **Live** (`docs.pantheon.io`) buttons.
- **Open all previews.** Opens every preview beside the PR tab (the first 15 for large PRs). Pages that are already open are skipped.
- **Files changed.** Opens the PR's Files changed tab beside the current tab.
- **Preview status and Retry preview.** The panel checks whether the multidev answers. If it times out or returns 5xx or 404, the panel says the multidev may be waking up or still deploying and offers **Retry preview**. On a preview tab, **Retry preview** reloads the page and checks again.
- **Permalink warning.** If a changed file's `permalink` differs from the base branch, the panel lists the old and new paths and reminds you to check the redirects in `src/middleware.ts` and cross-links.
- **Release-note check.** Changes under `src/source/releasenotes/` show their `published_at` / `published_date`. The value feeds the RSS timestamp, and a date in the past means Slack won't treat the entry as new, so the panel highlights dates more than a day old.
- **Checklist.** Progress is saved separately for each PR.

URLs come from each file's front-matter `permalink`, plus a `#heading` anchor taken from the nearest heading above the first changed line.

## Automatic preview tab

When you open a PR whose changed Markdown resolves to exactly one page, the extension opens that preview in a background tab next to the PR tab. The GitHub tab keeps focus. It opens at most once per PR per browser session, and it skips a preview that is already open.

If the PR touches several pages, the toolbar badge shows the page count and you choose from the panel. A `?` means no page with a permalink was found, and `!` means GitHub could not be read.

To skip the automatic tab, add `?pantheon_preview=off` to the PR URL.

## Install locally (Chrome, Brave, Edge)

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Select **Load unpacked** and choose this `pantheon-pr-preview-extension` folder.
4. Open a Pantheon documentation pull request and click the extension icon.

After editing files, select the reload icon on the extension's card in `chrome://extensions`.

## Current limitations

- The repository and preview hostname are hard-coded for Pantheon documentation.
- It makes unauthenticated GitHub API requests, so GitHub rate limits apply.
- The heading anchor uses a generated Markdown slug; pages with custom anchor behavior may need a site-specific rule.
- Only files with a front-matter `permalink` get preview and live links.
