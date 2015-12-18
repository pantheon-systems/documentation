---
title: Environment-Specific Configuration for WordPress Sites
description: Learn how to turn plugins on and off conditionally, based on the environment they are running on.
---
Developers often use settings and plugins in their development environment that they do not use on live, in order to improve the development and debugging processes. This tutorial will show you how to use the same codebase with different settings for each environment, using values for the [PANTHEON_ENVIRONMENT variable](/docs/articles/sites/code/reading-pantheon-environment-configuration/).

## Customizations to `wp-config.php`

The Pantheon version of `wp-config.php` contains a nice example.
<script src="https://gist-it.appspot.com/https://github.com/pantheon-systems/wordpress/blob/master/wp-config.php?footer=minimal&slice=79:83"></script>

This is a useful model to follow for another recommended modification, defining `'WP_DEBUG', true`.
<script src="https://gist-it.appspot.com/https://github.com/pantheon-systems/pantheon-settings-examples/blob/master/wordpress/wp_debug_dev.wp-config.php?footer=minimal"></script>

For more options when editing `wp-config.php` for debugging, see [Configure Error Logging](https://codex.wordpress.org/Editing_wp-config.php#Configure_Error_Logging) on the WordPress Codex.

## Control Plugin Activation
Any plugins that should be active in Dev and/or Test, but inactive in Live, present extra work to reactivate them after a database clone from the Live environment. To achieve this goal, we can use an mu-plugin that checks:

* Which environment we're on
* Whether desired plugins are active and if not, activates them
* If undesired plugins are active, and if so, deactivates them

### Create the Plugin mu-plugins/site-config.php

Copy this plugin file to the `mu-plugins` directory and edit accordingly.
```php
<?php
/*
  Plugin Name: Site Config
  Plugin URI: http://www.example.com/
  Description: Activating and deactivates plugins based on environment.
  Version: 0.1
  Author: Pantheon
  Author URI: http://pantheon.io/docs/articles/wordpress
*/
# Ensuring that this is on Pantheon
if ( isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) :

# Enqueue the site-plugins file
require_once( 'site-config/site-plugins.php' );

endif;

```

### Add Configuration
Create a new directory, `wp-content/mu-plugins/site-config/`, and add a `site-plugins.php` file. This example activates the `wp-reroute-email` and `debug-bar` plugins on all environments except for live.

```php
<?php
// Only in Live Environments...
$plugins = array(
        'wp-reroute-email/wp-reroute-email.php','debug-bar/debug-bar.php','developer/developer.php'
    );
if ( in_array( $_ENV['PANTHEON_ENVIRONMENT'], array( 'live' ) ) ) {
  //
  // Disable Development Plugins in Live
  //
add_filter( 'jetpack_development_mode', '__return_false' );

    require_once(ABSPATH . 'wp-admin/includes/plugin.php');
    foreach ($plugins as $plugin);
        if(is_plugin_active($plugin));
            deactivate_plugins($plugin);
}
else {
  add_filter( 'jetpack_development_mode', '__return_true' );
  //
  // Activate Development Plugins in other environments
  // activate_plugin cannot accept an array as an argument.
  //
    require_once(ABSPATH . 'wp-admin/includes/plugin.php');
        foreach ($plugins as $plugin);
        if(is_plugin_active($plugin))false;
            activate_plugin($plugin);

}

```

The next time you deploy code from Dev to Test, and clone the database from Live into Test, the plugins will remain active on Test, even though the database clone would normally deactivate them. This is especially important with for plugins like `wp-reroute-email`, that prevents test and dev environments from behaving like live, in this case, spamming emails to users.

Plugins with development-specific filters can also be added. In the example above, we've activated Jetpack's [development mode](http://jetpack.me/support/development-mode/) filter. This allows developers to build and test with Jetpack, without connecting Dev and Test environments to WordPress.com.

The [Developer plugin](https://wordpress.org/plugins/developer/) by Automattic also checks whether you have recommended development plugins enabled on your site. Adding those plugins to your codebase and then adding them to the $plugins array in the example plugin will ensure this happens automatically.

## Recommended Development Plugins
@TODO - List plugins  - start with the plugins checked for by Developer
## Recommended Development Filters
@TODO - is this helpful? 
