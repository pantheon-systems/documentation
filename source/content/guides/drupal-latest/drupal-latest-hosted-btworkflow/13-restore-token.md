---
title: Migrate a Site Created With the Pantheon Dashboard to drupal:latest + Build Tools
subtitle: Restore the tokens.json File
description: 
<<<<<<< HEAD:source/content/guides/drupal-latest/drupal-latest-hosted-btworkflow/13-restore-token.md
cms: "Drupal"
=======
cms: "drupal:latest"
>>>>>>> eec42263af4cf5e002bae842ccae64ea51704a74:source/content/guides/drupal-latest/drupal-latest-hosted-btworkflow/13-restore-token.md
tags: [code, launch, migrate, site, updates, D8, D9]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-latest-hosted-btworkflow/restore-token
anchorid: restore-token
editpath: drupal-latest/drupal-latest-hosted-btworkflow/13-restore-token.md
reviewed: "2022-12-12"
contenttype: [guide]
categories: [migrate, sftp]
newcms: [drupal]
audience: [development]
product: [dashboard]
integration: [--]
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
