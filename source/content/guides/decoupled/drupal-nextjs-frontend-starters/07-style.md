---
title: Drupal + Next.js Frontend Starter for Front-End Sites
subtitle: Style Configuration
description: Learn how to configure your styling.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-nextjs-frontend-starters/style
anchorid: style
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to style your configuration with Tailwind CSS. Refer to [Tailwind CSS documentation](https://tailwindcss.com/docs) before proceeding.

## Tailwind CSS Typography Plugin

You must use the typography plugin for Tailwind CSS to have content from the Drupal site rendered in the Next.js frontend. Review Tailwind typography plugin information in the [Tailwind CSS documentation](https://tailwindcss.com/docs/typography-plugin).

### Install the Plugin

1. Run the following command:

	```bash{promptUser: user}
	npm install @tailwindcss/typography
	```

	Or

	```bash{promptUser: user}
	yarn add @tailwindcss/typography
	```

1. Confirm that the `tailwind.config.js` file is in the root of your project and set the plugin:

	```js
	module.exports = {
		theme: {
			extend: {},
		},
		plugins: [require('@tailwindcss/typography')],
	};
	```

## Customize Tailwind

Tailwind allows you to customize the default configuration.

The example below modifies the default font family in the `tailwind.config.js` file:

```js
module.exports = {
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
		},
	},
};
```

You can also customize the default configuration. Refer to [Tailwind CSS documentation](https://tailwindcss.comdocstypography-plugin#customizing-the-css) for more information.
