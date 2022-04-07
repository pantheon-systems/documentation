---
title: Migrate a Drupal 8 Site to Drupal 9
subtitle: Introduction
description: Learn how to migrate a Drupal 8 Site to Drupal 9
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-v8
anchorid: drupal-9-v8
editpath: drupal-9-v8/01-introduction.md
---

This guide will show you how to migrate a site that meets the following criteria to Drupal 9:

|Criteria|Value
|---|---
|Pantheon Hosted| Yes
|Drupal Version| 8
|Dependency Manager| None
|Custom Upstream| No

The goal of this upgrade is to set the Drupal core dependency to Drupal 9. This upgrade allows Composer to manage dependencies in the new site.

<Alert title="Note" type="info" >
This upgrade migrates your existing site to a new site. The new site will not maintain your site's existing commit history.
</Alert>

## Requirements

<Partial file="drupal-9/upgrade-site-requirements.md" />




<Alert title="Multidev Required" type="danger">

To maintain best practices and to avoid difficult, time-consuming repairs to the site, this doc is written for users with access to Pantheon's [Multidev](/multidev) feature.

Pantheon support is not available to users who avoid the Multidev steps.

</Alert>

If your site is not currently Composer-managed, follow the steps in the [Composer Conversion Guide](/guides/composer-convert) to ensure that your site is ready for migration to Drupal 9.


## See Also

- [Composer Fundamentals and Workflows](/guides/composer)
