---
title: Considerations for Google Analytics and PANTHEON_STRIPPED
description: Detailed information on how Pantheon optimizes your site's cache performance.
category:
  - developing
keywords: google analytics, analytics, pantheon_stripped, utm, query parameters, cache
---
In a typical scenario, Pantheon's edge cache uses the entire request URL, including query string parameters, as the content cache key. In some cases, the query parameters do not affect the content returned in the response and we can optimize your site's performance by safely ignoring these parameters from a cache perspective. For example, specific Google Analytics query parameters are used solely by JavaScript to track different AdWords campaigns running for the same page on your site.

<div class="alert alert-danger" role="alert"><h4>Warning</h4>
Variables that are converted to <code>PANTHEON_STRIPPED</code> cannot be read with PHP, and original values will not appear in the <code>nginx-access.log</code> or be available to the application backend. However, the parameters can be read using JavaScript and will appear correctly in analytics tools. Use AJAX to pass parameters to PHP.</div>

Behind Pantheon's edge caching layer, your application server will see some specific query parameters have been altered by replacing the parameter value with `PANTHEON_STRIPPED` indicating that cache optimization is in effect for these parameters. It is also an indication that developers should not attempt to use these parameters in ways that would return different content in the response to the user. For example, be careful if you have PHP code that constructs redirects shuttling visitors from one Google AdWords campaign landing page to another. If the incoming request parameters are used to construct the redirect response parameters, the URL may contain the stripped out GA `utm_` values. Developers may also experience unexpected behavior when they attempt to overload Google's `utm_` parameter namespace. The URL parameters that Google Analytics uses are specific to their platform and it is not intended to be extended by site developers. To use it as a general tracking parameter with patterns like `utm_mytrackingparameter` is discouraged. Please refer to Google Analytics [URL Builder](https://support.google.com/analytics/answer/1033867) for a list of the valid `utm_` parameters.

Since this URL modification happens entirely on the back-end, your client-side Javascript, and your Google Analytics tracking code, still see and use the original query parameters unaltered and will continue to function normally.

For more information, see [Caching - Advanced Topics](/docs/articles/sites/varnish/caching-advancedtopics).


#### Which query parameters are optimized?

Any URL query parameters (GET requests) matching the following criteria will have its value replaced with `PANTHEON_STRIPPED`:

- `utm_*` -- Matches standard Google Analytics parameters
- `__*` (two underscores) -- Matches conventional content insignificant query parameters

#### How do I test my Google Analytics or AdWords URLs on Pantheon?
You can use [curl](http://curl.haxx.se/) or [wget](https://www.gnu.org/software/wget/) to perform a simple test to see if PANTHEON_STRIPPED is appearing in URLs:
```shell
# example using curl and grep
curl -i "http://live-analytics-url-tester.pantheon.io/?utm_source=test-source&utm_medium=test-campaign&utm_term=test-term&utm_content=test-content&utm_campaign=test" | grep utm
```
