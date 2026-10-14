# Extension reference

Facts about the PR preview extension at version 0.5.2, for lookup. To install it, see [Install the extension](../how-to/install-extension.md). For the narrative, see the [extension README](../../pantheon-pr-preview-extension/README.md).

## Requirements and scope

| Item | Value |
|---|---|
| Browser | Chromium with Manifest V3: Chrome 102 or later, Brave, or Edge |
| Tested in | Chromium 151 (Chrome for Testing). Brave and Edge use the same APIs but haven't been tested. |
| Repository | `pantheon-systems/documentation` only |
| Credentials | None. Every request is an unauthenticated read, so GitHub's limit of 60 API requests per hour per IP applies. |

## What the extension recognizes

| Tab URL | Treated as |
|---|---|
| `https://github.com/pantheon-systems/documentation/pull/<number>`, on any sub-page (Conversation, Commits, Checks, Files changed) | A documentation PR |
| `https://pr-<number>-pandocs.pantheonsite.io/...` | A preview tab. The panel shows **Retry preview**. |
| Anything else | "Not on a documentation PR" |

## Toolbar badge

| Badge | Meaning |
|---|---|
| A number | The PR changes that many pages with a `permalink`. Nothing opens automatically when it's 2 or more. |
| `?` | No changed Markdown file has a `permalink`, for example a PR that only touches `tools/`. Expected. |
| `!` | GitHub's metadata couldn't be read, usually the unauthenticated rate limit. Wait up to an hour. |

## Panel controls

| Control | What it does |
|---|---|
| **Preview**, **Live** (one row per page) | Opens the multidev page or the same route on `docs.pantheon.io` in a background tab next to the PR tab. Switches to the page if it's already open. |
| **Open all previews** | One background tab per affected page, in list order. Skips pages already open. Opens at most the first 15. |
| **Open Files changed** | Opens the PR's Files changed tab next to the current tab. |
| **2-panel**, **3-panel** | Opens `review.html` next to the PR tab. 2-panel: `Live Article`, then `PR Preview`. 3-panel adds `GitHub Diff` first. |
| **Retry preview** | Checks the preview again. On a preview tab it also reloads the page. |
| **View deployment checks** | Appears when the preview isn't responding. Opens the PR's Checks tab. |
| **Inspect middleware.ts** | Appears with a permalink warning. Opens `src/middleware.ts` on the PR branch. |
| **Reset** | Clears the current PR's review checklist. The checklist is saved per PR in `chrome.storage.local`. |

Changed Markdown files without a `permalink` (release notes, for example) are listed in a note under the page list.

## Automatic preview tab

| Condition | Result |
|---|---|
| The PR's changed Markdown resolves to exactly one page | Opens that preview in a background tab. The GitHub tab keeps focus. |
| The PR changes two or more pages | Nothing opens. The badge shows the count. |
| The PR was already opened this browser session | Nothing opens. State is kept per PR in `chrome.storage.session`. |
| The preview is already open | Not opened twice. |
| GitHub was read less than 5 minutes ago | Not read again. |

## URL parameters

| Parameter | Where | Effect |
|---|---|---|
| `?pantheon_preview=off` | On a PR URL | Skips the automatic preview tab. |
| `?pantheon_review=1` | On a docs or multidev URL | Hides the cookie banner on that page. The site ignores the parameter. The extension adds it to every docs and preview tab it opens, and the review skill adds it to the Multidev and Live links it prints. |
| `pantheon_panel=2` or `3`, with `page=<path>` | On a PR's `/files` URL | Opens the 2-panel or 3-panel view for one changed page. Any other value is ignored. |

The full panel link format:

```text
https://github.com/pantheon-systems/documentation/pull/<number>/files?pantheon_panel=<2|3>&page=<path of the changed file>
```

`page` must be the full path of a Markdown file the PR changes, and that file needs a `permalink`. Otherwise the tab stays on GitHub and the badge shows `?`. GitHub removes the marker from the address bar a moment after the page loads. A panel link doesn't also open the automatic preview tab.

## Heading anchors

Preview and Live links end in the `#heading` of the section that holds the first change in the page body.

| Change | Anchor |
|---|---|
| Edit in the page body | The section containing the first change |
| Edit only in the front matter | None. The page opens at the top. |
| Change that only deletes lines | The section the lines were removed from |
| Renamed heading | The heading itself |
| Repeated heading | The site's own id: `slug`, `slug-1`, `slug-2` |
| New page, or a change above the first heading | None |

Lines that start with `#` inside a code fence aren't headings. Only the first changed section is linked, even when a PR changes several.

## Warnings

| Warning | Trigger | Shown |
|---|---|---|
| Permalink changed | A changed file's `permalink` differs from the base branch. Renames are matched by previous name. New files aren't flagged. | Old and new value, a reminder to check redirects in `src/middleware.ts` and cross-links, and a checklist item |
| Release note: check the RSS timestamp | A changed file under `src/source/releasenotes/` | The file's `published_at` (or `published_date`), highlighted in red when more than a day old, and a checklist item |

For why the release-note timestamp matters, see [Release notes and RSS](../explanation/release-notes-and-rss.md).

## Cookie banner

The OneTrust banner is hidden only inside the review view and on links ending in `?pantheon_review=1`. A normal visit keeps the banner. Hiding it doesn't click Accept and sets no consent cookie. The site's own script records consent on the first scroll with or without the extension. The extension re-scrolls to the anchored section for the first few seconds after load, and hides those scrolls from the page's scroll tracking.

## Permissions

| Permission | Used for |
|---|---|
| `webNavigation` | Detecting navigation to a documentation PR for the automatic preview tab |
| `tabs` | Finding open preview tabs to avoid duplicates; opening, focusing, and reloading tabs |
| `storage` | Checklist progress (`local`) and per-PR automatic-open state (`session`) |
| `declarativeNetRequest` | One dynamic rule that removes `X-Frame-Options` and `Content-Security-Policy` from iframe requests to `github.com`, `docs.pantheon.io`, and `pantheonsite.io` made by the extension's own review page |

| Host | Used for |
|---|---|
| `github.com/pantheon-systems/documentation/*`, `api.github.com/repos/pantheon-systems/documentation/*` | Reading the PR, its changed files, and patches |
| `raw.githubusercontent.com/*/*` | Reading changed Markdown front matter from the PR head (which can be a fork) and the base branch |
| `*.pantheonsite.io/*` | Checking whether the multidev responds |
| `docs.pantheon.io/*` | Opening and reading live pages |

The one content script, `hide-cookie-banner.js`, runs on `docs.pantheon.io` and `*.pantheonsite.io`, including frames. It does nothing outside the review view or a `pantheon_review=1` URL. The extension only opens or probes `github.com`, `docs.pantheon.io`, and `pr-<number>-pandocs.pantheonsite.io` URLs.

## Current limitations

- The repository and preview hostname are hard-coded for Pantheon documentation.
- Only files with a front-matter `permalink` get preview and live links.
- The heading anchor is a generated Markdown slug. Pages with custom anchor behavior may need a site-specific rule.
- `docs.pantheon.io` may redirect a live URL, so a live page that's already open can be opened a second time.
- The extension can't invoke Arc's native Split View. The review view is one extension tab with iframes.

## Validation

```sh
node --check tools/pantheon-pr-preview-extension/popup.js
node --check tools/pantheon-pr-preview-extension/service-worker.js
python3 -m json.tool tools/pantheon-pr-preview-extension/manifest.json
node tools/pantheon-pr-preview-extension/validate-resolver.cjs
```

`validate-resolver.cjs` runs offline against a mocked GitHub. It checks URL construction, the host allowlist, front-matter parsing, and permalink-change and release-note detection.
