---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal + Build Tools
subtitle: Add Contrib and Custom Code
description: 
cms: "Drupal"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-hosted-btworkflow/contrib-custom
anchorid: contrib-custom
editpath: drupal/drupal-hosted-btworkflow/07-contrib-custom.md
reviewed: "2022-12-12"
contenttype: [guide]
categories: [migrate]
newcms: [drupal8, drupal9, drupal10]
audience: [development]
product: [terminus]
integration: [--]
---

This section describes how to replicate your selection of contributed modules and themes, and any custom modules or themes your development team has created in your new project structure.

## Contributed Code

The goal of this process is to have Composer manage all the site's contrib modules, contrib themes, core upgrades, and libraries (referred to as *contributed code*). The only items from the existing site that should remain in the Git repository are custom code, custom themes, and custom modules that are specific to the existing site.

### Modules and Themes

Your site should already be managing contributed modules and themes through Composer. Follow the steps below to migrate these items to a new site.

1. Open the source site `composer.json`.

1. Run a `composer require` command for each module and theme in the `$DESTINATION` directory:

  ```bash{promptUser: user}
  composer require drupal/PROJECT_NAME:^VERSION
  ```

You can require multiple packages in the same commands, if desired.

### Other Composer Packages

If you added non-Drupal packages to your site via Composer:

1. Run the command `composer require` to migrate each package.

1. Use the following command to display the differences between the master and current `composer.json`:

  ```bash{promptUser: user}
  diff -Nup --ignore-all-space $SOURCE/composer.json $DESTINATION/composer.json
  ```

### Libraries

Libraries can be handled similarly to modules, but the specifics depend on how your library code was included in the source site. If you're using a library's API, you may have to do additional work to ensure that it functions correctly.

## Custom Code

Manually copy custom code from the existing site repository to the Composer-managed directory.

### Modules and Themes

<Partial file="drupal/custom-modules-themes-no-docroot.md" />

### settings.php

<Partial file="drupal/custom-settings-no-docroot.md" />

## Additional Composer Configuration

<Partial file="drupal/composer-config.md" />

## Push to the External Repository Master Branch

1. Push to the `master` branch in the external repository:

  ```bash{promptUser: user}
  git push origin master
  ```

1. Confirm that the Continuous Integration workflow succeeds in committing your code changes to the Pantheon site.
