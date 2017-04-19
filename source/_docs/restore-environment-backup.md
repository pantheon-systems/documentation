---
title: Restoring an Environment from a Backup
description: Detailed information on how to safely restore a Drupal or WordPress site backup to any environment.
tags: [debugfiles]
categories: []
---
Each site environment's backups are located on the Backups tab for the environment in the Pantheon Dashboard.

![Backup tool](/source/docs/assets/images/dashboard/backup-tool.png)

## Restore an Environment From Its Own Backup

Restore a manual or automatic backup (Code, Database, and Files) by clicking the **Restore** button to the right of a backup. This is the recommended and easiest method.

![Backups and Restore Button](/source/docs/assets/images/dashboard/restore-button.png)

This is a **destructive** process that will **wipe** your database and files, and restore them from the backup. It will also restore the codebase to the state the environment was in at that time.

When a restore starts, it is placed in a queue and executed. Depending on the size of the site, this operation may take some time; be patient and do not attempt to restart the restore unless you are confident that it completed. When in doubt, [contact support](/docs/getting-support).

<div class="alert alert-danger" role="alert"><h4 class="info">Warning</h4>
<p>We do not recommend directly restoring a Live environment from a backup; instead, restore to Dev or Test and pull the code change and clone the content to Live. This will minimize user-facing downtime.</p></div>

## Restore an Environment From Another Environment's Backup
From within the source environment, find the backup you want to restore and click the download link for Database and Files:

![Temporary backup link](/source/docs/assets/images/dashboard/direct-download-archive.png)

This provides a temporary private link directly from Amazon S3, the external backup host. These links will expire after a few minutes; if the link is no longer working, return to the Dashboard and get a new link. If you want to directly download the backup part (required for code), click **Direct Download**. Otherwise, copy the provided URL.

If you want to download a backup using wget, put the provided temporary link in double quotes:

    wget "https://pantheon-backups.s3.amazonaws.com..."

### Restore Database and Files
To restore Database and Files, navigate to the target environment and click the **Workflow** tab. Choose **File** and upload the backups for Database and Files if you downloaded the archives directly, otherwise provide the temporary URL for each backup. Click **Import** for each backup part to restore.

If you have an existing database or file archive that you want to import from an external source, you can also upload the content here.
![Workflow Tab](/source/docs/assets/images/dashboard/workflow-tab.png)

### Restore Code
Code archives contain the full remote Git repository and reflect the state of code for the given environment. Backups created on the Test and Live environments automatically checkout the [`git tag`](https://git-scm.com/book/en/v2/Git-Basics-Tagging) associated with the most recent deployment. However, if you would like to rewind an environment's codebase to a previous state we recommend using `git revert` or `git reset` instead of a code archive.

#### Revert Commits and Preserve History
This method is recommended for distributed teams working collaboratively. To undo commits while preserving the site's Git history:

1. Identify the commit you want to undo using the commit history provided in the Site Dashboard or by reviewing `git log` locally.
2. Copy the commit ID:

 ![commit ID](/source/docs/assets/images/dashboard/commit-id.png)

3. Replace <ID> with the commit ID and run: `git revert <ID> --no-edit`
4. Push the reverted codebase to Pantheon: `git push origin master`
5. Deploy the change from Dev up to Test and Live.

For more information, see [git-revert](https://git-scm.com/docs/git-revert).

#### Reset Commits and Overwrite History
This is a destructive process. If you're not comfortable with this technique, use `git revert` instead. To reset the codebase and overwrite history:

1. Identify the last commit you want included using the commit history provided within the Site Dashboard or by reviewing `git log` locally.
2. Copy the commit ID:

 ![commit ID](/source/docs/assets/images/dashboard/commit-id.png)

3. Replace <ID> with the commit ID you want to reset and run: `git reset <ID> --hard`
4. Push the reset codebase to Pantheon: `git push origin master --force`
 The `--force` option should be used sparingly, especially in distributed team environments. For more information, see [git push](https://git-scm.com/docs/git-push).
5. Deploy the change from Dev up to Test and Live.

For more information, see [git reset](https://git-scm.com/docs/git-reset).
