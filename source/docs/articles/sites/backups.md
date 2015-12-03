---
backups: true
layout: landing
use:
  - backups
title: Backups Tool
description: Learn about the Backups tool available on the Pantheon Website Management Platform.
category:
  - developing
keywords: backups, backing up, archive, archives, create backup
---
The Backups tab is where you manage all the details for your site's backup. A backup is made up of three separate archives: a database backup, a files backup, and a code backup. Backups are stored with Amazon's multi-datacenter Simple Storage Solution service.

We strongly urge you to backup your site regularly.<br />
![Backups tab](/source/docs/assets/images/backups-image.png)

##Create a Backup
You can create a new backup and set the timing for how long the backup is kept. This should be set for every environment (Dev, Test, Live). For detailed instructions creating a backup, see [Backup Creation](/docs/articles/sites/backups/backup-creation).
##Restore From an Existing Backup
Each manual and automatic backup can be directly restored to that environment from the Pantheon Dashboard. For detailed instructions, see [Restoring an Environment From a Backup](/docs/articles/sites/backups/restoring-an-environment-from-a-backup/).
##Backup Log
The backup log displays a list of existing backups for that environment. You can also create a new backup or restore your site from an existing backup.
##Backup Schedule
**Paid sites**: You can enable or disable automatic backups. If enabled, your  nightly backup is stored for a week and your weekly backup is stored for a month. You can select the day the weekly backup is run.

**All sites**: You can run manual backups for free, and choose to keep them for one month or six months.
