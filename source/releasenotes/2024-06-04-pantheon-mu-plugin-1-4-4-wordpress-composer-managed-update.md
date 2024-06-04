---
title: Pantheon MU Plugin v1.4.4 and WordPress (Composer Managed) update
published_date: "2024-06-04"
categories: [wordpress, plugins]
---

The latest [1.4.4 update](https://github.com/pantheon-systems/pantheon-mu-plugin/releases) of the Pantheon MU Plugin is now available. This update fixes the WordPress Multisite network setup process by by ensuring the correct instructions for WordPress Multisite setup on Pantheon environments are always shown. This update will be included with the next WordPress release. Composer-based WordPress installs can get the update today by running `composer update`.

The latest WordPress (Composer Managed) release updates the configuration file filename displayed in the network setup screen to specify `config/application.php` to apply your configuration changes to, rather than the default `wp-config.php` for non-Bedrock Composer installs. This update will be pushed out to all WordPress (Composer Managed)-based installs alongside the MU Plugin update.
