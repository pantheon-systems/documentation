---
title: Site Plans FAQs
description: Find answers to common questions related to Pantheon's site plans and pricing.
tags: [billing]
categories: []
searchboost: 70
---

## List and Preferred Pricing

<DefList>

<Definition name="List Price">

Set price for new sites created after November 15, 2018 that aren’t purchased via a qualified agency partner.

</Definition>

<Definition name="Preferred Price">

Introductory price available to the general public until November 15, 2018, after which it will be exclusively available via qualified [Agency Partners](https://pantheon.io/agencies/partner-program). Visit our [Preferred Pricing page](https://pantheon.io/plans/agency-preferred-pricing) for more information.

</Definition>

</DefList>


| Plan                 | Preferred Price | List Price  |
| -------------------- | --------------- | ----------- |
| Basic                | $35             | $50         |
| Performance (Small)  | $125            | $175        |
| Performance (Medium) | $225            | $300        |
| Performance (Large)  | $450            | $600        |
| Performance (XL)     | $750            | $1,000      |

### Annual Billing
Pantheon offers [annual billing plans at lower rates](/docs/annual-billing/), giving up to two month's worth of savings.

| Plan                 | Preferred Annual Price | Annual Savings  |
| -------------------- | ---------------------- | --------------- |
| Basic                | $350                   | $70             |
| Performance (Small)  | $1375                  | $125            |
| Performance (Medium) | $2475                  | $225            |
| Performance (Large)  | $4950                  | $450            |
| Performance (XL)     | $8250                  | $750            |

## View Service Configuration Details

### MySQL
For a comprehensive list of MySQL settings, [access your database](/docs/mysql-access/) and issue the [SHOW VARIABLES;](https://dev.mysql.com/doc/refman/5.7/en/show-variables.html) query.

### Redis
Get your Redis connection string by going to the **Site Dashboard > Environment (e.g. Dev) > Connection Info**, and then run: `<your redis string> config get *memory*`

### PHP
See [Securely Working with phpinfo](/docs/phpinfo#drupal-note) for ways to view your specific PHP configuration.

## Calculate Concurrent User / Dynamic Page Capacity

<Alert title="Warning" type="danger">

This following content is considered deprecated. Refer to [Traffic Limits and Overages](/docs/traffic-limits/) for updated information on how Pantheon defines plans and site traffic.

</Alert>

One common need in determining a plan level is calculating the amount of concurrent traffic a site can handle, especially when all or some of the traffic cannot be handled by caching.

The first thing you must know is how fast your site responds to dynamic (uncached) page requests. Take the product of your containers and concurrency, and divide by that value to give you your max dynamic requests per second:

`Containers * Concurrency / Average Page Response = Dynamic Capacity`

So on a Personal plan, if your site responds in 750ms on average, your dynamic capacity would be about 5 requests per second:

`1 * 4 / 0.75 = 5.333`

Calculating what this means for logged in users can be done by making a "time between clicks" estimate so you can understand how many requests per second the average user generates.

`Containers * Concurrency / Average Page Response * Time Between Clicks = User Capacity`

The amount of time between users clicking (i.e. how frequently they need a new page) will vary a lot depending on your use case, but it's important to make an estimate.

Example:
If you're running an interactive user forum on a Business plan, you've tuned your site and know that your average backend response time is around 1500ms. You also know that broadly speaking the average user clicks a new link once every 20 seconds. Using this formula tells you that your Business plan should max out at around 200 concurrent users:

`20 / 1.5 * 2 * 8 = 213`

## Frequently Asked Questions (FAQs)

#### Are these the complete specs and memory for my site?
There are many "under the hood" configuration values not show here, but these are the most important values for understanding whether or not Pantheon will fit for a given site.

#### Is memory shared between containers?
No, your database and application container resources are not shared. They operate in their own Linux user space with their own memory.

#### Are the specs the same for all three environments (Dev/Test/Live)?
Yes they have the same infrastructure; however, Live environments on Business plans and above have multiple application containers, while Dev and Test environments have only one.
## Frequently Asked Questions

### How do I get Preferred Pricing?
For sites purchased before August 1, 2018, Preferred Pricing will be locked in as long as the site remains on that plan. Otherwise, Preferred Pricing is available for sites purchased through a qualified agency partner.

### Can I host more than one site on an individual plan?
No. Each online site plan is tied to a single install of the CMS.

### Does Pantheon offer discounting for buying sites in bulk?
Yes. If you are interested in bulk pricing, [Contact our sales team](https://pantheon.io/contact-us?docsplanFAQ) or your dedicated account manager to discuss.

### Are these the complete specs and memory for my site?
There are many "under the hood" configuration values not show here, but these are the most important values for understanding whether or not Pantheon will fit for a given site.

### Is memory shared between containers?
No, your database and application container resources are not shared. They operate in their own Linux user space with their own memory.

#### Are the specs the same for all three environments (Dev/Test/Live)?
Yes they have the same infrastructure; however, Live environments on Business plans and above have multiple application containers, while Dev and Test environments have only one.

## See Also
- [Manage Plans in the Site Dashboard](/docs/site-plan/)
- [Traffic Limits and Overages](/docs/traffic-limits/)
- [Metrics in the Site Dashboard](/docs/metrics/)
