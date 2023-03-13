---
title: Drupal Frontend Starters for Front-End Sites
subtitle: Style Configuration
description: Learn how to configure your styling.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-frontend-starters/style
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

To have the content from the Drupal site rendered in the Next.js frontend, you
must have to use the typography plugin for Tailwind CSS, more information about
this plugin can be found in the
[Tailwind CSS documentation](https://tailwindcss.com/docs/typography-plugin),
install the plugin with the following command:

```bash
npm install @tailwindcss/typography
```

Or

```bash
yarn add @tailwindcss/typography
```

To use this plugin you must have the `tailwind.config.js` file in the root of
your project and set the plugin:

```js
module.exports = {
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography')],
};
```

## Customizing Tailwind

Tailwind allows you to customize the default configuration to suit your needs.
To do this, you must have the `tailwind.config.js` file in the root of your
project. You can find more information about customizing Tailwind in the
[Tailwind documentation](https://tailwindcss.com/docs/configuration).

In example, if you want to modify the default font family, you can add the
following to your `tailwind.config.js` file:

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

Also the typography plugin allows you to customize the default configuration,
you can find more information about this in the
[Tailwind CSS documentation](https://tailwindcss.com/docs/typography-plugin#customizing-the-css).
