---
title: Drupal Frontend Starters for Front-End Sites
subtitle: Implement Decoupled Preview
description: Learn how to implement decoupled preview..
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-frontend-starters/preview
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

## Configure Your Drupal Instance

Your preview site and client secret must be correctly configured on your Drupal instance to use Decoupled Preview.

1. Log in to your Drupal instance.
1. Select **Configuration**, select **SimpleOAuth**, and then select **Clients**.
1. Create a new consumer or use the default. Copy the UUID of the consumer you plan to use.
1. Click **Edit** next to the consumer and add a new secret. Copy and save this value for later use.

1. Select **Structure** and then **Preview Sites** to configure the preview
site.

1. Set the URL to point to `http(s)://{YOUR_SITE_URL}/api/preview`, replacing
`{YOUR_SITE_URL}` with the URL of your frontend site, or `localhost:3000` to test the preview locally.

1. Set a secret for the Preview Site and note this value down.

Now you have all of the credentials needed to make authenticated requests to the Drupal instance, including the ability to preview content!

## Use `getPreview`

You can implement the `getPreview` helper found in the `lib` directory of the `next-drupal-starter`. This helper takes in two arguments:

- Current server context
- Name of the node to be previewed

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

## Clear Current Preview

You can view another revision or edit, but you may need to clear the
current `previewData` cookie.

1. Go to `{YOUR_SITE_URL}/api/clear-preview`.

1. Confirm that you are redirected to the homepage after you clear the preview.

## Limitations

Content saved as a draft cannot be previewed. Currently, preview
content must be published or a published revision.

