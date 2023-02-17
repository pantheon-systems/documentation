---
title: Backups Tool
subtitle: Restore a Backup
description: Learn how restore from an existing backup.
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
permalink: docs/guides/backups/restore-from-backup
anchorid: restore-from-backup
contenttype: [guide]
---

This section provides information on how to restore environments from a backup.

Pantheon's Backups Tool and unique [environment configuration](/guides/environment-configuration) allows you to perform complex environmental restorations. Consult the links below for more information.

- [Restore an Environment From Another Environment's Backup](/guides/environment-configuration/restore-environment-backup#restore-an-environment-from-another-environments-backup)
- [Restore Databases and Files](/guides/environment-configuration/restore-environment-backup#restore-database-and-files)
- [Restore the Live Environment](/guides/environment-configuration/restore-environment-backup#restore-the-live-environment)
- [Restore Large Sites](/guides/environment-configuration/restore-environment-backup#restoring-large-sites)

## Before you Begin the Restore Process

It is important that you and your team know that this is a **destructive** process that will **wipe** your database and files, and restore them from the backup. It will also restore the codebase to the state the environment was in when backed up.

When a restore starts, it is placed in a queue and executed. Depending on the size of the site, this operation may take some time. Be patient and do not attempt to restart the restore unless you are confident that it completed. During the restore process, files might show as missing and the site as unavailable. When in doubt, [contact support](/guides/support/contact-support/).

![Backup tool](../../../images/dashboard/backup-tool.png)

## Restore an Environment From Backup

Each manual and automatic backup can be directly restored to that environment within the Pantheon Dashboard. Refer to [Restoring an Environment From a Backup](/guides/environment-configuration/restore-environment-backup) for more information.

1. Navigate to your site's dashboard.

1. Click **Backups** and then click **Backup Log**.

1. Click **Restore** next to the desired backup to restore a manual or automatic backup (Code, Database, and Files).

<Alert title="Note" type="info">

The **Restore** button is only available when **Development Mode** is set to **Git** mode in  development environments (Dev and Multidevs. This does not apply to production environments (Test and Live). For details, refer to [The Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites).

</Alert>

![Backups and Restore Button](../../../images/dashboard/restore-button.png)

## Restore Process Time

When the **Restore** button is pressed, three separate workflow process are triggered in the dashboard. One each for code, database, and assets (media files like images or other attachments). One workflow may complete ahead of the others.

There is no way to determine specifically how long any one restore job will take, as it varies per site. The usual factor that extends the restore process is the *count*, or number of files in the codebase or files backup. We've seen sites take more than one hour to restore when they have 10,000 files or above, though this is not a strict ratio as individual file sizes also affect the time.

One way to estimate time to restore is to check the last backup duration. The Terminus `workflow:list` command will show workflow durations in the **Time Elapsed** field, in seconds.

```bash{outputLines: 2-9}
terminus workflow:list yoursite-name --fields id,env,workflow,time --format table
 -------------------------------------- ------------- --------------------------------------------- --------------
  Workflow ID                            Environment   Workflow                                      Time Elapsed
 -------------------------------------- ------------- --------------------------------------------- --------------
  31442e94-9e34-11e9-b40b-42010a800275   dev           Automated backup for the "dev" environment    2292s
  cce72480-9e2c-11e9-bece-42010a8001a4   live          Automated backup for the "live" environment   1290s
  cdb6df62-9d6a-11e9-85d1-42010a800117   dev           Automated backup for the "dev" environment    4328s
  f194a2fa-9d62-11e9-b1a0-42010a800117   live          Automated backup for the "live" environment   5152s
  de32c0fa-9ca1-11e9-a9aa-42010a800117   dev           Automated backup for the "dev" environment    2335s
```

## More Resources

- [Environment Configuration](/guides/environment-configuration)
- [Pantheon WebOps Workflow](/pantheon-workflow)