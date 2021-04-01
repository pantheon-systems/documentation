---
title: Pantheon Professional Services
subtitle: Managed Updates
description: Managed Updates offerings and requirements for Drupal 8 compatibility
categories: [manage]
tags: [composer, professional-services, updates, workflow]
reviewed: "2021-04-01"
layout: guide
showtoc: true
permalink: docs/guides/professional-services/managed-updates
anchorid: managed-updates
editpath: professional-services/05-managed-updates.md
---

[Managed Updates](https://pantheon.io/professional-services/managed-updates?docs) is a service offered by our [Professional Services](/guides/professional-services) team. We help keep your site updated so you can focus on what's important. Learn more about Managed Updates in the [Managing Updates for WordPress and Drupal webinar](https://pantheon.io/resources/managed-updates-webinar?docs)

With Pantheon Managed Updates (**PMU**), you get:

- <abbr title="Content Management System">CMS</abbr> core updates
- Module / plugin updates
- Visual Regression Testing (**VRT**)

To make Managed Updates available to customers of all sizes and needs, Pantheon offers three versions: Premium, Lite, and Portfolio Upstreams.

### Premium

Managed Updates Premium is for standalone sites and includes support for custom workflows, testing, and CI/build processes. Premium also offers personalized update issue remediation, and email notifications when updates are scheduled.

### Lite

Managed Updates Lite is for standard sites on Pantheon, and offers basic CMS and plugin updates (with visual regression testing) on a customizable schedule. It's for WordPress or Drupal 7 sites that use the standard [Pantheon WebOps workflow](/pantheon-workflow), or Drupal 8 sites using a Composer-build workflow without continuous integration processes (see below for details).

### Portfolio Upstreams

Managed Updates for Portfolio Upstreams provides provides core, plugin, and module updates for customers managing site collections using [Custom Upstreams](/custom-upstream).

#### Requirements

- Sites use Pantheon’s update workflow
  - Codebase changes are pushed to client's remote repo and then applied to each of the sites
  - Build step does not rely on 3rd party sources
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
| Composer compatibility support (Drupal 8)     | Updates for Composer-built Drupal sites.                                               | N/A                                 | ❌                       | <Check/>                |
| Custom build/CI process                       | Updates for sites using custom CI or build processes.                                  | ❌                                   | ❌                       | <Check/>                |
| Patched code support                          | Preserves patched code in applied updates.                                             | Test and Deploy Only                | Drupal 7 sites excluded | <Check/>                |
| Custom VRT                                    | VRT for authenticated pages or custom DOM elements.                                    | ❌                                   | ❌                       | <Check/>                |

## Requirements and Steps for Drupal 8 Compatibility

In order to be supported by Pantheon Managed Updates, Drupal 8 sites should be in a "Composer-clean" state. This requires making sure the site’s codebase meets several criteria.

### Prerequisites

A Drupal 8 site using Managed Updates must:

- have build and deployment handled by Pantheon, not by an external CI/CD service,
- not include a `pantheon.upstream.yml` file in the codebase (unless it’s custom upstream), only `pantheon.yml`,
- use a [nested docroot](/nested-docroot) structure,
- be connected to the "[Empty drupal8](https://github.com/pantheon-systems/empty)" Pantheon upstream <Popover content="If the site is connected to a custom upstream, that upstream needs to use 'Empty drupal8'." />,
- have a code-structure based on the [Composer Drops-8 Example](https://github.com/pantheon-systems/example-drops-8-composer) project.

  <Accordion title="Convert your D8 site to the example Composer Drops-8 structure">

  1. Clone or download [example-drops-8-composer](https://github.com/pantheon-systems/example-drops-8-composer) locally. This will be your initial project folder.

  1. Remove the `.git` file (if present).

  1. Review the top-level `.gitignore` file. Make sure package installation paths *are not ignored* (`vendors`, `web/modules/contrib/`, `web/themes/contrib`, `web/core`). Make sure paths to user files *are ignored* (`web/sites/default/files`, `docroot/sites/default/files`).

  1. Rename the project in the top-level `composer.json` file to something matching the site name, for example: “client-org-name/site-name”.

  1. Clone the existing Pantheon site repo to the separate folder.

  1. Copy all of the existing site’s custom modules to `web/modules/custom/`.

  1. Copy all of the existing site’s custom themes to `web/themes/custom/`.

  1. Finally, take the `composer.json` file from the site’s codebase and add all packages from `require` and `require-dev` sections to the new project’s `composer.json`. If there are duplicates, prefer versions from the example project, rather than from site.

  </Accordion>

Additionally:

- Drupal core must be required as "`drupal/core-recommended`" package, not "`drupal/core.`".
- All Drupal modules should be required by Composer (via `composer.json`).
- Drupal core, themes, and modules should be locked to the exact versions currently installed on the Live environment. In `composer.json`, the "require" section should look like this for Drupal packages:

  <Alert title="Correct" type="success" icon="check">

  ```json
  "drupal/module": "1.2",
  "drupal/core-recommended": "8.8.0"
  ```

  </Alert>

  <Alert title="Incorrect" type="danger" icon="remove">

  ```json
  "drupal/module": "~1.2",
  "drupal/module2": ">=1.2",
  "drupal/core-recommended": "^8.8"
  ```

  </Alert>

- Drush 9 or greater should be required by `composer.json`.
- Custom modules should be stored in `web/modules/custom`.
- Custom themes should be stored in `web/themes/custom`.
- Local patches should be sourced from the `patches` directory in the project root.
- After removing the `vendor` directory, `composer.lock` file, `web/modules/contrib/*`, `web/themes/contrib/*`, and `web/core/*`, running `composer install` should run with exit status `0` (no errors).
- Composer-specific files and directories SHOULD NOT be included in the `.gitignore` file.
- There should be no `.git` folders in the `modules` or `vendors` directories.
- `"topfloor/composer-cleanup-vcs-dirs": "^1.0"` should be required in the top-level `composer.json` file.

## See Also
- [Serving Sites from the Web Subdirectory](/nested-docroot)
- [Custom Upstreams](/custom-upstream)
- [Professional Services](/guides/professional-services)
