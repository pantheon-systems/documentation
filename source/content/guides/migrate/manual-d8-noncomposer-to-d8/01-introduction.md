---
title: Migrate a Composer-Managed Drupal 9 Site from Another Platform
subtitle: Introduction
description: Learn how to migrate a site that's hosted on another platform to Drupal 9
cms: "Drupal 8"
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
layout: guide
permalink: docs/guides//manual-d8-noncomposer-to-d8
anchorid: manual-d8-noncomposer-to-d8
editpath: migrate/manual-d8-noncomposer-to-d8/01-introduction.md
reviewed: "2021-06-22"
---

This guide will show you how to migrate a Composer site currently hosted outside of Pantheon to Drupal 9.

<Partial file="drupal-9/see-landing.md" />

<Partial file="drupal-9/commit-history.md" />

This doc uses the following aliases:

- **Alias:** `SITE`
- **Old site folder** `FORMER-PLATFORM`

## Requirements

- You have access to a local copy of the existing site and/or you have access to a Git repository of the existing site
- Your site is based on the [drupal/recommended-project]() template or a similar non-composer managed structure.
