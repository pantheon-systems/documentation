---
title: "Plans"
subtitle: Purchase Plans and Addons
description: Learn how to purchase plans and addons.
tags: [plans]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/account-mgmt/plans/purchase
anchorid: purchase
editpath: docs/guides/account-mgmt/plans/07-purchase.md
reviewed: "2022-09-19"
contenttype: guide
categories: [plans]
newcms: [--]
audience: [sysadmin]
product: [--]
integration: [--]
---

This section covers purchasing a new plan. 

<Alert title="Note" type="info">

Pantheon offers savings for sites purchased with annual billing. Refer to [Pantheon Annual Billing](/guides/account-mgmt/plans/pricing) for more information.

</Alert>

## Purchase a Plan

To purchase a plan for a site:

1. Go to the Site Dashboard.

1. For Sandbox sites, click **Upgrade** next to the site's name. Otherwise, click the current plan tag next to the site's name.

1. Click **Select** for the plan you wish to purchase.

1. Enter your billing information. Site ownership is designated to the user account entering billing information.

1. Make sure the **Plan** details are correct.

1. Verify the card shown in **Billing** details.

1. Click the **Submit** button.

The Site Owner will receive an email confirmation of this change, a new invoice will be issued, and a prorated amount for the current billing cycle will be credited or charged to the associated card automatically.

Invoices and transaction history related to this change can be found in **<span class="glyphicons glyphicons-cogwheel"></span> Account** > **Billing**.

## Enable Add-ons

You can enable the following add-ons:

- [Pantheon Search](/solr) is a Solr-based system for indexing and searching site content. Pantheon provides Apache Solr v3.6 as a service for most plans including the Sandbox site plan.
 - [Object Cache](/guides/object-cache) is a Redis-based open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your Drupal or WordPress website.

To enable or disable add-ons:

1. Go to the Site Dashboard.

1. Click **Settings**, and then click **Add Ons**. You will see all the available add-ons for your site.

2. Click **Add** or **Remove** for each add-on you wish to enable or disable.

### Add-ons and the Basic Plan

Pantheon Search and Object Cache are available to Sandbox plans for testing. Pantheon Search and Object Cache are available to Performance Small plans and higher for production sites. If either feature is enabled on your site, the feature will stop functioning and may cause errors if the site is moved to a Basic plan.
