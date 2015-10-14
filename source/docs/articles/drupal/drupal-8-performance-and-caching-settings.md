---
title: Drupal 8 Performance and Varnish Caching Settings
description: Optimize Drupal 8 and Varnish caching to maximize your site's performance.  
category:
  - drupal
keywords: drupal, drupal 8, performance, cache, caching, varnish, varnish caching
---
To maximize your site's performance on Pantheon and to take advantage of our Varnish caching, you'll need to configure your site's performance settings.​ For more information, see  [Varnish Caching for High Performance](/docs/articles/sites/varnish).

## Drupal 8 Performance Configuration
Visit `admin/config/development/performance` for Drupal's performance settings.

## Caching
![](/source/docs/assets/images/drupal-8-performance-settings.png)
In Drupal 8, anonymous page caching is enabled by default. There is no checkbox to turn it on or off. If you wish to disable caching for development purposes, simply set the "Page cache maximum age" to "no caching" (see: Page Cache Maximum Age below). Drupal 8 also does away with the "Cache blocks" and "Minimum Cache Lifetime" settings.

![](/source/docs/assets/images/drupal-8-block-cache.png)
Block caching is now set through each individual block's configuration.

### Page Cache Maximum Age
![](/source/docs/assets/images/drupal-8-max-age-cache.png)
Page cache maximum age sets the max-age value in the Cache-Control headers which are output by Drupal 8. The only value that will disable Drupal's caching is "no caching". For a more technical, in depth explanation of the max-age header, please see [W3.org's official documentation](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9.3).

## Bandwidth Optimization
![](/source/docs/assets/images/drupal-8-bandwidth-optimization.png)<br />
On the Live environment, make sure  "Aggregate and compress CSS files" and "Aggregate and compress JavaScript files" are both enabled. This is critical for page render times by reducing the number of HTTP requests and reducing the amount of data transferred. There is no longer a "Compress cached pages" setting in Drupal 8.

### Other Caching Locations
Other modules like `views.module`, which is now in Drupal 8's core, and `panels.module` contain their own caching options, which are much more fine-grained than the basic Drupal cache settings. If you use these modules, you should definitely look at implementing their cache settings to provide a good logged-in user experience.
