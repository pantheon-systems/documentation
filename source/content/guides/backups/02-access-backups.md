---
title: Backups Tool
subtitle: Access Backups
description: Learn how to access your backups.
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
permalink: docs/guides/backups/access-backups
anchorid: access-backups
contenttype: [guide]
---

This section provides information on how to access your backups from your Pantheon dashboard, or from the command line.

## Access Backups

Backups created on Pantheon are stored offsite on Google Cloud Storage instances, however a full-fledged backup solution is strongly recommended for retention. For example, the following script can be executed from an external cron job to send backups to your own Amazon S3 instance:

<Download file="pantheon-backup-to-s3.sh" />

GITHUB-EMBED https://github.com/pantheon-systems/documentation/blob/main/source/scripts/pantheon-backup-to-s3.sh.txt bash GITHUB-EMBED

### Via the Dashboard

When the backup has finished, the jobs indicator returns to its start state to let you know that the task is complete. You will notice a new backup in your log with three separate archives (code, database, and files).

![Access site backups Pantheon Dashboard](../images/dashboard/direct-download-backup.png)

The newest backup will appear at the top of the list. When the retention period expires for a backup, it will no longer be in the list of available archives.

Click the down arrow next to Code, Database, or Files to access the link for the offsite backup.

<Alert title="Note" type="info">

Some older versions of Google Chrome can cause database backups to be downloaded with an incorrect file extensions (e.g. `.sql` instead of `sql.gz`). You can resolve this problem by updating Google Chrome or by renaming the file using the correct extension.

</Alert>

### Via the Command Line

If you have the temporary URL provided via the Dashboard, you can download it from the command line using [`Wget`](https://www.gnu.org/software/wget/) or [Terminus](/terminus).

#### Unix/MacOS

```bash{promptUser: user}
wget https://storage.googleapis.com/gcs-pantheon-backups/...
```

#### Windows

When using Wget in the Windows Powershell, wrap the URL in double quotes (`"`). The shell doesn't return any output until the download completes:

```bash{promptUser: winshell}
wget "https://storage.googleapis.com/gcs-pantheon-backups/..."
```

#### Terminus

Note that `--element=all` is only available when creating backups and not when downloading:

```bash{promptUser: user}
terminus backup:get $site.$env --element=<code|files|db> --to=path/to/file.tar.gz
```

File and code backups are saved as `.tar.gz`, while database backups are saved as `.sql.gz`. When specifying the file path for `--to`, be sure to use the correct extension.

Select an older archive by running `terminus backup:list $site.$env`, copying the filename, and pasting it in the `--file=<filename>` option when downloading:

```bash{promptUser: user}
terminus backup:get $site.$env --file=<filename> --to=path/to/file.tar.gz
```

Links to backups are signed URLs directly from Google Cloud Storage and will expire. If a link has expired, go back to the Dashboard and get a new link to the archive.