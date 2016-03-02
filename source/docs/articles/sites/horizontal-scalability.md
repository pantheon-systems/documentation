---
title: Horizontal Scalability
description: Learn about scaling web applications and architecture of every Pantheon environment.
category:
  - developing
keywords: scalability, wordpress, pantheon
---
Pantheon's distributed infrastructure facilitates horizontal scalability through the automated process of provisioning additional lightweight containers. This allows us to take sites from hundreds of pageviews to hundreds of millions of pageviews without downtime.

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

Pantheon's infrastructure is based on a grid model. Each application container is created with an optimized PHP stack and isolated NGINX, APC cache, and PHP worker agents. Containers automatically bind your site's codebase with a dedicated MySQL container, networked filesystem, and any enabled addon services such as [Redis](/docs/articles/sites/redis-as-a-caching-backend) and/or [Apache Solr](/docs/articles/sites/apache-solr).

For more information on containers, see [All About Application Containers](/docs/articles/sites/all-about-application-containers/).

## Add and Remove Application Containers
Add containers by upgrading the site's plan within the Site Dashboard to a Business plan or higher. If the additional container(s) are no longer needed, simply downgrade the plan within the Site Dashboard to remove.

The platform does not assume when additional containers are added or removed in response to traffic and/or resource consumption.

## New Relic
Consider enabling New Relic as an add-on service for your site within the Site Dashboard. You'll get access to a wide array of metrics that provide a nearly real-time look into the performance of a web application. Making it easy for you to monitor to your performance, with the added benefit of speeding up the support process by helping our support team visualize corresponding performance and symptoms.

For more information, see [New Relic Performance Analysis on Pantheon](/docs/articles/sites/newrelic/new-relic-performance-analysis/).

## Handle Traffic Spikes
You'll need to decide how to distribute traffic across the available PHP app servers. Open-source tools like Nginx, HAProxy, and Pound can fill this role, but you can also solve this with hardware (e.g. an F5 appliance) or with a cloud-based load balancer (e.g. Amazon’s ELBs).

## Managing Temporary Files
The `/tmp` directory is not shared across application containers, making temporary files created by your site's framework inaccessible for requests served by another container. A plan for managing these files should be implemented prior to scaling the site out. For more details, see [Temporary File Management with Multiple Application Containers](/docs/articles/sites/files/temp-files).
