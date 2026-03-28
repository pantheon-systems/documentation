---
title: Next.js Generally Available for Pantheon Customers
published_date: "2026-04-XX"
categories: [nextjs, new-feature]
---

Support for creating Next.js sites is now generally available to Pantheon customers with Gold, Platinum or Diamond Workspaces. Previously, [Next.js was restricted to a private beta program](/release-notes/2025/11/nextjs-private-beta).

![Create new site next.js from the Pantheon Workspace](../../images/nextjs/create-new-site.png)

Hosting for Next.js sites can be purchased at [the same plan levels and pricing](https://pantheon.io/plans/pricing) as WordPress and Drupal sites. Teams running a decoupled architecture in which Next.js reads content from a CMS on Pantheon must purchase two separate plans, though decoupling may allow WordPress or Drupal to run at a smaller plan level.

Since the beginning of our private beta program last November we have added many enhancements including:

* [A cache handler](https://www.npmjs.com/package/@pantheon-systems/nextjs-cache-handler) to coordinate persistent caching and CDN for a Next.js site, often in conjunction with a CMS data source.
* [Defaulting site creation to Next.js 16](/release-notes/2026/03/nextjs-16-support).
* [Setting secret environment variables at site creation](/release-notes/2026/03/secret-setting-at-site-creation).
* Streaming build & runtime logs in the Pantheon dashboard.

For more perspective on this change to general availability, see the Pantheon blog. To learn how to run Next.js on Pantheon, [read our documentation](/nextjs).

