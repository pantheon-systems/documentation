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

1. Open your Personal or Professional Workspace dashboard and select the **Migrate Existing Site** button on the lower right side of the page:

   ![Migrate site button](../../../images/dashboard/new-dashboard/2025/migrate-site-button.png)

1. Select **WordPress**:

   ![Enter URL and select CMS](../../../images/dashboard/new-dashboard/2025/migrate-site-cms.png)

   Then enter your existing production URL for the site you want to migrate (e.g., `example.com`) and click **Continue**:
   
   ![Enter URL](../../../images/dashboard/new-dashboard/2025/migrate-wp-site-url.png)
   
1. Enter the name of your new Pantheon site, select a workspace for the site (optional), and click **Create Site**:
   
   ![Site creation form for WordPress migrations prompting user to input site name and associated workspace](../../../images/dashboard/new-dashboard/2025/migrate-site-wp-create-site.png)
   
   When a workspace is selected, you will be prompted to confirm your selection. Review your selection and when ready click **Confirm** in the popup to continue: 

   ![Confirmation prompt for workspace selection during site creation in the dashboard](../../../images/dashboard/new-dashboard/2025/confirm-workspace-prompt.png)
   
1. Click **Generate Machine Token** and re-authenticate if prompted:

   ![Begin process of installing plugin](../../../images/dashboard/new-dashboard/2025/migrate-create-token.png)

   Copy the token to your clipboard now or in the following step. Click the **Continue to Migration** button.

1. Click **Go to wp-admin**, and a new tab will open for your WordPress admin dashboard. Do not close the Pantheon Site Dashboard tab in your browser.
   
   ![Install on /wp-admin](../../../images/dashboard/new-dashboard/2025/migrate-install-plugin.png)

1. Log into your existing site as an admin, the button from the above step sends you directly to our plugin page. Click **Install Now**, then click **Activate**.
   
   ![Install migration plugin on WordPress](../../../images/dashboard/new-dashboard/2025/pantheon-migrations-plugin-install.png)

1. Copy and paste your machine token and site name from the Pantheon Site Dashboard into the plugin form: 
   
   ![Copying and pasting info](../../../images/dashboard/new-dashboard/2025/migrate-site-wp-activate-info.png)

   You will see a new page where BlogVault validates the information provided (site name and token), then updates once the migration is in progress and updates once again when completed. You'll also receive an email upon migration completion.
   
   ![Migration successful](../../../images/migrate-site-wp-successful.png)

1. Go back to the Pantheon tab and click **Confirm migration progress**.  Your site's dashboard appears.

<Alert title="Note" type="info">

The [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions) plugin is automatically installed during the migration process. For more details on this plugin, see [WordPress and PHP Sessions](/guides/php/wordpress-sessions).

</Alert>
