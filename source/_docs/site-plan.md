---
title: Manage Plans in the Site Dashboard
description: Upgrade a free site to a paid plan or downgrade a site's current plan within the Site Dashboard.
tags: [billing]
---
## Access Site Plan
1. Go to the Site Dashboard.
2. If the site is currently on a Free plan, you will see an **Upgrade** button next to the site name. Otherwise, the current plan is shown in green.

Plan changes take immediate effect. The associated card will be charged or credited a prorated amount upon upgrade or downgrade.
### Roles & Permissions
The permission to manage a site's plan is granted only to the roles of **Site Owner** / **User in Charge** / **Organization Administrator**. Other roles do not have access to change the site plan as described on this page.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">If you need to assume site and billing ownership, the current Site Owner must [transfer it to you directly](/docs/site-billing#transfer-ownership-and-billing-for-this-site).</p></div>

## Considerations
Consider the following changes to feature access _before_ upgrading or downgrading the site's plan. Certain scenarios require code changes in order to safely change the site plan.
### Basic Plans
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
2. Delete schema configurations from `settings.php`.
3. Commit and deploy code changes to the Live environment.
4. Go to **<span class="glyphicons glyphicons-cogwheel"></span> Settings** > **Add Ons** and click the **Remove** button for Solr.  
  </div>
</div>

### Free Plans
[Custom domains](/docs/domains/#custom-domains) are not available to Free plans. Downgrading to a Free plan will automatically delete existing custom domains across all environments of the site. If you decide to return to a paid plan in the future, you will need to add the domains again.

## Upgrades and Downgrades
Review the [previous section](#considerations) on feature availability before switching plans to Free or Basic. This applies to upgrades and downgrades alike.
### Switch Current Plan
1. Go to the Site Dashboard.
2. If the site is currently on a Free plan, click the **Upgrade** button. Otherwise, click on the current plan (shown in green).
3. Click **Select** for the desired plan.

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
2. Verify card shown in **Billing** details.
3. Click the **Submit** button.

The Site Owner will receive an email confirmation of this change, a new invoice will be issued, and a prorated amount for the current billing cycle will be credited or charged to the associated card automatically.

Invoices and transaction history related to this change can be found in **<span class="glyphicons glyphicons-cogwheel"></span> Account** > **Billing**.

## See Also

* [Launch Essentials](/docs/guides/launch/)
* [Account Billing in the User Dashboard](/docs/account-billing/)
* [Billing in the Site Dashboard](/docs/site-billing/)
* [Pageview Limits and Overages](/docs/pageview-limits/)
