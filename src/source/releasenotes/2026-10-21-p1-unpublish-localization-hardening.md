---
title: "Unpublishing content, improved localization and platform hardening"
published_date: "2026-10-21"
published_at: "2026-10-21T17:00:00Z"
categories: [p1, new-feature]
description: "Unpublish pages without deleting, improve localization routing, and enhance platform security. Discover new features for clearer dashboards and editorial control."
---

This release brings a way to "unpublish" content, in other words, to take pages offline, more control over localized content URLs, clearer dashboard experience for Business Account and better editorial experiences as well as hardening across P1 APIs, Workstreams, permissions, and authentication.

## New features and improvements

### Unpublish: take pages down from Live without deleting them

P1 can now take a published page offline while keeping its content as an editable draft. Editors can publish the page again when it is ready, and the unpublish event remains visible in page history with the actor and timestamp. The capability is available in the editor, public API, and MCP tools, with the same permission checks across each surface.

Unpublishing can include child pages, translated child pages, or only the specific child pages selected by the editor. Each page can also have its own redirect target while it is offline.

The editor can optionally send visitors to another page while an unpublished page is offline. The Site Structure also identifies pages that are currently down with a view-only **draft** tag.

### More predictable localization

Sites can now control how newly created translations are named and routed: in a locale folder such as `/fr-fr/slug`, or beside the Source page such as `/pricing.fr-FR`. The default route being now  `/{locale}/slug` . Existing translation paths remain unchanged when the setting changes.

Translation creation through the API and MCP now respects the locales a site publishes. Agents can see the published locale list and offer only supported choices, while existing translations remain unaffected if a site later stops publishing a locale.

### Clearer editor and Business Account experiences

* Canvas edit and delete controls now align with the approved interaction design across desktop, tablet, mobile, and dark mode.
* Locked blocks now respect Member permissions in the editor, and template writes are protected consistently across REST, realtime, MCP, and agent paths.
* The open Visual Editor refreshes its Workstream list when another user creates a Workstream.
* Workstream terminology is now used consistently in chatbot responses and dashboard notifications.
* Long Workstream names no longer hide the Review/Publish control.
* Version History date headers and editor rail tooltips now layer correctly while scrolling.
* Content Publisher add-on slug edits no longer show the P1 dashboard redirect prompt.
* Agent edits now show the registered agent’s name and appropriate agent styling instead of always appearing as Zappy.
* The editor no longer remounts the canvas when the AI chat feature flag resolves.
* Organization members can be assigned the Viewer role, and backend site roles now consistently map to Admin, Member, and Viewer.
* Business Account setup now returns users to the dashboard after naming their account, and account search matches owner email addresses.

### Component library and starter-kit improvements

* Installed P1 blocks can be registered automatically from their registry metadata instead of requiring manual import and category edits.
* The starter kit now respects the package manager used to invoke it and avoids silently selecting an incompatible scaffolder version on supported Node releases.

## Fixes, security, and reliability

### Safer cross-site and cross-Workstream authorization

P1 now tightens authorization and resource scoping across Workstreams, Structures, merge requests, merge previews, and published-content tokens. Requests cannot use identifiers from another Site to read or change structures, merge requests, merge targets, or Workstream data.

Additional platform work migrated the CCR router to Hono, consolidated domain boundaries around core entities, and fixed merge-job claim handling after create collisions.

Creating or moving a page onto a redirect source path no longer leaves the new page silently shadowed by the redirect.

### Stronger authentication and Business Account isolation

* Broker login redemption is being protected against redeeming a transaction approved by a different user.
* MCP authorization now requires explicit user consent and stronger PKCE handling before returning an authorization code to a client.
* Agent presence access now checks both Business Account membership and whether the requested agent belongs to that account.
* Dependency vulnerabilities identified in `pantheon-content-cloud` were remediated across the tracked package updates.

### Publishing, realtime, and operational fixes

* Realtime sync no longer persists an empty snapshot as a document version unless the user explicitly cleared the document.
* Dashboard toasts no longer sit underneath the Zendesk support widget.
* Slow CCR database statements are now logged at useful thresholds without logging statement text or customer content.
* Retired feature-flag code paths, configuration, and tests were removed after replacement behavior was confirmed.
* The monitor dashboard now provides a view of monitor status and Site health.

## Internal validation and enablement

* Auth0 authentication coverage was added through NextAuth validation.
* The Collaboration System design and prototype spike was completed.
