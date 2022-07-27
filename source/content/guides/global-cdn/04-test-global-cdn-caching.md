---
title: Pantheon Global CDN
subtitle: Test Global CDN Caching
description: Detailed information on how to determine if CDN caching is working on your site.
categories: [performance]
tags: [cache, cdn]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/global-cdn/test-global-cdn-caching
anchorid: test-global-cdn-caching
---

This section provides steps on how to test your Global CDN caching.


## Test CDN Caching with curl

1. Open a terminal.

1. Enter the command below with your full Pantheon domain URL.

    ```bash{outputLines: 2-7}
    curl -L -Is -H "accept-encoding: gzip, deflate, br" https://scalewp.io | egrep '(HTTP|cache-control|age:)'
    HTTP/2 200
    cache-control: public, max-age=86400
    age: 65772
    ```

      - The `-L` flag instructs curl to resend the request to the new location in the case of a 301, 302, or 303 redirect.
      - The `-I` flag sends a HEAD request to fetch only the HTTP headers for the specified URL.
      - The `-H 'accept-encoding: gzip, deflate, br'` flag and header forces curl to more closely simulate a typical browser request, resulting in typical cache behavior.
      - The `egrep '(HTTP|cache-control|age:)'` command limits the output to include only the relevant information.
  

1. Add the `Pantheon-Debug: 1` header to your request to view the `Surrogate-Key-Raw` header:

    ```bash{outputLines: 2-5}
    curl -Is -H "accept-encoding: gzip, deflate, br" -H "Pantheon-Debug:1" https://scalewp.io | egrep '(HTTP|cache-control|age:|surrogate-key-raw)'
    HTTP/2 200
    cache-control: public, max-age=86400
    surrogate-key-raw: front post-7 post-user-6 single
    age: 71611
    ```

1. Remove the pipe (`|`) and everything following it from these commands to see all headers. 

## Test Global CDN with Browser Headers

You can also test Global CDN with browser headers.

### View HTTPS Headers with Chrome

1. Open [DevTools](https://developers.google.com/web/tools/chrome-devtools) and click on the **Network** tab.

1. Load a page on your site.

1. Click the URL of the request located under the **Name** column of the Requests table.

1. View HTTP response headers for this request on the right side of the window under the [**Headers**](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#headers) tab.

### View HTTPS Headers with Firefox

1. Open the [Network Monitor](https://developer.mozilla.org/en-US/docs/Tools/Network_Monitor).

1. Load a page on your site.

1. Click the URL of the request located under the **File** column of the Requests table in the Network Monitor window.

1. View HTTP response headers for this request on the right side of the window under the [**Headers**](https://developer.mozilla.org/en-US/docs/Tools/Network_Monitor#Headers) tab.

### View HTTPS Headers with Edge

1. Use the developer tools by pressing **F12** or by clicking **Settings**, then clicking **More tools**, and then **Developer Tools**.

By default, DevTools records all network requests in the Network tool as long as DevTools remains open.

## How to Read HTTP Headers

Every HTTP response served by Pantheon is accompanied by a number of headers. These are the same headers that Global CDN uses when determining if and for how long to cache content.

- **Cache-Control: public, max-age=900**

  - `max-age` is set from Drupal's performance settings.

  - `max-age` is the number of seconds that content can remain in cache; if set to 0, content will not be cached.

  - `no-cache, must-revalidate, post-check=0, pre-check=0` typically indicates that there is a conflict in Drupal's default header.

- **All static assets** 
  
  - Includes images and other assets on production environments (Test and Live) are set with a `max-age` of 366 days. We recommend using new file names or appending a changeable query string if content needs to change earlier. Development environments (Dev and Multidevs) intentionally do not cache static assets.

- **X-Pantheon-Styx-Hostname**

  - Hostname of the Pantheon load balancing server at the origin datacenter. There are a number of these servers, and each request may be served by a different server.

- **Server: nginx**

  - A Pantheon web server generated the original page content. This will always be shown, even if a page is served from the a Global CDN cache.

- **X-Drupal-Cache: HIT**

  - Drupal's internal page cache served the content. See  [\_drupal\_bootstrap\_page\_cache](https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/_drupal_bootstrap_page_cache/7) for more information. **Drupal Only**

- **X-Generator: Drupal 7 (https://www.drupal.org/)**

  - Drupal built the page. **Drupal Only**

- **X-Served-By**

  - Hostnames of CHI metro points of presence (POPs) from the Global CDN that the request routed through. The names are typically based on the codes for nearby airports. The first entry is the POP close to the origin datacenter. The second entry (if one exists) is the POP close to the device loading the page.

- **X-Cache**

  - The hit and miss values shown here correspond to the POPs listed in X-Served-By. A request can "hit" in Global CDN either close to the device loading the page or close to the origin datacenter.

- **Age: 233**

  - How long the content has been stored in cache. If 0, it was produced at the time of the request. If you see `Age: 0` after multiple requests, your site is not being cached correctly.

- **Via: 1.1 varnish**

  - Via is used by proxies to indicate the intermediate protocol and recipient. This shows that the request went through Varnish (which is part of the technology behind Global CDN). This header will always be shown, regardless of whether the CDN served cached content.

Two of the headers listed above are Drupal-specific. By default, WordPress does not send any additional HTTP headers. However, it is possible for plugins and themes to send them.

## More Resources

- [Drupal Performance and Caching Settings](/drupal-cache)

- [WordPress Pantheon Cache Plugin Configuration](/wordpress-cache-plugin)
