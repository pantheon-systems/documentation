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

* (Optional) You are using the latest version of Drupal, or WordPress for the CMS.

* (Optional) If using a pre-configured starter kit template, you will use one of the following combinations:

    * [Drupal and Next.js](/guides/decoupled/drupal-nextjs-frontend-starters/)

    * [WordPress and Next.js](/guides/decoupled/wp-nextjs-frontend-starters/)

    * [WordPress and Gatsby](/guides/decoupled/wp-gatsby-frontend-starters/)

    > **NOTE**: Other configurations are not currently supported.


### Compatibility

You can create an application from scratch by importing a repository or you can use the Pantheon starter kit templates to develop a Front-End Site.

You can also create a site without a CMS. This is done by importing the repository and using Next.js or Gatsby as the static site generator.

Supported Versions:

|  Tooling   |      Version    |
|  :---:     |       :---:     |
|  Gatsby    |    4 or higher  |
| Next.js    |   12 or higher  |
|  Drupal    |   9 or higher   |
| WordPress  |   5.9 or higher |

## Create a Front-End Site

Select the guide below that meets your set up needs and follow the instructions carefully.

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

An environment relates to every code change made against the Git repository that triggers a build, in which that build generates an internet-ready site.

Code change events that trigger a build include:

* Push to branches
* Opened pull requests

<Alert title="Note" type="info">

NOTE: Pull requests from a Multidev branch that are made against the upstream, will trigger double builds.
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
