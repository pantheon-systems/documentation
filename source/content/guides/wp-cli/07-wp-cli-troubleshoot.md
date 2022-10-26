---
title: WP-CLI on the Pantheon Platform
subtitle: Troubleshoot WP-CLI
description: Review solutions to common troubleshooting scenarios for WP-CLI.
cms: "WordPress"
categories: [develop]
tags: [wp-cli, cli]
layout: guide
showtoc: true
permalink: docs/guides/wp-cli/wp-cli-troubleshoot
anchorid: wp-cli-troubleshoot
---

This section provides solutions to common WP-CLI troubleshooting scenarios.

## Terminus WP-CLI Silent Failure

The silent failure shown below occurs when executing `terminus remote:wp` commands on environments that use redirect logic without checking to confirm that WordPress is running via the command line:

```bash
[notice] Command: $site.$env -- 'wp <command>' [Exit: 0]
```

Redirects stop the PHP process before WP-CLI is executed.

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

Actions or filters that require CLI tools like WP-CLI might fail from `wp-config.php`, because the functions required are not yet accessible. Put these directives in an [MU Plugin](/mu-plugin) to resolve this issue.

## More Resources

- [Configure Your wp-config.php File](/guides/php/wp-config-php)
- [WordPress and PHP Sessions](/guides/php/wordpress-sessions)