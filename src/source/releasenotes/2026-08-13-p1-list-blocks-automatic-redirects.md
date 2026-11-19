---
title: "Enhance Pages With New List Blocks and Automatic Redirects"
published_date: "2026-08-13"
published_at: "2026-08-13T17:00:00Z"
categories: [p1, new-feature]
description: "Effortlessly build dynamic pages with new List blocks and automatic redirects. Discover how P1's editor improvements enhance your workflow and prevent broken links."
---

**List pages (new "List" block):** Display a collection of content — your P1 blog posts, event pages, or an external/Content Publisher data source — as a **Grid, Table, or List**, using P1's standard templates. You can now build pages like "all blog posts" without writing code. Pre-made queries for built-in content types are generated for you.

**Template badge:** The Inspector's Page tab now shows a badge when a page is bound to a template.

## Page editor experience

**Responsive editor:** The editor adapts to smaller screens — a permanent plugin rail, panels that auto-collapse when space is tight, and a single-line status banner.

**Reliable workstream context:** Fixed a case where the editor canvas could show a _previous_ workstream's version of a document.

## Redirects

**Automatic page redirects:** When you change a page's slug or delete a page, P1 can automatically create a redirect so existing links keep working — managed from a dedicated redirects drawer. Redirects are now honored at runtime (no more 404s on a deleted page) and **survive workstream merges**.

## Fixes

* **Remote data sources load reliably** — fixed the stuck loading spinner and corrected `{{source.field}}` token resolution in the explorer.

  ⚠️ **Action required (developers):** the custom datasource plugin API changed in `puck-css` 0.10.0 (`createRemoteDatasourceExplorerPlugin` / `createPreviewResolvePlugin` signatures and several `Client` props). Update custom plugins accordingly.
* **Profile pictures render** for you and collaborators.
* **Data sources tab icon** now shows a database icon with a short description (was the AI icon / two stacked icons).
