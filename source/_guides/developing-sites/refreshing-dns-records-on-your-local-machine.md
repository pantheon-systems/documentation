---
title: Refreshing DNS Records on your Local Machine
parent_guide:
  - developing
filename: source/_docs/refreshing-dns-records-on-your-local-machine.md
---

DNS is the main naming system for the internet, allowing computers to exchange data over TCP/IP. It takes any domain name, such as "getpantheon.com" and "ties" it to an IP address like 24.102.112.16. The numbers identify computers to each other, and the names are easier for humanoids to remember.  


These numbers may change for many reasons (maybe because you are moving your site to Pantheon)! As a result, your local laptop or PC may contain stale data. To fix this, you flush your dns cache, which will clear and begin to update the data. Here is how to do it.  


To flush DNS in Windows:

1. Start -> Run -> type cmd to open the command prompt
2. Type ipconfig /flushdns
Linux, restart the nscd daemon:
1. Type /etc/rc.d/init.d/nscd restart in your terminal
Mac OS X Leopard:
1. type lookupd -flushcache in your terminal to flush the DNS resolver cache.
2. ex: bash-2.05a$ lookupd -flushcache
Mac OS X:
1. Type dscacheutil -flushcache in your terminal to flush the DNS resolver cache.
2. ex: bash-2.05a$ dscacheutil -flushcache
