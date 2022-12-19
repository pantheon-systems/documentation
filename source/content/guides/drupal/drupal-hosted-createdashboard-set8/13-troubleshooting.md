---
title: Migrate a Site Created With the Pantheon Dashboard to the Latest Version of Drupal
subtitle: Troubleshooting
description: Troubleshoot common issues when migrating.
cms: "Drupal"
tags: [code, launch, migrate, site, updates, composer, D8, D9, D10]
contributors: [wordsmither]
reviewed: "2022-12-13"
layout: guide
showtoc: true
permalink: docs/guides/drupal-hosted-createdashboard-set8/troubleshooting
anchorid: troubleshooting
editpath: drupal-hosted-createdashboard-set8/13-troubleshooting.md
contenttype: [guide]
categories: [migrate, git]
newcms: [drupal]
audience: [development]
product: [dashboard]
integration: [--]
---

## Your Requirements Could Not Be Resolved to an Installable Set of Packages

When setting the Drupal core version, use the command `composer update` instead of `composer update drupal/core* -W` if you receive the error message `Your requirements could not be resolved to an installable set of packages.`

## Working With Dependency Versions

<Partial file="composer-updating.md" />

<Partial file="drupal/troubleshooting-drush.md" />

<Partial file="drupal/troubleshooting-general.md" />
