---
title: Pantheon Autopilot Tests and Results
subtitle: Tests and Results
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

Autopilot updates and visually tests a copy of your site on a [Multidev](/multidev) so it can detect issues before applying them.

If you’re not comfortable with Autopilot deploying all the way to the Live environment, you can have Autopilot only deploy updates to Dev or Test and stop. You can proceed with other manual or automated QA processes, and deploy from the Test to Live environment when ready.

You can specify the environments to which Autopilot deploys. When all tests pass, it can deploy to the:

- Dev environment only: A good choice for a site under continual active development
- Test environment (after Dev): A good choice for a high traffic site that needs an extra level of manual quality assurance (QA) or automated CI
- Live environment (after Dev and Test)

## Failing Tests

If an error is detected, you’ll receive a visual report detailing what changed.

![Autopilot Update Details shows a list of updates and the versions](../../../images/autopilot/autopilot-status-what-changed.png)

![Autopilot Status shows a Needs Attention notice and prompt to Review Test Results](../../../images/autopilot/autopilot-failed-screenshots.png)

![Autopilot Overview shows a site with a failed test](../../../images/autopilot/autopilot-overview-failed.png)

You have a couple options:

- Approve changes for deployment by clicking a button on the visual report
- Investigate the error in the Autopilot Multidev. A developer can fix the issue and manually merge back to the Dev environment

Autopilot can report failures via email or [Quicksilver](/quicksilver) hooks immediately, and send a weekly email report summarizing all Autopilot activity.

## FAQ

### Is there a limit to the number screenshots Autopilot will take?

Yes. Depending on your [Account](/support#support-features-and-response-times), Autopilot can be set for up to 25 pages on each site. It will check for updates once a week, and can also be run on demand.
