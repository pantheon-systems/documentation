---
title: WordPress Plugins and Themes with Known Issues Directory
subtitle: Assumed Write Access
description: Understand assumed write access on the Pantheon platform.
cms: "WordPress"
tags: [plugins, themes, code]
contributors: [whitneymeredith]
categories: [help]
newcms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2023-01-26"
contenttype: [guide]
layout: guide
permalink: docs/guides/wp-plugins-themes-known-issues/assumed-write-access
anchorid: assumed-write-access
---

This section provides information on assumed write access for WordPress plugins and themes.

Some plugins and themes are built on the assumption that the CMS has write access to the entire filesystem. While this is usually true of standard LAMP/LEMP stack server configuration, Pantheon and other specialized platforms do not. This can result in runtime errors when the software can't write to locations in the codebase in Test and Live environments.

Refer to documentation on [Using the Pantheon WebOps Workflow](/pantheon-workflow) for more information on how Pantheon differentiates "code" from "files".

The solution to these issues is usually to create a symbolic link (symlink) from the plugin's expected write location to a location in the writable filesystem (`/sites/default/files` for Drupal, `wp-content/uploads` for WordPress). The process for creating a symlink and verifying that the symlink is correct is detailed in [Using Extensions That Assume Write Access](/symlinks-assumed-write-access).

The following is a list of plugins that assume write access, and the specific file or folder that needs to be symlinked to resolve:

+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| Plugin                                                                                        | Assumed Write Path                                    | Notes                                                                                            |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| [AccessAlly WordPress LMS](https://accessally.com/)                                           | wp-content/accessally-protected-content               | `PROTECTED_CONTENT_FOLDER` variable within the plugin assumes access to `PATH`                      |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                                                                               | wp-content/ai1vm-backups                              | The platform is not designed for large backup files, and this plugin can cause                   |
|                                                                                               |                                                       | your deployment workflows to break. You can download full backups                                |
| [All-in-One WP Migration](https://wordpress.org/plugins/all-in-one-wp-migration/)             +-------------------------------------------------------+  [from the Site Dashboard](/backups). See [below](#all-in-one-wp-migration)                      |
|                                                                                               | wp-content/plugins/all-in-one-wp-migrations/storage   | for additional information.                                                                      |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| [Autoptimize](https://wordpress.org/plugins/autoptimize/)                                     | wp-content/resources                                  | See the [Autoptimize](#autoptimize) section below for other solutions.                           |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                                                                               | wp-content/et-cache                                   | Remember to repeat this process for each environment,                                            |
| [Divi WordPress Theme & Visual Page Builder](https://www.elegantthemes.com/gallery/divi/)     |                                                       | including Multidevs.                                                                             |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                                                                               | wp-content/cache                                      | Remember to repeat this process for each environment,                                            |
| [Fast Velocity Minify](https://wordpress.org/plugins/fast-velocity-minify/)                   |                                                       | including Multidevs.                                                                             |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                                                                               |                                                       | You can override this path on the plugin configuration page                                      |
| [NextGEN Gallery](https://wordpress.org/plugins/nextgen-gallery/)                             | wp-content/gallery                                    | (`/wp-admin/admin.php?page=ngg_other_options`) to use                                            |
|                                                                                               |                                                       | wp-content/uploads/gallery/ instead of creating a symlink.                                       |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| [Nitropack](https://wordpress.org/plugins/nitropack/)                                         | wp-content/nitropack and `advanced.cache.php`         | Allows for the caching feature to be disabled so that other features, such as                    |
|                                                                                               |                                                       | optimization, can be used side-by-side.                                                          |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| [WooZone](https://codecanyon.net/item/woocommerce-amazon-affiliates-wordpress-plugin/3057503) | wp-content/plugins/woozone/cache                      |                                                                                                  |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| [WP Fastest Cache](https://wordpress.org/plugins/wp-fastest-cache/)                           | wp-content/cache                                      | This plugin uses `is_dir` to verify the target directory, which will return                      |
|                                                                                               |                                                       |false if the directory is a symlink. This causes a permissions error when                         |
|                                                                                               |                                                       |  deleting cache files.                                                                           |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| [WP-Rocket](https://wp-rocket.me/)                                                            | wp-content/wp-rocket-config                                                                                                                              |
|                                                                                               +----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                               | wp-content/cache                                                                                                                                         |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+--------------------------------------------------------------------------------------------------+
| [WPML - The WordPress Multilingual Plugin](https://wpml.org/)                                 | wp-content/languages                                  | Alternate solutions are listed in the [WPML section](#wpml---the-wordpress-multilingual-plugin). |
+-----------------------------------------------------------------------------------------------+-------------------------------------------------------+--------------------------------------------------------------------------------------------------+

### Define FS_METHOD

By default, WordPress tests each directory before uploading a file by writing a small temporary file. Some plugins and themes may have issues on the Pantheon platform due to this write access test. You can avoid these issues (and skip the test of writing a small file) by defining the `FS_METHOD` as `direct` in the `wp-config.php` file above the line `/* That's all, stop editing! Happy Pressing. */`. To resolve the issue, configure the `wp-config.php` to resemble the following code sample:

```php:title=wp-config.php
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
    define('FS_METHOD', 'direct');
}
```

The successful write of the temporary file returns "direct". You can specify the `direct` file system method beforehand to allow operations to run slightly faster. Note that the `direct` specification forces the method to use direct file I/O requests from within PHP, which can open up security issues on poorly configured hosts.

Plugins and themes with issues resolved (at least partially) by this include the following:

- [AccessAlly WordPress LMS](https://accessally.com/)
- [Blabber Theme](https://themeforest.net/item/blabber-allinone-elementor-blog-news-magazine-wordpress-theme/24305542/)
- [Divi WordPress Theme & Visual Page Builder](https://www.elegantthemes.com/gallery/divi/)
- [Event Espresso](https://eventespresso.com/)
- [SmartCrawl Pro](https://premium.wpmudev.org/project/smartcrawl-wordpress-seo/)
- [Thrive Theme Builder](https://thrivethemes.com/themebuilder/)
- [Visual Composer: Website Builder](https://wordpress.org/plugins/visualcomposer/)
- [WPBakery: Page Builder](https://wpbakery.com/)
- [Wordfence Security](https://wordpress.org/plugins/wordfence/)
- [YotuWP Easy YouTube Embed](https://wordpress.org/plugins/yotuwp-easy-youtube-embed/)
- [WPML - The WordPress Multilingual Plugin](https://wpml.org/)

## More Resources

- [Manage Custom Code for WordPress with Plugins](/guides/wordpress-configurations/wordpress-custom-code)
- [WP-CLI on the Pantheon Platform](/guides/wp-cli)