---
title: Migrate a Site That Was Created Using a Deprecated Upstream to Drupal 9
subtitle: Switch to Drupal with Composer Upstream
description: 
cms: "Drupal 9"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-9-hosted-deprecated-upstream/switch-drupal
anchorid: switch-drupal
editpath: drupal-9/drupal-9-hosted-deprecated-upstream/07-switch-drupal.md
reviewed: "2021-03-31"
contenttype: guide
categories: [migrate, update]
newcms: [drupal9, drupal]
audience: [development]
product: [composer, terminus]
integration: []
---

This page provides steps to switch your site from Drupal to `drupal-composer-managed`, the [Drupal with Composer Upstream](/guides/integrated-composer#get-started-with-integrated-composer) upstream that keeps your site current with general configuration changes recommended by Pantheon.

Use Terminus to change the upstream that your site is tracking:

```bash{promptUser:user}
terminus site:upstream:set $SITE drupal-composer-managed
```