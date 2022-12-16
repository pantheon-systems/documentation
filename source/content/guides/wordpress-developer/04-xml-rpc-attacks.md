---
title: WordPress Developer's Guide
subtitle: Avoid XML-RPC Attacks
description: Learn how to avoid XML-RPC attacks.
cms: "WordPress"
contenttype: [guide]
categories: [manage]
newcms: [wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [workflow, security, composer]
reviewed: "2022-05-16"
layout: guide
showtoc: true
permalink: docs/guides/wordpress-developer/xml-rpc-attacks
anchorid: xml-rpc-attacks
---

This section provides information on how to avoid XML-RPC attacks.

The `/xmlrpc.php` script is a potential security risk for WordPress sites. It can be used by bad actors to brute force administrative usernames and passwords, for example. This can be surfaced by reviewing your site's `nginx-access.log` for the Live environment. If you leverage [GoAccess](/guides/logs-pantheon/nginx-access-logs), you might see something similar to the following:

```none
2 - Top requests (URLs)                                  Total: 366/254431

Hits Vis.     %   Bandwidth Avg. T.S. Cum. T.S. Max. T.S. Data
---- ---- ----- ----------- --------- --------- --------- ----
2026   48 0.77%   34.15 KiB   1.27  s  42.74 mn  38.01  s /xmlrpc.php
566   225 0.21%   12.81 MiB   4.08  s  38.45 mn  59.61  s /
262    79 0.10%  993.71 KiB   2.32  s  10.14 mn  59.03  s /wp-login.php
```

Pantheon recommends disabling XML-RPC, given the WordPress Rest API is a stronger and more secure method for interacting with WordPress via external services.

Pantheon blocked requests to `xmlrpc.php` by default in the [WordPress 5.4.2 core release](/changelog/2020/07#wordpress-542). If your version of WordPress is older than this, you can block `xmlrpc.php` attacks by applying your [upstream updates](/core-updates).

### Enable XML-RPC via Pantheon.yml

<Alert title="Note"  type="info" >

XML-RPC is not recommended on the Pantheon platform. Pantheon does not support XML-RPC if it is enabled. 

</Alert>

You can re-enable access to XML-RPC for tools and plugins that require it, such as [Jetpack](https://jetpack.com/) or the WordPress mobile app. 

<Partial file="jetpack-enable-xmlrpc.md" />

### Disable XML-RPC via a Custom Plugin

This method has the advantage of being toggleable without deploying code, by activating or deactivating a custom plugin. The result of creating and activating this plugin is that exploitable XMLRPC methods will no longer be available via POST requests.

1. [Set the connection mode to SFTP](/guides/sftp) for the Dev or target Multidev environment via the Pantheon Dashboard or with [Terminus](/terminus):

  ```bash{promptUser: user}
  terminus connection:set <site>.<env> sftp
  ```

1. Use [Terminus](/terminus) and [WP-CLI's `scaffold plugin`](https://developer.wordpress.org/cli/commands/scaffold/plugin/) command to create  a new custom plugin.

  In the following example, replace `my-site` with your Pantheon site name, and `disable-xmlrpc` with your preferred name for this new plugin:

  ```bash{promptUser: user}
  terminus wp my-site.dev -- scaffold plugin disable-xmlrpc
  ```

1. Add the following lines to the main PHP plugin file:

  ```php:title=wp-content/plugins/disable-xmlrpc/disable-xmlrpc.php
  # Disable /xmlrpc.php
  add_filter('xmlrpc_methods', function () {
    return [];
  }, PHP_INT_MAX);
  ```

	If your site uses a nested web root directory, you must include that directory in the path. For example, if your nested web root is `/wp`, use `/wp/xmlrpc.php` instead of `/xmlrpc.php` 

1. Activate the new plugin from within the WordPress admin dashboard, or via Terminus and WP-CLI:

  ```bash{promptUser: user}
  terminus wp my-site.dev -- plugin activate disable-xmlrpc
  ```

1. Commit your work, deploy code changes then activate the plugin on Test and Live environments.
