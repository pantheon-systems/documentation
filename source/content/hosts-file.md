---
title: Modify the Local Hosts File
description: How to find and modify a local hosts file.
categories: [go-live]
tags: [cli, dns, local]
contributors: [alexfornuto]
reviewed: "2020-11-16"
---

The `hosts` file exists on all major operating systems. It's a list of IP addresses and domains that takes precedence over DNS assigned values. You can modify your `hosts` file to test domain-specific settings leading up to a migration, before DNS records have been updated, or to help with [local development](/local-development).

<Partial file="_hosts-file.md" />

## Configure Your Hosts File With a Local Alias to Your Pantheon Environment

1. Use `dig` to get the IP address of your Pantheon environment to use in your `hosts` file. Replace `dev-example.pantheonsite.io` with your site's domain:

 ```bash{outputLines:2}
 dig +short dev-example.pantheonsite.io
 203.0.113.42
 ```

1. Edit the `hosts` file as shown above to map the result to a local alias that makes it easier for you:

 ```none
 203.0.113.42    dev-example
 ```
