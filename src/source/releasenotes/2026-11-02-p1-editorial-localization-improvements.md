---
title: "Editorial Experience and Localization Improvements"
published_date: "2026-11-02"
published_at: "2026-11-02T17:00:00Z"
categories: [p1, new-feature]
description: "Enhance your P1 editor experience with faster page listings, improved localization, and robust MCP request handling. Discover key updates for a streamlined workflow."
---

This release improves the P1 editor experience, speeds up page listings on larger sites, makes localization easier to adopt in existing projects, and strengthens MCP request handling.

Released: P1 Collaborative Content Repository (CCR), P1 Dashboard ([https://content.pantheon.io](https://content.pantheon.io)), P1 clients (p1-next-sdk 0.25.0, css-client 0.25.0, puck-css 0.25.0 p1-media: 0.5.2)

## Editor improvements

* **Clearer state after page deletion:** When the page open in the editor is deleted, the canvas now clears and displays a “This page was deleted” message with a way back to the site. Publish is disabled for the deleted page.
* **Faster page creation:** The new-page dialog opens with focus in the Page title field, so you can start typing immediately.
* **Consistent editor appearance:** Editor controls, popovers, and toasts keep the light theme when the host site uses a dark theme.
* **More reliable focus mode:** Pressing Esc exits focus mode after the canvas reloads, but does not exit while a canvas menu or dialog is open.
* **Faster page listings:** Page lists load more efficiently on large sites, including when filtering by path.
* **Site thumbnail**: P1 site thumbnails can now be manually updated in the dashboard.
* **Clearer localization language:** Site Structure now uses “locale” instead of “market.”

## Localization and starter-kit updates

* **Localization support provided out-of-the-box by the starter kit:** The starter kit now scaffolds a site with localization support ready to use, including default path for localized url, no more need to build localization in your project.
* **Move an existing project to localized pages:** The P1 Next.js SDK migration command now supports named migrations. To enable localized pages in an existing starter project, run:

```bash
npx @pantheon-systems/p1-next-sdk migrate localized-pages
```

The editor-layout migration is available as `migrate editor-layout`.

* **Clearer starter configuration guidance:** The starter kit’s `.env.example` now explains when to leave `P1_SITE_URL` unset.

## MCP security and request handling

* MCP requests are handled statelessly and use the token supplied with each request.
* MCP tokens, authorization headers, and session IDs are no longer written to logs.
* MCP tokens cannot access API-key management or account-management routes.
