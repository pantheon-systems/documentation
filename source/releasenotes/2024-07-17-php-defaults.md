---
title: New PHP Defaults
published_date: "2024-07-17"
categories: [infrastructure, wordpress, drupal, action-required]
---
Pantheon has pushed an update to the WordPress, Drupal 7, and Drupal Composer Managed upstreams which sets PHP 8.2 as the default PHP version, rather than 8.1.

PHP 8.1 currently only receives security support, and will reach End of Life in December 2025.

If you maintain a [custom upstream](/guides/custom-upstream), this change will not be reflected in `pantheon.upstream.yml` unless you [update your fork from Pantheon's upstream](https://docs.pantheon.io/guides/custom-upstream/create-custom-upstream#pull-in-core-from-pantheons-upstream).

Please test this core update thoroughly before deploying to the Live environment. If your site requires an older version of PHP, or if you'd like to upgrade to PHP 8.3, see [Pantheon’s documentation on how to manage PHP versions via the pantheon.yml configuration file](/guides/php/php-versions).
