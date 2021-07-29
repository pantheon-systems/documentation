---
title: Pantheon Autopilot
subtitle: Autopilot Setup and Configuration
description: Enable and configure Autopilot visual regression testing (VRT) for your WordPress or Drupal site.
categories: [automate]
tags: [iterate, autopilot, testing, webops]
type: guide
layout: guide
showtoc: true
anchorid: enable-autopilot
permalink: docs/guides/autopilot/enable-autopilot/
editpath: autopilot/02-enable-autopilot.md
reviewed: "2021-03-26"
---

## Enable Autopilot

Autopilot can be enabled for individual sites within each eligible Workspace.

To work with Autopilot, [switch to the Workspace](/guides/new-dashboard/workspaces#switch-between-workspaces) for the site's Organization before you continue.

![Autopilot Overview page shows sites available for Autopilot](../../../images/autopilot/autopilot-sites-overview.png)

1. If the site is in [SFTP mode](/sftp) with staged changes that haven't been committed yet, [commit those changes](/sftp#committing-sftp-changes) first.

1. In the left bar, click **<i className="fa fa-robot"></i> Autopilot**

1. Sites for which Autopilot is available are listed on the **Autopilot Overview** page.

1. Click **Actions**, **Manage Autopilot Settings**, then **Get Started** to start Autopilot setup.

  During setup, use the buttons at the bottom to navigate between steps. If you use the browser's back button instead of **Go Back**, you'll lose the unsaved changes.

## Set Autopilot to Deploy Successful Changes to Dev, Test, or Live

![Autopilot Setup - Scope and Cadence](../../../images/autopilot/autopilot-setup-scope-cadence.png)

On the **Scope and Cadence** page, use the **On**/**Off** toggles to choose which features and elements should be tracked for updates, then use the dropdown menus to choose the **Deployment Destination** and **Update Frequency**.

Click **Continue** to choose pages for screenshot comparison tests and to define a range for acceptable changes.

## Acceptable Change

Autopilot allows you to configure a threshold of acceptable change so that small, expected changes don't trigger false positives. This is useful for common changes like:

- Randomized testimonials feeds
- Sliders
- Social (Twitter, Facebook, Pinterest, etc.) feeds
- Advertising

Additional DOM element exclusion is in active development.

![Autopilot Setup - Visual Test Screenshots](../../../images/autopilot/autopilot-setup-screenshots.png)

1. On the Visual Test Screenshots page, add the page URLs to track and the amount of Acceptable Change.

  For percent change, consider that a 1% change is like a 1000 pixel wide image shifting 10 pixels over.
  
  You can adjust this setting later for individual tests.

  Click **<i class="fa fa-plus-circle"></i> Add** to add more pages.

1. Click **Continue** to choose updates to exclude. If no eligible updates are available, or once you've added all the things to exclude, click **Save** to start Autopilot.

1. Wait while Autopilot performs its tests and updates. This will take a while.

  ![Autopilot Status page shows update status.](../../../images/autopilot/autopilot-status-performing-updates-20.png)

## Configure Autopilot for Premium and Paid Plugins and Modules

Configure Autopilot for each individual premium and paid plugins and modules. Depending on the plugin, you may need to provide Autopilot with access or configure the plugin or module to work with Autopilot.

## Enable Autopilot Email Notifications

<Partial file="autopilot/autopilot-email-notifications.md" />
