---
title: Pantheon Global CDN
subtitle: Introduction
description: Improve Site Performance and Security with Pantheon's Global CDN.
reviewed: "2022-02-11"
categories: [performance]
tags: [cache, cdn, launch, security]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/global-cdn
anchorid: global-cdn
---

Pantheon's [Global CDN](https://pantheon.io/features/global-cdn) is a core platform offering that provides improved performance and security for customer sites. Tap into powerful and strategically distributed CHI metro Points of Presence (POPs) around the globe, where site pages and assets are cached, and [HTTPS](/guides/global-cdn/https) certificates are fully managed using [Let's Encrypt](https://letsencrypt.org).

<Enablement title="Agency WebOps Training" link="https://pantheon.io/learn-pantheon?docs">

Get the most out of Global CDN with help from the experts at Pantheon. We deliver on-demand training to help development teams master the platform and improve internal WebOps. 

</Enablement>

## Benefits of Pantheon's Global CDN

Global CDN is SOC 2 compliant and offers protection against DDoS attacks that target network layers (layer 3/4) or application layers (layer 7). DDoS attacks vary in method, but all have the same goal of interfering with content on your site.

Pantheon's Global CDN also uses origin shields for additional protection. Origin shields protect sites from traffic overloads while maintaining high availability and redundancy in your setup. Origin shields also help reduce the risk of DDoS attacks.

Refer to [DoS Attack Mitigation](/optimize-site-traffic#dos-attack-mitigation) for more information.

## How Does It Work?

Global CDN takes Pantheon's high-performance page and asset caching system (Varnish) and pushes it out globally. Rather than requests coming all the way to our primary data center, we terminate HTTPS and serve pages from a location much closer to the end-user. This speeds up the time to render a web-page significantly.

- The Global CDN cache strategy eliminates "cache sharding," in which the same content needs to be cached in separate edge cache instances. This results in higher cache hit rates.

- Global CDN includes interfaces to dynamically expire selected content from the cache, rather than doing a full cache flush. There are basic implementations available as Drupal modules and WordPress plugins, as well as a developer API for implementing custom cache tagging/clearing behavior.

When we first turned on the Global CDN, we saw multi-second speedups in Visual Progress <Popover title="Visual Progress" content="The pace at which content renders on the visible page" /> even within the continental US. International users will benefit even more:

![Example before and after page load time](../images/global-cdn-time-to-load.png)

## Cache Clearing

We recommend installing the Pantheon Advanced Page Cache [plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/) or [module](https://www.drupal.org/project/pantheon_advanced_page_cache) to take advantage of the granular cache clearing capabilities of the Global CDN. Additionally, you can remove all pages from cache at once from the Site Dashboard, within the Site Admin, and even from the command line.

For more details, see [Clearing Caches for Drupal and WordPress](/clear-caches).

## Experience Protection

Serve your Drupal or WordPress site even in the unlikely event that it goes down.

The goal of Experience Protection is to provide a seamless, uninterrupted experience for the user. If the server is not responding and can't serve a new copy of a page, the CDN will choose to serve a cached version instead of displaying an error, even if the cached version has expired (this is called _stale cache_).

### How long does content stay fresh? Adjust TTL

Adjust the length of time before the site's cached content is considered stale by adjusting the time-to-live (TTL).

Your site’s CMS page-level caching must be correctly configured in order to take advantage of Experience Protection.

On [Drupal](/drupal-cache#drupal-8-performance-configuration) and [WordPress](/wordpress-cache-plugin#pantheon-page-cache-plugin-configuration), you can adjust your CDN edge configuration to serve stale content for a specific amount of time.

For best results, set the cache TTL to a value equal to or over 3700 seconds.

Users with session-style cookies set, or a `NO_CACHE` cookie set will bypass the cache, and will not see cached content. For best results, set the `NO_CACHE` cookie to persist longer than the site’s page cache (this includes logged in users and authenticated traffic). Learn more about the exceptions to page caching rules in [Caching: Advanced Topics](/caching-advanced-topics#allow-a-user-to-bypass-the-cache).

### Confirm That Experience Protection Works

To test how stale cache is served, compare the header results of a page refresh when the site's Dev environment is live to the header results when Dev is in Maintenance Mode:

<Partial file="global-cdn-test-cache.md" />

Once you know what your site's cache currently looks like, you can check your NGINX or Fastly logs for any traffic anomalies or overages.

[NGINX logs](/logs#available-logs) track all requests made to WordPress or Drupal, but do not include any requests that were served from the edge cache. You can use [GoAccess](/nginx-access-log) to produce a compiled report on the most common requests, such as: 404s, user agents, etc.

Fastly log extracts can be requested from your Customer Success Engineer. Standard analytics includes all pages requested, but will not include service calls and other traffic that does not load the tracking script.

In your log report, you want to look for:

- Disproportionate patterns of requests and 404s indicate possible exploits.

- Too many requests to the index paths may indicate a volumetric attack against the domain.

- Heavy requests to administrative and login paths may indicate a generalized CMS exploit attempt.

- Known exploit and excess traffic paths.

Please refer to the following docs for common caching issues:

- [Caching: Advanced Topics](/caching-advanced-topics)
- [Debug Common Cache Busters](/guides/frontend-performance/caching#troubleshoot-caching-issues)
- [Traffic Limits and Overages](/traffic-limits)

