---
title: Configuring wp-config.php
description: Understand how to adjust and customize the WordPress configuration file for your Pantheon WordPress site.
cms: "WordPress"
categories: [develop]
tags: [wp-config]
contributors: [masonjames]
reviewed: "2020-08-07"
---

## Overview

WordPress configuration is set in `wp-config.php`, located within your WordPress site root. When you install a WordPress site, Pantheon automatically includes this file for you with all you need to get started. 

Most users do not need to customize this file. However, you are welcome to customize `wp-config.php` with any customizations you may need for plugins, themes, and caching.

Two additional config files are referenced in `wp-config.php`: an optional `wp-config-local.php` for local development settings, based on the example `wp-config-local-sample.php` found in your WordPress site root, and `wp-config-pantheon.php` for dynamically-supplied platform configuration settings (such as database credentials). 

<Alert title="Warning" type="danger">

Never put the database connection information for a Pantheon database within your `wp-config.php`. These credentials will change.

If you experience connection errors, ensure that you are running the latest version of WordPress core and have the correct `wp-config.php` file for Pantheon.

</Alert>

## Pantheon's WordPress Config

<Accordion title="View Pantheon's WordPress Configuration" id="pantheon-wp-config-php" icon="wrench">

You can also find this file on [GitHub](https://github.com/pantheon-systems/WordPress/blob/default/wp-config.php).

GITHUB-EMBED https://github.com/pantheon-systems/WordPress/blob/default/wp-config.php php GITHUB-EMBED

</Accordion>

<Alert title="Note" type="info">

`$_SERVER['SERVER_NAME']` should *not* be used to set `WP_HOME` or `WP_SITEURL`. For more information, see [SERVER_NAME and SERVER_PORT on Pantheon](/server_name-and-server_port).

</Alert>

## Pantheon Platform Settings in wp-config-pantheon.php

In order to get the latest WordPress upstream updates while avoiding merge conflicts, Pantheon includes `wp-config-pantheon.php`.

If you don’t see `wp-config-pantheon.php` in your [WP code directory](/code#wordpress-code-structure), apply the latest upstream updates as shown in [WordPress and Drupal Core Updates](/core-updates).

Do not edit `wp-config-pantheon.php`. It includes database and environment configuration settings that the platform uses and that Pantheon maintains.

## Environment-specific Configuration

### Write Logic Based on the Pantheon Server Environment

Depending on your use case, there are two possibilities:

- For web only actions, like [redirects](/domains#primary-domain), check if `$_ENV['PANTHEON_ENVIRONMENT']` exists. If it does, it will contain a string with the current environment (Dev, Test, or Live):

 ```php:title=wp-config.php
 // Pantheon - web only.
 if (isset($_SERVER['PANTHEON_ENVIRONMENT'])) {
      // Only on dev web environment.
      if ($_SERVER['PANTHEON_ENVIRONMENT'] == 'dev') {
       // Custom code.
      }
 }
 ```

- For actions that should take place on both web requests _and_ wp-cli commands (e.g. Redis cache configuration), use the constant `PANTHEON_ENVIRONMENT`. Again, it will contain Dev, Test, or Live:

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

The Pantheon WordPress upstream includes a sample configuration file for [local development](/local-development).

If you are developing locally and need to configure WordPress for your desktop environment, make a copy of `wp-config-local-sample.php` called `wp-config-local.php`. This file is listed in the `.gitignore` file and will not be tracked by version control by default.

To make local development easier, when WordPress detects `wp-config-local.php`, WordPress uses the configuration in that file instead of the settings in `wp-config.php`.

## Frequently Asked Questions

### How do I enable debugging?

The following example shows how to hard-code your WordPress debug configuration based on the environment. To learn more, see [Advanced Options for wp-config.php](https://wordpress.org/support/article/editing-wp-config-php/#advanced-options):

<Partial file="wp-debugging.md" />

### How can I read the Pantheon environment configuration, like database credentials?

See [Reading the Pantheon Environment Configuration](/read-environment-config).

### How do I perform redirection?

See [Configure Redirects](/redirects).

### How do I change the default debug.log location?

WordPress has an option to [write logging information to a file](/logs/#how-do-i-enable-error-logging-for-wordpress). When enabled, the file is located in the `/wp-content` folder, which is not writable on all environments in Pantheon. You can change the location of this file to the uploads folder by adding the following to `wp-config.php`:

WP version 5.0.x and older versions:

```php:title=wp-config.php
ini_set( 'error_log', WP_CONTENT_DIR . '/uploads/debug.log' );
```

As of WP version 5.1 and newer:

```php:title=wp-config.php
define( 'WP_DEBUG_LOG', __DIR__ . '/wp-content/uploads/debug.log' );
```

### Where do I specify database credentials?

You don't have to! Pantheon automatically injects database credentials into the site environment; if you hard code database credentials, you will break the Pantheon workflow.

### Where can I get a copy of a default wp-config.php for Pantheon?

- [Pantheon WordPress](https://github.com/pantheon-systems/WordPress/blob/default/wp-config.php)
- [WordPress Core](https://github.com/WordPress/WordPress/blob/master/wp-config-sample.php)

### How do I enable ionCube Decoder support?

1. If you are using a licensed plugin that requires ionCube Decoder support, first ensure you are running [PHP 7.1](/php-versions). Please note later PHP versions do not currently support ionCube.

1. Enable ionCube Decoder support site-wide by adding this line to `wp-config.php`:

```php:title=wp-config.php
ini_set('ioncube.loader.encoded_paths', '/');
```

*(More information can be found in our [PHP 7.1 & ionCube Decoder Now Available for All Sites on Pantheon](https://pantheon.io/blog/php-71-ioncube-decoder-now-available-all-sites-pantheon) blog post.)*

### Can I increase the memory limit of my WordPress site?

By default, WordPress installations have a core PHP memory limit of 40MB for single sites and 64MB for site networks.
You can [increase this limit](https://wordpress.org/support/article/editing-wp-config-php/#increasing-memory-allocated-to-php) up to the limit of memory allocated for your [site plan](/site-plans-faq#plan-resources).

Example for Elite sites:
```php:title=wp-config.php
define( 'WP_MEMORY_LIMIT', '512M' );
```

## Troubleshooting

### Request to a Remote API Does Not Return Expected Response

The PHP 5.5 default is `&` and the PHP 5.3 default is `&amp;`.

If the API expects `&` as an argument separator but receives `&amp;` (for example, when using http_build_query), you can override the default arg_separator.output value by adding the following line to `wp-config.php`:

```php:title=wp-config.php
ini_set('arg_separator.output', '&');
```

### Actions and Filters in `wp-config.php`

Actions or filters that require CLI tools like WP-CLI may fail from `wp-config.php`, because the functions required are not yet accessible. To resolve, put these directives in an [MU Plugin](/mu-plugin).
