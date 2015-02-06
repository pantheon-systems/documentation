---
title: FileZilla on Pantheon
description: Detailed information about using the FileZilla FTP client.
category:
    - getting-started
    - developing


---

[FileZilla](http://winscp.net/eng/index.php) is a free open source FTP client that is available for Windows, Mac OS X, and Linux.

## Getting Started

The first thing that you need to do is have you SFTP credentials on hand, you will need this later to connect to Pantheon using FileZilla. There is some documentation on [how to find the SFTP credentials](/docs/articles/sites/code/developing-directly-with-sftp-mode/#SFTPConnectionInformation) for your site.

## Download FileZilla

If you do not have FileZilla installed then go ahead and [download the latest version](https://FileZilla-project.org/) and get it running on your computer. The installation process is straightforward so we won't go over that here.

## Start FileZilla

Look for the package in the start menu and start the FileZilla application and enter in the connection information. Be sure to take note of the port as Pantheon uses a **non-standard port** for SFTP and **protocol** needs to be SFTP, not FTP.

 ![start filezilla](/source/docs/assets/images/desk_images/50374) 

## Create a New Site

Select to accept the server's host key for the current session so it is stored in cache. This will allow you to connect to the server and to manage your files for the current session.  


 ![Create a saved connection](/source/docs/assets/images/desk_images/222984)

**NOTE:** Under the Advanced Tab, the Remote Directory should be left blank as shown below.   


 ![](/source/docs/assets/images/desk_images/272341)  


## Authentication

**SSH Key-Based:** Once you are logged in you are directed to the root directory of your appserver. On the left side you will see your local computer and on the right you will have access to your site's appserver.  


**Password-Based:** To get to the site's root simply navigate to the `code` directory and you will be able to continue managing your files as normal.

 ![enter your password](/source/docs/assets/images/desk_images/50376)

Select to accept the server's host key for the current session so it is stored in cache. This will allow you to connect to the server and to manage your files for the current session.

 ![File Manager](/source/docs/assets/images/desk_images/50377)
