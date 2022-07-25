---
title: Platform Overview
description: Learn about the components of the Pantheon platform.
categories: [overview]
tags: [infrastructure]
contributors: [wordsmither]
permalink: docs/overview/platform
---

Unlike traditional hosting, Pantheon delivers truly elastic hosting through automation in software. Our massive, multi-tenant platform uniquely leverages containers on top of a dedicated infrastructure.

## Edge

The Edge is the exterior of Pantheon — the part that directly touches the public internet. The Edge has a built-in, ultra-fast Varnish cache automatically enabled for every site. It improves page load times and helps sites cruise through viral traffic spikes without breaking a sweat. The Edge also knows how to intelligently route and load-balance requests across the entire Runtime Matrix.

## Containers

Pantheon's infrastructure is based on a grid model. We serve our customers by provisioning isolated Linux containers with an optimized PHP stack in place. Each container includes its own Nginx, [APCu cache](/apcu), and PHP worker agent. They are deployed with a checkout of your codebase and service-bindings to use a dedicated MySQL container, networked file filesystem, and optionally Object Cache and Apache Solr search indexing. See our [interactive diagram](https://pantheon.io/features/elastic-hosting) to learn more about Pantheon's infrastructure.

Every environment for your site (Dev, Test, Live) runs on its own container. At the Performance Medium level and above, the Test and Live environments have multiple containers.

See [All About Application Containers](/application-containers) for more information.



## Runtime Matrix

Our Runtime Matrix is where the action happens: it executes the code for your website. Over a million Linux containers running PHP and NGINX are distributed across a big grid of powerful dedicated machines. These containers are provisioned and managed by our software without any need for manual configuration. 

The essence of a runtime container is a highly tuned PHP-FPM worker and its connections to the outside world. Incoming requests come via NGINX, which handles requests for static assets and passes dynamic requests to PHP. Runtime containers are "share nothing", but they have connections to services such as:

- [MariaDB](/database-workflow): Every website needs a database, and we fulfill this need with a horizontally scalable database grid—running the latest MariaDB—that’s similar to the Runtime Matrix in design. The database layer provides redundancy and scalability by supporting a robust replication topology, managed automatically. 

- [Object Cache](/object-cache): Pantheon bundles Redis as a core service on the platform. Redis is a second-generation, in-memory, key-value store with support for structured data. It can accelerate your site’s internal operations through application object caching. This can significantly accelerate dynamic page generation and the logged-in user experience. 

- [Apache Solr](/solr): Pantheon Search is built into our platform using Apache Solr and delivered as a service. We manage the Solr servers, the 100% solid state drives that store all indexes, and we optimize all aspects of the search stack so you can focus your time on optimizing results pages and filters. No administration is necessary. 

- [Valhalla](/files): Pantheon’s highly available containers are seamlessly integrated with Valhalla, our disaster-proof distributed file system. Valhalla keeps your files in sync across all the containers running your site. 

- [Git Version Control](https://pantheon.io/docs/guides/git): Pantheon provides industry standard version control with Git. Pantheon uses Git to make sure all code is stored, versioned, and deployed both safely and predictably. We also give you the power of feature branching through Multidev. Git is an open source version control system. It’s fast, secure, and reliable, and supports both simple versioning or complex, distributed, non-linear workflows for hundreds of contributors.

- [New Relic](https://pantheon.io/docs/new-relic): New Relic® Performance Monitoring offers a wide array of metrics that provide a nearly real-time look into the performance of a web application. Using New Relic not only makes it easy for you to monitor your performance, but it can also speed up the support process by helping our support team visualize corresponding performance and symptoms.
