---
title: Migrate a Drupal 8 Site with Multidev to Drupal:latest Using Multidev
subtitle: Prepare the Local Environment
description: 
cms: "Drupal:latest"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-latest-hosted-md/prepare
anchorid: prepare
editpath: drupal-latest/drupal-latest-hosted-md/03-prepare.md
reviewed: "2022-12-13"
contenttype: [guide]
categories: [migrate]
newcms: [drupal8, drupal9, drupal, drupal10]
audience: [development]
product: [composer, terminus]
integration: [--]
---

Complete all steps in this section to ensure that your site is ready to be migrated to Pantheon. 

<Partial file="drupal-latest/prepare-local-environment-no-clone.md" />

## Apply All Available Upstream Updates

<Partial file="drupal-apply-upstream-updates.md" />

## Convert to Composer

If your site is not currently Composer-managed, follow the steps in the [Composer Conversion Guide](/guides/composer-convert) to ensure that your site is ready for migration to drupal:latest.
