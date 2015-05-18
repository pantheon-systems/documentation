---
title: Restoring an Environment from a Backup
description: Learn how to restore a backup to any environment.
category:
  - managing
keywords: restore backup, restore environment, restore, how to restore backup, how to restore, restore from another environment, restore any environment backup, restore environment backup, restores, backups
---
Each site environment's backups can be found on the Backups subtab for the environment in the Pantheon Dashboard.  
 ![Backup Subtab](/source/docs/assets/images/desk_images/169631.png)

## Restoring an Environment From Its Own Backup

Each manual and automatic backup can be directly restored to that environment from the Pantheon Dashboard by clicking the **Restore** button to the right of a backup. ![Backups and Restore Button](/source/docs/assets/images/desk_images/169624.png)

This is a  **destructive** process; this will  **wipe** your database and files, and restore them from the backup.

When a restore starts, the operation is placed in a machine queue and executed. Depending on the size of the site, this operation may take some time; be patient and do not attempt to restart the restore unless you are confident that it completed. When in doubt, submit a support ticket and ask.

<div class="alert alert-danger" role="alert"><strong>Warning:</strong> Pantheon does not recommend directly restoring a live environment from a backup; instead, restore to dev or test, then pull the code change and clone the content to live. This will minimize user-facing downtime.</div>

## Restoring an Environment From Another Environment's Backup

If you want to restore a different environment than the source, you have two options:

1. Download all three backup parts (Code, Database and Files) from the source environment, upload the Database and Files to the target environment, then update code.
2. Download the Code backup and use temporary links for the Database and Files to import Database and Files to the target environment, then update code.

Regardless of the option you choose, restoring is basically the same process.

In the source environment, find the backup that you wish to retrieve, then for each of the three backup parts  (Code, Database and Files), click the download link:<br />
 ![Temporary backup link](/source/docs/assets/images/desk_images/169628.png)  <br />
This will provide a temporary private link directly from Amazon S3, the external backup host. These links will expire after a few minutes; if the link is no longer working, return to the dashboard and get a new link. If you wish to directly download the backup part (required for Code), click **Direct Download** . Otherwise, copy the provided URL to be pasted in a moment.  


If you want to download a backup using wget, put the provided temporary link in double quotes, like

    wget "https://pantheon-backups.s3.amazonaws.com..."

## Importing Existing Content

Once you have the downloaded parts and/or links, navigate to the target environment and click on the **Workflow** subtab.  
If you have an existing database or file archive that you would like to import from an external source you can also upload the content here.
 ![Workflow Tab](/source/docs/assets/images/desk_images/169632.png)  
If using URLs, paste the URL (if using the direct Amazon S3 URL or another self hosted option), or choose File if you wish to upload an archive.  


Once the URL or File is specified, click **Import** for each backup part to start the process.  


Once the content has been uploaded, you will have to import the Code. If the environment that you are restoring belongs to the same site, see the [Git FAQ on undoing and reverting changes](/docs/articles/local/git-faq/#how-do-i-revert-or-undo-changes?).  


If the code belongs to a different site, then you will need to determine your best strategy. You can take the Code archive, remove the .git directory and overwrite the contents of the existing codebase and treat it as a single commit. Alternatively, you could attempt to merge the old git repository history with the new; see the [Git FAQ on importing an existing site with history](/docs/articles/local/git-faq/#how-do-i-import-a-site-with-existing-git-history?).
