---
title: Pantheon Front-End Sites
subtitle: Multidev Workflow and Configuration
description: Learn how to use Multidev with Front-End Sites.
tags: [webops, workflow, decoupled]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/overview/fes-multidev
anchorid: fes-multidev
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on Front-End Sites Multidev workflow and configuration steps to connect to Multidev environments.

## Front-End Sites Multidev Development Workflow

The Front-End Sites Multidev workflow is outlined below:

- **Code Push:** The external Git provider controls code posts and deployments. Code pushed to the main branch is built and deployed in your Live environment. Code pushed to any other branch generates a new Multidev environment. Updates to existing branches result in the corresponding environment being updated.

- **Pull Request:** The Multidev environment is stood up and the preview and backend URL are displayed in GitHub on the PR, on a GitHub deployment, and also in the Front-End Sites Overview section of the dashboard. The build details for a PR are also be linked to GitHub.

## Connect to Multidev Environments with Drupal + Next.js

You can use the `PANTHEON_ENVIRONMENT` environment variable inside your `next.config.js` file to connect to a Multidev environment.

Either the `PANTHEON_CMS_ENDPOINT` or `BACKEND_URL` will need to be set.

The `PANTHEON_CMS_ENDPOINT` can be mocked for local development by defining it
in the `.env.development.local`.

```
PANTHEON_CMS_ENDPOINT=dev-my-drupal-site.pantheonsite.io
```

Taking a look at how the `next.config.js` works, there is this logic which sets
the `backendUrl`.

```js
let backendUrl, imageDomain;
if (process.env.BACKEND_URL === undefined) {
	backendUrl = `https://${process.env.PANTHEON_CMS_ENDPOINT}`;
	imageDomain = process.env.IMAGE_DOMAIN || process.env.PANTHEON_CMS_ENDPOINT;

	// populate BACKEND_URL as a fallback and for build scripts
	process.env.BACKEND_URL = `https://${process.env.PANTHEON_CMS_ENDPOINT}`;
} else {
	backendUrl = process.env.BACKEND_URL;
	imageDomain =
		process.env.IMAGE_DOMAIN ||
		process.env.BACKEND_URL.replace(/^https?:\/\//, '');
}
```

In order to connect to a Multidev backend, this backendUrl will need to be
updated. `PANTHEON_ENVIRONMENT` includes a PR number or integration branch name.

This code could be added under the above logic to connect to a Multidev that is
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

## Connect to Multidev Environments with WordPress + Next.js

To connect to a Multidev environment, the `PANTHEON_ENVIRONMENT` environment
variable can be used inside of `next.config.js`.

Either the `PANTHEON_CMS_ENDPOINT` or `WPGRAPHQL_URL` will need to be set.

The `PANTHEON_CMS_ENDPOINT` can be mocked for local development by defining it
in the `.env.development.local`.

```
PANTHEON_CMS_ENDPOINT=dev-my-wordpress-site.pantheonsite.io
```

Taking a look at how the `next.config.js` works, there is this logic which sets
the `backendUrl`.

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

In order to connect to a Multidev backend, this backendUrl will need to be
updated. `PANTHEON_ENVIRONMENT` includes a PR number or integration branch name.

This code could be added under the above logic to connect to a Multidev that is
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

## Connect to Multidev Environments with WordPress + Gatsby

To connect to a Multidev environment, the `PANTHEON_ENVIRONMENT` environment
variable can be used inside of `gatsby-config.js`.

Either the `PANTHEON_CMS_ENDPOINT` or `WPGRAPHQL_URL` will need to be set.

The `PANTHEON_CMS_ENDPOINT` can be mocked for local development by defining it
in the `.env.development.local`.

```
PANTHEON_CMS_ENDPOINT=dev-my-wordpress-site.pantheonsite.io
```

Taking a look at how the `gatsby-config.js` works, there is this logic which
sets the `url`.

```js
let url = process.env.WPGRAPHQL_URL || process.env.PANTHEON_CMS_ENDPOINT;
```

In order to connect to a Multidev backend, this url will need to be updated.
`PANTHEON_ENVIRONMENT` includes a PR number or integration branch name.

This code could be added under the above logic to connect to a Multidev that is
prefixed with the branch name of my site.

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
