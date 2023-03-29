---
title: WordPress + Next.js Frontend Starter for Front-End Sites
subtitle: Purge Surrogate Key-based Cache
description: Learn how to purge surrogate key-based cache.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-nextjs-frontend-starters/caching
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

You should be familiar with the concept of surrogate key-based caching and
purging. Refer to [Fastly's documentation](https://docs.fastly.com/en/guides/working-with-surrogate-keys) for more information on working with surrogate keys.

The information in this section uses WordPress with the plugins below installed:

- [WPGraphQL plugin](https://wordpress.org/plugins/wp-graphql/),
- [WPGraphQL Smart Cache plugin](https://github.com/wp-graphql/wp-graphql-smart-cache)
- [Pantheon Advanced Page Cache plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/)

## How It Works

The `GraphqlClientFactory` class from our `@pantheon-systems/wordpress-kit` npm package adds the `Pantheon-Skey` header to each request and uses the GET method by default to take advantage of WPGraphQL Smart Cache network caching. Responses from WordPress will contain the `Surrogate-Key` header. You can use these keys to instruct your frontend to purge content from a cache when the content in WordPress changes.

## Ensure Headers Are Set On Custom Routes

<Alert title="Note"  type="info" >

The Decoupled Kit [WordPress Backend Starter Project](/guides/decoupled/wp-backend-starters) and [WordPress Next.js Starter Kit](/guides/decoupled/wp-nextjs-frontend-starters) handle the configuration below automatically.

</Alert>

1. Verify that the WordPress backend has the [WPGraphQL plugin](https://wordpress.org/plugins/wp-graphql/) installed and configured.

1. Verify that the WordPress backend has the [WPGraphQL Smart Cache plugin](https://github.com/wp-graphql/wp-graphql-smart-cache) installed and configured and that the Object Cache option is disabled.

1. Verify that the WordPress backend has the [Pantheon Advanced Page Cache plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/) installed and configured.

1. Review your route fetches data and confirm that it uses the `@pantheon-systems/wordpress-kit` Graphql client or requests to WordPress are made using the GET method and include the `Pantheon-SKey: 1` header. You must use the `client.rawRequest()` method to see headers.

1. Confirm that headers are added to the outgoing response from Next.js in
  `getServerSideProps` (refer to [`context.res`](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter)).

1. Use the [`next-wordpress-starter` helper function](https://github.com/pantheon-systems/decoupled-kit-js/blob/f3eebf4b502cbad123ec8a7fcd4d4f8f0fb413eb/starters/next-wordpress-starter/lib/setOutgoingHeaders.js#L25) that combines headers from multiple requests and adds them to the outgoing response.