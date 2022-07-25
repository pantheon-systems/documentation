---
title: Pantheon Global CDN
subtitle: Introduction
description: Improve site performance and security with Pantheon's Global CDN.
categories: [performance]
tags: [cache, cdn, launch, security]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/global-cdn
anchorid: global-cdn
---

Pantheon's [Global CDN](https://pantheon.io/features/global-cdn) is a core platform offering that provides improved performance and security for customer sites. Global CDN supports caching to accelerate both static content and anonymous pages for sites on the platform. By serving data from cache servers all over the world, website visitors receive a response without waiting to access the application container. 

## Points of Presence 

Global CDN allows you to tap into powerful and strategically distributed CHI metro Points of Presence (POPs) around the globe, where site pages and assets are cached, and [HTTPS](/guides/global-cdn/https) certificates are fully managed using [Let's Encrypt](https://letsencrypt.org). When a website uses these CHI metro POPs effectively, the site can free up its PHP workers and database to process more dynamic requests. Each POP can handle hundreds of thousands of requests per second, much more than a site's own PHP and database containers.

See [Points of Presence Workflow](/guides/global-cdn/global-cdn-caching#points-of-presence-workflow) for more details.

<Enablement title="Agency WebOps Training" link="https://pantheon.io/learn-pantheon?docs">

Get the most out of Global CDN with help from the experts at Pantheon. We deliver on-demand training to help development teams master the platform and improve internal WebOps. 

</Enablement>

## How Does Global CDN Work?

Global CDN takes Pantheon's high-performance page and asset caching system, [Varnish](/cache-control#see-also), and pushes it out globally. Rather than requests coming all the way to our primary data center, we terminate HTTPS and serve pages from a location much closer to the end-user. This speeds up the time to render a web-page significantly.

## Benefits of Pantheon's Global CDN

- **SOC 2 compliance:** Global CDN protects against DDoS attacks that target network layers (layer 3/4) or application layers (layer 7). DDoS attacks vary in method, but all have the same goal of interfering with content on your site.

- **Origin shields:** Global CDN uses origin shields to protect sites from traffic overloads while maintaining high availability and redundancy in your setup. Origin shields also help reduce the risk of DDoS attacks. Refer to [DDoS Attack Mitigation](/optimize-site-traffic#dos-attack-mitigation) for more information.

- **Eliminate cache sharding:** Global CDN's cache strategy eliminates cache sharding, in which the same content is cached in separate edge cache instances. This results in higher cache hit rates.

- **Dynamically expire selected content:** Global CDN includes interfaces to dynamically expire selected content from the cache, rather than doing a full cache flush. There are basic implementations available as Drupal modules and WordPress plugins, as well as a developer API for implementing custom cache tagging/clearing behavior.

Many users see multi-second speedups in Visual Progress <Popover title="Visual Progress" content="The pace at which content renders on the visible page" /> even within the continental US when they first turn on Global CDN. International users will benefit even more:

![Example before and after page load time](../../../images/global-cdn-time-to-load.png)

## Cache Clearing

We recommend installing the Pantheon Advanced Page Cache to take advantage of the granular cache clearing capabilities of the Global CDN. 

- [Advanced Page Cache plugin for WordPress](https://wordpress.org/plugins/pantheon-advanced-page-cache/)

- [Advanced Page Cache module for Drupal](https://www.drupal.org/project/pantheon_advanced_page_cache)

Additionally, you can remove all pages from cache in the Site Dashboard under Site Admin or from the command line.

For more details, see [Clearing Caches for Drupal and WordPress](/clear-caches).

## More Resources

- [Caching: Advanced Topics](/caching-advanced-topics)

- [Debug Common Cache Busters](/guides/frontend-performance/caching#troubleshoot-caching-issues)

- [Traffic Limits and Overages](/traffic-limits)

- [Fastly on Pantheon](/guides/fastly-pantheon) 

