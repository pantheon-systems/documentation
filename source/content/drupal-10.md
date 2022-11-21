---
title: Create a Drupal 10 Site
description: Drupal 10 is coming soon!
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2022-10-18"
newtype: doc
categories: [create, plan]
newcms: [drupal10]
audience: [development]
product: [composer]
integration: [--]
---

Drupal 10 is coming in December 2022! We've been busy conducting early testing on the Pantheon platform, and have developed a process for creating a new Drupal 10 site on our platform.

<Alert title="Warning" type="danger" >

These instructions were developed using beta versions of Drupal 10, and are for educational purposes only.  This page will be updated as production versions become available.

</Alert>

## Before You Begin

This process requires that you are on PHP 8.1.  To upgrade:

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

## Create a Drupal 10 Site

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
