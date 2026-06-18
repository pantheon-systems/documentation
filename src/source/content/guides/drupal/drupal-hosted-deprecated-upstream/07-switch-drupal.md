---
title: Upgrade a Site That Was Created Using a Deprecated Upstream to the Latest Version of Drupal
subtitle: Switch to Drupal with Composer Upstream
description: 
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
permalink: docs/guides/drupal-hosted-deprecated-upstream/switch-drupal
editpath: drupal/drupal-hosted-deprecated-upstream/07-switch-drupal.md
reviewed: "2022-12-13"
contenttype: [guide]
innav: [false]
categories: [migrate, update]
cms: [drupal9, drupal, drupal10, drupal8]
audience: [development]
product: [composer, terminus]
integration: []
draft: true
---

This page provides steps to switch your site from Drupal to `drupal-composer-managed`, the [Drupal with Composer Upstream](/guides/integrated-composer#get-started-with-integrated-composer) upstream that keeps your site current with general configuration changes recommended by Pantheon.

Use Terminus to change the upstream that your site is tracking:

```bash{promptUser:user}
terminus site:upstream:set $SITE drupal-composer-managed
```