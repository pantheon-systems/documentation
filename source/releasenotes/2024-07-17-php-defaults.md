---
title: New default PHP version 8.2 for Pantheon upstreams
published_date: "2024-07-19"
categories: [infrastructure, wordpress, drupal, action-required]
---
Pantheon has updated the default PHP version for WordPress, Drupal 7, and Drupal Composer Managed upstreams to PHP 8.2, replacing the previous default of PHP 8.1.

Please note that PHP 8.1 is now only receiving security support and will reach its End of Life in December 2025.

If you maintain a [custom upstream](/guides/custom-upstream), this change will not be reflected in `pantheon.upstream.yml` unless you [update your fork from Pantheon's upstream](https://docs.pantheon.io/guides/custom-upstream/create-custom-upstream#pull-in-core-from-pantheons-upstream).

We recommend thoroughly testing this core update before deploying it to the Live environment. If your site requires an older version of PHP or if you wish to upgrade to PHP 8.3, please refer to [Pantheon’s documentation on how to manage PHP versions via the pantheon.yml configuration file](/guides/php/php-versions).
