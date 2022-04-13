---
title: Migrate a Composer-based Drupal Site to a Build Tools Site
description: Migrate a Drupal 9 site created via Pantheon Dashboard (or Terminus) to a Build Tools-based site.
type: guide
permalink: docs/guides/:basename
cms: "Drupal"
categories: [develop]
tags: [composer, site, workflow]
reviewed: "2022-03-10"
---

This guide shows you how to migrate a Composer-based Drupal site (site created via Pantheon dashboard or Terminus) to a Build Tools-based site.

## Overview

Drupal 9 sites on Pantheon have [Integrated Composer](/integrated-composer) built-in to manage site dependencies. A Drupal 9 site with Build Tools also provides site dependency management, as well as an external repository and a Continuous Integration workflow setup.

The goals of this migration are to:

- Create a new Drupal site in Pantheon using the [Terminus Build Tools plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin)

- Import your existing codebase, database, and files into your new site

## Will This Guide Work for Your Site?

<Partial file="drupal-9/upgrade-site-requirements-from-drupal-recommended.md" />

- You are able to [create a new Drupal 9 site using Terminus Build Tools](/guides/build-tools/create-project/#create-a-build-tools-project)

## Before You Begin

- Clone your existing site to your local environment following the `git clone` command from the dashboard.

<Alert title="Note" type="info" >

The existing site's commit history will no longer exist after migrating to the new site.

</Alert>

## Create a New Terminus Build Tools Drupal 9 Site

1. Follow the [Terminus Build Tools Documentation](/guides/build-tools/create-project/#create-a-build-tools-project) to create a new Drupal 9 site:

  ```bash{promptUser: user}
  terminus build:project:create --git=github --team='My Agency Name' d9 my-buildtools-site
  ```

1. Wait for the site to be created and for the first build to complete.

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment-no-clone-no-alias.md" />

1. Get a local copy of both your new site (from the external repository) and your existing site codebase.

1. Set the following temporary variables in your terminal session to match your folders location and sites names:

   ```bash{promptUser: user}
   export SOURCE=/absolute/path/to/source/site/codebase
   export DESTINATION=/absolute/path/to/codebase/cloned/from/pantheon
   export SOURCE_SITE_NAME=my-source-site
   export DESTINATION_SITE_NAME=my-buildtools-site
   ```

## Copy Existing Configuration

Copy any existing configuration from the source site and update the source path as needed to match your configuration folder:

  ```bash{promptUser:user}
  rsync -avz $SOURCE/config/ $DESTINATION/config/ --delete --delete-after
  # From $DESTINATION:
  git add config -A
  git commit -m "Pull in configuration from source site"
  ```

It is possible that the Drupal site might have relocated the configuration path to a different location. You can find your `config.yaml` files are via:

```bash{promptUser:user}
terminus drush $SOURCE_SITE_NAME.dev -- status --fields=config-sync
```

In some cases no files are copied through this step. This is not cause for concern.

## Add Contributed and Custom Code

This section describes how to replicate your selection of contributed modules and themes, and any custom modules or themes your development team has created in your new project structure.

### Contributed Code

The goal of this process is to have Composer manage all the site's contrib modules, contrib themes, core upgrades, and libraries (referred to as _contributed code_). The only items from the existing site that should remain in the Git repository are custom code, custom themes, and custom modules that are specific to the existing site.

#### Modules and Themes

Your site should already be managing contributed modules and themes through Composer. Follow the steps below to migrate these items to a new site.

1. Open the source site `composer.json`.

1. Run the `composer require` command for each module and theme in the `$DESTINATION` directory:

```bash{promptUser: user}
composer require drupal/PROJECT_NAME:^VERSION
```

You can require multiple packages in the same command if desired.

#### Other Composer Packages

If you added non-Drupal packages to your site via Composer, use the following steps:

1. Run the command `composer require` to migrate each package.

1. Use the following command to display the differences between the versions of `composer.json`:

```bash{promptUser: user}
diff -Nup --ignore-all-space $SOURCE/composer.json $DESTINATION/composer.json
```

#### Libraries

Libraries can be handled similarly to modules, but the specifics depend on how your library code was included in the source site. If you're using a library's API, you may have to do additional work to ensure that it functions properly.

Do not forget to commit your changes during these steps.

### Custom Code

Manually copy custom code from the existing site repository to the Composer-managed directory.

#### Modules and Themes

1. Run the following commands to move modules:

  ```bash{promptUser:user}
  mkdir -p $DESTINATION/web/modules/custom
  cp -r $SOURCE/web/modules/custom $DESTINATION/web/modules/custom
  # From $DESTINATION:
  git add web/modules/
  git commit -m "Copy custom modules"
  ```

1. Run the following commands to move themes:

  ```bash{promptUser:user}
  mkdir -p $DESTINATION/web/themes/custom
  cp -r $SOURCE/web/themes/custom $DESTINATION/web/themes/custom
  # From $DESTINATION:
  git add web/themes/
  git commit -m "Copy custom themes"
  ```

Use the above commands to move custom code (if any) to your new site.

#### settings.php

Your existing site may have customizations to `settings.php` or other configuration files. Given that both sites (`$SOURCE` and `$DESTINATION`) have been created from the same upstream, it is ok to replace the `$DESTINATION` `settings.php` with the one coming from the `$SOURCE` site:

```bash{promptUser:user}
cp $SOURCE/web/sites/default/settings.php $DESTINATION/web/sites/default/settings.php
# Review changes and commit as needed
```

The resulting `settings.php` should not have a `$databases` array.

### Additional Composer Configuration

Any additional Composer configuration that you have added to your site should be ported over to the new `composer.json` file. This can include configurations related to repositories, minimum-stability, or extra sections.

1. Use the `diff` command to get the information you need to copy:

  ```diff
  diff -Nup --ignore-all-space $SOURCE/composer.json $DESTINATION/composer.json
  ```

1. Commit your changes as needed.

### Push to the External Repository Master Branch

1. Push to the master branch in the external repository:

  ```bash{promptUser: user}
  git push origin master
  ```

1. Confirm that the Continuous Integration workflow succeeds in committing your code changes to the Pantheon site.

## Add Your Database

<Partial file="migrate-add-database.md" />

## Back Up the tokens.json file

1. Connect to your site using SFTP command or credentials from your dashboard and get a backup of the following file:

  ```bash{promptUser: user}
  files/private/.build-secrets/tokens.json
  ```

1. Use the SFTP `get` command to download the file to your local directory (this is only for SFTP command line use):

  ```bash{promptUser:user}
  echo "get files/private/.build-secrets/tokens.json" | $(terminus connection:info $DESTINATION_SITE_NAME.dev --format=string --field=sftp_command)
  ```

## Upload Your Files

<Partial file="migrate-add-files-only-drupal.md" />

## Restore tokens.json file

1. Connect to your site using SFTP command or credentials from your dashboard to restore the backup of the `tokens.json` file:

  ```bash
  files/private/.build-secrets/tokens.json
  ```

1. Use the SFTP `put` command to upload the file from your local directory (only if using the SFTP command line):

 <Alert title="Note"  type="info" >

 You must run this from the directory where the `tokens.json` backup was downloaded.

 </Alert>

  ```bash{promptUser:user}
  echo "put files/private/.build-secrets/tokens.json" | $(terminus connection:info $DESTINATION_SITE_NAME.dev --format=string --field=sftp_command)
  ```

 You should now have all three of the major components of your site imported into your new site and CI should be working.

1. Clear the caches on the Pantheon Dashboard.

## Troubleshooting

### Provided Host Name Not Valid

Update your `settings.php` file with a trusted host setting, if you receive the following error message:

```none
 The provided host name is not valid for this server
 ```

Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

### Working With Dependency Versions

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/composer)
