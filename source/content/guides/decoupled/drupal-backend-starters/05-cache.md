---
title: Decoupled Drupal Backend Starter for Front-End Sites
subtitle: Cache Considerations
description: Learn about caching considerations for your project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-backend-starters/cache
anchorid: cache
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information how to configure caching for your backend project. Cache settings are configured out-of-the-box for you, but there are circumstances in which you might need to make your own configurations, for example, your CMS is not on Pantheon but your frontend is on Pantheon.

You can configure Drupal to cache JSON:API endpoints until the underlying content changes. These same routes can also be cached on a CDN. This can improve performance for Front-End Sites that rely on these API endpoints. This can also reduce the load on your CMS if you make a large number of API requests in a short period of time, such as during a full site build process.

## Use the Backend Starter Project

If you created your Drupal site using the
[backend starter project](/guides/decoupled/drupal-backend-starters/create), the recommended caching configurations were automatically enabled. Using this project:

- JSON:API is configured to cache responses for 10 minutes.
- The Pantheon Advanced Page Cache module enables edge caching
  and purging across the entire decoupled stack.

## Manual Configuration

You must manually configure edge caching and purging if you did not use the Decoupled Kit backend starter for your project.

The edge caching instructions below focus on sites running on Pantheon, but can be adapted for other platforms.

### Enable Caching for JSON:API

1. Open your **Drupal Admin** page, select **Configuration**, select **Development**, and then select **Performance** to access the **Performance settings** page.

1. Set the `Browser and proxy cache maximum age` to a value greater than zero.

#### Enable Edge Caching

1. Run the following Composer command:

  ```bash{promptUser: user}
  composer require drupal/pantheon_advanced_page_cache
  ```

1. Enable the Pantheon Advanced Page Cache module.