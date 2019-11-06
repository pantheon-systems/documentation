---
title: Modify the Local Hosts File
description: How to find and modify a local hosts file.
tags: [local, dns]
categories: []
contributors: [alexfornuto]
---

The `hosts` file exists on all major operating systems. It's a list of IP addresses and domains that takes precedence over DNS assigned values. You can modify your `hosts` file to test domain-specific settings leading up to a migration, before DNS records have been updated.

<Partial file="_hosts-file.md" />

### How to get the IP equivalent of your Pantheon environment that you can use in your hosts file

In your Terminal, do (replace dev-example.pantheonsite.io with yuour site's url):

```bash
dig +short dev-example.pantheonsite.io
93.184.216.XX
```
