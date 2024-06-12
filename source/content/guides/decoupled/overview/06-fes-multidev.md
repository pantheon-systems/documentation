---
title: Pantheon Front-End Sites
subtitle: Multidev Workflow and Configuration
description: Use Multidev with Front-End Sites.
tags: [webops, workflow, decoupled]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/overview/fes-multidev
anchorid: fes-multidev
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on the Front-End Sites Multidev workflow, configuration steps to connect your Front-End Site to a Multidev environment, and information on Multidev branch builds.

## Front-End Sites Multidev Development Workflow

The Front-End Sites Multidev workflow is outlined below:

- **Code Push:** The external Git provider controls code posts and deployments. Code pushed to the main branch is built and deployed in your Live environment. Code pushed to any other branch generates a new Multidev environment. Updates to existing branches result in the corresponding environment being updated.

- **Pull Request:** The Multidev environment is stood up and the preview and backend URL are displayed in the GitHub PR, the GitHub deployment, and in the Front-End Sites Overview section of the dashboard. The build details for a PR are also linked to GitHub.

## Connect to a Multidev Environment

<TabList>

<Tab title="Drupal + Next.js" id="drupal-next" active={true}>

You can use the `PANTHEON_ENVIRONMENT` variable inside your `next.config.js` file to connect to a Drupal Multidev environment. Refer to the [Drupal + Next.js Frontend Starter for Front-End Sites](/guides/decoupled/drupal-nextjs-frontend-starters) guide for more information about this starter.

1. Open your `next.config.js` file and set either the `PANTHEON_CMS_ENDPOINT` or `BACKEND_URL`.

	`BACKEND_URL` Example:

	Note that `PANTHEON_ENVIRONMENT` includes a PR number or integration branch name in the example below.

	```js
	let backendUrl, imageDomain;
	if (process.env.BACKEND_URL === undefined) {
	backendUrl = `https://${process.env.PANTHEON_CMS_ENDPOINT}`;
	imageDomain = process.env.IMAGE_DOMAIN || process.env.PANTHEON_CMS_ENDPOINT;

	// populate BACKEND_URL as a fallback and for build scripts
	process.env.BACKEND_URL = `https://${process.env.PANTHEON_CMS_ENDPOINT}`;}
	else {
	backendUrl = process.env.BACKEND_URL;
	imageDomain =
	process.env.IMAGE_DOMAIN ||
	process.env.BACKEND_URL.replace(/^https?:\/\//, '');
			}
	```

	- The code below can be added under the above logic to connect to a Multidev that is prefixed with the branch name of `my site`.

	```js
	* PANTHEON_ENVIRONMENT is equal to `multi-demo` since that is the name of my branch. I will use this variable to create a `backendUrl` which points
	* to my Multidev backend.
	**/
	if (process.env.PANTHEON_ENVIRONMENT !== 'live') {
		backendUrl = `https://${
			process.env.PANTHEON_ENVIRONMENT
		}-${backendUrl.replace(/^https?:\/\/[^-]*-/, '')}`;
	}
	```

1. Optional. Mock the `PANTHEON_CMS_ENDPOINT` for local development by defining it in the `.env.development.local`. For example:

	```bash{promptUser: user}
	PANTHEON_CMS_ENDPOINT=dev-my-drupal-site.pantheonsite.io
	```


</Tab>

<Tab title="WordPress + Next.js" id="wp-next">

You can use the `PANTHEON_ENVIRONMENT` variable inside your `next.config.js` file to connect to a WordPress Multidev environment. Refer to the [WordPress + Next.js Frontend Starter for Front-End Sites](/guides/decoupled/wp-nextjs-frontend-starters) guide for more information about this starter.

1. Open your `next.config.js` file and  set either the `PANTHEON_CMS_ENDPOINT` or `BACKEND_URL`.

	`BACKEND_URL` Example:

	Note that `PANTHEON_ENVIRONMENT` includes a PR number or integration branch name in the example below.

	```js
	let backendUrl, imageDomain;
	if (process.env.BACKEND_URL === undefined) {
		backendUrl = `https://${process.env.PANTHEON_CMS_ENDPOINT}`;
		imageDomain = process.env.IMAGE_DOMAIN || process.env.PANTHEON_CMS_ENDPOINT;
		// populate BACKEND_URL as a fallback and for build scripts
		process.env.BACKEND_URL = `https://${process.env.PANTHEON_CMS_ENDPOINT}`;
	} else {
		backendUrl = process.env.BACKEND_URL;
		imageDomain =
			process.env.IMAGE_DOMAIN ||
			process.env.BACKEND_URL.replace(/^https?:\/\//, '');
	}
	```

1. Optional. Mock the `PANTHEON_CMS_ENDPOINT` for local development by defining it in the `.env.development.local`. For example:

	```bash{promptUser: user}
	PANTHEON_CMS_ENDPOINT=dev-my-wordpress-site.pantheonsite.io
	```


</Tab>

<Tab title="WordPress + Gatsby" id="wp-gatsby">

You can use the `PANTHEON_ENVIRONMENT` variable inside the `gatsby-config.js` file to connect to a Multidev environment. Refer to the [WordPress + Gatsby Frontend Starter for Front-End Sites](/guides/decoupled/wp-gatsby-frontend-starters) guide for more information about this starter.

1. Open your `gatsby-config.js` file and set either the `PANTHEON_CMS_ENDPOINT` or `WPGRAPHQL_URL`. Be sure to update the `url` in the example below. Note that `PANTHEON_ENVIRONMENT` includes a PR number or integration branch name in the example below.

	```js
	let url = process.env.WPGRAPHQL_URL || process.env.PANTHEON_CMS_ENDPOINT;
	```

1. Optional. Mock the `PANTHEON_CMS_ENDPOINT` for local development by defining it in the `.env.development.local`. For example:

	```bash{promptUser: user}
	PANTHEON_CMS_ENDPOINT=dev-my-wordpress-site.pantheonsite.io
	```


</Tab>

</TabList>


## Multidev Branch Builds

You can build specific branches by naming the branch to begin with the prefix `multi-`.

Follow the steps below to observe the build and deployment process for a Multidev branch in real time. Note that the steps below assume that you have already cloned your Front-End Site repository from GitHub to your local.

1. Check out the `main` branch of your repository.

    ```bash{promptUser: user}
    git checkout main
    ```

1. Create a new branch using the `multi-` prefix, for example:

    ```bash{promptUser: user}
    git checkout -b multi-example-update
    ```

1. Make a change to a file in your repository.

1. Add and commit the change to the `main` branch.

    ```bash{promptUser: user}
    git add .
    git commit -m <message>
    ```

1. Push the branch:

    ```bash{promptUser: user}
     git push origin your-branch-name
    ```

1. Open your Site Dashboard, navigate to the **Overview** page and scroll down to the **Multidev Branches** section. You should see your Multidev branch begin to build after approximately a minute.

1. Use the **Actions** drop-down menu to visit the Multidev version of the site, view the logs, or get more information about the build.

Any commits pushed on this branch will now be built and deployed to the Multidev. This allows you and your team to review the branch as work progresses. Pull requests opened against this branch will also trigger a build.

## Delete a Multidev Environment
1. Open your Site Dashboard, navigate to the **Overview** page and scroll down to the **Multidev Branches** section.
1. Use the **Actions** drop-down menu to delete the given Multidev.
1. Type the Multidev name into the text field to complete the confirmation prompt and delete the environment.

## More Resources

- [Front-End Sites Types of Environments](/guides/decoupled/overview/considerations#types-of-environments)
- [Multidev Guide](/guides/multidev)
- [Drupal + Next.js Frontend Starter for Front-End Sites](/guides/decoupled/drupal-nextjs-frontend-starters)
- [WordPress + Next.js Frontend Starter for Front-End Sites](/guides/decoupled/wp-nextjs-frontend-starters)
- [WordPress + Gatsby Frontend Starter for Front-End Sites](/guides/decoupled/wp-gatsby-frontend-starters)
