---
title: Drupal Migration Guides
tags: [code, launch, migrate, site, updates, composer, D8, D9, D10]
reviewed: "2022-12-13"
contenttype: [doc]
categories: [create, plan]
newcms: [drupal]
audience: [development]
product: [--]
integration: [--]
---

Drupal includes many of the familiar features and layout introduced in Drupal 8, and removes deprecated code to help improve future Drupal development.

Learn how to migrate your site to Drupal, or upgrade to Drupal from another platform.

## Upgrade to the Latest Version of Drupal on the Pantheon Platform

| <i class="fa fa-wrench"></i><br/>How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> | <i class="fa fa-exclamation-circle"></i><br/>Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> | <i class="fa fa-book"></i><br/>Upgrade Guide |
|---|---|---|
| Build Tools | -- | [Migrate a Site That Was Created with Build Tools to the Latest Version of Drupal](/guides/drupal-hosted-createbt) |
| Custom Upstream | -- | [Migrate a Custom Upstream to the Latest Version of Drupal](/guides/drupal-hosted-createcustom) |
| Empty Upstream | Multidev | [Migrate a Site That Was Created with an Empty Upstream to the Latest Version of Drupal](/guides/drupal-hosted-createempty-md) |
| Dashboard | -- | [Migrate a Drupal 8 Site to the Latest Version of Drupal](/guides/drupal-hosted) |
| Dashboard | Multidev | [Migrate a Drupal 8 Site with Multidev to the Latest Version of Drupal Using Multidev](/guides/drupal-hosted-md) |
| Dashboard | Drupal version set to 8 | [Migrate a Site Created With the Pantheon Dashboard to the Latest Version of Drupal](/guides/drupal-hosted-createdashboard-set8) |
| Dashboard | Needs Build Tools Workflow | [Migrate a Site That Needs a Build Tools Workflow to the Latest Version of Drupal + Build Tools](/guides/drupal-hosted-btworkflow) |
| Dashboard | Created using drupal-project or drupal-recommended upstream | [Migrate a Site That Was Created Using a Deprecated Upstream to Drupal latest](/guides/drupal-hosted-deprecated-upstream) |


## Moving to Drupal From Another Platform

| <img src="../images/composer-logo.svg" width="16"/><br/>Composer Managed? | <i class="fa fa-book"></i><br/>Upgrade Guide |
|---|---|
| No | [Migrate a Drupal Site from Another Platform](/guides/drupal-unhosted) |
| Yes | [Migrate a Composer Managed Drupal Site from Another Platform](/guides/drupal-unhosted-composer) |


## Related Documents

- [Composer Fundamentals and Workflows](/guides/composer)
- [Integrated Composer Overview](/guides/integrated-composer)
- [Pantheon YAML Configuration Files](/pantheon-yml)
- [Composer Conversion Guide](/guides/composer-convert)
