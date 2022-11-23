---
title: Pantheon Global CDN
subtitle: Confirm Experience Protection
description: Provide an uninterrupted experience for your users.
categories: [performance]
tags: [cache, cdn]
contributors: [whitneymeredith, michellecolon-pantheon]
layout: guide
showtoc: true
permalink: docs/guides/global-cdn/experience-protection
anchorid: experience-protection
---

Experience Protection provides a seamless, uninterrupted experience for your users. Global CDN will serve a cached version of your page instead of displaying an error if the server is not responding and can't serve a new copy of the page. Global CDN will display the cached version even if it is _stale cache_ (expired). 

## Confirm That Experience Protection Works

You can test how stale cache is served by comparing the header results of a page refresh when the site's Dev environment is live to the header results when Dev is in Maintenance Mode:

<Partial file="global-cdn-test-cache.md" />

You can check your NGINX or Fastly logs for any traffic anomalies or overages when you know what your site's cache currently looks like.

[NGINX logs](/guides/logs-pantheon#available-logs) track all requests made to WordPress or Drupal, but do not include any requests that were served from the edge cache. You can use [GoAccess](/guides/logs-pantheon/nginx-access-logs) to produce a compiled report on the most common requests, such as: 404s, user agents, etc.

[Fastly log](https://docs.fastly.com/en/guides/integrations#_logging-endpoints) extracts can be requested from your Customer Success Engineer. Standard analytics include all pages requested, but will not include service calls and other traffic that does not load the tracking script.

Check your logs for:

- Disproportionate patterns of requests and 404s indicate possible exploits.

- Too many requests to the index paths may indicate a volumetric attack against the domain.

- Heavy requests to administrative and login paths may indicate a generalized CMS exploit attempt.

- Known exploit and excess traffic paths.

## Adjust TTL to Determine Fresh vs. Stale Content

Your site’s CMS page-level caching must be correctly configured to take advantage of Experience Protection.

You can adjust the length of time before the site's cached content is considered stale by adjusting the time-to-live (TTL). Set the cache TTL to a value equal to or higher than 3700 seconds for best results:

- [Drupal](/drupal-cache#drupal-8-performance-configuration) steps to change your your CDN edge settings to serve stale content for a specific amount of time.

- [WordPress](/guides/wordpress-configurations/wordpress-cache-plugin#pantheon-page-cache-plugin-configuration) steps to change your your CDN edge settings to serve stale content for a specific amount of time.

### Session-Style Cookies or `NO_CACHE` Cookies 

You will bypass the cache and will not see cached content if you have session-style cookies set, or a `NO_CACHE` cookie set. For best results:

1. Set the `NO_CACHE` cookie to persist longer than the site’s page cache (this includes logged in users and authenticated traffic). 

Learn more about the exceptions to page caching rules in [Caching: Advanced Topics](/caching-advanced-topics#allow-a-user-to-bypass-the-cache).


## More Resources

- [Fastly on Pantheon](/guides/fastly-pantheon) 

- [Log Files to Pantheon](/guides/logs-pantheon)

- [Clearing Caches for Drupal and WordPress](/clear-caches)

- [Working with Cookies on Pantheon](/cookies)

