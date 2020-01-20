---
title: WordPress Plugins and Themes with Known Issues
description: A list of WordPress plugins, themes, and functions that are not supported and/or require workarounds.
tags: [debugcode, siteintegrations]
categories: [troubleshoot, integrate]
contributors: [aleksandrkorolyov]
---

This page lists WordPress plugins, themes, and functions that may not function as expected or are currently problematic on the Pantheon platform. This is not a comprehensive list (see [other issues](#other-issues)). We continually update it as problems are reported and/or solved. If you are aware of any modules or plugins that do not work as expected, please [contact support](/support/).

We do not prevent you from installing and using these plugins or themes. However, we cannot provide support for incompatible plugins and themes, or if they are used against the guidance provided here.

**Plugin & Theme Maintainers:** If your work is listed here, please [reach out to us](https://github.com/pantheon-systems/documentation/issues/new?title=Modules%20and%20Plugins%20with%20Known%20Issues%20Doc%20Update%20&body=Re%3A%20%5BModules%20and%20Plugins%20with%20Known%20Issues%5D(https%3A%2F%2Fpantheon.io/docs/modules-plugins-known-issues/)%0A%0APriority%20(Low%E2%80%9A%20Medium%E2%80%9A%20High)%3A%0A%0A%23%23%20Issue%20Description%3A%0A%0A%23%23%20Suggested%20Resolution%20&labels=fix%20content). We're happy to help provide information that can lead to conflict resolutions between your code and the platform.

If your work is already updated but still listed here, let us know so we can remove it, or [submit a pull request](https://github.com/pantheon-systems/documentation/edit/master/source/_docs/modules-plugins-known-issues.md).

### Assumed Write Access

Some plugins and themes are built on the assumption that the CMS has write access to the entire filesystem. While this is usually true of standard LAMP/LEMP stack server configuration, Pantheon and other specialized platforms do not. This can result in runtime errors when the software can't write to locations in the code base in Test and Live environments.

See [Use the Pantheon WebOps Workflow](/pantheon-workflow) for more information on how Pantheon differentiates "code" from "files".

The solution to these issues is usually to create a symlink from the plugin's expected write location to a location in the writable filesystem (`/sites/default/files` for Drupal, `wp-content/uploads` for WordPress). This process is detailed in [Using Extensions That Assume Write Access](/assuming-write-access).

The following is a list of plugins that assumes write access, and the specific file or folder that needs to be symlinked to resolve:

+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------------------------------+
| Plugin                                                                                        | Assumed Write Path                                    | Notes                                                                           |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------------------------------+
|                                                                                               | wp-content/ai1vm-backups                              | The platform is not designed for large backup files. You can download           |
| [All-in-One WP Migration](https://wordpress.org/plugins/all-in-one-wp-migration/)             +-------------------------------------------------------+ full backups [from the Site Dashboard](/backups). See [below](#autoptimize)     |
|                                                                                               | wp-content/plugins/all-in-one-wp-migrations/storage   | for additional options.                                                         |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------------------------------+
| [Autoptimize](https://wordpress.org/plugins/autoptimize/)                                     | wp-content/resources                                  | See the [Autoptimize](#autoptimize) section below for other solutions.          |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------------------------------+
|                                                                                               | wp-content/et-cache                                   | Remember to repeat this process for each environment,                           |
| [Divi WordPress Theme & Visual Page Builder](https://www.elegantthemes.com/gallery/divi/)     |                                                       | including multidevs.                                                            |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------------------------------+
|                                                                                               |                                                       | You can override this path on the plugin configuration page                     |
| [NextGEN Gallery](https://wordpress.org/plugins/nextgen-gallery/)                             | wp-content/gallery                                    | (`/wp-admin/admin.php?page=ngg_other_options`) to use                           |
|                                                                                               |                                                       | wp-content/uploads/gallery/ instead of creating a symlink.                      |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------------------------------+
| [WooZone](https://codecanyon.net/item/woocommerce-amazon-affiliates-wordpress-plugin/3057503) | wp-content/plugins/woozone/cache                                                                                                        |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------------------------------+
| [WP-Rocket](https://wp-rocket.me/)                                                            | wp-content/wp-rocket-config                                                                                                             |
|                                                                                               +-----------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                               | wp-content/cache                                                                                                                        |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------------------------------+
| [WPML - The WordPress Multilingual Plugin](https://wpml.org/)                                 | wp-content/languages                                  | [See below](#wpml---the-wordpress-multilingual-plugin) For alternate solutions. |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------------------------------+
| [WP Fastest Cache](https://wordpress.org/plugins/wp-fastest-cache/)                           | wp-content/cache                                      | This plugin uses `is_dir` to verfiy the target directory, which will return     |
|                                                                                               |                                                       |false if the directory is a symlink. This causes a permissions error when        |
|                                                                                               |                                                       |  deleting cache files.                                                          |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------------------------------+

### Define FS_METHOD

There are several plugins and themes that have issues on Pantheon due to the way they access files. By defining the `FS_METHOD` as `direct` in `wp-config.php` above the line `/* That's all, stop editing! Happy Pressing. */`, we can easily avoid these issues:

```php:title=wp-config.php
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    define('FS_METHOD', 'direct');
}
```

Plugins and Themes with issues resolved by this include:

- [Divi WordPress Theme & Visual Page Builder](https://www.elegantthemes.com/gallery/divi/)
- [Event Espresso](https://eventespresso.com/)
- [SmartCrawl Pro](https://premium.wpmudev.org/project/smartcrawl-wordpress-seo/)
- [Visual Composer: Website Builder](https://visualcomposer.io/)
- [WPBakery: Page Builder](https://wpbakery.com/)
- [YotuWP Easy YouTube Embed](https://wordpress.org/plugins/yotuwp-easy-youtube-embed/)

## [AMP for WP – Accelerated Mobile Pages](https://wordpress.org/plugins/accelerated-mobile-pages/)

<ReviewDate date="2019-12-5" />

**Issue:** Enabling the Mobile Redirection feature within AMP for WP sends a session cookie which conflicts with platform-level page caching. See the  [WordPress support forum](https://wordpress.org/support/topic/varnish-compatibility-issue-with-session-keys/) for details.

**Solution:** Disable the option for Mobile Redirection within the AMP for WP options page. Then handle mobile redirection via PHP within `wp-config.php`, for example:

```php:title=wp-config.php
if ((is_mobile())&&(strrpos($_SERVER['REQUEST_URI'],'amp') == false)) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location: https://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] .'/amp');

  // Name transaction "redirect" in New Relic for improved reporting (optional).
  if (extension_loaded('newrelic')) {
    newrelic_name_transaction("redirect");
  }
  exit();
}
function is_mobile() {
  if ( empty($_SERVER['HTTP_USER_AGENT']) ) {
          $is_mobile = false;
  }
  elseif ( strpos($_SERVER['HTTP_USER_AGENT'], 'Mobile') !== false // many mobile devices (all iPhone, iPad, etc.)
          || strpos($_SERVER['HTTP_USER_AGENT'], 'Android') !== false
          || strpos($_SERVER['HTTP_USER_AGENT'], 'Silk/') !== false
          || strpos($_SERVER['HTTP_USER_AGENT'], 'Kindle') !== false
          || strpos($_SERVER['HTTP_USER_AGENT'], 'BlackBerry') !== false
          || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mini') !== false
          || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mobi') !== false ) {
                  $is_mobile = true;
  }
  else {
          $is_mobile = false;
  }
  return $is_mobile;
}
```

___

## [Autoptimize](https://wordpress.org/plugins/autoptimize/)

**Issue:** Autoptimize assumes write access to the site's codebase within the `wp-content/resources` directory, which is not granted on Test and Live environments on Pantheon by design. For additional details, see [Using Extensions That Assume Write Access](/assuming-write-access).

**Solution:** Configure Autoptimize to write files within the standard `wp-content/uploads` path for WordPress (`wp-content/uploads/autoptimize`) by adding the following to `wp-config.php`:

```php:title=wp-config.php
/** Changes location where Autoptimize stores optimized files */
define('AUTOPTIMIZE_CACHE_CHILD_DIR','/uploads/autoptimize/');
```

Be sure to add this configuration _above_ the comment to stop editing:

![Example of Autoptimize configuration above the stop editing comment](../images/autoptimize-config.png)

For additional details, see the [Autoptimize FAQ](https://wordpress.org/plugins/autoptimize/faq). An alternative solution is to [create a symbolic link](/assuming-write-access/#create-a-symbolic-link).

___

## [Better Search And Replace](https://wordpress.org/plugins/better-search-replace/)

<ReviewDate date="2019-09-27" />

**Issue:** Plugin is not accessible in Test or Live (read-only environments in Pantheon) due to the `install_plugins` capability check of the plugin. [Follow this issue on the WordPress support forum](https://wordpress.org/support/topic/not-appearing-on-test-and-live-environments-in-pantheon/).

**Solution 1:** There is an undocumented filter in place to override the capability check. Adding this in the your theme’s `function.php` can make it work:

```php:title=function.php
function better_search_replace_cap_override() {
    return 'manage_options';
}
add_filter( 'bsr_capability', 'better_search_replace_cap_override' );
```

**Solution 2:** Use an alternative Search and Replace plugin like [WP Migrate DB](https://wordpress.org/plugins/wp-migrate-db/)

___

## [Bookly](https://wordpress.org/plugins/bookly-responsive-appointment-booking-tool/)

**Issue:** Sessions are implemented in a way that will not allow it to function with the WP Native Sessions plugin, either installed as a regular plugin or an mu-plugin. [Follow this issue on the WordPress support forum](https://wordpress.org/support/topic/incompatibility-with-wp-native-sessions/).

___

## [Broken Link Checker](https://wordpress.org/plugins/broken-link-checker/)

**Issue:** A low value set for "Check link every X hours" can consume a large amount of server resources.

**Solution:** Ensure that the value is set for the default of 72 hours or greater.

___

## Caching Plugins

This includes but is not limited to:

- [Batcache](https://wordpress.org/plugins/batcache/)
- [W3 Total Cache](https://wordpress.org/plugins/w3-total-cache/)
- [WP Super Cache](https://wordpress.org/plugins/wp-super-cache/).

**Issue:** Conflicts with platform-level page caching.

**Solution:** See [Caching: Advanced Topics](/caching-advanced-topics/) for details on how to bypass the platform page cache.

___

## [Coming Soon](https://wordpress.org/plugins/coming-soon/)

<ReviewDate date="2018-10-03" />

**Issue:** `Maintenance mode` gives the `ERR_TOO_MANY_REDIRECTS` error in the frontend. This plugin uses `503 Header status - Service Temporarily Unavailable` which creates a redirect loop. Please see [this issue](https://wordpress.org/support/topic/plugin-give-err_too_many_redirects-in-pantheon-hosting/) for more details regarding the error.

**Solution:** This plugin only works in the `Coming Soon Mode` on Pantheon, and you need to put content into the **Page Settings** > **Message** so the Coming Soon page won't appear as a blank white page.

Alternatively, if you don't want your site to be crawled by search engines, you can lock it via the platform and you can use a [custom lock page](/security#customize-lock-page).

___

## [Contact Form 7](https://wordpress.org/plugins/contact-form-7/)

<ReviewDate date="2019-02-21" />

**Issue 1:** This plugin relies on `$_SERVER['SERVER_NAME']` and `$_SERVER['SERVER_PORT']`, which pass static values subject to change over time during routine platform maintenance.

**Solution:** Add the following to `wp-config.php`:

```php:title=wp-config.php
$_SERVER['SERVER_NAME'] = $_SERVER['HTTP_HOST'];

if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  if (isset($_SERVER['HTTP_USER_AGENT_HTTPS']) && $_SERVER['HTTP_USER_AGENT_HTTPS'] === 'ON') {
    $_SERVER['SERVER_PORT'] = 443;
  }
  else {
    $_SERVER['SERVER_PORT'] = 80;
  }
}
```

For more details, see [SERVER_NAME and SERVER_PORT on Pantheon](/server_name-and-server_port/).

**Issue 2:** Local file attachments set in the admin panel cannot come from the `uploads` folder. As described in [this plugin issue](https://wordpress.org/support/topic/local-file-attachments-do-not-work-in-pantheon-hosting/), the plugin code fails for upload directories that are symlinks.

**Solution:** Until the plugin is updated to allow symlink paths, you can commit your local attachment files to the code base in `wp-content` or another subdirectory thereof.

___

## [Constant Contact Forms](https://wordpress.org/plugins/constant-contact-forms/)

<ReviewDate date="2018-08-24" />

**Issue:** The Constant Contact Forms plugin adds dependencies using Composer and provides a .gitignore file which prevents these dependencies from being picked up by Git. This leads to problematic deployments as not all code moves forward to Test and Live.

**Solution:** Remove .gitignore files from the `constant-contact-forms` and `constant-contact-forms/vendor/psr/log` directories.

___

## [Disable REST API and Require JWT / OAuth Authentication](https://wordpress.org/plugins/disable-rest-api-and-require-jwt-oauth-authentication/)

<ReviewDate date="2019-04-01" />

**Issue:** When this plugin is enabled along with WooCommerce, WP-CLI and Pantheon dashboard workflows like **Cache Clear** can fail. This issue may not happen for environments where WP-CLI is not installed (local machine, other platforms, etc):

```none
Fatal error: Uncaught Error: Call to undefined method WP_Error::get_data() in /srv/bindings/.../code/wp-content/plugins/woocommerce/includes/cli/class-wc-cli-runner.php:64
```

For WooCommerce, the CLI runner needs some of the REST endpoints for it to function. The plugin is only allowing a specific set of paths for allowed access.

**Solution:** In the `plugin.php` file, edit the `if ( ! is_user_logged_in() ) ` conditional to include a check for CLI PHP requests:

```php:title=plugin.php
    if ( ! is_user_logged_in() && php_sapi_name() != 'cli' ) {

        // Only allow these endpoints: JWT Auth.
        $allowed_endpoints = array(
            '/jwt-auth/v1/token/validate',
            '/jwt-auth/v1/token',
            '/oauth/authorize',
            '/oauth/token',
            '/oauth/me',
    );
    $allowed_endpoints = apply_filters( 'reqauth/allowed_endpoints', $allowed_endpoints );

```

___

## [Divi WordPress Theme & Visual Page Builder](https://www.elegantthemes.com/gallery/divi/)

<ReviewDate date="2019-11-27" />

**Issue:** Divi Themes Visual Page Builder may produce the following error when attempting to edit pages because the page builder is attempting to write to three different nested folders in the web root:

```php
.../data/Utils.php:758  ET_Core_Data_Utils::WPFS():
[ERROR]: Unable to write to filesystem. Please ensure that the web server process has write access to the WordPress directory.
```

**Solution 1:**  The most reliable solution is to access the Divi Theme Options > Builder > Advanced section and disable Static CSS File Generation.

**Solution 2:**

Create a [symlink](#assumed-write-access).

___

## [Event Espresso](https://eventespresso.com/)

<ReviewDate date="2018-11-15" />

**Issue:** Event Espresso shows the error:

```none
PHP Fatal error: Uncaught EE_Error: An attempt to access and/or write to a file on the server could not be completed due to a lack of sufficient credentials.
```

**Solution:** [Define `FS_METHOD`](#define-fs_method).

___

## [EWWW Image Optimizer](https://wordpress.org/plugins/ewww-image-optimizer/)

<ReviewDate date="2018-10-16" />

**Issue:** EWWW Image Optimizer attempts to install and execute third party binary tools to perform image optimization, which is restricted on our platform. The error message is:

> EWWW Image Optimizer uses jpegtran, optipng, pngout, pngquant, gifsicle, and cwebp. You are missing: jpegtran, optipng, gifsicle. Please install via the Settings Page or the Installation Instructions.

The solutions [outlined in the EWWW documentation](https://docs.ewww.io/article/6-the-plugin-says-i-m-missing-something) do not apply to Pantheon.

**Solution:** Use an alternative plugin like [EWWW Image Optimizer Cloud](https://wordpress.org/plugins/ewww-image-optimizer-cloud/), which is a cloud version of the plugin that executes the compression from an external service instead of the server. Another alternative that works well with the default configuration is [Smush Image Compression and Optimization](https://wordpress.org/plugins/wp-smushit/).

___

## [FacetWP](https://facetwp.com)

<ReviewDate date="2019-10-15" />

**Issue:** FacetWP [conflicts with New Relic](https://facetwp.com/new-relic-compatibility/).

**Solution:** [Disable New Relic](/new-relic#disable-new-relic-browser-monitoring-agent) when using FacetWP.

___

## [Fast Velocity Minify](https://wordpress.org/plugins/fast-velocity-minify/)

<ReviewDate date="2019-10-12" />

**Issue:** Site suddenly shows a white screen of death.

**Solution:** Because the binding path can change on our Platform, the cache folder path may change. To manually reconfigure the cache path, go to Fast Velocity Minify's Settings tab, and click **Cache Location**. Remember to [clear the cache from Pantheon](/clear-caches/) and [flush the Redis cache](/redis/#clear-cache).

___

## [Force Login](https://wordpress.org/plugins/wp-force-login/)

<ReviewDate date="2018-07-26" />

**Issue:** This plugin appends a port number using `$_SERVER['SERVER_PORT']` at the end of the URL when the user logs in to the site.

**Solution:** See [Set SERVER_PORT Correctly](https://pantheon.io/docs/server_name-and-server_port/#set-server_port-correctly).

___

## [H5P](https://wordpress.org/plugins/h5p/)

<Partial file="h5p-known-issues.md" />

___

## [InfiniteWP](https://infinitewp.com)

<ReviewDate date="2019-10-01" />

**Issue 1:** Installing the InfiniteWP admin panel on a Pantheon hosted site is not possible, because the plugin hardcodes the database credentials and uses a custom port in the URL. Our platform offers database credentials and offers them as an environment variable, and does not allow web access on ports other than `80` and `443`.

**Issue 2:** Cannot remotely update core, or install/update themes and plugins in the Test and Live environments.

**Solution:** Due to the [read only nature of Test and Live environments](/pantheon-workflow/#understanding-write-permissions-in-test-and-live), remote updates can only be done in Dev, then deployed to Test and Live environment. Consider using a [Custom Upstream](/custom-upstream/) or [WP Site Network](/guides/multisite/) instead if you are deploying similar codebase, theme and plugins for a group of sites hosted on Pantheon.

___

## [Instashow](https://elfsight.com/instagram-feed-instashow/)

**Issue:** The Instashow plugin relies on query parameters that are not compatible with Pantheon's Edge Cache. See [PANTHEON_STRIPPED](/pantheon_stripped/) for more information. This inhibits the ability to set the authorization token required to make the plugin function.

___

## [iThemes Security](https://wordpress.org/plugins/better-wp-security/)

<ReviewDate date="2019-01-01" />

**Issue 1:** The "File Change Detection" check in iThemes Security warns site admins when files are modified. On Pantheon, automated backups will trigger this warning.

**Solution:** Disable the "File Change Detection" component of the plugin. Code files in the Test and Live environments are not writable, so this is not a security risk on Pantheon.

**Issue 2:** iThemes Security attempts to modify `nginx.conf`, `.htaccess` and `wp-config.php`. Components that need write access to these files will not work since `nginx.conf` [cannot be modified](/platform-considerations/#nginxconf) and code files on the Test and Live environments are not writable.

**Solution:** Modifications to `wp-config.php` should be done in Dev or Multidev environments, then deployed forward to Test and Live.

___

## [Maintenance Mode](https://wordpress.org/plugins/lj-maintenance-mode/)

**Issue:** Maintenance Mode causes a redirect loop on all pages for logged out users when the maintenance mode option is checked.

**Solution:** If you are locked out of your site, wp-login.php will still function and you can login to disable the maintenance mode plugin.
___

## [ManageWP worker](https://wordpress.org/plugins/worker/)

<ReviewDate date="2018-10-12" />

**Issue 1:** Error when adding a site in the ManageWP dashboard:

> Site could not be added - Bad HTTP response (403 Forbidden)

This error sometimes leads users to believe that ManageWP's IP addresses need to be whitelisted on the platform.

**Solution:** Pantheon does not block any IPs, and there is nothing that would require a whitelist. Most likely there is a security plugin that temporary blocks the connection, or a conflicting plugin like those listed [here](https://managewp.com/user-guide/known-issues). Temporary disable all other plugins, or the security plugins, then try adding your site again. For full troubleshooting, consult the [ManageWP troubleshooting page](https://managewp.com/troubleshooting/site-connection/why-cant-i-add-some-of-my-sites).

**Issue 2:** Cannot remotely update core, or install/update themes and plugins in the Test and Live environments.

**Solution:** Due to the [read only nature of Test and Live environments](/pantheon-workflow/#understanding-write-permissions-in-test-and-live), remote updates can only be done in Dev, then deployed to Test and Live environment. Consider using a [Custom Upstream](/custom-upstream/) or [WP Site Network](/guides/multisite/) instead if you are deploying similar codebase, theme and plugins for a group of sites hosted in Pantheon.

**Issue 3:** Cannot remotely update core, or install/update theme and plugins in the Dev environment.

**Solution:** Make sure you are in [SFTP mode](/sftp/#sftp-mode) instead of Git mode.

___

## [Monarch Social Sharing](https://www.elegantthemes.com/plugins/monarch/)

**Issue:** Seems to break WP-CLI, which is used by many of our workflows (clone, clear cache).

___

## [New Relic Reporting for WordPress](https://wordpress.org/plugins/wp-newrelic/)

<ReviewDate date="2019-05-08" />

**Issue:** This plugin sets up redundant configurations (`appname` and `framework`) with the [Pantheon New Relic](/new-relic/) configuration, resulting in new applications in New Relic. This behavior may break compatibility with New Relic integrations such as [QuickSilver scripts](/quicksilver/).

___

## [Popup Builder – Responsive WordPress Pop up – Subscription & Newsletter](https://wordpress.org/plugins/popup-builder/)

<ReviewDate date="2019-12-06" />

**Issue:** This plugin stores full file paths to the options table, which breaks across multiple application containers.

**Solution:** A [user patch](https://gist.github.com/kshaner/7fcbc7e3e967c5694fd38638bff1cc17/revisions) has been [submitted](https://wordpress.org/support/topic/absolute-path-causes-issues-on-environments-with-multiple-containers/) to the plugin maintainers.

___

## [PolyLang](https://wordpress.org/plugins/polylang/)

<ReviewDate date="2019-12-19" />

**Issue:** This plugin adds a cache-busting cookie (ex. `pll_language=en`) for each request.

**Solution:** Define the constant `PLL_COOKIE` to false in `wp-config.php` to remove the cookie:

```php:title=wp-config.php
define('PLL_COOKIE', false)
```

The value of `PLL_COOKIE` defaults to `pll_polylang`. This defines the name of the cookie used by Polylang to store the visitor's language. When `PLL_COOKIE` is set to false, Polylang does not set any cookie. Be aware that in this case some features of the plugin may not work completely. For example, the login page will not be translated.

See the [plugin documentation](https://polylang.pro/doc/php-constants/) for more information on its PHP constants.

___

## [Query Monitor](https://wordpress.org/plugins/query-monitor/)

**Issue:** Creates a symlink with an absolute path, which will only work on the appserver where the plugin was installed. The plugin is not fully designed for cloud or multi server environments.

**Alternatives:** Pantheon has tools in place to monitor database queries:

- [MySQL Slow Log](https://pantheon.io/docs/mysql-slow-log/)
- [MySQL Troubleshooting with New Relic Pro](https://pantheon.io/docs/debug-mysql-new-relic/)

___

## [Object Sync for Salesforce](https://wordpress.org/plugins/object-sync-for-salesforce/)

<ReviewDate date="2018-08-24" />

**Issue:** The Object Sync for Salesforce plugin adds dependencies using Composer, and one of these dependencies provides a .gitignore file which prevents files from being picked up by Git. This leads to problematic deployments as not all code moves forward to Test and Live.

**Solution:** Remove the `.gitignore` file from the `object-sync-for-salesforce/vendor/pippinsplugins/wp-logging` directory.

___

## [Redirection](https://wordpress.org/plugins/redirection/)

<ReviewDate date="2019-01-17" />

**Issue:** Customers have reported issues with 404 logging creating large database tables, reducing site performance.

**Solution:** Consider using PHP code to set up your redirects. See [Configure Redirects](/redirects/) for more information.

___

## [Revive Old Post](https://wordpress.org/plugins/tweet-old-post/)

**Issue:** Revive Old Post does not set a proper callback via OAuth and the Twitter module.  It attempts to use `["SERVER_NAME"]` instead of the recommended `["HTTP_HOST"]`. See [SERVER_NAME and SERVER_PORT on Pantheon](/server_name-and-server_port/).

___

## [SendGrid Subscription Widget](https://wordpress.org/plugins/sendgrid-email-delivery-simplified/)

<ReviewDate date="2018-10-13" />

**Issue:** The email confirmation link sent from the Subscription Widget goes to a redirect loop (see the [open issue on wp.org](https://wordpress.org/support/topic/email-sent-from-the-subscription-widget-goes-to-a-redirect-loop-in-pantheon)). The link created uses a URL `GET` parameter `__sg_api`, which has double underscores. The platform strips this type of parameter to improve [caching performance](/pantheon_stripped/#which-query-parameters-are-optimized).

**Solution:** Manually change the the parameter `__sg_api` to any variable (like `sg_api`) without double underscores as prefix in the following lines of `sendgrid-email-delivery-simplified/lib/class-sendgrid-mc-optin.php`:

- Line 25:  `$vars[] = '__sg_api';`
- Line 40:  `if( isset( $wp->query_vars['__sg_api'] ) )`
- Line 146: `$confirmation_link = site_url() . '/?__sg_api=1&token=' . $token;`

<Alert title="Warning" type="danger">

This workaround may potentially break again with the next plugin update, and you will need to manually reapply the modification.

</Alert>

___

## [SmartCrawl Pro](https://premium.wpmudev.org/project/smartcrawl-wordpress-seo/)

<ReviewDate date="2018-10-17" />

**Issue:** The sitemap URL linked by the plugin produces a `500 Internal Server Error` on Test and Live environments. This results in a PHP error: `class not found WP_Filesystem_Direct`. See more [details about the issue](https://premium.wpmudev.org/forums/topic/smartcrawl-pro-class-wp_filesystem_direct-not-found).

**Solution:** [Define `FS_METHOD`](#define-fs_method).

Alternative plugins that have an XML sitemap feature that works well on the platform include:

- [Google Sitemap Generator](https://wordpress.org/plugins/google-sitemap-generator/)
- [Yoast](https://wordpress.org/plugins/wordpress-seo/)

___

## [Timthumb](https://code.google.com/p/timthumb/)

**Issue:** TimThumb is no longer supported or maintained.

___

## [TubePress Pro](https://tubepress.com/)

**Issue:** Sites running PHP version 5.3 produce a WSOD after activating this plugin.

**Solution:** [Upgrade your site's PHP version](/php-versions) to 5.5, 5.6, or 7.0.

___

## [Unbounce Landing Pages](https://wordpress.org/plugins/unbounce/)

<ReviewDate date="2019-02-13" />

**Issue:** Click to call conversions aren't tracking even if the pages are not cached because the cookies are being stripped.

 **Solution:** Usually these type of issues can be solved if the cookie name can be renamed with a prefix starting with `STXKEY_`, but it is inadvisable to modify the plugin directly. It is suggested by the Unbounce team to separate your Pantheon site domain (eg. example.com) and the Unbounce landing page in a subdomain (e.g., unbounce.example.com), because your Unbounce landing pages can't live at exactly the same URL as your homepage. See the outlined solution [here](https://documentation.unbounce.com/hc/en-us/articles/203661044-Connecting-Your-Domain-to-Unbounce) or get in touch with Unbounce support for more help.

___

## [UNLOQ Two Factor Authentication (2FA)](https://wordpress.org/plugins/unloq/)

<ReviewDate date="2018-10-08" />

**Issue:** `This widget does not work on this domain` error message shown after deploying plugin across environments on Pantheon. This is because the API credentials used on the original environment are being used on a new environment URL, which is not allowed by the plugin. This is by design.

**Solution:** Manually change `unloq_credentials` key in the`wp_options` table. Alternatively, you can re-create an application by resetting your plugin installation (deactivate, delete entries, etc.).

For an alternative 2FA plugin, see [Secure Your Site with Two-Factor Authentication](/guides/two-factor-authentication/#single-site-tfa).

___

## [Unyson Theme Framework](https://wordpress.org/plugins/unyson/)

<ReviewDate date="2018-10-05" />

**Issue:** This plugin has an internal extension system which installs additional files aside from the plugin itself. Some of those extensions have an additional `.gitignore` file that prevents it from being deployed to Test and Live environment. See [this GitHub issue](https://github.com/ThemeFuse/Unyson/issues/3615) for more information.

**Solution:** When using these Unyson Extensions, manually delete the `.gitignore` files in the corresponding locations:

Page builder:

- `wp-content/plugins/framework/extensions/shortcodes/.gitignore`
- `wp-content/plugins/framework/extensions/shortcodes/extensions/page-builder/.gitignore`

WordPress Shortcodes:

- `wp-content/plugins/unyson/framework/extensions/shortcodes/.gitignore`

Translate Press:

- `wp-content/plugins/unyson/framework/extensions/shortcodes/.gitignore`

Events:

- `wp-content/plugins/unyson/framework/extensions/events/.gitignore`

Brizy:

- `wp-content/plugins/brizy/vendor/twig/twig/.gitignore`

___

## [Visual Composer: Website Builder](https://visualcomposer.io/)

<ReviewDate date="2018-08-27" />

**Issue:** This plugin fails to download additional assets during the internal plugin activation procedure on Test and Live environments.

**Solution 1: New sites, without existing Test and Live environments:** If this plugin is installed and activated on a new site _before_ the Test and Live environments are created, it will properly transfer all assets and database settings to the additional environments.

**Solution 2: Sites with existing Test and Live environments:** To activate the plugin on sites with existing Test and Live environments, [define `FS_METHOD`](#define-fs_method).

___

## [Weather Station](https://wordpress.org/plugins/live-weather-station/)

**Issue:** This module uses [`php-intl`]( https://secure.php.net/manual/en/intro.intl.php), which is not currently supported by Pantheon.

___

## [WooCommerce](https://wordpress.org/plugins/woocommerce/)

<ReviewDate date="2018-01-10" />

**Issue:** The "batch upload" process can fail during large uploads. The platform has a 120 second timeout limit for scripts, and large upload processes can hit this limit.

**Solution 1:** The suggested workaround is to clone the site locally, import the items, then sync the database back up to the platform.

**Solution 2:** If you don't have a local copy, SFTP into any environment's `wp-content/uploads` folder and upload the CSV file that you wish to import. Under the advanced settings of the WooCommerce import, specify the exact path where you uploaded the CSV file and import from there:

![Enter the path to the CSV on the Import products from a CSV file page](../images/woocommerce/woocommerce-path-csv.png)

There is a feature request on [WooCommerce's GitHub page](https://github.com/woocommerce/woocommerce/issues/21624) for a WP-CLI import command which would be less prone to timeouts. To express your interest to the developers, click the thumbs up on the feature request.

___

**Issue 2:** A change introduced in WooCommerce 3.6.0 breaks template loading in environments with [multiple application containers](/application-containers#multiple-application-containers).

**Solution:** The issue and a few workarounds possible are described in this [WooCommerce Issue](https://github.com/woocommerce/woocommerce/issues/23751) We hope this issue will result in future code changes to WooCommerce so mitigations are not needed.

___

## [WooZone](https://codecanyon.net/item/woocommerce-amazon-affiliates-wordpress-plugin/3057503)

**Issue 1:** This plugin checks `WP_MEMORY_LIMIT`, which defaults to 40MB, instead of `ini_get('memory_limit')`, creating this notice:

![WooZone WP_MEMORY_LIMIT Error](../images/woocommerce/woozone-error.png)

**Solution:** Add the following line to `wp-config.php`:

```php:title=wp-config.php
  define('WP_MEMORY_LIMIT', '256M');
```

___

## [Wordfence](https://wordpress.org/plugins/wordfence/)

**Issue 1:** Enabling the Live Traffic tracking feature within Wordfence sends cookies which conflict with platform-level page caching.

**Solution:** Disable Wordfence-generated cookies by disabling Live Traffic within the Wordfence options page. See the  [WordPress support forum](https://wordpress.org/support/topic/wfvt-cookie?replies=5) for details.

**Issue 2:** The Wordfence firewall expects specific write access to `wp-content/wflogs` during activation. Adding a symlink does not mitigate this, so using the Wordfence firewall is not supported on the platform. This has been [reported as an issue](https://wordpress.org/support/topic/write-logs-to-the-standard-file-path/) within the plugin support forum.

**Issue 3:** The Wordfence firewall installs a file called `.user.ini` that includes `wordfence-waf.php` from the absolute path which uses the application container's ID. These paths will change from time to time due to routine platform maintenance. When a container is migrated and when this plugin is deployed to another environment the absolute path is no longer valid resulting in a WSOD. This has been [reported as an issue](https://wordpress.org/support/topic/set-auto_prepend_file-path-relatively/) within the plugin support forum.

___

## [WordPress Social Login](https://wordpress.org/plugins/wordpress-social-login/)

**Issue 1:** This plugin attempts to access PHP native sessions [before WordPress has been bootstrapped](https://wordpress.org/support/topic/plugin-starts-before-wordpress/), which prevents the Pantheon PHP native sessions plugin from being called. This leads to a 500 error when authenticating with external services.

**Solution:** While *not recommended*, you can add the following lines to `wp-config.php` before the first call to `session_start`:

```php:title=wp-config.php
if (defined( "PANTHEON_BINDING" )) {
  include_once( "/srv/bindings/". PANTHEON_BINDING ."/code/wp-blog-header.php" );
}
```

**Please note:** You will need to make this change every time the plugin is updated.

**Issue 2:** This plugin creates a session on every page, which can prevent [page level caching](https://wordpress.org/support/topic/cannot-cache-pages-due-to-sessions-on-every-page-with-wsl-plugin/).

___

## [WP-Rocket](https://wp-rocket.me/)

<ReviewDate date="2019-02-25" />

**Issue 1:** As with other caching plugins, this conflicts with [Pantheon's Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/). The caching feature can be disabled so other features like file optimization, media, etc. can be used side-by-side.

**Solution:**

1. In SFTP mode, install the WP-Rocket plugin to the dev environment by uploading via SFTP or from the WP dashboard.
1. Activate the plugin from the dashboard.
1. Disable WP-Rocket caching by finding the `WP_CACHE` value defined by WP-Rocket in `wp-config.php`, and setting it to false:

   ```php:title=wp-config.php
   define('WP_CACHE', false);
   ```

**Issue 2:** WP-rocket [assumes write access](/assuming-write-access) to read-only file paths in Pantheon.

**Solution:** [Create symlinks](#assumed-write-access) as noted above.

___

## [WPBakery: Page Builder](https://wpbakery.com/)

<ReviewDate date="2018-09-14" />

**Issue:** The Custom CSS and Design Options pages of the plugin (`?page=vc-custom_css`, `?page=vc-color`) try to create new files when saved. Due to problems related to incorrect `FS_METHOD`, files are not created or saved in the expected folder, `wp-content/uploads/js_composer`.

**Solution:** [Define `FS_METHOD`](#define-fs_method).

___

## [WP All Import / Export](http://www.wpallimport.com/)

<ReviewDate date="2018-10-30" />

**Issue 1:** Large batch processes can fail if they take longer than the platform will allow. See [Timeouts on Pantheon](/timeouts) for more information.

**Solution:** To avoid hitting a timeout, you can try:

- Splitting the import or export into smaller parts
- Set the plugin to only process 1 or 2 records per iteration

**Issue 2:** Uploading large import files hits the 59 second [timeout](/timeouts/), or you're getting invalid file paths.

**Solution:** You can upload the import file directly to the plugin's designated writable path `wp-content/uploads/wpallimport/files/`. When creating a new import using `existing file`, the file uploaded should appear there as an option .

**Issue 3:** Upload count does not match the import file.

**Solution:** Under WP All Import Settings, you can:

- Clean up temporary files
- Lower the chunk size to less than 1000
- Check the Enable Stream Reader

___

## [WP Migrate DB](https://wordpress.org/plugins/wp-migrate-db/)

<ReviewDate date="2018-10-17" />

**Issue:** On Test and Live environments, the **Compatibility** settings cannot be configured because this feature requires write access to `wp-content/mu-plugins`. This issue prevents plugins from being included in DB exports and search-and-replace tasks.

**Solution:** The normal search-and-replace and DB export functions of this plugin work, but will leave all plugins disabled while in operation. If a specific plugin is required to remain active during the DB export and search-and-replace operations, add a filter for it as described in the [plugin's debugging page](https://deliciousbrains.com/wp-migrate-db-pro/doc/compatibility-mode/).

___

## [WPML - The WordPress Multilingual Plugin](https://wpml.org/)

<ReviewDate date="2019-10-22" />

**Issue 1:** Locking an environment prevents WPML from operating and returns the following error:  `It looks like languages per directories will not function`.

**Solution:** Make the environment public within the Site Dashboard. For details, see [Security on the Pantheon Dashboard](/security).

___

**Issue 2:** When registering the plugin, accessing `/wp-admin/plugin-install.php?tab=commercial` returns "Sorry, you are not allowed to access this page".

**Solution:** Activate the plugin individually for each environment you want to use the plugin with, as it requires a separate key for each domain. Instead of clicking on **Purchase a subscription or enter an existing site key**, use the **Configure WMPL** button:

![The Configure WMPL Button](../images/wpml-configure.png)

___

**Issue 3:** Upon activating WPML String Translation plugin, you may see this error:

>WPML String Translation is attempting to write .mo files with translations to folder:
>
>/srv/bindings/*******/code/wp-content/languages
>
>This folder appears to be not writable. This is blocking translation for strings from appearing on the site.
>To resolve this, please contact your hosting company and request that they make that folder writable.
>For more details, see WPML's documentation on troubleshooting .mo files generation.

**Solution 1:**

1. In `wp-config.php`, add the following after the `define('WP_TEMP_DIR', $_SERVER['HOME'] .'/tmp');` line:

  ```php:title=wp-config.php
  define('WP_LANG_DIR', $_SERVER['HOME'] .'/files/languages');
  ```

2. Create the `languages` directory inside `/files` for each environment.

**Solution 2:**

Create a symlink for `wp-content/languages` pointing to `wp-content/uploads/languages`. See [Using Extensions That Assume Write Access](/assuming-write-access/) for more information.

___

## [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/)

<ReviewDate date="2018-06-12" />

**Issue:** The redirects for Yoast SEO setting will detect two options for redirect methods, "PHP", and "Web Server". The Web Server option expects write access to the `nginx.conf` file, which is not writable on Pantheon.

**Solution:** Only use the "PHP" redirect method.

___

## [YotuWP Easy YouTube Embed](https://wordpress.org/plugins/yotuwp-easy-youtube-embed/)

<ReviewDate date="2019-11-27" />

**Issue:** The plugin asks for SFTP credentials after installation.

**Solution:** [Define `FS_METHOD`](#define-fs_method).

___

## WordPress Themes

### Self-Updating Themes

Several WordPress themes, including [Jupiter](https://themes.artbees.net/pages/jupiter-wordpress-theme-create-wordpress-websites/), [Nanosoft](https://themeforest.net/item/nanosoft-wp-theme-for-it-solutions-and-services-company/22064051), and [Uncode](https://undsgn.com/uncode/), present a form requesting FTP credentials in order to automatically update its components. This will appear on Dev, Test and Live environments and can be hidden with CSS, but is still present.

The form can be disabled by adding the following to `wp-config.php`, above the line `/* That's all, stop editing! Happy Pressing. */`:

```php:title=wp-config.php
/** Disable theme FTP form */
define('FS_METHOD', 'direct');
define('FS_CHMOD_DIR', ( 0755 & ~ umask() ) );
define('FS_CHMOD_FILE', ( 0755 & ~ umask() ) );
define('FTP_BASE', __DIR__);
define('FTP_CONTENT_DIR', __DIR__ .'/wp-content/');
define('FTP_PLUGIN_DIR', __DIR__ .'/wp-content/plugins/');
```

___

### [Uncode](https://undsgn.com/uncode/)

<ReviewDate date="2019-06-19" />

**Issue:** This theme throws a PHP Fatal error in its settings page for Dev's and Multidev's Git mode, Test and Live.

**Solution:** This theme assumes write access to theme folders `wp-content\themes\uncode\core\assets\css` and `wp-content\themes\uncode\library\css` for it to work properly in git mode. For additional details, see [Using Extensions That Assume Write Access](/assuming-write-access/#uncodetheme).

___

## WordPress Functions

### [add_management_page()](https://developer.wordpress.org/reference/functions/add_management_page/)

**Issue:** Adding a submenu page to the Tools main menu using WordPress roles and capabilities that would read or write files to core, themes, or plugins, is not supported.

For example, the `install_plugins` capability isn't present on the Test or Live environment, therefore  menus created with it will not display. For example:

```php
hook = add_management_page( 'My WP Tool Page', 'My WP Tool',
  'install_plugins', 'mywptool', array( $this, 'admin_page' ), '' );

add_action( "load-$hook", array( $this, 'admin_page_load' ) );
```

This is because write permissions are restricted in Test and Live per the [Pantheon Workflow](/pantheon-workflow/#understanding-write-permissions-in-test-and-live).

**Solution:** You can use another capability such as `read_private_posts` instead.

The list of [WordPress roles and capabilities](https://codex.wordpress.org/Roles_and_Capabilities) that should not be relied upon include:

- `update_core`
- `update_plugins`
- `update_themes`
- `install_plugins`
- `install_themes`
- `upload_plugins`
- `upload_themes`
- `delete_themes`
- `delete_plugins`
- `edit_plugins`
- `edit_themes`

### [wp_filesystem->get_contents()](https://developer.wordpress.org/reference/classes/wp_filesystem_base/get_contents/)

**Issue:** The function `wp_filesystem->get_contents()` can fail when an environment is in Git mode (as Test and Live always are) because it is aware of filesystem-level permissions which are restricted in this mode.

**Solution:** As described in [this StackExchange answer](https://wordpress.stackexchange.com/questions/166161/why-cant-the-wp-filesystem-api-read-googlefonts-json/166172#166172), for cases where file ownership doesn't matter this function could be replaced with `file_get_contents()`. This is true of most cases where the file in question is only being read, not written to.

## Other Issues

Plugins and themes will not work on Pantheon if they:

- Require Apache.
- Require customized `.htaccess` files.
- Need to modify Nginx configuration files.
- Require PostgreSQL or other non-MySQL compatible databases.
