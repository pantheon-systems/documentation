---
title: 'Caching: Advanced Topics'
description: Advanced details about Pantheon's edge caching layer, cookies, and PHP sessions.
categories: [performance]
tags: [cache, cookies, security, webops]
reviewed: "2022-03-25"
---
## Allow a User to Bypass the Cache

Pantheon supports setting a `NO_CACHE` cookie for users who should bypass the cache. When this cookie is present, the [Pantheon Global CDN](/global-cdn) will neither get the user's response from any existing cache nor store the response from the user into the cache.

<Enablement title="Agency WebOps Training" link="https://pantheon.io/learn-pantheon?docs" campaign="docs-webops">

Learn industry best practices for caching, how to take advantage of them on the platform, and troubleshooting common issues with help from the experts at Pantheon.

</Enablement>

This allows users to immediately see comments or changes they've made, even if they're not logged in. To best achieve this, we recommend setting the `NO_CACHE` cookie to exist slightly longer than the site's page cache. This setting allows content contributors to resume using the cached pages once all cached pages have been updated.

<Alert title="Warning" type="danger">

Pantheon does not support manually editing and updating the Varnish Configuration Language (VCL). We use a standard VCL for all sites on the platform. Requests for changes/updates to the standard VCL are accepted for consideration, but we do not guarantee change requests will be implemented.

</Alert>

## Ignoring GET Parameters

For the purpose of optimizing cache hits for identical content, the Global CDN ignores any GET parameter prefixed with `__` (two underscores) or `utm_` in determining the cache key. This optimization is compatible with services such as Google Analytics and AdWords that use these query parameters solely for tracking and do not alter the page content returned by the application container. The double-underscore prefix for parameter keys and cookie names is a standard convention used by frontend code to indicate a value that can be safely ignored on the back-end.

For example, `?__dynamic_id=1234` is ignored, while `?dynamic_id=1234` and `?_dynamic_id` are considered distinct pages.

The query parameters are still passed to the application container; however, the values are replaced with `PANTHEON_STRIPPED` to indicate that cache optimization is in effect for this parameter. Avoid using these parameters in ways that alter content in the response.

For more information, see [PANTHEON_STRIPPED GET Parameter Values](/pantheon_stripped).

## External Authentication (e.g. Facebook login)

If your site or application requires Facebook authentication, we have added exceptions for this to allow users to register and log in. In the event you are having problems with another external authentication service, please contact us and let us know what service you are having issues with.

## Manually Expiring Cache for Static Assets

Pantheon sets a cache lifetime of one year for static assets (e.g. CSS, JS, Images, PDFs) on production and test environments, per industry standard best practices. Dev and Multidev environments do not cache static assets. Select one of the options below to ensure a client's browser receives a new version of any static asset after clearing a site's cache:

- Rename the file
- Request the file with an updated query parameter. For example, you can version a css file by linking to it as `style.css?v=1.1`

For CSS or JavaScript changes, Drupal and WordPress each offer methods to ensure a new file name will be created automatically any time a site's cache is cleared:

- **Drupal:** use the built-in option found in the Drupal dashboard at `/admin/config/development/performance`.

- **WordPress:** install a plugin like [Autoptimize](https://wordpress.org/plugins/autoptimize/) to add a similar option in the WordPress admin dashboard. Be aware, Autoptimize requires [additional configuration](/plugins-known-issues/#autoptimize) to write files within the standard `wp-content/uploads` path.

[Clear the site cache](/clear-caches) after deleting static files. [Clear the Global CDN cache](/global-cdn#cache-clearing), if deleted static files are still visible in the live environment after clearing your site cache.

## Using Your Own Session-Style Cookies

Pantheon passes all cookies beginning with SESS that are followed by numbers and lowercase characters back to the application. When at least one of these cookies is present, the Global CDN will not try to respond to the request from its cache or store the response.

### Drupal Sites

Drupal uses SESS-prefixed cookies for its own session tracking, so be sure to name yours differently if you choose to use one. Generally, SESS followed by a few words will work.

**Correct:** SESSmysessioncookie, SESShello123, SESSletsgo

**Incorrect:** SESS\_hello, SESS-12345, mycustomSESS, Sessone, sess123testing, SESSFIVE

### WordPress Sites

WordPress does not use PHP session cookies; however, some themes and plugins do. If you are using a theme or plugin that requires PHP sessions, you can install the [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions/ "Pantheon Session WordPress plugin") plugin. It is designed to handle the naming properly.

### Session and Cookie Lifetime

Pantheon allows developers to control the length of sessions. There are two pieces: the lifetime of the cookie and the lifetime of the session itself.

Session cookie lifetime is configured using the [session.cookie\_lifetime](https://secure.php.net/manual/en/session.configuration.php#ini.session.cookie-lifetime) PHP setting. If set to 0, the cookie is deleted when the user closes their browser. Session cookie lifetime is set to 2,000,000 seconds in Drupal's default.settings.php and in Pantheon's PHP configuration.

Drupal's [session garbage collection](https://api.drupal.org/api/drupal/includes%21session.inc/function/_drupal_session_garbage_collection/7) uses the [session.gc\_maxlifetime](https://secure.php.net/manual/en/session.configuration.php#ini.session.gc-maxlifetime) PHP setting when deleting expired sessions from the sessions database table. Session max lifetime is set to 200,000 seconds in Drupal's default.settings.php and in Pantheon's PHP configuration.

For additional details and examples on how to set cookie lifetimes and garbage collection manually, see the [documentation within default.settings.php](https://github.com/pantheon-systems/drops-7/blob/master/sites/default/default.settings.php#L314-L336).

#### Drupal 7

Session cookie lifetime and session garbage collection can be overridden in your `settings.php` file. For additional details and examples on how to set cookie lifetimes and garbage collection manually, see the [documentation within default.settings.php](https://github.com/pantheon-systems/drops-7/blob/master/sites/default/default.settings.php#L314-L336).

#### Drupal 9

Session cookie lifetime and session garbage collection can be configured as `session.storage.options` parameters in a services.yml file. To override core session behavior, create a copy of the services.yml file (see [Creating a services.yml File for Drupal 9](/services-yml)), and adjust the `gc_maxlifetime` and `cookie_lifetime` values as needed.

## Geolocation, Referral Tracking, Content Customization, and Cache Segmentation

A site may need to deliver different content to different users without them logging in or starting a full session (either of which will cause them to bypass the page cache entirely). Pantheon recommends doing this on the client side using browser detection, orientation, or features like aspect ratio using HTML5, CSS3, and JavaScript. Advanced developers can also use STYXKEY.

### Using Modernizr

[Modernizr](https://modernizr.com/) is a JavaScript library that detects HTML5 and CSS3 features in the user's browser. This will also allow requests to have the benefit of being saved in the Global CDN and rendering correctly, depending on the requirements. Modernizr is available as a [Drupal module](https://www.drupal.org/project/modernizr) or a [WordPress plugin](https://wordpress.stackexchange.com/questions/62340/loading-modernizr-or-other-javascript-libraries-for-use-in-a-plugin/62362#62362).

### Device Detection

We do not recommend using cookies that are passed to the backend for mobile theme detection and configuration. This will cause issues scaling requests within your site in case of any load or traffic spikes, as it requires at least the initial hit to make it to the backend before anonymous traffic can be cached by the Global CDN. If you receive more uncached visitors than your Nginx and PHP processes, it can result in timeouts and server errors.

#### Best Practice Recommendations

We recommend handling mobile detection using Responsive Web Design (RWD) techniques with HTML5, CSS3, and JavaScript. This will avoid the need to compromise potential scalability in order to scale traffic. HTML5 and CSS3 is the high performance route, as you save on the back-end load and browsers.

**Issue**
Implementing the mobile site on a different domain, subdomain, or subdirectory from the desktop site.

**Recommended Solution**
While Google supports multiple mobile site configurations, creating separate mobile URLs greatly increases the amount of work required to maintain and update your site, and introduces possible technical problems. You can simplify things significantly by using responsive web design and serving desktop and mobile on the same URL. **Responsive web design is Google’s recommended configuration.**

More information on mobile site best practices can be found in Google's official developer documentation:

- [Why make a website mobile-friendly?](https://developers.google.com/search/mobile-sites/#why)
- [What are the top three things I should know when building a site for mobile devices?](https://developers.google.com/search/mobile-sites/get-started#key)
- [What are the top three mistakes beginners want to avoid?](https://developers.google.com/search/mobile-sites/get-started#mistakes)

A full list of the devices and their support for HTML5 is available on [https://html5test.com](https://html5test.com):

- [Desktop browsers](https://html5test.com/results/desktop.html)
- [Tablet browsers](https://html5test.com/results/tablet.html)
- [Mobile browsers](https://html5test.com/results/mobile.html)
- [Other browsers](https://html5test.com/results/other.html)

### Using STYXKEY

The Global CDN only passes cookies in your allowlist. To use custom cookies with Drupal or WordPress, you can set a cookie beginning with `STYXKEY` followed by one or more alphanumeric characters, hyphens, or underscores.

For example, you could set a cookie named `STYXKEY_country` to `ca` or `de` and cache different page content for each country. A site can have any number of `STYXKEY` cookies for varying content.

In your code, remember to first check whether the incoming request has the `STYXKEY` cookie set. If it does, generate the different version of the page, but don't set the cookie again, i.e. don't respond with another `Set_Cookie:` header. If the code tries to set the cookie again, the Global CDN will not cache that page at all, as it cannot cache a response that contains a `Set_Cookie:` header.

<Alert title="Note" type="info">

`STYXKEY` is not a replacement for responsive design.

</Alert>

**Examples of `STYXKEY` cookie names:**

- `STYXKEY_mobile-ios`: Delivers different stylesheets and content for iOS devices

- `STYXKEY_european_user`: Presents different privacy options to E.U. users

- `STYXKEY_under21`: Part of your site markets alcohol and you want to change the content for minors

- `STYXKEY_school`: Your site changes content depending on the user's school affiliation

**Invalid names that won't work:**

- `STYXKEY`: Needs something after the `STYXKEY` text

- `styxkey_android`: The text `STYXKEY` must be uppercase

- `STYX-KEY_android`: The text `STYXKEY` cannot be hyphenated or contain other punctuation

- `STYXKEY.tablet`: The only valid characters are a-z, A-Z, 0-9, hyphens ("-"), and underscores ("\_")

- `tablet_STYXKEY`: The cookie name must start with `STYXKEY`

## Public Files and Cookies

Pantheon strips cookies from requests made to public files served from `sites/default/files` in Drupal and `wp-content/uploads` in WordPress. This allows the Global CDN to cache the response.

## File Suffixes and Cookies

Pantheon strips cookies for any file ending with the following extensions, even if the file is dynamically generated by Drupal or WordPress:

`png` |  `gif` |  `jpeg` |  `jpg` |  `ico` |  `bmp` |  `tif` |  `tiff` |  `webp` |  `swf` |  `css` |  `js` |  `woff` |  `woff2` |  `svg` |  `ttf` |  `otf` |  `eot`

## 404s

Pantheon’s default is to not cache 404s, but if your application sets `Cache-Control:max-age headers`, the Global CDN will respect them. Depending on your use case, that may be the desired result.

### Drupal Sites

Drupal’s `404_fast_*` configuration does not set caching headers. Some contributed 404 modules include cache-friendly headers, which will cause a 404 response to be cached.

### WordPress Sites

WordPress does not set cache headers by default, 404 or otherwise. If your site has a Permalinks option set other than default, WordPress will return your theme's 404 page. Unless a plugin sets cache friendly headers, your 404 page will not be cached.

## Environment Access Locked

If you're using the [Security tool](/security) within the Pantheon Site Dashboard to lock an environment, the Global CDN will not cache responses. Disable basic authentication by setting environment access to **Public**.

## Cookie Handling

<Partial file="cache-busting.md" />
