---
title: WordPress Known Issues
description: Learn the recommended solutions for known issues on the Pantheon platform for Wordpress.
category:
  - getting-started

---

This page tracks known issues and the recommended solution (if any) for running WordPress on the Pantheon website platform. Most sites work fine, but there are some common gotchas we are tracking and working to address.

## Table Prefixes

If you are importing a site and the database has custom prefixes for your DB tables (e.g. anything other than wp\_), Pantheon will try to detect this on import. However, if you do a multi-step import, or upload a database manually, you may need to update the $table\_prefix variable in the wp-config.php file Pantheon bundles with your site for the application to correctly see those tables.

## PHP Sessions

If you see this error:

    Warning: session_start(): user session functions not defined

It means you have some code (plugin or theme) that's using PHP Sessions, which require a plugin to work on Pantheon. [Read more on WordPress and PHP Sessions](/documentation/advanced-topics/wordpress-and-php-sessions/).

## Site Networks / Multisite

Pantheon does not have specific documentation for setting up and running a "Network" of sites on one direct installation. We do have customers making use of this architecture successfully, but we do not at this time have instructions for how to get it working.

The known success cases all use subdomains to identify different sites. Subdirectory-based sites are not known to work at this time. For more on why we are reluctant to promote the "Multisite" architecture see these blog posts:

- [Why Multisite is not Enterprise Grade](https://www.getpantheon.com/blog/drupal-multisite-not-enterprise-grade)
- [Much Ado about Multisite](https://www.getpantheon.com/blog/much-ado-about-drupal-multisite)

While WordPress can use table-prefixing for multisite installations, making it possible to run on Pantheon, all the same risks for security, scalability, and debuggability still apply.

It's especially ill-advised to use Multisite to set up many distinct/separate sites — e.g. running different plugins, for different customers — on a single code installation.

## Unsupported Plugins

- WP Super Cache
- W3 Total Cache

More to come on this list. Let us know what other plugin issues you see.
