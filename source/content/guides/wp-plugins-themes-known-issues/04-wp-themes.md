---
title: WordPress Plugins and Themes with Known Issues Directory
subtitle: Themes, Functions, and Other Issues
description: WordPress themes and functions with known issues and workarounds, and other issues.
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
showtoc: true
permalink: docs/guides/wp-plugins-themes-known-issues/wp-themes
anchorid: wp-themes
---

This section provides information on WordPress themes and functions with known issues and workarounds, as well as information on other issues.

### Self-Updating Themes

Several WordPress themes, including [Jupiter](https://jupiter.artbees.net/), [Nanosoft](https://themeforest.net/item/nanosoft-wp-theme-for-it-solutions-and-services-company/22064051), and [Uncode](https://undsgn.com/uncode/), present a form requesting FTP credentials in order to automatically update its components. This will appear on Dev, Test and Live environments and can be hidden with CSS, but is still present.

The form can be disabled by adding the following to `wp-config.php`, above the line `/* That's all, stop editing! Happy Pressing. */`:

```php:title=wp-config.php
/** Disable theme FTP form */
define('FS_METHOD', 'direct');
define('FS_CHMOD_DIR', ( 0755 & ~ umask() ) );
define('FS_CHMOD_FILE', ( 0755 & ~ umask() ) );
define('FTP_BASE', __DIR__);
define('FTP_CONTENT_DIR', __DIR__ .'/wp-content/');
define('FTP_PLUGIN_DIR', __DIR__ .'/wp-content/plugins/');
```

___

### Uncode

<ReviewDate date="2019-06-19" />

**Issue:** The [Uncode](https://undsgn.com/uncode/) theme throws a PHP Fatal error in its settings page for Dev's and Multidev's Git mode, Test and Live.

**Solution:** This theme assumes write access to theme folders `wp-content/themes/uncode/core/assets/css` and `wp-content/themes/uncode/library/css` for it to work properly in git mode. For additional details, see [Using Extensions That Assume Write Access](/symlinks-assumed-write-access#uncodetheme).

___

## WordPress Functions

### add_management_page()

**Issue:** For the [add_management_page()](https://developer.wordpress.org/reference/functions/add_management_page/), adding a submenu page to the Tools main menu using WordPress roles and capabilities that would read or write files to core, themes, or plugins, is not supported.

For example, the `install_plugins` capability isn't present on the Test or Live environment, therefore  menus created with it will not display. For example:

```php
hook = add_management_page( 'My WP Tool Page', 'My WP Tool',
  'install_plugins', 'mywptool', array( $this, 'admin_page' ), '' );

add_action( "load-$hook", array( $this, 'admin_page_load' ) );
```

This is because write permissions are restricted in Test and Live per the [Pantheon Workflow](/pantheon-workflow/#understanding-write-permissions-in-test-and-live).

**Solution:** You can use another capability such as `read_private_posts` instead.

The list of [WordPress roles and capabilities](https://codex.wordpress.org/Roles_and_Capabilities) that should not be relied upon include:

- `update_core`
- `update_plugins`
- `update_themes`
- `install_plugins`
- `install_themes`
- `upload_plugins`
- `upload_themes`
- `delete_themes`
- `delete_plugins`
- `edit_plugins`
- `edit_themes`

### wp_filesystem->get_contents()

**Issue:** With [wp_filesystem->get_contents()](https://developer.wordpress.org/reference/classes/wp_filesystem_base/get_contents/), the function `wp_filesystem->get_contents()` can fail wFhen an environment is in Git mode (as Test and Live always are) because it is aware of filesystem-level permissions which are restricted in this mode.

**Solution:** As described in [this StackExchange answer](https://wordpress.stackexchange.com/questions/166161/why-cant-the-wp-filesystem-api-read-googlefonts-json/166172#166172), for cases where file ownership doesn't matter this function could be replaced with `file_get_contents()`. This is true of most cases where the file in question is only being read, not written to.

## Other Issues

Plugins and themes will not work on Pantheon if they:

- Require Apache.
- Require customized `.htaccess` files.
- Need to modify Nginx configuration files.
- Require PostgreSQL or other non-MySQL compatible databases.
