---
title: Migrate a Site That Was Created Using a Deprecated Upstream to Drupal:latest
subtitle: Switch to Drupal with Composer Upstream
description: 
<<<<<<< HEAD:source/content/guides/drupal-latest/drupal-latest-hosted-deprecated-upstream/07-switch-drupal.md
cms: "Drupal"
=======
cms: "Drupal:latest"
>>>>>>> eec42263af4cf5e002bae842ccae64ea51704a74:source/content/guides/drupal-latest/drupal-latest-hosted-deprecated-upstream/07-switch-drupal.md
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-latest-hosted-deprecated-upstream/switch-drupal
anchorid: switch-drupal
editpath: drupal-latest/drupal-latest-hosted-deprecated-upstream/07-switch-drupal.md
reviewed: "2022-12-13"
contenttype: [guide]
categories: [migrate, update]
newcms: [drupal9, drupal, drupal10, drupal8]
audience: [development]
product: [composer, terminus]
integration: []
---

This page provides steps to switch your site from Drupal to `drupal-composer-managed`, the [Drupal with Composer Upstream](/guides/integrated-composer#get-started-with-integrated-composer) upstream that keeps your site current with general configuration changes recommended by Pantheon.

Use Terminus to change the upstream that your site is tracking:

```bash{promptUser:user}
terminus site:upstream:set $SITE drupal-composer-managed
```