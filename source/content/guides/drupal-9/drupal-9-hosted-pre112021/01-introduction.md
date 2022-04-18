---
title: Migrate a Site That Was Created Before November 2011 to Drupal 9
subtitle: Introduction
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-hosted-pre112021
anchorid: drupal-9-hosted-pre112021
editpath: drupal-9/drupal-9-hosted-pre112021/01-introduction.md
---

This guide will show you how to migrate a site that meets the following criteria to Drupal 9:

|Criteria|Value
|---|---
|Pantheon Hosted| Yes
|Site created using:| n/a
|Multi-Dev Environment | n/a
|Build Tools Workflow Needed | n/a
|Drupal version set to 8| n/a
|Site created before November 2021| Yes

Drupal 9 sites created on the platform prior to November 30, 2021 use the [Drupal 9](https://github.com/pantheon-upstreams/drupal-project) upstream. Based on community needs, we have released a new upstream. [Drupal with Composer](https://github.com/pantheon-upstreams/drupal-recommended) is now the default Drupal 9 upstream on the platform and users are encouraged to switch to it to take advantage of the improved structure and updates.

<Alert title="Note" type="info" >

The code samples in this document assume you are not using a [nested docroot](https://pantheon.io/docs/nested-docroot). If are, **you should prepend the paths in this document with "web" as needed**.

</Alert>

## Requirements
This guide requires [User in Charge](/change-management#site-level-roles-and-permissions) permissions to set the upstream.


## See Also

- [Composer Fundamentals and Workflows](/guides/composer)
