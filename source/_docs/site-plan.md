---
title: Manage Plans in the Site Dashboard
description: Upgrade a free site to a paid plan or downgrade a site's current plan within the Site Dashboard.
tags: [billing]
---
## Access Site Plan
1. Go to the Site Dashboard.
2. For Sandbox sites, click the **Upgrade** button:
 ![Upgrade plan button shown on Sandbox sites](/source/docs/assets/images/dashboard/upgrade-plan.png)
 Otherwise, click the **current plan**:
 ![Change current plan for paid sites](/source/docs/assets/images/dashboard/change-plan.png)

Plan changes take immediate effect. The associated card will be charged or credited a prorated amount upon upgrade or downgrade.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">Changing your site plan is typically done at launch time. For a comprehensive step-by-step guide to going live, refer to [Launch Essentials](/docs/guides/launch/).</p></div>

### Roles & Permissions
The permission to manage a site's plan is granted only to the roles of **Site Owner** / **User in Charge** / **Organization Administrator**. Other roles do not have access to change the site plan as described on this page. For details, see <a href="/docs/change-management/#site-level-roles-and-permissions" data-proofer-ignore>Role-Based Permissions & Change Management</a>.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">If you need to assume site and billing ownership, the current Site Owner must [transfer it to you directly](/docs/site-billing#transfer-ownership-and-billing-for-this-site).</p></div>

## Considerations
Consider the following changes to feature access _before_ upgrading or downgrading the site's plan. Certain scenarios require code changes in order to safely change the site plan.
### Basic Plan
[New Relic](/docs/new-relic/), [Redis](/docs/redis/), and [Solr](/docs/solr) are not available for Basic plans. These features must be disabled in order to select Basic as the new site plan when upgrading or downgrading plans.

For Redis and Solr, the following code changes are required before the feature can be safely disabled:

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="wp-id" role="presentation" class="active"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
  <!-- 2nd Tab Nav -->
  <li id="drops-id" role="presentation"><a href="#drops" aria-controls="drops" role="tab" data-toggle="tab">Drupal</a></li>
</ul>
<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="wp" markdown="1">
#### Safely Uninstall & Disable Redis
1. Uninstall the [WP Redis](https://wordpress.org/plugins/wp-redis/){.external} plugin.
2. Delete the `wp-content/object-cache.php` file.
3. Commit and deploy code changes to the Live environment.
4. Go to **<span class="glyphicons glyphicons-cogwheel"></span> Settings** > **Add Ons** and click the **Remove** button for Redis.
#### Safely Uninstall & Disable Solr
1. Uninstall the [Solr Search for WordPress](https://wordpress.org/plugins/solr-power/){.external} plugin.
2. Ensure the [default search mechanism](https://codex.wordpress.org/Class_Reference/WP_Query#Search_Parameter){.external} is functioning.
3. Commit and deploy code changes to the Live environment.
4. Go to **<span class="glyphicons glyphicons-cogwheel"></span> Settings** > **Add Ons** and click the **Remove** button for Solr.
  </div>
  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="drops" markdown="1">
#### Safely Uninstall & Disable Redis
1. Disable the [Redis](https://www.drupal.org/project/redis){.external} module.
2. Delete Redis configuration from `settings.php`.
3. Commit and deploy code changes to the Live environment.
4. Go to **<span class="glyphicons glyphicons-cogwheel"></span> Settings** > **Add Ons** and click the **Remove** button for Redis.
#### Safely Uninstall & Disable Solr
1. Disable the [Apache Solr Search](https://www.drupal.org/project/apachesolr){.external}, [Search API Solr Search](https://www.drupal.org/project/search_api_solr){.external}, and the [Pantheon Apache Solr](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon/pantheon_apachesolr){.external} modules.
2. Delete all schema configurations from `settings.php`.
3. Commit and deploy code changes to the Live environment.
4. Go to **<span class="glyphicons glyphicons-cogwheel"></span> Settings** > **Add Ons** and click the **Remove** button for Solr.
  </div>
</div>

### Sandbox Plan
[Custom domains](/docs/domains/#custom-domains) are not available to Sandbox plans. Downgrading to a Sandbox plan will **automatically delete** existing custom domains across all environments of the site. If you decide to return to a paid plan in the future, you will need to add the domains again.

Downgrading to a Sandbox plan will disable automatic backups. You will be able to create backups manually. For details, see [Backups Tool](/docs/backups/).

## Purchase a New Plan
Review the [previous section](#basic-plan) on feature availability before switching plans to Basic.
### Select Plan
1. Go to the Site Dashboard.
2. For Sandbox sites, click the **Upgrade** button. Otherwise, select the current plan.
3. Click **Select** to switch plans:
 ![Select a different plan](/source/docs/assets/images/dashboard/select-plan.png)

### Enter Billing Information
Ownership is directly tied to the user account entering billing information.
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
{% include("content/transfer-owernship-billing-intro.html")%}

1. Click the **<span class="glyphicons glyphicons-envelope"></span> Send a Request** button.
2. Enter the intended site owner’s email.

 The business owner will get an email that directs them to create a Pantheon account or log in to an existing account. Once inside, they need to provide their contact and billing info.
3. Ask the new site owner to add your agency as a [Supporting Organization](/docs/team-management/#add-a-supporting-organization) so you can continue the going live procedure on their behalf.
  </div>
</div>

### Confirm Your Purchase
1. Make sure the **Plan** details are correct.
2. Verify the card shown in **Billing** details.
3. Click the **Submit** button.

The Site Owner will receive an email confirmation of this change, a new invoice will be issued, and a prorated amount for the current billing cycle will be credited or charged to the associated card automatically.

Invoices and transaction history related to this change can be found in **<span class="glyphicons glyphicons-cogwheel"></span> Account** > **Billing**.

## Cancel Current Plan
Review the [previous section](#sandbox-plan) on feature availability before downgrading to Sandbox.

1. Go to the Site Dashboard.
2. Select the current plan (shown in green).
3. Click the **Downgrade to free** link to cancel the current plan:
 ![Downgrade to free by cancelling current plan](/source/docs/assets/images/dashboard/cancel-plan.png)
4. Check **Yes, cancel my plan** then click **Continue**:
 ![Confirm plan cancellation](/source/docs/assets/images/dashboard/confirm-cancellation.png)
5. Make sure the change details are correct, then click **Submit**.
6. Remove the existing card as a payment method for the site. For details, see [Billing in the Site Dashboard](/docs/site-billing/#do-not-bill-this-site-to-a-card).

## See Also
- [Billing in the Site Dashboard](/docs/site-billing/)
- [Account Billing in the User Dashboard](/docs/account-billing/)
- [Traffic Limits and Overages](/docs/traffic-limits/)
- [New Site Plans FAQs](/docs/new-plans-faq/)
