---
title: SFTP FAQs
categories:
  - getting-started
permalink: documentation/getting-started/sftp-faqs/
Metadata
filename: source/_common-tasks/sftp-faqs.md
---

## SFTP Connection Issues

    Status:	Connecting to appserver.dev.dc82c743-3088-426f-bfcf-e388e4add2b3.drush.in:2222...
    Response:	fzSftp started
    Command:	open "dev.dc82c743-3088-426f-bfcf-e388e4add2b3@appserver.dev.dc82c743-3088-426f-bfcf-e388e4add2b3.drush.in" 2222
    Error:	ssh_init: Host does not exist
    Error:	Could not connect to server

The vast majority of SFTP connection problems are DNS related and can be resolved by using Google's Public DNS service in place of your ISP's name servers. Instructions here:  [Google's Public DNS](https://developers.google.com/speed/public-dns/)

If you're already using Google's DNS, or you're still having connection issues after updating your name-servers, consider trying an alternative SFTP client. Many times when FileZilla won't connect, we've seen that Cyberduck (or another client) will. [List of SFTP clients](http://en.wikipedia.org/wiki/Comparison_of_FTP_client_software).

## System Maintenance
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/321456)​

_We're performing system maintenance on your development environment right now which prevents us from being able to commit your changes. The system maintenance shouldn't take long and this message will disappear once it's done._

If your _Dev_ environment's app-container is ever being migrated (which occasionally happens automatically) you may see this message if you have pending SFTP changes. Check back shortly and the migration should be complete, the error message will go away, and you can commit the pending changes.


