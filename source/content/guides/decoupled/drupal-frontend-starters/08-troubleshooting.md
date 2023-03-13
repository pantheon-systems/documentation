---
title: Drupal Frontend Starters for Front-End Sites
subtitle: Troubleshooting
description: Get solutions to common issues.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-frontend-starters/troubleshooting
anchorid: troubleshooting
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

## Before You Begin

This document is meant to aid when troubleshooting common issues that arise when
using the `@pantheon-systems/next-drupal-starter`. For additional
troubleshooting information related to the Pantheon platform, see
[Pantheon Front-End Sites Frequently Asked Questions](https://pantheon.io/docs/guides/decoupled-sites/faq/).

## Images Are Not Working

Local Development:

1.  Check that the `IMAGE_DOMAIN` environment variable is set in the
    `.env.development.local` file.
1.  Ensure the `IMAGE_DOMAIN` environment only contains the hostname. For
    example:
    ```.env
      IMAGE_DOMAIN=example.com
    ```
1.  Ensure that you are using the `next/image` component and that you set the
    src by constructing the `IMAGE_DOMAIN` and the image source. For example:

    ````jsx // in the starter kit, the IMAGE_URL is available // as a constant
    which is exported from lib/constants.js import { IMAGE_URL } from
    '../../lib/constants';

        import Image from 'next/image';

        const MyPage = (props) => {
          // ensure the sourceUrl is a relative path, not an absolute URL
          // because we will append this to the IMAGE_URL
          const sourceUrl = props.url;
          const altText = props.alt;
          return (
            <>
              <Image
                src={IMAGE_URL + sourceUrl}
                alt={altText}
                // remaining Image props...
              />
            </>
          );
        };

        ```

    See
    [The docs on the `next/image` component for more information](https://nextjs.org/docs/api-reference/next/image#src).
    ````

## Adapting for Use With Existing Drupal Sites

Our starter kits assume that you are using Drupal's core Media module to manage
images for article content. If you are instead using Drupal's default image
field, you will need to make the following adjustments to the starter kit:

1. Update grid pages to use the `field_image` field instead of the
   `field_media_image` field.

In the `getServerSideProps` function in `pages/index.jsx` change the parameters
used to source your articles. Change:

```jsx
const articles = await store.getObject({
	objectName: 'node--article',
	params: 'include=field_media_image.field_media_image',
	refresh: true,
	res: context.res,
	anon: true,
});
```

to:

```jsx
const articles = await store.getObject({
	objectName: 'node--article',
	params: 'include=field_image',
	refresh: true,
	res: context.res,
	anon: true,
});
```

Next, make the same change in `pages/articles/index.jsx`.

In `components/grid.jsx` change the `imgSrc` constant in the `ArticleGridItem`
component from:

```jsx
// For use with withGrid
export const ArticleGridItem = ({
	content: article,
	multiLanguage,
	locale,
}) => {
	const imgSrc = article?.field_media_image?.field_media_image?.uri?.url || '';
```

to:

```jsx
export const ArticleGridItem = ({
	content: article,
	multiLanguage,
	locale,
}) => {
	const imgSrc = article?.field_image?.uri?.url || '';
```

2. Update article detail pages to use the `field_image` field instead of the
   `field_media_image` field.

_If you are aliasing your articles within the `/articles/*` path:_

Within the `articleTemplate` function in `pages/articles/[...slug].jsx`, change
the `imgSrc` constant from:

```jsx
const imgSrc = article.field_media_image?.field_media_image?.uri?.url;
```

to:

```jsx
const imgSrc = article.field_image?.uri?.url;
```

Within the `getServerSideProps` function in `pages/articles/[...slug].jsx`,
change the `params` constant from:

```jsx
const params = 'include=field_media_image.field_media_image';
```

to:

```jsx
const params = 'include=field_image';
```

_If you are aliasing your articles using a pattern other than `/articles/*`:_

Within the `renderPage` function in `pages/[...alias].jsx`, find the
`if (pageData?.type === 'node--article')` conditional and change the following
constants from:

```jsx
const {
	title,
	body: { processed },
	field_media_image,
	thumbnail,
} = pageData;
const imgSrc = field_media_image?.field_media_image?.uri.url;
```

to:

```jsx
const {
	title,
	body: { processed },
	field_image,
	thumbnail,
} = pageData;
const imgSrc = field_image?.uri.url;
```

Within the `getServerSideProps` function in `pages/[...alias].jsx`, change the
value of the `params` constant from:

```jsx
const params =
	resourceName === 'node--recipe'
		? 'include=field_media_image.field_media_image,field_recipe_category'
		: resourceName === 'node--article'
		? 'include=field_media_image.field_media_image'
		: '';
```

to:

```jsx
const params =
	resourceName === 'node--recipe'
		? 'include=field_media_image.field_media_image,field_recipe_category'
		: resourceName === 'node--article'
		? 'include=field_image'
		: '';
```

After making these changes, images should now display correctly within your
articles.
