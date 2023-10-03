---
title: Upgrade a Site That Was Created With an Empty Upstream to the Latest Version of Drupal
subtitle: Add the Integrated Composer Upstream in a New Local Branch
description:
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
showtoc: true
permalink: docs/guides/drupal-hosted-createempty-md/composer-upstream
editpath: drupal/drupal-hosted-createempty-md/05-composer-upstream.md
reviewed: "2022-12-13"
contenttype: [guide]
innav: [false]
categories: [overview, migrate]
cms: [drupal9]
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
  git remote add ic https://github.com/pantheon-upstreams/drupal-composer-managed.git && git fetch ic && git checkout --no-track -b composerify ic/main
  Switched to a new branch 'composerify'
  ```

  If you prefer, you can replace `composerify` with another branch name. If you do, remember to adjust the other examples in this doc to match.

## Set Drupal Core Version

Set the Drupal core version to ensure the site remains on the current version of Drupal, for now:

<Partial file="drupal/core-version-remain-on-d8.md" />

## Add Upgrade Status Module

This step is optional. You can wait and add the Upgrade Status module to your site later.

The Upgrade Status module will help to determine whether or not your site is ready to upgrade to the latest version of Drupal.

Add the Upgrade Status module to your site with Composer:

  ```bash{promptUser:user}
  composer require drupal/upgrade_status
  git add composer.*
  git commit -m "Add Upgrade Status module"
  ```

When you are ready to begin upgrading your site to the latest version of Drupal, you can enable this module and view the status report it provides to find out what needs to be done before upgrading.

## Copy Existing Configuration

Copy any existing configuration from the default branch. Adjust the source folder as needed, depending on your folder structure. It's okay if no files are copied through this step:

<TabList>

<Tab title="With Nested Docroot" id="code-docroot" active={true}>

This is a common location for the `config` file. If this isn't where your `config` file is located, replace `config` with the full path, such as `web/sites/default/config`.

```bash{promptUser:user}
git checkout main config
git commit -m "Pull in configuration from default branch"
```

</Tab>

<Tab title="Without Nested Docroot" id="code-nodocroot">

```bash{promptUser:user}
git checkout main sites/default/config
git mv sites/default/config/* config
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
