---
title: Migrate a Site with Multidev to Drupal 9
subtitle: Troubleshooting
description: Troubleshoot common issues when migrating
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-md/troubleshooting
anchorid: troubleshooting
editpath: drupal-9/drupal-9-hosted-md/13-troubleshooting.md
reviewed: "2021-03-31"
---

This section covers common troubleshooting scenarios when migrating a Multidev site to Drupal 9.

## Your requirements could not be resolved to an installable set of packages

When setting the Drupal core version, use the command `composer update` instead of `composer update drupal/core* -W` if you receive the error message "Your requirements could not be resolved to an installable set of packages."

## Working With Dependency Versions

<Partial file="composer-updating.md" />

<Partial file="drupal-9/troubleshooting.md" />
