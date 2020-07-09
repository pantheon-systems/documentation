---
title: WooCommerce Quick Start
subtitle: Continue Development
description: In step six of the WooCommerce Quick Start guide, we further customize our new site by removing unused themes.
woocommerce: true
anchorid: develop
generator: pagination
layout: guide
cms: "WordPress"
category: [get-started]
tags: [iterate, plugins, site, themes, webops]
type: guide
pagination:
    provider: data.woocommercepages
use:
    - woocommercepages
permalink: docs/guides/woocommerce/develop
nexturl: guides/woocommerce/launch/
nextpage: Launch Your Store
previousurl: guides/woocommerce/initialize-prod/
previouspage: Initialize Production
editpath: woocommerce/06-develop.md
image: guides/woocommerce/WooCommerce-logo-400-200
---
It's a good security practice to remove any plugins or themes you aren't using. So let's get rid of the themes we aren't using. We'll make the change in our **<span class="glyphicons glyphicons-wrench"></span> Dev** environment, then move it to our **<span class="glyphicons glyphicons-equalizer"></span> Test** environment to QA, and then move it to **<span class="glyphicons glyphicons-cardio"></span> Live**.

1. In the WordPress admin of our **<span class="glyphicons glyphicons-wrench"></span> Dev** environment under **Appearance** you'll see all of the installed themes.

    ![WordPress dashboard theme screen](../../../images/guides/woocommerce/27-WordPress-dashboard-theme-list.png)

    Hover over each one and click **Theme Details**.

2. A preview of the theme will come up. If the theme is not active, click **Delete** in the bottom right to remove it.

    ![Deleting a theme in the WordPress dashboard](../../../images/guides/woocommerce/28-WordPress-dashboard-delete-theme.png)

    Repeat this for each theme, deleting the ones that are not active.

3. Now we need to commit the changes, just like we did earlier. This ensures they are tracked in version control. Changes that aren't committed cannot be deployed to the **<span class="glyphicons glyphicons-equalizer"></span> Test** environment.

    ![Deleted files list in the Pantheon dashboard](../../../images/guides/woocommerce/29-Pantheon-dashboard-deleted-theme-file-changes.png)

4. Now that the changes are committed we can move them over to our **<span class="glyphicons glyphicons-equalizer"></span> Test** environment with the the **<span class="glyphicons glyphicons-refresh"></span> Deploy** menu.

    ![Pantheon dashboard deployment log with deleted themes](../../../images/guides/woocommerce/30-Pantheon-dashboard-deleted-theme-deployment.jpg)



  When you're moving files (ex. Uploaded media files, such as images) or the database, use the clone functionality in the Pantheon dashboard. When you're moving code, use the deploy functionality. As a reminder, code should be deployed from the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment to **<span class="glyphicons glyphicons-equalizer"></span> Test** and then **<span class="glyphicons glyphicons-cardio"></span> Live** environments. The database and files (content) should be cloned from the live environment back down to the **<span class="glyphicons glyphicons-equalizer"></span> Test** and **<span class="glyphicons glyphicons-wrench"></span> Dev** environments periodically to keep them up to date with the latest content.

  With a quick test we can see all of the other themes were deleted, leaving only the active  Storefront theme.

  ![The WordPress dashboard showing only a single theme installed](../../../images/guides/woocommerce/31-WordPress-dashboard-single-theme.png)

Now that you know how to move content changes around you can keep your store live and accepting new orders while you add functionality to your site in the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment and then test the new changes in the **<span class="glyphicons glyphicons-equalizer"></span> Test** environment. Once the changes are ready for production they can be deployed to the **<span class="glyphicons glyphicons-cardio"></span> Live** environment.
