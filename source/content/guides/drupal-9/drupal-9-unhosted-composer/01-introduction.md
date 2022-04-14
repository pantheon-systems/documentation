---
title: Migrate a Composer Managed Drupal 9 Site from Another Platform
subtitle: Introduction
description: Learn how to migrate a site that's hosted on another platform to Drupal 9
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-unhosted-composer
anchorid: drupal-9-unhosted-composer
editpath: drupal-9/drupal-9-unhosted-composer/01-introduction.md
---

This guide will show you how to migrate a site that meets the following criteria to Drupal 9:

|Criteria|Value
|---|---
|Pantheon Hosted| No
|Composer Managed| Yes

# Requirements

Integrated Composer sites require a [nested docroot](/nested-docroot) architecture. When copying code from the former platform site, be sure to retain the new site's nested docroot structure and `web` docroot name.

Before you continue, confirm that your site meets the following requirements:

- The existing Drupal 9 site uses Composer to manage site dependencies
- You can get a local copy of the existing site / access to a Git repository of it

This doc uses the following aliases:

- **Alias:** `SITE`
- **Old site folder** `FORMER-PLATFORM`
