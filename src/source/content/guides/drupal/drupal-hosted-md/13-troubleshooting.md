---
title: Upgrade a Drupal Site with Multidev to the Latest Version of Drupal Using Multidev
subtitle: Troubleshooting
description: Troubleshoot common issues when migrating
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
showtoc: true
permalink: docs/guides/drupal-hosted-md/troubleshooting
editpath: drupal/drupal-hosted-md/13-troubleshooting.md
reviewed: "2021-12-13"
contenttype: [guide]
innav: [false]
categories: [migrate, troubleshooting]
cms: [drupal8, drupal9, drupal, drupal10]
audience: [development]
product: [--]
integration: [multidev, drush]
---

This section covers common troubleshooting scenarios when migrating a Multidev site to the latest version of Drupal.

## Your requirements could not be resolved to an installable set of packages

When setting the Drupal core version, use the command `composer update` instead of `composer update drupal/core* -W` if you receive the error message "Your requirements could not be resolved to an installable set of packages."

## Working With Dependency Versions

<Partial file="composer-updating.md" />

<Partial file="drupal/troubleshooting-drush.md" />

<Partial file="drupal/troubleshooting-general.md" />

