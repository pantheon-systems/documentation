---
title: Migrating to Pantheon Using cPanel
description: Get all the details you need to know to successfully migrate your site to Pantheon.
categories: [developing]
tags: [migrate, getting-started]
keywords: cpanel, migrate, new site, migrating sites
---

If you're unable to migrate you site from your current host to Pantheon using the typical [migration](/docs/migrate) methods, you can migrate your site via [cPanel](http://cpanel.com/).


## Migrate a Site with cPanel

1. Log in to your cPanel account.
2. Click **Applications**, then **My Applications**.
3. Select your site and create a backup.
4. Go to the File Manager (root directory).
5. Click **Applications Backup**, and download the backup.
6. Going back in to cPanel and click **Database Manager**.
7. Export your database.
8. Create a local site using [MAMP](https://www.mamp.info/en/) or a similar tool.
9. Import the database.
10. Test the site.
11. Run `drush ard your-site-name`.
12. [Import your site](https://pantheon.io/docs/migrate/#import-your-site) to Pantheon.
