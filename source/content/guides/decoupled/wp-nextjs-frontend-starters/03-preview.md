---
title: WordPress + Next.js Frontend Starter for Front-End Sites
subtitle: Implement Decoupled Preview
description: Learn how to implement Decoupled Preview.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-nextjs-frontend-starters/preview
anchorid: preview
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to implement Decoupled Preview.

## Configure Your WordPress Instance

Your `PREVIEW_SECRET` and credentials must be correctly configured on your WordPress instance to use Decoupled Preview.

1. Log in to your WordPress instance.
1. Navigate to **Users**.
1. Create a new user or use an existing one. This username is your
   `WP_APPLICATION_USERNAME`

   <Alert title="Note"  type="info" >

    This user must have the `Editor` role at minimum. This is necessary for this user able to access revisions and private posts.

   </Alert>

1. Hover over the username and click **Edit** to bring up the user's profile
   page.
1. Scroll down to the **Application Passwords** section and name your application password. Your new `WP_APPLICATION_PASSWORD` will be shown on screen. Copy this value somewhere safe.
1. Select **Settings**, select **Preview Sites**, and then click the **ADD
   PREVIEW SITE** button. Note: You must have the Pantheon Decoupled WordPress Preview Plugin installed and activated on your instance.
1. Set the URL to point to `http(s)://{YOUR_SITE_URL}/api/preview`, replacing
   `{YOUR_SITE_URL}` with the URL of your frontend site, or `localhost:3000` for testing the preview locally.
1. Set a secret for the Preview Site and note this value down as your
   `PREVIEW_SECRET`.

Refer to [Set Environment Variables](/guides/decoupled/wp-nextjs-frontend-starters/environment-variables) for more information on how to set variables in your local development environment
or on the Pantheon Dashboard.

## Fetch Preview Content

The `wordpress-kit` GraphQL Client can make authenticated requests. Below is a snippet that exports a function that gets private posts.

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

You can use `getPostPreview` in a Next.js page:

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

Refer to the [posts page from the next-wordpress-starter](https://github.com/pantheon-systems/decoupled-kit-js/blob/canary/starters/next-wordpress-starter/pages/posts/) for a full example.

## Clear Current Preview

You can view another revision or edit, but you may need to clear the
current `previewData` cookie. The `nextjs-kit` includes a preview ribbon component that can be implemented to show a ribbon at the top of the screen when preview mode is true.

1. Go to `{YOUR_SITE_URL}/api/clear-preview`.

1. Confirm that you are redirected to the homepage after you clear the preview.

## Setting The Path Prefix

Refer to the Next.js guide on [Adding a Base Path](https://nextjs.org/docs/api-reference/next.config.js/basepath) for information on setting the `basePrefix` if you are not using the starter kit.

```bash{promptUser: user}
PANTHEON_UPLOAD_PATH
```

- `PANTHEON_UPLOAD_PATH` - Used to deploy a your application under a sub-path of a domain. This will be automatically set as the `basePath` in the
`next.config.js`.

- Set the `PANTHEON_UPLOAD_PATH` in your `.env.development.local` to the path you would like to test if you want to test locally.
