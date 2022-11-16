---
title: Pantheon Front-End Sites 
subtitle: Introduction
description: Learn about Pantheon's decoupled architecture using Front-End Sites
categories: [platform]
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, joa-pan]
type: guide
layout: guide
showtoc: true
anchorid: introduction
permalink: docs/guides/decoupled-sites/
editpath: decoupled-sites/01-introduction.md
reviewed: "2022-08-11"
---


Our Front-End Site starter kits provide a reasonable starting point for new projects as well as a reference architecture for those wanting to explore further. As open-soruce projects, they have a global community of developers who collaborate in maintaining the projects and expanding their capabilities as the technology matures. Pantheon's starter kits are configured to make it as easy and quick as possible to start working with data from a CMS running on Pantheon.

We currently offer the following Front-End/Back-End combinations:

Next.js / Drupal
Next.js / WordPress
Gatsby / WordPress
Other starter kits could be built and launched in the future as the platform and ecosystem progress.

What's included
Each Pantheon Starter Kit comes with the following:

A working scaffold of a site and instructinos on how to install locally
Pantheon npm packages providing utility functions and components to simplify the process of building and maintaining Front-End sites on Pantheon
Example pages to help developers get started with working examples of a repeatable patterns in their frontend development workflow

### Site Options

With a Pantheon Front-End Site you can create sites from server-side rendering (SSR) or a static site generator (SSG). The following options exist for site creation using the Pantheon Front-End Site Early Access offering:

* **Import Repository**: Connect your Git provider and select an existing repository. The CMS is optional for this configuration. Limited support is provided for this configuration.
* **Gatsby and WordPress**: Create a decoupled site using a base Gatsby.js frontend template with WordPress as the CMS. 
* **Next.js and Drupal**: Create a decoupled site using a base Next.js frontend template with Drupal as the CMS. 
* **Next.js and WordPress**: Create a decoupled site using a base Next.js frontend template with WordPress as the CMS. 

Currently, Pantheon Front-End Sites do not support SSR using Gatsby. Support for SSG with Next.js is available.

Other permutations for site development using a Front-End Site can be used, but are not supported and currently not recommended.