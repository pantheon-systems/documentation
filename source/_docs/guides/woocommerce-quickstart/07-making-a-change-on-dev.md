---
title: WooCommerce Quick Start
subtitle: Making a Change on Dev
woocommercequickstart: true
anchorid: making-a-change-on-dev
generator: pagination
layout: guide
type: guide
pagination:
    provider: data.woocommercequickstartpages
use:
    - woocommercequickstartpages
permalink: docs/guides/woocommerce-quickstart/making-a-change-on-dev/
nexturl: guides/woocommerce-quickstart/launching-your-store/
nextpage: Launching Your Store
previousurl: guides/woocommerce-quickstart/create-test-and-live-environments/
previouspage: Create Test and Live Environments
editpath: woocommerce-quickstart/07-making-a-change-on-dev.md
image: guides/woocommerce-quickstart/WooCommerce-logo-400-200
---
It's a good security practice to remove any plugins or themes you aren't using. So let's get rid of the themes we aren't using. We'll make the change in our dev environment, then move it to our test environment to QA, and then move it to our live site.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/27-WordPress-dashboard-theme-list.png" style="max-width:100%;" alt="WordPress dashboard theme screen">
</p>

In the WordPress admin of our development environment under _Appearance_ you'll see all of the installed themes. Hover over each one and click Theme Details.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/28-WordPress-dashboard-delete-theme.png" style="max-width:100%;" alt="Deleting a theme in the WordPress dashboard">
</p>

A preview of the theme will come up. If the theme is not active, click "Delete" in the bottom right to remove it. Repeat this for each theme, deleting the ones that are not active.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/29-Pantheon-dashboard-deleted-theme-file-changes.png" style="max-width:100%;" alt="Deleted files list in the Pantheon dashboard">
</p>

Now we need to commit the changes, just like we did earlier. This ensures they are tracked in version control. Changes that aren't committed cannot be deployed to the test environment.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/30-Pantheon-dashboard-deleted-theme-deployment.jpg" style="max-width:100%;" alt="Pantheon dashboard deployment log with deleted themes">
</p>

Now that the changes are committed we can move them over to our test environment with the the deploy menu.

When you're moving files (ex. Uploaded media files, such as images) or the database use the clone functionality in the Pantheon dashboard. When you're moving code you want to use the deploy functionality. As a reminder, code should be deployed from the dev environment to test and then live environments. The database and files (content) should be cloned from the live environment back down to the test and dev environments periodically to keep them up to date with the latest content.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/31-WordPress-dashboard-single-theme.png" style="max-width:100%;" alt="The WordPress dashboard showing only a single theme installed">
</p>

With a quick test we can see all of the other themes were deleted, leaving only the active  Storefront theme.

Now that you know how to move content changes around you can keep your store live and accepting new orders while you add functionality to your site in the dev environment and then test the new changes in the test environment. Once the changes are ready for production they can be deployed to the live environment.
