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

## Local Development

In order to fetch data from the WordPress instance, Next.js needs to know the
endpoint at build time. For local development, the starter kit uses
[dotenv](https://www.npmjs.com/package/dotenv).

When you clone your decoupled frontend repo, create a `.env.development.local`
file. In this file, update the `WPGRAPHQL_URL` and `IMAGE_DOMAIN` with your
WordPress GraphQL endpoint, and the `IMAGE_DOMAIN`. If the `WPGRAPHQL_URL` and
`IMAGE_DOMAIN` are the same, you can omit setting the `IMAGE_DOMAIN`.

For example:

```
WPGRAPHQL_URL=https://my-wordpress-site.pantheon.site/wp/graphql
IMAGE_DOMAIN=my-image-cdn.site
```

## Connecting to Multidev Environments

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

## Decoupled Preview

To enable Decoupled Preview, the following environment variables must be set in
the `.env.development.local` for local dev and in the Pantheon dashboard for
production or Multidev environments.

```
PREVIEW_SECRET
WP_APPLICATION_USERNAME
WP_APPLICATION_PASSWORD
```

- `PREVIEW_SECRET` - The secret used on creation of a new preview site in the WP
  dashboard
- `WP_APPLICATION_USERNAME` - To be set as the username found and set in the
  **Users** tab of the WP dashboard
- `WP_APPLICATION_PASSWORD` - To be set as the password created for the WP
  application user. Passwords can be set through selecting a user inside the
  **Users** tab of the WP dashboard


## Before You Begin

Make sure a `PREVIEW_SECRET` and valid credentials are properly configured on
your WordPress instance. To do so, follow these instructions:

1. Log in to your WordPress instance.
1. Navigate to **Users**
1. Create a new user or use an existing one. This username is your
   `WP_APPLICATION_USERNAME`

   :::info This user must have at least the `Editor` role.

   This is necessary in order for this user to be able to access revisions and
   private posts.

   :::

1. Hover over the username and click **Edit** to bring up the user's profile
   page.
1. Scroll down to the Application Passwords section and name your application
   password.
1. Your new `WP_APPLICATION_PASSWORD` will be shown on screen. Copy this value
   somewhere safe.
1. We now have a client that can use our preview site. To configure the preview
   site, navigate to **Settings** > **Preview Sites** and click the **ADD
   PREVIEW SITE** button. Note: You will need the Pantheon Decoupled WordPress
   Preview Plugin installed and activated on your instance.
1. Set the URL to point to http(s)://{YOUR_SITE_URL}/api/preview replacing
   `{YOUR_SITE_URL}` with the URL of your frontend site, or `localhost:3000` for
   testing preview locally.
1. Set a secret for the Preview Site and note this value down as your
   `PREVIEW_SECRET`.

Now you have all of the credentials needed to make authenticated requests to the
WordPress instance, including the ability to preview content!

See [Setting Environment Variables](./setting-environment-variables.md) for more
information on how to set these variables in your local development environment
or on the Pantheon Dashboard.

## Fetching Preview Content

Now that we are set up, the `wordpress-kit` GraphQL Client can make
authenticated requests. Below is a snippet that exports a function that gets
private posts.

```js
const client = new GraphqlClientFactory(process.env.backendUrl).create();

// Encodes the WordPress credentials in a useable format for the auth header
const getAuthCredentials = () => {
	const credentials = `${process.env.WP_APPLICATION_USERNAME}:${process.env.WP_APPLICATION_PASSWORD}`;
	const encodedCredentials = Buffer.from(credentials, 'binary').toString(
		'base64',
	);
	return encodedCredentials;
};

// Gets a private post revision
export async function getPostPreview(id) {
	const credentials = getAuthCredentials();
	client.setHeaders({ Authorization: `Basic ${credentials}` });

	const query = gql`
		query PostPreviewQuery($id: ID!) {
			post(id: $id, idType: DATABASE_ID, asPreview: true) {
				title
				date
				featuredImage {
					node {
						altText
						sourceUrl
					}
				}
				content
			}
		}
	`;

	const { post } = await client.request(query, { id });

	return { post };
}
```

To use `getPostPreview` in a Next.js page:

```js
// import the helper function
import { getPostPreview } from '../lib/getPostPreview';

// Your Next.js page component here

export async function getServerSideProps(context) {
	if (context.previewData) {
		const id = context.previewData.key;
		// using the previewData, we have the id of the unpublished post
		const { post } = getPostPreview(id);

		return {
			props: { post },
		};
	}
	// ...
}
```

See the
[posts page from the next-wordpress-starter](https://github.com/pantheon-systems/decoupled-kit-js/blob/canary/starters/next-wordpress-starter/pages/posts/%5B...slug%5D.jsx#L44)
for a full example.

## Clearing Current Preview

If you'd like to view another revision or edit, you may need to clear the
current previewData cookie. This can be done by going to
{YOUR_SITE_URL}/api/clear-preview. On successful clear, you will be redirected
to the homepage.

Our `nextjs-kit` includes a preview ribbon component that can be implemented to
show a ribbon at the top of the screen when preview mode is true.


## Setting The Path Prefix

See the Next.js guide on
[Adding a Base Path](https://nextjs.org/docs/api-reference/next.config.js/basepath)
for information on setting the `basePrefix` if you are not using the starter
kit.

```
PANTHEON_UPLOAD_PATH
```

- `PANTHEON_UPLOAD_PATH` - Used to deploy a your application under a sub-path of
  a domain. This will be automatically set as the `basePath` in the
  `next.config.js`. To test this locally, set the `PANTHEON_UPLOAD_PATH` in your
  `.env.development.local` to the path you would like to test.
