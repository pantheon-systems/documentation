---
title: Cache Control Manual
subtitle: Pantheon's Global CDN
description: Handle more traffic by controlling cache on Pantheon's Global content distribution network.
tags: [performance]
layout: guide
type: guide
guidetoc: true
anchorid: cache
cache: true
generator: pagination
pagination:
    provider: data.cachecontrolpages
use:
    - cachecontrolpages
permalink: docs/guides/cache/
nexturl: guides/cache/hit/
nextpage: Cache a Page
editpath: cache/01-cache.md
---

Pantheon’s Global Edge provides an out-of-the box Content Delivery Network (CDN) with performance and security benefits for every site, regardless of service level. This allows sites to scale for higher traffic with faster response times by serving anonymous visitors cached content from the closest point of presence (POP) instead of processing the request at the application level.

<div class="panel panel-video panel-guide">
  <script src="//fast.wistia.com/embed/medias/pugjxn19gi.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_pugjxn19gi videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
</div>

## Origin Shield
The Origin Shield helps optimize cache hits by checking a single, central pool of cached content - instead of checking one of many caching endpoints. This in an improvement from our legacy edge service, which used multiple Varnish servers increasing the potential for multiple cache misses in a row.

## Global Points of Presence Locations
**TODO**: Work with design team to replace graphic

![Global CDN POP](/source/docs/assets/images/pop.jpg)

If the nearest POP does not have a cached version of the response, the request is routed to the application running on Pantheon and gets cached on it’s way back to the browser.

## Advanced Page Caching?
## Free and Automated HTTPS?
## What else?
**TODO**: Rewrite/refine all contents on this page with the help of marketing. Identify features to cover and specify which are configurable.

## Considerations
- **TODO**: Identify expected scenarios in which a user would need to configure a 3rd party CDN service.
