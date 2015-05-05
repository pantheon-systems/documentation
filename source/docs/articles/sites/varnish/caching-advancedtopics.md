---
title: Caching - Advanced Topics
description: Learn advanced details about cache and authentication.
category:
  - developing
keywords: cache, caching, varnish, pantheon_stripped, cookies, wordpress,drupal, authentication, Pantheon
---
## Allow a User to Bypass the Cache

Pantheon supports setting a NO\_CACHE cookie for users who should bypass the cache. When this cookie is present, Varnish will neither get the user's response from any existing cache or store the response from the user into the cache.

This allows users to immediately see comments or changes they've made, even if they're not logged in. To best achieve this effect, we recommend setting the NO\_CACHE cookie to exist slightly longer than the site's page cache. This setting allows content contributors to resume using the cached pages once all cached pages have been updated.

## Ignoring GET Parameters

For the purpose of optimizing cache hits for identical content, Varnish ignores any GET parameter prefixed with `__` (two underscores) or `utm_` in determining the cache key. This optimization is compatible with services such as Google Analytics and AdWords that use these query parameters solely for tracking and do not alter the page content returned by the application server. The double-underscore prefix for parameter keys and cookie names is a standard convention used by front-end code to indicate a value that can be safely ignored on the back-end.

For example, <tt>?__dynamic_id=1234</tt> is ignored, while <tt>?dynamic_id=1234</tt> and <tt>?_dynamic_id</tt> are considered distinct pages.

The query parameters will still be passed to the application server, however the values will be replaced with `PANTHEON_STRIPPED` to indicate that cache optimization is in effect for this parameter. Avoid using these parameters in ways that alter content in the response.

For more information, see [PANTHEON_STRIPPED GET Parameter Values](/docs/articles/architecture/edge/pantheon_stripped-get-parameter-values).

## External Authentication (e.g. Facebook login)

If your site or application requires Facebook authentication, we have added exceptions for this to allow users to register and login. In the event you are having problems with another external authentication service, please contact us and let us know what service you are having issues with.

## Using Your Own Session-Style Cookies

Pantheon passes all cookies beginning with SESS that are followed by numbers and lowercase characters back to the application. When at least one of these cookies is present, Varnish will not try to respond to the request from its cache or store the response.

### Drupal Sites
Drupal uses SESS-prefixed cookies for its own session tracking, so be sure to name yours differently if you choose to use one. Generally, SESS followed by a few words will work.

**Correct:** SESSmysessioncookie, SESShello123, SESSletsgo

**Incorrect:** SESS\_hello, SESS-12345, mycustomSESS, Sessone, sess123testing, SESSFIVE

### WordPress Sites
WordPress does not use PHP session cookies; however, some themes and plugins do. If you are using a theme or plugin that requires PHP sessions, you can install [Pantheon-sessions](https://wordpress.org/plugins/wp-native-php-sessions/ "Panthon Session WordPress plugin"). It is designed to handle the naming properly.

## Geolocation, Referral Tracking, Content Customization, and Cache Segmentation Using STYXKEY

A site may need to deliver different content to different users without them logging in or starting a full session (either of which will cause them to bypass the page cache entirely). Pantheon supports this by allowing sites to set a cookie beginning with `STYXKEY` followed by one or more alphanumeric characters, hyphens, or underscores.

For example, you could set a cookie named `STYXKEY-country` to `ca` or `de` and cache different page content for each country. A site can have any number of `STYXKEY` cookies for varying content. 

**Examples of `STYXKEY` cookie names:**

&#8211; `STYXKEY-mobile-ios`: Delivers different stylesheets and content for iOS devices

&#8211; `STYXKEY_european_user`: Presents different privacy options to E.U. users

&#8211; `STYXKEY-under21`: Part of your site markets alcohol and you want to change the content for minors

&#8211; `STYXKEY-school`: Your site changes content depending on the user's school affiliation

**Invalid names that won't work:**

&#8211; `STYXKEY`: Needs something after the `STYXKEY` text

&#8211; `styxkey-android`: The text `STYXKEY` must be uppercase

&#8211; `STYX-KEY-android`: The text `STYXKEY` cannot be hyphenated or contain other punctuation

&#8211; `STYXKEY.tablet`: The only valid characters are a-z, A-Z, 0-9, hyphens ("-"), and underscores ("\_")

&#8211; `tablet-STYXKEY`: The cookie name must start with `STYXKEY`

## Varnish Servers

Pantheon uses a rotating pool of Varnish servers. Varnish does not have a shared pool or cache, so that means there is a distinct cache for each server. While local DNS typically picks a route and keeps using it, it is possible to access a different Varnish server and experience a cache miss.

The Max-Age returned in the header may vary depending on which cache server is hit. The main concern when examining Age is whether or not it is increasing, as this indicates that Varnish is indeed working.

## Varnish, Public Files, and Cookies

Pantheon strips cookies from requests made to public files served from sites/default/files, which allows Varnish to cache the response.

## SSL & Varnish

When a Pantheon environment is configured with SSL, a dedicated IP address to a load balancer is provided. Connections via SSL to the load balancer are decrypted by an SSL termination server using the client’s uploaded certificate, then handled like any other request, including the same rules for Varnish caching. The result is encrypted by the SSL termination server and served back to the client, completing the request.

## 404s & Varnish

Pantheon’s default is to not cache 404s, but if your application sets Cache-Control:max-age headers, Varnish will respect them. Depending on your use case, that may be the desired result.

### Drupal Sites
Drupal’s 404\_fast\_\* configuration does not set caching headers. Some contributed 404 modules include cache-friendly headers, which will cause a 404 response to be cached.

### WordPress Sites
WordPress does not by default set cache headers, 404 or otherwise. If your site has a Permalinks option set other than defauly, WordPress will return your theme's 404 page. Unless a plugin sets cache friendly headers, your 404 page will not be cached.


## Basic Authentication & Varnish

If you're using the Environment Access: Locked security setting on a site environment, Varnish will not cache your content.

## Pantheon's .vcl File

The following is the contents of Pantheon's Varnish configuration (.vcl) file for reference. Advanced Drupal and WordPress developers should reference this if they have any questions regarding what Pantheon Varnish does or does not cache.

    ​   NO_CACHE
    S+ESS[a-z0-9]+
    fbs[a-z0-9_]+
    SimpleSAML[A-Za-z]+
    SimpleSAML[A-Za-z]+
    PHPSESSID
    wordpress[A-Za-z0-9_]*
    wp-[A-Za-z0-9_]+
    comment_author_[a-z0-9_]+
    duo_wordpress_auth_cookie
    duo_secure_wordpress_auth_cookie
    STYXKEY[a-zA-Z0-9-_]+
    has_js
    Drupal[a-zA-Z0-9-_\.]+
