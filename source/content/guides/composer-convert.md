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

For a smooth upgrade experience, and to avoid potential conflicts, this guide shows how to migrate a Drupal 8 site to a freshly prepared, new Drupal 9 site.

The goals of this upgrade are to remove dependencies that Composer will manage from the existing site's Git repository, and have Composer manage those dependencies in the new site instead.

Note that since you are migrating a site through this process, the new site will no longer maintain your existing commit history.

## Before You Begin

This guide uses the local command line environment, and there are several commands dependent on the site name. To make this easier, set the temporary variable `$SITE` in your terminal session to match the site name:

  ```bash{promptUser:user}
  export SITE=anita-drupal
  ```

  <Accordion title="How to Use Terminus to Find the Site Name" id="site-name" icon="info-sign">

  Use `terminus site:list` for a list of sites you have access to:

   ```bash{outputLines:2-6}
   terminus site:list
   --------------------------- --------------------- ------------- ------------------- ---------------- -------------------- --------------------- ------------- ------------
   Name                        ID                    Plan          Framework           Region           Owner                Created               Memberships   Is Frozen?
   --------------------------- --------------------- ------------- ------------------- ---------------- -------------------- --------------------- ------------- ------------
   anita-drupal                abdc80ce-286c-1234-   Sandbox       drupal8             Canada           3374708c-987e-1234   2020-12-15 19:40:42   d3ecc20c-395a false
   anita-wordpres              abdc9954-fab2-1234-   Sandbox       wordpress           United States    c96ddb25-336a-1234   2020-09-02 07:18:51   d3ecc20c-395a false
   ```

   The site name is listed under `Name`. In this example, `anita-drupal`.

  </Accordion>

## Will This Guide Work for Your Site?

You might encounter significant issues if the site does not match these requirements.

- No nested docroot.

   - The process outlined in this guide will not work if the site repository has a `/web` folder at its root.

   - See [Serving Sites from the Web Subdirectory](/nested-docroot) for information about nested docroots.

- The site has the [Pantheon drops-8 repo](https://github.com/pantheon-systems/drops-8) in its Upstream.

  <Accordion title="Use Terminus to Confirm the drops-8 Upstream" id="drops-8-framework" icon="info-sign">

  Run `terminus site:info $SITE` to find the site's `Framework`. The result should be `drupal8` and `Upstream` value should include `git://github.com/pantheon-systems/drops-8.git`.

  This example shows a shortened version of the output:

  ```bash{outputLines:2-18}
  terminus site:info $SITE
  ------------------ -------------------------------------------------------------------------------------
  ID                 abdc3ea1-fe0b-1234-9c9f-3cxeAA123f88
  Name               anita-drupal
  Label              AnitaDrupal
  Created            2019-12-02 18:28:14
  Framework          drupal8
  ...
  Upstream           8a129104-9d37-4082-aaf8-e6f31154644e: git://github.com/pantheon-systems/drops-8.git
  ...
  ------------------ -------------------------------------------------------------------------------------
  ```

  </Accordion>

## Prepare the Site and Environment

1. Review our documentation on [Git](/git), [Composer](/composer), and [Terminus](/terminus), and have them installed and configured on your local computer. Pantheon requires Composer 2 at minimum.

   - Mac users can use [Homebrew](https://brew.sh/) to install both Git and Composer, along with their required dependencies:

    ```bash{promptUser:user}
    brew install git composer
    ```

1. [Clone](/git#clone-your-site-codebase) your current Pantheon site repository to a working directory on your local computer.

1. [Update the site](/core-updates) to the latest [Pantheon Drops 8](https://github.com/pantheon-systems/drops-8) Upstream and apply all available updates.

   - Use Terminus to list all available updates:

    ```bash{outputLines:2}
    terminus upstream:updates:list $SITE
    [warning] There are no available updates for this site.
    ```

    If any updates are available, apply them using the command line or via the [Pantheon Dashboard](/core-updates#apply-upstream-updates-via-the-site-dashboard) before continuing.

## Add the Pantheon Integrated Composer Upstream in a New Local Branch

This process involves significant changes to the codebase. We recommend you to do this work on a new branch, as it might take you some time to complete and rolling back changes can be complicated:

1. In your local terminal, change directories to the site project. For example, if you keep your projects in a folder called `projects` in the home directory:

  ```bash{promptUser:user}
  cd ~/projects/$SITE/
  ```

1. Add the Pantheon Drupal Upstream as a new remote called `ic`, fetch the `ic` branch, and checkout to a new local branch based on it called `composerify`:

  ```bash{promptUser:user}
  git remote add ic git@github.com:pantheon-upstreams/drupal-project.git && git fetch ic && git checkout -b composerify ic/master
  ```

  If you prefer, you can replace `composerify` with another branch name. If you do, remember to adjust the other examples in this doc to match.

1. Copy any existing configuration from the default branch. If no files are copied through this step, that's ok:

  ```bash{promptUser:user}
  git checkout master sites/default/config
  git mv sites/default/config/* config
  git rm -f sites/default/config/.htaccess
  git commit -m "Pull in configuration from default branch"
  ```

1. Check for `pantheon.yml` settings you need to preserve by comparing your old codebase's `pantheon.yml` to the new `pantheon.upstream.yml`:

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

#### Libraries

Libraries can be handled in the same way, but the specifics depend on how your library code was included in the source site. If you're using a library's API, you may have to do additional work to ensure that library functions properly.

### Custom Code

Manually copy custom code from the existing site repository to the Composer-managed directory.

#### Modules and Themes

Modules:

```bash{promptUser:user}
mkdir -p ../$SITE-composer/web/modules/custom # create the directory if it doesn't already exist
cp -r /modules/custom/awesome_module ../$SITE-composer/web/modules/custom
```

Themes:

```bash{promptUser:user}
mkdir -p ../$SITE-composer/web/themes/custom # create the directory if it doesn't already exist
cp -r /themes/custom/great_theme ../$SITE-composer/web/themes/custom
```

Follow suit with any other custom code you need to carry over.

#### Settings.php

Your existing site may have customizations to `settings.php` or other configuration files. Review these carefully and extract relevant changes from these files to copy over. Always review any file paths referenced in the code, as these paths may change in the transition to Composer.

It is not wise to completely overwrite the `settings.php` file with the old one, as there are customizations for moving the configuration directory you don't want to overwrite, as well as platform-specific customizations.

```bash{promptUser:user}
git status # Ensure working tree is clean
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

Locate the configuration files in the existing site and move them here. If they are stored in the files directory on your existing site, retrieve them via [SFTP](/sftp), as the Git clone would not contain them. The example project is configured to use this location.

## Deploy

You've now committed the code to the local branch. If the site has [Multidev](/multidev), you can deploy that branch directly to a new Multidev and test the site in the browser. If the site doesn't load properly, clear the cache. If there are any issues, utilize the site's logs via `terminus drush $SITE.composerify -- wd-show` to inspect the watchdog logs, or follow the directions in our documentation on [log collection](/logs).

### Deploy to a Multidev (optional)

Continue to [Deploy to Dev](#deploy-to-dev) if you don't have access to access to Multidev.

If the site has Multidev, push the changes to a Multidev called `composerify` to safely test the site without affecting the Dev environment:

```bash{promptUser:user}
git add .
git commit -m "ran composer prepare-for-pantheon and install"
git push origin composerify && terminus env:create $SITE.dev composerify
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
