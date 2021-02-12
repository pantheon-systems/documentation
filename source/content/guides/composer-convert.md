---
title: Upgrade a Drupal 8 Site to a Composer-Managed Drupal 9 Site
description: Upgrade a Drupal 8 site to integrated Composer and Drupal 9.
type: guide
permalink: docs/guides/:basename
cms: "Drupal"
categories: [develop]
tags: [composer, site, workflow]
contributors: [dustinleblanc, greg-1-anderson]
reviewed: "2020-12-01"
---

Drupal 9 sites on Pantheon have Composer built-in to manage site dependencies.

For a smooth upgrade experience, and to avoid potential conflicts, this doc shows how to migrate a Drupal 8 site to a freshly prepared, new Drupal 9 site.

The goals of this upgrade are to remove dependencies from the old site that Composer will manage from your Git repository, and tell Composer about those dependencies in the new site instead.

Please note, that since you are migrating a site through this process, the new site will no longer maintain your existing commit history.

## Before You Begin

- Review our documentation on [Git](/git), [Composer](/composer), and [Terminus](/terminus), and have them installed and configured on your local computer. Pantheon requires Composer 2 at minimum.
   - Mac users can use [Homebrew](https://brew.sh/) to install both Git and Composer, along with their required dependencies:

     ```bash{promptUser:user}
     brew install git composer
     ```

- [Clone](/git#clone-your-site-codebase) your current Pantheon site repository to a working directory on your local computer.
- Review [Serving Sites from the Web Subdirectory](/nested-docroot)

<Alert title="Exports" type="export">

This guide uses the local command line environment, and there are several commands dependent on your specific site. Before we begin, set the variable `$site` in your terminal session to match your site name:

```bash{promptUser:user}
export SITE=my-example-site
```

</Alert>

## Add the Pantheon Integrated Composer Upstream in a New Local Branch

This process involves significant changes to the codebase. We recommend you to do this work on a new branch, as it might take you some time to complete and rolling back changes can be complicated:

1. In your local terminal, change directories to your site project. For example, if you keep your projects in a folder called `projects` in the home directory:

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

   If you prefer to keep the values for any of the following settings from `pantheon.upstream.yml`, remove them from `pantheon.yml`:

     * `web_docroot`
     * `build_step`
     * `database`

## Add in the Custom and Contrib Code Needed to Run Your Site

What makes your site code unique is your selection of contributed modules and themes, and any custom modules or themes your development team has created. These customizations need to be replicated in your new project structure.

### Contributed Code

#### Modules and Themes

A Composer-managed site should be able to include all custom code via Composer. Begin by reviewing your existing site's code. Check for contributed modules in `/modules`, `/modules/contrib`, `/sites/all/modules`, and `/sites/all/modules/contrib`.

When reviewing your site, take stock of exactly what versions of modules and themes you depend on. One way to do this is to use a command like the following from within a contributed modules folder (e.g. `/modules`, `/themes`, `/themes/contrib`, `/sites/all/themes`, `/sites/all/themes/contrib`, etc.):

```bash{promptUser:user}
terminus drush $site.dev -- pm:projectinfo --fields=name,version --format=table
```

This will list each module followed by the version of that module that is installed.

You can add these modules to your new codebase using Composer by running the following for each module in the `$site-composer` directory:

```bash{promptUser:user}
composer require drupal/MODULE_NAME:^VERSION
```

Where `MODULE_NAME` is the machine name of the module in question, and `VERSION` is the version of that module your site is currently using. Composer may pull in a newer version than what you specify, depending upon what versions are available. You can read more about the caret (`^`) [in the documentation for Composer](https://getcomposer.org/doc/articles/versions.md#caret-version-range-) itself.

If you get the following error:

```none
[InvalidArgumentException]
Could not find a version of package drupal/MODULE_NAME matching your minimum-stability (stable). Require it with an explicit version constraint allowing its desired stability.
```

It means that one of the modules you are using (or its dependencies) are not stable. If there is not a stable version you can switch to, you may need to adjust the `minimum-stability` setting of `composer.json` to a more relaxed value, such as `beta`, `alpha`, or even `dev`. You can read more about `minimum-stability` [in the documentation for Composer](https://getcomposer.org/doc/04-schema.md#minimum-stability) itself.

#### Libraries

Libraries can be handled in the same way, but the specifics depend on how your library code was included in the source site. If you're using a library's API, you may have to do additional work to ensure that library functions properly.

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

## Set up a Multidev (Optional)

If your Pantheon account has access to [Multidev](/multidev), create a Multidev to push your new code to:

```bash{promptUser:user}
git push origin composerify && terminus env:create $site.dev composerify
```

This will set up the Multidev environment to receive and demo our changed code.

## Deploy

You've now committed the code to the local branch. If your site has Multidev, you can deploy that branch directly to a new Multidev and test the site in the browser. If the site doesn't load properly, clear the cache. If there are any issues, utilize your site's logs via `terminus drush $site.composerify -- wd-show` to inspect the watchdog logs, or follow the directions in our documentation on [log collection](/logs).

### Deploy to a Multidev

If your site has Multidev, push the changes to a Multidev called `composerify` to safely test the site without affecting the Dev environment:

```bash{promptUser:user}
git add .
git commit -m "ran composer prepare-for-pantheon and install"
git push origin composerify
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
terminus site:upstream:set $site drupal9
```

## Ongoing Core Updates

One-click core updates can be made through the Dashboard.

Navigate to **Code** in the Dev tab of the site's Dashboard. Click **Check Now**. If updates are available, click **Apply Updates**.

## Troubleshooting

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/composer)
