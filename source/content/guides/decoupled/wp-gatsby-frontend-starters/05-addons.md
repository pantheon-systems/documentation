---
title: WordPress + Gatsby Frontend Starter for Front-End Sites
subtitle: Add-ons
description: Learn about available WordPress + Gatsby starter add-ons.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-gatsby-frontend-starters/addons
anchorid: addons
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on available WordPress + Gatsby starter add-ons.

## WordPress Advanced Custom Fields Gatsby Add-on

This add-on uses GraphQL to bring in a custom related content data type created with Advanced Custom Fields (ACF).

Your Front-End starter will have a related content section that displays at the bottom of post detail pages if related posts are specified on the related WordPress post after you install the add-on. Examples of querying and using data from ACF will be added to your project.

## Before You Begin

- Install and activate the [Decoupled Kit Advanced Custom Fields Plugin](/docs/backend-starters/decoupled-wordpress/add-ons#decoupled-kit-acf-plugin).

- Familiarize yourself with the [Create Pantheon Decoupled Kit CLI](https://www.npmjs.com/package/create-pantheon-decoupled-kit/).

- Any package manager can be used with the CLI **[npm, pnpm, yarn]**.

<Alert title="Note"  type="info" >

This document assumes you have familiarity with WordPress and Advanced Custom Fields. Advanced Custom Fields documentation can be found
[here](https://www.advancedcustomfields.com/resources/).

</Alert>


## Add the `gatsby-wp-acf-addon` to an Existing Project

1. Use the create command to initiate the CLI with the `gatsby-wp-acf-addon`
   generator:

   ```bash{promptUser: user}
   # set the `outDir` to the root directory of your existing Gatsby WordPress Starter
   npm create pantheon-decoupled-kit gatsby-wp-acf-addon --outDir ./my-app-dir
   ```
1. Follow the terminal prompts and accept the project diff changes.

1. Start your project locally and observe the new related content section that displays at the bottom of post detail pages.

## Build a New Project with the `gatsby-wp-acf-addon`

1. Use the create command to initiate the CLI with both the `gatsby-wp` and
`gatsby-wp-acf-addon` generators:

   ```bash{promptUser: user}
   npm create pantheon-decoupled-kit gatsby-wp gatsby-wp-acf-addon
   ```
1. Continue through the prompts until all actions finish running.

1. Add the necessary environment variables in `.env.development.local` and start your project locally.

1. Observe the new related content section that displays at the bottom of post detail pages.

## Fetch Data From a Custom Field

Accessing data within your custom fields is a simple process that closely
resembles a standard GraphQL query.

1. Reference your custom field group as an object.

1. Fill in the object with each individual custom field name.

The example below shows how to query a `Post` that has custom field data. The custom field group is titled `acfDemoFields`, and has fields `acfTextField`, `acfFeaturedImage`, and `acfContent`:

```jsx
export const pageQuery = graphql`
	query PostById($id: String!) {
		# selecting the current post by id
		post: wpPost(id: { eq: $id }) {
			id
			acfDemoFields {
				acfTextField
				acfFeaturedImage {
					altText
					sourceUrl
				}
				acfContent
			}
		}
	}
`;
```
