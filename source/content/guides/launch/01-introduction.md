---
title: Launch Checklist
subtitle: Launch Checklist
description: Review essential steps for launching your site on Pantheon.
tags: [collaborate, launch, site, webops, workflow]
contributors: [stevector]
showtoc: true
permalink: docs/guides/launch/
contenttype: [guide]
innav: [true]
categories: [overview, launch, domains]
cms: [wordpress, drupal]
audience: [agency, development]
product: [--]
integration: [--]
image: launchGuide-twitterLarge.png
---

You've successfully set up your site and created your workflow. Now, it's time to go through the final steps to get your site live. This guide will show you how to create, configure, and launch your site on the Pantheon platform.

**In this guide:**

1. [Initialize the Live environment](/guides/getstarted/addsite/#create-the-live-environment)
1. [Run Launch Check](#run-launch-check)
1. [Configure Backups](#configure-backups)
1. [Lock Sensitive Environments](#lock-sensitive-environments)
1. [Choose a Site Plan](#choose-a-site-plan)
1. [Connect Custom Domains](#connect-and-configure-your-custom-domain)

[More Resources](#additional-resources)

## Initialize the Live environment 

## Run Launch Check

Before going live, use Pantheon’s Launch Check tool to identify and resolve common configuration or performance issues.

**What it does:** Checks cache settings, modules, and database stats; provides actionable insights.

**Why it matters:** Helps you optimize your site and avoid post-launch surprises.

**Learn more:**  [WordPress Launch Check](/guides/wordpress-pantheon/wordpress-launch-check) | [Drupal Launch Check](/drupal-launch-check/)

## Configure Backups

Protect your site’s data by setting up Pantheon’s Backup Tools.

* Automatic daily backups and manual backup options are available.
* Each backup includes code, database, and files for complete coverage.
* **Tip:** Schedule regular backups and create a manual backup before launch.

## Lock Sensitive Environments

Keep your development and test environments private until you’re ready to launch.

* Use Pantheon’s environment locking to password-protect non-public environments.
* Control who can access your work-in-progress site.

Learn more about Pantheon’s [Security Tools](/guides/secure-development/security-tool).

## Choose a Site Plan

Select the Pantheon site plan that best fits your anticipated traffic and storage needs. You can adjust your plan later as your needs change.

Learn more about [Pantheon Site Plans](/guides/launch/plans/).

## Connect and Configure Your Custom Domain

On Pantheon, you can add custom domains to your Live environment, which is ideal for presenting your site to the public. After you add your custom domain, Pantheon’s Global CDN will automatically provision HTTPS, for a secure online presence without manual certificate management.

Learn more about how to [Connect your Domain Name.](/guides/launch/domains/)

## Additional Resources

* [How to Configure Caching](/guides/global-cdn/global-cdn-caching/)
* [Enable and Schedule Weekly Backups](/guides/launch/launch-check/)
* [Set a Primary Domain](/guides/launch/redirects)
* [Use the Pantheon WebOps Workflow](/pantheon-workflow)
* [Managing Your Site Code on Pantheon](/pantheon-workflow#your-site-code-on-pantheon)
