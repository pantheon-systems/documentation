---
title: Varnish caching for high performance
categories:
  - getting-started
permalink: documentation/advanced-topics/varnish-caching-for-high-performance/
Metadata
filename: source/_tools/varnish-caching-for-high-performance.md
---


## Overview

Varnish is an HTTP accelerator that quickly serves both static content and anonymous pages for sites on Pantheon. By serving data from virtual memory, a response is returned without needing to access the application server, which in turns frees DROP workers to build more dynamic requests. Each Varnish server can handle thousands of requests per second - much faster than Drupal alone.  


Every site on Pantheon already uses Varnish; each HTTP request first goes to the pool of Varnish servers to seamlessly cache your site content. If a current cache isn't found, the request will continue to the DROP worker, then the response will be cached on the way back to the browser.  


Varnish can also improve the availability of your site. For example, if a PHP fatal error breaks your site, anonymous page requests can still be served by Varnish and end-users won't realize something is wrong.

## Check if Varnish is working on your Pantheon Site

Use the web utility at  [http://varnishcheck.getpantheon.com/](http://varnishcheck.getpantheon.com/) to check to see if Varnish is working on your Pantheon hosted website. This tool will perform up to two web requests to your site and will check the headers to determine if Varnish can cache your site. If not, it'll make recommendations on how to configure Drupal. Let us know if you have any feedback by submitting a support ticket.

## Configuring your site for Varnish

No module installation is required; do  **not**  install the Drupal Varnish module.  


Varnish has been configured to respect any HTTP headers served by your site. If you set pages to expire in 5 minutes, Varnish will expire the content as request. If your site sends headers that forbid caching, Varnish won't cache your content.  


See  [Drupal's Performance Settings](/documentation/running-drupal/drupal-s-performance-and-caching-settings/) for step-by-step instructions on how to optimize your caching configuration.

## Test if Varnish is working by reading HTTP headers

Every HTTP response served by Pantheon is accompanied by a number of headers. These are the same headers that Varnish uses when determining if and how long to cache content. Here are the relevant headers:

- **X-Pantheon-Styx-Hostname**
  - Hostname of the Pantheon Varnish server. Remember, there are a number of Varnish servers and each request may be served by a different server. Before assuming Varnish isn't working, verify that the response is coming from the same server.

- **server: nginx**
  - Pantheon webserver that generated the original page content; will always be shown even if a page is served from Varnish.

- **x-drupal-cache: HIT**
  - Drupal anonymous page cache served the content. See  [\_drupal\_bootstrap\_page\_cache](https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/_drupal_bootstrap_page_cache/7) for more information.

- **x-generator: Drupal 7 (http://drupal.org)**
  - Drupal built the page.

- **cache-control: public, max-age=900**
  - Set from Drupal's performance settings.
  - max-age is the number of seconds that content can remain in cache; if set to 0, content will not be cached.
  - If "no-cache, must-revalidate, post-check=0, pre-check=0", this is Drupal's default header and typically indicates that something is conflicting.
  - **All static assets** (images, etc) are set with a max-age of 24 hours; a CDN is recommended if you need more granular control.

- **X-Varnish: 2060657816 2060579796**
  - The X-Varnish header contains the ID of the current request and the ID of the request that populated the cache.
  - If there is only one number here, the cache was populated with the current request and can be considered a cache miss.

- **Age: 233**
  - How long the content has been stored in cache. If 0, it wasn't cached at all. If you see sequential Age: 0 headers from the same X-Pantheon-Styx-Hostname, then your site is not being cached by Drupal.

- **Via: 1.1 varnish**
  - Via is used by proxies to indicate the intermediate protocol and recipient; in short, the request went through Varnish. This header will always be shown, regardless of whether Varnish served cached content.

### Testing Varnish with Firefox

First, install  [Firebug](http://getfirebug.com/), the in-browser debugging plugin. Then, navigate to your Pantheon hosted domain, then start Firebug by clicking the Firebug icon in the top right corner of Firefox. Click on the network tab, then HTML to see the headers.

![Checking HTTP headers with Firefox and Firebug](https://pantheon-systems.desk.com/customer/portal/attachments/34583)

### Testing Varnish with curl

Open up a terminal and type in the following command. Using the  **-I ** (uppercase i) flag that prints out only the HTTP headers for the url you specify type in the following command with your full Pantheon domain URL.  


Using curl you can then verify that you have all the correct headers displaying for your site.

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

### Testing Varnish using Chrome

Right click anywhere on the page and select the `"Inspect Element"` option from the menu that appears.

![](https://pantheon-systems.desk.com/customer/portal/attachments/34574)

### Testing Varnish using Internet Explorer

If you are using Internet Explorer you can use the developer tools by clicking  **F12 ** or by clicking the Settings in the top right corner of the browser and selecting `"Developer Tools"`.

Once the Developer Tools panel is launched you can then click on the `"Start Capturing"` button to begin reading the headers from the HTTP request. If you do not have any headers displaying, try and refresh the page.

![Checking HTTP headers with Internet Explorer Developer Tools](https://pantheon-systems.desk.com/customer/portal/attachments/34580)

## Debugging Cache

### How do I clear Varnish caches?

There are three ways to clear all Varnish caches. The first two require the **pantheon\_api** module to be enabled in order to allow Drupal send the request to clear the Varnish caches.

1. From Drupal - /admin/config/devel/performance - click Clear all Caches
2. From Drush - drush cc all
3. From the Pantheon Dashboard - Clear Caches

Varnish caches cannot be selectively cleared.

![](https://pantheon-systems.desk.com/customer/portal/attachments/175639)

### No HTTP cache headers

If you have checked your HTTP headers and found that the cache is not working, make sure that you have configured  [Drupal's performance settings](/documentation/running-drupal/drupal-s-performance-and-caching-settings/-drupal-s-performance-settings). Once you have completed this step you can go back and try to check the HTTP headers to verify that Varnish is working.  


If you are still getting no-cache, must-revalidate, post-check=0, pre-check=0 as a response, check to see if any messages are being set - [drupal\_set\_message](https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/drupal_set_message/7) disables page caching. Also check the theme to see if Drupal messages are being set in an attempt to suppress user facing messages.

### Theme images getting stuck

If you are experiencing issues with theme images not refreshing you can manually flush the cache by going to your Pantheon dashboard and using the `"Clear Caches"` button. To make sure there are not any other errors within Drupal that may be preventing images from being cached, check and see if there are any `drupal_set_message()` calls are being sent to the page. If you are doing theme development you can also make sure that the `drupal_set_message()` errors are not being suppressed in the theme.

### 503 and 504 gateway timeouts

This can indicate an interrupted page delivery or timeout. The best way to debug this is to isolate the problem by identifying pages where the timeouts occur. If it's consistently on one URL, there is something happening in that code path that needs fixing.

In the event that the problem persists, please contact Support by creating a ticket from your Pantheon site's dashboard.

### Clearing caches doesn't update content / Views

If you have cleared the Caches from your Pantheon dashboard and are still seeing stale Views on your site; it's possible that View's cache has persisted. For the Views that need to be dynamic you may also want to check if those Views have caching enabled, and conservatively disable as desired.

### Cookies & Varnish

By default, Pantheon's edge will ignore most cookies, preventing them from breaking the cache and being passed to the backend. These cookies are still available to javascript however, so popular analytics tools (e.g. Google, Chartbeat, etc) will function out of the box on Pantheon.   


There is a list of special cookie name exceptions below in the Advanced Topics section.  


To test whether or not a cookie is preventing Varnish from caching, you can examine the headers output(Age, Max-Age, Cookie) via the following curl command:

    $ curl -I dev.mysite.com
    HTTP/1.1 301 Moved Permanently
    X-Pantheon-Styx-Hostname: styx2a
    server: nginx/1.0.15
    content-type: text/html; charset=utf-8
    location: http://dev.mysite.com/
    cache-control: public, max-age=300
    last-modified: Tue, 27 Nov 2012 20:05:53 +0000
    expires: Sun, 11 Mar 1984 12:00:00 GMT
    etag: "1354046753"
    x-pantheon-endpoint: 6ce63bba-4d26-49ed-af03-29c925c3b5ee
    Content-Length: 20826
    Accept-Ranges: bytes
    Date: Tue, 27 Nov 2012 20:05:54 GMT
    X-Varnish: 1420557910
    Age: 23
    Via: 1.1 varnish
    Connection: keep-alive
    X-Pantheon-Edge-Server: 10.183.69.95
    Vary: Cookie, Cookie

You will notice a max-age of 300 and if you run the command again, the "Age" field will continue increase until it reaches the TTL set by the max-age.

If your output looks like the following with an Age of 0 after multiple requests and a cookie being set (set-cookie), this will prevent Varnish from caching that page:

    $ curl -I dev.mysite.com
    HTTP/1.1 200 OK
    X-Pantheon-Styx-Hostname: styx1a
    server: nginx/1.0.15
    content-type: text/html; charset=utf-8
    x-drupal-cache: MISS
    set-cookie: SESSf60876d132c0913e5fc728eec7f71e38=M1Sr0bxLbbgYmbg1EW7N8sGF4anrKP1np25EkYta-ZU; expires=Wed, 19-Dec-2012 22:04:58 GMT; path=/; domain=.dev.mysite.com; HttpOnly
    etag: “1353954690-0”
    content-language: en
    link: ; rel=“shortlink”,; rel=“canonical”
    x-generator: Drupal 7 (http://drupal.org)
    cache-control: public, max-age=900
    last-modified: Mon, 26 Nov 2012 18:31:30 +0000
    expires: Sun, 19 Nov 1978 05:00:00 GMT
    x-pantheon-endpoint: c18646dd-aa2b-4faa-a4e3-d71ec3a5ce43
    Date: Mon, 26 Nov 2012 18:31:38 GMT
    X-Varnish: 486741958
    Age: 0
    Via: 1.1 varnish
    Connection: keep-alive
    X-Pantheon-Edge-Server: 108.166.58.245
    Vary: Accept-Encoding, Cookie

In the event that a cookie is being set and you are unsure of what's setting it, it is best to disable modules one by one and test for the cookie via 'curl' after each one. When the cookie is no longer being set, the last module disabled before the test is the culprit.

## Advanced Topics

### Allow requests from a single user bypass the cache

Pantheon supports setting a NO\_CACHE cookie for users who should bypass the cache. When this cookie is present, Varnish will neither get the user's response from any existing cache or store the response for the user into the cache.

A great reason to use this is to allow users to immediately see comments or changes they've made, even if they're not logged in. To best achieve this effect, we recommend setting the NO\_CACHE cookie to exist slightly longer than the site's page cache. This setting allows content contributors to resume using the cached pages once all cached pages have been updated since their change.

<!-- (Feature in development, not ready yet) <h3 id="selective_cache_clear">Selective Clearing of the Cache</h3>


<p>Pantheon supports the ability for Drupal sites to clear specific pages in the Varnish cache programmatically using the <code>pantheon_api_flush_caches_shutdown()</code> function. To use this function, you must be running the Pantheon API module in Drupal and you need to programmatically call the function <code>pantheon_api_flush_caches_shutdown($hostnames, $paths)</code> which takes an array of <code>$hostnames</code> and an array of <code>$paths</code> to clear as part of a shutdown function which runs at the end of the page load.</p> -->
### Ignoring GET parameters

For the purposes of caching, Varnish ignores any GET parameter that is prefixed with two underscores to facilitate compatibility with services such as AdWords. The double-underscore prefix for params and cookies which can be "ignore" by the backend is an emerging standard.

For example, <tt>?__dynamic_id=1234</tt> would be ignored, but <tt>?dynamic_id=1234</tt> and <tt>?_dynamic_id</tt> would be considered by Varnish to be distinct pages.

Query keys will still be passed to the application server, but the values will be changed to PANTHEON\_STRIPPED to indicate that the URL is being altered. For more information, see our article on [PANTHEON\_STRIPPED parameters](/documentation/howto/pantheon_stripped-get-parameter-values/).

### External authentication (e.g. facebook login)

If your site or application requires Facebook authentication, we have added exceptions for this to allow users to register and login. In the event you are having problems with another external authentication service, please contact us and let us know what service you are having issues with.

### Using your own session-style cookies

Pantheon passes all cookies beginning with SESS and followed by numbers and lowercase characters back to the Drupal application. When at least one of these cookies is present, Varnish will not try to respond to the request from its cache or store the response.

Drupal uses SESS-prefixed cookies for its own session tracking, so be sure to name yours differently if you choose to use one. Generally, SESS followed by a few words will work fine.

Examples that would work: SESSmysessioncookie, SESShello123, SESSletsgo

Examples that would _not_ work: SESS\_hello, SESS-12345, mycustomSESS, Sessone, sess123testing, SESSFIVE

#### Dealing with geolocation, referral tracking, content customization, and cache segmentation using STYXKEY

Sometimes, a site needs to deliver different content to different users without them being logged in or starting a full session (either of which will cause them to bypass the page cache entirely). Pantheon supports this by allowing sites to set a cookie beginning with `STYXKEY` followed by one or more alphanumeric characters, hyphens, or underscores.

For example, you could set a cookie named `STYXKEY-country` to `ca` or `de` and cache different page content for each country. A site can have any number of `STYXKEY` cookies for varying content. 

**Example `STYXKEY` cookie names (and why you might use them):**

-

`STYXKEY-mobile-ios`: you want to deliver totally different stylesheets and content for iOS devices

-

`STYXKEY_european_user`: you present different privacy options to E.U. users

-

`STYXKEY-under21`: parts of your site market alcohol, and you want to change the content for minors

-

`STYXKEY-school`: your site changes content depending on the user's school affiliation

**Invalid names that won't work (and why):**

-

`STYXKEY`: needs something after the `STYXKEY` text

-

`styxkey-android`: the text `STYXKEY` must be uppercase

-

`STYX-KEY-android`: the text `STYXKEY` cannot be hyphenated or contain other punctuation

-

`STYXKEY.tablet`: the only valid characters are a-z, A-Z, 0-9, hyphens ("-"), and underscores ("\_")

-

`tablet-STYXKEY`: the cookie name must start with `STYXKEY`

### Varnish servers

Pantheon uses a rotating pool of Varnish servers. Varnish does not have a shared pool or cache, so that means there is a distinct cache for each server. While local DNS typically picks a route and keeps using it, it is possible to access a different Varnish server and experience a cache miss.

The Max-Age returned in the header may vary depending on which cacheserver is hit. The main concern when examining Age is whether or not it is increasing, as this indicates that Varnish is indeed working.

### Varnish, public files and cookies

Pantheon strips cookies from requests made to public files served from sites/default/files, which allows Varnish to cache the response.

### SSL & Varnish

When a Pantheon environment is configured with SSL, a dedicated IP address to a load balancer is provided. Connections via SSL to the load balancer are decrypted by an SSL termination server using the client’s uploaded certificate, then handled like any other request – including the same rules for Varnish caching. The result is then encrypted by the SSL termination server and served back to the client, completing the request.

### 404s & Varnish

Pantheon’s default is to not cache 404s, but if your application sets Cache-Control:max-age headers, Varnish will respect them. Depending on your use case, that may be the desired result. Drupal’s 404\_fast\_\* configuration does not set caching headers. Some contributed 404 modules include cache friendly headers, which will cause a 404 response to be cached.

### Basic Authentication & Varnish

If you're using the Environment Access: Locked security setting on a site environment, Varnish will not cache your content.

### Pantheon's .vcl File

The following is the contents of Pantheon's Varnish configuration (.vcl) file for reference. Advanced Drupal and WordPress developers should reference this if they have any questions at all in regards to what the Pantheon Varnish does or does not cache.

    ​   NO_CACHE
        S+ESS[a-z0-9]+
        fbs[a-z0-9_]+
        SimpleSAML[A-Za-z]+
        SimpleSAML[A-Za-z]+
        PHPSESSID
        wordpress[A-Za-z0-9_]*
        wp-[A-Za-z0-9_]+
        comment_author_[a-z0-9_]+
        duo_wordpress_auth_cookie
        duo_secure_wordpress_auth_cookie
        STYXKEY[a-zA-Z0-9-_]+
        has_js
        Drupal[a-zA-Z0-9-_\.]+
