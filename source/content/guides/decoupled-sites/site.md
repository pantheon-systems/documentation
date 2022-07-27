---
title: Pantheon Decoupled
subtitle: 
description: 
categories: [platform]
tags: [webops, workflow, decoupled]
contributors: [joa-pan]
reviewed: "2021-07-31"
layout: guide
showtoc: true
permalink: docs/guides/decoupled/
anchorid: 
editpath: 
---


# Before You Begin

You should have access to the Early Access Customer checklist provided during onboarding. To begin using Pantheon Decoupled, ensure you meet the following prerequisites:

* Your repository is in GitHub.

* You have a domain to use for the decoupled site.

* You will use Next.js or Gatsby as the Frontend framework.

* (Optional) You are using Drupal 9 or WordPress for the CMS.

* (Optional) If using a preconfigured starter kit template, you will use one of the following combinations:

    * Drupal 9 and Next.js

    * WordPress and Gatsby

    Note: Other configurations are not currently supported. 




Pantheon Decoupled is available through the New Dashboard. To access it log in to your Pantheon Dashboard and Navigate to the Sites page. 

Select the Sites tab in the the New Dashboard. 

Click the Decoupled tab to view the Early Access offering. 

Click +Create New Site on the New Dashboard  homepage to begin your decoupled journey. 


Create an application from scratch using Importing a repository or you can use our starter kit template for:

Drupal + Next.js

Wordpress + Gatsby

Under the Decoupled Site section on the Site Creation page, click the option that best suits your needs. Ensure you are using compatible versions for the associated tooling before you proceed (e.g. Drupal 9, Next.js v12, etc. ) Refer to the section on compatibility for more information.

Connect your Account
To start you will need to specify the GitHub account associated with your decoupled site. After you select the decoupled site option that best suits your needs, you will be prompted to connect your Git provider. 

Select the GitHub option and click Connect. A window for GitHub.com is displayed, and you are prompted “Where do you want to install Pantheon”. 

Select the repository that you will use to develop your decoupled site. A new page is displayed that confirms where Pantheon should be installed. 

3. Specify the permission configurations and click Install. Your GitHub repository is now connected and you can continue with decoupled site creation on the Pantheon dashboard. 

Import the Repository
Connect to your Git provider and select an existing repository.

Prerequisites

You are using a Git repository.

The repository should not be empty.

The repository needs to contain only one of the following files:

package-lock.json

yarn.lock

Procedure

To connect your GitHub repository, click Import Repository on the What kind of site are you creating? page.

If you have not already connected your GitHub account, follow the steps in the Connect your Account section above. Otherwise, if your GitHub account is already connected you can proceed to the next step and select your Git provider.

Select a Git provider from the Choose your Git provider options and click Continue.

Select your desired GitHub account from the GitHub Account dropdown 

Choose the repository name from the Select Repository dropdown and click Continue.

Add to the General Info section.

Specify the Site Name: The site name is the title of your site. You can edit the site name in Settings after creation. 

Select the Frontend Framework. You can choose either Next.js or Gatsby as the static site generator.

(Optional) Link your CMS.

 If you are using a specified CMS, you can link your CMS backend and the site environment from which to source content. However, this is more applicable when using the Decoupled starter kit templates.

Ensure Make this a private repository is selected.

 (Optional) Add configurations.

You can add specifications to help manage you r root directory, build settings, and set environment variables. 

You can set the Environment Variables in the Advanced Setting section. Note that basic builds will function without setting environment variables if the CMS site was selected during decoupled site creation. Environment variables are not necessary for optional features like preview.


Click Continue.

You are directed to a new page with the site name, deployment, and build information/ status. You will receive a message that you decoupled sit has successfully been added to Pantheon. You can view the build log by clicking Build Details.