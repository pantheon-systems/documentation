---
title: WordPress Configurations Guide
subtitle: Pantheon-maintained WordPress Plugins
description: Pantheon plugins for WordPress.
contenttype: [guide]
innav: [false]
categories: [config]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [wordpress, webops]
contributors: [whitneymeredith]
reviewed: "2022-05-04"
showtoc: true
permalink: docs/guides/wordpress-configurations/plugins
---

Pantheon maintains multiple plugins to facilitate workflow within WordPress. For more discussion of these plugins, find Pantheon developers in our [community spaces](https://pantheon.io/developer-community).

<Alert title="Note" type="info">

Drupal users should refer to [Pantheon Modules](/modules) for details on Drupal modules developed and maintained for the Pantheon workflow.

</Alert>


## Pantheon Must-Use Plugin

[Pantheon Must-Use Plugin](https://github.com/pantheon-systems/pantheon-mu-plugin) is vital to the operation of your site on the Pantheon platform and must not be removed from your codebase. Consider it a part of WordPress core, and do not hack it. The permanent activation of this plugin will not interfere with your local environment.

Refer to [Create a WordPress MU-Plugin for Actions and Filters](/guides/wordpress-configurations/mu-plugin) for information on how to create a custom MU-Plugin.

## Pantheon Advanced Page Cache

[Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache) automatically clears related pages from Pantheon's Edge when you update content. Without this plugin, pages expire from cache after 10 minutes (600 seconds) by default. This plugin allows fresh content to be served immediately to anonymous visitors.

### Disable Surrogate Keys for Taxonomy Terms
Setting surrogate keys for posts with large numbers of taxonomies (such as WooCommerce products with a large number of global attributes) can suffer from slower queries. Surrogate keys can be skipped for 'product' post types' taxonomy terms (or any other criteria you see fit) with the following filter:

```php
function custom_should_add_terms($should_add_terms, $wp_query) {
    if ( $wp_query->is_singular( 'product' ) ) {
        return false;
    }
    return $should_add_terms;
}
add_filter('pantheon_should_add_terms', 'custom_should_add_terms', 10, 2);
```

For additional details, refer to the [plugin README file](https://github.com/pantheon-systems/pantheon-advanced-page-cache#140).

## Pantheon HUD

[Pantheon HUD](https://wordpress.org/plugins/pantheon-hud) provides situational awareness within the WordPress Dashboard when working on the Pantheon platform. It's helpful to have a reminder of which environment you're in, as well as quick access to links to get back to Pantheon's Dashboard. This plugin also provides quick access to interface with your WordPress installation via the command line:

![Pantheon HUD](../../../images/pantheon-hud.png)

Refer to [Configuring Environment Indicators](/guides/environment-configuration/environment-indicator) for installation details.

## [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions)

[WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions) resolves errors with code (themes, modules, or plugins) that rely on PHP's default session manager. Refer to [WordPress and PHP Sessions](/guides/php/wordpress-sessions/#troubleshooting-session-errors) for more information.

### Troubleshooting WP Native PHP Sessions

If you see an error similar to the following in the error logs:

```none
Fatal error: session_start(): Failed to initialize storage module: user (path: ) in …/code/wp-content/plugins/plugin-that-uses-sessions/example.php on line 2
```

The cause is likely a plugin in the [mu-plugins](/guides/wordpress-configurations/mu-plugin) directory that is instantiating a session prior to this plugin loading. To fix this issue, deactivate the WP Native PHP Sessions plugin and instead load it via an mu-plugin that loads first.

For example, create an mu-plugin called `00.php` and add a line in it to include the `wp-native-php-sessions/pantheon-sessions.php` file.

## WP SAML Auth

[WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/)
provides support for SAML Authentication. The plugin comes bundled with the OneLogin SAML library and [SimpleSAMLphp](https://simplesamlphp.org/). Refer to [Using WP SAML Auth with Google Apps](/guides/wordpress-google-sso) for an example use case.


## Object Cache Pro
[Object Cache Pro](https://objectcache.pro/) is a highly optimized premium WordPress plugin that integrates with Redis for business class performance. For more details, see also:

- [Object Cache Overview](/object-cache#wordpress-object-cache-pro)
- [Enable Object Cache Pro for WordPress](/object-cache/wordpress)

## WP Solr

[WP Solr](https://wordpress.org/plugins/solr-power/) enables the Pantheon Search (Solr) search engine for your WordPress website. Refer to [Enable Pantheon Search for WordPress](/guides/wordpress-developer/wordpress-solr) for more information.

## More Resources

- [Pantheon Search (formerly Pantheon Solr)](/solr)
- [Enable Object Cache Pro for WordPress](/object-cache/wordpress)
