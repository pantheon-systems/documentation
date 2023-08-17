---
title: Object Cache Pro on Pantheon
subtitle: Introduction
description: Learn about Object Cache Pro on Pantheon.
tags: [cache]
contributors: [jazzsequence]
type: guide
showtoc: true
permalink: docs/guides/object-cache-pro/
editpath: object-cache-pro/01-introduction.md
contenttype: [guide]
innav: [true]
categories: []
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2023-03-27"
---

This guide provides information on how to install and configure [Object Cache Pro](https://objectcache.pro) on the Pantheon platform.

## What is Object Cache Pro?

Object Cache Pro is a highly optimized premium WordPress plugin that integrates with Redis for business class performance. It provides an easy-to-use administration page with analytics to show current benchmarks. Object Cache Pro is specifically optimized for WordPress and popular WordPress plugins, including:

- Query Monitor
- WooCommerce
- Jetpack
- Yoast SEO

![Object Cache Pro admin page](../../../images/guides/object-cache-pro/object-cache-pro-analytics.png)

### How does Object Cache Pro work?

Object Cache Pro reduces page load time and the overall load on Redis by combining Redis commands into server request batches.

Object Cache Pro also optimizes for performance, using compressed data to maintain a small footprint in memory, while avoiding unnecessary Redis reads and writes. Object Cache Pro has been tested extensively against WooCommerce, is fully compliant with the WordPress Object Cache API, and integrates seamlessly into WordPress.
