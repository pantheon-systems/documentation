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

[Autopilot](https://pantheon.io/autopilot?docs) is a new feature that's part of Pantheon's [New Dashboard](/guides/new-dashboard) experience. Pantheon Autopilot automatically detects, performs, and deploys updates for WordPress and Drupal.

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

Autopilot is enabled for Pantheon sites at the organization level. Your user should be added to the site's organization with at least Developer-level access.

## Will Autopilot work for your site?

While Pantheon develops more features for Autopilot, some features aren't available yet.

Right now, Autopilot doesn't work with sites that use [Integrated Composer](/integrated-composer).

## FAQ

### Is Autopilot configurable per site?

Yes. Access to Autopilot is account-based and individual sites in that account can turn Autopilot on and off as desired. See [Enable Autopilot](/guides/autopilot/enable-autopilot)

### Will Autopilot email VRT results?

Not yet. Pantheon's devs are working on Autopilot email notifications.

### Does Autopilot work with build tools?

Not yet. Autopilot is not compatible with Build Tools or other workflows that use external Git repositories.

### Does Autopilot support Terminus actions?

Not yet.

### Does Autopilot automatically deploy changes to the Live environment?

You can specify the environments to which Autopilot deploys. See the next page for [configuration options](/guides/autopilot/enable-autopilot).

## See Also

- [Robots, Autopilot, and The Holy Grail of WebOps](https://pantheon.io/blog/robots-autopilot-and-holy-grail-webops)
