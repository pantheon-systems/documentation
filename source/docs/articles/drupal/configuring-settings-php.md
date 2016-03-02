---
title: Configuring Settings.php
description: Detailed information about configuring your Drupal database settings.
category:
  - developing
keywords: drupal, settings.php, database configuration, configuration
---
The Drupal system configuration in code is set in:
`sites/default/settings.php`

Drupal 8 sites on Pantheon run an unmodified version of core, bundled with a custom `settings.php` file which includes the necessary `settings.pantheon.inc`. If the stock `settings.php` file is used in place of the bundled file, the site will stop working on Pantheon.

For Drupal 6/7, Pantheon uses a variant of Pressflow Drupal to allow the server to automatically specify configuration settings, such as the database configuration without editing settings.php. Permissions are handled automatically by Pantheon, so you can customize settings.php like any other site code.

<div class="alert alert-danger" role="alert"><h4>Warning</h4>
You should NEVER put the database connection information for a Pantheon database within your settings.php. These credentials will change. If you are having connection errors, please ensure you are running Pressflow core. This is a requirement and is not optional.</div>

## Pantheon Articles on Settings.php

The following articles include techniques and configurations for settings.php on Pantheon:

- [Reading Pantheon Environment Configuration](/docs/articles/sites/code/reading-pantheon-environment-configuration) (including domain\_access)
- [Redis as a Caching Backend](/docs/articles/sites/redis-as-a-caching-backend)
- [Redirect incoming requests](/docs/articles/sites/code/redirect-incoming-requests) (including WWW and non-WWW, requiring HTTPS)
- [SSO and Identity Federation](/docs/articles/sites/code/sso-and-identity-federation) (LDAP TLS certificate configuration)

## Local Database Configuration for Development

Use these configuration snippets to specify a local configuration that will be ignored by Pantheon, such as database credentials.

### Drupal 8
Configure environment-specific settings within the `settings.local.php` file, which is `.gitignored`. Modifying the bundled `settings.php` file is not necessary, as it already includes `settings.local.php` if one exists.

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


The `HASH_SALT` value should also be set within `settings.local.php`. See Drush script: [Quickstart](https://github.com/pantheon-systems/drush-config-workflow/blob/master/bin/quickstart)

To use the Pantheon `HASH_SALT` in your local site (not necessary), you can get it via [Terminus](/docs/articles/local/cli):
```
terminus drush "ev return getenv("DRUPAL_HASH_SALT")"
```

### Trusted Host Setting
A warning within `/admin/reports/status` will appear when the `trusted_host_patterns` setting is not configured. This setting protects sites from HTTP Host header attacks. However, sites running on Pantheon are not vulnerable to this specific attack and the warning can be safely ignored. If you would like to resolve the warning, use the following configuration:
<div class="alert alert-info">
<h4>Note</h4>
Replace <code>^www\.yoursite\.com$</code> with custom domain(s) added within the Site Dashboard, adjusting patterns as needed.
</div>
```
if (defined('PANTHEON_ENVIRONMENT')) {
  if (in_array($_ENV['PANTHEON_ENVIRONMENT'], array('dev', 'test', 'live'))) {
    $settings['trusted_host_patterns'][] = "{$_ENV['PANTHEON_ENVIRONMENT']}-{$_ENV['PANTHEON_SITE_NAME']}.getpantheon.io";
    $settings['trusted_host_patterns'][] = "{$_ENV['PANTHEON_ENVIRONMENT']}-{$_ENV['PANTHEON_SITE_NAME']}.pantheon.io";
    $settings['trusted_host_patterns'][] = "{$_ENV['PANTHEON_ENVIRONMENT']}-{$_ENV['PANTHEON_SITE_NAME']}.pantheonsite.io";
    $settings['trusted_host_patterns'][] = "{$_ENV['PANTHEON_ENVIRONMENT']}-{$_ENV['PANTHEON_SITE_NAME']}.panth.io";  

    # Replace value with custom domain(s) added in the site Dashboard
    $settings['trusted_host_patterns'][] = '^.+\.yoursite\.com$';
    $settings['trusted_host_patterns'][] = '^yoursite\.com$';
  }
}
```


### Drupal 7

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

### Drupal 6

    // Local development configuration.
    if (!defined('PANTHEON_ENVIRONMENT')) {
      // Database.  
      $db_url = 'mysql://username:password@localhost/databasename';
      $db_prefix = '';
    }

## Frequently Asked Questions

#### Can I delete the `default.settings.php` file?
Yes, but only if at least one other file (e.g. `settings.php`) is present within the `sites/default` directory. Otherwise, the existing symlink to `sites/default/files` will be invalid.

#### How can I write logic based on the Pantheon server environment?

Depending on your use case, there are two possibilities:

For web only actions, like redirects, check for the existence of $\_SERVER['PANTHEON\_ENVIRONMENT']. If it exists, it will contain a string with the current environment (Dev, Test, or Live).

    // Pantheon - web only.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT'])) {
      // Only on dev web environment.
      if ($_SERVER['PANTHEON_ENVIRONMENT'] == 'dev') {
        // Custom code.
      }
    }

For actions that should take place on every environment, such as Redis caching, use the constant ​PANTHEON\_ENVIRONMENT. Again, it will contain Dev, Test, or Live.

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

See [Reading the Pantheon Environment Configuration](/docs/articles/sites/code/reading-pantheon-environment-configuration).

#### Why does Drupal report that settings.php is not protected? I can't change the permissions on settings.php.

If you do not have a settings.php file in your codebase, the following message on `/admin/reports/status` is shown:

Configuration file: Not protected. The file `sites/default/settings.php` is not protected from modifications and poses a security risk. You must change the file's permissions to be non-writable.

Technically, it's possible to have a functioning Drupal site without settings.php on Pantheon, but this breaks compatibility with many modules and tools. Therefore, it's strongly recommended to either copy the default.settings.php file to settings.php or create an empty settings.php file.

#### Should I include settings.php in my site import?

It depends on your site configuration. Stripping commented-out or non-functional code from your existing settings.php file, leaving only known good functional configurations is a best practice and makes it easier to troubleshoot.

#### Where do I specify database credentials?

Pantheon automatically injects database credentials into the site environment; if you hard code database credentials, you will break the Pantheon workflow.

#### Where can I get a copy of a default.settings.php?

- Drupal 8 - [https://github.com/pantheon-systems/drops-8/blob/master/sites/default/default.settings.php](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/default.settings.php)
- Drupal 7 -  [https://github.com/pantheon-systems/drops-7/blob/master/sites/default/default.settings.php](https://github.com/pantheon-systems/drops-7/blob/master/sites/default/default.settings.php)
- Drupal 6 -  [https://github.com/pantheon-systems/drops-6/blob/master/sites/default/default.settings.php](https://github.com/pantheon-systems/drops-6/blob/master/sites/default/default.settings.php)

####Where can I find examples of Pantheon settings.php?
You can view examples at the [pantheon-settings-examples repo](https://github.com/pantheon-systems/pantheon-settings-examples).

#### Are table prefixes supported?

For information about table prefixes on Pantheon, see [Export an Existing Drupal Site](/docs/articles/sites/migrate/export-an-existing-drupal-site#export-the-database).

#### Status is showing that my configuration file is not protected and that I need to create a settings.php file.

Drupal doesn’t ship with a settings.php in place; as the error suggests, you should make a copy of the default.settings.php and rename it settings.php. Once you have created a settings.php file, the settings.php area of the report should resolve to green.

#### Can I edit settings.pantheon.php?
No; `settings.pantheon.php` is for Pantheon's use only and you should only modify the `settings.php` file. The `settings.pantheon.php` file may change in future updates, and modifying it would cause conflicts.

## Troubleshooting
#### Request to a Remote API Does Not Return Expected Response

The PHP 5.5 default is `&` and the PHP 5.3 default is `&amp;`.

If the API expects `&` as an argument separator but receives `&amp;` (for example, when using http_build_query), you can override the default arg_separator.ouput value by adding the following line to `settings.php`:

```ini_set('arg_separator.output', '&');```
