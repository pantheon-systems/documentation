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

## Terminology

<dl>
    <dt>Application Containers</dt>
    <dd>Each [application container](/application-containers) is a separate deployment of your site's code. All Dev and Test environments for Personal and Performance sites have one container, and Test environments for Business and Elite sites have two containers. The Live environment for Elite sites may be scaled to multiple containers to handle more requests.</dd>
    <dt>PHP Concurrency</dt>
    <dd>The amount of simultaneous processes PHP can run within a given container. The number of requests your website can handle is a product of the number of containers, and each containers' concurrency, as well as your application performance.</dd>
    <dt>PHP Memory Limit (Application Memory Limit)</dt>
    <dd>The maximum amount of memory a single PHP process can use. Exceeding this limit will kill the process, resulting in a failed request from the user's perspective.</dd>
    <dt>MySQL Buffer Pool</dt>
    <dd>The buffer pool is InnoDB's cache for frequently-accessed data in your database. If queries can run out of the buffer alone, they will be dramatically accelerated.</dd>
</dl>
