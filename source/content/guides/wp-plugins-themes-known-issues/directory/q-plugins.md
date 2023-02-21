---
title: WordPress Plugins and Themes with Known Issues
subtitle: Q Plugins
description: A list of WordPress plugins beginning with Q that are not supported and/or require workarounds.
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
permalink: docs/guides/wp-plugins-themes-known-issues/directory/q-plugins
anchorid: q-plugins
---

## Query Monitor

**Issue:** The [Query Monitor](https://wordpress.org/plugins/query-monitor/) plugin creates a symlink with an absolute path, which will only work on the appserver where the plugin was installed. The plugin is not fully designed for cloud or multi server environments.

**Alternatives:** Pantheon has tools in place to monitor database queries:

- [MySQL Slow Log](/guides/mariadb-mysql/mysql-slow-log)
- [MySQL Troubleshooting with New Relic Pro](/guides/new-relic/debug-mysql-new-relic)

___