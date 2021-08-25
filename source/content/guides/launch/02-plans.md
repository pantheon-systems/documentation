---
title: Launch Essentials
subtitle: Upgrade Site Plan
description: Part two of our Launch Essentials guide covers upgrading your site to the proper plan to cover your needs.
layout: guide
categories: [go-live]
tags: [agencies, billing, launch, webops]
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

Contract customers should contact their account manager when they're ready to upgrade their site plan.

## Use Your Own Card

To upgrade and pay for the site now, add your payment method:

1. From the Pantheon Site Dashboard, click **Upgrade** next to the site's name.
1. Click the **Select** button under the [plan you choose](https://pantheon.io/pricing/).
1. At the **Choose Billing** step, select the billing frequency: [**Pay Annually**](/annual-billing) or **Pay Monthly**.
   - If you've chosen a **Performance Plan**, choose the size and click **Continue**.
   - If you've chosen a **Basic Plan**, click **Continue**.
1. Click **+ Add New Card** and enter the credit card information, then click **Add Card** to save the card information.
1. Click **Continue** and if everything looks right, click **Place Your Order** to confirm your purchase.
   - [Contact Support](/support) if you need any help.

As the site owner, you’ll receive an email confirming the change to the site. After the site billing is processed, you’ll receive an updated invoice.

## Transfer Ownership and Billing for This Site

<Partial file="transfer-ownership-billing-intro.md" />

<Partial file="transfer-ownership-billing-steps.md" />

<Accordion title="Level Up: Load and Performance Tests (Optional)" id="host-specific1" icon="graduation-cap">

## Ready to launch like the pros?

Now that you've upgraded your site to a paid plan, it's the perfect time to test how your site works in the wild.

### [New Relic&reg; Performance Monitoring](/new-relic/#activate-new-relic-performance-monitoring)

In preparation for these tests, activate New Relic APM Pro so you can observe your site's performance like a maverick. This service is accessible from the Pantheon Site Dashboard for all site plans except Basic, and it offers a nearly real-time look into the performance of a web application.

### [Performance Testing](/load-and-performance-testing/#performance-testing)

Measure your site's response time to proactively expose potential bottlenecks. We recommend running performance tests before you run load tests.

### [Load Testing](/load-and-performance-testing/#load-testing)

Make sure your site can withstand peak traffic spikes after launch. This test should be performed on the Live environment before the site has launched, after performance testing.

</Accordion>
