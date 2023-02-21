---
title: WordPress Plugins and Themes with Known Issues
subtitle: I Plugins
description: A list of WordPress plugins beginning with I that are not supported and/or require workarounds.
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
permalink: docs/guides/wp-plugins-themes-known-issues/directory/i-plugins
anchorid: i-plugins
---

## InfiniteWP

<ReviewDate date="2019-10-01" />

**Issue 1:** Installing the [InfiniteWP](https://infinitewp.com) plugin admin panel on a Pantheon hosted site is not possible, because the plugin hardcodes the database credentials and uses a custom port in the URL. Our platform offers database credentials and offers them as an environment variable, and does not allow web access on ports other than `80` and `443`.

**Issue 2:** Cannot remotely update core, or install/update themes and plugins in the Test and Live environments.

**Solution:** Due to the [read only nature of Test and Live environments](/pantheon-workflow/#understanding-write-permissions-in-test-and-live), remote updates can only be done in Dev, then deployed to Test and Live environment. Consider using a [Custom Upstream](/guides/custom-upstream) or [WP Site Network](/guides/multisite) instead if you are deploying similar codebase, theme and plugins for a group of sites hosted on Pantheon.

___

## Instashow

**Issue:** The [Instashow](https://elfsight.com/instagram-feed-instashow/) plugin relies on query parameters that are not compatible with Pantheon's Edge Cache. See [PANTHEON_STRIPPED](/pantheon_stripped) for more information. This inhibits the ability to set the authorization token required to make the plugin function.

___

## iThemes Security

<ReviewDate date="2020-02-10" />

**Issue 1:** The "File Change Detection" check in the [iThemes Security](https://wordpress.org/plugins/better-wp-security/) plugin, warns site admins when files are modified. On Pantheon, automated backups will trigger this warning.

**Solution:** Disable the "File Change Detection" component of the plugin. Code files in the Test and Live environments are not writable, so this is not a security risk on Pantheon.

**Issue 2:** iThemes Security attempts to modify `nginx.conf`, `.htaccess` and `wp-config.php`. Components that need write access to these files will not work since `nginx.conf` [cannot be modified](/guides/platform-considerations/platform-site-info#nginxconf) and code files on the Test and Live environments are not writable.

**Solution:** Modifications to `wp-config.php` should be done in Dev or Multidev environments, then deployed forward to Test and Live.

___