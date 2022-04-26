---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal 9 + Build Tools
subtitle: Prepare
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-btworkflow/prepare
anchorid: prepare
editpath: drupal-9/drupal-9-hosted-btworkflow/03-prepare.md
---



## Before You Begin

Clone your existing site to your local environment following the `git clone` command from the dashboard.


## Create a New Terminus Build Tools Drupal 9 Site

1. Follow the [Terminus Build Tools Documentation](/guides/build-tools/create-project/#create-a-build-tools-project) to create a new Drupal 9 site:

  ```bash
  terminus build:project:create --git=github --team='My Agency Name' d9 my-buildtools-site
  ```

1. Wait for the site to be created and for the first build to complete.

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment-no-clone-no-alias.md" />

2. Get a local copy of both your new site (from the external repository) and your existing site codebase.

3. Set the following temporary variables in your terminal session to match your folders location and sites names:

   ```bash
   export SOURCE=/absolute/path/to/source/site/codebase
   export DESTINATION=/absolute/path/to/codebase/cloned/from/pantheon
   export SOURCE_SITE_NAME=my-source-site
   export DESTINATION_SITE_NAME=my-buildtools-site
   ```

