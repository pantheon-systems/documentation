---
title: The New Pantheon Dashboard
subtitle: Introduction
description: The new Pantheon Dashboard makes it easier to manage your WebOps from one Workspace fast.
categories: [platform]
tags: [dashboard, webops, workflow]
contributors: [edwardangert,joa-pan]
reviewed: "2021-02-26"
layout: guide
permalink: docs/guides/new-dashboard
anchorid: new-dashboard
editpath: new-dashboard/01-introduction.md
---

The new Pantheon Dashboard is WebOps in a single, fast Workspace. Easily visualize and manage sites, users, traffic, metrics, visual regression testing (VRT), and everything else to keep your developer experience smooth and uneventful.


## Get Access

Want to try the New Dashboard?

Click **Try the New Dashboard** in the User or Organization Dashboard to access the new Dashboard. 

![A screenshot of the Switch to New Dashboard button](../../../images/dashboard/new-dashboard/try-new-dashboard.png)

Alternatively, you can navigate to your existing Dashboard, then add `/workspace/` between `pantheon.io` and your [UUID](/glossary#uuid). For example: `pantheon.io/workspace/de305d54-75b4-431b-adb2-eb6b9e546014`. You'll be immediately directed to the default Workspace on the New Dashboard. Click **Sites** on the left to access the Sites view.

<Alert title="Limited Availability" type="info" icon="leaf">

The New Dashboard is available as a Limited Availability feature release while additional features are in active development. Pantheon engineers are rolling out new functionality often.

</Alert>

## Features of the New Dashboard

### Autopilot

[Autopilot](https://pantheon.io/autopilot?docs) tracks and implements changes, and alerts you if something looks off. See the [Autopilot](/guides/autopilot) documentation to learn how to use Autopilot to handle your WebOps.

### Pantheon Support

The same great [Support](/guides/support) you already love. The New Dashboard makes it easier to find the right resources, whatever your question is, wherever you are in your Workspace.

To stick with the old Dashboard, click on the banner at the top of the page to opt out.

![A screenshot of the new Dashboard homepage with Workspace Overview](../../../images/dashboard/new-dashboard/revert-to-old-dashboard.png)

## Sites

Select the **Sites** tab in the left-navigation menu to search for a Site, migrate an existing Site, or create a new Site. 

### Create a New Site

You can create a new Site from the new Dashboard homepage, by clicking **Sites** on the left navigation. 

1. Click **+ Create New Site**. 

1. Choose what type of CMS Site you want to create and you will be brought to the **Create Your Pantheon Site** page:

  ![Create Your Pantheon Site page](../images/dashboard/create-pantheon-site.png)

1. Name the site.

  <Alert title="Note" type="info">

  The site name will be prefixed to all [Platform URLs](/domains/#platform-domains), which are automatically configured as subdomains of `pantheonsite.io`.

  This name cannot be changed once set.

  </Alert>

1. Optionally, if you have access to [organizations](/organization-dashboard/#new-sites), choose an organization to affiliate the site with.

1. Choose a [Region](/regions) for the Site.

1. Click **Continue** and wait while the platform provisions the site with the start state you selected > Click **Visit your Pantheon Site Dashboard** once complete.

## Utility Navigation

Your user icon, Gravatar, or <i className="fa fa-user-circle"></i> by default, gives you quick access to your User Settings and information about who you're logged in as.

### Home

On the homepage, you have access to an overview of the Workspace that provides the following information:

<TabList>

<Tab title="Personal Workspace" id="personal-workspace" active={true}>

* Workspace type
* Sites
* Account tier
* Sandbox sites used 

![A screenshot of the new Dashboard homepage with Workspace Overview](../../../images/dashboard/new-dashboard/workspace-overview.png)

</Tab>

<Tab title="Organization Workspace" id="organization-workspace">

* Workspace type
* Team members
* Sites
* Account tier

</Tab>
</TabList>

### Workspaces

Each Workspace is a portal for all your Site and Organization WebOps needs.

Switch between Workspaces to manages each one's Sites, Users, Upstreams, and settings.