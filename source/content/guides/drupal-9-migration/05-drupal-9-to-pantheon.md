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

## Unresolved Questions / TO-DOs

- [How] Do we address nested docroot vs not-nested docroot?
- The document should probably describe the over-all arc we will pursue, at the start
  - Address the question of composer packages being committed to version control, and how we need to not do that for IC
- Configuration - not sure where to fit this, and not sure all sites will have it if we don't tell them how to get it
- Partial `drupal-9/prepare-local-environment.md` says to install the terminus site clone plugin, but I'm not sure this is used?
  - Partial defines a $SITE env var, but we might want to define others...
- I kept referring to the "old site".. not sure if there's a better way to phrase it
- Site structure.. seems like nice info to include, but not sure about the current spot in the doc
- `composer show`
- have them remove packages from their list that we already include (drupal/core-recommended, drupal/core-composer-scaffold..)?  wikimedia merge plugin?
- have them add their "repositories" section to composer.json before adding packages?
- instructions for importing database and files



## Will This Guide Work for Your Site?

- Drupal 9
- Composer-managed
- Able to get a local copy of the existing site / access to a Git repository of it?

## Create a New Drupal 9 Site

1. Log in to your Pantheon account. If you don't have an account yet, [create one first](https://pantheon.io/register?docs) and familiarize yourself with the [User Dashboard](/guides/quickstart/user-dashboard) before you create a new site.

1. Set up [SSH Keys](/ssh-keys) on your local computer and Pantheon account.

1. Navigate to your User Dashboard and click the **Create New Site** button:

  ...

1. Click **Visit your Pantheon Site Dashboard**

Now that you have a new site on Pantheon, you're ready to add the major components from your existing site: custom code, files, and the database.

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

Create a new folder to use while working on the migration.  You will be creating copies of the old site and new site in separate sub-folders.

This doc uses the following aliases:

- **Alias:** `SITE`
- **Site Name:** `anita-drupal`
- **Working folder** ?
- **Old site folder** ?
- **Pantheon site folder** ?


### Create a Local Copy of the Old Site's Code

1. Obtain a local copy of your old site's code.  Your **code** is all custom and contributed modules or plugins, themes, and libraries. The codebase should not include the `sites/default/files` directory, or any other static assets you do not want tracked by version control.

1. Export the database and media files (`sites/default/files`) from the old platform, but do not add them or upload any files to Pantheon.

### Retrieve a Local Copy of the Pantheon Site's Code

1. From the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment of the Site Dashboard, set the site's Development Mode to Git:

  ![Git connection mode](../../../images/dashboard/connection-mode-git.png)

1. Copy the `git clone` command for the site repository.

  The command should look similar to the following:

  ```bash
  git clone ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git
  ```

1. Run the `git clone` command inside your working folder

<!--
### Site Structure

<Partial file="ic-upstream-structure.md" />
-->

## Add in the Custom and Contrib Code Needed to Run Your Site

What makes your site code unique is your selection of contributed modules and themes, and any custom modules or themes your development team has created. These customizations need to be replicated in your new project structure.

### Composer packages

1. Copy your package list from the "requires" section of your site's composer.json and add it to the new site's composer.json.  If your composer.json defines additional repositories or patches, copy those over too.

1. `composer update`

1. `git status` to see if files have been added that aren't ignored by `.gitignore`.  If anything shows up other than `composer.*`, add it to `.gitignore` until `git status` only shows the composer files being modified.

1. `git add composer.*; git commit -m "Add composer packages"`

### Previously on "Composer packages"

We need to add your composer packages to the new site's `composer.json` without committing any of the files created by those packages to version control.  We will build a list of packages to add, then add them one at a time while ensuring that the files they create are included in `.gitignore` so they aren't committed to version control.

1. Navigate to the old site's folder, where the `composer.json` file is located, and have composer list the contrib modules and themes:

  ```bash{promptUser: user}
  composer show -D
  ```

  This lists the packages directly required by `composer.json` and the version currently used by your site.  Since this will be a lengthy process, let's capture that list in a file we can work through while tracking our progress:

  ```bash{promptUser: user}
  composer show -D > composer-package-list.txt
  ```

  This creates a file named `composer-package-list.txt` for you to open in your text editor.

1. Build a list of composer packages and versions to add to the new site.

    - Edit the list produced in the previous step to remove the description, add a caret `^` to the beginning of each version number, and change the space between the package name and version to be a colon `:`.  The result should be a list of `package:^version` like this:

    ```
    drupal/ctools:^3.7.0
    drupal/embed:^1.4.0
    drupal/entity:^1.2.0
    ```

    - If your list contains `cweagans/composer-patches`, move it to the top of the list.

    - If your list contains unsupported composer packages (e.g. `wikimedia/composer-merge-plugin`) they need to be removed.

  <Alert title="Note" type="info">

  If your existing site's `composer.json` contains additional repositories in the `repositories` section, or has patches in the `extras/packages` section, copy those into the pantheon site's `composer.json`

  </Alert>

  <Accordion title="Repositories and patches in composer.json" id="repositories-and-patches-in-composer-json" icon="info-sign">

  Repository in old site's composer.json
  ![repository in old composer.json](https://i.imgur.com/hO0snBW.png)

  Copied to new composer.json without disturbing the "upstream-configuration" one that was already there:
  ![repository moved to new composer.json](https://i.imgur.com/T6eNnXj.png)

  Patches:
  ![repository moved to new composer.json](https://i.imgur.com/x2SYPb1.png)

  </Accordion>

1. For each package in the list we produced in the previous step, use `composer require -W` to add it to the new site, then do `git status` to check for any new files that need to be added to .gitignore.

    1. In the Pantheon site's folder, `composer require -W` the package and version.  For example, if your package list included `drupal/ctools` version `3.7.0`, this is the command you would run:

        ```bash{promptUser: user}
        composer require -W drupal/ctools:^3.7.0
        ```

    2. Run `git status` to check if any .  If any untracked files have appeared, add them to the `.gitignore` file until `git status` only shows `composer.json` and `composer.lock`.  If files composer adds are committed to version control, they will interfere with integrated composer on the platform.

        ```bash{promptUser: user}
        git status
        ```

  <Alert title="Note" type="info">

  Multiple packages can be listed together in the same require command, e.g. `composer require -W drupal/ctools:^3.7.0 drupal/embed:^1.4.0 drupal/entity:^1.2.0`

  </Alert>

1. [Pantheon site folder] Commit the updated composer files.

  ```bash{promptUser: user}
  git add composer.*
  git commit -m "Add contrib projects."
  ```

### Custom Code

Manually copy custom code from the old site to the corresponding Pantheon site directory.

- `web/modules/custom` and `web/libraries` are ignored, so `git add -f`

#### Modules and Themes

[Pantheon site folder] Modules:

```bash{promptUser:user}
cp -R ../old-site/modules/custom web/modules
git add web/modules/custom
git commit -m "Copy custom modules"
```

[Pantheon site folder] Themes:

```bash{promptUser:user}
cp -R ../old-site/themes/custom web/themes
git add web/themes/custom
git commit -m "Copy custom themes"
```

Follow suit with any other custom code you need to carry over.

#### settings.php

Your existing site may have customizations to `settings.php` or other configuration files. Review these carefully and extract relevant changes from these files to copy over. Always review any file paths referenced in the code, as these paths may change in the transition.

We don't recommend that you completely overwrite the `settings.php` file with the old one, as it contains customizations for moving the configuration directory you don't want to overwrite, as well as platform-specific customizations.

The resulting `settings.php` should have no `$databases` array.


### Configuration

Copy over exported configuration from the original site. From the Pantheon D9 site, run the following commands:

  ```bash{promptUser: user}
  mkdir config
  git mv sites/default/config/* config/
  git commit -m "Add site configuration."
  ```



## Deploy

You've now committed your code additions locally.  Push them up to Pantheon to deploy them to your dev environment.

  ```bash{promptUser: user}
  terminus connection:set $SITE.dev git
  git push origin master
  ```

## Import Your Database and Files


1. Import files

1. Import database

1. Rebuild cache:

  ```bash{promptUser: user}
  terminus drush $SITE.dev cr
  ```

1. Run database updates:

  ```bash{promptUser: user}
  terminus drush $SITE.dev -- updatedb
  ```

## Troubleshooting

When there are problems, you can sometimes get helpful messages about what's wrong with:

  ```bash{promptUser: user}
  terminus drush $SITE.dev watchdog:show
  ```

When you make changes to fix a problem, don't forget to rebuild cache:

  ```bash{promptUser: user}
  terminus drush $SITE.dev cr
  ```

## Finish and Review

1. Review the site, then proceed to launch using the [Launch Essentials](/guides/launch) documentation.
