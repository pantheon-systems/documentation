---
title: Migrate a Drupal 8 Site to Drupal 9
subtitle: Introduction
description: Learn how to migrate a Drupal 8 Custom Upstream to Drupal 9
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
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
|Custom Upstream| Yes

The process is similar to the [Upgrade Pantheon Drupal 8 Sites to Drupal 9 With Integrated Composer](/guides/drupal-9-migration/upgrade-to-d9) guide, except that you will stay on Drupal 8 with some special considerations for Custom Upstreams, and can defer the Drupal 9 upgrade to later.

From a local clone of the site, you will replace the entire site's file structure with the code from Pantheon's Integrated Composer upstream, then re-add your contrib and custom code to the new codebase. Then, you will create Multidev environments on individual sites for testing and apply any site-specific code customizations.

This doc uses [Terminus](/terminus).

