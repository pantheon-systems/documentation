---
title: Migrate to Drupal 9 on Pantheon
subtitle: Manually Migrate
description: Migrate a Drupal 8 Site to Drupal 9 on Pantheon
categories: [develop]
cms: drupal-9
tags: [code, launch, migrate, site, updates]
contributors: [sarahg, greg-1-anderson]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-migration/migrate-manual-d9
anchorid: drupal-9-migration/migrate-manual-d9
editpath: drupal-9-migration/04-migrate-manual-d9.md
---

In this doc, you'll create a new Drupal 9 site and migrate the code from an existing Drupal 8 site to Pantheon's Integrated composer build.

## Will This Guide Work for Your Site?

<Partial file="drupal-9/upgrade-site-requirements.md" />

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

This doc uses the following aliases:

- **Alias:** `D8_SITE`
  - **Site Name:** `best-drupal8-site-ever`
- **Alias:** `D9_SITE`
  - **Site Name:** `best-drupal9-site-ever`

## This site is for you if you meet the following criterion:

1. You have an existing Drupal 8 or 9 site.

1. YOU HAVE COMPLETED THE BUILD TOOLS D9 UPGRADE HERE: {LINK TO #6}

1. Your site is hosted on Github and you use a build step and the artifacts are then checked into pantheon.

1. Your build process does not involve NodeJS at any step



## Step +1: Turn off build tools

First of all, we need to do some discovery and figure out where the build is triggered. Most likely scenario, there's a folder in your root directory named ".circle_ci", ".travis" or something along those lines that contains a configuration file that triggers the "build process" to begin and pushes your code's build artifcts to the pantheon repo. We're going to delete that folder and stop that process from happening.

## Step +1: Change your pantheon.yml to reflect the following value(s):

```
api_version: 1
web_docroot: true
# See https://pantheon.io/docs/pantheon-yml/#enforce-https--hsts for valid values.
enforce_https: full+subdomains
php_version: 7.4
database:
  version: 10.4
drush_version: 10
build_step: true
protected_web_paths:
  - /private/
  - /sites/default/files/private/
  - /sites/default/files/config/
```
## Step 1:

Composer require

```
composer require shineunited/composer-build-scss scssphp/scssphp^1
```
Add the build step to composer's "post-install-cmd" hook as well as the post-update-cmd.

## Step +1: add/commit/push

## Step +1: verify the build completed successfully in Dashboard and/or Terminus
