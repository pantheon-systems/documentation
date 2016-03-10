---
title: Refreshing DNS Records on Your Local Machine
description: Flush your DNS cache to clear and update the data on your Pantheon site.
category:
  - developing
keywords: dns, dns records, cache, clush dns cache
---
DNS is the main naming system for the internet, allowing computers to exchange data over TCP/IP. It takes any domain name, such as "pantheon.io" and ties it to an IP address like 50.57.202.75. The numbers identify computers to each other, and the names are easier for humanoids to remember.  
These numbers may change for many reasons. As a result, your laptop or PC may contain stale data. To fix this, flush your DNS cache, which will clear and begin to update the data.

### Flush DNS in Windows

1. Start > Run > type **cmd** to open the command prompt
2. Type `ipconfig /flushdns`
### Linux: Restart the nscd Daemon
1. Type `/etc/rc.d/init.d/nscd restart` in your terminal
### Mac OS X Leopard
1. Type `lookupd -flushcache` in your terminal to flush the DNS resolver cache.
   Example: `bash-2.05a$ lookupd -flushcache`
### Mac OS X
1. Type `dscacheutil -flushcache` in your terminal to flush the DNS resolver cache.  
Example: `bash-2.05a$ dscacheutil -flushcache`
