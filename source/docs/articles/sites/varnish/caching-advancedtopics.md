---
title: Varnish Caching - Drupal and WordPress Advanced Topics
description: Learn advanced details about cache and authentication.
category:
  - developing
keywords: cache, caching, varnish, pantheon_stripped, cookies, wordpress,drupal, authentication, Pantheon
---
## Allow a User to Bypass the Cache

Pantheon supports setting a NO\_CACHE cookie for users who should bypass the cache. When this cookie is present, Varnish will neither get the user's response from any existing cache or store the response from the user into the cache.

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
Pantheon does not support manually editing and updating the VCL. We use a standard VCL for all sites on the platform. Requests are accepted, but we do not guarantee change requests will be implemented.</div>

This allows users to immediately see comments or changes they've made, even if they're not logged in. To best achieve this, we recommend setting the NO\_CACHE cookie to exist slightly longer than the site's page cache. This setting allows content contributors to resume using the cached pages once all cached pages have been updated.

## Ignoring GET Parameters

For the purpose of optimizing cache hits for identical content, Varnish ignores any GET parameter prefixed with `__` (two underscores) or `utm_` in determining the cache key. This optimization is compatible with services such as Google Analytics and AdWords that use these query parameters solely for tracking and do not alter the page content returned by the application server. The double-underscore prefix for parameter keys and cookie names is a standard convention used by front-end code to indicate a value that can be safely ignored on the back-end.

For example, <tt>?__dynamic_id=1234</tt> is ignored, while <tt>?dynamic_id=1234</tt> and <tt>?_dynamic_id</tt> are considered distinct pages.

The query parameters are still passed to the application server, however the values are replaced with `PANTHEON_STRIPPED` to indicate that cache optimization is in effect for this parameter. Avoid using these parameters in ways that alter content in the response.

For more information, see [PANTHEON_STRIPPED GET Parameter Values](/docs/articles/sites/varnish/pantheon_stripped-get-parameter-values).

## External Authentication (e.g. Facebook login)

If your site or application requires Facebook authentication, we have added exceptions for this to allow users to register and log in. In the event you are having problems with another external authentication service, please contact us and let us know what service you are having issues with.

## Using Your Own Session-Style Cookies

Pantheon passes all cookies beginning with SESS that are followed by numbers and lowercase characters back to the application. When at least one of these cookies is present, Varnish will not try to respond to the request from its cache or store the response.

### Drupal Sites
Drupal uses SESS-prefixed cookies for its own session tracking, so be sure to name yours differently if you choose to use one. Generally, SESS followed by a few words will work.

**Correct:** SESSmysessioncookie, SESShello123, SESSletsgo

**Incorrect:** SESS\_hello, SESS-12345, mycustomSESS, Sessone, sess123testing, SESSFIVE

### WordPress Sites
WordPress does not use PHP session cookies; however, some themes and plugins do. If you are using a theme or plugin that requires PHP sessions, you can install [Pantheon-sessions](https://wordpress.org/plugins/wp-native-php-sessions/ "Pantheon Session WordPress plugin"). It is designed to handle the naming properly.

## Geolocation, Referral Tracking, Content Customization, and Cache Segmentation

A site may need to deliver different content to different users without them logging in or starting a full session (either of which will cause them to bypass the page cache entirely). Pantheon recommends doing this on the client side using browser detection, orientation, or features like aspect ratio using HTML5, CSS3, and JavaScript. Advanced developers can also use STYXKEY.

### Using Modernizr
[Modernizr](http://modernizr.com) is a JavaScript library that detects HTML5 and CSS3 features in the user's browser. This will also allow requests to have the benefit of being saved in Varnish and rendering correctly, depending on the requirements. Modernizr is available as a [Drupal module](https://www.drupal.org/project/modernizr) or a [WordPress plugin](http://wordpress.stackexchange.com/a/62362).

### Device Detection

We do not recommend building separate mobile sites or using cookies that are passed to the backend for mobile theme detection and configuration. This will cause issues scaling requests within your site in case of any load or traffic spikes, as it requires at least the initial hit to make it to the backend before anonymous traffic can be cached by Varnish. If you receive more uncached visitors than your Nginx and PHP processes, it can result in timeouts and server errors.

#### Best Practice Recommendations

We recommend handling mobile detection using Responsive Web Design (RWD) techniques with HTML5, CSS3, and JavaScript. This will avoid the need to compromise potential scalability in order to scale traffic. HTML5 and CSS3 is the high performance route, as you save on the backend load and browsers.

**Issue**
Implementing the mobile site on a different domain, subdomain, or subdirectory from the desktop site.

**Recommended Solution**  
While Google supports multiple mobile site configurations, creating separate mobile URLs greatly increases the amount of work required to maintain and update your site and introduces possible technical problems. You can simplify things significantly by using responsive web design and serving desktop and mobile on the same URL. **Responsive web design is Google’s recommended configuration.**  

More information on mobile site best practices can be found in the Google official developer documentation:

https://developers.google.com/webmasters/mobile-sites/get-started/why
https://developers.google.com/webmasters/mobile-sites/get-started/key
https://developers.google.com/webmasters/mobile-sites/get-started/mistakes

A full list of the devices and their support for HTML5 is available on [https://html5test.com](https://html5test.com):

 - [Desktop browsers](https://html5test.com/results/desktop.html)
 - [Tablet browsers](https://html5test.com/results/tablet.html)
 - [Mobile browsers](https://html5test.com/results/mobile.html)
 - [Other browsers](https://html5test.com/results/other.html)

### Using STYXKEY
You can set a cookie beginning with `STYXKEY` followed by one or more alphanumeric characters, hyphens, or underscores.

For example, you could set a cookie named `STYXKEY-country` to `ca` or `de` and cache different page content for each country. A site can have any number of `STYXKEY` cookies for varying content.

In your code, remember to first check whether the incoming request has the `STYXKEY` cookie set. If it does, generate the different version of the page, but don't set the cookie again, i.e. don't respond with another `Set-Cookie:` header. If the code tries to set the cookie again, Varnish will not cache that page at all, as Varnish cannot cache a response that contains a `Set-Cookie:` header.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
STYXKEY is not a replacement for responsive design.</div>

**Examples of `STYXKEY` cookie names:**

&#8211; `STYXKEY-mobile-ios`: Delivers different stylesheets and content for iOS devices

&#8211; `STYXKEY_european_user`: Presents different privacy options to E.U. users

&#8211; `STYXKEY-under21`: Part of your site markets alcohol and you want to change the content for minors

&#8211; `STYXKEY-school`: Your site changes content depending on the user's school affiliation

**Invalid names that won't work:**

&#8211; `STYXKEY`: Needs something after the `STYXKEY` text

&#8211; `styxkey-android`: The text `STYXKEY` must be uppercase

&#8211; `STYX-KEY-android`: The text `STYXKEY` cannot be hyphenated or contain other punctuation

&#8211; `STYXKEY.tablet`: The only valid characters are a-z, A-Z, 0-9, hyphens ("-"), and underscores ("\_")

&#8211; `tablet-STYXKEY`: The cookie name must start with `STYXKEY


## Varnish Servers

Pantheon uses a rotating pool of Varnish servers. Varnish does not have a shared pool or cache, so that means there is a distinct cache for each server. While local DNS typically picks a route and keeps using it, it is possible to access a different Varnish server and experience a cache miss.

The Max-Age returned in the header may vary depending on which cache server is hit. The main concern when examining Age is whether or not it is increasing, as this indicates that Varnish is indeed working.

## Varnish, Public Files, and Cookies

Pantheon strips cookies from requests made to public files served from sites/default/files, which allows Varnish to cache the response.

## HTTPS & Varnish

When a Pantheon environment is configured with HTTPS, a dedicated IP address to a load balancer is provided. Connections via HTTPS to the load balancer are decrypted by an HTTPS or TLS termination server using the client’s uploaded certificate, then handled like any other request, including the same rules for Varnish caching. The result is encrypted by the SSL termination server and served back to the client, completing the request.

## 404s & Varnish

Pantheon’s default is to not cache 404s, but if your application sets Cache-Control:max-age headers, Varnish will respect them. Depending on your use case, that may be the desired result.

### Drupal Sites
Drupal’s 404\_fast\_\* configuration does not set caching headers. Some contributed 404 modules include cache-friendly headers, which will cause a 404 response to be cached.

### WordPress Sites
WordPress does not by default set cache headers, 404 or otherwise. If your site has a Permalinks option set other than default, WordPress will return your theme's 404 page. Unless a plugin sets cache friendly headers, your 404 page will not be cached.


## Basic Authentication & Varnish

If you're using the Environment Access: Locked security setting on a site environment, Varnish will not cache your content.

## Pantheon's Varnish Cookie Handling

The following is the "Cache-Busting Cookie Patterns" section from Pantheon's Varnish configuration (.vcl) file for your reference. Advanced Drupal and WordPress developers should reference this if they have any questions regarding what cookie patterns Varnish will not cache.
```nohighlight
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
bp_completed_create_steps # BuddyPress cookie used when creating groups
bp_new_group_id # BuddyPress cookie used when creating groups
wp-resetpass-[A-Za-z0-9_]+
(wp_)?woocommerce[A-Za-z0-9_-]+
```
