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

This section provides information on how to customize your WordPress + Next.js project, including how to:

- Create [Server Side Rendering (SSR)](https://nextjs.org/docs/basic-features/pages#server-side-rendering)

- Create [Static Site Generation (SSG)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended).

<Alert title="Note"  type="info" >

Refer to [When Should I Use `getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#when-should-i-use-getserversideprops)
and [When Should I Use `getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props#when-should-i-use-getstaticprops) if you're not sure when to use SSR vs SSG.

</Alert>

## Before You Begin

Make sure your have a working knowledge of:

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)

## Data Fetching in Next.js

Next.js offers various ways to fetch data and render content. Refer to the
Next.js [Data Fetching Overview](https://nextjs.org/docs/basic-features/data-fetching/overview) for more information.


### Fetching WordPress Content with `@pantheon-systems/wordpress-kit`

The `next-wordpress-starter` has a dependency on `@pantheon-systems/wordpress-kit` that contains a GraphQL client to help
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

The client factory takes in your WordPress GraphQL endpoint. You
can use the client to make GraphQL requests to your WordPress instance.

### Use the WordPress GraphiQL IDE

The WPGraphQL plugin in your WordPress instance includes a helpful GraphiQL IDE to help craft queries.

To open the IDE:

1. Login to your WordPress instance admin dashboard.
1. Click the GraphQL logo second from the bottom.

### SSR Example

1. Export an async function called [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props).

1. Use the GraphQL client inside the function to fetch data from WordPress and pass it to the component as props.

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

1. Go to `http://localhost:3000/articles` to start the app.

1. Review the newly created `Articles` page.

### SSG Example

1. Export [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) to generate that page at _build_ time instead of _request_ time.

1. Build a page using `getStaticProps` that lists recipes from the WordPress instance.

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

	- Notice the key difference for this page (besides fetching pages instead of posts) is the use of `getStaticProps` instead of `getServerSideProps`.

1. Go to `http://localhost:3000/articles` to start the app.

1. Navigate to `/recipes` to see the `Recipes` page.
