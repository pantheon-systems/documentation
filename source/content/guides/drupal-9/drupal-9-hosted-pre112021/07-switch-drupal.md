---
title: Migrate a Site That Was Created Before November 2011 to Drupal 9
subtitle: Switch to Drupal with Composer Upstream
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-hosted-pre112021/switch-drupal
anchorid: switch-drupal
editpath: drupal-9/drupal-9-hosted-pre112021/07-switch-drupal.md
---

Change the upstream that your site is tracking with the following command:

```bash{promptUser:user}
terminus site:upstream:set $SITE drupal-recommended
```

Follow the `drupal-recommended` upstream to keep your site current with any general configuration changes recommended by Pantheon.

Note that only the [User in Charge](/change-management#site-level-roles-and-permissions) can set the upstream.
