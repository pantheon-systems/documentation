---
title: Pantheon Front-End Sites
subtitle: Understand Next.js SSG, ISR, and SSR
description: Understand the differences between SSG, ISR, and SSR.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/overview/nextjs
anchorid: nextjs
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides a quick comparison of Next.js's Static Site Generation (SSG), Incremental Static Regeneration (ISR), and Server Side Rendering (SSR) modes, and some common use cases for each. This section does not cover client side rendering (CSR).

Refer to the [Next.js overview on data fetching](https://nextjs.org/docs/basic-features/data-fetching/overview) for more information on each rendering mode.

Front-End Sites is compatible with the following starter kits that use Next.js:

- [Next.js + WordPress](/guides/decoupled/wp-nextjs-frontend-starters)
- [Next.js + Drupal](/guides/decoupled/drupal-nextjs-frontend-starters)

## What Is Static Site Generation (SSG)?

Static Site Generation is a process that compiles and renders a website or app at build time. The output consists of static files, including the HTML file and assets such as JavaScript and CSS.

### Common Use Cases

- Pages with content that is the same for all users
- Pages that can be publicly cached
- Pages that do not require data from an outside source

## What Is Incremental Static Regeneration (ISR)?

 Incremental Static Regeneration (ISR) allows you to use static-generation on a per-page basis. This process lets you update your pages after they have been built without having to rebuild the entire site.

Refer to [Incremental Static Regeneration (ISR)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) for more information.

## What Is Server Side Rendering (SSR)?

SSR generates the content of your site on the server and then sends it to the browser. Dynamic pages are generated at request time.

### Common Use Cases

- Pages that are user specific
- Pages that require authentication
- Pages that require data fetched at request time