---
title: Drupal Frontend Starters for Front-End Sites
subtitle: Customize Your Project
description: Learn how to customize your project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-frontend-starters/customization
anchorid: customization
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to customize your Drupal project, including how to:

- Create a page with [Server Side Rendering (SSR)](https://nextjs.org/docs/basic-features/pages#server-side-rendering)

- Create a page with [Static Site Generation (SSG)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)

<Alert title="Note"  type="info" >

If you're not sure when to use SSR vs SSG, check out these articles:
[When Should I Use `getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#when-should-i-use-getserversideprops) and
[When Should I Use `getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props#when-should-i-use-getstaticprops)

</Alert>

## Before You Begin

You should have a working knowledge of:

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)

## Data Fetching in Next.js

Next.js offers various ways to fetch data and render content. Refer to the
Next.js [Data Fetching Overview](https://nextjs.org/docs/basic-features/data-fetching/overview) for more information.


### Fetch Drupal Content with DrupalState

The `next-drupal-starter` has a dependency on `@pantheon-systems/drupal-kit`.
The starter kit implements [Drupal State](https://project.pages.drupalcode.org/drupal_state/en/introduction/), a tool that helps fetch and store data from Drupal into the local app state.

### SSR Example

1. Export an async function called [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props).

1. Use Drupal State inside of the function to fetch data from Drupal and pass it to the component as props.

		```jsx title=pages/articles/index.js
		import { DrupalState } from '@pantheon-systems/drupal-kit';

		export default function Articles({ articles }) {
			return <pre>{JSON.stringify(articles, null, 4)}</pre>;
		}

		export async function getServerSideProps(context) {
			const { locale } = context; // use the current locale in order to fetch correct translation

			const store = new DrupalState({
				apiBase: process.env.BACKEND_URL,
				defaultLocale: locale,
			});

			const articles = await store.getObject({
				objectName: 'node--article',
				// Drupal State allows us to use a graphql query to get the data we need and nothing extra
				query: `
			{
				title
				body
				created
				path {
				alias
				}
			}
			`,
			});

			return {
				props: {
					articles,
				},
			};
		}
		```

1. Start the app go to `http://localhost:3000/articles`

1. Review the newly created `Articles` page.

### SSG Example

1. Export [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) from a page to generate a _build_ time instead of _request_ time.

	- The example below builds a page using `getStaticProps` that lists recipes from a Drupal instance. Notice that the only real difference for this page (besides fetching recipes instead of articles) is the use of `getStaticProps` instead of `getServerSideProps`.

		```jsx title=pages/recipes/index.js
		import { DrupalState } from '@pantheon-systems/drupal-kit';

		export default function Recipes({ recipes }) {
			return <pre>{JSON.stringify(recipes, null, 4)}</pre>;
		}

		export async function getStaticProps(context) {
			const { locale } = context; // use the current locale in order to fetch correct translation

			const store = new DrupalState({
				apiBase: process.env.BACKEND_URL,
				defaultLocale: locale,
			});

			const recipes = await store.getObject({
				objectName: 'node--recipe',
				query: `
			{
				title
				field_ingredients
				field_number_of_servings
				field_preparation_time
				field_recipe_instruction
				field_summary
				created
				path {
				alias
				}
			}
			`,
			});

			return {
				props: {
					recipes,
				},
			};
		}
		```

1. Start the app go to `http://localhost:3000/articles`

1. Navigate to `/recipes` to see the `Recipes` page.


### Client Side Rendering (CSR) Example

You can fetch and render the data on the client by leveraging the same `DrupalState` store that is available to you in the server contexts. Note this is *not* the same instance of the store that exists on the server. This means that the store is not shared between the client and the server. Client side rendering is not usually necessary with a framework like Next.js.

The CSR pattern for this use case is the same as it is with vanilla React.

<Alert title="Note"  type="info" >

You must configure your Drupal instance to allow your Front-End site through CORS to achieve CSR. Remember that the store is not shared between the client and server contexts.

</Alert>

1. Use the example code below.

		```jsx title=pages/articles-csr/index.js
		import { DrupalState } from '@pantheon-systems/drupal-kit';
		import { useRouter } from 'next/router';
		import { useEffect, useState } from 'react';

		export default function Articles() {
			const { locale } = useRouter();
			const [articles, setArticles] = useState([]);
			/**
			 * We recommend creating as few instances of
			* DrupalState as possible and reusing them
			* throughout the application.
			* We are creating a new one here
			* for example purposes.
			*/
			const store = new DrupalState({
				/**
				 * In order to create the store on the client
				* side, you will need to expose your
				* BACKEND_URL in your next.config.env
				* so that it can be read on the client side.
				* This should not cause any issues security
				* wise if your Drupal instance is
				* configured appropriately.
				*/
				apiBase: process.env.backendUrl,
				defaultLocale: locale,
			});
			useEffect(async () => {
				if (!articles.length) {
					const data = await store.getObject({
						objectName: 'node--article',
					});
					setArticles(data);
				}
			}, []);

			if (articles) {
				return <pre>{JSON.stringify(articles, null, 4)}</pre>;
			}
		}
		```
1. Start the app go to `http://localhost:3000/articles`

1. Navigate to `/csr-articles` to see the page.