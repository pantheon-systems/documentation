---
title: WordPress Known Issues
description: Learn the recommended solutions for known issues on the Pantheon platform for WordPress.
category:
  - WordPress
keywords: wordpress, issues, table prefixes, updates, php, site, plugins
---
This page tracks known issues and the recommended solution (if any) for running WordPress on the Pantheon website platform. Most sites work fine, but there are some common gotchas we are tracking and working to address.

## Table Prefixes

If you are importing a site and the database has custom prefixes for your DB tables (e.g. anything other than wp\_), Pantheon will try to detect this on import. However, if you do a multi-step import, or upload a database manually, you may need to update the $table\_prefix variable in the wp-config.php file Pantheon bundles with your site for the application to correctly see those tables.

## Automatic Updates

WordPress's automatic update functionality will not work on Pantheon site environments. We disable all automatic updates by default with the [Pantheon Updates plugin](https://github.com/pantheon-systems/WordPress/blob/master/wp-content/mu-plugins/pantheon/pantheon-updates.php), found within the mu-plugins directory of our WordPress upstream. This plugin disables core, theme, and plugin updates on all Pantheon Environments. Attempting to override this functionality by editing or removing this file will break your Test and Live environments. The codebase for these environments is not writeable, and WordPress will continually attempt to download and unpack core updates, which it cannot do on these environments. For more information, see the following:

- [Applying Upstream Updates](/docs/articles/sites/code/applying-upstream-updates/ "How to apply core updates to sites on Pantheon")
- [Updating WordPress Plugins](https://pantheon.io/blog/updating-wordpress-plugins-pantheon "Blog post explaining how to update plugins")

## PHP Sessions

If you see this error:

    Warning: session_start(): user session functions not defined

It means you have some code (plugin or theme) that's using PHP Sessions, which require a plugin to work on Pantheon. [Read more on WordPress and PHP Sessions](/docs/articles/wordpress/wordpress-and-php-sessions/).

## Site Networks / Multisite

Pantheon does not have specific documentation for setting up and running a "Network" of sites on one direct installation. We do have customers making use of this architecture successfully, but we do not at this time have instructions for how to get it working.

The known success cases all use subdomains to identify different sites. Subdirectory-based sites are not known to work at this time.

While WordPress can use table-prefixing for multisite installations, making it possible to run on Pantheon, all the same risks for security, scalability, and debuggability still apply.

It's especially ill-advised to use Multisite to set up many distinct/separate sites — e.g. running different plugins, for different customers — on a single code installation.

## Unsupported Plugins

- [WP Super Cache](https://wordpress.org/plugins/wp-super-cache/)
- [W3 Total Cache](https://wordpress.org/plugins/w3-total-cache/)
- [batcache](https://wordpress.org/plugins/batcache/)

More to come on this list. Let us know what other plugin issues you see.
