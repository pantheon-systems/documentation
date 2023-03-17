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

This section provides information on cache configuration.

WordPress can be configured to cache GraphQL requests on a CDN until the underlying content changes. This can improve performance for Front-End Sites that rely on these endpoints. It can also reduce the load on your CMS in cases where a large amount of API requests are made in a short period of time, such as a full site build process.

## Use the Backend Starter Project

If you created your WordPress Front-End Site using the [backend starter project](/guides/decoupled/wp-backend-starters/create), the recommended caching configurations are already enabled. Using this project:

- WPGraphQL Smart Cache plugin is enabled to allow GraphQL requests via the GET method for improved network caching.
- Response headers are set to allow CDN caching of GraphQL requests for 10
  minutes.
- Pantheon Advanced Page Cache module is enabled, allowing caching and purging across the entire decoupled stack.

## Manual Configuration

You must manually configure your site to enable edge caching and purging if you did not use the Decoupled Kit backend starter project.

The Edge caching instructions below focus on sites running on Pantheon, but can be adapted for other platforms.

### Enable WPGraphQL Smart Cache

1. Run the following Composer command:

    ```bash{promptUser: user}
    composer require wp-graphql/wp-graphql-smart-cache
    ```

1. Open the **WordPress Dashboard** and activate the **WPGraphQL Smart Cache** plugin.

1. Navigate to **GraphQL**, select **Settings**, and then set the
  `Cache-Control max-age` to a value greater than zero.

<Alert title="Note"  type="info" >

We recommend leaving the object cache option disabled when using this plugin on Pantheon projects. This allows the necessary headers for cache purging to be included in responses.

</Alert>

### Enable Edge Caching

1. Run the following Composer command:

    ```bash{promptUser: user}
    composer require wpackagist-plugin/pantheon-advanced-page-cache
    ```

1. Open the **WordPress Dashboard**, and enable the **Pantheon Advanced Page Cache** plugin.

### Take Advantage of GraphQL Caching on Front-End Sites

Refer to [Surrogate Key Based Cache Purging](/guides/decoupled/wp-nextjs-frontend-starters/cache#cache-purge) in the Front-End Site guide for information on how to make full use of WPGraphQL Network Caching in your Front-End Site.