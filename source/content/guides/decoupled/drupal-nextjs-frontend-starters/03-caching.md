---
title: Drupal + Next.js Frontend Starter for Front-End Sites
subtitle: Caching Recommendations
description: Learn about caching recommendations for your Drupal frontend starter kit.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-nextjs-frontend-starters/caching
anchorid: caching
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

Cache settings are configured out-of-the-box for you, but there are circumstances in which you might need to make your own configurations, such as when your CMS is not on Pantheon but your frontend is on Pantheon.

## How it Works

Edge caching can improve performance for Front-End Sites that rely on API endpoints, and also reduce the load on your CMS in cases when a large number of API requests are made in a short period of time, such as during a full site build process.

<Partial file="decoupled-caching.md" />

## Using the Starter Kit

<Alert title="Note"  type="info" >

The Front-End Sites starter kits use Next.js 13 and the Pages Router. The instructions below only apply to the Pages Router and are not currently compatible with the App Router.

</Alert>

The recommended caching configurations are automatically enabled if you created your Drupal site using the [Drupal + Next.js frontend starter project](/guides/decoupled/drupal-nextjs-frontend-starters/create).

The `PantheonDrupalState` class from the `@pantheon-systems/drupal-kit` npm
package includes an adapted fetch method that adds the `Pantheon-SKey` header
to each request sent to Drupal. Responses from Drupal contain the
`Surrogate-Key` header. You can use these keys to instruct your frontend to purge content from a cache when the content in Drupal changes.

## Cache Control Headers

This section explains how to set Cache-Control headers using
`@pantheon-systems/drupal-kit` in the `next-drupal-starter`, or any Next.js
application using the `drupal-kit`. Our `@pantheon-systems/drupal-kit` exports DrupalState, a class that includes a local store and helper methods to fetch data from Drupal. Included in these methods is a default Cache-Control header that is set on the response object that is passed into the DrupalState helper.

The default Cache-Control header value is as follows:

```http
Cache-Control: public, s-maxage=600
```

### Override Drupal Kit's Default Cache-Control Headers

The `@pantheon-systems/drupal-kit`'s Drupal State store sets the default header
when you pass in the response object to any of the data fetching methods like
`getObject` and `getObjectByPath`.

To override this default with your own Cache-Control header value, use the
Next.js `res.setHeader` method as shown in the example:


```js

import { DrupalState } from '@pantheon-systems/drupal-kit';

export default function MyPage(props) {
	// Page Component here...
}

export async function getServerSideProps(context) {
	const { res } = context;
	// For the sake of the example, we will create a new instance in getServerSideProps,
	// but usually this should be done once somewhere and imported
	const store = new DrupalState({
		apiBase: 'https://my-drupal-site.com',
		defaultLanguage: 'en',
	});

const articles = store.getObject({
		objectName: 'node--article',
});

const myCacheControlHeader = 'public, max-age=604800, must-revalidate';

// The headers must be set AFTER calling any data fetching methods on the store
	// or they will be overridden by those methods.
	res.setHeader('Cache-Control', myCacheControlHeader);

// Return props...
}
```

You can take advantage of this feature without using the starter kit.

## Purge Edge Caching

### Ensure Headers Are Set for Custom Routes

<Alert title="Note"  type="info" >

The Decoupled Kit [Drupal Backend Starter Project](/guides/decoupled/drupal-backend-starters) and [Drupal Next.js Starter Kit](/guides/decoupled/drupal-nextjs-frontend-starters) handle the configuration below automatically.
You do not need to make configuration changes for existing routes because the starter kit configures this for you.

</Alert>


1. Make sure the Drupal backend has the [Pantheon Advanced Page Cache](https://www.drupal.org/project/pantheon_advanced_page_cache) module installed and configured.

1. Create an instance of `PantheonDrupalState` imported from `@pantheon-systems/drupal-kit` in your application.

1. Use the fetch methods available (refer to `drupal-kit` for more information). The `Surrogate-Key` header should be set automatically if Drupal is configured correctly.

1. Pass the `context.res` from `getServerSideProps` into the `PantheonDrupalState` fetch method so that the headers are added to the outgoing response.

### Create a New Route

Follow the steps below if you need to create a **new** route.

In the example below, the code sets the headers necessary for
cache purging on an article list page.

1. Create an instance of `DrupalState` in your article list page:

	```js
	import { DrupalState } from '@pantheon-systems/drupal-kit';
	const store = new DrupalState({
		apiBase: 'https://my-drupal-site.pantheonsite.io',
	});
	```

1. Use the `store` instance in `getSeverSideProps` to fetch data from Drupal and provide the outgoing response object:

	```js
	export async function getServerSideProps(context) {
		const articles = await store.getObject({
			objectName: 'node--article',
			res: context.res,
		});
		return { props: { articles } };
	}
	```

	- You should now see the `Surrogate-Key` header on the outgoing response for `/articles/` if your backend is configured correctly. This allows the cache for this page to be purged automatically when any related content changes in Drupal.

## More Resources

- [Fastly Surrogate Key documentation](https://docs.fastly.com/en/guides/working-with-surrogate-keys)