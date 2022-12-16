---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal + Build Tools
subtitle: Troubleshooting
description: Troubleshoot common issues when migrating.
cms: "Drupal"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-hosted-btworkflow/troubleshooting
anchorid: troubleshooting
editpath: drupal/drupal-hosted-btworkflow/17-troubleshooting.md
reviewed: "2022-12-12"
contenttype: [guide]
categories: [migrate]
newcms: [drupal8, drupal9, drupal10, drupal]
audience: [develpment]
product: [--]
integration: [--]
---

## Provided Host Name Not Valid

Update your `settings.php` file with a trusted host setting, if you receive the following error message:

```none
The provided host name is not valid for this server
```

Refer to the [Trusted Host Setting](/guides/php/settings-php#trusted-host-setting) documentation for more information.

## Working With Dependency Versions

<Partial file="composer-updating.md" />

## Where can I report an issue?

[Contact support](/guides/support/contact-support) to report any issues that you encounter.
