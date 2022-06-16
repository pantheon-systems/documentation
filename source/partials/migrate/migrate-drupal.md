The recommended way to migrate Drupal sites from another host is to use `drush ard` (Drush 8 or earlier) to create an archive that can be easily imported.

1. Navigate to your User Dashboard and click the **Migrate Existing Site** button.

  ![Migrate Existing Site](../images/dashboard/migrate-existing-site.png)

1. Enter your current website URL.

1. Select **Drupal 7** or **Drupal Composer**.

1. Click **Continue**.

1. Name your new Pantheon site.

1. Select an organization for the site (optional).

1. Click **Create Site**.

1. Follow the instructions to **Create an Archive of Your Existing Site With Drush**:

  ![Drupal create archive](../images/dashboard/drupal-guided-migrate.png)

  The Dashboard instructs you to put the archive on your existing website, but you can put the site archive on Dropbox, S3, or any number of other places. The important thing is that you have a site archive that can be downloaded via a publicly accessible URL.

1. Paste a publicly accessible URL to a download of your site archive. Change the end of Dropbox URLs from `dl=0` to `dl=1` so we can import your site archive properly.

1. Click **Import Archive**. After the imported is complete, select **Visit the Site Dashboard** from the Site Dashboard on Pantheon:

 ![Successful Drupal Migration](../images/dashboard/successful-drupal-migration.png)
