---
title: WordPress + Gatsby Frontend Starter for Front-End Sites
subtitle: Robots.txt File and Indexing
description: Manage site indexing with a robots.txt file.
tags: [webops, workflow, decoupled]
contributors: [whitneymeredith]
layout: guide
showtoc:
permalink: docs/guides/decoupled/wp-gatsby-frontend-starters/robots-indexing
anchorid: robots-indexing
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to use a `robots.txt` file to manage indexing for Front-End Sites.

## Robots.txt File

A `robots.txt` file instructs search engine crawlers on which URLs and files can be accessed on your domain. This allows you to prevent crawling and indexing to specified areas of your website.

## Install and Configure the Gatsby robots.txt Plugin

You can install the `gatsby-plugin-robots-txt` plugin to if you are using the Gatsby WordPress framework. The steps below are intended as a guide to help you get started. Refer to the [Gatsby robots-txt-plugin documentation](https://www.gatsbyjs.com/plugins/gatsby-plugin-robots-txt/) for more information.

1. Install `gatsby-plugin-robots-txt` with yarn or npm:

    **yarn:**

    ```bash{promptUser: user}
    yarn add gatsby-plugin-robots-txt
    ```

    **npm:**

    ```bash{promptUser: user}
    npm install --save gatsby-plugin-robots-txt
    ```

1. Open your `gatsby-config.js` file and add the URLs you want to block or allow crawler access to.

    ```js
    //gatsby-config.js

    module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.example.com'
  },
  plugins: ['gatsby-plugin-robots-txt']
    };
    ```

    **Example configuration:**

     ```js

        //gatsby-config.js
        module.exports = {
    plugins: [
        {
        resolve: 'gatsby-plugin-robots-txt',
        options: {
            host: 'https://www.mygatsbysite.com',
            sitemap: 'https://www.mygatsbysite.com/sitemap.xml',
            policy: [{userAgent: '*', allow: '/'}]
        }
        }
    ]
    };
    ```

## More Resources

- [Bots and Indexing on Pantheon](/bots-and-indexing)