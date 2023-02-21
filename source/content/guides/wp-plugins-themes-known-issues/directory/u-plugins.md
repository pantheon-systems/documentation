---
title: WordPress Plugins and Themes with Known Issues
subtitle: U Plugins
description: A list of WordPress plugins beginning with U that are not supported and/or require workarounds.
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
permalink: docs/guides/wp-plugins-themes-known-issues/directory/u-plugins
anchorid: u-plugins
---

## Unbounce Landing Pages

<ReviewDate date="2019-02-13" />

**Issue:** For the [Unbounce Landing Pages](https://wordpress.org/plugins/unbounce/) plugin, clicking to call conversions aren't tracked even if the pages are not cached because the cookies are stripped.

 **Solution:** Usually these type of issues can be solved if the cookie name can be renamed with a prefix starting with `STXKEY_`, but it is inadvisable to modify the plugin directly. It is suggested by the Unbounce team to separate your Pantheon site domain (eg. example.com) and the Unbounce landing page in a subdomain (e.g., unbounce.example.com), because your Unbounce landing pages can't live at exactly the same URL as your homepage. See the outlined solution [here](https://documentation.unbounce.com/hc/en-us/articles/203661044-Connecting-Your-Domain-to-Unbounce) or get in touch with Unbounce support for more help.

___

## UNLOQ Two Factor Authentication (2FA)

<ReviewDate date="2018-10-08" />

**Issue:** `This widget does not work on this domain` error message shown after deploying  the [UNLOQ Two Factor Authentication (2FA)](https://wordpress.org/plugins/unloq/) plugin across environments on Pantheon. This is because the API credentials used on the original environment are being used on a new environment URL, which is not allowed by the plugin. This is by design.

**Solution:** Manually change `unloq_credentials` key in the`wp_options` table. Alternatively, you can re-create an application by resetting your plugin installation (deactivate, delete entries, etc.).

For an alternative 2FA plugin, see [Secure Your Site with Two-Factor Authentication](/guides/secure-development/two-factor-authentication/#single-site-tfa).

___

## Unyson Theme Framework

<ReviewDate date="2018-10-05" />

**Issue:** The [Unyson Theme Framework](https://wordpress.org/plugins/unyson/) plugin has an internal extension system which installs additional files aside from the plugin itself. Some of those extensions have an additional `.gitignore` file that prevents it from being deployed to Test and Live environment. See [this GitHub issue](https://github.com/ThemeFuse/Unyson/issues/3615) for more information.

**Solution:** When using these Unyson Extensions, manually delete the `.gitignore` files in the corresponding locations:

Page builder:

- `wp-content/plugins/unyson/framework/extensions/shortcodes/.gitignore`
- `wp-content/plugins/unyson/framework/extensions/shortcodes/extensions/page-builder/.gitignore`

WordPress Shortcodes:

- `wp-content/plugins/unyson/framework/extensions/shortcodes/.gitignore`

Translate Press:

- `wp-content/plugins/unyson/framework/extensions/shortcodes/.gitignore`

Events:

- `wp-content/plugins/unyson/framework/extensions/events/.gitignore`

Brizy:

- `wp-content/plugins/brizy/vendor/twig/twig/.gitignore`

___

## Updraft / Updraft Plus Backup

<ReviewDate date="2022-07-18" />

**Issue:** [Updraft](https://wordpress.org/plugins/updraftplus/) can create large archives and cause issues with the tools in the Database / Files tab of the Dashboard. Refer to [Backup Creation](/backups/) for more information.

**Solution:** Use the platform's automated backups [from the Site Dashboard](/backups). Consider using a bash script if you want to access your backups and copy it to your own repository (for example, Amazon S3, FTP server, etc.). You can do this by:

- Running the bash script in your local system

- Using an external server

- Using a service that runs cron jobs for you

Refer to the [Access Backups](/backups#access-backups) documentation for more details.

___