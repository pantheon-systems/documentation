---
title: Migrate a Site That Was Created With an Empty Upstream to Drupal 9
subtitle: Add the Integrated Composer Upstream in a New Local Branch
description: 
cms: "Drupal 9"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-createempty-md/composer-upstream
anchorid: composer-upstream
editpath: drupal-9/drupal-9-hosted-createempty-md/05-composer-upstream.md
reviewed: "2021-03-31"
contenttype: guide
categories: [overview, migrate]
newcms: [drupal9]
audience: [agency, development]
product: [custom-upstreams]
integration: [--]
---

This process involves significant changes to the codebase that may take some time to complete, and can be complicated to roll back.

To minimize issues, make the codebase changes in a new branch:

1. In your local terminal, change directories into the site project.

  For example, if you keep your projects in a folder called `projects` in the home directory:

  ```bash{promptUser: user}
  cd ~/projects/$SITE/
  ```

1. Add the Pantheon Drupal Project upstream as a new remote called `ic`, fetch the `ic` upstream, and checkout to a new local branch based on it called `composerify`:

  ```bash{outputLines:2}
  git remote add ic git@github.com:pantheon-upstreams/drupal-composer-managed.git && git fetch ic && git checkout --no-track -b composerify ic/main
  Switched to a new branch 'composerify'
  ```

  If you prefer, you can replace `composerify` with another branch name. If you do, remember to adjust the other examples in this doc to match.

## Set Drupal Core Version

Set the Drupal core version to ensure the site remains on Drupal 8, for now:

<Partial file="drupal-9/core-version-remain-on-d8.md" />

## Add Upgrade Status Module

This step is optional. You can wait and add the Upgrade Status module to your site later.

The Upgrade Status module will help to determine whether or not your site is ready to upgrade to Drupal 9.

Add the Upgrade Status module to your site with Composer:

  ```bash{promptUser:user}
  composer require drupal/upgrade_status
  git add composer.*
  git commit -m "Add Upgrade Status module"
  ```

When you are ready to begin upgrading your site to Drupal 9, you can enable this module and view the status report it provides to find out what needs to be done before upgrading.

## Copy Existing Configuration

Copy any existing configuration from the default branch. Adjust the source folder as needed, depending on your folder structure. It's okay if no files are copied through this step:

<TabList>

<Tab title="With Nested Docroot" id="code-docroot" active={true}>

This is a common location for the `config` file. If this isn't where your `config` file is located, replace `config` with the full path, such as `web/sites/default/config`.

```bash{promptUser:user}
git checkout main config
git mv config/* config
git rm -f web/sites/default/config/.htaccess
git commit -m "Pull in configuration from default branch"
```

</Tab>

<Tab title="Without Nested Docroot" id="code-nodocroot">

```bash{promptUser:user}
git checkout main sites/default/config
git mv sites/default/config/* config
git rm -f sites/default/config/.htaccess
git commit -m "Pull in configuration from default branch"
```

</Tab>

</TabList>

## Copy pantheon.yml

1. Compare the old codebase's `pantheon.yml` to the new `pantheon.upstream.yml`:

  ```bash{promptUser:user}
  git diff main:pantheon.yml pantheon.upstream.yml
  ```

  Press `q` on your keyboard to exit the diff display.

1. Copy the old `pantheon.yml` to preserve settings:

  ```bash{promptUser:user}
  git checkout main pantheon.yml
  git add pantheon.yml
  git commit -m 'Copy my pantheon.yml'
  ```

  Remove any values from `pantheon.yml` that you prefer to keep listed in `pantheon.upstream.yml`. Then add `build_step: true` to `pantheon.yml` if it is not already included.

  In the `pantheon.yml` file, the `api_version: 1` and `build_step: true` values are required.
