---
title: WordPress Plugins and Themes with Known Issues
subtitle: R Plugins
description: A list of WordPress plugins beginning with R that are not supported and/or require workarounds.
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
permalink: docs/guides/wp-plugins-themes-known-issues/directory/r-plugins
anchorid: r-plugins
---

## Redirection

<ReviewDate date="2021-07-19" />

**Issue 1:** When using the [Redirection](https://wordpress.org/plugins/redirection/) plugin, customers have reported issues with 404 logging creating large database tables, reducing site performance.

**Solution:** Consider using PHP code to set up your redirects. See [Configure Redirects](/guides/redirect) for more information.

**Issue 2:** [Redirection](https://redirection.me/) prefers `$_SERVER['SERVER_NAME']` over `$_SERVER['HTTP_HOST']` for [URL and server](https://redirection.me/support/matching-redirects/) redirects. By default, `$_SERVER['SERVER_NAME']` returns Pantheon's internal server name and not the current hostname. As a result, Redirection's "URL and server"-based redirects never match.

**Solution:** In `wp-config.php`, add the following above the line `/* That's all, stop editing! Happy Pressing. */`:

  ```php:title=wp-config.php
  // Map $_SERVER['HTTP_HOST'] to $_SERVER['SERVER_NAME']
  // to allow the Redirection plugin to work when using
  // "URL and server" based redirects. By default,
  // $_SERVER['SERVER_NAME'] returns Pantheon's internal
  // server name and not the current hostname, as a
  // result, Redirection's "URL and server"-based
  // redirects never match.
  $_SERVER['SERVER_NAME'] = $_SERVER['HTTP_HOST'];
  ```

Visit the [SERVER_NAME and SERVER_PORT on Pantheon](/server_name-and-server_port) doc for more information about how to use `HTTP_Host` on Pantheon.

<Alert title="Warning" type="danger">

This workaround may potentially break other functionality that depends on the default Pantheon return value for `$_SERVER['SERVER_NAME']`.

</Alert>

___

## Revive Old Post

**Issue:** The [Revive Old Post](https://wordpress.org/plugins/tweet-old-post/) plugin does not set a proper callback via OAuth and the Twitter module. It attempts to use `['SERVER_NAME']` instead of the recommended `['HTTP_HOST']`. Visit the [SERVER_NAME and SERVER_PORT on Pantheon](/server_name-and-server_port) doc for more information about `['HTTP_HOST']`.

___