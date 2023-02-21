---
title: WordPress Plugins and Themes with Known Issues
subtitle: O Plugins
description: A list of WordPress plugins beginning with O that are not supported and/or require workarounds.
tags: [plugins, themes, code]
categories: [help]
newcms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-03-24"
contenttype: [guide]
layout: guide
showtoc: true
permalink: docs/guides/wp-plugins-themes-known-issues/directory/o-plugins
anchorid: o-plugins
---

## One Click Demo Import

<ReviewDate date="2022-03-30" />

**Issue:** The [One Click Demo Import](https://wordpress.org/plugins/one-click-demo-import/) plugin returns a `502` error when automatically importing the demo files and pages for a theme. This generally happens when the process reaches the configured `max-execution` time in the Pantheon system `php` file.

**Solution:** Select the **Switch to Manual Import** option to import the demo files, including, `content.xml`, `widgets.wie`, etc.

___

## Object Sync for Salesforce

<ReviewDate date="2018-08-24" />

**Issue:** The [Object Sync for Salesforce](https://wordpress.org/plugins/object-sync-for-salesforce/) plugin adds dependencies using Composer, and one of these dependencies provides a .gitignore file which prevents files from being picked up by Git. This leads to problematic deployments as not all code moves forward to Test and Live.

**Solution:** Remove the `.gitignore` file from the `object-sync-for-salesforce/vendor/pippinsplugins/wp-logging` directory.

___