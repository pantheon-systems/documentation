---
title: Pantheon MU Plugin v1.4.5 release
published_date: "2024-07-19"
categories: [wordpress, plugins]
---

The latest [1.4.5 update](https://github.com/pantheon-systems/pantheon-mu-plugin/releases) of the Pantheon MU Plugin is now available. 

The MU plugin update will be included with the WordPress 6.6.1 release. 

### What's new?

This update adds a filter to the WordPress Multisite Network Setup page for subdirectory multisite installations that include a custom `wp-content` directory. Previously, WordPress would warn that a custom `wp-content` directory may not be supported by subdirectory multisites. However, this does not apply to our WordPress (Composer Managed) upstream (powered by [Bedrock](https://roots.io/bedrock/)). Our MU plugin uses a customized implementation of the WordPress core file that renders this page and, as such, we have added a new function and a filter (`pantheon.enable_subdirectory_networks_message`) that allows us (and you!) to disable that message in cases where it does not apply.

The next update to the WordPress (Composer Managed) upstream will include the implementation of this filter added to the MU plugin.

For more information about WordPress (Composer Managed) refer to our [WordPress and Composer documentation](https://docs.pantheon.io/guides/wordpress-composer).