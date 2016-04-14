---
title: Environment Indicator
description: Learn how to implement an environment indicator for Drupal and WordPress sites running on Pantheon.
categories: [developing]
tags: [platform]
---
Each site on Pantheon comes with three environments: Dev, Test, and Live. This allows you to develop and test features without impacting the live site. Additional development environments are available with [Multidev](/docs/multidev/).

For a heads-up display into your Pantheon environment and situational awareness, we recommend installing the [Pantheon HUD](https://wordpress.org/plugins/pantheon-hud) plugin on WordPress sites and the [Environment Indicator](https://www.drupal.org/project/environment_indicator) module on Drupal sites.

##Wordpress: Pantheon HUD
The Pantheon HUD plugin is developed and maintained on GitHub, [create an issue](https://github.com/pantheon-systems/pantheon-hud/issues) with questions, feature requests, or bug reports.

1. [Set the connection mode to SFTP](/docs/sftp) for the Dev or Multidev environment via the Pantheon Dashboard or with [Terminus](/docs/terminus):

 ```nohighlight
 terminus site set-connection-mode --mode=sftp
 ```

2. Install and activate [Pantheon HUD](https://wordpress.org/plugins/pantheon-hud/) from within the Dev or Multidev environment's WordPress Dashboard (`/wp-admin/plugin-install.php?tab=search&s=pantheon+hud`) or with Terminus:

 ```nohighlight
 terminus wp 'plugin install pantheon-hud --activate'
 ```

3. Deploy the plugin to the Test environment within the site Dashboard or with Terminus:

 ```nohighlight
 terminus site deploy --env=test --sync-content --note="Install Pantheon HUD plugin"
 ```

4. Activate the plugin within the WordPress Dashboard on the Test environment (`/wp-admin/plugins.php`) or with Terminus:

 ```nohighlight
 terminus wp 'plugin activate pantheon-hud' --env=test
 ```

5. Deploy the plugin to the Live environment within the site Dashboard or with Terminus:

 ```nohighlight
 terminus site deploy --env=live --note="Install Pantheon HUD plugin"
 ```

6. Activate the plugin within the WordPress Dashboard on the Live environment (`/wp-admin/plugins.php`) or with Terminus:

 ```nohighlight
 terminus wp 'plugin activate pantheon-hud' --env=live
 ```

All environments will now show the following heads up display for logged-in users with the `manage_options` capability:

![Pantheon HUD](/source/docs/assets/images/pantheon-hud.png)

You can restrict this to specific users with the `pantheon_hud_current_user_can_view` filter:

```php
add_filter( 'pantheon_hud_current_user_can_view', function(){
    $current_user = wp_get_current_user();
    if ( $current_user && in_array( $current_user->user_login, array( 'myuserlogin' ) ) ) {
        return true;
    }
    return false;
});
```

## Drupal: Environment Indicator
The [Environment Indicator](https://www.drupal.org/project/environment_indicator) module is officially supported for Drupal 7 sites. It's currently being ported to Drupal 8, but is not usable yet. For updates, see [this issue](https://www.drupal.org/node/2605572).


1. [Set the connection mode to SFTP](/docs/sftp) for the Dev or Multidev environment via the Pantheon Dashboard or with [Terminus](/docs/terminus):

 ```nohighlight
 terminus site set-connection-mode --mode=sftp
 ```

2. Install and enable the [Environment Indicator](https://www.drupal.org/project/environment_indicator) module using the [Drupal interface](https://drupal.org/documentation/install/modules-themes) or with Terminus:

 ```nohighlight
 terminus drush 'en environment_indicator'
 ```

3. Add the following within `settings.php`:

 ```php
 if (!defined('PANTHEON_ENVIRONMENT')) {
   $conf['environment_indicator_overwritten_name'] = 'Local';
   $conf['environment_indicator_overwritten_color'] = '#808080';
   $conf['environment_indicator_overwritten_text_color'] = '#ffffff';
 }

 $conf['environment_indicator_overwrite'] = TRUE;
 $conf['environment_indicator_overwritten_position'] = 'top';
 $conf['environment_indicator_overwritten_fixed'] = FALSE;
 // Pantheon Env Specific Config
 if (isset($_SERVER['PANTHEON_ENVIRONMENT'])) {
   switch ($_SERVER['PANTHEON_ENVIRONMENT']) {
     case 'dev':
       $conf['environment_indicator_overwritten_name'] = 'Dev';
       $conf['environment_indicator_overwritten_color'] = '#d25e0f';
       $conf['environment_indicator_overwritten_text_color'] = '#ffffff';
       break;
     
     case 'test':
       $conf['environment_indicator_overwritten_name'] = 'Test';
       $conf['environment_indicator_overwritten_color'] = '#c50707';
       $conf['environment_indicator_overwritten_text_color'] = '#ffffff';
       break;
       
     case 'live':
       $conf['environment_indicator_overwritten_name'] = 'Live!';
       $conf['environment_indicator_overwritten_color'] = '#4C742C';
       $conf['environment_indicator_overwritten_text_color'] = '#ffffff';
       break;
   }
 }
 ```

4. Deploy the module to the Test environment within the site Dashboard or with Terminus:

 ```nohighlight
 terminus site deploy --env=test --sync-content --note="Install and configure Environment Indicator"
 ```

5. Deploy the module to the Live environment within the site Dashboard or with Terminus:

 ```nohighlight
 terminus site deploy --env=live --note="Install and configure Environment Indicator"
 ```

All environments will now show a color-coded environment indicator, as defined within the above `settings.php` snippet.
