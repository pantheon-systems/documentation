---
title: Redirects Guide
subtitle: Redirect to HTTPS
description: 
categories: [go-live]
tags: [dns, https, redirects]
layout: guide
contributors: [wordsmither]
reviewed: "2022-08-01"
showtoc: true
permalink: docs/guides/redirect/https/
anchorid: https
---

The standard best practice when using HTTPS is to set an [HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) header to force connections over HTTPS only.

These redirect configuration are considered best practice and recommended as part of the going live procedure. Configure these settings after connecting a custom domain in the Site Dashboard when you're ready to launch the site.

## Set HSTS with Pantheon.yml

This is the preferred method of setting HTTPS & HSTS for your site. Find the `enforce_https` setting in your site's [pantheon.yml](/pantheon-yml) file.

<Partial file="hsts.md" />
