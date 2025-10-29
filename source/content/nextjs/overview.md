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
showtoc: false
---
**todo:** Rachel to own - consider adding sections for access and Compatibility, features, related tools/cli, limitations (no redis)?

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

## Architecture and workflow

<!--- This image is pulled from this deck: https://docs.google.com/presentation/d/17k15auDrnpq2LdRC4P35dN5yJ4pOkPY62M7drBDkTCc/edit?slide=id.g39e43c7cf0e_0_15#slide=id.g39e43c7cf0e_0_15 --->
![architecture diagram](../../images/nextjs/github-app--nextjs-version.png)

To support Next.js development teams, Pantheon uses a GitHub Application that builds and deploys changes. Learn more about:

* [Deploying branches to Dev and Multidev environments](/nextjs/multidev)
* [Deploying Git tags to Test and Live environments](/nextjs/test-and-live-env)
* [The architecture underlying the build time and runtime environments](/nextjs/architecture)
* [Setting environment variables](/nextjs/environment-variables)

## Getting started

To get up and running with Next.js on Pantheon, we recommend [starting with a simple "Hello World" site following this tutorial](/nextjs/hello-world-tutorial) or a basic integration of [Next.js and Content Publisher](/nextjs/content-publisher-tutorial).

If you have previously launched a Next.js site via [Pantheon's Front-End Sites, use this guide for migration](/nextjs/migrating-from-front-end-sites).

Most of the tasks related to developing a site with Next.js on Pantheon can be done through the Pantheon dashboard.
We also provide [command line tools equivalents](/nextjs/cli-tools) for many tasks like log viewing and site creation.