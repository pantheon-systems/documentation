---
title: Plans
subtitle: Manage Your Plans
description: Upgrade a free site to a paid plan or downgrade a site's current plan within the Site Dashboard.
categories: [account-mgmt]
tags: [plans]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/account-mgmt/plans/manage
anchorid: manage
editpath: docs/guides/account-mgmt/plans/09-manage.md
reviewed: "2022-09-19"
---

<Alert title="Notes" type="info" >

- Elite sites cannot manage plans from the Site Dashboard. [Contact Sales](https://pantheon.io/contact-us) or reach out to your dedicated Client Sales Executive for details.

- The permission to manage a site's plan is granted only to the roles of **Site Owner** / **Organization Administrator**. Other roles do not have access to change the site plan as described on this page. Pantheon for EDU+ allows Organization Administrators to manage site plans for sites within their organization. When a site is associated with an EDU+ Organization, billing is managed through a contract with Pantheon, and only Organization Administrators can confirm a site plan change. For details, see [Role-Based Permissions & Change Management](/change-management/#site-level-roles-and-permissions).

- If you need to assume site and billing ownership, the current Site Owner must [transfer ownership to you directly](/guides/account-mgmt/workspace-sites-teams/sites#change-site-ownership).

</Alert>

## Before You Make Changes

Consider the following changes to feature access _before_ upgrading or downgrading the site's plan. Certain scenarios require code changes in order to safely change the site plan.

### Disable Addons When Downgrading to Basic Plan

[Object Cache](/guides/object-cache) (formerly Redis) and [Pantheon Search](/solr) are not available for Basic sites. These features must be disabled in order to select Basic as the new site plan when upgrading or downgrading plans.

To remove these addons:

<TabList>

<Tab title="WordPress" id="wp-id" active={true}>

#### Object Cache

<Partial file="remove-addons/wp-redis.md" />

#### Pantheon Search

<Partial file="remove-addons/wp-solr.md" />

</Tab>

<Tab title="Drupal 7" id="d7-id">

#### Object Cache

<Partial file="remove-addons/drupal-redis.md" />

#### Pantheon Search

<Partial file="remove-addons/d7-solr.md" />

</Tab>

</TabList>

### Upgrades

Site plan upgrades will change your site's resources and access to features immediately. The associated card will be charged a prorated amount for the remainder of the current billing period.

If your site benefits from [Preferred Pricing](https://pantheon.io/plans/agency-preferred-pricing?docs), contact your Supporting Organization for assistance in order to retain your special pricing rate.

### Downgrades

Site plan downgrades will change your site's resources and access to features immediately. Beginning on the next billing cycle, the associated card will be charged for the new site plan. No prorated refunds or credits will be issued for site downgrades.

If your site benefits from [Preferred Pricing](https://pantheon.io/plans/agency-preferred-pricing?docs), contact your Supporting Organization for assistance, in order to retain your special pricing rate.

[Custom domains](/guides/domains) are not available to Sandbox sites. Downgrading to a Sandbox site will **automatically delete** existing custom domains across all environments of the site. If you decide to return to a paid plan in the future, you will need to add the domains again.

Downgrading to a Sandbox site will disable automatic backups. You will still be able to create backups manually. Refer to the [Backups Tool](/backups) for more information.

## Downgrade Your Plan to Sandbox

To downgrade to Sandbox, refer to [Cancel Current Plan](/guides/account-mgmt/plans/manage#downgrade-your-plan-to-sandbox).

## Change Your Plan


<Alert title="Warning" type="danger">

Before making any changes, please review [Before You Make Changes](#before-you-make-changes).

</Alert>

To change your plan:

<TabList>

<Tab title="Edu Sites" id="edu" active={true}>

1. Log in as an [organization administrator](/change-management#roles-and-permissions).

1. Go to the Site Dashboard, click **Upgrade** next to the site's name. Otherwise, click the current plan tag next to the site's name.

1. Click **Select** below the plan you choose, and select the Plan Size if it's a Performance plan.

1. Review the new plan on the **Confirm Purchase** page, and click **Place Your Order**.

Because billing is handled by the organization, the plan change is immediate, and you'll be returned to the Site Dashboard.

If the site plan isn't shown on the Dashboard immediately, refresh the page or click the **Workflows** button for status.

</Tab>


<Tab title="All Other Sites" id="other">

1. Go to the Site Dashboard.

1. For Sandbox sites, click **Upgrade** next to the site's name. Otherwise, click the current plan tag next to the site's name.

</Tab>

</TabList>

## Cancel Your Plan

<Alert title="Warning" type="danger">

Before making any changes, please review [Before You Make Changes](#before-you-make-changes).

</Alert>

1. Go to the Site Dashboard.

1. Select the current plan (to the right of the site name).

1. Click the **Downgrade to free** link to cancel the current plan.

1. Check **Yes, cancel my plan**, then click **Continue**.

1. Make sure the change details are correct, then click **Submit**.

1. Remove the existing card as a payment method for the site. Refer to [Billing in the Site Dashboard](/guides/account-mgmt/billing/methods#delete-a-site-specific-payment-method) for more information.

Optionally, you can remove the Sandbox site after downgrading. Refer to [Deleting a Site on Pantheon](/delete-site) for more information.
