---
title: Traffic Limits and Overages
description: Information on how Pantheon measures site traffic
tags: [billing]
categories: []
---
Pantheon defines plan levels based on traffic to help site owners pick the right plan based on expected or historical traffic. To verify that sites receive traffic within their plan limit, we count requests served by the platform from the CMS.

## Overage Protection
All Performance plans include **Overage Protection** to prevent one-time traffic spikes from causing billing issues. If the change to traffic behavior is sustained, the site will eventually be moved to the appropriate Performance plan. This provides protection against externally driven spikes, or for businesses that have an annual “big event” but otherwise operate at a lower “normal” rate.

Basic plan sites do not have this protective feature and would see a change to their bill in the applicable billing period. The overage charge is $2.50 per 1,000 visits (no proration).

## Frequently Asked Questions
### How does Pantheon calculate monthly visits?
{% include("content/traffic-dl.html")%}

For details, see [Metrics in the Site Dashboard](/docs/metrics/).

### What is a traffic spike?
A traffic spike is a pattern of traffic that exceeds the site plan limit and lasts in duration up to the limit defined by plan's Overage Protection, if applicable. For details, see [Pricing Comparison](https://pantheon.io/plans/pricing-comparison){.external}.

### How will Pantheon reach out to me if my site has an overage?
For sites on the Basic plan, overages are charged at the end of the month.

For sites on Performance plans, we will notify you if your site exceeds the limit for the plan. If this happens on the following month, your site will be bumped to the appropriate plan. Overage protection keeps you from being charged in the first month of sustained traffic.

### How will Pantheon let me know my site will automatically be bumped to the next level?
You will receive a communication that you are over on month one, and again on month two when the plan level is changed.

### What is “sustained traffic”?
Sustained traffic is two consecutive months of being over the site plan limit.

### How can I change my Performance size plan if I need to scale up to handle more traffic?
You can upgrade your plan in your dashboard at any time. You may not be able to downgrade to a smaller performance size plan based on your traffic history.

### Why doesn't Pantheon's traffic match my analytics?
There are some inherent limitations with using an analytics suite (e.g. Google Analytics) when measuring site traffic. The following traffic will be collected in our logs, but will not be present in most analytics:

 - API requests and AJAX requests.
 - Browsers/users that block cookies or javascript, including adblockers.
 - Users that close the browser before the tracking script loads.
 - Any page with a JavaScript error.
 - Content pre-fetching, by browsers or [apps](https://www.facebook.com/business/help/1514372351922333){.external}.
 - Automated traffic from bots or load testing.

Finally, analytics implementations can be variable. It may be that your analytics solution isn't tracking all pages served for good reason. For example, you may exclude CMS administrators to give you a view of "visitors only". Misconfiguration may also play a factor.

Due to the fact that analytics doesn't measure _traffic_, it's not a suitable metric for determining platform use/abuse.

### What about static assets?
Static requests (images PDFs, CSS, JS, etc) are not included in our normal traffic metrics. Under regular CMS use-cases, these supporting requests to render HTML pages for users with browsers are not a concern.

However we do reserve the right to review individual sites that are excessive bandwidth consumers. If sites are serving static assets at an excessive rate, this can be considered plan abuse.

### What about bots?
Although it places load on the platform, Pantheon excludes automated traffic from legitimate crawlers and bots that would otherwise count towards your website's total traffic. We do this by examining the user-agent of traffic, as well as the source IP address.

Having high performance responses to crawlers is _beneficial_ to SEO, which is one reson people choose Pantheon, but we respect that you cannot control this kind of traffic. We are continually refining our model to ensure our traffic reports are as accurate as possible.

### What about load tests or penetration tests?
Our onboarding team performs load tests prior to every Elite site launch, and we encourage customers to load test prior to releasing a big update. We also fully support customers who want to penetration test their site, which can result in significant spikes in traffic.

However, if you are load or pen testing in extreme excess of your plan limits, or do so on a regular and repeated basis, we reserve the right to charge for a plan that is appropriate to the load placed on the platform. This is one of the reasons we ask customers to [notify support](/docs/support/) of such tests as a courtesy.

### What about legitimate traffic spikes?
We understand that the internet can make any website famous overnight and that this isn't under your control. Pantheon's platform is specifically designed to shine under this circumstance, and it's one of the main reasons people choose us to run their sites.

Luckily, traffic spikes are easily discerned, and we take this into account when it comes to monitoring plan abuse. However, similar to the above, if a site is achieving internet fame on a regular basis, we reserve the right to right-size the site's plan in relation to the load it puts on the platform.

### What about Denial of Service and other attacks?
We are well aware that malicious actors can create a ton of traffic out of nowhere and that this is not a fair measure of what a customer should pay for. We are more than willing to investigate discrepancies between our traffic measurements and other site analytics on a case by case basis.

As above, in cases where these events are regular or sustained, we reserve the right to right-size a site plan. If a site's real load on the platform is consistently higher than what appears in end-user analytics, fairness demands that the site plan fit its usage.

## See Also
- [New Site Plans FAQs](/docs/new-plans-faq/)
- [Manage Plans in the Site Dashboard](/docs/site-plan/)
- [Billing in the Site Dashboard](/docs/site-billing/)
- [Metrics in the Site Dashboard](/docs/metrics/)
