---
title: Horizontal Scalability
description: Learn about scaling web applications and architecture of every Pantheon environment.
category:
  - developing
keywords: scalability, wordpress, pantheon
---
Pantheon site architecture and automation allows site owners to accommodate increasing traffic to web servers by adding additional nodes running PHP and NGINX. This article covers issues in scaling web applications, reviews the consistent infrastructure and architecture of every Pantheon environment, and explains common pitfalls we see based on assumed vertical scaling.

## Vertical vs. Horizontal Scaling

**Vertical scaling** means that you scale by adding more resources or power to your single machine (e.g. CPU, RAM), and is limited to a single machine.

**Horizontal scaling** means that you scale by adding more node or machines.

The key to running a site that can handle a large amount of traffic consistently, without risking downtime, is an elastic architecture. Simply put, this means the ability to run the website on many machines at once. Your website must transcend a single server in order to scale. With an elastic architecture, you can provision more machines to run your website when traffic increases. When traffic has calmed down, you can save resources and turn off your extra capacity. Without an elastic architecture, your website is inherently not scalable.

## Container Architecture

Pantheon's infrastructure is based on a grid model. We serve our customers by provisioning isolated linux container with an optimized PHP stack in place. Each container includes its own NGINX, APC cache, and PHP worker agent. They are deployed with a checkout of your codebase and service-bindings to use a dedicated MySQL container, networked file filesystem, and optionally Redis object cache and Apache Solr search indexing.

For more information on containers, see [All About Application Containers](/docs/articles/sites/all-about-application-containers/).

## Add and Remove Application Servers

## New Relic
New Relic offers a wide array of metrics that provide a nearly real-time look into the performance of a web application. Enabling New Relic on Pantheon not only makes it easy for you to monitor to your performance, but it can also speed-up the support process by helping our support team visualize corresponding performance and symptoms.

For more information, see [New Relic Performance Analysis on Pantheon](/docs/articles/sites/newrelic/new-relic-performance-analysis/).

## Handle Traffic Spikes
You'll need to decide how to distribute traffic across the available PHP app servers. Open-source tools like Nginx, HAProxy, and Pound can fill this role, but you can also solve this with hardware (e.g. an F5 appliance) or with a cloud-based load balancer (e.g. Amazon’s ELBs).

## Managing Temporary Files
One of WordPress’s most important functions is managing media (images, documents, etc ) that go along with posts. These are placed in the `uploads` area of `wp-content`, but in order to make WordPress horizontally-scalable, you must find a way for uploads to be available to all PHP App servers. Open-source tools like GlusterFS, NFS, and Ceph are common answers, and Amazon’s EFS is an option in that cloud ecosystem.
