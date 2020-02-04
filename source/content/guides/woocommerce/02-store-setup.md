---
title: WooCommerce Quick Start
subtitle: Store Setup
description: In step two of the WooCommerce Quick Start guide, learn how to set up your new store.
woocommerce: true
anchorid: store-setup
generator: pagination
layout: guide
type: guide
pagination:
    provider: data.woocommercepages
use:
    - woocommercepages
permalink: docs/guides/woocommerce/store-setup/
nexturl: guides/woocommerce/configure/
nextpage: Configure
previousurl: guides/woocommerce/
previouspage: Introduction
editpath: woocommerce/02-store-setup.md
image: guides/woocommerce/WooCommerce-logo-400-200
---
I've already gone ahead and [created a new site on Pantheon](/guides/quickstart/create-new-site).

![New Pantheon Site Dashboard](../../../images/guides/woocommerce/01-new-pantheon-site.png)

The first thing we should do is install WordPress and configure it.

1. Click **Install WordPress**. Then, choose your language:

    ![WordPress choose language](../../../images/guides/woocommerce/02-WordPress-choose-language.png)

2. Configure the site title and create your admin account:

    ![WordPress create admin account](../../../images/guides/woocommerce/03-WordPress-create-admin-account.png)

3. Now that WordPress is set up, let's configure WooCommerce. For this guide we'll also install Stripe, for easy payments, and WooCommerce services to easily set up shipping with USPS, if you're in the US.

    ![WordPress dashboard](../../../images/guides/woocommerce/04-WordPress-dashboard-fresh-installation.png)

4. Go to **Plugins** > **Add New** > and type in WooCommerce. Click **Install Now**. Click **Activate** once the plugin has installed.

    ![WooCommerce plugin installation](../../../images/guides/woocommerce/05-install-WooCommerce-plugin.png)

5. WooCommerce has a well-designed welcome wizard. Take your time going through the welcome wizard. It will help you configure everything you need for your store.

   ![WooCommerce installation wizard](../../../images/guides/woocommerce/06-WooCommerce-installation-wizard.png)

   If you select any options that require additional plugins, the welcome wizard will automatically install them for you. In our case Jetpack, WooCommerce Services, the WooCommerce Stripe Payment Gateway, and the Storefront theme will be installed for us automatically.

   ![Jetpack plugin installation](../../../images/guides/woocommerce/07-install-Jetpack.png)

   If you installed WooCommerce Services to get live shipping rates from USPS or Automated Taxes you'll be prompted to install Jetpack & connect your site to WordPress.com. WooCommerce Services needs this connection in order to work.

   <Alert title="Note" type="info">

   Jetpack is a sophisticated plugin that detects test sites. It will turn on [safe mode](https://jetpack.com/support/safe-mode/) and prevent the connection to WordPress.com. For this reason it's best to only activate Jetpack in the **<span class="glyphicons glyphicons-cardio"></span> Live** environment of your site and let it run in dev mode for your **<span class="glyphicons glyphicons-wrench"></span> Dev** and **<span class="glyphicons glyphicons-equalizer"></span> Test** environments.

   </Alert>

   If you need to test Jetpack functionality, you can enable the Jetpack connection in safe mode by clicking **Fix Jetpack's Connection** and then **Start Fresh & Create New Connection**.

   To understand more about Jetpack, read their documentation on [safe mode](https://jetpack.com/support/safe-mode/).

6. When you connect your site, you'll see a connection to WordPress.com. This should only take a minute and then it should automatically return you to your WordPress dashboard.

    ![Connecting Jetpack to WordPress.com](../../../images/guides/woocommerce/08-connect-Jetpack.png)

  When you get to this page you're done. We've installed all of the required plugins:

    ![WooCommerce installation wizard complete](../../../images/guides/woocommerce/09-WooCommerce-installation-wizard-complete.png)

We won't cover configuring every setting, but I encourage you to read the getting started guide and documentation for each plugin. Now is also a good point to configure your payment gateway so you can [accept test payments](https://robotninja.com/blog/test-woocommerce-payments-via-credit-card/), as well as configure your shipping costs, and tax settings.
