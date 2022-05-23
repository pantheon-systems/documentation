---
title: WordPress Known Issues
description: Learn the recommended solutions for known issues on the Pantheon Website Management Platform for WordPress sites.
cms: "WordPress"
categories: [troubleshoot]
tags: [code]
---
This page tracks known issues and the recommended solution (if any) for running WordPress on the Pantheon website platform. Most sites work fine, but there are some common gotchas we are tracking and working to address.

## Table Prefixes

If you are importing a site and the database has custom prefixes for your DB tables (e.g. anything other than wp\_), Pantheon will try to detect this on import. However, if you do a multi-step import, or upload a database manually, you may need to:

 - Update the `$table_prefix` variable in the `wp-config.php` file,
 - Update user metadata with `update wp_usermeta set meta_key = replace(meta_key, 'oldprefix_', 'wp_');`, replacing `oldprefix` with the previously used prefix.

<Alert title="Note" type="info">
Table prefixes are not supported or recommended by Pantheon. For more details see <a data-proofer-ignore href="/docs/mysql-access/#are-table-prefixes-supported">Accessing MySQL Databases</a>.
</Alert>

## Automatic Updates

WordPress's automatic update functionality will not work on Pantheon site environments. We disable all automatic updates by default with the [Pantheon Updates](https://github.com/pantheon-systems/WordPress/blob/default/wp-content/mu-plugins/pantheon/pantheon-updates.php) plugin, found within the mu-plugins directory of our WordPress upstream. This plugin disables core, theme, and plugin updates on all Pantheon environments. Attempting to override this functionality by editing or removing this file will break your Test and Live environments. The codebase for these environments is not writeable, and WordPress will continually attempt to download and unpack core updates, which it cannot do on these environments. For more information, see the following:

- [Applying Upstream Updates](/core-updates/ "How to apply core updates to sites on Pantheon")
- [Updating WordPress Plugins](/cms-admin/#wordpress-dashboard "How to update plugins")

## PHP Sessions

If you see this error:

```php
Warning: session_start(): user session functions not defined
```

It means you have some code (plugin or theme) that's using PHP Sessions, which require a plugin to work on Pantheon. Read more about [WordPress and PHP Sessions](/wordpress-sessions).

### PHP Version Compatibility

WordPress is not fully compatible with PHP 8.0 or 8.1. The remaining known issues with PHP 8.1 are deprecation notices. A deprecation notice is not an error, but an indicator of the compatibility work that is needed before PHP 9 is released and notices become fatal errors. The PHP code will continue to work with the deprecation notices. 

For more information, refer to the [PHP Versions](/php-versions) documentation. 

## Site Networks / Multisite

Pantheon supports designated use cases for [WordPress Site Networks](/guides/multisite) created by WordPress' Multisite feature.

It's especially ill-advised to use Multisite to set up many distinct/separate sites — e.g. running different plugins, for different customers — on a single code installation.

## Plugins with Known Issues
See [WordPress Plugins and Themes with Known Issues](/plugins-known-issues) for a list of WordPress plugins that are not supported and/or require workarounds.

## Image Uploads
Since WordPress 4.5, a bug exists affecting the upload of large dimension images regardless of file size. This generally presents itself as an "HTTP error" when uploading. See this [core issue](https://core.trac.wordpress.org/ticket/36534) for more information.

## Force WordPress to use GD Library instead of Imagick
WordPress uses both GD Library and Imagick when editing or uploading images/PDF files. For big files, there are times when uploading images inconsistently fails or succeeds. This is because WordPress tries to utilize either of the two libraries, depending on which resource is available at a given time.

We've seen that GD Library works reliably for large files, and you can insert the sample code below in your theme's `function.php` to force use of GD Library:

```php
function force_use_gdlib( $editors ) {
    $default_editor = 'WP_Image_Editor_GD';
    $editors = array_diff( $editors, array( $default_editor ) );
    array_unshift( $editors, $default_editor );
    return $editors;
}
add_filter( 'wp_image_editors', 'force_use_gdlib' );
```

See this [core issue](https://core.trac.wordpress.org/ticket/43310) on WordPress.org for more information.
