---
title: WordPress Plugins and Themes with Known Issues
subtitle: B Plugins
description: A list of WordPress plugins beginning with B that are not supported and/or require workarounds.
tags: [plugins, themes, code]
categories: [help]
newcms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-03-24"
contenttype: [guide]
layout: guide
showtoc: true
permalink: docs/guides/wp-plugins-themes-known-issues/directory/b-plugins
anchorid: b-plugins
---


## Better Search And Replace

<ReviewDate date="2019-09-27" />

**Issue:** The [Better Search and Replace](https://wordpress.org/plugins/better-search-replace/) plugin is not accessible in Test or Live (read-only environments in Pantheon) due to the `install_plugins` capability check of the plugin. [Follow this issue on the WordPress support forum](https://wordpress.org/support/topic/not-appearing-on-test-and-live-environments-in-pantheon/).

**Solution 1:** There is an undocumented filter in place to override the capability check. Adding this in the your theme’s `function.php` can make it work:

```php:title=function.php
function better_search_replace_cap_override() {
    return 'manage_options';
}
add_filter( 'bsr_capability', 'better_search_replace_cap_override' );
```

**Solution 2:** Use an alternative Search and Replace plugin like [WP Migrate DB](https://wordpress.org/plugins/wp-migrate-db/)

___

## Bookly

**Issue:** Sessions are implemented in a way that will not allow [Bookly](https://wordpress.org/plugins/bookly-responsive-appointment-booking-tool/) to function with the WP Native Sessions plugin, either installed as a regular plugin or an mu-plugin. [Follow this issue on the WordPress support forum](https://wordpress.org/support/topic/incompatibility-with-wp-native-sessions/).

___

## Broken Link Checker

**Issue:** For the [Broken Link Checker](https://wordpress.org/plugins/broken-link-checker/), a low value set for "Check link every X hours" can consume a large amount of server resources.

**Solution:** Ensure that the value is set for the default of 72 hours or greater.

___
