---
title: Site Plans FAQs
description: Find answers to common questions related to Pantheon's site plans.
categories: [manage]
tags: [billing]
searchboost: 70
reviewed: "2020-04-23"
---

## List and Preferred Pricing

<dl>

<dt ignored>List Price</dt>

<dd>

Set price for new sites created after November 15, 2018 that aren’t purchased via a qualified agency partner.

</dd>

<dt ignored>Preferred Price</dt>

<dd>

Preferred pricing is available via qualified [Agency Partners](https://pantheon.io/plans/partner-program?docs). Visit our [Preferred Pricing page](https://pantheon.io/plans/agency-preferred-pricing) for more information.

</dd>

</dl>

| Plan                 | Preferred Price | List Price  |
| -------------------- | --------------- | ----------- |
| Basic                | $35             | $50         |
| Performance (Small)  | $125            | $175        |
| Performance (Medium) | $225            | $300        |
| Performance (Large)  | $450            | $600        |
| Performance (XL)     | $750            | $1,000      |

## Annual Billing

Pantheon offers [annual billing plans at lower rates](/annual-billing), giving up to two month's worth of savings.

| Plan                 | Preferred Annual Price | Annual Savings  |
| -------------------- | ---------------------- | --------------- |
| Basic                | $350                   | $70             |
| Performance (Small)  | $1375                  | $125            |
| Performance (Medium) | $2475                  | $225            |
| Performance (Large)  | $4950                  | $450            |
| Performance (XL)     | $8250                  | $750            |

## Plan Resources

|                        | Basic        | Performance Small |  Performance Medium  | Performance Large | Performance Extra Large |
| ---------------------- | ------------ | ----------------- | -------------------- | ----------------- | ----------------------- |
| Application Containers |      1       | 1                 |       2              | 3                 | 4                       |
| PHP Workers            |      4       | 8                 |       16             | 24                | 32                      |
| PHP Memory Limit       |    256MB     | 256MB             |       512MB          | 512MB             | 512MB                   |
| Storage                |     20GB     | 30GB              |       50GB           | 100GB             | 200GB                   |
| Custom Domain Limit (per site) <Popover content="For details, see <a href='/docs/domains/#custom-domains'>Domains and Redirects</a>." />   | 5 | 10 | 15 | 35 | 70 |
| Free and managed HTTPS <Popover content="For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>." />                   | <span style="color:green">✔</span> | <span style="color:green">✔</span> | <span style="color:green">✔</span> | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
| New Relic <Popover content="For details, see <a href='/docs/new-relic/'>New Relic APM Pro</a>." />                                         | ❌ | <span style="color:green">✔</span> | <span style="color:green">✔</span> | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
| Redis <Popover content="For details, see <a href='/docs/object-cache/'>Object Cache (formerly Redis) for Drupal or WordPress</a>." />                           | ❌ | <span style="color:green">✔</span> | <span style="color:green">✔</span> | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
| Solr <Popover content="For details, see <a href='/docs/solr/'>Apache Solr on Pantheon</a>." />                                             | ❌ | <span style="color:green">✔</span> | <span style="color:green">✔</span> | <span style="color:green">✔</span> | <span style="color:green">✔</span> |

<Alert title="Note" type="info">

If the number of custom domains on a site exceeds that allowed by the new site plan, the site will be migrated to the next largest site plan that matches the number of custom domains used.

</Alert>

## Frequently Asked Questions

### Can I host more than one site on an individual plan?

No. Each online site plan is tied to a single install of the CMS.

### Does Pantheon offer discounting for buying sites in bulk?

Yes. If you are interested in bulk pricing, [Contact our sales team](https://pantheon.io/contact-us?docsplanFAQ) or your dedicated account manager to discuss.

### What if my site's metrics exceed the limit of the Performance Extra Large Plan?

The Performance Extra Large Plan allows for 300,000 monthly visits and 1.5 million monthly page views. High traffic sites should be moved to an Elite plan. To learn about moving to an [Elite Plan](https://pantheon.io/plans/elite?docsplanFAQ), please [contact us](https://pantheon.io/contact-us?docsplanFAQ).

If you exceed the Performance Extra Large plan limits of 300,000 monthly visits or 1.5 million page views, your site will be upgraded to a Performance 2X Large Plan, which has a limit of 600,000 monthly visits and 3 million monthly page views. The 2X Large plan is not available for purchase via the Dashboard, but can be applied by our Support team. Prices for the 2X Large plan are as follows:

| Payment Type      | Price            |
|:----------------- |:---------------- |
| List Monthly      |  $1,500          |
| List Annual       |  $16,500         |

Note that the annual plan prices are listed as annual cost.

## See Also

- [Manage Plans in the Site Dashboard](/site-plan)
- [Traffic Limits and Overages](/traffic-limits)
- [Metrics in the Site Dashboard](/metrics)
