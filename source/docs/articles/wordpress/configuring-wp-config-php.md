---
title: Configuring wp-config.php
description: Understand how to adjust and customize the WordPress configuration file for your Pantheon WordPress site.
category:
  - developing
keywords: wordpress, wp config, database
---
## Overview

WordPress configuration is set in wp-config.php, located within your WordPress site root. When you install a WordPress site, we automatically include this file for you with all the boilerplate you need to get started. Most users will not need to customize this file.

Pantheon uses environment variables to automatically supply configuration settings (e.g. Database credentials) dynamically to wp-config.php - no editing required. However, you are welcome to customize wp-config.php with any customizations you may need for plugins, themes, and caching.

<div class="alert alert-danger" role="alert"><h4>Warning</h4>
You should NEVER put the database connection information for a Pantheon database within your wp-config.php. These credentials will change. If you are having connection errors, please ensure you are running the latest version of WordPress core and have the correct wp-config.php file for Pantheon.</div>

## Local Database Configuration for Development

If you are also developing locally and need to configure WordPress for your desktop environment, we recommend you create a wp-config-local.php file. This will be ignored by Pantheon and should not be tracked by version control by default since it's in the .gitignore file.

## Pantheon's WordPress Config

<script src="//gist-it.appspot.com/https://github.com/pantheon-systems/wordpress/blob/master/wp-config.php?footer=minimal"></script>
<div class="alert alert-info" role="alert">
<h4>Note</h4>
<code>$_SERVER['SERVER_NAME']</code> should <strong>not</strong> be used to set <code>WP_HOME</code> and/or <code>WP_SITEURL</code>. For more information, see <a href="/docs/articles/sites/code/server_name-and-server_port/">SERVER_NAME and SERVER_PORT on Pantheon</a>.</div>  

##Frequently Asked Questions

#### How can I write logic based on the Pantheon server environment?

Depending on your use case, there are two possibilities.

For web only actions, like [redirects](/docs/articles/sites/code/redirect-incoming-requests), check for the existence of `$\_SERVER['PANTHEON\_ENVIRONMENT']`. If it exists, it will contain a string with the current environment (Dev, Test, or Live).

<script src="//gist-it.appspot.com/https://github.com/pantheon-systems/pantheon-settings-examples/blob/master/%24_SERVER-environment?footer=minimal"></script>

For actions that should take place on both web requests _and_ wp-cli commands (e,g, Redis cache configuration), use the constant ​`PANTHEON\_ENVIRONMENT`. Again, it will contain Dev, Test, or Live.

<script src="//gist-it.appspot.com/https://github.com/pantheon-systems/pantheon-settings-examples/blob/master/web-cli-environment?footer=minimal"></script>

As an example, here's how you can hard-code your WordPress debug configuration based on the environment. To learn more, see [Defining variables in a wp-config.php](http://codex.wordpress.org/Editing_wp-config.php).

<script src="//gist-it.appspot.com/https://github.com/pantheon-systems/pantheon-settings-examples/blob/master/wordpress/wp-debug-expanded.wp-config.php?footer=minimal"></script>
#### How can I read the Pantheon environmental configuration, like database credentials?

See [Reading the Pantheon Environment Configuration](/docs/articles/sites/code/reading-pantheon-environment-configuration/).

#### How do I perform redirection?

See [Redirect Incoming Requests](/docs/articles/sites/code/redirect-incoming-requests).

#### Where do I specify database credentials?

You don't have to! Pantheon automatically injects database credentials into the site environment; if you hard code database credentials, you will break the Pantheon workflow.

#### Where can I get a copy of a default `wp-config.php` for Pantheon?

- Pantheon WordPress -  [https://github.com/wp-ulysses/WordPress/blob/master/wp-config.php](https://github.com/wp-ulysses/WordPress/blob/master/wp-config.php)
- WordPress Core -   [https://github.com/WordPress/WordPress/blob/master/wp-config-sample.php](https://github.com/WordPress/WordPress/blob/master/wp-config-sample.php)

####Where can I find examples of Pantheon wp-config.php?
You can view examples at the [pantheon-settings-examples repo](https://github.com/pantheon-systems/pantheon-settings-examples/tree/master/wordpress).

## Troubleshooting
#### Request to a Remote API Does Not Return Expected Response

The PHP 5.5 default is `&` and the PHP 5.3 default is `&amp;`.

If the API expects `&` as an argument separator but receives `&amp;` (for example, when using http_build_query), you can override the default arg_separator.ouput value by adding the following line to `wp-config.php`:

```ini_set('arg_separator.output', '&');```
