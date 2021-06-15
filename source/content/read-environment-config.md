---
title: Reading Pantheon Environment Configuration
description: Learn about the separation of configuration and code for your Drupal or WordPress site within the Pantheon's runtime container environment.
categories: [platform]
tags: [code, database, files, redis]
---

Pantheon promotes the separation of configuration and code, especially where security is a concern. You should never copy/paste credentials from your Dashboard into any of your site's code.

Database credentials, Redis authentication, and other configuration data is provided as part of the runtime container environment. It is present in PHP's `$_ENV` superglobal.

```php
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
  etc...
```

If you are using a common CMS framework, the code you need to load this configuration and boot your app should already be pre-configured. However, if you need to do something custom, you can work with environmental configuration directly.

## Drupal 7 and Drupal 8

<Alert title="Warning" type="danger">

Unless you're implementing Domain Access, using something other than the standard bootstrap process, or performing Drupal core development, you won't need to manually read the environment configuration. See [configuring settings.php](/settings-php) for details.

</Alert>

Pantheon uses Pressflow to automatically read the environmental configuration. If you're working with vanilla Drupal or want to pass the credentials and configuration such as the database credentials and temporary directory location to another application, you'll need to manually extract the configuration. In Drupal, this is done in `settings.php`.

```php
<?php
extract(json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE));
```

## Drupal 6

```php
<?php
$settings = json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE);
$db = $settings['databases']['default']['default'];
// You can do the following on one line. It's broken in two here for readability.
$db_url = $db['driver'] . '://' . $db['username'] . ':' . $db['password'];
$db_url .= '@' . $db['host'] . ':' . $db['port'] . '/' . $db['database'];
$conf = $settings['conf'];
```

## Domain Access

Place [Domain Access setup routine](https://www.drupal.org/node/1096962) above any [Redis configurations](/object-cache#enable-object-cache) in `settings.php`. For example, for Drupal 7:

```php
// All Pantheon Environments.
if (defined('PANTHEON_ENVIRONMENT')) {

  // Extract Pantheon environmental configuration for Domain Access
  extract(json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE));
  // All $conf variables and Redis configuration go after extract()

  // If using Redis add appropriate settings per /docs/object-cache/

  // Add other $conf variables, for example for Fast 404 pages

  /**
  * Add the domain module setup routine to the end of settings.php
  */
  include DRUPAL_ROOT . '/sites/all/modules/domain/settings.inc';
}
```

<Alert title="Note" type="info">

Adding this snippet may cause the Status tab to show that Fast 404 pages are not enabled, when if configured properly, they actually are.

</Alert>

## WordPress

Pantheon's default `wp-config.php` includes code to read from the `$_ENV` superglobal so no additional configuration should be required.

For more information, see [configuring wp-config.php](/wp-config-php).

## Hard-coded Directory References and $_ENV\['HOME']

As a general best-practice, the home directory should be referenced through the `$_ENV` variable:

```php
$_ENV['HOME']
```

### Using $_SERVER

When incorporating custom configurations on Pantheon, use `$_ENV` instead of `$_SERVER` wherever possible. `$_SERVER` is generally unavailable when executing code via the command line (e.g. [Terminus](/terminus), Drush, or WP-CLI), which can cause failures for things like clearing cache. The few exceptions include `HTTP_HOST` and `REMOTE_ADDR`, or things pertaining directly to the web request in progress such as [redirects](/domains#primary-domain).

For debugging modules or plugins, it may be beneficial to review the values within the `$_SERVER` variable versus the value used by the plugin/module code.  If `$_SERVER` variables are used, there may be instances where you need to alter the variable assignments to get a module or plugin to work properly as outlined in [Server Name and Server Port](/server_name-and-server_port).

<Alert title="Note" type="info">

The `$_SERVER` variable contains sensitive data about a site and should not be publicly exposed. In the same way that you would not leave the output of `phpinfo();` displayed on a site, don't leave this open to public viewing.

</Alert>

This is a partial example from a WordPress site homepage:

```php
<?php var_dump($_SERVER);  ?>
array(63) {
    ["SERVER_SOFTWARE"]=>
    string(11) "nginx/1.4.7"
    ["REQUEST_URI"]=>
    string(1) "/"
    ["USER"]=>
    string(32) "non-static-binding-string-inserted-here"
    ["HOME"]=>
    string(46) "/srv/bindings/non-static-binding-string-inserted-here"
    ["SCRIPT_NAME"]=>
    string(10) "/index.php"
    ["DOCUMENT_URI"]=>
    string(10) "/index.php"
    ["DOCUMENT_ROOT"]=>
    string(51) "/srv/bindings/non-static-binding-string-inserted-here/code"
    ["SERVER_PROTOCOL"]=>
    string(8) "HTTP/1.1"
    ["GATEWAY_INTERFACE"]=>
    string(7) "CGI/1.1"
    ["REMOTE_ADDR"]=>
    string(12) "72.188.192.8"  <= NOT A SITE IP ADDRESS
    ["REMOTE_PORT"]=>
    string(5) "55982"
    ["SERVER_ADDR"]=>
    string(13) "10.223.192.37"  <= NOT A SITE IP ADDRESS
    ["SERVER_PORT"]=>
    string(5) "11846"
    ["SERVER_NAME"]=>
    string(31) "endpointe7208f3b.chios.panth.io"
    ["REDIRECT_STATUS"]=>
    string(3) "200"
    ["PATH_TRANSLATED"]=>
    string(51) "/srv/bindings/non-static-binding-string-inserted-here/code"
    ["HTTPS"]=>
    string(3) "OFF"
    ["SCRIPT_FILENAME"]=>
    string(62) "/srv/bindings/non-static-binding-string-inserted-here/code//index.php"
    ["HTTP_HOST"]=>
    string(25) "example-wp-site.pantheonsite.io"
    ["HTTP_USER_AGENT"]=>
    string(120) "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko)         Chrome/46.0.2490.80 Safari/537.36"
    ["HTTP_ACCEPT"]=>
    string(74) "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
    ["HTTP_ACCEPT_LANGUAGE"]=>
    string(14) "en-US,en;q=0.8"
    etc...
}
```

## FAQ

### Can I Set My Own Environment Variables?

No, it is not possible to set environment variables on Pantheon. A common solution for this is to use the [Terminus Secrets Plugin](https://github.com/pantheon-systems/terminus-secrets-plugin) to write the secrets to a JSON file in the private filesystem, or use [Lockr](/guides/lockr) for maximum security.
