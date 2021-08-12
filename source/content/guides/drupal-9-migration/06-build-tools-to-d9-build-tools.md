---
title: Drupal 8 with Build Tools to D9 with Build Tools
subtitle: "Upgrade-in-place: Drupal 8 with Build Tools"
description: Upgrade a Pantheon Drupal 8 site with Build Tools to a Drupal 9 site with Build Tools
categories: [develop]
cms: drupal-9
tags: [code, launch, migrate, site, updates]
contributors: [stovak, edwardangert, carolynshannon]
reviewed: "2021-06-30"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-migration/build-tools-to-d9-build-tools
anchorid: drupal-9-migration/build-tools-to-d9-build-tools
editpath: drupal-9-migration/06-build-tools-to-d9-build-tools.md
---

This doc shows how to upgrade a Drupal 8 site that uses [Build Tools](/guides/build-tools) to a Drupal 9 site that continues to use the Build Tools workflow.

<Alert title="About Build Tools" type="info" icon="info-sign">

Build Tools connects Pantheon with your CI service and external Git provider. See the [Build Tools Guide](/guides/build-tools#a-build-tools-projects-components) for details on supported Git and CI services combinations.

</Alert>

## Will This Guide Work for Your Build Tools Workflow?

Before you continue, confirm that your site meets the following criteria:

1. Code is managed using an external repository outside of Pantheon (GitHub, GitLab, Bitbucket, etc.).

1. The site is built through a service like Circle CI.

1. Build artifacts are pushed to your Pantheon repository.

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

Install the [jq](https://formulae.brew.sh/formula/jq) JSON processor and [rsync](https://formulae.brew.sh/formula/rsync) on your local environment if they aren't already installed. On MacOS with Homebrew, run:

```bash{promptUser: user}
brew install jq rsync
```

## Prepare a Local Copy of the Site for Upgrade

1. In the **Dev** tab of the site's Dashboard, set the **Development Mode** to **Git**, and [clone the site locally](/local-development#get-the-code).

1. Change into the `$SITE` directory, then create a new branch based on the default:

   ```bash{promptUser: user}
   cd $SITE
   git checkout -b d9-upgrade-2021
   ```

1. Use Terminus and Drush to export the latest version of the config files from the production envronment to `sites/default/files/config`:

   ```bash{promptUser: user}
   terminus drush $SITE.live -- config:export --destination sites/default/files/config
   ```

1. For rsync, copy the sftp host information.

   ```bash{promptUser: user}
   RSYNC_HOST=$(terminus connection:info $SITE.live --field=sftp_host)
   ```

1. Use that host name to rsync from `config:export`:

   ```bash{promptUser: user}
   rsync -rvlz --copy-unsafe-links --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' "${RSYNC_HOST}:files/config" .
   ```

1. If you do a `git status` it should show changed files in the `config` directory if there are any changed configurations in production.

   ```bash{promptUser: user}
   git status
   ```

## Upgrade Site Components Locally

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
   git push origin d9-upgrade-2021
   ```

  If all goes well, you will see something like the following:

   ```bash
   remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
   remote:
   remote: Create a pull request for 'd9-upgrade-2021' on GitHub by visiting:
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

## Custom Module Code

Custom module code is outside the scope of this document. See [drupal.org](https://www.drupal.org/docs/creating-custom-modules) for getting your custom code updated with the new version numbers and any code deprecations.

## Use Composer to Update Drupal Core

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
   git push origin d9-upgrade-2021
   ```

## Confirm the MariaDB Version and Updates

Validate your database version with `terminus drush`:

```bash{promptUser: user}
terminus drush $SITE.$ENV sqlq "SELECT VERSION();"
```

Review the site and [Launch Check Status tab](/drupal-launch-check) to confirm the database version and any outstanding available updates.
