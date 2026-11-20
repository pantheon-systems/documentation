---
title:  P1 dashboard improvements and release of 0.27.0 SDK
published_date: "2026-11-17"
published_at: "2026-11-17T17:30:00Z"
categories: [p1]
description: "Performance and reliability improvements for the P1 dashboard along with the 0.27.0 release of the SDK"
---

This release improves the Business Account dashboard, editing and localization workflows, MCP sign-in, and reliability across P1. It also includes updates to the P1 SDK and component packages.

## Dashboard and Business Accounts

* **Content Publisher entries in the dashboard:** Connected accounts, tokens, and Create collection are now only accessible from the user’s own Business Account. Previously, they were available everywhere which was confusing.  
* **Clearer access-denied guidance:** When you open a Site you are not authorized to access, the screen explains what to do next.  
* **Less frequent logins needed:** As you use the dashboard now you are less likely to be re-prompted to log in than you were previously. Using the dashboard refreshes the duration of your access.  
* **Dashboard performance improvements**: Previously the dashboard re-fetched data and fully reloaded pages more often than necessary. Recent updates to the dashboard improve this performance.

## Editor, Workstreams, and localization

* **More accurate locale metadata:** A localized page’s `og:locale` now reflects that page’s own locale. A page also cannot be assigned a locale already used by a linked page.


* **Locale-aware Site Structure:** The locale filter shows each translation’s URL, with translations grouped under a locale badge.  
    
* **MCP locale support:** MCP clients can read and set a page’s locale.

* **Manage inherited redirects:** Workstreams can now list, read, and edit redirects inherited from Live, even if those redirects were not created on the Workstream.

## Developer updates

* **Updated P1 packages:** `p1-next-sdk`, `css-client`, `puck-css`, and `create-p1-starter-kit` are at version `0.27.0`.  
* **Puck compatibility:** `puck-css` and `p1-next-sdk` now require Puck `0.24.0` as a peer dependency. Existing projects should follow the Puck `0.24.0` migration guidance in the P1 Next.js SDK release notes.  
* **Starter-kit compatibility:** Projects using npm 10 on Node 22 can install successfully, and builds no longer print Next.js 16’s middleware deprecation warning on every run.

## Reliability and performance

* **MCP authentication**: A range of minor improvements that improves security and aligns with the authentication infrastructure for Pantheon's core platform's MCP.  
* **Safer data operations:** Workstream deletion, Structure creation and deletion, merge-job checkpoints, Site transfers, and template migration jobs now complete all-or-nothing.  
* **More reliable editing and publishing:** Concurrency issues affecting autosave, publish ordering, Structure node moves, and version-history repair have been addressed.  
* **Smoother collaboration and account management:** Concurrent user invitations and reopening a thread that already has an open context now return clear conflict responses rather than failing unexpectedly.  
* **Faster redirect handling:** Requests that do not match a redirect now use a more efficient lookup.  
* **More efficient access checks:** Agent Site permissions are batched, and Workstream access is resolved once per request in order to improve user experience.