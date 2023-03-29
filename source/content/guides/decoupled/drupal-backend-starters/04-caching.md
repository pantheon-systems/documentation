---
title: Decoupled Drupal Backend Starter for Front-End Sites
subtitle: Purge Surrogate Key-based Cache
description: Learn how to purge surrogate key-based cache.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-backend-starters/caching
anchorid: caching
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

Cache settings are configured out-of-the-box for you, but there are circumstances in which you might need to make your own configurations, for example, your CMS is not on Pantheon but your frontend is on Pantheon.

The recommended caching configurations are automatically enabled if you created your Drupal site using the [backend starter project](/guides/decoupled/drupal-backend-starters/create), including:

- JSON:API is configured to cache responses for 10 minutes.
- The Pantheon Advanced Page Cache module is enabled. This enables edge caching and purging across the entire decoupled stack.

## Manual Configuration

You can manually enable edge caching and purging if you did not use the Decoupled Kit backend starter project. The Edge caching instructions below focus on sites running on Pantheon, but can be adapted for other platforms.

### Enable caching for JSON:API

1. Open your **Drupal Admin**, select **Configuration**, select **Development**, and then select **Performance**.

1. Set the **Browser and proxy cache maximum age** to a value greater than zero. Refer to [Drupal Caching](/drupal-cache#caching) for more information.

### Enable Edge Caching

1. Run the following Composer command:

    ```bash{promptUser: user}
    composer require drupal/pantheon_advanced_page_cache
    ```

1. Enable the Pantheon Advanced Page Cache module.
