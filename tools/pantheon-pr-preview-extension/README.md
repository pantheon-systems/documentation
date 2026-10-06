# Pantheon PR Preview Opener

A Chrome-family Manifest V3 extension for reviewing pull requests in `pantheon-systems/documentation`. It resolves each changed docs page to its multidev preview and its live equivalent, and it adds a per-PR review checklist. The toolbar icon is a standalone yellow lightning bolt.

## Requirements

- A Chromium-based browser that supports Manifest V3: Chrome 102 or later, Brave, or Edge. The extension uses a service worker and `chrome.storage.session`, which is why Chrome 102 is the floor (`minimum_chrome_version` in `manifest.json`).
- It has been tested in Chromium 151 (Chrome for Testing). Brave and Edge use the same extension APIs but haven't been tested.
- Scope: `pantheon-systems/documentation` only.

## How it recognizes a documentation PR

- A tab whose URL is `https://github.com/pantheon-systems/documentation/pull/<number>`, on any of the PR's sub-pages (Conversation, Commits, Checks, Files changed).
- A preview tab whose URL is `https://pr-<number>-pandocs.pantheonsite.io/...`. The panel shows the preview-tab view with **Retry preview**.
- Any other tab shows "Not on a documentation PR".

## Review panel

Click the toolbar icon on a documentation PR to open the panel.

- **Affected pages.** One row per changed Markdown file that has a front-matter `permalink`. Each row shows the full resolved preview URL, for example `pr-10303-pandocs.pantheonsite.io/docs/guides/global-cdn/global-cdn-faq#global-cdn-fastly-based`. The `#heading` anchor points at the section that holds the first change in the page body (see "Where the links jump").
- **Preview and Live buttons.** Each row opens the multidev preview (`pr-<number>-pandocs.pantheonsite.io`) or the same route on `docs.pantheon.io` in a background tab next to the PR tab. This is the preview/live comparison. If that page is already open, the button switches to it instead of opening a copy.
- **Open all previews.** Opens one background tab per affected page, in list order, directly after the PR tab. Pages already open are skipped, and large PRs open the first 15. The button shows the page count.
- **Open Files changed.** Opens the PR's Files changed tab next to the current tab.
- **Review view.** Each affected-page row has **2-panel** and **3-panel** actions. They open one extension tab (`review.html`) next to the PR tab, with the pages side by side as iframes in the order `Live Article | PR Preview` or `GitHub Diff | Live Article | PR Preview`. Each pane has an **Open in tab** link. GitHub ignores the `path` query as a filter, so the diff pane lists every changed file. An extension can't invoke Arc's native Split View, and Arc closes the popup as soon as it opens a tab, so the view is a single `tabs.create` call.
- **Files without a permalink.** Changed Markdown files with no `permalink` (release notes, for example) are listed in a note below the page list.
- **Per-PR checklist.** The review steps are saved separately for each PR in `chrome.storage.local`. **Reset** clears the current PR's checklist.

## Where the links jump

Preview and Live links end in the `#heading` of the section that holds the first change in the page body, so both panes open at the same place.

- Edits to the front matter (`title`, `permalink`, and so on) don't count. The first change after the front matter does.
- A change that only deletes lines points at the section the lines were removed from. An added blank line counts as a change.
- A renamed heading points at itself, and a repeated heading gets `-1`, `-2` (the site's own ids). Lines that start with `#` inside a code fence aren't headings.
- A brand-new page, a front-matter-only change, or a change above the first heading has no anchor, so the page opens at the top.
- On a sample of 20 changed pages from recent PRs, every anchor the extension produced exists on the live or preview page.

## Shareable panel links

A link to a PR's Files changed page can carry a marker that opens the 2-panel or 3-panel review view for one changed page:

```
https://github.com/pantheon-systems/documentation/pull/<number>/files?pantheon_panel=<2|3>&page=<path of the changed file>
```

- With the extension installed, the tab becomes the review view for that page. `pantheon_panel=2` shows `Live Article | PR Preview`, and `3` adds the GitHub diff.
- Without the extension, the same link opens the PR's Files changed page.
- The link is a plain `https` URL with no extension ID, so it works for every install and opens from chat apps and Slack.
- `page` must be the full path of a Markdown file the PR changes (for example `src/source/content/nextjs/overview.md`) and that file needs a `permalink`. If the PR doesn't change it, the tab stays on GitHub and the toolbar badge shows `?`. Any other `pantheon_panel` value is ignored.
- GitHub removes the marker from the address bar a moment after the page loads. That is expected.
- A panel link doesn't also open the automatic preview tab.

## Warnings

- **Permalink changed.** The extension compares each changed file's `permalink` with the base branch (renamed files are matched by their previous name; new files are not flagged). Any change is listed as old → new, with a reminder to check the redirects in `src/middleware.ts` and any cross-links to the old path. **Inspect middleware.ts** opens that file on the PR branch, and a matching checklist item appears.
- **Release note: check the RSS timestamp.** Files under `src/source/releasenotes/` show their `published_at` (or `published_date`). That value feeds the RSS publication time. A date in the past may not publish as a new RSS item, and Slack won't treat the entry as new, so a quick fixup PR may be needed. Dates more than a day old are highlighted in red, and a matching checklist item appears.

## Slow or idle multidevs

- The panel checks whether the first affected page's preview answers. It reports a timeout, a 404, or a 5xx in plain language, and says when the multidev may be waking up or still deploying.
- **Retry preview** checks again. On a preview tab it also reloads the page.
- **View deployment checks** appears when the preview isn't responding. It opens the PR's Checks tab, where the deployment job and its logs live. GitHub exposes no Pantheon environment or build URL for a PR, so the Checks tab is the closest build page the extension can resolve.

## Automatic preview tab

When you open a PR whose changed Markdown resolves to exactly one page, the extension opens that preview in a background tab next to the PR tab. The GitHub tab keeps focus.

- It opens at most once per PR per browser session. The state is kept per PR in `chrome.storage.session`, so revisiting the PR, switching between its Conversation and Files tabs, or opening it in a second tab doesn't create another preview. A preview that's already open is never opened twice.
- If the PR touches several pages, nothing opens automatically. The toolbar badge shows the page count, and you choose from the panel.
- Badge `?` means no changed page with a permalink was found. Badge `!` means GitHub could not be read.
- GitHub is re-read at most once every 5 minutes per PR.
- To skip the automatic tab, add `?pantheon_preview=off` to the PR URL.

## Install locally (Chrome, Brave, Edge)

1. Open the extensions page: `chrome://extensions` in Chrome, `brave://extensions` in Brave, or `edge://extensions` in Edge.
2. Turn on **Developer mode**.
3. Select **Load unpacked** and choose this `pantheon-pr-preview-extension` folder.
4. Open a documentation PR and click the extension icon.

After editing files, select the reload icon on the extension's card.

## Permissions

| Permission | Why |
|---|---|
| `webNavigation` | Detects navigation to a documentation PR for the automatic preview tab. |
| `tabs` | Finds already-open preview tabs to avoid duplicates, and opens, focuses, and reloads tabs. |
| `storage` | Saves checklist progress (`local`), and per-PR automatic-open state (`session`). |
| `declarativeNetRequest` | One dynamic rule removes `X-Frame-Options` and `Content-Security-Policy` from iframe requests to `github.com`, `docs.pantheon.io`, and `pantheonsite.io` that the extension's own review page makes, so GitHub can load inside the review view. It doesn't touch other pages or tabs. |

Host access:

- `github.com/pantheon-systems/documentation/*` and `api.github.com/repos/pantheon-systems/documentation/*`: read the PR, its changed files, and its patches.
- `raw.githubusercontent.com/*/*`: read changed Markdown front matter from the PR head (which can be a fork) and the base branch.
- `*.pantheonsite.io/*`: check whether the multidev responds and read the preview tab's URL.
- `docs.pantheon.io/*`: open and read the live pages.

The extension only opens or probes `github.com`, `docs.pantheon.io`, and `pr-<number>-pandocs.pantheonsite.io` URLs.

## Credentials and privacy

The extension has no credentials, sign-in, or tokens. Every request is an unauthenticated read, so GitHub's unauthenticated API rate limit applies (60 requests per hour per IP). It sends no data anywhere beyond those reads.

## Validation

From the repository root:

```sh
node --check tools/pantheon-pr-preview-extension/popup.js
node --check tools/pantheon-pr-preview-extension/service-worker.js
python3 -m json.tool tools/pantheon-pr-preview-extension/manifest.json
node tools/pantheon-pr-preview-extension/validate-resolver.cjs
```

`validate-resolver.cjs` runs offline against a mocked GitHub. It checks URL construction, the host allowlist, front-matter parsing, and the permalink-change and release-note detection.

## Current limitations

- The repository and preview hostname are hard-coded for Pantheon documentation.
- Only files with a front-matter `permalink` get preview and live links.
- The heading anchor is a generated Markdown slug; pages with custom anchor behavior may need a site-specific rule. Only the first changed section is linked, even when a PR changes several.
- `docs.pantheon.io` may redirect a live URL, so a live page that is already open can be opened a second time.
