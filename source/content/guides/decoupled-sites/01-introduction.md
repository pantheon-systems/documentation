---
title: Pantheon Decoupled
subtitle: Introduction
description: Learn about Pantheon Decoupled 
categories: [platform]
tags: [webops, workflow, decoupled]
contributors: [joa-pan]
type: guide
layout: guide
showtoc: true
anchorid: introduction
permalink: docs/guides/decoupled-sites/introduction/
editpath: decoupled-sites/01-introduction.md
reviewed: "2022-08-11"
---

<Alert title="Early Access" type="info" icon="leaf">

Pantheon Decoupled is available for Early Access participants. Features for Pantheon Decoupled are in active development. Pantheon's development team is rolling out new functionality often while this product is in Early Access. To learn how you can enroll in our Early Access program, visit https://pantheon.io/features/decoupled-cms.

</Alert>


## What is a Decoupled Site?

Decoupled sites separate the frontend and backend into distinct entities. This allows developers to separate backend functionality and databases from the front-end Markup and JavaScript content.

A traditional content management system (CMS) like Drupal or WordPress is hosted and served with the website every time a request for a page is made. With a traditional CMS the backend and frontend are bundled into a single application.

Decoupling is the process of separating the content system or services. By decoupling the services needed to operate a site, each component can become easier to independently work on, minimizing site interruptions and failures, and providing a more efficient and smoother WebOps experience. 

Decoupled Architecture is a site architecture that combines the speed and agility of static sites with the editing ease of standard-model content management systems. Web teams can use tools and frameworks tailored to their areas of expertise. For example, Frontend Developers can use modern JavaScript-centric frameworks and libraries rather than the theming systems of older, monolithic systems like WordPress and Drupal.

## What is Pantheon Decoupled?

Pantheon Decoupled provides users with tools that improve the experience of building a decoupled frontend that sources data from a CMS backend. 

With decoupled sites, a CMS site can be linked to a single decoupled site, multiple sites, or the user does not need a CMS at all and can link directly to a frontend application.

Pantheon Decoupled allows you to connect to your Git repository and deploy a site with Gatsby, Next.js, or no CMS at all. When creating a new decoupled site, you can choose from select CMS backends and JavaScript frontends as a starting point, or start with a clean set up and connect it to an existing repository. 

### How Can I Create a Decoupled Site on the Platform?

You can build a decoupled site on Pantheon by applying your own configuration or using a Pantheon-developed start kit. The following workflows apply when starting your decoupled journey.

* **Without a Starter Kit (No Backend Configuration)**
  1. Import a GitHub repository.
  1. Configure the frontend application.
  1. Connect to the Node.js frontend application.
  1. Push changes to trigger a site build.
  
* **Using a Starter Kit (With Backend Configuration)**                        
  1. Configure the backend.
  1. Use the starter kit package to connect the backend to the frontend.
  1. Configure the frontend application.
  1. Connect the repository to the Node.js frontend application.       
  1. Push changes to trigger a site build.

### Pantheon Decoupled Starters Kits

Pantheon offers recommended decoupled starter kit templates that are preconfigured, and include the following:

* A set of recommended modules or plugins for creating decoupled sites on Pantheon.

* An example content integration showing content from your CMS backend rendered in your frontend application.

* A live preview of content from your CMS backend rendered in your frontend application.

* A development environment that supports communication between backend and frontend services.

### Pantheon Decoupled Terminology

<Accordion title="Terms to know for Pantheon Decoupled" id="terms-decoupled" icon="info-sign">

#### CMS  
In the context of our Decoupled Product, a CMS Site is a Content Management System configured to work with decoupled sites.

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

With Pantheon Decoupled you can create sites from server-side rendering (SSR) or a static site generator (SSG). The following options exist for site creation using the Pantheon Decoupled Early Access offering:

* **Import Repository**: Connect your Git provider and select an existing repository. The CMS is optional for this configuration. Limited support is provided for this configuration.
* **Gatsby and Wordpress**: Create a decoupled site using a base Gatsby.js frontend template with WordPress as the CMS. This configuration uses static site generation.
* **Next.js and Drupal**: Create a decoupled site using a base Next.js frontend template with Drupal as the CMS. This configuration uses the static site rendering method. 

Currently, Pantheon Decoupled does not support SSR using Gatsby. Support for SSG with Next.js is available. 

Other permutations for site development using Pantheon Decoupled can be used, but are not supported and currently not recommended. 

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

### Pantheon Decoupled Starters Kits

Pantheon offers recommended decoupled starter kit templates that are preconfigured, and include the following:

* A set of recommended modules or plugins for creating decoupled sites on Pantheon.

* An example content integration showing content from your CMS backend rendered in your frontend application.

* A live preview of content from your CMS backend rendered in your frontend application.

* A local development environment that supports communication between backend and frontend services.
