---
title: "Traffic"
subtitle: Overages Policy
description: Understand how Pantheon's Overage Process helps to reduce excess billing and unplanned costs should a site exceed plan limits.
tags: [traffic]
contributors: [wordsmither]
showtoc: true
permalink: docs/guides/account-mgmt/traffic/overages
editpath: docs/guides/account-mgmt/traffic/03-overages.md
reviewed: "2024-08-15"
contenttype: [guide]
innav: [false]
categories: [plans]
cms: [--]
audience: [sysadmin]
product: [--]
integration: [--]
---


<Alert title="Overage charges temporarily waived" type="danger" >

In response to your feedback, Pantheon has temporarily paused the automated overage program. See [related release note](/release-notes/2024/08/overage-charges-updates).

</Alert>

## Traffic Limits
Pantheon optimizes the resources and performance of your site based on your choice of [pricing plan](https://pantheon.io/plans/pricing?docs). Your pricing plan determines the [backend resources](/guides/account-mgmt/plans/faq#plan-resources) Pantheon deploys to support site performance and to serve the corresponding traffic levels for each plan.

Customers should choose the plan that suits their anticipated traffic and continually monitor that choice using [Pantheon's Site Dashboard](/guides/account-mgmt/traffic).  

## Overage Policy
If your traffic is over your plan limit, the site may be subject to overage fees. Aligning your site plan with the current traffic demands is the best way to ensure there will not be additional charges. In the event your site is over the plan limits, the overages protection program is an easy-to-understand model based on actual site usage in the prior month.

### Overage Fee
Overages will be billed $40 for each 10,000 unique site visits (a unique site visit is defined as a specific IP address and user agent combination over a 24-hour period) or portion thereof that exceeds the amount of included unique visits in the subscription.  This applies uniformly to all sites running on the platform at all subscription levels.

### Overage Protection
All Pantheon customers, except for Basic plans and monthly subscriptions, will have one month of overages waived every 12 months during the subscription term. This protection resets with the calendar year and will be automatically applied the first month of the year your site goes over its plan limits.

Pantheon designed overage protection for Performance and Elite sites on annual plans to prevent one-time traffic spikes from causing billing issues. All Performance plans and higher on an annual plan include one month of overage protection, which provides billing protection against externally driven spikes, or for businesses that have an annual “big event” but otherwise operate at a lower “normal” rate.

In a month where overage protection is applied the site owner will be notified of the event and no other action will be taken. This notice is a great time to review your site's traffic to determine if it is time to move to a new plan and avoid the risk of a future overages bill.

If the change to traffic behavior exceeds your plan limit for a second month in any calendar year, you will receive notice of the traffic volume and the impact of the excess traffic. For credit card customers (those not on a contract) that will result in an invoice later that same month. For customers on contract overages will be billed quarterly.

#### Additional Benefits for Nonprofits  
Select nonprofit groups qualify for both preferred pricing and 4 months of Overage Protection. This will allow nonprofit organizations to exceed their site visit plan limits in any 4 months out of a 12 month period without having to pay any overage fees.

To access these benefits, the nonprofit organization must be a qualifying 501(c)(3) or operate via a 501(c)(3) fiscal sponsor. The organization or its Pantheon partner simply needs to provide Pantheon with a copy of its 501(c)(3) nonprofit status and tax exemption certificate (for US-based companies), or its fiscal sponsorship agreement to helpdesk@pantheon.io. Canadian companies should provide their Articles or Letters Patent. For nonprofits in other regions, reach out to helpdesk@pantheon.io to confirm whether your available documentation meets the criteria to qualify your organization.

To access nonprofit preferred pricing, the organization will either need to 1) purchase their subscription plan through Pantheon’s sales team or through a Pantheon partner, and 2) meet the requirements noted above and provide the requested documentation.

#### Additional Benefit for new Sites on the Platform
All new Pantheon sites with a Performance or Elite annual plan will have a three-month grace period starting with your service start date (the day a site is first  moved from a Sandbox to a commercial plan) where no overages will be incurred.  New sites include any website that has not had a Pantheon subscription during the past 12 months. This allows you the time to get calibrated on the platform and focus on what is most important: the successful launch of your web site(s) on Pantheon!

### Overage Processing

<Alert title="Overage charges temporarily waived" type="danger" >

In response to your feedback, Pantheon has temporarily paused the automated overage program. See [related release note](/release-notes/2024/08/overage-charges-updates).

</Alert>

Overages will be processed on a monthly basis.  All customers subject to overages will be notified immediately. For customers paying monthly by credit card- you can expect to receive an invoice for any site in overage right away.  For customers on an annual contract, overages will be invoiced quarterly (processing in March, June, September and December).  

This is intended to ease the administrative burden that comes with the potential for monthly invoices.  For those contract customers on quarterly invoicing- you will still receive monthly notifications on any overages found for the month so as to keep you informed ahead of final processing and invoicing avoiding any surprises.

#### Avoiding Future Overages
If you have an overage during any particular calendar month, you will be required to pay the one-time overage fee, as the overage fee is based on the unique site visits and the entitlements for the subscription plan that you have in effect at the time of the overage.

To avoid future overage fees, you can [upgrade your plan](/guides/account-mgmt/plans) to a plan that is more appropriate for your current traffic volumes to avoid additional overage fees going forward. This new subscription will apply prospectively and will not retroactively change past overages.

## FAQs
### What environments count towards traffic limits?
Only traffic for the Live environment is counted towards a site plan's traffic limit. Traffic for non-live environments (Dev, Test, and Multidev environments) are not counted towards the plan's traffic limit.

For more specific details on what does and doesn't count towards site plan traffic limits, refer to our documentation for [measuring site traffic](/guides/account-mgmt/traffic#how-do-you-know-if-a-visit-counts).

### Will Pantheon warn me if my site has an overage?
Customers are responsible for monitoring their usage and overage risk using the Site Dashboard. Pantheon periodically reviews customer usage for overages across all plan levels and will contact you directly by email.

### Has the overage policy changed recently?
Yes it has! For detailed comparisons between the old and new overage policies you can refer to this [release note entry](/release-notes/2024/03/overages-policy-change).
