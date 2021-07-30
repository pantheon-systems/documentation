---
title: Horizontal Scalability
description: Learn about scaling web applications and architecture of every Pantheon environment.
categories: [platform]
tags: [billing, launch]
---

Pantheon's distributed infrastructure facilitates horizontal scalability through the automated process of provisioning additional lightweight containers. This allows us to take sites from hundreds of pages served to hundreds of millions without downtime.

## Vertical vs. Horizontal Scalability

**Vertical Scalability**: Reconfigure the existing architecture of a single machine to increase available resources (CPUs, memory, etc.) to scale up

**Horizontal Scalability**: Provision additional containers within a cluster of distributed machines to scale out

Vertical scalability is often used as a starting point for sites running on traditional hosts. Resources are scaled up on a single machine until a cluster-style architecture can be implemented to achieve horizontal scalability. For a site to handle copious amounts of traffic and activity, it must transcend a single server.

In addition to extremely high overhead costs, common pitfalls include:

- Surprise architectural migrations
- Problems with shared instances
- Downtime while someone resizes a server
- One-off science projects to build out your complex snowflake cluster
- Last-minute requests for additional resources

Pantheon eliminates these risks entirely by running sites on a web-scale infrastructure from the start. Provisioning more containers to handle viral traffic happens at the speed of software through an automated process.

## Container Architecture

Pantheon's infrastructure is based on a grid model. Each application container is created with an optimized PHP stack and isolated NGINX, APC cache, and PHP worker agents. Containers automatically bind your site's codebase with a dedicated MySQL container, networked filesystem, and any enabled addon services such as [Redis](/object-cache) and/or [Apache Solr](/solr).

For more information on containers, see [All About Application Containers](/application-containers).

## Add and Remove Application Containers

Add containers by upgrading the site's plan within the Site Dashboard to a Performance Medium plan or higher. If the additional container(s) are no longer needed, simply downgrade the plan within the Site Dashboard to remove.

For more information about your plan changes, see [Manage Plans in the Site Dashboard](/site-plan/#upgrades).
## Handle Traffic Spikes

When preparing for traffic spikes manually (not on Pantheon), you need to decide how to distribute traffic across the available PHP app servers. Open-source tools like Nginx, HAProxy, and Pound can fill this role, but you can also solve this with hardware (e.g. an F5 appliance) or with a cloud-based load balancer (e.g. Amazon’s ELBs).

Pantheon customers don't need to worry about these systems, as the platform is build to scale as needed out of the box.

### Basic Plans

Basic Sites do not have overage protection. If a Basic Site exceeds the 25,000 visit cap in any given month, the site plan will be automatically upgraded to the [Performance plan](https://pantheon.io/plans/performance-pricing) whose visit limit accommodates the site's traffic.

For more information, see [Traffic Limits and Overages](/traffic-limits).

### Performance Plans

On Pantheon, all Performance plans include Overage Protection to prevent one-time traffic spikes from causing billing issues. If the change to traffic behavior is sustained, the site will eventually be moved to the appropriate Performance plan. This provides billing protection against externally driven spikes, or for businesses that have an annual “big event” but otherwise operate at a lower “normal” rate.

### Elite or Contract Plans

Elite sites have the added benefit of managed resource provisioning, both for anticipated and unexpected traffic spikes.

When an Elite site encounters massive sudden or unexpected increases in traffic, the Pantheon platform alerts Pantheon Support, who ensure that the most appropriate level of platform resources are provisioned for the site to handle the traffic spike.

For an anticipated increase in traffic, open a [Support ticket](/support#ticket-support) with the following information:

- **How much extra traffic?**

  Number of Users, Pageviews or Sessions per hour, day, week and month.

- **How much is Anonymous or Authenticated traffic?**

  Aside from the total count, we need to know the ration of Anonymous and Authenticated traffic in order to determine number of visits. There are times that sites can still withstand traffic spikes if majority are Anonymous and cached.

- **What is the timeframe of the campaign or peak traffic?**

  When the campaign is expected to start and end, measured in days.

- **Where is the traffic concentration?**

  Describe if the additional traffic will hit all at once at a specific hour of the day, or be spread throughout business hours, etc. The more descriptive, the easier to determine how to increase resources.

Generally speaking, it is no longer necessary to increase application containers when there is a large increase in mostly anonymous traffic. This is best determined using the information above. We derive the number of *requests per minute* as the basis for the number of servers.

Requests that span more than 3 weeks require approval from the organization or site's Client Sales representative.

## New Relic&reg; Performance Monitoring

Consider enabling New Relic&reg; Performance Monitoring for your site. You'll get access to a wide array of metrics that provide a nearly real-time look into the performance of a web application. Making it easy for you to monitor to your performance, with the added benefit of speeding up the support process by helping our support team visualize corresponding performance and symptoms.

For more information, see [New Relic&reg; Performance Monitoring](/new-relic).

## Managing Temporary Files

The `/tmp` directory is not shared across application containers, making temporary files created by your site's framework inaccessible for requests served by another container. A plan for managing these files should be implemented prior to scaling the site out. For more details, see [Temporary File Management](/tmp).
