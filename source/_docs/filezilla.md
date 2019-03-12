---
title: FileZilla on Pantheon
description: Information about using the FileZilla FTP client for your Pantheon Drupal or Wordpress site.
tags: [sftpfiles]
categories: []
---

[FileZilla](https://FileZilla-project.org/) is a free open source FTP client that is available for Windows, Mac OS X, and Linux.

## Getting Started

Make sure you have your SFTP credentials on hand, you will need this later to connect to Pantheon using FileZilla. See [how to find the SFTP credentials](/docs/sftp#sftp-connection-information) for your site.

## Download FileZilla

If you do not have FileZilla installed, [download the latest version](https://FileZilla-project.org/) and install it on your computer.

## Configure FileZilla

Open FileZilla  and launch the Site Manager by clicking the first icon in the menu bar, or by going to the **File Menu > Site Manager** option. From the Site Manager screen, click the **New Site** button.

Enter your SFTP connection details:

![Adding a new site to the Site Manager](/docs/assets/images/filezilla-new-site.png "The Filezilla Site Manager")

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">
Be sure to set the **Protocol:** to `SFTP` (*not* `FTP`) and the server port to `2222`.
</p>
<p markdown="1">
Under the **Advanced** Tab, leave the Remote Directory blank.
</p>
</div>

### Authentication

Select from one of the following **Logon Type:** options in the General tab:

 - For **SSH Key-Based** authentication set the **Logon Type:** dropdown to "Key file". In the **Key file:** box enter the path to or browse and select your private SSH key (usually named `id_rsa`) associated with the public key loaded into your User Dashboard.

    <div class="alert alert-info" role="alert">
    <h4 class="info">Note</h4>
    <p markdown="1">
    The "Browse..." button may not show hidden files or directories, which can make it difficult to navigate to your `.ssh` directory. If you cannot navigate to your `.ssh` folder you can enter the full path to the file in the **Key file:** box.
    </p>
    <p markdown="1">
    On MacOS, you can make hidden files and folders visible in the Open File window with the command **⌘ CMD + ⇧ SHIFT + . (period)** .
    </p>
    </div>

 - For **Password-Based** authentication set the **Logon Type:** dropdown to "Normal" and then enter your Pantheon account email address and your password. You can also select the "Ask for password" type if you don't want to save the password and instead be prompted for it every time you can connect.

### Connection Prompt

When you first connect via SFTP you may be prompted to accept the server's host key and store it in cache for future connections. This allows you to connect to the server and manage your files for the current session.

## Access Code and Files

After logging in, you can access your application code in the `/code` directory.

Your file uploads (Drupal's `sites/default/files` and WordPress's `wp-content/uploads`) can be found in the `files` directory.  Your log files can be found in the `/logs` directory.

## Troubleshooting

### Uploading to the Files Directory
FileZilla does not correctly upload files when the target directory on Pantheon is `files`. We recommend setting the target directory to `code/sites/default/files`, which is a symlink to `files` on Pantheon. If you experience issues using FileZilla, try the task using an alternate program such as [Transmit](https://panic.com/transmit/) (Mac OS) or [WinSCP](/docs/winscp) (Windows).

### nodename nor servname provided, or not known
The following error is caused by an invalid hostname, most often the result of a typo:

```bash
Error:            ssh_init: nodename nor servname provided, or not known
Error:            Could not connect to server
```

Double check settings and resolve typos to fix this issue.

### Site Manager
Features offered in the FileZilla Site Manager (like [Synchronized Browsing](https://wiki.filezilla-project.org/Using#Synchronized_Browsing){.external}) are not supported because the Pantheon platform sometimes migrates sites across appservers without warning and the non-static binding string will change. This means that while you can set up your site in the Site Manager, you will need to reconfigure the login information and file paths whenever the dev environment site binding changes.

The value for **Default remote directory** in the Site Manager can be copied from the **Remote site** field in the main window, and you can append `code` to the path to synchronize with your local codebase. Remember that the site binding is subject to change. 

### Quickconnect is refusing to connect

The following error is always thrown when using the Quickconnect option in FileZilla:


```bash
Error:        	Cannot establish FTP connection to an SFTP server. Please select proper protocol.
Error:        	Critical error: Could not connect to server
```

Quickconnect does not give options for protocol selection. You need to manually add the protocol (`sftp://`) in the **Host** field.
