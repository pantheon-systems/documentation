---
title: Using WinSCP on Pantheon
description: Detailed information about the WinSCP SFTP client.
category:
  - getting-started
  - developing

---

[WinSCP](http://winscp.net/eng/index.php) is an open source graphical SFTP client for Windows that also supports the Legacy SCP protocol.

## Getting Started

Make sure you have the Pantheon SFTP connection information for your site ready. If you need to locate the connection information, take a look at the documentation on [how to find the SFTP credentials](/docs/articles/sites/code/developing-directly-with-sftp-mode#enabling-sftp-mode#sftp-connection-information) for your site.

## Download WinSCP

If you do not have WinSCP installed, [download and install the latest version](http://winscp.net/eng/index.php).

## Start the WinSCP Client

Start the WinSCP application and enter the connection information. Be sure to take note of the port as Pantheon uses a **non-standard port** for SFTP.

![Put in your Pantheon SFTP information](https://www.getpantheon.com/sites/default/files/docs/desk_images/50344)

## Add the rsa2 Key Fingerprint

Select to accept the server's host key for the current session so it is stored in cache. This will allow you to connect to the server and manage your files for the current session.

![RSA fingerprint](https://www.getpantheon.com/sites/default/files/docs/desk_images/50345)

## Manage Files

Once you are logged in, you are directed to the root directory of your appserver. On the left side you will see your local computer, and on the right you will have access to your site's appserver. To get to the Drupal  or WordPress root, simply navigate to the `code` directory and you will be able to continue managing your files as normal.



 ![Connect to your Pantheon site](https://www.getpantheon.com/sites/default/files/docs/desk_images/50346)
