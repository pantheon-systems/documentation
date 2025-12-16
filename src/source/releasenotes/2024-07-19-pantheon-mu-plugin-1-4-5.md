---
title: Pantheon MU Plugin v1.4.5 release
published_date: "2024-07-19"
categories: [wordpress, plugins]
---

The latest update, [v1.4.5](https://github.com/pantheon-systems/pantheon-mu-plugin/releases), of the Pantheon MU Plugin is now available. This update will be included with the upcoming WordPress 6.6.1 release.

### What's new?

This update introduces a filter to the WordPress Multisite Network Setup page for subdirectory multisite installations with a custom `wp-content` directory. Previously, WordPress showed a warning that a custom `wp-content` directory might not be supported by subdirectory multisites. However, this warning does not apply to our WordPress (Composer Managed) upstream, which is powered by [Bedrock](https://roots.io/bedrock/). Our MU plugin has a customized version of the WordPress core file that renders this page. To address this, we've added a new function and filter (`pantheon.enable_subdirectory_networks_message`) that lets us (and you!) disable the warning when it's irrelevant.

The next update to the WordPress (Composer Managed) upstream will include this filter from the MU plugin.

For more information about WordPress (Composer Managed) refer to our [WordPress and Composer documentation](https://docs.pantheon.io/guides/wordpress-composer).
