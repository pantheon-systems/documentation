---
title: Migrate a Composer Managed Drupal 9 Site from Another Platform
subtitle: Deploy
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-v9-composer/deploy-live
anchorid: deploy-live
editpath: drupal-9-v9-composer/09-deploy-live.md
---
You should now have all of the major components of your site imported into Pantheon. Clear your caches on the Pantheon Dashboard, or with terminus like so:

  ```bash{promptUser: user}
  terminus drush $SITE.dev cr
  ```

Review the site, then proceed to launch using the [Launch Essentials](/guides/launch) documentation.
