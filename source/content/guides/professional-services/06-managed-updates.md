---
title: Pantheon Professional Services
subtitle: Managed Updates
description: Managed Updates offerings and requirements for Drupal compatibility
contenttype: [guide]
categories: [help]
newcms: [--]
audience: [development, sysadmin]
product: [--]
integration: [--]
tags: [composer, professional-services, updates, workflow]
reviewed: "2021-04-01"
layout: guide
showtoc: true
permalink: docs/guides/professional-services/managed-updates
anchorid: managed-updates
editpath: professional-services/06-managed-updates.md
reviewed: "2022-12-13"
---

[Managed Updates](https://pantheon.io/professional-services/managed-updates?docs) is a service offered by our [Professional Services](/guides/professional-services) team. We help keep your site updated so you can focus on what's important. Learn more about Managed Updates in the [Managing Updates for WordPress and Drupal webinar](https://pantheon.io/resources/managed-updates-webinar?docs)

With Pantheon Managed Updates (**PMU**), you get:

- CMS core updates
- Module / plugin updates
- Visual Regression Testing (**VRT**)

To make Managed Updates available to customers of all sizes and needs, Pantheon offers three versions: Premium, Lite, and Portfolio Upstreams.

### Premium

Managed Updates Premium is for standalone sites and includes support for custom workflows, testing, and CI/build processes. Premium also offers personalized update issue remediation, and email notifications when updates are scheduled. Sites using Pantheon's Integrated Composer for drupal:latest are also supported.

### Lite

Managed Updates Lite is for standard sites on Pantheon, and offers basic CMS and plugin updates (with visual regression testing) on a customizable schedule. It's for WordPress or Drupal 7 sites that use the standard [Pantheon WebOps workflow](/pantheon-workflow), or drupal:latest sites using a Composer-build workflow without continuous integration processes.

### Portfolio Upstreams

Managed Updates for Portfolio Upstreams provides provides core, plugin, and module updates for customers managing site collections using [Custom Upstreams](/guides/custom-upstream).

#### Requirements

- Sites use Pantheon’s update workflow
  - Codebase changes are pushed to client's remote repo and then applied to each of the sites
  - Build step does not rely on 3rd-party sources
  - No other special deployment instructions
- Drupal 7 or WordPress 5.4 or above

## Product Comparison Table

| Feature                                       | Description                                                                            | Managed Updates Portfolio Upstreams | Managed Updates Lite    | Managed Updates Premium |
|-----------------------------------------------|----------------------------------------------------------------------------------------|-------------------------------------|-------------------------|-------------------------|
| Core, plugin, and module updates              | Full code updates from publicly accessible repositories and sources.                   | <Check/>                            | <Check/>                | <Check/>                |
| Regular update detection                      | Daily scans of official repositories to detect when updates are available.             | <Check/>                            | <Check/>                | <Check/>                |
| Visual Regression Testing                     | VRT for every environment through which changes are deployed.                          | <Check/>                            | <Check/>                | <Check/>                |
| Custom deployment scheduling                  | Adjustable scheduling for the deployment of core, plugin, and module updates.          | ❌                                   | <Check/>                | <Check/>                |
| Standalone sites                              | Maintenance of logically distinct and/or customized sites.                             | ❌                                   | <Check/>                | <Check/>                |
| Workflow customization                        | Support for bespoke site update workflows.                                             | ❌                                   | ❌                       | <Check/>                |
| Remote pull requests to external repositories | Receive pull requests for successful updates that can be accepted at your convenience. | ❌                                   | ❌                       | <Check/>                |
| Personalized update issue remediation         | Expert support for remediating update and deployment issues.                           | ❌                                   | ❌                       | <Check/>                |
| Headless site support                         | Updates for headless and decoupled sites.                                              | ❌                                   | ❌                       | <Check/>                |
| Custom build/CI process                       | Updates for sites using custom CI or build processes.                                  | ❌                                   | ❌                       | <Check/>                |
| Patched code support                          | Preserves patched code in applied updates.                                             | Test and Deploy Only                | Drupal 7 sites excluded | <Check/>                |
| Custom VRT                                    | VRT for authenticated pages or custom DOM elements.                                    | ❌                                   | ❌                       | <Check/>                |


## More Resources
- [Serving Sites from the Web Subdirectory](/nested-docroot)
- [Custom Upstreams](/guides/custom-upstream)
- [Professional Services](/guides/professional-services)
