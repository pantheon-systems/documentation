---
title: Migrate a Site That Was Created With an Empty Upstream to Drupal 9
subtitle: Change Upstreams
description: 
cms: "Drupal 9"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-9-hosted-createempty-md/change-upstream
anchorid: change-upstream
editpath: drupal-9/drupal-9-hosted-createempty-md/11-change-upstream.md
reviewed: "2021-03-31"
contenttype: [guide]
categories: [overview, migrate]
newcms: [drupal9]
audience: [agency, development]
product: [--]
integration: [--]
---

Your Pantheon site is now set up to use the Drupal 9 Integrated Composer upstream. To continue tracking additional changes to the Pantheon upstream, change the upstream your site is tracking with Composer:

```bash{promptUser:user}
terminus site:upstream:set $SITE drupal-composer-managed
```

Following the `drupal-composer-managed` upstream will help keep your site up to date with any general configuration changes recommended by Pantheon. The dependency you added above on `drupal/core-recommended` will keep you on Drupal 8 until you are ready to upgrade to Drupal 9.
