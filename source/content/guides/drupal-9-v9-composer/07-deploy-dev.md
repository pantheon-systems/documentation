---
title: Migrate a Drupal 9 Site from Another Platform to Drupal 9
subtitle: Deploy to Dev
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-v9-composer/deploy-dev
anchorid: deploy-dev
editpath: drupal-9-v9-composer/07-deploy-dev.md
---
You've now committed your code additions locally. Push them up to Pantheon to deploy them to your dev environment:

  ```bash{promptUser: user}
  terminus connection:set $SITE.dev git
  git push origin master
  ```