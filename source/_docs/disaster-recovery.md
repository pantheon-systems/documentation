---
title: Site Disaster Recovery
description: Learn how mission-critical websites can stay online in the event of a total zone failure
earlyaccess: true
earlynote: This documentation covers features and options not available across the entire platform.
tags: [services]
contributors:
 - ari
---

## Overview
Pantheon's Site Disaster Recovery (**DR**) service is designed for mission-critical websites that need to ensure business continuity during the unlikely event of a zone failure. While we can’t prevent disasters from happening, Pantheon has architected a multi-zone, high availability (**HA**) solution with intelligent failover at the Global CDN layer. Disaster Recovery is more than just technology and includes 24/7 support, and a guaranteed 99.95% uptime Service Level Agreement (**SLA**).

![Pantheon Site Disaster Recovery Architecture Diagram](/source/docs/assets/images/site-dr-diagram.jpg)

## Access
Site Disaster Recovery is available for purchase as an add-on to all Elite site plans. It's not available for Elite Starter plans. For more information, please [contact Sales](https://pantheon.io/contact-us).


## How It Works

### High Availability
The Pantheon platform has redundancy built-in throughout our containerized infrastructure. Sites with Disaster Recovery also get a replicated database in an alternative availability zone for even higher availability.

### Intelligent Failover
Pantheon is constantly running infrastructure checks to ensure all systems are running smoothly. If we ever detect elevated error rates in any of our zones, we failover to a backup zone.

### Persistent Zone Coverage
In the event of a zone failure we reroute your site to the backup zone, and provision a new replica in a healthy zone.

### Real-time Failover Support  
Pantheon’s disaster response team will proactively notify you of of a zone failure event and its impact to your site. Your dedicated team will keep clear and transparent lines of communication on any action taken to keep your site online, and is available 24/7 for all of your questions.


## Frequently Asked Questions

### Placeholder question

placeholder answer

## Caveats / Known Issues
While the CMS database is continuously replicated, Pantheon's Solr and Redis services are not.  


## See also
- [Disaster Recovery Webinar - 11/8/2018 ](https://pantheon.io/resources/disaster-recovery-webinar){.external}
