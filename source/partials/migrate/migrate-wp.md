
The recommended way to migrate WordPress sites from another host is to use the [Pantheon Migration](https://wordpress.org/plugins/bv-pantheon-migration/) plugin, developed by [BlogVault](https://blogvault.net/).

<Accordion title="Watch: Guided WordPress Migrations" id="wp-video" icon="facetime-video">

<Youtube src="ksg1XkH1da8" title="Guided WordPress Migrations" />

</Accordion>

1. Navigate to your User Dashboard and click the **Migrate Existing Site** button.

  ![Migrate Existing Site](../../images/dashboard/migrate-existing-site.png)

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

 ![Successful Migration BlogVault](../../images/dashboard/successful-site-migration-complete-blogvault.png)

<Alert title="Note" type="info">

The [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions) plugin is automatically installed during the migration process. For more details on this plugin, see [WordPress and PHP Sessions](/guides/php/wordpress-sessions).

</Alert>
