---
title: Cache Control Manual
subtitle: Test Configuration
guidepage: true
anchorid: test
generator: pagination
layout: guide
pagination:
    provider: data.cachecontrolpages
use:
    - cachecontrolpages
permalink: docs/guides/cache/test/
nexturl: guides/cache/cc/
nextpage: Clear Cache
previousurl: guides/cache/miss/
previouspage: Exclude a Page from Cache
editpath: 04-test.md
---
To test whether or not a page is being served from Pantheon's edge caching layer, examine the HTTP headers from a response using curl (replace `https://www.example.com` with your site's URL):

<pre><code class="http hljs">$ curl -I https://www.example.com
HTTP/1.1 200 OK
Date: Tue, 18 Apr 2017 10:39:14 GMT
Connection: keep-alive
Content-Length: 60684
<strong>cache-control: public, max-age=600</strong>
content-type: text/html; charset=UTF-8
link: <https://www.example.com/wp-json/>; rel="https://api.w.org/"
link: <https://www.example.com/>; rel=shortlink
strict-transport-security: max-age=15984000; includeSubDomains; preload
surrogate-key-raw:
x-pantheon-environment: live
x-pantheon-phpreq: yes
x-pantheon-site: 81a6d2c7-07d7-46d8-b6cd-89e8fd58aee5
x-pantheon-styx-hostname: styx96f33d0e
x-pingback: https://www.example.com/xmlrpc.php
x-styx-req-id: styx-c103f16991c5c65360476ff31592f941
x-styx-version: StyxGo
via: 1.1 varnish
fastly-debug-digest: 013fd8eeec2fdfef31bcd517b1bb537dead89b2712eda626c97ca1b6d952a322
accept-ranges: bytes
via: 1.1 varnish
<strong>age: 0</strong>
x-served-by: cache-ord1735-ORD, cache-atl6225-ATL
x-cache: MISS, MISS
x-cache-hits: 0, 0
x-timer: S1492511954.932153,VS0,VE152
vary: Accept-Encoding, Cookie, Cookie</code></pre>

The `cache-control` header in this example instructs Pantheon's CDN to cache the response to this request for 10 minutes (600 seconds). If we continue to run this command a few more times, we'll see `age` continue to grow until our limit of 600 is met:

<pre><code class="http hljs">$ curl -I https://www.example.com
HTTP/1.1 200 OK
Date: Tue, 18 Apr 2017 10:54:49 GMT
Connection: keep-alive
Content-Length: 60683
cache-control: public, max-age=600
content-type: text/html; charset=UTF-8
link: <https://www.example.com/wp-json/>; rel="https://api.w.org/"
link: <https://www.example.com/>; rel=shortlink
strict-transport-security: max-age=15984000; includeSubDomains; preload
surrogate-key-raw:
x-pantheon-environment: live
x-pantheon-phpreq: yes
x-pantheon-site: 81a6d2c7-07d7-46d8-b6cd-89e8fd58aee5
x-pantheon-styx-hostname: styx8bd795a1
x-pingback: https://www.example.com/xmlrpc.php
x-styx-req-id: styx-dc9111d431999ef2ed55849ee4113572
x-styx-version: StyxGo
via: 1.1 varnish
fastly-debug-digest: 013fd8eeec2fdfef31bcd517b1bb537dead89b2712eda626c97ca1b6d952a322
accept-ranges: bytes
via: 1.1 varnish
<strong>age: 324</strong>
x-served-by: cache-ord1720-ORD, cache-atl6243-ATL
<strong>x-cache: MISS, HIT</strong>
<strong>x-cache-hits: 0, 1</strong>
x-timer: S1492512889.436208,VS0,VE2
vary: Accept-Encoding, Cookie, Cookie</code></pre>

Once the max age of 600 seconds has been reached, the next request gets routed to an application container to be processed. On it's back to the browser the response is cached.


## Ignoring GET Parameters

For the purpose of optimizing cache hits for identical content, our edge ignores any GET parameter prefixed with `__` (two underscores) or `utm_` in determining the cache key. This optimization is compatible with services such as Google Analytics and AdWords that use these query parameters solely for tracking and do not alter the page content returned by the application server.

The double-underscore prefix for parameter keys and cookie names is a standard convention used by front-end code to indicate a value that can be safely ignored on the back-end.

For example, **?__dynamic_id=1234** is ignored, while **?dynamic_id=1234** and **?_dynamic_id** are considered distinct pages because they do not use one of the standard conventions (either `utm_` or `__`).

The query parameters are still passed to the application server; however, the values are replaced with `PANTHEON_STRIPPED` to indicate that cache optimization is in effect for this parameter. Avoid using these parameters in ways that alter content in the response.

For more information, see [PANTHEON_STRIPPED GET Parameter Values](/docs/pantheon_stripped).
