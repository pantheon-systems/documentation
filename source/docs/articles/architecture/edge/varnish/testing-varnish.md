---
title: Testing Varnish
description: Test whether Varnish is working or not.
category:
  - developing
---
## Test If Varnish Is Working by Reading HTTP Headers

Every HTTP response served by Pantheon is accompanied by a number of headers. These are the same headers that
Varnish uses when determining if and for how long to cache content.

- **X-Pantheon-Styx-Hostname**
  - Hostname of the Pantheon Varnish server. There are a number of Varnish servers and each request may be served by a different server. Before assuming Varnish isn't working, verify that the response is coming from the same server.

- **server: nginx**
  - Pantheon webserver that generated the original page content and will always be shown even if a page is served from Varnish.

- **x-drupal-cache: HIT**
  - Drupal anonymous page cache served the content. See  [\_drupal\_bootstrap\_page\_cache](https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/_drupal_bootstrap_page_cache/7) for more information.

- **x-generator: Drupal 7 (http://drupal.org)**
  - Drupal built the page.

- **cache-control: public, max-age=900**
  - Set from Drupal's performance settings.
  - max-age is the number of seconds that content can remain in cache; if set to 0, content will not be cached.
  - If "no-cache, must-revalidate, post-check=0, pre-check=0", this is Drupal's default header and typically indicates that there is a conflict.
  - **All static assets** (images, etc) are set with a max-age of 24 hours; a CDN is recommended if you need more granular control.

- **X-Varnish: 2060657816 2060579796**
  - The X-Varnish header contains the ID of the current request and the ID of the request that populated the cache.
  - If there is only one number, the cache was populated with the current request and can be considered a cache miss.

- **Age: 233**
  - How long the content has been stored in cache. If 0, it wasn't cached at all. If you see sequential Age: 0 headers from the same X-Pantheon-Styx-Hostname, your site is not being cached by Drupal.

- **Via: 1.1 varnish**
  - Via is used by proxies to indicate the intermediate protocol and recipient; the request went through Varnish. This header will always be shown, regardless of whether Varnish served cached content.

### Test Varnish with Firefox

1. Install [Firebug](http://getfirebug.com/), the in-browser debugging plugin.
2. Go to your Pantheon hosted domain and start Firebug by clicking the Firebug icon in Firefox. 
3. Click the **Network** tab, then **HTML** to see the headers.

### Test Varnish with curl

1. Open a terminal.
2. Enter the following command with your full Pantheon domain URL. Using the  **-I ** (uppercase i) flag displays only the HTTP headers for the URL you specify.

    $ curl -I http://dev.pantheon.gotpantheon.com/
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

### Test Varnish with Chrome

Right-click anywhere on the page, and select the **Inspect Element** option.

### Test Varnish with Internet Explorer

1. Use the developer tools by pressing **F12 ** or by clicking **Settings**, then `"Developer Tools"`.
2. Click the **Start Capturing** button to begin reading the headers from the HTTP request. If headers aren't displaying, refresh the page.
