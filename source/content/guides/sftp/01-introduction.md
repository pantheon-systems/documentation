---
title: SFTP on Pantheon
subtitle: Introduction
description: Learn how to use SFTP Mode for direct develop on Pantheon, and how to use SFTP connection information to upload files to your environments.
categories: [develop]
tags: [files, sftp, code]
reviewed: "2020-02-18"
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/sftp
anchorid: sftp
---

<Enablement title="Get WebOps Training" link="https://pantheon.io/learn-pantheon?docs">

Optimize your dev team and streamline internal workflows. Pantheon delivers on-demand training to help development teams master our platform and improve their internal WebOps.

</Enablement>

In some cases, working via Git may not be the best option. You may not like local development, or you may want to show work to a remote collaborator (or client) immediately, or need to debug a platform-specific problem.

SFTP mode allows you to develop directly on Pantheon. If you want to use the WordPress or Drupal Dashboard (e.g. the `apps.module` in Drupal, or the plugin/theme manager in WordPress), enable SFTP mode first. For details, see [Working in the WordPress Dashboard and Drupal Admin Interface](/cms-admin).

## SFTP Clients

SFTP mode works with any standards-compliant SFTP client, including many GUI tools and IDEs. We have specific guides to some:

- PHPStorm with [WordPress](/wordpress-phpstorm) and [Drupal](/drupal-phpstorm)
- [WinSCP](/guides/sftp/winscp)
- [Visual Studio Code](/visual-studio-code)