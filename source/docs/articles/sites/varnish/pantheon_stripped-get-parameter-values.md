---
title: Considerations for Google Analytics and PANTHEON_STRIPPED
description: Information on why PANTHEON_STRIPPED is placed in the utm_source URL parameter.
category:
  - developing
keywords: google analytics, analytics, pantheon_stripped, utm, query parameters, cache
---
Typically, Pantheon's edge cache uses the entire request URL, including query string parameters, as the content cache key. In some cases, the query parameters do not affect the content returned in the response and we can optimize your site's performance by safely ignoring these parameters from a cache perspective. For example, specific Google Analytics query parameters are used solely by JavaScript to track different AdWords campaigns running for the same page on your site.

<div class="alert alert-danger" role="alert"><h4>Warning</h4>
Variables that are converted to <code>PANTHEON_STRIPPED</code> cannot be read with PHP, and original values will not appear in the <code>nginx-access.log</code> or be available to the application backend. However, the parameters can be read using JavaScript and will appear correctly in analytics tools. Use AJAX to pass parameters to PHP.</div>

## Issue: PANTHEON_STRIPPED Displays in the utm_source URL Parameter in Google Analytics

![pantheon_stripped](/source/docs/assets/images/pantheon_stripped.png)

This is typically caused by a PHP redirection in your site’s code. If you redirect a request in PHP that contains the replaced values, then the URL will contain PANTHEON_STRIPPED values. Therefore, if you want to direct traffic to your Pantheon site using a campaign containing `utm` or similar GET parameters, avoid sending them to a page that redirects in PHP.

If the URL for the campaign results in a redirection to a different domain or protocol, for example, if the campaign URLs look like this:

`http://www.example.com/en?utm_source=twitter&utm_campaign=my_campaign`

And then PHP redirection occurs in your site’s code, the campaign URLs will be modified to something like this:

`https://www.example.com/en?utm_source=PANTHEON_STRIPPED&utm_campaign=PANTHEON_STRIPPED`

Looking in the `nginx-access.log` you will see something like this:

```
nginx-access.log:10.223.193.24 - - [26/Jun/2015:17:12:52 +0000]  "GET /features?utm_source=PANTHEON_STRIPPED&utm_medium=PANTHEON_STRIPPED&utm_term=PANTHEON_STRIPPED&utm_campaign=PANTHEON_STRIPPED&utm_content=PANTHEON_STRIPPED HTTP/1.1" 301 5 "http://www.google.com/aclk?sa=l&&ctype=4&clui=3&rct=j&q=&ved=0CB4QwgUoAg&adurl=http://example.com/features%3Futm_source%3Dgoogle_adwords%26utm_medium%3Dcpc%26utm_term%3Dmam%26utm_campaign%3Drlsa_mam%26utm_content%3Drlsa_mam_broad" "Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F70 Safari/600.1.4" 0.002 "108.87.108.187, 184.106.100.21, 10.189.246.4"
```

Query keys will still be passed to the application server, but the values will be changed to PANTHEON_STRIPPED to indicate that the URL is being altered.

You may also experience unexpected behavior when you overload Google's `utm_` parameter namespace. The URL parameters that Google Analytics uses are specific to their platform and are not intended to be extended by site developers. Using it as a general tracking parameter with patterns like `utm_mytrackingparameter` is discouraged. Please refer to Google Analytics [URL Builder](https://support.google.com/analytics/answer/1033867) for a list of the valid `utm_` parameters.


## Resolution
We recommend distributing campaign URLs that are in their final, non-redirectable form and avoid using PHP redirects. If you have PHP redirects, remove them or use JavaScript.

Finally, to optimize caching performance, make sure any parameters are in the supported format, as those that are not in the format utm_ or preceded by double underscores will instead act as query keys and be served as distinct pages, not from the same cache. You can build campaign links in the correct format using [Google’s URL builder](https://support.google.com/analytics/answer/1033867) tool.

For more information, see [Caching - Advanced Topics](/docs/articles/sites/varnish/caching-advancedtopics).

#### Which query parameters are optimized?

Any URL query parameters (GET requests) matching the following criteria will have its value replaced with `PANTHEON_STRIPPED`:

- `utm_*` -- Matches standard Google Analytics parameters
- `__*` (two underscores) -- Matches conventional content insignificant query parameters

#### How do I test my Google Analytics or AdWords URLs on Pantheon?

You can use [curl](http://curl.haxx.se/) or [wget](https://www.gnu.org/software/wget/) to perform a simple test to see if PANTHEON_STRIPPED is appearing in URLs generated with the Google [URL Builder](https://support.google.com/analytics/answer/1033867):
```shell
# example using curl and grep
curl -i "http://live-mysite.pantheon.io/landing_page.html?utm_source=test-source&utm_medium=test-campaign&utm_term=test-term&utm_content=test-content&utm_campaign=test" | grep utm
```
