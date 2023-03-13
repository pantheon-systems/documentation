---
title: WordPress + Next.js Frontend Starter for Front-End Sites
subtitle: Introduction
description: Learn about WordPress + Next.js frontend starter for Front-End Sites.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-nextjs-frontend-starters
anchorid: wp-nextjs-frontend-starters
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

Front-End Sites on Pantheon allows you to use [decoupled architecture](/guides/decoupled-sites/#what-is-a-decoupled-site) to separate your frontend and backend into distinct entities.

You can use a frontend starter kit to streamline the creation of your Front-End site on Pantheon. Available WordPress frontend starters are:

- Next.js + WordPress
- Gatsby + WordPress

## Why Use The Next.js WordPress Starter?

The `next-wordpress-starter` is designed as a starting point to for a Next.js site that consumes data from a WordPress backend - specifically a WordPress backend configured with the `pantheon-decoupled` and `wp-graphql` plugins installed.

The starter has a dependency on the `@pantheon-systems/wordpress-kit`, which includes some helpers that maximize any available features of the WordPress backend.

## Important Information

This guide assumes you are testing a Next.js site locally which is to be hosted at a subpath of the root, for example `/docs`, by using the [Next.js `basePath` feature](https://nextjs.org/docs/api-reference/next.config.js/basepath).

### Set The Path Prefix
See the Next.js guide on [Adding a Base Path](https://nextjs.org/docs/api-reference/next.config.js/basepath) for information on setting the `basePrefix` if you are not using the starter kit.

If you are using the `@pantheon-systems/next-drupal-starter` or the `@pantheon-systems/next-wordpress-starter`, the environment variable `process.env.PANTHEON_UPLOAD_PATH` will be automatically set as the `basePath` in the `next.config.js`. To test this locally, set the `PANTHEON_UPLOAD_PATH` in your `.env.development.local` to the path you would like to test.


### Verify Links And Assets
If you are adding the `basePath` to an app that did not previously use it, you may need to refactor some in app links and paths to static assets. [Links using the `next/link` component will automatically use the `basePath`](https://nextjs.org/docs/api-reference/next.config.js/basepath#links). You will need to update the `src` if using the `next/image` component for static assets. See the [Next.js docs on images and `basePath`](https://nextjs.org/docs/api-reference/next.config.js/basepath#images) for more information.

## More Resources

- [Front-End Sites Overview](/guides/decoupled/overview)