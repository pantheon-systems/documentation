---
title: Launch Essentials
subtitle: Pre-launch Configuration
description: Complete important configuration before launching your site.
tags: [backup, launch, webops]
showtoc: true
permalink: docs/guides/launch/launch-check/
contenttype: [guide]
innav: [false]
categories: [config, cache, test, launch]
cms: [wordpress, drupal]
audience: [agency, development]
product: [--]
integration: [--]
image: launchGuide-twitterLarge.png
---

This section provides information on how to enable backups, test your email plugin or module, review status reports, and test your cache.

## Enable and Schedule Weekly Backups

1. Click <Icon icon="cloud-upload" /> **Backups** on the <Icon icon="wrench" /> **Dev** tab of your Site Dashboard then click **Backup Schedule**.

1. Switch the toggle to **Enable** if needed, then pick the day on which you want to create weekly backups, and then click **Update Weekly Backup Schedule**.

1. Repeat these steps for the **<Icon icon="equalizer" /> Test** and **<Icon icon="wavePulse" /> Live** environments.

Refer to [Backups Tool](/guides/backups) for more information on this feature.

## Enable and Test Email Plugin/Module (Optional)

We *strongly* recommend using a third-party email service provider if your site will be sending outgoing email. Refer to [Email on Pantheon](/email) for more information.

<Alert type="info" title="Note">

Some email solution providers (like Sendgrid) may implement a waiting period before upgrading to a paid plan, to fight malicious email. If you're switching email providers as part of your launch, make sure to research and plan for this if applicable.

</Alert>

## Review Status Reports

Launch with confidence by taking advantage of Pantheon's static site analysis service for Drupal and WordPress.

1. Access the **<Icon icon="wavePulse" /> Live** environment in your Pantheon Site Dashboard.

1. Navigate to the **<Icon icon="circleInfo" /> Status** page.

The automated report will:

- Check for exploited patterns in code

- Show database stats

- Reveal PHP errors

Refer to [Drupal Launch Check](/drupal-launch-check) and [WordPress Launch Check](/guides/wordpress-pantheon/wordpress-launch-check) for more information on what is included in these checks and how they work.

## Maximize Performance by Configuring Cache (Optional)

### Enable Object Cache

Pantheon's [Object Cache)](/object-cache) provides an alternative, drop-in caching backend for your website. This removes caching work from the database, which is vital for scaling to a larger number of logged-in users. It also provides a number of other features for developers, including managing queues and custom caching.

All paid plans except for a Basic plan can use Object Cache.

### Configure Caching

[Configure your performance settings](/guides/global-cdn/global-cdn-caching) to maximize performance.

Serving anonymous traffic from virtual memory allows a cached response to be returned to the browser without needing to access the application container, which in turns frees up resources to build more dynamic requests.

### Test Cache

Follow the steps below to [test Pantheon's Global CDN](/guides/global-cdn/test-global-cdn-caching). This will show you whether or not a page is being served from Global CDN by examining the HTTP headers from a response using cURL.

<Partial file="global-cdn-test-cache.md" />

## More Resources

- [Backups Tool](/guides/backups)

- [Email on Pantheon](/email)

- [Global CDN Guide](/guides/global-cdn)
