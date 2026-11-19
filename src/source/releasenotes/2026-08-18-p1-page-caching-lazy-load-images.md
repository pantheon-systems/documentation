---
title: "Unlock Speed: Cache Pages and Lazy Load Images Now"
published_date: "2026-08-18"
published_at: "2026-08-18T17:00:00Z"
categories: [p1, performance]
description: "Discover performance gains: cached pages and default lazy-loaded images are here. Update now to improve load times and database efficiency. See the details."
---

**Published pages are now cached:** P1 published pages are served from cache instead of being rendered on every request — faster loads and dramatically lower database load under traffic.

⚠️ **Action required:** update to 0.11.0 and redeploy each renderer (caching applies only after redeploy). See breaking-change note above for custom renderers.

**Images lazy-load by default:** Images in primitive and custom blocks now lazy-load, improving initial page load. Applies to existing content automatically after you update.

⚠️ **Action required:** set **Loading = "Eager"** on above-the-fold images (hero, first row) so they don't defer and hurt Largest Contentful Paint.

## Fixes

* **New projects scaffold cleanly** from the starter kit. _(Re-scaffold projects generated with an earlier version.)_
* **Block selection is cleared when you open a different page** (no stale selection carried over).
