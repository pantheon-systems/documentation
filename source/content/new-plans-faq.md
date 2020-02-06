---
title: New Site Plans FAQs
description: Find answers to common questions related to Pantheon's new site plans and pricing changes.
tags: [billing]
categories: [manage,go-live]
searchboost: 70
---
## Impacted Sites
New plans and pricing will impact new and existing sites purchased online via the Site Dashboard. Plan changes described on this page do not affect annual contract customers such as EDU+, Enterprise, Pantheon One, Elites and Resellers.

For more information on the announcement of new plans, see [this related blog post](https://pantheon.io/blog/announcing-new-online-site-plans).

## List and Preferred Pricing

<dl>

<dt>List Price</dt>

<dd>

Set price for new sites created after November 15, 2018 that aren’t purchased via a qualified agency partner.

</dd>

<dt>Preferred Price</dt>

<dd>

Introductory price available to the general public until November 15, 2018, after which it will be exclusively available via qualified [Agency Partners](https://pantheon.io/plans/partner-program?docs). Visit our [Preferred Pricing page](https://pantheon.io/plans/agency-preferred-pricing) for more information.

</dd>

</dl>

| Plan                 | Preferred Price | List Price  |
| -------------------- | --------------- | ----------- |
| Basic                | $35             | $50         |
| Performance (Small)  | $125            | $175        |
| Performance (Medium) | $225            | $300        |
| Performance (Large)  | $450            | $600        |
| Performance (XL)     | $750            | $1,000      |

### Annual Billing
Pantheon offers [annual billing plans at lower rates](/annual-billing), giving up to two month's worth of savings.

| Plan                 | Preferred Annual Price | Annual Savings  |
| -------------------- | ---------------------- | --------------- |
| Basic                | $350                   | $70             |
| Performance (Small)  | $1375                  | $125            |
| Performance (Medium) | $2475                  | $225            |
| Performance (Large)  | $4950                  | $450            |
| Performance (XL)     | $8250                  | $750            |

## Frequently Asked Questions

### How do I get Preferred Pricing?
For sites purchased before August 1, 2018, Preferred Pricing will be locked in as long as the site remains on that plan. Otherwise, Preferred Pricing is available for sites purchased through a qualified agency partner.

### When will prices change for existing sites?
During the month of August, 2018, sites on legacy plans were automatically switched to a new equivalent plan. All sites switched over should have retained Preferred Pricing for the new plan for as long as they remain on that plan.

### To what new plans are legacy plans automatically migrated?
All existing sites will have Preferred Pricing locked in for the plan they migrate to, and will retain the preferred price as long as they stay on that plan.

| Legacy Plan | New Plan            | Preferred Price  |
| ------------| --------------------| ---------------- |
| Personal    | Basic               | $35              |
| Pro         | Performance (Small) | $125             |
| Business    | Performance (Large) | $450             |
| Business XL | Performance (XL)    | $750             |


<Alert title="Note" type="info">

Sites retaining [Legacy SSL](/https/#technical-specifications) services will be migrated to Performance Large plans or above.

</Alert>

### Are legacy plans still available?
No new sites can be created on legacy plans outside of existing contracted agreements. The legacy plans are no longer available for purchase online.

### Will I be able to keep Preferred Pricing after November?
All existing sites as of early November (legacy & new) will lock in Preferred Pricing, regardless of whether they are associated with a qualified agency partner.

In late November all new online site plan purchases will be at list price unless purchased through a qualified agency.

### What action do I need to take on existing sites?
No action is required. Existing sites will automatically switch to the equivalent plan with Preferred Pricing locked in August. There is no downtime or maintenance window associated with this change.

### What are the resource comparisons between new and legacy plans?

<TabList>

<Tab title="Personal" id="personal" active={true}>

|                        | Personal (Legacy) | Basic (New)  |
| ---------------------- | ----------------- | ------------ |
| Application Containers |        1          |      1       |
| PHP Workers            |        4          |      4       |
| PHP Memory Limit       |      256MB        |    256MB     |
| Storage                |       5GB	       |     20GB     |
| Custom Domain Limit (per site) <Popover content="For details, see <a href='/docs/domains/#custom-domains'>Domains and Redirects</a>." />   | 5 | 5 |
| Free and managed HTTPS <Popover content="For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>." />                   | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
| New Relic <Popover content="For details, see <a href='/docs/new-relic/'>New Relic APM Pro</a>." />                                         | <span style="color:green">✔</span> | ❌ |
| Redis <Popover content="For details, see <a href='/docs/redis/'>Installing Redis on Drupal or WordPress</a>." />                           | ❌ | ❌ |
| Solr <Popover content="For details, see <a href='/docs/solr/'>Apache Solr on Pantheon</a>." />                                             | ❌ | ❌ |
| Multidev <Popover content="<a href='/docs/multidev/'>Multidev</a> is available to all Enterprise organizations, EDU organizations, Pantheon Partners, and Direct Online customers with Gold support." /> | ❌ | ❌ |

</Tab>

<Tab title="Professional" id="professional">

|                        | Professional (Legacy) | Performance Small (New)  |
| ---------------------- | --------------------- | ------------------------ |
| Application Containers |          1            |            1             |
| PHP Workers            |          8            |            8             |
| PHP Memory Limit       |         256MB         |          256MB           |
| Storage                |         20GB          |          30GB            |
| Custom Domain Limit (per site) <Popover content="For details, see <a href='/docs/domains/#custom-domains'>Domains and Redirects</a>." />| 25 | 10 |
| Free and managed HTTPS <Popover content="For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>." />                | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
| New Relic <Popover content="For details, see <a href='/docs/new-relic/'>New Relic APM Pro</a>." />                                      | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
| Redis <Popover content="For details, see <a href='/docs/redis/'>Installing Redis on Drupal or WordPress</a>." />                        | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
| Solr <Popover content="For details, see <a href='/docs/solr/'>Apache Solr on Pantheon</a>." />                                          | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
| Multidev <Popover content="<a href='/docs/multidev/'>Multidev</a> is available to all Enterprise organizations, EDU organizations, Pantheon Partners, and Direct Online customers with Gold support." /> | ❌ | ❌ |

</Tab>

<Tab title="Business" id="business">

|                        | Business (Legacy)     | Performance Large (New)  |
| ---------------------- | --------------------- | ------------------------ |
| Application Containers |           2           |           3              |
| PHP Workers            |           16          |          24              |
| PHP Memory Limit       |         512MB         |         512MB            |
| Storage                |         30GB          |         100GB            |
| Custom Domain Limit (per site) <Popover content="For details, see <a href='/docs/domains/#custom-domains'>Domains and Redirects</a>." />| 100 | 35 |
| Free and managed HTTPS <Popover content="For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>." />                | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
| New Relic <Popover content="For details, see <a href='/docs/new-relic/'>New Relic APM Pro</a>." />                                      | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
| Redis <Popover content="For details, see <a href='/docs/redis/'>Installing Redis on Drupal or WordPress</a>." />                        | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
| Solr <Popover content="For details, see <a href='/docs/solr/'>Apache Solr on Pantheon</a>." />                                          | <span style="color:green">✔</span> | <span style="color:green">✔</span> |
| Multidev <Popover content="<a href='/docs/multidev/'>Multidev</a> is available to all Enterprise organizations, EDU organizations, Pantheon Partners, and Direct Online customers with Gold support." /> | <span style="color:green">✔</span> | ❌ |

</Tab>

</TabList>

<Alert title="Note" type="info">

If the number of custom domains on a site exceeds that allowed by the new site plan, the site will be migrated to the next largest site plan that matches the number of custom domains used.

</Alert>

### Am I going to lose New Relic?
Basic site plans will not have access to New Relic. If you are using New Relic on a Personal plan currently, you will lose access when your site plan migrates to a Basic plan on your monthly billing date, on or after August 1st.

If you upgrade to a Performance plan before August 1st, you will keep New Relic access and lock in Preferred Pricing.

### Why are you removing New Relic access from the Basic plan?
The Basic plan is aimed at use cases concerned primarily with getting page caching working, and those sites without any high-performance goals that New Relic can help debug. If you have performance goals for your site, you should consider a Performance plan of the appropriate size.

### Will I lose Multidev?
New plans do not impact feature access for Multidev. If you have it now, you'll continue to have it on the new plans.

### As an agency, how am I affected by these plan changes?
Our new pricing and packaging was built with agencies in mind. All of your client sites will get Preferred Pricing locked in automatically on August 1st, so there’s no need to worry about your current sites.

After August 1st, Preferred Pricing will only be available via qualifying agency partners, providing clear value for purchasing a Pantheon site plan via an agency. Stay tuned for details on our soon-to-be announced Partner Program.

### As a contract customer, how am I affected by these plan changes?
Current contract customers such as EDU+, Enterprise, Pantheon One, Elites and Resellers are not affected. Stay tuned for details on our soon-to-be announced Partner Program.

### Is Elite Pricing changing in any way?
No. These new pricing changes only affect online site plans (previously named Personal, Professional, and Business). If you have a contract with Pantheon, your contract will not change.

### Can I host more than one site on an individual plan?
No. Each online site plan is tied to a single install of the CMS.

### Does Pantheon offer discounting for buying sites in bulk?
Yes. If you are interested in bulk pricing, [Contact our sales team](https://pantheon.io/contact-us?docsplanFAQ) or your dedicated account manager to discuss.

### How do I purchase one of the new plans?
For details, see [Manage Plans in the Site Dashboard](/site-plan).

## See Also
- [Manage Plans in the Site Dashboard](/site-plan)
- [Traffic Limits and Overages](/traffic-limits)
- [Metrics in the Site Dashboard](/metrics)
