---
title: Migrate to Drupal 9 on Pantheon
subtitle: Migrate a Drupal 9 Site to Pantheon (non-Composer-managed)
description: Migrate a non-Composer-managed Drupal 9 Site from another platform to Pantheon.
cms: drupal-9
categories: [develop]
tags: [composer, site, workflow]
reviewed: "2022-03-10"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-migration/drupal-9-to-pantheon-non-composer
anchorid: drupal-9-migration/drupal-9-to-pantheon-non-composer
editpath: drupal-9-migration/drupal-9-to-pantheon-non-composer.md
---

This doc shows how to migrate an existing non-Composer-managed Drupal 9 site from another platform to a new Drupal 9 site with [Integrated Composer](/guides/integrated-composer) on Pantheon.

## Overview

Drupal 9 sites on Pantheon have [Integrated Composer](/guides/integrated-composer) built-in to manage site dependencies.

The goals of this migration are to:

- Create a new Drupal site in Pantheon.

- Import your existing codebase, database and files into it.


## Will This Guide Work for Your Site?

You must confirm that you meet the following requirements before continuing:

- Your site is based on [drupal/legacy-project](https://github.com/drupal/legacy-project/blob/9.1.x/composer.json) template or a similar non-composer managed structure.

- You are able to run `drush` commands in the existing site.

- You are able to checkout your existing site codebase into your local machine.

- The site does not use a nested docroot.

- The site does not use another package and library manager like [Ludwig](https://www.drupal.org/project/ludwig).

- You have a brand new Drupal Pantheon site to host your project.

## Before You Begin

- The site owner should ensure the trusted host setting is up-to-date. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

- Set the dev environment site mode to Git to be able to perform Git operations on this environment.

- Clone your site to your local environment using the `git clone` command from the dashboard.


<Alert title="Note"  type="info" >

Commit history: The steps in this process migrate a site, so the new site will no longer maintain its existing commit history.

</Alert>

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment-no-clone-no-alias.md" />

2. Get a local copy of both your new Pantheon site and your existing codebase.

1. This doc uses several commands that depend on the locations of both your existing and new site codebases. To simplify this, set the temporary variables `$SOURCE` and `$DESTINATION` in your terminal session to match your folders location.

   ```bash
   export SOURCE=/absolute/path/to/source/site/codebase
   export DESTINATION=/absolute/path/to/codebase/cloned/from/pantheon
   ```

## Copy Existing Configuration

Copy any existing configuration from the source site and update the source path as needed to match your configuration folder:

  ```bash{promptUser:user}
  cp -r $SOURCE/sites/default/files/config/sync/* $DESTINATION/config/
  cd $DESTINATION
  git add config
  git commit -m "Pull in configuration from source site"
  ```

It is possible that the Drupal site might have relocated the configuration path to a different location. You can find out where your config yaml files are via:

```bash{promptUser:user}
drush status --fields=config-sync
```

It is also possible that no files will be copied during this step.

## Add Contributed and Custom Code

This section describes how to replicate your selection of contributed modules and themes, and any custom modules or themes your development team has created in your new project structure.

### Contributed Code

The goal of this process is to have Composer manage all the site's contrib modules, contrib themes, core upgrades, and libraries (referred to as *contributed code*). The only items from the existing site that should remain in the Git repository are custom code, custom themes, and custom modules that are specific to the existing site.


#### Modules and Themes

The steps here ensure that any modules and themes from [drupal.org](https://drupal.org) are in the `composer.json` `require` list.

After Composer is aware of all the contributed code, you'll be able to run `composer update` from within the directory. Composer will upgrade all the contributed code automatically. The Pantheon dashboard will also update Composer dependencies in addition to updating the files from the upstream.

1. Review the existing site's code and check for contributed modules in `/modules`, `/modules/contrib`, `/sites/all/modules`, and `/sites/all/modules/contrib`.

1. Run the `pm:list` Drush command within a contributed modules folder (e.g. `/modules`, `/themes`, `/themes/contrib`, `/sites/all/themes`, `/sites/all/themes/contrib`, etc.).

  This will list each module followed by the version of that module that is installed:

  ```bash{promptUser:user}
  drush pm:list --no-core --fields=name,project,version  --format=table
  ```
  
1. Review the list and note the versions of modules and themes you depend on.

1. Add these modules to your new codebase using Composer by running the following for each module in the `$DESTINATION` directory:

  ```bash{promptUser:user}
  composer require drupal/PROJECT_NAME:^VERSION
  ```

  Where `PROJECT_NAME` is the project name from the **Project** field, and `VERSION` is the version of that module the site is currently using. Composer may pull in a newer version than what you specify, depending upon what versions are available. You can read more about the caret (`^`) in the [Composer documentation](https://getcomposer.org/doc/articles/versions.md#caret-version-range-).

  Some modules use different version formats.

   - For older-style Drupal version strings:

   ```none
   Chaos Tools (ctools)  8.x-3.4
   ```

    Replace the `8.x-` to convert this into `^3.4`

   - Semantic Versioning version strings:

   ```none
   Devel (devel)  4.1.1
   ```

    Use the version directly, e.g. `^4.1.1`

    <Partial file="could-not-find-version-module_name.md" />	  

#### Other Composer Packages

If you have added non-Drupal packages to your site via Composer, use the command `composer require` to migrate each package. You can use the following command to display the differences between the master and your current `composer.json`:

```bash{promptUser:user}
diff -Nup --ignore-all-space $SOURCE/composer.json $DESTINATION/composer.json
```

#### Libraries

Libraries can be handled similarly to modules, but the specifics depend on how your library code was included in the source site. If you're using a library's API, you may have to do additional work to ensure that it functions properly.

### Custom Code

Manually copy custom code from the existing site repository to the Composer-managed directory.

#### Modules and Themes

To move modules, use the following commands:

```bash{promptUser:user}
mkdir -p $DESTINATION/web/modules/custom
cp -r $SOURCE/modules/custom $DESTINATION/web/modules/custom
cd $DESTINATION
git add web/modules/
git commit -m "Copy custom modules"
```

To move themes, use the following commands:

```bash{promptUser:user}
mkdir -p $DESTINATION/web/themes/custom
cp -r $SOURCE/themes/custom $DESTINATION/web/themes/custom
cd $DESTINATION
git add web/themes/
git commit -m "Copy custom themes"
```

Use the above commands with any of the custom code.

#### settings.php

Your existing site may have customizations to `settings.php` or other configuration files. Review these carefully and extract relevant changes from these files to copy over. Always review any file paths referenced in the code, as these paths may change in the transition to Composer.

We don't recommend that you completely overwrite the `settings.php` file with the old one, as it contains customizations for moving the configuration directory, as well as platform-specific customizations.

```bash{promptUser:user}
git status # Ensure working tree is clean
diff -Nup --ignore-all-space $SOURCE/sites/default/settings.php $DESTINATION/web/sites/default/settings.php
```

Then edit web/sites/default/settings.php and commit as needed.

The resulting `settings.php` should have no `$databases` array.

### Additional Composer Configuration

Any additional Composer configuration that you have added to your site should be ported over to the new `composer.json` file. This can include configurations related to repositories, minimum-stability, or extra sections.

You can use the diff command to get the information you need to copy:

```bash{promptUser:user}
diff -Nup --ignore-all-space $SOURCE/composer.json $DESTINATION/composer.json
```

Commit your changes as needed.

### Push to the dev environment

Now push to the Pantheon dev environment:

```bash{promptUser:user}
git push origin master
```

## Add Your Database

<Partial file="migrate-add-database.md" />

## Upload Your Files

<Partial file="migrate-add-files-only-drupal.md" />


You should now have all three of the major components of your site imported into Pantheon. Clear your caches on the the Pantheon Dashboard, and you are good to go!

## Troubleshooting

### Provided host name not valid

If you receive the error message "The provided host name is not valid for this server.", then update your `settings.php` file with a trusted host setting. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

### Working With Dependency Versions

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/guides/composer)
