---
contenttype: [partial]
categories: [migrate]
cms: [drupal]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

The recommended way to migrate Drupal sites from another host is to use `drush ard` (Drush 8 or 11) to create an archive that can be easily imported.

1. Open your Personal or Professional Workspace dashboard and click the **Migrate Existing Site** button.

   ![Migrate site button](../../../images/dashboard/new-dashboard/2024/migrate-site-button.png)

1. Enter your current website URL, select **Drupal 7** and click **Continue**.

   ![Enter URL and select CMS](../../../images/dashboard/new-dashboard/2024/migrate-site-cms-drupal.png)

1. Enter the name of your new Pantheon site, select a workspace for the site (optional), and click **Create Site**.

   ![Install Plugin](../../../images/migrate-site-drupal-create-site.png)

1. Follow the instructions to **Create an Archive of Your Existing Site With Drush**:

  The Dashboard instructs you to put the archive on your existing website, but you can put the site archive on Dropbox, S3, or any number of other places. The important thing is that you have a site archive that can be downloaded via a publicly accessible URL.

  Click **Continue Migration**

  ![Drupal create archive](../../../images/dashboard/new-dashboard/2024/drupal-guided-migrate.png)

1. Paste the publicly accessible URL to a download of your site archive on the right side of the page. If you are using a Dropbox URL, change the end of the URL from `dl=0` to `dl=1` so we can import your site archive correctly. Click **Import Archive**.

   ![Import archive](../../../images/migrate-site-drupal-import-archive.png)

1.  Click **Visit the Site Dashboard** from the Site Dashboard on Pantheon after the import is complete.

   ![Successful Drupal Migration](../../../images/dashboard/new-dashboard/2024/successful-drupal-migration.png)

