---
title: WordPress Plugins and Themes with Known Issues
subtitle: J Plugins
description: A list of WordPress plugins beginning with J that are not supported and/or require workarounds.
tags: [plugins, themes, code]
categories: [help]
newcms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-03-24"
contenttype: [guide]
layout: guide
showtoc: true
permalink: docs/guides/wp-plugins-themes-known-issues/directory/j-plugins
anchorid: j-plugins
---

## Jetpack

<ReviewDate date="2022-03-09" />

**Issue:** [Jetpack](https://wordpress.org/plugins/jetpack/) requires the XMLRPC interface to communicate with [Automattic](https://automattic.com/) servers. The Pantheon WordPress upstream [disables access to the XMLRPC endpoint](/wordpress-best-practices#avoid-xml-rpc-attacks) by default as it is a common scanning target for bots and receives a lot of invalid traffic.

**Solution:**

<Partial file="jetpack-enable-xmlrpc.md" />

<Alert title="Note"  type="info" >

Pantheon does not support XML-RPC if it is enabled. You must resolve any issues you experience from enabling XMLPRC on your own.

</Alert>

___