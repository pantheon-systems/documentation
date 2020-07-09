---
title: Modify the Local Hosts File
description: How to find and modify a local hosts file.
tags: [local, dns]
category: [go-live,develop]
contributors: [alexfornuto]
---

The `hosts` file exists on all major operating systems. It's a list of IP addresses and domains that takes precedence over DNS assigned values. You can modify your `hosts` file to test domain-specific settings leading up to a migration, before DNS records have been updated.

<Partial file="_hosts-file.md" />

To get the IP address of your Pantheon environment to use in your hosts file. You can use dig. Replace `dev-example.pantheonsite.io` with your site's domain:

```bash{outputLines:2}
dig +short dev-example.pantheonsite.io
203.0.113.42
```
