---
title: Pantheon Global CDN
subtitle: Confirm Experience Protection
description: Provide an uninterrupted experience for your users.
categories: [performance]
tags: [cache, cdn]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/global-cdn/experience-protection
anchorid: experience-protection
---

The goal of Experience Protection is to provide a seamless, uninterrupted experience for the user. If the server is not responding and can't serve a new copy of a page, Global CDN will choose to serve a cached version instead of displaying an error, even if the cached version has expired (this is called _stale cache_).

## Adjust TTL to Determine Fresh vs. Stale Content

Adjust the length of time before the site's cached content is considered stale by adjusting the time-to-live (TTL).

Your site’s CMS page-level caching must be correctly configured to take advantage of Experience Protection.

You can adjust your CDN edge configuration on [Drupal](/drupal-cache#drupal-8-performance-configuration) and [WordPress](/wordpress-cache-plugin#pantheon-page-cache-plugin-configuration) to serve stale content for a specific amount of time.

For best results, set the cache TTL to a value equal to or higher than 3700 seconds.

If you have session-style cookies set, or a `NO_CACHE` cookie set, you will bypass the cache, and will not see cached content. For best results, set the `NO_CACHE` cookie to persist longer than the site’s page cache (this includes logged in users and authenticated traffic). Learn more about the exceptions to page caching rules in [Caching: Advanced Topics](/caching-advanced-topics#allow-a-user-to-bypass-the-cache).

## Confirm That Experience Protection Works

To test how stale cache is served, compare the header results of a page refresh when the site's Dev environment is live to the header results when Dev is in Maintenance Mode:

<Partial file="global-cdn-test-cache.md" />

When you know what your site's cache currently looks like, you can check your NGINX or Fastly logs for any traffic anomalies or overages.

[NGINX logs](/logs#available-logs) track all requests made to WordPress or Drupal, but do not include any requests that were served from the edge cache. You can use [GoAccess](/nginx-access-log) to produce a compiled report on the most common requests, such as: 404s, user agents, etc.

Fastly log extracts can be requested from your Customer Success Engineer. Standard analytics include all pages requested, but will not include service calls and other traffic that does not load the tracking script.

In your log report, you want to look for:

- Disproportionate patterns of requests and 404s indicate possible exploits.

- Too many requests to the index paths may indicate a volumetric attack against the domain.

- Heavy requests to administrative and login paths may indicate a generalized CMS exploit attempt.

- Known exploit and excess traffic paths.


## More Resources

- [Fastly on Pantheon](/guides/fastly-pantheon) 

- [Clearing Caches for Drupal and WordPress](/clear-caches)

- [Working with Cookies on Pantheon](/cookies)

