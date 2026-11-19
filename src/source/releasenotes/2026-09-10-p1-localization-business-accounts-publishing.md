---
title: "Unlock P1 Power: Localization, Business Accounts, and Improved Publishing"
published_date: "2026-09-10"
published_at: "2026-09-10T17:00:00Z"
categories: [p1, new-feature]
description: "Enhance P1 sites with localization, Business Accounts for access control, and a safer Workstream publish flow. Manage redirects easily and improve content workflows."
---

This release brings localization to the front end of P1, plus Business Accounts to manage who can access your sites, a safer publish flow for Workstream changes, and improved redirect management.

## New features and improvements

**Introducing localization for P1 sites:** In previous releases, we established the foundation for multi-language and multi-geo content behind the scenes, in our content repository. This update exposes most of these features to P1 interfaces (user interfaces and MCP): you can now set which locales your site supports and localize your content both from your AI assistant or from the Visual Editor and you can implement your own localization strategy.

* Configure your site's locales: Site Settings now includes a Locales section where you can set your source language, add or remove target markets or geos
* Localize your content within its entire lifecycle (and not just at the beginning): P1 offers a unique approach that lets you customize any localized content yet keep a relation with the original locale to follow its change and keep the translation and localization up to date with.
* Navigate localization status easily: The Site Structure now shows the number of locales in which a page might have been translated to, so you can identify gaps without opening every page. A new locale selector helps you filter the site structure to a specific language.

**Redirect management updates**: Redirect UI has been updated with feature fixes, making it easier to manage page redirects from the dashboard. Find it from your site's **Site Structure** page — open the redirects drawer to view, edit, or delete redirects, with a clearer layout and a new empty state for sites with none yet. Redirects are now also created automatically when you change a page's location or slug, so links keep working without an extra manual step.

## Introducing Business Accounts

Add members to your Business Account to control who can view and work on the P1 sites and Content Publisher collections that belong to it. Every site — and every user and agent working on it — now belongs to a Business Account, rather than being managed one-by-one.

Use the account switcher in the P1 dashboard to move between every Business Account you're a member of; each one shows only its own sites, users, and agents. Admins add, remove, and manage member and agent roles from an interface scoped to their account; members work within the sites they've been given access to, without seeing account-wide management controls.

## A safer publish flow for Workstreams

Site structure changes made in the dashboard in a Workstream — creating, moving, updating, or deleting pages, including slug and location changes — now stay pending in the Workstream until you explicitly publish. Live is no longer affected until you're ready.

* Every pending change shows its status (New, Moved, Updated, Deleted) right in the Workstream, so you can review exactly what a publish will apply before you commit to it.
* To move a page to a new parent or location, use the **Location** field in the page's edit modal. Drag-and-drop reordering has been removed from the page tree — it could silently do nothing or move a page unexpectedly, since sibling order is derived automatically rather than stored.
* Moving a page moves its entire subtree with it, so nested pages never get left behind.
* Changes made directly on Live still publish immediately, as before — this change is specific to Workstreams.

## Fixes and refinements

**Editor fixes**:

* Fixed P1 sign-in and welcome screens being unreadable on dark-themed host sites.
* Visiting a nonexistent page in the editor now offers to create it, instead of silently doing nothing. If you don't see this behavior, make sure you're running the latest SDK.

**Workstreams and publishing**:

* Fixed `?branch=main` being incorrectly classified as a non-main branch, which had denied reads.
* Fixed list blocks showing no content on published pages when built on a specific page template.
* The MCP agent now consistently says "workstream" instead of "branch," matching the dashboard.

**SDK and starter kit**:

* New starter-kit scaffolds no longer fail to install due to unresolved workspace dependencies.
* Published npm packages no longer ship dead sourcemaps, removing noisy warnings on a fresh project's first test run.
* DataListBlock's built-in Cards/Listing/Rows components no longer require your site's Tailwind build to scan this package's files to render correctly.
