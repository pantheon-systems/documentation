---
title: Temporary File Management with Multiple Application Containers
description: Learn how to work with temporary files in distributed environments.
category:
- getting-started
keywords: tmp, temp files, tmp files, temporary files, multiple application containers, distributed environments
---
Live sites on Professional plans and above have multiple [application containers](/docs/articles/sites/all-about-application-containers).  Pantheon's distributed system means that requests are spread between all of the available application servers, which is part of how we help the site scale. However, the `/tmp/` directory on one instance is not able to access the `/tmp/` contents on another application server.

Pantheon's upstream for [WordPress](https://github.com/pantheon-systems/WordPress/blob/master/wp-config.php#L75-L78) and [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/settings.pantheon.php#L128-L136) configures the `tmp/` directory path dynamically based on the application container processing the request.

Drupal 7 sites can add the following within `settings.php` to achieve the same configuration:

```
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  $config['system.file']['path']['temporary'] = $_SERVER['HOME'] .'/tmp';
}
```

## Modules/Plugins/Themes Override

Modules, plugins, and/or themes that override Pantheon's `tmp/` directory configuration cause issues and are unsupported. However, some problematic modules, plugins, or themes can be reconfigured within `settings.php` or `wp-config.php` to correct issues with the `tmp/` directory path.

**Drupal**: Replace `'some_tmp_settings'` with the module or theme setting: `$conf['some_tmp_settings'] = $_SERVER['HOME'] . '/tmp';`

**WordPress**: Replace `'some_tmp_settings'` with the plugin or theme option: `update_option('some_tmp_settings', $_SERVER['HOME'] . '/tmp');`

## Use Pantheon's Networked File System
Another option is to manage temporary resources within Valhalla, Pantheon's networked filesystem, which is common across application containers.

**Drupal**: Create a `tmp/` directory within `sites/default/files/` and add the following to `settings.php`: `public://tmp`

**WordPress**: Create a `tmp/` directory within the `wp-content/uploads/` directory and add the following to `wp-config.php`:  `    define('WP_TEMP_DIR', ABSPATH . 'wp-content/uploads/tmp');`

This will allow for consistent execution of requests to temporary files for sites with more than one application container.

### Private Temporary Files
If you prefer to manage your temporary files privately, use the following to ensure resources are available across application containers. These files will be web-accessible based on the access control rules that you set for your site.

**Drupal**: Create a `private/tmp/` directory within `sites/default/files/` and add the following to `settings.php`: `private://tmp`

**WordPress**: Create a `private/tmp/` directory within the `wp-content/uploads/` directory and add the following to `wp-config.php`: `define('WP_TEMP_DIR', ABSPATH . 'wp-content/uploads/private/tmp');`
