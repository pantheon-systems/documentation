---
title: Migrate a Site That Was Created with Build Tools to Drupal 9
subtitle: Confirm the MariaDB Version and Updates
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-hosted-createbt/mariadb
anchorid: mariadb
editpath: drupal-9-v8/09-mariadb.md
---


Validate your database version with `terminus drush`:

```bash{promptUser: user}
echo 'SELECT VERSION();' | terminus drush $SITE.$ENV sqlq -
```

Review the site and [Launch Check Status tab](/drupal-launch-check) to confirm the database version and any outstanding available updates.
