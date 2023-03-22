---
title: Pantheon Front-End Sites
subtitle: Site Creation
description: Create and configure a Front-End Site.
tags: [webops, workflow, decoupled]
contributors: [joa-pan, backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/overview/site
anchorid: site
reviewed: "2023-03-16"
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides configuration information for Front-End Sites.

## Prerequisites

* The **Decoupled** tab is enabled in your dashboard after onboarding.

* Your site repository is in GitHub.

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

### Compatibility

You can create an application from scratch by importing a repository or you can use the Pantheon starter kit templates to develop a Front-End Site.

You can also create a site without a CMS. This is done by utilizing the import repository feature during site creation.

Supported Versions:

|  Tooling   |      Version    |
|  :---:     |       :---:     |
|  Gatsby    |    4 or higher  |
| Next.js    |   12 or higher  |
|  Drupal    |   9 or higher   |
| WordPress  |   5.9 or higher |

## Before You Use Pantheon Starter Kits

The following components are required to create and configure a new decoupled project using a Front-End Site starter kit:

1. Install [Composer](https://getcomposer.org/download/) globally.
    * Composer is required for the CMS backends.

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

Select the backend or frontend guide below that meets your configuration requirements and follow the instructions carefully.

### Backend Starters

- [Drupal Backend Starter](/guides/decoupled/drupal-backend-starters)
- [WordPress Backend Starter](/guides/decoupled/wp-backend-starters)

### Frontend Starters

- [Drupal + Next.js Frontend Starter](/guides/decoupled/drupal-nextjs-frontend-starters)
- [WordPress + Next.js Frontend Starter](/guides/decoupled/wp-nextjs-frontend-starters)
- [WordPress + Gatsby Frontend Starter](/guides/decoupled/wp-gatsby-frontend-starters)

### No Starter

- [Create a Front-End Site without a Starter](/guides/decoupled/no-starter-kit)

## Stable URLs

You can establish FQDN domains in decoupled environments using stable URLs.

An environment relates to every code change made against the Git repository that triggers a build. This build generates an internet-ready site.

Code change events that trigger a build include:

* Push to branches
* Opened pull requests

<Alert title="Note" type="info">

Pull requests from a Multidev branch that are made against the upstream, will trigger double builds.
</Alert>

### Types of Environments

* **Production environment**
    * The production environment is the default branch of the repository
    * This environment corresponds to the following stable URL pattern: `live-[site-name].appa.pantheon.site`

* **Multidev environment (based on integration branches)**
    * Multidev environments are based on branches belonging to the upstream repository. This branch will have the prefix `multi-` in the branch name.
    * This environment has the following stable URL pattern: `[branch-name]-[site-name].appa.pantheon.site`

* **Multidev environment (based on pull requests)**
    * This Multidev environment is built from all the opened pull requests against the upstream repository.
    * This environment has the following stable URL pattern: `pr-[pr-number]-[site-name].appa.pantheon.site`


### Stable URLs template

| Environment                       | Name            |  FQDN      |
| -----------                       | -----------     | ---------- |
| Production                        | `live `         | `live-[site-name].appa.pantheon.site`|
| Multidev (based on branches)      | `branch-name`   | `[branch-name]-[site-name].appa.pantheon.site`|
| Multidev (based on pull requests) | `pr-*`          | `pr-[pr-number]-[site-name].appa.pantheon.site`|
