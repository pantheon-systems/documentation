---
title: WordPress (composer managed) upstream 1.32.4 update now available
published_date: "2025-02-10"
categories: [wordpress, action-required]
---

The 1.32.4 update is now available for the [WordPress (composer managed)](/guides/wordpress-composer/wordpress-composer-managed) upstream. This release adds handling for situations when the `index.php` file in the `web/` directory is missing or removed. A new check has been added that runs on each `composer install` (which runs on code sync) that verifies the `web/index.php` file exists. If it does not, the file is re-created. This prevents an issue where a site would fail to load if that file was missing.

For more details, refer to the [WordPress (Composer Managed) changelog](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/CHANGELOG.md).

## Action required

To benefit from these updates and ensure your site is using the most current version, apply the update to your WordPress (composer managed) site or custom upstream.
