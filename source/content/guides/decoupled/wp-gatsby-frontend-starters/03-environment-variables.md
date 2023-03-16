---
title: WordPress + Gatsby Frontend Starter for Front-End Sites
subtitle: Set Environment Variables
description: Learn how to set your environment variables.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-gatsby-frontend-starters/environment-variables
anchorid: environment-variables
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to set environment variables for local development and Decoupled Preview, as well as how to connect to Multidev environments.

## Local Development

Gatsby requires the endpoint at build time to fetch data from the WordPress instance, The starter kit uses [dotenv](https://www.npmjs.com/package/dotenv) for local development.

1. Create a new project with the `gatsby-wordpress-starter`.

1. Create a `.env.development.local` file at the root of the project directory and add a `WPGRAPHQL_URL` key with your WordPress GraphQL Endpoint as the value. For example:

	```bash{promptUser: user}
	WPGRAPHQL_URL=https://dev-my-wordpress-site.pantheon.site/wp/graphql
	```

## Connect to Multidev Environments

The `PANTHEON_ENVIRONMENT` environment variable can be used inside of `gatsby-config.js` file to connect to a Multidev environment. Either the `PANTHEON_CMS_ENDPOINT` or `WPGRAPHQL_URL` must be set.

The `PANTHEON_CMS_ENDPOINT` can be mocked for local development by defining it in the `.env.development.local`. For example:

	```bash{promptUser: user}
	PANTHEON_CMS_ENDPOINT=dev-my-wordpress-site.pantheonsite.io
	```

Update the `url` in the `gatsby-config.js`. For example:

	```js
	let url = process.env.WPGRAPHQL_URL || process.env.PANTHEON_CMS_ENDPOINT;
	```


Note that `PANTHEON_ENVIRONMENT` includes a PR number or integration branch name in the example below.

```js
/**
 * PANTHEON_ENVIRONMENT is equal to `multi-demo` since that is the name of my branch.
 **/
if (process.env.PANTHEON_ENVIRONMENT !== 'live') {
	url = `https://${process.env.PANTHEON_ENVIRONMENT}-${url.replace(
		/^https?:\/\/[^-]*-/,
		'',
	)}`;
}
```

