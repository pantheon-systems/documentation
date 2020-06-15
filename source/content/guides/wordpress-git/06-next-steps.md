---
title: Using Git with SFTP & WordPress
subtitle: Next Steps
description: Beginners guide on how to use the WordPress Dashboard, an SFTP client, and your text editor of choice to work quickly, safely and easily on Pantheon's Git-based platform.
anchorid: next-steps
layout: guide
cms: "WordPress"
categories: [develop]
tags: [git, sftp]
type: guide
permalink: docs/guides/wordpress-git/next-steps/
editpath: wordpress-git/06-next-steps.md
image: git-sftp-wp-docs-guide
getfeedbackform: default
reviewed: "2020-02-26"
---

## Deploy Code from Dev

We only made changes to our **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev** environment, so the next step would be to push all of these changes all the way out to production. For details on the deployment process for moving code up to **<span class="glyphicons glyphicons-equalizer" aria-hidden="true"></span> Test** and **<span class="glyphicons glyphicons-cardio" aria-hidden="true"></span> Live**, see [Use the Pantheon Workflow](/pantheon-workflow).

## Configuration

Consider how you would like to manage configuration, which refers to anything in the Database that isn't actual content, such as:

- Theme settings
- Plugin settings
- Widget placement
- Menus, etc.

You can repeat configuration steps manually, but that can be error prone and time consuming, especially during a launch. No fun. We recommend using WP-CFM to handle site configuration. For details, see [WordPress Configuration Management (WP-CFM)](/wp-cfm).

## Conclusion

This covers the basics of using Git on Pantheon with WordPress. Regardless of whether you prefer an SFTP client, and IDE, or the command line, Pantheon believes that developers should be able to use the tools that let you work the fastest, without sacrificing quality or security.

If you decide down the road that you would like to work locally and make commits using Git directly, you can read our [Starting With Git](/git) documentation.
