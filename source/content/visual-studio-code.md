---
title: Configuring Visual Studio Code on Pantheon 
description: Configure a local environment for development using Visual Studio Code.
tags: [local, sftp]
---

## Overview
[Visual Studio Code](https://code.visualstudio.com/), or **VS Code**, is an open-source code editor that runs on Windows, Linux, and Mac OS.

This article covers setting up a Pantheon site in VS Code and using the SFTP extension to sync code between your Pantheon site and your local machine. 

## Before You Begin
1. [Create a site](/create-sites) on Pantheon, or browse to the Dev environment Dashboard of an existing site.
2. Use [SFTP](/rsync-and-sftp#sftp), [rsync](/rsync-and-sftp#rsync) or [Git](/git#clone-your-site-codebase) to clone your site files on the Dev environment down to your local machine.
3. Download and install [VS Code](https://code.visualstudio.com/). 

## Create a VS Code workspace

In VS Code, a workspace contains settings for your project, including recommended extensions, configuration for extensions, and project-specific debugging configuration. 

1. From the Welcome screen, click on **Open folder** under the **Start** heading:

  ![The Open folder option from the Visual Studio Code Start screen](../images/vscode-open-folder.png)

2. Navigate your filesystem and select the directory containing your site code (e.g, `~/sites/mysite`).
3. Save this as a Workspace by selecting  from the **File** menu: **Save Workpace As**.

Workspace settings are stored in a file called `.code-workspace` at the root of your project. It is recommended to keep this file out of Git by adding it to your `.gitignore` file at either the site or global level:

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

At this point, you should see your site files in the File Explorer on the left side of VS Code, and you can open any of these for editing in the main window by clicking on the file name.

## Deploy your local code changes to a Pantheon environment

Once you've made some code changes, you'll want to push those up to your Pantheon Dev or Multidev environment. You can do this using Git, or with SFTP.

### Push your changes with Git (recommended)
VS Code includes Git integration and an integrated terminal, either of which can be used to make Git changes and push them back to your Pantheon repository and Dev environment.

Make sure your site is in [Git mode](//guides/quickstart/connection-modes) before pushing code via Git.

#### [Git Version Control in VS Code](https://code.visualstudio.com/docs/introvideos/versioncontrol)
Open the Git menu (**Ctrl/Command + Shift + X** or **View** -> **Extensions**). From here you can review your outstanding changes, commit them with a message, switch branches and more. See the video for more information.

#### [Integrated Terminal](https://code.visualstudio.com/docs/editor/integrated-terminal)
Open the integrated terminal with **Ctrl + `** or **View** -> **Terminal**. Now you can interact with Git as you would normally, without leaving VS Code.

### Upload your changes with SFTP
The SFTP extension for VS Code allows developers to upload code to your Pantheon Dev or Multidev environment directly from VS Code, as well as downloading files from the Pantheon servers.

<Alert type="info" title="note">

Due to the structure of the Pantheon filesystem, you'll want to nest your site in a directory called "code" in order for code uploads and downloads to land in the right place on the remote server without hard-coding the full remote server path.

</Alert>

\\@todo Add example screenshot and caption

1. Install the VS Code [SFTP Extension](https://marketplace.visualstudio.com/items?itemName=liximomo.sftp).
2. Open the VS Code command palette (`Ctrl+Shift+P` on Windows/Linux or `Cmd+Shift+P` on Mac) and run `SFTP: config` to open the SFTP config file.
3. @todo \\the config file
4. @todo \\upload something
5. Commit your files to Git using the Pantheon Dashboard.

Make sure your site is in [SFTP mode](//guides/quickstart/connection-modes) before uploading code via SFTP.


## CMS-specific Extensions

VS Code's basic functionality can be extended by adding third-party extensions, and a number of these exist for Drupal, WordPress, and PHP. Refer to the sites below for useful CMS-specific extensions.

* Drupal: https://www.drupal.org/docs/develop/development-tools/configuring-visual-studio-code
* WordPress: https://deliciousbrains.com/vs-code-wordpress/ 
