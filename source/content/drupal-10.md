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

Drupal 10 is coming in December 2022! This page will be updated frequently with the latest information and instructions for Drupal 10 on Pantheon.,

## Current Status of Drupal 10 at Pantheon

| Scenario | Status | Documentation |
|---|---|---|
| Create a Drupal 10 site on Pantheon | Available | [Create a Drupal 10 Site](/drupal-10#create-a-drupal-10-site)|
| Upgrade a Drupal 9 site to Drupal 10 manually | Available | [Upgrade from Drupal 9 to Drupal 10](/drupal-10#upgrade-a-drupal-9-site-to-drupal-10) |
| Create Drupal 10 site from Pantheon Dashboard | Planned availability January 2023 | |
| Upgrade a Drupal 9 site to Drupal 10 using the [Terminus Conversion Tools plugin](https://github.com/pantheon-systems/terminus-conversion-tools-plugin) | Early Access | Use the following command: `terminus conversion:upgrade-d10` |


## Update a Drupal 9 Site to Drupal 10

To update from version 9 to 10:

1. If you are not already using PHP 8.1, go to your dashboard and install the update to PHP 8.1.

1. Run [Drupal's Upgrade Status](https://www.drupal.org/project/upgrade_status).

1. Use [Composer to update](/guides/upgrade-drupal-8-ic-to-drupal-9#set-drupal-core-version) to Drupal 10.  See the [Drupal release-specific documentation](https://www.drupal.org/project/drupal/releases) for more details.



## Create a Drupal 10 Site

We've been busy conducting early testing on the Pantheon platform, and have developed a process for creating a new Drupal 10 site on our platform.

<Alert title="Note" type="info" >

These instructions were developed using release candidate versions of Drupal 10.  This page will be updated as production versions become available.

</Alert>

### Before You Begin

1. Create a new Drupal site using the ["Drupal with Composer" CMS/Start State](/guides/quickstart/create-new-site/).

1. [Clone the site](/guides/git/git-config#clone-your-site-codebase) locally with Git.

1. Add the following line to `pantheon.yml`:

   ```yaml:title=pantheon.yml
   php_version: 8.1
   ```

1. Commit and push the change:

   ```bash{promptUser: user}
   git commit -am "PHP 8.1"; git push;
   ```

### Create the Site

To create a new Drupal 10 site, run the following commands:

```bash{promptUser: user}
composer config minimum-stability beta
git commit -am "composer config minimum-stability beta"
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

Drupal 9 will still be the version used when creating a Drupal Composer Managed Site until mid-January. Customers may upgrade new sites to Drupal 10 by [following these instructions](/drupal-10#upgrade-a-drupal-9-site-to-drupal-10).

### When Drupal 10 is released, will my Drupal 9 site be forced to use Drupal 10?

No, Drupal 9 sites can continue to use Drupal 9 and receive Drupal 9 updates.

### How do I upgrade my existing site from Drupal 9 to Drupal 10?

See [Upgrade from Drupal 9 to Drupal 10](/drupal-10#upgrade-a-drupal-9-site-to-drupal-10).

### When will official Drupal 10 support start?

When Drupal 10 is officially released (expected December 14, 2022).

### Where do I go with questions?

Ask questions in our Slack [#drupal channel](https://pantheon-community.slack.com/archives/CTA1621KK).