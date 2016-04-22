---
title: Extracting Sites from a WordPress Multisite
description: Learn how to separate the codebases to import individual sites to Pantheon.
keywords: wordpress, multisite
categories: [wordpress]
tags: [code, migrate, debug]
---

Pantheon only supports one application codebase and one database per site. We do not recommend using database prefixes or offer support for WordPress Multisite implementations. If you are currently struggling with a WordPress Multisite and want to use Pantheon, you'll need to "unwind" the implementation, separating it into individual sites. You may also create a custom upstream if appropriate for your use-case.

## Migrate One Site Out of a Multisite to Pantheon

This method will safely migrate a single site out of your WordPress Multisite and into Pantheon. You may experience some issues, such as  warnings from Launch Check about multisite, but they are generally false positives, and you can clean that up once the site is liberated and on it's own.

1. 


## Maintain a Single Codebase for Multiple Sites

This method requires one of the following organization service levels with custom upstreams: Partner, Strategic Partner, EDU+, Enterprise, and Reseller.

1. Create a [custom upstream](/docs/custom-upstream) based on the multisite configuration.

2. [Archive](/docs/migrate#create-archives) each of your sites.

3. [Create a new site](https://dashboard.pantheon.io/sites/create) based on the upstream.

Then for each site:

4.
