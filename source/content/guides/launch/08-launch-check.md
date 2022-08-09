---
title: Launch Essentials
subtitle: Pre-launch Configuration
description: Complete important configuration before launching your site.
anchorid: launch-check
layout: guide
showtoc: true
categories: [go-live]
tags: [backup, launch, webops]
type: guide
permalink: docs/guides/launch/launch-check/
editpath: launch/07-launch-check.md
image: getting-started-Largethumb
---

This section provides information on how to:

- [Enable and schedule weekly backups](#enable-and-schedule-weekly-backups)

- [Enable and test your Email plugin or module](#enable-and-test-email-pluginmodule-optional)

- [Review status reports](#review-status-reports)

- [Test your cache](#test-cache)

## Enable and Schedule Weekly Backups

1. Click **<span class="glyphicons glyphicons-cloud-upload"></span> Backups** on the <span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> **Dev** tab of your Site Dashboard then click **Backup Schedule**.

1. Switch the toggle to **Enable** if needed, then pick the day on which you want to create weekly backups, and then click **Update Weekly Backup Schedule**.

1. Repeat these steps for the **<span class="glyphicons glyphicons-equalizer"></span> Test** and **<span class="glyphicons glyphicons-cardio"></span> Live** environments.

Refer to [Backups Tool](/backups) for more information on this feature.

## Enable and Test Email Plugin/Module (Optional)

We *strongly* recommend using a third-party email service provider if your site will be sending outgoing email. Refer to [Email on Pantheon](/email) for more information.

<Alert type="info" title="Note">

Some email solution providers (like Sendgrid) may implement a waiting period before upgrading to a paid plan, to fight malicious email. If you're switching email providers as part of your launch, make sure to research and plan for this if applicable.

</Alert>

## Review Status Reports

Launch with confidence by taking advantage of Pantheon's static site analysis service for Drupal and WordPress.

1. Access the **<span class="glyphicons glyphicons-cardio"></span> Live** environment in your Pantheon Site Dashboard.

1. Navigate to the **<span class="glyphicons glyphicons-info-sign"></span> Status** page.

The automated report will:

- Check for exploited patterns in code

- Show database stats

- Reveal PHP errors

Refer to [Drupal Launch Check](/drupal-launch-check) and [WordPress Launch Check](/guides/wordpress-pantheon/wordpress-launch-check) for more information on what is included in these checks and how they work.

## Maximize Performance by Configuring Cache (Optional)

### [Enable Object Cache](/object-cache)

Pantheon's [Object Cache (formerly Redis)](/object-cache) provides an alternative, drop-in caching backend for your website. This removes caching work from the database, which is vital for scaling to a larger number of logged-in users. It also provides a number of other features for developers, including managing queues and custom caching.

All plans except for a Basic plan can use Object Cache. Object Cache is available to Sandbox plans for developmental purposes, but will not be available going live on a Basic plan.

### [Configure Caching](/guides/global-cdn/global-cdn-caching)

Maximize performance on Pantheon by configuring your site's performance settings.

Serving anonymous traffic from virtual memory allows a cached response to be returned to the browser without needing to access the application container, which in turns frees up resources to build more dynamic requests.

### [Test Cache](/guides/global-cdn/test-global-cdn-caching)

Follow the steps below to test whether or not a page is being served from Pantheon's Global CDN by examining the HTTP headers from a response using cURL.

<Partial file="global-cdn-test-cache.md" />

## More Resources

- [Backups Tool](/backups)

- [Email on Pantheon](/email)

- [Global CDN Guide](/guides/global-cdn)