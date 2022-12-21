---
title: Migrate a Site That Was Created with Build Tools to Drupal
subtitle: Confirm the MariaDB Version and Updates
description: 
cms: "Drupal"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-hosted-createbt/mariadb
anchorid: mariadb
editpath: drupal-v8/09-mariadb.md
reviewed: "2022-12-13"
contenttype: [guide]
categories: [migrate, git, update]
newcms: [drupal8, drupal9, drupal10]
audience: [development]
product: [dashboard]
integration: [mariadb]
---

Validate your database version with `terminus drush`:

```bash{promptUser: user}
echo 'SELECT VERSION();' | terminus drush $SITE.$ENV sqlq -
```

Review the site and [Launch Check Status tab](/drupal-launch-check) to confirm the database version and any outstanding available updates.
