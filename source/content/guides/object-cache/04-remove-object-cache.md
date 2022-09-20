---
title: Object Cache (formerly Redis)
subtitle: Remove Object Cache
description: Learn how to safely remove Object Cache.
categories: [performance]
tags: [cache, plugins, modules, database]
contributors: [cityofoaksdesign, carolynshannon, jms-pantheon, whitneymeredith]
layout: guide
permalink: docs/guides/object-cache/remove-object-cache
anchorid: remove-object-cache
---

This section provides information on how to safely remove Object Cache.

## Safely Remove Object Cache

The following code changes are required before Object Cache can be safely uninstalled and disabled:

<TabList>

<Tab title="WordPress" id="wp-uninstall" active={true}>

<Partial file="remove-addons/wp-redis.md" />

</Tab>

<Tab title="Drupal" id="drops-uninstall">

<Partial file="remove-addons/drupal-redis.md" />

</Tab>

</TabList>