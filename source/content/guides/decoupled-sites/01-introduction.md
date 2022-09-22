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

<Alert title="Early Access" type="info" icon="leaf">

Pantheon Front-End Sites are available for Early Access participants. Features for Pantheon Front-End Sites are in active development. Pantheon's development team is rolling out new functionality often while this product is in Early Access. To learn how you can enroll in our Early Access program, visit https://pantheon.io/features/decoupled-cms. Please review Pantheon's [Software Evaluation Licensing Terms](https://legal.pantheon.io/#contract-hkqlbwpxo) for more information about access to our software.

</Alert>

## What is a Decoupled Site?

Decoupled sites separate the frontend and backend into distinct entities. This allows developers to separate backend functionality and databases from the front-end Markup and JavaScript content.

A traditional content management system (CMS) like Drupal or WordPress is hosted and served with the website every time a request for a page is made. With a traditional CMS the backend and frontend are bundled into a single application.

Decoupling is the process of separating the content system or services. By decoupling the services needed to operate a site, each component can become easier to independently work on, minimizing site interruptions and failures, and providing a more efficient and smoother WebOps experience.

Decoupled Architecture is a site architecture that combines the speed and agility of static sites with the editing ease of standard-model content management systems. Web teams can use tools and frameworks tailored to their areas of expertise. For example, Frontend Developers can use modern JavaScript-centric frameworks and libraries rather than the theming systems of older, monolithic systems like WordPress and Drupal.

## What is a Front-End Site?

Pantheon Front-End Sites provide users with tools that improve the experience of building a decoupled frontend that sources data from a CMS backend.

With decoupled sites, a CMS site can be linked to a single decoupled site, multiple sites, or the user does not need a CMS at all and can link directly to a frontend application.

A Front-End Site allows you to connect to your Git repository and deploy a site with Gatsby, Next.js, or no CMS at all. When creating a new decoupled site, you can choose from select CMS backends and JavaScript frontends as a starting point, or start with a clean set up and connect your site account to an existing repository.

### Decoupled Terminology

<Accordion title="Terms to know for Pantheon Front-End Sites" id="terms-decoupled" icon="info-sign">

#### CMS  
In the context of our Decoupled Product, a CMS site is a Content Management System configured to work with decoupled sites.

#### Decoupled Site
A decoupled site is a frontend application hosted at Pantheon. It can reference a connected CMS site at Pantheon, an external site, or exist as an independent application.

#### React
[React](https://reactjs.org/) is a free and open source frontend JavaScript library for building user interfaces based on UI components.

#### React Components
Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions but work in isolation and return HTML.

#### Next.js
[Next.js](https://nextjs.org/) is a free and open source web application framework based on React.js, Node.js, and webpack and Babel.js for building server-side rendered and/or static web applications using React.

#### Gatsby
[Gatsby](https://www.gatsbyjs.com/) is an open source static site generator built on Node.js using React and GraphQL. It provides over 2,500 plugins to create static sites based on sources such as Markdown documents, MDX, images, and numerous Content Management Systems such as WordPress, Drupal, and more.

#### GraphQL
[GraphQL](https://graphql.org/) is an open source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. 

#### Static Site Generation (SSG)
SSG refers to a site in which the content is pre-rendered into HTML, CSS, and JavaScript files at build time.

#### Server-side Rendering (SSR)
Server-side Rendering is a content rendering method in which each web page is served to a site visitor at runtime, meaning that a portion of the build process happens on each page request.

</Accordion>

### Site Options

With a Pantheon Front-End Site you can create sites from server-side rendering (SSR) or a static site generator (SSG). The following options exist for site creation using the Pantheon Front-End Site Early Access offering:

* **Import Repository**: Connect your Git provider and select an existing repository. The CMS is optional for this configuration. Limited support is provided for this configuration.
* **Gatsby and WordPress**: Create a decoupled site using a base Gatsby.js frontend template with WordPress as the CMS. 
* **Next.js and Drupal**: Create a decoupled site using a base Next.js frontend template with Drupal as the CMS. 
* **Next.js and WordPress**: Create a decoupled site using a base Next.js frontend template with WordPress as the CMS. 

Currently, Pantheon Front-End Sites do not support SSR using Gatsby. Support for SSG with Next.js is available.

Other permutations for site development using a Front-End Site can be used, but are not supported and currently not recommended.

### Create a Decoupled Site with Pantheon

You can build a decoupled site on Pantheon using several methods. The decoupled option must be enabled you can apply your own configuration or use a Pantheon developed start kit. The following workflows apply when starting your decoupled journey.

* **Without a Starter Kit (No Backend Configuration)**
  1. Import a GitHub repository.
  1. Configure the frontend application.
  1. Connect to the Node.js frontend application.
  1. Push changes to trigger a site build.
  
* **Using a Starter Kit (With Backend Configuration)**
  1. Configure the backend.
  1. Use the kit package to connect the backend to the frontend.
  1. Configure the frontend application.
  1. Connect repository to the Node.js frontend application.
  1. Push changes to trigger a site build.

### Pantheon Front-End Site Starter Kits

Pantheon offers recommended decoupled starter kit templates that are preconfigured, and include the following:

* A set of recommended modules or plugins for creating decoupled sites on Pantheon.

* An example content integration showing content from your CMS backend rendered in your frontend application.

* A live preview of content from your CMS backend rendered in your frontend application.

* A development environment that supports communication between backend and frontend services.

## See Also

- [Introducing Front-End Sites](https://pantheon.io/blog/introducing-front-end-sites-pantheon-dashboard)

- [Use an Empty Upstream to Host a Static Site on Pantheon](/static-site-empty-upstream)

- [How Decoupled Architectures Can Benefit the Entire Web Team, and Drive User Engagement](https://pantheon.io/blog/decoupled-architectures-can-benefit-every-member-of-web-team)

- [Drupal: Sometimes Headless, Never Heartless](https://pantheon.io/blog/drupal-sometimes-headless-never-heartless)

- [Headless Websites: What's the Big Deal with Decoupled Architecture?](https://pantheon.io/blog/headless-websites-whats-big-deal-decoupled-architecture)
