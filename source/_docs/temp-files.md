---
title: Temporary File Management with Multiple Application Containers
description: Learn how to work with temporary files in distributed environments.
tags: [debugcode, infrastructure]
categories: []
---
Live sites on Performance Medium and above plans have multiple [application containers](/docs/application-containers).  Pantheon's distributed system means that requests are spread between all of the available application servers, which is part of how we help the site scale. However, the `tmp` directory on one instance is not able to access the `tmp` contents on another application server.

Pantheon's upstream for [WordPress](https://github.com/pantheon-systems/WordPress/blob/master/wp-config.php#L83-L86){.external} and [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/settings.pantheon.php#L146-L154){.external} configures the temporary directory path dynamically based on the application container processing the request. This ensures the accessibility of temporary files generated for a given task until the request has been completed.

Drupal 7 sites do not have the option to set or override the system `tmp` path.

## Modules/Plugins/Themes Override

Modules, plugins, and/or themes that override Pantheon's temporary directory configuration are typically not supported within our distributed environment. However, you may be able to resolve issues by adjusting the setting used to configure the temporary directory path within the module, plugin and/or theme.


<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">WordPress</a></li>

  <!-- 2nd Tab Nav -->
  <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal 8</a></li>

</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">
  In the following example, we're using `some_tmp_setting` to refer to an option defined by a plugin or theme to reference a temporary file location. Replace this with the option used by the plugin you're working with:

  ```
  update_option('some_tmp_settings', $_SERVER['HOME'] . '/tmp');
  ```
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
  In the following example, we're using `some_tmp_setting` to refer to an option defined by a module to reference a temporary file location. Replace this with the option used by the module you're working with:

  ```php
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    $conf['some_tmp_setting'] = $_SERVER['HOME'] . '/tmp';
  }
  ```
  </div>
</div>


## Using Valhalla, Pantheon's Networked Filesystem
<div class="alert alert-danger" role="alert"><h4 class="info">Warning</h4>
<p markdown="1">
While this technique can work, it comes with a strong caution. Using the filesystem for `/tmp` requests is not a fail-safe alternative. Valhalla is not intended for use with temporary files, and there will be a performance penalty. In most general use cases, there's no need for temporary files to be available between application servers.
</p></div>

### WordPress
Create a `tmp/` directory within the `wp-content/uploads/` directory and add the following to `wp-config.php`:

```
define('WP_TEMP_DIR', ABSPATH . 'wp-content/uploads/tmp');
```

This will allow for consistent execution of requests to temporary files for sites with more than one application container.

### Private Temporary Files
If you prefer to manage your temporary files privately, use the following to ensure resources are available across application containers. These files will be web-accessible based on the access control rules that you set for your site.

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="tab-3-id" role="presentation" class="active"><a href="#tab-3-anchor" aria-controls="tab-3-anchor" role="tab" data-toggle="tab">WordPress</a></li>

  <!-- 2nd Tab Nav -->
  <li id="tab-4-id" role="presentation"><a href="#tab-4-anchor" aria-controls="tab-4-anchor" role="tab" data-toggle="tab">Drupal</a></li>

</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="tab-3-anchor" markdown="1">
  Create a `private/tmp/` directory within the `wp-content/uploads/` directory and add the following to `wp-config.php`:

  ```
  define('WP_TEMP_DIR', ABSPATH . 'wp-content/uploads/private/tmp');
  ```
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="tab-4-anchor" markdown="1">
  Create a `private/tmp/` directory within `sites/default/files/` and add the following to `settings.php`.  Replace `'plupload_temporary_uri'` with the applicable module or theme setting used to configure the temporary directory path.

  ```
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    $conf['plupload_temporary_uri'] = 'private://tmp';
  }
  ```
  </div>
</div>
