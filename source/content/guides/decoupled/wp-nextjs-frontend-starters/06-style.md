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

## Before You Begin

This guide assumes the reader has a little to no experience with Tailwind CSS.
If you are new to Tailwind CSS, we recommend reading the
[Tailwind CSS documentation](https://tailwindcss.com/docs) before proceeding.

To use this plugin you also must have the `wordpress-kit` installed. To install,
run the following command:

```bash
npm install @pantheon-systems/wordpress-kit
```

Or

```bash
yarn add @pantheon-systems/wordpress-kit
```

## Block Editor

The block editor plugin for Tailwind enables to render the content from your
WordPress site to the Next.js frontend, with parallel styling and some
opinionated changes.

To configure the plugin, add the following to the `tailwind.config.js` file:

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

For more information about plugins, check the
[Tailwind CSS documentation](https://tailwindcss.com/docs/plugins).

## Customizing Tailwind

Tailwind allows you to customize the default configuration to suit your needs.
To do this, you must have the `tailwind.config.js` file in the root of your
project. You can find more information about customizing Tailwind in the
[Tailwind documentation](https://tailwindcss.com/docs/configuration).

To costumize the default configuration for the block editor, you only need to
override the tokens that you want to change. For example, if you want to change
the primary color, you can add the following to your `tailwind.config.js` file:

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

And then every block that uses the primary color will be rendered with the new
color. You can get more information and autocomplete for the block editor tokens
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