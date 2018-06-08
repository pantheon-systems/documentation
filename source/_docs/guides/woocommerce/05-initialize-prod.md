---
title: WooCommerce Quick Start
subtitle: Initialize Production
woocommerce: true
anchorid: initalize-prod
generator: pagination
layout: guide
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

![Initializing the test environment](/source/docs/assets/images/guides/woocommerce/17-Pantheon-dashboard-initialize-test-environment.png)

In your site settings in Pantheon go to the **<span class="glyphicons glyphicons-equalizer"></span> Test** tab and click **Initialize Test Environment**.

![Test environment deploy log](/source/docs/assets/images/guides/woocommerce/18-Pantheon-dashboard-test-environment-deploy-log.png)

It should only take a minute or two. And you'll know you're done when you see a message in the deploy log. Now we can move the test site to live mode.

![Initializing the live environment](/source/docs/assets/images/guides/woocommerce/19-Pantheon-dashboard-initialize-live-environment.png)

We can do the same thing by clicking on the **<span class="glyphicons glyphicons-cardio"></span> Live** tab and click **Initialize Live Environment**.

![Visit live site button on the Pantheon dashboard](/source/docs/assets/images/guides/woocommerce/20-Pantheon-dashboard-visit-live-site.png)

As soon as it's done you'll see a message in the deploy log. And now is a great time to view the live site and make sure everything is up your standards.

![WooCommerce site home page](/source/docs/assets/images/guides/woocommerce/21-WooCommerce-front-page.png)

Our site is looking good and loading really fast! Now to show you the power of multiple environments, with version control, we're going to make an order on our **<span class="glyphicons glyphicons-cardio"></span> Live** environment and pull that information back down into our **<span class="glyphicons glyphicons-equalizer"></span> Test** environment.

![WooCommerce demo products on the site front end](/source/docs/assets/images/guides/woocommerce/22-WooCommerce-demo-products.png)

When you install Storefront it prompts you to add demo products. If you don't have any dummy products you can manually create products.

Add a product to the cart and proceed to checkout.

<div class="alert alert-info">
  <h4 class="info">Note</h4>
  <p markdown="1">If you didn't configure shipping or payment earlier you'll have to do so now. For easy testing I recommend enabling Free Shipping & Cash On Delivery, which requires the least setup. Also, if you enabled Jetpack earlier it will be in safe mode.</p>
</div>

Continue through the checkout process.

![WooCommerce checkout](/source/docs/assets/images/guides/woocommerce/23-WooCommerce-checkout.png)

![WooCommerce order received thank you message](/source/docs/assets/images/guides/woocommerce/24-WooCommerce-order-received-thank-you-message.png)

We've placed our order. If you want you can login to your admin screen and see all of the details. Now, let's bring these changes back to our test site.

![Cloning database and files on the Pantheon dashboard](/source/docs/assets/images/guides/woocommerce/25-Pantheon-dashboard-clone-database-files.png)

In our site settings in Pantheon go to either your **<span class="glyphicons glyphicons-equalizer"></span> Test** or **<span class="glyphicons glyphicons-wrench"></span> Dev** environment. Then click the **<span class="glyphicons glyphicons-server"></span> Database / Files** tab.

Select **Live** in the dropdown for **From this environment**.

And only select **Clone Database**, do not clone files.

Finally click **Clone the Database from Live into the Test Environment**.

![A test order in the WooCommerce dashboard](/source/docs/assets/images/guides/woocommerce/26-WooCommerce-dashboard-test-order.png)

If you login to WordPress you'll see the order in the **<span class="glyphicons glyphicons-equalizer"></span> Test** environment.
