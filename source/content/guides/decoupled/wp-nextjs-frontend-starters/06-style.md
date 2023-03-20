---
title: WordPress + Next.js Frontend Starter for Front-End Sites
subtitle: Style Configuration
description: Learn how to style your configuration.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-nextjs-frontend-starters/style
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

You must use the typography plugin for Tailwind CSS to have content from the WordPress site rendered in the Next.js frontend. Review Tailwind typography plugin information in the [Tailwind CSS documentation](https://tailwindcss.com/docs/typography-plugin).

## Install the Plugin

You must have the `wordpress-kit` installed to use this plugin.

Run the command below to install the plugin:

	```bash{promptUser: user}
	npm install @pantheon-systems/wordpress-kit
	```

Or

	```bash{promptUser: user}
	yarn add @pantheon-systems/wordpress-kit
	```

## Block Editor

The block editor plugin for Tailwind allows you to render the content from your WordPress site to the Next.js frontend, with parallel styling and some
opinionated changes.

Add the following to the `tailwind.config.js` file to configure the plugin:

```js
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [tailwindcssPlugin],
};
```

## Customize Tailwind

Tailwind allows you to customize the default configuration to suit your needs. You must have the `tailwind.config.js` file in the root of your
project. You can find more information about customizing Tailwind in the
[Tailwind documentation](https://tailwindcss.com/docs/configuration).

The example below customizes the default configuration for the block editor primary color by overriding the tokens in the `tailwind.config.js` file:

```js
module.exports = {
	theme: {
		extend: {
			colors: {
				primary: '#ff0000',
			},
		},
	},
};
```

You can get more information and autocomplete for the block editor tokens
if you add the type definitions to the `tailwind.config.js` file:

```js
const { tailwindcssPlugin } = require('@pantheon-systems/wordpress-kit');

/** @type {import('@pantheon-systems/wordpress-kit').TailwindcssConfig} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography'), tailwindcssPlugin],
};
```