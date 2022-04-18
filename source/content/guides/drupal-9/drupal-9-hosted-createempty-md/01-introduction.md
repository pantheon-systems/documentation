---
title: Migrate a Site That Was Created with an Empty Upstream to Drupal 9
subtitle: Introduction
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-createempty-md
anchorid: drupal-9-hosted-createempty-md
editpath: drupal-9/drupal-9-hosted-createempty-md/01-introduction.md
---

This guide will show you how to migrate a site that meets the following criteria to Drupal 9:

|Criteria|Value
|---|---
|Pantheon Hosted| Yes
|Site created using:| Empty Upstream
|Multi-Dev Environment | Yes
|Build Tools Workflow Needed | n/a
|Drupal version set to 8| n/a
|Site created before November 2021| Yes

<Alert title="Note" type="info" >

The code samples in this document assume you are not using a [nested docroot](https://pantheon.io/docs/nested-docroot). If are, **you should prepend the paths in this document with "web" as needed**.

</Alert>

## Requirements

<Partial file="drupal-9/upgrade-site-requirements-from-empty.md" />

- You have not set up Continous Integration or you no longer need it. 

- This guide requires [User in Charge](/change-management#site-level-roles-and-permissions) permissions to set the Upstream.

- Ensure the trusted host setting is up-to-date. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

