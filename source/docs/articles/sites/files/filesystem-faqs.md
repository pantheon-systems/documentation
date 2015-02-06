---
title: Drupal File System Error
description: Understand writable errors and the Pantheon filesystem.
category:
  - getting-started

---

## File System Error on Status Page

The root cause is that Drupal's warning you that your settings.php file is writable, and as a security precaution, you should change the permissions. However, in our cloud filesystem, there are multiple layers of protection against exterior entities making changes to your files; so in reality this warning is not critical. If you'd like to address the error status, you can switch your site into SFTP mode, and change the permissions on the settings.php to 644.


 ![](https://www.getpantheon.com/sites/default/files/docs/desk_images/284378)  
