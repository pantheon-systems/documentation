---
title: Cloning an Existing Site from a Dashboard Backup
description: Detailed information on how to make a copy of your existing Drupal or WordPress site code, files, and database.
category:
  - developing
keywords: clone, restore backup, clone existing pantheon site, clone from pantheon backup, clone pantheon site, copy pantheon site
---
All Pantheon sites consist of three parts:

* **Code**: The code that makes up your site and contained within your Pantheon Git repository.
* **Files**: Images, user uploads, and other files that are not stored in version control, located in /sites/default/files (Drupal) or /wherever/wp-uploads/go (WordPress).
* **Database**: The MySQL database utilized by your code to store content, settings, etc.

## Copy Your Code/Files/Database

1. From your Site Dashboard, go to the Live environment and click **Backups**.
2. Select the backup you want to clone from, and download each of the backup files (code, database, files) by clicking the **download** icon.

When you download a code archive for an environment, it contains the full Git repository checked out at master. If this code archive is combined with the database and files archive from that point in time, the code might not match the snapshot deployed on that environment. If you want to make a clone of Live or Test and it is a few commits behind Dev, use Git to checkout the appropriate tag for the state of code you want. This will leave the repository in a detached head state so you can create and then merge a branch back into master prior to uploading it.  

To get the master branch in the same state as the code checked out on a tag:
```
git checkout pantheon_env_nnn
git checkout -b new_branch_name
git checkout master
git merge new_branch_name
```
Then you can make an archive of this codebase to import into a new site, or push the master branch back up to the origin, or push the new branch and try it out on Multidev.

## Import Your Code/Files/Database

1. Go to the Account page on [https://dashboard.pantheon.io/](https://dashboard.pantheon.io/).
2. Click **Create A New Site**.
3. Name your new site.
4. Choose **Import Archives**.
5. Select the **Provide separate code, database, and files archives** link.
6. In each of the fields, change the option from URL to File, then select the archives you previously downloaded.
7. Click **Import Site**.

The import process will create and deploy a new site based on the uploaded files. If there are issues, see [Migrate Sites to Pantheon](/docs/articles/sites/migrate) for possible solutions, or open a support ticket from your Dashboard. Be sure to include any error messages or relevant information.

## Additional Considerations
Retaining Git history, importing large file structures or databases:
The methods in this article will work well for small to medium sites, but will not import the Git repository commit history or logs. Also, Pantheon's import process cannot handle exceptionally large file structures or databases. For any of these scenarios, see [Migrate to Pantheon: Manual Site Import](/docs/articles/sites/migrate/manual-site-import).
