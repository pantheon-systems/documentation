---
title: Optimize Your Site for Accessibility
subtitle: Pantheon Tools
description: Tools and techniques to improve your website's accessibility.
tags: [accessibility, workflow, SEO]
contributors: [carolyn-shannon, wordsmither]
reviewed: "2022-06-01"
layout: guide
showtoc: true
permalink: docs/guides/accessibility/tools
anchorid: accessibility/tools
editpath: accessibility/06-tools.md
contenttype: guide
categories: [optimize]
newcms: [drupal, drupal7, drupal8, drupal9, drupal10, wordpress]
audience: [agency, business, development]
product: []
integration: []
---

This section provides an overview of the tools offered by Pantheon that can help you improve your website's accessibility.

## Custom Upstreams

A Custom Upstream is a repository restricted to members of an organization, containing a common codebase for new sites. This type of repository is a child repository to Pantheon's core upstreams (WordPress, Drupal 9, Drupal 7) and acts as a parent for site level repositories.

*How does this support accessibility?* After you've built an accessible site, you can use it to create other sites.

Refer to the [Custom Upstreams](/guides/custom-upstream) guide for details.

## Autopilot

Pantheon Autopilot automatically detects, performs, and deploys updates for WordPress and Drupal. Autopilot also features automated virtual regression testing (VRT) to ensure that your site's user experience (UX) is consistent while securing your site and implementing new features.

*How does this support accessibility?* After your site is compliant, use Autopilot to ensure you don't fall out of compliance.

Refer to [Autopilot](/guides/autopilot) for details.

## WebOps Workflow

Every Pantheon site comes with three environments: Dev, Test, and Live. Each environment runs a version of the site on its own container. Separate Dev, Test, and Live environments allow you to develop and test your site without impacting the Live environment's availability to the world. Additional development environments are available with Multidev.

*How does this support accessibility?* Use the Pantheon WebOps Workflow to run your manual and automated accessibility tests before going live.

Refer to [WebOps Workflow](/pantheon-workflow) for details.

## Lighthouse Integration

Google's [Lighthouse](https://developers.google.com/web/tools/lighthouse) provides automated audits for performance, accessibility, progressive web apps, and SEO. Lighthouse audit reports can have a big impact on your frontend performance.

*How does this support accessibility?* Adding automated accessibility testing to your site's build process is a key tool to maintaining and improving your site's accessibility.

Refer to [Lighthouse Integration](/guides/frontend-performance/diagnostics#lighthouse) for more details.