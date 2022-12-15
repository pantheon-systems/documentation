---
title: Migrate a Site That Was Created with Build Tools to Drupal:latest
subtitle: Confirm the MariaDB Version and Updates
description: 
cms: "Drupal:latest"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-latest-hosted-createbt/mariadb
anchorid: mariadb
editpath: drupal-latest-v8/09-mariadb.md
reviewed: "2022-12-13"
contenttype: [guide]
categories: [migrate, git, update]
newcms: [drupal, drupal8, Drupal9, Drupal10],
audience: [development]
product: [dashboard]
integration: [mariadb]
---

Validate your database version with `terminus drush`:

```bash{promptUser: user}
echo 'SELECT VERSION();' | terminus drush $SITE.$ENV sqlq -
```

Review the site and [Launch Check Status tab](/drupal-launch-check) to confirm the database version and any outstanding available updates.
