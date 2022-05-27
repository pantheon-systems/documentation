---
title: Pantheon WordPress Upstream
description: Release notes and customizations to the Pantheon WordPress Upstream
cms: "wordpress"
categories: [platform]
tags: [code, site, upstreams]
showtoc: true
permalink: docs/start-states/wordpress
editpath: start-states/wordpress.md/
reviewed: "2022-05-11"
---

For the most part, [Pantheon's WordPress upstream](https://github.com/pantheon-systems/WordPress) follows [WordPress core](https://wordpress.org/news/category/releases/) one-to-one. This document is intended to provide further context to platform-specific changes in Pantheon's WordPress upstream.

## Latest Release

### 2022-04-26

#### <a name="20220426-3" class="release-update"></a>Re-enable WP-Cron for site networks

Pantheon Cron does not support WordPress Site Network installations, also known as WordPress Multisite, due to the unpredictable customizations to domains or subdirectories and their mapping to subsites. This change reenabled WP-Cron for WordPress Site Networks. You can read more about WP-Cron for WordPress Site Networks [here](/wordpress-cron#wordpress-site-networks).

#### <a name="20220426-2" class="release-update"></a>Add documentation to readme outlining branches

Adds documentation to `README.md` which provides context on the repositories branches. This change made to prevent further [customer confusion](https://github.com/pantheon-systems/WordPress/issues/322) with regards to which branch to use as a starting point when creating a custom upstream.

#### <a name="20220426-1" class="release-update"></a>Define FS_METHOD

When this constant is not set, WordPress writes and then deletes a temporary file to determine if it has direct access to the filesystem, which we already know to be the case. This multiplies filesystem operations and can degrade performance of the filesystem as a whole in the case of large sites that do a lot of filesystem operations. Setting this constant to `direct` tells WordPress to assume it has direct access and skip creating the extra temporary file. Read more about `FS_METHOD` [here](/plugins-known-issues#define-fs_method).

## Previous Releases

### 2022-04-05

#### <a name="20220405-2" class="release-update"></a>Allow DISABLE_WP_CRON to be overridden

Allowed customers to override DISABLE_WP_CRON by defining this constant in their wp-config.php before wp-config-pantheon.php is required. Read more about enabling WP-Cron [here](/wordpress-cron#enable-wp-cron).

#### <a name="20220405-1" class="release-update"></a>Disable WP-Cron

Disabled `wp-cron.php` from running on every page load and rely on Pantheon to run cron via WP-CLI. Read more about WP-Cron [here](/wordpress-cron).

## Related Links

- [Pantheon Start States](/start-states)
- [WordPress Best Practices](/wordpress-best-practices)
- [WordPress and Drupal Core Updates](/core-updates)
- [WordPress Plugins and Themes with Known Issues](/plugins-known-issues)
