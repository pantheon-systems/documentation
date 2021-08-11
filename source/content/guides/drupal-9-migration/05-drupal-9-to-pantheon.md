---
title: Migrate to Drupal 9 on Pantheon
subtitle: Migrate a Drupal 9 Site to Pantheon
description: Migrate a Composer-managed Drupal 9 Site from another platform to Pantheon.
categories: [develop]
cms: drupal-9
tags: [code, launch, migrate, site, updates]
reviewed: "2021-08-20"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-migration/drupal-9-to-pantheon
anchorid: drupal-9-migration/drupal-9-to-pantheon
editpath: drupal-9-migration/05-drupal-9-to-pantheon.md
---

In this doc, you'll migrate an existing Composer-managed Drupal 9 site from another platform to a new Drupal 9 site with Integrated Composer on Pantheon.

## Will This Guide Work for Your Site?

- Drupal 9
- Composer-managed
- Git repository?

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

This doc uses the following aliases:

- **Alias:** `OLD_SITE`
  - **Site Name:** `former-platform`
- **Alias:** `PANTHEON_SITE`
  - **Site Name:** `best-drupal9-site-ever`

## Create a New Drupal 9 Site

- Log in to your Pantheon account. If you don't have one, [create one first](https://pantheon.io/register?docs) and familiarize yourself with the [User Dashboard](/guides/quickstart/user-dashboard) before you create a new site.

- Set up [SSH Keys](/ssh-keys) on your local computer and Pantheon account.

[Create a new Drupal 9 site from the Dashboard](/create-sites) as you would with any new site. Integrated Composer is built in and ready to use.

### Site Structure

<Partial file="ic-upstream-structure.md" />

## Create a Local Copy of the Old Site's Code

Follow the steps in [Manually Migrate Sites to Pantheon](/migrate-manual#import-your-code) to create a Git-tracked local copy of the site. In that doc, import the database, but do not add it or upload any files. Return to this doc once you have created a full local backup of the old site.

## Migrate the Old Drupal Site's Code to the Pantheon Drupal 9 Site

1. If the old site is already available in a Git repository, retrieve the old site's Git URL.

1. Add the old site as a remote repository called `former-platform`. Use the URL retrieved in the previous step:

  ```bash{promptUser: user}
  git remote add former-platform ssh://codeserver.dev.xxxx@codeserver.dev.xxxx.drush.in:2222/~/repository.git
  git fetch former-platform
  ```

1. Copy over exported configuration from the original site. From the Pantheon D9 site, run the following commands:

  ```bash{promptUser: user}
  git checkout former-platform/master -- sites/default/config
  git mv sites/default/config/* config/
  git commit -m "Add site configuration."
  ```

1. List contrib modules and themes on your old site:

  ```bash{promptUser: user}
  terminus drush $OLD_SITE.dev -- pm:projectinfo --status=enabled --fields=name,version --format=table
  ```

1. Then use Composer on your Pantheon D9 site to add these there:

  ```bash{promptUser: user}
  composer require drupal/ctools:^3.4 drupal/redirect:^1.6 drupal/token:^1.7
  git add composer.*
  git commit -m "Add contrib projects."
  ```

1. Copy over any custom modules or themes from your old site:

  ```bash{promptUser: user}
  git checkout former-platform/master -- modules/custom themes/custom
  git mv themes/* web/themes
  git mv modules/* web/modules
  git commit -m "Add custom projects."
  ```

1. Check `settings.php` for any customizations to copy over:

  ```bash{promptUser: user}
  # Fetch your old settings file.
  git show former-platform/master:sites/default/settings.php > web/sites/default/original-settings.php
  # Check for any customizations (if this returns nothing, you can move on to the next step).
  # Copy what you need over to web/sites/default/settings.php, and commit as needed.
  diff -Nup web/sites/default/settings.php web/sites/default/original-settings.php
  # Remove the original copy.
  rm web/sites/default/original-settings.php
  ```

1. Copy the files and database from your old site to the Pantheon D9 site:

  ```bash{promptUser: user}
  terminus site:clone $OLD_SITE.live $PANTHEON_SITE.dev --no-code --no-destination-backup --no-source-backup
  ```

1. Push the Pantheon D9 codebase from your local machine up to Pantheon:

  ```bash{promptUser: user}
  terminus connection:set $PANTHEON_SITE.dev git
  git push origin master
  ```

1. Run database updates:

  ```bash{promptUser: user}
  terminus drush $PANTHEON_SITE.dev -- updatedb
  ```

1. Review the site, then proceed to launch using the [Pantheon Relauch](/relaunch) documentation.
