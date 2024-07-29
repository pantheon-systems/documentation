---
title: Pantheon MU Plugin v1.5.0 release
published_date: "2024-07-29"
categories: [wordpress, plugins]
---

The latest update, [v1.5.0](https://github.com/pantheon-systems/pantheon-mu-plugin/releases), of the Pantheon MU Plugin is now available. This update will be included with next version of WordPress and can be installed on [WordPress (composer managed)](https://docs.pantheon.io/guides/wordpress-composer) installs using `composer update` or by checking for updates in the dashboard.

### What's new?

This update adds a new "compatibility layer" feature that automatically fixes and/or reports on the compatibility status of many of the plugins we have documentation for on our [WordPress Plugins and Themes with Known Issues](https://docs.pantheon.io/plugins-known-issues) guide. Where possible, if any of the plugins are detected, the compatibility layer will automatically apply the relevant fixes for you. If a plugin is detected but no fix is available, the compatibility layer will report the issue to you. These reports are added in a new section of the Site Health page under the Tools menu of your WordPress administration dashboard.