---
title: WordPress Plugins and Themes with Known Issues
subtitle: M Plugins
description: A list of WordPress plugins beginning with M that are not supported and/or require workarounds.
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
permalink: docs/guides/wp-plugins-themes-known-issues/directory/m-plugins
anchorid: m-plugins
---

## [Maintenance Mode](https://wordpress.org/plugins/lj-maintenance-mode/)

**Issue:** Maintenance Mode causes a redirect loop on all pages for logged out users when the maintenance mode option is checked.

**Solution:** If you are locked out of your site, wp-login.php will still function and you can login to disable the maintenance mode plugin.
___

## [ManageWP worker](https://wordpress.org/plugins/worker/)

<ReviewDate date="2018-10-12" />

**Issue 1:** The [ManageWP Worker](https://wordpress.org/plugins/worker/) plugin displays an error when adding a site in the ManageWP dashboard:

> Site could not be added - Bad HTTP response (403 Forbidden)

This error sometimes leads users to believe that ManageWP's IP addresses need to be allowlisted on the platform.

**Solution:** Pantheon does not block any IPs, and there is nothing that would require an allowlist. Most likely there is a security plugin that temporary blocks the connection, or a conflicting plugin like those listed [here](https://managewp.com/user-guide/known-issues). Temporary disable all other plugins, or the security plugins, then try adding your site again. For full troubleshooting, consult the [ManageWP troubleshooting page](https://managewp.com/troubleshooting/site-connection/why-cant-i-add-some-of-my-sites).

**Issue 2:** Cannot remotely update core, or install/update themes and plugins in the Test and Live environments.

**Solution:** Due to the [read only nature of Test and Live environments](/pantheon-workflow/#understanding-write-permissions-in-test-and-live), remote updates can only be done in Dev, then deployed to Test and Live environment. Consider using a [Custom Upstream](/guides/custom-upstream) or [WP Site Network](/guides/multisite) instead if you are deploying similar codebase, theme and plugins for a group of sites hosted in Pantheon.

**Issue 3:** Cannot remotely update core, or install/update theme and plugins in the Dev environment.

**Solution:** Make sure you are in [SFTP mode](/guides/sftp/sftp-development) instead of Git mode.

___

## Monarch Social Sharing

**Issue:** The [Monarch Social Sharing](https://www.elegantthemes.com/plugins/monarch/) plugin appears to break WP-CLI, which is used by many of our workflows (clone, clear cache).

___