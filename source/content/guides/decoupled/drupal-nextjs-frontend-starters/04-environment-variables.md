---
title: Drupal + Next.js Frontend Starter for Front-End Sites
subtitle: Set Environment Variables
description: Learn how to set your environment variables.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-nextjs-frontend-starters/environment-variables
anchorid: environment-variables
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to set environment variables for local development and decoupled preview, as well as how to connect to Multidev environments.

## Local Development

Next.js requires the endpoint at build time to fetch data from the Drupal instance. The starter kit uses [dotenv](https://www.npmjs.com/package/dotenv) for local development.

1. Clone your Front-End Site repo.

1. Create a `.env.development.local` file and update the `BACKEND_URL` and `IMAGE_DOMAIN` with your Drupal CMS URL, and the `IMAGE_DOMAIN`. If the `BACKEND_URL` and `IMAGE_DOMAIN` are the same, you can omit setting the `IMAGE_DOMAIN`. For example:

	```bash{promptUser: user}
	BACKEND_URL=https://my-drupal-site.pantheon.site/
	IMAGE_DOMAIN=my-image-cdn.site
	```

1. Optional. Set `FRONTEND_URL` to the URL of your Front-End Site if your site is translated and you would like the `hreflang` metadata set correctly. This value can be set to any string, or `http://localhost:3000` for development.

	<Alert title="Note"  type="info" >

	If the `FRONTEND_URL` is not set, it will default to the value of
	`PANTHEON_ENVIRONMENT_URL`

	</Alert>

	```bash{promptUser: user}
	FRONTEND_URL=https://my-frontend-site.pantheon.site
	```

## Set Environment Variables to Enable Decoupled Preview

1. Open `.env.development.local` for your local development site.

1. Set the `PREVIEW_SECRET` variable. For example:`{your Backend URL}/admin/structure/dp-preview-site/example_nextjs_preview`

1. Set the `CLIENT_ID` variable. For example: `{your Backend URL}/en/admin/config/services/consumer`. This is visible as the UUID for the “Example Consumer.”

1. Set the `CLIENT_SECRET`variable. For example: `{your Backend URL}/admin/config/services/consumer/2/edit`

1. Go to your Pantheon dashboard and set the variables listed above for production or Multidev environments.

## Connect to Multidev Environments

The `PANTHEON_ENVIRONMENT` variable can be used inside of `next.config.js` file to connect to a Multidev environment. Either the `PANTHEON_CMS_ENDPOINT` or `BACKEND_URL` must be set inside `next.config.js`. The `PANTHEON_CMS_ENDPOINT` can be mocked for local development by defining it in the `.env.development.local`. For example:

    ```bash{promptUser: user}
    PANTHEON_CMS_ENDPOINT=dev-my-drupal-site.pantheonsite.io
    ```

Update the `backendUrl`. Note that `PANTHEON_ENVIRONMENT` includes a PR number or integration branch name in the example below.

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


The following code can be added under the logic shown above to connect to a Multidev that is prefixed with the branch name of the site.

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