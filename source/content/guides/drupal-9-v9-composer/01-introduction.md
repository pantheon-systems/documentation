---
title: Migrate a Drupal 9 Site from Another Platform to Drupal 9
subtitle: Introduction
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-v9-composer
anchorid: drupal-9-v9-composer
editpath: drupal-9-v9-composer/01-introduction.md
---

This guide will show you how to migrate a site that meets the following criteria to Drupal 9:

|Criteria|Value
|---|---
|Pantheon Hosted| No
|Drupal Version| 9
|Dependency Manager| Composer
|Custom Upstream| No

## Important Notes

Integrated Composer sites require a [nested docroot](/nested-docroot) architecture. When copying code from the former platform site, be sure to retain the new site's nested docroot structure and `web` docroot name.

## Requirements

Before you continue, confirm that your site meets the following requirements:

- The existing Drupal 9 site uses Composer to manage site dependencies
- Able to get a local copy of the existing site / access to a Git repository of it?