---
title: Pantheon Global CDN
subtitle: Global CDN Caching for High Performance with Drupal and WordPress
description: Configure and verify edge caching is working on your WordPress or Drupal sites.
categories: [performance]
tags: [cache, cdn]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/global-cdn/global-cdn-caching
anchorid: global-cdn-caching
---

Pantheon's Global CDN supports caching to accelerate both static content and anonymous pages for sites on the platform. By serving data from cache servers all over the world, website visitors receive a response without waiting to access the application container. 

Clusters of cache servers in each region are called **points of presence** or **POPs** for short. When a website uses these CHI metro POPs effectively, the site can free up its PHP workers and database to process more dynamic requests. Each POP can handle hundreds of thousands of requests per second, much more than a site's own PHP and database containers.

Every site Pantheon site uses Global CDN. This means that every HTTP request from a website visitor first goes to closest POP to see if there's a regional cache of the content. If the closest POP doesn't have the content, the request will then go to a POP near the origin (i.e. the PHP workers and database). If the content is cached anywhere in the world, the origin POP will have a copy. If neither POP has appropriate cache data, the request will continue to an application container worker, which will generate responses that may be cached on the way back to the browser.

![Varnish Diagram](../../../images/cdn-flow.png)

Global CDN can also improve the availability of your site. For example, if a PHP fatal error breaks your site, anonymous page requests can still be served by POPs, and end-users won't encounter errors or broken pages.

## Configure Global CDN Caching

Global CDN is automatically present on each Pantheon site, and does not require any form of installation or activation by you. However, you should review the content on this page if you are interested in configuring how Global CDN will cache your site.

<Alert title="Note" type="info">

Global CDN does not require a module or plugin installation. Do **not** install the Drupal Varnish or CDN modules.

</Alert>

### HTTP Headers

You do not need to separately configure your HTTP headers for Global CDN.

Global CDN respects standard HTTP headers served by your site. If you set pages to expire in 5 minutes, Global CDN will expire the content as requested. If your site sends headers that forbid caching, Global CDN won't cache the content.

For detailed instructions on how to configure and optimize caching, see [Drupal's Performance Settings](/drupal-cache) or [WordPress Pantheon Cache Plugin Configuration](/wordpress-cache-plugin).

## Troubleshooting Cache Hits

The most common issue with effectively using edge and CDN caching is troubleshooting situations where the cache should hit but doesn't. Here are some common mistakes that will cause cache misses.

### No HTTP Cache Headers

If you have checked your HTTP headers and found that caching is not working:

1. Verify that you have configured [Drupal's performance settings](/drupal-cache) or the [WordPress Pantheon Cache Plugin](/wordpress-cache-plugin) correctly. 

1. Go back and check the HTTP headers to verify that caching working correctly.

#### Drupal

If you are still receiving `no-cache, must-revalidate, post-check=0, pre-check=0` as a response:

1. Verify that messages are set. The [drupal\_set\_message](https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/drupal_set_message/7) function disables page caching. 

1. Verify that messages are present in page templates. Themes can sometimes remove messages to suppress user-facing messages.

### Theme Images Not Refreshing

If you are experiencing issues with theme images not refreshing you can manually flush the cache:

1. Navigate to your Pantheon Dashboard and click the **Clear Caches** button.

1. Refresh the page and confirm that the images are loading correctly.

#### Drupal

To make sure there are no other errors within Drupal that may be preventing images from being cached.

1. Verify that `drupal_set_message()` calls are being sent to the page. 

1. Verify that the `drupal_set_message()` errors are not being suppressed in the theme if you are doing theme development. 

### Clearing Caches in Drupal Doesn't Update Content/Views

If you have cleared caches using the Pantheon Dashboard and still see stale views on your Drupal-powered site, it's possible that the Views cache has persisted. For the views that need to be dynamic:

1. Verify that Views have caching enabled. 

1. Disable some caching using caution.

### Debugging Cookies and the Global CDN

Pantheon's Global CDN will ignore most cookies by default. This prevents cookies from breaking through the cache and being passed to the backend. These cookies are still available to JavaScript, so analytics tools, such as Google, Chartbeat, etc. will function out of the box on Pantheon. 

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
    
1. Check if a cookie is being set (with the Set-Cookie header) if your output looks like the example below (i.e. an Age of 0) after more than one request. Setting cookies will prevent the CDN from caching that page.


        ```bash{outputLines: 2-5}
        curl -I dev.mysite.com
        HTTP/1.1 200 OK
        cache-control: public, max-age=900
        Age: 0
        Vary: Accept-Encoding, Cookie
        ```

In the event that a cookie is set and you are unsure of what's setting it, disable modules one by one and test for the cookie via 'curl' after each one. When the cookie is no longer set, the last module disabled before the test is the culprit.

## More Resources

- [Clearing Caches for Drupal and WordPress](/clear-caches)

- [Working with Cookies on Pantheon](/cookies)

- [Bypassing Cache with HTTP Headers](/cache-control)

- [Testing Global CDN Caching](/guides/global-cdn/test-global-cdn-caching)

- [Caching: Advanced Topics](/caching-advanced-topics)
