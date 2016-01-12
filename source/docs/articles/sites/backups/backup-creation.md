---
title: Backup Creation
description: Detailed information on how to create a backup of any Drupal or WordPress site environment.
category:
  - managing
keywords: backup, backup creation, create a backup, create backup, create backups, backups, code, database, files, access backups, where are backups stored, backups stored, backup archive, access archives, access archive
---
Pantheon makes creating a backup of an environment a simple one-click operation.

If you prefer the command line, you can use [Terminus](/docs/articles/local/cli) to create backups:  
```
terminus site backups create [--site=<site>] [--env=<env>] [--element=<code|files|db|all>] [--keep-for]
```

A backup contains three separate archives: a database backup, a files backup, and a code backup.

<div class="alert alert-danger" role="alert"><h4>Warning</h4>
Run backups separately for each environment (Dev, Test, and Live). If you have changes in SFTP mode that you have not committed, the changes will be lost with no way to recover them. The backups are based on the code currently in the Git log.</div>

## Create a Backup

Select the **Backups** tab, and click **Create New Backup**. The status is shown in the progress bar as it's being created, and the jobs workflow shows the number of active jobs. You can continue on with development while the backup is in progress.
 ![Create site backup Pantheon Dashboard](/source/docs/assets/images/desk_images/305276.png)

## Access Backups  
### Via the Dashboard
When the backup has finished, the jobs indicator returns to its start state to let you know that the task is complete. You will notice a new backup in your log with three separate archives (code, database, and files).
 ![Access site backups Pantheon Dashboard](/source/docs/assets/images/desk_images/305286.png)

The newest backup will appear at the top of the list. When the retention period expires for a backup, it will no longer be in the list of available archives.  

Click the down arrow next to Code, Database, or Files to access the link for the offsite backup.

### Via the Command Line
You can also use  [Terminus](/docs/articles/local/cli) to download backups. Note that `--element=all` is only available when creating backups and not when downloading. Include the `--latest ` option to automatically download the most recently created backup. Select older archives by running `terminus site backups list`, copying the filename, and pasting it in the `--file=<filename>` option when downloading:
```
terminus site backups get [--site=<site>] [--env=<env>]
[--element=<code|files|db|all>] [--to=<directory|file>][--latest]
```

Now that you have created the archive files, check out how to [restore an environment from a backup](/docs/articles/sites/backups/restoring-an-environment-from-a-backup).

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Links to backups are signed URLs directly from Amazon S3 and will expire. If a link has expired, go back to the Dashboard and get a new link to the archive. <a href="http://stackoverflow.com/a/4649553">See this documentation for more information about signed URLS</a>.</div>

## About Your Code Archives
When you download a backup to your local environment, it will include the entire repository and all tags. This means that initially, the code you see will reflect the state of the Dev environment, regardless of which environment you downloaded it from.

To get the code to the state of the Test or Live environment, you'll need to create a branch and checkout that tag. Each Deploy to Test and Live adds another tag to the repository. To see the tags, run

```
git tag
```

And then to checkout that tag to a new branch, use

```
git checkout -b [branchname] [tagname]
```

For more information on Git tags, see [Git Basics - Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging).

## Frequently Asked Questions

#### Where are the backups stored?

Backups are currently stored offsite for redundancy on Amazon EC2 instances.

### How do I restore from my site from a full environment backup?

In the event that you need to get your site to a certain point, you can use a [full backup to restore an environment](/docs/articles/sites/backups/restoring-an-environment-from-a-backup).

#### How long does a backup take?

This depends on how much content you have. When you are doing a full environment backup, it can take some time depending on the size of your code, database, and files.

#### How can I specify the time for my backups to run?

Daily backups are run at a random time during the day. You must have a plan associated with a site to select a specific day for a weekly backup. See [selecting a plan](/docs/articles/sites/settings/selecting-a-plan/) for details about site plans on Pantheon.

#### What time zone is the backup time shown in?

Backups are shown in your time zone.

#### Why do my automated backups not always run when I scheduled them to run?

If Pantheon's resources are occupied by other backups, your backup will be placed in a backup queue. The time that the backup is actually run will be shown in the backups label.

#### What's included in a backup?

Backups include your entire codebase; everything that's been committed. Uncommitted SFTP changes are not backed up. Your database is backed up in the form of a MySQL dump. Various content generated by your application is not backed up, e.g. generated images from image styles and aggregated CSS and JS assets.

### Drupal Note
In the `sites/default/files` directory, the following items are not backed up:

- `/styles`
- `/css`
- `/js`
- `/backup_migrate`
- `/private/backup_migrate`
- `/imagecache`

Within the code, Pantheon uses a [.gitignore file](https://github.com/pantheon-systems/drops-7/blob/master/.gitignore). It contains a list of directories that are ignored while backing up code.

### WordPress Note
In the `wp-content` directory, the following items are not backed up:

- `/uploads`
- `/blogs.dir`
- `/upgrade`
- `/backup-db`

Within the code, Pantheon uses a [.gitignore file](https://github.com/pantheon-systems/WordPress/blob/master/.gitignore). It contains a list of directories that are ignored while backing up code.

### Why is the Drupal module Backup & Migrate not recommended on Pantheon?

As a product in general, Backup & Migrate is perfectly fine and fulfills many site owners’ needs, but it is not recommended within the context of the Pantheon platform. On Pantheon, ​​Backup & Migrate can make your Drupal site work harder for a number of reasons:

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
- Does not write to Valhalla, so there are no file size limitation. Instead, backups are stored in Amazon S3 for black-swan redundancy
- Uses mysqldump for minimal database impact
- Executed using job scheduling, and will wait in the queue if the system is busy and execute as soon as its ready
- Creates distinct archives (code, database, files)
- Secures access to archives through Pantheon authentication (no anonymous users can access)

Additionally, you can manually trigger a full Pantheon backup job for any site environment at any time on your own schedule using [Terminus](/docs/articles/local/cli/).  Also, you can get S3 download links for retrieval (the links expire and are renewed for additional security).
```bash
terminus site backups <get|load|create|list> [--site=<site>] [--env=<env>]
[--element=<code|files|db|all>] [--to=<directory|file>] [--file=<filename>] [--latest] [--keep-for]
```
