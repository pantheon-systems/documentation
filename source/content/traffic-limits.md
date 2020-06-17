---
title: Traffic Limits and Overages
description: Information on how Pantheon measures site traffic
tags: [billing]
categories: [manage,go-live]
reviewed: "2020-02-26"
---
Pantheon defines plan levels based on traffic to help site owners pick the right plan based on expected or historical traffic. To verify that sites receive traffic within their plan limit, we count requests served by the platform. Our [Metrics in the Site Dashboard](/metrics) outlines available traffic metrics, where to find them in the Dashboard, and why they [rarely match other analytics](#why-doesnt-pantheons-traffic-metrics-match-my-other-analytics) like Google Analytics.

## Overage Protection
All Performance plans include **Overage Protection** to prevent one-time traffic spikes from causing billing issues. If the change to traffic behavior is sustained, the site will eventually be moved to the appropriate Performance plan. This provides billing protection against externally driven spikes, or for businesses that have an annual “big event” but otherwise operate at a lower “normal” rate.

Basic plan sites do not have this protective feature and would see a change to their bill in the applicable billing period. The overage charge is $2.50 per 1,000 visits (no proration).

## Traffic Metrics

<Partial file="traffic-dl.md" />

For details, see [Metrics in the Site Dashboard](/metrics).

Visit our doc on how to [investigate traffic incidents](/optimize-site-traffic) for suggestions on how to identify traffic issues and implement a solution.

### Traffic Spikes
A traffic spike is a pattern of traffic that exceeds the site plan limit and lasts in duration up to the limit defined by plan's Overage Protection, if applicable. For details, see [Pricing Comparison](https://pantheon.io/plans/pricing-comparison).

### Sustained Traffic
Sustained traffic is two consecutive months of being over the site plan limit.

### Static Assets
Static requests (images PDFs, CSS, JS, etc) are not included in our normal traffic metrics. Under regular CMS use-cases, these supporting requests to render HTML pages for users with browsers are not a concern.

However we do reserve the right to review individual sites that are excessive bandwidth consumers. If sites are serving static assets at an excessive rate, this can be considered plan abuse.

### 404s and Other Client Errors
Pantheon only counts pages returned, considered [`200` level](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_Success), in traffic metrics. The Platform does not count "redirects" which are returned as [`300` level](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#3xx_Redirection) and "client errors," which are returned as [`400` level](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_errors), as part of plan traffic limits.

### Bots and Crawlers
Although it places load on the platform, Pantheon excludes automated traffic from legitimate crawlers and bots that would otherwise count towards your website's total traffic. We do this by examining the user-agent of traffic, as well as the source IP address.

Having high performance responses to crawlers is _beneficial_ to SEO, which is one reason people choose Pantheon, but we respect that you cannot control this kind of traffic. We are continually refining our model to ensure our traffic reports are as accurate as possible. If you've encountered a bot or crawler that we should consider blocking Platform-wide, please [contact support](/support).

To block specific bots and crawlers from your site, [add them to `robots.txt`](/bots-and-indexing#indexing-your-pantheon-site) or [use PHP to block specific User Agents](/optimize-site-traffic#block-user-agents-in-drupal-or-wordpress).

## Frequently Asked Questions

### How will Pantheon reach out to me if my site has an overage?
For sites on the Basic plan, overages are charged at the end of the month.

For sites on Performance plans, we will notify you if your site exceeds the limit for the plan. If this happens on the following month, your site will be bumped to the appropriate plan. Overage protection keeps you from being charged in the first month of sustained traffic.

### How will Pantheon let me know my site will automatically be bumped to the next level?
You will receive a communication that you are over on month one, and again on month two when the plan level is changed.

### What if my site's metrics exceed the limit of the Performance Extra Large Plan?
The Performance Extra Large Plan allows for 300,000 monthly visits and 1.5 million monthly page views. High traffic sites should be moved to an Elite plan. To learn about moving to an Elite Plan, please [contact us](https://pantheon.io/contact-us?docs).

If you need time or are unable to commit to an annual contract, sites that exceed the Performance Extra Large limits will be upgraded to a Performance 2X Large Plan, which has a limit of 600,000 monthly visits and 3 million monthly page views. The 2X Large plan is not available for purchase via the Dashboard, but can be applied by our Support team. Prices for the 2X Large plan are as follows:

| Payment Type      | Price            |
|:----------------- |:---------------- |
| List Monthly      |  $2,000          |
| List Annual       |  $22,000         |

Note that the annual plan prices are listed as annual cost.

### How can I change my Performance size plan if I need to scale up to handle more traffic?
You can upgrade your plan in your dashboard at any time. You may not be able to downgrade to a smaller performance size plan based on your traffic history.

### Why doesn't Pantheon's traffic metrics match my other analytics?

Analytics suites (like Google Analytics) are measuring fundamentally different things when compared to Pantheon's request log. While analytics suites focus on measuring _visits_, our request log more comprehensively measures _traffic_.

We track every single request to the platform, whereas analytics tools will typically only track complete "pageviews" where an HTML page including a tracking snippet is completely loaded by a browser and can fire off a subsequent request to the analytics platform.

For example, the following traffic will be collected in our logs, but will not be present in most analytics:

- API requests (e.g. XML-RPC, which can be [disabled in WordPress](/wordpress-best-practices#avoid-xml-rpc-attacks) and was removed from Drupal 8 core) and AJAX requests.
- Users with adblocking or with browsers features that block cookies or javascript (like Private or Incognito modes)
- Users that close the browser before the tracking script loads.
- A page where there is no tracking code, or where a javascript error prevents the tracking code from firing.
- Automated traffic from bots or load testing.
- Content pre-fetching by browsers or [apps](https://www.facebook.com/business/help/1514372351922333).

This table helps show why traffic in the Dashboard may differ from your analytics suite:

<Partial file="traffic-analytics-table.md" />

Analytics implementations can be variable. It may be that your analytics solution isn't tracking all pages served for good reason. For example, you may exclude CMS administrators to give you a view of "visitors only".

Content pre-fetching increasingly plays a role in driving up traffic metrics without having the same impact on visitor-centric analytics. Speculatively loading pages in the background is a common tactic to improve the user experience on the web, which we support people using. However, this does generate more overall traffic from the perspective of the platform.

### What about load tests or penetration tests?
We encourage customers to load test prior to releasing a big update. We also fully support customers who want to penetration test their site, which can result in significant spikes in traffic.

However, if you are load or pen testing in extreme excess of your plan limits, or do so on a regular and repeated basis, we reserve the right to charge for a plan that is appropriate to the load placed on the platform.

If you identify a platform issue, please let us know. If an issue is identified with your codebase, we can recommend a Partner or connect you with our Professional Services team to help you with remediation.

### What about legitimate traffic spikes?
We understand that the internet can make any website famous overnight and that this isn't under your control. Pantheon's platform is specifically designed to shine under this circumstance, and it's one of the main reasons people choose us to run their sites.

Luckily, traffic spikes are easily discerned, and we take this into account when it comes to monitoring plan abuse. However, similar to the above, if a site is achieving internet fame on a regular basis, we reserve the right to right-size the site's plan in relation to the load it puts on the platform.

### What about Denial of Service and other attacks?
We are well aware that malicious actors can create a ton of traffic out of nowhere and that this is not a fair measure of what a customer should pay for. We are more than willing to investigate discrepancies between our traffic measurements and other site analytics on a case by case basis.

As above, in cases where these events are regular or sustained, we reserve the right to right-size a site plan. If a site's real load on the platform is consistently higher than what appears in end-user analytics, fairness demands that the site plan fit its usage.

## See Also

- [Site Plans FAQs](/site-plans-faq)
- [Manage Plans in the Site Dashboard](/site-plan)
- [Billing in the Site Dashboard](/site-billing)
- [Metrics in the Site Dashboard](/metrics)
- [WordPress Best Practices](/wordpress-best-practices/#avoid-xml-rpc-attacks) to disable XML-RPC traffic to your WordPress site
