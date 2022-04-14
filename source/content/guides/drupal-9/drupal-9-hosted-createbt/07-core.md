---
title: Migrate a Site That Was Created with Build Tools to Drupal 9
subtitle: Update Drupal Core Using Composer
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-hosted-createbt/core
anchorid: core
editpath: drupal-9/drupal-9-hosted-createbt/07-core.md
---
1. Temporarily add write access to protected files and directories:

   ```bash{promptUser: user}
   chmod 777 web/sites/default
   find web/sites/default -name "*settings.php" -exec chmod 777 {} \;
   find web/sites/default -name "*services.yml" -exec chmod 777 {} \;
   ```

1. Use Composer to remove `config_installer` and add new requirements:

   ```bash{outputLines: 3-7,9-11}
   composer remove drupal/config_installer --no-update
   composer require drupal/core-recommended:^9 \
      drupal/core-composer-scaffold:^9 \
      drupal/core-project-message:^9 \
      drush/drush:^10 \
      -W --no-update

   composer require phpunit/phpunit:^9 \
      behat/behat:^3 \
      drupal/drupal-extension:^4 \
      --no-update -W --dev
   ```

1. If you have `core-dev` installed, follow below (skip this step if you do not have `core-dev` installed):

   ```bash{outputLines: 2}
   composer require drupal/core-dev:^9 \
      --dev -W --no-update
   ```

1. If the **Upgrade Status** under **Reports** displays obsolete modules, update the modules using the `--no-update -W` switch to instruct Composer to check for all dependencies together rather than for each module. Replace `OBSOLETE-MODULE-NAME` in this example with the module to update:

   ```bash{outputLines: 2}
   composer require drupal/OBSOLETE-MODULE-NAME:^9 \
      --dev -W --no-update
   ```

   Repeat this step for each obsolete module in the project.

1. When you're done updating modules, run `composer update`:

   ```bash{promptUser: user}
   composer update -W --optimize-autoloader --prefer-dist
   ```

   If this command returns an error, check the output for any incompatible modules or themes and check the **Upgrade Status** under **Reports** in the integration environment.

1. Next, edit `composer.json` and add `--no-dev` from the `scripts` section, to exclude the dev dependencies when the build is deployed to production.

   ```json:title=composer.json
     "scripts": {
       "build-assets": [
         "@prepare-for-pantheon",
         "composer install --optimize-autoloader --no-dev" //highlight-line
       ],
   ```

1. Commit the changes and push them to the development environment:

   ```bash{promptUser: user}
   git add composer.json composer.lock pantheon.yml
   git commit -m "upgrade core to d9"
   git push origin d9-upg-21
   ```
