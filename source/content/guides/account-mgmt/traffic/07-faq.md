---
title: "Traffic"
subtitle: FAQ
description: Frequently asked questions regarding traffic and overages.
tags: [faq, traffic]
contributors: [wordsmither]
showtoc: true
permalink: docs/guides/account-mgmt/traffic/faq
editpath: docs/guides/account-mgmt/traffic/07-faq.md
reviewed: "2022-09-19"
contenttype: [guide]
innav: [false]
categories: [plans]
cms: [--]
audience: [sysadmin]
product: [--]
integration: [--]
---

### Why doesn't Pantheon's traffic metrics match my other analytics?

Website traffic is an important indicator of a successful website. Analytics suites (e.g. Google Analytics, Similarweb, Mixpanel) each serve a different purpose from Pantheon’s Site Dashboard.

<Alert title="Note"  type="info" >

Google Analytics doesn’t count most bots and search engines because it's a metric of visitors and not data transfer. AJAX requests and other requests that aren't from a browser may not be counted because Google Analytics only counts actual pages loaded in a browser.

</Alert>

Pantheon tracks every single request to the platform. In contrast, analytics tools will typically only track complete "pageviews" on an HTML page containing a tracking snippet that can fire off a subsequent request to the analytics platform.

This table shows some of the reasons why traffic in the Dashboard may differ from your analytics suite:

|                                                 | Counts as Traffic | Counts for Analytics |
|:------------------------------------------------|:-----------------:|:--------------------:|
| **API Request**                                 |        Yes        |          No          |
| **Automated traffic from bots or load testing** |        Yes        |       Sometimes      |
| **Content pre-fetching**                        |        Yes        |       Sometimes      |
| **Pages without a tracking asset**              |        Yes        |          No          |
| **User closes browser before tracking loads**   |        Yes        |          No          |
| **User with adblocker enabled**                 |        Yes        |       Sometimes      |

Analytics implementations can be variable. It may be that your analytics solution isn't tracking all pages served for good reason. For example, you may exclude CMS administrators to give you a view of "visitors only."

Content pre-fetching increasingly plays a role in driving up traffic metrics without having the same impact on visitor-centric analytics. Speculatively loading pages in the background is a common tactic to improve the user experience on the web, which we support people using. However, this does generate more overall traffic from the perspective of the platform.

### What environments count towards traffic limits?
Only traffic for the Live environment is counted towards a site plan's traffic limit. Traffic for non-live environments (Dev, Test, and Multidev environments) are not counted towards the plan's traffic limit.  

<Partial file="traffic-overages-faq.md" />
