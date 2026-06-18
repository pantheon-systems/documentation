---
title: Pantheon MU Plugin v1.4.4 and WordPress (Composer Managed) update
published_date: "2024-06-04"
categories: [wordpress, plugins]
---

The latest [1.4.4 update](https://github.com/pantheon-systems/pantheon-mu-plugin/releases) of the Pantheon MU Plugin and the [`2024-06-04`](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/CHANGELOG.md#2024-06-04) release of the WordPress (Composer Managed) are now available. 

The MU plugin update will be included with the WordPress 6.5.4 release. 

### What's new?

#### Pantheon MU Plugin 1.4.4
This update fixes the WordPress Multisite network setup process by by ensuring the correct instructions for WordPress Multisite setup on Pantheon environments are always shown. The MU plugin replaces the WordPress core network setup page with a custom page that provides instructions for setting up a multisite network on Pantheon and adds filters that allows the content to be changed.

This update also fixes some display issues to that page.

#### WordPress (Composer Managed) update
The `2024-06-04` [WordPress (Composer Managed) (Early Access)](https://github.com/pantheon-upstreams/wordpress-composer-managed) release updates the configuration file filename displayed on the network setup screen to specify `config/application.php` to apply your configuration changes to (the Bedrock default), rather than the WordPress default `wp-config.php`. This is accomplished via a filter in the MU plugin's implementation of that admin page that allows the configuration file name to be modified.

This update is now available to all WordPress (Composer Managed)-based installs. 

The WordPress (Composer Managed) update also includes a Composer script to automatically update the Composer `platform.php` value to match the version of PHP in your `pantheon.yml`. **Note:** [Roots Bedrock](https://roots.io/bedrock/docs/installation/#requirements) does not support below PHP 8.0. This update is unrelated to WordPress multisites, but is included in the latest release for the WordPress (Composer Managed) upstream.
