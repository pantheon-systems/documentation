---
title: Upgrade a Site That Was Created With an Empty Upstream to the Latest Version of Drupal
subtitle: Change Upstreams
description: 
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
permalink: docs/guides/drupal-hosted-createempty-md/change-upstream
editpath: drupal/drupal-hosted-createempty-md/11-change-upstream.md
reviewed: "2022-12-13"
contenttype: [guide]
innav: [false]
categories: [overview, migrate]
cms: [drupal8, drupal9, drupal10]
audience: [agency, development]
product: [--]
integration: [--]
---

Your Pantheon site is now set up to use the the latest version of Drupal Integrated Composer upstream. To continue tracking additional changes to the Pantheon upstream, change the upstream your site is tracking with Composer:

```bash{promptUser:user}
terminus site:upstream:set $SITE drupal-composer-managed
```

Following the `drupal-composer-managed` upstream will help keep your site up to date with any general configuration changes recommended by Pantheon. The dependency you added above on `drupal/core-recommended` will keep you on the current version until you are ready to upgrade to the latest version of Drupal.
