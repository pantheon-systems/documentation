---
title: Page Caching Changes with WordPress 4.7 and Above
description: Starting with 4.7 Pantheon is moving advanced page caching behavior to a standalone plugin
categories: [wordpress]
tags: [cacheedge]
contributors: [ari]
---
WordPress 4.7 is a jam-packed release including content endpoints for REST-API and a number of other awesome changes. See WordPress.org [release notes](https://wordpress.org/news/2016/12/vaughan/) for a full list of changes in core. This release also includes separate changes made by Pantheon to improve site performance and scalability.

## What's Changed and Why
[Pantheon's WordPress upstream](https://github.com/pantheon-systems/wordpress) includes a must use plugin (mu-plugin) that integrates the platform's edge caching layer. Prior to the 4.7 update, this mu-plugin had aggressive cache clearing behavior that would, for example, clear the home page whenever you added or updated a post, even posts in draft status. This is less than ideal, because it meant that the home page would be cleared from cache even if there was no new content to show.

We removed the aggressive cache clearing behavior from the mu-plugin within the 4.7 update and released the [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/) plugin for improved cache clearing capabilities.

We think it's important to move this functionality from our mu-plugin included by default in our upstream to the WordPress.org repository because it will allow us to more rapidly iterate on this functionality and be more transparent and accessible to the open source community.


## Release Notes

The following has been removed from Pantheon’s bundled mu-plugin starting with version 4.7:

* Cache clearing behavior tied to WordPress hooks.
* WP-CLI `wp pantheon cache` commands
* The "Delete Cache" button from the toolbar

All of this behavior and more is available in the plugin [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/) which you should consider installing as part of upgrading to 4.7.

Without the [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/) plugin, pages will expire by default from cache after 10 minutes (600 seconds). In order to have new content appear immediately to anonymous visitors you will need to install the [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/) plugin.

## Test Before Deploying Live

In either case, **test the changes in your site's Test environment before deploying Live**. If you have any questions, please reach out to support, or file a bug or feature request directly at [https://github.com/pantheon-systems/pantheon-advanced-page-cache/issues](https://github.com/pantheon-systems/pantheon-advanced-page-cache/issues).
