---
title: Cache Control Manual
subtitle: Test Configuration
cache: true
anchorid: test
generator: pagination
layout: guide
pagination:
    provider: data.cachecontrolpages
use:
    - cachecontrolpages
permalink: docs/guides/cache/test/
nexturl: guides/cache/troubleshoot/
nextpage: Troubleshoot
previousurl: guides/cache/miss/
previouspage: Exclude a Page from Cache
editpath: cache/04-test.md
---
Every response served by the platform is accompanied by a number of headers. These are the same headers that Pantheon's Global CDN uses when determining if and for how long to cache content.

<div class="panel panel-drop panel-guide">
  <script src="//fast.wistia.com/embed/medias/pugjxn19gi.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_pugjxn19gi videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
</div>

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#http-headers"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> HTTP Header Glossary (Optional)</h3></a>
  </div>
  <div id="http-headers" class="collapse" style="padding:10px;">
    <div markdown="1">
      - **Cache-Control: public, max-age=600**
        - `max-age` is the number of seconds that content can remain in cache before being refreshed.

      - **X-Pantheon-Environment**
      - **X-Pantheon-phpreq**
      - **X-Pantheon-Site**
      - **X-Pantheon-Styx-Hostname**
      - **age**
        - Number of seconds that content has been stored in cache. If 0, it wasn't found in cache at all (miss).
    </div>
  </div>
</div>

## curl
One of the simplest ways to test whether or not a page is being served from Pantheon's CDN is to examine the HTTP headers from a response using curl (replace `https://www.example.com` with your site's URL):

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


## Firefox

1. Install [Firebug](http://getfirebug.com/), the in-browser debugging plugin.
2. Go to your Pantheon hosted domain and click the Firebug icon in Firefox. 
3. Click the **Network** tab, then **HTML** to see the headers.

## Chrome

Right-click anywhere on the page, and select the **Inspect Element** option.

## Internet Explorer

1. Use the developer tools by pressing **F12** or by clicking **Settings**, then **Developer Tools**.
2. Click the **Start Capturing** button to begin reading the headers from the HTTP request. If headers aren't displaying, refresh the page.
