---
title: Migrate a Composer Managed Drupal 9 Site from Another Platform
subtitle: Deploy to Dev
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-unhosted-composer/deploy-dev
anchorid: deploy-dev
editpath: drupal-9/drupal-9-unhosted-composer/07-deploy-dev.md
---
You committed your code additions locally in the previous. Now you need to push the commits to Pantheon to deploy them to your Dev environment:

  ```bash{promptUser: user}
  terminus connection:set $SITE.dev git
  git push origin master
  ```