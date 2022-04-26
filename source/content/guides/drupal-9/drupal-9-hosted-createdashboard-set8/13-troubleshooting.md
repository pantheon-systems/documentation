---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal 9
subtitle: Troubleshooting
description: Troubleshoot common issues when migrating.
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-createdashboard-set8/troubleshooting
anchorid: troubleshooting
editpath: drupal-9-hosted-createdashboard-set8/13-troubleshooting.md
---


## Working With Dependency Versions

<Partial file="composer-updating.md" />

<Partial file="drupal-9/troubleshooting.md" />
## Your requirements could not be resolved to an installable set of packages

When setting the [Drupal core version](/guides/drupal-9-hosted-createdashboard-set8/07-drupal-core-version.md), use the command `composer update` instead of `composer update drupal/core* -W` if you receive the error message "Your requirements could not be resolved to an installable set of packages." 
