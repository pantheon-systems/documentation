---
title: Migrate a Drupal 9 Site from Another Platform
subtitle: Troubleshooting
description: Troubleshoot common issues when migrating.
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-unhosted/troubleshooting
anchorid: troubleshooting
editpath: drupal-9/drupal-9-unhosted/15-troubleshooting.md
reviewed: "2021-03-31"
---

This section covers common troubleshooting scenarios when migrating a Drupal 9 site from another host to Pantheon's platform.

## Provided host name not valid

If you receive the error message "The provided host name is not valid for this server.", then update your `settings.php` file with a trusted host setting. Refer to the [Trusted Host Setting](/guides/php/settings-php#trusted-host-setting) documentation for more information.

<Partial file="drupal-9/troubleshooting-drush.md" />

<Partial file="drupal-9/troubleshooting-general.md" />

