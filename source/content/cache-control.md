---
title: Bypassing Cache with HTTP Headers
description: Set HTTP headers to disable caching along Pantheon's edge layer, Varnish.
tags: [cacheedge]
categories: []
---
## Exclude Specific Pages from Caching
You can use a variety of mechanisms to determine which responses from your Drupal or WordPress site should be excluded from caching. Ultimately, these mechanisms result in setting HTTP headers that signal cacheability to Varnish and recipients of the response, like a browser.

<Enablement title="Agency WebOps Training" link="https://pantheon.io/agencies/learn-pantheon?docs" campaign="webops-cache-control">

Learn industry best practices for caching, how to take advantage of them on the platform, and troubleshooting common issues with help from the experts at Pantheon.

</Enablement>

Some web developers choose to aggregate all of their caching logic in one place, often the `settings.php` file of Drupal or a plugin dedicated to site-specific functionality in WordPress (as shown in the examples below). Alternatively, you can spread out cache-related code so that it is closest to the elements (i.e. sidebars, footers) that cause the cacheability of the response to be limited (as in this Drupal 8 example).

<TabList>

<Tab title="Drupal 8" id="d8" active={true}>

[Drupal 8's system of cacheability metadata](https://www.drupal.org/developing/api/8/render/arrays/cacheability) is much more advanced than the tools available in Drupal 7 or WordPress. Drupal builds HTML out of render arrays, which are specially formed PHP arrays. If one layer of a render array cannot be cached (if it's cache max age should be zero) that cacheability metadata can be set with:

```php
// $build is a render array.
$build['#cache']['max-age'] = 0;
```

Drupal 8 will "bubble up" this information so that if any small block on a page requires a cache max age of zero, the entire page will be uncacheable. Currently [Cache Control Override](https://www.drupal.org/project/cache_control_override) module is required for this feature to behave correctly.

</Tab>

<Tab title="Drupal 7" id="d7">

Here is an example of a global way to determine a Drupal response's cacheability. Use the `$conf` global variable to set `Cache-Control: max-age=0`:

```php
/*
  * Set $regex_path_patterns accordingly.
  *
  * We don't set this variable for you, so you must define it
  * yourself per your specific use case before the following conditional.
  *
  * For example, to exclude pages in the /news/ and /about/ path from cache, set:
  *
  *   $regex_path_patterns = array(
  *     '#^/news/?#',
  *     '#^/about/?#',
  *   );
  */

$regex_path_patterns = array(
  '#^/news/?#',
  '#^/about/?#',
);

// Loop through the patterns.
foreach ($regex_path_patterns as $regex_path_pattern) {
  if (preg_match($regex_path_pattern, $_SERVER['REQUEST_URI'])) {
    drupal_page_is_cacheable(FALSE);
    $conf['page_cache_maximum_age'] = 0;

    // No need to continue the loop once there's a match.
    break;
  }
}
```

</Tab>

<Tab title="WordPress" id="wp">

Set `Cache-Control: max-age=0` by hooking into [`send_headers`](https://codex.wordpress.org/Plugin_API/Action_Reference/send_headers). This will override `max-age` configured within the [Pantheon Cache](/wordpress-cache-plugin) plugin for all matching requests:

<Alert title="Note" type="info">

Place this code in an [MU Plugin](/mu-plugin/) to ensure it's executed on all requests. Calls to the API don't invoke a theme's `functions.php` file.

</Alert>

```php
/*
  * Set $regex_path_patterns accordingly.
  *
  * We don't set this variable for you, so you must define it
  * yourself per your specific use case before the following conditional.
  *
  * For example, to exclude pages in the /news/ and /about/ path from cache, set:
  *
  *   $regex_path_patterns = array(
  *     '#^/news/?#',
  *     '#^/about/?#',
  *   );
  */

$regex_path_patterns = array(
  '#^/news/?#',
  '#^/about/?#',
);

// Loop through the patterns.
foreach ($regex_path_patterns as $regex_path_pattern) {
  if (preg_match($regex_path_pattern, $_SERVER['REQUEST_URI'])) {
    add_action( 'send_headers', 'add_header_nocache', 15 );

    // No need to continue the loop once there's a match.
    break;
  }
}
function add_header_nocache() {
      header( 'Cache-Control: no-cache, must-revalidate, max-age=0' );
}


/* For WP REST API specific paths, we use a different approach by using the rest_post_dispatch filter */

// wp-json paths or any custom endpoints
$regex_json_path_patterns = array(
  '#^/wp-json/wp/v2?#',
  '#^/wp-json/?#'
);

foreach ($regex_json_path_patterns as $regex_json_path_pattern) {
  if (preg_match($regex_json_path_pattern, $_SERVER['REQUEST_URI'])) {
      // re-use the rest_post_dispatch filter in the Pantheon page cache plugin
      add_filter( 'rest_post_dispatch', 'filter_rest_post_dispatch_send_cache_control', 12, 2 );

      // Re-define the send_header value with any custom Cache-Control header
      function filter_rest_post_dispatch_send_cache_control( $response, $server ) {
          $server->send_header( 'Cache-Control', 'no-cache, must-revalidate, max-age=0' );
          return $response;
      }
      break;
  }
}
```

</Tab>

</TabList>

As an alternative to using HTTP headers to control downstream caching, you can set a `NO_CACHE` cookie. For details, see [Working with Cookies on Pantheon](/cookies).

<Alert title="Warning" type="danger">

Pantheon does not support manually editing and updating the VCL. We use a standard VCL for all sites on the platform. Requests are accepted, but we do not guarantee change requests will be implemented.

</Alert>

## Test Pages Excluded from Cache
To test whether or not a page is being served from Pantheon's edge caching layer, examine the headers output (`Age`, `Cache-Control`, `Set-Cookie`) via the following curl command:

```bash{outputLines: 2-20}
curl -I dev.mysite.com
HTTP/1.1 200 OK
X-Pantheon-Styx-Hostname: styx1a
server: nginx/1.0.15
content-type: text/html; charset=utf-8
x-drupal-cache: MISS
//highlight-start
set-cookie: SESSf60876d132c0913e5fc728eec7f71e38=M1Sr0bxLbbgYmbg1EW7N8sGF4anrKP1np25EkYta-ZU; expires=Wed, 19-Dec-2012 22:04:58 GMT; path=/; domain=.dev.mysite.com; HttpOnly
Cache-Control: no-cache, must-revalidate, max-age=0
//highlight-end
last-modified: Mon, 26 Nov 2012 18:31:30 +0000
expires: Sun, 19 Nov 1978 05:00:00 GMT
x-pantheon-endpoint: c18646dd-aa2b-4faa-a4e3-d71ec3a5ce43
Date: Mon, 26 Nov 2012 18:31:38 GMT
X-Varnish: 486741958
Age: 0 //highlight-line
Via: 1.1 varnish
Connection: keep-alive
X-Pantheon-Edge-Server: 108.166.58.245
Vary: Accept-Encoding, Cookie
```

The `Cache-Control` header in this example instructs Pantheon's edge caching layer (Varnish) not to cache the response for this request. If you run the command again, you should continue to see `Age: 0` for excluded pages. For more details, see [Testing Global CDN Caching](/test-global-cdn-caching/).

## See Also
* [Clearing Caches for Drupal and WordPress](/clear-caches/)
* [Working with Cookies on Pantheon](/cookies)
* [Testing Global CDN Caching](/test-global-cdn-caching/)
* [Caching: Advanced Topics](/caching-advanced-topics/)
