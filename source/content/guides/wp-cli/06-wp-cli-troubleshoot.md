---
title: WP-CLI On The Pantheon Platform
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

This section provides solutions for common WP-CLI troubleshooting scenarios.

### Terminus WP-CLI Silent Failure

The following silent failure occurs when executing `terminus remote:wp` commands on environments that use redirect logic without checking to see if WordPress is running via the command line:

```bash
[notice] Command: $site.$env -- 'wp <command>' [Exit: 0]
```

Redirects kill the PHP process before WP-CLI is executed. You can resolve this error by adding `php_sapi_name() != "cli"` as a conditional statement to all redirect logic within `wp-config.php`:

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