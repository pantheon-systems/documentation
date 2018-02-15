---
title: Modules and Plugins with Known Issues
description: A list of Drupal modules and WordPress plugins that require workarounds or are unsupported.
tags: [debugcode, siteintegrations]
categories: []
---
This article lists modules and plugins that may not function as expected or are currently unsupported on the Pantheon platform. This is not a comprehensive list. We continually update it as problems are reported and/or solved. If you are aware of any modules or plugins that do not work as expected, please [contact our Support team](https://pantheon.io/docs/getting-support/).

We do not prevent you from installing and using these plugins/modules; however, they may not work as expected and we cannot provide troubleshooting support.

**Plugin & Module Maintainers:** If your work is listed here, please [reach out to us](https://github.com/pantheon-systems/documentation/issues/new?title=Modules%20and%20Plugins%20with%20Known%20Issues%20Doc%20Update%20&body=Re%3A%20%5BModules%20and%20Plugins%20with%20Known%20Issues%5D(https%3A%2F%2Fpantheon.io/docs/modules-plugins-known-issues/)%0A%0APriority%20(Low%E2%80%9A%20Medium%E2%80%9A%20High)%3A%0A%0A%23%23%20Issue%20Description%3A%0A%0A%23%23%20Suggested%20Resolution%20&labels=fix%20content){.external}; we're happy to help provide information that can lead to conflict resolutions between your code and the platform. If your work is already updated but still listed here, let us know so we can remove it, or [submit a pull request](https://github.com/pantheon-systems/documentation/edit/master/source/_docs/modules-plugins-known-issues.md){.external}.

## Drupal Modules
<hr>
### [APC - Alternative PHP Cache](https://www.drupal.org/project/apc)
**Issue**: APC is in-memory and limited to a single instance. It cannot span multiple server environments.

**Solution**: Pantheon recommends Redis as a caching backend, which has better performance.
<hr>
### [Adaptive Image Styles](https://www.drupal.org/project/ais)
**Issue**: This module requires edits to the `nginx.conf` which is not currently supported on the platform. See [Platform Considerations](/docs/platform-considerations/#nginx.conf) and [https://www.drupal.org/node/1669182](https://www.drupal.org/node/1669182).
<hr>
### [Apache Solr Multilingual](https://www.drupal.org/project/apachesolr_multilingual)
**Issue**: When the Apache Solr Multilingual module is enabled, the default class variable set by the Pantheon Apache Solr module is changed, and the site will be unable to connect to the Solr server.

If you have already enabled the Apache Solr Multilingual module and found that your site can no longer connect to the Solr server, you will need to first disable and uninstall the module. Next, disable and re-enable the Pantheon Apache Solr module. This will add the class variable back so your site can connect to the Solr server again.
<hr>
### [Acquia Search](https://www.drupal.org/project/acquia_search)
**Issue**: If Acquia Solr modules are present in the site codebase (even if disabled) and Pantheon Apache Solr is enabled, the site will be unable to connect to Solr server.

**Solution**: Delete the Acquia Solr modules from the codebase and then disable and re-enable the Pantheon Apache Solr module.
<hr>
### [Background Process](https://www.drupal.org/project/background_process)
**Issue**: The module allows for Drupal to perform "parallel" (asynchronous non-blocking mode) requests. However, there are a number of limitations working in a distributed environment and function correctly on the platform. See [https://www.drupal.org/node/2233843](https://www.drupal.org/node/2233843).

<hr>
### [Backup and Migrate](https://www.drupal.org/project/backup_migrate)
**Issue**: The Backup and Migrate module can create large archives and cause issues with the tools in the Database / Files tab of the Dashboard. See [Backup Creation](/docs/backups/#why-is-the-drupal-module-backup-%26-migrate-not-recommended-on-pantheon%3F).

**Solution**: You can use the automated backups that are available on the Dashboard for each environment. If you want to access your backups and copy it to your own repository (Amazon S3, FTP server, etc), consider using a bash script. You can do that by running it in your local system, or use an external server, or a service that runs cron jobs for you. See [Access Backups](/docs/backups/#access-backups) for more details.

<hr>
### [Basic HTTP Authentication](https://www.drupal.org/project/basic_auth) - Drupal 7 only
**Issue**: This contrib module conflicts with [Pantheon's Security tool](/docs/security/#password-protect-your-site%27s-environments) when both are enabled on Drupal 7 sites, resulting in 403 errors.

**Solution**: Lock the environment via Pantheon's Security tool or via the module, not both. For details, see [Security on the Pantheon Dashboard](/docs/security/#troubleshoot).

<hr>
### [BigPipe](https://www.drupal.org/documentation/modules/big_pipe)
**Issue**: The Pantheon Edge layer buffers text output, and BigPipe depends on being able to stream text output.

<hr>
### [Boost](https://www.drupal.org/project/boost)
**Issue**: Boost is an unnecessary caching layer that may cause issues. Every site on Pantheon can leverage our robust page caching infrastructure that returns pages for anonymous visitors at the highest possible performance. See [Pantheon's Global CDN](/docs/global-cdn).

<hr>
### [Cache Expiration](https://www.drupal.org/project/expire)
**Issue**: This module doesn't support Pantheon's granular cache clearing and header system.

**Solution**: See [Caching: Advanced Topics](/docs/caching-advanced-topics/) for details on how to bypass page caching.

<hr>
### [CKFinder](https://www.drupal.org/project/wysiwyg_ckfinder)
**Issue**:  If you follow the installation instructions for CKFinder, the `$baseUrl` path is not correctly set and will not recognize any path set via CKFinder.  See this [Drupal.org issue](https://www.drupal.org/node/2629000).

**Solution**:  Manually edit the `ckfinder/config.php` file and edit the following line to the desired path:

```
$baseUrl = '/ckfinder/userfiles/';
```

<hr>
### [Composer Manager](https://www.drupal.org/project/composer_manager)
This module has been deprecated by its authors. The suggestions made below are not guaranteed to be successful in all use cases.

**Issue**: Composer Manager expects write access to the site's codebase via SFTP, which is prevented in Test and Live environments on Pantheon by design.

**Solution**: As suggested within the [module documentation](https://www.drupal.org/node/2405805), manage dependencies in Dev exclusively. Place the following configuration within `settings.php` to disable autobuild on Pantheon. This will also set appropriate file paths for Composer so that checks to see if the path is writable will not fail. Packages, however, are stored within the root directory of the site's codebase and version controlled:

    if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
      # Set appropriate paths for Composer Manager
      $conf['composer_manager_file_dir'] = 'private://composer';
      $conf['composer_manager_vendor_dir'] = $_SERVER['HOME'] . '/code/vendor';
      # Disable autobuild on Pantheon
      $conf['composer_manager_autobuild_file'] = 0;
      $conf['composer_manager_autobuild_packages'] = 0;
    }

You also need to create the directory path `sites/default/files/private/composer`.

This disables auto-building in all Pantheon environments. This will allow Drush commands such as `pm-enable` and `pm-disable` to function correctly in both Git and SFTP modes as Composer Manager will only update packages and the autoloader when _explicitly_ told to do so via `drush composer-manager [COMMAND] [OPTIONS]` or `drush composer-json-rebuild`. This is the setting recommended by Pantheon.  While `composer.json` can be rebuilt via [Terminus](/docs/terminus) while the DEV site is in SFTP mode, `composer install` must be run locally, committed via Git, and pushed back to Pantheon.
<hr>
### [Fast 404](https://www.drupal.org/project/fast_404)
**Issue**: Database connection credentials are needed before Drupal bootstrap is invoked and standard MySQL is port hard-coded.

**Solution**: Pressflow settings can be [decoded in settings.php](/docs/read-environment-config/) to provide database credentials, but the module needs to be modified manually to use `$_ENV(["DB_PORT"]`.

<hr>
### [Front](https://www.drupal.org/project/front)
**Issue**: The Drupal 7 version of the module disables caching for the front page.

**Solution**: [Apply a patch to the module](https://www.drupal.org/project/front/issues/1854300#comment-12405090) to allow caching for anonymous users. Note that this patch doesn't work with the **Full** or **Redirect** options.

<hr>
### [HTTP Basic Authentication](https://www.drupal.org/docs/8/core/modules/basic_auth) - Drupal 8 (core)
 **Issue**: This Drupal 8 core module conflicts with [Pantheon's Security tool](/docs/security/#password-protect-your-site%27s-environments) when both are enabled, resulting in 403 errors.

 **Solution**: Lock the environment via Pantheon's Security tool or via the module, not both. For details, see [Security on the Pantheon Dashboard](/docs/security/#troubleshoot).
<hr>

### [HTTPRL - HTTP Parallel Request & Threading Library](https://www.drupal.org/project/httprl)
**Issue**: This module can severely impact performance. This may be the result of module code or its configuration on the platform that results in the spikes.

<hr>
### [IMCE 6.x](https://www.drupal.org/node/251024) and [IMCE 7.x](https://www.drupal.org/project/imce/releases/7.x-1.11)
**Issue**: Operations on directories containing an inordinate amount of files will likely hit the load balancer timeout threshold (30 seconds).

**Solution**: One solution is to break up the files into smaller groups so that directories are less populated. Another option is to rewrite `imce_image_info()` so that your site's caching backend (Database or Redis) is used for operations on highly populated directories:

1. [Enable Redis](/docs/redis/), otherwise the database cache is utilized. (Depending on your site's configuration, you may not net to enable Redis.)
2. Edit `imce/inc/imce.page.inc` and replace the contents of `imce_image_info()` with:

 ```
 $cache_key = 'imce-' . $file;
 $cache = cache_get($cache_key);
 if ($cache) {
  return $cache->data;
 }
 if
 (is_file($file) && ($dot = strrpos($file, '.')) &&
 in_array(strtolower(substr($file, $dot+1)), array('jpg', 'jpeg',
 'gif','png')) && ($info = @getimagesize($file)) &&
 in_array($info[2], array(IMAGETYPE_JPEG, IMAGETYPE_GIF, IMAGETYPE_PNG)) )
 {
   $result = array('width' => $info[0], 'height' => $info[1], 'type' => $info[2], 'mime' => $info['mime']);
   cache_set($cache_key, $result);
   return $result;
 }
 return FALSE;
 }
 ```

3. Clear caches on the Dev environment. The first action to populate cache will take longer than subsequent requests.

You can modify this patch according to your needs, such as performing an operation post upload and/or specifying a particular cache bin.

### [LiveReload](https://www.drupal.org/project/livereload)
**Issue**: This module triggers heavy load on the application server as soon as it is enabled and causes pages to time out for anonymous users for Drupal 7 and Drupal 8.
<hr>
### [Live CSS](https://www.drupal.org/project/live_css)
**Issue**: This module requires write access to the site's codebase for editing CSS files, which is not granted on Test and Live environments by design.
<hr>
### [Media](https://www.drupal.org/project/media)
**Issue**:  This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/modules-plugins-known-issues/#using-the-tmp-directory) section below.
<hr>
### [Media: Browser Plus](https://www.drupal.org/project/media_browser_plus)
**Issue**:  This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/modules-plugins-known-issues/#using-the-tmp-directory) section below.
<hr>

### [Mobile Tools](https://www.drupal.org/project/mobile_tools)
**Issue**: Conflicts with platform page caches. See [this thread](https://www.drupal.org/node/1976162#comment-7411366) for details.
<hr>

### [Node export webforms](https://www.drupal.org/project/node_export_webforms)
**Issue**:  This module requires the use of the `tmp` directory. See [Using the tmp Directory](/docs/modules-plugins-known-issues/#using-the-tmp-directory) section below.

**Solution**: Use [drush](https://drushcommands.com/drush-8x/webform/webform-export/), as this uses a single application container to process the export. The relevant drush command is `webform-export` (alias wfx).

Customers have also reported success by making the export path [configurable](https://www.drupal.org/node/2221651).
<hr>

### [Node Gallery](https://www.drupal.org/project/node_gallery)
**Issue**: Using Node Gallery with Plupload attaches cookies to image uploads for authentication purposes. This conflicts with our page cache configuration as we strip all cookies for images, CSS, and JS files to improve performance.
<hr>
### [Pathologic](https://www.drupal.org/project/pathologic)
 **Issue**: The path of the base URL is changed and cached by the module itself.

 **Solution**: The [documentation on Drupal.org](https://drupal.org/node/257026) for the module mentions the issues and the remedy, which is a cache clear operation. If you are unable to exclude cached data from your dumps or avoid migrating cache data, you should clear your site's cache after importing the data.

 Additionally, Pathologic can cause the change of base URLs in a domain access configuration based on the value of `$options['url']` in the site Drush config. This is set to the first domain listed on an environment by default on Pantheon, which can result in unexpected root domains being written to the cache. See [our Drush documentation](/docs/drush/#known-limitations) for more information about overriding this value.

### [Persistent Login](https://www.drupal.org/project/persistent_login)
**Issue**: This module attaches per-user cookies that conflict with our page cache configuration.


**Solution**: Follow the remedy provided within the [module's documentation of the issue on Drupal.org](https://www.drupal.org/node/1306214), which is to alter the code to prefix the cookie name with `SESS`.
 <hr>

### [Plupload](https://www.drupal.org/project/plupload)
**Issue**: This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/modules-plugins-known-issues/#using-the-tmp-directory) section below.

**Solution**: A possible solution is to set the `plupload_temporary_uri` variable in settings.php. Example:
```
$conf['plupload_temporary_uri'] ='private://tmp';
```

You may also need to add this line within the `filefield_sources_plupload.module` file to run through `files/private/tmp` every few hours and delete old files to keep it from piling up:
```
$temp_destination = file_stream_wrapper_uri_normalize('private://tmp/' . $filename);
```

This will move the temporary upload destination from the individual server mount `tmp` directory to the shared `mount tmp files/private/tmp directory`, which should preserve the files between requests.
<hr>

### [reCAPTCHA](https://www.drupal.org/project/recaptcha)
**Issue**: If your site is running PHP 5.3, form submissions that use the reCAPTCHA module might continually fail and display the error: `The answer you entered for the CAPTCHA was not correct`. This is because the default arg_separator.output for PHP 5.3 is `&amp;` while for PHP 5.5 it is `&`.

**Solution**: Override the default arg_separator.output value in `settings.php` by adding the following line:

```
ini_set('arg_separator.output', '&');
```

<hr>

### [Registry Rebuild](https://www.drupal.org/project/registry_rebuild)
This is built into the platform. See [Drupal Drush Command-Line Utility](/docs/drush#registry-rebuild) for details on how to use Registry Rebuild on Pantheon.
<hr>

### [Schema](https://www.drupal.org/project/schema)
**Issue**: The module doesn't work with the MySQL TIMESTAMP column type in our heartbeat table, which is part of how we maintain status around whether or not a site and its database is active. This is a [known bug](https://drupal.org/node/468644) in the schema module.

**Solution**: Set a variable to suppress the error, [shown here](http://drupalcode.org/project/schema.git/blob/08b02458694d186f8ab3bd0b24fbc738f9271108:/schema.module#l372). Setting the variable `schema_suppress_type_warnings` to **true** will do it. You can achieve that by adding the following line to `settings.php`:
```
$conf[‘schema_suppress_type_warnings’] = TRUE;
```
<hr>

### [Simple OAuth / OAuth 2.0](https://www.drupal.org/project/simple_oauth)
**Issue**: The module requires a very specific set of permissions for the folder and the keys to be uploaded. Using Private or non-standard filepaths won't work. It is not possible to change these in LIVE or TEST environment.

**Solution**: You can try to patch the [permission check in the module](https://github.com/thephpleague/oauth2-server/blob/e184691ded987c00966e341ac09c46ceeae0b27f/src/CryptKey.php#L51). The alternative is to use off-site key management tools like [Lockr](https://www.drupal.org/project/lockr)
<hr>

### [Taxonomy CSV](https://www.drupal.org/project/taxonomy_csv)
**Issue**:  This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/modules-plugins-known-issues/#using-the-tmp-directory) section below.
<hr>

### [Twig Extensions](https://www.drupal.org/project/twig_extensions)
**Issue**:  This module uses [`php-intl`]( https://secure.php.net/manual/en/intro.intl.php), which is not currently supported by Pantheon.
<hr>

### [Varnish](https://www.drupal.org/project/varnish)
**Issue**: Conflicts with the existing platform configuration.

**Solution**: Update Drupal performance settings to set the TTL and have the platform page cache serve requests. See [Pantheon's Global CDN](/docs/global-cdn/)
<hr>

### [Views data export](https://www.drupal.org/project/views_data_export)
**Issue**: This module requires the use of the `/tmp` directory. There is also a [patch](https://www.drupal.org/node/1782038) available, but we still cannot guarantee that the use of the `/tmp` directory will work successfully. See [Using the tmp Directory](/docs/modules-plugins-known-issues/#using-the-tmp-directory) section below for more information.

**Solution**: A possible solution would be to set the export directory in `settings.php` to a `public://` stream wrapper location versus a `temporary://` one.  Example:
```
$conf['views_data_export_directory'] = 'public://';
```
or to a specific directory:
````
$conf['views_data_export_directory'] = 'public://vde/';
````
Additionally, the variable can be set using Drush:
````
drush vset views_data_export_directory 'public://'
````
Also see [Multiple Servers + Batch Database Stream Wrapper (sandbox module)](https://www.drupal.org/sandbox/jim/2352733).
<hr>


##WordPress Plugins

### [Autoptimize](https://wordpress.org/plugins/autoptimize/)
**Issue**: Autoptimize assumes write access to the site's codebase within the `wp-content/resources` directory, which is not granted on Test and Live environments on Pantheon by design. For additional details, see [Using Extensions That Assume Write Access](/docs/assuming-write-access).

**Solution**: Configure Autoptimize to write files within the standard `wp-content/uploads` path for WordPress (`wp-content/uploads/autoptimize`) by adding the following to `wp-config.php`:

```php
/** Changes location where Autoptimize stores optimized files */
define('AUTOPTIMIZE_CACHE_CHILD_DIR','/uploads/autoptimize/');
```

Be sure to add this configuration _above_ the comment to stop editing:

![Autoptimize configuration](/source/docs/assets/images/autoptimize-config.png)

For additional details, see the [Autoptimize FAQ](https://wordpress.org/plugins/autoptimize/faq). An alternative solution is to [create a symbolic link](/docs/assuming-write-access/#create-a-symbolic-link).

<hr>

### [Bookly](https://wordpress.org/plugins/bookly-responsive-appointment-booking-tool/)
**Issue**: Sessions are implemented in a way that will not allow it to function with the WP Native Sessions plugin, either installed as a regular plugin or an mu-plugin. [Follow this issue on the WordPress support forum](https://wordpress.org/support/topic/incompatibility-with-wp-native-sessions/).

<hr>

### [Broken Link Checker](https://wordpress.org/plugins/broken-link-checker/)
**Issue**: A low value set for "Check link every X hours" can consume a large amount of server resources.

**Solution**: Ensure that the value is set for the default of 72 hours or greater.

<hr>

### [Contact Form 7](https://wordpress.org/plugins/contact-form-7/)
**Issue**: This plugin relies on `$_SERVER['SERVER_NAME']` and `$_SERVER['SERVER_PORT']`, which pass static values subject to change overtime during routine platform maintenance.

**Solution**: Add the following to `wp-config.php`:

```
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

For more details, see [SERVER_NAME and SERVER_PORT on Pantheon](/docs/server_name-and-server_port/).
<hr>

### Caching Plugins (e.g. [Batcache](https://wordpress.org/plugins/batcache/), [W3 Total Cache](https://wordpress.org/plugins/w3-total-cache/), or [WP Super Cache](https://wordpress.org/plugins/wp-super-cache/))
**Issue**: Conflicts with platform-level page caching.

**Solution**: See [Caching: Advanced Topics](/docs/caching-advanced-topics/) for details on how to bypass the platform page cache.
<hr>

### [Instashow](https://elfsight.com/instagram-feed-instashow/)
**Issue**: The Instashow plugin relies on query parameters that are not compatible with Pantheon's Edge Cache. See [PANTHEON_STRIPPED](https://pantheon.io/docs/pantheon_stripped/) for more information. This inhibits the ability to set the authorization token required to make the plugin function.
<hr>

### [Maintenance Mode](https://wordpress.org/plugins/lj-maintenance-mode/)
**Issue**: Maintenance Mode causes a redirect loop on all pages for logged out users when the maintenance mode option is checked.

**Solution**: If you are locked out of your site, wp-login.php will still function and you can login to disable the maintenance mode plugin.
<hr>

### [Monarch Social Sharing](https://www.elegantthemes.com/plugins/monarch/)
**Issue**: Seems to break WP-CLI, which is used by many of our workflows (clone, clear cache).
<hr>

### [NextGEN Gallery](https://wordpress.org/plugins/nextgen-gallery/)
**Issue**: NextGEN Gallery assumes write access to the site's codebase within the `wp-content/gallery` directory, which is not granted on Test and Live environments on Pantheon by design. For additional details, see [Using Extensions That Assume Write Access](/docs/assuming-write-access).

**Solution**: This can be overridden from the plugin's configuration page (`/wp-admin/admin.php?page=ngg_other_options`) to use `wp-content/uploads/gallery/`.

An alternative solution is to [create a symbolic link](/docs/assuming-write-access/#create-a-symbolic-link).
<hr>

### [Query Monitor](https://wordpress.org/plugins/query-monitor/)
**Issue**: Creates a symlink with an absolute path, which will only work on the appserver where the plugin was installed. The plugin is not fully designed for cloud or multi server environments.

**Alternatives**:
Pantheon has tools in place to monitor database queries:
[MySQL Slow Log](https://pantheon.io/docs/mysql-slow-log/)
[MySQL Troubleshooting with New Relic Pro](https://pantheon.io/docs/debug-mysql-new-relic/)
<hr>

### [Revive Old Post](https://wordpress.org/plugins/tweet-old-post/)
**Issue**: Revive Old Post does not set a proper callback via OAuth and the Twitter module.  It attempts to use `["SERVER_NAME"]` instead of the recommended `["HTTP_HOST"]`. See [SERVER_NAME and SERVER_PORT on Pantheon](/docs/server_name-and-server_port/).

<hr>

### [Timthumb](https://code.google.com/p/timthumb/)
**Issue**: TimThumb is no longer supported or maintained.
<hr>
### [TubePress Pro](https://tubepress.com/)
**Issue**: Sites running PHP version 5.3 produce a WSOD after activating this plugin.

**Solution**: [Upgrade your site's PHP version](/docs/php-versions) to 5.5, 5.6, or 7.0.
<hr>

### [UNLOQ Two Factor Authentication (2FA)](https://wordpress.org/plugins/unloq/)
**Issue**: `This widget does not work on this domain` error message shown after deploying plugin across environments on Pantheon. This is because the API credentials used on the original environment are being used on a new environment URL, which is not allowed by the plugin. This is by design.

**Solution**: Manually change `unloq_credentials` key in the`wp_options` table. Alternatively, you can re-create an application by resetting your plugin installation (deactivate, delete entries, etc.).

For an alternative 2FA plugin, see [Secure Your Site with Two-Factor Authentication](/docs/guides/two-factor-authentication/#single-site-tfa).

<hr>

### [Visual Composer: Page Builder](https://vc.wpbakery.com/)
**Issue**: This plugin requires write access to the site's codebase for editing files, which is not granted on Test and Live environments by design.
<hr>

### [Weather Station](https://wordpress.org/plugins/live-weather-station/)
**Issue**: This module uses [`php-intl`]( https://secure.php.net/manual/en/intro.intl.php), which is not currently supported by Pantheon.

### [WooCommerce](https://wordpress.org/plugins/woocommerce/)
**Issue**: The "batch upload" process can fail during large uploads. The platform has a 120 second timeout limit for scripts, and large upload processes can hit this limit.

**Solution**: The suggested workaround is to clone the site locally, import the items, then sync the database back up to the platform.


### [WooZone](https://codecanyon.net/item/woocommerce-amazon-affiliates-wordpress-plugin/3057503)
**Issue #1**: This plugin checks `WP_MEMORY_LIMIT`, which defaults to 40MB, instead of `ini_get('memory_limit')`, creating this notice:

![WooZone Error](/source/docs/assets/images/woozone-error.png)

**Solution**: Add the following line to `wp-config.php`:

    define('WP_MEMORY_LIMIT', '256M');

**Issue #2**: WooZone writes to a cache folder in `wp-content/plugins/woozone/`, which is not editable in Test and Live

**Solution**: Symlink `wp-content/plugins/woozone/cache` to a folder in `wp-content/uploads/`. For details, see [Using Extensions That Assume Write Access](/docs/assuming-write-access).

<hr>
### [Wordfence](https://wordpress.org/plugins/wordfence/)
**Issue #1**: Enabling the Live Traffic tracking feature within Wordfence sends cookies which conflict with platform-level page caching.

**Solution**: Disable Wordfence-generated cookies by disabling Live Traffic within the Wordfence options page. See the  [WordPress support forum](https://wordpress.org/support/topic/wfvt-cookie?replies=5) for details.

**Issue #2**: The Wordfence firewall expects specific write access to `wp-content/wflogs` during activation. Adding a symlink does not mitigate this, so using the Wordfence firewall is not supported on the platform. This has been [reported as an issue](https://wordpress.org/support/topic/write-logs-to-the-standard-file-path/) within the plugin support forum.

**Issue #3**: The Wordfence firewall installs a file called `.user.ini` that includes `wordfence-waf.php` from the absolute path which uses the application container's ID. These paths will change from time to time due to routine platform maintenance. When a container is migrated and when this plugin is deployed to another environment the absolute path is no longer valid resulting in a WSOD. This has been [reported as an issue](https://wordpress.org/support/topic/set-auto_prepend_file-path-relatively/) within the plugin support forum.
<hr>

### [WordPress Social Login](https://wordpress.org/plugins/wordpress-social-login/)

**Issue #1**: This plugin attempts to access PHP native sessions [before WordPress has been bootstrapped](https://wordpress.org/support/topic/plugin-starts-before-wordpress/), which prevents the Pantheon PHP native sessions plugin from being called. This leads to a 500 error when authenticating with external services.

**Solution**: While *not recommended*, you can add the following lines to `wp-config.php` before the first call to `session_start`:

```
if (defined( "PANTHEON_BINDING" )) {
  include_once( "/srv/bindings/". PANTHEON_BINDING ."/code/wp-blog-header.php" );
}
```

**Please note:** You will need to make this change every timethat the plugin is updated.

**Issue #2**: This plugin creates a session on every page, which can prevent [page level caching](https://wordpress.org/support/topic/cannot-cache-pages-due-to-sessions-on-every-page-with-wsl-plugin/).

<hr>

### [WP Fastest Cache](https://wordpress.org/plugins/wp-fastest-cache/)

**Issue #1**: This plugin requires write access to a cache folder in `wp-content/cache`, which is not granted on Test and Live environments by design.

**Solution**: Symlink `wp-content/cache` to a folder in `wp-content/uploads/`. For details, see [Using Extensions That Assume Write Access](/docs/assuming-write-access)

**Issue #2**: This plugin uses `is_dir` to verfiy the target directory, which will return false if the directory is a symlink. This causes a permissions error when deleting cache files.

<hr>

### [WPML - The WordPress Multilingual Plugin](https://wpml.org/)
**Issue**: Locking an environment prevents WPML from operating and returns the following error:  `It looks like languages per directories will not function`.

**Solution**: Make the environment public within the Site Dashboard. For details, see [Security on the Pantheon Dashboard](/docs/security).

## WordPress Functions

### [add_management_page()](https://developer.wordpress.org/reference/functions/add_management_page/)

**Issue**: Adding a submenu page to the Tools main menu using WordPress roles and capabilities that would read or write files to core, themes, or plugins, is not supported.

For example, the `install_plugins` capability isn't present on the Test or Live environment, therefore  menus created with it will not display. For example:

```
hook = add_management_page( 'My WP Tool Page', 'My WP Tool',
  'install_plugins', 'mywptool', array( $this, 'admin_page' ), '' );

add_action( "load-$hook", array( $this, 'admin_page_load' ) );
```

This is because write permissions are restricted in Test and Live per the [Pantheon Workflow](/docs/pantheon-workflow/#understanding-write-permissions-in-test-and-live).

**Solution**: You can use another capability such as `read_private_posts` instead.

The list of [WordPress roles and capabilities](https://codex.wordpress.org/Roles_and_Capabilities) that should not be relied upon include:

* `update_core`
* `update_plugins`
* `update_themes`
* `install_plugins`
* `install_themes`
* `upload_plugins`
* `upload_themes`
* `delete_themes`
* `delete_plugins`
* `edit_plugins`
* `edit_themes`

## PHP Libraries
Due to the cloud-based infrastructure of the Pantheon platform, certain PHP libraries are not available on the platform.

### MSSQL
The MSSQL PHP library used to interface with Microsoft SQL Server databases is not supported on Pantheon.

## Dynamic Outbound IPs
Due to the cloud-based infrastructure of the Pantheon platform, outbound requests are served by dynamic IP addresses. If your site relies on a static IP address for outgoing requests, the recommended solution is the [Pantheon Enterprise Gateway](/docs/pantheon-enterprise-gateway). This is the only way to guarantee compatibility with extensions or services that require a known outgoing IP. Otherwise, you will need to find an alternative to accomplish the request. For more information, see [Dynamic Outgoing IP Addresses](/docs/outgoing-ips).

## Using the tmp Directory
**Issue**: Extensions that require the use of the `/tmp` directory are not supported. With multiple application servers, as exists on Live environments, it's assumed the `/tmp` directory will be on the same application container. However, as we run a distributed application container matrix, the `/tmp` directory is not shared.

**Solution**: For more details, see [Temporary File Management with Multiple Application Containers](/docs/temp-files).
