---
title: Launch Checklist
description: Review essential steps for launching your site on Pantheon.
tags: [collaborate, launch, site, webops, workflow]
contributors: [stevector]
showtoc: true
contenttype: [doc]
innav: [true]
categories: [overview, launch, domains]
cms: [wordpress, drupal]
audience: [agency, development]
product: [--]
integration: [--]
image: launchGuide-twitterLarge.png
---

You've successfully set up your site and created your workflow. Now, it's time to go through the final steps to get your site live. Use this checklist to launch your site on the Pantheon platform: 

- [ ] [Initialize the Live environment](#initialize-the-live-environment)
- [ ] [Configure caching](#configure-caching-optional)
- [ ] [Configure Backups](#configure-backups-optional)
- [ ] [Run Launch Check](#run-launch-check-optional)
- [ ] [Lock Sensitive Environments](#lock-sensitive-environments-optional)
- [ ] [Choose a Site Plan](#choose-a-site-plan)
- [ ] [Connect Custom Domains](#connect-and-configure-your-custom-domain)
- [ ] [Set a primary domain](#set-a-primary-domain-optional)
- [ ] [Provision HTTPS and test locally](#provision-https-and-test-locally-optional)
- [ ] [Configure DNS](#configure-dns)
- [ ] [Configure a Long-Duration HSTS Header](#configure-a-long-duration-hsts-header-optional)

## Initialize the Live environment 
Todo: fill out subsection 
[crosslink](/guides/getstarted/addsite/#create-the-live-environment)

## Configure caching (optional)
Todo: fill out subsection 
[crosslink](/guides/global-cdn/global-cdn-caching/)

## Configure Backups (optional)

Protect your site’s data by setting up Pantheon’s Backup Tools.

* Automatic daily backups and manual backup options are available.
* Each backup includes code, database, and files for complete coverage.
* **Tip:** Schedule regular backups and create a manual backup before launch.


## Run Launch Check (optional)

Before going live, use Pantheon’s Launch Check tool to identify and resolve common configuration or performance issues.

**What it does:** Checks cache settings, modules, and database stats; provides actionable insights.

**Why it matters:** Helps you optimize your site and avoid post-launch surprises.

**Learn more:**  [WordPress Launch Check](/guides/wordpress-pantheon/wordpress-launch-check) | [Drupal Launch Check](/drupal-launch-check/)

## Lock Sensitive Environments (optional)

Keep your development and test environments private until you’re ready to launch.

* Use Pantheon’s environment locking to password-protect non-public environments.
* Control who can access your work-in-progress site.

Learn more about Pantheon’s [Security Tools](/guides/secure-development/security-tool).

## Choose a Site Plan

Select the Pantheon site plan that best fits your anticipated traffic and storage needs. You can adjust your plan later as your needs change.

Learn more about [purchasing a site plan](/guides/account-mgmt/plans/site-plans#purchase-a-plan).

## Connect and Configure Your Custom Domain

On Pantheon, you can add custom domains to your Live environment, which is ideal for presenting your site to the public. After you add your custom domain, Pantheon’s Global CDN will automatically provision HTTPS, for a secure online presence without manual certificate management.

Learn more about how to [Connect your Domain Name.](/guides/domains/custom-domains)

## Set a primary domain (optional) 
Todo: fill out subsection 
[crosslink](/guides/domains/primary-domain)

## Provision HTTPS and test locally (optional)
Todo: fill out subsection 

## Configure DNS
Todo: fill out subsection 

## Configure a Long-Duration HSTS Header (optional)
Todo: fill out subsection 