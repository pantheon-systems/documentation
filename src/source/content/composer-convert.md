---
title: Convert a Standard Drupal Site to a Composer Managed Site
description: Upgrade a standard Drupal site by converting it to a Composer-managed Drupal site on the new Integrated Composer framework. 
tags: [composer, site, workflow]
contributors: [dustinleblanc, greg-1-anderson, stovak]
reviewed: "2022-12-12"
contenttype: [doc]
innav: [true]
categories: [optimize]
cms: [drupal8]
audience: [development]
product: [--]
integration: [--]
---

In this guide, we'll convert a standard Drupal site to use Composer to manage deployments and dependencies, then switch from `drops-8` to the new Integrated Composer `drupal-composer-managed` upstream while remaining on the current version of Drupal.

During this process, you will create a new branch based on the Git history of the new upstream.  You'll then re-add the contrib and custom code for your site to the new branch, and test it on a Multidev environment.  When everything is working correctly in the Multidev environment, you'll deploy the changes to the Dev environment by replacing your site's master branch with the new branch you've created.  Finally, after testing and confirming everything looks good, you'll use Terminus to switch the site over to the new upstream.

<Partial file="drupal/see-landing.md" />

## Overview

Drupal sites on Pantheon have [Integrated Composer](/guides/integrated-composer) built-in to manage site dependencies.

The goals of this conversion are:

1. Remove dependencies that Composer will manage from the existing Drupal site's Git repository, and have Composer manage those dependencies instead.

1. Switch to the `drupal-composer-managed` Integrated Composer upstream.

The `drupal-composer-managed` Integrated Composer upstream works with all versions of Drupal, and following the `drupal-composer-managed` upstream will help keep your site up to date with any general configuration changes recommended by Pantheon.

Add Drupal core dependency instructions to `drupal/core-recommended`, to keep the site on the current version of Drupal until you are ready to upgrade to the latest version of Drupal.

## Will This Guide Work for Your Site?

Confirm that your site meets the following requirements before you continue:

- The site cannot be set to use an empty upstream.

- The site does not use a nested docroot.

   - The process outlined in this guide will not work if the site repository has a `/web` folder at its root.

   - Refer to the documentation on [Serving Sites from the Web Subdirectory](/nested-docroot) for information about nested docroots.

- The site does not use another package and library manager like [Ludwig](https://www.drupal.org/project/ludwig).

## Before You Begin

- This guide is written for users with access to Pantheon's [Multidev](/guides/multidev) feature. Pantheon support is not available to users who avoid the Multidev steps.

- The site owner should ensure the trusted host setting is up-to-date. Refer to the [Trusted Host Setting](/guides/php/settings-php#trusted-host-setting) documentation for more information.

<Alert title="Note" type="info" >
  
The steps in this process migrate a site, so the new site will no longer maintain its existing commit history.

</Alert>

## Prepare the Local Environment

<Partial file="drupal/prepare-local-environment-no-clone.md" />

## Apply All Available Upstream Updates

<Partial file="drupal-apply-upstream-updates.md" />

## Add the Integrated Composer Upstream in a New Local Branch

This process involves significant changes to the codebase that may take some time to complete and can be complicated to roll back. 

To minimize issues, make the codebase changes in a new branch:

1. In your local terminal, change directories to the site project. For example, if you keep your projects in a folder called `projects` in the home directory:

  ```bash{promptUser:user}
  cd ~/projects/$SITE/
  ```

1. Add the Pantheon Drupal Project upstream as a new remote called `ic`, fetch the `ic` upstream, and checkout to a new local branch called `composerify`:

  ```bash{outputLines:2}
  git remote add ic https://github.com/pantheon-upstreams/drupal-composer-managed.git && git fetch ic && git checkout --no-track -b composerify ic/main
  Switched to a new branch 'composerify'
  ```

  If you prefer, you can replace `composerify` with another branch name. If you do, remember to adjust the other examples in this doc to match.

  <Accordion title="Troubleshoot: Permission denied (publickey)" id="permission-denied-publickey" icon="question-sign">

  If you encounter a `Permission denied (publickey)` error, check that your [SSH keys](/ssh-keys) are set up correctly.

  If you continue to encounter the error, use HTTPS to add the remote:

   ```bash{outputLines:2}
   git remote add ic https://github.com/pantheon-upstreams/drupal-composer-managed.git && git fetch ic && git checkout --no-track -b composerify ic/main
   Switched to a new branch 'composerify'
   ```

  </Accordion>

### Set Drupal Core Version

Set the Drupal core version to ensure the site remains on the current version of Drupal for now. If your current version is not `^9`, replace the `9` with your current version:

<Partial file="drupal/core-version-remain-on-d8.md" />

### Add Upgrade Status Module

This step is optional; you can wait and add the Upgrade Status module to your site later.

The Upgrade Status module will help to determine whether or not your site is ready to upgrade to the latest version of Drupal.

Add the Upgrade Status module to your site with Composer:

  ```bash{promptUser:user}
  composer require drupal/upgrade_status
  git add composer.*
  git commit -m "Add Upgrade Status module"
  ```

When you are ready to begin upgrading your site to the latest version of Drupal, you may enable this module and view the status report it provides to find things that need to be done before upgrading.

### Copy Existing Configuration

Copy any existing configuration from the default branch. Please note that there might not be any files to copy through this step:

  ```bash{promptUser:user}
  git checkout master sites/default/config
  git mv sites/default/config/* config
  git rm -f sites/default/config/.htaccess
  git commit -m "Pull in configuration from default branch"
  ```

### Copy pantheon.yml

1. Compare the old codebase's `pantheon.yml` to the new `pantheon.upstream.yml`:

  ```bash{promptUser:user}
  git diff master:pantheon.yml pantheon.upstream.yml
  ```

  Press `q` on your keyboard to exit the `diff` display.

1. Copy the old `pantheon.yml` to preserve settings:

  ```bash{promptUser:user}
  git checkout master pantheon.yml
  git add pantheon.yml
  git commit -m 'Copy my pantheon.yml'
  ```

  Remove any values from `pantheon.yml` that you prefer to keep listed in `pantheon.upstream.yml`. Then, add `build_step: true` to `pantheon.yml` if it is not already included.

 In the `pantheon.yml` file, the `api_version: 1` and `build_step: true` values are required.

## Add the Custom and Contrib Code Needed to Run Your Site

What makes your site code unique is your selection of contributed modules and themes, and any custom modules or themes your development team has created. These customizations need to be replicated in your new project structure.

### Contributed Code

The goal of this process is to have Composer manage all the site's contrib modules, contrib themes, core upgrades, and libraries (we'll call this _contributed code_). The only things that should be migrated from the existing site are custom code, custom themes, and custom modules that are specific to the existing site.

#### Modules and Themes

The steps here ensure that any modules and themes from [drupal.org](https://drupal.org) are in the `composer.json` `require` list.

Once Composer is aware of all the contributed code, you'll be able to run `composer update` from within the directory and Composer will upgrade all the contributed code automatically.

Begin by reviewing the existing site's code. Check for contributed modules in `/modules`, `/modules/contrib`, `/sites/all/modules`, and `/sites/all/modules/contrib`.

1. Review the site and create an accurate list of which versions of modules and themes you depend on. One way to do this is to run the `pm:list` Drush command from within a contributed modules folder (e.g. `/modules`, `/themes`, `/themes/contrib`, `/sites/all/themes`, `/sites/all/themes/contrib`, etc.).

  This will list each module followed by the version of that module that is installed:

  ```bash{promptUser:user}
  terminus drush $SITE.dev pm:list -- --no-core --fields=name,version  --format=table
  ```

1. You can add these modules to your new codebase using Composer by running the following for each module in the `$SITE` directory:

  ```bash{promptUser:user}
  composer require drupal/MODULE_NAME:^VERSION
  ```

<Partial file="module-name.md" />

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

    <Partial file="module_name.md" />	  

#### Other Composer Packages

If you have added non-Drupal packages to your site via Composer, use the command `composer require` to migrate each package. You can use the following command to display the differences between the master and your current `composer.json`:

```
git diff master:composer.json composer.json
```

#### Libraries

Libraries are handled similarly to modules, but the specifics depend on how your library code was included in the source site. They may have been included:

- by manually committing them to web/libraries.
- using the drupal libraries module.
- as a repository in an existing project `composer.json` file by using custom repository configuration.
- as a dependency of type `drupal-library` in a contrib module's `composer.json`.

For packages of type `drupal-library`, define the `installer-path` to `web/libraries`, and require your packages in the same method as Drupal contrib modules.  Refer to [`composer.json`](https://github.com/pantheon-upstreams/drupal-composer-managed/blob/main/composer.json#L49) as an example. 

If contributed modules require manually adding libraries (for example, the module does not use a `composer.json` file to download its required libraries), you may add the libraries directly to your `require` section. 

### Custom Code

Next, manually copy custom code from the existing site repository to the Composer-managed directory.

#### Modules and Themes

To move modules, use the following commands:

```bash{promptUser:user}
git checkout master modules/custom
git mv modules/custom web/modules/
git commit -m "Copy custom modules"
```

To move themes, use the following commands:

```bash{promptUser:user}
git checkout master themes/custom
git mv themes/custom web/themes/
git commit -m "Copy custom themes"
```

Use the above commands with any of the custom code.

#### settings.php

Your existing site may have customizations to `settings.php` or other configuration files. Review these carefully and extract relevant changes from these files to copy over. Always review any file paths referenced in the code, as these paths may change in the transition to Composer.

We don't recommend that you completely overwrite the `settings.php` file with the old one, as it contains customizations for moving the configuration directory that you don't want to overwrite, as well as platform-specific customizations.

```bash{promptUser:user}
git status # Ensure working tree is clean
git show master:sites/default/settings.php > web/sites/default/original-settings.php
diff -Nup --ignore-all-space web/sites/default/settings.php web/sites/default/original-settings.php
# edit web/sites/default/settings.php and commit as needed
rm web/sites/default/original-settings.php
```

The resulting `settings.php` should have no `$databases` array.

### Additional Composer Configuration

Any additional Composer configuration that you have added to your site should be ported over to the new `composer.json` file. This can include configurations related to repositories, minimum-stability, or extra sections.

You can use the `diff` command to get the information you need to copy:

```
git diff master:composer.json composer.json
```

## Deploy

You've now committed the code to the local branch. Deploy that branch directly to a new Multidev (called `composerify` in the steps below) and test the site in the browser.

### Deploy to a Multidev

1. Push the changes to a Multidev called `composerify` to safely test the site without affecting the Dev environment:

   ```bash{promptUser:user}
   git push -u origin composerify && terminus env:create $SITE.dev composerify
   ```

1. Make a small change to `pantheon.yml`:

   ```yaml:title=pantheon.yml
   database:
    version: 10.4

   # add a comment to trigger a change and build
   ```

1. Commit and push the change to trigger an Integrated Composer build on the Multidev:

   ```bash{promptUser: user}
   git commit -am "trigger composer build"
   git push origin composerify
   ```

Since the commit history of the `composerify` Multidev has no commits in common with the `master` branch, there will be no Multidev commit history in the Dashboard or the Integrated Composer logs.

If the site is not working, try this Composer command on the local `composerify` branch:

```bash{promptUser:user}
composer --no-dev --optimize-autoloader --no-interaction --no-progress --prefer-dist --ansi install
```

If Composer runs into an error or if any files have been changed (files that are not ignored by `.gitignore`), resolve those issues before you continue. Refer to the [Integrated Composer Troubleshooting](/guides/integrated-composer/ic-troubleshooting) section for more information about troubleshooting Integrated Composer.

### Move composerify to the Main Dev Branch

Once you have confirmed that the site works in the Multidev, replace the `master` branch and its commit history with the `composerify` Multidev's commit history.

1. Retrieve the most recent commit hash from the local `composerify` branch:

   ```bash{promptUser:user}
   git log --format="%H" -n 1
   ```

   This will give you a commit hash like `fd3636f58f5b275b998bb1c9267bff8808353840`.

1. Reset the `master` branch to match that commit then force push that to the Dev environment:

   ```bash{promptUser: user}
   git checkout master
   git reset --hard fd3636f58f5b275b998bb1c9267bff8808353840
   git push --force origin master
   ```

Your site's Dev environment is now set up to use the latest version of the Drupal Integrated Composer upstream. 

### Troubleshooting: Inspect Site Logs

If the site doesn't load properly, before you investigate any specific issues, clear the cache and try again.

Use Terminus to inspect the site's logs;

```bash{promptUser: user}
terminus drush $SITE.composerify -- wd-show
```

Refer to our [logs collection](/guides/logs-pantheon) documentation for more information.

### Troubleshooting: Provided host name not valid

If you receive the error message "The provided host name is not valid for this server.", then update your `settings.php` file with a trusted host setting. Refer to the [Trusted Host Setting](/guides/php/settings-php#trusted-host-setting) documentation for more information.

## Change Upstreams

Your Pantheon site is now set up to use the latest version of Drupal Integrated Composer upstream. To continue tracking additional changes to the Pantheon upstream, change the upstream your site is tracking with Composer:

```bash{promptUser:user}
terminus site:upstream:set $SITE drupal-composer-managed
```

Following the `drupal-composer-managed` upstream will help keep your site up to date with any general configuration changes recommended by Pantheon. The dependency you added above on `drupal/core-recommended` will keep you on the current version of Drupal until you are ready to upgrade to the latest version.

## Working With Dependency Versions

<Partial file="composer-updating.md" />

## More Resources

- [Composer Fundamentals and Workflows](/guides/composer)

- [WordPress with Composer on Pantheon](/guides/wordpress-composer)
