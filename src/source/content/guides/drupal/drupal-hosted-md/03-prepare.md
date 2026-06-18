---
title: Upgrade a Drupal Site with Multidev to the Latest Version of Drupal Using Multidev
subtitle: Prepare the Local Environment
description: 
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
showtoc: true
permalink: docs/guides/drupal-hosted-md/prepare
editpath: drupal/drupal-hosted-md/03-prepare.md
reviewed: "2022-12-13"
contenttype: [guide]
innav: [false]
categories: [update]
cms: [drupal8, drupal9, drupal, drupal10]
audience: [development]
product: [composer, terminus]
integration: [--]
---

Complete all steps in this section to ensure that your site is ready to be migrated to Pantheon. 

## Ensure Dependencies are Compatible

<Partial file="drupal/dependencies-compatible.md" />

## Prepare the Local Environment

<Partial file="drupal/prepare-local-environment-no-clone.md" />

## Apply All Available Upstream Updates

<Partial file="drupal-apply-upstream-updates.md" />

## Convert to Composer

If your site is not currently Composer-managed, follow the steps in the [Composer Conversion Guide](/guides/composer-convert) to ensure that your site is ready for migration to the latest version of Drupal.
