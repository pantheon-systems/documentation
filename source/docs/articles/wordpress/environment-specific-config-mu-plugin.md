---
title: Environment-Specific Configuration for WordPress Sites
description: Learn how to turn plugins on and off conditionally, based on the environment they are running on.
---
Developers often use plugins that speed up the development or debugging process. Any plugins that should be active in Dev and/or Test, but inactive in Live, present extra work to reactivate them after a database clone from the Live environment. To achieve this goal, we can use an mu-plugin that checks:

* Which environment we're on
* Whether desired plugins are active and if not, activates them
* If undesired plugins are active, and if so, deactivates them

## Create the Plugin mu-plugins/site-config.php

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

## Add Configuration

Create a `wp-content/mu-plugins/site-config/` directory, and add a `site-plugins.php` file. This example activates the `wp-reroute-email` and `debug-bar` plugins on all environments except for Live.
```php
<?php
// Only in Live Environments...
if ( in_array( $_ENV['PANTHEON_ENVIRONMENT'], array( 'live' ) ) ) {
  //
  // Disable Development Plugins in Live
  //
   $plugins = array(
          'wp-reroute-email/wp-reroute-email.php','debug-bar/debug-bar.php',
      );
      require_once(ABSPATH . 'wp-admin/includes/plugin.php');
      foreach ($plugins as $plugin);
          if(is_plugin_active($plugin));
              deactivate_plugins($plugin);

  // We can also add_filters
  add_filter( 'jetpack_development_mode', '__return_false' );

}
// In every environment except for Live
else {
  //
  // Activate Development Plugins
  //
 $plugins = array(
        'wp-reroute-email/wp-reroute-email.php','debug-bar/debug-bar.php',
    );
    require_once(ABSPATH . 'wp-admin/includes/plugin.php');
        foreach ($plugins as $plugin);
        if(is_plugin_active($plugin))false;
            activate_plugin($plugin);

  // We can add filters in all environments but Live
  add_filter( 'jetpack_development_mode', '__return_true' );

}
```
The next time you deploy code from Dev to Test, and clone the database from Live into Test, the plugins will remain active on Test, even though the database clone would normally deactivate them. This is especially important with the `wp-reroute-email` plugin, as it prevents emails from accidentally being sent to users from the Test environment.

The Jetpack plugin has a [development mode](http://jetpack.me/support/development-mode/) filter that allows developers to build and test without connecting Dev and Test environments to WordPress.com. If you want this mode on everywhere except in Live, you can add a filter for that.
