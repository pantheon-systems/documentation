---
title: Unsupported/Problematic Modules and Plugins
description: An up-to-date list of Drupal modules and WordPress plugins Pantheon does not support.
keywords: modules, plugins, unsupported, drupal, wordpress
---
This article lists modules and plugins that do not work with or are currently unsupported on the Pantheon platform.
We do not prevent you from installing and using these plugins/modules; however, they will not work as expected and we cannot provide troubleshooting support.

##Drupal Modules

<div class="table-responsive">
<table class="table table-condensed table-striped">
<thead>
<tr>
<th width="20%">Module</th>
<th width="40%">Issue</th>
<th width="40%">Solution</th>
</tr>
</thead>
<tbody>
<tr>
<td>APC</td>
<td></td>
<td></td>
</tr>
<tr>
<td>Adaptive Image Styles</td>
<td></td>
<td></td>
</tr>
<tr>
<td>Background Process</td>
<td>The module allows for Drupal to perform "parallel" (asynchronous non-blocking mode) requests. However, there are a number of limitations working in a distributed environment and function correctly on the platform.</td>
<td></td>
</tr>
<tr>
<td>Backup &amp; Migrate</td>
<td></td>
<td></td>
</tr>
<tr>
<td>Boost</td>
<td></td>
<td></td>
</tr>
<tr>
<td>Mollom</td>
<td>Cookies break Varnish.</td>
<td></td>
</tr>
<tr>
<td>Pathologic</td>
<td>The path of the base URL is changed and cached by the module itself.</td>
<td>The documentation on Drupal.org for the module mentions the issues and the remedy, which is a cache clear operation. If you are unable to exclude cached data from your dumps or avoid migrating cache data, you should clear your site's cache after importing the data.</td>
</tr>
<tr>
<td>IMCE</td>
<td></td>
<td>Requires patch for Drupal 6. Drupal 7 works without any issues</td>
</tr>
<tr>
<td>Registry Rebuild</td>
<td>This is built into the Pantheon platform.</td>
<td></td>
</tr>
<tr>
<td>Schema</td>
<td>The module doesn't work with the MySQL TIMESTAMP column type in our heartbeat table, which is part of how we maintain status around whether or not a site and its database is active. This is a known bug in the schema module.</td>
<td>Set a variable to suppress the error, [shown here](http://drupalcode.org/project/schema.git/blob/08b02458694d186f8ab3bd0b24fbc738f9271108:/schema.module#l372). Setting the variable <code>schema_suppress_type_warnings</code> to **true** will do it. You can achieve that by adding the following line to <code>settings.php</code>:  
<code>
<pre>
$conf['schema_suppress_type_warnings'] = TRUE;
<pre>
</code></td>
</tr>
<tr>
<td>Cache Expiration</td>
<td></td>
<td></td>
</tr>
<tr>
<td>Varnish</td>
<td></td>
<td></td>
</tr>
<tr>
<td>HTTPRL</td>
<td>This module can severely impact performance. This may be the result of module code or its configuration on the platform that results in the spikes.</td>
<td></td>
</tr>
</tbody>
  </table></div>

### Using the `/tmp` Directory
**Issue**:
The modules listed below are not supported due to the use of the `/tmp` directory. With multiple application servers, as exists on Live environments, Drupal assumes the `/tmp` directory will be on the same application container. However, as we run a distributed application container matrix, the `/tmp` directory is not shared. For more details on Pantheon's distributed infrastructure, see [All About Application Containers](/docs/articles/sites/all-about-application-containers).

<div class="alert alert-danger" role="alert">
<strong>Warning</strong>: Using sites/default/files/tmp as a work around for these issues will produce unpredictable side effects and is not supported.</div>


- Media: Browser Plus

- Media: Filesystem

- Plupload

- Taxonomy CSV  

- Views data export

- Webform export<br>
 **Solution**: Use [drush](http://www.drush.org/en/master/), as this uses a single application container to process the export. The relevant drush command is `webform-export` (alias wfx).


##WordPress Plugins

- WP Super Cache

- W3 Total Cache

- batcache

- Timthumb
