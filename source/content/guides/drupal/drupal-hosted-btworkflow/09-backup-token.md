---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal + Build Tools
subtitle: Back Up the tokens.json File
description: 
cms: "Drupal"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-hosted-btworkflow/backup-token
anchorid: backup-token
editpath: drupal/drupal-hosted-btworkflow/09-backup-token.md
reviewed: "2021-12-12"
contenttype: [guide]
categories: [migrate, sftp]
newcms: [drupal8, drupal9, drupal10]
audience: [development]
product: [dashboard]
integration: [--]
---

1. Connect to your site using SFTP command or credentials from your dashboard and get a backup of the following file:

  ```bash{promptUser: user}
  files/private/.build-secrets/tokens.json
  ```

1. Use the SFTP `get` command to download the file to your local directory (this is only for SFTP command line use):

  ```bash{promptUser: user}
  echo "get files/private/.build-secrets/tokens.json" | $(terminus connection:info $DESTINATION_SITE_NAME.dev --format=string --field=sftp_command)
  ```
