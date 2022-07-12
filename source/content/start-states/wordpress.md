---
title: Pantheon WordPress Upstream
description: Release notes and customizations to the Pantheon WordPress Upstream
cms: "wordpress"
categories: [platform]
tags: [code, site, upstreams]
showtoc: true
permalink: docs/start-states/wordpress
editpath: start-states/wordpress.md/
reviewed: "2022-06-01"
---

For the most part, [Pantheon's WordPress upstream](https://github.com/pantheon-systems/WordPress) follows [WordPress core](https://wordpress.org/news/category/releases/) one-to-one. This document is intended to provide further context to platform-specific changes in Pantheon's WordPress upstream.

## Latest Release

### 2022-07-12

#### <a name="20220606-1" class="release-update"></a>Show a more meaningful notice when trying to install WP plugin in Git mode

If a site is in Git mode, the plugin installation UI is disabled and a notice is added to the plugins page.

#### <a name="20220603-1" class="release-update"></a>Remove call to Pantheon API from WP admin

Most of the time the Pantheon API requests are needless (e.g. there is no update available) and beyond the negative effect that has on the system as a whole, it also can cause a poor experience for the WordPress user when the API call fails under load. Additionally, reduced reliance on the API means more reliability, and less complexity in terms of checking for error conditions and edge cases.

The update notice behavior will be as follows:

- If a WP Core update is detected (via `get_core_updates`), the update notice is shown on each admin page.
- If a WP Core update is not detected, the update notice is only shown on the update-core or update-core-network page.

Notices will still only be shown on dev and multidev environments. Users can click the notice on the updates page at any time to find out if an update is available via their Pantheon dashboard.

## Previous Releases

### 2022-05-24

#### <a name="20220524-1" class="release-update"></a>WordPress 6.0

If you have updated the [Twenty Twenty-Two theme](https://wordpress.org/themes/twentytwentytwo/) bundled with Pantheon's WordPress upstream, for example with Autopilot or WP-CLI, your site has conflicting commits with the latest WordPress 6.0 release.

Pantheon will automatically resolve these conflicts when you click the `Apply Updates` button on your dashboard by [removing](https://core.trac.wordpress.org/changeset/53286) conflicting `LICENSE.md` files within the `wp-content/themes` directory.


### 2022-04-26

#### <a name="20220426-3" class="release-update"></a>Re-enable WP-Cron for site networks

Pantheon Cron does not support WordPress Site Network installations, also known as WordPress Multisite, due to the unpredictable customizations to domains or subdirectories and their mapping to subsites. This change reenabled WP-Cron for WordPress Site Networks. You can read more about WP-Cron for WordPress Site Networks [here](/wordpress-cron#wordpress-site-networks).

#### <a name="20220426-2" class="release-update"></a>Add documentation to readme outlining branches

Adds documentation to `README.md` which provides context on the repositories branches. This change made to prevent further [customer confusion](https://github.com/pantheon-systems/WordPress/issues/322) with regards to which branch to use as a starting point when creating a custom upstream.

#### <a name="20220426-1" class="release-update"></a>Define FS_METHOD

When this constant is not set, WordPress writes and then deletes a temporary file to determine if it has direct access to the filesystem, which we already know to be the case. This multiplies filesystem operations and can degrade performance of the filesystem as a whole in the case of large sites that do a lot of filesystem operations. Setting this constant to `direct` tells WordPress to assume it has direct access and skip creating the extra temporary file. Read more about `FS_METHOD` [here](/plugins-known-issues#define-fs_method).

### 2022-04-05

#### <a name="20220405-2" class="release-update"></a>Allow DISABLE_WP_CRON to be overridden

Allowed customers to override DISABLE_WP_CRON by defining this constant in their wp-config.php before wp-config-pantheon.php is required. Read more about enabling WP-Cron [here](/wordpress-cron#enable-wp-cron).

#### <a name="20220405-1" class="release-update"></a>Disable WP-Cron

Disabled `wp-cron.php` from running on every page load and rely on Pantheon to run cron via WP-CLI. Read more about WP-Cron [here](/wordpress-cron).

## Related Links

- [Pantheon Start States](/start-states)
- [WordPress on Pantheon Quick Start Guide](/guides/wordpress-pantheon)
- [WordPress Best Practices](/wordpress-best-practices)
- [WordPress and Drupal Core Updates](/core-updates)
- [WordPress Plugins and Themes with Known Issues](/plugins-known-issues)
