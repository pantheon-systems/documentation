---
title: WordPress + Gatsby Frontend Starter for Front-End Sites
subtitle: Customize Your Project
description: Learn how to customize your project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-gatsby-frontend-starters/customization
anchorid: customization
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to customize your WordPress project.


## Before You Begin

Make sure you have a working knowledge of:

- [React](https://reactjs.org/)
- [Gatsby](https://www.gatsbyjs.com/)

## Gatsby's GraphQL Layer

The
[`gatsby-source-wordpress` plugin](https://www.gatsbyjs.com/plugins/gatsby-source-wordpress/) uses the [WPGraphQL WordPress plugin](https://www.wpgraphql.com/) to cache WordPress data in Gatsby. This plugin is configured
to source data out of the box.

Refer to [Gatsby's documentation](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/) for an in depth look at Gatsby's GraphQL Data Layer.

1. Add your GraphQL Endpoint in `.env.local` as `WPGRAPHQL_URL`. For example:

	```bash{promptUser: user}
	WPGRAPHQL_URL=https://dev-my-wordpress-site.pantheon.site/wp/graphql
	```

1. Start the app in develop mode to fetch all the data from your WordPress
instance and make it available to Gatsby's GraphQL IDE. This is available at `http://localhost:8000/\_\_\_graphql` by default.

1. Use this GraphQL IDE to construct [page queries](https://www.gatsbyjs.com/docs/recipes/querying-data/#querying-data-with-a-page-query),
[static queries](https://www.gatsbyjs.com/docs/how-to/querying-data/static-query/), or [`createPages`](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages)

## Source Data from WordPress

You can build queries your pages. The index page displays the last 5 posts. Each post page displays the post as well as any comments that belong to that post.

There are two queries, plus an additional query to use with Gatsby's
`createPages` utility. One query is for the index page, and the other is for the individual blog posts.

### Index Page Query

You can limit the data to the last 5 blog posts in descending order in the index page. Note that you can populate the fields in the middle pane instead of selecting them from the **Explorer** pane.

1. Start your Gatsby app with the `WPGRAPHQL_URL` environment variable set.

1. Navigate to the GraphiQL IDE at `http://localhost:8000/___graphql`

1. Select the **Explorer** pane on the left side of the page and then select `allWpPost`.

1. Add the **limit** variable and set it to 5.

1. Select **limit**, select **sort**, select **fields**, and then select **date** from the drop-down menu.

1. Set **order** to **DESC**.

1. Select **allWpPost**, and then select **nodes**.

1. Select **title**, select **uri**, and then select **date**.

1. Select **allWpPost**, select **author**, select **nodes**, and then select **name**.



```graphql
query IndexPage {
	allWpPost(limit: 5, sort: { fields: date, order: DESC }) {
		nodes {
			id
			title
			date
			uri
			author {
				node {
					name
				}
			}
		}
	}
}
```

You can test the query in the editor with the play button at the top.
Results are displayed in the pane to the right. Copy the ID of a post to
help test the next section.

### Individual Post Query

The post id is [available via `pageContext`](https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs), and can be used to get more information individual posts.

1. Start your Gatsby app with the `WPGRAPHQL_URL` environment variable set.

1. Navigate to the GraphiQL IDE at `http://localhost:8000/___graphql`

1. Open the **Query Variables** pane on the bottom of the page.

1. Set a variable `id` equal to the ID you noted down from the last section. For example:

		<!-- prettier-ignore -->
		```json
		{
			"id": "cG9zdDo0Mw=="
		}
		```

1. Select the **Explorer** pane on the left side of the page, and then select `wpPost`.

1. Select **wpPost**, select **id**, and then select **eq:**.

1. Click the **$** to insert the variable into the query. You may need to rename the variable or edit the query manually. For example:

	<!-- prettier-ignore -->
	```graphql
	query PostWithCommentsById($id: String!) {
		wpPost(id: {eq: $id}) {

		}
	}
	```

1. Select **wpPost**, select **content**, select **date**, and then select **formatString** input`"MM/YY"`.

1. Select **wpPost**, select **author**, select **node**, and then select **name**.

1. Select **wpPost**, select **comments**, and then select **nodes**.

1. Select **content**, select **title**, select **date**, select **formatString** and input `"MM/YY hh:mmA"`.

1. Select **author**, select **node**, and then select **name**.

The query should look like the following:

```graphql
query PostWithCommentsById($id: String!) {
	wpPost(id: { eq: $id }) {
		author {
			node {
				name
			}
		}
		comments {
			nodes {
				author {
					node {
						name
					}
				}
				content
				date(formatString: "MM/YY hh:mmA")
			}
		}
		title
		content
		date(formatString: "MM/YY")
	}
}
```

## Consume the Data in Gatsby

You now have two queries, `IndexPage` and `PostWithCommentsById`. You need another query for the `createPages` API. It will be included in the next section.

<Alert title="Note"  type="info" >

Gatsby's GraphiQL IDE's **Code Exporter** tab generates code snippets based on the current query in the editor pane. Choose from `Page Query`, `StaticQuery` hook, `StaticQuery`, and `createPages`.

</Alert>

### Create Templates

Part of creating pages with Gatsby involves [specifying a template](https://www.gatsbyjs.com/docs/programmatically-create-pages-from-data/#specifying-a-template). This section uses the queries created to create a template for the index page and the individual posts in the above sections.

1. Open your Gatsby project and create a new file in the `src/templates` directory called `last-five-post.js`.

1. Select the **Code Exporter** tab from the GraphiQL IDE.

1. Select **Page query** from the drop-down menu and copy the code into
   `last-five-post.js`.

### Route with `createPages`

You must construct one more short query in order to tell Gatsby to generate
pages at certain paths. Notice that this query is a stripped down version of the previous query that only needs the slug.

The example below shows the `createPages` code that can be added to
`gatsby-node.js` to fetch and create pages at build time.

1. Use the `uri` as the slug for your new page, and the `id` to pass into your Page Query.

1. Make sure you updated the code from the **Code Exporter** tab to:

	- Point to the `templatePath` to your template from the previous step
	- Pass the `node.uri` to the `path` property of `createPage`
	- Pass the `node.id` to the context of `createPage`

This code should generate 5 pages, one for each of the last 5 blog posts. Now
inside of our template, we can use the query we created

For more information on Gatsby's `createPage`, see
[the API reference](https://www.gatsbyjs.com/docs/reference/config-files/actions/#createPage)
and
[Creating Pages in `gatsby-node.js`](https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs)


```javascript title=gatsby-node.js
const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const result = await graphql(`
		{
			allWpPost(limit: 5, sort: { fields: date, order: DESC }) {
				nodes {
					id
					uri
				}
			}
		}
	`);
	const indexTemplatePath = path.resolve(`./src/templates/last-five-post.js`);

	result.data.allWpPost.nodes.forEach((node) => {
		createPage({
			path: node.uri,
			component: indexTemplatePath,
			// The context is passed as props to the component as well
			// as into the component's GraphQL query.
			context: {
				id: node.id,
			},
		});
	});
};
```

### Index Page

You can define routes in the `src/pages` if you have pages that don't need to be dynamically created. Refer to [Define routes in `src/pages`](https://www.gatsbyjs.com/docs/reference/routing/creating-routes/#define-routes-in-srcpages) for more information.

1. Select the **Code Exporter** tab and then select the Page Query.

1. Create a new file in `src/pages` called `last-five.js`.

1. Paste the component from the **Code Exporter** tab into the file.

	The file should like like this:

	```jsx title=src/pages/last-five.js
	import React from 'react';
	import { graphql } from 'gatsby';

	const ComponentName = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>;

	export const query = graphql`
		{
			allWpPost(limit: 5, sort: { fields: date, order: DESC }) {
				nodes {
					id
					title
					date
					uri
					author {
						node {
							name
						}
					}
				}
			}
		}
	`;

	export default ComponentName;
	```


## View the Customized App

Now you can see the code in action.

1. Start the app if it's not already running and go to `http://localhost:8000/last-five`. You should see your `last-five.js` page rendered with the data from the Page query.

1. Navigate to `http://localhost:8000/{uri of one of your posts}`. You should be able to see the post uris on the `/last-five` route, or check your GraphiQL IDE. The `last-five-post.js` template should be rendered there.

1. Query Gatsby's GraphQL layer to get the data you need right where you need it.