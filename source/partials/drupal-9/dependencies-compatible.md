---
contenttype: partial
categories: [--]
newcms: [drupal, drupal8, drupal9]
product: [--]
integration: [--]
tags: [--]
reviewed: "2022-11-04"
---

You must confirm that your site is Drupal 9 compatible before you change the Drupal core version to Drupal 9.
 
Review the steps below to confirm Drupal 9 compatibility for your site's components.

1. Optional. [Convert your site to Composer](/guides/composer-convert) if you plan to use the [Upgrade Status module](https://www.drupal.org/project/upgrade_status/) to assist in your upgrade.

1. Verify that your hosting environment meets Drupal 9 platform requirements.

1. Update to Drupal 8.x-3.15 or higher.

1. Update all contributed projects and verify that they are Drupal 9 compatible.

1. Update your custom code to make it Drupal 9 compatible.

1. Update your core codebase to Drupal 9.

1. Run `update.php` to update your PHP version.

You can find step-by-step instructions on the above items in [Drupal's upgrade from Drupal 8](https://www.drupal.org/docs/upgrading-drupal/drupal-8-and-higher) documentation.