---
title: Migrating a Drupal with Composer site to a Build Tools site
description: Migrate a Drupal 9 site created via Pantheon Dashboard (or Terminus) to a Build Tools based site
type: guide
permalink: docs/guides/:basename
cms: "Drupal"
categories: [develop]
tags: [composer, site, workflow]
reviewed: "2022-03-10"
---

In this guide, we will migrate a Drupal with Composer site (site created via Pantheon dashboard or Terminus) to a Build Tools based site.


## Overview

Drupal 9 sites on Pantheon have [Integrated Composer](/integrated-composer) built-in to manage site dependencies. A Build Tools based Drupal 9 site has besides that, an external repository and a Continuous Integration workflow setup.

The goals of this migration are:

1. Create a new Drupal site in Pantheon using Terminus Build Tools plugin

1. Import your existing codebase, database and files into it


## Will This Guide Work for Your Site?

<Partial file="drupal-9/upgrade-site-requirements-from-drupal-recommended.md" />

- You are able to [create a new Drupal 9 site using Terminus Build Tools](https://pantheon.io/docs/guides/build-tools/create-project/#create-a-build-tools-project)

## Before You Begin

- Clone your existing site to your local environment following the `git clone` command from the dashboard.


<Alert title="Note"  type="info" >

Commit history: The steps in this process migrate a site, so the new site will no longer maintain its existing commit history.

</Alert>

## Create a new Terminus Build Tools Drupal 9 site

1. Follow the [Terminus Build Tools Documentation](https://pantheon.io/docs/guides/build-tools/create-project/#create-a-build-tools-project) to create a new Drupal 9 site:

```bash
terminus build:project:create --git=github --team='My Agency Name' d9 my-site
```

1. Wait for the site to be created and the first build finishes.

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment-no-clone-no-alias.md" />

2. Get a local copy of both your new site (from the external repository) and your existing site codebase.

1. This doc uses several commands that depend on the locations of both your existing and new site codebases. To simplify this, set the temporary variables `$SOURCE` and `$DESTINATION` in your terminal session to match your folders location.

   ```bash
   export SOURCE=/absolute/path/to/source/site/codebase
   export DESTINATION=/absolute/path/to/codebase/cloned/from/pantheon
   ```

## Copy Existing Configuration

Copy any existing configuration from the source sitem and update the source path as needed to match your configuration folder:

  ```bash{promptUser:user}
  rsync -avz $SOURCE/config/ $DESTINATION/config/ --delete --delete-after
  # From $DESTINATION:
  git add config
  git commit -m "Pull in configuration from source site"
  ```

It is possible that the Drupal site might have relocated the configuration path to a different location. You can find out where your config yaml files are via:

```bash{promptUser:user}
terminus drush SOURCE_SITE_NAME.dev -- status --fields=config-sync
```

If no files are copied through this step, that's acceptable.

## Add Contributed and Custom Code

This section describes how to replicate your selection of contributed modules and themes, and any custom modules or themes your development team has created in your new project structure.

### Contributed Code

The goal of this process is to have Composer manage all the site's contrib modules, contrib themes, core upgrades, and libraries (referred to as _contributed code_). The only things from the existing site that should remain in the git repository are custom code, custom themes, and custom modules that are specific to the existing site.


#### Modules and Themes


Your site should already be managing contributed modules and themes through composer. To migrate them to the new site, look at the source site `composer.json` and run a `composer require` command for each of those modules and themes in the `$DESTINATION` directory:

```bash
composer require drupal/PROJECT_NAME:^VERSION
```

You can require multiple packages in the same commands if you prefer so.

#### Other Composer Packages

If you have added non-Drupal packages to your site via Composer, use the command `composer require` to migrate each package. You can use the following command to display the differences between the master and your current `composer.json`:

```
diff -Nup --ignore-all-space $SOURCE/composer.json $DESTINATION/composer.json
```

#### Libraries

Libraries can be handled similarly to modules, but the specifics depend on how your library code was included in the source site. If you're using a library's API, you may have to do additional work to ensure that it functions properly.

Do not forget to commit your changes during these steps.

### Custom Code

Manually copy custom code from the existing site repository to the Composer-managed directory.

#### Modules and Themes

To move modules, use the following commands:

```bash{promptUser:user}
mkdir -p $DESTINATION/web/modules/custom
cp -r $SOURCE/modules/custom $DESTINATION/web/modules/custom
# From $DESTINATION:
git add web/modules/
git commit -m "Copy custom modules"
```

To move themes, use the following commands:

```bash{promptUser:user}
mkdir -p $DESTINATION/web/themes/custom
cp -r $SOURCE/themes/custom $DESTINATION/web/themes/custom
# From $DESTINATION:
git add web/themes/
git commit -m "Copy custom themes"
```

Use the above commands with any of the custom code.

#### settings.php

Your existing site may have customizations to `settings.php` or other configuration files. Given that both sites (`$SOURCE` and `$DESTINATION`) have been created from the same upstream, it is ok to replace the `$DESTINATION` `settings.php` with the one coming from the `$SOURCE` site:

```bash{promptUser:user}
cp $SOURCE/web/sites/default/settings.php $DESTINATION/web/sites/default/settings.php
# Review changes and commit as needed
```

The resulting `settings.php` should have no `$databases` array.

### Additional Composer Configuration

Any additional Composer configuration that you have added to your site should be ported over to the new `composer.json` file. This can include configurations related to repositories, minimum-stability, or extra sections.

You can use the diff command to get the information you need to copy:

```
diff -Nup --ignore-all-space $SOURCE/composer.json $DESTINATION/composer.json
```

Commit your changes as needed.

### Push to the external repository master branch

Now push to the master branch in the external repository:

```
git push origin master
```

And wait for Continuous Integration workflow to succeed so that it commits your code changes to the Pantheon site.

## Add Your Database

@TODO This could be redacted better to use the export functionality in dashboard to get the URL and put it into the new site.

<Partial file="migrate-add-database.md" />

## Backup tokens.json file

@TODO: REDACT THIS SECTION BETTER.

Connect to your site using SFTP command or credentials from your dashboard and get a backup of the following file:

```
files/private/.build-tools/tokens.json
```

You can use sftp `get` command to download the file to your local directory if using SFTP command line.  

Here is a single command that downloads the file to the current local directory:

```bash{promptUser:user}
echo "get files/private/.build-tools/tokens.json" | $(terminus connection:info SOURCE_SITE_NAME.dev --format=string --field=sftp_command)
```

## Upload Your Files

@TODO This could be redacted better to use the export functionality in dashboard to get the URL and put it into the new site.

<Partial file="migrate-add-files-only-drupal.md" />

## Restore tokens.json file

@TODO: REDACT THIS SECTION BETTER.

Connect to your site using SFTP command or credentials from your dashboard and restore the backup of the tokens.json file:

```
files/private/.build-tools/tokens.json
```

You can use sftp `put` command to upload the file from your local directory if using SFTP command line.

Below is a single command which does this. This needs to be run from the directory where the `tokens.json` backup was downloaded:

```bash{promptUser:user}
echo "put files/private/.build-tools/tokens.json" | $(terminus connection:info SOURCE_SITE_NAME.dev --format=string --field=sftp_command)
```


You should now have all three of the major components of your site imported into your new site and CI should be working. Clear your caches on the the Pantheon Dashboard, and you are good to go!

## Troubleshooting

### Provided host name not valid

If you receive the error message "The provided host name is not valid for this server.", then update your `settings.php` file with a trusted host setting. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

### Working With Dependency Versions

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/composer)
