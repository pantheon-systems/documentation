---
title: Chapter 7 - People
subtitle:
description: hello
certificationpage: true
type: certificationpage
layout: certificationpage
showtoc: true
tags: []
permalink: docs/certification/study-guide/chapter-7-people
contenttype: [guide]
innav: [false]
categories: []
cms: [drupal, wordpress]
audience: []
product: []
integration: [--]
---



<Alert title="Learning objectives for this chapter:"  type="info" >


**Running CMS Applications on Pantheon**

* Define the difference between Sites, Applications and Environments on Pantheon.
* Describe the different types of environments on Pantheon, and what each is typically used for.
* Implement Pantheon's Dashboard Security Tool as a way to lock down access to development progress on Multidev environments.

**Workspaces and Site Plans**

* List and Describe the different site plans available on Pantheon, and the resources associated with each type of plan.
* Describe the limitations of Pantheon's free tier Sandbox site plans.
* List the features that are available only in Professional Workspaces, but not in Personal Workspaces.
* List and Describe the permissions that are associated with the Workspace Administrator, Workspace Team Member, Workspace Developer and Workspace Unprivileged roles.
* List and Describe the WebOps features that are unlocked in the Professional Dashboard by upgrading to a Gold Plan.

**Domains on Pantheon**

* Provide recommendations around best practices for launching migrating an existing site with as little DNS-related downtime as possible.
* Describe the predictable pattern that governs Pantheon's platform domain system.
* Explain the benefits of setting a primary domain through the Pantheon dashboard.
* Describe the requirements for adding a custom domain in the Pantheon dashboard.

</Alert>


Pantheon provides a robust SaaS-based WebOps platform, built on an enterprise-grade application hosting infrastructure. In this section, we will delve into the process of running CMS applications on Pantheon, focusing on our approach to user permissions and security protocols that ensure both security and stability for your applications. We will also learn how Workspaces, Teams, and Sites work together to help you effortlessly leverage WebOps in your web application lifecycle.

In this section, you will learn about Sites and Environments on Pantheon, and you will learn how to create sites on Pantheon through the dashboard.

Pantheon supports Drupal and WordPress CMS applications, as well as JavaScript Front End Sites used in a decoupled configuration.
Workspaces, Teams, and Sites work together to help you organize and manage your sites.


## Workspaces

<Alert title="Learning objectives for this chapter:"  type="info" >

* List and describe the features and functionality accessible through the Personal Workspace.
* List and describe the features and functionality accessible through the Professional Workspace.
* List and describe the WebOps features that are unlocked in the Professional Dashboard by upgrading to a Gold Plan.

</Alert>

Workspaces bring together sites, teams and features, simplifying the management of large numbers of sites. There are two types of Workspaces on Pantheon: Personal and Professional.

The **Personal Workspace** displays tools for the sites you own (or are a team member of), your account plan, and billing for sites you own. You have only one Personal Workspace.

* Every Pantheon user is assigned one Personal Workspace.
* All sites you have created, as well as individual sites from other Workspaces you've been invited to collaborate on, will be in your Personal Workspace.
* Collaboration features such as Multidev and Custom Upstreams are not available in Personal Workspaces. To access these features, you need a Professional Workspace.

**Professional workspaces** bring together users and sites to allow administrators to effectively manage a large number of sites.

* You may be a member of more than one Professional Workspace, and can switch between your Personal and Professional Workspace at any time.
* When you first create a Professional Workspace, it is created with a Silver Account plan, which gives you access to the basic capabilities of the Pantheon Platform. 
* To take advantage of features such as Multidev, Custom Upstreams, and Autopilot, you'll want to upgrade the Workspace to a Gold plan.

### Personal Workspace

We will start by exploring the **Personal Workspace**, which is what you see after you log in.

The Personal Workspace displays tools for the sites you own (or are a team member of), your account plan, and billing for sites you own. You have only one Personal Workspace.

The Home Page of your Personal Workspace contains the following information: Workspace type, Sites, Account tier, and Sandbox sites used (fig. 5.1 todo)

**todo image**

#### Tabs in your Personal Workspace



The navigation bar on the left contains several additional tabs to help you manage your sites (fig. 5.2 todo):

**todo image**

* **Sites: **Add a new site, view sites you're a team member of, and check how many free sites you have remaining. Return to this page by clicking the Pantheon logo.
    * **Create New Site:** Start the process of creating a new site on Pantheon. New sites will appear under the Sites tab.
    * **Migrate Existing Site:** Start a guided migration to add a site. If you’re importing a site from your local environment, follow our manual migration process. For information about migrating a site from a competitor, or other migration scenarios, refer to Migrate Sites to Pantheon on our Get Started page.
* **Team:** If you belong to a Workspace, you’ll see it listed here. Click the Workspace name to view the Workspace's dashboard.
* **Autopilot:** Autopilot is Visual Regression Testing (VRT) for every WordPress and Drupal Site within your Workspace.
* **Support:** View details of an open support request or create a new support request. Our chat-based support is available 24-hours a day.
* **Custom Upstreams: **Create a new Workspace-specific Custom Upstream using a GitHub or Bitbucket repository. Custom Upstreams allow you to use an external repository as a template for your site.

**Settings:** Modify the Workspace name, logo, billing information, and if your Organization is configured for it, billing terms and instructions for your team.

For more information, see [https://docs.pantheon.io/guides/quickstart/user-dashboard/](https://docs.pantheon.io/guides/quickstart/user-dashboard/).

**Professional Workspace**

**Professional workspaces** bring together users and sites to allow administrators to effectively manage a large number of sites.

The navigation bar on the left contains several additional tabs to help you manage your sites (fig 5.3 todo):

**todo image**


* **Home: **The home page of a Workspace contains information related to your workspace, such as the number of sites, sites recently added, and more.
* **Sites:** Add a new site, view sites you're a team member of, and check how many free sites you have remaining.
* **Team: **Invite people to work on sites in this Workspace.
* **Autopilot: **Autopilot is Visual Regression Testing (VRT) for every WordPress and Drupal Site within your workspace.
* **Edge: **Advanced Global CDN offers a suite of edge capabilities ensuring your sites are fast, reliable, and secure. Our specialists help you optimize your site performance for maximum uptime.
* **Support: **View details of an open support request or create a new support request. Our chat-based support is available 24-hours a day.
* **Custom Upstreams*:** Create a new workspace-specific Custom Upstream using a GitHub or Bitbucket repository. Custom Upstreams allow you to use an external repository as a template for your site. (*This tab is exclusively available through the Professional Workspace )
* **Settings:** Modify the workspace name, logo, billing information, and if your Workspace is configured for it, billing terms and instructions for your team.



