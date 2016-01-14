---
title: Understanding and Debugging Varnish Cache Issues
description: Detailed information on debugging your Pantheon Drupal or WordPress Cache.
category:
  - debugging
keywords: varnish, cache, clear cache, caching, drupal, wordpress, cookies
---
In addition to clearing your CMS caches, we extend core functionality to clear all Varnish caches along our edge layer as well. This applies to Drupal and WordPress sites.

### Drupal
Sites running Drupal 6/7 must enable the [pantheon\_api](/docs/articles/sites/code/what-is-the-pantheon_api-module/) module to allow Drupal to send the request to clear the Varnish caches. Drupal 8 sites must clear Varnish via the Pantheon Dashboard.

- From Drupal: `/admin/config/devel/performance` and click **Clear all Caches**
- Via [Terminus](/docs/articles/local/cli/): `terminus drush --site=<site> --env=<env> "cc all"`
- From the Pantheon Dashboard: Click **Clear Caches**

### WordPress
- From the WordPress Admin menu, select **Settings > Pantheon Cache**. Click the **Clear Cache** button to clear all the caches.
- Via the command line, run the following Terminus command:

 ```bash
 $ terminus site clear-cache --site=<site> --env=<env>
 ```
- From the Pantheon Dashboard: Click **Clear Caches**.

## Common Issues
### Clear Cache Fails in Dashboard or Terminus
If you see a notification on the Dashboard indicating a failure to clear cache, this is usually due to a PHP error, redirect, or other code-related issue. While the Dashboard notification may not help much to debug, running the same command via Terminus will likely provide actionable information. Commenting out redirections in settings.php, wp-config.php, or elsewhere can isolate issues as well as resolving any fatal PHP errors.

### No HTTP Cache Headers in Drupal
If you have checked your HTTP headers and found that the cache is not working, make sure you have configured [Drupal's performance settings](/docs/articles/drupal/drupal-performance-and-caching-settings). Once you have completed this step, go back and check the HTTP headers to verify that Varnish is working.

If you are still getting `no-cache, must-revalidate, post-check=0, pre-check=0` as a response, check to see if any messages are being set - [drupal\_set\_message](https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/drupal_set_message/7) disables page caching. Also check the theme to see if Drupal messages are being set in an attempt to suppress user facing messages.

### Theme Images Not Refreshing
If you are experiencing issues with theme images not refreshing, you can manually flush the cache by going to your Pantheon Dashboard and clicking the **Clear Caches** button.

#### Drupal
To make sure there are not any other errors within Drupal that may be preventing images from being cached, see if there are any `drupal_set_message()` calls are being sent to the page. If you are doing theme development, also make sure that the `drupal_set_message()` errors are not being suppressed in the theme.

### Clearing Caches In Drupal Doesn't Update Content/Views

If you have cleared the caches from your Pantheon Dashboard and are still seeing stale Views on your Drupal powered site, it's possible that View's cache has persisted. For the Views that need to be dynamic, check that those Views have caching enabled and conservatively disable as desired.

### Cookies & Varnish

By default, Pantheon's edge will ignore most cookies, preventing them from breaking the cache and being passed to the backend. These cookies are still available to JavaScript, so analytics tools (e.g. Google, Chartbeat, etc.) will function out of the box on Pantheon. 

To test whether or not a cookie is preventing Varnish from caching, you can examine the headers output (Age, Max-Age, Cookie) via the following curl command:

```nohighlight
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
```
You will notice a max-age of 300, and if you run the command again, the "Age" field will continue to increase until it reaches the TTL set by the max-age.

If your output looks like the following with an Age of 0 after multiple requests and a cookie being set (set-cookie), this will prevent Varnish from caching that page:

```nohighlight
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
```
In the event that a cookie is being set and you are unsure of what's setting it, disable modules one by one and test for the cookie via 'curl' after each one. When the cookie is no longer being set, the last module disabled before the test is the culprit.
