---
title: WP-CLI on the Pantheon Platform
subtitle: Troubleshoot WP-CLI
description: Review solutions to common troubleshooting scenarios for WP-CLI.
contenttype: [guide]
innav: [false]
categories: [cli, troubleshooting]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [wp-cli, cli]
showtoc: true
permalink: docs/guides/wp-cli/wp-cli-troubleshoot
---

This section provides solutions to common WP-CLI troubleshooting scenarios.

## Terminus WP-CLI Silent Failure

The silent failure shown below occurs when executing `terminus remote:wp` commands on environments that use redirect logic without checking to confirm that WordPress is running via the command line:

```bash
[notice] Command: $site.$env -- 'wp <command>' [Exit: 0]
```

Redirects cancel the PHP process before WP-CLI is executed.

Add `php_sapi_name() != "cli"` as a conditional statement to all redirect logic within `wp-config.php` to resolve this error:

```php:title=wp-config.php
// Require HTTPS, www.
if (isset($_ENV['PANTHEON_ENVIRONMENT']) &&
  ($_ENV['PANTHEON_ENVIRONMENT'] === 'live') &&
  // Check if Drupal or WordPress is running via command line
  (php_sapi_name() != "cli")) {
  if ($_SERVER['HTTP_HOST'] != 'www.yoursite.com' ||
      !isset($_SERVER['HTTP_USER_AGENT_HTTPS']) ||
      $_SERVER['HTTP_USER_AGENT_HTTPS'] != 'ON' ) {
    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://www.yoursite.com'. $_SERVER['REQUEST_URI']);
    exit();
  }
}
```

## Request to a Remote API Does Not Return Expected Response

The PHP 5.5 default is `&` and the PHP 5.3 default is `&amp;`.

If the API expects `&` as an argument separator but receives `&amp;` (for example, when using `http_build_query`), you can override the default `arg_separator.output` value by adding the following line to `wp-config.php`:

```php:title=wp-config.php
ini_set('arg_separator.output', '&');
```

## Actions and Filters in `wp-config.php`

Actions or filters that require CLI tools like WP-CLI might fail from `wp-config.php`, because the functions required are not yet accessible. Put these directives in an [MU Plugin](/guides/wordpress-configurations/mu-plugin) to resolve this issue.

## Changes to WP-CLI on the Platform (January 15th 2024)

<Alert title="Summary of changes"  type="info" >
When using WP-CLI, the order of display for PHP errors and output is changing. This will affect CI/CD scripts that are specifically expecting to read and parse PHP errors as part of the output of a WP-CLI command. This is not a standard configuration and should not affect the majority of scripts.
</Alert>

### Before January 15th 2024
When using WP-CLI in a non-live environment, errors are included in the standard output (`stdout`) part of the response. When used over Terminus, errors are printed before the command output. This example shows the current state with any notice or warning displayed before the command output of `wp_`.
```bash
$ terminus wp <site>.<env> -- config get table_prefix

Notice: A Notice. in phar:///opt/pantheon/wpcli/wp-cli-2.8.1.phar/vendor/wp-cli/config-command/src/Config_Command.php(444) : eval()'d code on line 78

Warning: A Warning. in phar:///opt/pantheon/wpcli/wp-cli-2.8.1.phar/vendor/wp-cli/config-command/src/Config_Command.php(444) : eval()'d code on line 79
wp_
 [notice] Command: <site>.<env> -- wp config get table_prefix [Exit: 0]
```

This makes it difficult to have a script that relies on capturing the value of a given command (i.e. `config get` or `plugin list`), as the errors also end up captured.
```bash
$ PREFIX=$(terminus remote:wp <site>.<env> -- config get table_prefix)
 [notice] Command: <site>.<env> -- wp config get table_prefix [Exit: 0]
$ echo $PREFIX

Notice: A Notice. in phar:///opt/pantheon/wpcli/wp-cli-2.8.1.phar/vendor/wp-cli/config-command/src/Config_Command.php(444) : eval()'d code on line 78

Warning: A Warning. in phar:///opt/pantheon/wpcli/wp-cli-2.8.1.phar/vendor/wp-cli/config-command/src/Config_Command.php(444) : eval()'d code on line 79
wp_
```

### Starting January 15th 2024
When running WP-CLI, `display_errors` will be changed to standard error (`stderr`) in `php.ini`, so that errors can be handled separately from the actual command output. Three changes are notable here:

#### Errors go to stderr
With errors going to `stderr`, it is now possible to use the output of a WP-CLI command with no extra steps.
```bash
$ PREFIX=$(terminus remote:wp <site>.<env> -- config get table_prefix)
Notice: A Notice. in phar:///opt/pantheon/wpcli/wp-cli-2.8.1.phar/vendor/wp-cli/config-command/src/Config_Command.php(444) : eval()'d code on line 78
Warning: A Warning. in phar:///opt/pantheon/wpcli/wp-cli-2.8.1.phar/vendor/wp-cli/config-command/src/Config_Command.php(444) : eval()'d code on line 79
 [notice] Command: <site>.<env> -- wp config get table_prefix [Exit: 0]
$ echo $PREFIX
wp_
```

#### PHP errors will display in WP-CLI output
WP-CLI's error handling has been updated to direct PHP errors to `stderr` during CLI interactions across all environments. This change means that previously hidden notices or warnings from the Live environment are now visible in WP-CLI outputs. However, this update does not affect regular web requests and user interactions with the site, where these errors will continue to remain hidden.

#### Terminus now displays error messages after the command output
Because of Terminus’ specific handling of `stdout` and `stderr`, PHP errors now display after the command output instead of before.
```bash
$ terminus remote:wp <site>.<env> -- config get table_prefix
wp_
Notice: A Notice. in phar:///opt/pantheon/wpcli/wp-cli-2.8.1.phar/vendor/wp-cli/config-command/src/Config_Command.php(444) : eval()'d code on line 78
Warning: A Warning. in phar:///opt/pantheon/wpcli/wp-cli-2.8.1.phar/vendor/wp-cli/config-command/src/Config_Command.php(444) : eval()'d code on line 79
 [notice] Command: <site>.<env> -- wp config get table_prefix [Exit: 0]
```

## More Resources

- [Configure Your wp-config.php File](/guides/php/wp-config-php)
- [WordPress and PHP Sessions](/guides/php/wordpress-sessions)
