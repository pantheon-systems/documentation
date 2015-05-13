---
title: Clone a Drupal Site on Pantheon Using Drush
description: Learn how to copy an existing Drupal site using Drush on Pantheon.
category:
  - getting-started
  - drupal
  - developin
keywords: drupal, drush, clone, import, copy site
---
There may be times when you need to copy an existing Drupal site to an entirely new, separate environment. This is a fairly simple, manual process. This article will walk you through the basic method of doing so.

## Archive Your Live Code/Files/Database
**Prerequisites:**  
 [Authenticated via Terminus](/docs/articles/local/cli)

 1. From the command line, run [the drush ard](http://www.drushcommands.com/drush-6x/archive/archive-dump) command against the Live environment.
 2. Set the destination parameter to include a file name.  

**Example**:
```
terminus drush --site=<site> --env=live ard --destination=sites/default/files/site\_export.tar.gz
```

##  Import Your Archive

1. From your Dashboard, click **Create A New Site**.
2. Name your new site, and then select **Import Site** from the "Choose your Start State" options.
3. Select **Import Archive**.
4. Enter the full URL of the live site you are cloning, as well as the path of the archive.

  **Example**: https://your-live-site.pantheon.io/sites/default/site\_export.tar.gz
5. Click **Import Site**.

The import process will create and deploy a new site based on the file uploaded. If there are issues, see [Importing an Existing Site to Pantheon](/docs/articles/sites/create/importing-an-existing-site), or open a support ticket from your Dashboard. Be sure to include any error messages or relevant information.
