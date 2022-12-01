---
title: Redirects Guide
subtitle: Redirect to HTTPS
description: Learn how to redirect HTTPS sites.
contenttype: [guide]
categories: [domains]
newcms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [dns, https, redirects]
layout: guide
contributors: [wordsmither]
reviewed: "2022-08-01"
permalink: docs/guides/redirect/https/
anchorid: https
---

The standard best practice when using HTTPS is to set an [HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) header to force connections over HTTPS only.

This configuration is recommended as part of the going live procedure. Configure these settings after connecting a custom domain in the Site Dashboard when you're ready to launch the site.

## Set HSTS with Pantheon.yml

This is the preferred method of setting HTTPS & HSTS for your site. 

1. Locate the `enforce_https` setting in your site's [pantheon.yml](/pantheon-yml) file.

1. Select one of the values in the table below to direct the `enforce_https` setting.

<Partial file="hsts.md" />

## More Resources

- [Configure DNS and Provision HTTPS](/guides/global-cdn/https)

- [Global CDN Guide](/guides/global-cdn)