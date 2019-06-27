---
title: Site Disaster Recovery
description: Learn how mission-critical websites can stay online in the event of a total zone failure
tags: [services]
---

## Overview
Pantheon's [Site Disaster Recovery](https://pantheon.io/features/disaster-recovery){.external} (**DR**) service is designed for mission-critical websites that need to ensure business continuity during the unlikely event of a zone failure. While Pantheon can’t prevent disasters from happening, we have architected a multi-zone, high availability (**HA**) solution with intelligent failover at the Global CDN layer that can help minimize the effects of an incident.

Disaster Recovery is more than just a combination of technology. It includes 24/7 support and a guaranteed 99.99% uptime Service Level Agreement (**SLA**) to keep sites from going down, and to actively respond to any incident that might occur.

### RPO and RTO - Minutes to Recovery

With Disaster Recovery in place, Pantheon monitors datacenter health and proactively manages failover to avoid or minimize data loss.

Recovery Point Objective (**RPO**) is a baseline of reasonably acceptable data loss in the event of a major outage. In short, think “lost transactions.” The RPO is largely determined by whether there is replication lag or not, which can result from heavy transactional load on the site’s database. We rarely see replication lag, and when we do, we have automated tools to rebuild the site’s replica and alert our team if a site is consistently experiencing replication lag. This way, we can proactively notify you so you can work toward a solution. For sites with DR enabled, Pantheon’s RPO is 5 minutes.

Recovery Time Objective (**RTO**) is the target amount of time within which a business process must be restored after a disaster in order to avoid unacceptable consequences from a break in business continuity. In short, think “time down.” For sites with DR enabled, Pantheon’s RTO is 15 minutes.

## Access
Site Disaster Recovery is available for purchase as an add-on to all Elite site plans except Elite Starter. For more information, please [contact Sales](https://pantheon.io/contact-us){.external}.

![Pantheon Site Disaster Recovery Architecture Diagram](/source/docs/assets/images/site-dr-diagram.png)

## Features

### High Availability
The Pantheon Platform has redundancy built-in throughout our containerized infrastructure. In addition, sites with Disaster Recovery get a replicated database in an alternative availability zone for even higher availability.

### Intelligent Failover
Pantheon is constantly running infrastructure checks to ensure all systems are running smoothly. If we ever detect elevated error rates in any of our zones, we failover to a backup zone.

### Persistent Zone Coverage
In the event of a zone failure we reroute your site to the backup zone and provision a new replica in a healthy zone.

### Real-time Failover Support
Pantheon’s disaster response team will proactively notify you of a zone failure event and its impact to your site. Your dedicated team will keep clear and transparent lines of communication on any action taken to keep your site online, and is available 24/7 for all of your questions.

## Redis & Disaster Recovery Best Practices
Redis cache is not preserved after a site failover. This means you must ensure that the site can handle having its cache dropped under regular visitor traffic in order for the site to operate as expected in a failover scenario.

To test in a Test Environment, click the **Clear Caches** button in the upper right hand corner of the Site Dashboard.
You can also [connect to your Redis instance](/docs/redis/#use-the-redis-command-line-client) and run the `flushall` command to clear Redis cache via the Redis CLI.

If you rely on the Redis cache for locks (mutexes) or storing other long-term data, you must move them out of Redis and into the database to avoid any issues when the Redis cache is dropped during failover.

## Limitations
Solr is not currently supported on DR-enabled sites. See our documentation on how to safely remove Solr for [Drupal 8](/docs/solr-drupal-8/#safely-remove-solr), [Drupal 7](/docs/solr-drupal-7/#safely-remove-solr), and [WordPress](/docs/wordpress-solr/#safely-remove-solr).

## See also
- [Disaster Recovery Webinar - 11/8/2018 ](https://pantheon.io/resources/disaster-recovery-webinar){.external}
