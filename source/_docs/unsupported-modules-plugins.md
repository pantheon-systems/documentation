---
title: Unsupported/Problematic Modules and Plugins
description: An up-to-date list of Drupal modules and WordPress plugins Pantheon does not support.
categories: [developing]
tags: [code, debug]
---
This article lists modules and plugins that do not work with or are currently unsupported on the Pantheon platform.
We do not prevent you from installing and using these plugins/modules; however, they will not work as expected and we cannot provide troubleshooting support.

## Drupal Modules
<hr>
### APC
**Issue**: APC is in-memory and limited to a single instance. It cannot span multiple server environments.

**Solution**: Pantheon recommends Redis as a caching backend, which has better performance.
<hr>
### Adaptive Image Styles
**Issue**: This module requires edits to the `nginx.conf` which is not currently supported on the platform. See [Platform Considerations](/docs/platform-considerations/#nginx.conf) and [https://www.drupal.org/node/1669182](https://www.drupal.org/node/1669182).
<hr>
### AdvAgg
**Issue**: We do not recommend using AdvAgg as it can cause conflicts with Varnish caching leading to various errors, such as `Adv CSS/JS Agg – HTTP Request	Error	HTTP requests to advagg for css files are not getting through` or `Adv CSS/JS Agg – HTTP Request	Error	HTTP requests to advagg for js files are not getting through`.
<hr>
### Apache Solr Multilingual
**Issue**: When the Apache Solr Multilingual module is enabled, the default class variable set by the Pantheon Apache Solr module is changed, and the site will be unable to connect to the Solr server.

If you have already enabled the Apache Solr Multilingual module and found that your site can no longer connect to the Solr server, you will need to first disable and uninstall the module. Next, disable and re-enable the Pantheon Apache Solr module. This will add the class variable back so your site can connect to the Solr server again.
<hr>
### Aquia Solr Search
**Issue**: If Acquia Solr modules are present in the site codebase (even if disabled) and Pantheon Apache Solr is enabled, the site will be unable to connect to Solr server.

**Solution**: Delete the Acquia Solr modules from the codebase and then disable and re-enable the Pantheon Apache Solr module.
<hr>
### Background Process  
**Issue**: The module allows for Drupal to perform "parallel" (asynchronous non-blocking mode) requests. However, there are a number of limitations working in a distributed environment and function correctly on the platform. See [https://www.drupal.org/node/2233843](https://www.drupal.org/node/2233843).

<hr>
### Backup & Migrate
**Issue**: The Backup and Migrate module can create large archives and cause issues with the tools in the Database / Files tab of the Dashboard. See [Backup Creation](/docs/create-backups#why-is-the-drupal-module-backup-%26-migrate-not-recommended-on-pantheon%3F).

**Solution**: You can use the automated backups that are available on the Dashboard for each environment.
<hr>
### Boost
**Issue**: Boost is an unnecessary caching layer that may cause issues. Every site on Pantheon can leverage our robust Varnish infrastructure that caches pages for anonymous visitors at the highest possible performance. See [Working with Varnish](/docs/varnish).

<hr>

### Cache Expiration
**Issue**: Unfortunately, there is no way to selectively purge the Varnish cache.

**Solution**: See [Caching: Advanced Topics](/docs/caching-advanced-topics/) for details on how to bypass Varnish.

<hr>
### CKFinder
**Issue**:  If you follow the installation instructions for CKFinder, the `$baseUrl` path is not correctly set and will not recognize any path set via CKFinder.  [Drupal.org issue](https://www.drupal.org/node/2629000)

**Solution**:  Manually edit the `ckfinder/config.php` file and edit the following line to the desired path:

```
$baseUrl = '/ckfinder/userfiles/';
```

<hr>
### Composer Manager
**This module has been deprecated by its authors. The suggestions made below are not guaranteed to be successful in all use cases.**

**Issue**: Composer Manager expects write access to the site's codebase via SFTP, which is prevented in Test and Live environments on Pantheon by design.

**Solution**: As suggested within the [module documentation](https://www.drupal.org/node/2405805), manage dependencies in Dev exclusively. Place the following configuration within `settings.php` to disable autobuild on Pantheon. This will also set appropriate file paths for Composer so that checks to see if the path is writable will not fail. Packages, however, are stored within the root directory of the site's codebase and version controlled:
```

if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  # Set appropriate paths for Composer Manager
  $conf['composer_manager_file_dir'] = 'private://composer/'.$_ENV['PANTHEON_ENVIRONMENT'];
  $conf['composer_manager_vendor_dir'] = $_SERVER['HOME'] . '/code/vendor';
  # Disable autobuild on Pantheon
  $conf['composer_manager_autobuild_file'] = 0;
  $conf['composer_manager_autobuild_packages'] = 0;
}

```
Note: This disables auto-building in *all* Pantheon environments. This will allow Drush commands such as `pm-enable` and `pm-disable` to function correctly in both Git and SFTP modes as Composer Manager will only update packages and the autoloader when _explicitly_ told to do so via `drush composer-manager [COMMAND] [OPTIONS]` or `drush composer-json-rebuild`. This is the setting recommended by Pantheon.  

<hr>
### Global Redirect  
 **Issue**: Too many redirects error when site is in maintenance mode.  

 **Solution**: Ensure that the "Frontpage Redirect Handler" is not ticked in the Global Redirect administration page.
<hr>
### HTTPRL  
**Issue**: This module can severely impact performance. This may be the result of module code or its configuration on the platform that results in the spikes.

<hr>
### IMCE 6.x
**Issue**: Operations on directories containing an inordinate amount of files will likely hit the load balancer timeout threshold (30 seconds).

**Solution**: One solution is to break up the files into smaller groups so that directories are less populated. Another option is to rewrite `imce_image_info()` so that your site's caching backend (Database or Redis) is used for operations on highly populated directories:

1. [Enable Redis](/docs/redis) if available for your site's plan, otherwise Database cache is utilized. Currently all plans can use Redis except Personal.
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

You are welcome to modify this patch according to your needs, such as performing an operation post upload and/or specifying a particular cache bin.

<hr>
### Live CSS
**Issue**: This module requires write access to the site's codebase for editing CSS files, which is not granted on Test and Live environments by design.
<hr>
### Media: Browser Plus
**Issue**:  This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/unsupported-modules-plugins/#using-the-tmp-directory) section below.
<hr>
### Media: Filesystem
**Issue**:  This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/unsupported-modules-plugins/#using-the-tmp-directory) section below.
<hr>
### Mobile Tools
**Issue**: Conflicts with Varnish. See [https://www.drupal.org/node/1976162#comment-7411366](https://www.drupal.org/node/1976162#comment-7411366).
<hr>
### Pathologic  
 **Issue**: The path of the base URL is changed and cached by the module itself.  

 **Solution**: The [documentation on Drupal.org](https://drupal.org/node/257026) for the module mentions the issues and the remedy, which is a cache clear operation. If you are unable to exclude cached data from your dumps or avoid migrating cache data, you should clear your site’s cache after importing the data.
<hr>
### Plupload
**Issue**: This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/unsupported-modules-plugins/#using-the-tmp-directory) section below.

**Solution**: A possible solution is to set the `plupload_temporary_uri` variable in settings.php. Example:
```
$conf['plupload_temporary_uri'] ='private://tmp';
```

You may also need to add this line within the `filefield_sources_plupload.module` file to run through `files/private/tmp` every few hours and delete old files to keep it from piling up:   
`$temp_destination = file_stream_wrapper_uri_normalize('private://tmp/' . $filename);`  

This will move the temporary upload destination from the individual server mount `tmp` directory to the shared `mount tmp files/private/tmp directory`, which should preserve the files between requests.

<hr>
### reCAPTCHA

**Issue**: If your site is running PHP 5.3, form submissions that use the reCAPTCHA module might continually fail and display the error: `The answer you entered for the CAPTCHA was not correct`. This is because the default arg_separator.output for PHP 5.3 is `&amp;` while for PHP 5.5 it is `&`.

**Solution**: Override the default arg_separator.output value in `settings.php` by adding the following line:

`ini_set('arg_separator.output', '&');`

<hr>
### Registry Rebuild  
This is built into the platform. See [Drupal Drush Command-Line Utility](/docs/drush#use-registry-rebuild-on-pantheon) for details on how to use Registry Rebuild on Pantheon.
<hr>
### Schema  
**Issue**: The module doesn't work with the MySQL TIMESTAMP column type in our heartbeat table, which is part of how we maintain status around whether or not a site and its database is active. This is a [known bug](https://drupal.org/node/468644) in the schema module.

**Solution**: Set a variable to suppress the error, [shown here](http://drupalcode.org/project/schema.git/blob/08b02458694d186f8ab3bd0b24fbc738f9271108:/schema.module#l372). Setting the variable `schema_suppress_type_warnings` to **true** will do it. You can achieve that by adding the following line to `settings.php`:  
   ```
   $conf[‘schema_suppress_type_warnings’] = TRUE;
   ```
<hr>
### Taxonomy CSV  
**Issue**:  This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/unsupported-modules-plugins/#using-the-tmp-directory) section below.
<hr>
### Varnish
**Issue**: Conflicts with the existing platform configuration.

**Solution**: Update Drupal performance settings to set the TTL and have Varnish serve requests. See [Drupal 7 Performance and Varnish Caching Settings](/docs/drupal-cache/)
<hr>

### Views data export
**Issue**: This module requires the use of the `/tmp` directory. There is also a [patch](https://www.drupal.org/node/1782038) available, but we still cannot guarantee that the use of the `/tmp` directory will work successfully. See [Using the tmp Directory](/docs/unsupported-modules-plugins/#using-the-tmp-directory) section below for more information.

**Solution**: A possible solution would be to set the export directory in `settings.php` to a `public://` stream wrapper location versus a `temporary://` one.  Example:
```
$conf['views_data_export_directory'] = 'public://';
```
or to a specific directory:
````
$conf['views_data_export_directory'] = 'public://vde/';
````
Additionally, the variable can be set using drush:
````
drush vset views_data_export_directory 'public://'
````
Also see [Multiple Servers + Batch Database Stream Wrapper (sandbox module)](https://www.drupal.org/sandbox/jim/2352733)
<hr>

### Webform export<br>
**Issue**:  This module requires the use of the `tmp` directory. See [Using the tmp Directory](/docs/unsupported-modules-plugins/#using-the-tmp-directory) section below.

**Solution**: Use [drush](http://www.drush.org/en/master/), as this uses a single application container to process the export. The relevant drush command is `webform-export` (alias wfx).

Customers have also reported success by making the export path [configurable](https://www.drupal.org/node/2221651).
<hr>
##WordPress Plugins

### Autoptimize
**Issue**: Autoptimize assumes write access to the site's codebase within the `wp-content/resources` directory, which is not granted on Test and Live environments on Pantheon by design. For additional details, see [Using Extensions That Assume Write Access](/docs/assuming-write-access).

**Solution**: Configure Autoptimize to write files within the standard `wp-content/uploads` path for WordPress (`wp-content/uploads/autoptimize`) by adding the following to `wp-config.php`:
```
define('AUTOPTIMIZE_CACHE_CHILD_DIR','/uploads/autoptimize/');
```
For additional details, see the [Autoptimize's FAQ](https://wordpress.org/plugins/autoptimize/faq). An alternative solution is to [create a symblic link](/docs/assuming-write-access/#create-a-symbolic-link).

### Contact Form 7
**Issue**: This plugin utilizes a static value, `$_SERVER['SERVER_NAME']`, instead of `$_SERVER['HTTP_HOST']` which is generated dynamically.

**Solution**: Add the following to `wp-config.php`: `$_SERVER['SERVER_NAME'] = $_SERVER['HTTP_HOST'];`

For more details, see [SERVER_NAME and SERVER_PORT on Pantheon](/docs/server_name-and-server_port/).
<hr>

### Caching Plugins (e.g. Batcache, W3 Total Cache, or WP Super Cache)
**Issue**: Conflicts with Varnish.

**Solution**: See [Caching: Advanced Topics](/docs/caching-advanced-topics/) for details on how to bypass Varnish.
<hr>

### Instashow
**Issue**: The Instashow plugin relies on query parameters that are not compatible with Pantheon's Edge Cache. See [PANTHEON_STRIPPED](https://pantheon.io/docs/pantheon_stripped/) for more information. This inhibits the ability to set the authorization token required to make the plugin function.
<hr>

### Monarch Social Sharing
**Issue**: Seems to break WP-CLI, which is used by many of our workflows (clone, clear cache).
<hr>

### Revive Old Post
**Issue**: Revive Old Post does not set a proper callback via OAuth and the Twitter module.  It attempts to use ["SERVER_NAME"] instead of the recommended ["HTTP_HOST"]. See [SERVER_NAME and SERVER_PORT on Pantheon](/docs/server_name-and-server_port/).

<hr>

### Sucuri Scanner
**Issue**: Sucuri Scanner enforces absolute file paths for the data storage path and the binding ID of the file path will change with routine platform maintenance.
<hr>

### Timthumb
**Issue**: TimThumb is no longer supported or maintained. See [https://code.google.com/p/timthumb/](https://code.google.com/p/timthumb/).
<hr>

### Wordfence
**Issue #1**: Enabling the Live Traffic tracking feature within Wordfence sends cookies which conflict with Varnish.

**Solution**: Disable Wordfence-generated cookies by disabling Live Traffic within the Wordfence options page. See the  [WordPress support forum](https://wordpress.org/support/topic/wfvt-cookie?replies=5) for details.

**Issue** #2: The Wordfence firewall expects specific write access to `wp-content/wflogs` during activation. Adding a symlink does not mitigate this, so using the Wordfence firewall is not supported on the platform.
<hr>

## Dynamic Outbound IPs
Due to the cloud-based infrastructure of the Pantheon platform, outbound requests are served by dynamic IP addresses. If your site relies on a static IP address for outgoing requests, the recommended solution is the [Pantheon Enterprise Gateway](/docs/pantheon-enterprise-gateway). This is the only way to guarantee compatibility with extensions or services that require a known outgoing IP. Otherwise, you will need to find an alternative to accomplish the request.

For more information, see [Dynamic Outgoing IP Addresses](/docs/outgoing-ips).

## Using the tmp Directory
**Issue**: Extensions that require the use of the `/tmp` directory are not supported. With multiple application servers, as exists on Live environments, it's assumed the `/tmp` directory will be on the same application container. However, as we run a distributed application container matrix, the `/tmp` directory is not shared.

**Solution**: For more details, see [Temporary File Management with Multiple Application Containers](/docs/temp-files).
