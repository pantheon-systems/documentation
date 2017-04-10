---
title: Getting Started
subtitle: Connection Modes
guidepage: true
anchorid: connection-modes
generator: pagination
layout: guide
pagination:
    provider: data.gettingstartedpages
use:
    - gettingstartedpages
permalink: docs/guides/getting-started/connection-modes/
nexturl: getting-started/onserver-dev-part1
nextpage: On-Server Dev, Part 1
previousurl: getting-started/clone-live-to-dev
previouspage: Clone Live to Dev
---

In this lesson, we’ll learn how to connect to your Dev environment and change code.

1. Navigate to the **Dev** environment in your Site Dashboard, and click **</> Code**.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>Dev is the only environment on Pantheon where you can add or change code, so it’s the only place you can access and change your Connection Mode.
</p></div>

On Pantheon, you can connect and work via <a href="https://git-scm.com/" target="_blank">Git</a>, or you can connect and work via SFTP.

##Git Connection Mode

You can develop locally with Git Connection Mode. If you’re already familiar with Git and local development, working with Pantheon will be straightforward.

For more information, please see our [Local Development](https://pantheon.io/docs/local-development/) documentation.

##SFTP Connection Mode

You can develop directly on our servers with SFTP Connection Mode. It’s particularly useful for updating and adding plugins/modules directly from within your site.

Whether you’re a novice or seasoned developer, on-server development is a useful option. On Pantheon, code changes made in SFTP Connection Mode are still committed into a Git repository. This makes working with other developers easy, and it ensure all changes are tracked in version control.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>It’s common to switch back and forth between SFTP and Git Connection Mode, depending on the task. For example, WordPress and Drupal Core updates are managed by Pantheon, and they must be applied in Git Connection Mode. Plugin/module updates made in the UI must be applied in SFTP Connection Mode.</p></div>
