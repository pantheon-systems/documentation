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

Pantheon provides two starter kits for Front-End Sites that use Next.js:

- [Next.js + WordPress](/guides/decoupled/wp-nextjs-frontend-starters)
- [Next.js + Drupal](/guides/decoupled/drupal-nextjs-frontend-starters)

## What Is Static Site Generation (SSG)?

A static page in Next.js is a React component exported from a file under the `pages` directory that has data fetching inside of `getStaticProps` that is also exported from the same file—or no data fetching at all.

Static pages are generated at build time. Static pages utilizing dynamic routing and `getStaticProps` must also export a `getStaticPaths` function to specify the exact path for the static content. Refer to the [official `getStaticPaths` documentation](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths) for more information.

Static pages can be served with `next export` without a Node.js server. However, many features that make Next.js worth using are not enabled this way and we do not recommend it.

### Common Use Cases

- Pages with content that is the same for all users
- Pages that can be publicly cached
- Pages that do not require data from an outside source

## What Is Incremental Static Regeneration (ISR)?

You can update static pages after they have been built with new content with[Incremental Static Regeneration (ISR)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration).

Add the `revalidate` prop to `getStaticProps` to enable ISR. The revalidate prop defines the number of seconds that the server will wait before re-running `getStaticProps`. This is known as stale-while-revalidate.

## What Is Server Side Rendering (SSR)?

A dynamic page in Next.js is a React component exported from a file under the `pages` directory that has data fetching inside of `getServerSideProps`. Dynamic pages are generated at request time.

### Common Use Cases

- Pages that are user specific
- Pages that require authentication
- Pages that require data fetched at request time

## Summary Of Differences

- Next.js pages can export an async function, `getStaticProps` or `getServerSideProps` that runs on the server and returns props to the component on the client side.
- SSG pages fetch data at build time using `getStaticProps` or do not have any data fetching at all.
- ISR pages are SSG pages that refetch data after a given `revalidate` time has expired.
- SSR pages fetch data at the time the page is requested.

## Implement Next.js Data Fetching

Refer to [Next.js + Drupal Frontend Starter Customization](/guides/decoupled/drupal-nextjs-frontend-starters/customization) and [Next.js + WordPress Frontend Starter Customization](/guides/decoupledwp-nextjs-frontend-starters/customization) for a walk-through of fetching data with `getStaticProps` and `getServerSideProps`.