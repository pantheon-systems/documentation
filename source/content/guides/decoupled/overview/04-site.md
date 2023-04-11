---
title: Pantheon Front-End Sites
subtitle: Create a Front-End Site
description: Create and configure a Front-End Site.
tags: [webops, workflow, decoupled]
contributors: [joa-pan, backlineint, cobypear, hckia]
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

* The **Front-End-Sites** tab is enabled in your dashboard after onboarding.

* Your site repository is in GitHub.

* [Composer](https://getcomposer.org/download/) is installed globally.

    * Composer is required for the CMS backends.

* You have a domain to use for the Front-End site.

* You will use Next.js or Gatsby as the frontend framework.

    <Alert title="Note"  type="info" >

    You can use any JavaScript-based runtime, or any static site generator that outputs HTML/CSS/JS, but Pantheon only fully supports Next.js and Gatsby.

    </Alert>

* (Optional). You are using the latest version of Drupal, or WordPress for the CMS.

* (Optional). If using a pre-configured starter kit template, you will use one of the following combinations:

    * [Drupal and Next.js](/guides/decoupled/drupal-nextjs-frontend-starters/)

    * [WordPress and Next.js](/guides/decoupled/wp-nextjs-frontend-starters/)

    * [WordPress and Gatsby](/guides/decoupled/wp-gatsby-frontend-starters/)

    <Alert title="Note"  type="info" >

    Other configurations are possible but not fully supported.

    </Alert>


### Optional Components

1. Install [Terminus](/terminus/install) version 3.0.0 or higher.
    * You can also install the following plugins to improve your experience:
       * `terminus self:plugin:install terminus-build-tools-plugin`
       * `terminus self:plugin:install terminus-secrets-plugin`
       * Reload the terminus plugins: `terminus self:plugin:reload`
       * Clear cache for composer: `composer clear-cache`
       * Validate that the required plugins are installed: `terminus self:plugin:list`

1. Create a Machine Token
    * [Generate a machine token](/machine-tokens#create-a-machine-token).
    * [Authenticate the token into Terminus](/machine-tokens#authenticate-into-terminus).

1. Create [GitHub Personal Access Tokens](https://github.com/settings/tokens).

1. Create [CircleCI Personal API Tokens](https://app.circleci.com/settings/user/tokens).


## Create a Front-End Site

You must decide how you'd like to create your Front-End Site before you can begin your journey with decoupled site architecture.

There are several methods you can use.:

Select the backend or frontend guide below that meets your configuration requirements and follow the instructions carefully.


|  Site Creation Option                                   | Description                                                                                                                                                                                            | CMS Required      | Starter Kit |
|---------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-------------|
| [**Import Repository**](/guides/decoupled/no-starter-kit/import-repo)                                       | Connect your Git provider and select an existing repository. The CMS is  optional for this configuration. Limited support is provided for this  configuration.                                         | Optional | ❌           |
| [**Create Your Site without a Starter Kit and/or CMS**](/guides/decoupled/no-starter-kit/create)       | You are not required to have a CMS when using this method. This option is does not use a pre-configured starter kit, and must be configured manually.                                                  | Optional | ❌          |
| [**Create Your Site with a Non-official Frontend Framework**](/guides/decoupled/no-starter-kit/any-framework) | Pantheon Decoupled Early Access (EA) program currently supports Gatsby and Next.js as frontend frameworks. The process for non-officially supported frontend frameworks requires manual configuration. | Optional | ❌          |
| [**WordPress and Gatsby Frontend**](/guides/decoupled/wp-gatsby-frontend-starters)                           | Create a decoupled site using a base Gatsby.js frontend template with WordPress as the CMS.                                                                                                            | <span style="color:green">✔</span>       | <span style="color:green">✔</span>         |
| [**Drupal and Next.js Frontend**](guides/decoupled/drupal-nextjs-frontend-starters)                            | Create a decoupled site using a base Next.js frontend template with Drupal as the CMS.                                                                                                                 | <span style="color:green">✔</span>       | <span style="color:green">✔</span>          |
|[**WordPress and Next.js Frontend**](/guides/decoupled/wp-nextjs-frontend-starters)                         | Create a decoupled site using a base Next.js frontend template with WordPress as the CMS.                                                                                                              | <span style="color:green">✔</span>       | <span style="color:green">✔</span>          |
| [**Drupal Backend**](/guides/decoupled/drupal-backend-starters/create)                                         | Use the Drupal backend starter kit to streamline the creation of your Front-End Site on Pantheon. This option is pre-configured.                                                                                                                                                                                                    | <span style="color:green">✔</span>       | <span style="color:green">✔</span>          |
| [**WordPress Backend**](/guides/decoupled/wp-backend-starters/create)                                       | Use the WordPress backend starter kit to streamline the creation of your Front-End Site on Pantheon. This option is pre-configured.                                                                                                                                                                                                                                                     | <span style="color:green">✔</span>       | <span style="color:green">✔</span>         |


## Stable URLs

You can establish FQDN domains in Front-End Site environments using stable URLs.

An environment relates to every code change made against the Git repository that triggers a build. This build generates an internet-ready site.

Code change events that trigger a build include:

* Push to branches
* Opened pull requests

<Alert title="Note" type="info">

Pull requests from a Multidev branch that are made against the upstream will trigger double builds.

</Alert>

### Types of Environments

Refer to [Front-End Sites Multidev Development Workflow](/guides/decoupled/overview/considerations#front-end-sites-multidev-development-workflow) for more information

* **Production environment**
    * The production environment is the default branch of the repository
    * This environment corresponds to the following stable URL pattern: `live-[site-name].appa.pantheon.site`

* **Multidev environment (based on integration branches)**
    * Multidev environments are based on branches belonging to the upstream repository. This branch will have the prefix `multi-` in the branch name.
    * This environment has the following stable URL pattern: `[branch-name]-[site-name].appa.pantheon.site`

* **Multidev environment (based on pull requests)**
    * This Multidev environment is built from all the opened pull requests against the upstream repository.
    * This environment has the following stable URL pattern: `pr-[pr-number]-[site-name].appa.pantheon.site`


### Stable URLs Template

| Environment                       | Name            |  FQDN      |
| -----------                       | -----------     | ---------- |
| Production                        | `live `         | `live-[site-name].appa.pantheon.site`|
| Multidev (based on branches)      | `branch-name`   | `[branch-name]-[site-name].appa.pantheon.site`|
| Multidev (based on pull requests) | `pr-*`          | `pr-[pr-number]-[site-name].appa.pantheon.site`|
