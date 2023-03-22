---
title: Migrate a Drupal Site from Another Platform
subtitle: Deploy to Dev
description: 
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
permalink: docs/guides/drupal-unhosted/deploy-dev
editpath: drupal/drupal-unhosted/07-deploy-dev.md
contenttype: [guide]
innav: [false]
categories: [migrate]
cms: [drupal9]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-12-13"
---

Now that you've committed your code additions locally, push the commits to Pantheon to deploy them to your Dev environment:

```bash{promptUser: user}
terminus connection:set $SITE.dev git
git push origin master
```