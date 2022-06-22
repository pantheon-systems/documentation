---
title: Migrate a Drupal 8 Site That Is Not Managed With Composer From Another Platform
subtitle: Deploy to Dev
description: 
cms: "Drupal 8"
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/migrate/manual-d8-noncomposer-to-d8/deploy-dev
anchorid: deploy-dev
editpath: migrate/manual-d8-noncomposer-to-d8/07-deploy-dev.md
reviewed: "2021-05-09"
---

Now that you've committed your code additions locally, push the commits to Pantheon to deploy them to your Dev environment:

```bash{promptUser: user}
terminus connection:set $SITE.dev git
git push origin master
```
