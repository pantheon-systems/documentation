---
title: WordPress on-demand revalidation for Next.js
description: Update Next.js content in real time when WordPress posts change using webhook-driven cache revalidation
reviewed: "2026-02-19"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/wordpress-revalidation-tutorial
---

<Partial file="nextjs-pre-ga.md" />

This tutorial shows you how to keep a Next.js site on Pantheon in sync with a WordPress CMS using on-demand, tag-based cache revalidation. When you publish or update a post in WordPress, a webhook fires and tells Next.js exactly which cached data to refresh — no full rebuild required.

## Learning objectives

This tutorial walks you through:

* Setting up `@pantheon-systems/nextjs-cache-handler` in a Next.js project
* Tagging cached WordPress data with surrogate keys in Next.js
* Creating a revalidation API endpoint in Next.js that accepts webhook requests
* Adding a WordPress mu-plugin that sends webhooks when content changes
* Configuring shared secrets on both sites via Terminus Secrets Manager

## Requirements

* Access granted for the [Next.js Private Beta Program](/nextjs/#access--availability)
* A Next.js 16 site on Pantheon (see [Hello World tutorial](/nextjs/hello-world-tutorial) to create one)
* A WordPress site on Pantheon
* A GitHub account with [SSH configured](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh)
* Install the following:
  - [Git](https://git-scm.com/)
  - [Terminus](/terminus/install)\*
  - [Terminus Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin)

\* Requires logging in after installation.

<Alert title="Next.js 16 required" type="info">

This tutorial uses the `'use cache'` directive, `cacheTag()`, and `cacheLife()` APIs, which require Next.js 16. Pantheon currently provisions Next.js 15 sites by default. To upgrade, follow the [official Next.js upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading) or create your site using an existing repository with a Next.js 16 codebase.

</Alert>

## How it works

The revalidation flow has three parts:

1. **Next.js fetches and tags data.** When your Next.js pages request WordPress content, the responses are cached and tagged with surrogate keys like `post-list`, `post-{id}`, `post-{slug}`, and `term-{id}`.

1. **WordPress sends a webhook.** When you publish, update, or delete a post in WordPress, a mu-plugin extracts the relevant surrogate keys and sends them to your Next.js revalidation endpoint.

1. **Next.js revalidates matching cache entries.** The endpoint calls `revalidateTag()` for each received key, so only the affected pages are refreshed on the next request.

Both sides use the same surrogate key pattern, which enables targeted invalidation instead of a full cache purge.

## Set up the cache handler

The `@pantheon-systems/nextjs-cache-handler` package provides persistent caching across Pantheon's horizontally scaled containers. Install it and configure both the legacy cache handler and the Next.js 16 `'use cache'` handler.

### Install the package

```bash{promptUser: user}
npm install @pantheon-systems/nextjs-cache-handler
```

### Create the legacy cache handler

Create `cache-handler.mjs` in the root of your project:

```javascript:title=cache-handler.mjs
import { createCacheHandler } from '@pantheon-systems/nextjs-cache-handler';

const CacheHandler = createCacheHandler({
  type: 'auto',
});

export default CacheHandler;
```

### Create the use cache handler

Create `use-cache-handler.mjs` in the root of your project. This handler supports the Next.js 16 `'use cache'` directive:

```javascript:title=use-cache-handler.mjs
import { createUseCacheHandler } from '@pantheon-systems/nextjs-cache-handler';

globalThis.__pantheonSurrogateKeyTags = globalThis.__pantheonSurrogateKeyTags || [];

const UseCacheHandlerClass = createUseCacheHandler({
  type: 'auto',
});

const handler = new UseCacheHandlerClass();

export default {
  get: handler.get.bind(handler),
  set: handler.set.bind(handler),
  refreshTags: handler.refreshTags.bind(handler),
  getExpiration: handler.getExpiration.bind(handler),
  updateTags: handler.updateTags.bind(handler),
};
```

### Configure next.config.mjs

Update your `next.config.mjs` to register both cache handlers and enable the `'use cache'` directive:

```javascript:title=next.config.mjs
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  cacheComponents: true,

  cacheHandler: path.resolve(__dirname, './cache-handler.mjs'),

  cacheHandlers: {
    default: path.resolve(__dirname, './use-cache-handler.mjs'),
    remote: path.resolve(__dirname, './use-cache-handler.mjs'),
  },

  cacheMaxMemorySize: 0,

  transpilePackages: ['@pantheon-systems/nextjs-cache-handler'],
};

export default nextConfig;
```

Key settings:

* `output: 'standalone'` — Required for Pantheon deployment.
* `cacheComponents: true` — Enables the `'use cache'` directive.
* `cacheHandler` — Legacy handler for ISR, route handlers, and fetch cache.
* `cacheHandlers` — Next.js 16 handlers for `'use cache'`.
* `cacheMaxMemorySize: 0` — Disables the default in-memory cache so all caching goes through the Pantheon cache handler.

## Tag cached data with surrogate keys

Your Next.js application needs to tag cached WordPress data with surrogate keys so the revalidation endpoint knows which cache entries to invalidate. This example uses a `lib/wordpressService.ts` file that wraps WordPress REST API calls.

### Low-level fetch functions

These functions call the WordPress REST API and tag the fetch-level cache using `next: { tags: [...] }`:

```typescript:title=lib/wordpressService.ts
async function fetchAllWPPosts(): Promise<{ posts: BlogPost[]; surrogateKeys: string[] }> {
  const url = `${WORDPRESS_API_URL}/posts?_embed&per_page=100&status=publish&orderby=date&order=desc`;

  const response = await fetch(url, {
    headers: { 'Accept': 'application/json' },
    next: {
      tags: ['post-list'],
    }
  });

  const wpPosts: WPPost[] = await response.json();
  const allKeys = wpPosts.flatMap(post => generateSurrogateKeys(post));
  const uniqueKeys = [...new Set(allKeys)];

  return { posts: wpPosts.map(transformWordPressPost), surrogateKeys: uniqueKeys };
}

async function fetchSingleWPPost(slug: string): Promise<{ post: BlogPost | null; surrogateKeys: string[] }> {
  const url = `${WORDPRESS_API_URL}/posts?_embed&slug=${encodeURIComponent(slug)}&status=publish`;

  const response = await fetch(url, {
    headers: { 'Accept': 'application/json' },
    next: {
      tags: [`post-${slug}`],
    }
  });

  const wpPosts: WPPost[] = await response.json();
  const surrogateKeys = generateSurrogateKeys(wpPosts[0]);

  return { post: transformWordPressPost(wpPosts[0]), surrogateKeys };
}
```

* `fetchAllWPPosts` tags the fetch cache with `post-list` so any change to the post listing triggers revalidation.
* `fetchSingleWPPost` tags with `post-{slug}` for per-post invalidation.

### Surrogate key generation

The `generateSurrogateKeys` function produces a consistent set of cache tags from a WordPress post. The same pattern is used on the WordPress side:

```typescript:title=lib/wordpressService.ts
function generateSurrogateKeys(wpPost: WPPost): string[] {
  const keys: string[] = [];

  keys.push(`post-${wpPost.id}`);
  keys.push(`post-${wpPost.slug}`);
  keys.push('post-list');

  if (wpPost.categories) {
    wpPost.categories.forEach(categoryId => keys.push(`term-${categoryId}`));
  }
  if (wpPost.tags) {
    wpPost.tags.forEach(tagId => keys.push(`term-${tagId}`));
  }

  return [...new Set(keys)];
}
```

### Cached wrapper functions

These exported functions use the `'use cache'` directive with infinite `cacheLife` and apply `cacheTag()` for each surrogate key. They rely entirely on on-demand revalidation to refresh:

```typescript:title=lib/wordpressService.ts
export async function fetchWordPressPostsWithMetadata(): Promise<{
  posts: BlogPost[];
  cachedAt: string;
}> {
  'use cache';
  cacheLife({ stale: Infinity, revalidate: Infinity, expire: Infinity });

  const { posts, surrogateKeys } = await fetchAllWPPosts();
  surrogateKeys.forEach(key => cacheTag(key));

  return { posts, cachedAt: new Date().toISOString() };
}

export async function fetchWordPressPostWithMetadata(slug: string): Promise<{
  post: BlogPost | null;
  cachedAt: string;
}> {
  'use cache';
  cacheLife({ stale: Infinity, revalidate: Infinity, expire: Infinity });

  const { post, surrogateKeys } = await fetchSingleWPPost(slug);
  surrogateKeys.forEach(key => cacheTag(key));

  return { post, cachedAt: new Date().toISOString() };
}
```

Your page components call these functions directly. For example, `app/blogs/page.tsx` calls `fetchWordPressPostsWithMetadata()` and `app/blogs/[slug]/page.tsx` calls `fetchWordPressPostWithMetadata(slug)`.

## Create the revalidation endpoint

Create `app/api/revalidate/route.ts` in your Next.js project. This endpoint receives webhook requests from WordPress and calls `revalidateTag()` for each surrogate key:

```typescript:title=app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

function validateWebhookSecret(request: NextRequest, bodySecret?: string): boolean {
  if (!WEBHOOK_SECRET) {
    console.warn('[Revalidate] WEBHOOK_SECRET not set');
    return true;
  }

  const headerSecret = request.headers.get('X-Webhook-Secret');
  if (headerSecret === WEBHOOK_SECRET) return true;
  if (bodySecret === WEBHOOK_SECRET) return true;

  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, surrogate_keys } = body;

    if (!validateWebhookSecret(request, secret)) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid webhook secret' },
        { status: 401 }
      );
    }

    if (!surrogate_keys || !Array.isArray(surrogate_keys) || surrogate_keys.length === 0) {
      return NextResponse.json(
        { error: 'surrogate_keys array is required' },
        { status: 400 }
      );
    }

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
      message: `Revalidated ${surrogate_keys.length} cache tags`,
      revalidated_at: new Date().toISOString(),
      results,
    }, {
      headers: {
        'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate',
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process webhook', message: String(error) },
      { status: 500 }
    );
  }
}
```

The endpoint validates the shared secret from either the `X-Webhook-Secret` header or the request body, then iterates over the `surrogate_keys` array and revalidates each tag.

## Add the WordPress mu-plugin

Create `wp-content/mu-plugins/nextjs-webhook.php` on your WordPress site. This plugin sends a webhook to your Next.js revalidation endpoint whenever a post is published, updated, or deleted.

```php:title=wp-content/mu-plugins/nextjs-webhook.php
<?php
/**
 * Plugin Name: Next.js Webhook
 * Description: Triggers Next.js revalidation when WordPress content changes
 * Version: 1.0.0
 * Author: Pantheon
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Configuration management for Next.js webhook integration.
 * Reads secrets from Pantheon Secrets Manager or wp-config constants.
 */
class NextJS_Webhook_Config {
    public static function get_webhook_url() {
        if (function_exists('pantheon_get_secret')) {
            $url = pantheon_get_secret('NEXTJS_WEBHOOK_URL');
            if (!empty($url)) {
                return $url;
            }
        }
        if (defined('NEXTJS_WEBHOOK_URL')) {
            return NEXTJS_WEBHOOK_URL;
        }
        return null;
    }

    public static function get_webhook_secret() {
        if (function_exists('pantheon_get_secret')) {
            $secret = pantheon_get_secret('NEXTJS_WEBHOOK_SECRET');
            if (!empty($secret)) {
                return $secret;
            }
        }
        if (defined('NEXTJS_WEBHOOK_SECRET')) {
            return NEXTJS_WEBHOOK_SECRET;
        }
        return null;
    }

    public static function is_configured() {
        return !empty(self::get_webhook_url()) && !empty(self::get_webhook_secret());
    }
}

/**
 * Generates surrogate keys for cache invalidation.
 */
class NextJS_Surrogate_Keys {
    public static function get_post_keys($post_id) {
        $keys = array();

        $keys[] = 'post-' . $post_id;
        $keys[] = 'post-list';

        $post = get_post($post_id);
        if ($post && !empty($post->post_name)) {
            $keys[] = 'post-' . $post->post_name;
        }

        if ($post) {
            $taxonomies = get_object_taxonomies($post->post_type);
            foreach ($taxonomies as $taxonomy) {
                $terms = wp_get_post_terms($post_id, $taxonomy, array('fields' => 'ids'));
                if (!is_wp_error($terms)) {
                    foreach ($terms as $term_id) {
                        $keys[] = 'term-' . $term_id;
                    }
                }
            }
        }

        return array_unique($keys);
    }
}

/**
 * Sends webhook requests to the Next.js revalidation endpoint.
 */
class NextJS_Webhook_Delivery {
    public static function send_webhook($post_id, $slug, $surrogate_keys = array()) {
        if (!NextJS_Webhook_Config::is_configured()) {
            return false;
        }

        $webhook_url = NextJS_Webhook_Config::get_webhook_url();
        $webhook_secret = NextJS_Webhook_Config::get_webhook_secret();

        $payload = array(
            'postId'         => $post_id,
            'slug'           => $slug,
            'surrogate_keys' => $surrogate_keys,
            'secret'         => $webhook_secret,
        );

        $args = array(
            'method'   => 'POST',
            'timeout'  => 5,
            'blocking' => false,
            'headers'  => array(
                'Content-Type'     => 'application/json',
                'X-Webhook-Secret' => $webhook_secret,
            ),
            'body' => wp_json_encode($payload),
        );

        $response = wp_remote_post($webhook_url, $args);

        if (is_wp_error($response)) {
            error_log(sprintf(
                'Next.js webhook failed for post %d: %s',
                $post_id,
                $response->get_error_message()
            ));
            return false;
        }

        return true;
    }
}

/**
 * Hooks into WordPress post lifecycle events.
 */
class NextJS_Webhook_Hooks {
    public static function init() {
        add_action('transition_post_status', array(__CLASS__, 'on_post_transition'), 10, 3);
        add_action('before_delete_post', array(__CLASS__, 'on_post_delete'), 10, 2);
    }

    public static function on_post_transition($new_status, $old_status, $post) {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        if (wp_is_post_revision($post->ID)) {
            return;
        }
        if ($post->post_type !== 'post') {
            return;
        }

        $is_publishing = ($new_status === 'publish');
        $is_unpublishing = ($old_status === 'publish' && $new_status !== 'publish');

        if (!$is_publishing && !$is_unpublishing) {
            return;
        }

        $slug = $post->post_name;
        $surrogate_keys = NextJS_Surrogate_Keys::get_post_keys($post->ID);
        NextJS_Webhook_Delivery::send_webhook($post->ID, $slug, $surrogate_keys);
    }

    public static function on_post_delete($post_id, $post) {
        if ($post->post_type !== 'post') {
            return;
        }

        $slug = $post->post_name;
        $surrogate_keys = NextJS_Surrogate_Keys::get_post_keys($post_id);
        NextJS_Webhook_Delivery::send_webhook($post_id, $slug, $surrogate_keys);
    }
}

NextJS_Webhook_Hooks::init();
```

The plugin has four parts:

* **NextJS_Webhook_Config** reads the webhook URL and secret from Pantheon Secrets Manager, with a fallback to `wp-config.php` constants.
* **NextJS_Surrogate_Keys** generates cache tags (`post-{id}`, `post-{slug}`, `post-list`, `term-{id}`) that match the Next.js side.
* **NextJS_Webhook_Delivery** sends a non-blocking POST request to the Next.js revalidation endpoint.
* **NextJS_Webhook_Hooks** fires the webhook on post publish, update, unpublish, and delete events. It skips autosaves, revisions, and non-post post types.

## Configure secrets

Both sites need shared secrets to authenticate the webhook. Set them using [Terminus Secrets Manager](/guides/secrets).

### Next.js site

Set the WordPress API URL and the webhook secret that the revalidation endpoint uses to validate incoming requests. Replace `my-nextjs-site` with your site name:

```bash{promptUser: user}
terminus secret:site:set my-nextjs-site WORDPRESS_API_URL https://dev-my-wp-site.pantheonsite.io/wp-json/wp/v2 --type=env --scope=web,ic --no-interaction
```

```bash{promptUser: user}
terminus secret:site:set my-nextjs-site WEBHOOK_SECRET your-secure-random-secret --type=env --scope=web,ic --no-interaction
```

### WordPress site

Set the revalidation endpoint URL and the shared webhook secret. Replace `my-wp-site` with your WordPress site name:

```bash{promptUser: user}
terminus secret:site:set my-wp-site NEXTJS_WEBHOOK_URL https://dev-my-nextjs-site.pantheonsite.io/api/revalidate --type=env --scope=web --no-interaction
```

```bash{promptUser: user}
terminus secret:site:set my-wp-site NEXTJS_WEBHOOK_SECRET your-secure-random-secret --type=env --scope=web --no-interaction
```

<Alert title="Use the same secret value" type="info">

The `WEBHOOK_SECRET` on the Next.js site and `NEXTJS_WEBHOOK_SECRET` on the WordPress site must be the same value. Generate a strong random string for this secret.

</Alert>

### Trigger a build

After setting secrets, push a commit to your Next.js repository to trigger a new build so the environment variables take effect.

## Test the integration

With both sites configured, verify that content changes in WordPress automatically update your Next.js site:

1. Open your Next.js site's `/blogs` page in a browser and note the cached timestamp.

1. In WordPress, publish a new post or edit an existing one.

1. Refresh the `/blogs` page on your Next.js site. The page should reflect the updated content with a new cached timestamp.

1. Navigate to `/blogs/{slug}` for the post you changed and confirm the content is up to date.

If the content does not update, check the following:

* Verify that the secrets are set correctly on both sites using `terminus secret:site:list`.
* Review the Next.js application logs for revalidation messages using `terminus node:logs`.
* Confirm the mu-plugin file is in `wp-content/mu-plugins/` and is loaded by WordPress.

## Conclusion

You now have a WordPress site that automatically keeps your Next.js pages up to date through targeted cache revalidation. When content changes in WordPress, only the affected cache entries are invalidated — the rest of your site continues serving cached responses.

To continue building your Next.js site on Pantheon:

* [Set environment variables](/nextjs/environment-variables)
* [Deploy to Test and Live environments](/nextjs/test-and-live-env)
* [Connect a custom domain](/nextjs/connecting-custom-domain)
