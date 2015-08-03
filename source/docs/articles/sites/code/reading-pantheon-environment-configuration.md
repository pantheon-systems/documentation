---
title: Reading Pantheon Environment Configuration
description: Learn about the separation of configuration and code within the Pantheon Website Management Platform's runtime container environment.
category:
  - going-live
keywords: environment config, env config, environment configuration, database credentials, db credentials, container, containers, $_ENV, wp-config.php, database error, db errors, superglobal, redis auth, redis authentication, runtime, runtime container, runtime container environment, runtime matrix
---
Pantheon promotes the separation of configuration and code, especially where security is a concern. You should never copy/paste credentials from your Dashboard into any of your sites code.

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

<div class="alert alert-warning" role="alert">
<h4>Note</h4>
Unless you're implementing Domain Access, using something other than the standard bootstrap process, or performing Drupal core development, you won't need to manually read the environment configuration. See <a href="/docs/articles/drupal/configuring-settings-php">configuring settings.php</a> for details.</div>

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

Place [Domain Access setup routine](http://drupal.org/node/1096962) at the **end** of settings.php. For example, for Drupal 7:

    // All Pantheon Environments.
    if (defined('PANTHEON_ENVIRONMENT')) {

      // Extract Pantheon environmental configuration for Domain Access
      extract(json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE));
      // All $conf variables and Redis configuration go after extract()

      // If using Redis add appropriate settings per https://pantheon.io/docs/articles/sites/redis-as-a-caching-backend/#using-redis-with-drupal

      // Add other $conf variables, for example for Fast 404 pages

      /**
       * Add the domain module setup routine to the end of settings.php
       */
      include DRUPAL_ROOT . '/sites/all/modules/domain/settings.inc';
    }


## WordPress

Pantheon's default `wp-config.php` includes code to read from the `$_ENV` superglobal so no additional configuration should be required.

For more information, see [configuring wp-config.php](/docs/articles/wordpress/configuring-wp-config-php).
