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

## WordPress Advanced Custom Fields Gatsby Add-on

This add-on uses GraphQL to bring in a custom related content data type that was
created with Advanced Custom Fields, or ACF. After adding the
`gatsby-wp-acf-addon`, our starter kit will have a related content section that
displays at the bottom of post detail pages, if related posts are specified on
the related WordPress post. Examples of querying and using data from ACF will be
added to your project.

### Before You Begin

- Install and activate the
  [Decoupled Kit Advanced Custom Fields Plugin](/docs/backend-starters/decoupled-wordpress/add-ons#decoupled-kit-acf-plugin).

- Familiarize yourself with the
  [Create Pantheon Decoupled Kit CLI](https://www.npmjs.com/package/create-pantheon-decoupled-kit/).
  Any package manager can be used with the CLI **[npm, pnpm, yarn]**.

  :::note

  This guide assumes you have familiarity with WordPress and Advanced Custom
  Fields. Advanced Custom Fields documentation can be found
  [here](https://www.advancedcustomfields.com/resources/).

  :::

### Usage

#### Adding the `gatsby-wp-acf-addon` to an Existing Project

1. Use the create command to initiate the cli with the `gatsby-wp-acf-addon`
   generator
   ```bash
   # set the `outDir` to the root directory of your existing Gatsby WordPress Starter
   npm create pantheon-decoupled-kit gatsby-wp-acf-addon --outDir ./my-app-dir
   ```
1. Follow the terminal prompts, accept the project diff changes
1. Start your project locally and observe the new related content section that
   displays at the bottom of post detail pages

#### Building a New Project with the `gatsby-wp-acf-addon`

1. Use the create command to initiate the cli with both the `gatsby-wp` and
   `gatsby-wp-acf-addon` generators
   ```bash
   npm create pantheon-decoupled-kit gatsby-wp gatsby-wp-acf-addon
   ```
1. Continue through the prompts until all actions finish running
1. Add the necessary environment variables in `.env.development.local` and start
   your project locally. Observe the new related content section that displays
   at the bottom of post detail pages

#### Fetching Data From a Custom Field

Accessing data within your custom fields is a simple process that closely
resembles a standard GraphQL query.

To query a custom field, you will reference your custom field group as an
object, then fill in that object with each individual custom field name.

Below is an example of how to query a `Post` which has a custom field data. In
this case, the custom field group is titled `acfDemoFields`, and has fields
`acfTextField`, `acfFeaturedImage`, and `acfContent`:

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
