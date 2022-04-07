---
title: Migrate a Composer Managed Drupal 9 Site from Another Platform
subtitle: Troubleshooting
description:  Troubleshoot common issues when migrating.
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-v9-composer/troubleshooting
anchorid: troubleshooting
editpath: drupal-9-v9-composer/15-troubleshooting.md
---

When there are problems, you can sometimes get helpful messages about what's wrong with the following command if you have dblog module enabled:

  ```bash{promptUser: user}
  terminus drush $SITE.dev watchdog:show
  ```

When you make changes to fix a problem, don't forget to rebuild the cache:

  ```bash{promptUser: user}
  terminus drush $SITE.dev cr
  ```
<Partial file="drupal-9/troubleshooting.md" />
