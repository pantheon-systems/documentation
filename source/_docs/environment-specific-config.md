---
title: Environment-Specific Configuration for WordPress Sites
description: Learn how to turn WordPress site plugins on and off based on the environment they are running on.
tags: [variables, workflow]
categories: [wordpress]
---
You may sometimes use settings and plugins in your Development environment that you do not use on Live, in order to improve the development and debugging processes. This article shows you how to use the same codebase with different settings for each environment, using values for the [PANTHEON_ENVIRONMENT variable](/docs/read-environment-config/).
To quickly see which environment you are on, consider installing the [Pantheon HUD plugin](https://wordpress.org/plugins/pantheon-hud/).

## Customizations to wp-config.php

Pantheon's default version of `wp-config.php` contains a nice example that sets `DISALLOW_FILE_MODS` to `true` on Test and Live environments.
<script src="//gist-it.appspot.com/https://github.com/pantheon-systems/wordpress/blob/master/wp-config.php?footer=minimal&slice=88:91"></script>

This is a useful model to follow for another recommended modification, defining `'WP_DEBUG', true` on all environments except for Test and Live.
<script src="//gist-it.appspot.com/https://github.com/pantheon-systems/pantheon-settings-examples/blob/master/wordpress/wp_debug_dev.wp-config.php?footer=minimal"></script>

For more options when editing `wp-config.php` for debugging, see [Configure Error Logging](https://codex.wordpress.org/Editing_wp-config.php#Configure_Error_Logging) on the WordPress Codex.

## Configuration in an mu-plugin
Filters or functions running in an mu-plugin can enable development plugins that should be active in Dev and/or Test, but disable them in Live, present extra work to reactivate them after a database clone from the Live environment. To achieve this goal, we can use an mu-plugin that checks which environment we're on, and then activates or deactivates plugins that were deactivated or activated when the database clone completed.

### Create the Plugin

Copy this plugin file to `wp-content/mu-plugins/mu-plugins/site-config.php` and edit accordingly.

```php
<?php
/*
  Plugin Name: Site Config
  Plugin URI: /docs/environment-specific-config
  Description: Activating and deactivates plugins based on environment.
  Version: 0.1
  Author: Pantheon
  Author URI: http://pantheon.io/docs/contributors
*/
# Ensuring that this is on Pantheon
if ( isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) :

# Symlink to the env-configs file
require_once( 'site-config/live-specific-configs.php' );

endif;

```

### Add Configuration
Create a new directory, `wp-content/mu-plugins/site-config/`, and add a `live-specific-configs.php` file. This example activates the `wp-reroute-email` and `debug-bar` plugins, and sets the Jetpack plugin's development mode on all environments except for Live. It also adds the converse filters and deactivates the plugins on Live. You can expand this file to account for all of your environment-specific configurations, or add similar files for Dev-specific and Test and Live-specific configurations.

```php
<?php
// List Development Plugins
  $plugins = array(
          'wp-reroute-email/wp-reroute-email.php','debug-bar/debug-bar.php','developer/developer.php'
      );

// Live-specific configs
  if ( in_array( $_ENV['PANTHEON_ENVIRONMENT'], array( 'live' ) ) ) {

    // Disable Development Plugins
      require_once(ABSPATH . 'wp-admin/includes/plugin.php');
      foreach ($plugins as $plugin);
          if(is_plugin_active($plugin));
              deactivate_plugins($plugin);

    // Disable jetpack_development_mode
      add_filter( 'jetpack_development_mode', '__return_false' );
          }

// Configs for All environments but Live
  else {
    //
    // Activate Development Plugins
    //
      require_once(ABSPATH . 'wp-admin/includes/plugin.php');
          foreach ($plugins as $plugin);
          if(is_plugin_active($plugin))false;
              activate_plugin($plugin);
    // Enable development mode for jetpack
      add_filter( 'jetpack_development_mode', '__return_true' );

}

```

The next time you deploy code from Dev to Test and clone the database from Live into Test, the plugins will remain active on Test, even though the database clone would normally deactivate them. This is especially important for plugins like [wp-reroute-email](https://wordpress.org/plugins/wp-reroute-email/), which prevents Test and Dev environments from behaving like Live, in this case, spamming emails to users.

Using the above example will prevent you from ever changing the named options. If you want to be able to change them, consider setting and checking for a transient, as Devin does in [Programmatically Update Settings in Staging](http://wptheming.com/2015/08/programmatically-update-staging-settings/).

Plugins with development-specific filters can be enabled in Dev for development without unwanted production-like behavior. In the example above, we've activated Jetpack's [development mode filter](http://jetpack.me/support/development-mode/) everywhere except for Live. This allows developers to build and test with Jetpack, without connecting Dev and Test environments to WordPress.com.

The [Developer](https://wordpress.org/plugins/developer/) plugin by Automattic checks whether you have recommended development plugins enabled on your site. Adding those plugins to your codebase and then adding them to the $plugins array in the example plugin will ensure this happens automatically.

## Use the pre_option to Modify Options

The [`pre_option_(option_name)`](https://codex.wordpress.org/Plugin_API/Filter_Reference/pre_option_(option_name)) filter is the recommended way to change options on an environment basis.

It runs after the value is pulled from the database, providing the ability to overwrite the option value before it’s used by WordPress.

[`update_option()`](http://codex.wordpress.org/Function_Reference/update_option) should be avoided in this case, as the value is only being changed under specific conditions and a database write of the new value is not required.
