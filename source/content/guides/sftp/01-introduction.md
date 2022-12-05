---
title: SFTP on Pantheon
subtitle: Introduction
description: Learn how to use SFTP Mode for direct develop on Pantheon, and how to use SFTP connection information to upload files to your environments.
tags: [files, sftp, code]
reviewed: "2020-02-18"
contenttype: [guide]
categories: [sftp]
newcms: [drupal, wordpress]
audience: [development]
product: [dashboard]
integration: [--]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/sftp
anchorid: sftp
---

SFTP mode allows you to develop directly on Pantheon. This is an advantage in cases in which working with Git is not the best option for you or your team. SFTP mode is especially useful when:

- local development is not the optimal solution for your setup
- a remote collaborator (or client) needs to see changes immediately
- a platform-specific problem requires debugging

Refer to [Working in the WordPress Dashboard and Drupal Admin Interface](/cms-admin) if you want to use the WordPress plugin/theme manager or Drupal Dashboard (`apps.module`).

<Enablement title="Get WebOps Training" link="https://pantheon.io/learn-pantheon?docs">

Optimize your dev team and streamline internal workflows. Pantheon delivers on-demand training to help development teams master our platform and improve their internal WebOps.

</Enablement>

## SFTP Clients

SFTP mode works with any standards-compliant SFTP client, including many GUI tools and IDEs. We have specific guides on how to use some popular developer tools with Pantheon:

- PHPStorm with [WordPress](/wordpress-phpstorm) and [Drupal](/drupal-phpstorm)
- [WinSCP](/guides/sftp/winscp)
- [Visual Studio Code](/visual-studio-code)

### SFTP for File Uploads

You can also use your SFTP client to upload files to your Pantheon site. Refer to [SFTP Connection Info and Authentication](/guides/sftp/sftp-connection-info) for information on how to access your SFTP Connection Info.

## More Resources

- [Content Staging](/content-staging)
- [Pantheon Filesystem](/files)
- [Using Git with SFTP & WordPress](/guides/wordpress-git/)