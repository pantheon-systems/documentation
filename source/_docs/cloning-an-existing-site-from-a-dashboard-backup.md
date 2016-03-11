---
title: Cloning an Existing Site from a Dashboard Backup
description: Detailed information on how to make a copy of your existing Drupal or WordPress site code, files, and database.
categories:
  - developing
keywords: clone, restore backup, clone existing pantheon site, clone from pantheon backup, clone pantheon site, copy pantheon site
---
All Pantheon sites consist of three parts:

* **Code**: The code that makes up your site and contained within your Pantheon Git repository.
* **Files**: Images, user uploads, and other files that are not stored in version control, located in /sites/default/files (Drupal) or /wherever/wp-uploads/go (WordPress).
* **Database**: The MySQL database utilized by your code to store content, settings, etc.

You can clone an existing site from a Dashboard backup using the Importer tool when creating a new site. However, if your site exceeds the file size limit for uploads or if you need to preserve the site's existing Git history you will need to [manually import](/docs/manual-site-import) each archive instead of using the Importer tool.

## Download Archives

1. From your Site Dashboard, go to the Live environment and click **Backups**.
2. Select the backup you want to clone from, and download each of the backup archives (Code, Database, Files) by clicking **Direct Download**.

## Import Archives
1. Go to the Account page on [https://dashboard.pantheon.io/](https://dashboard.pantheon.io/).
2. Click **Create A New Site**.
3. Name your new site.
4. Choose **Import Archives**.
5. Select the **Provide separate code, database, and files archives** link.
6. In each of the fields, change the option from URL to File, then select the archives you previously downloaded.
7. Click **Import Site**.

The import process will create and deploy a new site based on the uploaded files. If there are issues, see [Migrate Sites to Pantheon](/docs/migrate) for possible solutions, or open a support ticket from your Dashboard. Be sure to include any error messages or relevant information.
