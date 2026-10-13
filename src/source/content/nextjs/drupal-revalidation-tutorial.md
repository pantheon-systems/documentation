---
title: Drupal on-demand cache revalidation for Next.js
description: Update Next.js content in real time when Drupal content changes using the Next.js for Drupal module and the Pantheon cache handler
reviewed: "2026-09-18"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/drupal-revalidation-tutorial
---

This tutorial shows you how to keep a Next.js site on Pantheon in sync with a decoupled Drupal backend. When an editor saves content in Drupal, the [Next.js for Drupal](https://www.drupal.org/project/next) (`next`) module calls your Next.js site and tells it exactly what to refresh — no full rebuild required.

## Learning objectives

This tutorial walks you through:

* Installing and configuring `@pantheon-systems/nextjs-cache-handler` for Next.js 16
* Tagging JSON:API reads with Drupal's own cache tags
* Creating a revalidation API route that accepts requests from the `next` module
* Choosing and configuring a Drupal revalidator plugin
* Configuring the shared revalidate secret on both sites

## Requirements

* A Next.js 16 site and a Drupal 11 backend on Pantheon — see the [Drupal + Next.js Quick Start](/nextjs/drupal-quickstart)
* `drupal/next` 2.x on the Drupal site
* `next-drupal` 2.x in the Next.js project, if you use its client
* [Terminus](/terminus/install), logged in

## How it works

Revalidation has three parts:

1. **Next.js caches and tags data.** JSON:API responses are cached by the Pantheon cache handler and tagged — either with Drupal cache tags such as `node:12` and `node_list:article`, or implicitly by path.

1. **Drupal calls the front end.** When an entity is inserted, updated, or deleted, the `next` module's revalidator plugin sends a `GET` request to your site's revalidate URL.

1. **Next.js clears the matching entries.** The route calls `revalidateTag()` or `revalidatePath()`. The Pantheon cache handler resolves those to stored cache entries, deletes them, and purges the matching paths from Pantheon's edge CDN.

The third step is what makes the cache handler necessary rather than optional. Next.js containers scale horizontally on Pantheon, so an in-memory cache would be per-container and inconsistent. The handler stores cache entries in Google Cloud Storage, shared across every container, and clears the edge CDN when a tag is revalidated.

### What Drupal sends

Both revalidator plugins issue a plain `GET` with query parameters — there is no request body:

| Drupal plugin | Request |
|---|---|
| **Cache Tag** | `GET {revalidate_url}?tags=node:12,node_list,node_list:article&secret={secret}` |
| **Path** | `GET {revalidate_url}?path=/posts/my-post&secret={secret}` |

The `secret` parameter is appended only when a **Revalidate secret** is set on the Drupal `next_site`. The revalidate route below handles both shapes, so you can switch plugins without changing front-end code.

## Set up the cache handler

The `@pantheon-systems/nextjs-cache-handler` package provides the persistent, edge-aware cache described above.

### Install the package

```bash{promptUser: user}
npm install @pantheon-systems/nextjs-cache-handler
```

### Create the cache handlers

Create `cache-handler.mjs` in the root of your project. This handler covers ISR, route handlers, and the `fetch` cache:

```javascript:title=cache-handler.mjs
import { createCacheHandler } from '@pantheon-systems/nextjs-cache-handler';

const CacheHandler = createCacheHandler({
  type: 'auto', // GCS when CACHE_BUCKET is set on Pantheon, file-based locally
});

export default CacheHandler;
```

Create `use-cache-handler.mjs` for the Next.js 16 `'use cache'` directive:

```javascript:title=use-cache-handler.mjs
import { createUseCacheHandler } from '@pantheon-systems/nextjs-cache-handler/use-cache';

const UseCacheHandler = createUseCacheHandler({
  type: 'auto',
});

// Note the `new`. Next.js calls .get()/.set() directly on this exported value
// and will not instantiate the class for you.
export default new UseCacheHandler();
```

<Alert title="Export an instance, not the class" type="danger">

`createUseCacheHandler()` returns a class, but the `cacheHandlers` API expects an instance. If you omit `new`, builds hang for roughly 60 seconds and then fail because `.get`/`.set` are undefined.

</Alert>

<Alert title="Use .mjs, not .ts" type="info">

Cache handlers are loaded by Next.js at runtime, outside the TypeScript compilation pipeline. Node.js executes them directly as ES modules, so give them an `.mjs` extension even in a TypeScript project.

</Alert>

### Configure next.config.mjs

```javascript:title=next.config.mjs
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // Enables the 'use cache' directive, cacheTag(), and cacheLife()
  cacheComponents: true,

  // Handler for ISR, route handlers, and fetch cache
  cacheHandler: path.resolve(__dirname, './cache-handler.mjs'),

  // Next.js 16 handler for 'use cache'
  cacheHandlers: {
    default: path.resolve(__dirname, './use-cache-handler.mjs'),
  },

  // Disables the in-memory cache so all caching goes through the Pantheon handler
  cacheMaxMemorySize: 0,
};

export default nextConfig;
```

<Alert title="cacheComponents and route segment config" type="info">

Next.js rejects `cacheComponents: true` while any page exports route segment config such as `export const dynamic = 'force-dynamic'`. If your pages use it and you are not adopting `'use cache'`, leave out `cacheComponents` and `cacheHandlers` and keep only `cacheHandler`. That still covers the fetch cache, tagging, and `revalidateTag()`. The demo front end is set up this way.

</Alert>

<Alert title="Do not add the package to transpilePackages" type="danger">

Transpiling this package makes the Next.js edge compiler bundle its source and ignore the `edge-light` export condition. That pulls the Node-only handlers into the edge bundle and breaks the build with errors such as `edge runtime does not support Node.js 'fs'` or `Can't resolve 'net'`. Leave it as a normal, externalized dependency.

</Alert>

## Tag your JSON:API reads

Tags are what let Drupal invalidate one article instead of your whole site. Use Drupal's own cache tags so the values match what the Cache Tag revalidator sends: `node:{id}` for a single entity, `node_list:{bundle}` for a listing, `taxonomy_term_list:{vocabulary}` for terms.

```typescript:title=lib/drupal.ts
const DRUPAL_BASE_URL = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;

/**
 * Fetches the article listing.
 * Tagged with node_list:article so any article insert, update, or delete
 * refreshes this listing.
 */
export async function getArticles() {
  const url = `${DRUPAL_BASE_URL}/jsonapi/node/article?sort=-created&include=field_image,field_tags`;

  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.api+json' },
    cache: 'force-cache',
    next: {
      tags: ['node_list:article'],
    },
  });

  if (!response.ok) {
    throw new Error(`JSON:API request failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetches a single article by path alias.
 * JSON:API cannot filter on path aliases, so resolve the alias with the
 * Decoupled Router first. It also returns the internal node ID, which is what
 * Drupal's entity cache tag uses.
 */
export async function getArticleBySlug(slug: string) {
  const route = await fetch(
    `${DRUPAL_BASE_URL}/router/translate-path?path=${encodeURIComponent(`/posts/${slug}`)}`,
    {
      cache: 'force-cache',
      // Aliases change when content does.
      next: { tags: ['node_list'] },
    }
  );

  if (!route.ok) {
    return null;
  }

  const { entity } = await route.json();

  const response = await fetch(
    `${DRUPAL_BASE_URL}/jsonapi/node/article/${entity.uuid}?include=field_image,field_tags`,
    {
      headers: { Accept: 'application/vnd.api+json' },
      cache: 'force-cache',
      next: {
        tags: [`node:${entity.id}`, 'node_list:article'],
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const { data } = await response.json();
  return data;
}
```

<Alert title="Entity tags need the Drupal internal ID" type="info">

JSON:API identifies resources by UUID, while Drupal cache tags use the internal entity ID (`node:12`). The Decoupled Router response above includes it as `entity.id`; otherwise request `drupal_internal__nid` in your `fields` parameter, so your `node:{id}` tags match what Drupal sends.

</Alert>

### Tagging with `'use cache'`

If you use the Next.js 16 `'use cache'` directive, set tags with `cacheTag()` instead:

```typescript:title=lib/drupal.ts
import { cacheTag, cacheLife } from 'next/cache';

export async function getCachedArticles() {
  'use cache';
  cacheLife({ stale: Infinity, revalidate: Infinity, expire: Infinity });
  cacheTag('node_list:article');

  return getArticles();
}
```

Setting every lifetime to `Infinity` makes the entry refresh only when Drupal revalidates it — on-demand invalidation with no time-based expiry.

## Create the revalidation route

Create `app/api/revalidate/route.ts`. This is the route the `next` module calls. It handles both the `tags` and `path` parameters, so it works with either Drupal revalidator plugin:

```typescript:title=app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';

async function handler(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');
  const tags = searchParams.get('tags');
  const secret = searchParams.get('secret');

  // Validate the shared secret set on the Drupal next_site.
  if (!process.env.DRUPAL_REVALIDATE_SECRET
      || secret !== process.env.DRUPAL_REVALIDATE_SECRET) {
    return new Response('Invalid secret.', { status: 401 });
  }

  // The Cache Tag plugin sends `tags`; the Path plugin sends `path`.
  if (!path && !tags) {
    return new Response('Missing path or tags.', { status: 400 });
  }

  try {
    if (path) {
      revalidatePath(path);
    }

    // Next.js 16 accepts a second argument. { expire: 0 } forces immediate
    // expiration so the next request fetches fresh content.
    tags?.split(',').forEach((tag) => revalidateTag(tag.trim(), { expire: 0 }));

    return new Response('Revalidated.');
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}

export { handler as GET, handler as POST };
```

The `next` module sends `GET`, but exporting `POST` as well matches the upstream `next-drupal` reference implementation and lets you trigger revalidation from other tooling.

When `revalidateTag('node_list:article')` runs, the Pantheon cache handler:

1. Looks up the tag mapping, for example `node_list:article → ["/posts", "/posts/my-post"]`
1. Deletes the cached entries for those paths from shared storage
1. Purges those paths from Pantheon's edge CDN

## Configure Drupal

### Set the revalidate URL and secret

1. On your Drupal site, go to `/admin/config/services/next`.
1. Click **Edit** next to your site.
1. Open **On-demand Revalidation** and set:

    - **Revalidate URL**: `https://dev-my-nextjs-site.pantheonsite.io/api/revalidate`
    - **Revalidate secret**: the same value you will set as `DRUPAL_REVALIDATE_SECRET`

1. Click **Save**.

### Choose a revalidator plugin

Configure a revalidator per entity type at `/admin/config/services/next/entity-types`. Sites installed from the demo upstream with version 1.1.0 or later of the `pantheon_nextjs_demo` recipe already use **Cache Tag** for Page, Article, and Event. The `next` module ships two:

| Plugin | Sends | Best for |
|---|---|---|
| **Cache Tag** | `?tags=node:12,node_list,node_list:article` | New builds. Granular, and the tags come from Drupal natively. Pairs directly with `revalidateTag()` and the cache handler's edge purge. |
| **Path** | `?path=/posts/my-post` | Teams migrating an existing decoupled site already using path-based revalidation. Coarser — listing pages must be named manually. |

**To configure Cache Tag revalidation:**

1. Go to `/admin/config/services/next/entity-types`.
1. Click **Configure entity type**, or **Edit** an existing one.
1. Open **On-demand Revalidation** and select **Cache Tag** as the **Plugin**.
1. Leave **Revalidate entity cache tag** and **Revalidate `[entity_type]_list:[bundle]` cache tags** checked. These produce `node:12` and `node_list:article` respectively.
1. Add any **Additional cache tags** your front end uses, one per line.
1. Click **Save**.

**To configure Path revalidation:**

1. Go to `/admin/config/services/next/entity-types`.
1. Click **Configure entity type**, or **Edit** an existing one.
1. Open **On-demand Revalidation** and select **Path** as the **Plugin**.
1. Check **Revalidate page**.
1. Under **Additional paths**, add any listing pages that should also refresh, one per line — for example `/posts`.
1. Click **Save**.

<Alert title="Additional paths are not automatic" type="info">

The Path plugin only revalidates the changed entity's own URL unless you list more. A new article will not appear on `/posts` until you add `/posts` to **Additional paths**. The Cache Tag plugin handles this through `node_list:article` instead.

</Alert>

## Configure the shared secret

The secret on the Drupal `next_site` and the `DRUPAL_REVALIDATE_SECRET` on the Next.js site must match. Set it on the Next.js side with [Terminus Secrets Manager](/guides/secrets), replacing `my-nextjs-site`:

```bash{promptUser: user}
terminus secret:site:set my-nextjs-site DRUPAL_REVALIDATE_SECRET "your-secure-random-secret" --type=env --scope=web,ic --no-interaction
```

Push a commit to your Next.js repository afterward so a new build picks up the value.

## Test the integration

1. Open your Next.js site's `/posts` page and note the content.

1. In Drupal, publish a new Article or edit an existing one.

1. Refresh `/posts`. The change should appear without a rebuild.

1. Open the individual article page and confirm it is current.

If nothing updates, work through the following:

* Turn on debug logging for the `next` module at `/admin/config/services/next/settings`, save a node, then check **Reports → Recent log messages** on Drupal. The log records the exact revalidate URL it called and whether the response was `200`.
* Confirm the secret matches on both sides:

    ```bash{promptUser: user}
    terminus secret:site:list my-nextjs-site
    ```

* Check the Next.js runtime logs for revalidation activity:

    ```bash{promptUser: user}
    terminus node:logs:runtime:get my-nextjs-site.dev
    ```

* Call the route by hand to isolate Drupal from Next.js:

    ```bash{promptUser: user}
    curl -i "https://dev-my-nextjs-site.pantheonsite.io/api/revalidate?tags=node_list:article&secret=your-secure-random-secret"
    ```

    A `200 Revalidated.` means the front end is correct and the problem is on the Drupal side. A `401` means the secrets differ.

* Set `CACHE_DEBUG=true` to log cache handler operations:

    ```bash{promptUser: user}
    terminus secret:site:set my-nextjs-site CACHE_DEBUG "true" --type=env --scope=web,ic --no-interaction
    ```

* Verify your `next: { tags: [...] }` values match the tags Drupal sends. A mismatch silently revalidates nothing.

## Conclusion

Your Drupal backend now keeps the Next.js front end current through targeted invalidation. When content changes, only the affected cache entries and edge paths are cleared — everything else keeps serving from cache.

To continue:

* [Drupal draft preview for Next.js](/nextjs/drupal-preview-tutorial)
* [Set environment variables](/nextjs/environment-variables)
* [Deploy to Test and Live environments](/nextjs/test-and-live-env)
