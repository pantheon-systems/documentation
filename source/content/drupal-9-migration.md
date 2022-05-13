---
title: Drupal 9 Migration Guides
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
reviewed: "2021-05-13"
---

Drupal 9 includes many of the familiar features and layout introduced in Drupal 8, and removes deprecated code to help improve future Drupal development.

## Choose Your Upgrade Path

To use this table, find the row whose column values best describe your current and desired state, then select the upgrade guide on the right.

For example:

- If your site is currently hosted with Pantheon, and was created using Build Tools, use the guide in the first row, "Migrate a Site That Was Created with Build Tools to Drupal 9".

- If your site is hosted elsewhere, and is Composer-managed, use the guide in the last row, "Migrate a Composer Managed Drupal 9 Site from Another Platform".

| <i class="fa fa-cloud"></i><br/>Current Host | <i class="fa fa-wrench"></i><br/>How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> | <i class="fa fa-exclamation-circle"></i><br/>Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> | <i class="fa fa-book"></i><br/>Upgrade Guide                                                                     |
|:--------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------:|
| Pantheon                                     | Build Tools                                                                                                                                       | --                                                                                                                                                                                        | [Migrate a Site That Was Created with Build Tools to Drupal 9](/guides/drupal-9-hosted-createbt)                 |
| Pantheon                                     | Custom Upstream                                                                                                                                   | --                                                                                                                                                                                        | [Migrate a Custom Upstream to Drupal 9](/guides/drupal-9-hosted-createcustom)                                    |
| Pantheon                                     | Empty Upstream                                                                                                                                    | Multidev                                                                                                                                                                                  | [Migrate a Site That Was Created with an Empty Upstream to Drupal 9](/guides/drupal-9-hosted-createempty-md)     |
| Pantheon                                     | Dashboard                                                                                                                                         | --                                                                                                                                                                                        | [Migrate a Drupal 8 Site to Drupal 9](/guides/drupal-9-hosted)                                                   |
| Pantheon                                     | Dashboard                                                                                                                                         | Multidev                                                                                                                                                                                  | [Migrate a Site with Multidev to Drupal 9](/guides/drupal-9-hosted-md)                                           |
| Pantheon                                     | Dashboard                                                                                                                                         | Drupal 8                                                                                                                                                                                  | [Migrate a Site Created With the Pantheon Dashboard to Drupal 9](/guides/drupal-9-hosted-createdashboard-set8)   |
| Pantheon                                     | Dashboard                                                                                                                                         | Needs Build Tools Workflow                                                                                                                                                                | [Migrate a Site That Needs a Build Tools Workflow to Drupal 9 + Build Tools](/guides/drupal-9-hosted-btworkflow) |
| Pantheon                                     | Dashboard                                                                                                                                         | Created before 11/2021                                                                                                                                                                    | [Migrate a Site That Was Created Before November 2011 to Drupal 9](/guides/drupal-9-hosted-pre112021)            |
| Elsewhere                                    | n/a                                                                                                                                               | --                                                                                                                                                                                        | [Migrate a Drupal 9 Site from Another Platform](/guides/drupal-9-unhosted)                                       |
| Elsewhere                                    | n/a                                                                                                                                               | Composer Managed                                                                                                                                                                          | [Migrate a Composer Managed Drupal 9 Site from Another Platform](/guides/drupal-9-unhosted-composer)             |

## Related Documents

- [Composer Fundamentals and Workflows](/guides/composer)
- [Integrated Composer Overview](/guides/integrated-composer)
- [Pantheon YAML Configuration Files](/pantheon-yml)
- [Composer Conversion Guide](/guides/composer-convert)
