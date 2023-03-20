---
title: WordPress + Gatsby Frontend Starter for Front-End Sites
subtitle: Troubleshooting
description: Get solutions to common issues.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-gatsby-frontend-starters/troubleshooting
anchorid: troubleshooting
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides solutions to common issues when developing with the `@pantheon-systems/gatsby-wordpress-starter`. Refer to [Pantheon Front-End Sites Frequently Asked Questions](/guides/decoupled/overview/faq/) for more information on troubleshooting on the Pantheon platform.

## `gatsby-source-wordpress` Fails to Fetch Data from WordPress

There are a few possible reasons for this:

- The `WP GraphQL` plugin in WordPress has not been activated
- The `WP Gatsby` plugin in WordPress has not been activated
	**Solution:** activate the plugin.
- The  `gatsby-source-plugin` fails with the following error:
	```shell
	Error: getaddrinfo ENOTFOUND dev-my-wordpress-site.pantheonsite.io
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:71:26)

	Error occurred while fetching non-Node root fields.
	```
	**Solution:** Check that the WordPress site it active and try the command again. Ensure both the  `WP GraphQL` and `WP Gatsby` plugins are activated.

## WordPress Server Overloaded

The `gatsby-source-wordpress` server complains of an overloaded WordPress server.

**Solution:** Add the following options to the `gatsby-source-wordpress` plugin inside of the `gatsby-config.js` if you are experiencing this issue frequently. Refer to the [plugin options on schema request concurrency](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/docs/plugin-options.md#schemarequestconcurrency) for more information.
```js
{
// ...rest of config,
plugins: [
	resolve: `gatsby-source-wordpress`,
			options: {
				url,
				schema: {
				   perPage: 20, // default 100
				   requestConcurrency: 5, // default 15
				   previewRequestConcurrency: 2, // default 5
				 },
			},

	]
}
```