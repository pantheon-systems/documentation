---
title: WordPress Known Issues
description: Learn the recommended solutions for known issues on the Pantheon Website Management Platform for WordPress.
category:
  - WordPress
keywords: wordpress, issues, table prefixes, updates, php, site, plugins
---
This page tracks known issues and the recommended solution (if any) for running WordPress on the Pantheon website platform. Most sites work fine, but there are some common gotchas we are tracking and working to address.

## Table Prefixes

If you are importing a site and the database has custom prefixes for your DB tables (e.g. anything other than wp\_), Pantheon will try to detect this on import. However, if you do a multi-step import, or upload a database manually, you may need to update the $table\_prefix variable in the wp-config.php file Pantheon bundles with your site for the application to correctly see those tables.

## Automatic Updates

WordPress's automatic update functionality will not work on Pantheon site environments. We disable all automatic updates by default with the [Pantheon Updates plugin](https://github.com/pantheon-systems/WordPress/blob/master/wp-content/mu-plugins/pantheon/pantheon-updates.php), found within the mu-plugins directory of our WordPress upstream. This plugin disables core, theme, and plugin updates on all Pantheon environments. Attempting to override this functionality by editing or removing this file will break your Test and Live environments. The codebase for these environments is not writeable, and WordPress will continually attempt to download and unpack core updates, which it cannot do on these environments. For more information, see the following:

- [Applying Upstream Updates](/docs/applying-upstream-updates/ "How to apply core updates to sites on Pantheon")
- [Updating WordPress Plugins](https://pantheon.io/blog/updating-wordpress-plugins-pantheon "Blog post explaining how to update plugins")

## PHP Sessions

If you see this error:

```php
Warning: session_start(): user session functions not defined
```
It means you have some code (plugin or theme) that's using PHP Sessions, which require a plugin to work on Pantheon. Read more about [WordPress and PHP Sessions](/docs/wordpress-and-php-sessions/).

## Site Networks / Multisite

Pantheon supports designated use cases for [WordPress Site Networks](/docs/site-networks) created by WordPress' Multisite feature.


It's especially ill-advised to use Multisite to set up many distinct/separate sites — e.g. running different plugins, for different customers — on a single code installation.

## Unsupported Plugins
See [Unsupported Modules and Plugins](/docs/unsupported-modules-plugins) for an up-to-date list of modules and plugins that do not work with or are not supported by Pantheon.
