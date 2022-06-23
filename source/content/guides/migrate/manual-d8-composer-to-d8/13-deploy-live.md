---
title: Migrate a Drupal 8 Site That Is Managed With Composer From Another Platform
subtitle: Deploy
description: 
cms: "Drupal 8"
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/manual-d8-composer-to-d8-to-d8/deploy-live
anchorid: deploy-live
editpath: migrate/manual-d8-composer-to-d8-to-d8/09-deploy-live.md
reviewed: "2021-06-22"
---

You should now have all three of the major components of your site imported into Pantheon. Clear your caches in the [Pantheon Dashboard](/clear-caches#pantheon-dashboard) or with terminus like so:

  ```bash{promptUser: user}
  terminus drush $SITE.dev cr
  ```

<Partial file="drupal-9/deploy-using-launch.md" />
