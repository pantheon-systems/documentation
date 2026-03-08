---
title: "Next.js Cache Handler package now available"
published_date: "2026-02-26"
categories: [nextjs, new-feature]
---

The [`@pantheon-systems/nextjs-cache-handler`](https://www.npmjs.com/package/@pantheon-systems/nextjs-cache-handler) package is now publicly available. It enables persistent caching on Pantheon's Next.js platform, so your cached data survives across deployments and server restarts.

## Features

* **Works out of the box on Pantheon** — The handler auto-detects your environment. No extra configuration needed beyond installing the handler in your Next.js application. 
* **Full support for Next.js caching APIs** — `revalidateTag()`, `revalidatePath()`, and ISR work as expected, including automatic CDN cache invalidation so your visitors see updates immediately.
* **Next.js 16 `use cache` support** — Compatible with the new `cacheHandlers` API and `'use cache'` directive introduced in Next.js 16.
* **Smart build deploys** — When you deploy a new build, page caches refresh automatically while your data caches are preserved, avoiding unnecessary re-fetches from APIs and databases.
* **Local development friendly** — Uses file-based caching in development so you can test caching behavior locally without any cloud dependencies.
* **Debug logging** — Set `CACHE_DEBUG=true` to see detailed cache hit/miss/set activity for troubleshooting.

## Getting started

Install the package:

```bash
npm install @pantheon-systems/nextjs-cache-handler
```

Then configure your Next.js application to use the cache handler. For full setup instructions, usage examples, and configuration options, see the [README on GitHub](https://github.com/pantheon-systems/nextjs-cache-handler).
