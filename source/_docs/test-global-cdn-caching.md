---
title: Testing Global CDN Caching
description: Detailed information on how to determine if CDN caching is working on your site.
tags: [cacheedge]
categories: []
---
## Verify the Global CDN is Working on Your Pantheon Site

Use the [web utility](https://varnishcheck.pantheon.io/){.external} to check to see if caching is working on your Pantheon-hosted website. This tool performs up to two web requests to your site and will check the headers to determine if the CDN can cache your site. If not, it will make recommendations specific to your site configuration. Please note that this utility does not check for cookies that are set in your frontend code (i.e. JavaScript). If you have any feedback, let us know by [contacting support](/docs/support).

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

1. Install [Firebug](https://getfirebug.com/){.external}, the in-browser debugging plugin, and a [plugin](https://addons.mozilla.org/en-US/firefox/search/?q=modify+header){.external} to insert headers.
2. Go to your Pantheon hosted domain and click the Firebug icon in Firefox. 
3. Click the **Network** tab, then **HTML** to see the headers.

### Test CDN Caching with curl

1. Open a terminal.
2. Enter the following command with your full Pantheon domain URL. Using the `-I` (uppercase i) flag sends a HEAD request to fetch only the HTTP headers for the specified URL.

    ```
    $ curl -I https://scalewp.io
    HTTP/2 200
    cache-control: public, max-age=86400
    content-type: text/html; charset=UTF-8
    link: <https://scalewp.io/wp-json/>; rel="https://api.w.org/"
    link: <https://scalewp.io/>; rel=shortlink
    server: nginx
    x-pantheon-styx-hostname: styx-fe3-a-906849904-7zhv4
    x-styx-req-id: styx-460041beb0cbd966edfdeac5f09e8c50
    via: 1.1 varnish
    accept-ranges: bytes
    date: Mon, 16 Apr 2018 16:30:18 GMT
    via: 1.1 varnish
    age: 44742
    x-served-by: cache-mdw17344-MDW, cache-jfk8146-JFK
    x-cache: HIT, HIT
    x-cache-hits: 1, 1
    x-timer: S1523896219.500596,VS0,VE1
    vary: Accept-Encoding, Cookie, Cookie
    content-length: 41369
    ```

    To view the `Surrogate-Key-Raw` header, add the `Pantheon-Debug: 1` header to your request:

    ```bash
    $ curl -IsH "Pantheon-Debug:1" https://scalewp.io
    HTTP/2 200
    cache-control: public, max-age=86400
    content-type: text/html; charset=UTF-8
    link: <https://scalewp.io/wp-json/>; rel="https://api.w.org/"
    link: <https://scalewp.io/>; rel=shortlink
    server: nginx
    surrogate-key-raw: front post-7 post-user-6 single
    x-pantheon-styx-hostname: styx-fe3-a-906849904-7zhv4
    x-styx-req-id: styx-460041beb0cbd966edfdeac5f09e8c50
    via: 1.1 varnish
    accept-ranges: bytes
    date: Mon, 16 Apr 2018 16:30:24 GMT
    via: 1.1 varnish
    age: 44747
    x-served-by: cache-mdw17344-MDW, cache-jfk8132-JFK
    x-cache: HIT, HIT
    x-cache-hits: 1, 2
    x-timer: S1523896225.507911,VS0,VE0
    vary: Accept-Encoding, Cookie, Cookie
    content-length: 41369
    ```

### Test Global CDN with Chrome

Right-click anywhere on the page, and select the **Inspect Element** option. You can use a browser extension to add the debugging header. Here are some extensions for [Chrome](https://chrome.google.com/webstore/search/modify%20header){.external} to add headers.

### Test Global CDN with Internet Explorer

1. Use the developer tools by pressing **F12** or by clicking **Settings**, then **Developer Tools**.
2. Click the **Start Capturing** button to begin reading the headers from the HTTP request. If headers aren't displaying, refresh the page.


## See Also
- [Drupal Performance and Caching Settings](/docs/drupal-cache/)
- [WordPress Pantheon Cache Plugin Configuration](/docs/wordpress-cache-plugin/)
