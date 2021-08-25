---
title: Pantheon Disaster Recovery Playbook
subtitle: Planning Ahead
description: Avert potential site failures
generator: pagination
layout: guide
categories: [platform]
tags: [webops, workflow]
contributors: [joshlieb, joa-pan]
reviewed: "2021-07-26"
permalink: docs/guides/disaster-recovery/planning-ahead
anchorid: disaster-recovery
editpath: disaster-recovery/02-planning-ahead.md
---


Disasters are sometimes unavoidable, but steps can be taken to ensure that these incidents are not frequent, reversible, and not destructive.

## Monitor and Optimize Performance
Keep ahead of performance issues by regularly reviewing performance with the [New Relic Application Performance Monitor](https://pantheon.io/docs/new-relic)(APM), included with all non-Basic Site plans. For more information, refer to the [Pantheon New Relic documentation](https://pantheon.io/docs/new-relic).

New Relic also provides a performance monitoring service that can send notification of downtime or degraded performance by email and other channels. Refer to the documentation on [New Relic Alerts](https://docs.newrelic.com/docs/alerts/new-relic-alerts/getting-started/introduction-new-relic-alerts) for more information.

If you have been assigned a Customer Success Manager, you will receive periodic technical reviews. These sessions include training on how to use New Relic to proactively address performance issues.

All sites are different, and there are many different performance issues that can emerge. Review Pantheon's [Optimizing Performance](https://pantheon.io/docs/performance) documentation for tips and troubleshooting techniques for all layers of the platform. 


## Optimize Your Cache Hit Rate
The Pantheon Global CDN delivers pages directly to users from the Varnish edge page cache, and this layer serves both as insulation against unexpected traffic spikes as well as against application and infrastructure issues. 

### Process

*  Determine the extent to which your site usesis utilizing the edge cache by requesting a cache hit rate report from Support. This shows the cache hit rate for the full site on a daily basis.

* Test the cacheability of individual pages by examining the page headers using CURL or developer tools. Refer to [Testing Global CDN Caching](https://pantheon.io/docs/test-global-cdn-caching) for more information. 

* Optimize your caching strategy by checking cookies, application configurations, and session management. Refer to our [Debug Caching Issues](https://pantheon.io/docs/debug-cache) documentation.

* The platform average for site caching is ~80%

* Persistent uptime only works with cacheable content. The higher the caching rate the more protection it will automatically provide you.



## Notify Support of Potential Risks
There are a number of development activities and external events that carry inherent risk. The risk of downtime can be minimized by notifying the support team ahead of time. Events that can be escalated ahead of time include:

* **Traffic Events**: If your site has an Elite site plan and it is expecting elevated traffic, submit a ticket with details about the expected volume, duration, and nature of the traffic. The support engineers will review current performance and determine whether to add additional application servers to support a higher level of concurrent traffic.

* **Deployments**: If you are deploying code to your Live environment and are concerned about potential issues, you can notify support. Use the chat option to quickly get assistance on your site.

* **Launches or Relaunches**: These processes can involve many actors, and with advance notice Customer Success Managers can join launch calls to provide an immediate escalation point in the event something goes wrong. 


## Develop a Disaster Recovery Playbook

Your website may be part of a broader and interconnected ecosystem of web services, apps, and other integrations, and you may be required to develop your own institutional playbook for disaster recovery. These plans will ensure that you and Pantheon are not operating in a vacuum. It also ensures that various scenarios are accounted for and appropriate actions are outlined for each situation.  

