---
title: Considerations for Google Analytics and PANTHEON_STRIPPED
description: Detailed information on how Pantheon optimizes your site's cache performance.
category:
  - developing
keywords: google analytics, analytics, pantheon_stripped, utm, query parameters, cache
---
In a typical scenario, Pantheon's edge cache uses the entire request URL, including query string parameters, as the content cache key. In some cases, the query parameters do not affect the content returned in the response and we can optimize your site's performance by safely ignoring these parameters from a cache perspective. For example, specific Google Analytics query parameters are used solely by Javascript to track different AdWords campaigns running for the same page on your site.

Behind Pantheon's edge caching layer, your application server will see some specific query parameters have been altered by replacing the parameter value with `PANTHEON_STRIPPED` indicating that cache optimization is in effect for these parameters. It is also an indication that developers should not attempt to use these parameters in ways that would return different content in the response to the user.

Since this URL modification happens entirely on the back-end, your client-side Javascript, and your Google Analytics tracking code, still see and use the original query parameters unaltered and will continue to function normally.

For more information, see [Caching - Advanced Topics](/docs/articles/sites/varnish/drupal-caching-advancedtopics).


#### Which query parameters are optimized?

Any URL query parameters (GET requests) matching the following criteria will have its value replaced with `PANTHEON_STRIPPED`:

- `utm_*` -- Matches standard Google Analytics parameters
- `__*` (two underscores) -- Matches conventional content insignificant query parameters
