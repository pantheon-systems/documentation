---
title: "New default PHP version 8.3 for WordPress upstreams"
published_date: "2026-10-02"
published_at: "2026-10-02T14:00:00Z"
categories: [infrastructure, wordpress, action-required]
description: "The default PHP version for Pantheon's WordPress upstreams is now PHP 8.3, replacing PHP 8.2."
---
Pantheon has updated the default PHP version for the WordPress and WordPress (composer managed) upstreams to PHP 8.3, replacing the previous default of PHP 8.2.

New sites created from these upstreams use PHP 8.3. Existing sites that do not set `php_version` in their own `pantheon.yml` move to PHP 8.3 when they apply this upstream update.

## Action required

Test the update before you deploy it to the Live environment. Apply it in Dev or a Multidev environment, confirm your plugins and theme work on PHP 8.3, then promote it.

If your site needs to stay on PHP 8.2, pin the version by setting `php_version: 8.2` in your site's `pantheon.yml` before you apply the update. For steps, see [Manage PHP Versions](/guides/php/php-versions).

If you maintain a [custom upstream](/guides/custom-upstream), this change is not reflected in your `pantheon.upstream.yml` unless you [update your fork from Pantheon's upstream](https://docs.pantheon.io/guides/custom-upstream/create-custom-upstream#pull-in-core-from-pantheons-upstream).
