---
title: Upgrade a Drupal 8 Site to a Composer-Managed Drupal 9 Site
description: Upgrade a Drupal 8 site to integrated Composer and Drupal 9.
type: guide
permalink: docs/guides/:basename
cms: "Drupal"
categories: [develop]
tags: [composer, site, workflow]
contributors: [dustinleblanc, greg-1-anderson, stovak]
reviewed: "2021-03-10"
---

Drupal 9 sites on Pantheon have Composer built-in to manage site dependencies.

For a smooth upgrade experience, and to avoid potential conflicts, this doc shows how to migrate a Drupal 8 site to a freshly prepared, new Drupal 9 site.

The goals of this upgrade are to remove dependencies from the old site that Composer will manage from your Git repository, and tell Composer about those dependencies in the new site instead.

Please note, that since you are migrating a site through this process, the new site will no longer maintain your existing commit history.

## Before You Begin

<Alert title="Danger" type="danger">
Using this tutorial without having met all of the the below criterion could result in damage to your site making it inoperable.
</Alert>

This document is for you if you meet the following criterion:

- You have [Git](/git), [Composer](/composer), and [Terminus](/terminus),
  installed and configured on your local computer.

  If not, you'll need to install these utilities for your specific operating system.

  - Mac users can use [Homebrew](https://brew.sh/) to install both
    Git and Composer, along with their required dependencies:

    ```bash{promptUser:user}
    brew install git composer
    ```

  - Windows instructions are forthcoming.

- You have a [local copy](/git#clone-your-site-codebase) of your site
  cloned from it's git repo your _current_ Pantheon site repository in a working directory on your local computer.

- Your site repository DOES NOT have a "/web" folder at it's root.

- [Serving Sites from the Web Subdirectory](/nested-docroot)

- Your site has our DROPS-8 repo in it's upstream.

  You can find out the answer to that question with the following command(s):

  ```bash{outputLines:2-99}
  terminus site:info $SITE
  ------------------ -------------------------------------------------------------------------------------
  ID                 3f2a3ea1-fe0b-1234-9c9f-3cxeAA123f88
  Name               my-example-site
  Label              MyExampleSite
  Created            2019-12-02 18:28:14
  Framework          drupal8
  Region             United States
  Organization       3f2a3ea1-fe0b-1234-9c9f-3cxeAA123f88
  Plan               Elite
  Max Multidevs      Unlimited
  Upstream           8a129104-9d37-4082-aaf8-e6f31154644e: git://github.com/pantheon-systems/drops-8.git
  Holder Type        organization
  Holder ID          3f2a3ea1-fe0b-1234-9c9f-3cxeAA123f88
  Owner              3f2a3ea1-fe0b-1234-9c9f-3cxeAA123f88
  Is Frozen?         false
  Date Last Frozen   1970-01-01 00:00:00
  ------------------ -------------------------------------------------------------------------------------
  ```

  The `Framework` should be `drupal8` and `Upstream` value should be `git://github.com/pantheon-systems/drops-8.git`.
  If not, this document does not apply to you.

- Your site has applied all of the most recent updates from the
  drops-8 upstream.

  You can find out the answer to that question with the following command:

  ```bash{outputLines:2-6}
  terminus upstream:updates:list $SITE
  [warning] There are no available updates for this site.
  ----------- ----------- --------- --------
  Commit ID   Timestamp   Message   Author
  ----------- ----------- --------- --------
  ```

  Anything other than "no updates available" and you will need to apply the updates either by command line or via the Pantheon dashboard before continuing.

- You are not using a package/library manager (like "Ludwig").

  Some installs have used a package manager (e.g. [Ludwig](https://www.drupal.org/project/ludwig)). If you meet all the other requirements, you should disable it in Drupal 8's admin (under "EXTEND"). And it should not be included when you move the modules over, later in this tutorial.

This guide uses the local command line environment, and there are several commands dependent on your specific site. Before we begin, set the variable `$SITE` in your terminal session to match your site name. You can find a list of sites and sitenames by using the terminus command like so:

<Accordion title="How to Use Terminus to Find the Site Name" id="site-name" icon="info-sign">
```bash{outputLines:2-99}
terminus site:list
--------------------------- --------------------- ------------- ------------------- ---------------- -------------------- --------------------- ------------- ------------
Name                        ID                    Plan          Framework           Region           Owner                Created               Memberships   Is Frozen?
--------------------------- --------------------- ------------- ------------------- ---------------- -------------------- --------------------- ------------- ------------
canada-moose-nwork          a3d980ce-286c-1234-   Sandbox       drupal8             Canada           3374708c-987e-1234   2020-12-15 19:40:42   d3ecc20c-395a false
wordpress-johnny-test       a4cd9954-fab2-1234-   Sandbox       wordpress           United States    c96ddb25-336a-1234   2020-09-02 07:18:51   d3ecc20c-395a false
my-example-site             a5ef29b8-8886-1234-   Elite         wordpress           United States    ed828d9d-2389-1234   2020-03-29 18:25:32   d3ecc20c-395a false
afrocentric-ventures        a6328b1d-08a5-1234-   Sandbox       wordpress_network   EU               c41af587-4e78-1234   2019-12-23 15:23:02   d3ecc20c-395a true
--------------------------- --------------------- ------------- ------------------- ---------------- -------------------- --------------------- ------------- ------------
```
</Accordion>
Once you have your site name value export it as an environment variable:

```bash{promptUser:user}
export SITE=my-example-site
```

## Add the Pantheon Integrated Composer Upstream in a New Local Branch

This process involves significant changes to the codebase. We recommend you to do this work on a new branch, as it might take you some time to complete and rolling back changes can be complicated:

1.  In your local terminal, change directories to your site project. For example, if you keep your projects in a folder called `projects` in the home directory:

```bash{promptUser:user}
cd ~/projects/$SITE/
```

1.  Add the Pantheon Drupal Upstream as a new remote called `ic`, fetch the `ic` branch, and checkout to a new local branch based on it called `composerify`:

    ```bash{promptUser:user}
    git remote add ic git@github.com:pantheon-upstreams/drupal-project.git && git fetch ic && git checkout -b composerify ic/master
    ```

If you prefer, you can replace `composerify` with another branch name. If you do, remember to adjust the other examples in this doc to match.

1.  Copy any existing configuration from the default branch. If no files are copied through this step, that's ok:

    ```bash{promptUser:user}
    git checkout master sites/default/config
    git mv sites/default/config/* config
    git rm -f sites/default/config/.htaccess
    git commit -m "Pull in configuration from default branch"
    ```

1.  Check for `pantheon.yml` settings you need to preserve by comparing your old codebase's `pantheon.yml` to the new `pantheon.upstream.yml`:

    ```bash{promptUser:user}
    git diff master:pantheon.yml pantheon.upstream.yml
    ```

- If there are settings from `pantheon.yml` (shown with a `-` in the diff output), consider copying over your old `pantheon.yml` to preserve these settings:

  ```bash{promptUser:user}
  git checkout master pantheon.yml
  git add pantheon.yml
  git commit -m 'Copy my pantheon.yml'
  ```

If you prefer to keep the value for `database` from `pantheon.upstream.yml`, remove it from `pantheon.yml`.

## Add in the Custom and Contrib Code Needed to Run Your Site

What makes your site code unique is your selection of contributed modules and themes, and any custom modules or themes your development team has created. These customizations need to be replicated in your new project structure.

### Contributed Code

#### Modules and Themes

THE GOAL: To have composer manage all your contrib modules, contrib themes, core upgrades and libraries. The only thing that should be checked in is custom code, custom themes and custom modules that are specific to your site and your site alone.

WHY?: So that upgrading your Drupal install is a matter of `cd`-ing to the directory and running `composer upgrade`

To serve this end: we need to make sure all of your modules and themes that were downloaded from drupal.org are in the `composer.json` "require" list.

A Composer-managed site should be able to include all custom code via Composer. Begin by reviewing your existing site's code. Check for contributed modules in `/modules`, `/modules/contrib`, `/sites/all/modules`, and `/sites/all/modules/contrib`.

1. When reviewing the site, take stock of exactly what versions of modules and themes you depend on. One way to do this is to use a command like the following from within a contributed modules folder (e.g. `/modules`, `/themes`, `/themes/contrib`, `/sites/all/themes`, `/sites/all/themes/contrib`, etc.).

This command works on Drush 8. If you're using Drush 9, use `pm:list` or refer to [Drush Commands](https://drushcommands.com/drush-9x/pm/pm:projectinfo/):

```bash{promptUser:user}
terminus drush $SITE.dev -- pm:projectinfo --fields=name,version --format=table
```

This will list each module followed by the version of that module that is installed.

1. You can add these modules to your new codebase using Composer by running the following for each module in the `$SITE-composer` directory.

If you use the [Ludwig module](https://www.drupal.org/project/ludwig) do not add it since Composer will take over:

```bash{promptUser:user}
composer require drupal/MODULE_NAME:^VERSION
```

Where `MODULE_NAME` is the machine name of the module in question, and `VERSION` is the version of that module the site is currently using. Composer may pull in a newer version than what you specify, depending upon what versions are available. You can read more about the caret (`^`) [in the documentation for Composer](https://getcomposer.org/doc/articles/versions.md#caret-version-range-) itself.

- If you get the following error, the module listed in the error (or its dependencies) does not meet compatibility requirements:

```none
[InvalidArgumentException]
Could not find a version of package drupal/MODULE_NAME matching your minimum-stability (stable). Require it with an explicit version constraint allowing its desired stability.
```

If there is not a stable version you can switch to, you may need to adjust the `minimum-stability` setting of `composer.json` to a more relaxed value, such as `beta`, `alpha`, or even `dev`. You can read more about `minimum-stability` [in the documentation for Composer](https://getcomposer.org/doc/04-schema.md#minimum-stability) itself.

<Alert type="danger" name="Warning" >
We have a script that identifies those modules and puts them in your composer.json file, but the script has limitations:

1. This script DOES NOT resolve your composer.json version problems.

   If there's a version conflict when you `composer install` you will need to resolve them yourself. The first time may be a little painful but going forward, you shouldn't have to do this every time you upgrade. This should be a one-and-done task.

1. This script DOES NOT Check for D9 compatibility.

   The Drupal module that does that is called ("upgrade status")[https://drupal.org/project/upgrade_status].

1. This script DOES NOT Resolve module stability.

   If you get the following error:

   ```none
   [InvalidArgumentException]
   Could not find a version of package drupal/MODULE_NAME matching your minimum-stability (stable). Require it with an explicit version constraint allowing its desired stability.
   ```

   It means that one of the modules you are using (or its dependencies) are not stable. If there is not a stable version you can switch to, you may need to adjust the `minimum-stability` setting of `composer.json` to a more relaxed value, such as `beta`, `alpha`, or even `dev`. You can read more about `minimum-stability` [in the documentation for Composer](https://getcomposer.org/doc/04-schema.md#minimum-stability) itself.

1. This script DOES NOT resolve patches.

   Many times a module will be "patched" or have a `.patch` file that fixes known issues before the fix is available in the downloaded version. This script does not attempt to resolve any patches.

To run the module migration script, cd to the root directory of your repository and run `bin/migrateModules.php`.

you can see which modules were added by running `git diff composer.json`.
</Alert>

#### Libraries

Javascript Libraries can/should be added by requiring them like so:

```
composer require npm-asset/{NPM MODULE NAME}
composer require bower-asset/{NPM MODULE NAME}

```

doing so will install them in the web/libraries folder and they will get security updates when you run `composer update` along with all your Drupal modules and core.

### Custom Code

#### Modules and Themes

Custom code should be manually copied from the existing site repository to the Composer managed directory.

Modules:

```bash{promptUser:user}
mkdir -p ../$site-composer/web/modules/custom # create the directory if it doesn't already exist
cp -r /modules/custom/awesome_module ../$site-composer/web/modules/custom
```

Themes:

```bash{promptUser:user}
mkdir -p ../$site-composer/web/themes/custom # create the directory if it doesn't already exist
cp -r /themes/custom/great_theme ../$site-composer/web/themes/custom
```

Follow suit with any other custom code you need to carry over.

#### Settings.php

Your existing site may have customizations to `settings.php` or any other config files. Review these carefully and extract relevant changes from these files to copy over. Always review any file paths referenced in the code, as these paths may change in the transition to Composer.

It is not wise to completely overwrite the `settings.php` file with the old one, as there are customizations for moving the configuration directory you don't want to overwrite, as well as platform specific customizations.

```bash{promptUser:user}
# Ensure working tree is clean
git status
git checkout master sites/default/settings.php
diff -Nup web/sites/default/settings.php sites/default/settings.php
# Edit settings.php as needed
rm sites/default/settings.php
```

The resulting `settings.php` should have no `$databases` array.

#### Configuration

If you are using an exported config, you will need to move the configuration files to a new location. The preferred (and assumed) location of the configuration directories when using a nested docroot and Composer is at the root of the repository next to the web directory:

```none
 site-composer
|-web
|-config    <--Here!
|-vendor
|-composer.json
|-etc...
```

Locate the configuration files in your existing site and move them here. If they are stored in the files directory on your existing site, retrieve them via [SFTP](/sftp), as the Git clone would not contain them. The example project is configured to use this location.

## Deploy

You've now committed the code to the local branch. If your site has [Multidev](/multidev), you can deploy that branch directly to a new Multidev and test the site in the browser. If the site doesn't load properly, clear the cache. If there are any issues, utilize your site's logs via `terminus drush $site.composerify -- wd-show` to inspect the watchdog logs, or follow the directions in our documentation on [log collection](/logs).

### Deploy to a Multidev (optional)

Continue to [Deploy to Dev](#deploy-to-dev) if you don't have access to access to Multidev.

If your site has Multidev, push the changes to a Multidev called `composerify` to safely test the site without affecting the Dev environment:

```bash{promptUser:user}
git add .
git commit -m "ran composer prepare-for-pantheon and install"
git push origin composerify && terminus env:create $site.dev composerify
```

Once you have confirmed the site is working, merge `composerify` into `master`, and follow the standard workflow to QA a code change before going live.

### Deploy to Dev

If you have a [local development](/local-development) solution, consider testing your `composerify` branch locally before merging.

To force push the changes from the local branch to the `master` Dev branch:

```bash{promptUser:user}
git add .
git commit -m "ran composer prepare-for-pantheon and install"
git push -f origin composerify:master
```

## Change Upstreams

Set the site to use the Drupal 9 Upstream:

```bash{promptUser:user}
terminus site:upstream:set $SITE drupal9
```

## Ongoing Core Updates

One-click core updates can be made through the Dashboard.

Navigate to **Code** in the Dev tab of the site's Dashboard. Click **Check Now**. If updates are available, click **Apply Updates**.

## Troubleshooting

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/composer)
