---
title: SFTP on Pantheon
subtitle: Use WinSCP on Pantheon
description: Learn how to use Pantheon's SFTP connection mode with WinSCP SFTP client.
tags: [files, sftp]
categories: [sftp]
newcms: [drupal, wordpress]
audience: [development]
product: [dashboard]
integration: [winscp]
layout: guide
showtoc: true
permalink: docs/guides/sftp/winscp
anchorid: winscp
---

This section provides information on how to use WinSCP with Pantheon.

[WinSCP](https://winscp.net/eng/index.php) is an open source graphical SFTP client for Windows that also supports the Legacy SCP protocol.

## Before You Begin

- Make sure you have the Pantheon SFTP connection information for your site ready. Refer to the documentation on [how to find the SFTP credentials](/guides/sftp/sftp-connection-info) for your site if you need to locate the connection information.

- [Download and install WinSCP](https://winscp.net/eng/docs/installation#download) if you haven't already.

## Connect Your WinSCP Client to Pantheon

1. Start the WinSCP application and enter the connection information. Be sure to take note of the port as Pantheon uses a **non-standard port** for SFTP.

1. Click **Yes** to accept the server's host RSA2 Key Fingerprint for the current session and store it in the cache. This allows you to connect to the server and manage your files for the current session.

    - You are directed automatically to the root directory of your appserver when logged in. The left side displays your local computer, and the right displays your site's appserver.

1. Navigate to the `code` directory to access the Drupal or WordPress root and manage your files.

## More Resources

- [Install Cygwin on Windows](/cygwin-windows)
