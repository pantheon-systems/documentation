---
title: Drupal Frontend Starters for Front-End Sites
subtitle: Cache
description: Learn how to set your cache-control headers and purge cache.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-frontend-starters/cache
anchorid: cache
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section shows you how to set Cache-Control headers using
`@pantheon-systems/drupal-kit` in the `next-drupal-starter`, or any Next.js
application using the `drupal-kit`, and how to purge your cache.

## Cache Control Headers

The `@pantheon-systems/drupal-kit` exports DrupalState, a class that includes a local store and helper methods to fetch data from Drupal. These
methods include a default Cache-Control header that is set on the response object and passed into the DrupalState helper.

The default Cache-Control header value is:

```http
Cache-Control: public, s-maxage=600
```

### Override Drupal Kit's Default Cache-Control Headers

The `@pantheon-systems/drupal-kit`'s Drupal State store sets the default header when you pass in the response object to any of the data fetching methods like `getObject` and `getObjectByPath`.

Use the Next.js `res.setHeader` method to override this default with your own Cache-Control header value. For example:

```jsx title=src/pages/articles/index.jsx
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

## In Production

These headers may or may not be respected when caching at the edge depending on where you deploy. Refer to your platform's documentation to verify.

## Purge Surrogate Key-based Cache

You should be familiar with the concept of surrogate key based caching and
purging. Refer to https://docs.fastly.com/en/guides/working-with-surrogate-keys for more information on working with surrogate keys.

This example below uses Drupal with the [Pantheon Advanced Page Cache module](https://www.drupal.org/project/pantheon_advanced_page_cache) installed.

## How It Works

```mermaid
sequenceDiagram
	participant A as Client
    participant B as Next.js + drupal-kit
    participant C as Drupal
    A->>B: Request a page that fetches from Drupal
    B->>C: Add Pantheon-SKey header to request
    C->>B: Surrogate-Key-Raw header included on response
    B->>A: Set Surrogate-Key header on outgoing response to browser
```

The `PantheonDrupalState` class from our `@pantheon-systems/drupal-kit` npm
package includes an adapted fetch method that adds the `Pantheon-SKey` header
to each request to Drupal. Responses from Drupal contain the
`Surrogate-Key` header. You can use these keys to instruct your frontend can to purge content from a cache when the content in Drupal changes.

## How To Ensure Headers Are Set On Custom Routes

- The Drupal backend has the [Pantheon Advanced Page Cache module](https://www.drupal.org/project/pantheon_advanced_page_cache) installed. installed and configured
- Create an instance of `PantheonDrupalState` imported from
  `@pantheon-systems/drupal-kit` in your application.
- Use the fetch methods available (see
  [`drupal-kit`](https://decoupledkit.pantheon.io/docs/Packages/drupal-kit/) for more information). The Surrogate-Key header should be set automatically if Drupal is configured correctly.
- Pass the [`context.res`](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter) from `getServerSideProps` into the `PantheonDrupalState` fetch method so that
the headers are added to the outgoing response.
