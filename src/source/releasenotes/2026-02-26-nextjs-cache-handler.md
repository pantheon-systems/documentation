---
title: "Next.js Cache Handler package now available"
published_date: "2026-02-26"
categories: [nextjs, new-feature]
---

The [`@pantheon-systems/nextjs-cache-handler`](https://www.npmjs.com/package/@pantheon-systems/nextjs-cache-handler) package is now publicly available. This custom cache handler for Next.js provides support for Google Cloud Storage and file-based caching, designed for Pantheon's Next.js hosting platform.

## Features

* **Next.js 16 `use cache` support** - Handlers for the new `cacheHandlers` API introduced in Next.js 16.
* **Tag-based invalidation** - Efficient cache invalidation using tag mapping.
* **Edge cache clearing** - Automatic CDN cache invalidation on Pantheon infrastructure.
* **Build-aware caching** - Automatically invalidates route cache on new builds while preserving data cache.
* **Dual cache handlers** - Support for both Google Cloud Storage (production) and file-based (development) caching.

## Getting started

Install the package:

```bash
npm install @pantheon-systems/nextjs-cache-handler
```

Then configure your Next.js application to use the cache handler. For full setup instructions, usage examples, and configuration options, see the [README on GitHub](https://github.com/pantheon-systems/nextjs-cache-handler).
