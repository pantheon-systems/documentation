---
title: Backups Tool
subtitle: Create Backups
description: Learn how to create new backups.
tags: [backups, security]
innav: [true]
categories: [backup]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/backups/create-backups
anchorid: create-backups
contenttype: [guide]
---

This section provides information on how to create new backups. We strongly urge you to back up your site regularly.


<Alert title="Exports" type="export">

This doc offers [Terminus](/terminus) commands, using the variables `$site` and `$env`. Export these variables in your terminal session to match your site name and the correct environment:

```bash{promptUser: user}
export site=yoursitename
export env=dev
```

</Alert>

## Create a Backup

You can create a new backup and set the timing for how long the backup is kept. This should be set for every environment (Dev, Test, Live).

Select the **Backups** tab, and click **Create New Backup**. The status is shown in the progress bar as it's being created, and the jobs workflow shows the number of active jobs. You can continue on with development while the backup is in progress.

![Backups tab](../images/dashboard/backup-tool.png)

<Alert title="Warning" type="danger">

Run backups separately for each environment (Dev, Test, and Live). If you have changes in SFTP mode that you have not committed, the changes will be lost with no way to recover them. The backups are based on the code currently in the Git log.

</Alert>

![Create site backup Pantheon Dashboard](../images/dashboard/manual-site-backup.png)

If you prefer the command line, you can use [Terminus](/terminus) to create backups:

```bash{promptUser: user}
terminus backup:create $site.$env --element=<element> --keep-for=<days>
```