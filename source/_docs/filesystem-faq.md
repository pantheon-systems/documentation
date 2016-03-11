---
title: Filesystem Writable Error
description: Understand writable errors and the Pantheon website management system architecture.
categories:
  - getting-started
keywords: filesystem, error writable, public download method, writable, settings.php, filesystem error, file permissions, permissions
---
#### Why Does the Pantheon Dashboard List My File System as: Error, Writable (public download method)?
 ![Launch check file system error](/source/assets/images/desk_images/284378.png)  
 Drupal is warning you that your settings.php file is writable, and as a security precaution, you should change the permissions. However, in our cloud filesystem, there are multiple layers of protection against exterior entities making changes to your files, so in reality this warning is not critical. If you'd like to address the error status, you can switch your site into SFTP mode, and change the permissions on the settings.php to 644.
