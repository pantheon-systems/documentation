---
title: Migrate a Composer-Managed Drupal 9 Site from Another Platform
subtitle: Introduction
description: Learn how to migrate a site that's hosted on another platform to Drupal 9
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-9-unhosted-composer
anchorid: drupal-9-unhosted-composer
editpath: drupal-9/drupal-9-unhosted-composer/01-introduction.md
reviewed: "2021-05-09"
---

This guide will show you how to migrate a Composer site currently hosted outside of Pantheon to Drupal 9.

| <i class="fa fa-cloud"></i><br/> Current Host | <i class="fa fa-wrench"></i><br/> How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> | <i class="fa fa-exclamation-circle"></i><br/> Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> |
|:---------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                   Elsewhere                   |                                                                        n/a                                                                         |                                                                                      Composer-Managed                                                                                      |

<Partial file="drupal-9/see-landing.md" />

<Partial file="drupal-9/commit-history.md" />

This doc uses the following aliases:

- **Alias:** `SITE`
- **Old site folder** `FORMER-PLATFORM`

## Requirements

- You have access to a local copy of the existing site and/or you have access to a Git repository of the existing site
- Your site is based on the [drupal/recommended-project]() template or a similar non-composer managed structure.
