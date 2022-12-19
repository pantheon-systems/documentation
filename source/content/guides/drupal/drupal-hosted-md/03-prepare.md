---
title: Migrate a Drupal 8 Site with Multidev to Drupal (Latest) Using Multidev
subtitle: Prepare the Local Environment
description: 
cms: "Drupal"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-hosted-md/prepare
anchorid: prepare
editpath: drupal/drupal-hosted-md/03-prepare.md
reviewed: "2022-12-13"
contenttype: [guide]
categories: [migrate]
newcms: [drupal8, drupal9, drupal, drupal10]
audience: [development]
product: [composer, terminus]
integration: [--]
---

Complete all steps in this section to ensure that your site is ready to be migrated to Pantheon. 

<Partial file="drupal/prepare-local-environment-no-clone.md" />

## Apply All Available Upstream Updates

<Partial file="drupal-apply-upstream-updates.md" />

## Convert to Composer

If your site is not currently Composer-managed, follow the steps in the [Composer Conversion Guide](/guides/composer-convert) to ensure that your site is ready for migration to the latest version of Drupal.
