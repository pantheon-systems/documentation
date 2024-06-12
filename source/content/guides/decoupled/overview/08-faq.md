---
title: Pantheon Front-End Sites
subtitle: Frequently Asked Questions
description: Learn about frequently asked questions for Pantheon's decoupled architecture using Front-End Sites.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, joan-ing]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/overview/faq
reviewed: "2023-03-23"
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides answers to frequently asked Front-End Site questions.

### Can I use any CMS with Pantheon architecture for Front-End Sites?

WordPress and Drupal are currently supported by Pantheon Front-End Sites.

### What dependency versions are supported with Front-End Sites?

Pantheon Front-End Sites currently supports:

- Gatsby v4 or higher
- Next.js v12 or higher
- Drupal 9 or higher
- WordPress 5.9 or higher

### Is Decoupled Site Preview available for all instances on Front-End Sites?

Decoupled Site Preview is only available for sites using Next.js as a frontend framework.

### Can I Use Cloudflare with Front-End Sites?

Yes. You can configure Cloudflare's CDN as an additional layer on Pantheon's Global CDN service. You must follow the [Option 2](/cloudflare#option-2-use-cloudflares-cdn-stacked-on-top-of-pantheons-global-cdn) instructions outlined in the [Cloudflare Domain Configuration](/cloudflare) documentation.

### Is Multi-Region Failover available with Front-End Sites?

Multi-Region Failover and Pantheon's Multizone Failover are only available for General Availability.

### Is Multidev compatible with Front-End Sites?

Yes, Multidev is compatible with Front-End Sites. Refer to [Types of Environments](/guides/decoupled/overview/considerations#types-of-environments) and [Front-End Sites Multidev Development Workflow](/guides/decoupled/overview/considerations#front-end-sites-multidev-development-workflow) for more information.

### Is Advanced Global CDN (AGCDN) compatible with Front-End Sites?

Yes, [AGCDN](/guides/agcdn) is compatible with Front-End Sites. [Contact Support](/guides/support/contact-support/) to get assistance adding AGCDN to your Front-End Site.

### Can I transfer a Front-End site from one Org to another Org?

Yes. [Contact Support](/guides/support/contact-support/) to request that your Front-End site be transferred from one Org to another.
