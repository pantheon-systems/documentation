---
title: Caching
description: Understand frontend and backend caching on our platform.
contributors:  [dwayne]
permalink:  docs/videos/:basename
categories: [performance]
tags: [cache]
layout: video
searchboost: 50
type: video
---

<Youtube src="ecjZhtu41hs" title="Caching" />

Caching is an important technique to utilize when developing a CMS application. Let’s look at what the platform offers in terms of front end and back end caching.

Front end reverse-proxy caching is the best practice way to serve commonly requested pages. By serving pages from memory, a response is returned without needing to access either a PHP application container or a database server. This allows pages to be delivered extremely quickly and at scale.

On Pantheon, every HTTP request goes through the load balancer to a pool of Varnish servers. If a page is found in the cache, it will be immediately returned to the browser. If not, the request will seamlessly continue to the runtime matrix and the response will be cached on the way back out to the browser.

Most website frameworks use the database to cache internal application objects that take significant time to generate. It is also taxing to keep cached page content at this layer. Pantheon provides key-value based [Redis for backend caching](/object-cache), taking that workload off the database. This is vital for scaling to a larger number of logged-in users. It also provides a number of other great features to manage queues or do custom caching of your own design.
Pantheon automatically gives the best practice of front end page caching via Varnish. And for all applications with frequent database calls, Pantheon offers Redis as a ready-to-go option for the best possible performance and scale.
