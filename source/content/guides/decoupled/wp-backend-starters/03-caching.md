---
title: WordPress Backend Starter for Front-End Sites
subtitle: Caching Recommendations
description: Learn about caching recommendations for your WordPress backend starter kit.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-backend-starters/caching
anchorid: caching
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

Cache settings are configured out-of-the-box for you, but there are circumstances in which you might need to make your own configurations, such as when your CMS is not on Pantheon but your frontend is on Pantheon.

## How it Works

You can configure your WordPress site cache GraphQL requests on a CDN until the underlying content changes. This can improve performance for your Front-End Sites that rely on these endpoints, and reduce the load on your CMS in cases when a large number of API requests are made in a short period of time, such as during a full site build process.

<Partial file="decoupled-caching.md" />

## Using the Starter Kit

WordPress can be configured to cache GraphQL requests on a CDN until the underlying content changes. This can improve performance for frontend sites that rely on these endpoints. This also reduces the load on your CMS when a large amount of API requests are made in a short period of time, such as a full site build process.

Note that the items below are configured automatically if you created your site using the WordPress backend starter:

- The WPGraphQL Smart Cache plugin is enabled to allow GraphQL requests via the GET method for improved network caching.
- Response headers are set to allow CDN caching of GraphQL requests for 10
  minutes.
- The Pantheon Advanced Page Cache module is enabled, which enables caching and purging across the entire decoupled stack.

## Custom Implementation

You can manually configure your project to enable edge caching and purging
if you didn't use the Decoupled Kit backend starter project. The edge caching instructions below focus on sites running on Pantheon, but can be
adapted for other platforms.

### Enable WPGraphQL Smart Cache

1. Run the following Composer command:

    ```bash{promptUser: user}
    composer require wp-graphql/wp-graphql-smart-cache
    ```

1. Open your WordPress Dashboard and activate the WPGraphQL Smart Cache plugin.

1. Open **GraphQL**, select **Settings**, and set the **Cache-Control max-age** to a value greater than zero. Refer to the [WordPress Caching documentation](https://wordpress.org/documentation/article/optimization/#Caching) for more information.

<Alert title="Note"  type="info" >

We recommend leaving the object cache option disabled when using this plugin on Pantheon projects. This will allow the necessary headers for cache purging to be included in responses.

</Alert>

### Enable Edge Caching

1. Run the following Composer command:

    ```bash{promptUser: user}
    composer require wpackagist-plugin/pantheon-advanced-page-cache
    ```

1. Open the WordPress dashboard and enable the Pantheon Advanced Page Cache plugin.

### GraphQL Caching on Your Frontend

You can use WPGraphQL Network Caching in your frontend application. Refer to the [WordPress + Next.js Frontend Starter](/guides/decoupled/wp-nextjs-frontend-starters/caching) documentation for more information.

## More Resources

- [Fastly Surrogate Key documentation](https://docs.fastly.com/en/guides/working-with-surrogate-keys)