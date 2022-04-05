---
title: Migrate from a Build tools Managed Drupal 8 Site to Drupal 9
subtitle: Upgrade Site Components Locally
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-v8-build-tools/upgrade
anchorid: upgrade
editpath: drupal-9-v8-build-tools/05-upgrade.md
---
1. Use Composer to declare version requirements:

   ```bash{outputLines:2-5,7-9}
    composer require \
      drupal/upgrade_status:^3 \
      drupal/devel:^4 \
      drush/drush:^10 \
      -W --no-update
    composer require \
      phpunit/phpunit:"^8 | ^9 | ^10" \
      phpstan/phpstan \
      --dev -W --no-update
   ```

1. The `pantheon-systems/drupal-integrations` project now includes a patch that backports a bugfix from Drupal 9 to Drupal 8 to display the correct version of your MariaDB server. If this patch is not installed, then your database version will always be reported as `MySQL 5.5.30`.

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
   composer require cweagans/composer-patches drupal/upgrade_status --no-update
   composer update -W --optimize-autoloader --prefer-dist
   ```

1. If the site doesn't already have a [pantheon.yml](/pantheon-yml#find-or-create-pantheonyml) file, create one with the following values (the comments `#` are optional):

   ```yaml:title=pantheon.yml
   api_version: 1
   
   # Move the DOCUMENT_ROOT of your site to the */web* folder:
   web_docroot: true
   
   # Drupal 9 requires PHP 7.3 or higher. If your code isn't ready for PHP 7.4 you may need to use 7.3 here:
   php_version: 7.4
   
   # Drupal 9 requires a higher version of the DB. It will take a few minutes to complete the upgrade to 10.4 once you push this file:
   database:
     version: 10.4
   
   # Drupal 9 prefers Drush 10. If you have written a lot of custom Drush commands you may need to go back to Drush 9 or 8:
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

1. Copy the URL from the result (line 4 in the previous output) and use your local web browser to navigate to it to create a pull request. Creating a pull request will cause Build Tools to create an **Integration Environment** Multidev. This is called `$ENV` in the next steps.

1. After the build has finished without error, you will see a new environment in the Dashboard under **Multidev** named in reference to your pull request.

   ```bash{promptUser: user}
   terminus env:info $SITE.$ENV
   ```

1. Use Terminus Drush to create a one-time login to your site:

   ```bash{promptUser: user}
   terminus drush $SITE.$ENV uli admin
   ```

1. Log in to the site as admin and take a look under **Reports** at **Upgrade Status**. Any modules which **Upgrade Status** shows are incompatible will need to be updated in the next few steps. Take note of the versions **Upgrade Status** recommends. If your module is incompatible it will need to be removed from the Composer file.

### Upgrade MariaDB in All Environments

#### Drupal 9 Considerations

<Partial file="drupal-9/drupal-9-mariadb-considerations.md" />

Once you have confirmed that the MariaDB upgrade worked in the Multidev, push the changes to the Dev environment to ensure the other components upgrade smoothly.

The possible risks associated with the time it takes for the platform to upgrade the database are minimal, but you can use the following command to mitigate potential errors:

```bash{promptUser: user}
git push origin master
```

From the Dashboard, merge the code from Dev, through Test, to Live.

Or use Terminus, and replace the `$ENV` in this example with the target environment:

```bash{promptUser: user}
terminus env:deploy --sync-content --note "upgrade DB" --updatedb -- $SITE.$ENV
```
