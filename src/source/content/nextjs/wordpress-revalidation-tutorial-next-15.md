---
title: WordPress cache integration for Next.js 15
description: Use the Pantheon cache handler to enable automatic edge cache clearing when WordPress content changes
reviewed: "2026-04-13"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/wordpress-revalidation-tutorial-next-15
---

This guide shows you how to integrate WordPress cache invalidation with a Next.js 15 site on Pantheon. The `@pantheon-systems/nextjs-cache-handler` package automatically extracts cache tags from rendered pages and maintains a tag-to-path mapping. When WordPress content changes and `revalidateTag()` is called, the cache handler resolves the affected page paths and clears them from Pantheon's edge CDN.

<Alert title="Next.js 15 and 16" type="info">

This approach works for both **Next.js 15** and **Next.js 16**. The cache handler extracts tags from the internal `x-next-cache-tags` header on cached page data regardless of version. You do not need to define `Surrogate-Key` headers in `next.config.mjs`.

For Next.js 16-specific features like `'use cache'` and `cacheTag()`, see [WordPress on-demand revalidation for Next.js 16](/nextjs/wordpress-revalidation-tutorial).

</Alert>

## Quick start with test upstreams

If you want to skip the manual setup and get a working site immediately, create a Pantheon site from one of the test upstreams that have WordPress cache invalidation pre-configured:

| Upstream | Next.js Version | Cache Strategy |
|---|---|---|
| `nextjs_15_cache_starter` | 15 | ISR + fetch tags — cache handler extracts tags automatically |
| `nextjs_16_cache_starter` | 16 | `'use cache'` + `cacheTag()` — cache handler extracts tags automatically |

These are not `core` upstreams and are not shown by default in `terminus upstream:list`. Use the `--all` flag to find them:

```bash{promptUser: user}
terminus upstream:list --all | grep nextjs
```

These upstreams include the `@pantheon-systems/nextjs-cache-handler` package, WordPress REST API integration, surrogate key tagging, and a secured revalidation endpoint. To get end-to-end cache invalidation working:

1. Create a site from the upstream.
1. Set `WORDPRESS_API_URL` to your WordPress site's REST API base URL.
1. Set a shared `WEBHOOK_SECRET` on both the Next.js and WordPress sites.
1. Install the [WordPress mu-plugin](/nextjs/wordpress-revalidation-tutorial#add-the-wordpress-mu-plugin) on your WordPress site.
1. Install the [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/) plugin on WordPress so that WordPress' CDN caches are cleared appropriately.

The rest of this guide walks through the setup in detail.

## How it works

When you tag your `fetch()` calls with surrogate keys (e.g., `post-list`, `post-123`), the `@pantheon-systems/nextjs-cache-handler` automatically tracks which tags are associated with which pages. When WordPress content changes and `revalidateTag()` is called, the cache handler clears the affected pages from Pantheon's edge CDN.

No `Surrogate-Key` headers in `next.config.mjs` are needed.

## Requirements

* A Next.js 15 site on Pantheon (see [Hello World tutorial](/nextjs/hello-world-tutorial) to create one)
* A WordPress site on Pantheon
* `@pantheon-systems/nextjs-cache-handler` version 0.7.0 or later
* Install the following:
  - [Git](https://git-scm.com/)
  - [Terminus](/terminus/install)\*
  - [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin) (built into Terminus 4.2.0+; earlier versions require the plugin)

\* Requires logging in after installation.

## Install the cache handler

```bash
npm install @pantheon-systems/nextjs-cache-handler
```

## Configure Next.js

Create a `cache-handler.mjs` file in your project root:

```javascript:title=cache-handler.mjs
import { createCacheHandler } from '@pantheon-systems/nextjs-cache-handler';

const CacheHandler = createCacheHandler({
  type: 'auto', // Auto-detect: GCS on Pantheon, file-based locally
});

export default CacheHandler;
```

Reference it in `next.config.mjs`:

```javascript:title=next.config.mjs
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheHandler: path.resolve(__dirname, './cache-handler.mjs'),
  cacheMaxMemorySize: 0, // Disable in-memory cache — use persistent storage
};

export default nextConfig;
```

No `headers` config is needed. The cache handler extracts tags automatically.

## Add fetch tags to your data fetching

Tag your `fetch()` calls with surrogate keys that match what your WordPress mu-plugin sends:

```typescript:title=lib/wordpress.ts
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL
  || 'https://your-site.pantheonsite.io/wp-json/wp/v2';

// Generate surrogate keys from a WordPress post
function generateSurrogateKeys(post) {
  return [
    `post-${post.id}`,
    `post-${post.slug}`,
    'post-list',
    ...(post.categories || []).map(id => `term-${id}`),
    ...(post.tags || []).map(id => `term-${id}`),
  ];
}

export async function getAllPosts() {
  const url = `${WORDPRESS_API_URL}/posts?_embed&per_page=10`;

  // Tags on the fetch call are propagated to the page cache
  const res = await fetch(url, {
    next: {
      tags: ['post-list'],
      revalidate: 300,
    },
  });

  return res.json();
}

export async function getPostBySlug(slug) {
  const url = `${WORDPRESS_API_URL}/posts?_embed&slug=${slug}`;

  const res = await fetch(url, {
    next: {
      tags: [`post-${slug}`, 'post-list'],
      revalidate: 300,
    },
  });

  const posts = await res.json();
  return posts[0] || null;
}
```

The tags you pass to `fetch()` via `next: { tags: [...] }` are automatically propagated by Next.js to the page-level cache. The cache handler extracts them and maps them to the page's URL path.

## Create the revalidation endpoint

Create an API route that receives WordPress webhook requests and calls `revalidateTag()`:

```typescript:title=app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { secret, surrogate_keys } = body;

  // Validate webhook secret
  const headerSecret = request.headers.get('X-Webhook-Secret');
  if (headerSecret !== process.env.WEBHOOK_SECRET
      && secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!Array.isArray(surrogate_keys) || surrogate_keys.length === 0) {
    return NextResponse.json(
      { error: 'surrogate_keys array required' },
      { status: 400 }
    );
  }

  // Revalidate each tag — the cache handler resolves tags to paths
  // and clears those paths from the edge CDN
  const results = [];
  for (const key of surrogate_keys) {
    try {
      revalidateTag(key);
      results.push({ key, status: 'success' });
    } catch (error) {
      results.push({ key, status: 'error', message: String(error) });
    }
  }

  return NextResponse.json({
    message: `Revalidated ${surrogate_keys.length} tags`,
    revalidated_at: new Date().toISOString(),
    results,
  });
}
```

When `revalidateTag('post-list')` is called, the cache handler:

1. Looks up the tag mapping: `post-list → ["/blogs", "/blogs/my-post"]`
2. Deletes the cached page entries for those paths
3. Calls the edge CDN to purge `/blogs` and `/blogs/my-post`

## Connect WordPress webhooks

You need:

1. **A WordPress mu-plugin** that sends webhooks when content changes. See [Add the WordPress mu-plugin](/nextjs/wordpress-revalidation-tutorial#add-the-wordpress-mu-plugin).

1. **Shared secrets** configured on both sites. See [Configure secrets](/nextjs/wordpress-revalidation-tutorial#configure-secrets).

The surrogate key patterns (`post-{id}`, `post-{slug}`, `post-list`, `term-{id}`) must match between the WordPress mu-plugin and your `fetch()` tag values.


## Differences from Next.js 16

| Feature | Next.js 15 | Next.js 16 |
|---|---|---|
| Cache tags set via | `fetch()` with `next: { tags }` | `cacheTag()` in `'use cache'` functions |
| Tags on page cache | Propagated from fetch tags | Explicitly set via `cacheTag()` |
| Cache handler config | `cacheHandler` only | `cacheHandler` + `cacheHandlers.default` |
| `revalidateTag()` args | 1 arg: `revalidateTag(tag)` | 2 args: `revalidateTag(tag, { expire: 0 })` |
| Tag granularity | Tags from fetch calls | All `cacheTag()` values (more granular) |

Both versions use the same cache handler tag extraction mechanism. The main difference is that Next.js 16's `cacheTag()` gives more granular control over which tags are associated with each page.

## Next steps

* [WordPress on-demand revalidation for Next.js 16](/nextjs/wordpress-revalidation-tutorial) — Use `cacheTag()` for more granular, runtime-driven cache tagging.
* [Set environment variables](/nextjs/environment-variables)
* [Deploy to Test and Live environments](/nextjs/test-and-live-env)
  
