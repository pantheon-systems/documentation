---
title: Pantheon Front-End Sites
subtitle: Site Options and Starter Kits
description: Learn about site options and available starter kits.
tags: [webops, workflow, decoupled]
contributors: [joan-ing, backlineint, cobypear, hckia]
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

This section provides information on site options and starter kits to help you find a starting point to create your Front-End Site. You can build Front-End Sites on Pantheon using several methods. The Front-End Site option must be enabled before you can apply your own configuration or use a [compatible starter kit](https://decoupledkit.pantheon.io/docs/decoupled-kit-overview).

<Alert title="Not what you're looking for?" type="success" icon="leaf">

Check out the [Front-End Sites landing page](/guides/decoupled/) to access all documentation for Front-End Sites.

</Alert>

## Site Options

You can create an application from scratch by importing a repository or you can use the Pantheon starter kit templates to develop a Front-End Site. You can also create a site without a CMS by using the import repository feature during site creation.

Pantheon Front-End Sites can be created from server-side rendering (SSR) or a static site generator (SSG). The following options are available for Pantheon Front-End Site Early Access offering:

<Partial file="decoupled-site-creation-options.md" />

<Alert title="Note"  type="info" >

Currently, Pantheon Front-End Sites do not support SSR using Gatsby. Other permutations for site development using a Front-End Site can be used, but are not supported or recommended.

</Alert>

## Pantheon Front-End Site Starter Kits

Pantheon offers recommended starter kit templates.

- [Drupal Backend Starter](/guides/decoupled/drupal-backend-starters)
- [WordPress Backend Starter](/guides/decoupled/wp-backend-starters)
- [Drupal + Next.js Frontend Starter](/guides/decoupled/drupal-nextjs-frontend-starters)
- [WordPress + Next.js Frontend Starter](/guides/decoupled/wp-nextjs-frontend-starters)
- [WordPress + Gatsby Frontend Starter](/guides/decoupled/wp-gatsby-frontend-starters)

All starter kits are pre-configured, and include the following:

- A set of recommended modules or plugins for creating Front-End Sites on Pantheon.
- An example content integration showing content from your CMS backend rendered in your frontend application.
- A live preview of content from your CMS backend rendered in your frontend application.
- A development environment that supports communication between backend and frontend services.

### Compatibility

The table below provides compatibility information for Front-End Sites.

|                  Tooling                   |    Version    |
|:------------------------------------------:|:-------------:|
| Gatsby (Static Site Generation (SSG) only) |  4 or higher  |
|                  Next.js                   | 12 or higher  |
|                   Drupal                   |  9 or higher  |
|                 WordPress                  | 5.9 or higher |

## Terminus Plugin

The Terminus Decoupled Kit plugin allows you to create your backend project in Terminus with the option to select [Drupal](/guides/decoupled/drupal-backend-starters/create#create-with-terminus-plugin) or [WordPress](/guides/decoupled/wp-backend-starters/create#create-with-terminus-plugin).

## Rendering Options

This section provides a comparison of static site generation (SSG), server side rendering (SSR), and incremental static regeneration (ISR) modes, and some common use cases for each.

Refer to [Decoupled Architectures: What Computer Assembles the Websites](https://pantheon.io/blog/decoupled-architectures-what-computer-assembles-websites) for more information. You can also check out this [Decoupled Architecture video](https://www.youtube.com/watch?v=dF39cXW3IqY) for a demonstration of the different approaches each mode takes.

### What Is Static Site Generation (SSG)?

SSG compiles and renders your entire website at build time. SSG output consists of:

- **Static files:** HTML
- **Assets:** JavaScript, CSS, etc.

#### Common SSG Use Cases

- Pages with content that is the same for all users.
- Pages that do not require back and forth processing with a runtime.
- Pages with infrequent content changes.
- Pages with critical uptime needs. Content dependencies are met at build time for SSG sites. This means that a failure by a dependent content source will only block a content update. In contrast, an SSR site cannot return a result if a CMS is down when an SSR site tries to render a page.

### What Is Server Side Rendering (SSR)?

SSR uses a web server running Node.js to render individual pages on demand. This is different from SSG which renders the entire site at build time.

#### Common SSR Use Cases

- Pages that are user specific
- Pages that require authentication
- Pages that change frequently
- Pages that do not require back and forth processing with a runtime.
- Pages with regular content changes or edits benefit from SSR because the entire site is not compiled as it is with SSG.

### What Is Incremental Static Regeneration (ISR)?

<Alert title="Note" type="info" >

Pantheon does not support Incremental Static Regeneration (ISR).

</Alert>

ISR allows you to regenerate static pages during runtime without having to rebuild your entire site. Refer to [Next.js ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) for more information.

### Key Differences

- SSG compiles and renders your entire website at build time.
- SSR uses a web server to render individual webpages on demand as opposed to SSG which renders entire websites at build time.
- ISR is not supported on the Pantheon platform. Like SSR, ISR renders individual pages on demand. However, ISR stores the results in an internal cache. This is a less efficient solution than using a CDN. Pantheon provides [Global CDN](/guides/global-cdn) to all Pantheon sites. The combination of SSR and a CDN solves the same problem as ISR in a more robust way.

## More Resources

- [Drupal Backend Starter](/guides/decoupled/drupal-backend-starters)
- [WordPress Backend Starter](/guides/decoupled/wp-backend-starters)
- [Drupal + Next.js Frontend Starter](/guides/decoupled/drupal-nextjs-frontend-starters)
- [WordPress + Next.js Frontend Starter](/guides/decoupled/wp-nextjs-frontend-starters)
- [WordPress + Gatsby Frontend Starter](/guides/decoupled/wp-gatsby-frontend-starters)
