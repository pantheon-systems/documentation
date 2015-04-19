---
title: PANTHEON_STRIPPED GET Parameter Values
description: Learn how Pantheon optimizes your site's cache performance.
category:
  - developing
---

## Overview

In a typical scenario, Pantheon's edge cache uses the entire request URL, including query string parameters, as the content cache key. In some cases however, the query parameters do not affect the content returned in the response and we can optimize your site's performance by safely ignoring these parameters from a cache perspective. For example, specific Google Analytics query parameters are used solely by Javascript to track different AdWords campaigns running for the same page on your site.

Behind Pantheon's edge caching layer, your application server will see some specific query parameters have been altered by replacing the parameter value with `PANTHEON_STRIPPED` indicating that cache optimization is in effect for these parameters. It is also an indication that developers should not attempt to use these parameters in ways that would return different content in the response to the user.

Since this URL modification happens entirely on the back-end, your client-side Javascript, and your Google Analytics tracking code, still see and use the original query parameters unaltered and will continue to function normally.

For more information, please read [Caching - Advanced Topics](/docs/articles/architecture/edge/varnish/caching-advancedtopics)


#### Which query parameters are optimized?

Any URL query parameters (GET requests) matching the following criteria will have its value replaced with `PANTHEON_STRIPPED`:

- `utm_*` -- Matches standard Google Analytics parameters
- `__*` (two underscores) -- Matches conventional content insignificant query parameters 


## Reading GET Parameters with JavaScript

Most use cases where values need to be read from GET parameters that are affected by the cache-friendly behavior can and should be handled in JavaScript. The following example for reading GET parameters was adapted from an answer found on [stack overflow](http://stackoverflow.com/a/439578):

    function getQueryParams(qs) {
      qs = qs.split("+").join(" ");
      var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;


      while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }


      return params;
    }


    var query_params = getQueryParams(document.location.search);
    console.log(query_params);

