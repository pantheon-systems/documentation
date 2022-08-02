---
title: Pantheon Decoupled
subtitle: 
description: 
categories: [platform]
tags: [webops, workflow, decoupled]
contributors: [joa-pan]
type: guide
layout: guide
showtoc: true
anchorid: site
permalink: docs/guides/decoupled-sites/site
editpath: decoupled-sites/04-site.md
reviewed: "2022-07-31"
---

# Before You Begin

You should have access to the Early Access Customer checklist provided during onboarding. 

You should have the **Decoupled** tab enabled in your dashboard. 

To begin using Pantheon Decoupled, ensure you meet the following prerequisites:

* Your site repository is in GitHub.

* You have a domain to use for the decoupled site.

* You will use Next.js or Gatsby as the Frontend framework.

* (Optional) You are using Drupal 9 or WordPress for the CMS.

* (Optional) If using a preconfigured starter kit template, you will use one of the following combinations:

    * Drupal 9 and Next.js

    * WordPress and Gatsby

    NOTE: Other configurations are not currently supported. 


## Compatibility

You can create an application from scratch by importing a repository or you can use our the Pantheon starter kit templates to develop a decoupled site. 
Use the starter kits to create a server side render

* Server side render applications: Next.js and Drupal

* Static site generated site: Gatsby and WordPress




# Site Setup

Pantheon Decoupled is available in the New Dashboard, when it is enabled during the customer onboarding process. To access it Pantheon Decoupled follow the following steps:

1. Log in to your Pantheon Dashboard and navigate to the **Sites** page.

1. Select **Sites** in the the New Dashboard. 

1. Click the **Decoupled** tab to view the Early Access offering. 

1. Click **+Create New Site** in the New Dashboard under the **Decoupled** tab to begin your decoupled journey. 

Under the Decoupled Site section on the Site Creation page, click the option that best suits your needs. Ensure you are using compatible versions for the associated tooling before you proceed (e.g. Drupal 9, Next.js v12, etc.) 
 

# Connect your Account

1. To start you will need to specify the GitHub account associated with your decoupled site. After you select the decoupled site option that best suits your needs, you will be prompted to connect your Git provider. 

1. Select the GitHub option and click Connect. A window for GitHub.com is displayed, and you are prompted “Where do you want to install Pantheon”. 

1. Select the repository that you will use to develop your decoupled site. A new page is displayed that confirms where Pantheon should be installed. 

1. Specify the permission configurations and click Install. Your GitHub repository is now connected and you can continue with decoupled site creation on the Pantheon dashboard. 



# Create a Site by Importing a Repository

Import the Repository
Connect to your Git provider and select an existing repository.


## Prerequisites

* You are using a Git repository.

* The repository should not be empty.

* The repository needs to contain only one of the following files:

    * `package-lock.json`

    * `yarn.lock`


## Procedure

To connect your GitHub repository, click **Import Repository** on the _What kind of site are you creating?_ page.

1. If you have not already connected your GitHub account, follow the steps in the [Connect your Account]() section. Otherwise, if your GitHub account is already connected you can proceed to the next step and select your Git provider.

1. Select a Git provider from the **Choose your Git provider** options and click **Continue**.

1. Select your desired GitHub account from the GitHub Account dropdown.

1. Choose the repository name from the Select Repository dropdown and click **Continue**.

1. Add to the General Info section.

    * Specify the Site Name: The site name is the title of your site. You can edit the site name in **Settings** after creation. 

    * Select the Frontend Framework. You can choose either Next.js or Gatsby as the static site generator.

1. (Optional) Link your CMS.

    NOTE: If you are using a specified CMS, you can link your CMS backend and the site environment from which to source content. However, this is more applicable when using the Decoupled starter kit templates.

1. Ensure **Make this a private repository** is selected.

1. (Optional) Add configurations.

    * You can add specifications to help manage you r root directory, build settings, and set environment variables. 

    * You can set the Environment Variables in the Advanced Setting section. 

    > NOTE: Basic builds will function without setting environment variables if the CMS site was selected during decoupled site creation. Environment variables are not necessary for optional features like preview.

1. Click **Continue**.

You are directed to a new page with the site name, deployment, and build information/ status. You will receive a message that you decoupled site has successfully been added to Pantheon. You can view the build log by clicking **Build Details**