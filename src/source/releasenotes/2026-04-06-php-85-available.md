---
title: "PHP 8.5 now available on the platform"
published_date: "2026-04-06"
categories: [infrastructure, new-feature]
---
[PHP 8.5](https://www.php.net/releases/8.5/en.php) is now available on the Pantheon platform. You can set PHP 8.5 as the version to use for your site via [your `pantheon.yml` file](/pantheon-yml#php-version).

Key changes in PHP 8.5:

- **OPcache is now built into PHP core** and no longer requires a separate extension package.
- **Pipe operator (`|>`)** for improved function chaining.
- **`curl_close()` and `imagedestroy()` are deprecated** but remain functional. These will emit deprecation notices but do not affect site behavior.

For more information on supported PHP versions and how to upgrade, refer to [PHP on Pantheon](/guides/php).
