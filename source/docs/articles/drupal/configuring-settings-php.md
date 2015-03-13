---
title: Configuring Settings.php
description: Detailed information about configuring your Drupal database settings.
category:
  - developing

---


 
## Overview

The Drupal system configuration in code is set in:

    sites/default/settings.php

Pantheon uses a variant of Pressflow Drupal to allow the server to automatically specify configuration settings, such as the Database configuration without editing settings.php--no editing required. Permissions are handled automatically by Pantheon, so you can customize settings.php like any other site code.

**Note**: You should never put the database connection information for a Pantheon database within your settings.php. These will change. If you are having connection errors, please ensure you are running Pressflow core. This is a requirement and is not optional.

## Pantheon Articles on Settings.php

The following articles include techniques and configurations for settings.php on Pantheon:

- [Reading Pantheon Environment configuration](/docs/articles/sites/code/reading-pantheon-environment-configuration) (including domain\_access)
- [Redis as a caching backend](/docs/articles/sites/redis-as-a-caching-backend)
- [Redirect incoming requests](/docs/articles/sites/code/redirect-incoming-requests) (including WWW and non-WWW, requiring SSL)
- [SSO and Identity Federation](/docs/articles/sites/code/sso-and-identity-federation) (LDAP TLS certificate configuration)

## Local Database Configuration for Development

Use these configuration snippets to specify a local configuration that will be ignored by Pantheon, such as database credentials.

## Drupal 7

    ​// Local development configuration.
    if (!defined('PANTHEON_ENVIRONMENT')) {
      // Database.
      $databases['default']['default'] = array(
        'database' => 'DATABASE',
        'username' => 'USERNAME',
        'password' => 'PASSWORD',
        'host' => 'localhost',
        'driver' => 'mysql',
        'port' => 3306,
        'prefix' => '',
      );
    }

## Drupal 6

    // Local development configuration.
    if (!defined('PANTHEON_ENVIRONMENT')) {
      // Database.  
      $db_url = 'mysql://username:password@localhost/databasename';
      $db_prefix = '';
    }

## Frequently Asked Questions

#### How can I write logic based on the Pantheon server environment?

Depending on your use case, there are two possibilities:

For web only actions, like redirects, check for the existence of $\_SERVER['PANTHEON\_ENVIRONMENT'] - if it exists, it will contain a string with the current environment (Dev, Test, or Live).

    // Pantheon - web only.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT'])) {
      // Only on dev web environment.
      if ($_SERVER['PANTHEON_ENVIRONMENT'] == 'dev') {
        // Custom code.
      }
    }

For actions that should take place on every environment, such as redis caching, use the constant ​PANTHEON\_ENVIRONMENT. Again, it will contain Dev, Test, or Live.

    // Pantheon - all operations.
    if (defined('PANTHEON_ENVIRONMENT')) {
      // Only on dev environment.
      if (PANTHEON_ENVIRONMENT == 'dev') {
        // Custom code.
      }
    }

As an example, here's how you can hard-code your Drupal 7 caching configuration and Google Analytics based on the environment. To learn more, see [Defining variables in a site's settings.php $conf array](https://drupal.org/node/1525472).

    // All Pantheon Environments.
    if (defined('PANTHEON_ENVIRONMENT')) {
      // Drupal caching in development environments.
      if (!in_array(PANTHEON_ENVIRONMENT, array('test', 'live'))) {
        // Anonymous caching.
        $conf['cache'] = 0;
        // Block caching - disabled.
        $conf['block_cache'] = 0;
        // Expiration of cached pages - none.
        $conf['page_cache_maximum_age'] = 0;
        // Aggregate and compress CSS files in Drupal - off.
        $conf['preprocess_css'] = 0;
        // Aggregate JavaScript files in Drupal - off.
        $conf['preprocess_js'] = 0;
      }
      // Drupal caching in test and live environments.
      else {
        // Anonymous caching - enabled.
        $conf['cache'] = 1;
        // Block caching - enabled.
        $conf['block_cache'] = 1;
        // Expiration of cached pages - 15 minutes.
        $conf['page_cache_maximum_age'] = 900;
        // Aggregate and compress CSS files in Drupal - on.
        $conf['preprocess_css'] = 1;
        // Aggregate JavaScript files in Drupal - on.
        $conf['preprocess_js'] = 1;
      }
      // Minimum cache lifetime - always none.
      $conf['cache_lifetime'] = 0;
      // Cached page compression - always off.
      $conf['page_compression'] = 0;


      if (PANTHEON_ENVIRONMENT == 'dev') {
        // Google Analytics.
        $conf['googleanalytics_account'] = 'UA-XXXXXXXX-X';
      }
      else if (PANTHEON_ENVIRONMENT == 'test') {
        // Google Analytics.
        $conf['googleanalytics_account'] = 'UA-XXXXXXXX-Y';
      }
      else if (PANTHEON_ENVIRONMENT == 'live') {
        // Google Analytics.
        $conf['googleanalytics_account'] = 'UA-XXXXXXXX-Z';
      }
    }

#### How can I read the Pantheon environmental configuration, like database credentials?

See  [Reading the Pantheon Environment configuration](/docs/articles/sites/code/reading-pantheon-environment-configuration).

#### Why does Drupal report that settings.php is not protected? I can't change the permissions on settings.php.

If you do not have a settings.php file in your codebase, the following message on `/admin/reports/status` is shown:

Configuration file: Not protected. The file `sites/default/settings.php` is not protected from modifications and poses a security risk. You must change the file's permissions to be non-writable.

Technically, it's possible to have a functioning Drupal site without settings.php on Pantheon, but this breaks compatibility with many modules and tools. Therefore, it's strongly recommended to either copy the default.settings.php file to settings.php or create an empty settings.php file.

#### Should I include settings.php in my site import?

It depends on your site configuration. Stripping commented-out or non-functional code from your existing settings.php file, leaving only known good functional configurations is a best practice and makes it easier to troubleshoot.

#### Where do I specify database credentials?

Pantheon automatically injects database credentials into the site environment; if you hard code database credentials, you will break the Pantheon workflow.

#### Where can I get a copy of a default.settings.php?

- Drupal 7 -  [https://github.com/pantheon-systems/drops-7/blob/master/sites/default/default.settings.php](https://github.com/pantheon-systems/drops-7/blob/master/sites/default/default.settings.php)
- Drupal 6 -  [https://github.com/pantheon-systems/drops-6/blob/master/sites/default/default.settings.php](https://github.com/pantheon-systems/drops-6/blob/master/sites/default/default.settings.php)

#### Are table prefixes supported?


For information about table prefixes on Pantheon, see [Importing an Existing Drupal Site to Pantheon](/docs/articles/drupal/importing-an-existing-drupal-site-to-pantheon).

#### Status is showing that my configuration file is not protected and that I need to create a settings.php file?

Drupal doesn’t ship with a settings.php in place; as the error suggests, you should make a copy of the default.settings.php and rename it settings.php. Once a settings.php file has been created, the settings.php area of the report should resolve to green.
