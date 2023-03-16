---
title: WordPress + Next.js Frontend Starter for Front-End Sites
subtitle: Set Environment Variables
description: Learn how to set your environment variables.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-nextjs-frontend-starters/environment-variables
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

Next.js requires the endpoint at build time to fetch data from the WordPress instance. The starter kit uses [dotenv](https://www.npmjs.com/package/dotenv) for local development.

1. Clone your Front-End Site repo.

1. Create a `.env.development.local` file and update the `WPGRAPHQL_URL` and `IMAGE_DOMAIN` with your WordPress GraphQL endpoint, and the `IMAGE_DOMAIN`. If the `WPGRAPHQL_URL` and `IMAGE_DOMAIN` are the same, you can omit setting the `IMAGE_DOMAIN`. For example:

```bash{promptUser: user}
WPGRAPHQL_URL=https://my-wordpress-site.pantheon.site/wp/graphql
IMAGE_DOMAIN=my-image-cdn.site
```

## Connect to Multidev Environments

The `PANTHEON_ENVIRONMENT` environment variable can be used inside of `next.config.js` file to connect to a Multidev environment. Either the `PANTHEON_CMS_ENDPOINT` or `BACKEND_URL` must be set inside `next.config.js`. The `PANTHEON_CMS_ENDPOINT` can be mocked for local development by defining it in the `.env.development.local`. For example:

	```bash{promptUser: user}
	PANTHEON_CMS_ENDPOINT=dev-my-wordpress-site.pantheonsite.io
	```

1. Update the `backendUrl`. Note that `PANTHEON_ENVIRONMENT` includes a PR number or integration branch name in the example below.

```js
let backendUrl, imageDomain;
if (process.env.WPGRAPHQL_URL === undefined) {
	backendUrl = `https://${process.env.PANTHEON_CMS_ENDPOINT}/wp/graphql`;
	imageDomain = process.env.IMAGE_DOMAIN || process.env.PANTHEON_CMS_ENDPOINT;

	// populate WPGRAPHQL_URL as a fallback and for build scripts
	process.env.WPGRAPHQL_URL = `https://${process.env.PANTHEON_CMS_ENDPOINT}/wp/graphql`;
} else {
	backendUrl = process.env.WPGRAPHQL_URL;
	imageDomain =
		process.env.IMAGE_DOMAIN ||
		process.env.WPGRAPHQL_URL.replace(/\/wp\/graphql$/, '').replace(
			/^https?:\/\//,
			'',
		);
}
```

This code can be added under the above logic to connect to a Multidev that is
prefixed with the branch name of my site.

```js
/**
 * PANTHEON_ENVIRONMENT is equal to `multi-demo` since that is the name of my branch. I will use this variable to create a `backendUrl` which points
 * to my Multidev backend.
 **/
if (process.env.PANTHEON_ENVIRONMENT !== 'live') {
	backendUrl = `https://${
		process.env.PANTHEON_ENVIRONMENT
	}-${backendUrl.replace(/^https?:\/\/[^-]*-/, '')}`;
}
```

## Set Environment Variables to Enable Decoupled Preview

1. Open `.env.development.local` for your local development site.

1. Set the `PREVIEW_SECRET` variable. This is the secret used on creation of a new preview site in the WordPress dashboard.

1. Set the `WP_APPLICATION_USERNAME` variable. This is the username found and set in the **Users** tab of the WordPress dashboard.

1. Set the `WP_APPLICATION_PASSWORD` variable. This is the password created for the WordPress application user. Passwords can be set through selecting a user inside the **Users** tab of the WordPress dashboard.

1. Go to your Pantheon dashboard and set the variables listed above for production or Multidev environments.