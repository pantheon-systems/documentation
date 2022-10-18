---
title: Drupal 10 Migration Guide
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2022-10-18"
---

Drupal 10 is coming in December 2022!  However, we've been busy testing it on the Pantheon platform, and have developed a process for updating to Drupal 10 from a Drupal 9 site.

<Alert title="Warning" type="danger" >

These instructions were developed using beta versions of Drupal 10, and are for educational purposes only.  This page will be updated as production versions become available.

</Alert>

These instructions only work for Drupal 9 sites with Integrated Composer.

* If you are on a previous version of Drupal, see the [Drupal 9 Migration Guides](/drupal-9-migration).
* To learn more about Integrated Composer, see the [Integrated Composer Guide](/guides/integrated-composer).
  
## Before You Begin

This process requires that you are on PHP 8.1.  To upgrade:

1. Add the following line to `pantheon.yml`:

   ```yaml:title=pantheon.yml
   php_version: 8.1
   ```

1. Commit and push the change:

   ```bash{promptUser: user}
   git commit -am "PHP 8.1"; git push;
   ```

## Update to Drupal 10

To update from Drupal 9 to Drupal 10, run the following commands:

```bash{promptUser: user}
git commit -am "PHP 8.1"; git push;
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
