---
title: PHP on Pantheon
subtitle: Configure Your wp-config.php File
description: Adjust and customize your WordPress configuration file on Pantheon.
cms: "WordPress"
categories: [develop]
tags: [wp-config]
contributors: [masonjames]
layout: guide
showtoc: true
permalink: docs/guides/php/wp-config-php
anchorid: wp-config-php
---

This section provides information on how to configure the `wp-config.php` file for a WordPress site. Refer to [Configure Your Settings.php File](/guides/php/settings-php) if you have a Drupal site.

## WordPress Configuration

WordPress configuration is set in `wp-config.php` in your WordPress site root. Pantheon automatically includes this file for you with all you need to get started when you install a WordPress site. 

Most users do not need to customize this file. However, you can customize the `wp-config.php` file with any customizations you need for plugins, themes, and caching.

Two additional config files are referenced in `wp-config.php`: 

- `wp-config-local.php`: this is an optional file for local development settings and is based on the example `wp-config-local-sample.php` found in your WordPress site root.

- `wp-config-pantheon.php`: this is for dynamically-supplied platform configuration settings (such as database credentials). 

<Alert title="Warning" type="danger">

Never put the database connection information for a Pantheon database within your `wp-config.php` file. These credentials will change.

Ensure that you are running the latest version of [WordPress core](/core-updates) and have the correct `wp-config.php` file for Pantheon if you experience connection errors. 

</Alert>

## Pantheon's WordPress Config

<Accordion title="View Pantheon's WordPress Configuration" id="pantheon-wp-config-php" icon="wrench">

You can also find this file on [GitHub](https://github.com/pantheon-systems/WordPress/blob/default/wp-config.php).

GITHUB-EMBED https://github.com/pantheon-systems/WordPress/blob/default/wp-config.php php GITHUB-EMBED

</Accordion>

<Alert title="Note" type="info">

`$_SERVER['SERVER_NAME']` should *not* be used to set `WP_HOME` or `WP_SITEURL`. Refer to [SERVER_NAME and SERVER_PORT on Pantheon](/server_name-and-server_port) for more information.

</Alert>

## Pantheon Platform Settings in wp-config-pantheon.php

Pantheon includes the `wp-config-pantheon.php` file to get the latest WordPress upstream updates while avoiding merge conflicts. 

Apply the latest upstream updates in [WordPress and Drupal Core Updates](/core-updates) if you don’t see the `wp-config-pantheon.php` file in your [WP code directory](/code#wordpress-code-structure). 

Do not edit the `wp-config-pantheon.php` file. It includes database and environment configuration settings that the platform uses and that Pantheon maintains.

## Environment-specific Configuration

### Write Logic Based on the Pantheon Server Environment

There are two options for writing logic based on Pantheon server environment:

- Check if `$_ENV['PANTHEON_ENVIRONMENT']` exists for web only actions, such as [redirects](/guides/domains). If it exists, it will contain a string with the current environment (Dev, Test, or Live):

 ```php:title=wp-config.php
 // Pantheon - web only.
 if (isset($_SERVER['PANTHEON_ENVIRONMENT'])) {
      // Only on dev web environment.
      if ($_SERVER['PANTHEON_ENVIRONMENT'] == 'dev') {
       // Custom code.
      }
 }
 ```

- Use the constant `PANTHEON_ENVIRONMENT` for actions that should take place on both web requests _and_ wp-cli commands (for example, Redis cache configuration). It will contain the current Dev, Test, or Live:

 ```php:title=wp-config.php
 // Pantheon - all (web and CLI) operations.
 if (defined('PANTHEON_ENVIRONMENT')) {
      // Only on dev environment.
      if (PANTHEON_ENVIRONMENT == 'dev') {
        // Custom code.
      }
 }
 ```

### Local Database Development Configuration in wp-config-local.php

The Pantheon WordPress upstream includes a sample configuration file for [local development](/guides/local-development).

Make a copy of the `wp-config-local-sample.php` file called `wp-config-local.php` if you are developing locally and need to configure WordPress for your desktop environment. This file is listed in the `.gitignore` file and will not be tracked by version control by default.

WordPress makes local development easier by using the configuration in the `wp-config-local.php` file instead of the settings in `wp-config.php` whenever `wp-config-local.php` is detected.

## Frequently Asked Questions

### How do I enable debugging?

The following example shows how to hard-code your WordPress debug configuration based on the environment. Refer to [Advanced Options for wp-config.php](https://wordpress.org/support/article/editing-wp-config-php/#advanced-options) for more information:

<Partial file="wp-debugging.md" />

### How can I read the Pantheon environment configuration, like database credentials?

Refer to [Reading the Pantheon Environment Configuration](/guides/environment-configuration/read-environment-config).

### How do I perform redirection?

Refer to [Configure Redirects](/guides/redirect).

### How do I change the default debug.log location?

WordPress has an option to [write logging information to a file](/guides/logs-pantheon/faq-logs#how-do-i-enable-error-logging-for-wordpress). When enabled, the file is located in the `/wp-content` folder, which is not writable on all environments in Pantheon. You can change the location of this file to the uploads folder by adding the following to your `wp-config.php` file:

WP version 5.0.x and older versions:

```php:title=wp-config.php
ini_set( 'error_log', WP_CONTENT_DIR . '/uploads/debug.log' );
```

As of WP version 5.1 and newer:

```php:title=wp-config.php
define( 'WP_DEBUG_LOG', __DIR__ . '/wp-content/uploads/debug.log' );
```

### Where do I specify database credentials?

You don't need to specify database credentials. Pantheon automatically injects database credentials into the site environment; if you hard code database credentials, you will break the Pantheon workflow.

### Where can I get a copy of a default wp-config.php for Pantheon?

- [Pantheon WordPress](https://github.com/pantheon-systems/WordPress/blob/default/wp-config.php)
- [WordPress Core](https://github.com/WordPress/WordPress/blob/master/wp-config-sample.php)

### How do I enable ionCube Decoder support?

1. Verify that you are running [PHP 7.1](/guides/php/php-versions) if you are using a licensed plugin that requires ionCube Decoder support. Please note that later PHP versions do not currently support ionCube.

1. Enable ionCube Decoder support site-wide by adding this line to `settings.php`:

  ```php:title=settings.php
  ini_set('ioncube.loader.encoded_paths', '/');
  ```

More information can be found in our [PHP 7.1 & ionCube Decoder Now Available for All Sites on Pantheon](https://pantheon.io/blog/php-71-ioncube-decoder-now-available-all-sites-pantheon) blog post.

### Can I increase the memory limit of my WordPress site?

WordPress installations have a core PHP memory limit of 40MB for single sites and 64MB for site networks by default. 
You can [increase this limit](https://wordpress.org/support/article/editing-wp-config-php/#increasing-memory-allocated-to-php) up to the limit of memory allocated for your [site plan](/guides/account-mgmt/plans/faq#plan-resources).

Example for Elite sites:
```php:title=wp-config.php
define( 'WP_MEMORY_LIMIT', '512M' );
```

## Troubleshooting

### Request to a Remote API Does Not Return Expected Response

The PHP 5.5 default is `&` and the PHP 5.3 default is `&amp;`.

If the API expects `&` as an argument separator but receives `&amp;` (for example, when using `http_build_query`), you can override the default `arg_separator.output` value by adding the following line to `wp-config.php`:

```php:title=wp-config.php
ini_set('arg_separator.output', '&');
```

### Actions and Filters in `wp-config.php`

Actions or filters that require CLI tools like WP-CLI might fail from `wp-config.php`, because the functions required are not yet accessible. Put these directives in an [MU Plugin](/guides/wordpress-configurations/mu-plugin) to resolve this issue.

## More Resources

- [WordPress PHP Requirements](https://wordpress.org/about/requirements/)

- [Object Cache](/guides/object-cache)

- [WordPress on Pantheon Quick Start Guide](/guides/wordpress-pantheon/)