---
title: PHP Runtime Generations
description: Learn what a PHP runtime generation is, which generations are available, and how to choose one for your site.
tags: [updates, libraries]
contenttype: [doc]
innav: [true]
categories: [php]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
---

## Overview

A PHP runtime generation is the operating system and set of system libraries your site's PHP code runs on. Each generation supports the same PHP versions, but ships newer system libraries and security support for the operating system underneath.

Pantheon introduces a new generation when a new operating system release becomes available, and removes the oldest generation once its operating system reaches the end of security support.

## Available Generations

| Generation | Operating System | Status | Details |
|------------|------------------|--------|---------|
| **Generation 3** | Debian 13 | Available. Default for new sites from January 2027; existing sites upgraded in March 2027 | [PHP Runtime Generation 3](/php-runtime-generation-3) |
| **Generation 2** | Debian 12 | Default until the Generation 3 rollout | [PHP Runtime Generation 2](/php-runtime-generation-2) |
| **Generation 1** | CentOS 8 | Removed April 2026 | — |

## Choose a Generation

Set the `php_runtime_generation` property in your site's `pantheon.yml` file:

```yaml:title=pantheon.yml
php_runtime_generation: 3
```

The setting is deployed with your code, so you can test it before it reaches Live:

1. Commit the change to Dev or a Multidev environment and test your site.
1. Deploy to Test, then to Live.

To go back, remove the line to use the platform default.

## Check an Environment's Generation

The PHP runtime generation is set per environment. Use any of the following:

* The [Terminus](/terminus) command `terminus env:info <site>.<env>`. This requires Terminus 4.0.2+.
* The Terminus command `terminus env:list <site> --fields=id,php_runtime_generation,php_version`. This requires Terminus 4.1.0+.
* The environment's Status page in the Pantheon Dashboard, in the Software Versions block.

## Reporting Issues

[Contact support](/guides/support/contact-support) if you encounter any issues with a PHP runtime generation. Include the generation number (for example, "PHP Runtime Generation 3") and the affected site and environment in your message.
