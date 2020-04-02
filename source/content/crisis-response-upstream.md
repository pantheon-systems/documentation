---
title: Crisis Response Upstream
description: About the Pantheon COVID-19 Response WordPress Upstream
categories: [develop]
tags: [WordPress, COVID-19, crisis, upstreams]
reviewed: "2020-04-02"
---

## Overview

The **Pantheon Crisis Response WordPress Upstream** is a specialized WordPress [custom upstream](/custom-upstream), created in response to COVID-19, to enable organizations on the front line to quickly create a production-ready website to provide timely information during a crisis.

If you are a government, medical, or educational institution with a crisis communications website, or a non-profit organization directly providing relief, we will [provide the full service of our WebOps platform](https://pantheon.io/resources-navigate-covid-19) at no charge until at least July 1, 2020—or more, as the situation warrants. We want you to deliver vital information to the public without worrying about traffic cost or site availability.

## Features

This distribution features a minimal set of plugins for easy maintenance. 

The following plugins were selected to optimize performance and create an intuitive interface for page building and site management. You can tailor them to your organization’s specific needs and capabilities.

### Site Optimization Plugins

These plugins were selected to improve the performance of the site, and better utilize tools built into Pantheon.

<dl>

<dt>[Autoptimize](https://wordpress.org/plugins/autoptimize/)</dt>

<dd>

Makes your site faster by optimizing CSS, JS, Images, Google fonts and more.
Native PHP Sessions for WordPress: Offload PHP’s native sessions to your database for multi-server compatibility.

</dd>

<dt>[Pantheon HUD](https://wordpress.org/plugins/pantheon-hud/)</dt>

<dd>

A heads-up display into your Pantheon environment, giving you information about the current environment.

</dd>

<dt>[Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/)</dt>

<dd>

Automatically clear related pages from Pantheon’s Edge when you update content. High TTL. Fresh content. Visitors never wait.

</dd>

<dt>[WP Redis](https://wordpress.org/plugins/wp-redis/)</dt>

<dd>

WordPress Object Cache using Redis. Requires the **PhpRedis** extension (https://github.com/phpredis/phpredis).

</dd>

</dl>

### Content Features Plugins

These plugins were selected to improve the content creation and moderation process, in addition to improving SEO for visibility.

<dl>

<dt>[Disable Comments](https://wordpress.org/plugins/disable-comments/)</dt>

<dd>

Allows administrators to globally disable comments on their site. Comments can be disabled according to post type.

</dd>

<dt>[Yoast SEO](https://wordpress.org/plugins/wordpress-seo/)</dt>

<dd>

The first true all-in-one SEO solution for WordPress, including on-page content analysis, XML sitemaps and much more.

</dd>

<dt>[Elementor](https://wordpress.org/plugins/elementor/)</dt>

<dd>

The most advanced frontend drag & drop page builder. Create high-end, pixel perfect websites at record speeds. Any theme, any page, any design.

</dd>

<dt>[WP RSS Aggregator](https://wordpress.org/plugins/wp-rss-aggregator/)</dt>

<dd>

Imports and aggregates multiple RSS Feeds.

</dd>

<dt>[Ocean Extra](https://wordpress.org/plugins/ocean-extra/)</dt>

<dd>

Add extra features like widgets, metaboxes, import/export and a panel to activate the premium extensions.This was part of the theme to enhance the theme and create widgets for page building.

</dd>

</dl>

## How to Install

First, [contact Sales](https://pantheon.io/contact-us) to sign up for access to this distribution. We will work with you to get an appropriate site plan and organization set up free of charge.

Once you are set up on the platform:

1. Create a site from the **Crisis Response WP** upstream, available on the **Upstreams** tab of your Pantheon Dashboard.
1. The installation script will pre-populate generic content into the site.
1. On the Dev environment tab, Change **Development Mode** to `SFTP` so the `settings` file can be written on first login.
1. Check your email for the username and password to use to login to your site.
1. Click the **Site Admin** button and login with your username and password. 
1. Update the password to something you will remember.
1. On your site's Pantheon dashboard, once changes are pushed to Dev, the Deploys panel in the Test tab will prompt you to commit the changes to Test.
1. After testing your changes in the Test environment you can move them to the Live environment. Deploying code from Test to Live will immediately update your public website. For more information, see the [Pantheon Workflow](/pantheon-workflow) documentation.
1. On the Live environment, login to the site and update your content.
1. Associate a [domain name](/guides/launch/domains) with your production site.

## Support
 
 As part of our [free COVID-19 offer](https://pantheon.io/blog/supporting-orgs-on-covid-19-front-line), you will have access to Pantheon's [Platinum support](/support#support-features-and-response-times) package, enabling support via chat or ticket. Our Support team will work with you to answer any support-related question relating to this custom upstream.

## See Also

- [Introduction to Custom Upstreams](/custom-upstream) - Learn about the benefits of Pantheon Custom Upstreams.
- [Professional Services](/professional-services) - Learn all the great services our expert team can provide.
