---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal 9 + Build Tools
subtitle: Deploy
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-btworkflow/deploy
anchorid: deploy
editpath: drupal-9/drupal-9-hosted-btworkflow/15-deploy.md
---

You should now have all three of the major components of your site imported into Pantheon. Clear your caches on the the Pantheon Dashboard, or with terminus like so:

  ```bash{promptUser: user}
  terminus drush $SITE.dev cr
  ```

<Partial file="drupal-9/deploy-using-relaunch.md" />