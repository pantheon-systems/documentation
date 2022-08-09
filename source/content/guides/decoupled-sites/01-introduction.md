---
title: Pantheon Decoupled
subtitle: Introduction
description: Learn about Pantheon Decoupled 
categories: [platform]
tags: [webops, workflow, decoupled]
contributors: [joa-pan,]
type: guide
layout: guide
showtoc: true
anchorid: introduction
permalink: docs/guides/decoupled-sites/introduction/
editpath: decoupled-sites/01-introduction.md
reviewed: "2022-07-31"
---

<Alert title="Early Access" type="info" icon="leaf">

Pantheon Decoupled is available for Early Access participants. Features for Pantheon Decoupled are in active development. Pantheon's development team is  rolling out new functionality often while this product is in Early Access. To learn how you can enroll in our Early Access program, visit https://pantheon.io/features/decoupled-cms.

</Alert>


## What is a Decoupled Site

Decoupled sites separate the frontend and backend into distinct entities. This allows developers to separate backend functionality and databases from the front-end Markup and JavaScript content.

A traditional content management system (CMS) like Drupal and WordPress is hosted and served with the website every time a request for a page is made. With a traditional CMS the back-end and front-end are bundled into a single application.

Decoupling is the process of separating the content system or services. By decoupling the services needed to operate a site, each component can become easier to independently work on, minimizing site interruptions and failures, providing a more efficient and smoother WebOps experience. 

Decoupled Architecture is a site architecture that combines the speed and agility of static sites with the editing ease of standard-model content management systems. Web teams can use tools and frameworks tailored to their areas of expertise; Frontend Developers can use modern JavaScript-centric frameworks and libraries rather than the theming systems of older, monolithic systems like WordPress and Drupal.

## What is Pantheon Decoupled?

Pantheon Decoupled provides users with tools that improve the experience of building a decoupled frontend that sources data from a CMS backend. 

With decoupled sites, a CMS site can be linked to a single decoupled site, multiples sites, or the user does not need a CMS at all and can link directly to a frontend application.

Pantheon Decoupled allows you to connect to your Git repository and deploy a site with Gatsby, Next.js, or no CMS at all. When creating a new decoupled site, you can choose from select CMS backends and JavaScript frontends as a starting point, or start with a clean set up and select an existing repository. 

### How Can I Create a Decoupled Site on the Platform

You can build a decoupled site on Pantheon using several methods; you can apply your own configuration or use a Pantheon developed start kit.  The following workflow applies when starting your decoupled journey:

| Without a Starter Kit (No Backend Configuration)    | Using a Starter Kit (Backend Configuration)|
| :---                                                |    :----:                                  |
| 1. Import a repository                              | 1. Configure a backend                     | 
| 2. Connect repository to Node.js frontend           | 2. Configure kit package - to connect backend to front end|                               
| 3.                                                  | 3. Configure frontend starter              |


### Pantheon Decoupled Starters Kits

Pantheon offers recommended decoupled starter kit templates that are preconfigured, and include the following:

* A set of recommended modules or plugins for creating decoupled sites on Pantheon.

* An example content integration showing content from your CMS backend rendered in your frontend application.

* Live preview of content from your CMS backend rendered in your frontend application.

* A local development environment that supports communication between backend and frontend services.


### Pantheon Decoupled Terminology

<Accordion title="Terms to know related to Pantheon Decoupled" id="terms-decoupled" icon="info-sign">

#### CMS  
In the context of our Decoupled Product, a CMS Site is a Content Management System configured to work with decoupled sites.

#### Decoupled Site
A decoupled site is a frontend application hosted at Pantheon. It can reference a connected CMS Site at Pantheon, an external site, or exist as its independent application.

#### React
React is a free and open source frontend JavaScript library for building user interfaces based on UI components.

#### React Component
Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions but work in isolation and return HTML.

#### Next.js
Next.js is a free and open source web application framework based on React.js, Node.js, webpack and Babel.js for building server-side rendered and/or static web applications using React.

#### Gatsby
Gatsby is an open source static site generator built on Node.js using React and GraphQL. It provides over 2500 plugins to create static sites based on sources as Markdown documents, MDX, images, and numerous Content Management Systems such as WordPress, Drupal, and more.

#### GraphQL
GraphQL is an open source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. 

#### Static Site Generation (SSG)
SSG refers to a site in which the content is pre-rendered into HTML, CSS, and JavaScript files at build time.

#### Server Side Rendering (SSR)
Server Side Rendering is a content rendering method in which each web page is served to a site visitor at runtime, meaning that a portion of the build process happens on each page request.

</Accordion>

### Pantheon Decoupled Options
With Pantheon Decoupled you can create sites from server side rendering (SSR) or a static site generator (SSG).

Currently, Pantheon Decoupled does not support SSR using Gatsby, but it does support SSG with Next.js.

