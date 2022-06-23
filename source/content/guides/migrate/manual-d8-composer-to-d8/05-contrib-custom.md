---
title: Migrate a Drupal 8 Site That Is Managed With Composer From Another Platform
subtitle: Add Contrib and Custom Code
description: 
cms: "Drupal 8"
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/manual-d8-composer-to-d8-to-d8/contrib-custom
anchorid: contrib-custom
editpath: migrate/manual-d8-composer-to-d8-to-d8/05-contrib-custom.md
reviewed: "2021-06-22"
---

This section describes how to replicate your selection of contributed modules and themes, and any custom modules or themes your development team has created in your new project structure.

## Composer packages

1. Copy your package list from the `requires` section of the existing site's `composer.json` and add it to the new site's `composer.json`.

   - If the existing `composer.json` defines additional repositories or patches, copy those over too. Take care not to overwrite the `upstream-configuration` package and repository.

   - If the old site has custom patches in its codebase, make sure to copy those over as well.

1. Run `composer update` to have Composer create a `composer.lock` file with all versions and dependencies:

  ```bash{promptUser: user}
  composer update
  ```

1. Run the `git status` command to confirm that all changed files have names that start with `composer.`.

1. Add other folders to `.gitignore` until `git status` only shows the Composer files being modified:

  ```bash{promptUser: user}
  git status
  ```

1. Add and commit the changed Composer files to Git:

  ```shell{promptUser: user}
  git add composer.*; git commit -m "Add composer packages"
  ```

## Custom Code

Complete the steps below if you have custom code that you would like to move to your new site.

1. Manually copy custom code from the old site to the corresponding Pantheon site directory and commit the changes.

1. Update the new `.gitignore` file to keep it aligned with the current site to avoid potential issues in the future.

If you plan to install libraries using Composer via a `drupal-library` project, do not add anything to `web/libraries` and use Composer to install the libraries instead.

If you commit libraries directly to `web/libraries`, then add each directory to be allowed (not ignored) by `.gitignore`. For example, to commit a `favorite-library` directory, add it and each directory to `.gitignore` before you use `git add`:

```none:title=.gitignore
!/web/libraries/favorite-library
!/web/libraries/other-favorite-library
```

If you do not plan on adding any libraries with Composer in the future, you can remove the `web/libraries` line from the `.gitignore` file. This might lead to builds failing in the future if at some point you or another developer use Composer to add a library.

### Modules and Themes

If you have modules and themes that you would like to move to your new site, navigate to the Pantheon site directory and:

- Copy modules from the local directory of the old platform site:

    ```bash{promptUser: user}
    cp -R ../FORMER-PLATFORM/modules/custom web/modules
    git add web/modules/custom
    git commit -m "Copy custom modules"
    ```

- Copy themes from the local directory of the old platform site:

    ```bash{promptUser:user}
    cp -R ../FORMER-PLATFORM/themes/custom web/themes
    git add web/themes/custom
    git commit -m "Copy custom themes"
    ```

- Copy any other custom code you need from your old platform site.

### settings.php

Your existing site may have customizations to `settings.php` or other configuration files.

1. Copy the existing `settings.php` to the Pantheon site and remove the `$databases` array if it exists.

1. Ensure that everything in the [Pantheon settings.php](https://github.com/pantheon-upstreams/drupal-composer-managed/blob/master/web/sites/default/settings.php) is included.

1. Confirm that the `settings.php` file on the Pantheon D9 site:

   - Has one `$settings['container_yamls'][]`
   - Contains no duplicates
   - Contains `include __DIR__ . "/settings.pantheon.php";`

## Configuration

Complete the steps in this section to copy exported configuration settings from the original site to your new Pantheon site.

1. Navigate to your Pantheon site.

1. Run the following commands:

  ```bash{promptUser: user}
  mkdir config
  cp -R ../FORMER-PLATFORM/<config folder location> config/
  git commit -m "Add site configuration."
  ```
