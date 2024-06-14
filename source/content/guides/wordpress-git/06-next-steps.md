---
title: Using Git with SFTP & WordPress
subtitle: Next Steps
description: Beginners guide on how to use the WordPress Dashboard, an SFTP client, and your text editor of choice to work quickly, safely and easily on Pantheon's Git-based platform.
contenttype: [guide]
innav: [false]
categories: [git]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [git, sftp]
type: guide
permalink: docs/guides/wordpress-git/next-steps/
editpath: wordpress-git/06-next-steps.md
reviewed: "2020-02-26"
---

## Deploy Code from Dev

We only made changes to our **<Icon icon="wrench" /> Dev** environment, so the next step would be to push all of these changes all the way out to production. For details on the deployment process for moving code up to **<Icon icon="equalizer" /> Test** and **<Icon icon="wavePulse" /> Live**, see [Use the Pantheon Workflow](/pantheon-workflow).

## Configuration

Consider how you would like to manage configuration, which refers to anything in the Database that isn't actual content, such as:

- Theme settings
- Plugin settings
- Widget placement
- Menus, etc.

You can repeat configuration steps manually, but that can be error prone and time consuming, especially during a launch. No fun. We recommend using WP-CFM to handle site configuration. For details, see [WordPress Configuration Management (WP-CFM)](/guides/wordpress-configurations/wp-cfm).

## Conclusion

This covers the basics of using Git on Pantheon with WordPress. Regardless of whether you prefer an SFTP client, and IDE, or the command line, Pantheon believes that developers should be able to use the tools that let you work the fastest, without sacrificing quality or security.

If you decide down the road that you would like to work locally and make commits using Git directly, you can read our [Starting With Git](/guides/git/git-config) documentation.
