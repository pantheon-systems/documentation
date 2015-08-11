---
title: FileZilla on Pantheon
description: Detailed information about using the FileZilla FTP client for your Pantheon site.
category:
    - getting-started
    - developing
keywords: filezilla, pantheon, sftp
---
[FileZilla](http://winscp.net/eng/index.php) is a free open source FTP client that is available for Windows, Mac OS X, and Linux.

## Getting Started

Make sure you have your SFTP credentials on hand, you will need this later to connect to Pantheon using FileZilla. See [how to find the SFTP credentials](/docs/articles/sites/code/developing-directly-with-sftp-mode/#sftp-connection-information) for your site.

## Download FileZilla

If you do not have FileZilla installed, [download the latest version](https://FileZilla-project.org/) and install it on your computer.

## Start FileZilla

Open the FileZilla application and enter in the connection information. Be sure to take note of the port as Pantheon uses a **non-standard port** for SFTP and **protocol** needs to be SFTP, not FTP.<br />

## Create a New Site

Select to accept the server's host key for the current session so it is stored in cache. This allows you to connect to the server and manage your files for the current session.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Under the Advanced Tab, leave the Remote Directory blank.  </div>

## Authentication

**SSH Key-Based:** Once you are logged in, you are directed to the root directory of your appserver. Your local computer is shown on the left, and the right shows your site's appserver.  

**Password-Based:** To get to the site's root, navigate to the `code` directory and continue managing your files as normal.

Select to accept the server's host key for the current session so it is stored in cache. This allows you to connect to the server and manage your files for the current session.
