---
title: Refreshing DNS Records on Your Local Machine
description: Flush your DNS cache to clear and update the data.
category:
  - developing

---

## Overview
DNS is the main naming system for the internet, allowing computers to exchange data over TCP/IP. It takes any domain name, such as "pantheon.io" and "ties" it to an IP address like 50.57.202.75. The numbers identify computers to each other, and the names are easier for humanoids to remember.  


These numbers may change for many reasons (maybe because you are moving your site to Pantheon). As a result, your local laptop or PC may contain stale data. To fix this, you flush your DNS cache, which will clear and begin to update the data.

### Flush DNS in Windows:

1. Start > Run > type **cmd** to open the command prompt
2. Type `ipconfig /flushdns`
### Linux, restart the nscd daemon:
1. Type `/etc/rc.d/init.d/nscd restart` in your terminal
### Mac OS X Leopard:
1. type `lookupd -flushcache` in your terminal to flush the DNS resolver cache.
2. ex: `bash-2.05a$ lookupd -flushcache`
### Mac OS X:
1. Type `dscacheutil -flushcache` in your terminal to flush the DNS resolver cache.
2. ex: `bash-2.05a$ dscacheutil -flushcache`
