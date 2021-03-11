---
title: Pantheon Autopilot Tests and Results
subtitle: What the test results mean
description: Autopilot visual regression testing (VRT) results and how to deal with failing tests.
categories: [automate]
tags: [iterate, autopilot, testing, webops]
type: guide
anchorid: autopilot
permalink: docs/guides/autopilot/tests-results/
editpath: autopilot/03-tests-results.md
reviewed: "2021-03-26"
---

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
