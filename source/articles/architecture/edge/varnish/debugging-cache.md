---
title: Debugging Cache
category:
  - getting-started

---

## Debugging Cache

### How do I clear Varnish caches?

There are three ways to clear all Varnish caches. The first two require the **pantheon\_api** module to be enabled in order to allow Drupal send the request to clear the Varnish caches.

1. From Drupal: /admin/config/devel/performance and click **Clear all Caches**
2. From Drush: drush cc all
3. From the Pantheon Dashboard: Clear Caches

Varnish caches cannot be selectively cleared.

### No HTTP Cache Headers

<<<<<<< HEAD:source/articles/architecture/edge/varnish/debugging-cache
If you have checked your HTTP headers and found that the cache is not working, make sure you have configured [Drupal's performance settings](/articles/running-drupal/drupal-s-performance-and-caching-settings#drupal-s-performance-settings). Once you have completed this step, go back and check the HTTP headers to verify that Varnish is working.
=======
If you have checked your HTTP headers and found that the cache is not working, make sure you have configured [Drupal's performance settings](/articles/drupal/drupal-s-performance-and-caching-settings). Once you have completed this step, go back and check the HTTP headers to verify that Varnish is working.
>>>>>>> d4a94817a227c88f206cbd16a4fc54839607a5f1:source/articles/architecture/edge/varnish/debugging-cache.md

If you are still getting no-cache, must-revalidate, post-check=0, pre-check=0 as a response, check to see if any messages are being set - [drupal\_set\_message](https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/drupal_set_message/7) disables page caching. Also check the theme to see if Drupal messages are being set in an attempt to suppress user facing messages.

### Theme Images Not Refreshing

If you are experiencing issues with theme images not refreshing, you can manually flush the cache by going to your Pantheon dashboard and clicking the **Clear Caches** button. To make sure there are not any other errors within Drupal that may be preventing images from being cached, see if there are any `drupal_set_message()` calls are being sent to the page. If you are doing theme development, you can also make sure that the `drupal_set_message()` errors are not being suppressed in the theme.

### 503 and 504 Gateway Timeouts

This can indicate an interrupted page delivery or timeout. The best way to debug this is to isolate the problem by identifying pages where the timeouts occur. If it's consistently on one URL, there is something happening in that code path that needs to be fixed.

In the event that the problem persists, please contact Support by creating a ticket from your Pantheon site's dashboard.

### Clearing Caches Doesn't Update Content/Views

If you have cleared the caches from your Pantheon dashboard and are still seeing stale Views on your site; it's possible that View's cache has persisted. For the Views that need to be dynamic, check that those Views have caching enabled and conservatively disable as desired.

### Cookies & Varnish

By default, Pantheon's edge will ignore most cookies, preventing them from breaking the cache and being passed to the backend. These cookies are still available to javascript, so analytics tools (e.g. Google, Chartbeat, etc.) will function out of the box on Pantheon. 

To test whether or not a cookie is preventing Varnish from caching, you can examine the headers output (Age, Max-Age, Cookie) via the following curl command:

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

You will notice a max-age of 300 and if you run the command again, the "Age" field will continue to increase until it reaches the TTL set by the max-age.

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

In the event that a cookie is being set and you are unsure of what's setting it, disable modules one by one and test for the cookie via 'curl' after each one. When the cookie is no longer being set, the last module disabled before the test is the culprit.
