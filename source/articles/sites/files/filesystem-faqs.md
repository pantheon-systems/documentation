---
title: Filesystem FAQs
description: Understand writable errors and the Pantheon filesystem. 
category:
  - getting-started
filename: source/_guides/filesystem-faqs.md
---

Question: _I am curious why the Pantheon dashboard lists my file system as: Error, Writable (public download method)?_  


 ![](https://pantheon-systems.desk.com/customer/portal/attachments/284378)  


Answer: The root cause is that Drupal's warning you that your settings.php file is writable, and as a security precaution, you should change the permissions. However in our cloud filesystem, there's multiple layers of protection against exterior entities making changes to your files; so in reality this warning is not critical. If you'd like to address the error status, you can switch your site into SFTP mode, and change the permissions on the settings.php to 644.
