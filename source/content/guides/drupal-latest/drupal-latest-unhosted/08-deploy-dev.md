---
title: Migrate a Drupal:latest Site from Another Platform
subtitle: Deploy to Dev
description: 
cms: "Drupal"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-latest-unhosted/deploy-dev
anchorid: deploy-dev
editpath: drupal-latest/drupal-latest-unhosted/07-deploy-dev.md
contenttype: [guide]
categories: [migrate]
newcms: [drupal9]
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