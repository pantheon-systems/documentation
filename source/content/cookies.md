---
title: Working with Cookies on Pantheon
description: Tips and tricks for working with cookies on your Pantheon Drupal and WordPress sites.
categories: [performance]
tags: [cache, code, cookies]
---

This page covers working with basic cookies on Pantheon. If you want to create session based cookies to bypass caching, refer to the documentation on [Using Your Own Session-Syle Cookies](/caching-advanced-topics/#using-your-own-session-style-cookies)

## Disable Caching for Specific Pages

You can use regular expressions to determine if the current request (`$_SERVER['REQUEST_URI']`) should be excluded from the cache. If the request matches, bypass caching by setting the `NO_CACHE` cookie in the response.

For example, the following code example sets `NO_CACHE` for all pages in the `/news/` directory:

```php
/*
 * Set or replace $friendly_path accordingly.
 *
 * We don't set this variable for you, so you must define it
 * yourself per your specific use case before the following conditional.
 *
 * Example: anything in the /news/ directory
 */

$friendly_path = '/news/';

if (preg_match('#^' . $friendly_path . '#', $_SERVER['REQUEST_URI'])) {
  $domain =  $_SERVER['HTTP_HOST'];
  setcookie('NO_CACHE', '1', time()+0, $friendly_path, $domain);
}
```

**To restrict the cookie to the specific directory, ensure the `friendly_path` variable is corrrectly set.**

As an alternative to setting a `NO_CACHE` cookie within the response, you can [modify the `Cache-Control` header](/cache-control) to bypass the cache on Pantheon.

## Disable Page Caching in The Dev Environment

In Dev and Multidev environments, 
will not cache page asset files like CSS, JavaScript or images, and you don't need to clear the cache to view changes. However, the platform will respect the CMS page caching settings (which is often important for development work). If you want to see changes to your development work on anonymous pages, the best approach is to reduce the cache lifetime in your CMS to the value `0`.

If you need to work around your CMS to bypass caching for pages in the Dev environment, add the following to `settings.php` for Drupal and `wp-config.php` for WordPress:

```php
if (isset($_SERVER['PANTHEON_ENVIRONMENT'])) {
  if ($_SERVER['PANTHEON_ENVIRONMENT'] === 'dev') {
    $domain = $_SERVER['HTTP_HOST'];
    setcookie('NO_CACHE', '1', time()+0, $_SERVER['REQUEST_URI'], $domain);
  }
}
```

## Cache-Busting Cookies

<Partial file="cache-busting.md" />

## Cache-Varying Cookies

Respond to a request with cached content depending on the presence and value of a particular cookie. It's important to note that in order for the response to be cached by Pantheon's Edge, the cookie name must match `STYXKEY[a-zA-Z0-9_-]+`.

First, check to see if the cookie is set within the incoming request. If the cookie is set, store the value and use it to generate varied content as appropriate for your use case and implementation.

<Alert title="Note" type="info">

If the value has already been set, do not set the cookie again in the response. Pantheon cannot cache a response that contains a `Set-Cookie:` header.

</Alert>

If the value is **not** set, respond with `setcookie()` to serve cached content for subsequent requests within the defined cookie lifetime.

The following code example can be used for either WordPress or Drupal:

```php
$bar = 'Around here, football is the winter sport of choice!';
if (isset($_COOKIE['STYXKEY_gorp'])) {

  $foo = $_COOKIE['STYXKEY_gorp'];
  // Generate varied content based on cookie value
  // Do NOT set cookies here; Set-Cookie headers do not allow the response to be cached
  if ($foo == 'ca') {
    str_replace('football', 'hockey', $bar);
  }

}
else{
  /**
  * Set local vars passed to setcookie()
  * Example:
  * @code
  * $name = 'STYXKEY_gorp';
  * $value = 'bar';
  * $expire = time()+600;
  * $path = '/foo';
  * $domain =  $_SERVER['HTTP_HOST'];
  * $secure = true;
  * $httponly = true;
  * @endcode
  **/
  setcookie($name, $value, $expire, $path, $domain, $secure, $httponly);
}
```

## Setting Cookies for Platform Domains

Setting cookies for the `pantheonsite.io` bare domain is not supported, as this would force all sites on the platform to read cookies from all other sites. However, you can set cookies for platform domains (for example `dev-site-name.pantheonsite.io`) and custom domains (for example `example.com`, `xyz.example.com`).

## Cookie Size Limit

The Pantheon Edge size limit for cookies is 10KB. Cookies larger than this size are dropped, and the request is not completely processed. The header `X-Cookies-Dropped: 1` is added to the request and response, indicating that the action has been truncated.

Knowing this, you can choose to configure your code to listen for this header and respond, with a custom error page for example.

Note that too many `set-cookie` headers in the response can also create issues.

## Static Files

Pantheon strips cookies for files with common static file extensions. Refer to [File Suffixes and Cookies](/caching-advanced-topics#file-suffixes-and-cookies) in our [Caching: Advanced Topics](/caching-advanced-topics) documentation for more information.

## FAQ

### Why isn't my cookie being saved/retrieved?

It's important to note that for the variant response to be respected by Pantheon's Edge, the cookie name must match the `STYXKEY[a-zA-Z0-9_-]+` convention. For the cookie to be passed to the CMS on every request, it must be one of the cache-busting cookies.

### Why is my site not behaving as expected with a plugin/module that uses cookies to deliver different page content or functionality?

The best way to use cookies on Pantheon is to have the cookie name match the `STYXKEY[a-zA-Z0-9_-]+` naming convention, and to load them in the first load, not on every page load. For more information, refer to the code example outlined in the [Cache-Varying Cookies](#cache-varying-cookies) section. 

### A plugin/module is using `cookie_name`, can I request it be added to the [Cache-Busting Cookies List](/cookies/#cache-busting-cookies)?

The VCL cookie pattern is a platform wide setting and cannot be overridden on an individual site basis. Pantheon maintains the list of cache-busting cookies. On very rare occasions, Pantheon can modify the list if there are new use cases for login or authorization that are common and affect many users. 

For custom code, you should leverage the built-in authentication methods, PHP sessions, and the existing set of cache-cookies for dynamic page responses. For pages that should be cached, but vary by cookie, the cookie name prefix `STYXKEY_` is your key. Refer to the code example in the [Cache-Varying Cookies](#cache-varying-cookies) section, for more information on properly caching. 

## See Also

* [Clearing Caches for Drupal and WordPress](/clear-caches)
* [Bypassing Cache with HTTP Headers](/cache-control)
* [Testing Global CDN Caching](/test-global-cdn-caching)
* [Caching: Advanced Topics](/caching-advanced-topics)
