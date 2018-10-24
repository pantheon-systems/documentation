---
title: Launch Essentials
subtitle: Upgrade Site Plan
description: Part two of our Launch Essentials guide covers upgrading your site to the proper plan to cover your needs.
layout: guide
anchorid: plans
launch: true
type: guide
generator: pagination
pagination:
    provider: data.launchpages
use:
    - launchpages
permalink: docs/guides/launch/plans/
nexturl: guides/launch/domains/
nextpage: Domains & HTTPS
previousurl: guides/launch/
previouspage: Introduction
editpath: launch/02-plans.md
image: getting-started-Largethumb
---
In this lesson, we'll upgrade from a free account to a paid plan by adding billing information or inviting a business owner to pay.

## Use Your Own Card
If you plan to pay for the site or if you want to wait to transfer ownership, you can add your own payment method now:

1. From the Pantheon Site Dashboard, click **<span class="glyphicons glyphicons-cogwheel"></span> Settings**.
2. Go to the **Billing** tab and select a payment method, then click **Update Payment Method**. You can add a new card or choose from cards already associated with your user account.
3. Select the desired [plan](https://pantheon.io/pricing/){.external} from the **Plan** tab, then click **Update Plan**.

As the site owner, you’ll receive an email confirming the change to the site. After the site billing is processed, you’ll receive an updated invoice.

## Transfer Ownership and Billing for This Site
{% include("content/transfer-ownership-billing-intro.html")%}
{% include("content/transfer-ownership-billing-steps.html")%}

<div class="panel panel-drop panel-guide" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#host-specific1"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><i class="fa fa-graduation-cap" style="line-height:.9"></i> Level Up: Load and Performance Tests (Optional)</h3></a>
  </div>
  <div id="host-specific1" class="collapse" style="padding:10px;">
    <div markdown="1">
## Ready to launch like the pros?
Now that you've upgraded your site to a paid plan, it's the perfect time to test how your site works in the wild.

### [New Relic APM Pro](/docs/new-relic/#activate-new-relic-apm-pro)
In preparation for these tests, activate New Relic APM Pro so you can observe your site's performance like a maverick. This service is accessible from the Pantheon Site Dashboard for all site plans except Basic, and it offers a nearly real-time look into the performance of a web application.

### [Performance Testing](/docs/load-and-performance-testing/#performance-testing)
Measure your site's response time to proactively expose potential bottlenecks. We recommend running performance tests before you run load tests.

### [Load Testing](/docs/load-and-performance-testing/#load-testing)
Make sure your site can withstand peak traffic spikes after launch. This test should be performed on the Live environment before the site has launched, after performance testing.
    </div>
  </div>
</div>
