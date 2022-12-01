---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal 9 + Build Tools
subtitle: Prepare
description: 
cms: "Drupal 9"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-btworkflow/prepare
anchorid: prepare
editpath: drupal-9/drupal-9-hosted-btworkflow/03-prepare.md
reviewed: "2021-03-31"
contenttype: [guide]
categories: [migrate, git]
newcms: [drupal]
audience: [development]
product: [terminus]
integration: [--]
---

## Before You Begin

Clone your existing site to your local environment following the `git clone` command from the dashboard.

## Create a New Terminus Build Tools Drupal 9 Site

1. Follow the [Terminus Build Tools Documentation](/guides/build-tools/create-project/#create-a-build-tools-project) to create a new Drupal 9 site:

  ```bash{promptUser: user}
  terminus build:project:create --git=github --team='My Agency Name' d9 my-buildtools-site
  ```

1. Wait for the site to be created and for the first build to complete.

## Prepare the Local Environment

1. <Partial file="drupal-9/prepare-local-environment-no-clone-no-alias.md" />

1. Get a local copy of both your new site (from the external repository) and your existing site codebase.

1. Set the following temporary variables in your terminal session to match your folders location and sites names:

   ```bash{promptUser: user}
   export SOURCE=/absolute/path/to/source/site/codebase
   export DESTINATION=/absolute/path/to/codebase/cloned/from/pantheon
   export SOURCE_SITE_NAME=my-source-site
   export DESTINATION_SITE_NAME=my-buildtools-site
   ```
