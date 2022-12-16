---
title: Quick Start
subtitle: Connection Modes
description: In part seven of our Quick Start guide, learn how Pantheon users take advantage of Git and SFTP mode to develop their sites.
quickstart: true
anchorid: connection-modes
generator: pagination
layout: guide
contenttype: [guide]
categories: [overview]
newcms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [code, dashboard, git, sftp, workflow]
type: guide
showtoc: true
pagination:
  provider: data.quickstartpages
use:
  - quickstartpages
permalink: docs/guides/quickstart/connection-modes/
nexturl: guides/quickstart/ui-changes/
nextpage: On-Server Dev, Part 1
previousurl: guides/quickstart/clone-live-to-dev/
previouspage: Clone Live to Dev
editpath: quickstart/07-connection-modes.md
image: launchGuide-twitterLarge
---

In this lesson, we’ll learn how to connect to your Dev environment and change code.

On Pantheon, you can connect and work via [Git](/guides/git/git-config), or you can connect and work via [SFTP](/guides/sftp). Dev is the only environment on Pantheon where you can add or change code, so it’s the only place you can access and change your Connection Mode.

![Connection Modes](../../../images/dashboard/connection-mode-sftp.png)

Navigate to your **Site Dashboard**, select the  <Icon icon={"wrench"} text={"Dev"}/>, and then select <Icon icon={"embed-close"} text={"Code"}/>.

## Git Connection Mode

You can develop locally with Git Connection Mode. Git is the version control tool at the heart of the Pantheon workflow. If you're a developer who prefers local development, it's an efficient way to interact with our platform: develop locally, commit, and push code to your Dev environment.

For more information, refer to [Local Development](/guides/local-development) and [Git on Pantheon](/guides/git).

## SFTP Connection Mode

You can develop directly on our servers with SFTP Connection Mode. It’s particularly useful for updating and adding plugins/modules directly from within your site.

Code changes made in SFTP Connection Mode are still committed into a Git repository. This makes working with other developers easy and ensures _all_ changes are tracked in version control. Whether you’re a novice or seasoned developer, our SFTP Connection Mode is handy and safe to use.

<Alert title="Note"  type="info" >

It’s common to switch back and forth between SFTP and Git Connection Mode,
depending on the task. For example, WordPress and Drupal Core updates are
managed by Pantheon, and they must be applied in Git Connection Mode.
Plugin/module updates made in the UI must be applied in SFTP Connection
Mode.

</Alert>