---
title: Redirects Guide
subtitle: Set the Primary Domain
description: 
categories: [go-live]
tags: [dns, https, redirects]
layout: guide
contributors: [wordsmither]
reviewed: "2022-08-01"
showtoc: true
permalink: docs/guides/redirect/primary-domain
anchorid: primary-domain
---

Pantheon uses the term **primary domain** to refer to a single domain used to serve all traffic from a site. For example, configuring `www.example.com` as the primary domain means that requests to `example.com` (or any other custom domain connected to the environment) all get redirected to `www.example.com`. This assumes that you have added **both** `example.com` and `www.example.com` to the Site Dashboard.

Redirecting all traffic to a primary domain is a best practice for SEO since it avoids duplicate content. It also prevents session strangeness, where a user can be logged in to one domain but logged out of other domains at the same time, and it can make it easier to measure and monitor website traffic.

<Partial file="primary-domain.md" />

<Partial file="remove-primary-domain.md" />
