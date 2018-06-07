---
title: WooCommerce Quick Start
subtitle: WooCommerce Set Up
woocommercequickstart: true
anchorid: woo-commerce-set-up
generator: pagination
layout: guide
type: guide
pagination:
    provider: data.woocommercequickstartpages
use:
    - woocommercequickstartpages
permalink: docs/guides/woocommerce-quickstart/woo-commerce-set-up/
nexturl: guides/woocommerce-quickstart/site-configuration/
nextpage: Site Configuration
previousurl: guides/woocommerce-quickstart/understanding-pantheon-workflow/
previouspage: "Understanding Pantheon's Workflow"
editpath: woocommerce-quickstart/03-woo-commerce-set-up.md
image: guides/woocommerce-quickstart/WooCommerce-logo-400-200.png
---
I've already gone ahead and [created a new site on Pantheon](/docs/guides/quickstart/create-new-site/).

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/01-new-pantheon-site.png" style="max-width:100%;" alt="New Pantheon Site Dashboard">
</p>

The first thing we should do is install WordPress. The software package is installed and this installation process will configure it.

Click "Install WordPress". Then, choose your language.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/02-WordPress-choose-language.png" style="max-width:100%;" alt="WordPress choose language">
</p>

Choose your language.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/03-WordPress-create-admin-account.png" style="max-width:100%;" alt="WordPress create admin account">
</p>

Configure the site title and create your admin account.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/04-WordPress-dashboard-fresh-installation.png" style="max-width:100%;" alt="WordPress dashboard">
</p>

Now that WordPress is set up, let's configure WooCommerce. For this guide we'll also install Stripe, for easy payments, and WooCommerce services to easily set up shipping with USPS, if you're in the US.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/05-install-WooCommerce-plugin.png" style="max-width:100%;" alt="WooCommerce plugin installation">
</p>

Go to _Plugins -> Add New ->_ and type in WooCommerce. Click Install Now. Click Activate once the plugin has installed.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/06-WooCommerce-installation-wizard.png" style="max-width:100%;" alt="WooCommerce installation wizard">
</p>

WooCommerce has a well-designed welcome wizard. Take your time going through the welcome wizard. It will help you configure everything you need for your store.

If you select any options that require additional plugins, the welcome wizard will automatically install them for you. In our case Jetpack, WooCommerce Services, the WooCommerce Stripe Payment Gateway, and the Storefront theme will be installed for us automatically.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/07-install-Jetpack.png" style="max-width:100%;" alt="Jetpack plugin installation">
</p>

If you installed WooCommerce Services to get live shipping rates from USPS or Automated Taxes you'll be prompted to install Jetpack & connect your site to WordPress.com. WooCommerce Services needs this connection in order to work.

**Note:** Jetpack is a sophisticated plugin that detects test sites. It will turn on [safe mode](https://jetpack.com/support/safe-mode/) and prevent the connection to WordPress.com. For this reason it's best to only activate Jetpack in the live environment of your site and let it run in dev mode for your dev and test environments.

If you need to test Jetpack functionality, you can enable the Jetpack connection in safe mode by clicking _Fix Jetpack's Connection_ and then _Start Fresh & Create New Connection_.

To understand more about Jetpack, read their documentation on [safe mode](https://jetpack.com/support/safe-mode/).

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/08-connect-Jetpack.png" style="max-width:100%;" alt="Connecting Jetpack to WordPress.com">
</p>

When you connect your site, you'll see a connection to WordPress.com. This should only take a minute and then it should automatically return you to your WordPress dashboard.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/09-WooCommerce-installation-wizard-complete.png" style="max-width:100%;" alt="WooCommerce installation wizard complete">
</p>

When you get to this page you're done. We've installed all of the required plugins.

We won't cover configuring every setting, but I encourage you to read the getting started guide and documentation for each plugin. Now is also a good point to configure your payment gateway so you can [accept test payments](https://robotninja.com/blog/test-woocommerce-payments-via-credit-card/), as well as configure your shipping costs, and tax settings.
