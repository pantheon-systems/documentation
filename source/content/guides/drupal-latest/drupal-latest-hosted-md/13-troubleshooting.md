---
title: Migrate a Drupal 8 Site with Multidev to Drupal:latest Using Multidev
subtitle: Troubleshooting
description: Troubleshoot common issues when migrating
cms: "Drupal:latest"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-latest-hosted-md/troubleshooting
anchorid: troubleshooting
editpath: drupal-latest/drupal-latest-hosted-md/13-troubleshooting.md
reviewed: "2021-12-13"
contenttype: [guide]
categories: [migrate, help]
newcms: [drupal8, drupal9, drupal, drupal10]
audience: [development]
product: [--]
integration: [multidev, drush]
---

This section covers common troubleshooting scenarios when migrating a Multidev site to Drupal:latest.

## Your requirements could not be resolved to an installable set of packages

When setting the Drupal core version, use the command `composer update` instead of `composer update drupal/core* -W` if you receive the error message "Your requirements could not be resolved to an installable set of packages."

## Working With Dependency Versions

<Partial file="composer-updating.md" />

<Partial file="drupal-latest/troubleshooting-drush.md" />

<Partial file="drupal-latest/troubleshooting-general.md" />

