---
title: Debug Caching Issues
description: Learn how to identify and resolve caching issues affecting your Pantheon sites.
categories: [performance]
tags: [cache, cdn, cookies]
---

## Before You Begin
First, verify caching configuring to ensure anonymous caching is enabled. Then test to determine if CDN caching is working on your site:

- Enable anonymous caching within Drupal, [details](/drupal-cache)
- WordPress sites on Pantheon have anonymous caching enabled by default, [details](/wordpress-cache-plugin)
- [Testing Global CDN Caching](/test-global-cdn-caching)

If you see `Age: 0` after multiple requests, your site is not caching properly.

### Cache Related Headers
<dl>
 <dt>cache-control</dt>
  <dd>Determines caching behaviors for the given request, this configuration is set by WordPress and Drupal. </dd>
 <dt>age</dt>
  <dd>How long the content has been stored in cache. If 0, the response was produced by WordPress or Drupal and not served from cache. </dd>
 <dt>set-cookie</dt>
  <dd>Used to send cookies from the application to the user agent. The platform will not cache a response that contains the Set-Cookie: header.</dd>
</dl>

## Debug Caching Issues
Understand caching behavior for a given page by analyzing cache related HTTP headers from the command line with curl, for example:

```bash{outputLines: 2-20}
curl -I https://www.example.com
HTTP/2 200
cache-control: public, max-age=600 //highlight
content-type: text/html; charset=UTF-8
server: nginx
//highlight-start
set-cookie: cookielawinfo-checkbox-necessary=yes; expires=Thu, 20-Feb-2020 17:31:51 GMT; Max-Age=3600; path=/
set-cookie: cookielawinfo-checkbox-non-necessary=yes; expires=Thu, 20-Feb-2020 17:31:51 GMT; Max-Age=3600; path=/
//highlight-end
x-pantheon-styx-hostname: styx-fe1-a-789d66bff9-tztp6
x-styx-req-id: 7f93c166-53fe-11ea-803e-b26d7703e33f
date: Thu, 20 Feb 2020 16:31:51 GMT
x-served-by: cache-mdw17379-MDW, cache-chi21146-CHI
x-cache: MISS, MISS
x-cache-hits: 0, 0
x-timer: S1582216311.492451,VS0,VE204
vary: Accept-Encoding, Cookie, Cookie
age: 0 // highlight
accept-ranges: bytes
via: 1.1 varnish
```

If you see `Age: 0` after multiple requests, your site is not caching properly.

This particular example is covered in [WordPress Plugins and Themes with Known Issues](plugins-known-issues#gdpr-cookie-consent).

### Cookie Name Prefix
Pantheon's platform will not cache a response that contains the `set-cookie` header.

The best way to utilize cookies on Pantheon is by having the cookie name match the `STYXKEY[a-zA-Z0-9_-]+` naming convention, and loading them in the first load, not on every page load. Refer to the sample code outlined [here](/cookies#cache-varying-cookies).

For example, maybe in a theme file:

```
-				$cookie_name = 'cookies_disclaimer_id_'.$cookie_page_id;
+				$cookie_name = 'STYXKEY_cookies_disclaimer_id_'.$cookie_page_id;
```

### Drupal Config Conflicts
If you're seeing the `cache-control` header return `private, must-revalidate` unexpectedly, even after enabling anonymous caching across the site, it's possible that there's a conflicting override somewhere.

Check `settings.php` files for configuration overrides. For example, maybe there's an existing `$conf['cache']` set to `0` that should be adjusted to `1`.

Or the conflict could be coming from a contrib module. For example, if the Domain module is in use, check performance for that particular module (e.g., `/admin/structure/domain/view/1/config`), which overrides the site performance config (`/admin/config/development/performance`).

### WordPress Sessions
Due to how caching and sessions work, sessions need to be uncached to work properly, and it is impossible use cached content when there are sessions in place. It would be best to use a cookie based solution to avoid a performance hit from uncached session pages.

For details, see [WordPress and PHP Sessions](/wordpress-sessions#varnish-or-caching-is-not-working-when-a-plugin-or-theme-that-uses-_sessions-is-enabled).
