---
title: Modules and Plugins with Known Issues
description: A list of Drupal modules and WordPress plugins that are not supported and/or require workarounds.
tags: [debugcode, siteintegrations]
categories: []
---
This article lists modules and plugins that may not function as expected or are currently problematic on the Pantheon platform. This is not a comprehensive list. We continually update it as problems are reported and/or solved. If you are aware of any modules or plugins that do not work as expected, please [contact support](/docs/support/).

We do not prevent you from installing and using these plugins/modules; however, they may not work as expected and we cannot provide troubleshooting support.

**Plugin & Module Maintainers:** If your work is listed here, please [reach out to us](https://github.com/pantheon-systems/documentation/issues/new?title=Modules%20and%20Plugins%20with%20Known%20Issues%20Doc%20Update%20&body=Re%3A%20%5BModules%20and%20Plugins%20with%20Known%20Issues%5D(https%3A%2F%2Fpantheon.io/docs/modules-plugins-known-issues/)%0A%0APriority%20(Low%E2%80%9A%20Medium%E2%80%9A%20High)%3A%0A%0A%23%23%20Issue%20Description%3A%0A%0A%23%23%20Suggested%20Resolution%20&labels=fix%20content){.external}; we're happy to help provide information that can lead to conflict resolutions between your code and the platform. If your work is already updated but still listed here, let us know so we can remove it, or [submit a pull request](https://github.com/pantheon-systems/documentation/edit/master/source/_docs/modules-plugins-known-issues.md){.external}.

## Drupal Modules
<hr>
### [APC - Alternative PHP Cache](https://www.drupal.org/project/apc){.external}
**Issue**: APC is in-memory and limited to a single instance. It cannot span multiple server environments.

**Solution**: Pantheon recommends Redis as a caching backend, which has better performance.
<hr>
### [Adaptive Image Styles](https://www.drupal.org/project/ais){.external}
**Issue**: This module requires edits to the `nginx.conf` which is not currently supported on the platform. See [Platform Considerations](/docs/platform-considerations/#nginx.conf) and [https://www.drupal.org/node/1669182](https://www.drupal.org/node/1669182).
<hr>
### [Apache Solr Multilingual](https://www.drupal.org/project/apachesolr_multilingual){.external}
**Issue**: When the Apache Solr Multilingual module is enabled, the default class variable set by the Pantheon Apache Solr module is changed, and the site will be unable to connect to the Solr server.

If you have already enabled the Apache Solr Multilingual module and found that your site can no longer connect to the Solr server, you will need to first disable and uninstall the module. Next, disable and re-enable the Pantheon Apache Solr module. This will add the class variable back so your site can connect to the Solr server again.
<hr>
### [Acquia Search](https://www.drupal.org/project/acquia_search){.external}
**Issue**: If Acquia Solr modules are present in the site codebase (even if disabled) and Pantheon Apache Solr is enabled, the site will be unable to connect to Solr server.

**Solution**: Delete the Acquia Solr modules from the codebase and then disable and re-enable the Pantheon Apache Solr module.
<hr>
### [Background Process](https://www.drupal.org/project/background_process){.external}
**Issue**: The module allows for Drupal to perform "parallel" (asynchronous non-blocking mode) requests. However, there are a number of limitations working in a distributed environment and function correctly on the platform. See [https://www.drupal.org/node/2233843](https://www.drupal.org/node/2233843).

<hr>
### [Backup and Migrate](https://www.drupal.org/project/backup_migrate){.external}
**Issue**: The Backup and Migrate module can create large archives and cause issues with the tools in the Database / Files tab of the Dashboard. See [Backup Creation](/docs/backups/#why-is-the-drupal-module-backup-%26-migrate-not-recommended-on-pantheon%3F).

**Solution**: You can use the automated backups that are available on the Dashboard for each environment. If you want to access your backups and copy it to your own repository (Amazon S3, FTP server, etc), consider using a bash script. You can do that by running it in your local system, or use an external server, or a service that runs cron jobs for you. See [Access Backups](/docs/backups/#access-backups) for more details.

<hr>
### [Basic HTTP Authentication](https://www.drupal.org/project/basic_auth){.external} - Drupal 7 only
**Issue**: This contrib module conflicts with [Pantheon's Security tool](/docs/security/#password-protect-your-site%27s-environments) when both are enabled on Drupal 7 sites, resulting in 403 errors.

**Solution**: Lock the environment via Pantheon's Security tool or via the module, not both. For details, see [Security on the Pantheon Dashboard](/docs/security/#troubleshoot).

<hr>
### [BigPipe](https://www.drupal.org/documentation/modules/big_pipe){.external}
**Issue**: The Pantheon Edge layer buffers text output, and BigPipe depends on being able to stream text output. Since BigPipe provides no benefit on Pantheon sites, we recommend disabling it.

<hr>
### [Boost](https://www.drupal.org/project/boost){.external}
**Issue**: Boost is an unnecessary caching layer that may cause issues. Every site on Pantheon can leverage our robust page caching infrastructure that returns pages for anonymous visitors at the highest possible performance. See [Pantheon's Global CDN](/docs/global-cdn).

<hr>
### [Cache Expiration](https://www.drupal.org/project/expire){.external}
**Issue**: This module doesn't support Pantheon's granular cache clearing and header system.

**Solution**: Install the [Pantheon Advanced Page Cache module](/docs/modules/#advanced-page-cache) to dynamically purge content from cache on content update.

<hr>
### [CKFinder](https://www.drupal.org/project/wysiwyg_ckfinder){.external}
**Issue**:  If you follow the installation instructions for CKFinder, the `$baseUrl` path is not correctly set and will not recognize any path set via CKFinder.  See this [Drupal.org issue](https://www.drupal.org/node/2629000).

**Solution**:  Manually edit the `ckfinder/config.php` file and edit the following line to the desired path:

```
$baseUrl = '/ckfinder/userfiles/';
```

<hr>
### [Composer Manager](https://www.drupal.org/project/composer_manager){.external}
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
### [Fast 404](https://www.drupal.org/project/fast_404){.external}
**Issue**: Database connection credentials are needed before Drupal bootstrap is invoked and standard MySQL is port hard-coded.

**Solution**: Pressflow settings can be [decoded in settings.php](/docs/read-environment-config/) to provide database credentials, but the module needs to be modified manually to use `$_ENV(["DB_PORT"])`.

Alternatively, [Drupal 7](https://github.com/pantheon-systems/drops-7/blob/7.59/sites/default/default.settings.php#L518){.external} and [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/8.5.4/sites/default/default.settings.php#L640){.external} cores provide a basic version of this same feature via configuration in `settings.php`.

<hr>
### [Front](https://www.drupal.org/project/front){.external}
**Issue**: The Drupal 7 version of the module disables caching for the front page.

**Solution**: [Apply a patch to the module](https://www.drupal.org/project/front/issues/1854300#comment-12405090){.external} to allow caching for anonymous users. Note that this patch doesn't work with the **Full** or **Redirect** options.

<hr>
### [HTTP Basic Authentication](https://www.drupal.org/docs/8/core/modules/basic_auth){.external} - Drupal 8 (core)
 **Issue**: This Drupal 8 core module conflicts with [Pantheon's Security tool](/docs/security/#password-protect-your-site%27s-environments) when both are enabled, resulting in 403 errors.

 **Solution**: Lock the environment via Pantheon's Security tool or via the module, not both. For details, see [Security on the Pantheon Dashboard](/docs/security/#troubleshoot).
<hr>

### [HTTPRL - HTTP Parallel Request & Threading Library](https://www.drupal.org/project/httprl){.external}
**Issue**: This module can severely impact performance. This may be the result of module code or its configuration on the platform that results in the spikes.

<hr>
### [IMCE 6.x](https://www.drupal.org/node/251024){.external} and [IMCE 7.x](https://www.drupal.org/project/imce/releases/7.x-1.11){.external}
**Issue**: Operations on directories containing an inordinate amount of files will likely hit the load balancer timeout threshold (30 seconds).

**Solution**: One solution is to break up the files into smaller groups so that directories are less populated. Another option is to rewrite `imce_image_info()` so that your site's caching backend (Database or Redis) is used for operations on highly populated directories:

1. [Enable Redis](/docs/redis/), otherwise the database cache is utilized. (Depending on your site's configuration, you may not need to enable Redis.)
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

### [LiveReload](https://www.drupal.org/project/livereload){.external}
**Issue**: This module triggers heavy load on the application container as soon as it is enabled and causes pages to time out for anonymous users for Drupal 7 and Drupal 8.
<hr>
### [Live CSS](https://www.drupal.org/project/live_css){.external}
**Issue**: This module requires write access to the site's codebase for editing CSS files, which is not granted on Test and Live environments by design.
<hr>
### [Media: Browser Plus](https://www.drupal.org/project/media_browser_plus){.external}
**Issue**:  This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/modules-plugins-known-issues/#using-the-tmp-directory) section below.
<hr>

### [Mobile Tools](https://www.drupal.org/project/mobile_tools){.external}
**Issue**: Conflicts with platform page caches. See [this thread](https://www.drupal.org/node/1976162#comment-7411366) for details.
<hr>

### [Node export webforms](https://www.drupal.org/project/node_export_webforms){.external}
**Issue**:  This module requires the use of the `tmp` directory. See [Using the tmp Directory](/docs/modules-plugins-known-issues/#using-the-tmp-directory) section below.

**Solution**: Use [drush](https://drushcommands.com/drush-8x/webform/webform-export/){.external}, as this uses a single application container to process the export. The relevant drush command is `webform-export` (alias wfx).

Customers have also reported success by making the export path [configurable](https://www.drupal.org/node/2221651){.external}.
<hr>

### [Node Gallery](https://www.drupal.org/project/node_gallery){.external}
**Issue**: Using Node Gallery with Plupload attaches cookies to image uploads for authentication purposes. This conflicts with our page cache configuration as we strip all cookies for images, CSS, and JS files to improve performance.
<hr>
### [Pathologic](https://www.drupal.org/project/pathologic){.external}
 **Issue**: The path of the base URL is changed and cached by the module itself.

 **Solution**: The [documentation on Drupal.org](https://drupal.org/node/257026){.external} for the module mentions the issues and the remedy, which is a cache clear operation. If you are unable to exclude cached data from your dumps or avoid migrating cache data, you should clear your site's cache after importing the data.

 Additionally, Pathologic can cause the change of base URLs in a domain access configuration based on the value of `$options['url']` in the site Drush config. This is set to the first domain listed on an environment by default on Pantheon, which can result in unexpected root domains being written to the cache. See [our Drush documentation](/docs/drush/#known-limitations) for more information about overriding this value.

### [Persistent Login](https://www.drupal.org/project/persistent_login){.external}
**Issue**: This module attaches per-user cookies that conflict with our page cache configuration.


**Solution**: Follow the remedy provided within the [module's documentation of the issue on Drupal.org](https://www.drupal.org/node/1306214){.external}, which is to alter the code to prefix the cookie name with `SESS`.
 <hr>

### [Plupload](https://www.drupal.org/project/plupload)
**Issue**: This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/modules-plugins-known-issues/#using-the-tmp-directory){.external} section below.

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

### [reCAPTCHA](https://www.drupal.org/project/recaptcha){.external}
**Issue 1:** If your site is running PHP 5.3, form submissions that use the reCAPTCHA module might continually fail and display the error: `The answer you entered for the CAPTCHA was not correct`. This is because the default arg_separator.output for PHP 5.3 is `&amp;` while for PHP 5.5 it is `&`.

**Solution:** Override the default arg_separator.output value in `settings.php` by adding the following line:

```
ini_set('arg_separator.output', '&');
```

**Issue 2:** On non-live environments, reCAPTCHA returns the error, "ERROR for site owner: Invalid domain for site key."

**Solution:** Add more domains to your Google reCAPTCHA configuration. Add `dev-<sitename>.pantheonsite.io` and `test-<sitename>.pantheonsite.io` to the site. This is set in [Google's reCAPTCHA admin panel](https://www.google.com/recaptcha/admin){.external}.

**Solution 2:** Disable the reCAPTCHA on non-live environments. In Drupal 7, you can set the configuration key to be `NULL` in your `settings.php` file as follows:

```
// Deactivate reCAPTCHA if we're not running on the live site - it doesn't work if the domain name is invalid. Message "ERROR for site owner: Invalid domain for site key" is displayed.
// This is needed because otherwise it's impossible to log in or submit any protected form.
if (defined('PANTHEON_ENVIRONMENT') && $_ENV['PANTHEON_ENVIRONMENT'] != 'live') {
  $conf['recaptcha_site_key'] = NULL;
}
```

<hr>

### [Registry Rebuild](https://www.drupal.org/project/registry_rebuild){.external}
This is built into the platform. See [Drupal Drush Command-Line Utility](/docs/drush#registry-rebuild) for details on how to use Registry Rebuild on Pantheon.
<hr>

### [Schema](https://www.drupal.org/project/schema){.external}
**Issue**: The module doesn't work with the MySQL TIMESTAMP column type in our heartbeat table, which is part of how we maintain status around whether or not a site and its database is active. This is a [known bug](https://drupal.org/node/468644) in the schema module.

**Solution**: Set a variable to suppress the error, [shown here](http://drupalcode.org/project/schema.git/blob/08b02458694d186f8ab3bd0b24fbc738f9271108:/schema.module#l372){.external}. Setting the variable `schema_suppress_type_warnings` to **true** will do it. You can achieve that by adding the following line to `settings.php`:
```
$conf[‘schema_suppress_type_warnings’] = TRUE;
```
<hr>

### [Simple OAuth / OAuth 2.0](https://www.drupal.org/project/simple_oauth){.external}
**Issue**: The module requires a very specific set of permissions for the folder and the keys to be uploaded. Using Private or non-standard filepaths won't work. It is not possible to change these in LIVE or TEST environment.

**Solution**: You can try to patch the [permission check in the module](https://github.com/thephpleague/oauth2-server/blob/e184691ded987c00966e341ac09c46ceeae0b27f/src/CryptKey.php#L51){.external}. The alternative is to use off-site key management tools like [Lockr](https://www.drupal.org/project/lockr){.external}
<hr>

### [Taxonomy CSV](https://www.drupal.org/project/taxonomy_csv){.external}
**Issue**:  This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/modules-plugins-known-issues/#using-the-tmp-directory) section below.
<hr>

### [Twig Extensions](https://www.drupal.org/project/twig_extensions){.external}
**Issue**:  This module uses [`php-intl`]( https://secure.php.net/manual/en/intro.intl.php){.external}, which is not currently supported by Pantheon.
<hr>

### [Varnish](https://www.drupal.org/project/varnish){.external}
**Issue**: Conflicts with the existing platform configuration.

**Solution**: Update Drupal performance settings to set the TTL and have the platform page cache serve requests. See [Pantheon's Global CDN](/docs/global-cdn/)
<hr>

### [Views data export](https://www.drupal.org/project/views_data_export)
**Issue**: This module requires the use of the `/tmp` directory. See [Using the tmp Directory](#using-the-tmp-directory) below for more information.

**Solution**: A possible solution would be to set the export directory in `settings.php` to a `public://` stream wrapper location versus a `temporary://` one.  Example:

```php
$conf['views_data_export_directory'] = 'public://';
```

or to a specific directory:

```php
$conf['views_data_export_directory'] = 'public://vde/';
```

Additionally, the variable can be set using Drush:

```php
drush vset views_data_export_directory 'public://'
```

Also see [Multiple Servers + Batch Database Stream Wrapper (sandbox module)](https://www.drupal.org/sandbox/jim/2352733){.external}.
<hr>


##WordPress Plugins

### [All-in-One WP Migration](https://wordpress.org/plugins/all-in-one-wp-migration/){.external}
**Issue 1**: Full site backups are exported to the `wp-content/ai1wm-backups` directory, which is tracked in Git. Large backup files tracked in Git can cause problems with platform backups, deploys and other workflows.

The plugin also requires write access to `wp-content/plugins/all-in-one-wp-migration/storage`, which is not permitted on Test and Live environments on Pantheon by design. For additional details, see [Using Extensions That Assume Write Access](/docs/assuming-write-access).

**Solution**: You can create and download full backups from your [Dashboard](/docs/backups/).

**Issue 2**: Uploading large import files hits the 59 second [timeout](/docs/timeouts/), or you're getting invalid file paths.

**Solution 2**: You can upload the import file directly to the plugin's designated writable path `wp-content/uploads/wpallimport/files/`. When creating a new import using `existing file`, the file uploaded should appear there as an option .

<hr>

### [Autoptimize](https://wordpress.org/plugins/autoptimize/){.external}
**Issue**: Autoptimize assumes write access to the site's codebase within the `wp-content/resources` directory, which is not granted on Test and Live environments on Pantheon by design. For additional details, see [Using Extensions That Assume Write Access](/docs/assuming-write-access).

**Solution**: Configure Autoptimize to write files within the standard `wp-content/uploads` path for WordPress (`wp-content/uploads/autoptimize`) by adding the following to `wp-config.php`:

```php
/** Changes location where Autoptimize stores optimized files */
define('AUTOPTIMIZE_CACHE_CHILD_DIR','/uploads/autoptimize/');
```

Be sure to add this configuration _above_ the comment to stop editing:

![Autoptimize configuration](/source/docs/assets/images/autoptimize-config.png)

For additional details, see the [Autoptimize FAQ](https://wordpress.org/plugins/autoptimize/faq){.external}. An alternative solution is to [create a symbolic link](/docs/assuming-write-access/#create-a-symbolic-link).

<hr>

### [Better Search And Replace](https://wordpress.org/plugins/better-search-replace/){.external}
**Issue**: Plugin is not accessible in Test or Live (read-only environments in Pantheon) due to the `install_plugins` capability check of the plugin. [Follow this issue on the WordPress support forum](https://wordpress.org/support/topic/not-appearing-on-test-and-live-environments-in-pantheon/){.external}.

**Solution 1**: There is an undocumented filter in place to override the capability check. Adding this in the your theme’s `function.php` can make it work:

```
function better_search_replace_cap_override() {
    return 'manage_options';
}
add_filter( 'bsr_capability', 'better_search_replace_cap_override' );
```

**Solution 2**: Use an alternative Search and Replace plugin like [WP Migrate DB](https://wordpress.org/plugins/wp-migrate-db/){.external}

<hr>

### [Bookly](https://wordpress.org/plugins/bookly-responsive-appointment-booking-tool/){.external}
**Issue**: Sessions are implemented in a way that will not allow it to function with the WP Native Sessions plugin, either installed as a regular plugin or an mu-plugin. [Follow this issue on the WordPress support forum](https://wordpress.org/support/topic/incompatibility-with-wp-native-sessions/){.external}.

<hr>

### [Broken Link Checker](https://wordpress.org/plugins/broken-link-checker/){.external}
**Issue**: A low value set for "Check link every X hours" can consume a large amount of server resources.

**Solution**: Ensure that the value is set for the default of 72 hours or greater.

<hr>

### Caching Plugins (e.g. [Batcache](https://wordpress.org/plugins/batcache/){.external}, [W3 Total Cache](https://wordpress.org/plugins/w3-total-cache/){.external}, or [WP Super Cache](https://wordpress.org/plugins/wp-super-cache/){.external})
**Issue**: Conflicts with platform-level page caching.

**Solution**: See [Caching: Advanced Topics](/docs/caching-advanced-topics/) for details on how to bypass the platform page cache.
<hr>

### [Coming Soon](https://wordpress.org/plugins/coming-soon/){.external}
**Issue**: `Maintenance mode` gives the `ERR_TOO_MANY_REDIRECTS` error in the frontend. This plugin uses `503 Header status - Service Temporarily Unavailable` which creates a redirect loop. Please see [this issue](https://wordpress.org/support/topic/plugin-give-err_too_many_redirects-in-pantheon-hosting/){.external} for more details regarding the error.

**Solution**: This plugin only works in the `Coming Soon Mode` on Pantheon, and you need to put content into the **Page Settings** > **Message** so the Coming Soon page won't appear as a blank white page.

Alternatively, if you don't want your site to be crawled by search engines, you can lock it via the platform and you can use a [custom lock page](/docs/security#customize-lock-page).
<hr>

### [Contact Form 7](https://wordpress.org/plugins/contact-form-7/){.external}
**Issue 1:** This plugin relies on `$_SERVER['SERVER_NAME']` and `$_SERVER['SERVER_PORT']`, which pass static values subject to change over time during routine platform maintenance.

**Solution:** Add the following to `wp-config.php`:

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

**Issue 2:** Local file attachments set in the admin panel cannot come from the `uploads` folder. As described in [this plugin issue](https://wordpress.org/support/topic/local-file-attachments-do-not-work-in-pantheon-hosting/){.external}, the plugin code fails for upload directories that are symlinks.

**Solution:** Until the plugin is updated to allow symlink paths, you can commit your local attachment files to the code base in `wp-content` or another subdirectory thereof.


<hr>

### [Constant Contact Forms](https://wordpress.org/plugins/constant-contact-forms/){.external}
**Issue**: The Constant Contact Forms plugin adds dependencies using Composer and provides a .gitignore file which prevents these dependencies from being picked up by Git. This leads to problematic deployments as not all code moves forward to Test and Live.

**Solution**: Remove .gitignore files from the `constant-contact-forms` and `constant-contact-forms/vendor/psr/log` directories.
<hr>

### [Event Espresso](https://eventespresso.com/){.external}

**Issue:** Event Espresso shows the error `PHP Fatal error: Uncaught EE_Error: An attempt to access and/or write to a file on the server could not be completed due to a lack of sufficient credentials.`

**Solution**: This plugin is checking the `FS_METHOD` value. Add the following to `wp-config.php`, above the line `/* That's all, stop editing! Happy Pressing. */`:

```php
define('FS_METHOD', 'direct');
```

<hr>

### [EWWW Image Optimizer](https://wordpress.org/plugins/ewww-image-optimizer/){.external}

**Issue:** EWWW Image Optimizer attempts to install and execute third party binary tools to perform image optimization, which is restricted on our platform. The error message is:

> EWWW Image Optimizer uses jpegtran, optipng, pngout, pngquant, gifsicle, and cwebp. You are missing: jpegtran, optipng, gifsicle. Please install via the Settings Page or the Installation Instructions.

The solutions [outlined in the EWWW documentation](https://docs.ewww.io/article/6-the-plugin-says-i-m-missing-something){.external} do not apply to Pantheon.

**Solution:** Use an alternative plugin like [EWWW Image Optimizer Cloud](https://wordpress.org/plugins/ewww-image-optimizer-cloud/){.external}, which is a cloud version of the plugin that executes the compression from an external service instead of the server. Another alternative that works well with the default configuration is [Smush Image Compression and Optimization](https://wordpress.org/plugins/wp-smushit/){.external}.

<hr>

### [Force Login](https://wordpress.org/plugins/wp-force-login/){.external}
**Issue**: This plugin appends a port number using `$_SERVER['SERVER_PORT']` at the end of the URL when the user logs in to the site.

**Solution**: See [Set SERVER_PORT Correctly](https://pantheon.io/docs/server_name-and-server_port/#set-server_port-correctly).
<hr>

### [Instashow](https://elfsight.com/instagram-feed-instashow/){.external}
**Issue**: The Instashow plugin relies on query parameters that are not compatible with Pantheon's Edge Cache. See [PANTHEON_STRIPPED](https://pantheon.io/docs/pantheon_stripped/){.external} for more information. This inhibits the ability to set the authorization token required to make the plugin function.
<hr>

### [iThemes Security](https://wordpress.org/plugins/better-wp-security/){.external}
**Issue 1:** The "File Change Detection" check in iThemes Security warns site admins when files are modified. On Pantheon, automated backups will trigger this warning.

**Solution:** Disable the "File Change Detection" component of the plugin. Code files in the Test and Live environments are not writable, so this is not a security risk on Pantheon.

**Issue 2:** iThemes Security attempts to modify `nginx.conf`, `.htaccess` and `wp-config.php`. Components that need write access to these files will not work since `nginx.conf` <a href="/docs/platform-considerations/#nginxconf" data-proofer-ignore>cannot be modified</a> and code files on the Test and Live environments are not writable.

**Solution:** Modifications to `wp-config.php` should be done in Dev or Multidev environments, then deployed forward to Test and Live.
<hr>

### [Maintenance Mode](https://wordpress.org/plugins/lj-maintenance-mode/){.external}
**Issue**: Maintenance Mode causes a redirect loop on all pages for logged out users when the maintenance mode option is checked.

**Solution**: If you are locked out of your site, wp-login.php will still function and you can login to disable the maintenance mode plugin.
<hr>

### [ManageWP worker](https://wordpress.org/plugins/worker/){.external}
**Issue 1:** Error when adding a site in the ManageWP dashboard:

> Site could not be added - Bad HTTP response (403 Forbidden)

This error sometimes leads users to believe that ManageWP's IP addresses need to be whitelisted on the platform.

**Solution:** Pantheon does not block any IPs, and there is nothing that would require a whitelist. Most likely there is a security plugin that temporary blocks the connection, or a conflicting plugin like those listed [here](https://managewp.com/user-guide/known-issues){.external}. Temporary disable all other plugins, or the security plugins, then try adding your site again. For full troubleshooting, consult the [ManageWP troubleshooting page](https://managewp.com/troubleshooting/site-connection/why-cant-i-add-some-of-my-sites){.external}.

**Issue 2:** Cannot remotely update core, or install/update themes and plugins in the Test and Live environments.

**Solution:** Due to the [read only nature of Test and Live environments](/docs/pantheon-workflow/#understanding-write-permissions-in-test-and-live), remote updates can only be done in Dev, then deployed to Test and Live environment. Consider using a [Custom Upstream](/docs/custom-upstream/) or [WP Site Network](/docs/guides/multisite/) instead if you are deploying similar codebase, theme and plugins for a group of sites hosted in Pantheon.

**Issue 3:** Cannot remotely update core, or install/update theme and plugins in the Dev environment.

**Solution:** Make sure you are in [SFTP mode](/docs/sftp/#sftp-mode) instead of Git mode.

<hr>

### [Monarch Social Sharing](https://www.elegantthemes.com/plugins/monarch/){.external}
**Issue**: Seems to break WP-CLI, which is used by many of our workflows (clone, clear cache).
<hr>

### [NextGEN Gallery](https://wordpress.org/plugins/nextgen-gallery/){.external}
**Issue**: NextGEN Gallery assumes write access to the site's codebase within the `wp-content/gallery` directory, which is not granted on Test and Live environments on Pantheon by design. For additional details, see [Using Extensions That Assume Write Access](/docs/assuming-write-access).

**Solution**: This can be overridden from the plugin's configuration page (`/wp-admin/admin.php?page=ngg_other_options`) to use `wp-content/uploads/gallery/`.

An alternative solution is to [create a symbolic link](/docs/assuming-write-access/#create-a-symbolic-link).
<hr>

### [Query Monitor](https://wordpress.org/plugins/query-monitor/){.external}
**Issue**: Creates a symlink with an absolute path, which will only work on the appserver where the plugin was installed. The plugin is not fully designed for cloud or multi server environments.

**Alternatives**:
Pantheon has tools in place to monitor database queries:
[MySQL Slow Log](https://pantheon.io/docs/mysql-slow-log/){.external}
[MySQL Troubleshooting with New Relic Pro](https://pantheon.io/docs/debug-mysql-new-relic/){.external}
<hr>

### [Object Sync for Salesforce](https://wordpress.org/plugins/object-sync-for-salesforce/){.external}
**Issue**: The Object Sync for Salesforce plugin adds dependencies using Composer, and one of these dependencies provides a .gitignore file which prevents files from being picked up by Git. This leads to problematic deployments as not all code moves forward to Test and Live.

**Solution**: Remove the .gitignore file from the `object-sync-for-salesforce/vendor/pippinsplugins/wp-logging` directory.
<hr>

### [Redirection](https://wordpress.org/plugins/redirection/){.external}

**Issue:** Customers have reported issues with 404 logging creating large database tables, reducing site performance.

**Solution:** Consider using PHP code to set up your redirects. See [Configure Redirects](/docs/redirects/) for more information.
<hr>

### [Revive Old Post](https://wordpress.org/plugins/tweet-old-post/){.external}
**Issue**: Revive Old Post does not set a proper callback via OAuth and the Twitter module.  It attempts to use `["SERVER_NAME"]` instead of the recommended `["HTTP_HOST"]`. See [SERVER_NAME and SERVER_PORT on Pantheon](/docs/server_name-and-server_port/).

<hr>

### [SendGrid Subscription Widget](https://wordpress.org/plugins/sendgrid-email-delivery-simplified/){.external}
**Issue:** The email confirmation link sent from the Subscription Widget goes to a redirect loop (see the [open issue on wp.org](https://wordpress.org/support/topic/email-sent-from-the-subscription-widget-goes-to-a-redirect-loop-in-pantheon){.external}). The link created uses a URL `GET` parameter `__sg_api`, which has double underscores. The platform strips this type of parameter to improve <a href="/docs/pantheon_stripped/#which-query-parameters-are-optimized" data-proofer-ignore>caching performance</a>.

**Solution:** Manually change the the parameter `__sg_api` to any variable (like `sg_api`) without double underscores as prefix in the following lines of `sendgrid-email-delivery-simplified/lib/class-sendgrid-mc-optin.php`:

 - Line 25:  `$vars[] = '__sg_api';`
 - Line 40:  `if( isset( $wp->query_vars['__sg_api'] ) )`
 - Line 146: `$confirmation_link = site_url() . '/?__sg_api=1&token=' . $token;`

<div class="alert alert-danger" role="alert" markdown="1">
#### Warning {.info}
This workaround may potentially break again with the next plugin update, and you will need to manually reapply the modification.
</div>

<hr>

### [SmartCrawl Pro](https://premium.wpmudev.org/project/smartcrawl-wordpress-seo/){.external}
**Issue:** The sitemap URL linked by the plugin produces a `500 Internal Server Error` on Test and Live environments. This results in a PHP error: `class not found WP_Filesystem_Direct`. See more [details about the issue](https://premium.wpmudev.org/forums/topic/smartcrawl-pro-class-wp_filesystem_direct-not-found){.external}.

**Solution:** The plugin fails to implement a direct `FS_METHOD` in Test and Live environments. Add the following to `wp-config.php`, before the line `/* That's all, stop editing! Happy Pressing. */`:

```php
define('FS_METHOD', 'direct');
```

Alternative plugins that have an XML sitemap feature that works well on the platform include:

* [Google Sitemap Generator](https://wordpress.org/plugins/google-sitemap-generator/){.external}
* [Yoast](https://wordpress.org/plugins/wordpress-seo/){.external}

<hr>

### [Timthumb](https://code.google.com/p/timthumb/){.external}
**Issue**: TimThumb is no longer supported or maintained.
<hr>
### [TubePress Pro](https://tubepress.com/){.external}
**Issue**: Sites running PHP version 5.3 produce a WSOD after activating this plugin.

**Solution**: [Upgrade your site's PHP version](/docs/php-versions) to 5.5, 5.6, or 7.0.
<hr>

### [Unbounce Landing Pages](https://wordpress.org/plugins/unbounce/){.external}
**Issue**: Click to call conversions aren't tracking even if the pages are not cached because the cookies are being stripped.

 **Solution**: Usually these type of issues can be solved if the cookie name can be renamed with a prefix starting with `STXKEY_`, but it is inadvisable to modify the plugin directly. It is suggested by the Unbounce team to separate your Pantheon site domain (eg. example.com) and the Unbounce landing page in a subdomain (e.g., unbounce.example.com), because your Unbounce landing pages can't live at exactly the same URL as your homepage. See the outlined solution [here](https://documentation.unbounce.com/hc/en-us/articles/203661044-Connecting-Your-Domain-to-Unbounce){.external} or get in touch with Unbounce support for more help.

<hr>

### [UNLOQ Two Factor Authentication (2FA)](https://wordpress.org/plugins/unloq/){.external}
**Issue**: `This widget does not work on this domain` error message shown after deploying plugin across environments on Pantheon. This is because the API credentials used on the original environment are being used on a new environment URL, which is not allowed by the plugin. This is by design.

**Solution**: Manually change `unloq_credentials` key in the`wp_options` table. Alternatively, you can re-create an application by resetting your plugin installation (deactivate, delete entries, etc.).

For an alternative 2FA plugin, see [Secure Your Site with Two-Factor Authentication](/docs/guides/two-factor-authentication/#single-site-tfa).

<hr>

### [Unyson Theme Framework](https://wordpress.org/plugins/unyson/){.external}
**Issue**: This plugin has an internal extension system which installs additional files aside from the plugin itself. Some of those extensions have an additional `.gitignore` file that prevents it from being deployed to Test and Live environment. See [this GitHub issue](https://github.com/ThemeFuse/Unyson/issues/3615){.external} for more information.

**Solution**: When using these Unyson Extensions, manually delete the `.gitignore` files in the corresponding locations:

Page builder
- `wp-content/plugins/framework/extensions/shortcodes/.gitignore`
- `wp-content/plugins/framework/extensions/shortcodes/extensions/page-builder/.gitignore`

WordPress Shortcodes
- `wp-content/plugins/unyson/framework/extensions/shortcodes/.gitignore`

Translate Press
- `wp-content/plugins/unyson/framework/extensions/shortcodes/.gitignore`

Events
- `wp-content/plugins/unyson/framework/extensions/events/.gitignore`

Brizy
- `wp-content/plugins/brizy/vendor/twig/twig/.gitignore`

<hr>

### [Visual Composer: Website Builder](https://visualcomposer.io/){.external}
**Issue**: This plugin fails to download additional assets during the internal plugin activation procedure on Test and Live environments.

**Solution 1: New sites, without existing Test and Live environments**: If this plugin is installed and activated on a new site _before_ the Test and Live environments are created, it will properly transfer all assets and database settings to the additional environments.

**Solution 2: Sites with existing Test and Live environments**: To activate the plugin on sites with existing Test and Live environments, add the following code block to `wp-config.php`:
```
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    define('FS_METHOD', 'direct');
}
```

<hr>

### [Weather Station](https://wordpress.org/plugins/live-weather-station/){.external}
**Issue**: This module uses [`php-intl`]( https://secure.php.net/manual/en/intro.intl.php), which is not currently supported by Pantheon.
<hr>

### [WooCommerce](https://wordpress.org/plugins/woocommerce/){.external}
**Issue**: The "batch upload" process can fail during large uploads. The platform has a 120 second timeout limit for scripts, and large upload processes can hit this limit.

**Solution**: The suggested workaround is to clone the site locally, import the items, then sync the database back up to the platform.
<hr>

### [WooZone](https://codecanyon.net/item/woocommerce-amazon-affiliates-wordpress-plugin/3057503){.external}
**Issue 1**: This plugin checks `WP_MEMORY_LIMIT`, which defaults to 40MB, instead of `ini_get('memory_limit')`, creating this notice:

![WooZone Error](/source/docs/assets/images/woozone-error.png)

**Solution**: Add the following line to `wp-config.php`:

    define('WP_MEMORY_LIMIT', '256M');

**Issue 2**: WooZone writes to a cache folder in `wp-content/plugins/woozone/`, which is not editable in Test and Live

**Solution**: Symlink `wp-content/plugins/woozone/cache` to a folder in `wp-content/uploads/`. For details, see [Using Extensions That Assume Write Access](/docs/assuming-write-access).

<hr>
### [Wordfence](https://wordpress.org/plugins/wordfence/){.external}
**Issue 1**: Enabling the Live Traffic tracking feature within Wordfence sends cookies which conflict with platform-level page caching.

**Solution**: Disable Wordfence-generated cookies by disabling Live Traffic within the Wordfence options page. See the  [WordPress support forum](https://wordpress.org/support/topic/wfvt-cookie?replies=5){.external} for details.

**Issue 2**: The Wordfence firewall expects specific write access to `wp-content/wflogs` during activation. Adding a symlink does not mitigate this, so using the Wordfence firewall is not supported on the platform. This has been [reported as an issue](https://wordpress.org/support/topic/write-logs-to-the-standard-file-path/){.external} within the plugin support forum.

**Issue 3**: The Wordfence firewall installs a file called `.user.ini` that includes `wordfence-waf.php` from the absolute path which uses the application container's ID. These paths will change from time to time due to routine platform maintenance. When a container is migrated and when this plugin is deployed to another environment the absolute path is no longer valid resulting in a WSOD. This has been [reported as an issue](https://wordpress.org/support/topic/set-auto_prepend_file-path-relatively/){.external} within the plugin support forum.
<hr>

### [WordPress Social Login](https://wordpress.org/plugins/wordpress-social-login/){.external}

**Issue 1**: This plugin attempts to access PHP native sessions [before WordPress has been bootstrapped](https://wordpress.org/support/topic/plugin-starts-before-wordpress/){.external}, which prevents the Pantheon PHP native sessions plugin from being called. This leads to a 500 error when authenticating with external services.

**Solution**: While *not recommended*, you can add the following lines to `wp-config.php` before the first call to `session_start`:

```
if (defined( "PANTHEON_BINDING" )) {
  include_once( "/srv/bindings/". PANTHEON_BINDING ."/code/wp-blog-header.php" );
}
```

**Please note:** You will need to make this change every timethat the plugin is updated.

**Issue 2**: This plugin creates a session on every page, which can prevent [page level caching](https://wordpress.org/support/topic/cannot-cache-pages-due-to-sessions-on-every-page-with-wsl-plugin/){.external}.

<hr>

### [WP-Rocket](https://wp-rocket.me/){.external}
**Issue 1:** As with other caching plugins, this conflicts with [Pantheon's Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/){.external}. The caching feature can be disabled so other features like file optimization, media, etc. can be used side-by-side.

**Solution**: 

1. In SFTP mode, install the WP-Rocket plugin to the dev environment by uploading via SFTP or from the WP dashboard.
1. Activate the plugin from the dashboard.
1. Disable WP-Rocket caching by finding the `WP_CACHE` value defined by WP-Rocket in `wp-config.php`, and setting it to false:

   ```php
   define('WP_CACHE', false);
   ```

**Issue 2:** WP-rocket [assumes write access](/docs/assuming-write-access) to read-only file paths in Pantheon.

**Solution:** [Create symlinks](/docs/assuming-write-access/#create-a-symbolic-link) for the paths `wp-content/wp-rocket-config` and `wp-content/cache` to a writable path.

<hr>

### [WPBakery: Page Builder](https://wpbakery.com/){.external}
**Issue**: The Custom CSS and Design Options pages of the plugin (`?page=vc-custom_css`, `?page=vc-color`) try to create new files when saved. Due to problems related to incorrect `FS_METHOD`, files are not created or saved in the expected folder, `wp-content/uploads/js_composer`.

**Solution**: In `wp-config.php`, place this block of code:

```
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    define('FS_METHOD', 'direct');
}
```

<hr>

### [WP All Import / Export](http://www.wpallimport.com/){.external}

**Issue:** Large batch processes can fail if they take longer than the platform will allow. See [Timeouts on Pantheon](/docs/timeouts) for more information.

**Solution:** To avoid hitting a timeout, you can try:

 - Splitting the import or export into smaller parts
 - Set the plugin to only process 1 or 2 records per iteration

<hr>

### [WP Fastest Cache](https://wordpress.org/plugins/wp-fastest-cache/){.external}

**Issue 1**: This plugin requires write access to a cache folder in `wp-content/cache`, which is not granted on Test and Live environments by design.

**Solution**: Symlink `wp-content/cache` to a folder in `wp-content/uploads/`. For details, see [Using Extensions That Assume Write Access](/docs/assuming-write-access)

**Issue 2**: This plugin uses `is_dir` to verfiy the target directory, which will return false if the directory is a symlink. This causes a permissions error when deleting cache files.

<hr>

### [WP Migrate DB](https://wordpress.org/plugins/wp-migrate-db/){.external}

**Issue:** On Test and Live environments, the **Compatibility** settings cannot be configured because this feature requires write access to `wp-content/mu-plugins`. This issue prevents plugins from being included in DB exports and search-and-replace tasks.

**Solution:** The normal search-and-replace and DB export functions of this plugin work, but will leave all plugins disabled while in operation. If a specific plugin is required to remain active during the DB export and search-and-replace operations, add a filter for it as described in the [plugin's debugging page](https://deliciousbrains.com/wp-migrate-db-pro/doc/compatibility-mode/){.external}.

<hr>

### [WPML - The WordPress Multilingual Plugin](https://wpml.org/){.external}
**Issue**: Locking an environment prevents WPML from operating and returns the following error:  `It looks like languages per directories will not function`.

**Solution**: Make the environment public within the Site Dashboard. For details, see [Security on the Pantheon Dashboard](/docs/security).

<hr>

### [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/){.external}

**Issue**: The redirects for Yoast SEO setting will detect two options for redirect methods, "PHP", and "Web Server". The Web Server option expects write access to the `nginx.conf` file, which is not writable on Pantheon.

**Solution**: Only use the "PHP" redirect method.

<hr>

## WordPress Themes

### [Jupiter](https://themes.artbees.net/pages/jupiter-wordpress-theme-create-wordpress-websites/){.external}

**Issue**: This theme presents a form requesting FTP credentials in order to automatically update its components. This will appear on Dev, Test and Live environments and can be hidden with CSS, but is still present.

**Solution**: The form can be disabled by adding the following to `wp-config.php`, above the line `/* That's all, stop editing! Happy Pressing. */`:

```php
/** Changes to disable Jupiter theme FTP form */
define('FS_METHOD', 'direct');
define('FS_CHMOD_DIR', ( 0755 & ~ umask() ) );
define('FS_CHMOD_FILE', ( 0755 & ~ umask() ) );
define('FTP_BASE', __DIR__);
define('FTP_CONTENT_DIR', __DIR__ .'/wp-content/');
define('FTP_PLUGIN_DIR', __DIR__ .'/wp-content/plugins/');
```

<hr>

## WordPress Functions

### [add_management_page()](https://developer.wordpress.org/reference/functions/add_management_page/){.external}

**Issue**: Adding a submenu page to the Tools main menu using WordPress roles and capabilities that would read or write files to core, themes, or plugins, is not supported.

For example, the `install_plugins` capability isn't present on the Test or Live environment, therefore  menus created with it will not display. For example:

```
hook = add_management_page( 'My WP Tool Page', 'My WP Tool',
  'install_plugins', 'mywptool', array( $this, 'admin_page' ), '' );

add_action( "load-$hook", array( $this, 'admin_page_load' ) );
```

This is because write permissions are restricted in Test and Live per the [Pantheon Workflow](/docs/pantheon-workflow/#understanding-write-permissions-in-test-and-live).

**Solution**: You can use another capability such as `read_private_posts` instead.

The list of [WordPress roles and capabilities](https://codex.wordpress.org/Roles_and_Capabilities){.external} that should not be relied upon include:

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

### [wp_filesystem->get_contents()](https://developer.wordpress.org/reference/classes/wp_filesystem_base/get_contents/){.external}

**Issue**: The function `wp_filesystem->get_contents()` can fail when an environment is in Git mode (as Test and Live always are) because it is aware of filesystem-level permissions which are restricted in this mode.

**Solution**: As described in [this StackExchange answer](https://wordpress.stackexchange.com/questions/166161/why-cant-the-wp-filesystem-api-read-googlefonts-json/166172#166172){.external}, for cases where file ownership doesn't matter this function could be replaced with `file_get_contents()`. This is true of most cases where the file in question is only being read, not written to.

## PHP Libraries
Due to the cloud-based infrastructure of the Pantheon platform, certain PHP libraries are not available on the platform.

### MSSQL
The MSSQL PHP library used to interface with Microsoft SQL Server databases is not supported on Pantheon for PHP versions below 7.2. See [Upgrade PHP Versions](/docs/php-versions/) to set your PHP version. Please note that Pantheon does not offer MSSQL databases, this library is only available for those connecting to external databases.

## Dynamic Outbound IPs
Due to the cloud-based infrastructure of the Pantheon platform, outbound requests are served by dynamic IP addresses. If your site relies on a static IP address for outgoing requests, the recommended solution is the [Pantheon Enterprise Gateway](/docs/pantheon-enterprise-gateway). This is the only way to guarantee compatibility with extensions or services that require a known outgoing IP. Otherwise, you will need to find an alternative to accomplish the request. For more information, see [Dynamic Outgoing IP Addresses](/docs/outgoing-ips).

## Using the tmp Directory
**Issue**: Extensions that require the use of the `/tmp` directory are not supported. With multiple application containers, as exists on Live environments, it's assumed the `/tmp` directory will be on the same application container. However, as we run a distributed application container matrix, the `/tmp` directory is not shared.

**Solution**: For more details, see [Temporary File Management](/docs/tmp/).
