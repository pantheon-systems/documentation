---
title: Upgrade a Site That Was Created with Build Tools to Drupal
subtitle: Confirm the MariaDB Version and Updates
description: 
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
permalink: docs/guides/drupal-hosted-createbt/mariadb
editpath: drupal-v8/09-mariadb.md
reviewed: "2022-12-13"
contenttype: [guide]
innav: [false]
categories: [migrate, git, update]
cms: [drupal8, drupal9, drupal10]
audience: [development]
product: [dashboard]
integration: [mariadb]
---

Validate your database version with `terminus drush`:

```bash{promptUser: user}
echo 'SELECT VERSION();' | terminus drush $SITE.$ENV sqlq -
```

Review the site and [Launch Check Status tab](/drupal-launch-check) to confirm the database version and any outstanding available updates.
