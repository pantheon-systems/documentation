---
title: Migrate a Composer Managed Drupal 9 Site from Another Platform
subtitle: Troubleshooting
description:  Troubleshoot common issues when migrating.
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
reviewed: "2021-05-09"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-unhosted-composer/troubleshooting
anchorid: troubleshooting
editpath: drupal-9/drupal-9-unhosted-composer/15-troubleshooting.md
---

This sections provides common troubleshooting scenarios.

## Get Messages

When there are problems, you can sometimes get helpful messages about what's wrong with the following command if you have dblog module enabled:

  ```bash{promptUser: user}
  terminus drush $SITE.dev watchdog:show
  ```
## Rebuild Cache after Fixing Issues

When you make changes to fix a problem, don't forget to rebuild the cache:

  ```bash{promptUser: user}
  terminus drush $SITE.dev cr
  ```
<Partial file="drupal-9/troubleshooting.md" />
