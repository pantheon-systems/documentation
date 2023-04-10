---
title: Pantheon Front-End Sites
subtitle: Site Options and Starter Kits
description: Learn about site options and available starter kits.
tags: [webops, workflow, decoupled]
contributors: [joa-pan, backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/overview/site-options
reviewed: "2023-03-23"
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on site options and starter kits to help you find a starting point to create your Front-End Site. You can build Front-End Sites on Pantheon using several methods. The Front-End Site option must be enabled before you can apply your own configuration or to use a [compatible starter kit](https://decoupledkit.pantheon.io/docs/decoupled-kit-overview).

<Alert title="Not what you're looking for?" type="success" icon="leaf">

Check out the [Front-End Sites landing page](/guides/decoupled/) to access all documentation for Front-End Sites.

</Alert>

## Site Options

You can create an application from scratch by importing a repository or you can use the Pantheon starter kit templates to develop a Front-End Site. You can also create a site without a CMS by using the import repository feature during site creation.

Pantheon Front-End Sites can be created from server-side rendering (SSR) or a static site generator (SSG). The following options are available for Pantheon Front-End Site Early Access offering:

| Site Option           | Description                                                                                                                                                    |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [**Import Repository**](/guides/decoupled/no-starter-kit/import-repo)     | Connect your Git provider and select an existing repository. The CMS is optional for this configuration. Limited support is provided for this configuration. |
| [**WordPress and Gatsby**](/guides/decoupled/wp-gatsby-frontend-starters)  | Create a Front-End Site using a base Gatsby.js frontend template with WordPress as the CMS.                                                                    |
| [**Drupal and Next.js**](guides/decoupled/drupal-nextjs-frontend-starters)    | Create a Front-End Site using a base Next.js frontend template with Drupal as the CMS.                                                                         |
| [**WordPress and Next.js**](/guides/decoupled/wp-nextjs-frontend-starters) | Create a Front-End Site using a base Next.js frontend template with WordPress as the CMS.                                                                      |

<Alert title="Note"  type="info" >

Currently, Pantheon Front-End Sites do not support SSR using Gatsby.

Other permutations for site development using a Front-End Site can be used, but are not supported and currently not recommended.

</Alert>

### Compatibility

The table below provides compatibility information for Front-End Sites.

|  Tooling   |      Version    |
|  :---:     |       :---:     |
|  Gatsby (Static Site Generation (SSG) only)    |    4 or higher  |
| Next.js    |   12 or higher  |
|  Drupal    |   9 or higher   |
| WordPress  |   5.9 or higher |


## Pantheon Front-End Site Starter Kits

Pantheon offers recommended decoupled starter kit templates that are pre-configured, and include the following:

* A set of recommended modules or plugins for creating decoupled sites on Pantheon.

* An example content integration showing content from your CMS backend rendered in your frontend application.

* A live preview of content from your CMS backend rendered in your frontend application.

* A development environment that supports communication between backend and frontend services.

### Backend Starters

- [Drupal Backend Starter](/guides/decoupled/drupal-backend-starters)
- [WordPress Backend Starter](/guides/decoupled/wp-backend-starters)

### Frontend Starters

- [Drupal + Next.js Frontend Starter](/guides/decoupled/drupal-nextjs-frontend-starters)
- [WordPress + Next.js Frontend Starter](/guides/decoupled/wp-nextjs-frontend-starters)
- [WordPress + Gatsby Frontend Starter](/guides/decoupled/wp-gatsby-frontend-starters)

### No Starter or CMS

- [Create a Front-End Site without a Starter](/guides/decoupled/no-starter-kit)

- [Create a Front-End Site without a CMS](/guides/decoupled/no-starter-kit/create)

### Import Repository

- [Create a Front-End Site by Importing Your Repo](/guides/decoupled/no-starter-kit/import-repo)