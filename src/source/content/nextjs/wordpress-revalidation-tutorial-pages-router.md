---
title: WordPress cache integration for Next.js Pages Router
description: Use Surrogate-Key headers to enable edge cache clearing for Pages Router sites when WordPress content changes
reviewed: "2026-04-14"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/wordpress-revalidation-tutorial-pages-router
---

This guide shows you how to set up cache invalidation for a Next.js site that uses the **Pages Router** (`pages/` directory with `getStaticProps`). It works with both Next.js 15 and Next.js 16.

## Learning objectives

This tutorial walks you through:

* Configuring `Surrogate-Key` response headers in `next.config.mjs` to associate cache tags with routes
* Setting up `@pantheon-systems/nextjs-cache-handler` for persistent caching
* Creating Pages Router pages with `getStaticProps` and ISR for WordPress data
* Building a revalidation API endpoint that uses `res.revalidate()` for path-based cache purging
* Connecting a WordPress mu-plugin that sends webhooks when content changes
* Configuring shared secrets on both sites via Terminus Secrets Manager

<Alert title="App Router?" type="info">

If your site uses the **App Router** (`app/` directory), you do not need `Surrogate-Key` headers. The cache handler extracts tags automatically. See:

- [WordPress cache integration for Next.js 15 (App Router)](/nextjs/wordpress-revalidation-tutorial-next-15)
- [WordPress on-demand revalidation for Next.js 16 (App Router)](/nextjs/wordpress-revalidation-tutorial)

</Alert>

## Requirements

* A Next.js site on Pantheon using the Pages Router (see [Hello World tutorial](/nextjs/hello-world-tutorial) to create one)
* A WordPress site on Pantheon
* `@pantheon-systems/nextjs-cache-handler` version 0.7.0 or later
* Install the following:
  - [Git](https://git-scm.com/)
  - [Terminus](/terminus/install)\*
  - [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin) (built into Terminus 4.2.0+; earlier versions require the plugin)

\* Requires logging in after installation.

## How it works

You define `Surrogate-Key` response headers in `next.config.mjs` that map route patterns to cache tags. Pantheon's edge CDN reads these headers and associates the listed tags with each route. When WordPress content changes and a webhook fires, the revalidation endpoint calls `res.revalidate()` to regenerate the page, and the cache handler clears the matching paths from the edge CDN.


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

Reference it in `next.config.mjs` and add `Surrogate-Key` headers for your routes:

```javascript:title=next.config.mjs
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheHandler: path.resolve(__dirname, './cache-handler.mjs'),
  cacheMaxMemorySize: 0,

  async headers() {
    return [
      // Blog listing page
      {
        source: '/blogs',
        headers: [
          {
            key: 'Surrogate-Key',
            value: 'post-list',
          },
        ],
      },

      // Individual blog post — :slug is captured from the path
      {
        source: '/blogs/:slug',
        headers: [
          {
            key: 'Surrogate-Key',
            value: 'post-:slug post-list',
          },
        ],
      },

      // Blog listing filtered by category (e.g. /blogs?category=5)
      {
        source: '/blogs',
        has: [
          {
            type: 'query',
            key: 'category',
            value: '(?<categoryId>\\d+)',
          },
        ],
        headers: [
          {
            key: 'Surrogate-Key',
            value: 'post-list term-:categoryId',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Header values by route

| Route | Surrogate-Key value | Invalidated when |
|---|---|---|
| `/blogs` | `post-list` | Any post changes |
| `/blogs/my-post` | `post-my-post post-list` | That specific post or any post list change |
| `/blogs?category=5` | `post-list term-5` | Any post changes or category 5 content changes |

The `headers` config supports:

* **Path parameters** — Named segments like `:slug` in the `source` pattern can be interpolated into header values.
* **Named captures from `has` conditions** — Regex capture groups in query parameter matchers like `(?<categoryId>\\d+)` are available as `:categoryId` in header values.

## Create Pages Router pages

Use `getStaticProps` with ISR for your blog pages:

```typescript:title=pages/blogs/index.tsx
import type { GetStaticProps } from 'next';

const WP_API_URL = process.env.WORDPRESS_API_URL
  || 'https://your-site.pantheonsite.io/wp-json/wp/v2';

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=10`, {
    next: { tags: ['post-list'] },
  });
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 300,
  };
};

export default function BlogsPage({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title.rendered}</h2>
        </article>
      ))}
    </div>
  );
}
```

```typescript:title=pages/blogs/[slug].tsx
import type { GetStaticPaths, GetStaticProps } from 'next';

const WP_API_URL = process.env.WORDPRESS_API_URL
  || 'https://your-site.pantheonsite.io/wp-json/wp/v2';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${WP_API_URL}/posts?per_page=10`);
  const posts = await res.json();

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `${WP_API_URL}/posts?slug=${params.slug}&_embed`, {
      next: { tags: [`post-${params.slug}`, 'post-list'] },
    }
  );
  const posts = await res.json();

  if (posts.length === 0) return { notFound: true };

  return {
    props: { post: posts[0] },
    revalidate: 300,
  };
};

export default function PostPage({ post }) {
  return (
    <div>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}
```

## Create the revalidation endpoint

Pages Router API routes cannot use `revalidateTag()` directly. Instead, use `res.revalidate()` for path-based revalidation. The endpoint receives surrogate keys from WordPress and resolves them to page paths using the `Surrogate-Key` header patterns:

```typescript:title=pages/api/revalidate.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = req.headers['x-webhook-secret'] || req.body?.secret;
  if (secret !== WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { surrogate_keys, paths } = req.body;

  // Option 1: Revalidate by path (recommended for Pages Router)
  if (Array.isArray(paths) && paths.length > 0) {
    const results = [];
    for (const path of paths) {
      try {
        await res.revalidate(path);
        results.push({ path, status: 'success' });
      } catch (error) {
        results.push({ path, status: 'error', message: String(error) });
      }
    }
    return res.json({
      message: `Revalidated ${results.length} paths`,
      revalidated_at: new Date().toISOString(),
      results,
    });
  }

  // Option 2: Revalidate by surrogate keys
  // Map known tags to paths and revalidate those paths
  if (Array.isArray(surrogate_keys) && surrogate_keys.length > 0) {
    const pathsToRevalidate = new Set<string>();

    for (const key of surrogate_keys) {
      // post-list affects the blog listing page
      if (key === 'post-list') {
        pathsToRevalidate.add('/blogs');
      }
      // post-{slug} affects the individual blog post page
      if (key.startsWith('post-') && key !== 'post-list') {
        const slug = key.replace('post-', '');
        pathsToRevalidate.add(`/blogs/${slug}`);
        pathsToRevalidate.add('/blogs'); // listing page too
      }
    }

    const results = [];
    for (const path of pathsToRevalidate) {
      try {
        await res.revalidate(path);
        results.push({ path, status: 'success' });
      } catch (error) {
        results.push({ path, status: 'error', message: String(error) });
      }
    }

    return res.json({
      message: `Revalidated ${pathsToRevalidate.size} paths from ${surrogate_keys.length} tags`,
      revalidated_at: new Date().toISOString(),
      results,
    });
  }

  return res.status(400).json({ error: 'paths or surrogate_keys array required' });
}
```

<Alert title="Pages Router vs App Router revalidation" type="info">

In the **App Router**, `revalidateTag()` invalidates cache entries by tag and the cache handler automatically resolves tags to paths for CDN purging. In the **Pages Router**, you must map tags to paths yourself and use `res.revalidate(path)` instead.

</Alert>

## Connect WordPress webhooks

You need:

1. **A WordPress mu-plugin** that sends webhooks when content changes. See [Add the WordPress mu-plugin](/nextjs/wordpress-revalidation-tutorial#add-the-wordpress-mu-plugin).

1. **Shared secrets** configured on both sites. See [Configure secrets](/nextjs/wordpress-revalidation-tutorial#configure-secrets).

The surrogate key patterns (`post-{slug}`, `post-list`, `term-{id}`) must match between the WordPress mu-plugin and your `Surrogate-Key` header values.

## Rule ordering and cumulative headers

Next.js applies headers cumulatively. If multiple rules match a request, all of their headers are added. If you need exclusive matching — where only the most specific rule applies — use the `missing` condition on the base rule:

```javascript:title=next.config.mjs
// Base rule: only applies when no category filter is present
{
  source: '/blogs',
  missing: [
    { type: 'query', key: 'category' },
  ],
  headers: [
    { key: 'Surrogate-Key', value: 'post-list' },
  ],
},

// Category-filtered rule
{
  source: '/blogs',
  has: [
    { type: 'query', key: 'category', value: '(?<categoryId>\\d+)' },
  ],
  headers: [
    { key: 'Surrogate-Key', value: 'post-list term-:categoryId' },
  ],
},
```

## Limitations

The `headers` config in `next.config.mjs` can only interpolate values from the URL — path segments and query parameters. It cannot include data resolved at runtime (e.g., WordPress post IDs looked up from a slug). Use slug-based keys consistently on both sides to avoid this limitation.

## Next steps

* [WordPress cache integration for Next.js 15 (App Router)](/nextjs/wordpress-revalidation-tutorial-next-15) — App Router with automatic tag extraction.
* [WordPress on-demand revalidation for Next.js 16](/nextjs/wordpress-revalidation-tutorial) — Next.js 16 with `cacheTag()`.
* [Set environment variables](/nextjs/environment-variables)
* [Deploy to Test and Live environments](/nextjs/test-and-live-env)
