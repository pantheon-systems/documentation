---
title: Drupal Modules with Known Issues
description: A list of Drupal modules that are not supported and/or require workarounds.
cms: "Drupal"
categories: [troubleshoot]
tags: [modules]
---

This page lists modules that may not function as expected or are currently problematic on the Pantheon platform. This is not a comprehensive list (refer to [other issues](#other-issues)). We continually update it as problems are reported and/or solved. If you are aware of any modules that do not work as expected, please [contact support](/support).

We do not prevent you from installing and using these plugins/modules. However, we cannot provide support for incompatible modules, or if they are used against the guidance provided here.

**Module Maintainers:** If your work is listed here, please [reach out to us](https://github.com/pantheon-systems/documentation/issues/new). We're happy to help provide information that can lead to conflict resolutions between your code and the platform.

If your work is already updated but still listed here, let us know so we can remove it, or [submit a pull request](https://github.com/pantheon-systems/documentation/edit/main/source/content/modules-known-issues.md).

___

## [APC - Alternative PHP Cache](https://www.drupal.org/project/apc)

**Issue**: APC is in-memory and limited to a single instance. It cannot span multiple server environments.

**Solution**: Pantheon recommends Redis as a caching backend, which has better performance.
___

## [Adaptive Image Styles](https://www.drupal.org/project/ais)

<ReviewDate date="2020-02-10" />

**Issue**: This module requires edits to the `nginx.conf` which is not currently supported on the platform. Refer to the [Platform Considerations](/platform-considerations/#nginx.conf) documentation and [https://www.drupal.org/node/1669182](https://www.drupal.org/node/1669182) for more information.
___

## [Apache Solr Multilingual](https://www.drupal.org/project/apachesolr_multilingual)

**Issue**: When the Apache Solr Multilingual module is enabled, the default class variable set by the Pantheon Apache Solr module is changed, and the site will be unable to connect to the Solr server.

If you have already enabled the Apache Solr Multilingual module and found that your site can no longer connect to the Solr server, you will need to first disable and uninstall the module. Next, disable and re-enable the Pantheon Apache Solr module. This will add the class variable back so your site can connect to the Solr server again.
___

## [Background Process](https://www.drupal.org/project/background_process)

**Issue**: The module allows for Drupal to perform "parallel" (asynchronous non-blocking mode) requests. However, there are a number of limitations working in a distributed environment and function correctly on the platform. Refer to [https://www.drupal.org/node/2233843](https://www.drupal.org/node/2233843) for more information.

___

## [Backup and Migrate](https://www.drupal.org/project/backup_migrate)

**Issue**: The Backup and Migrate module can create large archives and cause issues with the tools in the Database / Files tab of the Dashboard. Refer to [Backup Creation](/backups/#why-is-the-drupal-module-backup-%26-migrate-not-recommended-on-pantheon%3F) for more information.

**Solution**: You can use the automated backups that are available on the Dashboard for each environment. If you want to access your backups and copy it to your own repository (Amazon S3, FTP server, etc), consider using a bash script. You can do that by running it in your local system, or use an external server, or a service that runs cron jobs for you. Refer to the [Access Backups](/backups/#access-backups) documentation for more details.

___

## [Basic HTTP Authentication](https://www.drupal.org/project/basic_auth)

<ReviewDate date="2020-08-25" />

**Issue**: This module conflicts with [Pantheon's Dashboard Security Tool](/security#password-protect-your-sites-environments) when both are enabled on Drupal sites, resulting in 403 errors.

**Solution**:  We suggest using Pantheon's Dashboard Security Tool if you want to set up HTTP authentication. Additionally, refer to [Advanced Redirects and Restrictions](/advanced-redirects) for more options to control and restrict access to some or all of your site.

___

## [BigPipe](https://www.drupal.org/documentation/modules/big_pipe)

<ReviewDate date="2018-04-22" />

**Issue**: The Pantheon Edge layer buffers text output, and BigPipe depends on being able to stream text output. Since BigPipe provides no benefit on Pantheon sites, we recommend disabling it.

___

## [Boost](https://www.drupal.org/project/boost)

**Issue**: Boost is an unnecessary caching layer that may cause issues. Every site on Pantheon can leverage our robust page caching infrastructure that returns pages for anonymous visitors at the highest possible performance. Refer to [Pantheon's Global CDN](/global-cdn) documentation for more information.

___

## [Cache Expiration](https://www.drupal.org/project/expire)

**Issue**: This module doesn't support Pantheon's granular cache clearing and header system.

**Solution**: Install the [Pantheon Advanced Page Cache module](/modules/#advanced-page-cache) to dynamically purge content from cache on content update.

___

## [Composer Manager](https://www.drupal.org/project/composer_manager)

<ReviewDate date="2020-02-10" />

This module has been deprecated by its authors for Drupal 8 and above. The suggestions made below are for Drupal 7 users, and are not guaranteed to be successful in all use cases.

If you're creating a new site that needs Composer-managed libraries, we strongly recommend using Drupal 8.1 or newer.

**Issue**: Composer Manager expects write access to the site's codebase via SFTP, which is prevented in Test and Live environments on Pantheon by design.

**Solution**: As suggested within the [module documentation](https://www.drupal.org/node/2405805), manage dependencies in Dev exclusively. Place the following configuration within `settings.php` to disable autobuild on Pantheon. This will also set appropriate file paths for Composer so that checks to see if the path is writable will not fail. Packages, however, are stored within the root directory of the site's codebase and version controlled:

```php:title=settings.php
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    # Set appropriate paths for Composer Manager
    $conf['composer_manager_file_dir'] = 'private://composer';
    $conf['composer_manager_vendor_dir'] = $_SERVER['HOME'] . '/code/vendor';
    # Disable autobuild on Pantheon
    $conf['composer_manager_autobuild_file'] = 0;
    $conf['composer_manager_autobuild_packages'] = 0;
}
```

You also need to create the directory path `sites/default/files/private/composer`.

This disables auto-building in all Pantheon environments. This will allow Drush commands such as `pm-enable` and `pm-disable` to function correctly in both Git and SFTP modes as Composer Manager will only update packages and the autoloader when _explicitly_ told to do so via `drush composer-manager [COMMAND] [OPTIONS]` or `drush composer-json-rebuild`. This is the setting recommended by Pantheon.  While `composer.json` can be rebuilt via [Terminus](/terminus) while the DEV site is in SFTP mode, `composer install` must be run locally, committed via Git, and pushed back to Pantheon.

___

## [Composer Merge Plugin](https://github.com/wikimedia/composer-merge-plugin)

<ReviewDate date="2021-08-13" />

This plugin is [deprecated](https://www.drupal.org/docs/develop/using-composer/managing-dependencies-for-a-custom-project).

**Issue**: The `wikimedia/composer-merge-plugin` package plugin automatically runs `composer update` during `composer install`, causing conflicts with Pantheon's Integrated Composer framework. 

**Solution**: Sites managing dependencies for a custom project should move to the recommended [path repository method](https://www.drupal.org/docs/develop/using-composer/managing-dependencies-for-a-custom-project).
___

## [DropzoneJS](https://www.drupal.org/project/dropzonejs)

<ReviewDate date="2020-06-30" />

**Issue:** Uploads using the "Media Entity DropzoneJS" widget do not reliably work on Pantheon. The widget relies on a temporary path that is not shared between application containers. Refer to [this issue](https://www.drupal.org/project/dropzonejs/issues/2916330) for more information.

___

## [Dynamic Entity Reference](https://www.drupal.org/project/dynamic_entity_reference)

<ReviewDate date="2021-08-06" />

Dynamic Entity Reference provides a field combination for Drupal 8 that allows for the reference of more than one entity type.

**Issue**: The Dynamic Entity Reference module is an alpha version contributor module, and the MySQL queries it creates cannot be controlled or regulated. MySQL triggers are not well supported in Drupal or WordPress applications. On Pantheon, when cloning the database between environments, these triggers may not work or may cause errors when used.

___

## [Front](https://www.drupal.org/project/front)

<ReviewDate date="2018-01-03" />

**Issue**: The Drupal 7 version of the module disables caching for the front page.

**Solution**: [Apply a patch to the module](https://www.drupal.org/project/front/issues/1854300#comment-12405090) to allow caching for anonymous users. Note that this patch doesn't work with the **Full** or **Redirect** options.

___

## [H5P](https://www.drupal.org/project/h5p)

<Partial file="h5p-known-issues.md" />

___

## [Honeypot http:BL](https://www.drupal.org/project/httpbl)

<ReviewDate date="2019-07-10" />

**Issue**: http:BL only has a module to take advantage of the service for Apache. Pantheon runs on nginx webservers and Apache modules are not compatible with the Platform.

___

## [HTTP Basic Authentication](https://www.drupal.org/docs/8/core/modules/basic_auth) - Drupal 8 (core)

 **Issue**: This Drupal 8 core module conflicts with [Pantheon's Security tool](/security/#password-protect-your-site%27s-environments) when both are enabled, resulting in 403 errors.

 **Solution**: Lock the environment via Pantheon's Security tool or via the module, not both. For details, refer to [Security on the Pantheon Dashboard](/security/#troubleshoot) for more information.

___

## [IMCE 6.x](https://www.drupal.org/node/251024) and [IMCE 7.x](https://www.drupal.org/project/imce/releases/7.x-1.11)

**Issue**: Operations on directories containing an inordinate amount of files will likely hit the load balancer timeout threshold (30 seconds).

**Solution**: One solution is to break up the files into smaller groups so that directories are less populated. Another option is to rewrite `imce_image_info()` so that your site's caching backend (Database or Object Cache) is used for operations on highly populated directories:

1. [Enable the Object Cache](/object-cache), otherwise the database cache is utilized. (Depending on your site's configuration, you may not need to enable the object cache.)
1. Edit `imce/inc/imce.page.inc` and replace the contents of `imce_image_info()` with:

 ```php:title=imce.page.inc
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

1. Clear caches on the Dev environment. The first action to populate cache will take longer than subsequent requests.

You can modify this patch according to your needs, such as performing an operation post upload and/or specifying a particular cache bin.

___

## [ImageAPI Optimize](https://www.drupal.org/project/imageapi_optimize)

<ReviewDate date="2019-10-17" />

**Issue**: ImageAPI Optimize supports 3rd party libraries such as advpng, OptiPNG, PNGCRUSH, jpegtran, jfifremove, advdef, pngout, jpegoptim. These libraries have to be installed on the server. At this time, they are not supported.

**Solution**: Use a 3rd-party module like [reSmush.It](https://www.drupal.org/project/resmushit) or a local application like [ImageOptim.](https://imageoptim.com) or [OptiPNG](http://optipng.sourceforge.net/).

___

## [JS](https://www.drupal.org/project/js)

<ReviewDate date="2020-02-10" />

**Issue**: This module requires modification of the site's `.htaccess` or `nginx.conf` file, which cannot be modified on the platform. While using `settings.php` can sometimes be effective as a means of implementing redirects, because `POST` data needs to be preserved, it is not possible to implement redirects at the application layer in a way that would allow this module to function as intended.
___

## [LiveReload](https://www.drupal.org/project/livereload)

**Issue**: This module triggers heavy load on the application container as soon as it is enabled and causes pages to time out for anonymous users for Drupal 7 and Drupal 8.

___

## [Live CSS](https://www.drupal.org/project/live_css)

<ReviewDate date="2020-02-10" />

**Issue**: This module requires write access to the site's codebase for editing CSS files, which is not granted on Test and Live environments by design.

___

## [Media: Browser Plus](https://www.drupal.org/project/media_browser_plus)

**Issue**:  This module requires the use of the `/tmp` directory. Refer to the [Using the tmp Directory](#using-the-tmp-directory) section below.

___

## [Node export webforms](https://www.drupal.org/project/node_export_webforms)

**Issue**:  This module requires the use of the `tmp` directory. Refer to the [Using the tmp Directory](#using-the-tmp-directory) section below.

**Solution**: Use [drush](https://drushcommands.com/drush-8x/webform/webform-export/), as this uses a single application container to process the export. The relevant drush command is `webform-export` (alias wfx).

Customers have also reported success by making the export path [configurable](https://www.drupal.org/node/2221651).
___

## [Node Gallery](https://www.drupal.org/project/node_gallery)

**Issue**: Using Node Gallery with Plupload attaches cookies to image uploads for authentication purposes. This conflicts with our page cache configuration as we strip all cookies for images, CSS, and JS files to improve performance.
___

## [Pathologic](https://www.drupal.org/project/pathologic)

<ReviewDate date="2020-02-10" />

 **Issue**: The path of the base URL is changed and cached by the module itself.

 **Solution**: The [documentation on Drupal.org](https://drupal.org/node/257026) for the module mentions the issues and the remedy, which is a cache clear operation. If you are unable to exclude cached data from your dumps or avoid migrating cache data, you should clear your site's cache after importing the data.

 Additionally, Pathologic can cause the change of base URLs in a domain access configuration based on the value of `$options['url']` in the site Drush config. This is set to the first domain listed on an environment by default on Pantheon, which can result in unexpected root domains being written to the cache. Refer to [our Drush documentation](/drush/#known-limitations) for more information about overriding this value.

## [Persistent Login](https://www.drupal.org/project/persistent_login)

**Issue**: This module attaches per-user cookies that conflict with our page cache configuration.

**Solution**: Follow the remedy provided within the [module's documentation of the issue on Drupal.org](https://www.drupal.org/node/1306214), which is to alter the code to prefix the cookie name with `SESS`.
 ___

## Plupload

**Issue**: [Plupload](https://www.drupal.org/project/plupload) requires the use of the `/tmp` directory. Refer to the [Using the tmp Directory](#using-the-tmp-directory) section below.

**Solution**: A possible solution is to set the `plupload_temporary_uri` variable in `settings.php`. Example:

```php:title=setting.php
$conf['plupload_temporary_uri'] ='private://tmp';
```

___

## [reCAPTCHA](https://www.drupal.org/project/recaptcha)

<ReviewDate date="2020-05-05" />

**Issue 1:** If your site is running PHP 5.3, form submissions that use the reCAPTCHA module might continually fail and display the error: `The answer you entered for the CAPTCHA was not correct`. This is because the default arg_separator.output for PHP 5.3 is `&amp;` while for PHP 5.5 it is `&`.

**Solution:** Override the default arg_separator.output value in `settings.php` by adding the following line:

```php:title=settings.php
ini_set('arg_separator.output', '&');
```

___

**Issue 2:** On non-live environments, reCAPTCHA returns the error, "ERROR for site owner: Invalid domain for site key."

**Solution:** Add more domains to your Google reCAPTCHA configuration. Add `dev-<sitename>.pantheonsite.io` and `test-<sitename>.pantheonsite.io` to the site. This is set in [Google's reCAPTCHA admin panel](https://www.google.com/recaptcha/admin).

**Solution 2:** Disable the reCAPTCHA on non-live environments. In Drupal 7, you can set the configuration key to be `NULL` in your `settings.php` file as follows:

```php:title=settings.php
// Deactivate reCAPTCHA not running on the live site.
if (defined('PANTHEON_ENVIRONMENT') && $_ENV['PANTHEON_ENVIRONMENT'] != 'live') {
  $conf['recaptcha_site_key'] = NULL;
}
```

___

**Issue 3:** reCAPTCHA relies on `$_SERVER['SERVER_NAME']` which is ephemeral on horizontally-scaled platforms like Pantheon. See [SERVER_NAME and SERVER_PORT on Pantheon](/server_name-and-server_port) for details and workarounds.

___

## [S3 File System](https://www.drupal.org/project/s3fs)

<ReviewDate date="2019-12-06" />

**Issue 1:** When the module is configured to take over the public file system, Drupal's CSS/JS aggregation will not work unless you also upload Drupal Core and contrib modules to S3. See [Drupal Issue 2511090](https://www.drupal.org/project/s3fs/issues/2511090) for more information.

**Issue 2:** Uploading files over 100MB through the Drupal file fields are still limited by the [Platform upload limitations](/platform-considerations#large-files).

___

## [Schema](https://www.drupal.org/project/schema)

**Issue**: The module doesn't work with the MySQL TIMESTAMP column type in our heartbeat table, which is part of how we maintain status around whether or not a site and its database is active. This is a [known bug](https://drupal.org/node/468644) in the schema module.

**Solution**: Set a variable to suppress the error, [shown here](http://drupalcode.org/project/schema.git/blob/08b02458694d186f8ab3bd0b24fbc738f9271108:/schema.module#l372). Setting the variable `schema_suppress_type_warnings` to **true** will do it. You can achieve that by adding the following line to `settings.php`:

```php:title=settings.php
$conf[‘schema_suppress_type_warnings’] = TRUE;
```

___

## [Search Api Solr Date Sort](https://www.drupal.org/project/search_api_solr_date_sort)

<ReviewDate date="2020-03-12" />

**Issue**: This module overrides a class from the [Pantheon Apache Solr module](/solr-drupal-7) responsible for connecting to Pantheon's Apache Solr service. As a result, Solr connection is lost.

**Solution**: Instead of patching the module, you can fix the issue with a custom module:

1. Define a new class that inherits from the `PantheonApachesolrSearchApiSolrService` and contains logic from the `SearchApiSolrDateSortSolrService` (or vice a versa). Refer to the [module source code](https://git.drupalcode.org/project/search_api_solr_date_sort/-/blob/7.x-1.x/includes/service.inc) for examples.

1. Implement the `hook_search_api_service_info_alter()` function in your custom module's `.module` file and add your class into a configuration array. Refer to the [developer documentation](https://www.drupal.org/node/1999396) for details. Ensure that your [module's weight](https://www.drupal.org/docs/7/creating-custom-modules/howtos/how-to-update-a-modules-weight) is gereater than that of `search_api_solr_date` and `pantheon_apachesolr`.

___

## [Simple OAuth / OAuth 2.0](https://www.drupal.org/project/simple_oauth)

**Issue**: The module requires a very specific set of permissions for the folder and the keys to be uploaded. Using Private or non-standard filepaths won't work. It is not possible to change these in LIVE or TEST environment.

**Solution**: You can try to patch the [permission check in the module](https://github.com/thephpleague/oauth2-server/blob/e184691ded987c00966e341ac09c46ceeae0b27f/src/CryptKey.php#L51). The alternative is to use off-site key management tools like [Lockr](https://www.drupal.org/project/lockr)
___

## [Update Manager](https://www.drupal.org/docs/8/core/modules/update-manager) - Drupal 8/9 (core)

<ReviewDate date="2021-03-17" />

**Issue**: Sometimes, after a fresh system install, the **Manage** > **Extend** > **+ Install new module** and **Manage** > **Appearance** > **+ Install new theme** buttons are missing.

This is a known bug in Drupal 8 and Drupal 9. Refer to Issue [#2350711](https://www.drupal.org/project/drupal/issues/2350711) for more information.

**Solution**:

1. Navigate to the **Manage** > **Extend** page at `/admin/modules`.  
1. Click the **Uninstall** tab, and uninstall the Update Manager module.
1. Click the **List** tab and re-install the Update Manager.
1. [Clear the cache](/clear-caches).

___

## [Varnish](https://www.drupal.org/project/varnish)

**Issue**: Conflicts with the existing platform configuration.

**Solution**: Update Drupal performance settings to set the TTL and have the platform page cache serve requests. Refer to [Pantheon's Global CDN](/global-cdn) documentation. 
___

## [Views data export](https://www.drupal.org/project/views_data_export)

**Issue**: This module requires the use of the `/tmp` directory. Refer to [Using the tmp Directory](#using-the-tmp-directory) below, for more information.

**Solution**: A possible solution would be to set the export directory in `settings.php` to a `public://` stream wrapper location versus a `temporary://` one.  Example:

```php:title=settings.php
$conf['views_data_export_directory'] = 'public://';
```

or to a specific directory:

```php:title=settings.php
$conf['views_data_export_directory'] = 'public://vde/';
```

Additionally, the variable can be set using Drush:

```bash{promptUser: user}
drush vset views_data_export_directory 'public://'
```

Also refer to the [Multiple Servers + Batch Database Stream Wrapper (sandbox module)](https://www.drupal.org/sandbox/jim/2352733).

___

<Partial file="tmp-directory.md" />

## Other Issues

Modules will not work on Pantheon if they:

- Require Apache.
- Require customized `.htaccess` files.
- Need to modify Nginx configuration files.
- Require PostgreSQL or other non-MySQL compatible databases.
