Pantheon provides a guided path for migrating existing sites to the platform, which begins by clicking the **Migrate Existing Site** button on the User Dashboard.

<TabList>

<Tab title="WordPress" id="tab-1-id" active={true}>

The recommended way to migrate WordPress sites from another host is to use the [Pantheon Migration](https://wordpress.org/plugins/bv-pantheon-migration/) plugin, developed by [BlogVault](https://blogvault.net/).

<Accordion title="Watch: Guided WordPress Migrations" id="wp-video" icon="facetime-video">

<Youtube src="ksg1XkH1da8" title="Guided WordPress Migrations" />

</Accordion>

1. Navigate to your User Dashboard and click the **Migrate Existing Site** button.

  ![Migrate Existing Site](../images/dashboard/migrate-existing-site.png)

1. Enter your current website URL.

1. Select **WordPress**.

1. Click **Continue**.

1. Name your new Pantheon site.

1. Select an organization for the site (optional).

1. Click **Create Site**.

1. Select **Generate Machine Token** and re-authenticate if prompted.

1. Select **Install on /wp-admin** to install and activate the plugin on your existing site. Keep the Pantheon Dashboard tab open in your browser.

1. Copy the machine token from the Pantheon Dashboard, then navigate to **Pantheon Migration** within the WordPress Dashboard on your existing site. Paste the machine token and enter the site name.

1. Click **Migrate**. You will receive an email when the migration completes. After the migration is complete, select **Visit the Site Dashboard** from the Site Dashboard on Pantheon:

 ![Successful Migration BlogVault](../images/dashboard/successful-site-migration-complete-blogvault.png)

If the migration is not successful, [contact Support](/guides/support/contact-support/) and include a link to the Site Dashboard and any details you can provide, such as where you are migrating the site from.

<Alert title="Note" type="info">

The [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions) plugin is automatically installed during the migration process. For more details on this plugin, see [WordPress and PHP Sessions](/wordpress-sessions).

</Alert>

</Tab>

<Tab title="Drupal" id="tab-2-id">

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

</Tab>

</TabList>
