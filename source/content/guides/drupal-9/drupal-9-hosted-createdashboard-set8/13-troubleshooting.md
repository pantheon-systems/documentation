---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal 9
subtitle: Troubleshooting
description: Troubleshoot common issues when migrating.
cms: "Drupal 9"
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-createdashboard-set8/troubleshooting
anchorid: troubleshooting
editpath: drupal-9-hosted-createdashboard-set8/13-troubleshooting.md
contenttype: [guide]
categories: [migrate, git]
newcms: [drupal9]
audience: [development]
product: [dashboard]
integration: [--]
---

## Your Requirements Could Not Be Resolved to an Installable Set of Packages

When setting the Drupal core version, use the command `composer update` instead of `composer update drupal/core* -W` if you receive the error message `Your requirements could not be resolved to an installable set of packages.`

## Working With Dependency Versions

<Partial file="composer-updating.md" />

<Partial file="drupal-9/troubleshooting-drush.md" />

<Partial file="drupal-9/troubleshooting-general.md" />
