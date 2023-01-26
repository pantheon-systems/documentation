---
title: WordPress Plugins and Themes with Known Issues
subtitle: V Plugins
description: A list of WordPress plugins beginning with V that are not supported and/or require workarounds.
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
permalink: docs/guides/wp-plugins-themes-known-issues/directory/v-plugins
anchorid: v-plugins
---

## Visual Composer: Website Builder

<ReviewDate date="2018-08-27" />

**Issue:** The [Visual Composer: Website Builder](https://visualcomposer.io/) plugin fails to download additional assets during the internal plugin activation procedure on Test and Live environments.

**Solution 1: New sites, without existing Test and Live environments:** If this plugin is installed and activated on a new site _before_ the Test and Live environments are created, it will properly transfer all assets and database settings to the additional environments.

**Solution 2: Sites with existing Test and Live environments:** To activate the plugin on sites with existing Test and Live environments, [define `FS_METHOD`](#define-fs_method).

___