---
title: Unsupported/Problematic Modules and Plugins
description: An up-to-date list of Drupal modules and WordPress plugins Pantheon does not support.
keywords: modules, plugins, unsupported, drupal, wordpress
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
**Issue**: This module requires edits to the `nginx.conf` which is not currently supported on the platform. See [Known Limitations](/docs/articles/sites/known-limitations/#nginx.conf) and [https://www.drupal.org/node/1669182](https://www.drupal.org/node/1669182).
<hr>
### Aquia Solr Search
**Issue**: If Acquia Solr modules are present in the site codebase (even if disabled) and Pantheon Apache Solr is enabled, the site will be unable to connect to Solr server.

**Solution**: Delete the Acquia Solr modules from the codebase and then disable and re-enable the Pantheon Apache Solr module.
<hr>
### Background Process  
**Issue**: The module allows for Drupal to perform "parallel" (asynchronous non-blocking mode) requests. However, there are a number of limitations working in a distributed environment and function correctly on the platform. See [https://www.drupal.org/node/2233843](https://www.drupal.org/node/2233843).

<hr>
### Backup & Migrate
**Issue**: The Backup and Migrate module can create large archives and cause issues with the workflow tools on the dashboard. See [Backup Creation](/docs/articles/sites/backups/backup-creation/#drupal-note-why-is-backup-&-migrate-not-recommended-on-pantheon?).

**Solution**: You can use the automated backups that are available on the dashboard for each environment.
<hr>
### Boost
**Issue**: Boost is an unnecessary caching layer that may cause issues. Every site on Pantheon can leverage our robust Varnish infrastructure that caches pages for anonymous visitors at the highest possible performance. See [Working with Varnish](/docs/articles/sites/varnish/).

<hr>

### Cache Expiration
**Issue**: Unfortunately, there is no way to selectively purge the Varnish cache.

**Solution**: See [Varnish Caching - Drupal and WordPress Advanced Topics](https://pantheon.io/docs/articles/sites/varnish/caching-advancedtopics/) for details on how to bypass Varnish.


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

**Solution**: The alternative for now is to break up the files into smaller groups.
<hr>
#### Media: Browser Plus
<<<<<<< Updated upstream
**Issue**:  This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/articles/sites/code/unsupported-modules-plugins/#using-the-/tmp-directory) section below.
<hr>
#### Media: Filesystem
**Issue**:  This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/articles/sites/code/unsupported-modules-plugins/#using-the-/tmp-directory) section below.
=======
**Issue**:  This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/articles/sites/code/unsupported-modules-plugins/#using-the-tmp-directory) section below.
<hr>
#### Media: Filesystem
**Issue**:  This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/articles/sites/code/unsupported-modules-plugins/#using-the-tmp-directory) section below.
>>>>>>> Stashed changes
<hr>
### Mobile Tools
**Issue**: Conflicts with Varnish. See [https://www.drupal.org/node/1976162#comment-7411366](https://www.drupal.org/node/1976162#comment-7411366).
<hr>
### Mollom  
**Issue**: Mollum cookies will invalidate Varnish.
<hr>
### Pathologic  
 **Issue**: The path of the base URL is changed and cached by the module itself.  

 **Solution**: The [documentation on Drupal.org](https://drupal.org/node/257026) for the module mentions the issues and the remedy, which is a cache clear operation. If you are unable to exclude cached data from your dumps or avoid migrating cache data, you should clear your site’s cache after importing the data.
<hr>
#### Plupload
<<<<<<< Updated upstream
**Issue**: See [Using the tmp Directory](/docs/articles/sites/code/unsupported-modules-plugins/#using-the-/tmp-directory) section below.
=======
**Issue**: See [Using the tmp Directory](/docs/articles/sites/code/unsupported-modules-plugins/#using-the-tmp-directory) section below.
>>>>>>> Stashed changes
<hr>
### Registry Rebuild  
This is built into the platform. See [Drupal Drush Command-Line Utility](/docs/articles/local/drupal-drush-command-line-utility/#use-registry-rebuild-on-pantheon) for details on how to use Registry Rebuild on Pantheon.
<hr>
### Schema  
**Issue**: The module doesn't work with the MySQL TIMESTAMP column type in our heartbeat table, which is part of how we maintain status around whether or not a site and its database is active. This is a [known bug](https://drupal.org/node/468644) in the schema module.

**Solution**: Set a variable to suppress the error, [shown here](http://drupalcode.org/project/schema.git/blob/08b02458694d186f8ab3bd0b24fbc738f9271108:/schema.module#l372). Setting the variable `schema_suppress_type_warnings` to **true** will do it. You can achieve that by adding the following line to `settings.php`:  
   ```
   $conf[‘schema_suppress_type_warnings’] = TRUE;
   ```
<hr>
#### Taxonomy CSV  
<<<<<<< Updated upstream
**Issue**:  This module requires the use of the tmp directory. See [Using the tmp Directory](/docs/articles/sites/code/unsupported-modules-plugins/#using-the-/tmp-directory) section below.
=======
**Issue**:  This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/articles/sites/code/unsupported-modules-plugins/#using-the-tmp-directory) section below.
>>>>>>> Stashed changes
<hr>
### Varnish
**Issue**: Conflicts with the existing platform configuration.

**Solution**: Update Drupal performance settings to set the TTL and have Varnish serve requests. See [Drupal 7 Performance and Varnish Caching Settings](/docs/articles/drupal/drupal-performance-and-caching-settings/)
<hr>
#### Views data export
<<<<<<< Updated upstream
**Issue**: This module requires the use of the tmp directory. See [Using the tmp Directory](/docs/articles/sites/code/unsupported-modules-plugins/#using-the-/tmp-directory) section below.
<hr>
#### Webform export<br>
**Issue**:  This module requires the use of the tmp directory. See [Using the tmp Directory](/docs/articles/sites/code/unsupported-modules-plugins/#using-the-/tmp-directory) section below.
=======
**Issue**: This module requires the use of the `/tmp` directory. See [Using the tmp Directory](/docs/articles/sites/code/unsupported-modules-plugins/#using-the-tmp-directory) section below.
<hr>
#### Webform export<br>
**Issue**:  This module requires the use of the `tmp` directory. See [Using the tmp Directory](/docs/articles/sites/code/unsupported-modules-plugins/#using-the-tmp-directory) section below.
>>>>>>> Stashed changes

**Solution**: Use [drush](http://www.drush.org/en/master/), as this uses a single application container to process the export. The relevant drush command is `webform-export` (alias wfx).
<hr>
##WordPress Plugins

### Caching Plugins (e.g. Batcache, W3 Total Cache, or WP Super Cache)
**Issue**: Conflicts with Varnish.

**Solution**: See [Varnish Caching - Drupal and WordPress Advanced Topics](https://pantheon.io/docs/articles/sites/varnish/caching-advancedtopics/) for details on how to bypass Varnish.
<hr>
### Timthumb
**Issue**: TimThumb is no longer supported or maintained. See [https://code.google.com/p/timthumb/](https://code.google.com/p/timthumb/).
<hr>

## Dynamic Outbound IPs
Due to the cloud-based infrastructure of the Pantheon platform, outbound requests are served by dynamic IP addresses. If your site relies on a static IP address for outgoing requests, the recommended solution is the [Pantheon Enterprise Gateway](/docs/articles/sites/code/pantheon-enterprise-gateway). This is the only way to guarantee compatibility with extensions or services that require a known outgoing IP. Otherwise, you will need to find an alternative to accomplish the request.

For more information, see [Dynamic Outgoing IP Addresses](/docs/articles/sites/code/dynamic-outgoing-ip-addresses).

## Using the tmp Directory
**Issue**: Extensions that require the use of the `/tmp` directory are not supported. With multiple application servers, as exists on Live environments, it's assumed the `/tmp` directory will be on the same application container. However, as we run a distributed application container matrix, the `/tmp` directory is not shared. For more details on Pantheon's distributed infrastructure, see [All About Application Containers](/docs/articles/sites/all-about-application-containers).

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
Using sites/default/files/tmp as a work around for these issues will produce unpredictable side effects and is not supported.</div>
