---
title: Exporting Sites from GoDaddy with cPanel
description: Learn how to migrate Drupal or WordPress sites to Pantheon from hosts that block cPanel exports.
tags: [export]
categories: []
---
There are some hosting providers that block complete site exports from cPanel, making it difficult to migrate the site elsewhere. The following steps will walk you through how to export sites with limited cPanel access, such as GoDaddy.

## Export Site via cPanel

1. Log in to your cPanel account.
2. Click **Applications**, then **My Applications**.
3. Select your site and create a backup.
4. Use File Manager to navigate to your root directory.
5. Click **Applications Backup**, and download the backup.
6. Going back in to cPanel and click **Database Manager**.
7. Export your database.
8. Create a local site using [MAMP](https://www.mamp.info/en/) or a similar tool.
9. Import the database.
10. Test the site.
11. Now that you have the site exported and running locally, you can [migrate to Pantheon](/docs/migrate/).
