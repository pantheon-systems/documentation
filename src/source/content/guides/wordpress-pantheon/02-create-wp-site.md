---
title: WordPress on Pantheon Quick Start Guide
subtitle: Create a New WordPress Site
description: Create a WordPress site on Pantheon.
contenttype: [guide]
innav: [false]
categories: [cms]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [wordpress, webops]
contributors: [whitneymeredith]
reviewed: "2022-05-02"
showtoc: true
permalink: docs/guides/wordpress-pantheon/create-wp-site
---

This page provides steps on creating a new WordPress site on Pantheon.

1. [Create an account](https://pantheon.io/register?docs) with Pantheon if you do not already have one.

1. Login to your Pantheon account.

   Your Personal Workspace opens by default unless you are registered as an agency and this is your first time logging in. In that case, you’ll land on your Workspace. Go to your Personal Workspace by selecting your name in the menu bar, then Personal Workspace.

1. Select <Icon icon="plus" text="Create New Site"/>.

1. Enter a name for your site and select the check box to make the site part of your Workspace (only if you are part of an agency).

1. Click **Continue**.

   ![Alt text describing the image](../../../images/create-new-site-updated.png)

1. Select the WordPress **Deploy** button to create your WordPress site.

   ![Alt text describing the image](../../../images/choose-your-cms.png)

1. Wait for your site to finish deploying (this can take a couple of minutes) and then visit your Pantheon [Site Dashboard](/site-dashboard).

   ![Alt text describing the image](../../../images/new-site-deployment.png)

## Initialize Your Test and Live Environments

1. Click the <Icon icon="equalizer" text="Test"/> tab in the Site Dashboard > click **Create Test Environment**.

   This can take a couple of minutes. Note that you must create your Test environment before you can create your Live environment.

   ![Alt text describing the image](../../../images/create-test-environment-updated.png)

1. Click <Icon icon="externalLink" text="Visit Test Site"/> to open your Test site in a new browser tab with the URL `test-YOURSITE.pantheonsite.io`.

1. Click the <Icon icon="wavePulse" text="Live"/> tab in your Site Dashboard > click **Create Live Environment** to create your live environment.

   This can take a couple of minutes. You will have Dev, Test, and Live copies of your site running in three separate environments when it finishes.

1. [Clone](/pantheon-workflow#combine-code-from-dev-and-content-from-live-in-test) your Live environment to your Dev environment (optional).

1. Navigate to the <Icon icon="wrench" text="Dev"/> environment in your Site Dashboard > click <Icon icon="code" text="Code"/>.

<Alert title="Note" type="info">
Dev is the only environment on Pantheon where you can add or change code,
and the only place where you can access and change your Development Mode.
</Alert>

## Configure Your Development Mode

1. Select [SFTP](/connection-modes/#sftp-connection-mode) or [Git](/connection-modes/#git-connection-mode) as as your Development Mode.

   You can develop in [Git mode](/guides/git/git-config), or you can develop with [SFTP mode](/guides/sftp), or even switch between both modes depending on your task and workflow.

   ![Development Modes](../../../images/development-mode-pantheon-updated.png)

1. Review and follow the steps in the [Using Git with SFTP & WordPress Guide](/guides/wordpress-git/) to ensure that you understand the best ways to:

   - Install plugins
   - Manage themes
   - Upload media
   - Edit your site configuration

## WordPress Multisite

This section is optional, and is only intended for customers who would like to create a network of sites using a single copy of the WordPress codebase and a common database.

1. Review the [WordPress Multisite Guide](/guides/multisite/) to ensure that you understand Multisite considerations and Multisite governance.

1. Request a [WordPress Multisite upstream](/guides/multisite/#request-a-wordpress-site-network).

1. Complete the configuration steps in WordPress Multisite Guide to [install](/guides/multisite/config/#install-the-wordpress-site-network) and [configure](/guides/multisite/config/#configure-the-wordpress-site-network) the WordPress Multisite created for you in step 2.

## More Resources

- [Getting Started with Git](/guides/git/git-config)

- [Undo Git Commits on Pantheon](/guides/git/undo-commits)

- [Git Faqs](/guides/git/faq-git)
