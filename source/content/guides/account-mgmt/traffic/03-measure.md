---
title: Traffic
subtitle: Measuring Traffic
description: Learn how Pantheon measures traffic.
categories: [account-mgmt]
tags: [plans]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/account-mgmt/traffic/measure
anchorid: measure
editpath: docs/guides/account-mgmt/traffic/03-measure.md
reviewed: "2022-09-19"
---

The number of unique visits displayed in Pantheon’s Site Dashboard determines the traffic Pantheon will apply for evaluating use on your site under your pricing plan.

## Site Traffic Measurement Model

Pantheon helps ensure your sites are performing at their best by provisioning server-side resources designed to support the traffic associated with your selected pricing plan. When the site traffic consistently exceeds the limits of your plan, Pantheon may automatically adjust you to a pricing plan to better maintain your site performance.

Site traffic consists of two components: **Site Visits** and **Pages Served**. The Site Dashboard gives you immediate access to these metrics, which are refreshed daily. Customers should choose the plan that suits their anticipated traffic and continually monitor that choice using Pantheon's Site Dashboard.

## Traffic Definitions

<Partial file="traffic-dl.md" />

## How Does Traffic Affect Performance?

Each site is provisioned for optimal performance based on the traffic load it is expected to handle. Storage, domains, application memory, application containers and [many other features](/guides/account-mgmt/plans/faq#plan-resources) are set up to handle the traffic expected in each site type. Depending on the type of traffic your site experiences, or if you expect a heavier load of traffic, you may need to increase the plan size so that you can continue to expect a site that runs smoothly.

## Traffic Incidents

Visit our doc on how to [investigate traffic incidents](/guides/account-mgmt/traffic/remedy) for suggestions on how to identify traffic issues and implement a solution.

If there are specific cases that create traffic spikes or events for your site, we encourage you to [contact Pantheon support](/guides/support/contact-support) for more tailored tools to support those issues unique to your site.

<Partial file="traffic-limits-overages.md" />

## FAQ

### What traffic is excluded from Pantheon's metrics?

Certain activities are generally excluded from the calculation of visits and pages served on a case-by-case basis at Pantheon’s discretion, and subject to Pantheon’s [Acceptable Usage Policy](https://legal.pantheon.io) (AUP). Customers may request that Pantheon consider excluding traffic sources by [contacting support](/guides/support/contact-support) if they experience particular issues with configuring their site for any of the following:

- Static Assets
- 404 and other Client Errors
- Bots and Crawlers

<Partial file="traffic-overages-faq.md" />

## More Resources

- [Account Management](/manage)
- [WordPress Best Practices](/wordpress-best-practices/#avoid-xml-rpc-attacks) to disable XML-RPC traffic to your WordPress site
