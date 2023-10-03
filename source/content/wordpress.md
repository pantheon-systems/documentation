---
title: Pantheon WordPress Upstream
description: Release notes and customizations to the Pantheon WordPress Upstream
tags: [code, site, upstreams]
showtoc: true
reviewed: "2022-06-01"
contenttype: [doc]
innav: [true]
categories: [custom-upstreams]
cms: [wordpress]
audience: [agency, business, development]
product: [custom-upstreams]
integration: [--]
---

For the most part, [Pantheon's WordPress upstream](https://github.com/pantheon-systems/WordPress) follows [WordPress core](https://wordpress.org/news/category/releases/) one-to-one. This document is intended to provide further context to platform-specific changes in Pantheon's WordPress upstream.

## Latest Release

### 2023-08-14
<a name="20230814" class="release-update"></a>This update bumps the default PHP version to 8.1. We will continue to support sites running PHP 7.4 despite its EOL status (see https://www.php.net/supported-versions.php).

Please test your site thoroughly before deploying this update to your live site. If your site requires an older version of PHP or if you'd like to upgrade to PHP 8.2, please see https://docs.pantheon.io/guides/php/php-versions for more information on using pantheon.yml to set your PHP version.

## Previous Releases

### 2023-03-29

<a name="20230203" class="release-update"></a>Removes contact support line.

Pantheon Customer Support Engineers are no longer needed to shuffle salt keys. You will no longer see the contact support line in the `wp-pantheon-config.php` file. You can visit https://api.wordpress.org/secret-key/1.1/salt/ to replace the values provided by the platform.

### 2023-01-17

<a name="20230117" class="release-update"></a>Fixes a bug where a fatal error for an undefined variable was thrown on PHP 8+.

A previous update that added a loader to pull in the pantheon-mu-plugin introduced an undefined variable which is a fatal error in PHP 8+. This update resolves the issue and fixes the mu-plugin loader. This may introduce merge conflicts if you have made changes to the `loader.php` file in your site repository.

### 2022-11-01

#### <a name="20221018" class="release-update"></a>Replace mu-plugin with a format consistent with pantheon-systems/pantheon-mu-plugin

This commit aligns the mu-plugin format to [our standalone repository](https://github.com/pantheon-systems/pantheon-mu-plugin), and will allow for the mu-plugin to receive updates from that repo whenever an updated version of WordPress is released. If you'd like to suggest changes to our mu-plugin, create an issue or open a PR [in `pantheon-mu-plugin` issues](https://github.com/pantheon-systems/pantheon-mu-plugin/issues). 

The commit also adds a standardized mu-plugin `loader.php` file that additional mu-plugins can be added to manually if more are necessary to include in our default upstreams in the future.

### 2022-08-30

#### <a name="20220818" class="release-update"></a>Ensure REST API responses are not cached for authenticated users

REST API responses were being cached for logged-in users, which was causing issues when updating Posts via the block editor (such as creating new taxonomy terms, for example). This commit changes the cache headers so that API responses are no longer cached for authenticated users.

#### <a name="20220816" class="release-update"></a>Deprecate `pantheon-cache` in favor of `pantheon cache`

When the [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/) plugin is active, WordPress sites on Pantheon have two distinct but similarly-named WP-CLI commands: `wp pantheon cache` (which is provided by Pantheon Advanced Page Cache) and `wp pantheon-cache` (which is provided by the Pantheon mu-plugin. This leads to confusion about which Pantheon cache WP-CLI command to use or which subcommands are available for which parent commands.

This change aims to help eliminate this confusion by deprecating `wp pantheon-cache` and moving the `set-maintenance-mode` subcommand under `pantheon cache`. When the `pantheon-cache` command is run, a deprecation notice will be displayed with the updated command and the function will be executed. A deprecation notice has also been added to the text that displays when a user runs `wp pantheon-cache set-maintenance-mode --help`. The `pantheon-cache` command will be removed and display an error when run in a future release, and fully removed entirely in a release following that.

### 2022-07-12

#### <a name="20220606-1" class="release-update"></a>Show a more meaningful notice when trying to install WP plugin in Git mode

If a site is in Git mode, the plugin installation UI is disabled and a notice is added to the plugins page.

#### <a name="20220603-1" class="release-update"></a>Remove call to Pantheon API from WP admin

Most of the time the Pantheon API requests are needless (e.g. there is no update available) and beyond the negative effect that has on the system as a whole, it also can cause a poor experience for the WordPress user when the API call fails under load. Additionally, reduced reliance on the API means more reliability, and less complexity in terms of checking for error conditions and edge cases.

The update notice behavior will be as follows:

- If a WP Core update is detected (via `get_core_updates`), the update notice is shown on each admin page.
- If a WP Core update is not detected, the update notice is only shown on the update-core or update-core-network page.

Notices will still only be shown on dev and multidev environments. Users can click the notice on the updates page at any time to find out if an update is available via their Pantheon dashboard.

### 2022-05-24

#### <a name="20220524-1" class="release-update"></a>WordPress 6.0

If you have updated the [Twenty Twenty-Two theme](https://wordpress.org/themes/twentytwentytwo/) bundled with Pantheon's WordPress upstream, for example with Autopilot or WP-CLI, your site has conflicting commits with the latest WordPress 6.0 release.

Pantheon will automatically resolve these conflicts when you click the `Apply Updates` button on your dashboard by [removing](https://core.trac.wordpress.org/changeset/53286) conflicting `LICENSE.md` files within the `wp-content/themes` directory.


### 2022-04-26

#### <a name="20220426-3" class="release-update"></a>Re-enable WP-Cron for Multisites

Pantheon Cron does not support WordPress Multisite installations due to the unpredictable customizations to domains or subdirectories and their mapping to subsites. This change reenabled WP-Cron for WordPress Multisite. You can read more about WP-Cron for WordPress Multisite [here](/guides/wordpress-developer/wordpress-cron#wordpress-site-networks).

#### <a name="20220426-2" class="release-update"></a>Add documentation to readme outlining branches

Adds documentation to `README.md` which provides context on the repositories branches. This change made to prevent further [customer confusion](https://github.com/pantheon-systems/WordPress/issues/322) with regards to which branch to use as a starting point when creating a custom upstream.

#### <a name="20220426-1" class="release-update"></a>Define FS_METHOD

When this constant is not set, WordPress writes and then deletes a temporary file to determine if it has direct access to the filesystem, which we already know to be the case. This multiplies filesystem operations and can degrade performance of the filesystem as a whole in the case of large sites that do a lot of filesystem operations. Setting this constant to `direct` tells WordPress to assume it has direct access and skip creating the extra temporary file. Read more about `FS_METHOD` [here](/plugins-known-issues#define-fs_method).

### 2022-04-05

#### <a name="20220405-2" class="release-update"></a>Allow DISABLE_WP_CRON to be overridden

Allowed customers to override DISABLE_WP_CRON by defining this constant in their wp-config.php before wp-config-pantheon.php is required. Read more about enabling WP-Cron [here](/guides/wordpress-developer/wordpress-cron#enable-wp-cron).

#### <a name="20220405-1" class="release-update"></a>Disable WP-Cron

Disabled `wp-cron.php` from running on every page load and rely on Pantheon to run cron via WP-CLI. Read more about WP-Cron [here](/guides/wordpress-developer/wordpress-cron).

## Related Links

- [Pantheon Start States](/start-state)
- [WordPress on Pantheon Quick Start Guide](/guides/wordpress-pantheon)
- [WordPress Best Practices](/guides/wordpress-developer/wordpress-best-practices)
- [WordPress and Drupal Core Updates](/core-updates)
- [WordPress Plugins and Themes with Known Issues](/plugins-known-issues)
