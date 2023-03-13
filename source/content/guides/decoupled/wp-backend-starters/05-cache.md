---
title: Decoupled WordPress Backend Starter for Front-End Sites
subtitle: Cache Considerations
description: Learn about cache considerations for your project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-backend-starters/cache
anchorid: cache
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

With the appropriate configuration, WordPress can be configured to cache GraphQL requests on a CDN until the underlying content changes. This can improve performance for front-end sites that rely on these endpoints, and also reduce the load on your CMS in cases where a large amount of API requests will be made in a short period of time, like a full site build process.

## Use the Backend Starter Project

If you created your WordPress site using the [backend starter project](./creating-a-new-project), recommended caching configurations were automatically enabled on install. Using this project:

- The WPGraphQL Smart Cache plugin is enabled to allow GraphQL requests via the GET method for improved network caching.
- Response headers are set to allow CDN caching of GraphQL requests for 10
  minutes.
- The Pantheon Advanced Page Cache module is enabled, which enables caching and purging across the entire decoupled stack.

## Manual Configuration

For projects that do not use the Decoupled Kit backend starter project, manual configuration can be followed in order to enable edge caching and purging.

Edge caching instructions below focus on sites running on Pantheon, but can be adapted for other platforms.

### Enable WPGraphQL Smart Cache

- Run the following Composer command:

```bash
composer require wp-graphql/wp-graphql-smart-cache
```

In the WordPress Dashboard:

- Activate the WPGraphQL Smart Cache plugin.
- Navigate to the GraphQL settings page **GraphQL > Settings** and set the
  'Cache-Control max-age' to a value greater than zero.

:::note

We recommend leaving the object cache option disabled when using this plugin on Pantheon projects. This will allow the necessary headers for cache purging to be included in responses.

:::

### Enable Edge Caching

- Run the following Composer command:

```bash
composer require wpackagist-plugin/pantheon-advanced-page-cache
```

- In the WordPress dashboard, enable the Pantheon Advanced Page Cache plugin.

### Take Advantage of GraphQL Caching on the Front-end

For details on how to make full use of WPGraphQL Network Caching in your
front-end application, refer [Surrogate Key Based Cache Purging](/guides/decoupled/wp-nextjs-frontend-starters/cache#cache-purge) in the Front-end Starters guide.
