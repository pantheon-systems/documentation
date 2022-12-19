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
permalink: docs/guides/wordpress-developer/xml-rpc-attacks
anchorid: xml-rpc-attacks
---

This section provides information on how to avoid XML-RPC attacks.

The `/xmlrpc.php` script is a potential security risk for WordPress sites. It can be used by bad actors to brute force administrative usernames and passwords. You can surface this by reviewing your Live environment's `nginx-access.log`. The example below is from a site that uses [GoAccess](/guides/logs-pantheon/nginx-access-logs).

```none
2 - Top requests (URLs)                                  Total: 366/254431

Hits Vis.     %   Bandwidth Avg. T.S. Cum. T.S. Max. T.S. Data
---- ---- ----- ----------- --------- --------- --------- ----
2026   48 0.77%   34.15 KiB   1.27  s  42.74 mn  38.01  s /xmlrpc.php
566   225 0.21%   12.81 MiB   4.08  s  38.45 mn  59.61  s /
262    79 0.10%  993.71 KiB   2.32  s  10.14 mn  59.03  s /wp-login.php
```

Pantheon recommends that you disable XML-RPC. The WordPress Rest API is a stronger and more secure method for interacting with WordPress via external services.

Pantheon blocked requests to `xmlrpc.php` by default in the [WordPress 5.4.2 core release](/changelog/2020/07#wordpress-542). You can block `xmlrpc.php` attacks by applying your [upstream updates](/core-updates) if your version of WordPress is older than 5.4.2.

### Enable XML-RPC via Pantheon.yml

<Alert title="Note"  type="info" >

XML-RPC is not recommended on the Pantheon platform. Pantheon does not support XML-RPC if it is enabled.

</Alert>

You can re-enable access to XML-RPC for tools and plugins that require it, such as [Jetpack](https://jetpack.com/) or the WordPress mobile app.

<Partial file="jetpack-enable-xmlrpc.md" />

### Disable XML-RPC via a Custom Plugin

This method allows you to use a custom plugin to toggle between activated and deactivated states without deploying code. This plugin blocks exploitable XMLRPC methods previously available via POST requests.

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

	If your site uses a nested web root directory, you must include that directory in the path. For example, if your nested web root is `/wp`, use `/wp/xmlrpc.php` instead of `/xmlrpc.php`.

1. Activate the new plugin from within the WordPress admin dashboard, or via Terminus and WP-CLI:

  ```bash{promptUser: user}
  terminus wp my-site.dev -- plugin activate disable-xmlrpc
  ```

1. Commit your work, deploy code changes, and then activate the plugin on your Test and Live environments.

## More Resources

- [Pantheon YAML Configuration Files](/pantheon-yml)
- [WP-CLI on the Pantheon Platform](/guides/wp-cli)
- [Manage Custom Code for WordPress with Plugins](/guides/wordpress-configurations/wordpress-custom-code)