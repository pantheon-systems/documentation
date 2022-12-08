---
title: Migrate a Drupal 8 Site with Multidev to Drupal 9 Using Multidev
subtitle: Prepare the Local Environment
description: 
cms: "Drupal 9"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-md/prepare
anchorid: prepare
editpath: drupal-9/drupal-9-hosted-md/03-prepare.md
reviewed: "2021-03-31"
contenttype: [guide]
categories: [migrate]
newcms: [drupal8, drupal9, drupal]
audience: [development]
product: [composer, terminus]
integration: [--]
---

Complete all steps in this section to ensure that your site is ready to be migrated to Pantheon. 

<Partial file="drupal-9/prepare-local-environment-no-clone.md" />

## Apply All Available Upstream Updates

<Partial file="drupal-apply-upstream-updates.md" />

## Convert to Composer

If your site is not currently Composer-managed, follow the steps in the [Composer Conversion Guide](/guides/composer-convert) to ensure that your site is ready for migration to Drupal 9.
