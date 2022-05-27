---
title: Migrate a Composer Managed Drupal 9 Site from Another Platform
subtitle: Deploy
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-9-unhosted-composer/deploy-live
anchorid: deploy-live
editpath: drupal-9/drupal-9-unhosted-composer/09-deploy-live.md
reviewed: "2021-05-09"
---

You should now have all three of the major components of your site imported into Pantheon. Clear your caches in the [Pantheon Dashboard](/clear-caches#pantheon-dashboard) or with terminus like so:

  ```bash{promptUser: user}
  terminus drush $SITE.dev cr
  ```

<Partial file="drupal-9/deploy-using-launch.md" />
