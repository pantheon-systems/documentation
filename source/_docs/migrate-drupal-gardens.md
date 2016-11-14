---
title: Migrating a Drupal Gardens Site to Pantheon
description: Get all the details you need to know to successfully migrate your site away from Drupal Gardens.
categories: [drupal]
tags: [migrate]
keywords: drupal, pantheon, drupal gardens, import
draft: true
---
Drupal Gardens is ending support on August 1, 2016. This article walks you through exporting and migrating your site from Drupal Gardens to Pantheon.

## Export a Site from Drupal Gardens

1. Log in to your [Drupal Gardens account](https://www.drupalgardens.com/user/login).
2. Go to **My Sites**.
3. From the Actions menu next to the site you want to export, select **Export site**.
4. Select "Want to host it on a 3rd party hosting company" as the reason for exporting, and enter an explanation.
5. Click **Export**. This may take some time depending on the size of your site.
6. Once it's finished exporting, save the file (.tar.gz archive) to your computer.
7. Verify that all files are included in the site archive. If any files are missing, download them from Drupal Gardens as instructed in their [export documentation](https://www.drupalgardens.com/documentation/site-export).

Drupal Gardens may include one or more copies of the `settings.php` file in the archive. Pantheon does not need the `settings.php` file to import the site, but to prevent import problems, it's best to simply remove `settings.php` by running the following commands:

```bash
tar xzvf gardenssite.tar.gz
rm docroot/sites/default/settings.php
tar cvzf gardenssite-for-pantheon.tar.gz docroot/
```

## Import Your Site to Pantheon
Import the site archive to Pantheon using either the [Guided](/docs/migrate) or [Manual Migration](/docs/migrate-manual/) method.

Manually migrate your site to Pantheon when any of the following apply:

* **Large Drupal Site Archive**: Site archive is greater than the guided migration import limit of 500MB.
* **Preserve Git History**: You'd like to preserve your site's existing Git commit history.
* **[WordPress Site Networks](/docs/wordpress-site-networks/)**
* **Plugin install unavailable on existing WordPress site** For example, if your existing site is hosted on WordPress.com, you'll be unable to install the Pantheon Migrations plugin.
* **Debug Failed Migration**: It can be helpful to migrate your code, database, and files separately to help debug edge-cases that are not supported through guided migration.
