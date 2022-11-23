---
title: Migrate a Drupal 8 Site to Drupal 9
subtitle: Introduction
description:
cms: "Drupal 9"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-9-hosted
anchorid: drupal-9-hosted
editpath: drupal-9/drupal-9-hosted/01-introduction.md
reviewed: "2021-03-31"
contenttype: guide
<<<<<<< HEAD
categories: [overview, migrate]
newcms: [drupal8, drupal9]
=======
categories: [--]
newcms: [drupal9]
>>>>>>> 36353fb5175febd429aafb1ae912bab6059df371
audience: [development]
product: [--]
integration: [--]
---

This guide will show you how to migrate a site that meets the following criteria to Drupal 9:

| <i class="fa fa-cloud"></i><br/> Current Host | <i class="fa fa-wrench"></i><br/> How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> | <i class="fa fa-exclamation-circle"></i><br/> Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> |
|:---------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                   Pantheon                    |                                                                     Dashboard                                                                      |                                                                                             --                                                                                             |

<Alert title="Note" type="info" >

This guide is intended for those who do not have access to Multidev.  If you do have access, use [Migrate a Drupal 8 Site with Multidev to Drupal 9 Using Multidev](/guides/drupal-9-hosted-md) instead.

</Alert>

<Partial file="drupal-9/see-landing.md" />

<Partial file="drupal-9/commit-history.md" />

This doc uses the following aliases:

- **Alias:** `D8_SITE`
  - **Site Name:** `best-drupal8-site-ever`
- **Alias:** `D9_SITE`
  - **Site Name:** `best-drupal9-site-ever`

## Requirements

<Partial file="drupal-9/upgrade-site-requirements-new.md" />
