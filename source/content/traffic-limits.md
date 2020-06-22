---
title: Traffic Limits and Overages
description: Information on how Pantheon measures site traffic in visits and pages served.
categories: [performance]
tags: [billing, measure, traffic]
reviewed: "2020-06-22"
---

Pantheon’s customers generate the most value from WebOps, and an essential component of our WebOps platform is ensuring the uptime and performance of your site. Pantheon optimizes for site traffic based on your choice of pricing plan, and we deploy backend resources to support your continued success.

The number of unique visits displayed in Pantheon’s Site Dashboard determines the traffic Pantheon will apply for evaluating use on your site under your pricing plan. Our [Metrics in the Site Dashboard](/metrics) doc outlines available traffic metrics, where to find them in the Dashboard, and why they [rarely match other analytics](#why-doesnt-pantheons-traffic-metrics-match-my-other-analytics) like Google Analytics.

## Site Traffic Measurement Model

Pantheon helps ensure your sites are performing at their best by provisioning server-side resources designed to support the traffic associated with your selected pricing plan. When the traffic to sites consistently exceeds the limits of your plan, Pantheon may automatically adjust you to a pricing plan to better maintain your site performance.

Site traffic consists of two components: Site Visits and Pages Served. The Site Dashboard gives you immediate access to these metrics that are refreshed daily. Customers should choose the plan that suits their anticipated traffic and continually monitor that choice using Pantheon's Site Dashboard.

## Traffic Metrics

<Partial file="traffic-dl.md" />

## How does traffic affect performance?

Each site is provisioned for optimal performance based on the traffic load it is expected to handle. Storage, domains, application memory, application containers and many other features are set up to handle the traffic expected in each site type. Depending on the type of traffic your site experiences or if you expect a heavier load of traffic, you will need to increase the plan size so that you can continue to expect a site that runs smoothly.

## Measurement of Traffic

### Traffic Metrics

**Measurement**. Pantheon defines “visits” in the Site Dashboard as set out above under “Site Visits.”

**Exclusions**. The traffic measurement model above describes those interactions specifically excluded. Inherent in our model is customer feedback and requests for Pantheon to consider additional exclusions by [contacting support](/support) if they experience issues with their site for any of the following:

- **Static Assets**: Static requests (images, PDFs, CSS, JS, etc) are not included in traffic metrics reporting on the Site Dashboard. Under regular CMS use cases, these supporting requests to render HTML pages for users with browsers are not a concern.
- **Excessive Bandwidth Usage**: Individual sites consuming excessive bandwidth may be contacted separately by Pantheon for monitoring and actions required to address any plan abuse.
- **404 and Other Client Errors**: Pantheon only counts pages returned with [200-level](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_Success) HTTP response codes in traffic metrics. The platform does not count "redirects" which are returned as [300-level](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#3xx_Redirection) responses, and "client errors," which are returned as [400-level](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_errors) responses, as part of plan traffic limits.
- **Bots and Crawlers*:
  - A high-performance response to crawlers supports SEO, which is one of the reasons Pantheon is a platform of choice for our customers. Although it places load on the platform, Pantheon excludes select automated traffic from legitimate crawlers and bots that would otherwise count towards your website's total traffic. See above definition of Visits regarding the combination of datasets to determine traffic metrics. Pantheon excludes certain activity on your Site Dashboard (e.g., Google bot user agent).
  - Some bots and crawlers present themselves as end-user browsers. This makes their behavior difficult to distinguish from human end users. Some bots exhibiting this behavior, while they claim to be regular browsers, remain distinctive enough to exclude from billing.

If there are specific cases that create traffic spikes or events for your site, we encourage you to contact Pantheon support for more tailored tools to support those issues unique to your site.

Visit our doc on how to [investigate traffic incidents](/optimize-site-traffic) for suggestions on how to identify traffic issues and implement a solution.

## Frequently Asked Questions

### Where can I manage my plan along with my site traffic?

Your [Pantheon Site Dashboard](/metrics) includes site traffic, measured against your plan, and information on pages served and unique visits specifically. You can [upgrade your plan](/site-plan) from the Site Dashboard at any time.

### How can I change my Performance plan if I need to scale up to handle more traffic?

You can [upgrade your plan](/site-plan) in the Site Dashboard at any time. Pantheon understands usage levels may vary for some of our customers, but if you're experiencing sustained traffic that's higher than your plan limit, you can update your plan yourself.

### Why doesn't Pantheon's traffic metrics match my other analytics?

Website traffic is an important indicator of a successful website. Analytics suites (e.g. Google Analytics, Similarweb, Mixpanel) each serve a different purpose from Pantheon’s Site Dashboard.

Pantheon tracks every single request to the platform. In contrast, analytics tools will typically only track complete "pageviews" on an HTML page containing a tracking snippet that can fire off a subsequent request to the analytics platform.

This table shows some of the reasons why traffic in the Dashboard may differ from your analytics suite:

<Partial file="traffic-analytics-table.md" />

For example, the following traffic will be collected in our logs, but will not be present in most analytics:

- API requests (e.g. XML-RPC, which can be [disabled in WordPress](/wordpress-best-practices#avoid-xml-rpc-attacks) and was removed from Drupal 8 core) and AJAX requests.
- Users with adblocking or with browsers features that block cookies or javascript (like Private or Incognito modes)
- Users that close the browser before the tracking script loads.
- A page where there is no tracking code, or where a javascript error prevents the tracking code from firing.
- Automated traffic from bots or load testing.
- Content pre-fetching by browsers or [apps](https://www.facebook.com/business/help/1514372351922333).

Analytics implementations can be variable. It may be that your analytics solution isn't tracking all pages served for good reason. For example, you may exclude CMS administrators to give you a view of "visitors only".

Content pre-fetching increasingly plays a role in driving up traffic metrics without having the same impact on visitor-centric analytics. Speculatively loading pages in the background is a common tactic to improve the user experience on the web, which we support people using. However, this does generate more overall traffic from the perspective of the platform.

### What traffic is excluded from Pantheon's metrics?

Certain activities are generally excluded from the calculation of visits and pages served on a case-by-case basis at Pantheon’s discretion, and subject to Pantheon’s [Acceptable Usage Policy](https://legal.pantheon.io) (AUP). Customers may request that Pantheon consider excluding traffic sources by [contacting support](/support) if they experience particular issues with configuring their site for any of the following: Static Assets; 404 and other Client Errors; Bots and Crawlers.

### What about load tests or penetration tests?

Load tests and other performance reviews of the Pantheon platform are generally prohibited by our AUP. Although it may result in significant traffic spikes, Pantheon fully supports customers choosing to load test their site (excluding the platform). Contact Pantheon Support prior to performing such tests to make them aware there will be an extraordinary event. You should contact Pantheon support prior to performing such tests to make us aware there will be an extraordinary event to be sure we consider this for overages.

If you identify an underlying issue that may affect the platform, please let us know. If an issue is identified with your codebase, Pantheon is here to help. We can recommend a Partner or connect you with our [Professional Services](/professional-services) team to help you with remediation.

### What about Denial of Service and other attacks?

Malicious actors can create unplanned events in traffic, and this is not a fair measure of value a customer receives from our platform. We ask that customers help us identify and support the investigation of these issues. On a case by case basis, Pantheon may choose to waive overages in its judgment weighing factors such as how many clients are affected, to what degree could this have been addressed by customers, and how uniquely Pantheon is positioned to help our customers resolve these issues.

Malicious actors are different from unwanted traffic, which may be unique to a customer’s preferences for the targeted audience of their site. From a traffic measurement perspective, Pantheon is focused on omitting traffic that is objectively malicious.

## See Also

- [Site Plans FAQs](/site-plans-faq)
- [Manage Plans in the Site Dashboard](/site-plan)
- [Billing in the Site Dashboard](/site-billing)
- [Metrics in the Site Dashboard](/metrics)
- [WordPress Best Practices](/wordpress-best-practices/#avoid-xml-rpc-attacks) to disable XML-RPC traffic to your WordPress site
