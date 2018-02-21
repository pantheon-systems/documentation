---
title: Testing Global CDN Caching
description: Detailed information on how to determine if CDN caching is working on your site.
tags: [cacheedge]
categories: []
---
## Verify the Global CDN is Working on Your Pantheon Site

Use the [web utility](https://varnishcheck.pantheon.io/){.external} to check to see if caching is working on your Pantheon-hosted website. This tool performs up to two web requests to your site and will check the headers to determine if the CDN can cache your site. If not, it will make recommendations specific to your site configuration. Please note that this utility does not check for cookies that are set in your frontend code (i.e. JavaScript). If you have any feedback, let us know by [contacting support](/docs/getting-support).

## Test If Global CDN Caching Is Working by Reading HTTP Headers

Every HTTP response served by Pantheon is accompanied by a number of headers. These are the same headers that the CDN uses when determining if and for how long to cache content.

- **Cache-Control: public, max-age=900**
  - Set from Drupal's performance settings.
  - max-age is the number of seconds that content can remain in cache; if set to 0, content will not be cached.
  - If "no-cache, must-revalidate, post-check=0, pre-check=0"; this is Drupal's default header and typically indicates that there is a conflict.
  - **All static assets** (images, etc) are set with a max-age of 366 days; we recommend using new file names or appending a changable query string if content needs to change earlier.

- **X-Pantheon-Styx-Hostname**
  - Hostname of the Pantheon load balancing server at the origin datacenter. There are a number of these servers, and each request may be served by a different server.

- **Server: nginx**
  - A Pantheon webserver generated the original page content. This will always be shown, even if a page is served from the a Global CDN cache.

- **X-Drupal-Cache: HIT**
  - Drupal's internal page cache served the content. See  [\_drupal\_bootstrap\_page\_cache](https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/_drupal_bootstrap_page_cache/7){.external} for more information.  **Drupal Only**

- **X-Generator: Drupal 7 (https://www.drupal.org/)**
  - Drupal built the page. **Drupal Only**

- **X-Served-By**
  - Hostnames of points of presence (POPs) from the Global CDN that the request routed through. The names are typically based on the codes for nearby airports. The first entry is the POP close to the origin datacenter. The second entry (if one exists) is the POP close to the device loading the page.

- **X-Cache**
  - The hit and miss values shown here correspond to the POPs listed in X-Served-By. A request can "hit" in Global CDN either close to the device loading the page or close to the origin datacenter.

- **Age: 233**
  - How long the content has been stored in cache. If 0, it was produced at the time of the request. If you see Age: 0 after multiple requests, your site is not being cached properly.

- **Via: 1.1 varnish**
  - Via is used by proxies to indicate the intermediate protocol and recipient; the request went through Varnish (which is part of the technology behind Global CDN). This header will always be shown, regardless of whether the CDN served cached content.

Two of the headers listed above are Drupal-specific. By default, WordPress does not send any additional HTTP headers. However, it is possible for plugins and themes to send them.


### Test CDN Caching with Firefox

1. Install [Firebug](https://getfirebug.com/){.external}, the in-browser debugging plugin.
2. Go to your Pantheon hosted domain and click the Firebug icon in Firefox. 
3. Click the **Network** tab, then **HTML** to see the headers.

### Test CDN Caching with curl

1. Open a terminal.
2. Enter the following command with your full Pantheon domain URL. Using the `-I` (uppercase i) flag sends a HEAD request to fetch only the HTTP headers for the specified URL.

    ```
    $ curl -I https://pantheon.io/
    HTTP/2 200 
    date: Tue, 13 Feb 2018 21:52:38 GMT
    cache-control: public, max-age=3600
    content-language: en
    content-type: text/html; charset=utf-8
    etag: W/"1518557080-0"
    expires: Sun, 19 Nov 1978 05:00:00 GMT
    last-modified: Tue, 13 Feb 2018 21:24:40 GMT
    link: <https://pantheon.io/>; rel="canonical",<https://pantheon.io/>; rel="shortlink"
    server: nginx
    strict-transport-security: max-age=15552000
    surrogate-key-raw: 
    x-content-type-options: nosniff
    x-drupal-cache: MISS
    x-frame-options: SAMEORIGIN
    x-generator: Drupal 7 (http://drupal.org)
    x-pantheon-styx-hostname: styx-fe2-6cbdc74cf8-vxjp4
    x-styx-req-id: styx-0969a5b7412f768f75334ee1df43320b
    via: 1.1 varnish
    accept-ranges: bytes
    via: 1.1 varnish
    age: 1678
    x-served-by: cache-mdw17325-MDW, cache-sjc3640-SJC
    x-cache: HIT, HIT
    x-cache-hits: 1, 1
    x-timer: S1518558759.503778,VS0,VE1
    vary: Accept-Encoding, Cookie, Cookie, Cookie
    content-length: 55434
    ```

### Test Global CDN with Chrome

Right-click anywhere on the page, and select the **Inspect Element** option.

### Test Global CDN with Internet Explorer

1. Use the developer tools by pressing **F12** or by clicking **Settings**, then **Developer Tools**.
2. Click the **Start Capturing** button to begin reading the headers from the HTTP request. If headers aren't displaying, refresh the page.


## See Also
- [Drupal Performance and Caching Settings](/docs/drupal-cache/)
- [WordPress Pantheon Cache Plugin Configuration](/docs/wordpress-cache-plugin/)
