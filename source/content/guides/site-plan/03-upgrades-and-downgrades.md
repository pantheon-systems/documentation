---
title: Site Plans on Pantheon
subtitle: Upgrade or Downgrade Your Site Plan
description: Learn how to upgrade or downgrade your current site plan.
categories: [platform]
tags: [billing, dashboard, site]
contributors: [cityofoaksdesign, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/site-plan/upgrades-and-downgrades
anchorid: upgrades-and-downgrades
---

This section provides information on how to upgrade or downgrade your current Pantheon site plan.

## Roles & Permissions

The permission to manage a site's plan is granted only to the roles of **Site Owner** / **Organization Administrator**. Other roles do not have access to change the site plan as described on this page. For details, see [Role-Based Permissions & Change Management](/change-management/#site-level-roles-and-permissions).

<Alert title="Note" type="info">

If you need to assume site and billing ownership, the current Site Owner must [transfer it to you directly](/site-billing#transfer-ownership-and-billing-for-this-site).

</Alert>

## Considerations

Consider the following changes to feature access _before_ upgrading or downgrading the site's plan. Certain scenarios require code changes in order to safely change the site plan.

### Basic Plan

[New Relic](/guides/new-relic), [Object Cache](/object-cache) (formerly Redis), and [Pantheon Search](/solr) are not available for Basic sites. These features must be disabled in order to select Basic as the new site plan when upgrading or downgrading plans.

For Object Cache and Pantheon Search (Solr), the following code changes are required before the feature can be safely disabled:

<TabList>

<Tab title="WordPress" id="wp-id" active={true}>

#### Safely Remove Object Cache

<Partial file="remove-addons/wp-redis.md" />

#### Safely Remove Pantheon Search

<Partial file="remove-addons/wp-solr.md" />

</Tab>

<Tab title="Drupal 7" id="d7-id">

#### Safely Remove Object Cache

<Partial file="remove-addons/drupal-redis.md" />

#### Safely Remove Pantheon Search

<Partial file="remove-addons/d7-solr.md" />

</Tab>

</TabList>

### Elite Plan

Elite sites cannot manage plans from the Site Dashboard. [Contact our sales team](https://pantheon.io/contact-us) or reach out to your dedicated Client Sales Executive for details.

### Enterprise Organizations

Plan prices are not shown in the Site Dashboard, and you will not be prompted to enter billing information as described below.

If the site is associated with an Enterprise Flagship organization, additional Performance plans not shown in the Site Dashboard are available to purchase.

[Contact our sales team](https://pantheon.io/contact-us) or reach out to your dedicated Client Sales Executive for details.


## Upgrades

Site plan upgrades will change your site's resources and access to features immediately. The associated card will be charged a prorated amount for the remainder of the current billing period.

If your site benefits from [Preferred Pricing](https://pantheon.io/plans/agency-preferred-pricing?docs), contact your Supporting Organization for assistance in order to retain your special pricing rate.

## Downgrades

Site plan downgrades will change your site's resources and access to features immediately. Beginning on the next billing cycle, the associated card will be charged for the new site plan. No prorated refunds or credits will be issued for site downgrades.

If your site benefits from [Preferred Pricing](https://pantheon.io/plans/agency-preferred-pricing?docs), contact your Supporting Organization for assistance, in order to retain your special pricing rate.

### Downgrade to Sandbox

To downgrade to Sandbox, refer to [Cancel Current Plan](/guides/site-plan/cancel-site-plan). Note: [Custom domains](/domains/#custom-domains) are not available to Sandbox sites. Downgrading to a Sandbox site will **automatically delete** existing custom domains across all environments of the site. If you decide to return to a paid plan in the future, you will need to add the domains again.

Downgrading to a Sandbox site will disable automatic backups. You will still be able to create backups manually. For details, see [Backups Tool](/backups).
