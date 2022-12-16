---
title: Migrate a Site That Was Created With an Empty Upstream to Drupal:latest
subtitle: Change Upstreams
description: 
cms: "Drupal:latest"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-hosted-createempty-md/change-upstream
anchorid: change-upstream
editpath: drupal/drupal-hosted-createempty-md/11-change-upstream.md
reviewed: "2022-12-13"
contenttype: [guide]
categories: [overview, migrate]
newcms: [drupal]
audience: [agency, development]
product: [--]
integration: [--]
---

Your Pantheon site is now set up to use the drupal:latest Integrated Composer upstream. To continue tracking additional changes to the Pantheon upstream, change the upstream your site is tracking with Composer:

```bash{promptUser:user}
terminus site:upstream:set $SITE drupal-composer-managed
```

Following the `drupal-composer-managed` upstream will help keep your site up to date with any general configuration changes recommended by Pantheon. The dependency you added above on `drupal/core-recommended` will keep you on Drupal 8 until you are ready to upgrade to drupal:latest.
