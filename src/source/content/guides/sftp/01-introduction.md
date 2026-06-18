---
title: SFTP on Pantheon
subtitle: Introduction
description: Learn how to use SFTP mode for direct develop on Pantheon, and how to use SFTP connection information to upload files to your environments.
tags: [files, sftp, code]
reviewed: "2020-02-18"
contenttype: [guide]
innav: [true]
categories: [sftp]
cms: [drupal, wordpress]
audience: [development]
product: [dashboard]
integration: [--]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/sftp
---

Pantheon provides two development modes: [Git mode](/guides/git) and SFTP mode. SFTP mode allows you to develop directly on Pantheon. 

<Enablement title="Get WebOps Training" link="https://pantheon.io/learn-pantheon?docs">

Optimize your dev team and streamline internal workflows. Pantheon delivers on-demand training to help development teams master our platform and improve their internal WebOps.

</Enablement>

### SFTP Mode Advantages

SFTP development provides advantages when working with Git and/or local development is not the best option for you or your team. SFTP mode is especially useful when:

- a remote collaborator (or client) needs to see changes immediately
- a platform-specific problem requires debugging

## SFTP Clients

SFTP mode works with all standards-compliant SFTP clients, including many GUI tools and IDEs. We have specific guides on how to use some popular developer tools with Pantheon:

- [PHPStorm with WordPress](/guides/local-development/wordpress-phpstorm) and [Drupal](/guides/local-development/drupal-phpstorm)
- [WinSCP](/guides/sftp/winscp)
- [Visual Studio Code](/guides/sftp/vscode-sftp)

### SFTP for File Transfers

You can use your SFTP client to transfer files to your Pantheon site. This also allows you to upload files directly to your Test or Live environments. Refer to [SFTP File Uploads to Test and Live Environments](/guides/sftp/sftp-connection-info#sftp-file-uploads-to-test-and-live-environments) for more information.

## More Resources

- [Content Staging](/content-staging)
- [Pantheon Filesystem](/guides/filesystem)
- [Using Git with SFTP & WordPress](/guides/wordpress-git/)
