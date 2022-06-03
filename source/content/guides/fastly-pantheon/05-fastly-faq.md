---
title: Fastly on Pantheon
subtitle: Review FAQs About Fastly on Pantheon
description: Get answers to your Fastly on Pantheon questions. 
categories: [develop]
tags: [cms]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/fastly-pantheon/fastly-faq
anchorid: fastly-faq
---

This section provides answers to frequently asked questions about using Fastly on Pantheon.

## How Can I Test My Fastly Caching Features?

You can test your Fastly caching features by [confirming that your experience protection works](/global-cdn#confirm-that-experience-protection-works).

## Do I Still Get Global CDN Now That I Have AGCDN for Fastly?

Yes, [Global CDN](/global-cdn) is included free of charge for all Pantheon customers. This enables customers to render pages with speed by caching responses at the edge with over 70 Fastly points of presence.

## Who sets up the Fastly edge configuration files?

Advanced Global CDN is supported by Pantheon’s experienced [Professional Services](/guides/professional-services) team, who can set up, configure, and maintain your Fastly edge configurations.

## Why is the timeout still set to 59 seconds, after setting up the time out for 120 seconds?

All web requests are set to 59 seconds. Fastly's GCDN terminates the request if the backend does not respond after 59 seconds. PHP will continue to process the request until it hits the PHP `max_execution_time`, however the results will not be relayed to the user browser, because the connection has already terminated.

All non-web requests, such as those that do not pass Fastly's CDN, have a maximum timeout of 120 seconds. This includes requests from Terminus or PHP scripts via SSH.

<Alert title="Note"  type="info" >

The request will timeout at 59 seconds if it passes through port 80 and 443. 

</Alert>

