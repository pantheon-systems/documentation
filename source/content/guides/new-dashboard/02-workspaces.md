---
title: The New Pantheon Dashboard
subtitle: Navigating Workspaces
description: Workspaces are a home base for your WebOps.
categories: [platform]
tags: [dashboard, webops, workflow]
contributors: [edwardangert,joa-pan]
reviewed: "2021-02-26"
layout: guide
showtoc: true
permalink: docs/guides/new-dashboard/workspaces
anchorid: new-dashboard
editpath: new-dashboard/02-workspaces.md
---

![A screenshot of a Workspace with a list of sites](../../../images/dashboard/new-dashboard/workspace.png)

## What is a Workspace?

[<dfn id="worksp">Workspaces</dfn>](/guides/new-dashboard) are the improved version of the Legacy Dashboards, with Pantheon features and actions that are conveniently available in one place.


### Create a New Workspace


#### Organization Workspace

To create a new Workspace from the Dashboard, click the Organization’s name and icon in the upper left of the Global Primary Navigation, and select **Create New Workspace** from the drop-down menu. 

![A screenshot of creating a Workspace](../../../images/dashboard/new-dashboard/create-workspace.png)

If you are creating the the Workspace for a web agency, you will be assigned a [Partner Trial Tier](https://pantheon.io/plans/partner-program). If the Workspace is not for an agency, you will be assigned a [Silver Tier Workspace](https://pantheon.io/plans/pricing).


### Switch Between Workspaces

If you're a member of multiple [Organizations](/organizations), you can stay logged in, and switch between Workspaces to work on personal projects or to work between Organizations.

Click the Organization’s name and icon in the upper left to switch between Workspaces:

![Workspace switcher shows a personal and Agency workspace](../../../images/dashboard/new-dashboard/workspaces-selector.png)

## Sites

The **<i className="fa fa-window-restore"></i> Sites** tab shows a table of all the Sites your user has access to within the current Workspace. Filter by Plan, Upstream, Status, or owner from the left, or use the buttons in the upper right to migrate an existing site or to create a new site.

Click a table heading to sort the table by that heading.


## Team

By default, all users are assigned the Administrator role after the Workspace is created.

Manage team members and assign [roles and permissions](/change-management#roles-and-permissions) in the dashboard. If you're working with a [Partner Agency](https://pantheon.io/plans/partner-program?docs), add them as a Supporting Organization.


## Autopilot

[Autopilot](/guides/autopilot) is Visual Regression Testing (VRT) for every WordPress and Drupal Site within your Workspace.

![A gif showing Autopilot visual regression testing](../../../images/dashboard/vrt.gif)

Once it's enabled, use it to visually compare changes to the site. Visit the [Autopilot documentation](/guides/autopilot) for more information.

## Upstreams

Create a new Workspace-specific [Custom Upstream](/custom-upstream) using a GitHub or Bitbucket repository. Custom Upstreams all you to use an external repository as a template for your site.

1. To add a custom Upstream in the Organization Workspace, select the **Upstream** tab. 
1. On the Custom Upstreams page click **Add New Upstream**. The Create New Custom Upstream page is displayed. 
1. Enter the URL of your GitHub or Bitbucket repository. URLs from the pantheon-systems GitHub workspace will not work.
1. Select the **Framework** and **Initial Connection Mode**.
1. Add the desired name and a description. Adding a description is optional.
1. Click **Save**.

After the Upstream has been added to your Dashboard, select from the list of available Custom Upstreams and click **Create Site From Upstream**. 

Click **More** in the Custom Upstream to edit or delete. After you click **Edit Settings** you are directed to the Upstream Settings page. Modify the page and click **Save**.

To delete, click **Delete Upstream** from the **More** drop-down menu. 

## Support

Chat with Pantheon Support or access and create new Support tickets.

## Settings

Use the **Settings** tab to modify the Workspace name, logo, billing information, and if your Organization is configured for it, billing terms and instructions for your team.
