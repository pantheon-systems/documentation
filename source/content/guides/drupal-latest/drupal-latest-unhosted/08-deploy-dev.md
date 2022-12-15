---
title: Migrate a Drupal:latest Site from Another Platform
subtitle: Deploy to Dev
description: 
<<<<<<< HEAD:source/content/guides/drupal-latest/drupal-latest-unhosted/08-deploy-dev.md
cms: "Drupal"
=======
cms: "Drupal:latest"
>>>>>>> eec42263af4cf5e002bae842ccae64ea51704a74:source/content/guides/drupal-latest/drupal-latest-unhosted/08-deploy-dev.md
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