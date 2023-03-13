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

## Set Cache-Control Headers

### Before You Begin

This guide explains the how to set Cache-Control headers using
`@pantheon-systems/wordpress-kit` in the `next-wordpress-starter`, or any
Next.js application using the `wordpress-kit`.

### Setting Cache-Control Headers with WordPress Kit

The `@pantheon-systems/wordpress-kit` npm package exports a function,
`setEdgeHeaders`, which takes in a response object and a cache-control header
value. The value is then set to the response object's headers so that when the
request is sent along it will be cached at the edge.

The default cache-control header is the following:

```http
Cache-Control: public, s-maxage=600
```

To override the default, you may pass in your own cache-control header:

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

Depending on where you deploy, these headers may or may not be respected with
regards to caching at the edge. See your platform's documentation to verify.

## Cache Purge

### Before You Begin

You should be familiar with the concept of surrogate key based caching and
purging.

See https://docs.fastly.com/en/guides/working-with-surrogate-keys for more
information on working with surrogate keys.

This guide uses WordPress with the
[WPGraphQL plugin](https://wordpress.org/plugins/wp-graphql/),
[WPGraphQL Smart Cache plugin](https://github.com/wp-graphql/wp-graphql-smart-cache)
and the
[Pantheon Advanced Page Cache plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/)
installed.

### How It Works

```mermaid
sequenceDiagram
	participant A as Client
    participant B as Next.js + wordpress-kit
    participant C as WordPress
    A->>B: Request a page that fetches from WordPress
    B->>C: Add Pantheon-SKey header to request via GET
    C->>B: Surrogate-Key-Raw header included on response
    B->>A: Set Surrogate-Key header on outgoing response to browser
```

The `GraphqlClientFactory` class from our `@pantheon-systems/wordpress-kit` npm
package adds the `Pantheon-Skey` header to each request and uses the GET method
by default to take advantage of WPGraphQL Smart Cache network caching. Responses
from WordPress will contain the `Surrogate-Key` header. With these keys, your
frontend can be instructed to purge content from a cache when the content in
WordPress changes.

### How To Ensure Headers Are Set On Custom Routes

:::note

The Decoupled Kit
[WordPress Back-end Starter Project](../../../Backend%20Starters/Decoupled%20WordPress/creating-new-project.md)
and [WordPress Next.js Starter Kit](./intro.md) handle the configuration below
automatically.

:::

- The WordPress backend has the
  [WPGraphQL plugin](https://wordpress.org/plugins/wp-graphql/) installed and
  configured
- The WordPress backend has the
  [WPGraphQL Smart Cache plugin](https://github.com/wp-graphql/wp-graphql-smart-cache)
  installed and configured, with the Object Cache option disabled
- The WordPress backend has the
  [Pantheon Advanced Page Cache plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/)
  installed and configured
- The route fetches data using the `@pantheon-systems/wordpress-kit` Graphql
  client or requests to WordPress are made using the GET method and include the
  `Pantheon-SKey: 1` header
  - in order to see the headers, you must use the `client.rawRequest()` method.
- The headers must be added to the outgoing response from Next.js in
  `getServerSideProps` (see
  [`context.res`](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter)).
  - The
    [`next-wordpress-starter` includes a helper function](https://github.com/pantheon-systems/decoupled-kit-js/blob/f3eebf4b502cbad123ec8a7fcd4d4f8f0fb413eb/starters/next-wordpress-starter/lib/setOutgoingHeaders.js#L25)
    that combines headers from multiple requests and adds them to the outgoing
    response.