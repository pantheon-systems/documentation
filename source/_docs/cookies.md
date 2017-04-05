---
title: Working with Cookies on Pantheon
description: Tips and tricks for working with cookies on your Pantheon Drupal and WordPress sites.
tags: [cacheedge]
categories: []
---

## Disable Caching for Specific Pages
You can use regular expression(s) to determine if the current request (`$_SERVER['REQUEST_URI']`) should be excluded from cache. If the request matches, bypass cache by setting the `NO_CACHE` cookie in the response:
```
//Set or replace $regex_path_match accordingly
if ((preg_match($regex_path_match, $_SERVER['REQUEST_URI'])) {
  $domain =  $_SERVER['HTTP_HOST'];
  setcookie('NO_CACHE', '1', time()+0, '/path-to-page', $domain);
}
```
As an alternative to setting a `NO_CACHE` cookie within the response, you can [modify the `Cache-Control:` header](/docs/cache-control) to bypass cache on Pantheon.

## Cache-varying Cookies
Respond to a request with cached content depending on the presence and value of a particular cookie. It's important to note that in order for the response to be cached by Pantheon's edge, the cookie name must match `STYXKEY[a-zA-Z0-9_-]`.

First, check to see if the cookie is set within the incoming request. If the cookie is set, store the value and use it to generate varied content as appropriate for your use case and implementation.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>If the value has already been set, do not set the cookie again in the response. Varnish cannot cache a response that contains a <code>Set-Cookie:</code> header.
</p></div>

If the value is **not** set, respond with `setcookie()` to serve cached content for subsequent requests within the defined cookie lifetime.

The following example can be used interchangeably between WordPress and Drupal:
```
if(isset($_COOKIE['STYXKEY_gorp'])){

  $foo = $_COOKIE['STYXKEY_gorp'];
  // Generate varied content based on cookie value
  // Do NOT set cookies here; Set-Cookie headers do not allow the response to be cached
  if ($foo == 'ca') {
    str_replace('football', 'hockey');
  }

}
else{
  /**
  * Set local vars passed to setcookie()
  * Example:
  * @code
  * $name = 'STYXKEY_gorp';
  * $value = &bar;
  * $expire = time()+600;
  * $path = /foo;
  * $domain =  $_SERVER['HTTP_HOST'];
  * $secure = true;
  * $httponly = true;
  * @endcode
  **/
  setcookie($name, $value $expire, $path, $domain, $secure, $httponly);
}
```

## Setting Cookies on Platform Domains
Setting cookies on the `pantheonsite.io` bare domain is not supported, as this would force all sites on the platform to read cookies from all other sites. However, you can set cookies on platform domains (e.g. `dev-site-name.pantheonsite.io`) and custom domains (e.g. `example.com`, `xyz.example.com`).

## Cookie Size Limit
The Pantheon Edge size limit for Cookies is 10K. Any larger cookies are dropped, and the request will be processed as if there was no cookie sent. The header `X-Cookies-Dropped: 1` will be added to the request and response, indicating that they have been truncated.

Knowing this, you can choose to configure your code to listen for this header and respond, with a custom error page for example.

## See Also
* [Clearing Caches for Drupal and WordPress](/docs/clear-caches/)
* [Bypassing Cache with HTTP Headers](/docs/cache-control)
* [Testing Varnish](/docs/test-varnish/)
* [Caching: Advanced Topics](/docs/caching-advanced-topics/)
