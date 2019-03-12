---
title: WordPress Known Issues
description: Learn the recommended solutions for known issues on the Pantheon Website Management Platform for WordPress sites.
tags: [debugcode]
categories: [wordpress]
---
This page tracks known issues and the recommended solution (if any) for running WordPress on the Pantheon website platform. Most sites work fine, but there are some common gotchas we are tracking and working to address.

## Table Prefixes

If you are importing a site and the database has custom prefixes for your DB tables (e.g. anything other than wp\_), Pantheon will try to detect this on import. However, if you do a multi-step import, or upload a database manually, you may need to:

 - Update the `$table_prefix` variable in the `wp-config.php` file,
 - Update user metadata with `update wp_usermeta set meta_key = replace(meta_key, 'oldprefix_', 'wp_');`, replacing `oldprefix` with the previously used prefix.

<div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p markdown="1">Table prefixes are not supported or recommended by Pantheon. For more details see <a data-proofer-ignore href="/docs/mysql-access/#are-table-prefixes-supported">Accessing MySQL Databases</a>.</p></div>

## Automatic Updates

WordPress's automatic update functionality will not work on Pantheon site environments. We disable all automatic updates by default with the [Pantheon Updates](https://github.com/pantheon-systems/WordPress/blob/master/wp-content/mu-plugins/pantheon/pantheon-updates.php) plugin, found within the mu-plugins directory of our WordPress upstream. This plugin disables core, theme, and plugin updates on all Pantheon environments. Attempting to override this functionality by editing or removing this file will break your Test and Live environments. The codebase for these environments is not writeable, and WordPress will continually attempt to download and unpack core updates, which it cannot do on these environments. For more information, see the following:

- [Applying Upstream Updates](/docs/core-updates/ "How to apply core updates to sites on Pantheon")
- [Updating WordPress Plugins](/docs/cms-admin/#wordpress-dashboard "How to update plugins")

## PHP Sessions

If you see this error:

```php
Warning: session_start(): user session functions not defined
```
It means you have some code (plugin or theme) that's using PHP Sessions, which require a plugin to work on Pantheon. Read more about [WordPress and PHP Sessions](/docs/wordpress-sessions/).

## Site Networks / Multisite

Pantheon supports designated use cases for [WordPress Site Networks](/docs/guides/multisite) created by WordPress' Multisite feature.


It's especially ill-advised to use Multisite to set up many distinct/separate sites — e.g. running different plugins, for different customers — on a single code installation.

## Plugins with Known Issues
See [Modules and Plugins with Known Issues](/docs/modules-plugins-known-issues) for a list of WordPress plugins that are not supported and/or require workarounds.

## Image uploads
Since WordPress 4.5, a bug exists affecting the upload of large dimension images regardless of file size. This generally presents itself as an "HTTP error" when uploading. See this [core issue](https://core.trac.wordpress.org/ticket/36534){.external} for more information.
