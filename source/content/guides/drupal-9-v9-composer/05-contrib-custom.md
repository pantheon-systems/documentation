---
title: Migrate a Composer Managed Drupal 9 Site from Another Platform
subtitle: Add Contrib and Custom Code
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-v9-composer/contrib-custom
anchorid: contrib-custom
editpath: drupal-9-v9-composer/05-contrib-custom.md
---
This section describes how to replicate your selection of contributed modules and themes, and any custom modules or themes your development team has created in your new project structure.


# Composer packages

1. Copy your package list from the `requires` section of the existing site's `composer.json` and add it to the new site's `composer.json`. If the existing `composer.json` defines additional repositories or patches, copy those over too. Take care not to overwrite the `upstream-configuration` package and repository.

  If the old site has custom patches in its codebase, make sure to copy those over as well.

1. Run `composer update` to have Composer create a `composer.lock` file with all versions and dependencies:

  ```shell{promptUser:user}
  composer update
  ```

1. Use `git status` to confirm that all changed files are names that start with `composer.`. If there are other files, add them to `.gitignore` until `git status` only shows the Composer files being modified:

  ```shell{promptUser:user}
  git status
  ```

1. Add and commit the changed Composer files to Git:

  ```shell{promptUser:user}
  git add composer.*; git commit -m "Add composer packages"
  ```

# Custom Code

Manually copy custom code from the old site to the corresponding Pantheon site directory and commit them.

Keep the new `.gitignore` file aligned with the current site to avoid potential issues in the future.

If you plan to install libraries using Composer via a `drupal-library` project, do not add anything to `web/libraries` and use Composer to install the libraries instead.

If you commit libraries directly to `web/libraries`, then add each directory to be allowed (not ignored) by `.gitignore`. For example, to commit a `favorite-library` directory, add it and each other directory to the `.gitignore` before you `git add`:

```none:title=.gitignore
!/web/libraries/favorite-library
!/web/libraries/other-favorite-library
```

If you do not plan on adding any libraries with Composer in the future, you can remove the `web/libraries` line from the `.gitignore` file. This might lead to builds failing in the future if at some point you or another developer use Composer to add a library.

## Modules and Themes

From the local Pantheon site directory, copy modules from the local directory of the former platform site:

```shell{promptUser:user}
cp -R ../FORMER-PLATFORM/modules/custom web/modules
git add web/modules/custom
git commit -m "Copy custom modules"
```

From the local Pantheon site directory, copy themes from the local directory of the former platform site:

```shell{promptUser:user}
cp -R ../FORMER-PLATFORM/themes/custom web/themes
git add web/themes/custom
git commit -m "Copy custom themes"
```

Do the same for any other custom code you need to carry over.

## settings.php

Your existing site may have customizations to `settings.php` or other configuration files.

1. Copy the existing `settings.php` to the Pantheon site and remove the `$databases` array if it exists.

1. Ensure that everything in the [Pantheon settings.php](https://github.com/pantheon-upstreams/drupal-recommended/blob/master/web/sites/default/settings.php) is included.

1. Confirm that the `settings.php` file on the Pantheon D9 site:

- Has one `$settings['container_yamls'][]`
  - And that there are no duplicates.
- Contains `include __DIR__ . "/settings.pantheon.php";`

# Configuration

Copy over exported configuration from the original site. From the Pantheon D9 site, run the following commands:

  ```shell{promptUser: user}
  mkdir config
  cp -R ../FORMER-PLATFORM/<config folder location> config/
  git commit -m "Add site configuration."
  ```
