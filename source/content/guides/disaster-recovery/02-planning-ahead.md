---
title: Pantheon Disaster Recovery Playbook
subtitle: Planning Ahead
description: Avert potential site failures
tags: [webops, workflow]
contributors: [joshlieb, joan-ing]
reviewed: "2024-07-30"
permalink: docs/guides/disaster-recovery/planning-ahead
editpath: disaster-recovery/02-planning-ahead.md
contenttype: [guide]
innav: [false]
categories: [overview]
cms: [--]
audience: [sysadmin]
product: [cdn, newrelic]
integration: [--]
---


Disasters are sometimes unavoidable, but steps can be taken to ensure that these incidents are reversible, not frequent, and not destructive.

## Monitor and Optimize Performance

Keep ahead of performance issues by regularly reviewing performance with the New Relic Application Performance Monitor, included with all non-Basic Site plans. For more information, refer to the [Pantheon New Relic documentation](/guides/new-relic).

New Relic also provides a performance monitoring service that can send notification of downtime or degraded performance by email and other channels. Refer to the documentation on [New Relic Alerts](https://docs.newrelic.com/docs/alerts-applied-intelligence/overview/) for more information.

A dedicated Customer Success Manager (CSM) is included for all Enterprise (contract) Accounts. Dedicated CSMs will meet with you regularly to provide site performance audits. These sessions include training on how to use New Relic to proactively address performance issues.

All sites are different, and there are many different performance issues that can emerge. Review Pantheon's [Optimizing Performance](/performance) documentation for tips and troubleshooting techniques for all layers of the platform.

## Optimize Your Cache Hit Ratio

The Pantheon Global CDN delivers pages directly to users from the Varnish edge page cache, and this layer serves both as insulation against unexpected traffic spikes as well as against application and infrastructure issues.

### Process

* Determine the extent to which your site is using the edge cache by reviewing your cache hit ratio report from the Metrics tab of the Live environment in the Site Dashboard. For more information on metrics in the Site Dashboard, see [Measuring Site Traffic](/guides/account-mgmt/traffic).

* Test the cacheability of individual pages by examining the page headers using curl or developer tools. Refer to [Testing Global CDN Caching](/guides/global-cdn/test-global-cdn-caching) for more information.

* Optimize your caching strategy by checking cookies, application configurations, and session management. Refer to our [Debug Caching Issues](/debug-cache) documentation.

* The platform average for site caching is ~80%

* Experience Protection only works with cacheable content. The higher the caching rate the more protection it will automatically provide you. Refer to [Confirm Experience Protection](/guides/global-cdn/experience-protection) for more information.

## Notify Support of Potential Risks

There are a number of development activities and external events that carry inherent risk. The risk of downtime can be minimized by notifying the support team ahead of time. Events that can be escalated ahead of time include:

* **Traffic Events**: If your site has an Elite site plan and it is expecting elevated traffic, submit a ticket with details about the expected volume, duration, and nature of the traffic. The support engineers will review current performance and determine whether to add additional application servers to support a higher level of concurrent traffic.

* **Deployments**: If you are deploying code to your Live environment and are concerned about potential issues, you can notify support. Use the chat option to quickly get assistance on your site.

* **Launches or Relaunches**: These processes can involve many actors, and with advance notice Customer Success Managers can join launch calls to provide an immediate escalation point in the event something goes wrong.

## Develop a Disaster Recovery Playbook

Your website may be part of a broader and interconnected ecosystem of web services, apps, and other integrations, and you may be required to develop your own institutional playbook for disaster recovery. These plans will ensure that you and Pantheon are not operating in a vacuum. It also ensures that various scenarios are accounted for and appropriate actions are outlined for each situation.
