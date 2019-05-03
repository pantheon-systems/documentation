---
title: Manage Plans in the Site Dashboard
description: Upgrade a free site to a paid plan or downgrade a site's current plan within the Site Dashboard.
tags: [billing]
contributors: [cityofoaksdesign]
---
## Access Site Plan
1. Go to the Site Dashboard.
2. For Sandbox sites, click the **Upgrade** button:
 ![Upgrade plan button shown on Sandbox sites](/source/docs/assets/images/dashboard/upgrade-plan.png)
 Otherwise, click the **current plan**:
 ![Change current plan for paid sites](/source/docs/assets/images/dashboard/change-plan.png)

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">Changing your site plan is typically done at launch time. For a comprehensive step-by-step guide to going live, refer to [Launch Essentials](/docs/guides/launch/).
</p></div>

## Upgrades
Site plan upgrades will change your site's resources and access to features immediately. The associated card will be charged a prorated amount for the remainder of the current billing period.

## Downgrades
Site plan downgrades will change your site's resources and access to features immediately. Beginning on the next billing cycle, the associated card will be charged for the new site plan.

## Roles & Permissions
The permission to manage a site's plan is granted only to the roles of **Site Owner** / **Organization Administrator**. Other roles do not have access to change the site plan as described on this page. For details, see <a href="/docs/change-management/#site-level-roles-and-permissions" data-proofer-ignore>Role-Based Permissions & Change Management</a>.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">If you need to assume site and billing ownership, the current Site Owner must [transfer it to you directly](/docs/site-billing#transfer-ownership-and-billing-for-this-site).</p></div>

## Considerations
Consider the following changes to feature access _before_ upgrading or downgrading the site's plan. Certain scenarios require code changes in order to safely change the site plan.

### Sandbox
[Custom domains](/docs/domains/#custom-domains) are not available to Sandbox sites. Downgrading to a Sandbox site will **automatically delete** existing custom domains across all environments of the site. If you decide to return to a paid plan in the future, you will need to add the domains again.

Downgrading to a Sandbox site will disable automatic backups. You will still be able to create backups manually. For details, see [Backups Tool](/docs/backups/).

### Basic Plan
[New Relic](/docs/new-relic/), [Redis](/docs/redis/), and [Solr](/docs/solr) are not available for Basic sites. These features must be disabled in order to select Basic as the new site plan when upgrading or downgrading plans.

For Redis and Solr, the following code changes are required before the feature can be safely disabled:

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="wp-id" role="presentation" class="active"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
  <!-- 2nd Tab Nav -->
  <li id="d8-id" role="presentation"><a href="#d8" aria-controls="drops" role="tab" data-toggle="tab">Drupal 8</a></li>
  <!-- 3rd Tab Nav -->
  <li id="d7-id" role="presentation"><a href="#d7" aria-controls="drops" role="tab" data-toggle="tab">Drupal 7</a></li>

</ul>
<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="wp" markdown="1">
#### Safely Remove Redis
{% include("content/remove-addons/wp-redis.html")%}
#### Safely Remove Solr
{% include("content/remove-addons/wp-solr.html")%}
  </div>
  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="d8" markdown="1">
#### Safely Remove Redis
{% include("content/remove-addons/d8-redis.html")%}
#### Safely Remove Solr
{% include("content/remove-addons/d8-solr.html")%}
  </div>
  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="d7" markdown="1">
#### Safely Remove Redis
{% include("content/remove-addons/d7-redis.html")%}
#### Safely Remove Solr
{% include("content/remove-addons/d7-solr.html")%}
  </div>
</div>

### Elite Plan
Elite sites cannot manage plans from the Site Dashboard. [Contact our sales team](https://pantheon.io/contact-us){.external} or reach out to your dedicated Client Sales Executive for details.

### Enterprise Organizations
Plan prices are not shown in the Site Dashboard, and you will not be prompted to enter billing information as described below.

If the site is associated with an Enterprise Flagship organization, additional Performance plans not shown in the Site Dashboard are available to purchase.

[Contact our sales team](https://pantheon.io/contact-us){.external} or reach out to your dedicated Client Sales Executive for details.

## Purchase a New Plan
This section covers purchasing a new plan. Review the [previous section](#basic-plan) on feature availability before switching plans to Basic.

<div class="alert alert-info" role="alert" markdown="1">
#### Note {.info}
Did you know Pantheon offers savings for sites purchased with annual billing? See [Pantheon Annual Billing](/docs/annual-billing/) for more information.
</div>

### Select Plan
1. Go to the Site Dashboard.
2. For Sandbox sites, click the **Upgrade** button. Otherwise, select the lable for the site's current plan.
3. Click **Select** to switch plans:
 ![Select a different plan](/source/docs/assets/images/dashboard/select-plan.png)


### Enter Billing Information
Site ownership is designated to the user account entering billing information.
<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="add-cc-id" role="presentation" class="active"><a href="#add-cc" aria-controls="add-cc" role="tab" data-toggle="tab">Add New Card</a></li>
  <!-- 2nd Tab Nav -->
  <li id="existing-cc-id" role="presentation"><a href="#existing-cc" aria-controls="existing-cc" role="tab" data-toggle="tab">Select Existing Card</a></li>
  <!-- 3RD Tab Nav -->
  <li id="request-payment-id" role="presentation"><a href="#request-payment" aria-controls="request-payment" role="tab" data-toggle="tab">Send a Request</a></li>
</ul>
<!-- Tab panes -->
<div class="tab-content">
<!-- Active pane content -->
<div role="tabpanel" class="tab-pane active" id="add-cc" markdown="1">
If this is your first time taking a site live on Pantheon, you'll likely need to add a new card to your account:

1. Click the **<span class="glyphicon glyphicon-plus"></span> Add New Card** link.
2. Enter the email address you would like invoices sent to.
3. Enter your credit card information and click **Add Card**.
4. Make sure the desired card is selected and click **Continue**.
</div>
<!-- 2nd pane content -->
<div role="tabpanel" class="tab-pane" id="existing-cc" markdown="1">
To associate an existing card from your account as the payment method for this site:

1. Select the desired card.
2. Click **Continue**.
</div>
<!-- 3rd pane content -->
<div role="tabpanel" class="tab-pane" id="request-payment" markdown="1">
{% include("content/transfer-ownership-billing-intro.html")%}
{% include("content/transfer-ownership-billing-steps.html")%}
</div>
</div>

### Confirm Your Purchase
1. Make sure the **Plan** details are correct.
2. Verify the card shown in **Billing** details.
3. Click the **Submit** button.

The Site Owner will receive an email confirmation of this change, a new invoice will be issued, and a prorated amount for the current billing cycle will be credited or charged to the associated card automatically.

Invoices and transaction history related to this change can be found in **<span class="glyphicons glyphicons-cogwheel"></span> Account** > **Billing**.

## Cancel Current Plan
Review the [previous section](#sandbox) on feature availability before downgrading to Sandbox. 

<div class="alert alert-info" markdown="1">
#### Note {.info}
While all site plans downgrades will be effective immediately, no partial refunds will be issued, per our [terms of service](https://pantheon.io/terms-of-service#tos-11){.external}.
</div>


1. Go to the Site Dashboard.
2. Select the current plan:
 ![Change current plan for paid sites](/source/docs/assets/images/dashboard/change-plan.png)
3. Click the **Downgrade to free** link to cancel the current plan:
 ![Downgrade to free by cancelling current plan](/source/docs/assets/images/dashboard/cancel-plan.png)
4. Check **Yes, cancel my plan** then click **Continue**:
 ![Confirm plan cancellation](/source/docs/assets/images/dashboard/confirm-cancellation.png)
5. Make sure the change details are correct, then click **Submit**.
6. Remove the existing card as a payment method for the site. For details, see [Billing in the Site Dashboard](/docs/site-billing/#do-not-bill-this-site-to-a-card).

Optionally, you can remove the Sandbox site after downgrading. For details, see [Deleting a Site on Pantheon](/docs/delete-site/).

## See Also
- [Billing in the Site Dashboard](/docs/site-billing/)
- [Account Billing in the User Dashboard](/docs/account-billing/)
- [Traffic Limits and Overages](/docs/traffic-limits/)
- [New Site Plans FAQs](/docs/new-plans-faq/)
