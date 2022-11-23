---
title: "Traffic"
subtitle: FAQ
description: Frequently asked questions regarding traffic and overages.
tags: [plans]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/account-mgmt/traffic/faq
anchorid: faq
editpath: docs/guides/account-mgmt/traffic/07-faq.md
reviewed: "2022-09-19"
contenttype: guide
categories: [plans]
newcms: [--]
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

<Partial file="traffic-analytics-table.md" />

Analytics implementations can be variable. It may be that your analytics solution isn't tracking all pages served for good reason. For example, you may exclude CMS administrators to give you a view of "visitors only."

Content pre-fetching increasingly plays a role in driving up traffic metrics without having the same impact on visitor-centric analytics. Speculatively loading pages in the background is a common tactic to improve the user experience on the web, which we support people using. However, this does generate more overall traffic from the perspective of the platform.

<Partial file="traffic-overages-faq.md" />
