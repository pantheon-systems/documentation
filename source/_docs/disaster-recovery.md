---
title: Site Disaster Recovery
description: Learn how mission-critical websites can stay online in the event of a total zone failure
tags: [services]
---

## Overview
Pantheon's Site Disaster Recovery (**DR**) service is designed for mission-critical websites that need to ensure business continuity during the unlikely event of a zone failure. While we can’t prevent disasters from happening, Pantheon has architected a multi-zone, high availability (**HA**) solution with intelligent failover at the Global CDN layer that can help minimize the effects of an incident.

Disaster Recovery is more than just a combination of technology. It includes 24/7 support and a guaranteed 99.95% uptime Service Level Agreement (**SLA**) to keep sites from going down, and to actively respond to any incident that might occur.

![Pantheon Site Disaster Recovery Architecture Diagram](/source/docs/assets/images/site-dr-diagram.png)

## Access
Site Disaster Recovery is available for purchase as an add-on to all Elite site plans except Elite Starter. For more information, please [contact Sales](https://pantheon.io/contact-us){.external}.

## Features

### High Availability
The Pantheon platform has redundancy built-in throughout our containerized infrastructure. In addition, sites with Disaster Recovery get a replicated database in an alternative availability zone for even higher availability.

### Intelligent Failover
Pantheon is constantly running infrastructure checks to ensure all systems are running smoothly. If we ever detect elevated error rates in any of our zones, we failover to a backup zone.

### Persistent Zone Coverage
In the event of a zone failure we reroute your site to the backup zone and provision a new replica in a healthy zone.

### Real-time Failover Support
Pantheon’s disaster response team will proactively notify you of a zone failure event and its impact to your site. Your dedicated team will keep clear and transparent lines of communication on any action taken to keep your site online, and is available 24/7 for all of your questions.

## Limitations
Redis and Solr are not currently supported on DR-enabled sites. See our documentation on how to [safely remove Redis](/docs/redis/#safely-remove-redis) and how to safely remove Solr for [Drupal 8](/docs/solr-drupal-8/#safely-remove-solr), [Drupal 7](/docs/solr-drupal-7/#safely-remove-solr), and [WordPress](/docs/wordpress-solr/#safely-remove-solr).

## See also
- [Disaster Recovery Webinar - 11/8/2018 ](https://pantheon.io/resources/disaster-recovery-webinar){.external}
