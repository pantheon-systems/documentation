---
title: Manage Plans in the Site Dashboard
description: Upgrade a free site to a paid plan or downgrade a site's current plan within the Site Dashboard.
categories: [platform]
tags: [billing, dashboard, site]
contributors: [cityofoaksdesign]
---

Changing your site plan is typically done at launch time. For a comprehensive step-by-step guide to going live, refer to [Launch Essentials](/guides/launch).

If your site benefits from [Preferred Pricing](https://pantheon.io/plans/agency-preferred-pricing), contact your Supporting Organization for assistance, in order to retain your special pricing rate.

## Access Site Plan

1. Go to the Site Dashboard.

1. For Sandbox sites, click **Upgrade** next to the site's name:
  ![Upgrade plan button shown on Sandbox sites](../images/dashboard/upgrade-plan.png)

  Otherwise, click the current plan tag next to the site's name:
  ![Change current plan for paid sites](../images/dashboard/change-plan.png)

<Alert title="Note" type="info">

Changing your site plan is typically done at launch time. For a comprehensive step-by-step guide to going live, refer to [Launch Essentials](/guides/launch).

</Alert>

## Upgrades

Site plan upgrades will change your site's resources and access to features immediately. The associated card will be charged a prorated amount for the remainder of the current billing period.

If your site benefits from [Preferred Pricing](https://pantheon.io/plans/agency-preferred-pricing?docs), contact your Supporting Organization for assistance in order to retain your special pricing rate.

## Downgrades

Site plan downgrades will change your site's resources and access to features immediately. Beginning on the next billing cycle, the associated card will be charged for the new site plan. No prorated refunds or credits will be issued for site downgrades.

If your site benefits from [Preferred Pricing](https://pantheon.io/plans/agency-preferred-pricing?docs), contact your Supporting Organization for assistance, in order to retain your special pricing rate.

### Downgrade to Sandbox

To downgrade to Sandbox, see [Cancel Current Plan](/site-plan#cancel-current-plan). Note: [Custom domains](/domains/#custom-domains) are not available to Sandbox sites. Downgrading to a Sandbox site will **automatically delete** existing custom domains across all environments of the site. If you decide to return to a paid plan in the future, you will need to add the domains again.

Downgrading to a Sandbox site will disable automatic backups. You will still be able to create backups manually. For details, see [Backups Tool](/backups).

## Roles & Permissions

The permission to manage a site's plan is granted only to the roles of **Site Owner** / **Organization Administrator**. Other roles do not have access to change the site plan as described on this page. For details, see [Role-Based Permissions & Change Management](/change-management/#site-level-roles-and-permissions).

<Alert title="Note" type="info">

If you need to assume site and billing ownership, the current Site Owner must [transfer it to you directly](/site-billing#transfer-ownership-and-billing-for-this-site).

</Alert>

## Considerations

Consider the following changes to feature access _before_ upgrading or downgrading the site's plan. Certain scenarios require code changes in order to safely change the site plan.

### Basic Plan

[New Relic&reg; Performance Monitoring](/new-relic), [Object Cache](/object-cache) (formerly Redis), and [Solr](/solr) are not available for Basic sites. These features must be disabled in order to select Basic as the new site plan when upgrading or downgrading plans.

For Object Cache and Solr, the following code changes are required before the feature can be safely disabled:

<TabList>

<Tab title="WordPress" id="wp-id" active={true}>

#### Safely Remove Object Cache

<Partial file="remove-addons/wp-redis.md" />

#### Safely Remove Solr

<Partial file="remove-addons/wp-solr.md" />

</Tab>

<Tab title="Drupal 8" id="d8-id">

#### Safely Remove Object Cache

<Partial file="remove-addons/drupal-redis.md" />

#### Safely Remove Solr

<Partial file="remove-addons/d8-solr.md" />

</Tab>

<Tab title="Drupal 7" id="d7-id">

#### Safely Remove Object Cache

<Partial file="remove-addons/drupal-redis.md" />

#### Safely Remove Solr

<Partial file="remove-addons/d7-solr.md" />

</Tab>

</TabList>

### Elite Plan

Elite sites cannot manage plans from the Site Dashboard. [Contact our sales team](https://pantheon.io/contact-us) or reach out to your dedicated Client Sales Executive for details.

### Enterprise Organizations

Plan prices are not shown in the Site Dashboard, and you will not be prompted to enter billing information as described below.

If the site is associated with an Enterprise Flagship organization, additional Performance plans not shown in the Site Dashboard are available to purchase.

[Contact our sales team](https://pantheon.io/contact-us) or reach out to your dedicated Client Sales Executive for details.

## Purchase a New Plan

This section covers purchasing a new plan. Review the [previous section](#basic-plan) on feature availability before switching plans to Basic.

<Alert title="Note" type="info">

Did you know Pantheon offers savings for sites purchased with annual billing? See [Pantheon Annual Billing](/annual-billing) for more information.

</Alert>

### Select Plan

1. Go to the Site Dashboard.

1. For Sandbox sites, click **Upgrade** next to the site's name. Otherwise, click the current plan tag next to the site's name.

1. Click **Select** to switch plans:

 ![Select a different plan](../images/dashboard/select-plan.png)

### Enter Billing Information

Site ownership is designated to the user account entering billing information.

<TabList>

<Tab title="Add New Card" id="add-cc-id" active={true}>

If this is your first time taking a site live on Pantheon, you'll likely need to add a new card to your account:

1. Click the **<span class="glyphicon glyphicon-plus"></span> Add New Card** link.

1. Enter the email address you would like invoices sent to.

1. Enter your credit card information and click **Add Card**.

1. Make sure the desired card is selected and click **Continue**.

</Tab>

<Tab title="Select Existing Card" id="existing-cc-id">

To associate an existing card from your account as the payment method for this site:

1. Select the desired card.

1. Click **Continue**.

</Tab>

<Tab title="Send a Request" id="request-payment-id">

<Partial file="transfer-ownership-billing-intro.md" />
<Partial file="transfer-ownership-billing-steps.md" />

</Tab>

</TabList>

### Confirm Your Purchase

1. Make sure the **Plan** details are correct.

1. Verify the card shown in **Billing** details.

1. Click the **Submit** button.

The Site Owner will receive an email confirmation of this change, a new invoice will be issued, and a prorated amount for the current billing cycle will be credited or charged to the associated card automatically.

Invoices and transaction history related to this change can be found in **<span class="glyphicons glyphicons-cogwheel"></span> Account** > **Billing**.

## Cancel Current Plan

Review the [previous section](#sandbox) on feature availability before downgrading to Sandbox.

<Alert title="Note" type="info" >

While all site plans downgrades will be effective immediately, no partial refunds will be issued, per our [terms of service](https://pantheon.io/terms-of-service#tos-11).

</Alert>

1. Go to the Site Dashboard.

1. Select the current plan:

 ![Change current plan for paid sites](../images/dashboard/change-plan.png)

1. Click the **Downgrade to free** link to cancel the current plan:

 ![Downgrade to free by cancelling current plan](../images/dashboard/cancel-plan.png)

1. Check **Yes, cancel my plan** then click **Continue**:

 ![Confirm plan cancellation](../images/dashboard/confirm-cancellation.png)

1. Make sure the change details are correct, then click **Submit**.

1. Remove the existing card as a payment method for the site. For details, see [Billing in the Site Dashboard](/site-billing/#do-not-bill-this-site-to-a-card).

Optionally, you can remove the Sandbox site after downgrading. For details, see [Deleting a Site on Pantheon](/delete-site).

## See Also

- [Billing in the Site Dashboard](/site-billing)
- [Account Billing in the User Dashboard](/account-billing)
- [Traffic Limits and Overages](/traffic-limits)
- [Site Plans FAQs](/site-plans-faq)
