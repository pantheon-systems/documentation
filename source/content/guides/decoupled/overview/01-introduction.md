---
title: Pantheon Front-End Sites
subtitle: Overview
description: Learn about Pantheon's decoupled architecture with Front-End Sites.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, joan-ing]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/overview
reviewed: "2023-03-23"
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

Front-End Sites on Pantheon allow you to use [decoupled architecture](/guides/decoupled/overview/#what-is-a-decoupled-site) to separate your frontend and backend into distinct entities.

<Alert title="Early Access" type="info" icon="leaf">

Pantheon Front-End Sites are available for Early Access participants. Features for Pantheon Front-End Sites are in active development. Pantheon's development team is rolling out new functionality often while this product is in Early Access. Enrollment is open for our [ Front-End Sites Early Access program](https://pantheon.io/features/decoupled-cms). Please review Pantheon's [Software Evaluation Licensing Terms](https://legal.pantheon.io/#contract-hkqlbwpxo) for more information about access to our software.

</Alert>

## What is a Decoupled Site?

Decoupled sites separate the frontend and backend. This allows developers to separate backend functionality and databases from the frontend Markup and JavaScript content.

A traditional content management system (CMS) like Drupal or WordPress is hosted and served with the website every time a request for a page is made. A traditional CMS bundles the backend and frontend into a single application.

Decoupling is the process of separating the content system or services. By decoupling the services needed to operate a site, each component can be worked on independently, minimizing site interruptions and failures, and providing a more efficient and smoother WebOps experience.

Decoupled Architecture is a site architecture that combines the speed and agility of static sites with the editing ease of standard-model content management systems. Web teams can use tools and frameworks tailored to their areas of expertise. For example, frontend developers can use modern JavaScript-centric frameworks and libraries rather than the theming systems of older, monolithic systems like WordPress and Drupal.

## What is a Front-End Site?

Pantheon Front-End Sites provide users with tools that improve the experience of building a decoupled frontend that sources data from a CMS backend.

Front-End Sites allows a CMS site to be linked to a single site, multiple sites, or you can link directly to a frontend application without a CMS.

You can connect your Front-End Site to your Git repository and choose from select CMS backends and JavaScript frontends as a starting point:

- WordPress and Gatsby
- WordPress and Next.js
- Drupal and Next.js
- Direct import with no CMS

You can also start with a clean set up and connect your site account to an existing Git repository.

## Front-End Sites Benefits

Pantheon's Front-End Sites:

- Optimizes the frontend solution for multiple sites.
- Manages frontend scalability independently.
- Makes your code easier to understand and maintain.
- Allows you to customize your tool selection at each layer of the system, which can't be done with most monolithic platforms.
- Improves testability and reliability.

## Decoupled Terminology

<Accordion title="Terms to know for Pantheon Front-End Sites" id="terms-decoupled" >

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


## More Resources

- [Introducing Front-End Sites](https://pantheon.io/blog/introducing-front-end-sites-pantheon-dashboard)

- [Use an Empty Upstream to Host a Static Site on Pantheon](/static-site-empty-upstream)

- [How Decoupled Architectures Can Benefit the Entire Web Team, and Drive User Engagement](https://pantheon.io/blog/decoupled-architectures-can-benefit-every-member-of-web-team)

- [Drupal: Sometimes Headless, Never Heartless](https://pantheon.io/blog/drupal-sometimes-headless-never-heartless)

- [Headless Websites: What's the Big Deal with Decoupled Architecture?](https://pantheon.io/blog/headless-websites-whats-big-deal-decoupled-architecture)
