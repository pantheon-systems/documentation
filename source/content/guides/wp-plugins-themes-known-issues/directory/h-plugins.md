---
title: WordPress Plugins and Themes with Known Issues
subtitle: H Plugins
description: A list of WordPress plugins beginning with H that are not supported and/or require workarounds.
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
permalink: docs/guides/wp-plugins-themes-known-issues/directory/h-plugins
anchorid: h-plugins
---


## H5P

<Partial file="h5p-known-issues.md" />

___

## HM Require Login

<ReviewDate date="2021-11-04" />

**Issue:** When using the [HM Require Login](https://github.com/humanmade/hm-require-login) plugin, WordPress's cookies disappear shortly after a user successfully logs in. When the user attempts to access a second page in the WordPress Admin, the login screen is displayed.

**Solution:** Use an alternative plugin such as [Force Login](https://wordpress.org/plugins/wp-force-login/) or [Restricted Site Access](https://wordpress.org/plugins/restricted-site-access/).

___

## Hummingbird

<ReviewDate date="2022-01-20" />

**Issue:** When using the [Hummingbird](https://wordpress.org/plugins/hummingbird-performance/) plugin on a locked site, the user may encounter an HTTP 400-level (client error) response.

**Solution:** To resolve this issue flush the Hummingbird cache. Note that flushing the cache purges the cache storage, which might affect other processes that use the same storage.
___
