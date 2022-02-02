---
title: Launch Essentials
subtitle: Advanced cURLs
description: Part five of our Launch Essentials guide covers guidelines for using advanced cURL techniques to prepare a site for launch.
anchorid: advanced-curls
layout: guide
showtoc: true
categories: [go-live]
tags: [backup, launch, webops]
type: guide
permalink: docs/guides/launch/advanced-curls/
editpath: launch/05-advanced-curls.md
image: getting-started-Largethumb
---

In this lesson, we’ll use advanced cURL techniques to Test a domain not resolved to Pantheon yet, use the Pantheon Debugger, and suppress certificate errors.

## Test a Domain not Resolved to Pantheon

When you’re migrating a site, you may want to ensure that the site responds correctly to the given host name, but if the DNS is not yet pointed at Pantheon, you won’t be able to do this. A common way around this is to use the `/etc/hosts` file to change your local DNS resolution. Another way is to use cURL’s `--resolve` option, which provides a custom address for a specific host and port pair. cURL `--resolve` requests inserts the specified address into cURL's DNS cache. This overrides the DNS lookup and prevents the normally resolved IP address from being used. 

For example, if you wanted to request `myexamplesite.com` from `23.185.0.1`:

```bash
curl https://www.myexamplesite.com --resolve www.myexamplesite.com:443:23.185.0.1
```

If you want to compare the old site with the new site without DNS changes:

```bash
diff <(curl -s https://myexamplesite.com) <(curl -s --resolve myexamplesite.com:443:23.185.0.1 https://mycoolwebsite.com)
```

This will show differences between the two sites line-by-line, while only resolving the second site from Pantheon’s platform using that domain.

## Use the Pantheon Debugger

## Suppress Certificate Errors
