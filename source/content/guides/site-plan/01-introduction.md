---
title: Site Plans on Pantheon
subtitle: Introduction
description: Learn more about the Site Plans available on Pantheon.
categories: [platform]
tags: [billing, dashboard, site]
contributors: [cityofoaksdesign, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/site-plan
anchorid: site-plan
---

Pantheon offers several site plans to accomodate wide-ranging needs for all users. The platform resources provided to your website depend on your current plan. The table below provides an overview of Pantheon plan resources.

## Plan Resources

|                                                                                                                                                | Basic                                     | Performance Small                         | Performance Medium                        | Performance Large                         | Performance Extra Large                   | Elite                                     |
|------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------|-------------------------------------------|-------------------------------------------|-------------------------------------------|-------------------------------------------|-------------------------------------------|
| Application Containers                                                                                                                         | 1                                         | 1                                         | 2                                         | 3                                         | 4                                         | 4+                                        |
| PHP Workers                                                                                                                                    | 4                                         | 8                                         | 16                                        | 24                                        | 32                                        | Managed<br />Scaling                      |
| PHP Memory Limit                                                                                                                               | 256MB                                     | 256MB                                     | 512MB                                     | 512MB                                     | 512MB                                     | 512MB                                     |
| Storage                                                                                                                                        | 20GB                                      | 30GB                                      | 50GB                                      | 100GB                                     | 200GB                                     | 200GB+                                    |
| Custom Domain Limit (per site) <Popover   content = "For details, see <a href='/docs/domains/#custom-domains'>Domains and Redirects</a>."  />  | 5                                         | 10                                        | 15                                        | 35                                        | 70                                        | 270                                       |
| Free and managed HTTPS <Popover   content = "For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>."  />                  | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| New Relic <Popover   content = "For details, see <a href='/guides/new-relic/'>New Relic APM Pro</a>."  />                                        | ❌                                         | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| Object Cache <Popover   content = "For details, see <a href='/docs/object-cache/'>Object Cache (formerly Redis) for Drupal or WordPress</a>."  />     | ❌                                         | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| Pantheon Search (Solr) <Popover   content = "For details, see <a href='/docs/solr/'>Pantheon Search (formerly Pantheon Solr)</a>."  />                                            | ❌                                         | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |

<Alert title="Note" type="info">

If the number of custom domains on a site exceeds that allowed by the new site plan, the site will be migrated to the next largest site plan that matches the number of custom domains used.

</Alert>

## Legacy Platform Resources

<Alert title="Legacy Site Plans Only" type="info">

This section reflects resources for legacy site plans. Sites that have been upgraded or launched to our new plans should refer to [Site Plan Resources](/guides/site-plan) for current information.

</Alert>

The platform resources provided to your website depend on your current plan. Pantheon can scale instantly, so changing your service level will immediately change your resources to the values for the new plan, as shown in the table below.

|                                | Personal                                               | Professional                                           | Business                                               | Elite                                                  |
|--------------------------------|--------------------------------------------------------|--------------------------------------------------------|--------------------------------------------------------|--------------------------------------------------------|
| Application Containers         | 1                                                      | 1                                                      | 2                                                      | 4+                                                     |
| PHP Concurrency                | 4                                                      | 8                                                      | 8                                                      | 8                                                      |
| PHP Memory Limit               | 256MB                                                  | 256MB                                                  | 512MB                                                  | 512MB <Popover   content = "Up to 1024MB is available for certain Elite plans.[Learn more about Pantheon Elite Plans](https://pantheon.io/pantheon-elite-plans) and contact Sales for information about plans with custom resources." />                                                                                       |
| MySQL Buffer Pool              | 128MB                                                  | 512MB           | 1024MB                                                 | 2014MB+                                                |
| Storage                        | 5GB                                                    | 20GB                                                   | 30GB                                                   | 100GB+                                                 |
| Custom Domain Limit (per site) <Popover content="For details, see <a href='/docs/domains/#custom-domains'>Domains and Redirects</a>." /> | 5                                                      | 25                                                     | 100                                                    | 200                                                    |
| Free and managed HTTPS <Popover content="For details, see <a href='/docs/https/'>HTTPS on Pantheon's Global CDN</a>." />        | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span>| <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| New Relic <Popover content="For details, see <a href='/guides/new-relic/'>New Relic APM Pro</a>." />                     | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| Object Cache  <Popover content="For details, see <a href='/docs/object-cache/'>Object Cache (formerly Redis) for Drupal or WordPress</a>." />                 |                                                        | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |
| Multidev <Popover content="All sites associated with an organization have access to <a href='/docs/multidev/>Multidev</a> regardless of plan." />                      |                                                        |                                                        |<span  style= " color:green " > ✔ </span> | <span  style= " color:green " > ✔ </span> |

## List and Preferred Pricing

<dl>

<dt ignored>List Price</dt>

<dd>

Set price for new sites created after November 15, 2018 that aren’t purchased via a qualified agency partner.

</dd>

<dt ignored>Preferred Price</dt>

<dd>

Preferred pricing is available via qualified [Agency Partners](https://pantheon.io/plans/partner-program?docs). Visit our [Preferred Pricing page](https://pantheon.io/plans/agency-preferred-pricing) for more information about pricing, or use the [Partner Agency Directory](https://directory.pantheon.io/agencies?docs) to find an agency.

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

## Glossary

This guide uses various site plan and site management terms. Terms and definitions are provided below.

### Glossary

**Application Containers**: Each [application container](/application-containers) is a separate deployment of your site's code. All Dev and Test environments for Personal and Performance sites have one container, and Test environments for Business and Elite sites have two containers. The Live environment for Elite sites may be scaled to multiple containers to handle more requests.

**PHP Concurrency**: The amount of simultaneous processes PHP can run within a given container. The number of requests your website can handle is a product of the number of containers, and each containers' concurrency, as well as your application performance.

**PHP Memory Limit (Application Memory Limit)**: The maximum amount of memory a single PHP process can use. Exceeding this limit will kill the process, resulting in a failed request from the user's perspective.

**MySQL Buffer Pool**: The buffer pool is InnoDB's cache for frequently-accessed data in your database. If queries can run out of the buffer alone, they will be dramatically accelerated.

## More Resources

- [Site Plans FAQ](/guides/site-plan/site-plans-faq) 