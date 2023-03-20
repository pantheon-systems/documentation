---
title: WordPress + Gatsby Frontend Starter for Front-End Sites
subtitle: Test Locally
description: Learn how to set a path prefix to test locally.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-gatsby-frontend-starters/test-locally
anchorid: test-locally
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to set your path prefix to help test your site locally.

### Before You Begin

- This section assumes you are performing local testing on a Gatsby + WordPress site that is hosted at a subpath of the root, for example: `/docs`, by using [Gatsby's `pathPrefix` feature](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/).

## Set The Path Prefix

The `@pantheon-systems/gatsby-wordpress-starter` automatically sets the environment variable `process.env.PANTHEON_UPLOAD_PATH` as the `pathPrefix` in the `gatsby-config.js` file.

Set the `PANTHEON_UPLOAD_PATH` in your `.env.development.local` file to the path you want to test locally.

Refer to Gatsby's guide on [Adding a Path Prefix](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/) for information on setting the `pathPrefix` if you are not using the starter kit.

### Update The Build Command

The build and serve commands require an extra `--prefix-paths` flag to serve your site at the given path. The example below shows the `package.json` scripts after updating the commands with the flag:

```json
	"scripts": {
		"build": "gatsby build --prefix-paths",
		"serve": "gatsby serve --prefix-paths"
    }
```

You can also set the `PREFIX_PATHS` environment variable before your build, for example:

```shell
PREFIX_PATHS=true gatsby build
```

### Verify Links And Assets

You may need to refactor app links if you are adding the `pathPrefix` to an app that did not previously use it. The starter kit should work with or without a `pathPrefix` out of the box.

Verify all assets and links are still working after you add the `pathPrefix` and refactor the app links. Refer to [Gatsby's guide on in-app linking](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/#in-app-linking) for more information.