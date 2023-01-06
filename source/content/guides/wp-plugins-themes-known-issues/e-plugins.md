---
title: WordPress Plugins and Themes with Known Issues
subtitle: "E" Plugins
description: A list of WordPress plugins beginning with "E" that are not supported and/or require workarounds.
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
permalink: docs/guides/wp-plugins-themes-known-issues/e-plugins
anchorid: e-plugins
---


## Elementor

<ReviewDate date="2022-03-30" />

**Issue:** [Elementor](https://wordpress.org/plugins/elementor/) uses the current full URI to link to styled assets, which are invalid when the code is pushed from one environment to another.

**Solution 1:** Use any find/replace option to update the paths in Elementor. Ensure you account for escaped JSON URLs for this solution to work.

For example: my.example.com

Find or replace must handle `test.example.com` -> `my.example.com` and
`my.example.com` -> `test.example.com`.

Note that if you are using a `/` ending slash on a new site’s URL, ensure you add a `/` on old site’s URL as well.

**Solution 2:** Use the search and replace feature in Elementor to enter the following:

`/wp-admin/admin.php?page=elementor-tools#tab-replace_url`.

___

## Event Espresso

<ReviewDate date="2018-11-15" />

**Issue 1:** [Event Espresso](https://eventespresso.com/) displays the following error:

```none
PHP Fatal error: Uncaught EE_Error: An attempt to access and/or write to a file on the server could not be completed due to a lack of sufficient credentials.
```

**Solution:** [Define `FS_METHOD`](#define-fs_method).

**Issue 2:** Enabling Event Espresso sends a session cookie which conflicts with platform-level page caching.

**Solution:** Session autostart can be disabled conditionally using `FHEE_load_EE_Session` [filter](https://developer.wordpress.org/plugins/hooks/filters/#add-filter).
___