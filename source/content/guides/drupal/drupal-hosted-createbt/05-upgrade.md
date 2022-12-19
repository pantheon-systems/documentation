---
title: Migrate a Site That Was Created with Build Tools to Drupal
subtitle: Upgrade Site Components Locally
description: 
cms: "Drupal"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-hosted-createbt/upgrade
anchorid: upgrade
editpath: drupal/drupal-hosted-createbt/05-upgrade.md
reviewed: "2022-12-12"
contenttype: [guide]
categories: [migrate, git, update]
newcms: [drupal]
audience: [development]
product: [dashboard]
integration: [--]
---

1. Use Composer to declare version requirements:

   ```bash{outputLines:2-5,7-9}
    composer require \
      drupal/upgrade_status:^3 \
      drush/drush:^10 \
      -W --no-update
   ```

1. The `pantheon-systems/drupal-integrations` project now includes a patch that backports a bugfix from the latest version of Drupal to Drupal 8 to display the correct version of your MariaDB server. If this patch is not installed, then your database version will always be reported as `MySQL 5.5.30`.

  The `cweagans/composer-patches` Composer plugin will only install patches from dependencies if the `enable-patching` property is set to `true` in `composer.json`.

  Enable deep patching to view the correct MariaDB version in the Dashboard:

   ```bash{promptUser: user}
   composer config extra.enable-patching true
   ```

1. Edit `composer.json` and remove `--no-dev` from the `scripts` section to allow the dev dependencies to be available in the integration environment.

  Do not remove the close quote, `"`:

   ```json:title=composer.json
     "scripts": {
       "build-assets": [
         "@prepare-for-pantheon",
         "composer install --optimize-autoloader" //highlight-line
       ],
   ```

1. Add `composer-patches` to the `require` list and run `composer update`:

   ```bash{promptUser: user}
   composer require cweagans/composer-patches --no-update
   composer update -W --optimize-autoloader --prefer-dist
   ```

1. If the site doesn't already have a [pantheon.yml](/pantheon-yml#find-or-create-pantheonyml) file, create one with the following values (the comments `#` are optional):

   ```yaml:title=pantheon.yml
   api_version: 1
   
   # Move the DOCUMENT_ROOT of your site to the */web* folder:
   web_docroot: true
   
   # The latest version of Drupal requires PHP 7.3 or higher. If your code isn't ready for PHP 7.4 you may need to use 7.3 here:
   php_version: 7.4
   
   # The latest version of Drupal requires a higher version of the DB. It will take a few minutes to complete the upgrade to 10.4 once you push this file:
   database:
     version: 10.4
   
   # The latest version of Drupal prefers Drush 10. If you have written a lot of custom Drush commands you may need to go back to Drush 9 or 8:
   drush_version: 10
   ```

   An existing `pantheon.yml` file may have more values than this in it, but these are the ones with which we are concerned. If the values already exist in the `pantheon.yml` file, change them to the values in this example.

1. Commit and push the changes:

   ```bash{promptUser: user}
   git add composer.json composer.lock pantheon.yml config/*
   git commit -m 'updating to drush 10/mariadb 10.4/config'
   git push origin d9-upg-21
   ```

  If all goes well, you will see something like the following:

   ```bash
   remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
   remote:
   remote: Create a pull request for 'd9-upg-21' on GitHub by visiting:
   remote:      {{URL TO YOUR REPOSITORY}}
   remote:
   ```

1. Copy the URL from the result (line 4 in the previous output) and use your local web browser to navigate to it to create a pull request. Creating a pull request will cause Build Tools to create a Multidev environment. This is called `$ENV` in the next steps.

1. After the build has finished without error, you will see a new environment in the Dashboard under **<span class="glyphicons glyphicons-cloud"></span> Multidev**, named in reference to your pull request.

   ```bash{promptUser: user}
   terminus env:info $SITE.$ENV
   ```

1. Use Terminus Drush to create a one-time login to your site:

   ```bash{promptUser: user}
   terminus drush $SITE.$ENV uli admin
   ```

Log in to the site as admin and  navigate to **Upgrade Status** under **Reports**. Modules displayed as incompatible in **Upgrade Status** will need to be updated in the next few steps. Take note of the versions **Upgrade Status** recommends. If it's not possible to get your module to a Drupal compatible status, then it should be removed.

## Upgrade MariaDB in All Environments

<Partial file="drupal/drupal-mariadb-considerations.md" />

Once you have confirmed that the MariaDB upgrade worked in the Multidev, merge your PR, or push your changes to your master branch in your git provider, to ensure the other components upgrade smoothly.

From the Dashboard, deploy the code from Dev, through Test, to Live.

Or use Terminus, and replace the `$ENV` in this example with the target environment:

```bash{promptUser: user}
terminus env:deploy --sync-content --note "upgrade DB" --updatedb -- $SITE.$ENV
```
