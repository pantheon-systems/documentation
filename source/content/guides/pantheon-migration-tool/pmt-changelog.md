---
title: Pantheon Migration Tool
subtitle: Changelog
description: Recent changes to the Pantheon Migration Tool.
categories: [develop]
tags: [agencies]
type: guide
layout: guide
showtoc: false
anchorid: pmt-changelog
permalink: docs/guides/pantheon-migration-tool
editpath: pantheon-migration-tool/pmt-changelog.md
reviewed: "2022-01-25"
---

## January 20, 2022
__PMT 2.28__

* __New bulk update options:__ We have added the option to skip `settings.php` and `pantheon.yml` files in the bulk operations dropdown. (CS-23)
* __Default WP Reroute Email address:__ With this release, the default wp-reroute-email WP CLI command is set to send emails to `$PANTHEON_SITE_OWNER_EMAIL`. (CS-24)

## January 13, 2022
__PMT 2.27__

* __D9 settings file fix:__ Running the "Create setting files" migration job now runs successfully. (CS-22)
* __Private directory creation:__ Importing a Drupal site that does not have a private directory now automatically creates an empty private directory in the `/files/` folder. (CS-23)
* Better error handling when terminus is unavailable (CST-26)

## November 11, 2021
__PMT 2.26__

Speed boosts! We've changed how we handle some caching so you can configure your site migrations even faster.

* __Blogs.dir files:__ Migrating a WordPress Multisite that was created before WP 3.5? We've added an option in the Source tab to apply the `blogs.dir` structure update. This will import the site files to the correct locations on Pantheon. (CT-57)
* __Non-standard file locations:__ We've added the option in the Source tab for migrating non-standard file locations and placing them into a folder on Pantheon. (CT-122)
* __Archive and restore projects:__ With this release, projects can be archived and restored if needed. Use the bulk operations dropdown to archive projects, and press the "Show archived" toggle at the top of the projects list to reveal the archive list.