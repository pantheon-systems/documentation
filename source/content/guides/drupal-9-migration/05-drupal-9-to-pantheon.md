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

## Create a New Drupal 9 Site

1. Log in to your Pantheon account. If you don't have an account yet, [create one first](https://pantheon.io/register?docs) and familiarize yourself with the [User Dashboard](/guides/quickstart/user-dashboard) before you create a new site.

1. Set up [SSH Keys](/ssh-keys) on your local computer and Pantheon account.

1. Navigate to your User Dashboard and click the **Migrate Existing Site** button:

   ![The Migrate Existing Site Button](../../../images/dashboard/migrate-existing-site.png)

1. Enter your current website URL, choose Drupal 9, and click **Continue**:

   ![Choose the Starting State for your Migrated Site](../../../images/dashboard/migrate-step2.png)

   Note: It is possible to upload a site running locally by putting in the local url. For example, (`http://localhost`).

1. Name your site and select an [Organization](/organizations) (optional), then click **Create Site**:

   ![Name the Migrated Site and Optionally Choose an Organization](../../../images/dashboard/migrate-step3.png)

1. Click the link to manually migrate your site then select **Yes** to confirm:

  ![Choose Manual Drupal Migration](../../../images/dashboard/migrate-manual-drops.png)

1. Click **Visit your Pantheon Site Dashboard**:

  ![Creating Your Site on Pantheon Complete for manual migration](../../../images/dashboard/migrate-manual-visit-your-site-dashboard.png)

Now that you have a new site on Pantheon, you're ready to add the major components from your existing site: custom code, files, and the database.

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

Create a new folder to use while working on the migration.  You will be creating copies of the old site and new site in sub-folders.

This doc uses the following aliases:

- **Alias:** `SITE`
- **Site Name:** `anita-drupal`

### Create a Local Copy of the Old Site's Code

1. Obtain a local copy of your old site's code.  Your **code** is all custom and contributed modules or plugins, themes, and libraries. The codebase should not include the `sites/default/files` directory, or any other static assets you do not want tracked by version control.

1. Export the database and media files (`sites/default/files`) from the old platform, but do not add them or upload any files to Pantheon.

## Retrieve a Local Copy of the Pantheon Site's Code

1. From the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment of the Site Dashboard, set the site's Development Mode to Git:

  ![Git connection mode](../../../images/dashboard/connection-mode-git.png)

1. Copy the `git clone` command for the site repository.

  The command should look similar to the following:

  ```bash
  git clone ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git
  ```

1. Run the `git clone` command inside your working folder

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
  terminus import:database $SITE.dev ~/db.sql.gz
  ```

1. Use Terminus to import the old site's files (created in the [migrate manual](/migrate-manual#upload-your-files) doc) into the Pantheon D9 site. This example uses a local `files.tar.gz` file. If your DB archive file is located at a URL, replace the file name with the full URL in this example:

  ```bash{promptUser: user}
  terminus import:files $SITE.dev ~/files.tar.gz
  ```

1. Push the Pantheon D9 codebase from your local machine up to Pantheon:

  ```bash{promptUser: user}
  terminus connection:set $SITE.dev git
  git push origin master
  ```

1. Run database updates:

  ```bash{promptUser: user}
  terminus drush $SITE.dev -- updatedb
  ```

1. Navigate to the Site Dashboard and click **I've Successfully Migrated Manually**.

1. Review the site, then proceed to launch using the [Pantheon Relaunch](/relaunch) documentation.
