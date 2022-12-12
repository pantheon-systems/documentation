---
title: Our Platform
description: Learn about the components of the Pantheon platform.
tags: [infrastructure]
contributors: [wordsmither]
permalink: docs/overview/platform
contenttype: [guide]
categories: [overview]
newcms: [--]
audience: [sysadmin]
product: [--]
integration: [--]
---

Our massive, multi-tenant platform uniquely leverages containers on top of a dedicated infrastructure.


## Edge

The Edge is the exterior of Pantheon — the part that directly touches the public internet. The Edge has a built-in, ultra-fast Varnish cache automatically enabled for every site. It improves page load times and helps sites cruise through viral traffic spikes without breaking a sweat. The Edge also knows how to intelligently route and load-balance requests across the entire Runtime Matrix.


## Containers and the Runtime Matrix

<dfn id="containers">Containers</dfn> package code and their dependencies together. We provision isolated Linux containers with an optimized PHP stack in place. 

Each container includes its own Nginx, [APCu cache](/apcu), and PHP worker agent. They are deployed with a checkout of your codebase and service-bindings to use a dedicated MySQL container, networked file filesystem, and optionally Object Cache and Apache Solr search indexing. Refer to our [interactive diagram](https://pantheon.io/features/elastic-hosting) and [All About Application Containers](/application-containers) for more information.

Our Runtime Matrix executes the code for your website. Over a million Linux containers running PHP and NGINX are distributed across a big grid of powerful dedicated machines. These containers are provisioned and managed by our software without any need for manual configuration. Runtime containers "share nothing", but they have connections to services such as:

- [MariaDB](/guides/mariadb-mysql/database-workflow-tool): a horizontally scalable database grid—running the latest MariaDB, that’s similar to the Runtime Matrix in design. The database layer provides redundancy and scalability by supporting a robust replication topology, managed automatically. 

- [Object Cache](/guides/object-cache): Pantheon bundles Object Cache (formerly Redis) as a core service on the platform. Object Cache is a second-generation, in-memory, key-value store with support for structured data. It can accelerate your site’s internal operations through application object caching. This can significantly accelerate dynamic page generation and the logged-in user experience. 

- [Apache Solr](/solr): Pantheon Search is built into our platform using Apache Solr and delivered as a service. We manage the Solr servers, the 100% solid state drives that store all indexes, and we optimize all aspects of the search stack so you can focus your time on optimizing results pages and filters. 

- [Valhalla](/files): Containers are seamlessly integrated with Valhalla, our distributed file system. Valhalla keeps your files in sync across all the containers running your site. 

- [Git Version Control](/guides/git): Pantheon uses Git to make sure all code is stored, versioned, and deployed both safely and predictably.

- [New Relic](/guides/new-relic): New Relic® Performance Monitoring offers a wide array of metrics that provide a nearly real-time look into the performance of a web application. 

Every environment for your site (Dev, Test, Live) runs on its own container. At the Performance Medium level and above, the Test and Live environments have multiple containers.

Refer to [All About Application Containers](/application-containers) for more information.

## Content Management

<dfn id="cms">Content Management (CMS)</dfn> is a software application that allows users to collaborate in the creation, editing, and production of digital content, such as web pages, blog posts, etc. Pantheon supports both Drupal and WordPress, as well as allowing you to run a decoupled CMS.