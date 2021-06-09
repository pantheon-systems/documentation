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

1. Your build process does not involve NodeJS at any step.

1. You don't have automated tests that run during your build process.


## Step +1: Turn off build tools

First of all, we need to do some discovery and figure out where the build is triggered.
Most likely scenario, there's a folder in your root directory named ".circle_ci", ".travis"
or something along those lines that contains a configuration file that triggers the "build
process" to begin and pushes your code's build artifcts to the pantheon repo. We're
going to delete that folder and stop that process from happening.

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

The magic happens with this directive: `build_step: true`.
This tells our build system to run composer when you check in your code.
Before it does, there are a few more requirements we need to ensure.

## Step 1: Any dir into which composer must write, must be '.gitignor'-ed.



## Step 1:

Composer require

```
composer require drupal/scss_compiler
```

as per the readme in the most recent version of the module:

<blockquote>

```yml
# my_{module|theme}.libraries.yml
main:
  version: VERSION
  css:
    theme:
      scss/styles.scss: {}
      less/styles.less: {}
```
By default, compiled files are saved to `public://scss_compiler`

Also you can define `css_path` — path where to save the compiled file,
path relative to module/theme where libraries.yml place, for example:
```yml
# my_{module|theme}.libraries.yml
main:
  version: VERSION
  css:
    theme:
      scss/styles.scss: { css_path: '/css/' }
```
File will be saved to `my_module/css/styles.css`

Assets path option allow to define where static resources places, by default
it's module/theme folder. Full path to assets folder. Supports token for
theme/module.
```yml
# my_{module|theme}.libraries.yml
main:
  version: VERSION
  css:
    theme:
      scss/styles.scss: { assets_path: '@my_module/assets/' }
```
url(images.jpg) in css will be compiled to
url(modules/custom/my_module/assets/image.jpg);

</blockquote>


## Step +1: add/commit/push

## Step +1: verify the build completed successfully in Dashboard and/or Terminus