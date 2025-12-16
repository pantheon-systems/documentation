---
contenttype: [partial]
categories: [dependencies]
cms: [drupal, drupal8, drupal9]
product: [--]
integration: [--]
tags: [--]
reviewed: "2022-11-04"
---

You must confirm that your site is compatible with the latest version of Drupal before you change the Drupal core version.
 
Review the steps below to confirm compatibility for your site's components.

1. Update to the latest version of MariaDB in all environments.

1. Use [Upgrade Status](https://www.drupal.org/project/upgrade_status) to check the compatibility of all contributed modules and themes.

1. [Convert your site to Composer](/guides/composer-convert) if you plan to use the [Upgrade Status module](https://www.drupal.org/project/upgrade_status/) to assist in your upgrade.

1. Update all contributed projects and verify that they are compatible with the latest version of Drupal.

1. Update your custom code to make it compatible with the latest version of Drupal.

1. Update your core codebase to the latest version of Drupal.

1. Run `update.php` to update your PHP version.

You can find step-by-step instructions on the above items in [Drupal's Upgrade](https://www.drupal.org/docs/upgrading-drupal) documentation.