---
title: Pantheon Autopilot
subtitle: Introduction
description: Visual regression testing (VRT) for your WordPress or Drupal site.
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

## What Autopilot Does

Pantheon's Autopilot:

- Automatically detects when new updates are available
- Performs the updates in an isolated [Multidev](/multidev) environment
- Tests the updates with automated visual regression testing (VRT)
- Optionally deploys the updates

![A gif showing Autopilot visual regression testing](../../../images/dashboard/vrt.gif)

## Get Autopilot

Autopilot is available during Limited Availability to Gold Accounts and higher. Check out our [pricing page](https://pantheon.io/pricing?docs) and contact [Sales](https://pantheon.io/earlyaccess/autopilot?docs) to talk through what plan is best for your needs.

## Who is Autopilot for?

If you build or maintain WordPress and Drupal sites, Autopilot is for you.

Site upkeep can be tedious with constant monitoring, building, maintaining websites, and working cross-functionally to deliver digital experiences for customers. Autopilot relieves you of the continual maintenance work it takes to keep sites updated.

Autopilot requires Multidev, and is available to Pantheon Gold Accounts or higher.

## FAQ
### Is Autopilot configurable per site?

Yes. Access to Autopilot is account-based and individual sites in that account can turn Autopilot on and off as desired. See [Enable Autopilot](/guides/enable-autopilot)

### Does Autopilot work with Composer?

Yes. Autopilot is fully compatible with Pantheon's [Integrated Composer](/integrated-composer) feature.

### Does Autopilot automatically deploy changes to the Live environment?

You can specify the environments to which Autopilot deploys. See the next page for [configuration options](/guides/enable-autopilot).

## See Also

- [Robots, Autopilot, and The Holy Grail of WebOps](https://pantheon.io/blog/robots-autopilot-and-holy-grail-webops)
