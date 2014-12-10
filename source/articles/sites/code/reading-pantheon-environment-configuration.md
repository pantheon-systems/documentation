---
title: Reading Pantheon Environment Configuration
description: Understand the separation of configuration and code within the Pantheon framework.

---

Pantheon promotes the separation of configuration and code, especially where security is a concern. You should never copy/paste credentials from your dashboard into any of your sites code.

Database credentials, Redis authentication, and other configuration data is provided as part of the runtime container environment. It is present in PHP's `$_ENV` superglobal.

    <?php var_dump($_ENV); ?>
    array(13) {
      ["FRAMEWORK"]=>
      string(7) "drupal"
      ["DOCROOT"]=>
      string(1) "/"
      ["FILEMOUNT"]=>
      string(19) "sites/default/files"
      ["DRUPAL_HASH_SALT"]=>
      string(44) "xCoEVpEAOYv0OhG6QIpr+Z+oDIV+qwGcz79AAGssLlA="
      ["DB_HOST"]=>
      string(9) "XXX.XXX.XXX.XXX"
      ["DB_PORT"]=>
      string(5) "XXXXXX"
      ["DB_USER"]=>
      string(8) "pantheon"
      ["DB_PASSWORD"]=>
      string(32) "XXXXXXXXXXXXXXXXX"
      ["DB_NAME"]=>
      string(8) "pantheon"
      ["PANTHEON_SITE"]=>
      string(36) "97cf724f-fbe9-49ba-81be-1a3ab4807b98"
      ["PANTHEON_SITE_NAME"]=>
      string(15) "development-demo"
      ["PANTHEON_ENVIRONMENT"]=>
      string(3) "dev"
      ["PANTHEON_INFRASTRUCTURE_ENVIRONMENT"]=>
      string(6) "live"
    }

If you are using a common CMS framework the code you need to load this configuration and boot your app should already be pre-configured. However, if you need to do something custom, you can work with environmental configuration directly.

## Drupal 7 and Drupal 8

**Note:** Unless you're implementing Domain Access, using something other than the standard bootstrap process, or performing Drupal core development, you won't need to manually read the environment configuration. See [configuring settings.php](/documentation/howto/configuring-settings-php/-configuring-settings-php) for details.

Pantheon uses Pressflow to automatically read the environmental configuration. If you're working with vanilla Drupal or want to pass the credentials and configuration such as the database credentials and temporary directory location to another application, you'll need to manually extract the configuration. In Drupal, this would be done in settings.php.

    <?php
    extract(json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE));

## Drupal 6

    <?php
    $settings = json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE);
    $db = $settings['databases']['default']['default'];
    // You can do the following on one line. It's broken in two here for readability.
    $db_url = $db['driver'] . '://' . $db['username'] . ':' . $db['password'];
    $db_url .= '@' . $db['host'] . ':' . $db['port'] . '/' . $db['database'];
    $conf = $settings['conf'];

## Domain Access

Domain Access requires [customization of settings.php](http://drupal.org/node/1096962) to go at the END of the settings.php. If you do not place the domain access configuration at the end of the file, your site will not function correctly.  


In order for this to work, you need to add the appropriate config-loading line _above_ the `settings.inc` include in your settings.php file. For example, in Drupal 7:

    extract(json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE));
    // All $conf variables and Redis configuration should be set between these statements
    require_once DRUPAL_ROOT . '/path/to/modules/domain/settings.inc';

​ **Important!** If you are using the `PRESSFLOW_SETTINGS` or the `$conf` variable within settings.php, put this snippet at the end to avoid conflicts. If you are using Redis you will need to insert your configuration between the extract and require\_once statements.  
 

## WordPress

Pantheon's default `wp-config.php` includes code to read from the `$_ENV` superglobal so no additional configuration should be required.

For more information see [configuring wp-config.php](/documentation/getting-started/configuring-wp-config-php/).
