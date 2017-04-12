---
title: Select a Plan
description: Learn the various Pantheon plans offered for your Drupal or WordPress sites.
tags: [billing]
categories: []
---
Pantheon offers multiple service levels, called [plans](https://pantheon.io/pricing). You can select the plan that works best for you and your needs. In the beginning, you can start on the Personal Plan. Then once you start to grow and have more specific requirements, take a look at the Professional Plan, which can be part of the recipe to get your site or application to scale and perform better.

To get started, navigate to the Site Dashboard.


<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Only the Site Owner, or for sites owned by an Organization - the Organization's Administrators, can manage a site's plan. Users without the permission to manage a site's plan will not see the options discussed below. For additional details, see <a href="/docs/change-management">Role-Based Permissions & Change Management</a>.</p>
</div>


## View Current Plan
The site's current service level is shown within a green label on the Site Dashboard:

![confirm new plan](/source/docs/assets/images/dashboard/confirm-plan-dashboard.png)

## Select Payment Method and Plan
1. Select a payment method within **Settings** > **Billing**, then click **Update Payment Method**. You can choose from existing cards, add a new card or invite the site owner to pay.
2. Select the desired plan from **Settings** > **Plan**, then click **Update Plan**.
3. As the site owner, you will receive an email confirming the change to the site.
4. After the site billing is processed, you will receive an updated invoice.

## Upgrade or Downgrade Plan
Manage a site's plan from the Site Dashboard within **Settings** > **Plan**. Select the desired plan and click **Update Plan**.
Plan changes take immediate effect.

A plan upgrade will result in a prorated charge to your account; A prorated credit will be issued for any downgrades.

### Downgrade to Sandbox
The following should be considered before downgrading your site from a paid plan to Sandbox:

* All domains added to Pantheon environments will be removed. If you decide to return to a paid plan in the future, you will need to add the domains again in desired environments.
* HTTPS will be disabled and certificates will be removed. If you decide to re-enable HTTPS in the future, you must re-upload your certificate, intermediary certificates, and your key.

### Downgrade to Personal
The following should be considered before switching to a Personal plan:

* [Redis](/docs/redis) addon service will be disabled.
* [Solr](/docs/solr) addon service will be disabled.
* HTTPS will be disabled and certificates will be removed. If you decide to re-enable HTTPS in the future, you must upgrade your plan or [enable HTTPS with Cloudflare's Universal SSL](/docs/guides/cloudflare-enable-https).
* You must update your DNS records after HTTPS is disabled. Follow the updated DNS recommendations found within the **Domains** tool on the Site Dashboard.

Before moving to a Personal plan, we recommend preparing the site by disabling Redis and Solr from within WordPress or Drupal.
#### Disable Redis
* Drupal sites will need to disable the [Redis](https://www.drupal.org/project/redis) module as well as remove the Redis configuration from `settings.php`.
* WordPress sites will need to remove the [WP Redis](https://wordpress.org/plugins/wp-redis/) drop-in plugin.

#### Disable Solr
* WordPress sites will need to disable the [Solr Search for WordPress (Solr Power)](https://wordpress.org/plugins/solr-power/) plugin and ensure the [default search mechanism](https://codex.wordpress.org/Class_Reference/WP_Query#Search_Parameter) is functioning.
* Drupal sites will need to disable [Apache Solr Search](https://www.drupal.org/project/apachesolr), [Search API Solr Search](https://www.drupal.org/project/search_api_solr), and the [Pantheon Apache Solr](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon/pantheon_apachesolr) modules in each environment and remove schema configurations from `settings.php`.
