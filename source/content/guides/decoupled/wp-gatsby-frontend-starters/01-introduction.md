---
title: WordPress + Gatsby Frontend Starter for Front-End Sites
subtitle: Introduction
description: Learn about WordPress + Gatsby frontend starter for Front-End Sites.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-gatsby-frontend-starters
anchorid: wp-gatsby-frontend-starters
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

Front-End Sites on Pantheon allows you to use [decoupled architecture](/guides/decoupled-sites/#what-is-a-decoupled-site) to separate your frontend and backend into distinct entities.

You can use a frontend starter kit to streamline the creation of your Front-End site on Pantheon. Available WordPress frontend starters are:

- Next.js + WordPress
- Gatsby + WordPress

## Why Use The Gatsby WordPress Starter?

The `gatsby-wordpress-starter` is designed as a starting point to for a Gatsby
site that consumes data from a WordPress backend - specifically a WordPress
backend configured with the `pantheon-decoupled` and `wp-graphql` plugins
installed.

The starter has a dependency on the `@pantheon-systems/wordpress-kit`, which
includes some helpers that maximize any available features of the WordPress
backend.