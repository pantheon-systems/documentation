---
title: FileZilla on Pantheon
description: Detailed information about using the FileZilla FTP client.
category:
    - howto


---

[FileZilla](http://winscp.net/eng/index.php) is a free open source FTP client that is available for Windows, Mac OS X, and Linux.

## Getting Started

The first thing that you need to do is have you SFTP credentials on hand, you will need this later to connect to Pantheon using FileZilla. There is some documentation on [how to find the SFTP credentials](/documentation/getting-started/developing-on-pantheon-directly-with-sftp-mode/-on-server-development#connecting-via-sftp) for your site.

## Download FileZilla

If you do not have FileZilla installed then go ahead and [download the latest version](https://FileZilla-project.org/) and get it running on your computer. The installation process is straightforward so we won't go over that here.

## Start FileZilla

Look for the package in the start menu and start the FileZilla application and enter in the connection information. Be sure to take note of the port as Pantheon uses a **non-standard port** for SFTP and **protocol** needs to be SFTP, not FTP.

 ![start filezilla](https://pantheon-systems.desk.com/customer/portal/attachments/50374) 

## Create a New Site

Select to accept the server's host key for the current session so it is stored in cache. This will allow you to connect to the server and to manage your files for the current session.  


 ![Create a saved connection](https://pantheon-systems.desk.com/customer/portal/attachments/222984)

**NOTE:** Under the Advanced Tab, the Remote Directory should be left blank as shown below.   


 ![](https://pantheon-systems.desk.com/customer/portal/attachments/272341)  


## Authentication

**SSH Key-Based:** Once you are logged in you are directed to the root directory of your appserver. On the left side you will see your local computer and on the right you will have access to your site's appserver.  


**Password-Based:** To get to the Drupal root simply navigate to the `code` directory and you will be able to continue managing your files as normal.

 ![enter your password](https://pantheon-systems.desk.com/customer/portal/attachments/50376)

Select to accept the server's host key for the current session so it is stored in cache. This will allow you to connect to the server and to manage your files for the current session.

 ![File Manager](https://pantheon-systems.desk.com/customer/portal/attachments/50377)
