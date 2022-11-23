---
title: Drupal 9 Migration Guides
tags: [code, launch, migrate, site, updates, composer]
reviewed: "2021-05-13"
newtype: doc
categories: [create, plan]
newcms: [drupal9]
audience: [development]
product: [--]
integration: [--]
---

Drupal 9 includes many of the familiar features and layout introduced in Drupal 8, and removes deprecated code to help improve future Drupal development.

Learn how to migrate your site to Drupal 9, or upgrade to Drupal 9 from another platform.

## Upgrade to Drupal 9 on the Pantheon Platform

| <i class="fa fa-wrench"></i><br/>How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> | <i class="fa fa-exclamation-circle"></i><br/>Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> | <i class="fa fa-book"></i><br/>Upgrade Guide |
|---|---|---|
| Build Tools | -- | [Migrate a Site That Was Created with Build Tools to Drupal 9](/guides/drupal-9-hosted-createbt) |
| Custom Upstream | -- | [Migrate a Custom Upstream to Drupal 9](/guides/drupal-9-hosted-createcustom) |
| Empty Upstream | Multidev | [Migrate a Site That Was Created with an Empty Upstream to Drupal 9](/guides/drupal-9-hosted-createempty-md) |
| Dashboard | -- | [Migrate a Drupal 8 Site to Drupal 9](/guides/drupal-9-hosted) |
| Dashboard | Multidev | [Migrate a Drupal 8 Site with Multidev to Drupal 9 Using Multidev](/guides/drupal-9-hosted-md) |
| Dashboard | Drupal version set to 8 | [Migrate a Site Created With the Pantheon Dashboard to Drupal 9](/guides/drupal-9-hosted-createdashboard-set8) |
| Dashboard | Needs Build Tools Workflow | [Migrate a Site That Needs a Build Tools Workflow to Drupal 9 + Build Tools](/guides/drupal-9-hosted-btworkflow) |
| Dashboard | Created using drupal-project or drupal-recommended upstream | [Migrate a Site That Was Created Using a Deprecated Upstream to Drupal 9](/guides/drupal-9-hosted-deprecated-upstream) |


## Moving to Drupal 9 From Another Platform

| <img src="../images/composer-logo.svg" width="16"/><br/>Composer Managed? | <i class="fa fa-book"></i><br/>Upgrade Guide |
|---|---|
| No | [Migrate a Drupal 9 Site from Another Platform](/guides/drupal-9-unhosted) |
| Yes | [Migrate a Composer Managed Drupal 9 Site from Another Platform](/guides/drupal-9-unhosted-composer) |


## Related Documents

- [Composer Fundamentals and Workflows](/guides/composer)
- [Integrated Composer Overview](/guides/integrated-composer)
- [Pantheon YAML Configuration Files](/pantheon-yml)
- [Composer Conversion Guide](/guides/composer-convert)
