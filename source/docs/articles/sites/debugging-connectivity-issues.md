---
title: Debugging Connectivity Issues
description: Learn how to test and resolve connectivity issues.
keywords: debugging, connection issues, connectivity issues
---

##Connectivity Error Message
The following indicates that there was a networking error when attempting to connect:
```
Command:    open "dev.b098f987-asf7-47af-d0a9s-po7s987f342497@appserver.dev.b098f987-asf7-47af-d0a9s-po7s987f342497.drush.in" 2222
Error:  ssh_init: Host not found
Error:  Could not connect to server''
Debugging connectivity issues
```
Services such as MySQL and SFTP are running; however, the local client is unable to connect due to an idled container or DNS issues. Before further troubleshooting, wake the environment by loading the home page or via the following [Terminus](/docs/articles/local/cli/) command:
```
terminus site wake --site=<site-name> --env=<env>
```
### Resolve DNS Issues
Check to see if you get an IP address returned when you run the following command, replacing `<xxx>` with your site’s UUID:  
```
dig @8.8.8.8 dig codeserver.dev.<xxx>.drush.in +short
```

If there is no IP in the output, the ISP is failing to recognize the hostname.

The next step is to test this command with name server, in this case Google’s 8.8.8.8 IP address:

```
dig @8.8.8.8 dig codeserver.dev.<xxx>.drush.in +short
192.317.200.218
```

<div class="alert alert-info" role="alert">
<h4>Note</h4>
If an IP address is returned, it means that by using Google’s DNS you were able to resolve the hostname. Set your DNS to use <a href="https://developers.google.com/speed/public-dns/">Google’s service</a>, or another provider, and you should be able to connect.
</div>


###Port 2222 or Other Blocked Ports
Make sure the port number is not blocked by your internal firewall. For example, to test whether port 2222 is blocked visit [http://portquiz.net:2222/](http://portquiz.net:2222/)

##Test Connection on the Command Line
We recommend using the command line when troubleshooting connection issues as GUIs can hide underlying errors. From the site Dashboard, copy the provided connection command for the desired service and run it in terminal.
