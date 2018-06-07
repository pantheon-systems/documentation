---
title: WooCommerce Quick Start
subtitle: Site Configuration
woocommercequickstart: true
anchorid: site-configuration
generator: pagination
layout: guide
type: guide
pagination:
    provider: data.woocommercequickstartpages
use:
    - woocommercequickstartpages
permalink: docs/guides/woocommerce-quickstart/site-configuration/
nexturl: guides/woocommerce-quickstart/commit-changes/
nextpage: Commit Changes
previousurl: guides/woocommerce-quickstart/woo-commerce-set-up/
previouspage: WooCommerce Set Up
editpath: woocommerce-quickstart/04-site-configuration.md
image: guides/woocommerce-quickstart/WooCommerce-logo-400-200
---
We've configured a few things for our WooCommerce site. But there are a few additional things to configure.

The first is [adding PHP sessions to WordPress](/docs/wordpress-sessions/). WordPress doesn't include any state tracking which makes it challenging for any plugin to remember which user did what - and for ecommerce that means who added what to their cart.

To solve this, **you must** install [WP Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions/). It's a free plugin you can download from WordPress.org or install through your WordPress dashboard.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/10-install-WordPress-native-PHP-sessions-plugin.png" style="max-width:100%;" alt="Install WordPress native PHP sessions plugin">
</p>

I'll install mine through the plugin installer.

For any site, speed is important, and for eCommerce it's even more important. That's why Pantheon recommends the [Pantheon Advanced Page Cache plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/). This plugin allows selective cache purging and longer cache lifetimes.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/11-install-Pantheon-advanced-page-cache-plugin.png" style="max-width:100%;" alt="Install Pantheon Advanced Page Cache plugin">
</p>

You can [read more about exactly how this works](/blog/optimizing-woocommerce-pantheon-advanced-page-cache-wordpress). For our purposes, it speeds up your site and it's worth installing.

You've probably noticed that your Pantheon site already loads in HTTPS. But while it loads HTTPS, it doesn't force HTTPS. For your users' privacy, for payment, and for SEO reasons it's a best practice to force the site to load in HTTPS.

We have a [whole document explaining how to load your entire site in HTTPS](/docs/http-to-https/#wp). This may take a while to set up, so what you can do to get going immediately is configure WooCommerce to force the checkout to load in HTTPS.

<p style="text-align:center;">
    <img align="center" src="/source/docs/assets/images/guides/woocommerce-quickstart/12-force-secure-checkout.png" style="max-width:100%;" alt="Force HTTPS in checkout">
</p>

Make sure “Force secure checkout” is enabled in WooCommerce -> Settings -> Checkout -> Checkout Settings. This has the added benefit of getting rid of one of the admin notices in the backend of your site.
