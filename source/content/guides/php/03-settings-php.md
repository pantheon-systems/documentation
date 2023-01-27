---
title: PHP on Pantheon
subtitle: Configure Your Drupal Settings.php File
description: Configure your Drupal database settings.
contributors: [mmenavas, andrewmallis]
cms: "Drupal"
contenttype: [guide]
categories: [php]
newcms: [drupal]
audience: [development]
product: [--]
integration: [--]
tags: [site, database]
layout: guide
showtoc: true
permalink: docs/guides/php/settings-php
anchorid: settings-php
reviewed: "2022-12-13"
---

This section provides information on how to configure the `settings.php` file for a Drupal site. Refer to [Configure Your wp-config.php File](/guides/php/wp-config-php) if you have a WordPress site.

The Drupal system configuration in code is set in the `sites/default/settings.php` file.

## Drupal (Latest Version)

Drupal sites on Pantheon run an unmodified version of core, bundled with a custom `settings.php` file that includes the necessary `settings.pantheon.php`. Your site will stop working on Pantheon if the stock `settings.php` file is used in place of the bundled file. 

## Drupal 7 and Earlier

Pantheon uses a variant of [Pressflow](https://www.pressflow.org/) Drupal for Drupal 7 and earlier versions. This  allows the server to automatically specify configuration settings, such as the database configuration without editing `settings.php`. Permissions are handled automatically by Pantheon, so you can customize `settings.php` like any other site code.

## Pantheon Articles on settings.php

Review the following articles for techniques and configurations for your `settings.php` file on Pantheon:

- [Reading Pantheon Environment Configuration](/guides/environment-configuration/read-environment-config) (including domain_access)
- [Object Cache (formerly Redis) for Drupal or WordPress](/guides/object-cache)
- [Platform and Custom Domains](/guides/domains)
- [Configure Redirects](/guides/redirect)
- [SSO and Identity Federation](/sso) (LDAP TLS certificate configuration)

## Local Database Configuration for Development

<Alert title="Warning" type="danger">

Never place the database connection information for a Pantheon database within your `settings.php` file. These credentials will change. Make sure you are running Pressflow core if you experience connection errors. This is a requirement.

</Alert>

Use the latest version of Drupal and Drupal 7 configuration snippets in the subsections below to specify a local configuration that will be ignored by Pantheon, such as database credentials.

### Drupal (Latest Version)

1. Configure environment-specific settings within the `settings.local.php` file, which is ignored by Git in the Pantheon [Drupal upstream](https://github.com/pantheon-systems/drupal-composer-managed). Modifying the bundled `settings.php` file is not necessary, as it already includes `settings.local.php` if one exists.

  ```php
    /**
     * If there is a local settings file, then include it
     */
    $local_settings = __DIR__ . "/settings.local.php";
    if (file_exists($local_settings)) {
      include $local_settings;
    }
  ```

1. Set the `HASH_SALT` value within `settings.local.php`. Refer to the Drush script: [Quickstart](https://github.com/pantheon-systems/drush-config-workflow/blob/master/bin/quickstart)

    - Drupal will not run locally without a hash salt. The hash salt you use does not have to be the same one set on the Pantheon platform. You can use any sufficiently long random string. Make sure to set one in `settings.local.php` :

    ```php:title=settings.local.php
    $settings['hash_salt'] = '$HASH_SALT';
    ```

1. Run the command below to use the Pantheon `HASH_SALT` in your local site:

    ```bash{promptUser: user}
    terminus drush <site>.<env> -- ev 'return getenv("DRUPAL_HASH_SALT")'
    ```

#### Trusted Host Setting

You will see a warning within `/admin/reports/status` if the `trusted_host_patterns` setting is not configured. This setting protects sites from HTTP Host header attacks. However, sites running on Pantheon are not vulnerable to this specific attack and the warning can be safely ignored. Use the configuration below if you would like to resolve the warning:

<Alert title="Note" type="info">

Don't use the code snippet if you're using the Drupal redirects from our [Configure Redirects](/guides/redirect/#redirect-to-https-and-the-primary-domain) documentation as it conflicts with the other code.

</Alert>

1. Replace `yoursite\.com` with custom domain(s) added within the Site Dashboard, and adjust patterns as needed. 

1. Escape any characters that need to be escaped in regular expressions, including dots (`.`). 


```php
if (defined('PANTHEON_ENVIRONMENT')) {
  if (in_array($_ENV['PANTHEON_ENVIRONMENT'], array('dev', 'test', 'live'))) {
    $settings['trusted_host_patterns'][] = "{$_ENV['PANTHEON_ENVIRONMENT']}-{$_ENV['PANTHEON_SITE_NAME']}.pantheon.io";
    $settings['trusted_host_patterns'][] = "{$_ENV['PANTHEON_ENVIRONMENT']}-{$_ENV['PANTHEON_SITE_NAME']}.pantheonsite.io";


    # Replace value with custom domain(s) added in the site Dashboard
    $settings['trusted_host_patterns'][] = '^.+\.yoursite\.com$';
    $settings['trusted_host_patterns'][] = '^yoursite\.com$';
  }
}
```

### Drupal 7

```php
// Local development configuration.
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
```

## Frequently Asked Questions

### Can I delete the default.settings.php file?

Yes, but only if at least one other file (for example, `settings.php`) is present within the `sites/default` directory. Otherwise, the existing symlink to `sites/default/files` will be invalid.

### How can I write logic based on the Pantheon server environment?

There are three possibilities depending on your use case: 

- For web only actions, like redirects, check for the existence of `$_ENV['PANTHEON_ENVIRONMENT']`. If it exists, it will contain a string with the current environment (Dev, Test, Live, or Multidev environment names if they are present). Refer to our [Redirects](/guides/domains) guide for examples.

  <Alert title="Note" type="info">
  
  `$_SERVER` is not generally available from the command line so [logic should check for that when used](/guides/domains), and [avoid using `$_SERVER['SERVER_NAME']` and `$_SERVER['SERVER_PORT']`](/server_name-and-server_port).
  
  </Alert>

- For actions that should take place on every environment, such as object caching, use the constant `PANTHEON_ENVIRONMENT`. It will contain Dev, Test, or Live. Refer to the [Object Cache](/guides/object-cache) guide for examples.

- For Actions that require access to protected services like Object Cache or the site database, you can use the `$_ENV` superglobal. Please review our guide on [Reading Pantheon Environment Configuration](/guides/environment-configuration/read-environment-config) for more information, or refer to our [Object Cache](/guides/object-cache) guide for examples.

As an example, here's how you can hard-code your Drupal 7 caching configuration and Google Analytics based on the environment. Refer to [Defining variables in a site's settings.php $conf array](https://www.drupal.org/node/1525472) for more information.

```php:title=settings.php
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
```

### Why does Drupal report that `settings.php` is not protected? I can't change the permissions on `settings.php`.

If you do not have a `settings.php` file in your codebase, you'll see the following message on `/admin/reports/status`:

> Configuration file: Not protected. The file `sites/default/settings.php` is not protected from modifications and poses a security risk. You must change the file's permissions to be non-writable.

Technically, it's possible to have a functioning Drupal site without `settings.php` on Pantheon, but this breaks compatibility with many modules and tools. Therefore, it's strongly recommended to either copy the `default.settings.php` file to `settings.php` or create an empty `settings.php` file.

### Should I include settings.php in my site import?

It depends on your site configuration. Stripping commented-out or non-functional code from your existing `settings.php` file, leaving only known good functional configurations is a best practice and makes it easier to troubleshoot.

### Where do I specify database credentials?

Pantheon automatically injects database credentials into the site environment. You will break the Pantheon workflow if you hard code database credentials.

### Where do I set or modify the `drupal_hash_salt` value in Drupal 7?

There can be an occasion when you may need to set the hash salt to a specific value. If you install Drupal 7, it will create a `drupal_hash_salt` value for you, but if you want to use a different one, you can edit `settings.php` before installation. Pantheon uses Pressflow to automatically read the environment configuration and the Drupal 7 hash salt is stored as part of the Pressflow settings.

```php:title=settings.php
// All Pantheon Environments.
if (defined('PANTHEON_ENVIRONMENT')) {
  // Set your custom hash salt value.
  $custom_hash_salt = '';
  // Extract Pressflow settings into a php object.
  $pressflow_settings = json_decode($_SERVER['PRESSFLOW_SETTINGS']);
  $pressflow_settings->drupal_hash_salt = $custom_hash_salt;
  $_SERVER['PRESSFLOW_SETTINGS'] = json_encode($pressflow_settings);
 }
```

### Where can I get a copy of a default.settings.php file?

- **Drupal (Latest Version):** There is no `default.settings.php` file in the latest version of Drupal repository on GitHub, but there is a `settings.php` file: [https://github.com/pantheon-systems/drupal-composer-managed/blob/default/web/sites/default/settings.php](https://github.com/pantheon-systems/drupal-composer-managed/blob/default/web/sites/default/settings.php)

- **Drupal 7:** [https://github.com/pantheon-systems/drops-7/blob/master/sites/default/default.settings.php](https://github.com/pantheon-systems/drops-7/blob/master/sites/default/default.settings.php)

### Where can I find examples of Pantheon settings.php?

You can refer to examples on the [pantheon-settings-examples repo](https://github.com/pantheon-systems/pantheon-settings-examples).

### Are table prefixes supported?

Pantheon injects the database configuration dynamically during bootstrap. In the `PRESSFLOW_SETTINGS` variable, the appropriate database connection information is passed in based upon the environment (Dev,Test, or Live).

You can technically use database prefixes, but Pantheon will not support database prefixes. As a best practice, allow Pantheon to populate your database configuration settings.

### Why is the Status tab for my Drupal 7 site showing that my configuration file is not protected and that I need to create a settings.php file?

Drupal 7 doesn't ship with a `settings.php` in place. As the error suggests, you should make a copy of the `default.settings.php` and rename it `settings.php`. The `settings.php` area of the report should change to green after you have created a `settings.php` file.

Drupal 7 sites that plan to use [Drush](/guides/drush) should have a `settings.php` file.

### Can I edit settings.pantheon.php?

No. `settings.pantheon.php` is for Pantheon's use only and you should only modify the `settings.php` file. The `settings.pantheon.php` file might change in future updates, and modifying it would cause conflicts.

### How do I enable ionCube Decoder support?

1. Verify that you are running [PHP 7.1](/guides/php/php-versions) if you are using a licensed plugin that requires ionCube Decoder support. Please note that later PHP versions do not currently support ionCube.

1. Enable ionCube Decoder support site-wide by adding this line to `settings.php`:

  ```php:title=settings.php
  ini_set('ioncube.loader.encoded_paths', '/');
  ```

More information can be found in our [PHP 7.1 & ionCube Decoder Now Available for All Sites on Pantheon](https://pantheon.io/blog/php-71-ioncube-decoder-now-available-all-sites-pantheon) blog post.

## Troubleshooting

### Request to a remote API does not return expected response

The PHP 5.5 default is `&` and the PHP 5.3 default is `&amp;`.

If the API expects `&` as an argument separator but receives `&amp;` (for example, when using `http_build_query`), you can override the default `arg_separator.output` value by adding the following line to `settings.php`:

```php:title=settings.php
ini_set('arg_separator.output', '&');
```

### Drush Error: "No Drupal site found", "Could not find a Drupal settings.php file", or missing system information from status

Add a default or empty `sites/default/settings.php` to your site's code to resolve the error below.

```none
Could not find a Drupal settings.php file at ./sites/default/settings.php
```

## More Resources

- [Object Cache](/guides/object-cache)

- [PHP Slow Log](/guides/php/php-slow-log)

- [PHP Errors](/guides/php/php-errors)