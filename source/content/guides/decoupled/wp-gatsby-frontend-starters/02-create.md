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
`gatsby-wordpress-starter`:`

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