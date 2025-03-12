---
title: Pantheon MU Plugin v1.5.3 release
published_date: "2025-03-12"
categories: [wordpress, plugins]
---

The [Pantheon MU Plugin](https://github.com/pantheon-systems/pantheon-mu-plugin?tab=readme-ov-file#pantheon-must-use-plugin) v1.5.3 update is now available for Composer-based WordPress sites. For non-Composer-based WordPress sites, this latest update will be bundled with the next WordPress core update (likely [6.8](https://make.wordpress.org/core/6-8/), expected April 15.). [WordPress (composer managed)](/guides/wordpress-composer) sites can upgrade today using `composer update` or by checking for updates in the dashboard.

### What's new?

[The 1.5.3 update](https://github.com/pantheon-systems/pantheon-mu-plugin/releases/tag/1.5.3) includes a number of minor bug fixes and enhancements:

- Updates all links to the Plugins with Known Issues documentation page to the updated [WordPress Known Issues](/wordpress-known-issues) page to match the update to the docs site.
- Fixes a PHP warning on the Site Health page. (props to [Weston Ruter](https://github.com/westonruter) for the [report](https://github.com/pantheon-systems/pantheon-mu-plugin/issues/78).)
- Fixes an issue in the [compatibility layer](/wordpress-known-issues#pantheon-mu-plugin-compatibility-layer) that was causing the [WP Rocket](/wordpress-known-issues#wp-rocket) plugin to throw a fatal error on deactivation.
- Updates the [compatibility layer](/wordpress-known-issues#pantheon-mu-plugin-compatibility-layer) to define constants earlier in WordPress execution. Previously, the constants were defined on `plugins_loaded` which may be too late to override those constants set by the plugins themselves. (props to [Rachel Backert](https://github.com/rbackert) for the [report](https://github.com/pantheon-systems/pantheon-mu-plugin/issues/82).)
