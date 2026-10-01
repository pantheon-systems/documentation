# Pantheon PR Preview Opener

A first-pass Chrome-family Manifest V3 extension for Pantheon documentation previews. The extension tile and toolbar action use a standalone yellow lightning-bolt mark without letters.

## What it does

Click the extension icon while viewing a documentation PR to open a focused review panel. It includes adjacent-tab actions for **Files changed**, the multidev preview, and the live equivalent; it also checks changed Markdown front matter for route changes and release-note files. Checklist progress is saved separately for each PR.

When a preview tab is active and still loading, the popup explains that the multidev may be waking up and provides a manual **Retry preview** control.


When you navigate to a pull request in `pantheon-systems/documentation`, the extension:

1. Opens the resolved preview exactly once per GitHub pull-request tab, immediately after the GitHub tab, while keeping GitHub focused.
2. Reads the pull request metadata from GitHub.
3. Finds changed Markdown files.
4. Reads each file's YAML front matter from the pull-request branch.
5. Extracts its `permalink`.
6. Finds the nearest changed Markdown heading from the PR diff.
7. Opens `https://pr-<PR-number>-pandocs.pantheonsite.io/<permalink>#<heading>` when exactly one unique route is found.

For example, PR 10303 resolves to the `docs/guides/global-cdn/global-cdn-faq` route.

If the pull request changes zero or multiple uniquely routable Markdown pages, the extension leaves GitHub open and marks the toolbar icon with `?`.

## Install locally

1. Download and unzip this folder.
2. Open `chrome://extensions` in Chrome, Brave, or Edge.
3. Enable Developer mode.
4. Select **Load unpacked**.
5. Choose the unzipped `pantheon-pr-preview-extension` folder.
6. Navigate to a Pantheon documentation pull request.

## Temporarily view GitHub instead

Add `?pantheon_preview=off` to the GitHub pull request URL. For example:

`https://github.com/pantheon-systems/documentation/pull/10303?pantheon_preview=off`

## Current limitations

- The repository and preview hostname are currently hard-coded for Pantheon documentation.
- It uses unauthenticated GitHub API requests, so GitHub rate limits may apply.
- It redirects only when one unique Markdown permalink can be resolved.
- The section jump uses a generated Markdown heading anchor; pages with custom anchor behavior may need a later site-specific slug rule.
- The checklist is currently scoped to this documentation repository; repository settings and a workflow trigger could be added later.
