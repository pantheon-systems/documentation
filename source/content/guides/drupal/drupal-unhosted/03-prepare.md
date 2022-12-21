---
title: Migrate a Drupal Site from Another Platform
subtitle: Prepare Your Site for Migration
description: Get your local environment and the existing site ready.
cms: "Drupal"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-unhosted/prepare
anchorid: prepare
editpath: drupal/drupal-unhosted/03-prepare.md
contenttype: [guide]
categories: [migrate]
newcms: [drupal9, drupal, drupal8, drupal10]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-12-13"
---

It's important to prepare your site before you begin the migration process. Complete the steps outlined below to ensure that your site is prepared for migration to Pantheon's platform.

1. <Partial file="drupal/prepare-local-environment-no-clone-no-alias.md" />

1. Get a local copy of both your new Pantheon site and your existing codebase.

1. Set the temporary variables `$SOURCE` and `$DESTINATION` in your terminal session to match the location of your folders.

   This doc uses several commands that depend on the locations of both your existing and new site codebases. Setting the variables will simplify the process for you.

   ```bash
   export SOURCE=/absolute/path/to/source/site/codebase
   export DESTINATION=/absolute/path/to/codebase/cloned/from/pantheon
   ```

1. Ensure the trusted host setting is up-to-date. Refer to the [Trusted Host Setting](/guides/php/settings-php#trusted-host-setting) documentation for more information.

1. Set the **Dev environment** site mode to **Git** to perform Git operations.

1. Clone your site to your local environment using the `git clone` command from the Dashboard.
