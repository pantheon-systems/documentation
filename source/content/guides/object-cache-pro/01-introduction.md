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

<Alert title="Early Access Software" type="info">

Pantheon's Object Cache Pro is available for [Early Access](/guides/support/early-access/) participants. Features for Object Cache Pro are in active development. However, Object Cache Pro is a stable product and is in use on production sites. Refer to the email you received when you signed up for Object Cache Pro Early Access if you have questions. Please review Pantheon's [Software Evaluation Licensing Terms](https://legal.pantheon.io/#contract-hkqlbwpxo) for more information about access to our software.

</Alert>

This guide provides information on how to install and configure [Object Cache Pro](https://objectcache.pro) on the Pantheon platform. We are currently evaluating making Object Cache Pro available to users who have access to Redis object cache. Refer to the [How do I sign up for Object Cache Pro on Pantheon](/guides/object-cache-pro/#how-do-i-sign-up-for-object-cache-pro-on-pantheon) section to join the Early Access program.

## What is Object Cache Pro?

Object Cache Pro is a highly optimized premium WordPress plugin that integrates with Redis for business class performance. It provides an easy-to-use administration page with analytics to show current benchmarks. Object Cache Pro is specifically optimized for WordPress and popular WordPress plugins, including:

- Query Monitor
- WooCommerce
- Jetpack
- Yoast SEO

![Object Cache Pro admin page](../../images/guides/object-cache-pro/object-cache-pro-analytics.png)

### How does Object Cache Pro work?

Object Cache Pro reduces page load time and the overall load on Redis by combining Redis commands into server request batches.

Object Cache Pro also optimizes for performance, using compressed data to maintain a small footprint in memory, while avoiding unnecessary Redis reads and writes. Object Cache Pro has been tested extensively against WooCommerce, is fully compliant with the WordPress Object Cache API, and integrates seamlessly into WordPress.

### How do I sign up for Object Cache Pro on Pantheon?

Please fill out [this form](https://forms.gle/3EpZcELcYqB2VRKC8) to sign up for Object Cache Pro Early Access. You will receive an email with a link to download the plugin and a license token. The email provides information on first steps to help you through the installation and configuration process.
