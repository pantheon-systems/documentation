---
title: Using WinSCP on Pantheon
parent_guide:
    - getting-started
filename: source/_docs/using-winscp-on-pantheon.md
---

[WinSCP](http://winscp.net/eng/index.php) is an Open source graphical SFTP client for Windows that also supports the Legacy SCP protocol.

### Getting Started

Make sure you have the Pantheon SFTP connection information for your site ready. If you need to locate the connection information you can take a look at the documentation on [how to find the SFTP credentials](/documentation/getting-started/developing-on-pantheon-directly-with-sftp-mode/-enabling-sftp-mode#sftp-connection-information) for your site.

### Download WinSCP

If you do not have WinSCP installed then go ahead and [download the latest version](http://winscp.net/eng/index.php) and get it running on your computer. The installation process is straightforward so we won't go over that here.

### Start the WinSCP client

Look for the package in the start menu and start the WinSCP application and enter in the connection information. Be sure to take note of the port as Pantheon uses a **non-standard port** for SFTP.

![Put in your Pantheon SFTP information](https://pantheon-systems.desk.com/customer/portal/attachments/50344)

### Adding the rsa2 key fingerprint

Select to accept the server's host key for the current session so it is stored in cache. This will allow you to connect to the server and to mange your files for the current session.

![RSA fingerprint](https://pantheon-systems.desk.com/customer/portal/attachments/50345)

### Manage your site's files

Once you are logged in you are directed to the root directory of your appserver. On the left side you will see your local computer and on the right you will have access to your site's appserver. To get to the Drupal root simply navigate to the `code` directory and you will be able to continue managing your files as normal.



 ![Connect to your Pantheon site](https://pantheon-systems.desk.com/customer/portal/attachments/50346)
