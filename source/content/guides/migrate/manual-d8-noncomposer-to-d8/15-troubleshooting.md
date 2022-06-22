---
title: Migrate a Drupal 8 Site That Is Not Managed With Composer From Another Platform
subtitle: Troubleshooting
description:  Troubleshoot common issues when migrating.
cms: "Drupal 8"
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/migrate/manual-d8-noncomposer-to-d8/troubleshooting
anchorid: troubleshooting
editpath: migrate/manual-d8-noncomposer-to-d8/15-troubleshooting.md
reviewed: "2021-05-09"
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
