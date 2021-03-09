---
title: Pantheon Autopilot
subtitle: Introduction
description: Bring visual regression testing to your WordPress or Drupal site
categories: [automate]
tags: [iterate, autopilot, testing, webops]
contributors: [nathantyler, alexfornuto, edwardangert]
type: guide
anchorid: autopilot
permalink: docs/guides/autopilot/
editpath: autopilot/01-introduction.md
reviewed: "2021-03-26"
---

[Autopilot](https://pantheon.io/autopilot?docs) on Pantheon automatically detects, performs, and deploys updates for WordPress and Drupal CMS solutions.

<Alert title="Limited Availability" type="info" icon="leaf">

This page refers to products and features that are currently in development Limited Availability. The content on this page is subject to change as development continues, so check back frequently to learn the latest developments. **[Contact Sales](https://pantheon.io/earlyaccess/autopilot?docs)** for details about the Autopilot Limited Availability program.

</Alert>

## How Autopilot Works

![A gif showing Autopilot visual regression testing](../../../images/dashboard/vrt.gif)

Pantheon's Autopilot:

- Automatically detects when new updates are available
- Performs the updates in an isolated [Multidev](/multidev) environment
- Tests the updates with automated visual regression testing
- Optionally deploys the updates

## Get Autopilot

The Autopilot Limited Availability program has been filled. Spots may be available for Limited Availability testing; contact [Sales](https://pantheon.io/earlyaccess/autopilot?docs) for details.

## Enable Autopilot

<!-- commenting out while in EA
Autopilot can be enabled for each eligible Workspace.

1. In the left bar, click **<i className="fa fa-robot"></i> Autopilot**

1. Choose which sites to enable Autopilot on: **All sites**, **Some sites**, or **One site**.

   - If you choose **Some sites** or **One site**, choose the sites from the dropdown menu that appears.

1. Choose the **Deployment Destination**: Multidev, Dev, Test, or Live
-->

1. After Autopilot has been enabled, from the [New Dashboard](/guides/new-dashboard) click **Sites**.
1. Click **Get Started**.
1. Configure the Autopilot scope and frequency.
1. Specify which pages Autopilot should track.
1. List the plugins, modules, and updates the Autopilot should exclude.
1. Start testing with **Get Started**. This process will take several minutes.

## Acceptable Change

Autopilot allows you to configure a threshold of acceptable change so that small, expected changes don't trigger false positives. This is useful for common changes like:

- Randomized testimonials feeds
- Sliders
- Social (Twitter, Facebook, Pinterest, etc.) feeds
- Advertising

Autopilot has AI to detect autoplay videos and reset frames for consistent screenshots, to avoid false positives. Additional DOM element exclusion is in active development.

## Successful Tests

Autopilot updates and visually tests a copy of your site on a [Multidev](/multidev) so it can detect issues before applying them. If you’re not comfortable with Autopilot deploying all the way to the Live environment, you can have Autopilot only deploy updates to Dev or Test and stop. You can proceed with other manual or automated QA processes, and deploy from the Test to Live environment when ready.

## Failing Tests

If an error is detected, you’ll receive a visual report detailing what changed. You have a couple options:

- Approve changes for deployment by clicking a button on the visual report
- Investigate the error on the autopilot Multidev. A developer can fix the issue and manually merge back to the Dev environment

Autopilot can report failures via email or [Quicksilver](/quicksilver) hooks immediately, and send a weekly email report summarizing all Autopilot activity.

## FAQ

### Who is Autopilot for?

If you build or maintain WordPress and Drupal sites, Autopilot is for you.

Site upkeep can be tedious with constant monitoring, building, maintaining websites, and working cross-functionally to deliver digital experiences for customers. Autopilot relieves you of the continual maintenance work it takes to keep sites updated.

Autopilot requires Multidev, and is available to Pantheon accounts with [Gold support](/support#support-features-and-response-times) or higher.

### Is Autopilot configurable per site?

Yes. Access to Autopilot is account-based and individual sites in that account can turn Autopilot on and off as desired.

### Does Autopilot work with Composer?

Yes. Autopilot is fully compatible with Pantheon's [Integrated Composer](/integrated-composer) feature.

### Does Autopilot automatically deploy changes to the Live environment?

You can specify the environments to which Autopilot deploys. When all tests pass, it can deploy to the:

- Dev environment only: A good choice for a site under continual active development
- Test environment (after Dev): A good choice for a high traffic site that needs an extra level of manual quality assurance (QA) or automated CI
- Live environment (after Dev and Test)

### Is there a limit to the number screenshots Autopilot will take?

Yes. Depending on your [Account](/support#support-features-and-response-times), Autopilot can be set for up to 25 pages on each site. It will check for updates once a week, and can also be run on demand.

## See Also

- [Robots, Autopilot, and The Holy Grail of WebOps](https://pantheon.io/blog/robots-autopilot-and-holy-grail-webops)
