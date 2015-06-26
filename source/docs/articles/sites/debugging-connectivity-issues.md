---
title: Debugging Connectivity Issues
description: Learn how to test and resolve connectivity issues.
keywords: debugging, connection issues, connectivity issues
---

##Connectivity Error Message
```
Command:    open "dev.b098f987-asf7-47af-d0a9s-po7s987f342497@appserver.dev.b098f987-asf7-47af-d0a9s-po7s987f342497.drush.in" 2222
Error:  ssh_init: Host not found
Error:  Could not connect to server''
Debugging connectivity issues
```

This message indicates that there was a networking error and you cannot connect to a service i.e., problems connecting via SFTP.

Services such as MySQL and SFTP are running; however, the local client is unable to connect as you may have DNS issues.

MySQL connections: The database server for the development environment often needs to be woken up to establish the connection. Database servers 'sleep' after two hours of inactivity. Wake up the DB server and establish the connection by visiting the URL of the Dev or Test site.

### Resolve DNS Issues
Check to see if you get an IP address returned when you run the following command, replacing “” with your site’s UUID:  
`
dig @8.8.8.8 dig codeserver.dev.<xxx>.drush.in +short
`

If there is no IP in the output, the ISP on the network you are on is failing to recognize the hostname.

The next step is to test this command with name server, in this case Google’s 8.8.8.8 IP address:

`
dig @8.8.8.8 dig codeserver.dev.<xxx>.drush.in +short
192.317.200.218
`

If an IP address is returned, it means that by using Google’s DNS you were able to resolve the hostname. To resolve the issue, set your DNS to use [Google’s service](https://developers.google.com/speed/public-dns/), or another provider, and you should be able to connect:


###Port 2222
Make sure that port 2222 is not being blocked by your internal firewall. Once that is configured correctly, you should be able to connect.

##Verify Your Connection

We recommend using the command line during debugging as some GUIs and clients may hide the underlying errors. Open your terminal and run:

`
sftp -o Port=2222 dev.b098f987-asf7-47af-d0a9s-po7s987f342497@appserver.dev.b098f987-asf7-47af-d0a9s-po7s987f342497.drush.in sftp
`
