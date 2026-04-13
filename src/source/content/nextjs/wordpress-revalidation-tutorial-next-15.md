---
title: WordPress cache integration for Next.js 15
description: Use Surrogate-Key headers in Next.js 15 to enable edge cache clearing when WordPress content changes
reviewed: "2026-03-10"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/wordpress-revalidation-tutorial-next-15
---


This guide shows you how to associate cache tags with routes in a Next.js 15 site on Pantheon so that Pantheon's edge cache can be selectively cleared when WordPress content changes. It uses `Surrogate-Key` response headers defined in `next.config.mjs`, which Pantheon's internal routers and CDN use to map cache tags to routes.

<Alert title="Next.js 15 only" type="info">

This approach is for **Next.js 15**, which does not support the `'use cache'` directive or `cacheTag()` API. If you are using **Next.js 16**, see [WordPress on-demand revalidation for Next.js](/nextjs/wordpress-revalidation-tutorial), which uses `cacheTag()` to expose `next-cache-tags` headers directly.

</Alert>

## Quick start with test upstreams

If you want to skip the manual setup and get a working site immediately, create a Pantheon site from one of the test upstreams that have WordPress cache invalidation pre-configured:

| Upstream | Next.js Version | Cache Strategy |
|---|---|---|
| `nextjs_15_cache_starter` | 15 | ISR + `Surrogate-Key` headers in `next.config.mjs` |
| `nextjs_16_cache_starter` | 16 | `'use cache'` + `cacheTag()` — adapter exposes tags to internal router |

These upstreams include the `@pantheon-systems/nextjs-cache-handler` package, WordPress REST API integration, surrogate key tagging, and a secured revalidation endpoint. To get end-to-end cache invalidation working:

1. Create a site from the upstream.
1. Set `WORDPRESS_API_URL` to your WordPress site's REST API base URL.
1. Set a shared `WEBHOOK_SECRET` on both the Next.js and WordPress sites.
1. Install the [WordPress mu-plugin](/nextjs/wordpress-revalidation-tutorial#add-the-wordpress-mu-plugin) on your WordPress site.
1. Install the [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/) plugin on WordPress so that WordPress' CDN caches are cleared appropriately.

The rest of this guide walks through the Next.js 15 header-based approach in detail.

## How it works

Next.js 15 does not support cache tags like Next.js 16.

Instead, you define `Surrogate-Key` response headers in the `headers` config of `next.config.mjs`. Pantheon's routers and CDN read these headers and associate the listed cache tags with each route. When WordPress content changes and a webhook fires, Pantheon purges only the routes whose `Surrogate-Key` headers contain the matching tags.

The `headers` config supports two mechanisms for building dynamic header values:

* **Path parameters** — Named segments like `:slug` in the `source` pattern can be interpolated into header values. For example, `/blogs/:slug` makes `:slug` available as a variable.
* **Named captures from `has` conditions** — Regex capture groups in query parameter matchers like `(?<categoryId>\\d+)` are available as `:categoryId` in header values.

## Requirements

* Access granted for the [Next.js Private Beta Program](/nextjs/#access--availability)
* A Next.js 15 site on Pantheon (see [Hello World tutorial](/nextjs/hello-world-tutorial) to create one)
* A WordPress site on Pantheon
* Install the following:
  - [Git](https://git-scm.com/)
  - [Terminus](/terminus/install)\*
  - [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin)

\* Requires logging in after installation.

## Configure Surrogate-Key headers

Add the `headers` function to your `next.config.mjs`. Each rule maps a route pattern to a `Surrogate-Key` header whose value contains space-delimited cache tags.

```javascript:title=next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

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

      // Blog listing filtered by tag (e.g. /blogs?tag=12)
      {
        source: '/blogs',
        has: [
          {
            type: 'query',
            key: 'tag',
            value: '(?<tagId>\\d+)',
          },
        ],
        headers: [
          {
            key: 'Surrogate-Key',
            value: 'post-list term-:tagId',
          },
        ],
      },

      // Blog listing with both category and tag filters
      // (e.g. /blogs?category=5&tag=12)
      {
        source: '/blogs',
        has: [
          {
            type: 'query',
            key: 'category',
            value: '(?<categoryId>\\d+)',
          },
          {
            type: 'query',
            key: 'tag',
            value: '(?<tagId>\\d+)',
          },
        ],
        headers: [
          {
            key: 'Surrogate-Key',
            value: 'post-list term-:categoryId term-:tagId',
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

      // Paginated blog listing (e.g. /blogs?page=2)
      {
        source: '/blogs',
        has: [
          {
            type: 'query',
            key: 'page',
            value: '(?<page>\\d+)',
          },
        ],
        headers: [
          {
            key: 'Surrogate-Key',
            value: 'post-list page-:page',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Header values by route

The following table shows the `Surrogate-Key` header value that each route produces and what triggers cache invalidation:

| Route | Surrogate-Key value | Invalidated when |
|---|---|---|
| `/blogs` | `post-list` | Any post changes |
| `/blogs?category=5` | `post-list term-5` | Any post changes or category 5 content changes |
| `/blogs?tag=12` | `post-list term-12` | Any post changes or tag 12 content changes |
| `/blogs?category=5&tag=12` | `post-list term-5 term-12` | Any post, category 5, or tag 12 changes |
| `/blogs/my-post` | `post-my-post post-list` | That specific post or any post list change |
| `/blogs?page=2` | `post-list page-2` | Any post changes or page 2 specific purge |

### Using slug-based routes for categories and tags

If your routes use slugs instead of numeric IDs (for example, `/blogs?category=tutorials` instead of `/blogs?category=5`), adjust the regex capture to match word characters:

```javascript:title=next.config.mjs
{
  source: '/blogs',
  has: [
    {
      type: 'query',
      key: 'category',
      value: '(?<categorySlug>[\\w-]+)',
    },
  ],
  headers: [
    {
      key: 'Surrogate-Key',
      value: 'post-list term-:categorySlug',
    },
  ],
},
```

Make sure the WordPress side sends matching slug-based keys (e.g., `term-tutorials` instead of `term-5`).

## Rule ordering and cumulative headers

Next.js applies headers cumulatively. If multiple rules match a request, all of their headers are added. For example, a request to `/blogs?category=5` matches both the base `/blogs` rule and the category-filtered rule, so the response includes both `post-list` and `post-list term-5`.

If you need exclusive matching — where only the most specific rule applies — use the `missing` condition on the base rule to exclude requests handled by more specific rules:

```javascript:title=next.config.mjs
// Base rule: only applies when no category or tag filter is present
{
  source: '/blogs',
  missing: [
    { type: 'query', key: 'category' },
    { type: 'query', key: 'tag' },
  ],
  headers: [
    {
      key: 'Surrogate-Key',
      value: 'post-list',
    },
  ],
},

// Category-filtered rule
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
```

## Connect WordPress webhooks

The WordPress side of the integration is the same as the Next.js 16 approach. You need:

1. **A revalidation API endpoint** in your Next.js app that receives webhook requests and purges the matching surrogate keys. See [Create the revalidation endpoint](/nextjs/wordpress-revalidation-tutorial#create-the-revalidation-endpoint) in the Next.js 16 tutorial.

1. **A WordPress mu-plugin** that sends webhooks when content changes. See [Add the WordPress mu-plugin](/nextjs/wordpress-revalidation-tutorial#add-the-wordpress-mu-plugin).

1. **Shared secrets** configured on both sites. See [Configure secrets](/nextjs/wordpress-revalidation-tutorial#configure-secrets).

The surrogate key patterns (`post-{id}`, `post-{slug}`, `post-list`, `term-{id}`) must match between the WordPress mu-plugin and your `next.config.mjs` header rules.

## Limitations

The `headers` config in `next.config.mjs` can only interpolate values that are present in the URL — path segments and query parameters. It cannot include data that is resolved at runtime, such as:

* WordPress post IDs looked up from a slug
* Category or tag IDs resolved from a database query
* Any value that requires fetching external data

If you need cache tags based on runtime data (for example, tagging `/blogs/my-post` with `post-123` using the numeric ID), you have two options:

* **Use slug-based keys consistently** on both sides. Configure the WordPress webhook to send `post-my-post` instead of `post-123`, and match that in your `Surrogate-Key` header.
* **Set headers from middleware.** Use Next.js [middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) to set the `Surrogate-Key` header dynamically based on runtime logic. This gives you full control but requires more custom code.

## Next steps

* [WordPress on-demand revalidation for Next.js 16](/nextjs/wordpress-revalidation-tutorial) — If you upgrade to Next.js 16, use `cacheTag()` for more granular, runtime-driven cache tagging.
* [Set environment variables](/nextjs/environment-variables)
* [Deploy to Test and Live environments](/nextjs/test-and-live-env)
  
