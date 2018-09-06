---
title: Quick Start
subtitle: Connection Modes
description: In part seven of our Quick Start guide, learn how Pantheon users take advantage of Git and SFTP mode to develop their sites.
quickstart: true
anchorid: connection-modes
generator: pagination
layout: guide
type: guide
pagination:
    provider: data.quickstartpages
use:
    - quickstartpages
permalink: docs/guides/quickstart/connection-modes/
nexturl: guides/quickstart/onserver-dev-part1/
nextpage: On-Server Dev, Part 1
previousurl: guides/quickstart/clone-live-to-dev/
previouspage: Clone Live to Dev
editpath: quickstart/07-connection-modes.md
image: launchGuide-twitterLarge
---

In this lesson, we’ll learn how to connect to your Dev environment and change code.

1. Navigate to the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev** environment in your Site Dashboard, and click **<span class="glyphicons glyphicons-embed-close" aria-hidden="true"></span> Code**.

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p>Dev is the only environment on Pantheon where you can add or change code, so it’s the only place you can access and change your Connection Mode.
    </p></div>

    On Pantheon, you can connect and work via [Git](/docs/git/), or you can connect and work via [SFTP](/docs/sftp/):

    ![Connection Modes](/source/docs/assets/images/dashboard/connection-mode-sftp.png)

## Git Connection Mode

You can develop locally with Git Connection Mode. Git is the version control tool at the heart of the Pantheon workflow. If you're a developer who prefers local development, it's an efficient way to interact with our platform: develop locally, commit, and push code to your Dev environment.

For more information, please see our <a href="/docs/local-development/">Local Development <span class="glyphicons glyphicons-new-window-alt"></span></a> documentation.

## SFTP Connection Mode

You can develop directly on our servers with SFTP Connection Mode. It’s particularly useful for updating and adding plugins/modules directly from within your site.

Code changes made in SFTP Connection Mode are still committed into a Git repository. This makes working with other developers easy and ensures _all_ changes are tracked in version control. Whether you’re a novice or seasoned developer, our SFTP Connection Mode is handy and safe to use.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>It’s common to switch back and forth between SFTP and Git Connection Mode, depending on the task. For example, WordPress and Drupal Core updates are managed by Pantheon, and they must be applied in Git Connection Mode. Plugin/module updates made in the UI must be applied in SFTP Connection Mode.</p></div>
