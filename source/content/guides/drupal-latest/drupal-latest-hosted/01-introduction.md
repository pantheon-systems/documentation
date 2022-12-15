---
title: Migrate a Drupal 8+ Site to Drupal:latest
subtitle: Introduction
description:
cms: "Drupal"
tags: [code, launch, migrate, site, updates, D8, D9, D10 ]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-latest-hosted
anchorid: drupal-latest-hosted
editpath: drupal-latest/drupal-latest-hosted/01-introduction.md
reviewed: "2022-12-12"
contenttype: [guide]
categories: [overview, migrate]
newcms: [drupal8, drupal9, drupal10]
audience: [development]
product: [--]
integration: [--]
---

This guide will show you how to migrate a site that meets the following criteria to `drupal:latest`:

| <i class="fa fa-cloud"></i><br/> Current Host | <i class="fa fa-wrench"></i><br/> How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> | <i class="fa fa-exclamation-circle"></i><br/> Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> |
|:---------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                   Pantheon                    |                                                                     Dashboard                                                                      |                                                                                             --                                                                                             |

<Alert title="Note" type="info" >

This guide is intended for those who do not have access to Multidev.  If you do have access, use [Migrate a Drupal 8 Site with Multidev to Drupal:latest Using Multidev](/guides/drupal-latest-hosted) instead.

</Alert>

<Partial file="drupal-latest/see-landing.md" />

<Partial file="drupal-latest/commit-history.md" />

This doc uses the following aliases:

- **Alias:** `D8_SITE`
  - **Site Name:** `best-drupal8-site-ever`
- **Alias:** `DRUPAL_SITE`
  - **Site Name:** `best-drupal-site-ever`

## Requirements

<Partial file="drupal-latest/upgrade-site-requirements-new.md" />
