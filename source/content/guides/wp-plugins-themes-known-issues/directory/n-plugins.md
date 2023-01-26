---
title: WordPress Plugins and Themes with Known Issues
subtitle: N Plugins
description: A list of WordPress plugins beginning with N that are not supported and/or require workarounds.
cms: "WordPress"
tags: [plugins, themes, code]
contributors: [aleksandrkorolyov, jocastaneda, carl-alberto]
categories: [help]
newcms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-03-24"
contenttype: [guide]
layout: guide
showtoc: true
permalink: docs/guides/wp-plugins-themes-known-issues/directory/n-plugins
anchorid: n-plugins
---

## New Relic Reporting for WordPress

<ReviewDate date="2019-05-08" />

**Issue:** The [New Relic Reporting for WordPress](https://wordpress.org/plugins/wp-newrelic/) plugin sets up redundant configurations (`appname` and `framework`) with the [New Relic&reg; Performance Monitoring](/guides/new-relic) configuration, resulting in new applications in New Relic. This behavior may break compatibility with New Relic integrations such as [QuickSilver scripts](/guides/quicksilver).

___