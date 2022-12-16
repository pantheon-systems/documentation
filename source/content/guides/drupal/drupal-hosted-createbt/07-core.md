---
title: Migrate a Site That Was Created with Build Tools to Drupal latest
subtitle: Update Drupal Core Using Composer
description: 
cms: "Drupal:latest"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-hosted-createbt/core
anchorid: core
editpath: drupal/drupal-hosted-createbt/07-core.md
reviewed: "2022-12-12"
contenttype: [guide]
categories: [migrate, git]
newcms: [drupal]
audience: [development]
product: [dashboard]
integration: [composer]
---

1. Use Composer to update your site requirements:

   ```bash{outputLines: 2-5,7-9}
   composer require drupal/core-recommended:^9 \
      drupal/core-composer-scaffold:^9 \
      drupal/core-project-message:^9 \
      -W --no-update

   composer require phpunit/phpunit:^9 \
      behat/behat:^3 \
      drupal/drupal-extension:^4 \
      --no-update -W --dev
   ```

1. If you have `core-dev` installed, enter the following command (skip this step if you do not have `core-dev` installed):

   ```bash{outputLines: 2}
   composer require drupal/core-dev:^9 \
      --dev -W --no-update
   ```

1. Run `composer update`:

   ```bash{promptUser: user}
   composer update -W --optimize-autoloader --prefer-dist
   ```

   If this command returns an error, check the output for any incompatible modules or themes and check the **Upgrade Status** under **Reports** in the Multidev environment.

1. Commit the changes and push them to the development environment:

   ```bash{promptUser: user}
   git add composer.json composer.lock
   git commit -m "upgrade core to d9"
   git push origin drupal-upg-latest
   ```
