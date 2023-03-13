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

## Before You Begin

This guide assumes the reader has working knowledge of
[React](https://reactjs.org/), little to no knowledge of
[Gatsby](https://www.gatsbyjs.com/).

## Gatsby's GraphQL Layer

The
[`gatsby-source-wordpress` plugin](https://www.gatsbyjs.com/plugins/gatsby-source-wordpress/)
makes use of the [WPGraphQL WordPress plugin](https://www.wpgraphql.com/) in
order to efficiently cache WordPress data in Gatsby. This plugin is configured
to successfully source data out of the box. To do so, provide your GraphQL
Endpoint in `.env.local` as WPGRAPHQL_URL. For example:

```
WPGRAPHQL_URL=https://dev-my-wordpress-site.pantheon.site/wp/graphql
```

Starting the app in develop mode will fetch all the data from your WordPress
instance and make it available to Gatsby's GraphQL IDE. By default this is
available at http://localhost:8000/\_\_\_graphql.

Use this GraphQL IDE to construct queries to be used for
[page queries](https://www.gatsbyjs.com/docs/recipes/querying-data/#querying-data-with-a-page-query),
[static queries](https://www.gatsbyjs.com/docs/how-to/querying-data/static-query/)
or
[`createPages`](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages)

See https://www.gatsbyjs.com/docs/reference/graphql-data-layer/ for an in depth
look at Gatsby's GraphQL Data Layer.

## Sourcing Data From WordPress

Let's build a few queries together to use for some new pages. The index page
will display the last 5 posts. Each post page will display the post as well as
any comments that belong to that post.

There will be two queries, plus an additional query to use with Gatsby's
`createPages` utility. One query is for the index page, and the other is for the
individual blog posts.

### Index Page Query

For the index page we want to limit the data to the last 5 blog posts in
descending order. If you're familiar with GraphiQL IDEs, feel free to type in
the fields in the middle pane instead of selecting them from the **Explorer**
pane.

1. Start your Gatsby app with the `WPGRAPHQL_URL` environment variable set
1. Navigate to the GraphiQL IDE at `http://localhost:8000/___graphql`
1. From the **Explorer** pane on the left side of the page, select `allWpPost`.
1. Add the **limit** variable and set it to 5.
1. Under **limit**, select **sort** > **fields** and then from the dropdown
   select **date**. You may type 'date' while the dropdown is open to help
   select it.
1. Set **order** to **DESC**
1. Select **allWpPost** > **nodes**. Select **title**, **uri**, and **date**.
1. Select **allWpPost** > **author** > **nodes**, and select **name**

Our query should look like this:

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

Now you may test the query in the editor with the play button at the top.
Results will be displayed in the pane to the right. Copy the ID of a post to
help test the next section.

### Individual Post Query

For the individual pages, we will want some more detail. We will have the post
id
[available to us via `pageContext`](https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs)
which we can use to get more info on the individual post.

1. Start your Gatsby app with the `WPGRAPHQL_URL` environment variable set
1. Navigate to the GraphiQL IDE at `http://localhost:8000/___graphql`
1. Open the **Query Variables** pane on the bottom of the page.
1. Set a variable `id` equal to the ID you noted down from the last section. For
   example:

<!-- prettier-ignore -->
  ```json
  {
    "id": "cG9zdDo0Mw=="
  }
  ```

1. From the **Explorer** pane on the left side of the page, select `wpPost`.
1. Select **wpPost** > **id** > **eq:**. Click the **$** to insert the variable
   into the query. You may need to rename the variable or edit the query
   manually. At this point you should have the following:

<!-- prettier-ignore -->
  ```graphql
  query PostWithCommentsById($id: String!) {
    wpPost(id: {eq: $id}) {

    }
  }
  ```

1. Select **wpPost** > **content**, and **date** > **formatString** input
   `"MM/YY"
1. Select **wpPost** > **author** > **node**, and select **name**
1. Select **wpPost** > **comments** > **nodes**. Select **content**, **title**,
   **date** > **formatString** input `"MM/YY hh:mmA"`. Also select **author** >
   **node** > **name**

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

## Consuming the Data in Gatsby

Now we should have two queries, `IndexPage`, and `PostWithCommentsById`. We'll
need one more short query for the `createPages` API. It will be included in the
next section.

:::info

Gatsby's GraphiQL IDE's **Code Exporter** tab generates code snippets based on
the current query in the editor pane. Choose from Page Query, StaticQuery hook,
StaticQuery, and createPages.

:::

### Creating Templates

Part of creating pages with Gatsby involves
[specifying a template](https://www.gatsbyjs.com/docs/programmatically-create-pages-from-data/#specifying-a-template).
In this section, we'll use the queries we created to create a template for the
index page and the individual posts.

1. In your Gatsby project, create a new file in the `src/templates` directory
   called `last-five-post.js`
1. To keep things simple, we'll use the **Code Exporter** tab from the GraphiQL
   IDE. Select **Page query** from the dropdown menu and copy the code into
   `last-five-post.js`.

### Routing with `createPages`

We'll need to construct one more short query in order to tell Gatsby to generate
pages at certain paths. Notice that this query is a stripped down version of the
previous query, because all we need is the slug.

Here is an example of the `createPages` code which can be added to
`gatsby-node.js` and the pages will be fetched and created at build time. We
want the `uri` as the slug for our new page, and the `id` to pass into our Page
Query.

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

We've edited the code from the **Code Exporter** tab slightly.

- Pointed the `templatePath` to our template from the previous step
- Passed `node.uri` to the `path` property of `createPage`
- Passed `node.id` to the context of `createPage`

This code should generate 5 pages, one for each of the last 5 blog posts. Now
inside of our template, we can use the query we created

For more information on Gatsby's `createPage`, see
[the API reference](https://www.gatsbyjs.com/docs/reference/config-files/actions/#createPage)
and
[Creating Pages in `gatsby-node.js`](https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs)

Next, we will create our index page in the next section with a different routing
technique.

### Index Page

For pages that don't need to be dynamically created, we can define routes in
`src/pages`. See
[Define routes in `src/pages`](https://www.gatsbyjs.com/docs/reference/routing/creating-routes/#define-routes-in-srcpages)
for more information.

All we need for this page is a component and our index page query. We will use
the Page Query from the **Code Exporter** tab.

1. Create a new file in `src/pages` called `last-five.js`
1. Paste in the component from the **Code Exporter** tab

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

That's all for this page. Check out the next section to see how everything works
together.

## Next Steps

From here, it's time to see the code in action. Start the app if it's not
already running and head to `http://localhost:8000/last-five`. You should see
your `last-five.js` page rendered with the data from the Page query.

Now navigate to `http://localhost:8000/{uri of one of your posts}`. (You should
be able to see the post uris on the `/last-five` route, or check your GraphiQL
IDE.) The `last-five-post.js` template should be rendered there.

From here you should be able to query Gatsby's GraphQL layer to get the data you
need right where you need it.

You should now have:

- Built GraphQL queries in Gatsby's GraphiQL IDE
- Created page templates
- Sourced data from WordPress for use in a Gatsby application
- Dynamically created new routes based on GraphQL queries
