---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal 9
subtitle: Introduction
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-btworkflow
anchorid: drupal-9-hosted-btworkflow
editpath: drupal-9/drupal-9-hosted-btworkflow/01-introduction.md
---

Copy any existing configuration from the source site and update the source path as needed to match your configuration folder:

  ```bash{promptUser:user}
  rsync -avz $SOURCE/config/ $DESTINATION/config/ --delete --delete-after
  # From $DESTINATION:
  git add config -A
  git commit -m "Pull in configuration from source site"
  ```

It is possible that the Drupal site might have relocated the configuration path to a different location. You can find your `config.yaml` files are via:

```bash{promptUser:user}
terminus drush $SOURCE_SITE_NAME.dev -- status --fields=config-sync
```

In some cases no files are copied through this step. This is not cause for concern.