---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal 9 + Build Tools
subtitle: Back Up the tokens.json File
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-hosted-btworkflow/backup-token
anchorid: backup-token
editpath: drupal-9/drupal-9-hosted-btworkflow/09-backup-token.md
---

1. Connect to your site using SFTP command or credentials from your dashboard and get a backup of the following file:

  ```bash
  files/private/.build-secrets/tokens.json
  ```

1. Use the SFTP `get` command to download the file to your local directory (this is only for SFTP command line use): 

  ```bash{promptUser:user}
  echo "get files/private/.build-secrets/tokens.json" | $(terminus connection:info $DESTINATION_SITE_NAME.dev --format=string --field=sftp_command)
  ```