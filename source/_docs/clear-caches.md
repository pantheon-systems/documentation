---
title: Clearing Caches for Drupal and WordPress
description: Learn how to purge Varnish for Drupal and WordPress sites on Pantheon.
tags: [cacheapp]
categories: []
---
Pantheon extends the core functionality of caching mechanisms within WordPress and Drupal so that caches are cleared within the site's frame and along our edge caching layer, Varnish.

## Clear Caches: Drupal
Drupal 6/7 sites must enable the [pantheon_api](/docs/pantheon_api-module/) module to send clear cache requests to Varnish within Drupal's Admin interface. Drupal 8 sites must clear Varnish via the Pantheon Dashboard.

- From Drupal: `/admin/config/devel/performance` and click **Clear all Caches**
- Via [Terminus](/docs/terminus/): `terminus drush <site>.<env> -- cc all`
- From the Pantheon Dashboard on the target environment: Click **Clear Caches**

## Clear Caches: WordPress
- From the WordPress Admin menu, select **Settings > Pantheon Cache**. Click **Clear Cache** to clear all the caches.
- Via the command line, run the following Terminus command:

 ```bash
 $ terminus site clear-cache
 ```
- From the Pantheon Dashboard: Click **Clear Caches**.

## Troubleshooting
### Clear Cache Fails in Dashboard or Terminus
If you see a notification on the Dashboard indicating a failure to clear cache, this is usually due to a PHP error, redirect, or other code-related issue. While the Dashboard notification may not help much to debug, running the same command via Terminus will likely provide actionable information (`terminus env:clear-cache`). Commenting out redirections in settings.php, wp-config.php, or elsewhere can isolate issues as well as resolving any fatal PHP errors.
