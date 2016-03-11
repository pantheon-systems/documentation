---
title: Temporary File Management with Multiple Application Containers
description: Learn how to work with temporary files in distributed environments.
categories:
- getting-started
keywords: tmp, temp files, tmp files, temporary files, multiple application containers, distributed environments
---
Live sites on Business and Elite plans have multiple [application containers](/docs/all-about-application-containers).  Pantheon's distributed system means that requests are spread between all of the available application servers, which is part of how we help the site scale. However, the `/tmp/` directory on one instance is not able to access the `/tmp/` contents on another application server.

Pantheon's upstream for [WordPress](https://github.com/pantheon-systems/WordPress/blob/master/wp-config.php#L75-L78) and [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/settings.pantheon.php#L128-L136) configures the temporary directory path dynamically based on the application container processing the request. This ensures the accessibility of temporary files generated for a given task until the request has been complete.

Drupal 7 sites can add the following within `settings.php` to achieve the same configuration:

```
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  $config['system.file']['path']['temporary'] = $_SERVER['HOME'] .'/tmp';
}
```

## Modules/Plugins/Themes Override

Modules, plugins, and/or themes that override Pantheon's temporary directory configuration are typically not supported within our distributed environment. However, you may be able to resolve issues by adjusting the setting used to configure the temporary directory path within the module, plugin and/or theme.

### Drupal
Replace `'plupload_temporary_uri'` with the applicable module or theme setting used to configure the temporary directory path. The following is an example for the Plupload module:

```
$conf['plupload_temporary_uri'] = $_SERVER['HOME'] . '/tmp';
```

### WordPress
Replace `'some_tmp_settings'` with the applicable plugin or theme option used to configure the temporary directory path:

```
update_option('some_tmp_settings', $_SERVER['HOME'] . '/tmp');
```

## Use Pantheon's Networked File System
Another option is to manage temporary resources within Valhalla, Pantheon's networked filesystem, which is common across application containers.

### Drupal
Create a `tmp/` directory within `sites/default/files/` and add the following to `settings.php`:

```
$conf['file_temporary_path'] = 'public://tmp';
```

### WordPress
Create a `tmp/` directory within the `wp-content/uploads/` directory and add the following to `wp-config.php`:  

```
define('WP_TEMP_DIR', ABSPATH . 'wp-content/uploads/tmp');
```

This will allow for consistent execution of requests to temporary files for sites with more than one application container.

### Private Temporary Files
If you prefer to manage your temporary files privately, use the following to ensure resources are available across application containers. These files will be web-accessible based on the access control rules that you set for your site.

#### Drupal
Create a `private/tmp/` directory within `sites/default/files/` and add the following to `settings.php`:

```
$conf['file_temporary_path'] = 'private://tmp';
```

#### WordPress
Create a `private/tmp/` directory within the `wp-content/uploads/` directory and add the following to `wp-config.php`:

```
define('WP_TEMP_DIR', ABSPATH . 'wp-content/uploads/private/tmp');
```
