---
title: Pantheon MU Plugin v1.4.4 and WordPress (Composer Managed) update
published_date: "2024-06-04"
categories: [wordpress, plugins]
---

The latest [1.4.4 update](https://github.com/pantheon-systems/pantheon-mu-plugin/releases) of the Pantheon MU Plugin is now available. This update fixes the WordPress Multisite network setup process by by ensuring the correct instructions for WordPress Multisite setup on Pantheon environments are always shown. This update will be included with the next WordPress release. Composer-based WordPress installs can get the update today by running `composer update`.

The [`2024-06-04`](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/CHANGELOG.md#2024-06-04) [WordPress (Composer Managed) (Early Access)](https://github.com/pantheon-upstreams/wordpress-composer-managed) release updates the configuration file filename displayed on this network setup screen to specify `config/application.php` to apply your configuration changes to, rather than the default `wp-config.php` for non-Bedrock Composer installs. This update will be pushed out to all WordPress (Composer Managed)-based installs alongside the MU Plugin update. This is accomplished via a filter in the MU plugin's implementation of that admin page that allows the configuration file name to be modified.

The WordPress (Composer Managed) update also includes a Composer script to automatically update the Composer `platform.php` value to match the version of PHP in your `pantheon.yml`. **Note:** [Roots Bedrock](https://roots.io/bedrock/docs/installation/#requirements) does not support below PHP 8.0.
