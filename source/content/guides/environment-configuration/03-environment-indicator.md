---
title: Environment Configuration
subtitle: Configuring Environment Indicators
description: Learn how to implement an environment indicator for Drupal and WordPress sites running on Pantheon.
categories: [develop]
tags: [site, terminus, workflow, webops]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/environment-configuration/environment-indicator
anchorid: environment-indicator
---

This section provides information on how to install an indicator to receive alerts when changes are made in your site and environments.

We recommend installing the [Pantheon HUD](https://wordpress.org/plugins/pantheon-hud) plugin on WordPress sites and the [Environment Indicator](https://www.drupal.org/project/environment_indicator) module on Drupal sites.

<Alert title="Exports" type="export">

This doc uses [Terminus](/terminus) example commands with common variable names for the site and environment names. Before you begin these steps, set the variables `$site` and `$env` in your terminal session to match your site name and the Dev (or Multidev) environment:

```bash{promptUser: user}
export site=yoursitename
export env=dev #or Multidev name
```

</Alert>

## WordPress: Pantheon HUD

The Pantheon HUD plugin is developed and maintained on GitHub. [Create an issue](https://github.com/pantheon-systems/pantheon-hud/issues) with questions, feature requests, or bug reports.

1. [Set the connection mode to SFTP](/sftp) for the Dev or Multidev environment via the Pantheon Dashboard or with [Terminus](/terminus):

 ```bash{promptUser: user}
 terminus connection:set $site.$env sftp
 ```

1. Install and activate [Pantheon HUD](https://wordpress.org/plugins/pantheon-hud/) from within the Dev or Multidev environment's WordPress Dashboard (`/wp-admin/plugin-install.php?tab=search&s=pantheon+hud`) or with Terminus:

 ```bash{promptUser: user}
 terminus wp $site.$env -- plugin install pantheon-hud --activate
 ```

1. Deploy the plugin to the Test environment within the Site Dashboard or with Terminus, and clear the site cache:

 ```bash{promptUser: user}
 terminus env:deploy $site.test --sync-content --updatedb --note="Install Pantheon HUD plugin"
 terminus env:clear-cache <site>.test
 ```

  If you're working from a Multidev environment, merge to Dev first.

1. Activate the plugin within the WordPress Dashboard on the Test environment (`/wp-admin/plugins.php`) or with Terminus:

 ```bash{promptUser: user}
 terminus wp $site.test -- plugin activate pantheon-hud
 ```

1. Deploy the plugin to the Live environment within the Site Dashboard or with Terminus, and clear the site cache:

 ```bash{promptUser: user}
 terminus env:deploy $site.live --note="Install Pantheon HUD plugin"
 terminus env:clear-cache <site>.live
 ```

1. Activate the plugin within the WordPress Dashboard on the Live environment (`/wp-admin/plugins.php`) or with Terminus:

 ```bash{promptUser: user}
 terminus wp $site.live -- plugin activate pantheon-hud
 ```

All environments will now show the following indicator for users who are logged in with the `manage_options` capability:

![Pantheon HUD](../../../images/pantheon-hud.png)

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

The [Environment Indicator](https://www.drupal.org/project/environment_indicator) module is officially supported for Drupal 7 sites.

1. [Set the connection mode to SFTP](/sftp) for the Dev or Multidev environment via the Pantheon Dashboard or with [Terminus](/terminus):

 ```bash{promptUser: user}
 terminus connection:set $site.$env sftp
 ```

1. Install and enable the [Environment Indicator](https://www.drupal.org/project/environment_indicator) module using the [Drupal interface](https://drupal.org/documentation/install/modules-themes) or with Terminus:

 ```bash{promptUser: user}
 terminus drush $site.$env -- en environment_indicator -y
 ```

1. Add the following within `settings.php` for Drupal 7:

    ```php
    /*
    * Environment Indicator module settings.
    * see: https://pantheon.io/docs/guides/environment-configuration/environment-indicator
    */

    $conf['environment_indicator_overwrite'] = TRUE;
      $conf['environment_indicator_overwritten_position'] = 'top';
      $conf['environment_indicator_overwritten_fixed'] = FALSE;

      if (!defined('PANTHEON_ENVIRONMENT')) {
          $conf['environment_indicator_overwritten_name'] = 'Local';
          $conf['environment_indicator_overwritten_color'] = '#505050';
          $conf['environment_indicator_overwritten_text_color'] = '#ffffff';
      }
      // Pantheon Env Specific Config
      if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
          switch ($_ENV['PANTHEON_ENVIRONMENT']) {
            case 'lando': // Localdev or Lando environments
              $config['environment_indicator.indicator']['name'] = 'Local Dev';
              $config['environment_indicator.indicator']['bg_color'] = '#990055';
              $config['environment_indicator.indicator']['fg_color'] = '#ffffff';
              break;
            case 'dev':
              $conf['environment_indicator_overwritten_name'] = 'Dev';
              $conf['environment_indicator_overwritten_color'] = '#307b24';
              $conf['environment_indicator_overwritten_text_color'] = '#ffffff';
              break;
            case 'test':
              $conf['environment_indicator_overwritten_name'] = 'Test';
              $conf['environment_indicator_overwritten_color'] = '#b85c00';
              $conf['environment_indicator_overwritten_text_color'] = '#ffffff';
              break;
            case 'live':
              $conf['environment_indicator_overwritten_name'] = 'Live!';
              $conf['environment_indicator_overwritten_color'] = '#e7131a';
              $conf['environment_indicator_overwritten_text_color'] = '#ffffff';
              break;
            default:
              //Multidev catchall
              $conf['environment_indicator_overwritten_name'] = 'Multidev';
              $conf['environment_indicator_overwritten_color'] = '#e7131a';
              $conf['environment_indicator_overwritten_text_color'] = '#000000';
              break;
          }
      }
    ```

1. Deploy the module to the Test environment within the Site Dashboard or with Terminus, and clear the site cache:

 ```bash{promptUser: user}
 terminus env:deploy $site.test --sync-content --updatedb --note="Install and configure Environment Indicator"
 terminus env:clear-cache <site>.test
 ```

  If you're working from a Multidev environment, merge to Dev first. Remember that the module will need to be activated again for each new environment.

1. Deploy the module to the Live environment within the Site Dashboard or with Terminus, and clear the site cache:

  ```bash{promptUser: user}
  terminus env:deploy $site.live --updatedb --note="Install and configure Environment Indicator"
  terminus env:clear-cache <site>.live
  ```

All environments will now show a color-coded environment indicator, as defined within the above `settings.php` snippet.


## More Resources

- [Environment-Specific Configuration for WordPress Sites](/guides/environment-configuration/environment-specific-config)

- [Environment-Specific Configurations for Drupal 9](/guides/environment-configuration/environment-specific-config-d9)

- [Reading Pantheon Environment Configuration](/guides/environment-configuration/read-environment-config)
