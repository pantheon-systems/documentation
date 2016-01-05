---
title: Restoring an Environment from a Backup
description: Detailed information on how to safely restore a Drupal or WordPress site backup to any environment.
category:
  - managing
keywords: restore backup, restore environment, restore, how to restore backup, how to restore, restore from another environment, restore any environment backup, restore environment backup, restores, backups
---
Each site environment's backups are located on the Backups tab for the environment in the Pantheon Dashboard.  
 ![Backup Subtab](/source/docs/assets/images/desk_images/169631.png)

## Restore an Environment From Its Own Backup

You can restore each manual and automatic backup by clicking the **Restore** button to the right of a backup. This is the recommended and easiest method. ![Backups and Restore Button](/source/docs/assets/images/desk_images/169624.png)

This is a **destructive** process that will **wipe** your database and files, and restore them from the backup.

When a restore starts, it is placed in a queue and executed. Depending on the size of the site, this operation may take some time; be patient and do not attempt to restart the restore unless you are confident that it completed. When in doubt, submit a support ticket.

<div class="alert alert-danger" role="alert"><h4>Warning</h4>
We do not recommend directly restoring a Live environment from a backup; instead, restore to Dev or Test and pull the code change and clone the content to Live. This will minimize user-facing downtime.</div>

## Restore an Environment From Another Environment's Backup

If you want to restore a different environment than the source, you have two options:

1. Download all three backup parts (code, database, and files) from the source environment, upload the database and files to the target environment, then update code.
2. Download the code backup and use temporary links for the database and files to import the database and files to the target environment, then update code.

Regardless of the option you choose, restoring is basically the same process.

In the source environment, find the backup that you want to retrieve, then for each of the three backup parts (code, database, and files), click the download link:<br />
 ![Temporary backup link](/source/docs/assets/images/desk_images/169628.png)  <br />
This provides a temporary private link directly from Amazon S3, the external backup host. These links will expire after a few minutes; if the link is no longer working, return to the Dashboard and get a new link. If you want to directly download the backup part (required for code), click **Direct Download**. Otherwise, copy the provided URL.  

If you want to download a backup using wget, put the provided temporary link in double quotes:

    wget "https://pantheon-backups.s3.amazonaws.com..."

## Restoring Your Codebase
When you download a backup to your local environment, it will include the entire repository and all tags. This means that your Live environment will include code changes from Dev that have not yet been deployed to Live. To restore an environment, click the **Restore** button to the right of a backup.

## Import Existing Content

Once you have the downloaded parts and/or links, navigate to the target environment and click the **Workflow** tab.  
If you have an existing database or file archive that you want to import from an external source, you can also upload the content here.  
![Workflow Tab](/source/docs/assets/images/desk_images/169632.png)  
If using URLs, paste the URL (if using the direct Amazon S3 URL or another self hosted option), or choose **File** to upload an archive.  
Once the URL or file is specified, click **Import** for each backup part to start the process.  
Once the content has been uploaded, you will have to import the code. If the environment that you are restoring belongs to the same site, see the [Git FAQ on undoing and reverting changes](/docs/articles/local/git-faq/#how-do-i-revert-or-undo-changes?).  
If the code belongs to a different site, you will need to determine your best strategy. You can take the code archive, remove the .git directory, and overwrite the contents of the existing codebase and treat it as a single commit. Alternatively, you can attempt to merge the old Git repository history with the new; see [Git FAQ on importing an existing site with history](/docs/articles/local/git-faq/#how-do-i-import-a-site-with-existing-git-history?) for more information.
