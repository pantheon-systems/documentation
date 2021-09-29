---
title: WooCommerce Quick Start
subtitle: Initialize Production
description: In step five of the WooCommerce Quick Start guide, learn how to initialize your production environment.
woocommerce: true
anchorid: initalize-prod
generator: pagination
layout: guide
cms: "WordPress"
categories: [get-started]
tags: [launch, plugins, site]
type: guide
pagination:
    provider: data.woocommercepages
use:
    - woocommercepages
permalink: docs/guides/woocommerce/initialize-prod/
nexturl: guides/woocommerce/develop/
nextpage: Continue Development
previousurl: guides/woocommerce/commit/
previouspage: Commit Changes
editpath: woocommerce/05-initialize-prod.md
image: guides/woocommerce/WooCommerce-logo-400-200
---
Now that our **<span class="glyphicons glyphicons-equalizer"></span> Dev** site is configured and backed up, let's initialize our production environments (**<span class="glyphicons glyphicons-equalizer"></span> Test** and **<span class="glyphicons glyphicons-cardio"></span> Live**) so we can launch our store.

1. In your site settings in Pantheon go to the **<span class="glyphicons glyphicons-equalizer"></span> Test** tab and click **Initialize Test Environment**:

    ![Initializing the test environment](../../../images/guides/woocommerce/17-Pantheon-dashboard-initialize-test-environment.png)

    It should only take a minute or two. And you'll know you're done when you see a message in the deploy log:

    ![Test environment deploy log](../../../images/guides/woocommerce/18-Pantheon-dashboard-test-environment-deploy-log.png)

    Now we can move the test site to live mode.

2. We can repeat the process for Live by clicking on the **<span class="glyphicons glyphicons-cardio"></span> Live** tab, then **Initialize Live Environment**:

    ![Initializing the live environment](../../../images/guides/woocommerce/19-Pantheon-dashboard-initialize-live-environment.png)

    As soon as it's done you'll see a message in the deploy log.

    ![Visit live site button on the Pantheon dashboard](../../../images/guides/woocommerce/20-Pantheon-dashboard-visit-live-site.png)

3. Now is a great time to view the live site and make sure everything is up your standards.

    ![WooCommerce site home page](../../../images/guides/woocommerce/21-WooCommerce-front-page.png)

## Create a Test Order

Our site is looking good and loading really fast! Now to show you the power of multiple environments with version control, we're going to make an order on our **<span class="glyphicons glyphicons-cardio"></span> Live** environment and pull that information back down into our **<span class="glyphicons glyphicons-equalizer"></span> Test** environment.

1. When you install Storefront it prompts you to add demo products. If you don't have any demo products you can manually create products:

    ![WooCommerce demo products on the site front end](../../../images/guides/woocommerce/22-WooCommerce-demo-products.png)

    Add a product to the cart and proceed to checkout.

    <Alert title="Note" type="info">
      If you didn't configure shipping or payment earlier you'll have to do so now. For easy testing I recommend enabling Free Shipping & Cash On Delivery, which requires the least setup. Also, if you enabled Jetpack earlier it will be in safe mode.
    </Alert>

2. Continue through the checkout process:

    ![WooCommerce checkout](../../../images/guides/woocommerce/23-WooCommerce-checkout.png)

3. We've placed our order. If you want you can login to your admin screen and see all of the details:

    ![WooCommerce order received thank you message](../../../images/guides/woocommerce/24-WooCommerce-order-received-thank-you-message.png)

## Clone Content Down

Now let's bring these changes back to our test site:

1. In our site settings in Pantheon go to either your **<span class="glyphicons glyphicons-equalizer"></span> Test** or **<span class="glyphicons glyphicons-wrench"></span> Dev** environment. Then click the **<span class="glyphicons glyphicons-server"></span> Database / Files** tab.

2. Select **Live** in the dropdown for **From this environment**.

3. Only select **Clone Database**, do not clone files.

4. Finally click **Clone the Database from Live into the Test Environment**:

  ![Cloning database and files on the Pantheon dashboard](../../../images/guides/woocommerce/25-Pantheon-dashboard-clone-database-files.png)

  If you login to WordPress you'll see the order in the **<span class="glyphicons glyphicons-equalizer"></span> Test** environment:

  ![A test order in the WooCommerce dashboard](../../../images/guides/woocommerce/26-WooCommerce-dashboard-test-order.png)
