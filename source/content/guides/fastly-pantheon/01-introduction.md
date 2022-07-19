---
title: Fastly on Pantheon
subtitle: Introduction
description: Learn more about using Fastly on Pantheon.
categories: [develop]
tags: [cms, logs, cdn]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/fastly-pantheon
anchorid: fastly-pantheon
---

Pantheon offers extensive content delivery network (CDN) features through our [Global CDN](/guides/global-cdn/) and [Advanced Global CDN](/guides/professional-services/advanced-global-cdn). Pantheon also partners with [Fastly](https://www.fastly.com/) 
if you prefer to use a CDN outside of the Pantheon platform. Using Fastly can be a good option if you are looking for log or media storage integration solutions. 

Using Fastly on the Pantheon platform to manage your site provides: 

- Integration with:

    - [Amazon S3](https://aws.amazon.com/)
    - [Datadog](https://www.datadoghq.com/)
    - [New Relic](/new-relic)
    - [SFTP](https://docs.fastly.com/en/guides/log-streaming-sftp)
    - [Splunk](https://www.splunk.com/)
    - [Syslog](https://docs.fastly.com/en/guides/log-streaming-syslog)
    - And other [Fastly logging endpoints](https://docs.fastly.com/en/guides/integrations#_logging-endpoints)

- Enhanced Caching at the edge, including API responses. This allows you to see traffic and deployment changes, and improves continuous integration/continuous delivery (CI/CD).

- Image Optimizer (IO) as an add-on that renders images using high-density CHI metro points of presence (POPs) that cache content for longer times and serve millions of image variations. Serving from the edge in this way offloads work from your servers and improves your site's performance. IO supports several formats, including animated GIFs.

## Take Advantage of Fastly on Pantheon 

Fastly can be used with the [Global CDN](/guides/global-cdn) that comes automatically with your Pantheon account. Log extracts can be requested from your Customer Success Engineer. Standard analytics include all pages requested, but will not include service calls and other traffic that does not load the tracking script.

Key content to review in your log report include:

- Disproportionate patterns of requests and 404s, which indicate possible exploits.

- Too many requests to the index paths may indicate a volumetric attack against the domain.

- Heavy requests to administrative and login paths may indicate a generalized CMS exploit attempt.

- Known exploit and excess traffic paths.

You can refer to the following docs for common caching issues:

- [Caching: Advanced Topics](/caching-advanced-topics)
- [Debug Common Cache Busters](/guides/frontend-performance/caching#troubleshoot-caching-issues)
- [Traffic Limits and Overages](/traffic-limits)

You should consult the [Edge Integrations Guide](/guides/edge-integrations/) and complete the appropriate configuration for your WordPress or Drupal site if you plan on using content personalization in addition to Fastly.

## More Resources

- [Edge Integrations](/guides/edge-integrations/)

- [New Relic](/new-relic)

- [Pantheon Global CDN](/guides/global-cdn/) - Learn about the Global CDN that comes with all Pantheon sites.

- [Professional Services](/guides/professional-services) - Learn all the great services our expert team can provide.

- [Log Files on Pantheon](/logs)

- [Fastly](https://explore.fastly.com)
