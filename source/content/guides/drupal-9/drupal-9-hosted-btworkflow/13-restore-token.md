---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal 9 + Build Tools
subtitle: Restore the tokens.json File
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-hosted-btworkflow/restore-token
anchorid: restore-token
editpath: drupal-9/drupal-9-hosted-btworkflow/13-restore-token.md
---

1. Connect to your site using SFTP command or credentials from your dashboard to restore the backup of the `tokens.json` file:

  ```bash
  files/private/.build-secrets/tokens.json
  ```

1. Use the SFTP `put` command to upload the file from your local directory (only if using the SFTP command line):

 <Alert title="Note"  type="info" >

 You must run this from the directory where the `tokens.json` backup was downloaded.

 </Alert>

  ```bash{promptUser:user}
  echo "put files/private/.build-secrets/tokens.json" | $(terminus connection:info $DESTINATION_SITE_NAME.dev --format=string --field=sftp_command)
  ```