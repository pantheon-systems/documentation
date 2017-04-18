---
title: Cache Control Manual
subtitle: Include Pages for Cache
layout: guide
type: guide
anchorid: hit
guidepage: true
guidetoc: true
generator: pagination
pagination:
    provider: data.cachecontrolpages
use:
    - cachecontrolpages
permalink: docs/cache/hit/
nexturl: cache/miss/
nextpage: Cache a Page
previousurl: cache/
previouspage: Pantheon's Global CDN
editpath: 02-hit.md
---
By serving data from virtual memory, a response is returned without needing to access the application server, which in turns frees application container workers to build more dynamic requests.

## Configure Anonymous Page Caching
You should always have anonymous page caching enabled, unless otherwise required for development. The easiest way to configure this on Pantheon is via the WordPress Dashboard or Drupal Admin interface:

<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
  <li role="presentation"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>
<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="wp" markdown="1">

  Anonymous page caching is enabled automatically within Pantheon's [optimized version of WordPress](https://github.com/pantheon-systems/WordPress). By default, cached pages will expire after 10 minutes (600 seconds).

  You can increase the default value to improve the chances that a visitor will request a cached page, which will reduce page load times:

  1. Visit the plugin admin page (`/wp-admin/options-general.php?page=pantheon-cache`).
  2. Adjust the **Default Cache Time** as desired.
  3. Click **Save Changes**.
 </div>
 <div role="tabpanel" class="tab-pane" id="d8" markdown="1">

 1. Visit the admin page for Drupal's performance settings (`/admin/config/development/performance`).
 2. Adjust the **Page cache maximum age** as desired.

    In Drupal 8, there is no option to turn anonymous page caching on or off. To disable caching for development purposes, set **Page cache maximum age** to **<no caching>**.

 3. Enable **Aggregate and compress CSS files** and **Aggregate and compress JavaScript files**.

   This is critical for page render times by reducing the number of HTTP requests and the amount of data transferred. There is no longer a **compress cached pages** setting in Drupal 8.

 4. Click **Save configuration**.
  </div>
  <div role="tabpanel" class="tab-pane" id="d7" markdown="1">

  1. Visit the admin page for Drupal's performance settings (`/admin/config/development/performance`).
  2. Enable **Cache pages for anonymous users**. If possible, enable **Cache blocks** as well to increase performance for logged-in users.
  3. Set **Minimum cache lifetime** as desired.

    This forces cached content to continue to exist before it can be flushed. If all caches are cleared, any content under the minimum cache lifetime will not be expunged. High traffic sites may want to set this to a non-zero value; when in doubt, set it to none.

  4. Set **Expiration of cached pages** as desired to set `max-age`, which is used to determine how long cache is retained.
  5. Enable **Aggregate and compress CSS files** and **Aggregate and compress JavaScript files**.

    This is critical for page render times by reducing the number of HTTP requests and the amount of data transferred.

  6. Click **Save configuration**.

  </div>
</div>

## Set HTTP Headers
Pantheon's Global CDN is configured to respect certain HTTP headers served by your site. If you set pages to expire in 5 minutes, the CDN will expire the content as requested. If your site sends headers that forbid caching, the CDN won't cache your content. Here are the supported methods of controlling cache with PHP via HTTP headers:

### Surrogate Control: max-age
Use this header to control maximum time a cached page will be served from the CDN and if you would like the header to be stripped from the response, making the header visible only to the CDN. Browsers will not respect this value.

```php
header( 'Surrogate Control: max-age=3600');
```
### Cache Control: s-maxage  
Use this header to control maximum time a cached page will be served from the CDN. This header is the same as Surrogate Control aside from the fact that it is not stripped from the response. Browsers will not respect this value.

```php
header( 'Cache-Control: s-maxage=3600');
```

### Cache Control: max-age
Use this header to control maximum time a cached page will be served from the CDN and from the browser.

```php
header( 'Cache Control: max-age=3600');
```

### Expires
Use this header to set a specific time and date for the page to be removed from cache and no longer served from the CDN or from the browser.

```php
header('Expires: 'gmdate(DATE_RFC1123, time()+3600));
```

## Ignoring GET Parameters

For the purpose of optimizing cache hits for identical content, our edge ignores any GET parameter prefixed with `__` (two underscores) or `utm_` in determining the cache key. This optimization is compatible with services such as Google Analytics and AdWords that use these query parameters solely for tracking and do not alter the page content returned by the application server.

The double-underscore prefix for parameter keys and cookie names is a standard convention used by front-end code to indicate a value that can be safely ignored on the back-end.

For example, **?__dynamic_id=1234** is ignored, while **?dynamic_id=1234** and **?_dynamic_id** are considered distinct pages because they do not use one of the standard conventions (either `utm_` or `__`).

The query parameters are still passed to the application server; however, the values are replaced with `PANTHEON_STRIPPED` to indicate that cache optimization is in effect for this parameter. Avoid using these parameters in ways that alter content in the response.

For more information, see [PANTHEON_STRIPPED GET Parameter Values](/docs/pantheon_stripped).
