---
title: Testing Varnish
description: Detailed information on how to determine if Drupal Varnish is working on your site.
keywords: varnish, HTTP headers, styx, nginx, drupal, wordpress, testing, testing varnish
---
## Verify Varnish is Working on Your Pantheon Site

Use the [web utility](http://varnishcheck.getpantheon.com/) to check to see if Varnish is working on your Pantheon hosted website. This tool performs up to two web requests to your site and will check the headers to determine if Varnish can cache your site. If not, it will make recommendations specific to your site configuration. If you have any feedback, let us know by submitting a support ticket.

## Test If Varnish Is Working by Reading HTTP Headers

Every HTTP response served by Pantheon is accompanied by a number of headers. These are the same headers that Varnish uses when determining if and for how long to cache content.

- **Cache-Control: public, max-age=900**
  - Set from Drupal's performance settings.
  - max-age is the number of seconds that content can remain in cache; if set to 0, content will not be cached.
  - If "no-cache, must-revalidate, post-check=0, pre-check=0"; this is Drupal's default header and typically indicates that there is a conflict.
  - **All static assets** (images, etc) are set with a max-age of 24 hours; a CDN is recommended if you need more granular control.

- **X-Pantheon-Styx-Hostname**
  - Hostname of the Pantheon Varnish server. There are a number of Varnish servers and each request may be served by a different server. Before assuming Varnish isn't working, verify that the response is coming from the same server.

- **Server: nginx**
  - Pantheon webserver that generated the original page content and will always be shown even if a page is served from Varnish.

- **X-Drupal-Cache: HIT**
  - Drupal anonymous page cache served the content. See  [\_drupal\_bootstrap\_page\_cache](https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/_drupal_bootstrap_page_cache/7) for more information.  **Drupal Only**

- **X-Generator: Drupal 7 (http://drupal.org)**
  - Drupal built the page. **Drupal Only**


- **X-Varnish: 2060657816 2060579796**
  - The X-Varnish header contains the ID of the current request and the ID of the request that populated the cache.
  - If there is only one number, the cache was populated with the current request and is considered a cache miss.

- **Age: 233**
  - How long the content has been stored in cache. If 0, it wasn't cached at all. If you see sequential Age: 0 headers from the same X-Pantheon-Styx-Hostname, your site is not being cached by Drupal.

- **Via: 1.1 varnish**
  - Via is used by proxies to indicate the intermediate protocol and recipient; the request went through Varnish. This header will always be shown, regardless of whether Varnish served cached content.

Two of the headers listed above are Drupal specific. By default, WordPress does not send any additional HTTP headers. However, it is possible for plugins and themes to send them.


### Test Varnish with Firefox

1. Install [Firebug](http://getfirebug.com/), the in-browser debugging plugin.
2. Go to your Pantheon hosted domain and click the Firebug icon in Firefox. 
3. Click the **Network** tab, then **HTML** to see the headers.

### Test Varnish with curl

1. Open a terminal.
2. Enter the following command with your full Pantheon domain URL. Using the `-I` (uppercase i) flag displays only the HTTP headers for the URL you specify.
```
    $ curl -I http://dev.pantheon.pantheon.io/
    HTTP/1.1 200 OK
    server: nginx/1.0.12
    content-type: text/html; charset=utf-8
    vary: Accept-Encoding
    expires: Sun, 19 Nov 1978 05:00:00 GMT
    last-modified: Thu, 15 Mar 2012 18:16:33 +0000
    cache-control: no-cache, must-revalidate, post-check=0, pre-check=0
    etag: "1331835393"
    content-language: en
    x-generator: Drupal 7 (http://drupal.org)
    Content-Length: 54832
    Date: Thu, 15 Mar 2012 18:16:34 GMT
    X-Varnish: 968524869
    Age: 0
    Via: 1.1 varnish
    Connection: keep-alive
    X-Pantheon-Edge-Server: 50.57.148.219
```

### Test Varnish with Chrome

Right-click anywhere on the page, and select the **Inspect Element** option.

### Test Varnish with Internet Explorer

1. Use the developer tools by pressing **F12** or by clicking **Settings**, then **Developer Tools**.
2. Click the **Start Capturing** button to begin reading the headers from the HTTP request. If headers aren't displaying, refresh the page.


## See Also
- [Drupal Performance and Varnish Caching Settings](/docs/articles/drupal/drupal-performance-and-caching-settings/)
- [WordPress Pantheon Cache Plugin Configuration](/docs/articles/wordpress/wordpress-pantheon-cache-plugin-configuration/)
