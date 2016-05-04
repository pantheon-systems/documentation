---
title: Temporary File Management with Multiple Application Containers
description: Learn how to work with temporary files in distributed environments.
categories: [developing]
tags: [files]
keywords: tmp, temp files, tmp files, temporary files, multiple application containers, distributed environments
---
Live sites on Business and Elite plans have multiple [application containers](/docs/application-containers).  Pantheon's distributed system means that requests are spread between all of the available application servers, which is part of how we help the site scale. However, the `tmp/` directory on one instance is not able to access the `tmp/` contents on another application server.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
While you may test methods to alter the routing of temporary file storage, there is no warranty that these methods will be 100% effective.  
</div>

Pantheon's upstream for [wordpress](https://github.com/pantheon-systems/WordPress/blob/master/wp-config.php#L75-L78) and [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/settings.pantheon.php#L128-L136) configures the temporary directory path dynamically based on the application container processing the request. This ensures the accessibility of temporary files generated for a given task until the request has been complete.  This is essentially the same for Drupal 7, only the temporary path assignment comes from the Pressflow settings.

## Modules/Plugins/Themes Override

Modules, plugins, and/or themes that override Pantheon's temporary directory configuration are typically not supported within our distributed environment. However, you may be able to resolve issues by adjusting the setting used to configure the temporary directory path within the module, plugin and/or theme.

### Drupal
Some modules provide variables that can be altered in order to set a temporary file location.
For example, replace `'plupload_temporary_uri'` with the applicable module or theme setting used to configure the temporary directory path. The following is an example for the Plupload module:

```
$conf['plupload_temporary_uri'] = $_SERVER['HOME'] . '/tmp';
```

Visit the [Unsupported/Problematic Modules and Plugins](https://pantheon.io/docs/unsupported-modules-plugins/) doc for other possible workarounds on popular extensions.

### WordPress
As with Drupal, plugings that allow the temporary location to be set can update the option as follows:
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
