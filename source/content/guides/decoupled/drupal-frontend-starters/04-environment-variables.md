---
title: Drupal Frontend Starters for Front-End Sites
subtitle: Set Environment Variables
description: Learn how to set your environment variables.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-frontend-starters/environment-variables
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

In order to fetch data from the Drupal instance, Next.js needs to know the
endpoint at build time. For local development, the starter kit uses
[dotenv](https://www.npmjs.com/package/dotenv).

When you clone your decoupled frontend repo, create a `.env.development.local` file. In this file, update the `BACKEND_URL` and `IMAGE_DOMAIN` with your Drupal CMS URL, and the `IMAGE_DOMAIN`. If the `BACKEND_URL` and `IMAGE_DOMAIN` are the same, you can omit setting the `IMAGE_DOMAIN`.

For example:

```
BACKEND_URL=https://my-drupal-site.pantheon.site/
IMAGE_DOMAIN=my-image-cdn.site
```

If your site is translated and you would like the hreflang metadata set
correctly, you may set `FRONTEND_URL` to the URL of your frontend site.

If the `FRONTEND_URL` is not set, it will default to the value of
`PANTHEON_ENVIRONMENT_URL`

```
FRONTEND_URL=https://my-frontend-site.pantheon.site
```

For development, this value can be set to any string, or `http://localhost:3000`

## Decoupled Preview

To enable Decoupled Preview, the following environment variables must be set in the `.env.development.local` for local dev and in the Pantheon dashboard for production or Multidev environments.

```
PREVIEW_SECRET
CLIENT_ID
CLIENT_SECRET
```

- `PREVIEW_SECRET` - Set the Preview Secret here: {your Backend
  URL}/admin/structure/dp-preview-site/example_nextjs_preview
- `CLIENT_ID` - Visible as the UUID for the “Example Consumer” here: {your
  Backend URL}/en/admin/config/services/consumer
- `CLIENT_SECRET` - Set the Client Secret here: {your Backend
  URL}/admin/config/services/consumer/2/edit

## Before You Begin

Make sure a preview site and client secret is properly configured on your Drupal
instance.

1. Log in to your Drupal instance.
1. Navigate to **Configuration** > **SimpleOAuth** > **Clients**
1. Create a new consumer or use the default. Copy the UUID of the consumer you
   would like to use.
1. Click **Edit** on the consumer you are using and add a new secret. Note this
   value down as well.
1. We now have a client that can use our preview site. To configure the preview
   site, navigate to **Structure** > **Preview Sites**. Consult
   [Configuring a Preview Site](../../../Backend%20Starters/Decoupled%20Drupal/configuring-preview-site.md)
   for more information.
1. Set the URL to point to http(s)://{YOUR_SITE_URL}/api/preview replacing
   `{YOUR_SITE_URL}` with the URL of your frontend site, or `localhost:3000` for
   testing preview locally.
1. Set a secret for the Preview Site and note this value down.

Now you have all of the credentials needed to make authenticated requests to the Drupal instance, including the ability to preview content!

## Using `getPreview`

Now that we are set up, we can implement the `getPreview` helper, which can be found in the `lib` directory of the `next-drupal-starter`. This helper takes in two arguments, the current server context as well as the name of the node to be previewed.

```js
// Import some helpers
import { getPreview } from '../../lib/get-preview';
import { isMultiLanguage } from '../../lib/isMultiLanguage';
import {
	getCurrentLocaleStore,
	globalDrupalStateStores,
} from '../../lib/stores';

// your React component here

export async function getStaticProps(context) {
	// Returns a boolean if the site is multilingual
	const multilanguage = isMultilanguage(context.locales);
	// Sets our current language. If preview, use the previewLang,
	// otherwise use the current locale.
	const lang = context.preview
		? context.previewData.previewLang
		: context.locale;
	// set the store based on the language
	const store = getCurrentLocaleStore(lang, globalDrupalStateStores);
	// gets preview data from the Drupal instance, or in the case of a revision,
	// sets the proper jsonapi param to fetch the revision from Drupal.
	context.preview && getPreview(context, 'node--article');

	// this variable will depend on your route
	const slug = `/articles/${context.params.slug[0]}`;
	// Now we can use the store to get the data we need to render our component
	const article = await store.getObjectByPath('node--article', {
		path: `${multiLanguage ? lang : ''}${slug}`,
	});

	// From here, you can do anything else needed before
	// returning the data to the component.

	return {
		props: { article },
		revalidate: 60,
	};
}
```

See the [articles page from the next-drupal-starter](https://github.com/pantheon-systems/decoupled-kit-js/tree/canary/starters/next-drupal-starter/pages/articles/[...slug].js#L64)
for a full example on using the `getPreview` helper.

## Clearing Current Preview

If you'd like to view another revision or edit, you may need to clear the
current previewData cookie. This can be done by going to {YOUR_SITE_URL}/api/clear-preview. On successful clear, you will be redirected to the homepage.

## Limitations

Content that is saved as a draft can not be previewed. Currently, preview
content must be published or a published revision.

## Connecting to Multidev Environments

To connect to a Multidev environment, the `PANTHEON_ENVIRONMENT` environment
variable can be used inside of `next.config.js`.

Either the `PANTHEON_CMS_ENDPOINT` or `BACKEND_URL` will need to be set.

The `PANTHEON_CMS_ENDPOINT` can be mocked for local development by defining it in the `.env.development.local`.

```
PANTHEON_CMS_ENDPOINT=dev-my-drupal-site.pantheonsite.io
```

Taking a look at how the `next.config.js` works, there is this logic which sets the `backendUrl`.

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

## Before You Begin

Make sure a preview site and client secret is properly configured on your Drupal
instance.

1. Log in to your Drupal instance.
1. Navigate to **Configuration** > **SimpleOAuth** > **Clients**
1. Create a new consumer or use the default. Copy the UUID of the consumer you
   would like to use.
1. Click **Edit** on the consumer you are using and add a new secret. Note this
   value down as well.
1. We now have a client that can use our preview site. To configure the preview
   site, navigate to **Structure** > **Preview Sites**. Consult
   [Configuring a Preview Site](../../../Backend%20Starters/Decoupled%20Drupal/configuring-preview-site.md)
   for more information.
1. Set the URL to point to http(s)://{YOUR_SITE_URL}/api/preview replacing
   `{YOUR_SITE_URL}` with the URL of your frontend site, or `localhost:3000` for
   testing preview locally.
1. Set a secret for the Preview Site and note this value down.

Now you have all of the credentials needed to make authenticated requests to the
Drupal instance, including the ability to preview content!

See [Setting Environment Variables](./setting-environment-variables.md) for more
information on how to set these variables in your local development environment
or on the Pantheon Dashboard.

## Using `getPreview`

Now that we are set up, we can implement the `getPreview` helper, which can be
found in the `lib` directory of the `next-drupal-starter`. This helper takes in
two arguments, the current server context as well as the name of the node to be
previewed.

```js
// Import some helpers
import { getPreview } from '../../lib/get-preview';
import { isMultiLanguage } from '../../lib/isMultiLanguage';
import {
	getCurrentLocaleStore,
	globalDrupalStateStores,
} from '../../lib/stores';

// your React component here

export async function getStaticProps(context) {
	// Returns a boolean if the site is multilingual
	const multilanguage = isMultilanguage(context.locales);
	// Sets our current language. If preview, use the previewLang,
	// otherwise use the current locale.
	const lang = context.preview
		? context.previewData.previewLang
		: context.locale;
	// set the store based on the language
	const store = getCurrentLocaleStore(lang, globalDrupalStateStores);
	// gets preview data from the Drupal instance, or in the case of a revision,
	// sets the proper jsonapi param to fetch the revision from Drupal.
	context.preview && getPreview(context, 'node--article');

	// this variable will depend on your route
	const slug = `/articles/${context.params.slug[0]}`;
	// Now we can use the store to get the data we need to render our component
	const article = await store.getObjectByPath('node--article', {
		path: `${multiLanguage ? lang : ''}${slug}`,
	});

	// From here, you can do anything else needed before
	// returning the data to the component.

	return {
		props: { article },
		revalidate: 60,
	};
}
```

See the
[articles page from the next-drupal-starter](https://github.com/pantheon-systems/decoupled-kit-js/tree/canary/starters/next-drupal-starter/pages/articles/[...slug].js#L64)
for a full example on using the `getPreview` helper.

## Clearing Current Preview

If you'd like to view another revision or edit, you may need to clear the
current previewData cookie. This can be done by going to
{YOUR_SITE_URL}/api/clear-preview. On successful clear, you will be redirected
to the homepage.

## Limitations

Content that is saved as a draft can not be previewed. Currently, preview
content must be published or a published revision.