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
3. Select the desired [plan](https://pantheon.io/pricing/) from the **Plan** tab, then click **Update Plan**.

As the site owner, you’ll receive an email confirming the change to the site. After the site billing is processed, you’ll receive an updated invoice.

## Transfer Ownership and Billing for This Site
<Partial file="transfer-ownership-billing-intro.md" />
<Partial file="transfer-ownership-billing-steps.md" />

<Accordion title="Level Up: Load and Performance Tests (Optional)" id="host-specific1" icon="graduation-cap">

## Ready to launch like the pros?
Now that you've upgraded your site to a paid plan, it's the perfect time to test how your site works in the wild.

### [New Relic APM Pro](/new-relic/#activate-new-relic-apm-pro)
In preparation for these tests, activate New Relic APM Pro so you can observe your site's performance like a maverick. This service is accessible from the Pantheon Site Dashboard for all site plans except Basic, and it offers a nearly real-time look into the performance of a web application.

### [Performance Testing](/load-and-performance-testing/#performance-testing)
Measure your site's response time to proactively expose potential bottlenecks. We recommend running performance tests before you run load tests.

### [Load Testing](/load-and-performance-testing/#load-testing)
Make sure your site can withstand peak traffic spikes after launch. This test should be performed on the Live environment before the site has launched, after performance testing.

</Accordion>
