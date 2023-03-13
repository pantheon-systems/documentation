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

With the appropriate configuration, Drupal can be configured to cache JSON:API endpoints until the underlying content changes. These same routes can also be cached on a CDN. This can improve performance for front-end sites that rely on these API endpoints, and also reduce the load on your CMS in cases where a large amount of API requests will be made in a short period of time, like a full site build process.

## Use the Backend Starter Project

If you created your Drupal site using the
[backend starter project](./creating-a-new-project), recommended caching
configurations were automatically enabled on install. Using this project:

- JSON:API is configured to cache responses for 10 minutes.
- The Pantheon Advanced Page Cache module is enabled, which enables edge caching
  and purging across the entire decoupled stack.

## Manual Configuration

For projects that do not use the Decoupled Kit backend starter project, manual configuration can be followed in order to enable edge caching and purging.

Edge caching instructions below focus on sites running on Pantheon, but can be adapted for other platforms.

### Enable Caching for JSON:API

- In the Drupal Admin, navigate to the Performance settings page
  (Configuration > Development > Performance) and set the 'Browser and proxy
  cache maximum age' to a value greater than zero.

#### Enable Edge Caching

- Run the following Composer command:

```bash
composer require drupal/pantheon_advanced_page_cache
```

- Enable the Pantheon Advanced Page Cache module.