---
title: WordPress + Gatsby Frontend Starter for Front-End Sites
subtitle: Create a New Project
description: Learn how to use the WordPress + Gatsby frontend starter to create a new project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-gatsby-frontend-starters/create
anchorid: create
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to use the Gatsby + WordPress starter kit.

## Before You Begin

- The Pantheon `gatsby-wordpress-starter` uses Gatsby v4 and has been tested using [nodejs v16 with npm v8](https://nodejs.org/en/download/).

- You may want to install the gatsby cli globally, or [use `npx`](https://www.npmjs.com/package/npx)

## Create a New Project with the Template

There are two methods to creating a new project based on the
`gatsby-wordpress-starter`:

- Clone the starter repo directly
- Use the `gatsby-cli`

### Clone the GitHub Repo

1. Go to the [GitHub repo](https://github.com/pantheon-systems/gatsby-wordpress-starter).

1. Click the **Code** button to open the clone drop-down menu and select your preferred cloning method.

### Use the `gatsby-wordpress-starter`

1. Open your terminal and run the [`gatsby new` command](https://www.gatsbyjs.com/docs/reference/gatsby-cli/#creating-a-site-from-a-starter).

    ```shell
    # if gatsby-cli is installed locally...
    gatsby new my-gatsby-wordpress-starter https://github.com/pantheon-systems/gatsby-wordpress-starter
    # or use npx
    npx gatsby new my-gatsby-wordpress-starter https://github.com/pantheon-systems/gatsby-wordpress-starter
    ```

1. Optional. Set the `gatsby-cli` options before initiating your new project if you have a package manager preference between npm and yarn.

    ```shell
    # set your preferred package manager with the following command
    # for npm
    gatsby options set pm npm
    # for yarn
    gatsby options set pm yarn
    ```

<Partial file="decoupled-create-in-dashboard.md" />

## Create Your Project on Pantheon

Make sure you meet the prerequisites below before you continue.

* You are using a Git repository and you have connected your GitHub account.

* You are using WordPress as your CMS.

* You have installed your WordPress site using the [Decoupled WordPress Recommended Project](https://github.com/pantheon-upstreams/decoupled-wordpress-composer-managed) configuration, which has the `wp-graphql` plugin enabled.

1. Click the **Gatsby + WordPress** template, select your Git provider under **Choose your Git provider**, and then click **Continue**.

1. Select your desired GitHub account and enter the repository name. You can select **Make this a private repository** to provide greater security for your Git repository.

1. Select the WordPress CMS backend from the drop-down menu.

1. Select the site environment from which to source the content. You can source content from the Live, Test, or Dev environment.

1. Click **Continue**. You are directed to a new page with the site name, deployment, and build information and status.

1. Click **Build Details** to view the build log.

1. Refer to the [Set Environment Variables](/guides/decoupled/wp-gatsby-frontend-starters/environment-variables) section to set environment variables for local development and Decoupled Preview, as well as steps to connect to Multidev environments.