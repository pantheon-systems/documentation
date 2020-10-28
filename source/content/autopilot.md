---
title: Pantheon Autopilot
description: Bring visual regression testing to your WordPress or Drupal site
contributors: [nathantyler, alexfornuto]
categories: [automate]
tags: [iterate, site, testing, webops]
reviewed: "2020-10-28"
---

Autopilot on Pantheon automatically detects, performs, and deploys updates for WordPress and Drupal CMS solutions.

<Alert title="Early Access" type="info" icon="leaf">

This page refers to products and features which are currently in development or Early Access. The content on this page is subject to change as development continues, so check back frequently to learn the latest developments.

</Alert>

<Enablement title="Get Early Access" link="https://pantheon.io/earlyaccess/autopilot?docs">

Sign-Up to learn about Early Access for Autopilot by clicking the link above.

</Enablement>

## How Autopilot Works

![A gif showing Autopilot visual regression testing](../images/dashboard/vrt.gif)

Autopilot on Pantheon:

- automatically detects when new updates are available,
- performs the updates in an isolated Multidev environment,
- tests the updates with automated visual regression testing,
- optionally deploys the updates.

## Acceptable Change

Autopilot allows you to configure a threshold of acceptable change, so small expected changes don't trigger false positives. This is useful for common changes like:

- Random Testimonials
- Sliders
- Social (Twitter, Facebook, Pinterest) feeds
- Advertising

Autopilot has AI to detect autoplay videos and reset frames for consistent screenshots, to avoid false positives. Additional DOM element exclusion is in active development.

## Successful Tests

Autopilot updates and visually tests on a [Multidev](/multidev) copy of your site so it can detect issues before applying them.  If you’re not comfortable with Autopilot deploying all the way to the Live environment, you can have Autopilot only deploy updates to Dev or Test and stop. You can proceed with other manual or automated QA processes, and deploy from the Test to Live environment when ready.

## Failing Tests

If an error is detected, you’ll receive a visual report detailing what changed. You have a couple options:

- Approve changes for deployment by clicking a button on the visual report
- Investigate the error on the autopilot Multidev. A developer can fix the issue and manually merge back to the Dev environment

Autoplay can report failures via email or [Quicksilver](/quicksilver) hooks immediately, and send a weekly email report summarizing all Autopilot activity.

## FAQ

### Who is Autopilot for?

If you build or maintain WordPress and Drupal sites, Autopilot is for you.

Upkeep can be tedious with constant monitoring, building, maintaining websites, and working cross-functionally to deliver digital experiences for customers. Autopilot relieves you of the continual and tedious maintenance work it takes to keep sites updated.

Autpilot requires Multidev, and is available to Pantheon accounts with [Gold support](/support#support-features-and-response-times) or higher.

### Is Autopilot configurable per site?

Yes. Access to Autopilot will be account-based and Individual sites in that account will be able to turn Autopilot on and off as desired.

### Does Autopilot work with Composer?

Yes, Autopilot is fully compatible with Pantheon's Integrated Composer feature.

### Does Autopilot automatically deploy changes to the Live environment?

You can specify which environment Autopilot deploys to. When all tests pass, it can:

- deploy to the Live environment,
- deploy to the Test environment (a good choice for a high traffic site that needs an extra level of manual QA or automated CI)
- deploy to the Dev environment (a good choice for a site under continual active development).

## See Also

- [Robots, Autopilot, and The Holy Grail of WebOps](https://pantheon.io/blog/robots-autopilot-and-holy-grail-webops)
