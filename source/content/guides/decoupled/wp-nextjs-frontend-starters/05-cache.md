---
title: WordPress + Next.js Frontend Starter for Front-End Sites
subtitle: Cache
description: Learn how to set cache-control headers and how to purge your cache.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-nextjs-frontend-starters/cache
anchorid: cache
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

Cache settings are configured out-of-the-box for you, but there are circumstances in which you might need to make your own configurations, for example, your CMS is not on Pantheon but your frontend is on Pantheon.

This section shows you how to set Cache-Control headers using
`@pantheon-systems/wordpress-kit` in the `next-wordpress-starter`, or any Next.js application using the `wordpress-kit`, and how to purge your cache.

## Set Cache-Control Headers with WordPress Kit

The `@pantheon-systems/wordpress-kit` npm package exports a function called
`setEdgeHeaders`. This function takes in a response object and a cache-control header value. The value is then set to the response object's headers so that the request is cached at the edge.

The default cache-control header is:

```http
Cache-Control: public, s-maxage=600
```

You can pass in your own cache-control header to override the default. For example:

```jsx title=pages/example/index.js
import { setEdgeHeaders } from '@pantheon-systems/wordpress-kit';

export default function MyPage(props) {
	// Page component here...
}

export async function getServerSideProps(context) {
	// the response object from the server context
	const { res } = context;

	// setEdgeHeaders accepts an optional string which is a cache-control header
	const myCacheControlHeader = 'public, max-age=604800, must-revalidate';

	// Call setEdgeHeaders with the res object and your desired cache-control header
	setEdgeHeaders({ res, cacheControl: myCacheControlHeader });

	// Fetch data and return props...
}
```

### In Production

Depending on where you deploy, these headers may or may not be respected when caching at the edge. Refer to your platform's documentation more information.

## Purge Surrogate Key-based Cache

You should be familiar with the concept of surrogate key-based caching and
purging. Refer to [Fastly's documentation](https://docs.fastly.com/en/guides/working-with-surrogate-keys) for more information on working with surrogate keys.

The example below uses WordPress with:

- [WPGraphQL plugin](https://wordpress.org/plugins/wp-graphql/),
- [WPGraphQL Smart Cache plugin](https://github.com/wp-graphql/wp-graphql-smart-cache)
- [Pantheon Advanced Page Cache plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/)

### How It Works

The `GraphqlClientFactory` class from the `@pantheon-systems/wordpress-kit` npm package adds the `Pantheon-Skey` header to each request. The GET method is used by default to take advantage of WPGraphQL Smart Cache network caching. Responses from WordPress contain the `Surrogate-Key` header. These keys are used to instruct your Front-End Site to purge content from a cache when the content in WordPress changes.

### How To Ensure Headers Are Set On Custom Routes

<Alert title="Note"  type="info" >

The WordPress backend starter project and WordPress Next.js starter kit handle the configuration below automatically.

</Alert>

- The WordPress backend has the [WPGraphQL plugin](https://wordpress.org/plugins/wp-graphql/) installed and configured.
- The WordPress backend has the [WPGraphQL Smart Cache plugin](https://github.com/wp-graphql/wp-graphql-smart-cache) installed and configured, with the Object Cache option disabled.
- The WordPress backend has the [Pantheon Advanced Page Cache plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/) installed and configured.
- The route fetches data using the `@pantheon-systems/wordpress-kit` Graphql
  client or requests to WordPress are made using the GET method and include the `Pantheon-SKey: 1` header. You must use the `client.rawRequest()` method.
- The headers must be added to the outgoing response from Next.js in
  `getServerSideProps` (refer to [`context.res`](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter)).
  - The [`next-wordpress-starter` includes a helper function](https://github.com/pantheon-systems/decoupled-kit-js/blob/f3eebf4b502cbad123ec8a7fcd4d4f8f0fb413eb/starters/next-wordpress-starter/lib/setOutgoingHeaders.js#L25) that combines headers from multiple requests and adds them to the outgoing response.