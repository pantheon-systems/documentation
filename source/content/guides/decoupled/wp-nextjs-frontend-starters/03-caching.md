---
title: WordPress + Next.js Frontend Starter for Front-End Sites
subtitle: Caching Recommendations
description: Learn learn about caching recommendations for your frontend starter kit.
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

Cache settings are configured out-of-the-box for you, but there are circumstances in which you might need to make your own configurations, such as when your is not on Pantheon but your frontend is on Pantheon.

## How it Works

Edge caching can improve performance for Front-End Sites that rely on API endpoints, and also reduce the load on your CMS in cases when a large number of API requests are made in a short period of time, such as during a full site build process.

<Partial file="decoupled-caching.md" />

## Using the Starter Kit

<Alert title="Note"  type="info" >

The Front-End Sites starter kits use Next.js 13 and the Pages Router. The instructions below only apply to the Pages Router and are not currently compatible with the App Router.

</Alert>

The information in this section uses WordPress with the plugins below installed:

- [WPGraphQL plugin](https://wordpress.org/plugins/wp-graphql/),
- [WPGraphQL Smart Cache plugin](https://github.com/wp-graphql/wp-graphql-smart-cache)
- [Pantheon Advanced Page Cache plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/)


The `GraphqlClientFactory` class from our `@pantheon-systems/wordpress-kit` npm package adds the `Pantheon-SKey` header to each request and uses the GET method by default to take advantage of WPGraphQL Smart Cache network caching. Responses from WordPress will contain the `Surrogate-Key` header. You can use these keys to instruct your frontend to purge content from a cache when the content in WordPress changes.

## Cache-Control Headers

This section explains how to set Cache-Control headers using
`@pantheon-systems/wordpress-kit` in the `next-wordpress-starter`, or any
Next.js application using the `wordpress-kit`.

The `@pantheon-systems/wordpress-kit` npm package exports a function,
`setEdgeHeaders`, which takes in a response object and a cache-control header
value. The value is then set to the response object's headers so that when the
request is sent along it will be cached at the edge.

The default cache-control header is the following:

```http
Cache-Control: public, s-maxage=600
```

### Override WordPress Kit's Default Cache-Control Headers

You must pass in your own cache-control header to override the default. For example:

```jsx
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

You can take advantage of this feature without using the starter kit.

## Purge Edge Caching

### Ensure Headers Are Set On Custom Routes

<Alert title="Note"  type="info" >

The Decoupled Kit [WordPress Backend Starter Project](/guides/decoupled/wp-backend-starters) and [WordPress Next.js Starter Kit](/guides/decoupled/wp-nextjs-frontend-starters) handle the configuration below automatically. You do not need to make configuration changes for existing routes because the starter kit configures this for you.

</Alert>

1. Verify that the WordPress backend has the [WPGraphQL plugin](https://wordpress.org/plugins/wp-graphql/) installed and configured.

1. Verify that the WordPress backend has the [WPGraphQL Smart Cache plugin](https://github.com/wp-graphql/wp-graphql-smart-cache) installed and configured and that the Object Cache option is disabled.

1. Verify that the WordPress backend has the [Pantheon Advanced Page Cache plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/) installed and configured.

1. Review your route fetches data and confirm that it uses the `@pantheon-systems/wordpress-kit` Graphql client or requests to WordPress are made using the GET method and include the `Pantheon-SKey: 1` header. You must use the `client.rawRequest()` method to see headers.

1. Confirm that headers are added to the outgoing response from Next.js in
  `getServerSideProps` (refer to [`context.res`](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter)).

1. Use the [`next-wordpress-starter` helper function](https://github.com/pantheon-systems/decoupled-kit-js/blob/f3eebf4b502cbad123ec8a7fcd4d4f8f0fb413eb/starters/next-wordpress-starter/lib/setOutgoingHeaders.js#L25) that combines headers from multiple requests and adds them to the outgoing response.

### Create a New Route

Follow the steps below if you need to create a **new** route.

In the example below, the code is used to set the headers necessary for
cache purging on a post list page.

1. Open your post list page, import required utilities, and create an instance of the GraphQL Client:

	```js
	import {
		gql,
		GraphQLClientFactory,
 		setOutgoingHeaders,
	} from '@pantheon-systems/wordpress-kit';
	const client = new GraphQLClientFactory(
		'https://dev-wordpress-purge-demo.pantheonsite.io/wp/graphql',
		{
			method: 'GET',
		},
	).create();
	```

1. Use the `client` instance in `getSeverSideProps` to fetch data from
   WordPress, and then use utilities provided by `wordpress-kit` to set caching
   related headers on the outgoing response:

	```js
	export async function getServerSideProps({ res }) {
		// Customize your query as needed
		const query = gql`
			query LatestPostsQuery($totalPosts: Int!) {
				posts(first: $totalPosts) {
					edges {
						node {
							id
							uri
							title
							featuredImage {
								node {
									altText
									sourceUrl
								}
							}
						}
					}
				}
			}
		`;
		// Retrieve post data and surrogate key values from WordPress
		const {
			data: {
				posts: { edges },
			},
			headers,
		} = await client.rawRequest(query, { totalPosts: 100 });
		const posts = edges.map(({ node }) => node);
    		// Add unique surrogate keys to outgoing response
    		// and set cache control header to ensure response is cached at edge
    		setOutgoingHeaders({ headers, res });

		return { props: { posts } };
	}
	```

	- You should now see the `Surrogate-Key` header on the outgoing response for `/posts/` if your backend is configured correctly. This allows the cache for this page to be purged automatically when related content changes in WordPress.


## More Resources

- [Fastly Surrogate Key documentation](https://docs.fastly.com/en/guides/working-with-surrogate-keys)
