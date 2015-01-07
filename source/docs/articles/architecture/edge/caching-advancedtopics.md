---
title: Caching - Advanced Topics
description: Learn advanced details about cached and authentication.
category:
  - developing

---

## Caching - Advanced Topics

### Allow a User to Bypass the Cache

Pantheon supports setting a NO\_CACHE cookie for users who should bypass the cache. When this cookie is present, Varnish will neither get the user's response from any existing cache or store the response from the user into the cache.

This allows users to immediately see comments or changes they've made, even if they're not logged in. To best achieve this effect, we recommend setting the NO\_CACHE cookie to exist slightly longer than the site's page cache. This setting allows content contributors to resume using the cached pages once all cached pages have been updated.


<!-- (Feature in development, not ready yet) <h3 id="selective_cache_clear">Selective Clearing of the Cache</h3>

<p>Pantheon supports the ability for Drupal sites to clear specific pages in the Varnish cache programmatically using the <code>pantheon_api_flush_caches_shutdown()</code> function. To use this function, you must be running the Pantheon API module in Drupal and you need to programmatically call the function <code>pantheon_api_flush_caches_shutdown($hostnames, $paths)</code> which takes an array of <code>$hostnames</code> and an array of <code>$paths</code> to clear as part of a shutdown function which runs at the end of the page load.</p> -->

### Ignoring GET Parameters

For the purposes of caching, Varnish ignores any GET parameter that is prefixed with two underscores to be compatible with services such as AdWords. The double-underscore prefix for params and cookies which can be ignored by the backend is an emerging standard.

For example, <tt>?__dynamic_id=1234</tt> would be ignored, but <tt>?dynamic_id=1234</tt> and <tt>?_dynamic_id</tt> would be considered distinct pages.

Query keys will still be passed to the application server, but the values will be changed to PANTHEON\_STRIPPED to indicate that the URL is being altered. For more information, see [PANTHEON\_STRIPPED parameters](/docs/articles/architecture/edge/pantheon_stripped-get-parameter-values).

### External Authentication (e.g. Facebook login)

If your site or application requires Facebook authentication, we have added exceptions for this to allow users to register and login. In the event you are having problems with another external authentication service, please contact us and let us know what service you are having issues with.

### Using Your Own Session-Style Cookies

Pantheon passes all cookies beginning with SESS that are followed by numbers and lowercase characters back to the Drupal application. When at least one of these cookies is present, Varnish will not try to respond to the request from its cache or store the response.

Drupal uses SESS-prefixed cookies for its own session tracking, so be sure to name yours differently if you choose to use one. Generally, SESS followed by a few words will work.

**Correct:** SESSmysessioncookie, SESShello123, SESSletsgo

**Incorrect:** SESS\_hello, SESS-12345, mycustomSESS, Sessone, sess123testing, SESSFIVE

#### Geolocation, Referral Tracking, Content Customization, and Cache Segmentation Using STYXKEY

A site may need to deliver different content to different users without them logging in or starting a full session (either of which will cause them to bypass the page cache entirely). Pantheon supports this by allowing sites to set a cookie beginning with `STYXKEY` followed by one or more alphanumeric characters, hyphens, or underscores.

For example, you could set a cookie named `STYXKEY-country` to `ca` or `de` and cache different page content for each country. A site can have any number of `STYXKEY` cookies for varying content. 

**Examples of `STYXKEY` cookie names:**

-

`STYXKEY-mobile-ios`: Delivers different stylesheets and content for iOS devices

-

`STYXKEY_european_user`: Presents different privacy options to E.U. users

-

`STYXKEY-under21`: Part of your site markets alcohol and you want to change the content for minors

-

`STYXKEY-school`: Your site changes content depending on the user's school affiliation

**Invalid names that won't work:**

-

`STYXKEY`: Needs something after the `STYXKEY` text

-

`styxkey-android`: The text `STYXKEY` must be uppercase

-

`STYX-KEY-android`: The text `STYXKEY` cannot be hyphenated or contain other punctuation

-

`STYXKEY.tablet`: The only valid characters are a-z, A-Z, 0-9, hyphens ("-"), and underscores ("\_")

-

`tablet-STYXKEY`: The cookie name must start with `STYXKEY`

### Varnish Servers

Pantheon uses a rotating pool of Varnish servers. Varnish does not have a shared pool or cache, so that means there is a distinct cache for each server. While local DNS typically picks a route and keeps using it, it is possible to access a different Varnish server and experience a cache miss.

The Max-Age returned in the header may vary depending on which cache server is hit. The main concern when examining Age is whether or not it is increasing, as this indicates that Varnish is indeed working.

### Varnish, Public Files, and Cookies

Pantheon strips cookies from requests made to public files served from sites/default/files, which allows Varnish to cache the response.

### SSL & Varnish

When a Pantheon environment is configured with SSL, a dedicated IP address to a load balancer is provided. Connections via SSL to the load balancer are decrypted by an SSL termination server using the client’s uploaded certificate, then handled like any other request, including the same rules for Varnish caching. The result is encrypted by the SSL termination server and served back to the client, completing the request.

### 404s & Varnish

Pantheon’s default is to not cache 404s, but if your application sets Cache-Control:max-age headers, Varnish will respect them. Depending on your use case, that may be the desired result. Drupal’s 404\_fast\_\* configuration does not set caching headers. Some contributed 404 modules include cache-friendly headers, which will cause a 404 response to be cached.

### Basic Authentication & Varnish

If you're using the Environment Access: Locked security setting on a site environment, Varnish will not cache your content.

### Pantheon's .vcl File

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
