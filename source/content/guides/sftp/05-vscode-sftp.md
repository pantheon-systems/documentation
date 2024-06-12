---
title: SFTP on Pantheon
subtitle: Visual Studio Code SFTP Extension
description: Learn how to upload local changes with Visual Studio Code's SFTP extension.
tags: [files, sftp, rsync]
innav: [false]
categories: [sftp]
cms: [drupal, wordpress]
audience: [development]
product: [dashboard]
integration: [--]
showtoc: true
permalink: docs/guides/sftp/vscode-sftp
---

This section provides information on how to upload local changes in Visual Studio (VS) Code.

## Before You Begin

1. [Create a site](/guides/legacy-dashboard/create-sites) on Pantheon, or browse to the Dev environment Dashboard of an existing site.

1. Use [SFTP](/guides/sftp/rsync-and-sftp), [rsync](/guides/sftp/rsync-and-sftp), or [Git](/guides/git/git-config#clone-your-site-codebase) to clone your site files on the Dev environment down to your local machine.

  You must place your site code in a subdirectory called `code` (for example, `~/sites/mysite/code`) to upload code changes via SFTP. This aligns with the file structure on the platform when using [SFTP mode](/guides/sftp).

1. Download and install [VS Code](https://code.visualstudio.com/).

1. Create a [VS Code Workspace](/guides/local-development/visual-studio-code#create-a-vs-code-workspace).

### Upload your Changes with SFTP

The SFTP extension for VS Code allows you to upload code to the Pantheon Dev or Multidev environment directly from VS Code, as well as download files from the Pantheon servers to your local machine.

1. Verify that your site is in [SFTP mode](/guides/sftp#sftp-mode) before uploading code via SFTP.

1. Install the VS Code [SFTP Extension](https://marketplace.visualstudio.com/items?itemName=liximomo.sftp).

1. Open the VS Code command palette (**Ctrl/Command** + **Shift** + **P**) and run `SFTP: config` to open the SFTP config file.

1. Edit the file using the connection information from your Site Dashboard, under the **Connect with SFTP** button in **Development Mode**. Remove the `remotePath` line, as the path is subject to change and you'll be automatically directed to the correct location:

  ```json:title=sftp.json
  {
      "name": "My Site",
      "host": "appserver.dev.YOUR-SITE-UUID.drush.in",
      "protocol": "sftp",
      "port": 2222,
      "username": "dev.LOGIN-UUID",
      "uploadOnSave": true
  }
  ```

1. Include the path to your [SSH Key](/ssh-keys).

  ```json:title=sftp.json
  {
      "name": "My Site",
      "host": "appserver.dev.YOUR-SITE-UUID.drush.in",
      "protocol": "sftp",
      "port": 2222,
      "username": "dev.LOGIN-UUID",
      "uploadOnSave": true,
      //highlight-next-line
      "privateKeyPath": "/Users/localUser/.ssh/id_rsa"

  }
  ```

  <Alert title="Warning" type="danger">

  You must convert your key to PEM format if you use an RSA key and get the following error:

  `Error while signing data with privateKey: error:06000066:public key routines:OPENSSL_internal:DECODE_ERROR`

  Run the code below to convert your key:

  ```bash
  ssh-keygen -p -m PEM -f ~/.ssh/id_rsa
  ```

  This may have unintended consequences if you're using this key to authenticate to other systems. We recommend making a new key specifically for this application to convert.

  Refer to [this issue](https://github.com/liximomo/vscode-sftp/issues/594) on the [vscode-sftp](https://github.com/liximomo/vscode-sftp) plugin GitHub repo for more information.

  </Alert>

1. Set `uploadOnSave` to `true`. The next time you save changes to a file it will automatically be pushed to Pantheon.

1. [Commit your files to Git using the Pantheon Dashboard](/guides/sftp/sftp-development#commit-sftp-changes).

## More Resources

- [Local Development on Pantheon](/guides/local-development)
