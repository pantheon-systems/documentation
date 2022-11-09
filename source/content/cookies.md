---
title: Working with Cookies on Pantheon
description: Tips and tricks for working with cookies on your Pantheon Drupal and WordPress sites.
categories: [performance]
tags: [cache, code, cookies]
newtype: doc
categories: []
newcms: [drupal, wordpress]
audience: []
product: []
integration: []
---

This page covers working with basic cookies on Pantheon. If you want to create session based cookies to bypass caching, refer to the documentation on [Using Your Own Session-Syle Cookies](/caching-advanced-topics/#using-your-own-session-style-cookies)

## Disable Caching for Specific Pages

You can use regular expressions to determine if the current request (`$_SERVER['REQUEST_URI']`) should be excluded from the cache. 

1. Navigate to your `settings.php` file for Drupal or `wp-config.php` file for WordPress.

1. Add the code below to make the request bypass caching by setting `NO_CACHE` cookie in the response if it matches. In the example below, the code sets `NO_CACHE` for all pages in the `/news/` directory.

    - **Verify that the `friendly_path` variable is set correctly to restrict the cookie to a specific directory.**

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

You can [modify the `Cache-Control` header](/cache-control) to bypass the cache on Pantheon as an alternative to setting a `NO_CACHE` cookie within the response.

## Disable Page Caching in The Dev Environment

You do not cache page asset files like CSS, JavaScript, or images in Dev and Multidev environments. This means that you don't need to clear the cache to view changes. However, the platform will respect the CMS page caching settings (which is often important for development work). If you want to see changes to your development work on anonymous pages, the best approach is to reduce the cache lifetime in your CMS to the value `0`.

If you need to work around your CMS to bypass caching for pages in the Dev environment, follow the steps below.


1. Navigate your `settings.php` file for Drupal or your `wp-config.php` file for WordPress.

1. Add the code below to the file.

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

You can respond to a request with cached content depending on the presence and value of a particular cookie. It's important to note that the cookie name must follow the naming rules below for the response to be cached by Pantheon's Edge:

- Must begin with the 7 capital letters `STYXKEY`
- Must have one or more of the following:

  - letters `a-z` and `A-Z`
	- numbers `0-9`
	- underscore `_`
	- hyphen `-`

If you prefer a regular expression, the name must match the following format: `STYXKEY[a-zA-Z0-9_-]+`. Test your cookie with [Regex 101.](https://regex101.com/) 

1. Check to see if the cookie is set within the incoming request:

    - **Set:** If the value is already set, **do not** set the cookie again in the response. Pantheon cannot cache a response that contains a `Set-Cookie:` header.

    - **Not set:** If the value is not set, respond with `setcookie()` to serve cached content for subsequent requests within the defined cookie lifetime. The following code example can be used for either WordPress or Drupal:

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

1. Use the stored value to generate varied content as appropriate for your use case and implementation.

## Setting Cookies for Platform Domains

Setting cookies for the `pantheonsite.io` bare domain is not supported, as this would force all sites on the platform to read cookies from all other sites. However, you can set cookies for platform domains (for example `dev-site-name.pantheonsite.io`) and custom domains (for example `example.com`, `xyz.example.com`).

## Cookie Size Limit

The Pantheon Edge size limit for cookies is 10KB. Cookies larger than this size are dropped, and the request is not completely processed. The header `X-Cookies-Dropped: 1` is added to the request and response, indicating that the action has been truncated.

You can choose to configure your code to listen for this header and respond with a custom error page (for example).

Note that too many `set-cookie` headers in the response can also create issues.

## Static Files

Pantheon strips cookies for files with common static file extensions. Refer to [File Suffixes and Cookies](/caching-advanced-topics#file-suffixes-and-cookies) in our [Caching: Advanced Topics](/caching-advanced-topics) documentation for more information.

## FAQ

### Why isn't my cookie being saved/retrieved?

It's important to note that for the variant response to be respected by Pantheon's Edge, the cookie name must match the `STYXKEY[a-zA-Z0-9_-]+` convention. For the cookie to be passed to the CMS on every request, it must be one of the cache-busting cookies.

### Why is my site not behaving as expected with a plugin/module that uses cookies to deliver different page content or functionality?

The best way to use cookies on Pantheon is to have the cookie name match the `STYXKEY[a-zA-Z0-9_-]+` naming convention, and to load them in the first load, not on every page load. For more information, refer to the code example outlined in the [Cache-Varying Cookies](#cache-varying-cookies) section. 

### A plugin/module is using `cookie_name`, can I request it be added to the [Cache-Busting Cookies List](/cookies/#cache-busting-cookies)?

The VCL cookie pattern is a platform-wide setting and cannot be overridden on an individual site basis. Pantheon maintains the list of cache-busting cookies. On very rare occasions, Pantheon can modify the list if there are new use cases for login or authorization that are common and affect many users. 

For custom code, you should leverage the built-in authentication methods, PHP sessions, and the existing set of cache-cookies for dynamic page responses. For pages that should be cached, but vary by cookie, the cookie name prefix `STYXKEY_` is your key. Refer to the code example in the [Cache-Varying Cookies](#cache-varying-cookies) section, for more information on caching correctly.

## More Resources

- [Clearing Caches for Drupal and WordPress](/clear-caches)
- [Bypassing Cache with HTTP Headers](/cache-control)
- [Testing Global CDN Caching](/guides/global-cdn/test-global-cdn-caching)
- [Caching: Advanced Topics](/caching-advanced-topics)
