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
- Able to get a local copy of the existing site / access to a Git repository of it?

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

This doc uses the following aliases:

- **Alias:** `OLD-SITE`
  - **Site Name:** `former-platform`
- **Alias:** `PANTHEON-SITE`
  - **Site Name:** `best-drupal9-site-ever`

## Create a New Drupal 9 Site

- Log in to your Pantheon account. If you don't have one, [create one first](https://pantheon.io/register?docs) and familiarize yourself with the [User Dashboard](/guides/quickstart/user-dashboard) before you create a new site.

- Set up [SSH Keys](/ssh-keys) on your local computer and Pantheon account.

## Create a Local Copy of the Old Site's Code

Follow the steps in [Manually Migrate Sites to Pantheon](/migrate-manual#import-your-code) to create a Git-tracked local copy of the site. In that doc, export the database and files, but do not add them or upload any files. Return to this doc once you have created a full local backup of the old site.

### Site Structure

<Partial file="ic-upstream-structure.md" />

## Migrate the Old Drupal Site's Code to the Pantheon Drupal 9 Site

1. Copy over exported configuration from the original site. From the Pantheon D9 site, run the following commands:

  ```bash{promptUser: user}
  mkdir config
  git mv sites/default/config/* config/
  git commit -m "Add site configuration."
  ```

1. List the contrib modules and themes on the old site:

  ```bash{promptUser: user}
  composer show
  ```

1. Use Composer to add each module and theme on the Pantheon Drupal 9 site:

  ```bash{promptUser: user}
  composer require drupal/ctools:^3.4 drupal/redirect:^1.6 drupal/token:^1.7
  git add composer.*
  git commit -m "Add contrib projects."
  ```

1. Use Composer to install the requirements on the Pantheon Drupal 9 site, then push the changes to the platform:

  ```bash{promptUser: user}
  composer install
  git add . && git commit -m "composer install" && git push origin master
  ```

1. Copy any custom modules or themes from the old site to the Pantheon site:

  ```bash{promptUser: user}
  mkdir web/{themes, modules}
  git mv themes/* web/themes
  git mv modules/* web/modules
  git commit -m "Add custom projects."
  ```

1. Check `settings.php` for any customizations to copy over:

  ```bash{promptUser: user}
  mkdir -p web/sites/default
  git show sites/default/settings.php > web/sites/default/original-settings.php
  # Check for any customizations (if this returns nothing, you can move on to the next step).
  # Copy what you need over to web/sites/default/settings.php, and commit as needed.
  diff -Nup web/sites/default/settings.php web/sites/default/original-settings.php
  # Remove the original copy.
  rm web/sites/default/original-settings.php
  ```

1. Use Terminus to import the old site's database (created in the [migrate manual](/migrate-manual#add-your-database) doc) into the Pantheon D9 site. This example uses a local `db.sql.gz` file. If your DB archive file is located at a URL, replace the file name with the full URL in this example:

  ```bash{promptUser: user}
  terminus import:database $PANTHEON-SITE.dev ~/db.sql.gz
  ```

1. Use Terminus to import the old site's files (created in the [migrate manual](/migrate-manual#upload-your-files) doc) into the Pantheon D9 site. This example uses a local `files.tar.gz` file. If your DB archive file is located at a URL, replace the file name with the full URL in this example:

  ```bash{promptUser: user}
  terminus import:files $PANTHEON-SITE.dev ~/files.tar.gz
  ```

1. Push the Pantheon D9 codebase from your local machine up to Pantheon:

  ```bash{promptUser: user}
  terminus connection:set $PANTHEON-SITE.dev git
  git push origin master
  ```

1. Run database updates:

  ```bash{promptUser: user}
  terminus drush $PANTHEON-SITE.dev -- updatedb
  ```

1. Navigate to the Site Dashboard and click **I've Successfully Migrated Manually**.

1. Review the site, then proceed to launch using the [Pantheon Relaunch](/relaunch) documentation.
