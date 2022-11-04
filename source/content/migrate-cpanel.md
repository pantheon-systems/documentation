---
title: Exporting Sites from GoDaddy with cPanel
description: Learn how to migrate Drupal or WordPress sites to Pantheon from hosts that block cPanel exports.
tags: [migrate]
newtype: doc
categories: [migrate, database, backup]
newcms: [drupal, wordpress]
audience: [agency, development]
product: []
integration: []
---

There are some hosting providers that block complete site exports from cPanel, making it difficult to migrate the site elsewhere. The following steps will walk you through how to export sites with limited cPanel access, such as GoDaddy.

## Export Site via cPanel

1. Log in to your cPanel account.

1. Click **Applications**, then **My Applications**.

1. Select your site and create a backup.

1. Use File Manager to navigate to your root directory.

1. Click **Applications Backup**, and download the backup.

1. Going back in to cPanel and click **Database Manager**.

1. Export your database.

1. Create a local site using [MAMP](https://www.mamp.info/en/) or a similar tool.

1. Import the database.

1. Test the site.

1. Now that you have the site exported and running locally, you can [migrate to Pantheon](/guides/guided/.