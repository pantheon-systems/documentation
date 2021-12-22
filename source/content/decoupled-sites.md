---
title: Decoupled Sites
description: Pantheon is working to bring you the latest tools to build Decoupled Sites.
contributors: [stevector, alexfornuto]
categories: [get-started]
showtoc: true
tags: [site, webops, workflow]
reviewed: "2020-10-27"
---

<p><dfn id="decoupled">Decoupled Architecture</dfn> is a site architecture that combines the speed and agility of static sites with the editing ease of standard-model content management systems. Web teams can use tools and frameworks specialized to their areas of expertise; Front-end Developers can use modern JavaScript-centric frameworks and libraries rather than the theming systems of older, monolithic LAMP stack systems like WordPress and Drupal.</p>

<Alert title="Early Access" type="info" icon="leaf">

This page refers to products and features which are currently in development or early access. The content on this page is subject to change as development continues, so check back frequently to learn the latest developments.

</Alert>

## Pantheon's Decoupled Architecture

Pantheon is enabling developers and agencies to easily create and manage Decoupled Sites from a single platform.

<Enablement link="https://pantheon.io/decoupled-cms?docs" title="Sign up for updates!">

Sign up for Decoupled Sites updates, or talk to Sales to participate in Early Access for Decoupled Sites. Click the link above to get started!

</Enablement>

### Decoupled Sites

**Decoupled Sites** run a [Node.js](https://nodejs.org/) codebase in parallel with a WordPress or Drupal site.
It can be used where a domain's public traffic is delivered from a server-side rendered front-end framework such as [Next.js](https://nextjs.org/) or [Gatsby](https://www.https://www.gatsbyjs.com/) and administrative content editing is done in a WordPress or Drupal interface.

![A flow diagram of the Decoupled Sites architecture](../images/decoupled/decoupled-bridge-diagram.png)

Decoupled Sites are presently in Early Access, where we are engaging with a small set of customers via our [Professional Services](/guides/professional-services) team.

Pantheon Decoupled Sites will be built to run on a content delivery network (CDN) and optimized for popular static site generator (SSG) frameworks like Gatsby. Decoupled Sites will take the results of a Node.js static site generator process and deploy it to the edge of the [Global CDN](/global-cdn).



## FAQ

### What Content Management Systems (CMS) will Decoupled Sites support?

WordPress and Drupal are still the CMSs of choice at Pantheon, and are the only data source available for these products.

### What Git providers will Decoupled Sites support?

Both products are being developed with GitHub as the location of source repositories.
During Early Access and Limited Availability we will evaluate other providers with which our customers need to integrate.

## See Also

- [The Five Ws of Decoupled Websites](https://2020.wpcampus.org/schedule/the-five-ws-of-decoupled-websites/)
- [How Decoupled Architectures Can Benefit the Entire Web Team, and Drive User Engagement](https://pantheon.io/blog/decoupled-architectures-can-benefit-every-member-of-web-team)
- [Drupal: Sometimes Headless, Never Heartless](https://pantheon.io/blog/drupal-sometimes-headless-never-heartless)
- [Static Sites and Empty Upstreams](/static-site-empty-upstream)
