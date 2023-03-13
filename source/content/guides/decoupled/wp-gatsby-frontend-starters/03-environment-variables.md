---
title: WordPress + Gatsby Frontend Starter for Front-End Sites
subtitle: Set Environment Variables
description: Learn how to set your environment variables.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-gatsby-frontend-starters/environment-variables
anchorid: environment-variables
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

## Local Development

In order to fetch data from the WordPress instance, Gatsby needs to know the
endpoint at build time. For local development, the starter kit uses
[dotenv](https://www.npmjs.com/package/dotenv).

After creating a new project with the gatsby-wordpress-starter, create a
`.env.development.local` file at the root of the project directory. In this
file, add a WPGRAPHQL_URL key with your WordPress GraphQL Endpoint as the value.

For example:

```
WPGRAPHQL_URL=https://dev-my-wordpress-site.pantheon.site/wp/graphql
```

## Connecting to Multidev Environments

To connect to a Multidev environment, the `PANTHEON_ENVIRONMENT` environment
variable can be used inside of `gatsby-config.js`.

Either the `PANTHEON_CMS_ENDPOINT` or `WPGRAPHQL_URL` will need to be set.

The `PANTHEON_CMS_ENDPOINT` can be mocked for local development by defining it
in the `.env.development.local`.

```
PANTHEON_CMS_ENDPOINT=dev-my-wordpress-site.pantheonsite.io
```

Taking a look at how the `gatsby-config.js` works, there is this logic which
sets the `url`.

```js
let url = process.env.WPGRAPHQL_URL || process.env.PANTHEON_CMS_ENDPOINT;
```

In order to connect to a Multidev backend, this url will need to be updated.
`PANTHEON_ENVIRONMENT` includes a PR number or integration branch name.

This code could be added under the above logic to connect to a Multidev that is
prefixed with the branch name of my site.

```js
/**
 * PANTHEON_ENVIRONMENT is equal to `multi-demo` since that is the name of my branch.
 **/
if (process.env.PANTHEON_ENVIRONMENT !== 'live') {
	url = `https://${process.env.PANTHEON_ENVIRONMENT}-${url.replace(
		/^https?:\/\/[^-]*-/,
		'',
	)}`;
}
```

## Set the Path Prefix For Testing Locally

### Before You Begin

This section assumes you are testing a Gatsby + WordPress site locally which is to be hosted at a subpath of the root, for example `/docs`, by using [Gatsby's `pathPrefix` feature](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/).

## Set The Path Prefix
See Gatsby's guide on [Adding a Path Prefix](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/) for information on setting the `pathPrefix` if you are not using the starter kit.

If you are using the `@pantheon-systems/gatsby-wordpress-starter`, the environment variable `process.env.PANTHEON_UPLOAD_PATH` will be automatically set as the `pathPrefix` in the `gatsby-config.js`. To test this locally, set the `PANTHEON_UPLOAD_PATH` in your `.env.development.local` to the path you would like to test.

### Update The Build Command
In order to serve your site at the given path, the build and serve commands will need an extra flag, `--prefix-paths`. For example, here is the `package.json` scripts after updating the commands with the flag:

```json
	"scripts": {
		"build": "gatsby build --prefix-paths",
		"serve": "gatsby serve --prefix-paths"
    }
```

You may also set the `PREFIX_PATHS`  environment variable before your build, for example:

```shell
PREFIX_PATHS=true gatsby build
```

### Verify Links And Assets
If you are adding the pathPrefix to an app that did not previously use it, you may need to refactor some in app links. Verify all assets and links are still working. See [Gatsby's guide on in-app linking](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/#in-app-linking) for more information. The starter kit should work with or without a pathPrefix out of the box.