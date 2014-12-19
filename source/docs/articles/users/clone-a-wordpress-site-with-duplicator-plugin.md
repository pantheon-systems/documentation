---
title: Clone a WordPress site to Pantheon using Duplicator plugin
description: Learn to copy a WordPress site using the Duplicator plugin on Pantheon.
category:
  - WordPress
---

## 1. Install [Duplicator](https://wordpress.org/plugins/duplicator/) on your Existing WordPress Site

## 2. Archive Your Site's Code/Files/Database

Within your WordPress site, go to the Duplicator plugin page and create a new package. Using the default settings, click **Next** and then **Build**. When complete, click **Archive** to download the .zip file.

## 3. Create A New Pantheon Site/Import Your Archive

1. Within your dashboard click the "Create A New Site" link.
2. Name your new site, and then select "Import site" from the "Choose your Start State" options.
3. Next, select “Import Archive”.
4. Select the “File” option and upload the .zip file created in Step 1.2. Then click the "Import Site" button.
5. The import process will create and deploy a new site based on the file uploaded. If there are issues, please refer to our [importing](/docs/articles/drupal/importing-an-existing-drupal-site-to-pantheon#importing-an-existing-site) document for possible solutions or open a support ticket from your dashboard. Be sure to include any error messages or relevant information.
