---
title: Environment Configuration
subtitle: Reading Pantheon Environment Configuration
description: Learn about the separation of configuration and code within Pantheon's runtime container environment.
categories: [platform]
tags: [code, database, files, redis]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/environment-configuration/read-environment-config
anchorid: read-environment-config
---

This section provides information on how to use database credentials for Object Cache (Redis) authentication.

You should never copy and paste credentials from your Dashboard into any of your site's code.

Database credentials, [Object Cache](/guides/object-cache) authentication, and other configuration data is provided as part of the runtime container environment. It is present in PHP's `$_ENV` superglobal.

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

The code you need to load this configuration and boot your app should already be pre-configured if you are using a common CMS framework. However, if you need any type of custom configuration, you can work with environmental configuration directly.

<Partial file="platform-considerations-connections.md" />

## Drupal

<Alert title="Warning" type="danger">

Unless you're implementing Domain Access, using something other than the standard bootstrap process, or performing Drupal core development, you won't need to manually read the environment configuration. See [configuring settings.php](/guides/php/settings-php) for details.

</Alert>

Pantheon uses [Pressflow](https://www.pressflow.org/) to automatically read the environmental configuration. If you're working with a vanilla Drupal site or want to pass the credentials and configuration such as the database credentials and temporary directory location to another application, you'll need to manually extract the configuration. You can do this in `settings.php` file in Drupal.

```php
<?php
extract(json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE));
```

## Domain Access

Place [Domain Access setup routine](https://www.drupal.org/node/1096962) above any [Redis configurations](/guides/object-cache/enable-object-cache) in `settings.php`. For example, in Drupal 7:

```php
// All Pantheon Environments.
if (defined('PANTHEON_ENVIRONMENT')) {

  // Extract Pantheon environmental configuration for Domain Access
  extract(json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE));
  // All $conf variables and Redis configuration go after extract()

  // If using Redis add appropriate settings per /docs/guides/object-cache/

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

Refer to [configuring wp-config.php](/guides/php/wp-config-php) for more information.

## Hard-coded Directory References and $_ENV\['HOME']

As a general best-practice, the home directory should be referenced through the `$_ENV` variable:

```php
$_ENV['HOME']
```

### Using $_SERVER

When incorporating custom configurations on Pantheon, use `$_ENV` instead of `$_SERVER` wherever possible. `$_SERVER` is generally unavailable when executing code via the command line (for example, [Terminus](/terminus), Drush, or WP-CLI), which can cause failures for things like clearing cache. The few exceptions include `HTTP_HOST` and `REMOTE_ADDR`, or things pertaining directly to the web request in progress such as [redirects](/guides/domains).

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

## Setting Environment Variables

It is not possible to set environment variables on Pantheon. However, there are three common solutions you can use instead. 

### Terminus Secrets Plugin

You can use the [Terminus Secrets Plugin](https://github.com/pantheon-systems/terminus-secrets-plugin) to write the secrets to a JSON file in the private file system. Your PHP will look similar to the code example below with the third line modified for the key you are configuring.

<TabList>

<Tab title="WordPress" id="wp-example" active={true}>

1. Modify and use the code example below to write secrets. 

```bash
$secrets_json_text = file_get_contents('/files/private/secrets.json');
$secrets_data = json_decode($secrets_json_text, TRUE);
define('EXAMPLE_API_KEY', $data['example_api_key']);
```

</Tab>

<Tab title="Drupal" id="drupal-example">

1. Modify and use the code example below to write secrets.

```bash
$secrets_json_text = file_get_contents('/files/private/secrets.json');
$secrets_data = json_decode($secrets_json_text, TRUE);
$config['example_integration.settings']['apikey'] = $secrets_data['example_api_key'];
```

</Tab>

</TabList>

### Manual File Creation

You can manually create and add files to the `/files/private` directory for scenarios that are not supported by the Terminus Secrets plugin. For example, when secrets in the Dev and Live environments are different. 

1. Create your files manually in the `/files/private` directory for each case required, for example:

    - `/files/private/dev.secrets.json`
    - `/files/private/test.secrets.json`
    - `/files/private/live.secrets.json`

1. Update your PHP file using the code examples below as a reference.

    - Note that the code below uses SendGrid as an example. You will need to modify the code for the specific key you are configuring. 

<TabList>

<Tab title="WordPress" id="wp-example" active={true}>

1. Add the code to your `wp-config.php` file and modify it as necessary for the specific key you are configuring:

```php
if ( ! empty( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
	switch( $_ENV['PANTHEON_ENVIRONMENT'] ) {
    case 'live':
      // keys for production env
      $secrets_filename = 'live.secrets.json';
      break;
    case 'test':
      // keys for staging env
      $secrets_filename = 'test.secrets.json';
      break;
    default:
      // keys for dev and multidev envs
      $secrets_filename = 'dev.secrets.json';
      break;
  }
  if (isset($secrets_filename)) {
    $secrets_json_text = file_get_contents('/files/private/' . $secrets_filename);
    $secrets_data = json_decode($secrets_json_text, TRUE);

    define('SENDGRID_API_KEY', $data['sendgrid_api_key']);
    define('SOME_OTHER_OPTION', $data['other_key_example']);
}
```

</Tab>

<Tab title="Drupal" id="drupal-example">

1. Add the code below to your `settings.php` file and modify it as necessary for the specific key you are configuring:

```php
        if ( ! empty( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
	    switch( $_ENV['PANTHEON_ENVIRONMENT'] ) {
      case 'live':
      // keys for production env
      $secrets_filename = 'live.secrets.json';
      break;
      case 'test':
      // keys for staging env
      $secrets_filename = 'test.secrets.json';
      break;
      default:
      // keys for dev and multidev envs
      $secrets_filename = 'dev.secrets.json';
      break;
    }
    if (isset($secrets_filename)) {
    $secrets_json_text = file_get_contents('/files/private/' . $secrets_filename);
    $secrets_data = json_decode($secrets_json_text, TRUE);

    $config['sendgrid_integration.settings']['apikey'] = $secrets_data['sendgrid_api_key'];
    $config['some_other_config_override']['value'] = $secrets_data['other_key_example'];
    }
    ```
```

</Tab>

</TabList>

### Lockr

You can use [Lockr](/guides/lockr) for maximum site security. Lockr provides a simple-to-use developer interface with a scalable cloud key management system. Review the [Install Lockr via the Lockr Terminus Plugin](/guides/lockr#install-lockr-via-the-lockr-terminus-plugin) guide section for installation steps.

## More Resources

- [Pantheon Secure Integration](/guides/secure-development/secure-integration)

- [Private Paths for Files and Code](/guides/secure-development/private-paths)

- [Environment-Specific Configuration for WordPress Sites](/guides/environment-configuration/environment-specific-config)

- [Environment-Specific Configurations for Drupal 9](/guides/environment-configuration/environment-specific-config-d9)

- [Configuring Environment Indicators](/guides/environment-configuration/environment-indicator)

- [WordPress Security](/guides/wordpress-pantheon/wp-security)
