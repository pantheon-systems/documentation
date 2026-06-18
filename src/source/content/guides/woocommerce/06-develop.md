---
title: WooCommerce Quick Start
subtitle: Continue Development
description: In step six of the WooCommerce Quick Start guide, we further customize our new site by removing unused themes.
contenttype: [guide]
innav: [false]
categories: [ecommerce]
cms: [wordpress]
audience: [development]
product: [--]
integration: [woocommerce]
tags: [iterate, plugins, site, themes, webops]
type: guide
permalink: docs/guides/woocommerce/develop/
editpath: woocommerce/06-develop.md
---
It's a good security practice to remove any plugins or themes you aren't using. So let's get rid of the themes we aren't using. We'll make the change in our **<Icon icon="wrench" /> Dev** environment, then move it to our **<Icon icon="equalizer" /> Test** environment to QA, and then move it to **<Icon icon="wavePulse" /> Live**.

1. In the WordPress admin of our **<Icon icon="wrench" /> Dev** environment under **Appearance** you'll see all of the installed themes.

    ![WordPress dashboard theme screen](../../../images/guides/woocommerce/27-WordPress-dashboard-theme-list.png)

    Hover over each one and click **Theme Details**.

2. A preview of the theme will come up. If the theme is not active, click **Delete** in the bottom right to remove it.

    ![Deleting a theme in the WordPress dashboard](../../../images/guides/woocommerce/28-WordPress-dashboard-delete-theme.png)

    Repeat this for each theme, deleting the ones that are not active.

3. Now we need to commit the changes, just like we did earlier. This ensures they are tracked in version control. Changes that aren't committed cannot be deployed to the **<Icon icon="equalizer" /> Test** environment.

    ![Deleted files list in the Pantheon dashboard](../../../images/guides/woocommerce/29-Pantheon-dashboard-deleted-theme-file-changes.png)

4. Now that the changes are committed we can move them over to our **<Icon icon="equalizer" /> Test** environment with the the **<Icon icon="rotate" /> Deploy** menu.

    ![Pantheon dashboard deployment log with deleted themes](../../../images/guides/woocommerce/30-Pantheon-dashboard-deleted-theme-deployment.jpg)



  When you're moving files (ex. Uploaded media files, such as images) or the database, use the clone functionality in the Pantheon dashboard. When you're moving code, use the deploy functionality. As a reminder, code should be deployed from the **<Icon icon="wrench" /> Dev** environment to **<Icon icon="equalizer" /> Test** and then **<Icon icon="wavePulse" /> Live** environments. The database and files (content) should be cloned from the live environment back down to the **<Icon icon="equalizer" /> Test** and **<Icon icon="wrench" /> Dev** environments periodically to keep them up to date with the latest content.

  With a quick test we can see all of the other themes were deleted, leaving only the active  Storefront theme.

  ![The WordPress dashboard showing only a single theme installed](../../../images/guides/woocommerce/31-WordPress-dashboard-single-theme.png)

Now that you know how to move content changes around you can keep your store live and accepting new orders while you add functionality to your site in the **<Icon icon="wrench" /> Dev** environment and then test the new changes in the **<Icon icon="equalizer" /> Test** environment. Once the changes are ready for production they can be deployed to the **<Icon icon="wavePulse" /> Live** environment.
