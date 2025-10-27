---
title: Next.js Overview
description: How Next.js works on Pantheon
reviewed: "2025-10-01"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs

---

<Partial file="nextjs-pre-ga.md" />

Next.js is the leading React framework for building web applications and sites.
It stands out for its use of cutting edge development techniques and strong commitment to performance for the end users of the web.

Pantheon makes teams using Next.js more effective by

* Providing a container-based runtime environment that holds all the dependencies needed to run Next.js applications.
* Storing cached responses both in our Global CDN and a persistent layer that is shared across horitzontally scaled containers.
* Providing a Git-based workflow that integrates with GitHub to enable Continuous Integration and Continuous Deployment.
* Offering a dashboard and command line tool for managing environments, viewing logs, and scaling resources.

We do all of this one the same platform that powers thousands of Drupal and WordPress sites.
While Next.js is fundamentally a server-side application, it does not dicate where and how data is stored.
By running Next.js on Pantheon, you can combine it with Drupal, WordPress or Content Publisher to provided a unified approach to content management and delivery.

<ProductGroup>

  <Product title={"Architecture"} link={"/nextjs/architecture"}>

  Pantheon runs Next.js on horizontally scalable containers behind a Global CDN.

  </Product>

  <Product title={"Hello World"} link={"/nextjs/hello-world-tutorial"}>

  Spin up a simple Next.js site on Pantheon with this tutorial.

  </Product>

  <Product title={"Content Publisher and Next.js"} link={"/nextjs/content-publisher-tutorial"}>

  Connect Next.js to Pantheon's Content Publisher to instantly send content from Google Docs to your website.

  </Product>

</ProductGroup>
