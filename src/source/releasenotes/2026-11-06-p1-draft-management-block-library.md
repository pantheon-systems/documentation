---
title: "Improved draft management and P1 block library components"
published_date: "2026-11-06"
published_at: "2026-11-06T17:00:00Z"
categories: [p1, new-feature]
description: "Open Live drafts from any Workstream. Clear sign-in authorization feedback. Version history stays up to date. Block Library improvements and more."
---

This release makes editing across Workstreams clearer, improves Block behavior and navigation, and fixes setup and dashboard issues.

P1 repository and dashboard ([https://content.pantheon.io](https://content.pantheon.io)), P1 clients (p1-next-sdk 0.26.0, css-client 0.26.0, puck-css 0.26.0)

## Editor improvements

* **Open Live drafts from any Workstream:** A page created on Live but not yet published can now be opened from another Workstream. The editor shows Live’s draft with a clear banner. Nothing is saved to the Workstream until you make the first edit; that edit creates the Workstream’s own version.
* **Clear sign-in authorization feedback:** If you sign in with an account that is not authorized for a Site, the editor now displays a “Not authorized” screen and offers the option to sign in with a different account.
* **History stays up to date:** The History panel refreshes the version list each time it opens while keeping the current list visible during the refresh.

## Block Library improvements

Links, forms, cards, and controls now behave as expected across the blog, card, integrations, marketplace, team, event, webinar, and footer Blocks, as well as the documentation shell.

* Link fields use their configured destinations instead of defaulting to `#`, and whole Block cards link to their page.
* Block forms submit to their configured action URL.
* Search, filtering, pagination, and navigation controls work across the updated Blocks.
* Embeds and replay videos render from a source field.
* In the component library, controls that are unavailable in preview now explain why.

## Starter-kit and dashboard fixes

* **More reliable setup with npm and yarn:** Scaffolding with the P1 Block Library no longer fails dependency installation with `ERESOLVE`. If installation still fails, the final message explains that Block registration was skipped and provides the commands to complete it.
* **Page Settings title saves correctly:** Changes to a page title now persist to the correct page setting.
