---
title: Pantheon Decoupled
subtitle: 
description: 
categories: [platform]
tags: [webops, workflow, decoupled]
contributors: [joa-pan]
reviewed: "2022-07-31"
layout: guide
showtoc: true
permalink: docs/guides/decoupled-sites/introduction
anchorid: introduction
---

<Alert title="Early Access" type="info" icon="leaf">

Pantheon Decoupled is available for Early Access participants while features are in active development. The Pantheon development team is  rolling out new functionality often while this product in Early Access

</Alert>


# What is Pantheon Decoupled

Pantheon Decoupled websites separate the front-end and back-end into separate entities. This allows developers to separate the back-end functionality and database from the front-end Markup and JavaScript content.

Traditional CMSs like Drupal and WordPress are hosted and served with the website every time a request for a page is made. This  means that the traditional CMSs are built with back-end and front-end bundled into a single application.

Decoupling is the process of separating content systems or services. By decoupling the services needed to operate a site, each component can become easier to independently work on, minimizing site interruptions and failures, providing a more efficient and smoother WebOps experience. 

The Pantheon Decoupled consists of methods and tools that improve the experience of building a decoupled front-end that sources data from a CMS back-end. 


Decoupled sites offer various possibilities:

* One to one: CMS Site to Decoupled Site

* One to many: CMS Site to many Decoupled Sites

* many to one: CMS Sites to one Decoupled Site

* none to many: Just a Front end Application.

Pantheon Decoupled allows you to connect to your Git provider and deploy a Gatsby or Next.js site. When creating a new decoupled site, you can choose from select CMS backends and JavaScript frontends as a starting point, or select an existing repository. Pantheon offers  recommended decoupled starter kit templates that are preconfigured, and  include the following:

* A set of recommended modules or plugins leveraged by decoupled sites on Pantheon.

* An example content integration showing content from your CMS backend rendered in your frontend application.

* Live preview of content from your CMS backend rendered in your frontend application.

* A local development environment that supports communication between backend and frontend services.


 ## Pantheon Decoupled Terminology

<Accordion title="Terms to Know" id="know-terms" icon="info-sign">

### CMS  
In the context of our Decoupled Product, a CMS Site is a Content Management System configured to work with Decoupled Sites.

### Decoupled Site
A Decoupled Site is a front-end application hosted at Pantheon. It can reference a connected CMS Site at Pantheon, an external site, or exist as its independent application. 

</Accordian>

### React
React is a free and open-source front-end JavaScript library for building user interfaces based on UI components

### React Component
Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions but work in isolation and return HTML.

### Next.js
Next.js is a free and open source web application framework based on React.js, Node.js, webpack and Babel.js for building server-side rendered and/or static web applications using React.

### Gatsby
Gatsby is an open-source static site generator built on top of Node.js using React and GraphQL. It provides over 2500 plugins to create static sites based on sources as Markdown documents, MDX, images, and numerous Content Management Systems such as WordPress, Drupal and more 

### GraphQL
GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. One way to understand how GraphQL works is through resolvers. A resolver is a function responsible for populating the data for a single field in your schema. So if a particular piece of data comes from one endpoint, a resolver could be developed for that particular endpoint and data to populate that field. 

### Static Site Generation (SSG)
SSG means the entire site is pre-rendered into HTML, CSS, and JavaScript files at build time.

### Server Side Rendering (SSR)
Server-Side Rendering is a content rendering method in which each web page is served to a site visitor at runtime, meaning that a portion of the build process happens on each page request.


