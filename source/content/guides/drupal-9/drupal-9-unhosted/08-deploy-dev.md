---
title: Migrate a Drupal 9 Site from Another Platform
subtitle: Deploy to Dev
description: 
cms: "Drupal 9"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-9-unhosted/deploy-dev
anchorid: deploy-dev
editpath: drupal-9/drupal-9-unhosted/07-deploy-dev.md
contenttype: guide
categories: [migrate]
newcms: [drupal9]
audience: [development]
product: [--]
integration: [--]
reviewed: "2021-05-13"
---

Now that you've committed your code additions locally, push the commits to Pantheon to deploy them to your Dev environment:

```bash{promptUser: user}
terminus connection:set $SITE.dev git
git push origin master
```