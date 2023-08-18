---
title: Remove Redis Object Cache
description: How to safely remove Redis object caching.
permalink: docs/redis/remove
tags: [cache, plugins, modules, database]
reviewed: "2023-08-17"
contenttype: [doc]
innav: [true]
categories: [cache]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
contributors: [cityofoaksdesign, carolynshannon, jms-pantheon, whitneymeredith]
showtoc: true
---

This section provides information on how to safely remove Object Cache.

## Safely Remove Object Cache

The following code changes are required before Object Cache can be safely uninstalled and disabled:

<TabList>

<Tab title="WP Redis" id="wp-uninstall" active={true}>

<Partial file="remove-addons/wp-redis.md" />

</Tab>

<Tab title="Drupal" id="drops-uninstall">

<Partial file="remove-addons/drupal-redis.md" />

</Tab>

</TabList>

## More Resources

- [Performance Addons](/addons)
- [Redis Object Cache Overview](/redis)
