---
title: "PHP 8.3 is now recommended on Pantheon"
published_date: "2024-04-24"
categories: [infrastructure]
---

Following our announcement of the New Relic PHP agent update on the platform, we are [now recommending PHP 8.3](/guides/php) for WordPress & Drupal applications on the platform. PHP 8.1 and 8.2 are still marked as "recommended" as well because it is common for plugins and modules in the ecosystem of still have incompatibilities or other issues with newer versions of PHP.

Try out your site with a newer version of PHP by [updating your pantheon.yml file](/guides/php/php-versions#configure-your-php-version) in a Dev or [Multidev](/guides/multidev) environment. Depending on your application's usage of modules/plugins, you may want to wait for full compatibility of your software before upgrading to PHP 8.3. By spinning up a Multidev and testing your site with PHP 8.3, you can determine if your site is ready for the upgrade.

Drupal added support for [PHP 8.3](https://www.php.net/releases/8.3/en.php) with version 10.2. Drupal 11.0 also supports PHP 8.3. [See the full Drupal PHP compatibility chart](https://www.drupal.org/docs/getting-started/system-requirements/php-requirements). 

WordPress added "beta support" for PHP 8.3 with WordPress 6.4. [See the full WordPress PHP compatibility chart](https://make.wordpress.org/core/handbook/references/php-compatibility-and-wordpress-versions/).