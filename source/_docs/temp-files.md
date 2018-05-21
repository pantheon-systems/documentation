---
title: Temporary File Management
description: Learn how to work with temporary files in distributed environments.
tags: [debugcode, infrastructure]
categories: []
---

Some Plugins or Modules depend on temporary file locations to store ephemeral data. Pantheon sets a safe temporary file location for [WordPress](https://github.com/pantheon-systems/WordPress/blob/master/wp-config.php#L83-L86){.external} and [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/settings.pantheon.php#L146-L154){.external}, but plugins/modules that override this path can create problems. This page will teach you the differences between common temporary file locations, and help you direct your plugins/modules to the proper location for your use case.

## Application Containers and The File System (Valhalla)

Live sites on Performance Medium and above plans have multiple [application containers](/docs/application-containers).  Pantheon's distributed system means that requests are spread between all of the available application servers, which is part of how we help the site scale. However, the `~/tmp` directory on one instance is not able to access the `~/tmp` contents on another application server. This means that plugins which expect teporary files to persist between multiple PHP tasks may fail.

Temporary File locations in the [filesystem](/docs/files) are persistent across application containers, but are not optimal solutions for temp folders with a large number of files, or those that undergoe heavy writes. <a href=#set-tmp-to-the-filesystem data-proofer-ignore>See below</a> for more information.

## Modules/Plugins/Themes Override

Modules, plugins, and/or themes that override Pantheon's temporary directory configuration are typically not supported within our distributed environment. However, you may be able to resolve issues by adjusting the setting used to configure the temporary directory path within the module, plugin and/or theme.


<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">WordPress</a></li>

  <!-- 2nd Tab Nav -->
  <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal</a></li>

</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">
  In the following example, we're using `some_tmp_setting` to refer to an option defined by a plugin or theme to reference a temporary file location. Replace this with the option used by the plugin you're working with:

  ```php
  if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    update_option('some_tmp_settings', $_SERVER['HOME'] . '/tmp');
  }
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

### Set `tmp` to the Filesystem

<div class="alert alert-danger" role="alert"><h4 class="info">Warning</h4>
<p markdown="1">
While this technique can work, it comes with a strong caution. Using the filesystem for `/tmp` requests is not a fail-safe alternative. Valhalla is not intended for use with temporary files, and there will be a performance penalty. In most general use cases, there's no need for temporary files to be available between application servers.
</p></div>

To use a temporary path on the Valhala filesystem, create the path `wp-content/uploads/tmp/` for WordPress, or `/sites/default/files/tmp` for Drupal 8. Use the code snippet for your CMS above, replacing the given path with the one you just created.


### Private Temporary Files
If you prefer to manage your temporary files privately **and** need them to persist across multiple application containers, use the paths `wp-content/uploads/private/tmp` for WordPress or `sites/default/files/private/tmp` for Drupal. These files will be web-accessible based on the access control rules that you set for your site. See [Private Paths for Files and Code](/docs/private-paths/) for more details.
