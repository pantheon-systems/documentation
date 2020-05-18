---
title: Managed Updates
description: Descriptions of the Managed Updates products and requirements for Drupal 8 compatibility
reviewed: "2020-05-14"
categories: [platform]
tags: [updates, professional services]
---

Managed Updates is a service offered by our [Professional Services](/professional-services) team. We help keep your site updated so you can focus on what's important.

With Pantheon Managed Updates, you get.

- CMS core updates
- Module / plugin updates
- Visual Regression Testing (**VRT**)

To make Managed Updates available to customers of all sizes and needs, Pantheon offers three versions: Lite, Premium, and Portfolio Upstreams.

### Lite

Managed Updates Lite is for standard sites on Pantheon, and offers basic CMS and plugin updates (with visual regression testing) on a customizable schedule. It's for WordPress or Drupal 7 sites that use the standard [Pantheon WebOps workflow](/pantheon-workflow), or Drupal 8 sites using a Composer-build workflow without continous integration processes.(see below for details).

### Premium

This more specialized service can handle sites with custom workflows, testing, and CI processes. It also offers personalized update issue remediation, and email notifications when updates are scheduled.

- Patched code
- Standalone sites

### Portfolio Upstreams

Managed Updates for Portfolio Upstreams provides managed updates to all your client sites using your [Custom Upstreams](/custom-upstream).

- Uses Pantheon’s update workflow
  - Codebase changes are pushed to client's remote repo and then applied to each of the sites
  - Build step does not rely on 3rd party sources
  - No other special deployment instructions
- Currently supports Drupal 7 or WordPress 5.4 or above.

## Product Comparison Table

|                                              | Managed Updates Lite | Managed Updates Premium | Managed Updates Portfolio Upstreams | Description                                                                        |
|------------------------------                |--------------------- |------------------------ |------------------------------------ |----------------------------------------------------------------------------------- |
|Core, Plugin and Module Updates               | <Check/>             | <Check/>                | <Check/>                            | Code updates from publicly accessible repositories and sources are included.       |
|Regular Update Detection                      | <Check/>             | <Check/>                | <Check/>                            | Daily scans of official repositories to detect when updates are available.         |
|Visual Regression Testing                     | <Check/>             | <Check/>                | <Check/>                            | Visual regression testing for every environment through which changes are deployed.      |
|Custom Deployment Scheduling                  | <Check/>             | <Check/>                | ❌                                   | For use with individual sites (no Custom Upstreams or WP Site Networks). |
|Standalone Sites                              | <Check/>             | <Check/>                | ❌                                   |                                                                                    |
|Workflow Customization                        | ❌                    | <Check/>                | ❌                                   | Lite & Portfolio workflows cannot be customized.              |
|Remote Pull Requests to external repositories | ❌                    | <Check/>                | ❌                                   | Premium only: Pantheon can initiate pull requests to external repositories based on successful updates, that customers can accept at their own convenience.|
|Personalized Update Issue Remediation         | ❌                    | <Check/>                | ❌                                   | Supports customers who require additional assistance remediating identified issues.     |
|Headless Site Support                         | ❌                    | <Check/>                | ❌                                   | Headless sites may require additional front ends on the customer side to test against. |
|Composer Compatibility Support (For Drupal 8) | ❌                    | <Check/>                | N/A                                 | Use Premium for Composer built sites.                                               |
|Custom build/CI process                       | ❌                    | <Check/>                | ❌                                   | Use Premium to integrate Managed Updates with existing CI or build processes. |
|Patched Code Support                          | Excluded (Drupal 7)  | <Check/>                | Test and Deploy Only                |                                                                                    |
|Custom Visual Regression Testing              | ❌                    | <Check/>                | ❌                                   | VRT for authenticated pages or custom DOM elements.           |


## Requirements and Steps for Drupal 8 compatibility

In order to be supported by Pantheon Managed Updates, Drupal 8 sites should be in a "Composer-clean" state. This requires making sure that site’s codebase meets several criteria.

### Prerequisites

A Drupal 8 site using Managed Updates must:

- have build and deployment handled by Pantheon, not by an external CI/CD service,
- not include a `pantheon.upstream.yml` file in the codebase (unless it’s custom upstream), only `pantheon.yml`,
- use a [nested docroot](/nested-docroot) structure,
- be connected to the "[Empty drupal8](https://github.com/pantheon-systems/empty)" Pantheon upstream <Popover content="If the site is connected to a custom upstream, that upstream needs to use 'Empty drupal8'." />.
- have a code-structure based on the [Composer Drops-8 Example](https://github.com/pantheon-systems/example-drops-8-composer) project.

  <Accordion title="Convert your D8 site to the example Composer Drops-8 structure">

  1. Clone or download [example-drops-8-composer](https://github.com/pantheon-systems/example-drops-8-composer) locally. This will be your initial project folder.
  1. Remove the `.git` file (if present).
  1. Review the top-level `.gitignore` file. Make sure package installation paths are not ignored (`vendors`, `web/modules/contrib/`, `web/themes/contrib`, `web/core`). Make sure paths to user files are ignored (`web/sites/default/files`, `docroot/sites/default/files`).
  1. Rename the project in the top-level `composer.json` file to something matching the site name, for example: “client-org-name/site-name”.
  1. Clone the existing Pantheon site repo to the separate folder.
  1. Copy all of the existing site’s custom modules to `web/modules/custom/`.
  1. Copy all of the existing site’s custom themes to `web/themes/custom/`.
  1. Finally, take the `composer.json` file from site’s codebase and add all packages from "require" and "require-dev" sections to the new project’s `composer.json`. If there are duplicates, prefer versions from the example project, rather than from site.

  </Accordion>

Additionally:

- Drupal core shall be required as "`drupal/core-recommended`" package, not "`drupal/core.`".
- All Drupal modules should be required by Composer (via `composer.json`).
- Drupal Core, themes and modules should be locked to the exact versions currently installed on the Live environment. In `composer.json`, the "require" section should look like this for Drupal packages:

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
- Custom themes should be stored in web/themes/custom
- Local patches should be sourced from the `patches` directory in the project root.
- After removing the `vendor` directory, `composer.lock` file, `web/modules/contrib/*`, `web/themes/contrib/*`, and `web/core/*`, running `composer install` should run with exit status "0" (no errors).
- Composer-specific files and directories SHOULD NOT be included into .gitignore file.
- There should be no `.git` folders in the `modules` or `vendors` directories:
- `"topfloor/composer-cleanup-vcs-dirs": "^1.0"` should be required in the top-level `composer.json` file.
