---
title: Debugging Connectivity Issues
description: Learn how to test and resolve connectivity issues affecting your Pantheon sites.
categories: [troubleshoot]
tags: [cli, ssh]
---

## Connectivity Error Message

The following indicates that there was a networking error when attempting to connect:

```none
Command:    open "dev.b098f987-asf7-47af-d0a9s-po7s987f342497@appserver.dev.b098f987-asf7-47af-d0a9s-po7s987f342497.drush.in" 2222
Error:  ssh_init: Host not found
Error:  Could not connect to server''
Debugging connectivity issues
```

Services such as MySQL and SFTP are running; however, the local client is unable to connect due to an idled container or DNS issues. Before further troubleshooting, wake the environment by loading the home page or via the following [Terminus](/terminus) command:

```bash{promptUser: user}
terminus env:wake site.env
```

Replace `site` and `env` with your site name and the correct environment

### Resolve DNS Issues

Some ISPs have issues resolving a `drush.in` hostname. Troubleshoot connection errors using the following `dig` command,  replacing `<xxx>` with your [site’s UUID](/sites/#site-uuid):

```bash{promptUser: user}
dig codeserver.dev.<xxx>.drush.in +short
```

If there is no IP provided in the output, the default DNS server used for the query (typically configured by your ISP) has failed to recognize the hostname. Run the query again with an alternate DNS server specified, such as one of [Google’s Public DNS IP Addresses](https://developers.google.com/speed/public-dns/docs/using#google_public_dns_ip_addresses):

```bash{outputLines: 2}
dig @8.8.8.8 dig codeserver.dev.<xxx>.drush.in +short
192.317.200.218
```

If an IP address is returned, [configure your network settings to use Google Public DNS](https://developers.google.com/speed/public-dns/docs/using#configure_your_network_settings_to_use_google_public_dns).

### Port 2222 or Other Blocked Ports

Make sure the port number is not blocked by your internal firewall. For example, to test whether port 2222 is blocked visit [http://portquiz.net:2222/](http://portquiz.net:2222/)

If you are not able to access port 2222, you can try our [workaround](/port-2222).

## Test Connection on the Command Line

We recommend using the command line when troubleshooting connection issues as GUIs can hide underlying errors. From the site Dashboard, copy the provided connection command for the desired service and run it in terminal.
