---
title: Next.js Overview
description: How Next.js works on Pantheon
reviewed: "2025-10-31"
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

## Access & Availability
Access to Pantheon's Next.js support is currently available through a **Private Beta** program.

To request an invite, [submit this form](https://pantheon.io/nextjs-beta).

Pantheon's product engineering team is rolling out new functionality often while this product is in Private Beta. Certain features and functionality are limited, for details see [this section below](#considerations).

### Compatibility & Requirements
* **Node versions:**
  * Pantheon provides the latest 3 LTS versions of Node.js. Pantheon derives which one to use by looking at the `engines` property in `package.json`.
* **Package managers:**
  * Pantheon will use `npm`, `yarn`, or `pnm` depending on which lock file you have present in your repository. Having a lock file for more than one package manager can create unpredictable behavior.
* **GitHub:**
  * Next.js sites can only run on Pantheon if the code comes from a GitHub repository. Eventually we will expand that capability to BitBucket and GitLab.

### Usage
To get up and running with Next.js on Pantheon, we recommend [starting with a simple "Hello World" site following this tutorial](/nextjs/hello-world-tutorial) or a basic integration of [Next.js and Content Publisher](/nextjs/content-publisher-tutorial).

If you have previously launched a Next.js site via [Pantheon's Front-End Sites, use this guide for migration](/nextjs/migrating-from-front-end-sites).

Most of the tasks related to developing a site with Next.js on Pantheon can be done through the Pantheon dashboard.
We also provide [command line equivalents](/nextjs/cli-tools) for many tasks like log viewing and site creation.

## Key Features
Pantheon makes teams using Next.js more effective by:

* Providing a container-based runtime environment that holds all the dependencies needed to run Next.js applications.
* Storing cached responses both in our Global CDN and a persistent layer that is shared across horitzontally scaled containers.
* Providing a Git-based workflow that integrates with GitHub to enable Continuous Integration and Continuous Deployment.
* Offering a dashboard and command line tool for managing environments, viewing logs, and scaling resources.

We do all of this on the same platform that powers thousands of Drupal and WordPress sites.
While Next.js is fundamentally a server-side application, it does not dicate where and how data is stored.
By running Next.js on Pantheon, you can combine it with Drupal, WordPress or Content Publisher to provided a unified approach to content management and delivery.

## Considerations
The following are known limitations for Next.js on Pantheon:
* These Site Dashboard features are not supported for Next.js at this time:
  * Status reports
  * Errors <Popover title="Note" content="Instead, refer to the Build tab on the given environment - checking build logs for errors related to Next.js deployments." />
  * Domains & HTTPS, Upgrading site plan <Popover title="Note" content="Launch is not currently self-serve, for details see <a href='/nextjs/connecting-custom-domain-name'>Connecting a custom domain to Next.js on Pantheon</a>." />
* Performance addons are not supported for Next.js at this time, regardless of site plan:
  * New Relic
  * Redis
  * Solr
* The following Workspace features are not supported for Next.js at this time:
  * Autopilot
  * Custom Upstreams
