---
title: Configuring wp-config.php
description: Understand how to adjust and customize the WordPress configuration file for your Pantheon WordPress site.
tags: [variables]
categories: [wordpress]
contributors: masonjames
---
## Overview

WordPress configuration is set in wp-config.php, located within your WordPress site root. When you install a WordPress site, we automatically include this file for you with all the boilerplate you need to get started. Most users will not need to customize this file.

Pantheon uses environment variables to automatically supply configuration settings (e.g. Database credentials) dynamically to wp-config.php - no editing required. However, you are welcome to customize wp-config.php with any customizations you may need for plugins, themes, and caching.

<div class="alert alert-danger" role="alert"><h4 class="info">Warning</h4>
<p markdown="1">You should NEVER put the database connection information for a Pantheon database within your `wp-config.php`. These credentials will change. If you are having connection errors, please ensure you are running the latest version of WordPress core and have the correct `wp-config.php` file for Pantheon.</p>
</div>

## Local Database Configuration for Development

If you are also developing locally and need to configure WordPress for your desktop environment, we recommend you create a wp-config-local.php file. This will be ignored by Pantheon and should not be tracked by version control by default since it's in the .gitignore file.

## Pantheon's WordPress Config

<div class="panel panel-drop panel-guide" id="accordion">
<div class="panel-heading panel-drop-heading">
<a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#pantheon-wp-config-php">
<h3 class="info panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-wrench"></span>View Pantheon's WordPress Configuration</h3>
</a>
</div>
<div id="pantheon-wp-config-php" class="collapse" markdown="1" style="padding:10px;">

<script src="//gist-it.appspot.com/https://github.com/pantheon-systems/wordpress/blob/master/wp-config.php?footer=minimal"></script>
</div>
</div>

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4><p><code>$_SERVER['SERVER_NAME']</code> should <strong>not</strong> be used to set <code>WP_HOME</code> and/or <code>WP_SITEURL</code>. For more information, see <a href="/docs/server_name-and-server_port/">SERVER_NAME and SERVER_PORT on Pantheon</a>.</p></div>



##Frequently Asked Questions

### How can I write logic based on the Pantheon server environment?

Depending on your use case, there are two possibilities:

1. For web only actions, like [redirects](/docs/domains/#primary-domain), check if `$_ENV['PANTHEON_ENVIRONMENT']` exists. If it does, it will contain a string with the current environment (Dev, Test, or Live):

 ```php
 // Pantheon - web only.
 if (isset($_SERVER['PANTHEON_ENVIRONMENT'])) {
      // Only on dev web environment.
      if ($_SERVER['PANTHEON_ENVIRONMENT'] == 'dev') {
       // Custom code.
      }
 }
 ```

2. For actions that should take place on both web requests _and_ wp-cli commands (e.g. Redis cache configuration), use the constant `PANTHEON_ENVIRONMENT`. Again, it will contain Dev, Test, or Live:

 ```php
 // Pantheon - all (web and CLI) operations.
 if (defined('PANTHEON_ENVIRONMENT')) {
      // Only on dev environment.
      if (PANTHEON_ENVIRONMENT == 'dev') {
        // Custom code.
      }
 }
 ```

The following example shows how to hard-code your WordPress debug configuration based on the environment. To learn more, see [Defining variables in a wp-config.php](https://codex.wordpress.org/Editing_wp-config.php){.external}:

```php
// All Pantheon Environments.
if (defined('PANTHEON_ENVIRONMENT')) {
  //WordPress debug settings in development environments.
  if (!in_array(PANTHEON_ENVIRONMENT, array('test', 'live'))) {
    // Debugging enabled.
    if (!defined( 'WP_DEBUG' )) {
    define( 'WP_DEBUG', true );
    }
    define( 'WP_DEBUG_LOG', true );
    ini_set( 'error_log', WP_CONTENT_DIR . '/uploads/debug.log' ); // Moves the log file to a location writable while in git mode.
    define( 'WP_DEBUG_DISPLAY', true );
  }
  // WordPress debug settings in test and live environments.
  else {
    // Debugging disabled.
    ini_set('log_errors','On');
    ini_set('display_errors','Off');
    ini_set('error_reporting', E_ALL );
    define('WP_DEBUG', false);
    define('WP_DEBUG_LOG', true);
    define('WP_DEBUG_DISPLAY', false);
  }
}
```

### How can I read the Pantheon environmental configuration, like database credentials?

See [Reading the Pantheon Environment Configuration](/docs/read-environment-config/).

### How do I perform redirection?

See [Configure Redirects](/docs/redirects/).

### How do I change the default debug.log location?

WordPress has an option to <a href="/docs/logs/#how-do-i-enable-error-logging-for-wordpress" data-proofer-ignore>write logging information to a file</a>. When enabled, the file is located in the `/wp-content` folder, which is not writable on all environments in Pantheon. You can change the location of this file to the uploads folder by adding the following to `wp-config.php`:

```php
ini_set( 'error_log', WP_CONTENT_DIR . '/uploads/debug.log' );
```

### Where do I specify database credentials?

You don't have to! Pantheon automatically injects database credentials into the site environment; if you hard code database credentials, you will break the Pantheon workflow.

### Where can I get a copy of a default wp-config.php for Pantheon?

- [Pantheon WordPress](https://github.com/pantheon-systems/WordPress/blob/master/wp-config.php){.external}
- [WordPress Core](https://github.com/WordPress/WordPress/blob/master/wp-config-sample.php){.external}

### How do I enable IonCube Decoder support?

If you are using a licensed plugin that requires IonCube Decoder support, first ensure you are running [PHP 7.1](/docs/php-versions/) or later. Then, enable IonCube Decoder support site-wide by adding a single line to `wp-config.php`:

```php
ini_set('ioncube.loader.encoded_paths', '/');
```

*(More information can be found in our [PHP 7.1 & IonCube Decoder Now Available for All Sites on Pantheon](https://pantheon.io/blog/php-71-ioncube-decoder-now-available-all-sites-pantheon) blog post.)*

## Troubleshooting
### Request to a Remote API Does Not Return Expected Response

The PHP 5.5 default is `&` and the PHP 5.3 default is `&amp;`.

If the API expects `&` as an argument separator but receives `&amp;` (for example, when using http_build_query), you can override the default arg_separator.ouput value by adding the following line to `wp-config.php`:

```ini_set('arg_separator.output', '&');```
