---
title: Workspaces, Sites, and Teams
subtitle: Introduction
description: Learn how Workspaces, Sites, and Teams work together to help you manage your sites.
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

- **Sites** are exactly what you think they are - individual web sites with their own unique domain. You can have one site or hundreds.
- **Teams** are groups of people who can work on the sites.  Team members can be associated with a group of sites, or a single site.
- **Workspaces** are what bring it all together.  There are two types of Workspaces: Personal Workspaces (displays tools for the sites you own, or are a team member of, your account plan, and billing for sites you own), and Professional Workspaces ( which bring together sites, teams and features, simplifying the management of large numbers of sites).

## Enterprise vs. Credit Card Customers

Workspace functionality differs depending on how the type of customer you are.

### Enterprise Customers (aka Contract Customers)

Contract customers are those who have signed a contract with Pantheon.

When you sign a contract, we create a Professional Workspace for you, attached to your billing ID.  This Workspace will contain all your sites. When you log in, you will see the following Workspaces, Sites and Teams:

|   | Personal Workspace  | All Sites Workspace  |
|---|---|---|
| **Sites Tab** | Sites you have access to |  Contains all sites your organization maintains |
| **Teams Tab** | n/a  | Team members that have access to all sites |

While you can create additional Professional Workspaces, those Workspaces can only be used for team management, and cannot contain any sites. 

For example, let's say you have both WordPress and Drupal sites, and you want your WordPress developers to only see the WordPress sites, and your Drupal developers to only see the Drupal Sites.  To do so, [create a Professional Workspaces](/guides/account-mgmt/workspace-sites-teams/workspaces#create-a-professional-workspace) for your Drupal developers, and another for your WordPress developers, then [invite the appropriate team members](http://localhost:8000/guides/account-mgmt/workspace-sites-teams/teams#add-a-user).  You now have the following Workspaces:

|   | Personal | All Sites | Drupal Devs | WordPress Devs |
|---|---|---|---|---|
| **Sites Tab** | Sites you have access to | Contains all sites your organization maintains | No sites  | No Sites |
| **Teams Tab** | n/a | Team members that have access to all sites | Drupal developers  | WordPress developers  |

Now, whenever you create a site, you can [add the Drupal Devs or WordPress Devs as a Supporting WorkSpace](/guides/account-mgmt/workspace-sites-teams/teams#add-a-supporting-workspace-to-site), and those developers will only see those sites.

### Programmatic Customers

Programmatic customers are those who signed up individually for a Pantheon Account, and are paying via a credit card.

When you sign up, you will have a Personal Workspace, and can create as many Professional Workspaces as you like.  All of these Professional Workspaces can contain sites and teams, and you can organize them any way you like.  

The most important thing to remember is that Account Plans are associated with the Workspace.  So, if you have a Workspace with with a Silver Plan, and one with a Gold Plan, only sites in the Gold Plan Workspace will have access to [Multidev](/guides/multidev), [Custom Upstreams](/guides/custom-upstream), and [Autopilot](/guides/autopilot).

Here are some examples of ways you might organize your sites:
- Create all your sites in a single Professional Workspace, then create additional Workspaces with team members that can be added to individual sites. 

    |   | Personal | All Sites | Drupal Devs | WordPress Devs |
    |---|---|---|---|---|
    | **Sites Tab** | Sites you have access to | Contains all sites your organization maintains | No sites  | No Sites |
    | **Teams Tab** | n/a | Team members that have access to all sites | Drupal developers  | WordPress developers  |

- Create one Professional Workspace with a Silver Account plan for sites that don't require collaboration features, and another Professional Workspace with a Gold Account plan for those sites that do.

    |   | Personal | Silver Account Workspace | Gold Account Workspace |
    |---|---|---|---|
    | **Sites Tab** | Sites you have access to | Sites with basic functionality | Sites that require Autopilot, Custom Upstreams, or Multidev. |
    | **Teams Tab** | n/a | Team members that can work on these sites | Team members that can work on these sites  |

- Create a Workspace for each CMS, creating sites using that CMS in each and adding developers specific to each CMS to each.

    |   | Personal | WordPress Sites Workspace | Drupal Sites Workspace |
    |---|---|---|---|
    | **Sites Tab** | Sites you have access to | Sites built using WordPress | Sites built using Drupal. |
    | **Teams Tab** | n/a | WordPress Developers | Drupal Developers  |

- Create a Workspace for each department which contains the site(s) that department maintains, and invite any department staff that should have access to the site to the team.
  
    |   | Personal | Math Department Workspace | Athletics Department Workspace |
    |---|---|---|---|
    | **Sites Tab** | Sites you have access to | Math Department site | Football site, Basketball site, Baseball site, etc. |
    | **Teams Tab** | n/a | Math Department members | Athletics site developers  |

Now let's learn how to work with Workspaces, Sites and Teams.
