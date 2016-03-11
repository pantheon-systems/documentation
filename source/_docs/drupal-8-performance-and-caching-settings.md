---
title: Drupal 8 Performance and Varnish Caching Settings
description: Optimize Drupal 8 and Varnish caching to maximize your site's performance.  
categories:
  - drupal
keywords: drupal, drupal 8, performance, cache, caching, varnish, varnish caching
---
To maximize your site's performance on Pantheon and to take advantage of our Varnish caching, you'll need to configure your site's performance settings. For more information, see [Varnish Caching for High Performance](/docs/varnish).

## Drupal 8 Performance Configuration
Visit `/admin/config/development/performance` for Drupal's performance settings.

## Caching
![caching settings](/source/assets/images/drupal-8-performance-settings.png)

In Drupal 8, anonymous page caching is enabled by default. There is no option to turn it on or off. To disable caching for development purposes, set the "Page cache maximum age" to **no caching** (see Page Cache Maximum Age below). 

![block cache](/source/assets/images/drupal-8-block-cache.png)

Drupal 8 removed the "Cache Blocks" and "Minimum Cache Lifetime" settings. Block caching is now set through each individual block's configuration. The master listing of blocks is found at `/admin/structure/block`.

### Page Cache Maximum Age
![max age cache](/source/assets/images/drupal-8-max-age-cache.png)

Page cache maximum age sets the max-age value in the Cache-Control headers that are output by Drupal 8. The only value that will disable Drupal's caching is "no caching". For an in-depth explanation of the max-age header, see the [W3.org official documentation](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9.3).

## Bandwidth Optimization
![bandwidth](/source/assets/images/drupal-8-bandwidth-optimization.png)

On the Live environment, make sure to enable **Aggregate and compress CSS files** and **Aggregate and compress JavaScript files**. This is critical for page render times by reducing the number of HTTP requests and the amount of data transferred. There is no longer a "compress cached pages" setting in Drupal 8.

### Other Caching Locations
Other modules like `views.module`, which is now in Drupal 8's core, and `panels.module` contain their own caching options, which are much more fine-grained than the basic Drupal cache settings. If you use these modules, you should consider implementing their cache settings to provide a good logged-in user experience.

## See Also
For an in-depth look at caching in Drupal 8, refer to the following resources:  
- [Cache API in Drupal 8](https://www.drupal.org/developing/api/8/cache)  
- [Drupal 8 Cache API Documentation](https://api.drupal.org/api/drupal/core!core.api.php/group/cache/8)  
- [Drupal 8's Dynamic Page Cache](http://wimleers.com/article/drupal-8-dynamic-page-cache)
