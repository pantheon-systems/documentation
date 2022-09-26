---
title: Plans
subtitle: Introduction
description: Learn about Pantheon's site plans.
categories: [account-mgmt]
tags: [plans]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/account-mgmt/plans
anchorid: plans
editpath: docs/guides/account-mgmt/plans/01-introduction.md
reviewed: "2022-09-19"
---
Pantheon offers a variety of plans to suit your needs. This section will cover pricing, how to purchase, and how to manage your plan.

Before reading on, we recommend you familiarize yourself with the following terminology.

## Terminology

- <dfn id="appcon">Application Containers</dfn>: Each [application container](/application-containers) is a separate deployment of your site's code. All Dev and Test environments for Personal and Performance sites have one container, and Test environments for Business and Elite sites have two containers. The Live environment for Elite sites may be scaled to multiple containers to handle more requests.

- <dfn id="phpcon">PHP Concurrency</dfn>: The amount of simultaneous processes PHP can run within a given container. The number of requests your website can handle is a product of the number of containers, and each containers' concurrency, as well as your application performance.

- <dfn id="phpmem">PHP Memory Limit (Application Memory Limit)</dfn>: The maximum amount of memory a single PHP process can use. Exceeding this limit will kill the process, resulting in a failed request from the user's perspective.

- <dfn id="bufferpool">MySQL Buffer Pool</dfn>: The buffer pool is InnoDB's cache for frequently-accessed data in your database. If queries can run out of the buffer alone, they will be dramatically accelerated.