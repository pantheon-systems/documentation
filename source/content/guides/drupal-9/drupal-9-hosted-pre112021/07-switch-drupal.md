---
title: Migrate a Site That Was Created Before November 2011 to Drupal 9
subtitle: Switch to Drupal with Composer Upstream
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-9-hosted-pre112021/switch-drupal
anchorid: switch-drupal
editpath: drupal-9/drupal-9-hosted-pre112021/07-switch-drupal.md
reviewed: "2021-03-31"
---

This page provides steps to switch your site from Drupal to `drupal-recommended`, the [Drupal with Composer Upstream](/guides/integrated-composer#get-started-with-integrated-composer) upstream that keeps your site current with general configuration changes recommended by Pantheon.

Use Terminus to change the upstream that your site is tracking:

```bash{promptUser:user}
terminus site:upstream:set $SITE drupal-recommended
```
