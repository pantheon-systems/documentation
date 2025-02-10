---
title: WordPress (composer managed) upstream 1.32.5 update now available
published_date: "2025-02-10"
categories: [wordpress, action-required]
---

The 1.32.5 update is now available for the [WordPress (composer managed)](/guides/wordpress-composer/wordpress-composer-managed) upstream. This quick follow-on release to [1.32.4](/release-notes/2025/02/wordpress-composer-managed-1-32-4) extends the previous update that added handling for the `index.php` file in the `web/` directory on `composer install` actions to `composer update` as well. Previously, the Composer script `maybe-install-symlinks` was only run on `composer install` (Git push). Applying upstream updates would not run this script, which could lead to files being missing from the `web/` directory and resulting in your site failing to load.

The 1.32.5 update applies a change to your `composer.json` file that adds this Composer script to the `post-update-cmd` Composer hook, ensuring that it runs on all Composer actions (`install` and `update`).

For more details, refer to the [WordPress (Composer Managed) changelog](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/CHANGELOG.md).

## Action required

To benefit from these updates and ensure your site is using the most current version, apply the update to your WordPress (composer managed) site or custom upstream.
