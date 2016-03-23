---
title: Migrate to Pantheon: WordPress Duplicator
description: Learn how to migrate a WordPress site to Pantheon using the Duplicator plugin.
categories: [wordpress]
tags: [code, migrate, create]
keywords: wordpress, pantheon, duplicator, clone, new site
---
We recommend migrating WordPress sites from another host using the [Pantheon Migration](https://wordpress.org/plugins/bv-pantheon-migration/) plugin, developed by [BlogVault](https://blogvault.net/). However, the Duplicator plugin can be used as an alternative.

## Migrate WordPress via Duplicator

1. Install the [Duplicator](https://wordpress.org/plugins/duplicator/) plugin on your existing WordPress Site.
2. From within the WordPress Dashboard on your existing site, navigate to the Duplicator plugin page and create a new package by selecting **Next** and then **Build**.
3. Click **Archive** to download the .zip file.
4. Create and a new site on Pantheon and import your archive:
 - Choose **Create a new site** from your Pantheon Dashboard.
 - Name your site.
 - Select **Import Archives**.
 - Select the **File** option, and upload the .zip file.
 - Click **Import Site**.

The import process will create and deploy a new site based on the file you uploaded. If there are issues, see [Migrate Sites on Pantheon](/docs/migrate) for possible solutions, or open a support ticket from your Dashboard. Be sure to include any error messages or relevant information.
