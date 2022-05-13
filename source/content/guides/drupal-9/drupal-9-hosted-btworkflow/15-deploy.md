---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal 9 + Build Tools
subtitle: Deploy
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
showtoc: false
permalink: docs/guides/drupal-9-hosted-btworkflow/deploy
anchorid: deploy
editpath: drupal-9/drupal-9-hosted-btworkflow/15-deploy.md
reviewed: "2021-03-31"
---

You should now have all three of the major components of your site imported into Pantheon. Clear your caches on the the Pantheon Dashboard, or with Terminus using the following command:

  ```bash{promptUser: user}
  terminus drush $SITE.dev cr
  ```

Review the site, then proceed to launch using the [Pantheon Relaunch](/relaunch) documentation.
