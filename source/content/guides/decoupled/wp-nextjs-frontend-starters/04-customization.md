---
title: WordPress + Next.js Frontend Starter for Front-End Sites
subtitle: Customize Your Project
description: Learn how to customize your project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-nextjs-frontend-starters/customization
anchorid: customization
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

## Before You Begin

This guide assumes the reader has working knowledge of
[React](https://reactjs.org/), and little to no knowledge of
[Next.js](https://nextjs.org/).

## Data Fetching in Next.js

Next.js offers various ways to fetch data and render content. Please see the
Next.js
[Data Fetching Overview](https://nextjs.org/docs/basic-features/data-fetching/overview)
for an in depth look at each. For the purposes of this guide, we will cover
creating a page with
[Server Side Rendering (SSR)](https://nextjs.org/docs/basic-features/pages#server-side-rendering)
and
[Static Site Generation (SSG)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended).

:::info If you're not sure when to use SSR vs SSG, check out these articles:
[When Should I Use `getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#when-should-i-use-getserversideprops)
and
[When Should I Use `getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props#when-should-i-use-getstaticprops)
:::

### Fetching WordPress Content with `@pantheon-systems/wordpress-kit`

The `next-wordpress-starter` has a dependency on
`@pantheon-systems/wordpress-kit`, which contains a GraphQL client to help us
fetch data from WordPress. Be sure to use as few instances of the client as
possible. Here is an example of how to use the client:

```js title=lib/wordpress-client.js
import { GraphqlClientFactory } from '@pantheon-systems/wordpress-kit';

// you may need to expose this variable in your next.config.js
// see https://nextjs.org/docs/api-reference/next.config.js/environment-variables
const myWordPressGraphQLEndpoint = process.env.WPGRAPHQL_URL;

export const client = new GraphqlClientFactory(
	myWordPressGraphQLEndpoint,
).create();
```

The client factory takes in a your WordPress GraphQL endpoint. From here, you
can use the client to make GraphQL requests to your WordPress instance.

In the next section, we will cover how to fetch data from WordPress using the
client.

### Using the WordPress GraphiQL IDE

To build your GraphQL queries, the WPGraphQL plugin in your WordPress instance
includes a helpful GraphiQL IDE which is very helpful for crafting queries.

To open the IDE:

1. Login to your WordPress instance admin dashboard
1. In the menu on the left, there should be a GraphQL logo second from the
   bottom. Click this to open the IDE

### SSR Example

To render a page with Server Side Rendering (SSR) in Next.js, export an async
function called
[`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
from that page. Inside of this function, we can use the GraphQL client to fetch
data from WordPress and pass it to the component as props.

```jsx title=pages/articles/index.js
// Import the WordPress GraphQL client we made in the last section and the gql template tag
// helper convenience function that is re-exported in the wordpress-kit from 'graphql-request'
import { client } from './lib/wordpress-client';
import { gql } from '@pantheon-systems/wordpress-kit';

export default function Posts({ posts }) {
	return <pre>{JSON.stringify(posts, null, 4)}</pre>;
}

export async function getServerSideProps(context) {
	// Use the query that was built in the GraphiQL IDE
	// This query fetches the last 10 posts and the featured image from WordPress
	const query = gql`
		query LatestPostsQuery {
			posts(first: 10) {
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

	const { posts } = await client.request(query);

	return {
		props: {
			posts,
		},
	};
}
```

### SSG Example

If we want to use SSG, export
[`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
from a page to generate that page at _build_ time instead of _request_ time.

Let's build a page using `getStaticProps` that lists recipes from our Drupal
instance.

```jsx title=pages/pages/index.js
// Import the WordPress GraphQL client we made in the last section and the gql template tag
// helper convenience function that is re-exported in the wordpress-kit from 'graphql-request'
import { client } from '../../lib/wordpress-client';
import { gql } from '@pantheon-systems/wordpress-kit';

export default function Pages({ pages }) {
	return <pre>{JSON.stringify(pages, null, 4)}</pre>;
}

export async function getStaticProps(context) {
	// Use the query that was built in the GraphiQL IDE
	// This query fetches all pages from WordPress
	const query = gql`
		query AllPages {
			pages {
				edges {
					node {
						id
						uri
					}
				}
			}
		}
	`;

	const { pages } = await client.request(query);

	return {
		props: {
			pages,
		},
	};
}
```

Notice the key difference for this page–besides the fact we are fetching pages
instead of posts–is the use of `getStaticProps` instead of `getServerSideProps`.

## Next Steps

From here, it's time to see the code in action. Start the app if it's not
already running and head to `http://localhost:3000/posts`. You should see the
SSR'd `Articles` page. Check `http://localhost:3000/pages` to see the SSG'd
`Pages` page.

From this point, you may want to adjust the markup and style of the `Articles`
and `Recipes` components, or move on to another custom page. For more
information on composing react components, see
[Composing Components](https://reactjs.org/docs/components-and-props.html#composing-components)

## Conclusion

In this guide we created a new page using SSR and SSG utilizing the
`@pantheon-systems/wordpress-kit` and the GraphiQL IDE in our WordPress instance
to craft a query and fetch the data.
