---
title: Pantheon Global CDN
subtitle: Configure and Verify Edge Caching
description: Global CDN Caching for high performance with Drupal and WordPress.
categories: [performance]
tags: [cache, cdn]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/global-cdn/global-cdn-caching
anchorid: global-cdn-caching
---

This section provides steps on how to configure and verify your edge caching.

Global CDN is automatically present on each Pantheon site. You do not need to form install or activate it. However, you should review the content on this page if you are interested in configuring how Global CDN will cache your site.

<Alert title="Note" type="info">

Global CDN does not require a module or plugin installation. Do **not** install the Drupal Varnish or CDN modules.

</Alert>

## Cache Clearing

We recommend installing the Pantheon Advanced Page Cache to take advantage of Global CDN's granular cache clearing capabilities. 

- [Advanced Page Cache plugin for WordPress](https://wordpress.org/plugins/pantheon-advanced-page-cache/)

- [Advanced Page Cache module for Drupal](https://www.drupal.org/project/pantheon_advanced_page_cache)

Additionally, you can remove all pages from cache in the Site Dashboard under Site Admin or from the command line.

For more details, see [Clearing Caches for Drupal and WordPress](/clear-caches).

## HTTP Headers

You do not need to separately configure your HTTP headers for Global CDN.

Global CDN respects standard HTTP headers served by your site. If you set pages to expire in 5 minutes, Global CDN will expire the content as requested. If your site sends headers that forbid caching, Global CDN won't cache the content.

Review detailed instructions on how to configure and optimize caching:

- [Drupal's Performance Settings](/drupal-cache) 

- [WordPress Pantheon Cache Plugin Configuration](/guides/wordpress-configurations/wordpress-cache-plugin).

## Troubleshoot Cache Hits

The most common issue with effectively using edge and CDN caching is troubleshooting situations where the cache should hit but doesn't. Review the content below for common mistakes that cause cache misses.

### No HTTP Cache Headers

Follow the steps below if you have checked your HTTP headers and found that caching is not working:

1. Verify that you have configured [Drupal's performance settings](/drupal-cache) or the [WordPress Pantheon Cache Plugin](/guides/wordpress-configurations/wordpress-cache-plugin) correctly. 

1. Go back and check the HTTP headers to verify that caching working correctly after your configuration changes.

#### Drupal

Follow the steps below if you are still receiving `no-cache, must-revalidate, post-check=0, pre-check=0` as a response:

1. Verify that messages are set. The [drupal\_set\_message](https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/drupal_set_message/7) function disables page caching. 

1. Verify that messages are present in page templates. Themes can sometimes remove messages to suppress user-facing messages.

### Theme Images Not Refreshing

You can manually flush the cache if you are experiencing issues with theme images not refreshing:

1. Navigate to your Pantheon Dashboard and then click the **Clear Caches** button.

1. Refresh the page and confirm that the images are loading correctly.

#### Drupal

Follow the steps below to make sure there are no other errors within Drupal that may be preventing images from being cached.

1. Verify that `drupal_set_message()` calls are being sent to the page. 

1. Verify that the `drupal_set_message()` errors are not being suppressed in the theme if you are doing theme development. 

### Clearing Caches in Drupal Doesn't Update Content/Views

Your Views cache might be persisting if you have cleared caches using the Pantheon Dashboard and still see stale views on your Drupal-powered site. Follow the steps below for the views that need to be dynamic.

1. Verify that Views have caching enabled. 

1. Disable some caching using caution. Disabling other caching can help improve Views caching.

### Debugging Cookies and Global CDN

Pantheon's Global CDN will ignore most cookies by default. This prevents cookies from breaking through the cache and being passed to the backend. These cookies are still available to JavaScript, so analytics tools, such as Google, Chartbeat, etc. will function with no additional configuration on Pantheon. 

To test whether or not a cookie is preventing the CDN from caching: 

1. Run curl command:

    ```bash{outputLines: 2-5}
    curl -I dev.mysite.com
    HTTP/1.1 301 Moved Permanently
    cache-control: public, max-age=300
    Age: 23
    Vary: Cookie, Cookie
    ```
1. Examine the headers output (Age, Max-Age, Cookie).

    - You will notice a `max-age of 300`, and if you run the command again, the `Age` field will continue to increase until it reaches the TTL set by the max-age. 
    
1. Check if a cookie is being set (with the Set-Cookie header) if you see `Age:0` in your output after more than one request (see the example output below). Setting cookies will prevent the CDN from caching that page.


        ```bash{outputLines: 2-5}
        curl -I dev.mysite.com
        HTTP/1.1 200 OK
        cache-control: public, max-age=900
        Age: 0
        Vary: Accept-Encoding, Cookie
        ```

In the event that a cookie is set and you are unsure of what's setting it, disable modules one-by-one and test for the cookie via 'curl' command after each one is disabled. When the cookie is no longer set, the last module disabled before the test is causing the issue.

## More Resources

- [Clearing Caches for Drupal and WordPress](/clear-caches)

- [Working with Cookies on Pantheon](/cookies)

- [Bypassing Cache with HTTP Headers](/cache-control)

- [Test Global CDN Caching](/guides/global-cdn/test-global-cdn-caching)

- [Caching: Advanced Topics](/caching-advanced-topics)
