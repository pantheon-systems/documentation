---
title: Pantheon MU Plugin v1.5.3 release
published_date: "2025-03-11"
categories: [wordpress, plugins]
---

The Pantheon MU Plugin [v1.5.3](https://github.com/pantheon-systems/pantheon-mu-plugin/releases) update is now available for composer based WordPress sites. For non-composer based WordPress sites, this latest update will be bundled with the next WordPress core update (likely [6.8](https://make.wordpress.org/core/6-8/), expected April 15.). [WordPress (composer managed)](/guides/wordpress-composer) sites can upgrade today using `composer update` or by checking for updates in the dashboard.

### What's new?

This update includes a number of minor bug fixes and enhancements:

- Updates all links to the Plugins with Known Issues documentation page to the updated [WordPress Known Issues](/wordpress-known-issues) page to match the update to the docs site (see the [docs issue](https://github.com/pantheon-systems/documentation/issues/9356)). [[#80](https://github.com/pantheon-systems/pantheon-mu-plugin/pull/80)]
- Fixes a PHP warning on the Site Health page. [[#81](https://github.com/pantheon-systems/pantheon-mu-plugin/pull/81)] (props to [Weston Ruter](https://github.com/westonruter) for the report.)
- Fixes an issue in the [compatibility layer](/wordpress-known-issues#pantheon-mu-plugin-compatibility-layer) that was causing the [WP Rocket](/wordpress-known-issues#wp-rocket) plugin to throw a fatal error on deactivation. [[#83](https://github.com/pantheon-systems/pantheon-mu-plugin/pull/83)]
- Updates the [compatibility layer](/wordpress-known-issues#pantheon-mu-plugin-compatibility-layer) to define constants earlier in WordPress execution. Previously, the constants were defined on `plugins_loaded` which may be too late to override those constants set by the plugins themselves. [[#84](https://github.com/pantheon-systems/pull/84)] (props to [Rachel Backert](https://github.com/rbackert) for the report.)
