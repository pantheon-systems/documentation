---
title: Drupal + Next.js Frontend Starter for Front-End Sites
subtitle: Troubleshooting
description: Get solutions to common issues.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-nextjs-frontend-starters/troubleshooting
anchorid: troubleshooting
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides solutions to common issues when using the `@pantheon-systems/next-drupal-starter`. Refer to
[Pantheon Front-End Sites Frequently Asked Questions](/guides/decoupled/overview/faq/) for Pantheon platform troubleshooting information.

## Images Are Not Working

Local Development:

1.  Check that the `IMAGE_DOMAIN` environment variable is set in the
    `.env.development.local` file.

1.  Ensure that the `IMAGE_DOMAIN` environment only contains the hostname. For example:
    ```.env
      IMAGE_DOMAIN=example.com
    ```
1.  Ensure that you are using the `next/image` component, and that you set the `src` by constructing the `IMAGE_DOMAIN` and the image source. For example:

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
    ````

## Adapting for Use With Existing Drupal Sites

The Front-End Sites starter kits assume that you are using Drupal's core Media module to manage images for article content. You must make the following adjustments to the starter kit if you are using Drupal's default image field.

1. Update grid pages to use the `field_image` field instead of the
   `field_media_image` field.

1. Update the `getServerSideProps` function in `pages/index.jsx` to the parameters used to source your articles:

	```jsx
	const articles = await store.getObject({
		objectName: 'node--article',
		params: 'include=field_image',
		refresh: true,
		res: context.res,
		anon: true,
	});
	```

1. Make the same change in `pages/articles/index.jsx`.

1. Open the `components/grid.jsx` and change the `imgSrc` constant in the `ArticleGridItem` to:

	```jsx
	export const ArticleGridItem = ({
		content: article,
		multiLanguage,
		locale,
	}) => {
		const imgSrc = article?.field_image?.uri?.url || '';
	```

1. Update the article detail pages to use the `field_image` field instead of the `field_media_image` field.

1. Update your aliasing path:

	- _If you are aliasing your articles within the `/articles/*` path:_

		1. Go to the `articleTemplate` function in `pages/articles/[...slug].jsx` and change the `imgSrc` constant to:

			```jsx
			const imgSrc = article.field_image?.uri?.url;
			```

		1. Go to the `getServerSideProps` function in `pages/articles/[...slug].jsx` and change the `params` constant to:

			```jsx
			const params = 'include=field_image';
			```

	- _If you are aliasing your articles using a pattern other than `/articles/*`:_

		1. Go to the `renderPage` function in `pages/[...alias].jsx`, find the `if (pageData?.type === 'node--article')` conditional, and change the following constants to:

			```jsx
			const {
				title,
				body: { processed },
				field_image,
				thumbnail,
			} = pageData;
			const imgSrc = field_image?.uri.url;
			```

		1. Go to the `getServerSideProps` function in `pages/[...alias].jsx` and change the value of the `params` constant to:

			```jsx
			const params =
				resourceName === 'node--recipe'
					? 'include=field_media_image.field_media_image,field_recipe_category'
					: resourceName === 'node--article'
					? 'include=field_image'
					: '';
			```

Images should now display correctly within your articles.
