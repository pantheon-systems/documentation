---
title: Backups
subtitle: FAQs
description: Get answers to your Backups Tool questions.
tags: [backups, security]
innav: [false]
categories: [backup]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/backups/faqs-backups
anchorid: faqs-backups
contenttype: [guide]
---

This section provides answers to frequently asked Backups Tool questions.

### Where are the backups stored?

Backups are currently stored offsite for redundancy on Google Cloud Storage instances.

### How do I restore from my site from a full environment backup?

In the event that you need to return your site to a certain point, you can use a [full backup to restore an environment](/guides/environment-configuration/restore-environment-backup).

### How long does a backup take?

This depends on how much content you have. When you are doing a full environment backup, it can take some time depending on the size of your code, database, and files. Refer to [Restore Process Time](/guides/backups/restore-from-backup#restore-process-time) for more information.

### How can I specify the time for my backups to run?

Daily backups are run at a random time during the day. You must have a plan associated with a site to select a specific day for a weekly backup. Refer to [Manage Plans in the Site Dashboard](/guides/legacy-dashboard/site-plan) for more information about site plans on Pantheon.

### What time zone is the backup time shown in?

Backups are shown in your time zone.

### Why do my automated backups not always run when I scheduled them to run?

If Pantheon's resources are occupied by other backups, your backup will be placed in a backup queue. The time that the backup is actually run will be shown in the backups label.

### Why is the Drupal module Backup & Migrate not recommended on Pantheon?

As a product in general, Backup & Migrate fulfills many site owners’ needs, but it is not recommended within the context of the Pantheon platform. [Using ​​Backup & Migrate on Pantheon](/modules-known-issues#backup-and-migrate) can make your Drupal site work harder for a number of reasons:

- Requires a full Drupal bootstrap
- Monopolizes an appserver process and MySQL process while running
- Backups are written to Valhalla, our Network File System that is not optimized for large files (and explicitly does not work for files above 256MB)
- Does not use mysqldump by default (it is available as an experimental destination)
- Can cause excessively long Drupal cron runs, which blocks other operations if it times out
- Creates monolithic archives by default

Additionally, security vulnerabilities can occur by ignoring interface warnings and configuring backups that are placed in web accessible locations.

In comparison, Pantheon’s backup mechanism:

- Does not require a full, or any, Drupal bootstrap
- Does not utilize an appserver process
- Does not write to Valhalla, so there are no file size limitations. Instead, backups are stored on Google Cloud Storage for black-swan redundancy
- Uses mysqldump for minimal database impact
- Executed using job scheduling, and will wait in the queue if the system is busy and execute as soon as its ready
- Creates distinct archives for code, database, and files
- Secures access to archives through Pantheon authentication (no anonymous users can access)

Additionally, you can manually trigger a full Pantheon backup job for any site environment at any time with [Terminus](/terminus). This process provides download links for retrieval (the links expire and are renewed for additional security).

```bash
terminus backup:get $site.$env --file=<filename> --element=<element>
```
Refer to <a data-proofer-ignore href="/docs/modules-plugins-known-issues/#backup-and-migrate">Modules and Plugins with Known Issues</a>

### What can I do during backups?

Your Backup Log on the Site Dashboard displays the current status of backups in progress for your code, database, and files:

![Backups in progress](../../../images/backup-progress.png)

If your **Code** or **Database** backup is taking a long time to complete, we suggest you [contact support](/guides/support/contact-support/) to discuss causes and possible solutions. Don't deploy code or change database values during these backups, as it can destroy the integrity of the backup or cause it to fail.

If you have a large number of static files, this can slow down the **Files** backup. We suggest large file repositories be stored on a CDN for efficiency. However, you can still make changes to your code and database during a long file backup, provided your changes don't affect static files.

## More Resources

- [Your Site Code on Pantheon](/pantheon-workflow#your-site-code-on-pantheon)
- [Pantheon Logs](/guides/logs-pantheon)
- [Pantheon WebOps Workflow](/pantheon-workflow)