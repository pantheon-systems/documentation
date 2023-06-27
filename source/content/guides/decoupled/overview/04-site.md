---
title: Pantheon Front-End Sites
subtitle: Create a Front-End Site
description: Create and configure a Front-End Site.
tags: [webops, workflow, decoupled]
contributors: [joan-ing, backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/overview/site
anchorid: site
reviewed: "2023-03-23"
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information to help you create your Front-End Site.

## Before You Begin

Confirm the following prerequisites before you create your site:

- The **Front-End-Sites** tab is enabled in your dashboard after onboarding.

- Your site repository is in GitHub.

- [Composer](https://getcomposer.org/download/) is installed globally.

    - Composer is required for the CMS backends.

- You have a domain to use for the Front-End Site.

- You will use Next.js or Gatsby as the frontend framework.

    <Alert title="Note"  type="info" >

    You can use any JavaScript-based runtime, or any static site generator that outputs HTML/CSS/JS, but Pantheon only fully supports Next.js and Gatsby.

    </Alert>

- (Optional). You are using the latest version of Drupal, or WordPress for the CMS.

- (Optional). If using a pre-configured starter kit template, you will use one of the following combinations:

    - [Drupal and Next.js](/guides/decoupled/drupal-nextjs-frontend-starters/)

    - [WordPress and Next.js](/guides/decoupled/wp-nextjs-frontend-starters/)

    - [WordPress and Gatsby](/guides/decoupled/wp-gatsby-frontend-starters/)

    <Alert title="Note"  type="info" >

    Other configurations are possible but not fully supported.

    </Alert>


### Optional Components

1. Install [Terminus](/terminus/install) version 3.0.0 or higher.
    - You can also install the following plugins to improve your experience:
       - `terminus self:plugin:install terminus-build-tools-plugin`
       - `terminus self:plugin:install terminus-secrets-plugin`
       - Reload the terminus plugins: `terminus self:plugin:reload`
       - Clear cache for composer: `composer clear-cache`
       - Validate that the required plugins are installed: `terminus self:plugin:list`

1. Create a Machine Token.
    - [Generate a machine token](/machine-tokens#create-a-machine-token).
    - [Authenticate the token into Terminus](/machine-tokens#authenticate-into-terminus).

1. Create [GitHub Personal Access Tokens](https://github.com/settings/tokens).

1. Create [CircleCI Personal API Tokens](https://app.circleci.com/settings/user/tokens).


## Create a Front-End Site

You must decide how you want to create your Front-End Site before you can begin your journey with decoupled site architecture. There are several methods you can use. Select the method below that meets your configuration requirements and follow the instructions carefully.

<Partial file="decoupled-site-creation-options.md" />