---
title: Varnish Caching for High Performance with Drupal and WordPress
description: Configure and verify Varnish is working on your WordPress or Drupal sites.
tags: [cacheedge]
categories: []
---
Varnish is an HTTP accelerator that quickly serves both static content and anonymous pages for sites on Pantheon. By serving data from virtual memory, a response is returned without needing to access the application server, which in turns frees application container workers to build more dynamic requests. Each Varnish server can handle thousands of requests per second, much faster than a site's framework alone.

Every site on Pantheon already uses Varnish; each HTTP request first goes to our Varnish servers to seamlessly cache your site content. If a current cache isn't found, the request will continue to the application container worker, then the response will be cached on the way back to the browser.  

![Varnish Diagram](/source/docs/assets/images/varnish.png)

Varnish can also improve the availability of your site. For example, if a PHP fatal error breaks your site, anonymous page requests can still be served by Varnish and end-users won't realize anything is wrong.


## Configure Your Drupal or WordPress Site for Varnish
<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>No module or plugin installation is required; do <strong>not</strong> install the Drupal Varnish module.  </p>
</div>

Varnish has been configured to respect any HTTP headers served by your site. If you set pages to expire in 5 minutes, Varnish will expire the content as requested. If your site sends headers that forbid caching, Varnish won't cache your content.

For detailed instructions on how to configure and optimize caching, see [Drupal's Performance Settings](/docs/drupal-cache) or [WordPress Pantheon Cache Plugin Configuration](/docs/wordpress-cache-plugin/).

## Troubleshooting Varnish Hits
### No HTTP Cache Headers in Drupal
If you have checked your HTTP headers and found that the cache is not working, make sure you have configured [Drupal's performance settings](/docs/drupal-cache). Once you have completed this step, go back and check the HTTP headers to verify that Varnish is working.

If you are still getting `no-cache, must-revalidate, post-check=0, pre-check=0` as a response, check to see if any messages are being set - [drupal\_set\_message](https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/drupal_set_message/7) disables page caching. Also check to see if messages are present in page templates; themes could have removed them to suppress user facing messages.

### Convert HEAD Requests to GET
To optimize performance, Varnish will convert HEAD requests to GET when serving cacheable requests.

### Theme Images Not Refreshing
If you are experiencing issues with theme images not refreshing, you can manually flush the cache by going to your Pantheon Dashboard and clicking the **Clear Caches** button.

#### Drupal
To make sure there are not any other errors within Drupal that may be preventing images from being cached, see if there are any `drupal_set_message()` calls are being sent to the page. If you are doing theme development, also make sure that the `drupal_set_message()` errors are not being suppressed in the theme.

### Clearing Caches In Drupal Doesn't Update Content/Views

If you have cleared the caches from your Pantheon Dashboard and are still seeing stale Views on your Drupal powered site, it's possible that View's cache has persisted. For the Views that need to be dynamic, check that those Views have caching enabled and conservatively disable as desired.

### Debugging Cookies & Varnish

By default, Pantheon's edge will ignore most cookies, preventing them from breaking the cache and being passed to the backend. These cookies are still available to JavaScript, so analytics tools (e.g. Google, Chartbeat, etc.) will function out of the box on Pantheon. 

To test whether or not a cookie is preventing Varnish from caching, you can examine the headers output (Age, Max-Age, Cookie) via the following curl command:

```nohighlight
$ curl -I dev.mysite.com
HTTP/1.1 301 Moved Permanently
cache-control: public, max-age=300
Age: 23
Vary: Cookie, Cookie
```
You will notice a max-age of 300, and if you run the command again, the "Age" field will continue to increase until it reaches the TTL set by the max-age.

If your output looks like the following with an Age of 0 after multiple requests and a cookie being set (set-cookie), this will prevent Varnish from caching that page:

```nohighlight
$ curl -I dev.mysite.com
HTTP/1.1 200 OK
cache-control: public, max-age=900
Age: 0
Vary: Accept-Encoding, Cookie
```
In the event that a cookie is being set and you are unsure of what's setting it, disable modules one by one and test for the cookie via 'curl' after each one. When the cookie is no longer being set, the last module disabled before the test is the culprit.

## See Also
* [Clearing Caches for Drupal and WordPress](/docs/clear-caches/)
* [Working with Cookies on Pantheon](/docs/cookies)
* [Bypassing Cache with HTTP Headers](/docs/cache-control)
* [Testing Varnish](/docs/test-varnish/)
* [Caching: Advanced Topics](/docs/caching-advanced-topics/)
