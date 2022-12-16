---
title: Drupal 10
description: Your hub for all things Drupal 10.
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2022-10-18"
contenttype: [doc]
categories: [create, plan]
newcms: [drupal10]
audience: [development]
product: [composer]
integration: [--]
---

Drupal 10 is now available on the Pantheon platform. This page will be updated frequently with the latest information and instructions for Drupal 10 on Pantheon.

## Current Status of Drupal 10 at Pantheon

| Scenario | Status | Documentation |
|---|---|---|
| Create a Drupal 10 site on Pantheon | Available | [Create a Drupal 10 Site](/drupal-10#create-a-drupal-10-site)|
| Upgrade a Drupal 9 site to Drupal 10 manually | Available | [Upgrade from Drupal 9 to Drupal 10](/drupal-10#upgrade-a-drupal-9-site-to-drupal-10) |
| Create a Drupal 10 site from the Pantheon Dashboard | Planned availability January 2023 | |
| Upgrade a Drupal 9 site to Drupal 10 using the [Terminus Conversion Tools plugin](https://github.com/pantheon-systems/terminus-conversion-tools-plugin) | Early Access | Use the following command: `terminus conversion:upgrade-d10` |


## Update a Drupal 9 Site to Drupal 10

1. Go to your dashboard and confirm that you are on PHP 8.1. The PHP 8.1 update will show as available to install if you are not already on it.

   If you are not on PHP 8.1 and you don't see the update, refer to [Upgrade PHP Versions](https://pantheon.io/docs/guides/php/php-versions) for instructions on updating your PHP version.

1. Run [Drupal's Upgrade Status](https://www.drupal.org/project/upgrade_status).

1. Use [Composer to update](/guides/upgrade-drupal-8-ic-to-drupal-9#set-drupal-core-version) to Drupal 10. Refer to the [Drupal release-specific documentation](https://www.drupal.org/project/drupal/releases) for more information.

## Create a Drupal 10 Site

1. Create a new Drupal site using the ["Drupal with Composer" CMS/Start State](/guides/quickstart/create-new-site/).

1. [Clone the site](/guides/git/git-config#clone-your-site-codebase) locally with Git.

1. Run the following commands:

   ```bash{promptUser: user}
   composer config minimum-stability rc
   git commit -am "composer config minimum-stability rc"
   composer config platform.php 8.1
   git commit -am "composer config platform.php 8.1"
   composer config allow-plugins.phpstan/extension-installer true
   git commit -am "composer config allow-plugins.phpstan/extension-installer true"
   composer require --no-update --dev drupal/core-dev:^10
   composer require --no-update drupal/core-composer-scaffold:^10
   composer require --no-update pantheon-systems/drupal-integrations:^10
   composer require --no-update drupal/core-recommended:^10
   composer update
   git commit -am "Update to Drupal 10"
   ```

## FAQ

### When Drupal 10 is released, which version will appear in the dashboard?

Drupal 9 will still be the version used when creating a Drupal Composer Managed Site until mid-January. You can upgrade new sites to Drupal 10 by [following these instructions](/drupal-10#update-a-drupal-9-site-to-drupal-10).

### When Drupal 10 is released, will my Drupal 9 site be forced to use Drupal 10?

No, Drupal 9 sites can continue to use Drupal 9 and receive Drupal 9 updates.

### How do I upgrade my existing site from Drupal 9 to Drupal 10?

Refer to [Upgrade from Drupal 9 to Drupal 10](/drupal-10#update-a-drupal-9-site-to-drupal-10).

### When will official Drupal 10 support start?

When Drupal 10 is officially released (expected December 14, 2022).

### Where do I go with questions?

Ask questions in our Slack [#drupal channel](https://pantheon-community.slack.com/archives/CTA1621KK).

## More Resources

- [Drupal 9](/drupal-9)
- [Using Drupal with Pantheon](/develop-drupal)