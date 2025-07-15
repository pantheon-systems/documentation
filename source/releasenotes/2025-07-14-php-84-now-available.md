---
title: PHP 8.4 now available via PHP Runtime Generation 2
published_date: "2025-07-14"
categories: [infrastructure, new-feature]
---

Support for PHP 8.4 is now available on the platform with the new [PHP Runtime Generation 2](/php-runtime-generation-2). [PHP 8.4](https://www.php.net/releases/8.4/en.php) is the latest version of the server-side language powering Drupal and WordPress.

## CMS support

PHP 8.4 is recommended for sites running Drupal 10.4+ or 11.1+. [See the Drupal PHP requirements documentation for more details](https://www.drupal.org/docs/getting-started/system-requirements/php-requirements). 

WordPress 6.7+ only has "beta support" for PHP 8.4, therefore Pantheon does not recommend using WordPress in a production environment with this PHP version yet.

Pantheon [currently recommends](/guides/php#supported-php-versions) at least PHP 8.2 for all production sites.

## New features

PHP 8.4 is not expected to bring new performance gains for sites. But for developers looking to take advantage of the latest PHP functionalities, a few new updates are notable:

* **Property Hooks:** Introduces support for computed properties, allowing for pre/post-processing of values.
* **Asymmetric Visibility:** Provides independent control over property read/write scope.
* **Enhanced DOM API:** Adds new classes for HTML5 parsing.
* **New Array Functions:** Introduces `array_find()`, `array_find_key()`, `array_any()`, and `array_all()`.
* **PDO Driver Subclasses:** `PDO` now includes driver-specific subclasses.
* **Updated JIT:** Includes a new implementation of the Just-In-Time compiler.
* **Expanded String Functions:** New `mb_trim()`, `mb_ltrim()`, `mb_rtrim()`, `mb_ucfirst()`, and `mb_lcfirst()` functions.

[See the PHP 8.4 release announcement from php.net for full details.](https://www.php.net/releases/8.4/en.php)

## How to upgrade

PHP 8.4 is only available with the new [PHP Runtime Generation 2](/php-runtime-generation-2). To upgrade your site, set the following in your `pantheon.yml` file:

   ```yaml:title=pantheon.yml
   php_runtime_generation: 2
   php_version: 8.4 
   ```