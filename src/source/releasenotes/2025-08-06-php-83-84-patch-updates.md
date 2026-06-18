---
title: "PHP 8.3 and 8.4 updated to their latest patch releases"
published_date: "2025-08-06"
categories: [infrastructure, security]
---
PHP versions [8.3.24](https://www.php.net/ChangeLog-8.php#8.3.24) and [8.4.11](https://www.php.net/ChangeLog-8.php#8.4.11), and  are now available on the platform. These updates brings the latest bug fixes and enhancements, improving performance and security for your sites. Updates will be applied automatically over the next few days, so no manual action is required.

PHP 8.4 is only available with the new [PHP Runtime Generation 2](/php-runtime-generation-2). To upgrade your site, set the following in your `pantheon.yml` file:

   ```yaml:title=pantheon.yml
   php_version: 8.4 
   ```

The PHP 8.4 upgrade process automatically includes an upgrade to PHP Runtime Generation 2.

**Important PHP version information**

* PHP 8.1 and 8.2 are currently receiving security-only updates.
* For more details, see the full list of [PHP supported versions](https://www.php.net/supported-versions.php).

For the best performance and security, Pantheon recommends running PHP 8.2 and above.
