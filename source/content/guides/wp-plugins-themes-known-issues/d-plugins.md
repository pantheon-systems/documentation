---
title: WordPress Plugins and Themes with Known Issues
subtitle: D Plugins
description: A list of WordPress plugins beginning with D that are not supported and/or require workarounds.
cms: "WordPress"
tags: [plugins, themes, code]
contributors: [aleksandrkorolyov, jocastaneda, carl-alberto]
categories: [help]
newcms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-03-24"
contenttype: [guide]
layout: guide
showtoc: true
permalink: docs/guides/wp-plugins-themes-known-issues/d-plugins
anchorid: d-plugins
---


## Disable REST API and Require JWT / OAuth Authentication

<ReviewDate date="2019-04-01" />

**Issue:** When the [Disable REST API and Require JWT / OAuth Authentication](https://wordpress.org/plugins/disable-rest-api-and-require-jwt-oauth-authentication/) plugin is enabled along with WooCommerce, WP-CLI and Pantheon dashboard workflows like **Cache Clear** can fail. This issue may not happen for environments where WP-CLI is not installed (local machine, other platforms, etc):

```none
Fatal error: Uncaught Error: Call to undefined method WP_Error::get_data() in /srv/bindings/.../code/wp-content/plugins/woocommerce/includes/cli/class-wc-cli-runner.php:64
```

For WooCommerce, the CLI runner needs some of the REST endpoints for it to function. The plugin is only allowing a specific set of paths for allowed access.

**Solution:** In the `plugin.php` file, edit the `if ( ! is_user_logged_in() ) ` conditional to include a check for CLI PHP requests:

```php:title=plugin.php
    if ( ! is_user_logged_in() && php_sapi_name() != 'cli' ) {

        // Only allow these endpoints: JWT Auth.
        $allowed_endpoints = array(
            '/jwt-auth/v1/token/validate',
            '/jwt-auth/v1/token',
            '/oauth/authorize',
            '/oauth/token',
            '/oauth/me',
    );
    $allowed_endpoints = apply_filters( 'reqauth/allowed_endpoints', $allowed_endpoints );

```

___

## Divi WordPress Theme & Visual Page Builder

<ReviewDate date="2022-09-28" />

**Issue:** Divi WordPress Theme & Visual Page Builder may produce the error below when attempting to edit pages. This is caused by the page builder attempting to write to three different nested folders in the web root. This issue is also expressed when the WordPress admin dashboard becomes slow when editing posts using Divi.

```bash
.../data/Utils.php:758  ET_Core_Data_Utils::WPFS():
[ERROR]: Unable to write to filesystem. Please ensure that the web server process has write access to the WordPress directory.
```

**Explanation of why these issues occur:** The dynamic features in Divi, along with other settings stored in `et-cache`, can create excessive rewrites to the file system. Under high traffic uncached requests, this can saturate the file system, and degrade the performance of the site. The effect this creates is compounded when [WordPress' `FS_METHOD`](https://developer.wordpress.org/reference/functions/get_filesystem_method/) is not set to direct. Elegant themes provide these configurations in an attempt to enhance the experience of their Product, however these options are redundant and detrimental in certain environments.

**Solution:** The resolution is to access the Divi Theme Options located under the Advanced section in Builder and disable Static CSS File Generation:

1. Navigate to **Divi Theme Options**, select **Builder**, and then select **Advanced**.

1. Disable Static CSS file generation in the Divi theme.

1. Select **Theme Options**, select **General**, select **Performance**, and then select to disable Dynamic CSS.

1. Consider disabling other Dynamic settings if possible.

1. Verify that a symlink exists for `wp-content/et-cache`.

1. Define the `FS_METHOD` in the `wp-config` file if you are not using [Pantheon's mu-plugin](/guides/wordpress-configurations/plugins#pantheon-must-use-plugin).

1. Purge the contents of `et-cache` manually but **do not** purge the `et-cache` folder itself. You can do this by accessing the site's files via [SFTP](/guides/sftp).

**I am still having issues:** Please [contact support](/guides/support/contact-support/) if you have completed the resolution steps above and you are still having issues.
___