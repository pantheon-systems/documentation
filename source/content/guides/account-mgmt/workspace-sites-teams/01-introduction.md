---
title: Workspaces, Sites, and Teams
subtitle: Key Concepts
description: Learn how Workspaces, Sites, and Teams work together to help you manage your sites.
tags: [workspaces, sites, teams]
contributors: [wordsmither]
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

Workspaces, Sites, and Teams work together to help you organize and manage your sites.  But before you set this all up, there some key concepts that can help you plan your organization.

## Workspaces, Sites and Features

There are two types of workspaces:

<TabList>

<Tab title="Personal Workspace" id="personal-workspace" active={true}>

The Personal Workspace displays tools for the sites you own, or are a team member of, your account plan, and billing for sites you own.  You have only one Personal Workspace. Learn more about workspaces in the [Accounts](/guides/account-mgmt/account) guide.

- Every Pantheon user is assigned one Personal Workspace. 
- All the sites you have created, as well as individual sites from other organizations you've been invited to collaborate on, will be in your Personal Workspace. 
- You can use a Personal Workspace for your own projects, and for visibility into sites from other organizations you are working with.
- WebOps collaboration features such as [Multidev](/guides/multidev) and [Custom Upstreams](/guides/custom-upstream) are not available in Personal Workspaces. To access these features, you need a [Professional Workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#create-a-professional-workspace). 

</Tab>

<Tab title="Professional Workspace" id="professional-workspace">

Professional workspaces bring together users and sites to allow administrators to effectively manage a large number of sites. Keep in mind, you can be a member of multiple professional workspaces at the same time.

You can create a Professional Workspace as the home for an organization’s sites and the teams working on them. 

- Creating a Professional Workspace is free. 
- Access to the collaboration features below are available to sites owned by Gold Workspaces or above:
	- [Multidev](/guides/multidev)
	- [Custom Upstreams](/guides/custom-upstream)
	- [Autopilot](/guides/autopilot)
- You can create any number of Professional Workspaces. 
- You may be a member of more than one Professional Workspace, and can switch between your Personal and Professional Workspace at any time.

</Tab>

</TabList>

In addition, each site has it's own Site Dashboard, with access to features specific to that site.  To clarify, this table shows what features exist in Workspaces and Sites, and how they may function differently.

| Feature          | Personal Workspace | Professional Workspace | Site Dashboard |
| ---------------- | ------------------ | ---------------------- | -------------- |
| Create Site      | Yes - but can only be worked on by the account owner.               | Yes, and can be worked on by any members of the Workspace Team.                    | No             |
| Develop Site     | No                 | No                     | Yes            |
| Add Team Members | No                 | Yes - all team members will have access to all sites in the Workspace, or to sites to which the Workspace is associated as a Supporting Workspace.                   | Yes - to this site only           |
| Autopilot        | No                 | Yes                    | No             |
| Edge             | No                 | Yes                    | No             |
| Upstreams        | No                 | Yes                    | No             |
| Solr             | No                 | No                     | Yes            |
| Redis            | No                 | No                     | Yes            |
| Billing          | No                 | Yes - for all sites in this Workspace                   | Yes - for this site only           |

## The Workspace and Account Plan Relationship

When you first create a Professional Workspace, it is created with a Silver Account plan, which gives you access to the basic capabilities of the Pantheon Platform.  To take advantage of features such as [Multidev](/guides/multidev), [Custom Upstreams](/guides/custom-upstream), and [Autopilot](/guides/autopilot), you'll want to [upgrade the Workspace to a Gold plan](/guides/account-mgmt/plans/workspace-plans).  

<Alert title="Important" type="danger" >

Every Workspace that is upgraded to Gold or higher is billed as another plan/subscription.

</Alert>

## 

Because these features are specific to a Workspace and affect your billing, you'll need to carefully consider how you define your Workspaces.  



Read on to better understand the specifics of setting up your workspaces, sites, and teams.
