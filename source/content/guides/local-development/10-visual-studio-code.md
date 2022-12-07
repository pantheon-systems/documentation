---
title: Local Development on Pantheon
subtitle: Configuring Visual Studio Code for Pantheon
description: Develop your Pantheon site locally using Visual Studio Code to edit and sync code.
categories: [develop]
tags: [code, collaborate, git, local, sftp]
contributors: [sarahg, alexfornuto]
reviewed: "2019-10-16"
layout: guide
showtoc: true
permalink: docs/guides/local-development/visual-studio-code
anchorid: visual-studio-code
---

This section provides information on how to develop your Pantheon site locally with Visual Studio Code.

[Visual Studio Code](https://code.visualstudio.com/), or **VS Code**, is an open-source code editor that runs on Windows, Linux, and Mac OS.

You can set up a Pantheon site in VS Code and push local changes to your Pantheon environment with Git. You can also use the VS Code SFTP extension to sync code between your Pantheon site and local machine.

## Before You Begin

1. [Create a site](/guides/legacy-dashboard/create-sites) on Pantheon, or browse to the Dev environment Dashboard of an existing site.

1. Use [Git](/guides/git/git-config#clone-your-site-codebase), [SFTP](/guides/sftp/rsync-and-sftp), or [rsync](/guides/sftp/rsync-and-sftp) to clone your site files on the Dev environment down to your local machine.

  If you intend to upload code changes via SFTP, place your site code in a subdirectory called `code` (for example, `~/sites/mysite/code`). This aligns with the file structure on the platform when using [SFTP mode](/sftp).

1. Download and install [VS Code](https://code.visualstudio.com/).

## Create a VS Code Workspace

A Workspace in VS Code contains settings for your project, including recommended extensions, configuration for extensions, and project-specific debugging configuration.

1. Navigate to the VS Code Welcome screen, click **Open folder...** under the **Start** heading:

  ![The Open folder option from the Visual Studio Code Start screen](../../../images/vscode-open-folder.png)

  If you have already closed the Welcome screen, click **Open...** in the **File** menu.

1. Navigate to your filesystem and select the directory containing your site (for example, `~/sites/mysite`).

1. Save this as a Workspace by selecting **Save Workspace As...** from the **File** menu.

    Workspace settings are stored in a file called `.code-workspace` at the root of your project. We recommend that you keep this file out of Git by adding it to your `.gitignore` file at either the site or global level:

  ```git:title=.gitignore
  // highlight-start
  # Ignore VSCode Workspace Files
  *.code-workspace
  // highlight-end

  # WordPress #
  ############
  wp-config-local.php
  wp-cli.local.yml
  wp-content/uploads
  wp-content/blogs.dir/
  wp-content/upgrade/

  ```

1. Click a file name in the File Explorer on the left side of VS Code to open it and make edits in the main window.

## Deploy Local Code Changes to a Pantheon Environment

You must push code changes up to your Pantheon Dev or Multidev environment. You can do this with Git or SFTP.

### Push Changes with Git (Recommended)

VS Code includes Git integration and an integrated terminal, either of which can be used to make Git changes and push them back to your Pantheon repository and Dev environment.

1. Make sure your site is in [Git mode](/guides/quickstart/connection-modes) before pushing code via Git.

1. Make changes to your local site.

1. Push your changes:

  ```bash
  git push
  ```

#### Git Version Control in VS Code

1. Open the Git menu and press **Ctrl** + **Shift** + **G** or click **View** and select **SCM**. 

1. Review your outstanding changes before you commit them with a message.

You can also switch branches. Refer to the [video on the VS Code docs](https://code.visualstudio.com/docs/introvideos/versioncontrol) for more information.

#### Integrated Terminal

1. Open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal) with **Ctrl** + **`** or click **View** and select **Terminal**. 

1. Interact with Git as you would normally, without leaving VS Code.

## Upload Local Changes with SFTP

Refer to the [Upload your Changes with SFTP](/guides/sftp/vscode-sftp#upload-your-changes-with-sftp) section of the [SFTP guide](/guides/sftp) for steps on how to upload local changes with the VS Code SFTP extension.

## CMS-specific Extensions

VS Code's basic functionality can be extended by adding third-party extensions, and a number of these exist for Drupal, WordPress, and PHP. Refer to the sites below for useful CMS-specific extensions.

- Drupal: [Drupal.org - Configuring Visual Studio Code](https://www.drupal.org/docs/develop/development-tools/configuring-visual-studio-code)
- WordPress: [Delicious Brains - Using VS Code for WordPress Development](https://deliciousbrains.com/vs-code-wordpress/)

## More Resources

- [Git on Pantheon](/guides/git)
- [Drush](/guides/drush)
- [WP-CLI on Pantheon](/guides/wp-cli)

