---
title: Workspaces, Sites, and Teams
subtitle: Introduction
description: Learn about Workspaces, Sites, and Teams.
tags: [workspaces, sites, teams]
contributors: [wordsmither]
showtoc: true
permalink: docs/guides/account-mgmt/workspace-sites-teams
editpath: docs/guides/account-mgmt/workspace-sites-teams/01-introduction.md
reviewed: "2022-09-19"
contenttype: [guide]
innav: [true]
categories: [organizations]
cms: [--]
audience: [sysadmin]
product: [--]
integration: [--]
---

Workspaces, Sites, and Teams work together to help you organize and manage your sites.

## Definitions

- **Sites** are the individual web sites with their own unique domains. You can have one site or hundreds.
- **Teams** are groups of people who can work on the sites.  Team members can be associated with a group of sites, or a single site.
- **Workspaces** bring together sites, teams and features, simplifying the management of large numbers of sites.

## Enterprise vs. Self-Serve Customers

Workspace behavior differs depending on the type of customer you are.

### Enterprise Customers (aka Contract Customers)

Enterprise customers are those who purchase Pantheon services through a traditional purchase order and services contract method, working with a Pantheon salesperson. Most large organizations purchase Pantheon services this way.

When you sign a contract, we create a Professional Workspace for you, attached to your billing ID.  This Workspace will contain all your sites (in this example, we've named it "All Sites"). When you log in, you will see the following Workspaces, Sites, and Teams:

|   | Personal Workspace  | All Sites Workspace  |
|---|---|---|
| **Sites Tab** | Sites you have access to |  All sites your organization maintains |
| **Teams Tab** | A message to create a Professional Workspace  | Team members that have access to all sites |

You can create as many Professional Workspaces as you like. Use additional Professional Workspace to organize teams and the sites they should have access to. Professional Workspaces you create cannot contain new sites; they are a place to assign existing sites to teams, much like a playlist contains songs you select from your music library..

For example, let's say you have both WordPress and Drupal sites, and you want your WordPress developers to only see the WordPress sites, and your Drupal developers to only see the Drupal Sites.  To do so, [create a Professional Workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#create-a-professional-workspace) for your Drupal developers, and another for your WordPress developers, then [invite the appropriate team members](/guides/account-mgmt/workspace-sites-teams/teams#add-a-user).  You now have the following Workspaces:

|   | Personal | All Sites Workspace | Drupal Devs Workspace | WordPress Devs Workspace |
|---|---|---|---|---|
| **Sites Tab** | Sites you have access to | All sites your organization maintains | Sites to which this workspace was added as a Supporting Workspace.  | Sites to which this workspace was added as a Supporting Workspace. |
| **Teams Tab** | n/a | Team members that have access to all sites | Drupal developers  | WordPress developers  |

Now, whenever you create a site, you can [add the Drupal Devs or WordPress Devs as a Supporting WorkSpace](/guides/account-mgmt/workspace-sites-teams/teams#add-a-supporting-workspace-to-site), and those developers will only see those sites.

### Self-Serve Customers

Self Serve customers are those who purchase Pantheon services online with a credit card—typically individuals or small businesses purchase Pantheon services this way.

When you sign up, you will have a Personal Workspace, and can create as many Professional Workspaces as you like.  All of these Professional Workspaces can contain sites and teams, and you can organize them any way you like.

The most important thing to remember is an Account Plan is assigned to a specific Workspace, and only sites that have added that Workspace as a supporting organization will have access to the features of your Account Plan. For example, if you have purchased a Gold Account Plan for a given Workspace, only sites that  have that Workspace as a supporting organization will have access to [Multidev](/guides/multidev), [Custom Upstreams](/guides/custom-upstream), and [Autopilot](/guides/autopilot).

Here are some examples of ways you might organize your sites:

1. Create all your sites in a single Professional Workspace, then create additional Workspaces with team members that will be added as Supporting Workspaces to individual sites. 

    |   | Personal | All Sites Workspace | Drupal Devs Workspace | WordPress Devs Workspace |
    |---|---|---|---|---|
    | **Sites Tab** | Sites you have access to | Contains all sites your organization maintains | Sites to which this workspace was added as a Supporting Workspace.  | Sites to which this workspace was added as a Supporting Workspace. |
    | **Teams Tab** | n/a | Team members that have access to all sites | Drupal developers  | WordPress developers  |

1. Create a Workspace for each CMS, creating sites using that CMS in each, and adding developers specific to each CMS to each. This differs from the first example in that the WordPress and Drupal Workspaces do *not* have to be added as Supporting Workspaces to individual sites - the team members automatically have access to all sites in that Workspace.

    |   | Personal | WordPress Sites Workspace | Drupal Sites Workspace |
    |---|---|---|---|
    | **Sites Tab** | Sites you have access to | Sites built using WordPress | Sites built using Drupal. |
    | **Teams Tab** | n/a | WordPress Developers | Drupal Developers  |

1. Create one Professional Workspace with a Gold Account plan for sites that require Autopilot and Custom Upstreams (among other features), and another Professional Workspace with a Silver Account plan for those sites that don't.

    |   | Personal | Silver Account Workspace | Gold Account Workspace |
    |---|---|---|---|
    | **Sites Tab** | Sites you have access to | Sites with basic functionality | Sites with access to Autopilot, Custom Upstreams, or Multidev. |
    | **Teams Tab** | n/a | Team members that can work on these sites | Team members that can work on these sites  |

1. Create a Workspace for each department which contains the site(s) that department maintains, and invite any department staff that should have access to the site to the team.

    |   | Personal | Math Department Workspace | Athletics Department Workspace |
    |---|---|---|---|
    | **Sites Tab** | Sites you have access to | Math Department site | Football site, Basketball site, Baseball site, etc. |
    | **Teams Tab** | n/a | Math Department members | Athletics site developers  |

Now let's learn how to work with Workspaces, Sites, and Teams.
