---
title: Cache Control Manual
subtitle: Pantheon's Global CDN
description: Handle more traffic by controlling cache on Pantheon's Global content distribution network.
tags: [performance]
layout: guide
type: guide
anchorid: cache
guidepage: true
generator: pagination
pagination:
    provider: data.cachecontrolpages
use:
    - cachecontrolpages
permalink: docs/cache/
nexturl: cache/hit/
nextpage: Cache a Page
editpath: 01-cache.md
---

Pantheon’s Global Edge provides an out-of-the box Content Delivery Network (CDN) with performance and security benefits for every site, regardless of service level. This allows sites to scale for higher traffic with faster response times by serving anonymous visitors cached content from the closest point of presence (POP) instead of processing the request at the application level.

If the nearest POP does not have a cached version of the response, the request is routed to the application running on Pantheon and gets cached on it’s way back to the browser.

![Global CDN POP](/source/docs/assets/images/pop.jpg)

## Features and Considerations
Pantheon’s Global Edge service includes:

- Global points of presence (POPs) locations
- DDOS Mitigation
- Cache tags / surrogate keys
- Origin shield
- Mobile device detection
- HTTP/2
- Geolocation
- Are we missing any features that are configurable?

Considerations:

- ???
