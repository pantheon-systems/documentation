---
title: Clone a WordPress Site to Pantheon Using the Duplicator Plugin
description: Learn to copy a WordPress site to Pantheon using the Duplicator plugin.
category:
  - WordPress
  - getting-started
  - developing
keywords: wordpress, pantheon, duplicator, clone, new site
---
## 1. Install [Duplicator](https://wordpress.org/plugins/duplicator/) on your Existing WordPress Site

## 2. Archive Your Site's Code/Files/Database

Within your WordPress site, go to the Duplicator plugin page and create a new package. Using the default settings, click **Next** and then **Build**. When complete, click **Archive** to download the .zip file.

## 3. Create A New Site/Import Your Archive

1. On your Dashboard, click **Create A New Site**.
2. Name your new site, and click **Create Site**.
3. Select **Import Archives**.
4. Select the **File** option, and upload the .zip file.
5. Click **Import Site**.

The import process will create and deploy a new site based on the file you uploaded. If there are issues, see [Migrate Sites on Pantheon](/docs/migrate) for possible solutions, or open a support ticket from your Dashboard. Be sure to include any error messages or relevant information.
