---
title: WooCommerce Quick Start
subtitle: Create Test and Live Environments
woocommerce: true
anchorid: deploy
generator: pagination
layout: guide
type: guide
pagination:
    provider: data.woocommercepages
use:
    - woocommercepages
permalink: docs/guides/woocommerce/deploy/
nexturl: guides/woocommerce/develop/
nextpage: Making a Change on Dev
previousurl: guides/woocommerce/commit/
previouspage: Commit Changes
editpath: woocommerce/06-deploy.md
image: guides/woocommerce/WooCommerce-logo-400-200
---
Now that our dev site is configured and backed up, let's create our test and live and environments so we can launch our store from the live environment.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce/17-Pantheon-dashboard-initialize-test-environment.png" style="max-width:100%;" alt="Initializing the test environment">
</p>

In your site settings in Pantheon go to the Test tab and click _Initialize Test Environment_.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce/18-Pantheon-dashboard-test-environment-deploy-log.png" style="max-width:100%;" alt="Test environment deploy log">
</p>

It should only take a minute or two. And you'll know you're done when you see a message in the deploy log. Now we can move the test site to live mode.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce/19-Pantheon-dashboard-initialize-live-environment.png" style="max-width:100%;" alt="Initializing the live environment">
</p>

We can do the same thing by clicking on the Live tab and click “Initialize Live Environment”.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce/20-Pantheon-dashboard-visit-live-site.png" style="max-width:100%;" alt="Visit live site button on the Pantheon dashboard">
</p>

As soon as it's done you'll see a message in the deploy log. And now is a great time to view the live site and make sure everything is up your standards.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce/21-WooCommerce-front-page.png" style="max-width:100%;" alt="WooCommerce site home page">
</p>

Our site is looking good and loading really fast! Now to show you the power of multiple environments, with version control, we're going to make an order on our live environment and pull that information back down into our test environment.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce/22-WooCommerce-demo-products.png" style="max-width:100%;" alt="WooCommerce demo products on the site front end">
</p>

When you install Storefront it prompts you to add demo products. If you don't have any dummy products you can manually create products.

Add a product to the cart and proceed to checkout.

**Note:** if you didn't configure shipping or payment earlier you'll have to do so now. For easy testing I recommend enabling Free Shipping & Cash On Delivery, which requires the least setup. Also, if you enabled Jetpack earlier it will be in safe mode.

Continue through the checkout process.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce/23-WooCommerce-checkout.png" style="max-width:100%;" alt="WooCommerce checkout">
</p>

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce/24-WooCommerce-order-received-thank-you-message.png
" style="max-width:100%;" alt="WooCommerce order received thank you message">
</p>

We've placed our order. If you want you can login to your admin screen and see all of the details. Now, let's bring these changes back to our test site.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce/25-Pantheon-dashboard-clone-database-files.png" style="max-width:100%;" alt="Cloning database and files on the Pantheon dashboard">
</p>

In our site settings in Pantheon go to either your test or dev environment. Then click the _Database / Files_ tab.

Select Live in the dropdown for _From this environment_

And only select _Clone Database_ (not files).

Finally click _Clone the Database from Live into the Test Environment_.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce/26-WooCommerce-dashboard-test-order.png" style="max-width:100%;" alt="A test order in the WooCommerce dashboard">
</p>

If you login to WordPress you'll see the order in the test environment.
