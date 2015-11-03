---
title: Setting HTTP Headers to Control Downstream Caching
description: Learn how to send HTTP headers to control a site's cache behavior.
keywords: varnish, cache, headers, caching, drupal, wordpress
---

This article will help you set up HTTP headers to prevent individual pages from being cached.

## Use Internal Page Cache
To maximize your site's performance on Pantheon and to take advantage of our Varnish caching, you'll need to configure your site's performance settings. [Learn more](/docs/articles/sites/varnish/).

## Use HTTP Headers for Downstream Varnish Caching
How and why

## Customize Cache Lifetime
You can let caches know when an asset is expired by using the "expires" header. However, you can be more explicit by setting a max-age, in seconds, which will override the "expires" header.

`Cache-Control: max-age=(time in seconds)`

For an in-depth explanation of the max-age header, see the [W3.org official documentation](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9.3).

## Prevent a Single Page from Caching



## See Also
[Debugging Cache](/docs/articles/sites/varnish/debugging-cache/)  
[Drupal Performance and Varnish Caching Settings](/docs/articles/drupal/drupal-performance-and-caching-settings/)    
[Varnish Caching - Drupal and WordPress Advanced Topics](/docs/articles/sites/varnish/caching-advancedtopics)
