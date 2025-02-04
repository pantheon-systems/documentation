---
contenttype: [partial]
categories: [migrate]
cms: [wordpress]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---


The recommended way to migrate WordPress sites from another host is to use the [Pantheon Migration](https://wordpress.org/plugins/bv-pantheon-migration/) plugin, developed by [BlogVault](https://blogvault.net/).

<Accordion title="Watch: Guided WordPress Migrations" id="wp-video" icon="facetime-video">

<Youtube src="ksg1XkH1da8" title="Guided WordPress Migrations" />

</Accordion>

1. Open your Personal or Professional Workspace dashboard and select the **Migrate Existing Site** button on the lower right side of the page.

   ![Migrate site button](../../../images/dashboard/new-dashboard/2024/migrate-site-button.png)

1. Enter your current website URL, select **WordPress**, and click **Continue**.

   ![Enter URL and select CMS](../../../images/migrate-site-cms.png)

1. Enter the name of your new Pantheon site, select a workspace for the site (optional), and click **Create Site**.

   ![Install Plugin](../../../images/migrate-site-info.png)

1. Select **Generate Machine Token** and re-authenticate if prompted.

   ![Begin process of installing plugin](../../../images/migrate-site-wp-plugin.png)

1. Select **Install on /wp-admin**.  A new tab will open with your WordPress CMS for your existing site. Keep the Pantheon tab open in your browser.
   ![Install on /wp-admin](../../../images/migrate-site-wp-install.png)

1. Search for and install the plugin.

   ![Searching for plugin on WordPress](../../../images/migrate-site-wp-search-plugin.png)

1. Click **Activate**.

   ![Copying and pasting info](../../../images/migrate-site-wp-activate.png)

1. Go back to the browser tab containing your Pantheon dashboard, copy the machine token from the Pantheon Dashboard, then go back to the WordPress Dashboard on your existing site. Paste the machine token and the site name, and click **Migrate**.

   ![Copying and pasting info](../../../images/migrate-site-wp-activate-info.png)

   When the migration is complete, the **Migration completed successfully** page appears.

   ![Migration successful](../../../images/migrate-site-wp-successful.png)

   You will also receive an email when the migration completes. 

1. Go back to the Pantheon tab and click **Confirm migration progress**.  Your site's dashboard appears.

<Alert title="Note" type="info">

The [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions) plugin is automatically installed during the migration process. For more details on this plugin, see [WordPress and PHP Sessions](/guides/php/wordpress-sessions).

</Alert>
