---
title: Backup Creation
description: Detailed information on how to create a backup of any Drupal or WordPress site environment.
createbackups: true
categories: []
tags: [dashboard]
keywords: backup, backup creation, create a backup, create backup, create backups, backups, code, database, files, access backups, where are backups stored, backups stored, backup archive, access archives, access archive
---
Pantheon makes creating a backup of an environment a simple one-click operation.

If you prefer the command line, you can use [Terminus](/docs/terminus) to create backups:
```
terminus backup:create <site>.<env> --element=<element> --keep-for=<days>
```

A backup contains three separate archives: a database backup, a files backup, and a code backup.

## Create a Backup

Select the **Backups** tab, and click **Create New Backup**. The status is shown in the progress bar as it's being created, and the jobs workflow shows the number of active jobs. You can continue on with development while the backup is in progress.

<div class="alert alert-danger" role="alert"><h4 class="info">Warning</h4>
<p>Run backups separately for each environment (Dev, Test, and Live). If you have changes in SFTP mode that you have not committed, the changes will be lost with no way to recover them. The backups are based on the code currently in the Git log.</p></div>

![Create site backup Pantheon Dashboard](/source/docs/assets/images/dashboard/manual-site-backup.png)


## Backup Schedule and Retention
**Paid sites:** You can enable or disable automatic backups. If enabled, your nightly backup is stored for a week and your weekly backup is stored for a month. You can select the day the weekly backup is run.

**All sites:** You can run manual backups for free, and choose to keep them for one month or six months.

Backups created on Pantheon are stored offsite on Amazon EC2 instances for redundancy, however a full-fledged backup solution is strongly recommended for retention. For example, the following script can be executed from an external cron job to send backups to your own Amazon instance:
<div class="script-file-header">
pantheon-backup-to-s3.sh
<a id="downloadLink"><button class="btn btn-default btn-download"><i class="fa fa-download" aria-hidden="true"></i>   Download Script
</button></a>
</div>
<pre><code class="hljs bash" id="pantheon-backup-to-s3">#!/bin/sh

# pantheon-backup-to-s3.sh
# Script to backup Pantheon sites and copy to Amazon s3 bucket
#
# Requirements:
#   - Pantheon terminus cli
#   - Valid terminus machine token
#   - Amazon aws cli
#   - s3 cli access and user configured


# The amazon S3 bucket to save the backups to (must already exist)
S3BUCKET=""
# Optionally specify bucket region
S3BUCKETREGION=""
# The Pantheon terminus user
TERMINUSUSER=""
# Site names to backup (e.g. 'site-one site-two')
SITENAMES=""
# Site environments to backup (any combination of dev, test and live)
SITEENVS="live"
# Site elements to backup (any combination of files, database and code)
SITEELEMENTS="database files"
# Local backup directory (must exist, requires trailing slash)
BACKUPDIR=""

# connect to terminus
terminus auth:login $TERMINUS_USER

# iterate through sites to backup
for thissite in $SITENAMES; do

	# iterate through current site environments
	for thisenv in $SITEENVS; do

		# iterate through current site elements
		for thiselement in $SITEELEMENTS; do
			terminus backup:create $thissite.$thisenv --element=$thiselement

			# download current site backups
		terminus backup:get $thissite.$thisenv --element=$thiselement --to=$BACKUPDIR
		done

	done
done

# sync the local backup directory to aws s3
if [ -z "${S3BUCKETREGION}" ]; then
	aws s3 sync $BACKUPDIR s3://$S3BUCKET
else
  aws s3 sync $BACKUPDIR s3://$S3BUCKET --region $S3BUCKETREGION
fi</code></pre>


## Access Backups
### Via the Dashboard
When the backup has finished, the jobs indicator returns to its start state to let you know that the task is complete. You will notice a new backup in your log with three separate archives (code, database, and files).

![Access site backups Pantheon Dashboard](/source/docs/assets/images/dashboard/direct-download-backup.png)

The newest backup will appear at the top of the list. When the retention period expires for a backup, it will no longer be in the list of available archives.

Click the down arrow next to Code, Database, or Files to access the link for the offsite backup.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">Some older versions of Google Chrome can cause database backups to be downloaded with an incorrect file extensions (e.g. `.sql` instead of `sql.gz`). You can resolve this problem by updating Google Chrome or by renaming the file using the correct extension.</p>
</div>

### Via the Command Line
If you have the temporary URL provided via the Dashboard, you can download it from the command line using [`wget`](https://www.gnu.org/software/wget/):

```
wget "https://pantheon-backups.s3.amazonaws.com..."
```

You can also use [Terminus](/docs/terminus) to download backups. Note that `--element=all` is only available when creating backups and not when downloading.

    terminus backup:get <site>.<env> --element=<code|files|db> --to=path/to/file.tar.gz

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">When specifying the file path for `--to`, be sure to use the correct extension. File and code backups are saved as `.tar.gz`, while database backups are saved as `.sql.gz`.
</p>
</div>

Select an older archive by running `terminus backup:list <site>.<env>`, copying the filename, and pasting it in the `--file=<filename>` option when downloading:

    terminus backup:get <site>.<env> --file=<filename> --to=path/to/file.tar.gz

Now that you have created the archive files, check out how to [restore an environment from a backup](/docs/restore-environment-backup).

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Links to backups are signed URLs directly from Amazon S3 and will expire. If a link has expired, go back to the Dashboard and get a new link to the archive. <a href="http://stackoverflow.com/a/4649553">See this documentation for more information about signed URLS</a>.</p></div>

## About Your Code Archives
Code archives contain the full remote Git repository and reflect the state of code for the given environment. Backups created on the Test and Live environments automatically checkout the [`git tag`](https://git-scm.com/book/en/v2/Git-Basics-Tagging) associated with the most recent deployment.


## Frequently Asked Questions

#### Where are the backups stored?

Backups are currently stored offsite for redundancy on Amazon EC2 instances.

### How do I restore from my site from a full environment backup?

In the event that you need to get your site to a certain point, you can use a [full backup to restore an environment](/docs/restore-environment-backup).

#### How long does a backup take?

This depends on how much content you have. When you are doing a full environment backup, it can take some time depending on the size of your code, database, and files.

#### How can I specify the time for my backups to run?

Daily backups are run at a random time during the day. You must have a plan associated with a site to select a specific day for a weekly backup. See [Select a Plan](/docs/select-plan/) for details about site plans on Pantheon.

#### What time zone is the backup time shown in?

Backups are shown in your time zone.

#### Why do my automated backups not always run when I scheduled them to run?

If Pantheon's resources are occupied by other backups, your backup will be placed in a backup queue. The time that the backup is actually run will be shown in the backups label.

#### What's included in a backup?

Backups include your entire codebase; everything that's been committed. Uncommitted SFTP changes are not backed up. Your database is backed up in the form of a MySQL dump. Various content generated by your application is not backed up, e.g. generated images from image styles and aggregated CSS and JS assets.

### Drupal Note
Pantheon uses a `.gitignore` file to ignore the following items within the `sites/default/files` directory while backing up code:

- `/styles`
- `/css`
- `/js`
- `/backup_migrate`
- `/private/backup_migrate`
- `/imagecache`

### WordPress Note
Pantheon uses a `.gitignore` file to ignore the following items within the `wp-contents` directory while backing up code:

- `/uploads`
- `/blogs.dir`
- `/upgrade`
- `/backup-db`

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

Additionally, you can manually trigger a full Pantheon backup job for any site environment at any time on your own schedule using [Terminus](/docs/terminus/).  Also, you can get S3 download links for retrieval (the links expire and are renewed for additional security).
```bash
terminus backup:get <site>.<env> --file=<filename> --element=<element>
```
