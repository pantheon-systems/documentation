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

Pantheon's [Global CDN](https://pantheon.io/features/global-cdn) is a core platform offering that provides improved performance and security for customer sites. Global CDN supports caching to accelerate both static content and anonymous site pages. By serving data from cache servers all over the world, website visitors receive a response without having to wait. 

## How Does Global CDN Work?

Global CDN takes Pantheon's high-performance page and asset caching system, [Varnish](/cache-control#see-also), and pushes it out globally. Rather than requests coming all the way to our primary data center, we terminate HTTPS and serve pages from a location much closer to the end-user. This speeds up the time to render a web page significantly.

Global CDN allows you to tap into powerful and strategically distributed CHI metro Points of Presence (POPs) around the globe. Site pages and assets are cached at these POPs. Your site can free up its PHP workers and database to process more dynamic requests by using these CHI metro POPs. Each POP can handle hundreds of thousands of requests per second, much more than a site's own PHP and database containers.

## Points of Presence Workflow

Every site Pantheon site uses Global CDN. This means that every HTTP request from a website visitor first goes to closest CHI metro [POP](/guides/global-cdn#points-of-presence) to see if there's a regional cache of the content. If the closest POP doesn't have the content, the request will then go to a POP near the origin (i.e. the PHP workers and database). If the content is cached anywhere in the world, the origin POP will have a copy. If neither POP has the appropriate cache data, the request will continue to an application container worker, which will generate responses that may be cached on the way back to the browser.

![Varnish Diagram](../../../images/cdn-flow.png)

Global CDN can also improve the availability of your site. For example, if a PHP fatal error breaks your site, anonymous page requests can still be served by POPs, and end-users won't encounter errors or broken pages.

<Enablement title="Agency WebOps Training" link="https://pantheon.io/learn-pantheon?docs">

Get the most out of Global CDN with help from the experts at Pantheon. We deliver on-demand training to help development teams master the platform and improve internal WebOps. 

</Enablement>

## Benefits of Pantheon's Global CDN

- **SOC 2 compliance:** Global CDN protects against DDoS attacks that target network layers (layer 3/4) or application layers (layer 7). DDoS attacks vary in method, but all have the same goal of interfering with content on your site.

- **Origin shields:** Global CDN uses origin shields to protect sites from traffic overloads while maintaining high availability and redundancy in your setup. Origin shields also help reduce the risk of DDoS attacks. See [Troubleshooting Traffic](/guides/account-mgmt/traffic/remedy) for more information.

- **Eliminate cache sharding:** Global CDN's cache strategy eliminates cache sharding, in which the same content is cached in separate edge cache instances. This results in higher cache hit rates.

- **Dynamically expire selected content:** Global CDN includes interfaces to dynamically expire selected content from the cache, rather than doing a full cache flush. There are basic implementations available through Drupal modules and WordPress plugins, as well as a developer API for implementing custom cache tagging/clearing behavior.

Many users see multi-second speedups in Visual Progress <Popover title="Visual Progress" content="The pace at which content renders on the visible page" /> even within the continental US when they first turn on Global CDN. International users will benefit even more:

![Example before and after page load time](../../../images/global-cdn-time-to-load.png)



## More Resources

- [Caching: Advanced Topics](/caching-advanced-topics)

- [Debug Common Cache Busters](/guides/frontend-performance/caching#troubleshoot-caching-issues)

- [Traffic Limits and Overages](/guides/account-mgmt/traffic)

- [Fastly on Pantheon](/guides/fastly-pantheon) 

