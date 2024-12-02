---
title: Drupal 10 on Pantheon
description: Your hub for all things Drupal 10.
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2022-10-18"
contenttype: [doc]
innav: [true]
categories: [create, cms]
cms: [drupal10]
audience: [development]
product: [composer]
integration: [--]
---

Drupal 10 is now available on the Pantheon platform. This page will be updated frequently with the latest information and instructions for Drupal 10 on Pantheon.

## Current Status of Drupal 10 at Pantheon

| Scenario                                                                                                                                                | Status       | Documentation                                                                        |
|---------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|--------------------------------------------------------------------------------------|
| Create a Drupal 10 site on Pantheon                                                                                                                     | Available    | [Create a Drupal 10 Site](/drupal-10#create-a-drupal-10-site)                        |
| Upgrade a Drupal 9 site to Drupal 10 manually                                                                                                           | Available    | [Upgrade from Drupal 9 to Drupal 10](/drupal-10#update-a-drupal-9-site-to-drupal-10) |
| Upgrade a Drupal 9 site to Drupal 10 using the [Terminus Conversion Tools plugin](https://github.com/pantheon-systems/terminus-conversion-tools-plugin) | Early Access | Use the following command: `terminus conversion:upgrade-d10`                         |

## Update a Drupal 9 Site to Drupal 10

1. Confirm that the site uses PHP 8.1 or higher:

   Go to the [Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) and click **Settings**, and then click **PHP version**. The PHP 8.1+ update will show as available to install if you are not already on it.

   If you are not on PHP 8.1 and you don't see the update, refer to [Upgrade PHP Versions](/guides/php/php-versions) for instructions on updating your PHP version.

1. Run [Drupal's Upgrade Status](https://www.drupal.org/project/upgrade_status).

1. Use [Composer to update](/upgrade-drupal-with-ic-to-latest#set-drupal-core-version) to Drupal 10. Refer to the [Drupal release-specific documentation](https://www.drupal.org/project/drupal/releases) for more information.

   Composer will prompt you to add `phpstan/extension-installer` to your `allow-plugins` config if you haven't done so already.

## Create a Drupal 10 Site

This process requires [Composer](https://getcomposer.org/doc/01-basic-usage.md) version 2.2 and uses Pantheon's current [PHP version](/guides/php#supported-php-versions).

1. Create a new Drupal site following the steps to ["Create a new CMS Site"](/guides/getstarted/addsite/#create-a-new-cms-site) documentation.

1. [Clone the site](/guides/git/git-config#clone-your-site-codebase) locally with Git.

   - The cloned site contains a pre-configured `composer.json` file. No additional configuration is needed for the site to work on Pantheon.

1. Review the documentation to [install and configure Git](/guides/git/git-config) correctly before you begin developing your site on Pantheon.

## FAQ

### Will my Drupal 9 site be forced to upgrade to Drupal 10?

No, Drupal 9 sites can continue to use Drupal 9.

### How do I upgrade my existing site from Drupal 9 to Drupal 10?

Refer to [Upgrade from Drupal 9 to Drupal 10](/drupal-10#update-a-drupal-9-site-to-drupal-10).

### Where do I go with questions?

Ask questions in our Slack [#drupal channel](https://pantheon-community.slack.com/archives/CTA1621KK).

## More Resources

- [Drupal on Pantheon](/drupal)
- [Using Drupal with Pantheon](/develop-drupal)
