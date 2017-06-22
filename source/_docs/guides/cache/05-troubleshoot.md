---
title: Cache Control Manual
subtitle: Troubleshoot
cache: true
anchorid: troubleshoot
generator: pagination
layout: guide
pagination:
    provider: data.cachecontrolpages
use:
    - cachecontrolpages
permalink: docs/guides/cache/troubleshoot/
nexturl: guides/cache/cc/
nextpage: Clear Cache
previousurl: guides/cache/test/
previouspage: Test Configuration
editpath: cache/05-troubleshoot.md
---
## Convert HEAD Requests to GET
To optimize performance, Pantheon's Global CDN will convert HEAD requests to GET when serving cacheable requests.
## 404 Pages
Pantheon’s default is to not cache 404s, but if your application sets Cache-Control:max-age headers, Pantheon's Global CDN will respect them. Depending on your use case, that may be the desired result.

### Drupal Sites
Drupal’s `404_fast_* configuration` does not set caching headers. Some contributed 404 modules include cache-friendly headers, which will cause a 404 response to be cached.

### WordPress Sites
WordPress does not by default set cache headers, 404 or otherwise. If your site has a Permalinks option set other than default, WordPress will return your theme's 404 page. Unless a plugin sets cache friendly headers, your 404 page will not be cached.

## Ignoring GET Parameters

For the purpose of optimizing cache hits for identical content, our edge ignores any GET parameter prefixed with `__` (two underscores) or `utm_` in determining the cache key. This optimization is compatible with services such as Google Analytics and AdWords that use these query parameters solely for tracking and do not alter the page content returned by the application server.

The double-underscore prefix for parameter keys and cookie names is a standard convention used by front-end code to indicate a value that can be safely ignored on the back-end.

For example, **?__dynamic_id=1234** is ignored, while **?dynamic_id=1234** and **?_dynamic_id** are considered distinct pages because they do not use one of the standard conventions (either `utm_` or `__`).

The query parameters are still passed to the application server; however, the values are replaced with `PANTHEON_STRIPPED` to indicate that cache optimization is in effect for this parameter. Avoid using these parameters in ways that alter content in the response.

For more information, see [PANTHEON_STRIPPED GET Parameter Values](/docs/pantheon_stripped).

## Theme Images Not Refreshing
If you are experiencing issues with theme images not refreshing, you can manually flush the cache by going to your Pantheon Dashboard and clicking the **Clear Caches** button.

### Drupal
To make sure there are not any other errors within Drupal that may be preventing images from being cached, see if there are any `drupal_set_message()` calls are being sent to the page. If you are doing theme development, also make sure that the `drupal_set_message()` errors are not being suppressed in the theme.

## No HTTP Cache Headers in Drupal
If you have checked your HTTP headers and found that the cache is not working, make sure you have configured [Drupal's performance settings](/docs/guides/cache/hit/). Once you have completed this step, go back and check the HTTP headers to verify that Pantheon's Global CDN is working.

If you are still getting `no-cache, must-revalidate, post-check=0, pre-check=0` as a response, check to see if any messages are being set - [drupal\_set\_message](https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/drupal_set_message/7) disables page caching. Also check to see if messages are present in page templates; themes could have removed them to suppress user facing messages.


## Clearing Caches In Drupal Doesn't Update Content or Views

If you have cleared the caches from your Pantheon Dashboard and are still seeing stale Views on your Drupal powered site, it's possible that View's cache has persisted. For the Views that need to be dynamic, check that those Views have caching enabled and conservatively disable as desired.

## Debugging Cookies and Pantheon's Global CDN

By default, Pantheon's edge will ignore most cookies, preventing them from breaking the cache and being passed to the backend. These cookies are still available to JavaScript, so analytics tools (e.g. Google, Chartbeat, etc.) will function out of the box on Pantheon. 

To test whether or not a cookie is preventing Pantheon's Global CDN from caching, you can examine the headers output (Age, Max-Age, Cookie) via the following curl command:

```nohighlight
$ curl -I dev.example.com
HTTP/1.1 301 Moved Permanently
cache-control: public, max-age=300
Age: 23
Vary: Cookie, Cookie
```
You will notice a max-age of 300, and if you run the command again, the "Age" field will continue to increase until it reaches the TTL set by the max-age.

If your output looks like the following with an Age of 0 after multiple requests and a cookie being set (set-cookie), this will prevent Pantheon's Global CDN from caching that page:

```nohighlight
$ curl -I dev.example.com
HTTP/1.1 200 OK
cache-control: public, max-age=900
Age: 0
Vary: Accept-Encoding, Cookie
```
In the event that a cookie is being set and you are unsure of what's setting it, disable modules one by one and test for the cookie via 'curl' after each one. When the cookie is no longer being set, the last module disabled before the test is the culprit.
